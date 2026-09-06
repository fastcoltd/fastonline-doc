(function (global) {
  'use strict';

  var namespace = global.FastRespChat = global.FastRespChat || {};

  function clone(value) {
    if (value === undefined) return undefined;
    if (typeof structuredClone === 'function') return structuredClone(value);
    return JSON.parse(JSON.stringify(value));
  }

  function wait(delay, value) {
    return new Promise(function (resolve) {
      setTimeout(function () { resolve(value); }, delay);
    });
  }

  function createId(prefix) {
    if (global.crypto && typeof global.crypto.randomUUID === 'function') {
      return prefix + '-' + global.crypto.randomUUID();
    }
    return prefix + '-' + Date.now() + '-' + Math.random().toString(16).slice(2);
  }

  function MockChatAdapter(data, options) {
    var settings = options || {};
    this.data = clone(data || {});
    this.delay = settings.delay === undefined ? 180 : settings.delay;
    this.failureRate = settings.failureRate || 0;
    this.listeners = new Set();
    this.objectUrls = new Set();
    this.connected = false;
  }

  MockChatAdapter.prototype.subscribe = function (listener) {
    var self = this;
    this.listeners.add(listener);
    return function () { self.listeners.delete(listener); };
  };

  MockChatAdapter.prototype.emit = function (event) {
    this.listeners.forEach(function (listener) { listener(clone(event)); });
  };

  MockChatAdapter.prototype.connect = function () {
    var self = this;
    self.emit({ type: 'connection.changed', payload: { status: 'connecting' } });
    return wait(this.delay, { status: 'online' }).then(function (result) {
      self.connected = true;
      self.emit({ type: 'connection.changed', payload: result });
      return result;
    });
  };

  MockChatAdapter.prototype.disconnect = function () {
    this.connected = false;
    this.objectUrls.forEach(function (url) { URL.revokeObjectURL(url); });
    this.objectUrls.clear();
    this.emit({ type: 'connection.changed', payload: { status: 'offline' } });
  };

  MockChatAdapter.prototype.loadConversations = function (params) {
    var tab = params && params.tab;
    var query = String(params && params.query || '').toLowerCase();
    var list = (this.data.conversations || []).filter(function (conversation) {
      var matchesTab = !tab || conversation.type === tab;
      var haystack = (conversation.title + ' ' + conversation.preview).toLowerCase();
      return matchesTab && (!query || haystack.indexOf(query) >= 0);
    });
    return wait(this.delay, clone(list));
  };

  MockChatAdapter.prototype.loadMessages = function (params) {
    var list = clone((this.data.messages || {})[params.conversationId] || []);
    if (params.before) return wait(this.delay, { messages: [], hasOlder: false });
    return wait(this.delay, { messages: list, hasOlder: true });
  };

  MockChatAdapter.prototype.sendMessage = function (message) {
    var self = this;
    return wait(this.delay).then(function () {
      if (Math.random() < self.failureRate) throw new Error('Mock send failure.');
      var stored = clone(message);
      stored.id = createId('message');
      stored.status = 'sent';
      self.data.messages[stored.conversationId] = self.data.messages[stored.conversationId] || [];
      self.data.messages[stored.conversationId].push(stored);
      self.emit({
        type: 'message.ack',
        conversationId: stored.conversationId,
        payload: {
          id: stored.id,
          clientMessageId: stored.clientMessageId,
          status: 'sent',
          sentAt: stored.sentAt
        }
      });
      return clone(stored);
    });
  };

  MockChatAdapter.prototype.performBusinessAction = function (action) {
    var self = this;
    return wait(this.delay * 2).then(function () {
      if (action.action === 'close-order') {
        self.emit({ type: 'order.closed', conversationId: action.conversationId, payload: { closed: true } });
        return { closed: true };
      }

      if (action.action === 'create-workflow') {
        var message = clone(action.message);
        message.id = createId('workflow');
        message.status = 'sent';
        self.data.messages[message.conversationId] = self.data.messages[message.conversationId] || [];
        self.data.messages[message.conversationId].push(message);
        self.emit({ type: 'message.created', conversationId: message.conversationId, payload: message });
        return message;
      }

      var state = action.action === 'accept' ? 'accepted' : 'rejected';
      var workflow = {
        state: state,
        actorName: action.actorName || 'Quick Store',
        rejectionReason: action.reason || ''
      };
      self.emit({
        type: 'workflow.updated',
        conversationId: action.conversationId,
        payload: { messageId: action.messageId, workflow: workflow }
      });
      return workflow;
    });
  };

  MockChatAdapter.prototype.markRead = function () {
    return wait(this.delay, { status: 'read' });
  };

  MockChatAdapter.prototype.uploadAttachment = function (file, onProgress) {
    return new Promise(function (resolve) {
      var progress = 0;
      var timer = setInterval(function () {
        progress += 25;
        if (typeof onProgress === 'function') onProgress(Math.min(progress, 100));
        if (progress < 100) return;
        clearInterval(timer);
        var url = URL.createObjectURL(file);
        this.objectUrls.add(url);
        resolve({
          name: file.name,
          size: file.size,
          mimeType: file.type,
          url: url
        });
      }.bind(this), 60);
    }.bind(this));
  };

  namespace.MockChatAdapter = MockChatAdapter;
})(typeof window !== 'undefined' ? window : globalThis);
