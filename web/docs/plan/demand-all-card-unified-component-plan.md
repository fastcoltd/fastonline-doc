# Demand All 卡片统一封装计划

## 目标与非目标

- [x] 将 `demand-all.html` 当前每条数据同时输出的 Desktop、Mobile Vertical、Mobile Horizontal 三套 DOM 统一为一份组件 DOM。
- [x] 使用四个互斥根状态 class 支持 PC / Mobile × Vertical / Horizontal。
- [x] 四种状态统一使用当前 PC Horizontal 卡片的数据、链接、收藏状态和按钮状态。
- [x] 布局或设备变化时只替换组件根状态 class，不替换 DOM、数据或内部 HTML。
- [x] 除已批准的数据统一外，保持四种状态原有尺寸、位置、字体、颜色、间距、圆角、阴影和交互。
- [x] Show More 动态新增卡片继续使用统一 DOM 并继承当前状态。
- [x] 本次只迁移 `demand-all.html`，不迁移 `attribute-all.html`、`search-all.html`、`index.html` 或其它页面。
- [x] 不删除仍有范围外消费者的旧 Demand partial、旧 CSS/LESS 和共享 JS。

## 当前结构与消费者

### demand-all.html 当前结构

- 页面只有一个 `.items-container.demand-all-figma-container` 和 `#items-grid`，初始带 `.layout-vertical`。
- `src/partials/components/demand-all-figma-items.html` 输出 4 条逻辑数据。
- 每条逻辑数据通过 `demand-all-figma-item.html` 同时输出：
  - 一套 `.demand-all-horizontal-desktop-item`，由 PC Vertical / Horizontal 共用；
  - 一套 `.demand-all-vertical-mobile-item`；
  - 一套 `.demand-all-horizontal-mobile-item`。
- 当前 4 条业务数据实际输出 12 个顶层卡片 DOM，Mobile 通过 CSS 显隐其中一套。
- `js/layoutswitch.js` 的 `PageLayout` 通过替换容器 `.layout-vertical/.layout-horizontal` 控制布局。
- `js/demandpage.js` 的 Show More 会复制 `#items-grid` 中除空状态外的全部子节点，即同时复制三套 DOM。

### 旧 partial 与消费者

- `src/partials/components/demand-all-figma-items.html`
  - `demand-all.html`：本次迁出。
  - `attribute-all.html`：Vertical 和 Horizontal Demand 列表继续使用，不能删除或修改成目标页专属结构。
- `src/partials/components/demand-all-figma-item.html`
  - 由 `demand-all-figma-items.html` 间接消费；因 `attribute-all.html` 仍使用而保留。
- `src/partials/components/demand-all-vertical-mobile-item.html`
  - 由 `demand-all-figma-item.html` 使用，继续保留。
- `src/partials/components/demand-all-horizontal-mobile-item.html`
  - 由 `demand-all-figma-item.html` 和 `search-all-demand-item.html` 使用，继续保留。
- `src/partials/components/demand-shared-item.html`
  - 被 `demand-all-figma-item.html` 以及首页 Popular Demand partial 使用，继续保留。

### CSS/LESS 与 JS 依赖

- `css/demand.css/.less` 中旧 `.demand-item`、`.demand-all-figma-*`、Mobile Vertical/Horizontal 规则仍服务 `attribute-all.html`、`search-all.html`、`index.html`，本次不清理。
- `css/attribute-all.css/.less` 存在对 `.demand-all-figma-item` 的页面覆盖，不修改。
- 收藏行为由 `js/common.js` 对 `.icon-aixin` 的事件委托提供，新组件保留该行为 class。
- BID NOW 行为由 `js/common.js` 对 `.demand-button` 的事件委托提供，禁用状态使用 `.disabled`，新组件保留这两个行为/状态 class。
- `js/layoutswitch.js` 被多个页面共享，本次不修改；目标页改用独立 `js/demand-all-layout.js`。
- `js/demandpage.js` 只由目标页加载，可在本次范围内迁移 Show More 的克隆选择器和布局初始化。

## 数据统一策略

四种状态统一使用当前 PC Horizontal 数据：

- 静态逻辑卡片数量：4 张。
- 收藏：未收藏，`data-like="0"`、`image/Vector_nor.svg`、`aria-pressed="false"`。
- 链接：`demand-detail.html?name=demand-name`。
- 标题：`Experienced Art Director Needed for Website`。
- Brand：`GitLab`，颜色 `#FF1EAD`。
- Service：`Social Accounts`。
- Quantity：`14`。
- Total price：`$1926.00`。
- Price range：`$192.00~$195.00`。
- Bidding time：`2025/05/28 ~ 2025/05/28`。
- 属性标签：Waterproof、Resolution、Installation、Device 四个 PC Horizontal 标签及原顺序。
- Bidder：当前 PC Horizontal 的 10 个头像和 `+2`。
- 按钮：四张卡片保持 disabled、enabled、disabled、disabled 顺序。

Mobile 原硬编码的 Color/Country 标签、`+3` 和较少头像不再作为数据源。移动状态可通过 CSS 隐藏 Price range、Bidder 文案和超出当前视觉范围的头像，但完整 PC Horizontal 数据始终保留在同一 DOM 中。

## 新组件结构与参数

新建 `src/partials/components/demand-all-card.html`，使用一份语义结构：

```html
<article class="demand-all-card {{demand_card_state_class}}">
    <header><h2><a href="{{item_link}}">{{item_title}}</a></h2></header>
    <dl data-role="details">...</dl>
    <section data-role="bidders">...</section>
    <nav aria-label="Demand attributes">...</nav>
    <button class="demand-button {{button_disabled_class}}">{{button_text}}</button>
    <!-- include item-like-button.html -->
</article>
```

参数包括：

- `demand_card_state_class`
- `like`、`like_icon`、`aria_pressed`
- `item_link`、`item_title`
- `brand_color`、`brand_name`、`service_name`
- `quantity`、`total_price`、`price_range`、`bidding_time`
- `item_tags`
- `bidders_html`、`bidder_more`
- `button_text`、`button_disabled_class`、`button_aria_disabled`

## Class 与选择器方案

### 根节点 class

- 基础：`demand-all-card`
- 互斥状态：
  - `demand-all-card--desktop-vertical`
  - `demand-all-card--desktop-horizontal`
  - `demand-all-card--mobile-vertical`
  - `demand-all-card--mobile-horizontal`

### 允许保留的内部 class

- `.icon-aixin`：公共收藏行为和公共样式钩子，由 `item-like-button.html` 输出。
- `.demand-button`：公共 BID NOW 行为钩子。
- `.disabled`：按钮禁用状态。

### 内部结构选择器

- 使用根作用域下的 `> header`、`> dl`、`> section`、`> nav`、`> button`。
- 字段使用 `[data-role]`、`[data-field]`，不新增旧 `.item-brand-*`、`.demand-all-figma-*` class。
- 标签使用 `> nav > a > span`。
- Bidder 头像使用 `[data-role="avatars"] > img`，更多数量使用 `[data-role="more"]`。
- Brand 颜色通过根节点 CSS 自定义属性传入，避免给内部节点新增样式 class。
- 全局 `header` 和 `button` 规则会污染语义节点；组件基础规则显式重置背景、padding、对齐和边框。

## CSS / LESS 职责

### 公共样式

复用并扩展 `css/demand.css/.less`：

- `.demand-all-card` 公共定位、边框、背景、hover、overflow。
- 语义节点默认样式和全局污染重置。
- 标题、字段、标签、Bidder、按钮和收藏的公共基础。
- `.demand-all-unified-items-pager` 的单列表 flex 基础；列表列数和间距由卡片状态宽度与 margin 表达。

### 四状态样式

新建：

- `css/demand-all-card-desktop-vertical.css/.less`
- `css/demand-all-card-desktop-horizontal.css/.less`
- `css/demand-all-card-mobile-vertical.css/.less`
- `css/demand-all-card-mobile-horizontal.css/.less`

每份文件只由对应根状态 class 驱动，负责该状态的宽高、方向、间距、字段排列、内容显隐、头像可见数量和按钮布局。

列表布局兼容策略：

- Desktop Vertical：两列，15px 列间距、20px 行间距；769–980px 保留旧固定宽度兼容。
- Desktop Horizontal：单列，20px 行间距。
- Mobile Vertical：两列，8px 间距。
- Mobile Horizontal：单列，8px 间距。
- 使用根状态卡片自身宽度和 margin，不在模式切换时修改父容器 class。

## 页面与状态切换

修改 `src/pages/demand-all.html`：

- 加载四份状态 CSS。
- 保留一个 `.items-container` 和一个 `#items-grid`，移除目标列表的 `.layout-vertical` 模式依赖。
- 将 `demand-all-figma-items.html` 替换为 4 次统一组件 include。
- 初始状态使用 `demand-all-card--desktop-vertical`，页面初始化后按实际设备同步。
- 目标页不再加载 `js/layoutswitch.js`，改为加载 `js/demand-all-layout.js`。

新建 `js/demand-all-layout.js`：

- `matchMedia('(max-width: 768px)')` 判断 Mobile / Desktop。
- `currentLayout` 保存 Vertical / Horizontal。
- 布局按钮读取 `event.currentTarget.dataset.layout`。
- 每次移除完整四状态 class 集合，再添加唯一目标状态 class。
- 操作限定在 `#items-grid > .demand-all-card`。
- `MutationObserver` 同步 Show More 新增卡片。

## 动态内容迁移

修改 `js/demandpage.js`：

- 保留 Pagination、Show More、Loading 和当前 2 秒模拟延迟。
- 使用 `window.demandAllLayout = new DemandAllLayout()` 代替目标页的 `PageLayout`。
- Show More 只克隆 `.demand-all-card`，从 4 张增加到 8 张统一卡片。
- 空状态 `.no-data-wrapper` 保持原位置和排除逻辑。
- 不在 JS 中手写统一卡片 HTML。

## 分批实施顺序

- [x] 修改前建立四状态 Playwright 基线和元素尺寸清单。
- [x] 新建统一组件 partial。
- [x] 在 `demand.css/.less` 添加根基础样式。
- [x] 完成 PC Horizontal 状态并进行像素对齐。
- [x] 完成 PC Vertical 状态并进行像素对齐。
- [x] 完成 Mobile Horizontal 状态。
- [x] 完成 Mobile Vertical 状态。
- [x] 替换目标页旧三套 DOM，接入专用状态脚本。
- [x] 迁移 Show More 克隆逻辑。
- [x] 构建、语法、CSS/LESS 与残留检查。
- [x] 修改后四状态 Playwright 回归。

## Playwright 基线与回归矩阵

使用独立临时 Git worktree打开修改前 HEAD，基线与修改后工作区使用不同端口；使用 Playwright，不使用 Chrome MCP。

视口：

- PC：1440 × 1200。
- Mobile：390 × 844。

状态：

1. PC Vertical
2. PC Horizontal
3. Mobile Vertical
4. Mobile Horizontal

每种状态记录：

- 列表和首张可见卡片截图。
- 列表、首两张逻辑卡片、可见卡片、标题、收藏、字段、标签、Bidder、按钮 bounding box。
- 字体、行高、颜色、边框、圆角、阴影、gap、overflow。
- 可见逻辑卡片数、实际顶层 DOM 数和当前布局按钮状态。

对比策略：

- PC Vertical / Horizontal 数据不变，目标为同尺寸组件截图 0 个变化像素。
- Mobile 两种状态因统一为 PC Horizontal 数据，像素内容差异属于已批准变化；必须保证对应布局和关键容器 bounding box 与旧版一致。
- 页面筛选、排序、Show More、分页和空状态区域不得发生非预期变化。

## 行为回归

- [x] Vertical / Horizontal 切换只改变卡片根状态 class。
- [x] PC / Mobile 跨 768px 断点只改变卡片根状态 class。
- [x] 每张卡片始终只有一个互斥状态 class。
- [x] 卡片数量和顺序不随状态切换变化。
- [x] 收藏按钮切换图片、jQuery `data-like` 和 `aria-pressed`。
- [x] 标题和属性标签链接保持有效。
- [x] enabled BID NOW 触发现有行为，disabled 按钮不触发。
- [x] Show More 从 4 张变为 8 张统一 DOM，并继承当前状态。
- [x] 分页、筛选、排序、空状态和页面其它组件不受影响。

## 构建、语法与残留检查

```bash
node scripts/build-pages.js
node --check js/demand-all-layout.js
node --check js/demandpage.js
git diff --check
```

追加检查：

```bash
rg "demand-all-figma-items|demand-all-figma-item|demand-all-vertical-mobile-item|demand-all-horizontal-mobile-item" src/pages/demand-all.html js/demand-all-layout.js js/demandpage.js
rg "layout-vertical|layout-horizontal" src/pages/demand-all.html js/demand-all-layout.js
rg "demand-all-card--" src/partials/components/demand-all-card.html css js
rg "class=\"[^\"]+\"" src/partials/components/demand-all-card.html
```

确认：

- [x] 目标页每条业务数据只输出一份统一 DOM。
- [x] 旧 partial 因仍有范围外消费者而保留。
- [x] CSS / LESS 文件成对且规则等价。
- [x] 根目录 `demand-all.html` 由构建脚本生成。
- [x] 无 JS 语法、空白或目标范围旧引用残留错误。
