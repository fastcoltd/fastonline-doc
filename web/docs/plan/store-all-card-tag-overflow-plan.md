# Store Item 四模式标签两行溢出计划

## 目标与非目标

- [x] Store Item 的 PC Vertical、PC Horizontal、Mobile Vertical、Mobile Horizontal 均最多展示两行标签。
- [x] 两行内不显示数量标志；超过两行时在第二行末尾显示实际隐藏数量 `+N`。
- [x] 第二行标签和数量标志边框、文字完整，不被裁剪。
- [x] 保留标签顺序、链接、收藏和其它业务数据。
- [x] 不修改 Item、Campaign、Demand、Post 等其它统一组件。

## 当前结构与消费者

- [x] 复用唯一组件 `src/partials/components/store-all-card.html`。
- [x] 复用标签容器 `nav[aria-label="Store tags"]` 和现有标签链接。
- [x] 覆盖 `store-all.html`、`tag-all.html`、`search-all.html` 和 `index.html`。
- [x] 覆盖分页、筛选、动态新增和首页轮播克隆入口。
- [x] 复用 `js/store-all-layout.js` 的状态切换、Resize 和 MutationObserver 能力。

## 数据与 DOM 策略

- [x] 所有真实标签继续由 `store_tags` 参数传入。
- [x] 运行时只添加统一数量标志并隐藏超出的标签，不删除真实标签 DOM。
- [x] `N` 只统计因两行限制隐藏的真实标签数量。
- [x] 四种状态切换时组件 DOM、数据和标签顺序保持不变。

## 样式与状态

- [x] 在 `store.css` / `.less` 中增加共用数量标志和隐藏状态。
- [x] PC Vertical 从固定一行、前三项改为最多两行。
- [x] PC Horizontal 从 `...` 改为最多两行和 `+N`。
- [x] Mobile Vertical 从固定前三项改为最多两行和 `+N`。
- [x] Mobile Horizontal 从单行 `...` 改为最多两行和 `+N`。
- [x] 根据各状态实际标签尺寸保留边框安全余量。
- [x] 必要时只调整卡片高度，避免标签与卡片底部冲突。

## JavaScript

- [x] 移除旧的 `.store-tag-ellipsis`、`data-overflow` 和行内隐藏逻辑。
- [x] 使用实际换行位置判断两行范围。
- [x] 为 `+N` 预留第二行末尾空间，并逐个隐藏末尾标签。
- [x] 窗口缩放、断点变化、模式切换和动态新增后重新计算。

## Playwright 回归矩阵

- [x] 建立修改前四模式基线。
- [x] 四种模式分别覆盖一行、两行和超过两行。
- [x] 验证 `+N` 是第二行最后一个可见元素。
- [x] 验证所有可见标签底部边框处于容器内。
- [x] 验证四模式往返切换和跨断点恢复。
- [x] 抽查 store-all、tag-all、search-all、index。
- [x] 验证标签链接、收藏、动态新增和轮播克隆。

## 构建与静态检查

- [x] `node scripts/build-pages.js`
- [x] `node --check js/store-all-layout.js`
- [x] CSS/LESS 成对同步检查。
- [x] 旧省略号和固定前三项规则残留检查。
- [x] 统一组件消费者及脚本引用检查。
- [x] `git diff --check`
