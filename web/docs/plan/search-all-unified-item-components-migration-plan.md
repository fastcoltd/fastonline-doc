# search-all 五类统一 Item 迁移计划

## 目标与非目标

- [x] 仅迁移 `src/pages/search-all.html` 的 Items、Campaigns、Posts、Stores、Demands 和 All 搜索结果。
- [x] 分别复用唯一组件 `item-all-card.html`、`compaign-all-card.html`、`post-all-card.html`、`store-all-card.html`、`demand-all-card.html`。
- [x] PC 使用 Horizontal 状态，Mobile 使用 Mobile Horizontal 状态；Post 使用标准 Desktop/Mobile 状态。
- [x] PC/Mobile 复用同一套组件 DOM 和数据，不保留设备专属卡片。
- [x] 保留分类筛选、Pagination、Show More、收藏、标签、按钮和详情链接行为。
- [x] 不修改页头、页脚、搜索框、分页组件、空状态和其它页面。
- [x] 不新增页面专用业务组件、组件状态或组件内部样式。

## 当前结构与消费者

- 搜索列表外层为 `.search-list-container`。
- 源码包含 6 个旧搜索 partial，其中 Campaign、Post、Store、Demand partial 各输出 PC/Mobile 两个根节点。
- 初始 DOM 共 10 个 `.search-card`，PC 和 Mobile 各显示 5 个。
- All 显示当前设备的五种卡片；分类标签各显示 1 个对应卡片。
- Pagination / Show More 按当前设备从模板克隆卡片：
  - All 每次新增 5 个。
  - 分类页每次新增 1 个。
- Mobile 加载后切换到 PC 时，新增的 Mobile 卡片会被隐藏，说明当前动态数据仍是设备专属 DOM。
- 以下旧 partial 反向搜索确认仅由 `src/pages/search-all.html` 使用，迁移并确认零消费者后删除：
  - `search-all-featured-item.html`
  - `search-all-item-horizontal-mobile-item.html`
  - `search-all-campaign-item.html`
  - `search-all-post-item.html`
  - `search-all-store-item.html`
  - `search-all-demand-item.html`

## 数据统一策略

- 使用当前搜索页 PC 数据作为 PC/Mobile 唯一数据源。
- Item 当前 PC 为已收藏、Mobile 为未收藏；按用户批准的推荐方案统一为已收藏。
- Post 的作者、头像、封面和详情链接使用当前 Mobile include 已提供的数据，标题、摘要、Brand 和标签沿用现有搜索页数据。
- Campaign、Store、Demand 使用现有搜索页 PC 数据，收藏状态均保持已收藏。
- Item 和 Demand 的购买按钮保持现有可用状态，Demand 文案保持 `BUY NOW`。
- 标签文案、链接、详情链接、评分、统计数字、价格、库存和竞标者数据保持不变。

## 唯一组件与状态

| 类型 | 唯一组件 | PC 状态 | Mobile 状态 |
| --- | --- | --- | --- |
| Item | `item-all-card.html` | `item-all-card--desktop-horizontal` | `item-all-card--mobile-horizontal` |
| Campaign | `compaign-all-card.html` | `compaign-all-card--desktop-horizontal` | `compaign-all-card--mobile-horizontal` |
| Post | `post-all-card.html` | `post-all-card--desktop` | `post-all-card--mobile` |
| Store | `store-all-card.html` | `store-all-card--desktop-horizontal` | `store-all-card--mobile-horizontal` |
| Demand | `demand-all-card.html` | `demand-all-card--desktop-horizontal` | `demand-all-card--mobile-horizontal` |

- 五类互斥状态 class 全部设置在公共 `.search-list-container`。
- 每个统一组件根只保留自身基础 class，不附加设备、方向或搜索页面专属 class。
- 页面加载五类基础 CSS 和上述 PC/Mobile 状态 CSS。
- 页面加载并初始化 `PageLayout`、`CompaignAllLayout`、`PostAllLayout`、`StoreAllLayout`、`DemandAllLayout`。
- Item、Campaign、Store、Demand 方向固定为 Horizontal；跨断点只切换公共外层状态 class。

## JavaScript 迁移

- 使用五类统一组件基础 class 建立唯一模板，不再维护 PC/Mobile 两套模板映射。
- `getSearchCardType()`、筛选、克隆和计数逻辑改为识别统一组件根。
- All 初始包含 5 个统一组件；各分类只控制对应组件显隐。
- Pagination / Show More 克隆同一个唯一组件模板，克隆结果在断点切换后继续显示。
- 页面数量切换时重建当前类型的统一组件列表，移除对不存在 `.item-detail-review-list` 的引用。
- Mobile 标签点击继续保留原有随机跳转行为，事件选择器改为搜索列表中五类组件的语义化 `nav a`。
- 删除未被调用、且手写整套 Demand HTML 的 `generateMockItems()`、`renderItems()`、`createItemElement()`。
- 收藏继续复用 `js/common.js` 对 `.icon-aixin` 的委托事件。

## CSS / LESS 迁移

- `css/search-all.css` 与 `css/search-all.less` 同步修改。
- 保留 sticky 分类标签和 `.search-list-container` 页面外部布局。
- 删除 `.search-card` 及其旧内部图片、标题、评分、字段、标签、按钮和 Mobile 专属覆盖。
- 组件内部视觉完全采用五类统一组件标准样式。
- 页面级 CSS 不覆盖统一组件内部结构，不新增重复业务样式。

## 分批实施顺序

- [x] 完成旧结构、消费者、动态入口、CSS/LESS、JS 和数据盘点。
- [x] 使用 Playwright 保存修改前 PC/Mobile 基线。
- [x] 取得用户对组件状态和数据统一方案的明确批准。
- [x] 页面引入五类统一组件基础/状态 CSS 和布局脚本。
- [x] 将旧 include 替换为 5 个唯一组件 include。
- [x] 初始化五类公共外层状态并保持 Horizontal 方向。
- [x] 重构筛选、模板克隆、Pagination、Show More 和标签事件。
- [x] 删除手写 Demand DOM 生成代码。
- [x] 清理旧页面内部 CSS/LESS。
- [x] 零消费者确认后删除 6 个旧搜索 partial。
- [x] 构建根目录 HTML。
- [x] 执行语法、残留、CSS/LESS 和空白检查。
- [x] 完成修改后 PC/Mobile Playwright 回归。
- [x] 将 `codex_tasks/TASKS.md` 对应任务标记为已完成。

## Playwright 修改前基线

- PC `1440 × 1000`
  - 初始 DOM 10 个旧根节点，实际显示 5 个 Desktop 卡片。
  - 列表卡片宽度约 `1260px`。
  - Item / Campaign / Post / Store / Demand 高度约为 `270 / 270 / 289 / 337 / 274px`。
  - 每个分类显示 1 个对应 Desktop 卡片。
  - Pagination 在 All 中新增 5 个 Desktop 卡片。
- Mobile `390 × 844`
  - 初始 DOM 10 个旧根节点，实际显示 5 个 Mobile 卡片。
  - 列表卡片宽度约 `343px`。
  - Item / Campaign / Post / Store / Demand 高度约为 `113 / 144 / 160 / 132 / 165px`。
  - 每个分类显示 1 个对应 Mobile 卡片。
  - Show More 在 All 中新增 5 个 Mobile 卡片。
  - 页面无横向溢出。
- 因统一组件标准视觉和语义结构会有意替换旧自定义卡片，不要求组件内部零像素差异；比较数据、状态、数量、外部布局、溢出和周边页面。

## Playwright 修改后回归矩阵

- [x] PC `1440 × 1000`
  - [x] 公共外层同时具有五类正确 PC 状态 class。
  - [x] 初始只有 5 个统一组件根，All 全部显示。
  - [x] 五个分类各只显示 1 个对应组件。
  - [x] Pagination 在 All 新增 5 个、分类新增 1 个。
  - [x] 页面无横向溢出。
- [x] Mobile `390 × 844`
  - [x] 公共外层同时具有五类正确 Mobile 状态 class。
  - [x] 初始仍只有同一组 5 个组件根。
  - [x] 五个分类各只显示 1 个对应组件。
  - [x] Show More 在 All 新增 5 个、分类新增 1 个。
  - [x] 页面无横向溢出。
- [x] PC → Mobile → PC 后状态 class 唯一，组件数量、数据和新增卡片不丢失。
- [x] 收藏图标和 `aria-pressed` 正确切换。
- [x] Item、Campaign、Post、Store、Demand 详情链接正确。
- [x] Item / Demand 按钮状态和 Demand `BUY NOW` 文案正确。
- [x] 标签点击行为、Store 标签溢出处理正常。
- [x] 页头、分类标签、分页、Show More、空状态和页脚无非预期变化。

## 构建、语法与残留检查

```bash
node scripts/build-pages.js
node --check js/search-all.js
node --check js/item-all-layout.js
node --check js/compaign-all-layout.js
node --check js/post-all-layout.js
node --check js/store-all-layout.js
node --check js/demand-all-layout.js
git diff --check
rg "search-card|search-all-(featured-item|item-horizontal-mobile-item|campaign-item|post-item|store-item|demand-item)|generateMockItems|createItemElement" src/pages/search-all.html js/search-all.js css/search-all.css css/search-all.less
rg "@include .*search-all-(featured-item|item-horizontal-mobile-item|campaign-item|post-item|store-item|demand-item)\\.html" src
rg "item-all-card--|compaign-all-card--|post-all-card--|store-all-card--|demand-all-card--" src/partials/components/*-all-card.html
```

检查目标：

- [x] 根目录 `search-all.html` 仅由构建脚本生成。
- [x] 搜索页源码只有五个统一组件 include。
- [x] 目标范围不再包含旧搜索卡片根、设备专属 DOM 或手写 Demand DOM。
- [x] 六个旧 partial 已无消费者并删除。
- [x] 每个组件根不含设备或方向状态 class。
- [x] 公共外层每类同时只有一个互斥状态 class。
- [x] CSS/LESS 修改成对且规则等价。
- [x] 修改后的 JS 语法正确。
- [x] 构建和 `git diff --check` 通过。

## 实施结果

- [x] search-all 五类搜索结果已迁移到唯一组件。
- [x] PC/Mobile 复用同一套组件 DOM 和数据。
- [x] 分类筛选、动态加载、收藏、标签、按钮和链接已回归。
- [x] 构建、语法、残留和 Playwright 检查通过。
