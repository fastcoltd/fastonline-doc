# Campaign Item 四模式标签两行溢出计划

## 目标与非目标

- [x] Campaign Item 的 PC Vertical、PC Horizontal、Mobile Vertical、Mobile Horizontal 均最多展示两行标签。
- [x] 标签在两行内完整容纳时不显示数量标志；超过两行时在第二行末尾显示实际隐藏数量 `+N`。
- [x] 第二行标签、数量标志、边框和阴影完整，不被裁切。
- [x] 保留 Campaign 的标题、图片、统计、Products、链接、标签顺序和收藏状态。
- [x] 不修改 Item、Store、Demand、Post 等其它统一组件。

## 当前结构与消费者

- [x] 复用唯一组件 `src/partials/components/compaign-all-card.html`，不新增第二份组件 DOM。
- [x] 复用 `nav[aria-label="Campaign tags"]` 和现有 `item_tags` 数据。
- [x] 覆盖 `compaign-all.html`、`compaign-detail.html`、`tag-all.html`、`search-all.html`、`index.html`。
- [x] 覆盖分页/重新加载、统一组件原型克隆、搜索固定 Horizontal、详情固定 Horizontal 和首页轮播克隆入口。
- [x] 复用 `js/compaign-all-layout.js` 的四状态切换和组件原型能力。

## 数据与 DOM 策略

- [x] 所有真实标签继续由 `item_tags` 参数传入，空标签数据保持为空。
- [x] 运行时只添加统一数量标志并通过状态 class 隐藏超出标签，不删除真实标签 DOM。
- [x] `N` 只统计因两行限制隐藏的真实标签数量。
- [x] 四种状态切换时组件 DOM、数据、链接和标签顺序保持不变。
- [x] 动态卡片继续克隆统一组件原型，不在 JavaScript 中新增完整 HTML 模板。

## 样式与状态

- [x] 在 `compaign.css` / `.less` 中增加共用数量标志和隐藏状态。
- [x] PC Vertical 保持最多两行并接入 `+N`。
- [x] PC Horizontal 从不限行改为最多两行和 `+N`。
- [x] Mobile Vertical 保持最多两行并接入 `+N`。
- [x] Mobile Horizontal 从单行改为最多两行和 `+N`。
- [x] 根据各状态标签尺寸保留边框和阴影安全余量。
- [x] 仅在实际需要时最小调整状态卡片或内容区域高度，避免与其它字段重叠。

## JavaScript

- [x] 初始化、模式切换和设备断点变化后重新计算标签。
- [x] 使用标签实际换行位置判断两行范围。
- [x] 为 `+N` 预留第二行末尾空间，并从末尾逐个隐藏标签。
- [x] 窗口缩放后重新计算。
- [x] 使用 MutationObserver 覆盖分页、重新加载、动态新增和轮播克隆。
- [x] 无标签、一行和恰好两行时不显示数量标志。

## Playwright 基线与回归矩阵

- [x] 建立修改前四模式基线截图和尺寸记录。
- [x] 四种模式分别覆盖无标签、一行、两行和超过两行。
- [x] 验证 `+N` 是第二行最后一个可见元素且数值准确。
- [x] 验证所有可见标签边框和阴影处于标签容器内。
- [x] 验证四模式往返切换和 PC/Mobile 跨断点恢复。
- [x] 抽查 compaign-all、compaign-detail、tag-all、search-all、index。
- [x] 验证标签链接、收藏、动态新增、原型克隆和首页轮播。
- [x] 验证同页面其它业务组件不受影响。

## 构建与静态检查

- [x] `node scripts/build-pages.js`
- [x] `node --check js/compaign-all-layout.js`
- [x] CSS/LESS 成对同步检查。
- [x] 旧单行/无限行裁切规则残留检查。
- [x] 统一组件消费者、状态 class 和脚本引用检查。
- [x] `git diff --check`
