# Attribute All 统一 Item 迁移计划

## 目标与非目标

- [x] 目标页面仅为 `src/pages/attribute-all.html`。
- [x] 将 Items (150) 区域的旧 Vertical / Horizontal 两套商品 DOM 合并为一套，并全部改由 `src/partials/components/item-all-card.html` 输出。
- [x] 将 Demands (210) 区域的旧 Vertical / Horizontal 两套 Demand DOM 合并为一套，并全部改由 `src/partials/components/demand-all-card.html` 输出。
- [x] 让两个区域分别在公共外层切换各自已有的 Desktop / Mobile × Vertical / Horizontal 状态 class。
- [x] 保留页签、布局按钮、收藏、购买/竞价、Show More、分页、排序和链接行为。
- [x] 不修改统一组件 partial，不新增页面专用 Item partial、组件状态 class 或组件内部 CSS。
- [x] 不迁移其它页面，不删除仍有其它消费者的旧 partial、CSS 或 JavaScript。
- [x] 不以恢复 Attribute 页旧 Item 的细微视觉差异为目标，验收以统一组件现有标准样式为准。

## 当前结构、消费者与依赖

### Attribute 页旧结构

- Items Vertical：`item-card-vertical.html`，5 张卡片，初始可见。
- Items Horizontal：`item-all-horizontal-item-responsive.html`，5 张卡片，使用另一组演示数据。
- Demands Vertical / Horizontal：均通过 `demand-all-figma-items.html` 输出，各 4 张相同数据的卡片。
- `js/layoutswitch.js` 通过两套 `.items-container[data-layout]` 的 `is-active` 显隐切换布局。
- `js/attributepage.js` 从当前可见的旧 pager 读取并复制 HTML，用于 Show More。

### 旧 partial 的其它消费者

- `item-card-vertical.html` 仍被 `item-detail.html`、`brand-hot-item-card.html` 等页面/partial 使用。
- `item-all-horizontal-item-responsive.html` 仍被 `src/partials/item-all-horizontal-item.html`、详情页等消费者使用。
- `demand-all-figma-items.html` 和 `demand-all-figma-item.html` 当前仍是可独立引用的旧实现。
- 本任务仅移除 Attribute 页引用；未经全项目零引用确认，不删除上述文件及其旧样式。

### 现有可复用实现

- 商品基础组件与样式：`item-all-card.html`、`css/item-all.css` / `.less`。
- 商品四状态样式：`item-all-card-desktop-vertical`、`item-all-card-desktop-horizontal`、`item-all-card-mobile-vertical`、`item-all-card-mobile-horizontal` 对应 CSS / LESS。
- Demand 基础组件与样式：`demand-all-card.html`、`css/demand.css` / `.less`。
- Demand 四状态样式：`demand-all-card-desktop-vertical`、`demand-all-card-desktop-horizontal`、`demand-all-card-mobile-vertical`、`demand-all-card-mobile-horizontal` 对应 CSS / LESS。
- 状态逻辑：`js/item-all-layout.js` 中的 `PageLayout` 与 `js/demand-all-layout.js` 中的 `DemandAllLayout`。
- 收藏、购买和竞价采用 `js/common.js` 的委托事件，不依赖旧 DOM 层级。

## 数据统一策略

- [x] Items 以页面初始可见的 Vertical 列表为唯一数据源：保留 5 张卡片及其标题、链接、评分、Brand、Service、标签、收藏状态和按钮状态。
- [x] Items 旧 Horizontal 列表的另一组演示数据不再作为布局切换时的第二数据源，避免切换布局改变业务数据。
- [x] Demands 两个旧布局数据一致，保留 4 张卡片及原顺序、禁用状态、标题、Brand、Service、数量、价格、竞价时间、标签和竞价人头像。
- [x] Show More 继续克隆当前统一组件生成的现有 DOM；动态新增卡片自动继承公共外层状态。

## 统一组件与 include 参数

### 商品 Item

- [x] 每张卡片使用 `../partials/components/item-all-card.html`。
- [x] 映射 `like`、`like_icon`、`aria_pressed`、`mark_style`、`mark_text`、`item_link`、`item_title`、`rating_score`、`rating_recommend`、`brand_color`、`brand_name`、`service_name`、`item_tags`、`item_button_class`。
- [x] 组件根保持唯一基础 class `item-all-card`。

### Demand Item

- [x] 每张卡片使用 `../partials/components/demand-all-card.html`。
- [x] 映射 `like`、`like_icon`、`aria_pressed`、`item_link`、`item_title`、`brand_color`、`brand_name`、`service_name`、`quantity`、`total_price`、`price_range`、`bidding_time`、`item_tags`、`bidders_html`、`bidder_more`、`button_text`、`button_disabled_class`、`button_aria_disabled`。
- [x] 组件根保持唯一基础 class `demand-all-card`。

## 状态、样式和切换逻辑

- [x] Attribute 页加载商品与 Demand 各自现有的四份状态 CSS；不新增或修改组件 CSS / LESS。
- [x] Items 公共外层只保留一个 `item-all-card--{device}-{layout}` 状态 class。
- [x] Demands 公共外层只保留一个 `demand-all-card--{device}-{layout}` 状态 class。
- [x] 页面加载 `item-all-layout.js` 与 `demand-all-layout.js`，替代旧的 `layoutswitch.js`。
- [x] 两个布局控制器限定到各自 pager，但复用同一组布局按钮，确保一次点击同步两类区域的方向状态。
- [x] 删除 Attribute 页重复初始化，确保每个控制器只绑定一次。
- [x] `matchMedia('(max-width: 768px)')` 跨断点时只替换公共外层状态 class，不重建 DOM、不改数据。
- [x] 保留 Attribute 页面外部列表、分页和 Show More 容器布局。

## 分批迁移

- [x] 记录修改前 PC / Mobile × Vertical / Horizontal，且覆盖 Items / Demands 的 Playwright 基线。
- [x] 接入现有状态 CSS 和状态脚本。
- [x] 合并 Items 两套 DOM，接入商品统一 partial。
- [x] 合并 Demands 两套 DOM，接入 Demand 统一 partial。
- [x] 更新 Attribute 页 Show More 的 pager 定位和双组件状态初始化。
- [x] 构建根目录产物。
- [x] 执行四状态、页签、Show More、收藏、购买/竞价、链接和跨断点回归。
- [x] 确认旧 partial 仅从 Attribute 页解除引用，保留其它消费者。

## Playwright 基线与回归矩阵

| 视口 | Items | Demands |
| --- | --- | --- |
| 1440 × 1200 | Vertical / Horizontal | Vertical / Horizontal |
| 390 × 844 | Vertical / Horizontal | Vertical / Horizontal |

回归记录内容：

- 公共外层唯一状态 class、卡片数量、首卡 bounding box；
- 组件根固定基础 class，切换前后 DOM 节点和文本数据一致；
- 页签和布局按钮状态；
- 收藏按钮切换；
- 可用/禁用购买或竞价按钮；
- Show More 克隆后的卡片来源与数量；
- 页面错误、控制台错误及目标链接；
- 页面其它区域无非预期显隐变化。

旧实现与统一组件 DOM、样式本来就不同，且商品旧 Horizontal 数据与默认 Vertical 数据不同，因此迁移前后不适用 0 像素差异要求；以状态 class、卡片数量、数据一致性、元素 bounding box 合理性和标准统一组件呈现为验收依据。

## 构建、语法与残留检查

```bash
node scripts/build-pages.js
node --check js/attributepage.js
node --check js/item-all-layout.js
node --check js/demand-all-layout.js
git diff --check
rg "item-card-vertical|item-all-horizontal-item-responsive|demand-all-figma-items" src/pages/attribute-all.html
rg "item-all-card--|demand-all-card--" src/pages/attribute-all.html js/attributepage.js
rg "class=\"[^\"]+\"" src/partials/components/item-all-card.html src/partials/components/demand-all-card.html
```

## 完成清单

- [x] HTML 源码只改 `src/pages/attribute-all.html`。
- [x] JavaScript 改动仅限 Attribute 页需要的状态初始化和 pager 定位。
- [x] 根目录 `attribute-all.html` 仅由构建脚本生成。
- [x] 未新增页面专用组件 partial、状态 class 或组件内部 CSS。
- [x] CSS / LESS 无单边修改。
- [x] 统一组件根不携带设备/方向状态 class。
- [x] 目标范围无旧 Item include 和旧动态完整 HTML。
- [x] Playwright 浏览器、本地服务和临时 worktree 均已关闭/清理。

## 执行结果

- Playwright 基线与迁移后截图均覆盖 1440 × 1200、390 × 844 下 Items / Demands 的 Vertical / Horizontal，共 8 种组合。
- Items 保持 5 张、Demands 保持 4 张；所有模式切换前后卡片 `outerHTML` 完全一致，状态容器各只有一个互斥状态 class。
- Show More 在手机视口将 Items 从 5 张扩展为 10 张、Demands 从 4 张扩展为 8 张，每个 pager 始终只有一个空状态节点。
- 收藏状态从 `aria-pressed="false"` / 普通图标正确切换为 `true` / 选中图标；禁用 Demand 按钮不触发弹窗，可用按钮触发 `bid it`。
- Mobile Horizontal 跨断点到 Desktop Horizontal 后，两类状态 class 均正确更新；Playwright 未捕获页面错误。
- 旧实现与统一组件结构和标准样式不同，因此不适用 0 像素差异；已核对各状态卡片数量、首末卡 bounding box、换行和溢出情况。
