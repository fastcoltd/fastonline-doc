# Index Popular demands 迁移到统一 Demand Item 计划

## 目标

- 使用唯一组件 `src/partials/components/demand-all-card.html` 替换首页 Popular demands 的全部旧 Item。
- 保留首页原有标题、链接、Brand、Service、数量、价格、竞价时间、标签、竞标者、收藏状态和按钮状态。
- PC / Mobile 只切换现有 Demand Vertical 根状态 class，组件内部始终使用同一份语义化 DOM。
- 保留 PC 轮播和 Mobile 横向滚动的页面外部交互。

## 明确不做

- 不还原首页旧 Demand Item 的页面专用内部样式。
- 不新增组件 partial、页面专用状态 class、组件 CSS 或 LESS 文件。
- 不迁移 Brand 页面中仍在使用的旧 Demand Item。
- 不删除仍有消费者的三个 `index-popular-demand-item-*.html` 数据包装和 `demand-shared-item.html`。

## 盘点结果

- 首页 PC 区域 `#popuar-demands` 有两页轮播，每页 2 张，共 4 张旧 Item。
- 首页 Mobile 区域 `#popuar-demands-mobile` 复用同一组 4 条数据，以横向滚动展示。
- 每组数据包含 3 张已收藏、1 张未收藏；按钮均为禁用状态。
- 三个旧首页命名包装也被 `src/partials/components/brand-hot-demands-section.html` 使用，本轮不能删除。
- `js/carousel.js` 只通过 `cloneNode(true)` 克隆 PC 轮播页，没有手写完整 Item HTML。
- `js/demand-all-layout.js` 当前固定操作全页面布局按钮和 `#items-grid`，需要支持限定到首页 Popular demands 区域。
- `css/index.css` / `css/index.less` 中存在大量 `figma-popular-demand-item` 内部覆盖，迁移后应删除。

## 数据映射

- `like`、`like_icon`、`aria_pressed`：保留收藏状态。
- `item_link`、`item_title`：保留旧链接和 `Experienced Art  Art`。
- `brand_color`、`brand_name`：保留 `#FF1EAD`、`GitLab`。
- `service_name`：保留 `Social`。
- `quantity`：由旧 `Dedmands: 14` 映射为统一组件 Quantity 值 `14`。
- `total_price`、`price_range`、`bidding_time`：保留 `$1926.00`、`$192.00`、`2025/5/28 ~ 2025/5/28`。
- `item_tags`：保留 New Release、New、New Release 三个属性链接，移除旧内部样式 class。
- `bidders_html`、`bidder_more`：保留 4 个头像和 `+2`，改用统一组件语义结构。
- `button_text`、`button_disabled_class`、`button_aria_disabled`：保留禁用的 BID NOW。
- `demand_card_state_class`：初始使用 `demand-all-card--desktop-vertical`。

## 样式与外部布局

- 组件内部复用 `demand.css/.less`、`demand-all-card-desktop-vertical.css/.less`、`demand-all-card-mobile-vertical.css/.less`。
- PC `.popular-demands-pager` 保持每页两列；980px 以下保持单列。
- Mobile `#popuar-demands-mobile` 保持横向滚动，卡片作为滚动子项使用固定外部宽度和间距。
- 页面只调整统一卡片作为轮播或滚动子项时的宽度、外边距和 flex 属性，不覆盖内部节点。
- 删除首页旧 Demand Item 的 PC/Mobile 内部覆盖，CSS 与 LESS 同步。

## 状态切换

- 扩展 `DemandAllLayout` 构造参数，使 Item 容器和布局按钮可限定作用域；无参数调用保持 `demand-all.html` 原行为。
- 首页以 `.popular-demands-wrapper` 为作用域，覆盖 PC 轮播、Mobile 横向列表及轮播克隆节点。
- PC 使用 `demand-all-card--desktop-vertical`，Mobile 使用 `demand-all-card--mobile-vertical`。
- MutationObserver 使用 `subtree: true`，只切换组件最外层已有互斥状态 class。

## 实施步骤

- [x] 盘点统一组件、PC/Mobile Item、旧 partial 消费者、CSS / LESS 和脚本。
- [x] 首页加载统一 Demand Item 的两份 Vertical 状态 CSS。
- [x] PC 与 Mobile 的 8 个旧 include 改为直接 include `demand-all-card.html`。
- [x] 首页接入限定作用域的 `DemandAllLayout`。
- [x] 调整轮播/滚动外部布局并删除失效的旧内部覆盖。
- [x] 运行页面构建、JavaScript 语法、数据数量、残留引用和差异检查。

## 验证矩阵

- PC：可见轮播 Item 使用 `demand-all-card--desktop-vertical`，每页 2 张。
- Mobile：可见横向滚动 Item 使用 `demand-all-card--mobile-vertical`。
- 轮播克隆节点保持统一组件 DOM 和当前设备状态 class。
- 每组数据保留 3 个已收藏、1 个未收藏和 4 个禁用按钮。
- `demand-all.html` 的四状态切换保持兼容。
- 按项目规则，本轮用户未明确要求 Playwright，因此不执行浏览器截图验证。

## 检查命令

```sh
node scripts/build-pages.js
node --check js/demand-all-layout.js
node --check js/index.js
rg -n "index-popular-demand-item|figma-popular-demand-item" src/pages/index.html index.html css/index.css css/index.less
git diff --check
```
