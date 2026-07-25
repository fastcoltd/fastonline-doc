# post-detail Related items 统一商品 Item 迁移计划

## 目标与非目标

- [x] 仅迁移 `src/pages/post-detail.html` 的 Related items 轮播。
- [x] 使用唯一商品组件 `src/partials/components/item-all-card.html`。
- [x] 保留两页轮播；每页 4 个源码 Item，PC 共展示 8 个。
- [x] Mobile 复用相同 DOM，每页只显示前 2 个，共展示 4 个。
- [x] 保留标题、图片、链接、评分、Brand、Service、价格、库存、标签、收藏状态和购买按钮状态。
- [x] 保留轮播指示器、自动轮播、点击切页、触摸滑动和桌面拖动行为。
- [x] 不修改文章详情、评论、评分、解锁、分享、目录、页脚等其它功能。
- [x] 不迁移 `store-detail.html`、`system-post-detail.html`、`tag-all.html`。
- [x] 不创建页面专用商品组件、组件状态或组件内部样式。

## 当前结构与消费者

### Related items 源码结构

- 外部容器：`#best-items.carousel-container`。
- 轮播轨道：`.carousel-track`。
- 原始轮播页：2 个 `.carousel-slide.best-items-pager.layout-vertical`。
- 每个轮播页包含 4 个 `item-card-vertical.html`，源码共 8 个 Item。
- PC 实际为每页 4 个、两页共 8 个。
- Mobile 当前由 `optimizeRelatedItemsForMobile()` 将 8 个 Item 重组为每页 2 个、四页共 8 个。
- 用户已批准统一为 PC 共 8 个、Mobile 共 4 个；Mobile 每个源码轮播页只显示前 2 个。

### 旧 partial 与消费者

- 目标页旧 partial：`src/partials/components/item-card-vertical.html`。
- 反向搜索确认该 partial 仍被以下未纳入本任务的页面使用：
  - `src/pages/store-detail.html`
  - `src/pages/system-post-detail.html`
  - `src/pages/tag-all.html`
- 旧 partial 和仍被其它页面使用的共享旧样式必须保留。

### JavaScript 依赖

- `js/carousel.js` 依赖 `#best-items`、`.carousel-track`、`.carousel-slide` 和轮播指示器，不依赖统一组件内部结构。
- 轮播会用 `cloneNode(true)` 克隆首尾轮播页；统一组件可直接随页面克隆。
- `js/detail/post-detail.js` 的 `optimizeRelatedItemsForMobile()` 依赖旧根 class `.best-items-item`，并按设备重建 slide 和指示器。
- 本次删除该设备专属 DOM 重组逻辑，PC/Mobile 共用两个源码 slide；Mobile 通过外部布局隐藏每页第 3、4 个 Item。
- Similar items 初始化继续使用 `new Carousel('best-items', 20)`。
- 收藏行为继续复用 `js/common.js` 的 `.icon-aixin` 委托事件。
- 评论的动态克隆和其它 `innerHTML` 不生成 Related items，不在本任务范围。

### CSS / LESS 依赖

- `css/detail/post-detail.css` / `.less` 含 `.best-items-item`、`.figma-best-item` 等旧卡片内部覆盖。
- `.post-detail-pager`、`.best-items-pager`、轮播指示器、列宽、gap 和 Mobile 可见数量属于页面外部轮播布局。
- 统一商品组件直接复用：
  - `css/item-all.css` / `.less`
  - `css/item-all-card-desktop-vertical.css` / `.less`
  - `css/item-all-card-mobile-vertical.css` / `.less`
  - `js/item-all-layout.js`

## 数据统一策略

### 唯一数据源

- 继续使用现有 8 个源码 Item 作为唯一数据源。
- 第一页保留：
  1. `HOT` / `Items title` / 已收藏 / disabled。
  2. `Limited time sale` / `Items title` / 未收藏 / disabled。
  3. `TOP 1` / `Items title` / 未收藏 / 可购买。
  4. `Website operation` / `Itemstitle` / 未收藏 / disabled。
- 第二页保留：
  1. `50% OFF` / `Items title` / 未收藏 / disabled。
  2. `50% OFF` / `Items title` / 已收藏 / disabled。
  3. 无标记 / `Ritem efined` / 未收藏 / disabled。
  4. 无标记 / `Ritem efined` / 未收藏 / disabled。
- Mobile 不建立第二份数据或组件 DOM，只显示每个 slide 的前 2 个，因此两页共展示 4 个。

### include 参数映射

- `like`、`like_icon`、`aria_pressed` 原样传入。
- `mark_style`、`mark_text` 原样传入。
- `item_link`、`item_title` 原样传入。
- `rating_score`、`rating_recommend` 原样传入。
- `brand_color`、`brand_name`、`service_name` 原样传入。
- 标签链接和文案保持不变，移除旧组件专用标签 class。
- `item_button_class` 保留 disabled / 可购买状态。

## 统一组件结构与 class

- 唯一 partial：`src/partials/components/item-all-card.html`。
- 组件根：`<article class="item-all-card">`。
- 组件根不添加设备或方向状态 class。
- 语义结构、评分 partial、收藏行为钩子和按钮状态全部复用现有统一组件。
- 不修改统一组件 partial，也不新增 include 参数。

## 状态与切换逻辑

| 设备 | 方向 | 公共外层状态 class |
| --- | --- | --- |
| PC | Vertical | `item-all-card--desktop-vertical` |
| Mobile | Vertical | `item-all-card--mobile-vertical` |

- 状态 class 设置在现有 `#best-items` 公共轮播外层。
- 初始源码使用 `item-all-card--desktop-vertical`。
- 页面加载时创建 `new PageLayout(document.getElementById('best-items'), null)`。
- `PageLayout` 使用项目统一的 `768px` 断点切换状态；无布局按钮，方向固定为 Vertical。
- 跨断点只替换互斥状态 class，不重建卡片 DOM、数据或业务行为。

## 页面外部布局与兼容方案

- 保留 `.post-detail-pager`、`.carousel-container`、`.carousel-track`、`.carousel-slide` 和两个指示器。
- 将列宽规则从 `.best-items-item` 改为 `.best-items-pager > .item-all-card`。
- Mobile 使用 `.item-all-card:nth-of-type(n + 3)` 隐藏每页第 3、4 个。
- 页面样式只控制外部宽度、margin、gap 和每页可见数量。
- 删除页面内旧商品图片、标题、评分、字段、标签和按钮的内部覆盖，内部视觉采用统一商品 Item 标准状态样式。
- 统一组件基础样式已处理 `article`、`figure`、`header`、`footer` 等全局语义标签污染。

## 分批迁移顺序

- [x] 完成旧结构、消费者、动态入口、CSS/LESS、JS 和数据盘点。
- [x] 使用 Playwright 保存修改前 PC/Mobile 基线。
- [x] 取得用户对 PC 8 个、Mobile 4 个方案的批准。
- [x] 页面加载统一商品基础 CSS 和 PC/Mobile Vertical 状态 CSS。
- [x] 将 8 个旧 include 一对一迁移为统一商品 Item。
- [x] 给 `#best-items` 添加公共状态 class。
- [x] 加载 `js/item-all-layout.js` 并接入固定 Vertical 状态切换。
- [x] 删除 Mobile 旧 slide/指示器 DOM 重组逻辑。
- [x] 清理页面专属旧卡片内部 CSS/LESS。
- [x] 将轮播外部列宽和显隐规则改为统一组件根。
- [x] 构建根目录 HTML。
- [x] 执行语法、残留、CSS/LESS 和空白检查。
- [x] 完成修改后 PC/Mobile Playwright 回归。
- [x] 将 `codex_tasks/TASKS.md` 对应任务标记为已完成。

## Playwright 修改前基线

- 页面：`post-detail.html`
- PC：`1440 × 1000`
  - 轮播宽度约 `1260px`。
  - 两个原始 slide，每页 4 张、共 8 张源卡片。
  - 轮播克隆后共 4 个 slide、16 个旧卡片 DOM。
  - 可见单卡约 `293 × 647px`。
  - 两个轮播指示器。
- Mobile：`390 × 844`
  - 现有 JS 将 8 张源卡片重组为 4 个原始 slide，每页 2 张。
  - 轮播克隆后共 6 个 slide、12 个旧卡片 DOM。
  - 可见单卡约 `167 × 311px`。
  - 四个轮播指示器。
  - 页面无横向溢出。
- 基线截图：
  - `/tmp/post-detail-related-pc-before.png`
  - `/tmp/post-detail-related-mobile-before.png`
  - `/tmp/post-detail-related-pc-viewport-before.png`
  - `/tmp/post-detail-related-mobile-viewport-before.png`

## Playwright 修改后回归矩阵

- [x] PC `1440 × 1000`
  - [x] `#best-items` 使用 `item-all-card--desktop-vertical`。
  - [x] 每页 4 张、两页共 8 张源卡片。
  - [x] 每个组件根只有 `item-all-card`。
  - [x] 轮播首尾克隆和两个指示器正常。
- [x] Mobile `390 × 844`
  - [x] `#best-items` 使用 `item-all-card--mobile-vertical`。
  - [x] 每页只显示前 2 张、两页共展示 4 张。
  - [x] 保留两个指示器，不重建 slide。
  - [x] 页面无横向溢出。
- [x] PC → Mobile → PC 后状态 class 唯一、卡片数量和数据不变。
- [x] 指示器、自动轮播和 transform 正常。
- [x] 收藏图标与 `aria-pressed` 正确切换。
- [x] 标题链接保持 `item-detail.html?item_id=123`。
- [x] disabled 和可购买按钮状态保持正确。
- [x] 文章详情页其它区域无非预期变化。
- [x] Related items 使用统一商品 Item 标准视觉。
- [x] 因组件内部结构和标准视觉有意变化，不要求旧卡片内部零像素差异；检查状态、数据、数量、尺寸、外部布局、溢出和其它页面区域。

## 构建、语法与残留检查

```bash
node scripts/build-pages.js
node --check js/detail/post-detail.js
node --check js/item-all-layout.js
git diff --check
rg "item-card-vertical|best-items-item|figma-best-item|optimizeRelatedItemsForMobile" src/pages/post-detail.html css/detail/post-detail.css css/detail/post-detail.less js/detail/post-detail.js
rg "@include .*item-card-vertical\\.html" src
rg "item-all-card--" src/partials/components/item-all-card.html
rg "@include .*item-all-card\\.html" src/pages/post-detail.html
```

检查目标：

- [x] 根目录 `post-detail.html` 仅由构建脚本生成。
- [x] Related items 不再引用 `item-card-vertical.html`。
- [x] Related items 源码只有 8 个 `item-all-card.html` include。
- [x] 目标范围不再含旧卡片根或 Mobile DOM 重组逻辑。
- [x] 旧 partial 因其它页面仍有消费者而保留。
- [x] 组件根不含设备或方向状态 class。
- [x] `#best-items` 同时只有一个 Item 互斥状态 class。
- [x] CSS/LESS 修改成对且规则等价。
- [x] 修改后的 JS 语法正确。
- [x] 构建和 `git diff --check` 通过。

## 实施结果

- [x] Related items 已迁移到统一商品 Item。
- [x] PC 两页共 8 个源 Item，每页展示 4 个。
- [x] Mobile 复用同一 DOM，每页展示 2 个、两页共 4 个。
- [x] 轮播、收藏、链接和按钮行为已回归。
- [x] 构建、语法和残留检查已通过。
