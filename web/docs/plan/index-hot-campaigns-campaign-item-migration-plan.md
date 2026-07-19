# Index Hot campaigns 迁移到统一 Campaign Item 计划

## 目标

- 使用唯一组件 `src/partials/components/compaign-all-card.html` 替换首页 Hot campaigns 的 8 个 Item。
- 保留首页原有封面、链接、标题、统计数据、产品说明、标签与收藏状态。
- 首页固定使用 Vertical 方向，PC / Mobile 只切换现有 Vertical 状态 class。
- 保留首页现有轮播、每页 4 张卡片及页面外部响应式列数。

## 明确不做

- 不还原首页旧 Campaign Item 的页面专用内部样式。
- 不新增组件 HTML、组件状态 class、组件 CSS 或 LESS 文件。
- 不迁移 Campaign 详情页和 `tag-all.html` 中仍在使用的旧 Item。
- 不删除仍有消费者的 `src/partials/components/hot-compaign-item.html`。

## 盘点结果

- `src/pages/index.html` 中有两组 Hot campaigns 轮播页，每组 4 张，共 8 张静态 Item。
- 7 张 Item 为已收藏且有 4 个标签；1 张为未收藏且无标签。
- 首页旧入口为 `src/partials/index-hot-compaign-item.html` 和 `src/partials/index-hot-compaign-item-no-tags.html`，迁移后无其他消费者，可以删除。
- 旧底层结构 `src/partials/components/hot-compaign-item.html` 仍被 `compaign-all-vertical-item.html` 间接用于 Campaign 详情页和 `tag-all.html`，必须保留。
- `js/carousel.js` 使用 `cloneNode(true)` 克隆轮播页，不存在 JavaScript 手写完整 Campaign Item HTML。
- `js/compaign-all-layout.js` 当前固定操作全页面布局按钮和 `#items-grid`，需要支持限定到首页 `#hot-compaigns`。
- `css/index.css` / `css/index.less` 中 `#hot-compaigns .figma-hot-compaign-item...` 是首页旧卡片内部覆盖，迁移后可删除。

## 数据映射

- `like`、`like_icon`、`aria_pressed`：保留原收藏状态。
- `cover_src`：`image/best-item-cover.png`；`cover_alt` 使用 `Campaign cover`。
- `item_link`、`item_title`：保留旧链接和 `Campaigns title`。
- `items_label`、`items_value`、`sales_label`、`sales_value`、`orders_label`、`orders_value`、`favorites_label`、`favorites_value`：保留旧统计数据。
- `products_label`、`products_text`：保留旧产品说明。
- `item_tags`：将旧标签数据映射为统一组件的语义化 `<nav>` 内容；无标签卡片传不可见的零宽占位，不生成标签链接。
- `ad_text`：使用统一 Campaign Item 已有的 `AD` 标志。
- `compaign_card_state_class`：初始使用 `compaign-all-card--desktop-vertical`。

## 样式与外部布局

- 组件内部复用 `compaign.css/.less`、`compaign-all-card-desktop-vertical.css/.less`、`compaign-all-card-mobile-vertical.css/.less`。
- `.hot-compaigns-pager` 继续负责轮播页 flex、换行、列数和卡片间距。
- PC 大屏保持四列，1160px 以下三列，980px 以下两列，Mobile 保持两列。
- 页面只覆盖卡片作为轮播子项时的宽度和外边距，不覆盖统一组件内部节点。
- 删除首页旧 Campaign Item 的 PC/Mobile 内部覆盖；共享 `compaign.css/.less` 中仍有消费者的旧样式保持不变。

## 状态切换

- 扩展 `CompaignAllLayout` 构造参数，使 Item 容器和布局按钮可限定作用域；无参数调用保持 `compaign-all.html` 原行为。
- 首页传入 `#hot-compaigns` 且禁用布局按钮，方向固定为 Vertical。
- PC 使用 `compaign-all-card--desktop-vertical`，Mobile 使用 `compaign-all-card--mobile-vertical`。
- MutationObserver 覆盖轮播克隆生成的 Campaign Item，只替换组件根节点已有互斥状态 class。
- `createCard()` 继续克隆由统一 partial 生成的组件原型，不改变 Campaign 列表页动态加载行为。

## 实施步骤

- [x] 盘点统一组件、首页静态 Item、旧 partial 消费者、CSS / LESS 和轮播脚本。
- [x] 首页加载统一 Campaign Item 的两份 Vertical 状态 CSS。
- [x] 8 个旧 include 改为直接 include `compaign-all-card.html`。
- [x] 首页接入限定作用域的 `CompaignAllLayout`。
- [x] 调整首页外部轮播布局并删除失效的旧内部覆盖和零消费者包装 partial。
- [x] 运行页面构建、JavaScript 语法、残留引用和差异检查。

## 验证矩阵

- PC：首页 Hot campaigns 全部使用 `compaign-all-card--desktop-vertical`，每页 4 张。
- Mobile：首页 Hot campaigns 全部使用 `compaign-all-card--mobile-vertical`，每行 2 张。
- 轮播克隆节点保持统一组件 DOM 和当前设备状态 class。
- 8 张卡片、7 个已收藏状态、1 个未收藏无标签状态及原业务数据保留。
- `compaign-all.html` 的四状态切换和动态克隆保持兼容。
- 按项目规则，本轮用户未明确要求 Playwright，因此不执行浏览器截图验证。

## 检查命令

```sh
node scripts/build-pages.js
node --check js/compaign-all-layout.js
node --check js/index.js
rg -n "index-hot-compaign-item|figma-hot-compaign-item" src/pages/index.html index.html css/index.css css/index.less
git diff --check
```
