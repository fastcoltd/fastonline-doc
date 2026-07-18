# 统一 Item 组件索引

本项目目前已经封装 5 种统一 Item 组件。同一种业务 Item 只维护一份 HTML，通过替换组件最外层的状态 class 匹配不同 CSS，从而切换 PC / Mobile、Vertical / Horizontal 的样式和布局。

切换状态时不得替换组件内部 DOM、组件数据或业务行为。

## 组件总览

| 业务类型 | 组件基础 class | HTML partial | 当前状态数量 | 当前使用页面 |
| --- | --- | --- | --- | --- |
| 商品 Item | `item-all-card` | `src/partials/components/item-all-card.html` | 4 | `item-all.html` |
| 店铺 Store Item | `store-all-card` | `src/partials/components/store-all-card.html` | 4 | `store-all.html` |
| Campaign Item | `compaign-all-card` | `src/partials/components/compaign-all-card.html` | 4 | `compaign-all.html` |
| Demand Item | `demand-all-card` | `src/partials/components/demand-all-card.html` | 4 | `demand-all.html` |
| Post Item | `post-all-card` | `src/partials/components/post-all-card.html` | 2 | `post-all.html` |

> 注意：项目中的 Campaign 文件及 class 当前统一拼写为 `compaign`，复用时必须继续使用这个拼写。

## 1. 商品 Item

组件：`src/partials/components/item-all-card.html`

基础样式：

- `css/item-all.css`
- `css/item-all.less`

状态 class 与样式文件：

| 状态 | 根状态 class | CSS / LESS |
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

| 状态 | 根状态 class | CSS / LESS |
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

| 状态 | 根状态 class | CSS / LESS |
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

| 状态 | 根状态 class | CSS / LESS |
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

| 状态 | 根状态 class | CSS / LESS |
| --- | --- | --- |
| PC | `post-all-card--desktop` | `css/post-all-card-desktop.css` / `.less` |
| Mobile | `post-all-card--mobile` | `css/post-all-card-mobile.css` / `.less` |

状态切换脚本：`js/post-all-layout.js`

Post 第一张特色卡片还可以保留根级扩展 class：`post-all-card--featured`。这个 class 是视觉扩展，不是互斥设备状态，切换 PC / Mobile 时不能删除。

## 在其他页面复用时的规则

1. 通过 `@include` 引入对应的唯一 HTML partial，不复制组件内部 HTML。
2. 根据组件 partial 的参数传入标题、图片、链接、Brand、标签、收藏状态等数据。
3. 页面必须加载对应的基础 CSS，以及该页面可能切换到的全部状态 CSS。
4. 每张组件只能保留一个互斥状态 class。
5. 切换布局或设备时，只移除完整状态 class 集合并添加目标状态 class。
6. 不得通过 JavaScript 改写内部 HTML、替换数据或维护第二份组件模板字符串。
7. 动态新增 Item 时，应克隆由统一 partial 生成的 `<template>` 或组件原型，并同步当前根状态 class。
8. `.icon-aixin` 等内部 class 属于公共行为钩子，复用时不能删除。
9. 修改 CSS 时必须同步修改对应 LESS。
10. 如果目标页面存在独立列表、不同容器 ID 或多组布局按钮，应为该页面调整状态脚本作用域，不能直接让脚本操作其它业务列表。

## 推荐的页面接入顺序

1. 引入组件基础 CSS。
2. 引入需要支持的状态 CSS。
3. 在 `src/pages` 或业务 partial 中使用 `@include` 输出组件。
4. 给组件传入唯一初始状态 class。
5. 接入或调整对应的状态切换脚本。
6. 执行 `node scripts/build-pages.js` 生成根目录 HTML。
7. 检查切换前后只有根状态 class 发生变化，组件 DOM 和数据保持不变。

统一封装与后续迁移还应遵守：

- `rules/component_unification_rule.md`
- `rules/html_selector_simplification_rule.md`
- `rules/source_build_rule.md`
