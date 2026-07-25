# compaign-detail 统一 Item 迁移计划

## 目标与非目标

- [ ] 将 `compaign-detail.html` 正文中的两处旧商品 Item 迁移到统一商品组件。
- [ ] 将正文中的旧 Campaign Item 迁移到统一 Campaign 组件。
- [ ] 将 Related Items 统一为商品 Item；PC 使用商品竖向状态，Mobile 使用商品横向状态。
- [ ] 每个业务对象只输出一份组件 DOM，设备变化时只替换公共外层状态 class。
- [ ] 保留目标页面现有标题、链接、评分、Brand、Service、价格、库存、统计、标签、卡片数量和收藏行为。
- [ ] 直接采用统一组件现有状态样式，不恢复旧页面卡片内部的细微视觉差异。
- [ ] 不迁移 `tag-all.html`、搜索组件或其它未纳入本任务的旧 Item 消费者。
- [ ] 不修改统一商品、Campaign 组件的公共 HTML；如回归发现现有状态 CSS 在目标容器宽度下失效，只允许做对所有消费者安全的通用适应性修复。

## 已确认需求

- `#section-2`：商品 Item。
- `#section-3`：Campaign Item。
- `#section-5`：商品 Item。
- `#section-7` Related Items：用户明确修正为商品 Item，不使用任务文档原先写明的 Campaign Item。
- Related Items 保留 4 张卡片。
- Related Items PC 为 Vertical，Mobile 为 Horizontal。
- 商品旧 PC/Mobile DOM 的收藏状态不同：PC 为已收藏，Mobile 为未收藏；用户批准按推荐方案统一为已收藏。

## 当前结构与消费者

### 目标页面旧结构

- `src/pages/compaign-detail.html`
  - `#section-2` 经 `src/partials/item-all-horizontal-item.html` 输出 PC/Mobile 两份商品 DOM。
  - `#section-3` 经 `src/partials/compaign-all-horizontal-item.html` 输出旧 Campaign 横卡。
  - `#section-5` 经 `src/partials/item-all-horizontal-item.html` 输出 PC/Mobile 两份商品 DOM。
  - `#section-7`
    - PC 列表经 `src/partials/compaign-all-vertical-item.html` 输出 4 张 Campaign 竖卡。
    - Mobile 列表经 `src/partials/item-all-horizontal-item.html` 输出 4 组 PC/Mobile 商品双 DOM。

### 旧 partial 消费者

- `src/partials/item-all-horizontal-item.html`
  - 只被 `src/pages/compaign-detail.html` 直接使用。
  - 迁移后可在零引用检查通过时删除。
- `src/partials/components/item-all-horizontal-item-responsive.html`
  - 仍被 `src/pages/tag-all.html` 使用，必须保留。
- `src/partials/components/item-all-horizontal-item.html`
  - 仍由响应式旧组件间接使用，必须保留。
- `src/partials/components/item-all-horizontal-mobile-item.html`
  - 仍由响应式旧组件间接使用，必须保留。
- `src/partials/compaign-all-horizontal-item.html`
  - 只被 `src/pages/compaign-detail.html` 直接使用。
  - 迁移后可在零引用检查通过时删除。
- `src/partials/components/compaign-all-horizontal-item.html`
  - 仍被搜索组件和 `src/pages/tag-all.html` 使用，必须保留。
- `src/partials/compaign-all-vertical-item.html`
  - 仍被 `src/pages/tag-all.html` 使用，必须保留。
- `src/partials/components/hot-compaign-item.html`
  - 仍由旧 Campaign 竖卡业务 partial 间接使用，必须保留。

### JavaScript 和行为依赖

- 未发现 `compaign-detail.html` 通过 JavaScript 拼接或重建目标 Item HTML。
- 页面现有内联脚本只负责吸顶摘要、锚点导航和 Mobile 标题省略。
- 收藏行为由 `js/common.js` 对 `.icon-aixin` 的委托事件处理，统一组件继续复用。
- 商品状态切换复用 `js/item-all-layout.js` 的 `PageLayout`。
- Campaign 状态切换复用 `js/compaign-all-layout.js` 的 `CompaignAllLayout`。
- 页面无布局切换按钮，各 Item 区域独立初始化并固定自己的方向。

### 现有样式依赖

- 商品基础样式：`css/item-all.css` / `css/item-all.less`。
- 商品 PC Horizontal：`css/item-all-card-desktop-horizontal.css` / `.less`。
- 商品 PC Vertical：`css/item-all-card-desktop-vertical.css` / `.less`。
- 商品 Mobile Horizontal：`css/item-all-card-mobile-horizontal.css` / `.less`。
- Campaign 基础样式：`css/compaign.css` / `css/compaign.less`。
- Campaign PC Horizontal：`css/compaign-all-card-desktop-horizontal.css` / `.less`。
- Campaign Mobile Horizontal：`css/compaign-all-card-mobile-horizontal.css` / `.less`。
- `css/detail/compaign-detail.css` / `.less` 中存在大量只匹配旧商品和 Campaign 内部结构的页面覆盖；迁移后清理。
- 页面只保留 Item 区域宽度、列表换行、溢出保护等外部布局职责。

## 数据统一策略

### 正文商品 Item

- 保留旧商品数据：
  - 图片：`image/best-item-cover.png`
  - 标记：`HOT`
  - 标题：`Items titleItems titleItems titleItems titleItems title...`
  - 链接：`item-detail.html?item_id=123`
  - 评分：`5.0`
  - 评论数：`(62)`
  - Brand：`Quora`
  - Service：`Cloud Service`
  - Price：`$325.00`
  - Stock：`52`
  - 原有 6 个标签
  - BUY NOW 为可用状态
- 收藏状态统一采用 PC 数据：
  - `like="1"`
  - `image/Vector_sel.png`
  - `aria-pressed="true"`

### 正文 Campaign Item

- 保留旧 Campaign 横卡数据：
  - 图片：`image/best-item-cover.png`
  - 标记：`AD`
  - 标题：`Intelligent Soft Intelligent Soft Intelligent Soft Intelligent Soft`
  - Items：`14`
  - Sales：`5633`
  - Orders：`122`
  - Favorites：`155`
  - Products 和 7 个标签保持不变
  - 收藏状态保持已收藏

### Related Items

- 以页面现有商品 Item 数据为唯一数据源，不再使用 PC Campaign 数据。
- 保留 4 张相同演示卡片及其顺序。
- 使用与正文商品相同的标题、链接、评分、Brand、Service、Price、Stock 和标签。
- 收藏状态统一为已收藏。
- PC/Mobile 切换不修改卡片数量、DOM 或数据。

## 统一组件和 include 参数

### 商品

- 唯一 partial：`src/partials/components/item-all-card.html`
- 根节点：`<article class="item-all-card">`
- 通过现有参数传入：
  - `like`
  - `like_icon`
  - `aria_pressed`
  - `mark_style`
  - `mark_text`
  - `item_link`
  - `item_title`
  - `rating_score`
  - `rating_recommend`
  - `brand_color`
  - `brand_name`
  - `service_name`
  - `item_tags`
  - `item_button_class`

### Campaign

- 唯一 partial：`src/partials/components/compaign-all-card.html`
- 根节点：`<article class="compaign-all-card">`
- 通过现有参数传入图片、收藏、链接、标记、标题、统计、Products 和标签数据。

## class 分类和状态映射

### 正文商品区域

| 设备 | 方向 | 公共外层状态 class |
| --- | --- | --- |
| PC | Horizontal | `item-all-card--desktop-horizontal` |
| Mobile | Horizontal | `item-all-card--mobile-horizontal` |

### 正文 Campaign 区域

| 设备 | 方向 | 公共外层状态 class |
| --- | --- | --- |
| PC | Horizontal | `compaign-all-card--desktop-horizontal` |
| Mobile | Horizontal | `compaign-all-card--mobile-horizontal` |

### Related Items 商品区域

| 设备 | 方向 | 公共外层状态 class |
| --- | --- | --- |
| PC | Vertical | `item-all-card--desktop-vertical` |
| Mobile | Horizontal | `item-all-card--mobile-horizontal` |

- 状态 class 只放在各自 `.items-pager` 公共外层。
- 组件根不增加设备或方向状态 class。
- 每个公共外层同时只保留一个商品或 Campaign 互斥状态 class。
- `id` 仅用于页面状态初始化的行为定位。

## 状态切换逻辑

- 正文两处商品区域分别创建 `PageLayout` 实例，并固定 `currentLayout` 为 `horizontal`。
- 正文 Campaign 区域创建 `CompaignAllLayout` 实例，并固定为 `horizontal`。
- Related Items 创建 `PageLayout` 实例：
  - PC 设置为 `vertical`。
  - Mobile 设置为 `horizontal`。
- 使用项目断点 `matchMedia('(max-width: 768px)')` 监听设备变化。
- 切换时只调用现有布局类更新公共外层状态 class，不改写组件 DOM 或数据。
- 页面无布局按钮，布局类的按钮作用域传入 `null`。

## 页面上下文与兼容方案

- 保留 `.compaign-detail-horizontal-list`、`.compaign-detail-recommend-list` 等外部区域容器。
- 保留 Mobile 页面的宽度和 `overflow: hidden` 防护，避免历史滚动条问题回归。
- 删除 `.item-all-horizontal-*`、`.figma-compaign-horizontal-item`、`.compaign-item` 等旧内部结构覆盖。
- 不为统一组件新增页面专用内部选择器。
- 统一组件的卡片宽度、高度、字体、间距、圆角和阴影直接采用现有标准状态 CSS。
- Related Items 的卡片内部采用统一商品 Desktop Vertical 标准状态，PC 外部列表固定为四列、一行展示 4 个商品 Item。
- Playwright 桌面回归发现商品 Desktop Horizontal 在 820px 容器中字段行互相挤压；通过让现有共享字段行在空间不足时换行解决，宽屏仍保持单行，不增加页面专用组件覆盖。

## 分批迁移顺序

- [ ] 在独立 detached worktree 保存修改前 PC/Mobile 基线。
- [ ] 在目标页面加载实际使用的商品和 Campaign 状态 CSS。
- [ ] 迁移 `#section-2` 和 `#section-5` 商品 Item。
- [ ] 迁移 `#section-3` Campaign Item。
- [ ] 将 Related Items 两套列表合并为一套商品组件列表。
- [ ] 接入各区域状态初始化和跨断点切换。
- [ ] 清理页面旧 Item 内部 CSS/LESS。
- [ ] 零引用后删除两个页面专用旧入口 partial。
- [ ] 构建根目录 HTML。
- [ ] 完成静态检查、视觉回归和行为回归。
- [ ] 更新 `codex_tasks/TASKS.md` 当前任务状态。

## Playwright 基线

- 基线提交：`a59e31a8`
- 基线使用独立 detached Git worktree。
- PC 视口：`1440 × 1000`
  - `#section-2` 旧商品卡：`820 × 266`
  - `#section-3` 旧 Campaign 卡：`820 × 272`
  - `#section-5` 旧商品卡：`820 × 266`
  - Related Items：4 张旧 Campaign 竖卡，每张约 `293 × 601`
- Mobile 视口：`390 × 844`
  - `#section-2` 旧商品卡：`343 × 131`
  - `#section-3` 旧 Campaign 卡：`343 × 156`
  - `#section-5` 旧商品卡：`343 × 131`
  - Related Items：4 张旧商品横卡，每张约 `343 × 131`
- 已保存 PC/Mobile 正文和 Related Items 基线截图。
- 由于任务要求替换为标准统一组件，卡片内部结构和标准状态视觉会变化，不适用零像素差异；回归采用状态、数据、数量、bounding box、溢出和页面其它区域检查。

## Playwright 回归矩阵

- [ ] PC `1440 × 1000`
  - [ ] 正文商品 Desktop Horizontal
  - [ ] 正文 Campaign Desktop Horizontal
  - [ ] Related Items 商品 Desktop Vertical
- [ ] Mobile `390 × 844`
  - [ ] 正文商品 Mobile Horizontal
  - [ ] 正文 Campaign Mobile Horizontal
  - [ ] Related Items 商品 Mobile Horizontal
- [ ] 从 PC 切到 Mobile、再切回 PC，状态 class 唯一且方向正确。
- [ ] 页面无横向溢出。
- [ ] 收藏按钮点击后 `data-like`、图标和 `aria-pressed` 正确切换。
- [ ] 商品标题、Campaign 标题和详情链接保持正确。
- [ ] BUY NOW 按钮存在且状态正确。
- [ ] Related Items 始终为 4 张商品卡，数据和顺序不变。
- [ ] 摘要、锚点导航、正文、侧栏和 Footer 无非预期变化。

## 构建与检查命令

```bash
node scripts/build-pages.js
git diff --check
rg "item-all-horizontal-item|compaign-all-horizontal-item|compaign-all-vertical-item" src/pages/compaign-detail.html
rg "item-all-horizontal-item.html|compaign-all-horizontal-item.html" src
rg "item-all-card--|compaign-all-card--" src/pages/compaign-detail.html css js
rg "class=\"[^\"]+\"" src/partials/components/item-all-card.html src/partials/components/compaign-all-card.html
```

检查目标：

- [ ] 根目录 `compaign-detail.html` 仅由构建脚本生成。
- [ ] 目标页面不再引用旧 Item partial。
- [ ] Related Items 不再输出 PC/Mobile 双列表或 Campaign Item。
- [ ] 页面中的商品和 Campaign 根均来自唯一标准 partial。
- [ ] 组件根无状态 class。
- [ ] 每个公共状态容器只有一个互斥状态 class。
- [ ] CSS/LESS 修改成对且语义一致。
- [ ] 未删除仍被 `tag-all.html`、搜索等消费者使用的旧共享 partial。
- [ ] `git diff --check` 通过。

## 实施结果

- [x] `#section-2`、`#section-5` 已迁移到统一商品组件。
- [x] `#section-3` 已迁移到统一 Campaign 组件。
- [x] Related Items 已合并为一套 4 张商品卡 DOM。
- [x] Related Items PC 使用 `item-all-card--desktop-vertical`。
- [x] Related Items PC 外部列表固定为四列，一行展示 4 个商品 Item。
- [x] Related Items Mobile 使用 `item-all-card--mobile-horizontal`。
- [x] 正文商品区域 PC/Mobile 均使用对应 Horizontal 状态。
- [x] 正文 Campaign 区域 PC/Mobile 均使用对应 Horizontal 状态。
- [x] 目标页面旧商品、Campaign 组件根计数均为 0。
- [x] 两个零引用页面入口 partial 已删除。
- [x] `tag-all.html`、搜索仍使用的旧共享 partial 已保留。
- [x] 商品 Desktop Horizontal 字段行已支持窄容器安全换行，CSS/LESS 同步。
- [x] `node scripts/build-pages.js` 构建成功。
- [x] `git diff --check` 通过。
- [x] Playwright PC `1440 × 1000` 回归通过。
- [x] Playwright Mobile `390 × 844` 回归通过。
- [x] PC → Mobile → PC 跨断点状态切换通过，卡片类型和数量不变。
- [x] Mobile 页面无横向溢出；PC 原有约 7px 文档宽度差异与基线一致，未扩大。
- [x] 收藏图标、图片资源和 `aria-pressed` 可切换并恢复。
- [x] 本地服务已关闭，临时 detached Git worktree 已清理。

统一组件替换会按规范采用标准状态视觉，因此修改前后的 Item 区域不适用零像素差异。回归采用组件类型、数量、状态 class、数据、bounding box、溢出、跨断点状态和交互检查。
