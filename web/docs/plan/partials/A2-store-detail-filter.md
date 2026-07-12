# HTML 选择器精简计划 — top-menu-store-detail / item-all-filter-panel

> 只读分析文档，不涉及任何修改。

---

## 文件一：top-menu-store-detail.html

**消费方**：`src/pages/store-detail.html`（唯一 include 方）

**关键依赖**：以下所有候选 class 同时出现在 `src/partials/components/top-menu.html`（该 partial 被 25+ 页面 include）。若只改本文件而不同步 top-menu.html，CSS 规则无法删除，精简无意义。

### 可精简（需同步修改 top-menu.html）

| 父级 class | 标签 | 现 class | 建议选择器 | CSS 文件 (+less) | 备注 |
|---|---|---|---|---|---|
| `.top-menu-item` | h3 | `top-menu-item-text` | `.top-menu-item > h3` | common.css:950,962 / common.less:1105,1119 | 13 处；`.active` 状态变体在父级，`> h3` 可覆盖 |
| `.top-menu-more-list-item` | img | `top-menu-more-list-item-icon` | `.top-menu-more-list-item > img` | common.css:1033 / common.less:1199 | 138 处；每个 item 唯一 img 首子 |
| `.top-menu-more-list-item` | a | `top-menu-more-list-item-text` | `.top-menu-more-list-item > a` | common.css:1041 / common.less:1208 | 138 处；每个 item 唯一 a 次子 |

### 保留

| class | 原因 |
|---|---|
| `top-menu-more-list-title` | 同一 class 同时用于 `<p>`（4 处）和 `<div>`（20 处）。`<div>` 非语义标签无法去掉 class，CSS 规则 `.top-menu-more-list-title` 必须保留。再为 `<p>` 增加 `.top-menu-more-list > p` 选择器反倒增加 CSS 体积 |
| `top-menu-container-more-box-icon` | 两个不同父级（`.top-menu-container-left-box` / `.top-menu-container-right-box`）共享此 class。去掉后需用 2 个选择器替代 1 个，CSS 复杂度不降反增；仅 2 处实例收益太小 |

### 需 JS 同步

无。以上 class 均未被 JS 引用。

### 疑似死类

无。所有 class 均在 css/ 中有实际规则。

---

## 文件二：item-all-filter-panel.html

**消费方**：6 个页面 — `item-all.html`, `store-all.html`, `demand-all.html`, `brand-service.html`, `compaign-all.html`, `post-all.html`

### 可精简

| 父级 class | 标签 | 现 class | 建议选择器 | CSS 文件 (+less) | 备注 |
|---|---|---|---|---|---|
| `.filter-header-nav` | h2 | `filter-title` | `.filter-header-nav h2` | filter.css:208 / filter.less:227 | 仅 1 处；父级 class 唯一包含此文件，无 @media 覆盖 |
| `.filter-group-header` | h2 | `filter-group-title` | `.filter-group-header h2` | filter.css:267(桌面),819(移动端) / filter.less:295(桌面),933(移动端) | 7 处；移动端覆盖位于 `@media (max-width:768px)`，需同步改为 `.item-all-filter-container .filter-group-header h2` |
| `.filter-back-btn` | span | `filter-back-icon` | `.filter-back-btn > span` | filter.css:179,186,196 / filter.less:195,203,214 | 仅 1 处；伪元素 `::before`/`::after` 跟随改为 `.filter-back-btn > span::before`/`::after` |

### 保留

| class | 原因 |
|---|---|
| `page-filter-icon` | 跨 6 个页面广泛复用（post-all, store-all, demand-all, brand-service, item-all, compaign-all），属"跨组件广泛复用的通用类" |
| `page-filter-num` | 同上，跨 6 个页面 |
| `filter-custom-select-text` | 跨 25+ 页面广泛复用，属"跨组件广泛复用的通用类" |
| `filter-input` | 所在 `<input>` 标签不在稳定语义列表（img/a/p/span/label/h1-h6/ul/ol/li）中 |
| `filter-spinner-svg` | 所在 `<svg>` 标签不在稳定语义列表中 |
| `spinner-icon-down` / `spinner-icon-up` | 所在 `<path>` 标签不在稳定语义列表中 |

### 需 JS 同步

无。以上 class 均未被 JS 引用（经 `rg` 检查 `js/` 目录，排除第三方库）。

### 疑似死类

无。所有 class 均在 css/ 中有实际规则。

---

## 汇总统计

| 文件 | 可精简 | 需 JS 同步 | 保留 | 疑似死类 |
|---|---|---|---|---|
| top-menu-store-detail.html | **3**（均需同步 top-menu.html） | 0 | 2 | 0 |
| item-all-filter-panel.html | **3** | 0 | 6 | 0 |

## 值得注意的点

1. **跨 partial 依赖**：top-menu-store-detail.html 的候选 class 与 top-menu.html 完全共享。实际修改时必须同时修改两个文件，否则 CSS 无法真正精简。影响范围涉及 25+ 页面（top-menu.html 的消费者），风险较高。
2. **`top-menu-more-list-title` 的混用**：同一 class 同时用于 `<p>` 和 `<div>` 标签，因 `<div>` 无法去掉 class，导致该选择器无法受益于简化。
3. **filter 面板的候选较少**：大部分 class 要么跨组件广泛复用（page-filter-icon/page-filter-num/filter-custom-select-text），要么附着在非语义标签（input/svg/path）上，不在规则范围内。
4. **无 JS 引用**：两类文件中所有被分析的 class 均未被 JS 引用，无需 JS 同步风险。
5. **零死类**：所有 class 在 css 目录中均有对应规则，无冗余 class。
