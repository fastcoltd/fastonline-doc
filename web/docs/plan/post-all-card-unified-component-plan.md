# Post All 卡片统一封装计划

## 目标与非目标

- [x] 将 `post-all.html` 的 Post item 封装为一份语义化组件 DOM。
- [x] 当前只支持 Desktop、Mobile 两种设备状态，不引入尚不存在的 Vertical / Horizontal 模式。
- [x] 两种状态统一使用当前 Desktop 卡片的数据、链接、收藏状态和特色卡片状态。
- [x] 设备变化时只替换组件根状态 class，不替换 DOM、数据或内部 HTML。
- [x] 保持 Desktop、Mobile 原有尺寸、位置、字体、颜色、间距、圆角、阴影和交互完全一致。
- [x] Show More、筛选重载等动态新增卡片继续使用同一组件 DOM，并继承当前设备状态。
- [x] 本次只迁移 `post-all.html`；不迁移 `tag-all.html`、`brand.html`、`search-all.html`、`index.html` 或其它页面。
- [x] 不删除仍有范围外消费者的 `post-shared-item.html`、相关旧规则和共享行为脚本。

## 当前结构与消费者

### post-all.html 当前结构

- 页面只有一个 `.items-container.layout-horizontal`，列表为 `#items-grid.items-pager`。
- `src/partials/components/post-shared-item.html` 在页面中静态 include 4 次，四张卡片使用相同 Desktop 数据；第一张额外带 `.post-all-featured-item`。
- 当前 HTML 已通过 `css/post.css` 和 `css/post-all.css` 的媒体查询复用一套 DOM，但设备状态并非组件根状态 class，内部仍保留大量仅用于样式的 class。
- 页面加载 `js/layoutswitch.js`，但不存在布局切换按钮；其默认 Vertical 状态与当前固定 Horizontal 列表不一致，对页面无实际价值。
- `js/postpage.js` 只在 Mobile 初始化 Show More；动态卡片由 JavaScript 模板字符串重新手写一套旧组件 HTML。

### 旧 partial 与消费者

- `src/partials/components/post-shared-item.html`
  - `post-all.html`：本次迁出。
  - `tag-all.html`：继续使用，保持不变。
  - `src/partials/components/brand-hot-posts-section.html`：由 `brand.html` 间接使用，保持不变。
  - `src/partials/components/search-all-post-item.html`：由 `search-all.html` 间接使用，保持不变。
  - `src/partials/index-host-post-item.html`、`src/partials/index-host-post-item-5.html`：由首页与 Brand 区域间接使用，保持不变。
- `src/partials/components/item-like-button.html`
  - 继续作为公共收藏按钮 partial 复用，保留 `.icon-aixin` 行为 class。

### CSS/LESS 与 JS 依赖

- `css/post.css/.less` 被 Post All、Search All、Brand、Item Detail、Tag All、Index、Blog 等页面共享；旧 `.post-item` 规则必须保留给范围外消费者。
- `css/post-all.css/.less` 只服务目标页，可在不影响其它页面的前提下加入统一组件基础样式及页面容器规则。
- 新建的两份状态 CSS/LESS 只以对应根状态 class 为入口，不使用媒体查询决定组件状态。
- `js/common.js` 使用事件委托处理 `.icon-aixin` 收藏切换，新组件保留该行为 class、`data-like` 和 `aria-pressed`。
- `js/postpage.js` 只由目标页加载，可迁移动态生成逻辑。
- `js/layoutswitch.js` 是共享文件，不修改；目标页移除引用并改用专用设备状态脚本。
- 全局 CSS 对语义化 `header` 有背景、flex 和 padding 等规则；新组件必须在根作用域内显式中和。

## 数据统一策略

Desktop 与 Mobile 使用同一份当前 Desktop 数据：

- 静态卡片数量：4 张。
- 第一张：特色背景 `.post-all-card--featured`，已收藏，`data-like="1"`、`image/Vector_sel.png`、`aria-pressed="true"`。
- 其余三张：沿用当前页面传入的相同 Desktop 数据与收藏状态。
- 封面：`image/figma-hot-post-cover.jpg`。
- 详情链接：`post-detail.html?name=post-name`。
- 标题：`The article has a long title, and the title of thearticle is concise and attractive`。
- 作者头像：`image/figma-hot-post-avatar.png`；作者：`Buckridge, M`。
- 摘要：`zhaiyao：lusto voluptatibus odit. Fugacupiditate at est deserunt quiapossimus.Et vel nulla laboriosam`。
- Brand：`Quora`，颜色 `#242F65`。
- Kind 标签：`Resolution : 4K`、`Installation : Fixed`、`Device : Universal`，均链接到 `items.html`。

设备切换不修改以上数据、卡片数量、顺序、链接或收藏状态。

## 新组件结构与 include 参数

新建 `src/partials/components/post-all-card.html`，输出一份语义结构：

```html
<article class="post-all-card {{post_card_state_class}} {{post_card_context_class}}">
    <figure><img src="{{cover_image}}" alt="{{cover_alt}}" /></figure>
    <section>
        <header><h2><a href="{{item_link}}"><span>{{item_title}}</span></a></h2></header>
        <section data-role="author"><img ... /><p>{{author_name}}</p></section>
        <p data-role="summary">{{summary}}</p>
        <dl data-role="brand"><div><dt>{{brand_label}}</dt><dd>{{brand_name}}</dd></div></dl>
        <nav aria-label="Post attributes"><span data-role="label">{{kind_label}}</span>{{item_tags}}</nav>
    </section>
    <!-- include item-like-button.html -->
</article>
```

参数包括：

- `post_card_state_class`、`post_card_context_class`
- `like`、`like_icon`、`aria_pressed`
- `cover_image`、`cover_alt`
- `item_link`、`item_title`
- `author_avatar`、`author_avatar_alt`、`author_name`
- `summary`
- `brand_label`、`brand_name`、`brand_color`
- `kind_label`、`item_tags`

Brand 颜色通过根节点 CSS 自定义属性传入，避免为内部字段新增样式 class。

## Class 与选择器方案

### 根节点 class

- 稳定基础：`post-all-card`
- 互斥设备状态：
  - `post-all-card--desktop`
  - `post-all-card--mobile`
- 页面/视觉扩展：`post-all-card--featured`

### 允许保留的内部 class

- `.icon-aixin`：公共收藏行为和公共样式钩子，由 `item-like-button.html` 输出。

### 内部结构选择器

- 使用根作用域下的 `> figure`、`> section`、`> section > header`、`h2`、`dl`、`nav` 等语义结构。
- 作者、摘要、Brand、Kind 标签使用 `[data-role]` 稳定定位。
- 不新增旧 `.post-item-*`、`.item-brand-*`、`.item-tag-*` 等仅用于样式的内部 class。
- 所有选择器均以 `.post-all-card` 或对应状态 class 为根作用域，不新增宽泛全局选择器。
- 在组件根作用域内重置语义 `header` 命中的全局背景、padding、宽度与 flex 规则。

## CSS / LESS 职责

### 公共基础与页面容器

复用并扩展 `css/post-all.css/.less`：

- `.post-all-card` 的公共背景、阴影、定位、overflow、文字颜色和交互基础。
- 语义节点默认样式与全局 `header` 污染重置。
- 标题、作者、摘要、Brand、Kind 标签、收藏按钮的公共基础。
- `.post-all-card--featured` 的现有特色背景。
- `#items-grid` 与页面专属列表排布；组件内部与列表外部间距保持解耦。
- 继续保留目标页仍需使用的加载、空状态和 Show More 页面规则。

### 两份设备状态 CSS/LESS

新建：

- `css/post-all-card-desktop.css/.less`
- `css/post-all-card-mobile.css/.less`

每份文件只能以对应状态 class 为入口，负责该设备状态独有的：

- 卡片方向、尺寸、padding、gap 与圆角；
- 封面尺寸和圆角；
- 内容区宽度、间距与标题高度；
- 作者头像尺寸；
- 摘要显隐；
- 收藏按钮位置；
- Brand、Kind 标签尺寸与排布。

状态文件不使用媒体查询决定当前设备；PC / Mobile 由 JavaScript 替换根状态 class。

## 页面与状态切换

修改 `src/pages/post-all.html`：

- 加载两份新状态 CSS。
- 保留一个 `#items-grid`，用 4 次统一组件 include 替换旧 `post-shared-item.html` include。
- 初始状态使用 `post-all-card--desktop`，页面初始化后按实际视口同步。
- 第一张保留 `post-all-card--featured` 根级扩展 class。
- 移除目标页无效的 `js/layoutswitch.js`，加载 `js/post-all-layout.js`。
- 增加由统一 partial 输出的 `<template id="post-all-card-template">`，作为动态卡片唯一原型。

新建 `js/post-all-layout.js`：

- 使用 `matchMedia('(max-width: 768px)')` 判断 Mobile / Desktop。
- 每次同步时移除完整的两种状态 class，再添加唯一目标状态 class。
- 操作严格限定为 `#items-grid > .post-all-card`。
- 使用限定列表作用域的 `MutationObserver`，使动态新增卡片继承当前设备状态。
- 不修改内部 HTML、卡片数据、卡片数量或特色扩展 class。

## 动态内容迁移

修改 `js/postpage.js`：

- 保留 Mobile 才初始化 Show More 的现有逻辑、1 秒模拟延迟、每次 20 张、Loading、随机 No More 和重载行为。
- 删除 JavaScript 中硬编码的旧卡片模板字符串。
- `createItemElement()` 改为克隆 `#post-all-card-template` 中由统一 partial 生成的组件。
- 动态卡片通过 `MutationObserver` 自动取得当前 `post-all-card--desktop` 或 `post-all-card--mobile` 状态。
- Desktop 下 Show More 继续保持当前无操作行为。
- 空状态 `.no-data-wrapper` 继续保留在列表内且不作为卡片克隆。

## 分批实施顺序

- [x] 使用独立临时 Git worktree 建立 Desktop / Mobile Playwright 修改前基线。
- [x] 新建统一组件 partial。
- [x] 在 `post-all.css/.less` 添加公共基础样式和目标页容器兼容规则。
- [x] 完成 Desktop 状态 CSS/LESS 并像素对齐。
- [x] 完成 Mobile 状态 CSS/LESS 并像素对齐。
- [x] 替换目标页旧 include，接入专用设备状态脚本。
- [x] 迁移 Show More / reload 动态克隆逻辑。
- [x] 执行页面构建、JS 语法、CSS/LESS 同步、残留和空白检查。
- [x] 使用相同条件完成修改后 Desktop / Mobile Playwright 回归。
- [x] 关闭浏览器与本地服务，清理临时 worktree。

## Playwright 基线与回归矩阵

使用独立临时 Git worktree 打开修改前 HEAD；基线与修改后工作区使用不同端口。只使用 Playwright，不使用 Chrome MCP。

视口：

- Desktop：1440 × 1200。
- Mobile：390 × 844。

状态：

1. Desktop 固定布局。
2. Mobile 固定布局。
3. 首张 Featured / selected 收藏状态。
4. 普通卡片状态。

每种状态记录：

- 页面可视区域、列表、首张 Featured 卡片和第二张普通卡片截图。
- 列表、卡片、封面、内容、标题、收藏、作者、摘要、Brand、Kind 标签 bounding box。
- 字体、行高、颜色、背景、边框、圆角、阴影、gap、padding、overflow。
- 静态卡片数量、直接子元素数量、标题/标签链接和收藏状态。

对比策略：

- 数据完全一致，Desktop 与 Mobile 均对同尺寸卡片截图执行像素差异检查，目标为 `0` 个变化像素。
- 若浏览器文字抗锯齿导致整图差异，则以组件独立截图、像素差异分布和全部关键 bounding box / computed style 一致作为补充证据，并如实报告。
- 页面筛选、排序、Show More、加载、空状态和其它页面区域不得出现非预期变化。

## 行为回归

- [x] Desktop / Mobile 跨 768px 断点只改变卡片根状态 class。
- [x] 每张卡片始终只有一个互斥设备状态 class。
- [x] 卡片数量、顺序、数据和 Featured 扩展 class 不随设备变化。
- [x] 收藏按钮可切换图片、jQuery `data('like')` 和 `aria-pressed`，并保持现有 `data-like` HTML 属性不变。
- [x] 标题和三个 Kind 标签链接保持有效。
- [x] Mobile Show More 从 4 张增加到 24 张统一 DOM，并继承 Mobile 状态。
- [x] Mobile reload 清除旧动态卡片后加载 20 张统一 DOM。
- [x] Desktop Show More 保持当前无操作行为。
- [x] Loading、No More、筛选、排序、空状态和页面其它组件不受影响。

## 构建、语法与残留检查

```bash
node scripts/build-pages.js
node --check js/post-all-layout.js
node --check js/postpage.js
git diff --check
```

追加检查：

```bash
rg "post-shared-item" src/pages/post-all.html js/post-all-layout.js js/postpage.js
rg "new PageLayout|layoutswitch.js" src/pages/post-all.html js/postpage.js
rg "post-item-|item-brand-|item-tag-" src/partials/components/post-all-card.html
rg "post-all-card--" src/partials/components/post-all-card.html css js
rg "class=\"[^\"]+\"" src/partials/components/post-all-card.html
```

确认：

- [x] 目标页每条业务数据只输出一份统一组件 DOM。
- [x] JS 不再手写第二份卡片 HTML。
- [x] 旧 `post-shared-item.html` 因仍有范围外消费者而保留且未修改。
- [x] 两份状态 CSS / LESS 成对存在且规则等价。
- [x] 根目录 `post-all.html` 只由构建脚本生成。
- [x] 无 JS 语法、空白或目标范围旧引用残留错误。

## 实际回归结果

- Desktop 1440 × 1200：整页、Featured 卡片、普通卡片与修改前截图均为 `0` 个变化像素。
- Mobile 390 × 844：整页、Featured 卡片、普通卡片与修改前截图均为 `0` 个变化像素。
- 两个视口下列表、卡片、封面、内容、标题、收藏、作者、摘要、Brand、Kind 和三枚标签 bounding box 全部一致。
- 同一批静态卡片跨 768px 断点切换时 DOM 引用保持不变，只替换 `post-all-card--desktop` / `post-all-card--mobile`。
- Mobile 动态新增后的 24 张卡片均为统一 DOM、均继承 Mobile 状态；随后切回 Desktop，24 张卡片全部只保留 Desktop 状态。
- Mobile reload 后为 20 张统一组件；Loading、No More、空状态位置、收藏和链接行为通过。
