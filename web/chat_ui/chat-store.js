(function (global) {
  'use strict';

  var namespace = global.FastRespChat = global.FastRespChat || {};

  function clone(value) {
    if (value === undefined) return undefined;
    if (typeof structuredClone === 'function') return structuredClone(value);
    return JSON.parse(JSON.stringify(value));
  }

  function createInitialState(initialState) {
    var source = initialState || {};
    return {
      activeTab: source.activeTab || 'ticket',
      tabCounts: clone(source.tabCounts || { chat: 0, ticket: 0, system: 0 }),
      searchQuery: source.searchQuery || '',
      selectedConversationId: source.selectedConversationId || null,
      conversations: clone(source.conversations || []),
      messages: clone(source.messages || {}),
      systemNotices: clone(source.systemNotices || {}),
      connectionStatus: source.connectionStatus || 'idle',
      loadingConversations: false,
      loadingMessages: false,
      loadingOlderMessages: false,
      hasOlderMessages: source.hasOlderMessages !== false,
      orderClosed: Boolean(source.orderClosed),
      error: null
    };
  }

  function ChatStore(initialState) {
    this.state = createInitialState(initialState);
    this.listeners = new Set();
  }

  ChatStore.prototype.getState = function () {
    return this.state;
  };

  ChatStore.prototype.subscribe = function (listener) {
    var self = this;
    this.listeners.add(listener);
    return function () {
      self.listeners.delete(listener);
    };
  };

  ChatStore.prototype.update = function (updater) {
    var previous = this.state;
    var next = typeof updater === 'function' ? updater(previous) : Object.assign({}, previous, updater);
    if (!next || next === previous) return;
    this.state = next;
    this.listeners.forEach(function (listener) {
      listener(next, previous);
    });
  };

  ChatStore.prototype.setConnectionStatus = function (status) {
    this.update(function (state) {
      return Object.assign({}, state, { connectionStatus: status });
    });
  };

  ChatStore.prototype.setActiveTab = function (tab) {
    this.update(function (state) {
      return Object.assign({}, state, { activeTab: tab, searchQuery: '' });
    });
  };

  ChatStore.prototype.setSearchQuery = function (query) {
    this.update(function (state) {
      return Object.assign({}, state, { searchQuery: query || '' });
    });
  };

  ChatStore.prototype.setConversations = function (conversations) {
    this.update(function (state) {
      var nextConversations = clone(conversations || []);
      var selectedId = state.selectedConversationId;
      if (!selectedId && nextConversations.length) selectedId = nextConversations[0].id;
      return Object.assign({}, state, {
        conversations: nextConversations,
        selectedConversationId: selectedId,
        loadingConversations: false
      });
    });
  };

  ChatStore.prototype.setMessages = function (conversationId, messages, options) {
    var settings = options || {};
    this.update(function (state) {
      var nextMessages = Object.assign({}, state.messages);
      var current = nextMessages[conversationId] || [];
      var incoming = clone(messages || []);
      nextMessages[conversationId] = settings.prepend ? incoming.concat(current) : incoming;
      return Object.assign({}, state, {
        messages: nextMessages,
        loadingMessages: false,
        loadingOlderMessages: false,
        hasOlderMessages: settings.hasOlder !== false
      });
    });
  };

  ChatStore.prototype.selectConversation = function (conversationId) {
    this.update(function (state) {
      var conversations = state.conversations.map(function (conversation) {
        if (conversation.id !== conversationId) return conversation;
        return Object.assign({}, conversation, { unread: 0 });
      });
      var nextSystemNotices = Object.assign({}, state.systemNotices);
      if (nextSystemNotices[conversationId]) {
        nextSystemNotices[conversationId] = Object.assign({}, nextSystemNotices[conversationId], { read: true });
      }
      return Object.assign({}, state, {
        conversations: conversations,
        systemNotices: nextSystemNotices,
        selectedConversationId: conversationId,
        loadingMessages: true,
        error: null
      });
    });
  };

  ChatStore.prototype.setSystemNotice = function (noticeId, notice) {
    if (!noticeId || !notice) return;
    this.update(function (state) {
      var nextSystemNotices = Object.assign({}, state.systemNotices);
      var previousNotice = nextSystemNotices[noticeId];
      nextSystemNotices[noticeId] = Object.assign({}, clone(notice), {
        id: notice.id || noticeId,
        read: Boolean(notice.read || previousNotice && previousNotice.read)
      });
      return Object.assign({}, state, {
        systemNotices: nextSystemNotices,
        loadingMessages: false
      });
    });
  };

  ChatStore.prototype.upsertSystemNotice = function (notice, conversation) {
    if (!notice || !notice.id) return;
    this.update(function (state) {
      var nextSystemNotices = Object.assign({}, state.systemNotices);
      nextSystemNotices[notice.id] = clone(notice);
      var summary = conversation || {
        id: notice.id,
        type: 'system',
        title: notice.title || 'System notification',
        preview: notice.publishedAtLabel || notice.publishedAt || '',
        unread: notice.read ? 0 : 1,
        participants: [],
        order: null
      };
      var conversations = state.conversations.slice();
      var index = conversations.findIndex(function (item) { return item.id === summary.id; });
      if (index >= 0) conversations[index] = Object.assign({}, conversations[index], clone(summary));
      else conversations.unshift(clone(summary));
      return Object.assign({}, state, {
        systemNotices: nextSystemNotices,
        conversations: conversations
      });
    });
  };

  ChatStore.prototype.markSystemNoticeRead = function (noticeId) {
    if (!noticeId) return;
    this.update(function (state) {
      var nextSystemNotices = Object.assign({}, state.systemNotices);
      if (nextSystemNotices[noticeId]) {
        nextSystemNotices[noticeId] = Object.assign({}, nextSystemNotices[noticeId], { read: true });
      }
      var conversations = state.conversations.map(function (conversation) {
        return conversation.id === noticeId
          ? Object.assign({}, conversation, { unread: 0 })
          : conversation;
      });
      return Object.assign({}, state, {
        systemNotices: nextSystemNotices,
        conversations: conversations
      });
    });
  };

  ChatStore.prototype.addMessage = function (message) {
    if (!message || !message.conversationId) return;
    this.update(function (state) {
      var nextMessages = Object.assign({}, state.messages);
      var list = (nextMessages[message.conversationId] || []).slice();
      var duplicateIndex = list.findIndex(function (item) {
        return item.id === message.id || (
          item.clientMessageId &&
          message.clientMessageId &&
          item.clientMessageId === message.clientMessageId
        );
      });
      if (duplicateIndex >= 0) list[duplicateIndex] = Object.assign({}, list[duplicateIndex], clone(message));
      else list.push(clone(message));
      nextMessages[message.conversationId] = list;
      return Object.assign({}, state, { messages: nextMessages });
    });
  };

  ChatStore.prototype.updateMessage = function (conversationId, matcher, patch) {
    this.update(function (state) {
      var nextMessages = Object.assign({}, state.messages);
      var list = (nextMessages[conversationId] || []).map(function (message) {
        var matched = typeof matcher === 'function'
          ? matcher(message)
          : message.id === matcher || message.clientMessageId === matcher;
        return matched ? Object.assign({}, message, clone(patch || {})) : message;
      });
      nextMessages[conversationId] = list;
      return Object.assign({}, state, { messages: nextMessages });
    });
  };

  ChatStore.prototype.updateWorkflow = function (conversationId, messageId, workflowPatch) {
    this.update(function (state) {
      var nextMessages = Object.assign({}, state.messages);
      nextMessages[conversationId] = (nextMessages[conversationId] || []).map(function (message) {
        if (message.id !== messageId) return message;
        return Object.assign({}, message, {
          workflow: Object.assign({}, message.workflow || {}, clone(workflowPatch || {}))
        });
      });
      return Object.assign({}, state, { messages: nextMessages });
    });
  };

  ChatStore.prototype.setLoading = function (key, value) {
    var allowed = ['loadingConversations', 'loadingMessages', 'loadingOlderMessages'];
    if (allowed.indexOf(key) < 0) return;
    this.update(function (state) {
      var patch = {};
      patch[key] = Boolean(value);
      return Object.assign({}, state, patch);
    });
  };

  ChatStore.prototype.setOrderClosed = function (conversationId, closed) {
    this.update(function (state) {
      var conversations = state.conversations.map(function (conversation) {
        if (conversation.id !== conversationId || !conversation.order) return conversation;
        return Object.assign({}, conversation, {
          order: Object.assign({}, conversation.order, { closed: Boolean(closed) })
        });
      });
      return Object.assign({}, state, {
        conversations: conversations,
        orderClosed: Boolean(closed)
      });
    });
  };

  ChatStore.prototype.setError = function (error) {
    this.update(function (state) {
      return Object.assign({}, state, { error: error || null });
    });
  };

  namespace.ChatStore = ChatStore;
})(typeof window !== 'undefined' ? window : globalThis);
