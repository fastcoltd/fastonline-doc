# Post Item 两模式标签两行溢出计划

## 目标与非目标

- [x] Post Item 的 PC 和 Mobile 均最多展示两行标签区域内容。
- [x] `Kind：` 固定标签始终可见并参与换行计算。
- [x] 真实标签在两行内完整容纳时不显示数量标志；超过两行时在第二行末尾显示实际隐藏数量 `+N`。
- [x] 第二行标签、数量标志和边框完整，不被裁切。
- [x] 保留标题、封面、作者、摘要、Brand、链接、收藏和 `post-all-card--featured` 扩展状态。
- [x] 不修改 Item、Store、Campaign、Demand 等其它统一组件。

## 当前结构与消费者

- [x] 复用唯一组件 `src/partials/components/post-all-card.html`，不新增第二份组件 DOM。
- [x] 复用 `nav[aria-label="Post attributes"]`、`[data-role="label"]` 和现有 `item_tags` 数据。
- [x] 覆盖 `post-all.html`、`tag-all.html`、`search-all.html`、`index.html`、`blog.html`、`brand.html`。
- [x] 覆盖 `brand-hot-posts-section.html` 间接消费者。
- [x] 覆盖 template、组件原型、Search 模板、jQuery clone 和轮播克隆入口。
- [x] 复用 `js/post-all-layout.js` 的 PC/Mobile 状态切换能力。

## 数据与 DOM 策略

- [x] 所有真实标签继续由 `item_tags` 参数传入，空标签数据保持为空。
- [x] 运行时只添加数量标志并通过状态 class 隐藏超出标签，不删除真实标签 DOM。
- [x] 行数计算包含固定 `Kind：`、可见标签和数量标志。
- [x] `N` 只统计因两行限制隐藏的真实 `<a>` 标签，不统计 `Kind：`。
- [x] 状态切换时组件 DOM、数据、链接、收藏和标签顺序保持不变。
- [x] 动态卡片继续源自统一组件或统一 template，不新增完整 HTML 模板。

## 样式与状态

- [x] 在 `post-all.css` / `.less` 中增加共用数量标志和隐藏状态。
- [x] PC 标签区域改为最多两行和 `+N`，保留边框安全余量。
- [x] Mobile 标签区域改为最多两行和 `+N`，保留边框安全余量。
- [x] 普通卡片与 Featured 卡片共用同一标签规则。
- [x] 仅在实际需要时最小调整卡片或内容区域高度，避免与 Brand、卡片底部重叠。

## JavaScript

- [x] 初始化和 PC/Mobile 断点变化后重新计算标签。
- [x] 使用实际换行位置判断两行范围，并始终包含 `Kind：`。
- [x] 为 `+N` 预留第二行末尾空间，并从末尾逐个隐藏真实标签。
- [x] 窗口缩放、字体加载和标签容器尺寸变化后重新计算。
- [x] 使用 MutationObserver 覆盖 template、cloneNode、jQuery clone、动态新增和轮播克隆。
- [x] 克隆卡片携带旧标志或隐藏状态时先清理再重新计算。
- [x] 无真实标签、一行和恰好两行时不显示数量标志。

## Playwright 基线与回归矩阵

- [x] 建立 PC/Mobile 普通卡片和 Featured 卡片修改前基线。
- [x] 两种模式分别覆盖无真实标签、一行、两行和超过两行。
- [x] 验证 `Kind：` 始终可见且 `+N` 是第二行最后一个可见元素。
- [x] 验证 `+N` 数值准确，且可见标签边框处于容器内。
- [x] 验证普通卡片与 Featured 卡片都正确。
- [x] 验证 PC/Mobile 跨断点和隐藏页签恢复。
- [x] 抽查 post-all、tag-all、search-all、index、blog、brand。
- [x] 验证标题/标签链接、收藏、template 与各种克隆入口。
- [x] 验证同页面其它业务组件不受影响。

## 构建与静态检查

- [x] `node scripts/build-pages.js`
- [x] `node --check js/post-all-layout.js`
- [x] CSS/LESS 成对同步检查。
- [x] `post-all-card--featured` 保留检查。
- [x] `Kind：` 与数量标志选择器检查。
- [x] 旧无限换行规则残留检查。
- [x] 统一组件消费者、状态 class、动态入口和脚本引用检查。
- [x] `git diff --check`
