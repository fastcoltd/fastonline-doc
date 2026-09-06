# 电商聊天 UI 可移植组件实施计划

## 1. 目标与范围

- [x] 用户已批准开始实现。
- [ ] 新增截图所示的聊天工作区：会话列表、订单头、消息流、业务消息卡片、编辑器与快捷操作。
- [ ] 桌面端严格跟随 Figma 节点 `1873:76410` 中对应聊天工作区的布局、字号、颜色、间距、圆角与素材。
- [ ] 手机端使用同一套 DOM，在 `768px` 断点下提供会话列表/聊天详情单页切换，不复制 PC/Mobile 结构。
- [ ] 将 UI、领域状态、协议转换和 Socket 传输分层，使 UI 不依赖具体服务端字段和事件名。
- [ ] 提供完整 Mock 数据，覆盖设计稿出现的所有消息类型和业务状态。
- [ ] 提供跨项目使用说明，说明文件复制、初始化、数据格式、Socket 映射、事件、主题和销毁方法。

### 明确不做

- 不修改现有页面导航、Header、顶部菜单和个人中心侧栏。
- 不修改已有商品、店铺、需求、文章等业务组件。
- 不接入尚未提供的真实 Socket 地址、鉴权、心跳、上传或服务端业务协议；只提供可注入的通用 Socket 传输层和协议映射入口。
- 不新增音频、视频、表情、撤回和引用回复；保留消息渲染器扩展能力。
- 不实现截图工具标识、浏览器插件产生的绿色 `T` 悬浮标记等非产品 UI。

## 2. 只读盘点结论

### 项目技术栈与构建

- 项目没有 `package.json`，使用原生 HTML、CSS、JavaScript。
- 页面源码位于 `src/pages`，可复用 HTML 位于 `src/partials/components`。
- 根目录页面由 `node scripts/build-pages.js` 生成，不手工修改。
- CSS 与 LESS 成对维护；现有移动端断点为 `768px`。
- 页面内容通过 `--container-width` 限制，最大宽度为 `1440px`。

### 现有相关能力

- 仓库未发现现有聊天、WebSocket、SockJS、STOMP 或消息协议实现。
- `js/index.js`、`js/detail/demand-detail.js` 中存在图片/文件选择与预览逻辑，但与聊天组件 DOM 强耦合，不直接复用其结构；可复用交互原则和安全处理方式。
- `fonts/Roboto-Variable.ttf` 已存在，可直接复用 Figma 使用的 Roboto 字体。
- `css/common.css` 已提供主色、字体和 1440 容器变量；聊天组件使用带 fallback 的组件变量，既复用项目变量又保持可移植性。
- `chat_ui/` 已存在且为空，作为可移植运行时的唯一源码目录。

### 当前工作区状态

- `.DS_Store` 已有用户修改。
- `.codex-tmp/` 为用户未跟踪目录。
- 本任务不修改、清理或提交以上内容。

## 3. Figma 结构与设计基线

- 目标根节点：`1873:76410`，尺寸 `1920 × 3177`。
- 聊天工作区位于页面内容区域，桌面布局约为：会话栏 `283px`、间隔 `20px`、聊天区 `909px`。
- 聊天区订单头约 `71px`；底部工具栏约 `48px`；编辑器约 `94px`。
- 已确认主要 Token：
  - 主色 `#ff1b20`
  - 主文字 `#393d49` / `#262626`
  - 次文字 `#6d6d6d` / `#898a8c`
  - 自己的消息背景 `#fff4eb`
  - 普通对方消息背景 `#def0ff`
  - 平台绿色 `#00c27c`
  - 店铺橙色 `#fa541c`
  - 蓝色 `#0084ff`
  - 退款色 `#a80a0e`
  - 换货色 `#0a6ee0`
  - 浅背景 `#f4f4f4`
  - 边框 `#d9d9d9`
  - 字体 Roboto，正文基准 `14px / 22px`
  - 头像 `40px`，时间 `12px`，消息气泡圆角约 `10px`
- Figma 大节点已读取到结构、变量和子节点清单；代表性文件消息节点已读取到完整设计上下文。
- 风险：当前连接账号继续读取细分节点时触发 View 席位调用上限。实现期间优先使用已取得的 Figma 数据和用户截图；额度恢复后补取细分节点与原始素材。未取得的素材不得自行绘制近似 SVG。

## 4. 消息与会话数据策略

### 唯一领域数据源

- `ChatStore` 保存会话、当前会话、消息、连接状态、输入草稿和上传状态。
- PC/Mobile、不同发送方、不同消息宽度只改变样式或领域字段，不切换数据源。
- Mock 和 Socket 均转换为相同的领域模型，UI 不读取服务端原始结构。

### 统一消息结构

- 公共字段：`id`、`clientMessageId`、`conversationId`、`kind`、`direction`、`sender`、`sentAt`、`status`、`content`、`workflow`。
- `kind` 支持：`text`、`image`、`file`、`system`、`refund`、`replacement`、`close-request`、`service-intervention`。
- `status` 支持：`pending`、`sent`、`delivered`、`read`、`failed`。
- `workflow.state` 支持：`actionable`、`submitting`、`accepted`、`rejected`、`expired`。
- 所有可变文案、URL、头像、文件、金额、数量、原因和操作状态均由数据提供。

### 演示数据覆盖

- 会话标签：Chat、Ticket、System。
- 会话搜索、选中项、未读角标、加载状态。
- 自己的图片消息与文件消息（默认、hover、下载）。
- 退款申请待处理、已拒绝、已同意。
- 换货申请待处理、已拒绝、已同意。
- 关闭申请待处理、已拒绝、已同意。
- 客服介入消息。
- 短/长系统消息。
- 客服、普通成员和自己发送的短/长文本消息。
- 发送中、已送达、已读、失败重试状态。

## 5. 组件与文件结构

```text
chat_ui/
  chat-ui.css
  chat-ui.less
  chat-ui.js
  chat-store.js
  chat-protocol-bridge.js
  chat-socket-adapter.js
  chat-mock-adapter.js
  chat-demo-data.js
  assets/
  README.md

src/partials/components/
  chat-workspace.html

src/pages/
  chat.html
```

- `chat-workspace.html` 仅输出一个语义化挂载区域和无脚本提示，通过 include 在页面中复用。
- `chat-ui.js` 负责语义 DOM、消息渲染、事件委托、焦点和响应式状态，不包含服务端协议字段。
- `chat-store.js` 负责单一状态源、订阅、会话/消息更新和操作状态流转。
- `chat-protocol-bridge.js` 负责 wire message 与领域事件之间的双向转换。
- `chat-socket-adapter.js` 负责连接、断开、重连、心跳、发送、ACK 和事件分发，Socket 实例/工厂由宿主注入。
- `chat-mock-adapter.js` 负责静态演示和模拟 ACK/业务状态更新。
- `chat-demo-data.js` 只保存示例领域数据，不保存 DOM。
- 所有资源、样式和脚本以 `chat_ui/` 为迁移单位。

## 6. HTML 与选择器策略

- 根节点稳定 class：`.fr-chat`。
- 互斥视图状态只放在根容器：`.is-conversation-list`、`.is-chat-detail`。
- 消息根使用稳定业务 class `.fr-chat-message`，类型与状态使用 `data-kind`、`data-direction`、`data-status`、`data-workflow-state`。
- JS 行为钩子使用 `data-chat-action`、`data-chat-role`、`data-conversation-id`、`data-message-id`。
- 内部优先使用 `aside`、`nav`、`main`、`header`、`ol`、`li`、`article`、`form`、`button`、`time` 等语义标签。
- 所有结构选择器带 `.fr-chat` 根作用域；中和 `common.css` 中 `header` 等全局规则对组件的影响。
- 消息内容使用 `textContent` 和受控链接节点，不把服务端字符串写入 `innerHTML`。

## 7. CSS / LESS 职责

- `chat-ui.css` 与 `chat-ui.less` 同步维护相同规则。
- 组件变量统一使用 `--fr-chat-*` 前缀，并通过 fallback 映射项目现有变量。
- 桌面使用 Grid/Flex，实现 `283px + 20px + minmax(0, 909px)` 的设计比例。
- 页面级挂载区宽度不超过 `1440px` 并横向居中。
- 消息列表和会话列表独立滚动；订单头、工具栏和编辑器保持在聊天面板固定区域。
- 消息宽度使用 `max-width`，避免大量绝对定位；只有气泡箭头等局部装饰允许绝对定位。
- `768px` 以下进入手机布局，同一 DOM 中切换会话列表/聊天详情。
- 手机端快捷操作允许横向滚动，编辑区适配 `env(safe-area-inset-bottom)`。
- 支持 `prefers-reduced-motion` 和清晰的 `:focus-visible` 状态。

## 8. 交互与状态流转

- 标签切换、会话搜索、会话选择、未读清零、历史消息分页。
- 选择会话后加载消息；加载旧消息时保持视口锚点。
- 收到新消息时，仅当用户接近底部或消息由自己发送时自动滚到底部。
- Enter 发送、Shift+Enter 换行；空消息阻止发送。
- 图片选择、预览、移除、打开原图；文件选择、上传状态与下载。
- 文本 URL 自动转为 `<a>`；只允许 `http:`、`https:`、`mailto:`，外链增加 `rel="noopener noreferrer"`。
- Refund、Replacement、Application closed、Customer service 打开对应业务草稿或确认框。
- Accept/Refused 进入 `submitting`，服务端/Mock ACK 后转为 `accepted` 或 `rejected`；操作期间禁用按钮。
- 拒绝操作收集拒绝理由；关闭订单有二次确认。
- 消息失败可重试，使用 `clientMessageId` 去重。
- 订单关闭后禁用编辑器和业务操作。
- 连接状态支持 connecting、online、reconnecting、offline；重连采用受控退避。

## 9. Socket 与协议中间层

- UI 只调用 Adapter 方法，不直接创建 WebSocket。
- Socket Adapter 接收 `createSocket`、`url`、`protocols`、`heartbeat`、`reconnect` 和 Protocol Bridge。
- Protocol Bridge 暴露 `decode(raw)` 与 `encode(command)`；默认协议只作为示例，可由其他项目替换。
- 入站领域事件包括：会话更新、消息新增、消息 ACK、状态更新、业务状态更新、连接状态更新。
- 出站领域命令包括：加载会话、加载历史、发送消息、业务操作、已读回执。
- 图片/文件二进制上传通过宿主注入的 `uploadAttachment(file, progress)` 完成，Socket 发送上传后的 URL 与元数据。
- Adapter 暴露错误和状态事件，不在 UI 中硬编码 toast、鉴权或后端错误码。

## 10. 可移植 API 与说明文档

- 暴露 `window.FastRespChat` 命名空间和无依赖构造器。
- 推荐初始化：`FastRespChat.mount(root, { adapter, currentUserId, locale, callbacks })`。
- 实例提供：`setAdapter()`、`selectConversation()`、`updateOptions()`、`destroy()`。
- 说明文档包含：
  - 最小 HTML/CSS/JS 引用示例；
  - Mock 快速启动；
  - 自定义 Adapter 接口；
  - WebSocket 工厂、协议映射和文件上传接入；
  - 数据模型与业务卡片字段；
  - 事件/回调清单；
  - CSS 变量与主题覆盖；
  - 多实例、响应式、销毁和安全注意事项；
  - 从当前仓库复制到其他项目的文件清单。

## 11. 分批实施

- [ ] 批次 A：建立挂载 partial、演示页、基础 Token、双栏和手机布局。
- [ ] 批次 B：建立 Store、统一领域模型、会话列表和普通/系统消息。
- [ ] 批次 C：图片、文件、链接、状态和输入编辑器。
- [ ] 批次 D：退款、换货、关闭订单、客服介入及所有业务操作。
- [ ] 批次 E：Mock Adapter、Protocol Bridge、Socket Adapter、失败与重连。
- [ ] 批次 F：完整跨项目说明文档与示例。
- [ ] 批次 G：构建、语法、CSS/LESS、残留和差异检查。

## 12. 验证矩阵

### 视口与布局

- [ ] 1920px：页面内容不超过 1440px，聊天工作区居中。
- [ ] 1440px：双栏保持设计尺寸比例。
- [ ] 1260px / 980px：聊天列弹性收缩且不横向溢出。
- [ ] 768px / 390px：单屏列表/详情切换、底部编辑器和安全区正常。

### 行为

- [ ] 三个标签、搜索、会话切换、加载更多。
- [ ] 普通文本、自动链接、图片预览、文件下载。
- [ ] 文本/图片/文件发送及 pending/ack/failure/retry。
- [ ] 退款、换货、关闭订单的待处理/同意/拒绝状态。
- [ ] 客服介入和订单关闭后的禁用状态。
- [ ] Mock 与 Socket Adapter 可替换，UI 无需修改。
- [ ] 多实例互不影响，`destroy()` 无残留监听器。

### 必做静态检查

```bash
node scripts/build-pages.js
node --check chat_ui/chat-ui.js
node --check chat_ui/chat-store.js
node --check chat_ui/chat-protocol-bridge.js
node --check chat_ui/chat-socket-adapter.js
node --check chat_ui/chat-mock-adapter.js
node --check chat_ui/chat-demo-data.js
git diff --check
```

- [ ] 检查所有 CSS 均以 `.fr-chat` 或组件级 at-rule 为作用域。
- [ ] 检查 `chat-ui.css` 与 `chat-ui.less` 规则一致。
- [ ] 检查根目录 `chat.html` 由构建生成且与源码一致。
- [ ] 检查未修改其它页面及已有共享组件。
- [ ] 按用户项目约定，本任务不调用 Playwright；完成后由用户确认 UI。若用户另行明确要求，再进行自动截图对比。

## 13. 已知风险与处理

- Figma MCP 细分节点额度：额度恢复后继续拉取；无法拉取时明确列出未验证的设计细节，不声称全部像素已验证。
- 缺少真实 Socket 协议：用 Protocol Bridge 隔离，文档列出后端必须提供的事件、鉴权、ACK、分页和上传契约。
- 设计只有 PC：手机端为功能性推断，严格保证不改变 PC DOM 与布局规则。
- 全局 CSS 污染：对组件内部的 `header`、`button`、`input`、`img` 等全部使用根作用域覆盖。
- 长列表性能：使用增量历史加载、事件委托和图片懒加载；首版不引入第三方虚拟列表。
