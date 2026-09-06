(function (global) {
  'use strict';

  var namespace = global.FastRespChat = global.FastRespChat || {};

  function createRequestId() {
    if (global.crypto && typeof global.crypto.randomUUID === 'function') {
      return global.crypto.randomUUID();
    }
    return 'chat-' + Date.now() + '-' + Math.random().toString(16).slice(2);
  }

  function SocketChatAdapter(options) {
    var settings = options || {};
    this.url = settings.url || '';
    this.protocols = settings.protocols;
    this.createSocket = settings.createSocket || function (url, protocols) {
      return protocols ? new WebSocket(url, protocols) : new WebSocket(url);
    };
    this.bridge = settings.bridge || new namespace.ChatProtocolBridge(settings.protocol || {});
    this.uploadAttachmentHandler = settings.uploadAttachment;
    this.heartbeatInterval = settings.heartbeatInterval || 25000;
    this.requestTimeout = settings.requestTimeout || 15000;
    this.maxReconnectDelay = settings.maxReconnectDelay || 30000;
    this.autoReconnect = settings.autoReconnect !== false;
    this.listeners = new Set();
    this.pending = new Map();
    this.socket = null;
    this.context = null;
    this.heartbeatTimer = null;
    this.reconnectTimer = null;
    this.reconnectAttempt = 0;
    this.manuallyClosed = false;
  }

  SocketChatAdapter.prototype.subscribe = function (listener) {
    var self = this;
    this.listeners.add(listener);
    return function () {
      self.listeners.delete(listener);
    };
  };

  SocketChatAdapter.prototype.emit = function (event) {
    this.listeners.forEach(function (listener) {
      listener(event);
    });
  };

  SocketChatAdapter.prototype.connect = function (context) {
    var self = this;
    this.context = context || {};
    this.manuallyClosed = false;
    if (!this.url) return Promise.reject(new Error('SocketChatAdapter requires a url.'));
    this.emit({ type: 'connection.changed', payload: { status: 'connecting' } });

    return new Promise(function (resolve, reject) {
      var socket;
      try {
        socket = self.createSocket(self.url, self.protocols, self.context);
      } catch (error) {
        reject(error);
        return;
      }
      self.socket = socket;

      socket.addEventListener('open', function () {
        self.reconnectAttempt = 0;
        self.startHeartbeat();
        self.emit({ type: 'connection.changed', payload: { status: 'online' } });
        resolve({ status: 'online' });
      }, { once: true });

      socket.addEventListener('message', function (messageEvent) {
        self.handleMessage(messageEvent);
      });

      socket.addEventListener('error', function () {
        self.emit({ type: 'connection.changed', payload: { status: 'offline' } });
      });

      socket.addEventListener('close', function () {
        self.stopHeartbeat();
        self.rejectPending(new Error('Socket connection closed.'));
        if (self.manuallyClosed || !self.autoReconnect) {
          self.emit({ type: 'connection.changed', payload: { status: 'offline' } });
          return;
        }
        self.scheduleReconnect();
      });

      setTimeout(function () {
        if (socket.readyState !== 1) reject(new Error('Socket connection timeout.'));
      }, self.requestTimeout);
    });
  };

  SocketChatAdapter.prototype.disconnect = function () {
    this.manuallyClosed = true;
    this.stopHeartbeat();
    clearTimeout(this.reconnectTimer);
    this.rejectPending(new Error('Socket adapter disconnected.'));
    if (this.socket && this.socket.readyState < 2) this.socket.close(1000, 'Client disconnect');
    this.socket = null;
  };

  SocketChatAdapter.prototype.startHeartbeat = function () {
    var self = this;
    this.stopHeartbeat();
    this.heartbeatTimer = setInterval(function () {
      self.sendFrame({ type: 'chat.ping', payload: { at: new Date().toISOString() } }, false).catch(function () {});
    }, this.heartbeatInterval);
  };

  SocketChatAdapter.prototype.stopHeartbeat = function () {
    clearInterval(this.heartbeatTimer);
    this.heartbeatTimer = null;
  };

  SocketChatAdapter.prototype.scheduleReconnect = function () {
    var self = this;
    clearTimeout(this.reconnectTimer);
    this.reconnectAttempt += 1;
    var baseDelay = Math.min(this.maxReconnectDelay, 1000 * Math.pow(2, this.reconnectAttempt - 1));
    var delay = Math.round(baseDelay * (0.8 + Math.random() * 0.4));
    this.emit({ type: 'connection.changed', payload: { status: 'reconnecting', attempt: this.reconnectAttempt } });
    this.reconnectTimer = setTimeout(function () {
      self.connect(self.context).catch(function (error) {
        self.emit({ type: 'adapter.error', error: error });
      });
    }, delay);
  };

  SocketChatAdapter.prototype.handleMessage = function (raw) {
    var events;
    try {
      events = this.bridge.decode(raw);
    } catch (error) {
      this.emit({ type: 'adapter.error', error: error });
      return;
    }

    events.forEach(function (event) {
      if (event.requestId && this.pending.has(event.requestId)) {
        var request = this.pending.get(event.requestId);
        clearTimeout(request.timer);
        this.pending.delete(event.requestId);
        if (event.error) request.reject(event.error instanceof Error ? event.error : new Error(String(event.error)));
        else request.resolve(event.payload);
      }
      this.emit(event);
    }.bind(this));
  };

  SocketChatAdapter.prototype.rejectPending = function (error) {
    this.pending.forEach(function (request) {
      clearTimeout(request.timer);
      request.reject(error);
    });
    this.pending.clear();
  };

  SocketChatAdapter.prototype.sendFrame = function (command, waitForResponse) {
    var self = this;
    if (!this.socket || this.socket.readyState !== 1) {
      return Promise.reject(new Error('Socket is not connected.'));
    }
    var requestId = command.requestId || createRequestId();
    var frame = Object.assign({}, command, { requestId: requestId });
    var encoded;
    try {
      encoded = this.bridge.encode(frame);
      this.socket.send(encoded);
    } catch (error) {
      return Promise.reject(error);
    }
    if (waitForResponse === false) return Promise.resolve({ requestId: requestId });

    return new Promise(function (resolve, reject) {
      var timer = setTimeout(function () {
        self.pending.delete(requestId);
        reject(new Error('Socket request timeout: ' + command.type));
      }, self.requestTimeout);
      self.pending.set(requestId, { resolve: resolve, reject: reject, timer: timer });
    });
  };

  SocketChatAdapter.prototype.loadConversations = function (params) {
    return this.sendFrame({ type: 'conversation.list.request', payload: params || {} });
  };

  SocketChatAdapter.prototype.loadMessages = function (params) {
    return this.sendFrame({
      type: 'message.list.request',
      conversationId: params.conversationId,
      payload: params
    });
  };

  SocketChatAdapter.prototype.loadSystemNotice = function (params) {
    return this.sendFrame({
      type: 'system.notification.get',
      payload: { noticeId: params.noticeId }
    });
  };

  SocketChatAdapter.prototype.sendMessage = function (message) {
    return this.sendFrame({
      type: 'message.send',
      conversationId: message.conversationId,
      payload: message
    });
  };

  SocketChatAdapter.prototype.performBusinessAction = function (action) {
    return this.sendFrame({
      type: 'workflow.action',
      conversationId: action.conversationId,
      payload: action
    });
  };

  SocketChatAdapter.prototype.markRead = function (conversationId, messageId) {
    return this.sendFrame({
      type: 'message.read',
      conversationId: conversationId,
      payload: { messageId: messageId }
    }, false);
  };

  SocketChatAdapter.prototype.markSystemNoticeRead = function (noticeId) {
    return this.sendFrame({
      type: 'system.notification.read',
      payload: { noticeId: noticeId }
    }, false);
  };

  SocketChatAdapter.prototype.uploadAttachment = function (file, onProgress) {
    if (typeof this.uploadAttachmentHandler !== 'function') {
      return Promise.reject(new Error('An uploadAttachment handler is required for files and images.'));
    }
    return this.uploadAttachmentHandler(file, onProgress);
  };

  namespace.SocketChatAdapter = SocketChatAdapter;
})(typeof window !== 'undefined' ? window : globalThis);
