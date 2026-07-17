# Compaign All 卡片统一封装计划

## 目标与非目标

- [x] 将 `compaign-all.html` 当前 Vertical / Horizontal 两套活动列表合并为一套列表。
- [x] 新建一份统一 Campaign 卡片 HTML，通过四个互斥根状态 class 支持 PC / Mobile × Vertical / Horizontal。
- [x] 四种状态统一使用当前 PC Horizontal 卡片的数据。
- [x] PC / Mobile Vertical 标题前补充 `AD` 标志。
- [x] 除获批的数据统一与 Vertical `AD` 标志外，保持原有布局、尺寸、字体、颜色、间距、圆角、阴影和交互。
- [x] Show More / reload 动态新增卡片继续使用统一组件结构并继承当前状态。
- [x] 不迁移 `index.html`、`compaign-detail.html`、`tag-all.html`、`search-all.html` 或其它页面。
- [x] 不修改或删除仍有其它消费者的旧 Campaign partial、旧组件和旧样式。

## 当前结构与消费者

### compaign-all.html 当前结构

- Vertical 活动列表：`#items-grid`，7 次 include `src/partials/index-hot-compaign-item.html`。
- Horizontal 活动列表：`#items-grid-horizontal`，7 次 include `src/partials/compaign-all-horizontal-item.html`。
- `js/layoutswitch.js` 的 `PageLayout` 通过 `.items-container[data-layout].is-active` 在两套列表之间切换。
- 页面内联脚本会在 Mobile 下改写 Horizontal 卡片的封面、标题、收藏状态和标签，导致 PC / Mobile 数据不一致。
- `js/compaignpage.js` 在 Show More / reload 时使用模板字符串拼接旧 `.compaign-item` DOM，并只写入 `#items-grid`。

### 旧 partial 与消费者

- `src/partials/index-hot-compaign-item.html`
  - `compaign-all.html`：本次迁出。
  - `index.html`：继续使用，不能删除或改造成目标页专属结构。
- `src/partials/compaign-all-horizontal-item.html`
  - `compaign-all.html`：本次迁出。
  - `compaign-detail.html`：继续使用，不能删除。
- `src/partials/compaign-all-vertical-item.html`
  - `compaign-detail.html`、`tag-all.html`：继续使用，不能删除。
- `src/partials/components/hot-compaign-item.html`
  - 被 `index-hot-compaign-item.html`、`index-hot-compaign-item-no-tags.html`、`compaign-all-vertical-item.html` 间接使用，继续保留。
- `src/partials/components/compaign-all-horizontal-item.html`
  - 被 `compaign-all-horizontal-item.html`、`tag-all.html` 和 `search-all-campaign-item.html` 使用，继续保留。

### 旧 CSS / LESS 与 JS 依赖

- `css/compaign.css/.less` 中 `.figma-hot-compaign-item`、`.figma-compaign-horizontal-item` 规则仍服务其它页面，不能删除。
- `css/index.css/.less`、`css/tag-all.css/.less`、`css/search-all.css/.less`、`css/detail/compaign-detail.css/.less` 存在旧组件上下文覆盖，本次不修改。
- 收藏行为由 `js/common.js` 对 `.icon-aixin` 的事件委托提供，新组件保留这一行为 class。
- `js/layoutswitch.js` 被多个页面共享，本次不修改；目标页改用独立的 `js/compaign-all-layout.js`。
- `js/compaignpage.js` 只被 `compaign-all.html` 使用，可在本次范围内迁移动态卡片逻辑。

## 数据统一策略

四种状态使用 `src/partials/compaign-all-horizontal-item.html` 当前 PC Horizontal 参数作为唯一数据源：

- 收藏：选中，`data-like="1"`，`image/Vector_sel.png`。
- 链接：`compaign-detail.html?name=compaign-name`。
- 封面：旧 PC Horizontal 组件默认使用的 `image/best-item-cover.png`。
- 标志：`AD`。
- 标题：`Intelligent Soft Intelligent Soft Intelligent Soft Intelligent Soft`。
- 统计：Items 14、Sales 5633、Orders 122、Favorites 155。
- Products：`Handmade Granite Cheese (56)， Rustic Fresh Computer (62)， Rustic Fresh Towels (69)`。
- 标签：PC Horizontal 当前 7 个标签及顺序。
- 静态卡片数量和顺序：7 张，保持不变。

删除目标页 Mobile Horizontal 的运行时数据改写。布局切换和设备切换只改变根状态 class，不再改变数据。

## 新组件结构与参数

新建 `src/partials/components/compaign-all-card.html`：

```html
<article class="compaign-all-card {{compaign_card_state_class}}">
    <figure><img src="{{cover_src}}" alt="{{cover_alt}}" /></figure>
    <section>
        <header>
            <a href="{{item_link}}" target="_self">
                <span data-role="mark">{{ad_text}}</span>
                <h2>{{item_title}}</h2>
            </a>
        </header>
        <dl data-role="statistics">...</dl>
        <p data-role="products">...</p>
        <nav aria-label="Campaign tags">{{item_tags}}</nav>
    </section>
    <!-- include item-like-button.html -->
</article>
```

参数包括：

- `compaign_card_state_class`
- `like`、`like_icon`、`aria_pressed`
- `cover_src`、`cover_alt`
- `item_link`、`ad_text`、`item_title`
- 四项统计的 label / value
- `products_label`、`products_text`
- `item_tags`

## Class 与选择器方案

### 根节点 class

- 基础：`compaign-all-card`
- 互斥状态：
  - `compaign-all-card--desktop-vertical`
  - `compaign-all-card--desktop-horizontal`
  - `compaign-all-card--mobile-vertical`
  - `compaign-all-card--mobile-horizontal`

### 允许保留的内部 class

- `.icon-aixin`：公共收藏行为和公共样式钩子，由 `item-like-button.html` 输出。

### 内部结构选择器

- 使用根作用域下的 `> figure`、`> section`、`> section > header`、`> section > dl`、`> section > nav`。
- 字段使用 `[data-role]`、`[data-field]`。
- 标签使用 `> nav > a > span`，不新增 `.item-tag`、`.item-tag-text`。
- 统计使用 `dl > div > dt/dd`，不新增旧 `.compaign-item-brand-*` class。
- 全局 `header` 会附加背景、padding、flex 等样式；组件基础规则显式重置这些属性。
- 重置 `figure`、`h2`、`dl`、`dt`、`dd`、`p` 的浏览器或全局默认 margin / padding。

## CSS / LESS 职责

### 公共样式

复用并扩展 `css/compaign.css/.less`：

- `.compaign-all-card` 公共定位、边框、背景、hover、overflow。
- 公共语义节点重置。
- 标题、统计、Products、标签和收藏按钮的共同行为。
- `.compaign-all-unified-items-pager` 的通用单列表 flex 基础，外部 gap 由状态卡片 margin 表达。

### 四状态样式

新建：

- `css/compaign-all-card-desktop-vertical.css/.less`
- `css/compaign-all-card-desktop-horizontal.css/.less`
- `css/compaign-all-card-mobile-vertical.css/.less`
- `css/compaign-all-card-mobile-horizontal.css/.less`

每份文件只以对应根状态 class 为入口，负责该状态的宽高、方向、排列、间距、显隐和顺序。

Vertical 列表宽度兼容当前页面断点：

- PC 大屏三列；1160px 以下两列；980px 以下单列；断点只调整同一 Desktop Vertical 状态的页面列数，不负责选择设备状态。
- Mobile Vertical 两列。
- Horizontal 统一一列。

Vertical 与 Horizontal 都使用同一个 `AD` 节点：Desktop 使用当前 PC Horizontal 标志尺寸；Mobile 使用当前 Mobile Horizontal 标志尺寸。

## 页面与状态切换

修改 `src/pages/compaign-all.html`：

- 添加四份状态 CSS 链接。
- 将两套 `.items-container[data-layout]` 合并为一个 `.items-container` 和一个 `#items-grid`。
- 7 次 include 新统一组件，初始状态为 `compaign-all-card--desktop-vertical`。
- 删除仅修改 Mobile Horizontal 卡片数据的内联脚本段；其它筛选器文案和预设属性逻辑保留。
- 目标页不再加载 `js/layoutswitch.js`，改为加载 `js/compaign-all-layout.js`。
- 初始化 `window.compaignAllLayout` 与现有 `PageList`。

新建 `js/compaign-all-layout.js`：

- `matchMedia('(max-width: 768px)')` 确定 Mobile / Desktop。
- `currentLayout` 保存 Vertical / Horizontal。
- 布局按钮事件使用 `event.currentTarget.dataset.layout`。
- 同步时只移除四个状态 class，再添加唯一目标状态 class。
- 监听断点变化。
- 使用限定 `#items-grid` 的 `MutationObserver` 同步动态新增卡片。
- 缓存由统一 partial 输出的卡片原型，提供动态克隆入口。

## 动态内容迁移

修改页面专属 `js/compaignpage.js`：

- 保留 Show More、reload、分页接口和现有异步流程。
- `createItemElement()` 不再通过模板字符串维护旧组件 HTML。
- 改为调用统一布局实例克隆卡片原型；克隆卡片立即继承当前根状态 class。
- reload 清空活动单列表后仍可从缓存原型继续生成卡片。
- 不修改共享 `js/pagelist.js`。

## 分批实施顺序

- [x] 修改前建立四状态 Playwright 基线和元素尺寸清单。
- [x] 新建统一组件 partial。
- [x] 在 `compaign.css/.less` 添加根基础样式。
- [x] 完成 PC Horizontal 状态，优先对齐数据相同的最低风险基线。
- [x] 完成 Mobile Horizontal 状态。
- [x] 完成 PC Vertical 状态并加入 `AD`。
- [x] 完成 Mobile Vertical 状态并加入 `AD`。
- [x] 合并目标页两套列表并接入专用状态脚本。
- [x] 迁移 `compaignpage.js` 动态克隆。
- [x] 构建、残留和行为检查。
- [x] 修改后四状态 Playwright 回归。

## Playwright 基线与回归矩阵

使用独立临时 Git worktree 打开修改前 HEAD，基线和修改后工作区使用不同端口；使用 Playwright，不使用 Chrome MCP。

视口：

- PC：1440 × 1200。
- Mobile：390 × 844。

状态：

1. PC Vertical
2. PC Horizontal
3. Mobile Vertical
4. Mobile Horizontal

每种状态记录：

- 页面截图和首张卡片裁剪图。
- 列表、首两张卡片、封面、标题行、收藏按钮、统计、Products、标签 bounding box。
- 计算样式中的字体、行高、颜色、边框、圆角、阴影、gap。

对比策略：

- PC Horizontal 数据相同，目标为组件像素级一致；若抗锯齿导致非零差异，记录差异像素及原因。
- PC/Mobile Vertical 因数据统一且新增 `AD`，Mobile Horizontal 因移除运行时数据替换，像素内容差异属于已批准变化；这些状态以对应元素 bounding box 和样式值对齐为主。
- 检查页面其它区域无非预期变化。

## 行为回归

- [x] Vertical / Horizontal 切换只改变卡片根状态 class。
- [x] PC / Mobile 跨 768px 断点只改变卡片根状态 class。
- [x] 每张卡片始终只有一个互斥状态 class。
- [x] 卡片数量和顺序不随状态切换变化。
- [x] 收藏按钮切换图片、`data-like` 和 `aria-pressed`。
- [x] 标题和标签链接保持可点击。
- [x] Show More 新卡片使用统一 DOM 并继承当前状态。
- [x] reload 后仍能生成统一卡片。
- [x] 分页、筛选、排序、空状态和页面其它组件不受影响。

## 构建、语法与残留检查

```bash
node scripts/build-pages.js
node --check js/compaign-all-layout.js
node --check js/compaignpage.js
git diff --check
```

追加检查：

```bash
rg "index-hot-compaign-item|compaign-all-horizontal-item" src/pages/compaign-all.html
rg "items-grid-horizontal|items-container-horizontal|items-container-vertical" src/pages/compaign-all.html js/compaign-all-layout.js js/compaignpage.js
rg "figma-hot-compaign-item|figma-compaign-horizontal-item|class=\"compaign-item" src/pages/compaign-all.html js/compaignpage.js
rg "compaign-all-card--" src/partials/components/compaign-all-card.html css js
rg "class=\"[^\"]+\"" src/partials/components/compaign-all-card.html
```

确认：

- [x] 目标页不再输出两套活动列表或旧组件 DOM。
- [x] 旧 partial 因仍有范围外消费者而保留。
- [x] CSS / LESS 文件成对且规则等价。
- [x] 根目录 `compaign-all.html` 由构建脚本生成。
- [x] 无 JS 语法、空白或残留引用错误。
