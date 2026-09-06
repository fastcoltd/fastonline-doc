# FastResp 电商聊天 UI 使用说明

这是一套无框架、无 npm 依赖的电商订单/工单聊天组件。它使用原生 HTML、CSS 和 JavaScript，可在当前静态项目中运行，也可以复制到其他 Web 工程。

组件通过 Adapter 与数据源通信。UI 不直接依赖 WebSocket 事件名或服务端字段，因此可以在 Mock、原生 WebSocket、SockJS 或其他实时通信实现之间切换。

## 1. 文件说明

```text
chat_ui/
  chat-ui.css                 组件样式与响应式布局
  chat-ui.less                与 CSS 同步的 LESS 源码
  chat-ui.js                  UI、数据绑定和交互控制器
  chat-store.js               聊天状态容器
  chat-protocol-bridge.js     Socket 数据与领域数据的转换层
  chat-socket-adapter.js      可配置的原生 WebSocket 适配器
  chat-mock-adapter.js        本地演示适配器
  chat-demo-data.js           覆盖全部消息类型的演示数据
  assets/                     字体、头像、图片与 Figma 图标
```

生产项目至少需要：

- `chat-ui.css`
- `chat-ui.js`
- `chat-store.js`
- 一个符合接口的 Adapter
- `assets/`，或通过 `assetBase` 指向等价资源目录

使用原生 Socket 时还需要：

- `chat-protocol-bridge.js`
- `chat-socket-adapter.js`

## 2. 最小接入示例

脚本必须按照下面的依赖顺序加载：

```html
<link rel="stylesheet" href="chat_ui/chat-ui.css">

<section class="fr-chat" data-chat-root aria-label="Order conversations"></section>

<script src="chat_ui/chat-store.js"></script>
<script src="chat_ui/chat-protocol-bridge.js"></script>
<script src="chat_ui/chat-mock-adapter.js"></script>
<script src="chat_ui/chat-demo-data.js"></script>
<script src="chat_ui/chat-ui.js"></script>
<script>
  const data = FastRespChatDemoData.create({
    assetBase: 'chat_ui/assets/'
  });

  const adapter = new FastRespChat.MockChatAdapter(data);

  const chat = FastRespChat.mount(
    document.querySelector('[data-chat-root]'),
    {
      adapter,
      initialData: data,
      assetBase: 'chat_ui/assets/',
      currentUserId: 'me'
    }
  );
</script>
```

当前仓库可以直接访问构建后的 `chat.html` 查看完整 Mock 演示。

## 3. 初始化参数

`FastRespChat.mount(root, options)` 返回一个聊天实例。

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `adapter` | Object | 是 | Mock、Socket 或业务项目自定义 Adapter |
| `initialData` | Object | 否 | 首屏会话、消息、计数和选中状态 |
| `assetBase` | String | 否 | 组件素材目录，默认 `chat_ui/assets/` |
| `currentUserId` | String | 是 | 当前登录用户 ID，用于确定自己发送的消息 |
| `mobileInitialView` | `list` / `detail` | 否 | 手机端首次展示会话列表还是聊天详情，默认 `list` |
| `disconnectOnDestroy` | Boolean | 否 | 销毁组件时是否断开 Adapter，默认 `true` |
| `callbacks` | Object | 否 | 组件事件回调 |
| `store` | ChatStore | 否 | 需要共享外部 Store 时传入；通常不需要 |

实例 API：

```js
chat.selectConversationById('ticket-2');
chat.setAdapter(nextAdapter);
chat.updateOptions({ currentUserId: 'user-2' });
chat.destroy();
```

调用 `destroy()` 会移除 DOM 监听、Adapter 订阅、媒体查询监听和本地预览 URL。单页应用卸载页面时必须调用。

## 4. 初始数据结构

```js
const initialData = {
  activeTab: 'ticket',
  selectedConversationId: 'ticket-2',
  connectionStatus: 'idle',
  tabCounts: {
    chat: 611,
    ticket: 417,
    system: 21
  },
  conversations: [],
  messages: {
    'ticket-2': []
  },
  hasOlderMessages: true,
  orderClosed: false
};
```

### 会话

```js
{
  id: 'ticket-2',
  type: 'ticket', // chat | ticket | system
  title: 'Order: #621325 - Sleek Steel Hat',
  preview: 'Latest message preview',
  unread: 3,
  participants: [
    {
      id: 'me',
      name: 'Me',
      role: 'me', // me | service | store | customer
      avatarUrl: '/avatars/me.png',
      presence: 'online'
    }
  ],
  order: {
    id: '177231',
    title: 'Handcrafted Concrete Tuna',
    number: '165',
    amount: '$1876.00',
    quantity: '750 Order',
    time: '7/28 07:50',
    closed: false
  }
}
```

### 消息公共结构

```js
{
  id: 'server-message-id',
  clientMessageId: 'client-generated-id',
  conversationId: 'ticket-2',
  kind: 'text',
  direction: 'incoming', // incoming | outgoing | center
  sender: {
    id: 'user-1',
    name: 'Sophie',
    role: 'customer',
    avatarUrl: '/avatars/sophie.jpg',
    presence: 'online'
  },
  sentAt: '2026/09/06 14:30',
  status: 'delivered', // pending | sent | delivered | read | failed
  content: {}
}
```

`clientMessageId` 必须在客户端发送时生成，并在服务端 ACK 中原样返回。组件用它合并临时消息和服务端消息，防止重连或 ACK 导致重复显示。

## 5. 消息类型

### 文本

```js
{
  kind: 'text',
  content: {
    text: 'See https://example.com for details.'
  }
}
```

组件会把 `http:`、`https:` 和 `mailto:` 地址转换为安全链接。消息字符串始终通过 `textContent` 输出，不支持注入 HTML。

### 图片

```js
{
  kind: 'image',
  content: {
    url: 'https://cdn.example.com/image.jpg',
    previewUrl: 'https://cdn.example.com/image-large.jpg',
    alt: 'Product issue screenshot'
  }
}
```

点击缩略图会打开原生预览对话框。

### 文件

```js
{
  kind: 'file',
  content: {
    name: 'evidence.pdf',
    url: 'https://cdn.example.com/evidence.pdf',
    size: 23819,
    mimeType: 'application/pdf'
  }
}
```

### 系统消息

```js
{
  kind: 'system',
  direction: 'center',
  sender: null,
  content: {
    text: 'The order status has changed.'
  }
}
```

### 退款、换货与关闭申请

`kind` 分别为：

- `refund`
- `replacement`
- `close-request`

```js
{
  kind: 'refund',
  content: {
    title: '买家申请退款',
    issueLabel: '问题信息',
    issueFile: {
      name: '下载',
      url: 'https://cdn.example.com/evidence.pdf'
    },
    quantity: 1,
    amount: '$18.00',
    reason: '服务效果未达预期'
  },
  workflow: {
    state: 'actionable',
    actorName: 'Quick Store',
    rejectionReason: ''
  }
}
```

`workflow.state` 可用值：

- `actionable`：显示 Accept/Refused。
- `submitting`：等待服务端确认，禁用按钮。
- `accepted`：显示已同意。
- `rejected`：显示已拒绝及拒绝理由。
- `expired`：业务操作已过期。

### 客服介入

```js
{
  kind: 'service-intervention',
  content: {
    title: '买家请求平台客服介入处理'
  }
}
```

## 6. 自定义 Adapter 接口

非 WebSocket 项目可以直接实现下面的接口：

```js
class MyChatAdapter {
  subscribe(listener) {
    // 保存 listener，在收到实时事件时调用 listener(event)
    return () => {
      // 取消订阅
    };
  }

  connect(context) {
    return Promise.resolve({ status: 'online' });
  }

  disconnect() {}

  loadConversations({ tab, query }) {
    return Promise.resolve([]);
  }

  loadMessages({ conversationId, before }) {
    return Promise.resolve({
      messages: [],
      hasOlder: false
    });
  }

  sendMessage(message) {
    return Promise.resolve({
      id: 'server-id',
      clientMessageId: message.clientMessageId,
      status: 'sent',
      sentAt: message.sentAt,
      content: message.content
    });
  }

  performBusinessAction(command) {
    return Promise.resolve({
      state: command.action === 'accept' ? 'accepted' : 'rejected',
      actorName: 'Quick Store',
      rejectionReason: command.reason || ''
    });
  }

  markRead(conversationId, messageId) {
    return Promise.resolve();
  }

  uploadAttachment(file, onProgress) {
    return uploadToYourServer(file, onProgress);
  }
}
```

## 7. 使用原生 WebSocket

加载顺序：

```html
<script src="chat_ui/chat-store.js"></script>
<script src="chat_ui/chat-protocol-bridge.js"></script>
<script src="chat_ui/chat-socket-adapter.js"></script>
<script src="chat_ui/chat-ui.js"></script>
```

初始化：

```js
const bridge = new FastRespChat.ChatProtocolBridge({
  encode(command) {
    return JSON.stringify({
      action: command.type,
      request_id: command.requestId,
      room_id: command.conversationId,
      data: command.payload
    });
  },

  decode(rawEvent) {
    const frame = JSON.parse(rawEvent.data);
    return [{
      type: mapServerEvent(frame.event),
      requestId: frame.request_id,
      conversationId: frame.room_id,
      payload: normalizeServerPayload(frame.data),
      error: frame.error || null
    }];
  }
});

const adapter = new FastRespChat.SocketChatAdapter({
  url: 'wss://api.example.com/chat',
  bridge,
  heartbeatInterval: 25000,
  requestTimeout: 15000,
  maxReconnectDelay: 30000,
  createSocket(url) {
    // 鉴权信息推荐放在 Cookie、WebSocket 子协议或短期票据中。
    return new WebSocket(url);
  },
  uploadAttachment(file, onProgress) {
    return uploadToObjectStorage(file, onProgress);
  }
});
```

默认 `ChatProtocolBridge` 使用以下包络：

```json
{
  "version": "1",
  "event": "message.send",
  "requestId": "client-request-id",
  "conversationId": "ticket-2",
  "payload": {}
}
```

真实项目通常只需要替换 `encode()` 和 `decode()`，不需要修改 `chat-ui.js`。

### UI 可处理的入站事件

| 事件 | payload |
| --- | --- |
| `connection.changed` | `{ status }` |
| `conversation.list` | `{ conversations }` |
| `message.created` | 完整领域消息 |
| `message.ack` | `{ id, clientMessageId, status, sentAt }` |
| `message.status` | `{ messageId, status }` |
| `workflow.updated` | `{ messageId, workflow }` |
| `order.closed` | `{ closed: true }` |
| `adapter.error` | Adapter Error |

连接状态可用值：`idle`、`connecting`、`online`、`reconnecting`、`offline`。

## 8. 后端协议需要保证的事项

正式 Socket 联调前，应确认：

1. Socket URL、Cookie/Token/票据的传递方式。
2. 心跳请求和服务端心跳响应格式。
3. 会话列表与历史消息的分页字段。
4. 服务端消息的单调序号或去重 ID。
5. 客户端 `clientMessageId` 的 ACK 回传规则。
6. sent、delivered、read 状态的事件格式。
7. 退款、换货、关闭订单操作的幂等键和最终状态事件。
8. 断线期间发送消息的服务端处理规则。
9. 图片/文件上传接口、大小限制、MIME 白名单和 URL 有效期。
10. 关闭订单后服务端是否拒绝新消息和业务操作。

## 9. 组件事件

根节点会派发 CustomEvent：

```js
root.addEventListener('fastrespchat:conversationchange', event => {
  console.log(event.detail.conversationId);
});

root.addEventListener('fastrespchat:send', event => {
  console.log(event.detail.message);
});

root.addEventListener('fastrespchat:businessaction', event => {
  console.log(event.detail.action);
});

root.addEventListener('fastrespchat:error', event => {
  console.error(event.detail.error);
});
```

也可以通过初始化回调监听：

```js
FastRespChat.mount(root, {
  adapter,
  initialData,
  currentUserId: 'me',
  callbacks: {
    onConversationChange(detail) {},
    onSend(detail) {},
    onBusinessAction(detail) {},
    onError(detail) {},
    onEvent(name, detail, instance) {}
  }
});
```

`onEvent` 的命名最稳定，推荐业务工程统一使用它。CustomEvent 名全部为小写。

## 10. 主题与尺寸

所有主要颜色都可在挂载节点覆盖：

```css
.my-chat-theme {
  --fr-chat-primary: #ff1b20;
  --fr-chat-text: #393d49;
  --fr-chat-muted: #898a8c;
  --fr-chat-outgoing: #fff4eb;
  --fr-chat-incoming: #def0ff;
  --fr-chat-green: #00c27c;
  --fr-chat-orange: #fa541c;
  --fr-chat-blue: #0084ff;
  --fr-chat-refund: #a80a0e;
  --fr-chat-replacement: #0a6ee0;
  --fr-chat-border: #d9d9d9;
}
```

桌面组件默认使用视口高度减 32px，最大内容宽度 1212px，并在页面中居中。宿主需要自定义高度时，可以覆盖：

```css
.dashboard-chat > .fr-chat {
  width: 100%;
  height: calc(100dvh - 120px);
  min-height: 600px;
}
```

`768px` 以下自动进入手机模式：首次显示会话列表，选择会话后显示详情，并通过返回按钮回到列表。PC 与 Mobile 使用同一套消息 DOM 和数据。

## 11. 多实例

组件不使用固定内部 ID，可以在同一页面挂载多个实例：

```js
const instances = [...document.querySelectorAll('[data-chat-root]')].map(root => {
  const data = createDataFor(root.dataset.accountId);
  return FastRespChat.mount(root, {
    adapter: createAdapter(root.dataset.accountId),
    initialData: data,
    currentUserId: data.currentUserId
  });
});
```

每个实例应使用独立 Adapter。除非业务明确需要共享连接，否则不要让多个聊天实例共同断开同一个 Socket。

## 12. 安全注意事项

- 服务端文案通过 `textContent` 渲染，不传入 HTML。
- URL 只接受 `http:`、`https:`、`mailto:`、`blob:` 和安全相对路径。
- 外部链接使用 `noopener noreferrer`。
- 上传前仍需在业务 Adapter 中校验文件大小、扩展名和 MIME。
- 不要在可长期记录的 WebSocket URL 中放置永久 Token。
- Accept/Refused 等业务操作必须由服务端做权限校验和幂等处理；前端禁用按钮只能改善体验，不能代替后端校验。
- 服务端应把最终业务状态广播给所有参与方，UI 再通过 `workflow.updated` 更新卡片。

## 13. 从当前项目复制到其他项目

1. 复制整个 `chat_ui/` 目录。
2. 在目标页面增加一个 `<section class="fr-chat" data-chat-root></section>`。
3. 按依赖顺序加载 CSS 和 JavaScript。
4. 先使用 `MockChatAdapter` 验证布局和交互。
5. 按目标后端协议实现 `ChatProtocolBridge`，再切换到 `SocketChatAdapter`。
6. 把宿主用户 ID 传给 `currentUserId`。
7. 若调整目录，更新 `assetBase`。
8. 单页应用卸载时调用 `destroy()`。

迁移不需要复制当前项目的 `common.css`、jQuery 或其他业务脚本。
