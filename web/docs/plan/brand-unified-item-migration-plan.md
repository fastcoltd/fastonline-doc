# Brand 页面统一 Item 迁移计划

## 目标

按照 `docs/unified-item-components.md` 与 `rules/component_unification_rule.md`，迁移 `brand.html` 的以下区域：

1. Social Media、Social Accounts、Promotion & Ads、Trading、Content：
   - 统一使用 `src/partials/components/item-all-card.html`；
   - 每个区域保留 4 张商品卡片及当前业务数据。
2. Demands：
   - 统一使用 `src/partials/components/demand-all-card.html`；
   - 保留 4 张卡片、原收藏状态、链接、价格、竞价时间、标签、竞价人和禁用按钮状态。
3. Posts：
   - 统一使用 `src/partials/components/post-all-card.html`；
   - 删除 PC/Mobile 双份 DOM；
   - 按用户批准，以现有 PC 四张差异化卡片作为唯一数据源。

迁移后，PC/Mobile 只通过各组件区域公共外层的标准状态 class 切换样式，不替换组件 DOM、数据或行为。

## 明确不做

- 不修改 Header、面包屑、品牌信息、导航、FAQ、登录、购买弹框、页脚等其它功能。
- 不为 Brand 页面新增组件内部样式或页面专用组件状态 class。
- 不修改统一 Item partial 的标准 DOM。
- 不把 Brand 数据替换成 Item All、Demand All 或 Post All 页面的示例数据。
- 不删除仍被其它页面消费的 `demand-shared-item.html`、`post-shared-item.html` 或旧通用 CSS。
- 不创建新的 PC/Mobile 双份结构。

## 盘点结果

### 商品 Item

- 页面入口：
  - `src/pages/brand.html`
  - `src/partials/components/brand-hot-items-section.html`
- 旧卡片入口：
  - `src/partials/components/brand-hot-item-card.html`
  - 间接使用 `src/partials/components/item-card-vertical.html`
- 数量：
  - 5 个区域；
  - 每个区域 4 张，共 20 张。
- 数据：
  - PC/Mobile 使用同一份数据；
  - 标题 `Items title`；
  - HOT 标记；
  - 评分 `5.0 (62)`；
  - Brand `Quora`；
  - Service `Cloud Service`；
  - 4 个原标签；
  - 全部收藏；
  - 购买按钮启用。
- `brand-hot-item-card.html` 仅由 `brand-hot-items-section.html` 消费，迁移后可删除。
- `item-card-vertical.html` 仍有其它消费者，必须保留。

### Demand Item

- 页面入口：
  - `src/partials/components/brand-hot-demands-section.html`
- 旧卡片入口：
  - `index-popular-demand-item-main-liked.html`
  - `index-popular-demand-item-alt-unliked.html`
  - `index-popular-demand-item-alt-liked.html`
  - 间接使用 `demand-shared-item.html`
- 数量：4 张。
- 数据：
  - 标题 `Experienced Art  Art`；
  - Brand `GitLab`，颜色 `#FF1EAD`；
  - Service `Social`；
  - 数量 `14`；
  - Total price `$1926.00`；
  - Price range `$192.00`；
  - Bidding time `2025/5/28 ~ 2025/5/28`；
  - 3 个原标签；
  - 4 个头像与 `+2`；
  - 收藏状态依次为 `true / false / true / true`；
  - BID NOW 全部禁用。
- 三个旧包装 partial 仅由 Brand Demand 区域消费，迁移后可删除。
- `demand-shared-item.html` 仍被 `demand-all-figma-item.html` 消费，必须保留。

### Post Item

- 页面入口：
  - `src/partials/components/brand-hot-posts-section.html`
- 旧卡片入口：
  - `index-host-post-item-normal-liked.html`
  - `index-host-post-item-alt-unliked.html`
  - `index-host-post-item-red-liked.html`
  - `index-host-post-item-red-unliked.html`
  - PC/Mobile 包装层；
  - 间接使用 `post-shared-item.html`
- 当前 DOM：
  - 4 个业务卡片包装；
  - 每个包装同时输出 PC 与 Mobile 两份卡片；
  - 总共 8 份 Post DOM，任一视口仅显示 4 份。
- 已批准的数据策略：
  - 使用 PC 四张卡片作为唯一数据源；
  - 第 1 张：默认封面、默认标题、默认头像、Quora、收藏；
  - 第 2 张：Alt 封面、短标题、Alt 头像、Quora、不收藏；
  - 第 3 张：Red 封面、默认长标题、Red 头像、Quora、收藏；
  - 第 4 张：Red 封面、默认长标题、Red 头像、Quora、不收藏；
  - 四张均保留原链接、摘要、标签和作者名；
  - 不保留仅存在于旧 Mobile 第一张的 featured 展示差异。
- 四个旧包装 partial 迁移后无消费者，可删除。
- `post-shared-item.html` 仍被 Tag、Search 等入口消费，必须保留。

### JavaScript

- `js/brand.js` 当前只处理导航、品牌描述和 FAQ，不生成 Item HTML。
- 目标页面没有动态拼接本任务三类 Item 的模板字符串。
- 需要加载并复用现有状态脚本：
  - `js/item-all-layout.js`
  - `js/demand-all-layout.js`
  - `js/post-all-layout.js`
- `js/brand.js` 只负责对各独立区域实例化现有状态控制器，不新增完整卡片模板。

### CSS / LESS

- 统一组件基础样式：
  - 商品：`css/item-all.css` / `.less`
  - Demand：`css/demand.css` / `.less`
  - Post：`css/post-all.css` / `.less`
- 实际使用状态：
  - 商品：PC Vertical、Mobile Vertical
  - Demand：PC Vertical、Mobile Vertical
  - Post：PC、Mobile
- `css/detail/brand.css` / `.less` 中存在大量旧 Demand/Post/商品内部覆盖；迁移后删除。
- Brand 页面只保留列表外部职责：
  - 商品列表换行；
  - Demand 列表换行；
  - Post 列表纵向排列；
  - 现有标题、页面头部与 FAQ 页面样式。
- `css/items.css` / `.less` 中只服务旧 Brand 商品根扩展 class 的规则，在确认零消费者后删除。

## 统一结构与参数映射

### 商品

- `brand-hot-items-section.html` 保留业务 Section 标题和 View More。
- 公共列表使用：
  - `items-pager`
  - `items-pager-flex-start`
  - `brand-hot-items-pager`（仅负责列表换行）
  - 初始标准状态 `item-all-card--desktop-vertical`
- 内部四张卡片直接 include `item-all-card.html`，参数传入原业务数据。

### Demand

- `brand-hot-demands-section.html` 保留标题和 View More。
- 公共列表使用：
  - `popular-demands-pager`
  - `items-pager`
  - `items-pager-flex-start`
  - 初始标准状态 `demand-all-card--desktop-vertical`
- 四张卡片直接 include `demand-all-card.html`。

### Post

- `brand-hot-posts-section.html` 保留标题和 View More。
- 公共列表使用：
  - `hot-posts-pager`
  - `items-pager`
  - `items-pager-flex-start`
  - 初始标准状态 `post-all-card--desktop`
- 四张卡片直接 include `post-all-card.html`。
- 组件根只保留 `post-all-card`，本次不使用 featured 扩展 class。

## 状态切换

| 区域 | PC 状态 | Mobile 状态 |
| --- | --- | --- |
| 5 个商品区域 | `item-all-card--desktop-vertical` | `item-all-card--mobile-vertical` |
| Demands | `demand-all-card--desktop-vertical` | `demand-all-card--mobile-vertical` |
| Posts | `post-all-card--desktop` | `post-all-card--mobile` |

- 商品五个区域分别创建 `PageLayout` 实例。
- Demand 创建一个 `DemandAllLayout` 实例。
- Post 创建一个 `PostAllLayout` 实例。
- 所有实例都使用现有 `max-width: 768px` 媒体查询。
- 切换只替换公共外层状态 class。

## 迁移顺序

1. 添加统一组件基础与实际状态 CSS 引用。
2. 修改三个 Brand Section partial，替换为唯一统一组件。
3. 删除确认零消费者的旧 Brand 专用包装 partial。
4. 在 `brand.html` 加载三个现有状态脚本。
5. 在 `js/brand.js` 实例化各区域状态控制器。
6. 清理 `css/detail/brand.css` / `.less` 的旧组件内部覆盖，仅保留列表外部布局。
7. 清理确认零消费者的 Brand 旧商品扩展规则。
8. 运行页面构建，生成根目录 `brand.html`。
9. 搜索旧 partial、旧 class、双份 DOM 和页面专用内部覆盖残留。
10. 完成语法、一致性和 Playwright 回归。

## Playwright 基线

### 1440 × 1000

- 五个商品区域：每区 4 张，第一张约 `300 × 605`。
- Demand：4 张，第一张约 `615 × 529`。
- Posts：8 份 DOM、4 份可见，第一张可见卡片约 `1260 × 391`。
- 无页面控制台错误或警告。

### 390 × 844

- 五个商品区域：每区 4 张，第一张约 `166.5 × 308`。
- Demand：4 张，第一张约 `166.5 × 272`。
- Posts：8 份 DOM、4 份可见，第一张可见卡片约 `343 × 143`。
- 无水平溢出。
- 无页面控制台错误或警告。

## Playwright 回归矩阵

### PC：1440 × 1000

- 5 个商品区域各有 4 个 `.item-all-card`。
- Demand 有 4 个 `.demand-all-card`。
- Posts 只有 4 个 `.post-all-card`，不存在 PC/Mobile 双份包装。
- 三类公共外层状态分别正确。
- 组件根不携带互斥设备/方向状态 class。
- 页面无水平溢出、无控制台错误。

### Mobile：390 × 844

- 数量与数据不因视口切换而变化。
- 三类公共外层切换到对应 Mobile 状态。
- 组件 DOM 节点标记在切换前后保持。
- 页面无水平溢出、无控制台错误。

### 交互

- 商品、Demand、Post 收藏按钮可切换图标和 `aria-pressed`。
- 商品购买按钮继续触发现有登录/购买流程。
- Demand 禁用按钮不触发竞价。
- 标题、View More、标签链接保持原目标。

## 构建与检查

```bash
node scripts/build-pages.js
node --check js/brand.js
npx --yes less@4.2.0 css/detail/brand.less /tmp/brand-detail.css
npx --yes less@4.2.0 css/items.less /tmp/items.css
git diff --check
```

残留搜索：

```bash
rg -n "brand-hot-item-card|brand-hot-post-item-(responsive|desktop|mobile)|figma-popular-demand-item|figma-hot-post-item|brand-best-items-item" src/pages/brand.html src/partials/components/brand-hot-*.html css/detail/brand.css css/detail/brand.less
rg -n "index-popular-demand-item-(main-liked|alt-unliked|alt-liked)|index-host-post-item-(normal-liked|alt-unliked|red-liked|red-unliked)" src
```

## 进度

- [x] 完成只读盘点。
- [x] 完成 PC/Mobile Playwright 基线。
- [x] 用户批准以 PC Posts 数据作为唯一数据源。
- [x] 替换商品 Item。
- [x] 替换 Demand Item。
- [x] 替换 Post Item。
- [x] 接入状态脚本。
- [x] 清理旧 Brand 组件内部样式。
- [x] 删除零消费者旧包装 partial。
- [x] 构建根页面。
- [x] 完成语法、LESS、残留和差异检查。
- [x] 完成 Playwright 回归。
- [x] 更新任务状态。

## 实际验收结果

### 构建与静态检查

- `node scripts/build-pages.js`：通过。
- `node --check js/brand.js`：通过。
- 三个状态脚本语法检查：通过。
- `css/detail/brand.css` 与 LESS 编译结果：完全一致。
- `css/items.css` 与 LESS 编译结果：完全一致。
- `git diff --check`：通过。
- 根目录 HTML 仅保留本任务生成的 `brand.html` 差异。
- 统一组件数量：
  - 商品 Item：20；
  - Demand Item：4；
  - Post Item：4。
- 目标页面旧组件 DOM、旧包装 include 和页面专用内部覆盖残留：0。

### Playwright

- Desktop `1440 × 1000`：
  - 商品五个区域均为 `item-all-card--desktop-vertical`；
  - Demand 为 `demand-all-card--desktop-vertical`；
  - Post 为 `post-all-card--desktop`；
  - 商品第一张约 `404 × 585`；
  - Demand 第一张约 `622.5 × 478`；
  - Post 第一张约 `1260 × 294`。
- Mobile `390 × 844`：
  - 商品五个区域均为 `item-all-card--mobile-vertical`；
  - Demand 为 `demand-all-card--mobile-vertical`；
  - Post 为 `post-all-card--mobile`；
  - 商品第一张约 `161.5 × 295`；
  - Demand 第一张约 `167.5 × 250.69`；
  - Post 第一张约 `343 × 182`。
- `768px` / `769px` 断点切换正确。
- PC/Mobile 切换前后三类组件完整 DOM 签名一致。
- 组件根携带互斥状态 class：0。
- 旧组件 DOM：0。
- 商品、Demand、Post 收藏交互：通过。
- Demand 禁用按钮：保持不可用。
- 未登录商品购买：继续打开登录弹层。
- 水平溢出：无。
- 控制台 error / warning：0。
