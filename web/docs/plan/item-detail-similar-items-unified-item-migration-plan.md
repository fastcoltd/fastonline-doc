# item-detail Similar items 统一商品 Item 迁移计划

## 目标与非目标

- [x] 仅迁移 `src/pages/item-detail.html` 的 Similar items 轮播。
- [x] 使用唯一商品组件 `src/partials/components/item-all-card.html`。
- [x] 保留两页轮播；每页 4 个源码 Item，PC 共展示 8 个。
- [x] Mobile 复用相同 DOM，每页只显示前 2 个，共展示 4 个。
- [x] 保留现有标题、链接、评分、Brand、Service、价格、库存、标签、收藏状态和购买按钮状态。
- [x] 保留轮播指示器、自动轮播、点击切页、触摸滑动和桌面拖动行为。
- [x] 不修改 Item 详情页其它信息、FAQ、Store、Reviews、统计、购买、分享或投诉功能。
- [x] 不迁移 `post-detail.html`、`store-detail.html`、`system-post-detail.html`、`tag-all.html`。
- [x] 不为 Item 详情页创建第二份商品组件、页面专用组件状态或组件内部样式。

## 当前结构与消费者

### Similar items 源码结构

- 外部容器：`#best-items.carousel-container`。
- 轮播轨道：`.carousel-track`。
- 原始轮播页：2 个 `.carousel-slide.best-items-pager.layout-vertical`。
- 每个轮播页当前输出 8 个 `item-card-vertical.html`，源码共 16 个。
- PC 通过 `.best-items-item:nth-child(n + 5)` 隐藏每页第 5 个以后 Item，因此实际为每页 4 个、两页共 8 个。
- Mobile 通过 `.best-items-item:nth-child(n + 3)` 隐藏每页第 3 个以后 Item，因此实际为每页 2 个、两页共 4 个。
- 每页后 4 个 Item 在 PC 和 Mobile 支持范围内都不会展示，属于冗余源码，本次不迁移。

### 旧 partial 与消费者

- 目标页旧 partial：`src/partials/components/item-card-vertical.html`。
- 反向搜索确认该 partial 仍被以下页面使用：
  - `src/pages/post-detail.html`
  - `src/pages/store-detail.html`
  - `src/pages/system-post-detail.html`
  - `src/pages/tag-all.html`
- 因仍有未纳入本任务的消费者，旧 partial 和共享 `css/items.css` / `css/items.less` 必须保留。

### JavaScript 依赖

- `js/carousel.js` 只依赖 `#best-items`、`.carousel-track`、`.carousel-slide` 和指示器，不依赖旧卡片根 class。
- 轮播初始化会用 `cloneNode(true)` 克隆首尾轮播页；统一组件可直接随轮播页克隆，不需要维护第二份 HTML。
- `js/detail/item-detail.js` 只通过 `new Carousel('best-items', 20)` 初始化 Similar items。
- `js/detail/item-detail.js` 中的动态 `innerHTML` 用于 Reviews，不生成 Similar items，不在本任务范围。
- 收藏行为由 `js/common.js` 的 `.icon-aixin` 委托事件处理，统一商品组件继续复用该行为钩子。

### CSS / LESS 依赖

- 页面现有 `css/detail/item-detail.css` / `.less` 中存在一组 `#best-items .best-items-item`、`.figma-best-item` 等旧卡片内部覆盖。
- `.item-detail-pager .best-items-pager`、轮播指示器、断点列数和显隐属于页面外部轮播布局，可保留并改为匹配统一组件。
- 统一商品组件已有可直接复用的文件：
  - `css/item-all.css` / `css/item-all.less`
  - `css/item-all-card-desktop-vertical.css` / `.less`
  - `css/item-all-card-mobile-vertical.css` / `.less`
  - `js/item-all-layout.js`

## 数据统一策略

### 唯一数据源

- 以当前 PC 实际可见的 8 个 Item 为唯一数据源。
- 第一页保留当前前 4 个 Item：
  1. `HOT` / `Items title` / 5.0 / Quora / Cloud Service / 已收藏 / disabled。
  2. `Limited time sale` / `Items title` / 4.2 / Quora / Cloud Service / 未收藏 / disabled。
  3. `TOP 1` / `Items title` / 5.0 / nameQuora / Cloud Service / 未收藏 / 可购买。
  4. `Website operation` / `Itemstitle` / 5.0 / Quora / Cloud Service / 未收藏 / disabled。
- 第二页保留当前前 4 个 `Ritem efined` Item；其标记为空、未收藏、按钮 disabled。
- Mobile 不建立独立数据源，只通过外部轮播布局隐藏每页第 3、4 个 Item。

### include 参数映射

- `like`、`like_icon`、`aria_pressed` 原样传入。
- `mark_style`、`mark_text` 原样传入。
- `item_link`、`item_title` 原样传入。
- `rating_score`、`rating_recommend` 原样传入。
- `brand_color`、`brand_name`、`service_name` 原样传入。
- 标签链接和文案保持不变，去除旧组件专用的 `item-tag`、`item-tag-text`、`compaign-item-products-text` class，由统一组件结构选择器负责样式。
- `item_button_class` 保留 `disabled` / `item-buy-btn-red` 等业务状态；统一组件负责按钮结构和标准视觉。

## 统一组件结构

- 唯一 partial：`src/partials/components/item-all-card.html`。
- 组件根：`<article class="item-all-card">`。
- 状态 class 不进入组件根。
- 现有语义结构保持不变：
  - `figure`：商品图片。
  - `section > header`：标记和标题。
  - `[data-role="meta"]`：评分与商品字段。
  - `nav`：标签。
  - `footer > button`：购买操作。
  - `.icon-aixin`：收藏行为钩子。
- 不修改统一组件 partial，也不新增 include 参数。

## 状态与切换逻辑

| 设备 | 方向 | 公共外层状态 class |
| --- | --- | --- |
| PC | Vertical | `item-all-card--desktop-vertical` |
| Mobile | Vertical | `item-all-card--mobile-vertical` |

- 将状态 class 设置在现有 `#best-items` 轮播公共外层。
- 初始源码使用 `item-all-card--desktop-vertical`。
- 页面加载时创建 `new PageLayout(document.getElementById('best-items'), null)`。
- `PageLayout` 使用 `matchMedia('(max-width: 768px)')` 切换设备状态。
- 没有布局按钮，`currentLayout` 始终为 `vertical`。
- 跨断点时只替换 `#best-items` 的互斥状态 class，不修改轮播页、卡片 DOM、数据或行为。

## 页面外部布局与兼容方案

- 保留 `.item-detail-pager`、`.carousel-container`、`.carousel-track`、`.carousel-slide` 和指示器结构。
- 保留 PC 每页 4 个、Mobile 每页 2 个的轮播列数。
- 将旧 `.best-items-item` 列宽、显隐规则改为 `.item-all-card` 外部布局规则。
- 页面规则只控制卡片外部宽度、margin、轮播 gap 和每页可见数量。
- 删除 Item 详情页中仅用于恢复旧 `.best-items-item` / `.figma-best-item` 内部视觉的标题、图片、评分、字段、标签和按钮覆盖。
- 统一组件内部布局、字号、颜色、圆角、阴影和内容显隐直接采用标准状态 CSS。
- 保留 `css/items.css` 页面依赖，避免影响详情页其它历史结构及未迁移消费者。
- `item-all-card` 已在基础 CSS 中中和全局 `header` / `footer` 背景、内边距和对齐规则，无需新增语义标签兼容覆盖。

## 分批迁移顺序

- [x] 完成旧结构、消费者、动态入口、CSS/LESS、JS 和数据盘点。
- [x] 使用 Playwright 保存修改前 PC/Mobile 基线和元素尺寸。
- [x] 写入本计划并取得用户批准。
- [x] 页面加载统一商品基础 CSS 和 PC/Mobile Vertical 状态 CSS。
- [x] 两个轮播页分别迁移为 4 个统一商品 Item。
- [x] 给 `#best-items` 添加公共状态 class。
- [x] 加载 `js/item-all-layout.js` 并接入固定 Vertical 状态切换。
- [x] 清理页面专属旧卡片内部 CSS/LESS。
- [x] 将轮播外部列数和显隐规则改为统一组件根。
- [x] 构建根目录 HTML。
- [x] 执行残留、语法、CSS/LESS 和空白检查。
- [x] 完成修改后 PC/Mobile Playwright 回归。
- [x] 将 `codex_tasks/TASKS.md` 对应任务标记为已完成。

## Playwright 修改前基线

- 页面：`item-detail.html`
- PC：`1440 × 1000`
  - 轮播宽度约 `1260px`。
  - 每页显示 4 张卡片。
  - 单卡约 `293 × 647px`。
  - 两个原始轮播页，每页 8 个源码 Item。
  - 轮播克隆后共 4 个 slide、32 个旧卡片 DOM。
- Mobile：`390 × 844`
  - 轮播宽度约 `343px`。
  - 每页显示 2 张卡片。
  - 单卡约 `167 × 311px`。
  - 页面无横向溢出。
- 基线截图：
  - `/tmp/item-detail-similar-pc-before.png`
  - `/tmp/item-detail-similar-mobile-before.png`
- 已验证：
  - 两个指示器可切换轮播页。
  - 轮播 transform 与当前页同步。
  - 可见卡片收藏图标和 `aria-pressed` 正确切换。

## Playwright 修改后回归矩阵

- [x] PC `1440 × 1000`
  - [x] `#best-items` 使用 `item-all-card--desktop-vertical`。
  - [x] 每页 4 张、两页共 8 张源卡片。
  - [x] 每个组件根只有 `item-all-card`。
  - [x] 轮播首尾克隆后结构与指示器正常。
- [x] Mobile `390 × 844`
  - [x] `#best-items` 使用 `item-all-card--mobile-vertical`。
  - [x] 每页只显示前 2 张、两页共展示 4 张。
  - [x] 页面无横向溢出。
- [x] PC → Mobile → PC 后状态 class 唯一、卡片数量和数据不变。
- [x] 两个轮播指示器、自动轮播和 transform 正常。
- [x] 收藏图标与 `aria-pressed` 正确切换。
- [x] 标题链接保持 `item-detail.html?item_id=123`。
- [x] disabled 和可购买按钮状态保持正确。
- [x] 详情页其它区域无非预期变化。
- [x] Similar items 内部采用统一商品 Item 标准视觉。
- [x] 因组件结构和标准视觉有意变化，旧卡片内部不做零像素差异；使用状态、数据、数量、bounding box、外部布局、溢出和页面其它区域检查。

## 构建、语法与残留检查

```bash
node scripts/build-pages.js
node --check js/detail/item-detail.js
node --check js/item-all-layout.js
git diff --check
rg "item-card-vertical|best-items-item|figma-best-item" src/pages/item-detail.html css/detail/item-detail.css css/detail/item-detail.less
rg "@include .*item-card-vertical\\.html" src
rg "item-all-card--" src/partials/components/item-all-card.html
rg "item-all-card" src/pages/item-detail.html
```

检查目标：

- [x] 根目录 `item-detail.html` 仅由构建脚本生成。
- [x] Similar items 不再引用 `item-card-vertical.html`。
- [x] Similar items 源码只有 8 个 `item-all-card.html` include。
- [x] 目标页面不再含旧 `best-items-item` / `figma-best-item` 内部选择器。
- [x] 旧 partial 因其它页面仍有消费者而保留。
- [x] 组件根不含设备或方向状态 class。
- [x] `#best-items` 同时只有一个 Item 互斥状态 class。
- [x] CSS/LESS 修改成对且语义一致。
- [x] 修改后的 JS 语法正确。
- [x] 构建和 `git diff --check` 通过。

## 实施结果

- [x] Similar items 已迁移到统一商品 Item。
- [x] PC 两页共 8 个源 Item，每页展示 4 个。
- [x] Mobile 复用同一 DOM，每页展示 2 个、两页共 4 个。
- [x] 轮播、收藏、链接和按钮行为已回归。
- [x] 构建、语法和残留检查已通过。
