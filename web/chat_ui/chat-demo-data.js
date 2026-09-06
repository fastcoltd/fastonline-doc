(function (global) {
  'use strict';

  function clone(value) {
    if (typeof structuredClone === 'function') return structuredClone(value);
    return JSON.parse(JSON.stringify(value));
  }

  function buildConversations(assetBase) {
    var people = [
      { id: 'me', name: 'Me', role: 'me', avatarUrl: assetBase + 'avatar-me-3.png', presence: 'online' },
      { id: 'service', name: 'Customer service', role: 'service', avatarUrl: assetBase + 'avatar-service.jpg', presence: 'online' },
      { id: 'shop-owner', name: 'Shop owner', role: 'store', avatarUrl: assetBase + 'avatar-customer.jpg', presence: 'online' }
    ];
    return Array.from({ length: 12 }).map(function (_, index) {
      var id = 'ticket-' + (index + 1);
      return {
        id: id,
        type: 'ticket',
        title: 'Order: #621325 - Sleek Steel Hat',
        preview: 'Claire Block DDS: Maxime et voluptas incidunt...',
        participants: people,
        unread: index === 1 ? 0 : 33,
        active: index === 1,
        order: {
          id: index === 1 ? '177231' : String(177230 + index),
          title: 'Handcrafted Concrete Tuna',
          number: '165',
          amount: '$1876.00',
          quantity: '750 Order',
          time: '7/28 07:50',
          closed: false
        }
      };
    }).concat([
      {
        id: 'chat-1',
        type: 'chat',
        title: 'Sophie',
        preview: 'Temporibus iste quod magnam.',
        participants: [people[0], { id: 'sophie', name: 'Sophie', role: 'customer', avatarUrl: assetBase + 'avatar-customer.jpg', presence: 'online' }],
        unread: 2,
        order: null
      },
      {
        id: 'system-1',
        type: 'system',
        title: 'System notification',
        preview: 'Your order status has changed.',
        participants: [],
        unread: 1,
        order: null
      }
    ]);
  }

  function sender(id, name, role, avatarUrl, presence) {
    return { id: id, name: name, role: role, avatarUrl: avatarUrl, presence: presence || 'online' };
  }

  function buildMessages(assetBase) {
    var me = sender('me', 'Me', 'me', assetBase + 'avatar-me-3.png');
    var service = sender('service', 'Service', 'service', assetBase + 'avatar-service.jpg');
    var sophie = sender('sophie', 'Sophie', 'customer', assetBase + 'avatar-customer.jpg');
    var messages = [];
    var sequence = 1;

    function add(kind, direction, from, content, extra) {
      var message = Object.assign({
        id: 'message-' + sequence,
        clientMessageId: null,
        conversationId: 'ticket-2',
        kind: kind,
        direction: direction,
        sender: from,
        sentAt: sequence < 2 ? '2024/05/15 13:00' : '2025/05/15 13:23',
        status: direction === 'outgoing' ? 'read' : 'delivered',
        content: content || {}
      }, extra || {});
      sequence += 1;
      messages.push(message);
      return message;
    }

    add('system', 'center', null, { text: 'System: Magni aut voluptatem rem enim.' });
    add('image', 'outgoing', me, {
      url: assetBase + 'chat-image-sample.jpg',
      previewUrl: assetBase + 'chat-image-sample.jpg',
      alt: 'Fashion campaign preview'
    });
    add('image', 'outgoing', me, {
      url: assetBase + 'chat-image-sample.jpg',
      previewUrl: assetBase + 'chat-image-sample.jpg',
      alt: 'Campaign video preview'
    });
    add('file', 'outgoing', me, {
      name: 'wenjian name',
      url: 'chat_ui/README.md',
      size: 8421
    });
    add('file', 'outgoing', me, {
      name: '鼠标划过效果',
      url: 'chat_ui/README.md',
      size: 8421
    });

    function workflow(kind, title, state, rejectionReason) {
      return add(kind, 'outgoing', me, {
        title: title,
        issueLabel: '问题信息',
        issueFile: { name: '下载', url: 'chat_ui/README.md' },
        quantity: 1,
        amount: '$18.00',
        reason: '服务效果未达预期（如SEO排名未提升、流量虚假）'
      }, {
        workflow: {
          state: state,
          actorName: 'Quick Store',
          rejectionReason: rejectionReason || ''
        }
      });
    }

    workflow('refund', '买家申请退款', 'actionable');
    workflow('refund', '买家申请退款', 'rejected', '拒绝理由测试');
    workflow('refund', '买家申请退款', 'accepted');
    workflow('replacement', '买家申请换货', 'actionable');
    workflow('replacement', '买家申请换货', 'rejected', '拒绝理由测试');
    workflow('replacement', '买家申请换货', 'accepted');

    add('close-request', 'outgoing', me, { title: '买家请求关闭订单' }, {
      workflow: { state: 'actionable', actorName: 'Quick Store', rejectionReason: '' }
    });
    add('close-request', 'outgoing', me, { title: '买家请求关闭订单' }, {
      workflow: { state: 'rejected', actorName: 'Quick Store', rejectionReason: '拒绝理由测试' }
    });
    add('close-request', 'outgoing', me, { title: '买家请求关闭订单' }, {
      workflow: { state: 'accepted', actorName: 'Quick Store', rejectionReason: '' }
    });
    add('service-intervention', 'outgoing', me, { title: '买家请求平台客服介入处理' });
    add('system', 'center', null, {
      text: '最大宽度 System: Magni aut voluptatem rem enim. System: Magni aut voluptatem'
    });
    add('system', 'center', null, { text: 'System: Magni aut voluptatem rem enim.' });
    add('system', 'center', null, { text: 'System: Magni aut voluptatem rem enim.' });
    add('text', 'incoming', service, {
      text: 'Quis consectetur quia repellendus sunt accusamus dicta quia.'
    });
    add('text', 'incoming', service, {
      text: 'Quis consectetur quia repellendus sunt accusamus dicta quia. Quis consectetur quia repellendus sunt accusamus dicta quia.'
    });
    add('text', 'incoming', sophie, { text: 'Temporibus iste quod magnam.' });
    add('text', 'incoming', sophie, { text: 'Temporibus iste quod magnam.' });
    add('text', 'incoming', service, {
      text: 'Quis consectetur quia repellendus sunt accusamus dicta quia. Details: https://www.fastresp.com'
    });
    add('text', 'outgoing', me, {
      text: 'Reject exchange，Reason for rejection：Similique id tempora.'
    });
    add('text', 'outgoing', me, { text: 'Exchange agreed' });

    return {
      'ticket-2': messages,
      'ticket-1': [
        {
          id: 'ticket-1-system',
          conversationId: 'ticket-1',
          kind: 'system',
          direction: 'center',
          sender: null,
          sentAt: '2025/05/15 13:23',
          status: 'delivered',
          content: { text: 'Select another ticket to view the complete component showcase.' }
        }
      ],
      'chat-1': [
        {
          id: 'chat-1-message',
          conversationId: 'chat-1',
          kind: 'text',
          direction: 'incoming',
          sender: sophie,
          sentAt: '2025/05/15 13:23',
          status: 'read',
          content: { text: 'Temporibus iste quod magnam.' }
        }
      ],
      'system-1': [
        {
          id: 'system-1-message',
          conversationId: 'system-1',
          kind: 'system',
          direction: 'center',
          sender: null,
          sentAt: '2025/05/15 13:23',
          status: 'read',
          content: { text: 'Your order status has changed.' }
        }
      ]
    };
  }

  function createDemoData(options) {
    var settings = options || {};
    var assetBase = settings.assetBase || 'chat_ui/assets/';
    var data = {
      activeTab: 'ticket',
      selectedConversationId: 'ticket-2',
      connectionStatus: 'idle',
      tabCounts: { chat: 611, ticket: 417, system: 21 },
      conversations: buildConversations(assetBase),
      messages: buildMessages(assetBase),
      hasOlderMessages: true,
      orderClosed: false
    };
    return clone(data);
  }

  global.FastRespChatDemoData = {
    create: createDemoData
  };
})(typeof window !== 'undefined' ? window : globalThis);
