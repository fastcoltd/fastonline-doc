# store-all 四状态 Store Item 统一组件实施计划

## 1. 目标与已确认事项

- 目标页面：`src/pages/store-all.html`。
- 将 Store Item 的 PC / Mobile × Vertical / Horizontal 四种展示统一为一份 HTML 组件。
- 页面中每条 Store 只输出一个组件 DOM；布局和设备变化只替换组件根状态 class。
- 页面由 Vertical、Horizontal 两套独立列表合并为一个列表。
- 统一数据采用当前默认 Vertical 列表的数据：
  - 标题：`Store name`；
  - 描述：`Connecting Ideas, Empowering Futures`；
  - 评分：`4.3 (200)`；
  - Brand：`Quora`；
  - Service：`Cloud Service`；
  - 标签和收藏状态以 Vertical 列表为准。
- Mobile Horizontal 的 `AD` 标记保留在统一 DOM 中，仅由对应状态 CSS 显示。
- 四种状态的布局、尺寸、字号、颜色、间距、圆角、阴影和交互效果与重构前保持一致；因已确认统一数据，Horizontal 的文案、评分、标签和收藏状态允许与旧 Horizontal 演示数据不同。
- 使用 Playwright 建立修改前/修改后四状态基线；不使用 Chrome MCP。

## 2. 明确不做的事项

- 不修改 `index.html`、`tag-all.html`、`search-all.html` 的 Store Item。
- 不修改仍被其它页面消费的共享 Store partial。
- 不修改 Filter、Pagination、Header、Footer、登录弹层等非目标模块。
- 不重构无关的 `store.css` 规则，不顺带修复现有非目标问题。
- 不引入 UI 库，不改变 1440 内容宽度约束。

## 3. 当前结构与重复情况

### 3.1 Vertical 链路

`store-all.html` 中有 8 个：

```text
store-all-vertical-item-responsive.html
├── best-store-item.html                 (PC)
└── store-all-vertical-mobile-item.html  (Mobile)
```

每个 wrapper 同时输出 PC 和 Mobile DOM。

### 3.2 Horizontal 链路

`store-all.html` 中有 8 个：

```text
store-all-horizontal-item-responsive.html
├── store-all-horizontal-item.html         (PC)
└── store-all-horizontal-mobile-item.html  (Mobile)
```

每个 wrapper 同时输出 PC 和 Mobile DOM。

页面当前合计输出 32 份卡片 DOM；统一后输出 8 份。

## 4. 旧 partial 消费者与处理策略

| partial | 当前消费者 | 本轮处理 |
| --- | --- | --- |
| `store-all-vertical-item-responsive.html` | 仅 `store-all.html` | 替换后确认零引用并删除 |
| `store-all-vertical-mobile-item.html` | 仅 Vertical wrapper | 替换后确认零引用并删除 |
| `store-all-horizontal-item-responsive.html` | 仅 `store-all.html` | 替换后确认零引用并删除 |
| `best-store-item.html` | Store wrapper、首页、Tag 页面 | 保留不改 |
| `store-all-horizontal-item.html` | Store wrapper、Tag 页面 | 保留不改 |
| `store-all-horizontal-mobile-item.html` | Store wrapper、Search partial | 保留不改 |

共享旧组件对应的公共 CSS 继续保留，避免影响未纳入范围的页面。

## 5. JavaScript 依赖盘点

- `js/layoutswitch.js`：当前通过 `.items-container[data-layout]` 显示/隐藏两套列表。
- `js/storepage.js`：
  - 创建 `PageLayout`；
  - Show More 克隆当前激活列表；
  - 仍包含一整份旧 `.store-item` 动态 HTML 模板。
- `js/common.js`：通过 `.icon-aixin` 事件代理处理收藏，必须保留该行为 class。
- `js/pagination.js`、`js/filter.js`：保持现有引用和非目标行为。

统一后使用 Store All 专用布局脚本，不修改共享 `layoutswitch.js`。

## 6. 新统一组件

新建：

```text
src/partials/components/store-all-card.html
```

### 6.1 根节点

```html
<article class="store-all-card {{store_card_state_class}}">
```

根节点保留：

- 基础 class：`store-all-card`；
- 一个状态 class；
- 不增加无必要的页面上下文 class。

### 6.2 内部语义结构

- `figure > img`：Store 头像；
- `header`：标记、标题和简介；
- `[data-role="mark"]`：Mobile Horizontal 的 AD 标记；
- `[data-role="rating"]`：include `rating-with-count.html`；
- `[data-role="detail"]`：Store 详情；
- `dl > div[data-field] > dt + dd`：Brand、Service；
- `nav > a > span`：标签；
- 收藏按钮：include `item-like-button.html`，保留 `icon-aixin`。

### 6.3 class 分类

允许保留：

- `store-all-card` 和四个根状态 class；
- `icon-aixin` 收藏行为 class；
- 评分 partial 按 `star_component_rule.md` 要求生成的 class；
- `active`、`disabled` 等真实状态 class（本组件当前无额外按钮状态）。

不为标题、头像、描述、Brand、Service、Tag 等内部稳定节点新增样式 class；使用根作用域、语义结构、`data-role` 和 `data-field`。

### 6.4 include 参数

- `store_card_state_class`
- `like`
- `like_icon`
- `aria_pressed`
- `mark_text`
- `store_link`
- `avatar_src`
- `store_name`
- `store_summary`
- `rating_score`
- `rating_recommend`
- `store_detail`
- `brand_name`
- `service_name`
- `store_tags`

## 7. CSS / LESS 设计

### 7.1 公共规则

在现有 `css/store.less` / `css/store.css` 中增加 `.store-all-card` 根作用域公共规则，复用现有变量、评分、收藏和页面容器样式。

公共规则包括：

- 边框、背景、阴影、定位和 overflow 基础；
- 头像、标题、简介、详情、字段、标签的公共排版；
- 统一列表容器布局；
- 对组件内部语义 `header` 的全局样式中和：`padding: 0`、透明背景、左对齐等。

### 7.2 四组状态文件

新建并保持 CSS/LESS 成对：

1. `css/store-all-card-desktop-vertical.less` / `.css`
2. `css/store-all-card-desktop-horizontal.less` / `.css`
3. `css/store-all-card-mobile-vertical.less` / `.css`
4. `css/store-all-card-mobile-horizontal.less` / `.css`

状态映射：

| 状态 | class |
| --- | --- |
| PC Vertical | `store-all-card--desktop-vertical` |
| PC Horizontal | `store-all-card--desktop-horizontal` |
| Mobile Vertical | `store-all-card--mobile-vertical` |
| Mobile Horizontal | `store-all-card--mobile-horizontal` |

### 7.3 页面与组件职责

- `.store-all-unified-items-pager` 控制列表方向、列数、换行和卡片外部间距；
- 状态 class 控制卡片内部布局、尺寸、字段顺序和内容显隐；
- 不通过媒体查询选择组件状态；设备状态由 JS 替换根 class；
- 原有样式值从 `store.less` 原样迁移，不借机调整 UI。

## 8. 页面改造

修改 `src/pages/store-all.html`：

1. 在 `store.css` 后加载四份状态 CSS；
2. 将 Vertical、Horizontal 两个 `.items-container[data-layout]` 合并为一个 `.items-container`；
3. 合并为一个 `.store-all-unified-items-pager#items-grid`；
4. 8 条数据全部 include `store-all-card.html`；
5. 初始状态为 `store-all-card--desktop-vertical`；
6. 只保留一份空状态；
7. 移除只为旧双 DOM 服务的页面 class；
8. 移除 `js/layoutswitch.js` 引用；
9. 在 `storepage.js` 前加载 `js/store-all-layout.js`。

根目录 `store-all.html` 不手工修改，由构建脚本生成。

## 9. 状态切换脚本

新建：

```text
js/store-all-layout.js
```

职责：

- 默认布局为 `vertical`；
- 使用 `matchMedia('(max-width: 768px)')` 判断设备；
- 点击布局按钮时使用 `event.currentTarget.dataset.layout`；
- 每次先移除完整状态 class 集合，再添加唯一目标 class；
- 只作用于 `.store-all-card`；
- 更新 `.layout-switch.active`；
- 使用限定 `#items-grid` 的 `MutationObserver` 同步动态新增卡片；
- 不增删 DOM、不切换数据、不写内部行内布局样式。

## 10. 动态内容与 Show More

修改 `js/storepage.js`：

- 使用 `StoreAllLayout` 代替共享 `PageLayout`；
- 页面初始化时从首张统一组件保存内存原型；
- `createItemElement` 克隆统一组件原型，并通过结构/`data-*` 更新数据；
- 删除 JavaScript 中旧 `.store-item` HTML 模板字符串；
- Show More 只克隆单一 `.store-all-unified-items-pager`；
- 保留空状态插入顺序和 loading 行为；
- 新增卡片由布局脚本自动同步当前状态。

## 11. 分批实施顺序

- [x] A. 建立旧版四状态 Playwright 基线和尺寸数据
- [x] B. 创建统一语义组件
- [x] C. 创建公共规则和 Desktop Vertical 状态
- [x] D. 完成 Mobile Vertical 状态并回归
- [x] E. 完成 Desktop Horizontal 状态并回归
- [x] F. 完成 Mobile Horizontal 状态并回归
- [x] G. 合并页面列表并接入新布局脚本
- [x] H. 调整动态加载和 Show More
- [x] I. 确认零引用并删除三个 Store All 专属旧 partial
- [x] J. 构建页面并完成四状态视觉/行为回归
- [x] K. 完成语法、残留和 diff 检查

## 12. Playwright 回归矩阵

修改前和修改后使用相同环境：

| 视口 | 状态 |
| --- | --- |
| 1440 × 1200 | PC Vertical |
| 1440 × 1200 | PC Horizontal |
| 390 × 844 | Mobile Vertical |
| 390 × 844 | Mobile Horizontal |

逐项记录和比较：

- 卡片及列表位置、宽高；
- 头像、标题、简介、详情；
- 评分、Brand、Service、标签；
- 收藏按钮；
- 边框、圆角、阴影和间距；
- Show More、分页和空状态位置。

Vertical 数据保持一致，目标为组件截图 0 像素差异。Horizontal 因已确认统一为 Vertical 数据，使用对应元素 bounding box 对比布局，并单独说明数据导致的像素差异。

行为检查：

- 布局按钮切换；
- 768px 跨断点状态切换；
- 收藏点击及图标/ARIA 状态；
- Show More 新增卡片；
- 新增卡片保持当前状态；
- 空状态和分页保留；
- 页面其它区域无非预期变化。

## 13. 构建与静态检查

```bash
node scripts/build-pages.js
node --check js/store-all-layout.js
node --check js/storepage.js
git diff --check
```

残留检查：

```bash
rg "store-all-vertical-item-responsive|store-all-horizontal-item-responsive|store-all-vertical-mobile-item" src/pages/store-all.html src/partials
rg "store-all-card--" src/partials/components/store-all-card.html css/store-all-card-*.css css/store-all-card-*.less js/store-all-layout.js
rg "class=\"[^\"]+\"" src/partials/components/store-all-card.html
rg "store-item-user-box|figma-best-store-item|figma-store-horizontal-item" js/storepage.js
```

检查目标：

- Store All 目标范围不再输出旧重复 DOM；
- 四个状态 class 互斥；
- CSS/LESS 文件成对且等价；
- 三个待删除旧 partial 为零引用；
- 共享旧 partial 及其它页面保持不变；
- 根目录页面由构建生成；
- 无 JS 语法、空白和构建错误。
