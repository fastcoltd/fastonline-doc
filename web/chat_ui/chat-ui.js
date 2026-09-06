(function (global) {
  'use strict';

  var namespace = global.FastRespChat = global.FastRespChat || {};
  var TAB_LABELS = { chat: 'Chat', ticket: 'Ticket', system: 'System' };
  var STATUS_LABELS = {
    pending: 'Sending…',
    sent: 'Sent',
    delivered: 'Delivered',
    read: 'Read',
    failed: 'Failed'
  };
  var WORKFLOW_LABELS = {
    refund: '退款申请',
    replacement: '换货申请',
    'close-request': '关闭申请',
    'service-intervention': '客服介入'
  };
  var CALLBACK_NAMES = {
    conversationchange: 'onConversationChange',
    send: 'onSend',
    businessaction: 'onBusinessAction',
    error: 'onError'
  };

  function createId(prefix) {
    if (global.crypto && typeof global.crypto.randomUUID === 'function') {
      return prefix + '-' + global.crypto.randomUUID();
    }
    return prefix + '-' + Date.now() + '-' + Math.random().toString(16).slice(2);
  }

  function createElement(tag, className, text) {
    var element = document.createElement(tag);
    if (className) element.className = className;
    if (text !== undefined && text !== null) element.textContent = String(text);
    return element;
  }

  function appendChildren(parent, children) {
    children.forEach(function (child) {
      if (child) parent.appendChild(child);
    });
    return parent;
  }

  function safeUrl(value, options) {
    var settings = options || {};
    if (!value) return '';
    var raw = String(value).trim();
    if (/^(?:https?:|mailto:|blob:)/i.test(raw)) return raw;
    if (settings.allowImageData && /^data:image\/(?:png|jpe?g|gif|webp);base64,/i.test(raw)) return raw;
    if (/^(?:\.\/|\.\.\/|\/|[A-Za-z0-9_-]+\/)/.test(raw)) return raw;
    return '';
  }

  function appendLinkedText(parent, value) {
    var text = String(value || '');
    var matcher = /(https?:\/\/[^\s<>]+|mailto:[^\s<>]+)/gi;
    var cursor = 0;
    var match;
    while ((match = matcher.exec(text))) {
      if (match.index > cursor) parent.appendChild(document.createTextNode(text.slice(cursor, match.index)));
      var url = safeUrl(match[0]);
      if (url) {
        var link = createElement('a', null, match[0]);
        link.href = url;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        parent.appendChild(link);
      } else {
        parent.appendChild(document.createTextNode(match[0]));
      }
      cursor = match.index + match[0].length;
    }
    if (cursor < text.length) parent.appendChild(document.createTextNode(text.slice(cursor)));
  }

  function formatBytes(size) {
    var bytes = Number(size);
    if (!Number.isFinite(bytes) || bytes <= 0) return '';
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / 1024 / 1024).toFixed(1) + ' MB';
  }

  function formatNow() {
    var now = new Date();
    function pad(value) { return String(value).padStart(2, '0'); }
    return now.getFullYear() + '/' + pad(now.getMonth() + 1) + '/' + pad(now.getDate()) +
      ' ' + pad(now.getHours()) + ':' + pad(now.getMinutes());
  }

  function getInitials(name) {
    return String(name || '?').trim().split(/\s+/).slice(0, 2).map(function (part) {
      return part.charAt(0).toUpperCase();
    }).join('') || '?';
  }

  function normalizeLoadMessagesResult(result) {
    if (Array.isArray(result)) return { messages: result, hasOlder: false };
    return {
      messages: result && Array.isArray(result.messages) ? result.messages : [],
      hasOlder: Boolean(result && result.hasOlder)
    };
  }

  function ChatUI(root, options) {
    if (!root || root.nodeType !== 1) throw new Error('FastRespChat.mount requires a root element.');
    this.root = root;
    this.options = Object.assign({
      assetBase: 'chat_ui/assets/',
      currentUserId: 'me',
      mobileInitialView: 'list',
      disconnectOnDestroy: true,
      callbacks: {}
    }, options || {});
    this.adapter = this.options.adapter || null;
    this.store = this.options.store || new namespace.ChatStore(this.options.initialData || {});
    this.attachments = [];
    this.objectUrls = new Set();
    this.destroyed = false;
    this.pendingDialogAction = null;
    this.forceScrollToBottom = true;
    this.mobileView = this.options.mobileInitialView === 'detail' ? 'detail' : 'list';
    this.mediaQuery = global.matchMedia ? global.matchMedia('(max-width: 768px)') : null;

    this.handleRootClickBound = this.handleRootClick.bind(this);
    this.handleSearchBound = this.handleSearch.bind(this);
    this.handleComposerSubmitBound = this.handleComposerSubmit.bind(this);
    this.handleComposerKeydownBound = this.handleComposerKeydown.bind(this);
    this.handleFileChangeBound = this.handleFileChange.bind(this);
    this.handleMediaChangeBound = this.handleMediaChange.bind(this);

    this.buildShell();
    this.bindEvents();
    this.unsubscribeStore = this.store.subscribe(this.handleStoreChange.bind(this));
    this.unsubscribeAdapter = this.adapter && typeof this.adapter.subscribe === 'function'
      ? this.adapter.subscribe(this.handleAdapterEvent.bind(this))
      : null;
    this.render();
    this.connect();
  }

  ChatUI.prototype.buildShell = function () {
    this.root.textContent = '';
    this.root.classList.add('fr-chat');
    this.root.classList.toggle('is-conversation-list', this.mobileView === 'list');
    this.root.classList.toggle('is-chat-detail', this.mobileView === 'detail');

    this.sidebar = createElement('aside', 'fr-chat-sidebar');
    this.sidebar.setAttribute('aria-label', 'Conversation navigation');
    var sidebarHeader = createElement('header', 'fr-chat-sidebar-header');
    this.tabList = createElement('nav', 'fr-chat-tabs');
    this.tabList.setAttribute('role', 'tablist');
    this.tabList.setAttribute('aria-label', 'Conversation types');
    ['chat', 'ticket', 'system'].forEach(function (tab) {
      var button = createElement('button', 'fr-chat-tab');
      button.type = 'button';
      button.dataset.chatAction = 'select-tab';
      button.dataset.tab = tab;
      button.setAttribute('role', 'tab');
      this.tabList.appendChild(button);
    }.bind(this));

    var searchLabel = createElement('label', 'fr-chat-search');
    var searchText = createElement('span', 'fr-chat-visually-hidden', 'Search conversations');
    var searchIcon = createElement('img', 'fr-chat-search-icon');
    searchIcon.src = this.options.assetBase + 'search.svg';
    searchIcon.alt = '';
    searchIcon.setAttribute('aria-hidden', 'true');
    this.searchInput = createElement('input');
    this.searchInput.type = 'search';
    this.searchInput.placeholder = 'Search chat...';
    this.searchInput.autocomplete = 'off';
    appendChildren(searchLabel, [searchText, this.searchInput, searchIcon]);
    appendChildren(sidebarHeader, [this.tabList, searchLabel]);

    this.conversationList = createElement('ol', 'fr-chat-conversation-list');
    this.conversationList.setAttribute('aria-label', 'Conversations');
    this.sidebarFooter = createElement('footer', 'fr-chat-sidebar-footer');
    appendChildren(this.sidebar, [sidebarHeader, this.conversationList, this.sidebarFooter]);

    this.main = createElement('main', 'fr-chat-main');
    this.orderHeader = createElement('header', 'fr-chat-order-header');
    this.connectionBanner = createElement('div', 'fr-chat-connection');
    this.connectionBanner.setAttribute('role', 'status');
    this.connectionBanner.setAttribute('aria-live', 'polite');
    this.messageViewport = createElement('div', 'fr-chat-message-viewport');
    this.messageList = createElement('ol', 'fr-chat-message-list');
    this.messageList.setAttribute('aria-label', 'Messages');
    this.messageViewport.appendChild(this.messageList);
    this.systemNoticeViewport = createElement('section', 'fr-chat-system-notice-viewport');
    this.systemNoticeViewport.setAttribute('aria-label', 'System notification detail');
    this.systemNoticeViewport.hidden = true;

    this.attachmentTray = createElement('section', 'fr-chat-attachment-tray');
    this.attachmentTray.setAttribute('aria-label', 'Selected attachments');
    this.composerToolbar = this.buildComposerToolbar();
    this.composer = this.buildComposer();
    appendChildren(this.main, [
      this.orderHeader,
      this.connectionBanner,
      this.messageViewport,
      this.systemNoticeViewport,
      this.attachmentTray,
      this.composerToolbar,
      this.composer
    ]);

    this.liveRegion = createElement('div', 'fr-chat-visually-hidden');
    this.liveRegion.setAttribute('role', 'status');
    this.liveRegion.setAttribute('aria-live', 'polite');
    this.actionDialog = this.buildActionDialog();
    this.previewDialog = this.buildPreviewDialog();
    appendChildren(this.root, [this.sidebar, this.main, this.liveRegion, this.actionDialog, this.previewDialog]);
  };

  ChatUI.prototype.buildComposerToolbar = function () {
    var toolbar = createElement('div', 'fr-chat-toolbar');
    var modes = createElement('div', 'fr-chat-composer-modes');
    [
      { action: 'focus-text', label: 'Text', icon: 'T' },
      { action: 'choose-image', label: 'Image', icon: '▧' },
      { action: 'choose-file', label: 'File', image: this.options.assetBase + 'file.svg' }
    ].forEach(function (item) {
      var button = createElement('button', 'fr-chat-mode-button');
      button.type = 'button';
      button.dataset.chatAction = item.action;
      button.setAttribute('aria-label', item.label);
      if (item.image) {
        var image = createElement('img');
        image.src = item.image;
        image.alt = '';
        button.appendChild(image);
      } else {
        var icon = createElement('span', null, item.icon);
        icon.setAttribute('aria-hidden', 'true');
        button.appendChild(icon);
      }
      modes.appendChild(button);
    }.bind(this));

    var actions = createElement('nav', 'fr-chat-quick-actions');
    actions.setAttribute('aria-label', 'Order actions');
    [
      { kind: 'refund', label: 'Refund' },
      { kind: 'replacement', label: 'Replacement' },
      { kind: 'close-request', label: 'Application closed' },
      { kind: 'service-intervention', label: 'Customer service' }
    ].forEach(function (item) {
      var button = createElement('button', 'fr-chat-quick-action', item.label);
      button.type = 'button';
      button.dataset.chatAction = 'create-workflow';
      button.dataset.workflowKind = item.kind;
      actions.appendChild(button);
    });

    appendChildren(toolbar, [modes, actions]);
    return toolbar;
  };

  ChatUI.prototype.buildComposer = function () {
    var form = createElement('form', 'fr-chat-composer');
    var label = createElement('label', 'fr-chat-visually-hidden', 'Message');
    label.htmlFor = this.root.id ? this.root.id + '-message' : createId('message-input');
    this.messageInput = createElement('textarea');
    this.messageInput.id = label.htmlFor;
    this.messageInput.rows = 3;
    this.messageInput.placeholder = 'Write a message...';
    this.messageInput.maxLength = 5000;
    this.sendButton = createElement('button', 'fr-chat-send-button', 'Send');
    this.sendButton.type = 'submit';
    this.imageInput = createElement('input');
    this.imageInput.type = 'file';
    this.imageInput.accept = 'image/*';
    this.imageInput.multiple = true;
    this.imageInput.hidden = true;
    this.fileInput = createElement('input');
    this.fileInput.type = 'file';
    this.fileInput.multiple = true;
    this.fileInput.hidden = true;
    appendChildren(form, [label, this.messageInput, this.sendButton, this.imageInput, this.fileInput]);
    return form;
  };

  ChatUI.prototype.buildActionDialog = function () {
    var dialog = createElement('dialog', 'fr-chat-dialog');
    var form = createElement('form');
    form.method = 'dialog';
    this.dialogTitle = createElement('h2', null, 'Confirm action');
    this.dialogMessage = createElement('p');
    this.dialogReasonLabel = createElement('label', null, 'Reason');
    this.dialogReason = createElement('textarea');
    this.dialogReason.rows = 3;
    this.dialogReason.maxLength = 500;
    this.dialogReason.placeholder = 'Enter a reason';
    this.dialogReasonLabel.appendChild(this.dialogReason);
    var actions = createElement('div', 'fr-chat-dialog-actions');
    var cancel = createElement('button', 'fr-chat-dialog-cancel', 'Cancel');
    cancel.type = 'button';
    cancel.dataset.chatAction = 'cancel-dialog';
    this.dialogConfirm = createElement('button', 'fr-chat-dialog-confirm', 'Confirm');
    this.dialogConfirm.type = 'button';
    this.dialogConfirm.dataset.chatAction = 'confirm-dialog';
    appendChildren(actions, [cancel, this.dialogConfirm]);
    appendChildren(form, [this.dialogTitle, this.dialogMessage, this.dialogReasonLabel, actions]);
    dialog.appendChild(form);
    return dialog;
  };

  ChatUI.prototype.buildPreviewDialog = function () {
    var dialog = createElement('dialog', 'fr-chat-preview-dialog');
    var close = createElement('button', 'fr-chat-preview-close', '×');
    close.type = 'button';
    close.dataset.chatAction = 'close-preview';
    close.setAttribute('aria-label', 'Close image preview');
    this.previewImage = createElement('img');
    this.previewImage.alt = '';
    appendChildren(dialog, [close, this.previewImage]);
    return dialog;
  };

  ChatUI.prototype.bindEvents = function () {
    this.root.addEventListener('click', this.handleRootClickBound);
    this.searchInput.addEventListener('input', this.handleSearchBound);
    this.composer.addEventListener('submit', this.handleComposerSubmitBound);
    this.messageInput.addEventListener('keydown', this.handleComposerKeydownBound);
    this.imageInput.addEventListener('change', this.handleFileChangeBound);
    this.fileInput.addEventListener('change', this.handleFileChangeBound);
    if (this.mediaQuery) {
      if (typeof this.mediaQuery.addEventListener === 'function') this.mediaQuery.addEventListener('change', this.handleMediaChangeBound);
      else this.mediaQuery.addListener(this.handleMediaChangeBound);
    }
  };

  ChatUI.prototype.connect = function () {
    var self = this;
    if (!this.adapter) {
      this.store.setConnectionStatus('offline');
      return;
    }
    if (typeof this.adapter.connect === 'function') {
      this.adapter.connect({ currentUserId: this.options.currentUserId })
        .then(function (result) {
          if (result && result.status) self.store.setConnectionStatus(result.status);
          return self.refreshConversations();
        })
        .catch(function (error) {
          self.store.setConnectionStatus('offline');
          self.reportError(error);
        });
    } else {
      this.refreshConversations().catch(function () {});
    }
  };

  ChatUI.prototype.refreshConversations = function () {
    var self = this;
    if (!this.adapter || typeof this.adapter.loadConversations !== 'function') return Promise.resolve([]);
    this.store.setLoading('loadingConversations', true);
    return this.adapter.loadConversations({}).then(function (result) {
      var conversations = Array.isArray(result) ? result : result && result.conversations || [];
      self.store.setConversations(conversations);
      if (result && result.tabCounts) {
        self.store.update(function (state) {
          return Object.assign({}, state, { tabCounts: result.tabCounts });
        });
      }
      return conversations;
    }).catch(function (error) {
      self.store.setLoading('loadingConversations', false);
      self.reportError(error);
      throw error;
    });
  };

  ChatUI.prototype.handleMediaChange = function () {
    if (!this.mediaQuery.matches) return;
    var selected = this.store.getState().selectedConversationId;
    this.setMobileView(selected && this.options.mobileInitialView === 'detail' ? 'detail' : 'list');
  };

  ChatUI.prototype.setMobileView = function (view) {
    this.mobileView = view === 'detail' ? 'detail' : 'list';
    this.root.classList.toggle('is-conversation-list', this.mobileView === 'list');
    this.root.classList.toggle('is-chat-detail', this.mobileView === 'detail');
  };

  ChatUI.prototype.handleStoreChange = function (next, previous) {
    if (next.selectedConversationId !== previous.selectedConversationId) this.forceScrollToBottom = true;
    this.render();
  };

  ChatUI.prototype.handleAdapterEvent = function (event) {
    if (!event || !event.type) return;
    var payload = event.payload || {};
    var conversationId = event.conversationId || payload.conversationId;
    if (event.type === 'connection.changed') {
      this.store.setConnectionStatus(payload.status || 'offline');
    } else if (event.type === 'message.created') {
      this.store.addMessage(payload);
    } else if (event.type === 'message.ack') {
      this.store.updateMessage(conversationId, payload.clientMessageId || payload.id, payload);
    } else if (event.type === 'message.status') {
      this.store.updateMessage(conversationId, payload.messageId || payload.id, { status: payload.status });
    } else if (event.type === 'workflow.updated') {
      this.store.updateWorkflow(conversationId, payload.messageId, payload.workflow);
    } else if (event.type === 'order.closed') {
      this.store.setOrderClosed(conversationId || this.store.getState().selectedConversationId, payload.closed !== false);
    } else if (event.type === 'conversation.list') {
      this.store.setConversations(payload.conversations || payload);
    } else if (event.type === 'system.notification.new' || event.type === 'system.notification.update') {
      var notice = payload.notice || payload;
      this.store.upsertSystemNotice(notice, payload.conversation);
    } else if (event.type === 'system.notification.read') {
      this.store.markSystemNoticeRead(payload.noticeId || conversationId);
    } else if (event.type === 'adapter.error') {
      this.reportError(event.error || new Error('Chat adapter error.'));
    }
  };

  ChatUI.prototype.render = function () {
    if (this.destroyed) return;
    var state = this.store.getState();
    var systemMode = state.activeTab === 'system';
    this.root.classList.toggle('is-system-view', systemMode);
    this.messageViewport.hidden = systemMode;
    this.systemNoticeViewport.hidden = !systemMode;
    this.attachmentTray.hidden = systemMode;
    this.composerToolbar.hidden = systemMode;
    this.composer.hidden = systemMode;
    this.renderTabs(state);
    this.renderConversationList(state);
    this.renderOrderHeader(state);
    this.renderConnection(state);
    if (systemMode) this.renderSystemNotice(state);
    else {
      this.renderMessages(state);
      this.renderAttachments();
    }
    this.renderComposerState(state);
  };

  ChatUI.prototype.renderTabs = function (state) {
    Array.from(this.tabList.children).forEach(function (button) {
      var tab = button.dataset.tab;
      var selected = state.activeTab === tab;
      button.textContent = TAB_LABELS[tab] + '(' + (state.tabCounts[tab] || 0) + ')';
      button.classList.toggle('is-active', selected);
      button.setAttribute('aria-selected', String(selected));
      button.tabIndex = selected ? 0 : -1;
    });
    if (this.searchInput.value !== state.searchQuery) this.searchInput.value = state.searchQuery;
  };

  ChatUI.prototype.getVisibleConversations = function (state) {
    var query = state.searchQuery.trim().toLowerCase();
    return state.conversations.filter(function (conversation) {
      if (conversation.type !== state.activeTab) return false;
      if (!query) return true;
      var participants = (conversation.participants || []).map(function (person) { return person.name; }).join(' ');
      var notice = state.systemNotices[conversation.id] || {};
      var noticeText = (notice.blocks || []).map(function (block) {
        return block && (block.text || block.label || block.name || block.url) || '';
      }).join(' ');
      return (conversation.title + ' ' + conversation.preview + ' ' + participants + ' ' + noticeText)
        .toLowerCase().indexOf(query) >= 0;
    });
  };

  ChatUI.prototype.renderConversationList = function (state) {
    var visible = this.getVisibleConversations(state);
    this.conversationList.textContent = '';
    if (!visible.length) {
      var empty = createElement('li', 'fr-chat-empty', state.loadingConversations ? 'Loading…' : 'No conversations found.');
      this.conversationList.appendChild(empty);
    }

    visible.forEach(function (conversation) {
      var item = createElement('li');
      var button = createElement('button', 'fr-chat-conversation');
      var selected = conversation.id === state.selectedConversationId;
      button.type = 'button';
      button.dataset.chatAction = 'select-conversation';
      button.dataset.conversationId = conversation.id;
      button.classList.toggle('is-active', selected);
      button.classList.toggle('is-system-notice', conversation.type === 'system');
      button.setAttribute('aria-current', selected ? 'true' : 'false');
      var title = createElement('strong', null, conversation.title);
      var preview = createElement('span', 'fr-chat-conversation-preview', conversation.preview);
      appendChildren(button, [title, preview]);
      if (conversation.type !== 'system') {
        var meta = createElement('span', 'fr-chat-conversation-meta');
        (conversation.participants || []).forEach(function (person, index) {
          if (index) meta.appendChild(document.createTextNode(', '));
          var name = createElement('span', null, person.name);
          name.dataset.role = person.role || 'customer';
          meta.appendChild(name);
        });
        button.appendChild(meta);
      }
      if (conversation.unread) {
        var unread = createElement('span', 'fr-chat-unread', conversation.type === 'system' ? '' : (conversation.unread > 99 ? '99+' : conversation.unread));
        unread.classList.toggle('is-dot', conversation.type === 'system');
        unread.setAttribute('aria-label', conversation.type === 'system' ? 'Unread notification' : conversation.unread + ' unread messages');
        button.appendChild(unread);
      }
      item.appendChild(button);
      this.conversationList.appendChild(item);
    }.bind(this));

    this.sidebarFooter.textContent = '';
    var loading = createElement('span', 'fr-chat-loading', state.loadingConversations ? 'loading' : 'loading');
    var dots = createElement('span', 'fr-chat-loading-dots');
    dots.setAttribute('aria-hidden', 'true');
    this.sidebarFooter.appendChild(dots);
    this.sidebarFooter.appendChild(loading);
  };

  ChatUI.prototype.getSelectedConversation = function (state) {
    return state.conversations.find(function (conversation) {
      return conversation.id === state.selectedConversationId;
    }) || null;
  };

  ChatUI.prototype.renderOrderHeader = function (state) {
    var conversation = this.getSelectedConversation(state);
    var order = conversation && conversation.order;
    var systemMode = state.activeTab === 'system';
    this.orderHeader.textContent = '';
    this.orderHeader.classList.toggle('is-system-notice-header', systemMode);

    var back = createElement('button', 'fr-chat-mobile-back', '‹');
    back.type = 'button';
    back.dataset.chatAction = 'show-conversations';
    back.setAttribute('aria-label', 'Back to conversations');
    this.orderHeader.appendChild(back);

    var details = createElement('div', 'fr-chat-order-details');
    var notice = conversation && state.systemNotices[conversation.id];
    var headingText = systemMode
      ? (notice && notice.title || conversation && conversation.title || 'Select a system notification')
      : (order ? '工单 - 订单 #' + order.id : (conversation ? conversation.title : 'Select a conversation'));
    var heading = createElement('h1', null, headingText);
    details.appendChild(heading);

    if (order && !systemMode) {
      var meta = createElement('div', 'fr-chat-order-meta');
      var product = createElement('strong', 'fr-chat-order-product');
      var productIcon = createElement('span', null, '▰');
      productIcon.setAttribute('aria-hidden', 'true');
      product.appendChild(productIcon);
      product.appendChild(document.createTextNode(order.title));
      appendChildren(meta, [
        product,
        createElement('span', null, 'Number: ' + order.number),
        createElement('span', null, 'Amount: ' + order.amount),
        createElement('span', null, 'Quantity: ' + order.quantity),
        createElement('time', null, 'Time: ' + order.time)
      ]);
      details.appendChild(meta);
      var close = createElement('button', 'fr-chat-close-order', order.closed ? 'Order closed' : 'Close order');
      close.type = 'button';
      close.dataset.chatAction = 'close-order';
      close.disabled = Boolean(order.closed);
      appendChildren(this.orderHeader, [details, close]);
    } else {
      this.orderHeader.appendChild(details);
    }
  };

  ChatUI.prototype.renderConnection = function (state) {
    var status = state.connectionStatus;
    this.connectionBanner.dataset.status = status;
    if (state.activeTab === 'system' || status === 'online' || status === 'idle') {
      this.connectionBanner.textContent = '';
      this.connectionBanner.hidden = true;
      return;
    }
    this.connectionBanner.hidden = false;
    this.connectionBanner.textContent = status === 'connecting'
      ? 'Connecting…'
      : status === 'reconnecting' ? 'Connection lost. Reconnecting…' : 'Offline. Messages can be retried when the connection returns.';
  };

  ChatUI.prototype.renderMessages = function (state) {
    var conversationId = state.selectedConversationId;
    var list = conversationId ? (state.messages[conversationId] || []) : [];
    var oldHeight = this.messageViewport.scrollHeight;
    var oldTop = this.messageViewport.scrollTop;
    var nearBottom = oldHeight - oldTop - this.messageViewport.clientHeight < 90;
    this.messageList.textContent = '';

    if (state.loadingMessages && !list.length) {
      this.messageList.appendChild(createElement('li', 'fr-chat-message-loading', 'Loading messages…'));
    } else if (!conversationId) {
      this.messageList.appendChild(createElement('li', 'fr-chat-message-loading', 'Select a conversation to start.'));
    } else {
      if (state.hasOlderMessages && list.length) {
        var olderItem = createElement('li', 'fr-chat-load-older-item');
        var older = createElement('button', 'fr-chat-load-older', state.loadingOlderMessages ? 'Loading…' : 'Load earlier messages');
        older.type = 'button';
        older.dataset.chatAction = 'load-older';
        older.disabled = state.loadingOlderMessages;
        olderItem.appendChild(older);
        this.messageList.appendChild(olderItem);
      }
      list.forEach(function (message) {
        this.messageList.appendChild(this.renderMessage(message));
      }.bind(this));
    }

    global.requestAnimationFrame(function () {
      if (this.destroyed) return;
      if (this.forceScrollToBottom || nearBottom) this.messageViewport.scrollTop = this.messageViewport.scrollHeight;
      else this.messageViewport.scrollTop = oldTop + (this.messageViewport.scrollHeight - oldHeight);
      this.forceScrollToBottom = false;
    }.bind(this));
  };

  ChatUI.prototype.renderMessage = function (message) {
    if (message.kind === 'system' || message.direction === 'center') return this.renderSystemMessage(message);

    var item = createElement('li', 'fr-chat-message');
    item.dataset.kind = message.kind || 'text';
    item.dataset.direction = message.direction || 'incoming';
    item.dataset.status = message.status || 'sent';
    item.dataset.senderRole = message.sender && message.sender.role || 'customer';
    item.dataset.messageId = message.id || message.clientMessageId || '';
    var article = createElement('article');
    var participant = this.renderParticipant(message.sender);
    var content = createElement('div', 'fr-chat-message-content');
    content.appendChild(this.renderBubble(message));

    var meta = createElement('div', 'fr-chat-message-meta');
    var time = createElement('time', null, message.sentAt || '');
    meta.appendChild(time);
    if (message.direction === 'outgoing') {
      var status = createElement('span', 'fr-chat-message-status', STATUS_LABELS[message.status] || '');
      status.dataset.status = message.status || 'sent';
      meta.appendChild(status);
      if (message.status === 'failed') {
        var retry = createElement('button', 'fr-chat-retry', 'Retry');
        retry.type = 'button';
        retry.dataset.chatAction = 'retry-message';
        retry.dataset.messageId = message.id || message.clientMessageId;
        meta.appendChild(retry);
      }
    }
    content.appendChild(meta);

    if (message.direction === 'outgoing') appendChildren(article, [content, participant]);
    else appendChildren(article, [participant, content]);
    item.appendChild(article);
    return item;
  };

  ChatUI.prototype.renderSystemMessage = function (message) {
    var item = createElement('li', 'fr-chat-system-message');
    var text = createElement('p', null, message.content && message.content.text || '');
    var time = createElement('time', null, message.sentAt || '');
    appendChildren(item, [text, time]);
    return item;
  };

  ChatUI.prototype.renderSystemNotice = function (state) {
    var conversation = this.getSelectedConversation(state);
    var notice = conversation && state.systemNotices[conversation.id];
    this.systemNoticeViewport.textContent = '';

    if (!conversation || conversation.type !== 'system') {
      this.systemNoticeViewport.appendChild(createElement('p', 'fr-chat-system-notice-empty', 'Select a system notification to view.'));
      return;
    }
    if (!notice) {
      this.systemNoticeViewport.appendChild(createElement('p', 'fr-chat-system-notice-empty', state.loadingMessages ? 'Loading notification…' : 'Notification content is unavailable.'));
      return;
    }

    var article = createElement('article', 'fr-chat-system-notice-detail');
    var body = createElement('div', 'fr-chat-system-notice-body');
    (notice.blocks || []).forEach(function (block) {
      if (!block || !block.type) return;
      if (block.type === 'paragraph') {
        var paragraph = createElement('p');
        appendLinkedText(paragraph, block.text || '');
        body.appendChild(paragraph);
      } else if (block.type === 'image') {
        var imageUrl = safeUrl(block.url, { allowImageData: true });
        if (!imageUrl) return;
        var preview = createElement('button', 'fr-chat-system-notice-image');
        preview.type = 'button';
        preview.dataset.chatAction = 'preview-image';
        preview.dataset.imageUrl = safeUrl(block.previewUrl || block.url, { allowImageData: true });
        preview.setAttribute('aria-label', 'Preview ' + (block.alt || 'notification image'));
        var image = createElement('img');
        image.src = imageUrl;
        image.alt = block.alt || 'System notification image';
        image.loading = 'lazy';
        preview.appendChild(image);
        body.appendChild(preview);
      } else if (block.type === 'link') {
        var linkUrl = safeUrl(block.url);
        if (!linkUrl) return;
        var link = createElement('a', 'fr-chat-system-notice-link', block.label || block.url);
        link.href = linkUrl;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        body.appendChild(link);
      } else if (block.type === 'file') {
        var fileUrl = safeUrl(block.url);
        if (!fileUrl) return;
        var file = createElement('a', 'fr-chat-system-notice-file');
        file.href = fileUrl;
        file.target = '_blank';
        file.rel = 'noopener noreferrer';
        file.download = block.download === false ? '' : (block.name || '');
        appendChildren(file, [
          createElement('strong', null, block.name || 'Download attachment'),
          createElement('span', null, formatBytes(block.size))
        ]);
        body.appendChild(file);
      }
    });

    var footer = createElement('footer', 'fr-chat-system-notice-footer');
    footer.appendChild(createElement('strong', null, notice.publisher || 'FASTRESP Team'));
    footer.appendChild(createElement('time', null, notice.publishedAtLabel || notice.publishedAt || ''));
    appendChildren(article, [body, footer]);
    this.systemNoticeViewport.appendChild(article);
  };

  ChatUI.prototype.renderParticipant = function (person) {
    var participant = createElement('div', 'fr-chat-participant');
    participant.dataset.role = person && person.role || 'customer';
    var avatar = createElement('span', 'fr-chat-avatar');
    if (person && safeUrl(person.avatarUrl, { allowImageData: true })) {
      var image = createElement('img');
      image.src = safeUrl(person.avatarUrl, { allowImageData: true });
      image.alt = person.name ? person.name + ' avatar' : 'User avatar';
      image.loading = 'lazy';
      avatar.appendChild(image);
    } else {
      avatar.textContent = getInitials(person && person.name);
    }
    if (person && person.presence) {
      var presence = createElement('span', 'fr-chat-presence');
      presence.dataset.presence = person.presence;
      presence.setAttribute('aria-label', person.presence);
      avatar.appendChild(presence);
    }
    var name = createElement('span', 'fr-chat-participant-name', person && person.name || 'Unknown');
    appendChildren(participant, [avatar, name]);
    return participant;
  };

  ChatUI.prototype.renderBubble = function (message) {
    if (message.kind === 'image') return this.renderImageBubble(message);
    if (message.kind === 'file') return this.renderFileBubble(message);
    if (WORKFLOW_LABELS[message.kind]) return this.renderWorkflowBubble(message);
    var bubble = createElement('div', 'fr-chat-bubble fr-chat-text-bubble');
    var paragraph = createElement('p');
    appendLinkedText(paragraph, message.content && message.content.text || '');
    bubble.appendChild(paragraph);
    return bubble;
  };

  ChatUI.prototype.renderImageBubble = function (message) {
    var button = createElement('button', 'fr-chat-image-bubble');
    button.type = 'button';
    button.dataset.chatAction = 'preview-image';
    button.dataset.imageUrl = safeUrl(message.content && (message.content.previewUrl || message.content.url), { allowImageData: true });
    button.setAttribute('aria-label', 'Preview image');
    var image = createElement('img');
    image.src = safeUrl(message.content && message.content.url, { allowImageData: true });
    image.alt = message.content && message.content.alt || 'Chat image';
    image.loading = 'lazy';
    button.appendChild(image);
    return button;
  };

  ChatUI.prototype.renderFileBubble = function (message) {
    var content = message.content || {};
    var url = safeUrl(content.url);
    var link = createElement(url ? 'a' : 'span', 'fr-chat-file-bubble');
    if (url) {
      link.href = url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.download = content.name || '';
    }
    var fileIcon = createElement('img');
    fileIcon.src = this.options.assetBase + 'file.svg';
    fileIcon.alt = '';
    var nameWrap = createElement('span', 'fr-chat-file-name');
    nameWrap.appendChild(createElement('strong', null, content.name || 'File'));
    var size = formatBytes(content.size);
    if (size) nameWrap.appendChild(createElement('small', null, size));
    var download = createElement('img');
    download.src = this.options.assetBase + 'download.svg';
    download.alt = '';
    appendChildren(link, [fileIcon, nameWrap, download]);
    return link;
  };

  ChatUI.prototype.renderWorkflowBubble = function (message) {
    var card = createElement('div', 'fr-chat-bubble fr-chat-workflow-card');
    var content = message.content || {};
    card.dataset.workflowKind = message.kind;
    card.dataset.workflowState = message.workflow && message.workflow.state || '';
    var title = createElement('p', 'fr-chat-workflow-title');
    var prefix = createElement('strong', null, '【' + WORKFLOW_LABELS[message.kind] + '】');
    title.appendChild(prefix);
    title.appendChild(document.createTextNode(content.title || ''));
    card.appendChild(title);

    if (message.kind === 'refund' || message.kind === 'replacement') {
      var issue = createElement('p', 'fr-chat-workflow-line');
      issue.appendChild(document.createTextNode((content.issueLabel || '问题信息') + ': '));
      var issueFile = content.issueFile;
      if (issueFile && safeUrl(issueFile.url)) {
        var issueLink = createElement('a', null, issueFile.name || '下载');
        issueLink.href = safeUrl(issueFile.url);
        issueLink.target = '_blank';
        issueLink.rel = 'noopener noreferrer';
        issueLink.download = issueFile.name || '';
        var downloadIcon = createElement('img');
        downloadIcon.src = this.options.assetBase + 'download.svg';
        downloadIcon.alt = '';
        issue.appendChild(issueLink);
        issue.appendChild(downloadIcon);
      }
      card.appendChild(issue);
      var amounts = createElement('p', 'fr-chat-workflow-line');
      amounts.appendChild(createElement('span', null, '退款数量：' + content.quantity));
      amounts.appendChild(createElement('span', null, '退款金额：' + content.amount));
      card.appendChild(amounts);
      card.appendChild(createElement('p', 'fr-chat-workflow-line', '理由: ' + (content.reason || '')));
    }

    var workflow = message.workflow;
    if (workflow && (workflow.state === 'actionable' || workflow.state === 'submitting')) {
      var actions = createElement('div', 'fr-chat-workflow-actions');
      var accept = createElement('button', 'fr-chat-accept', workflow.state === 'submitting' ? 'Processing…' : '◉ Accept');
      accept.type = 'button';
      accept.dataset.chatAction = 'workflow-accept';
      accept.dataset.messageId = message.id;
      accept.disabled = workflow.state === 'submitting';
      var reject = createElement('button', 'fr-chat-refuse', '⊗ Refused');
      reject.type = 'button';
      reject.dataset.chatAction = 'workflow-reject';
      reject.dataset.messageId = message.id;
      reject.disabled = workflow.state === 'submitting';
      appendChildren(actions, [accept, reject]);
      card.appendChild(actions);
    } else if (workflow && (
      workflow.state === 'accepted' ||
      workflow.state === 'rejected' ||
      workflow.state === 'expired'
    )) {
      var result = createElement('p', 'fr-chat-workflow-result');
      result.appendChild(document.createTextNode((workflow.actorName || 'Quick Store') + ': '));
      var resultLabel = workflow.state === 'accepted'
        ? '⊙ 已同意'
        : workflow.state === 'rejected' ? '⊗ 已拒绝' : '已失效';
      var state = createElement('strong', null, resultLabel);
      state.dataset.result = workflow.state;
      result.appendChild(state);
      if (workflow.rejectionReason) {
        result.appendChild(document.createTextNode('　理由: '));
        result.appendChild(createElement('em', null, workflow.rejectionReason));
      }
      card.appendChild(result);
    }
    return card;
  };

  ChatUI.prototype.renderAttachments = function () {
    this.attachmentTray.textContent = '';
    this.attachmentTray.hidden = this.attachments.length === 0;
    this.attachments.forEach(function (attachment, index) {
      var item = createElement('article', 'fr-chat-attachment');
      if (attachment.kind === 'image') {
        var image = createElement('img');
        image.src = attachment.localUrl;
        image.alt = attachment.file.name;
        item.appendChild(image);
      } else {
        var icon = createElement('img');
        icon.src = this.options.assetBase + 'file.svg';
        icon.alt = '';
        item.appendChild(icon);
      }
      item.appendChild(createElement('span', null, attachment.file.name));
      var progress = createElement('small', null, attachment.progress ? attachment.progress + '%' : formatBytes(attachment.file.size));
      item.appendChild(progress);
      var remove = createElement('button', null, '×');
      remove.type = 'button';
      remove.dataset.chatAction = 'remove-attachment';
      remove.dataset.attachmentIndex = index;
      remove.setAttribute('aria-label', 'Remove ' + attachment.file.name);
      item.appendChild(remove);
      this.attachmentTray.appendChild(item);
    }.bind(this));
  };

  ChatUI.prototype.renderComposerState = function (state) {
    var conversation = this.getSelectedConversation(state);
    var closed = Boolean(conversation && conversation.order && conversation.order.closed);
    var readOnly = state.activeTab === 'system';
    this.messageInput.disabled = readOnly || closed || !conversation;
    this.sendButton.disabled = readOnly || closed || !conversation;
    this.imageInput.disabled = readOnly || closed || !conversation;
    this.fileInput.disabled = readOnly || closed || !conversation;
    Array.from(this.composerToolbar.querySelectorAll('.fr-chat-composer-modes button')).forEach(function (button) {
      button.disabled = readOnly || closed || !conversation;
    });
    Array.from(this.composerToolbar.querySelectorAll('.fr-chat-quick-actions button')).forEach(function (button) {
      button.disabled = readOnly || closed || !conversation || !conversation.order;
    });
    this.messageInput.placeholder = readOnly ? 'System notifications are read-only.' : (closed ? 'This order is closed.' : 'Write a message...');
  };

  ChatUI.prototype.handleSearch = function () {
    this.store.setSearchQuery(this.searchInput.value);
  };

  ChatUI.prototype.handleComposerKeydown = function (event) {
    if (event.key === 'Enter' && !event.shiftKey && !event.isComposing) {
      event.preventDefault();
      if (typeof this.composer.requestSubmit === 'function') this.composer.requestSubmit();
      else this.handleComposerSubmit(event);
    }
  };

  ChatUI.prototype.handleFileChange = function (event) {
    Array.from(event.target.files || []).forEach(function (file) {
      var kind = file.type && file.type.indexOf('image/') === 0 ? 'image' : 'file';
      var localUrl = URL.createObjectURL(file);
      this.objectUrls.add(localUrl);
      this.attachments.push({ file: file, kind: kind, localUrl: localUrl, progress: 0 });
    }.bind(this));
    event.target.value = '';
    this.renderAttachments();
  };

  ChatUI.prototype.handleComposerSubmit = function (event) {
    if (event && typeof event.preventDefault === 'function') event.preventDefault();
    var state = this.store.getState();
    var conversation = this.getSelectedConversation(state);
    if (state.activeTab === 'system' || !conversation || (conversation.order && conversation.order.closed)) return;
    var text = this.messageInput.value.trim();
    var attachments = this.attachments.slice();
    if (!text && !attachments.length) {
      this.announce('Enter a message or select a file.');
      this.messageInput.focus();
      return;
    }
    this.messageInput.value = '';
    this.attachments = [];
    this.renderAttachments();
    if (text) this.sendMessage(this.createOutgoingMessage('text', { text: text })).catch(function () {});
    attachments.forEach(function (attachment) { this.sendAttachment(attachment); }.bind(this));
  };

  ChatUI.prototype.getCurrentSender = function () {
    var state = this.store.getState();
    var conversation = this.getSelectedConversation(state);
    var person = conversation && (conversation.participants || []).find(function (participant) {
      return participant.id === this.options.currentUserId;
    }.bind(this));
    return person || {
      id: this.options.currentUserId,
      name: 'Me',
      role: 'me',
      avatarUrl: this.options.assetBase + 'avatar-me-3.png',
      presence: 'online'
    };
  };

  ChatUI.prototype.createOutgoingMessage = function (kind, content, extra) {
    var clientMessageId = createId('client');
    return Object.assign({
      id: clientMessageId,
      clientMessageId: clientMessageId,
      conversationId: this.store.getState().selectedConversationId,
      kind: kind,
      direction: 'outgoing',
      sender: this.getCurrentSender(),
      sentAt: formatNow(),
      status: 'pending',
      content: content || {}
    }, extra || {});
  };

  ChatUI.prototype.sendMessage = function (message) {
    var self = this;
    this.forceScrollToBottom = true;
    this.store.addMessage(message);
    this.emitHost('send', { message: message });
    if (!this.adapter || typeof this.adapter.sendMessage !== 'function') {
      this.store.updateMessage(message.conversationId, message.clientMessageId, { status: 'failed' });
      return Promise.reject(new Error('No sendMessage adapter is configured.'));
    }
    return this.adapter.sendMessage(message).then(function (result) {
      self.store.updateMessage(message.conversationId, message.clientMessageId, {
        id: result && result.id || message.id,
        status: result && result.status || 'sent',
        sentAt: result && result.sentAt || message.sentAt,
        content: result && result.content || message.content
      });
      return result;
    }).catch(function (error) {
      self.store.updateMessage(message.conversationId, message.clientMessageId, { status: 'failed' });
      self.reportError(error);
      throw error;
    });
  };

  ChatUI.prototype.sendAttachment = function (attachment) {
    var self = this;
    var content = {
      name: attachment.file.name,
      size: attachment.file.size,
      mimeType: attachment.file.type,
      url: attachment.localUrl,
      previewUrl: attachment.localUrl,
      alt: attachment.file.name
    };
    var message = this.createOutgoingMessage(attachment.kind, content);
    this.forceScrollToBottom = true;
    this.store.addMessage(message);
    if (!this.adapter || typeof this.adapter.uploadAttachment !== 'function') {
      this.store.updateMessage(message.conversationId, message.clientMessageId, { status: 'failed' });
      return;
    }
    this.adapter.uploadAttachment(attachment.file, function (progress) {
      attachment.progress = progress;
    }).then(function (uploaded) {
      var nextMessage = Object.assign({}, message, {
        content: Object.assign({}, content, uploaded),
        status: 'pending'
      });
      self.store.updateMessage(message.conversationId, message.clientMessageId, { content: nextMessage.content });
      return self.adapter.sendMessage(nextMessage);
    }).then(function (result) {
      self.store.updateMessage(message.conversationId, message.clientMessageId, {
        id: result && result.id || message.id,
        status: result && result.status || 'sent',
        content: result && result.content || message.content
      });
    }).catch(function (error) {
      self.store.updateMessage(message.conversationId, message.clientMessageId, { status: 'failed' });
      self.reportError(error);
    });
  };

  ChatUI.prototype.handleRootClick = function (event) {
    var target = event.target.closest('[data-chat-action]');
    if (!target || !this.root.contains(target)) return;
    var action = target.dataset.chatAction;
    if (action === 'select-tab') this.selectTab(target.dataset.tab);
    else if (action === 'select-conversation') this.selectConversation(target.dataset.conversationId);
    else if (action === 'show-conversations') this.setMobileView('list');
    else if (action === 'focus-text') this.messageInput.focus();
    else if (action === 'choose-image') this.imageInput.click();
    else if (action === 'choose-file') this.fileInput.click();
    else if (action === 'remove-attachment') this.removeAttachment(Number(target.dataset.attachmentIndex));
    else if (action === 'preview-image') this.openImagePreview(target.dataset.imageUrl, target.querySelector('img'));
    else if (action === 'close-preview') this.closeDialog(this.previewDialog);
    else if (action === 'workflow-accept') this.performWorkflowAction(target.dataset.messageId, 'accept');
    else if (action === 'workflow-reject') this.openRejectDialog(target.dataset.messageId);
    else if (action === 'create-workflow') this.openCreateWorkflowDialog(target.dataset.workflowKind);
    else if (action === 'close-order') this.openCloseOrderDialog();
    else if (action === 'cancel-dialog') this.closeDialog(this.actionDialog);
    else if (action === 'confirm-dialog') this.confirmDialogAction();
    else if (action === 'retry-message') this.retryMessage(target.dataset.messageId);
    else if (action === 'load-older') this.loadOlderMessages();
  };

  ChatUI.prototype.selectTab = function (tab) {
    if (!TAB_LABELS[tab]) return;
    this.store.setActiveTab(tab);
    var state = this.store.getState();
    var first = this.getVisibleConversations(state)[0];
    if (first) this.selectConversation(first.id);
  };

  ChatUI.prototype.selectConversation = function (conversationId) {
    var self = this;
    var conversation = this.store.getState().conversations.find(function (item) {
      return item.id === conversationId;
    });
    this.store.selectConversation(conversationId);
    this.setMobileView('detail');
    this.emitHost('conversationchange', { conversationId: conversationId });
    if (conversation && conversation.type === 'system') {
      var loadNotice = this.adapter && typeof this.adapter.loadSystemNotice === 'function'
        ? this.adapter.loadSystemNotice({ noticeId: conversationId })
        : Promise.resolve(this.store.getState().systemNotices[conversationId]);
      loadNotice.then(function (notice) {
        if (notice) self.store.setSystemNotice(conversationId, notice.notice || notice);
        else self.store.setLoading('loadingMessages', false);
      }).catch(function (error) {
        self.store.setLoading('loadingMessages', false);
        self.reportError(error);
      });
      if (this.adapter && typeof this.adapter.markSystemNoticeRead === 'function') {
        this.adapter.markSystemNoticeRead(conversationId).catch(function (error) {
          self.reportError(error);
        });
      }
      return;
    }
    if (this.adapter && typeof this.adapter.loadMessages === 'function') {
      this.adapter.loadMessages({ conversationId: conversationId }).then(function (result) {
        var normalized = normalizeLoadMessagesResult(result);
        self.store.setMessages(conversationId, normalized.messages, { hasOlder: normalized.hasOlder });
        var last = normalized.messages[normalized.messages.length - 1];
        if (last && self.adapter && typeof self.adapter.markRead === 'function') {
          self.adapter.markRead(conversationId, last.id).catch(function () {});
        }
      }).catch(function (error) {
        self.store.setLoading('loadingMessages', false);
        self.reportError(error);
      });
    } else {
      this.store.setLoading('loadingMessages', false);
    }
  };

  ChatUI.prototype.loadOlderMessages = function () {
    var self = this;
    var state = this.store.getState();
    var conversationId = state.selectedConversationId;
    var current = state.messages[conversationId] || [];
    if (!conversationId || !this.adapter || typeof this.adapter.loadMessages !== 'function') return;
    this.store.setLoading('loadingOlderMessages', true);
    this.adapter.loadMessages({
      conversationId: conversationId,
      before: current.length ? current[0].id : null
    }).then(function (result) {
      var normalized = normalizeLoadMessagesResult(result);
      self.store.setMessages(conversationId, normalized.messages, {
        prepend: true,
        hasOlder: normalized.hasOlder
      });
    }).catch(function (error) {
      self.store.setLoading('loadingOlderMessages', false);
      self.reportError(error);
    });
  };

  ChatUI.prototype.removeAttachment = function (index) {
    var attachment = this.attachments[index];
    if (!attachment) return;
    this.attachments.splice(index, 1);
    if (attachment.localUrl) {
      URL.revokeObjectURL(attachment.localUrl);
      this.objectUrls.delete(attachment.localUrl);
    }
    this.renderAttachments();
  };

  ChatUI.prototype.openImagePreview = function (url, sourceImage) {
    var safe = safeUrl(url, { allowImageData: true });
    if (!safe) return;
    this.previewImage.src = safe;
    this.previewImage.alt = sourceImage && sourceImage.alt || 'Image preview';
    this.openDialog(this.previewDialog);
  };

  ChatUI.prototype.openRejectDialog = function (messageId) {
    this.pendingDialogAction = { type: 'reject-workflow', messageId: messageId };
    this.dialogTitle.textContent = 'Refuse application';
    this.dialogMessage.textContent = 'Please provide a reason for the refusal.';
    this.dialogReasonLabel.hidden = false;
    this.dialogReason.required = true;
    this.dialogReason.value = '';
    this.dialogConfirm.textContent = 'Refused';
    this.openDialog(this.actionDialog);
    global.setTimeout(function () { this.dialogReason.focus(); }.bind(this), 0);
  };

  ChatUI.prototype.openCreateWorkflowDialog = function (kind) {
    this.pendingDialogAction = { type: 'create-workflow', kind: kind };
    this.dialogTitle.textContent = WORKFLOW_LABELS[kind] || 'Order application';
    this.dialogMessage.textContent = kind === 'service-intervention'
      ? 'Request platform customer service intervention?'
      : 'Describe the reason for this application.';
    this.dialogReasonLabel.hidden = kind === 'service-intervention';
    this.dialogReason.required = kind !== 'service-intervention';
    this.dialogReason.value = '';
    this.dialogConfirm.textContent = 'Send application';
    this.openDialog(this.actionDialog);
  };

  ChatUI.prototype.openCloseOrderDialog = function () {
    this.pendingDialogAction = { type: 'close-order' };
    this.dialogTitle.textContent = 'Close order';
    this.dialogMessage.textContent = 'Are you sure you want to close this order? The composer will be disabled.';
    this.dialogReasonLabel.hidden = true;
    this.dialogReason.required = false;
    this.dialogReason.value = '';
    this.dialogConfirm.textContent = 'Close order';
    this.openDialog(this.actionDialog);
  };

  ChatUI.prototype.confirmDialogAction = function () {
    var pending = this.pendingDialogAction;
    if (!pending) return;
    var reason = this.dialogReason.value.trim();
    if (this.dialogReason.required && !reason) {
      this.dialogReason.focus();
      this.announce('A reason is required.');
      return;
    }
    this.closeDialog(this.actionDialog);
    this.pendingDialogAction = null;
    if (pending.type === 'reject-workflow') this.performWorkflowAction(pending.messageId, 'reject', reason);
    else if (pending.type === 'create-workflow') this.createWorkflowMessage(pending.kind, reason);
    else if (pending.type === 'close-order') this.closeOrder();
  };

  ChatUI.prototype.createWorkflowMessage = function (kind, reason) {
    var titles = {
      refund: '买家申请退款',
      replacement: '买家申请换货',
      'close-request': '买家请求关闭订单',
      'service-intervention': '买家请求平台客服介入处理'
    };
    var content = { title: titles[kind] || '', reason: reason };
    if (kind === 'refund' || kind === 'replacement') {
      content.issueLabel = '问题信息';
      content.issueFile = null;
      content.quantity = 1;
      content.amount = '$18.00';
    }
    var message = this.createOutgoingMessage(kind, content, {
      workflow: kind === 'service-intervention' ? null : {
        state: 'actionable',
        actorName: 'Quick Store',
        rejectionReason: ''
      }
    });
    this.forceScrollToBottom = true;
    if (this.adapter && typeof this.adapter.performBusinessAction === 'function') {
      this.adapter.performBusinessAction({
        action: 'create-workflow',
        conversationId: message.conversationId,
        message: message
      }).catch(this.reportError.bind(this));
    } else {
      this.sendMessage(message).catch(function () {});
    }
    this.emitHost('businessaction', { action: 'create-workflow', message: message });
  };

  ChatUI.prototype.findMessage = function (messageId) {
    var state = this.store.getState();
    var list = state.messages[state.selectedConversationId] || [];
    return list.find(function (message) {
      return message.id === messageId || message.clientMessageId === messageId;
    });
  };

  ChatUI.prototype.performWorkflowAction = function (messageId, action, reason) {
    var self = this;
    var state = this.store.getState();
    var conversationId = state.selectedConversationId;
    var message = this.findMessage(messageId);
    if (!message || !message.workflow || message.workflow.state !== 'actionable') return;
    this.store.updateWorkflow(conversationId, messageId, { state: 'submitting' });
    this.emitHost('businessaction', { action: action, message: message, reason: reason || '' });
    if (!this.adapter || typeof this.adapter.performBusinessAction !== 'function') {
      this.store.updateWorkflow(conversationId, messageId, { state: 'actionable' });
      return;
    }
    this.adapter.performBusinessAction({
      action: action,
      conversationId: conversationId,
      messageId: messageId,
      reason: reason || '',
      actorName: 'Quick Store'
    }).then(function (workflow) {
      self.store.updateWorkflow(conversationId, messageId, workflow);
    }).catch(function (error) {
      self.store.updateWorkflow(conversationId, messageId, { state: 'actionable' });
      self.reportError(error);
    });
  };

  ChatUI.prototype.closeOrder = function () {
    var self = this;
    var conversationId = this.store.getState().selectedConversationId;
    if (!this.adapter || typeof this.adapter.performBusinessAction !== 'function') return;
    this.adapter.performBusinessAction({ action: 'close-order', conversationId: conversationId }).then(function () {
      self.store.setOrderClosed(conversationId, true);
      self.announce('Order closed.');
    }).catch(this.reportError.bind(this));
  };

  ChatUI.prototype.retryMessage = function (messageId) {
    var message = this.findMessage(messageId);
    if (!message || message.status !== 'failed') return;
    this.store.updateMessage(message.conversationId, messageId, { status: 'pending' });
    this.sendMessage(Object.assign({}, message, { status: 'pending' })).catch(function () {});
  };

  ChatUI.prototype.openDialog = function (dialog) {
    if (typeof dialog.showModal === 'function') dialog.showModal();
    else dialog.setAttribute('open', '');
  };

  ChatUI.prototype.closeDialog = function (dialog) {
    if (typeof dialog.close === 'function') dialog.close();
    else dialog.removeAttribute('open');
  };

  ChatUI.prototype.announce = function (message) {
    this.liveRegion.textContent = '';
    global.setTimeout(function () { this.liveRegion.textContent = message; }.bind(this), 0);
  };

  ChatUI.prototype.emitHost = function (name, detail) {
    this.root.dispatchEvent(new CustomEvent('fastrespchat:' + name, { detail: detail }));
    var callbacks = this.options.callbacks || {};
    var callbackName = CALLBACK_NAMES[name] || ('on' + name.charAt(0).toUpperCase() + name.slice(1));
    if (typeof callbacks[callbackName] === 'function') callbacks[callbackName](detail, this);
    if (typeof callbacks.onEvent === 'function') callbacks.onEvent(name, detail, this);
  };

  ChatUI.prototype.reportError = function (error) {
    var normalized = error instanceof Error ? error : new Error(String(error || 'Unknown chat error.'));
    this.store.setError(normalized.message);
    this.announce(normalized.message);
    this.emitHost('error', { error: normalized });
  };

  ChatUI.prototype.setAdapter = function (adapter) {
    if (this.unsubscribeAdapter) this.unsubscribeAdapter();
    if (this.adapter && typeof this.adapter.disconnect === 'function') this.adapter.disconnect();
    this.adapter = adapter;
    this.unsubscribeAdapter = adapter && typeof adapter.subscribe === 'function'
      ? adapter.subscribe(this.handleAdapterEvent.bind(this))
      : null;
    this.connect();
  };

  ChatUI.prototype.selectConversationById = function (conversationId) {
    this.selectConversation(conversationId);
  };

  ChatUI.prototype.updateOptions = function (options) {
    this.options = Object.assign({}, this.options, options || {});
    this.render();
  };

  ChatUI.prototype.destroy = function () {
    if (this.destroyed) return;
    this.destroyed = true;
    this.root.removeEventListener('click', this.handleRootClickBound);
    this.searchInput.removeEventListener('input', this.handleSearchBound);
    this.composer.removeEventListener('submit', this.handleComposerSubmitBound);
    this.messageInput.removeEventListener('keydown', this.handleComposerKeydownBound);
    this.imageInput.removeEventListener('change', this.handleFileChangeBound);
    this.fileInput.removeEventListener('change', this.handleFileChangeBound);
    if (this.mediaQuery) {
      if (typeof this.mediaQuery.removeEventListener === 'function') this.mediaQuery.removeEventListener('change', this.handleMediaChangeBound);
      else this.mediaQuery.removeListener(this.handleMediaChangeBound);
    }
    if (this.unsubscribeStore) this.unsubscribeStore();
    if (this.unsubscribeAdapter) this.unsubscribeAdapter();
    if (this.options.disconnectOnDestroy && this.adapter && typeof this.adapter.disconnect === 'function') {
      this.adapter.disconnect();
    }
    this.objectUrls.forEach(function (url) { URL.revokeObjectURL(url); });
    this.objectUrls.clear();
    this.root.textContent = '';
    this.root.classList.remove('fr-chat', 'is-conversation-list', 'is-chat-detail', 'is-system-view');
  };

  namespace.mount = function (root, options) {
    return new ChatUI(root, options);
  };
  namespace.ChatUI = ChatUI;
})(typeof window !== 'undefined' ? window : globalThis);
