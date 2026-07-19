# Index Best items 迁移到统一商品 Item 计划

## 目标

- 使用唯一组件 `src/partials/components/item-all-card.html` 替换首页 Best items 的 16 个 Item。
- 保留现有标志、标题、评分、Brand、Service、标签、收藏状态和购买按钮行为。
- 首页固定使用 Vertical 方向，PC / Mobile 只切换现有 Vertical 状态 class。
- 保留首页现有轮播、轮播页和分页圆点外部布局。

## 明确不做

- 不还原首页旧商品 Item 的页面专用内部样式。
- 不新增组件 HTML、组件 class、状态 class、CSS 或 LESS 文件。
- 不迁移其他页面仍在使用的旧 `item-card-vertical.html`。
- 不删除仍有消费者的旧商品 partial 或共享样式。

## 盘点结果

- `src/partials/index-best-items-section.html` 包含两组轮播页，每组 8 张，共 16 张静态 Item。
- `js/carousel.js` 通过 `cloneNode(true)` 克隆现有轮播页，没有手写 Item HTML。
- `src/partials/components/item-card-vertical.html` 仍被多个详情页和列表页使用，本次保留。
- `css/index.css` / `css/index.less` 中 `#best-items ...` 和 `.figma-best-item ...` 为首页旧卡片内部覆盖，迁移后可同步删除。
- 统一状态逻辑 `js/item-all-layout.js` 当前固定操作全页面和 `#items-grid`，需要支持传入首页轮播容器并禁用首页不存在的布局按钮。

## 数据映射

旧 partial 与统一组件的大部分参数同名，可直接保留：

- `like`、`like_icon`、`aria_pressed`
- `mark_style`、`mark_text`
- `item_link`、`item_title`
- `rating_score`、`rating_recommend`
- `brand_color`、`brand_name`、`service_name`
- `item_tags`、`item_button_class`

每个 include 增加已有状态参数：

```text
item_card_state_class = item-all-card--desktop-vertical
```

标签 HTML 移除旧样式 class，改由统一组件结构选择器控制。第三张卡片已有的 `index-best-item-buy-btn` 作为购买流程行为钩子保留，不作为组件状态使用。

## 样式与外部布局

- 组件内部复用 `item-all.css/.less`、`item-all-card-desktop-vertical.css/.less`、`item-all-card-mobile-vertical.css/.less`。
- `.best-items-pager` 继续负责轮播页的 flex 和换行。
- 移除旧页面专用卡片宽度与内部覆盖，间距直接使用统一 Vertical 状态已有 margin，避免与页面 gap 重复。
- 不加载 Horizontal 状态文件，因为首页没有横竖模式切换。

## 状态切换

- 扩展现有 `PageLayout` 构造参数，使其可限定 Item 容器和布局按钮作用域。
- `item-all.html` 的无参数调用保持原行为。
- 首页传入 `#best-items` 且禁用布局按钮作用域，`currentLayout` 始终为 `vertical`。
- PC 使用 `item-all-card--desktop-vertical`，Mobile 使用 `item-all-card--mobile-vertical`。
- 轮播克隆前先同步原始卡片，MutationObserver 同时覆盖后续克隆节点。

## 实施步骤

- [x] 盘点统一组件、首页 16 张卡片、旧 partial 消费者、CSS / LESS 和轮播脚本。
- [x] 首页加载统一商品 Item 基础及两份 Vertical 状态 CSS。
- [x] 16 个 include 改为直接使用 `item-all-card.html`。
- [x] 首页接入限定作用域的现有 `PageLayout`。
- [x] 同步删除首页失效的旧组件内部 CSS / LESS。
- [x] 运行构建、JavaScript 语法、残留引用和差异检查。

## 验证矩阵

- PC：首页商品卡均为 `item-all-card--desktop-vertical`。
- Mobile：首页商品卡均为 `item-all-card--mobile-vertical`。
- 轮播克隆节点保持统一组件 DOM 和当前状态 class。
- 16 张卡片数据、2 个收藏状态和 1 个首页购买流程按钮钩子保留。
- `item-all.html` 的布局按钮和四状态切换保持兼容。
- 按项目规则，本轮用户未明确要求 Playwright，因此不执行浏览器截图验证。

## 检查命令

```sh
node scripts/build-pages.js
node --check js/item-all-layout.js
node --check js/index.js
rg -n "item-card-vertical|figma-best-item" src/partials/index-best-items-section.html index.html css/index.css css/index.less
git diff --check
```
