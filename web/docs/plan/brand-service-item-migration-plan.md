# Brand Service 商品 Item 统一组件迁移计划

## 目标与非目标

- [x] 仅迁移 `brand-service.html` 商品列表，改用唯一公共组件
  `src/partials/components/item-all-card.html`。
- [x] 将当前 Vertical / Horizontal 两套列表合并为一份 5 张卡片的 DOM。
- [x] PC / Mobile 与 Vertical / Horizontal 共四种状态只切换列表外层状态 class。
- [x] 保留筛选、排序、分页、Show More、购买弹窗和页面其它区域。
- [x] 不迁移仍使用旧 partial 的其它页面，不修改公共 Item 组件结构或公共状态样式。

## 当前结构与消费者

- [x] Vertical 列表为 `#items-grid`，静态 include 5 次
  `item-card-vertical.html`；Horizontal 列表为 `#items-grid-horizontal`，静态 include
  5 次 `item-all-horizontal-item-responsive.html`。
- [x] Horizontal 响应式 partial 每条业务数据同时输出 PC 和 Mobile 两份 DOM。
- [x] `layoutswitch.js` 通过显示/隐藏两套 `.items-container[data-layout]` 切换布局。
- [x] `items.js` 初始化 `PageLayout`，并在 Show More 时克隆
  `.item-all-items-pager` 的现有卡片。
- [x] `brand-service.css/.less` 同时包含页面外部布局与旧 Vertical / Horizontal 卡片内部样式。
- [x] `item-card-vertical.html` 仍被 Item Detail、Post Detail、Store Detail、
  System Post Detail 和共享 Brand partial 消费；不能删除。
- [x] `item-all-horizontal-item-responsive.html` 仍被 Tag All 和共享 partial 消费；
  不能删除。
- [x] `brand-service.css` 只由目标页加载，因此目标页迁移后零引用的旧卡片内部规则可与
  LESS 同步删除。

## 数据统一策略

- [x] 用户已确认采用页面默认可见的 Vertical 数据，不采用当前 Horizontal 演示数据。
- [x] 统一后保留 5 张卡片，均为已收藏：
  `data-like="1"`、`Vector_sel.png`、`aria-pressed="true"`。
- [x] 标记为蓝色渐变 `item.mark`；详情链接为
  `item-detail.html?item_id=123`。
- [x] 标题为 `item 标题 item 标题 item 标题 item 标题 item 标题 item 标题`，
  评分 `4.3 (200)`，Brand 为绿色 `Google`，Service 为 `SEO & SA`。
- [x] 标签为 `新品发布`、`运动户外`、`配送时间: 24H+` 与 `+3`。
- [x] 公共组件现有固定封面、Price `$325.00` 和 In stock `52` 与原 Vertical 数据一致。
- [x] 第一张购买按钮保留 `disabled`，其余四张保留可购买状态。

## 组件、状态与样式

- [x] 页面只 include `item-all-card.html`，标签改用公共组件要求的无内部样式 class结构。
- [x] 加载 `css/item-all.css` 与四份现有状态 CSS/LESS：
  `desktop-vertical`、`desktop-horizontal`、`mobile-vertical`、`mobile-horizontal`。
- [x] 唯一 `#items-grid` 初始状态为 `item-all-card--desktop-vertical`。
- [x] 组件根始终只保留 `.item-all-card`；互斥状态只存在于 `#items-grid`。
- [x] `brand-service.css/.less` 只保留页面 Hero、筛选栏、列表外部排布及其它页面样式；
  删除旧卡片内部和双列表显隐规则。
- [x] 不为 Brand Service 新增页面专用组件 class 或内部覆盖。

## 状态与动态行为

- [x] 页面改为加载 `js/item-all-layout.js`，由 `items.js` 的现有初始化创建 `PageLayout`。
- [x] 布局按钮只更新 `PageLayout.currentLayout` 和 `#items-grid` 的唯一状态 class，
  不删除、重建或隐藏第二套 DOM。
- [x] 移除为旧 `.best-items-item` 补加兼容 class 的内联脚本。
- [x] Show More 继续克隆当前统一组件原型；单列表下每次由 5 张变为 10 张，
  空状态保持唯一且位于末尾。

## 实施与检查

- [x] 使用独立临时 Git worktree 建立四种状态的修改前 Playwright 基线。
- [x] 替换页面 CSS/JS 引用并合并两套列表。
- [x] 清理目标页零引用的旧组件内部 CSS/LESS。
- [x] 运行构建、JS、LESS、残留及空白检查。
- [x] 使用相同视口完成四种状态和动态行为 Playwright 回归。
- [x] 更新 `codex_tasks/TASKS.md` 并清理临时环境。

## Playwright 基线与回归

- [x] Desktop Vertical 1440 × 1200：5 张卡片，首卡约 288.66 × 589，
  默认数据为 Google / SEO & SA。
- [x] Desktop Horizontal：5 个响应式包装，每个同时包含 PC / Mobile 两份卡片，
  当前可见包装约 914 × 240，数据为 Quora / Cloud Service。
- [x] Mobile Vertical 390 × 844：5 张 Vertical 卡片，首卡约 169 × 295。
- [x] Mobile Horizontal：5 个响应式包装，每条仍包含两份 DOM，可见包装约 358 × 111。
- [x] 修改前存在两个空状态；四种基线状态均无 page error。
- [x] 修改后四种状态均为 5 张相同数据的唯一 `.item-all-card` DOM。
- [x] 每个状态只有一个正确外层 class，组件根无互斥状态 class。
- [x] 跨断点与布局切换时卡片 DOM 标记保持，数据、数量、顺序和收藏状态不变。
- [x] Show More、收藏、可用购买按钮及首张禁用购买按钮行为正常。
- [x] 只保留一个空状态，页面无横向溢出、console error 或 page error。
- [x] 由于用户确认统一为 Vertical 数据且公共组件结构不同，不声明旧 Horizontal
  零像素差异；按公共 Item 标准样式检查关键尺寸、溢出和响应式状态。

## 完成命令

```bash
node scripts/build-pages.js
node --check js/item-all-layout.js
node --check js/items.js
npx --yes less@4.2.0 css/brand-service.less /tmp/brand-service-compiled.css
git diff --check
```

## 实际回归结果

- Desktop Vertical 1440 × 1200：唯一状态为
  `item-all-card--desktop-vertical`，5 张卡片，首卡 288.66 × 585。
- Desktop Horizontal：唯一状态为 `item-all-card--desktop-horizontal`，同一批卡片和数据，
  首卡 914 × 230。
- Mobile Horizontal 390 × 844：唯一状态为
  `item-all-card--mobile-horizontal`，首卡 358 × 111。
- Mobile Vertical：唯一状态为 `item-all-card--mobile-vertical`，首卡 169 × 329；
  Fresh Mobile 页面无横向溢出。
- 四种状态均为 5 张 `.item-all-card`，旧组件 DOM 为 0，组件根互斥状态 class 为 0；
  跨布局与断点后首卡 DOM 标记保持。
- 5 张卡片均保留 Google / SEO & SA、评分 4.3、原标签和收藏状态；首张按钮禁用，
  其余按钮可打开购买弹窗。
- 收藏按钮可切换图片与 `aria-pressed`；Show More 在 Desktop-resize 和 Fresh Mobile
  两条路径均从 5 张增加为 10 张，空状态保持唯一且位于末尾。
- 页面无 console error / page error；构建、JS 语法、LESS 编译、旧引用搜索和
  `git diff --check` 均通过。
- 共享旧 partial 因仍有范围外消费者而保留，未修改。
