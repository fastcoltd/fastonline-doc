# store-detail Items 统一商品 Item 迁移计划

## 目标与非目标

- [x] 仅迁移 `src/pages/store-detail.html` 的 Items 区域。
- [x] 使用唯一商品组件 `src/partials/components/item-all-card.html`。
- [x] 保留 6 个源码 Item 及其顺序、数据、收藏和按钮状态。
- [x] PC 使用 Desktop Vertical，Mobile 使用 Mobile Vertical，同一套 DOM 响应式切换。
- [x] 保留 PC 初始 4 个、Mobile 初始 4 个且 Show More 后显示 6 个的当前数量语义。
- [x] 保留搜索筛选区、分页 UI、FAQs、Reviews、Store 信息、统计图、页头和页脚。
- [x] 不创建页面专用商品组件、组件状态或组件内部样式。
- [x] 不为当前缺失的数据加载接口虚构分页数据。

## 当前结构与消费者

### Items 源码结构

- 列表区域：`#best-items`。
- 列表公共外层：`#items-grid.items-pager.store-detail-items-pager`。
- 当前布局包装：`.layout-vertical.items-container`。
- 源码包含 6 个 `item-card-vertical.html`：
  - 前 4 个带 `store-detail-best-items-item`。
  - 后 2 个额外带 `store-detail-extra-item`，默认隐藏。
- PC `1440 × 1000`：列表宽约 `830px`，每行 3 个，显示前 4 个。
- Mobile `390 × 844`：列表宽约 `343px`，每行 2 个，初始显示前 4 个；Show More 后显示全部 6 个。

### 旧 partial 与消费者

- 旧 partial：`src/partials/components/item-card-vertical.html`。
- 全项目反向搜索确认它仍被以下未纳入任务的页面使用：
  - `src/pages/system-post-detail.html`
  - `src/pages/tag-all.html`
- 本次只移除 `store-detail.html` 的 6 个引用，保留旧 partial 和其它消费者。

### JavaScript 依赖

- `js/detail/store-detail.js` 的 `initializeItemsShowMore()` 依赖：
  - `#load-more-items`
  - `#items-grid`
  - `.store-detail-extra-item`
  - `.is-visible`
- 当前在 PC 首次加载时，JS 给 Show More 写入 `style="display:none"`；之后切换到 Mobile 仍保持隐藏。
- 页面内 Pagination 回调调用不存在的 `loadItems()` / `reloadItems()`，基线点击 Next 已抛出 `ReferenceError`；当前没有动态 Item HTML 或数据加载实现。
- 收藏和购买行为由 `js/common.js` 委托到 `.icon-aixin` / `.item-buy-btn`。
- `js/detail/store-detail.js` 使用 `document.getElementsByTagName('footer')[0]` 获取页面 Footer。统一组件内部包含语义化 `<footer>`，迁移后必须明确改为 `.common-footer-wrapper`，避免吸底计算命中 Item 按钮区域。

### CSS / LESS 依赖

- `css/detail/store-detail.css` / `.less` 包含：
  - `.store-detail-best-items-item` 和 `.store-detail-extra-item` 数量/显隐规则。
  - `.best-items-item`、`.figma-best-item` 及旧标题、评分、字段、标签和按钮的页面专属内部覆盖。
  - `.store-detail-items-pager` 外部列表排布。
  - Show More 和 Reviews 等其它页面规则。
- 统一商品 Item 直接复用：
  - `css/item-all.css` / `.less`
  - `css/item-all-card-desktop-vertical.css` / `.less`
  - `css/item-all-card-mobile-vertical.css` / `.less`
  - `js/item-all-layout.js`

## 数据统一策略

继续使用当前 6 个源码 Item 作为唯一数据源：

1. `HOT` / `Items title` / `5.0 (62)` / Quora / 已收藏 / disabled。
2. `Limited time sale` / `Items title` / `4.2 (62)` / Quora / 未收藏 / disabled / 无标签。
3. `TOP 1` / `Items title` / `5.0 (62)` / nameQuora / 未收藏 / 可购买红色按钮。
4. `Website operation` / `Itemstitle` / `5.0 (62)` / Quora / 未收藏 / disabled。
5. 无标记 / `Ritem efined` / `5.0 (62)` / Quora / 未收藏 / disabled。
6. 无标记 / `Ritem efined` / `5.0 (62)` / Quora / 未收藏 / disabled。

- 图片、链接、价格 `$325.00`、库存 `52` 和 Service 保持不变。
- 标签文案和链接原样保留，移除旧组件专用内部 class。
- 无标签 Item 使用零宽占位保持标准 Vertical 网格行稳定。
- `like`、`like_icon`、`aria_pressed`、`mark_style`、`mark_text`、`item_button_class` 原样映射。

## 统一组件、状态与结构

- 唯一 partial：`src/partials/components/item-all-card.html`。
- 组件根：`<article class="item-all-card">`，不添加页面、设备、方向或额外显隐 class。
- 公共状态根：`#items-grid`。
- 状态映射：

| 设备 | 方向 | 公共外层状态 class |
| --- | --- | --- |
| PC | Vertical | `item-all-card--desktop-vertical` |
| Mobile | Vertical | `item-all-card--mobile-vertical` |

- `#items-grid` 复用公共 `item-all-items-pager` 外部列表 class，消除通用 `.layout-vertical .items-pager` 的额外 gap。
- 页面加载时创建 `new PageLayout(document.getElementById('items-grid'), null)`。
- `PageLayout` 使用统一 `768px` 断点，只替换 `#items-grid` 的 Item 状态 class，不重建卡片。

## 数量显隐与 Show More

- 不再给第 5、6 个组件根添加 `.store-detail-extra-item`。
- 页面外部样式使用 `.store-detail-items-pager > .item-all-card:nth-of-type(n + 5)` 隐藏第 5、6 个。
- 点击 Show More 后给公共外层 `#items-grid` 添加 `.is-expanded`，恢复第 5、6 个显示。
- Show More 的设备显隐继续由 CSS 媒体查询负责：
  - PC 隐藏。
  - Mobile 且未展开时显示。
  - 展开后由 JS 隐藏。
- PC 首次加载不再写入会污染后续断点的内联 `display:none`，因此 PC → Mobile 后 Show More 可正常出现。

## CSS / LESS 清理

- 删除 Store Detail 中仅服务旧商品内部结构的：
  - `.best-items-item`
  - `.figma-best-item`
  - `.best-items-item-content`
  - 旧标题、评分、字段、标签和购买按钮覆盖。
- 删除 `.store-detail-best-items-item` / `.store-detail-extra-item` 规则。
- 保留 Store 页面、Reviews、FAQs、搜索区和 Show More 的非商品内部规则。
- 新增的规则只负责：
  - Item 外部数量显隐。
  - `#items-grid.is-expanded` 展开状态。
- CSS 与 LESS 同步修改。

## JavaScript 兼容

- `initializeItemsShowMore()` 改为统计 `#items-grid` 的直接 `.item-all-card` 子元素。
- 展开时只给公共外层添加 `.is-expanded` 并隐藏按钮，不给组件根写 class。
- 初始化时不再按当前设备写入 Show More 内联显隐。
- 将页面 Footer 查询改为 `document.querySelector('.common-footer-wrapper')`。
- 增加 `PageLayout` 的 Vertical 状态初始化。
- Pagination 当前不存在数据加载接口，保持现有分页 UI 和代码范围；不新增模板或虚构数据。基线已有 `loadItems is not defined`，作为既有问题记录。

## 分批实施顺序

- [x] 完成旧结构、共享消费者、数据、CSS/LESS、JS 和语义标签冲突盘点。
- [x] 使用 Playwright 建立 PC/Mobile、Show More、跨断点、收藏、购买和分页基线。
- [x] 取得用户对数量、状态和分页边界的明确批准。
- [x] 页面加载统一 Item 基础 CSS 和 PC/Mobile Vertical 状态 CSS。
- [x] 将 6 个旧 include 一对一迁移为统一商品 Item。
- [x] 设置 `#items-grid` 公共状态和外部列表 class。
- [x] 接入 `PageLayout` 固定 Vertical 状态切换。
- [x] 将 Extra Item 显隐迁移到外层 `.is-expanded`。
- [x] 修复 Show More 跨断点内联隐藏问题。
- [x] 修复页面 Footer 选择器与组件语义 `<footer>` 的冲突。
- [x] 清理旧商品内部 CSS/LESS。
- [x] 构建根目录 HTML。
- [x] 执行语法、引用、CSS/LESS 和空白检查。
- [x] 使用独立端口完成修改后 Playwright 回归。
- [x] 将 `codex_tasks/TASKS.md` 对应任务标记为已完成。

## Playwright 修改前基线

- PC `1440 × 1000`
  - 源码 6 个旧 Item，实际显示 4 个。
  - 列表宽约 `830px`，每行 3 个。
  - 单卡约 `267 × 655px`。
  - Show More 为 `display:none`，且存在内联 `display:none`。
  - Pagination 显示；点击 Next 后卡片不变，并抛出既有 `loadItems is not defined`。
- Mobile `390 × 844`
  - 源码 6 个旧 Item，初始显示 4 个。
  - 列表宽约 `343px`，每行 2 个。
  - 单卡约 `168 × 295px`。
  - Show More 后显示 6 个并隐藏按钮。
  - 页面无横向溢出。
- PC 首次加载后切换 Mobile：
  - Item 仍显示 4 个。
  - Show More 仍受 PC 初始化的内联 `display:none` 影响，无法出现。
- 收藏从 `true` 正确切换到 `false`；可购买 Item 在未登录时打开登录弹层。

## Playwright 修改后回归矩阵

- [x] PC `1440 × 1000`
  - [x] `#items-grid` 使用 `item-all-card--desktop-vertical`。
  - [x] 源码只有 6 个 `.item-all-card`，初始显示 4 个。
  - [x] 每行 3 个，页面无横向溢出。
  - [x] Show More 隐藏。
- [x] Mobile `390 × 844`
  - [x] 同一组 6 个 DOM 使用 `item-all-card--mobile-vertical`。
  - [x] 初始显示 4 个，每行 2 个。
  - [x] Show More 后显示全部 6 个，按钮隐藏。
  - [x] 页面无横向溢出。
- [x] PC → Mobile → PC 后状态 class 唯一，数据和数量不变。
- [x] PC → Mobile 后未展开的 Show More 正常出现。
- [x] 收藏与 `aria-pressed` 正确切换。
- [x] disabled 与可购买按钮状态正确；未登录购买仍打开登录弹层。
- [x] 标题和标签链接保持正确。
- [x] Footer 吸底计算使用 `.common-footer-wrapper`。
- [x] Pagination 既有缺失数据加载接口不因迁移扩大或产生第二份 Item HTML。
- [x] Store 信息、筛选区、FAQs、Reviews、统计图和页脚无非预期变化。
- [x] 因统一组件标准视觉有意替换旧页面专属卡片，不要求组件内部零像素差异；比较数据、状态、数量、外部布局、尺寸和周边页面。

## 构建、语法与残留检查

```bash
node scripts/build-pages.js
node --check js/detail/store-detail.js
node --check js/item-all-layout.js
git diff --check
rg "item-card-vertical|store-detail-best-items-item|store-detail-extra-item|best-items-item|figma-best-item" src/pages/store-detail.html css/detail/store-detail.css css/detail/store-detail.less js/detail/store-detail.js
rg "@include .*item-card-vertical\\.html" src
rg "item-all-card--" src/partials/components/item-all-card.html
rg "@include .*item-all-card\\.html" src/pages/store-detail.html
```

检查目标：

- [x] 根目录 `store-detail.html` 仅由构建脚本生成。
- [x] Items 源码只有 6 个统一 Item include。
- [x] 目标范围不再包含旧商品根或旧 Extra Item 根级 class。
- [x] `item-card-vertical.html` 因其它页面仍有消费者而保留。
- [x] 组件根只含 `item-all-card`。
- [x] `#items-grid` 同时只有一个 Item 互斥状态 class。
- [x] 页面不存在第二份动态 Item HTML。
- [x] CSS/LESS 修改成对且规则等价。
- [x] 修改后的 JS 语法正确。
- [x] 构建和 `git diff --check` 通过。

## 实施结果

- [x] Store Detail Items 已迁移到统一商品 Item。
- [x] PC/Mobile 复用同一套 6 个 Item DOM 和数据。
- [x] 数量、Show More、收藏、购买、链接和跨断点行为已回归。
- [x] 构建、语法、残留和 Playwright 检查通过。

回归中仅复现迁移前已存在的 Pagination `loadItems is not defined`；点击 Next 后仍为唯一 6 个统一 Item DOM，没有新增第二份模板或数据实现。
