# 全项目统一 Item 组件与迁移规范

## 文档用途

本文件既是 5 种统一 Item 组件的索引，也是将项目中旧 Item 迁移到统一组件时的执行规范。

后续收到类似下面的指令时，应直接以本文件为准执行，不需要重新设计组件或保留目标页面旧 Item 的特殊样式：

> 根据 `docs/unified-item-components.md`，使用 Post Item 替换 `index.html` 的 Host posts Item。

## 全项目最终目标

1. 本文件中的 5 种组件是整个项目对应业务 Item 的标准组件和唯一实现。
2. 项目中所有相同业务类型的 Item，都应逐步替换为对应的统一组件。
3. 替换后直接采用统一组件目前已经封装好的标准结构和状态样式，不要求保留旧页面 Item 的细微布局或视觉差异。
4. 后续需要调整某类 Item 时，应统一修改该组件及其现有状态 CSS，使所有使用页面一起生效。
5. 不得为了 Index、Brand、Tag、Search 等具体页面复制新的组件 HTML，也不得新增页面专用的组件状态 class 或组件内部样式。

同一种业务 Item 只维护一份 HTML。组件 `<article>` 只保留固定基础 class；PC / Mobile、Vertical / Horizontal 的布局差异，只通过替换使用场景公共外层容器已有的状态 class 匹配对应 CSS 实现。切换状态时不得替换组件根 class、内部 DOM、组件数据或业务行为。

## 组件总览

| 业务类型 | 组件基础 class | 唯一 HTML partial | 当前状态数量 | 首个标准接入页面 |
| --- | --- | --- | --- | --- |
| 商品 Item | `item-all-card` | `src/partials/components/item-all-card.html` | 4 | `item-all.html` |
| 店铺 Store Item | `store-all-card` | `src/partials/components/store-all-card.html` | 4 | `store-all.html` |
| Campaign Item | `compaign-all-card` | `src/partials/components/compaign-all-card.html` | 4 | `compaign-all.html` |
| Demand Item | `demand-all-card` | `src/partials/components/demand-all-card.html` | 4 | `demand-all.html` |
| Post Item | `post-all-card` | `src/partials/components/post-all-card.html` | 2 | `post-all.html` |

> 注意：项目中的 Campaign 文件及 class 当前统一拼写为 `compaign`，复用时必须继续使用这个拼写。

固定对应关系：

- 商品类 Item → `item-all-card.html`
- Store 类 Item → `store-all-card.html`
- Campaign 类 Item → `compaign-all-card.html`
- Demand 类 Item → `demand-all-card.html`
- Post 类 Item → `post-all-card.html`

## 1. 商品 Item

组件：`src/partials/components/item-all-card.html`

基础样式：

- `css/item-all.css`
- `css/item-all.less`

状态 class 与样式文件：

| 状态 | 外层状态 class | CSS / LESS |
| --- | --- | --- |
| PC Vertical | `item-all-card--desktop-vertical` | `css/item-all-card-desktop-vertical.css` / `.less` |
| PC Horizontal | `item-all-card--desktop-horizontal` | `css/item-all-card-desktop-horizontal.css` / `.less` |
| Mobile Vertical | `item-all-card--mobile-vertical` | `css/item-all-card-mobile-vertical.css` / `.less` |
| Mobile Horizontal | `item-all-card--mobile-horizontal` | `css/item-all-card-mobile-horizontal.css` / `.less` |

状态切换脚本：`js/item-all-layout.js`

## 2. 店铺 Store Item

组件：`src/partials/components/store-all-card.html`

基础样式：

- `css/store.css`
- `css/store.less`

状态 class 与样式文件：

| 状态 | 外层状态 class | CSS / LESS |
| --- | --- | --- |
| PC Vertical | `store-all-card--desktop-vertical` | `css/store-all-card-desktop-vertical.css` / `.less` |
| PC Horizontal | `store-all-card--desktop-horizontal` | `css/store-all-card-desktop-horizontal.css` / `.less` |
| Mobile Vertical | `store-all-card--mobile-vertical` | `css/store-all-card-mobile-vertical.css` / `.less` |
| Mobile Horizontal | `store-all-card--mobile-horizontal` | `css/store-all-card-mobile-horizontal.css` / `.less` |

状态切换脚本：`js/store-all-layout.js`

## 3. Campaign Item

组件：`src/partials/components/compaign-all-card.html`

基础样式：

- `css/compaign.css`
- `css/compaign.less`

状态 class 与样式文件：

| 状态 | 外层状态 class | CSS / LESS |
| --- | --- | --- |
| PC Vertical | `compaign-all-card--desktop-vertical` | `css/compaign-all-card-desktop-vertical.css` / `.less` |
| PC Horizontal | `compaign-all-card--desktop-horizontal` | `css/compaign-all-card-desktop-horizontal.css` / `.less` |
| Mobile Vertical | `compaign-all-card--mobile-vertical` | `css/compaign-all-card-mobile-vertical.css` / `.less` |
| Mobile Horizontal | `compaign-all-card--mobile-horizontal` | `css/compaign-all-card-mobile-horizontal.css` / `.less` |

状态切换脚本：`js/compaign-all-layout.js`

## 4. Demand Item

组件：`src/partials/components/demand-all-card.html`

基础样式：

- `css/demand.css`
- `css/demand.less`

状态 class 与样式文件：

| 状态 | 外层状态 class | CSS / LESS |
| --- | --- | --- |
| PC Vertical | `demand-all-card--desktop-vertical` | `css/demand-all-card-desktop-vertical.css` / `.less` |
| PC Horizontal | `demand-all-card--desktop-horizontal` | `css/demand-all-card-desktop-horizontal.css` / `.less` |
| Mobile Vertical | `demand-all-card--mobile-vertical` | `css/demand-all-card-mobile-vertical.css` / `.less` |
| Mobile Horizontal | `demand-all-card--mobile-horizontal` | `css/demand-all-card-mobile-horizontal.css` / `.less` |

状态切换脚本：`js/demand-all-layout.js`

## 5. Post Item

组件：`src/partials/components/post-all-card.html`

基础样式：

- `css/post-all.css`
- `css/post-all.less`

Post 当前没有 Vertical / Horizontal 模式，只有两种设备状态：

| 状态 | 外层状态 class | CSS / LESS |
| --- | --- | --- |
| PC | `post-all-card--desktop` | `css/post-all-card-desktop.css` / `.less` |
| Mobile | `post-all-card--mobile` | `css/post-all-card-mobile.css` / `.less` |

状态切换脚本：`js/post-all-layout.js`

Post 第一张特色卡片还可以在组件根保留扩展 class：`post-all-card--featured`。这个 class 是视觉扩展，不是互斥设备状态，切换 PC / Mobile 时不能删除。

## 统一结构与页面数据的边界

统一的是 Item 的 HTML 结构和 CSS 样式，不是把所有页面的数据改成一样。

目标页面原有的标题、图片、链接、描述、作者、Brand、标签、收藏状态等业务数据，应继续通过统一组件的 include 参数传入。例如首页和 Post 列表页可以使用不同的标题和图片，但二者都必须由 `post-all-card.html` 输出同一套 DOM。

迁移时必须遵守：

1. 通过 `<!-- @include ... -->` 引入对应的唯一 HTML partial，不复制组件内部 HTML。
2. 按组件 partial 已有参数传入目标页面的数据；缺少必要参数时，优先补充通用参数，不建立页面专用组件。
3. 保留链接、收藏状态、ARIA 属性、行为钩子和该页面所需的真实数据。
4. 不得为了复用组件，把目标页面的数据强行替换成标准接入页面的示例数据。

## 组件 CSS 与页面 CSS 的职责

组件内部布局由上面列出的基础 CSS 和现有状态 CSS 统一负责。所有使用同一状态的页面，都使用同一份状态 CSS。

页面只负责 Item 外部的列表、网格、轮播、间距和容器宽度等布局。例如首页可以继续负责 Host posts 轮播，但轮播中的 Post 卡片内部布局必须由 Post Item 的 PC / Mobile CSS 负责。

具体规则：

1. 页面必须加载对应的基础 CSS，以及实际可能使用的现有状态 CSS。
2. 不得新增 `index-post-card`、`search-store-card` 等页面专用组件状态 class。
3. 不得新增仅用于恢复旧页面 Item 内部样式的页面专用 CSS，也不得用页面祖先选择器覆盖统一组件内部布局。
4. 目标页面已有的外部列表或轮播 CSS 可以继续使用；确有必要时只能调整组件外部布局，不得复制组件内部样式。
5. 修改统一组件 CSS 时必须同步修改对应 LESS。

## 状态 class 切换规则

1. 组件根只保留固定基础 class；设备/方向状态必须放在该组件区域的公共外层容器上。
2. 每个公共外层状态容器同时只能保留一个该组件的互斥状态 class。
3. PC / Mobile、Vertical / Horizontal 切换时，只从公共外层移除该组件完整的互斥状态 class 集合，再添加目标状态 class。
4. 外层可以是 `div`、`section`、列表、网格或轮播容器；CSS 不得依赖其标签名称，并允许外层与组件之间存在包装层。
5. 同一组件区域不能嵌套两个互相冲突的同类型状态容器；独立区域需要独立切换时，应分别设置状态容器。
6. 切换状态不得重建 DOM、替换内容或改变业务数据。
7. `post-all-card--featured` 这类已存在的非互斥扩展 class 可以保留在组件根，不能在设备状态切换时误删。
8. 如果目标页面存在独立列表、不同容器 ID 或多组布局按钮，只调整现有状态切换逻辑的作用域，避免影响其他业务列表；不得因此创建新的组件状态。

## JavaScript 动态生成 Item 的规则

JavaScript 动态新增的 Item 也必须来自统一组件，不能继续在 JS 中用模板字符串或 `innerHTML` 手写另一份完整 Item HTML。

允许的实现方式是：

1. 在源码中通过统一 partial 生成隐藏的 `<template>` 或标准组件原型。
2. JavaScript 使用 `template.content.cloneNode(true)` 或 `cloneNode(true)` 克隆组件。
3. 根据需要写入当前 Item 的数据，并插入对应公共状态容器；新 Item 自动继承外层状态，不在组件根同步状态 class。
4. 轮播为了展示而克隆现有统一组件是允许的，但克隆后的 DOM 仍须来自统一组件。

如果旧 JavaScript 中存在完整 Item 模板字符串，迁移时必须一并移除，避免形成第二份 HTML 实现。

## Codex 执行单页迁移的标准流程

1. 阅读本文件、目标统一组件 partial 及其现有参数和状态文件。
2. 查找目标页面中该类型旧 Item 的源码、间接 include、JavaScript 动态模板和相关样式。
3. 在 `src/pages` 或 `src/partials` 源码中，用唯一统一组件 partial 替换旧 Item。
4. 将目标页面原有业务数据映射到统一组件 include 参数。
5. 接入统一组件现有的基础 CSS 和状态 CSS，不新增页面专用组件 class、组件 partial 或组件内部 CSS。
6. 保留页面自己的列表、网格或轮播等外部布局；卡片内部直接采用统一组件当前标准样式。
7. 设备或布局变化时，只切换组件区域公共外层已有状态 class，组件 `<article>` 的基础 class 保持不变。
8. 将 JavaScript 动态 Item 改为克隆统一 partial 生成的模板或组件原型。
9. 执行 `node scripts/build-pages.js` 生成根目录 HTML，并完成语法、引用和差异检查。
10. 反向搜索旧 partial、旧 CSS 和旧动态模板的全部消费者；只有确认零消费者后才允许删除。

## 后续迁移指令的默认含义

当用户说：

> 根据 `docs/unified-item-components.md`，使用某种 Item 替换某个页面中的 Item。

Codex 应默认理解为：

- 使用本文件映射的唯一组件 partial。
- 保留目标页面原有业务数据，并通过 include 参数传入。
- 直接采用统一组件当前已有的 PC / Mobile / Vertical / Horizontal 状态样式。
- 不以像素级还原目标页面旧 Item 为迁移目标，不为旧页面差异新增专用样式。
- 页面继续负责列表、网格或轮播等外部布局。
- 同一组件区域只通过公共外层已有状态 class 切换样式和布局，区域内所有组件根 class 保持固定。
- 动态生成的 Item 同样迁移到统一组件来源。

以“使用 Post Item 替换 `index.html` 的 Host posts”为例：保留首页每篇 Post 的标题、图片、链接、作者、标签和收藏状态；HTML 改由 `post-all-card.html` 统一输出；`#hot-posts` 公共外层在 PC 与 Mobile 分别使用 `post-all-card--desktop` 和 `post-all-card--mobile`，内部 `<article class="post-all-card">` 不变；不再为首页旧卡片内部布局新增样式。

## 禁止事项

- 同一业务类型维护第二份 Item HTML。
- 为某个页面复制或包装出新的页面专用 Item 组件。
- 为某个页面新增专用的组件状态 class 或组件内部 CSS。
- PC 和 Mobile 各维护一套不同的 Item DOM。
- JavaScript 手写完整的 Item HTML 模板。
- 为了统一组件而把各页面的实际业务数据改成相同内容。
- 在旧实现仍有消费者时删除旧 partial、CSS 或 JavaScript。

## 迁移后的检查项

1. 目标页面中的同类 Item 均来自唯一组件 partial。
2. PC / Mobile 以及存在的 Vertical / Horizontal 状态使用正确的已有公共外层 class，组件根不携带这些状态 class。
3. 状态切换前后组件内部 DOM 和数据不变。
4. 目标页面原有数据、链接、收藏状态和交互行为仍然有效。
5. 页面外部列表、网格或轮播布局正常。
6. 不存在新增的页面专用组件 partial、状态 class 或组件内部 CSS。
7. JavaScript 不再维护另一份完整 Item HTML。
8. CSS 与 LESS 保持同步。
9. `node scripts/build-pages.js` 成功，且修改文件无语法错误。
10. 迁移验收以统一组件当前标准样式正确呈现为准，不要求与目标页面被替换前的旧 Item 完全一致。

统一封装与后续迁移还应遵守：

- `rules/component_unification_rule.md`
- `rules/html_selector_simplification_rule.md`
- `rules/source_build_rule.md`
