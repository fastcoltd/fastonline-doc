# HTML 选择器精简分析 — src/partials/components/

> 分析日期：2026-07-11
> 分析范围：16 个组件 partial
> 分类标准见项目文档 A3。

---

## 1. site-header.html

**消费方**：~27 个页面（所有主要页面，包括 page-top-sticky-main）

**可精简（5 个）**

| 父级 class | 标签 | 现 class | 建议选择器 | CSS(+less) | 备注 |
|---|---|---|---|---|---|
| `.header-menu-box` | `img` | `header-menu` | `.header-menu-box > img` | `common.less:288` / `common.css`  standalone→compound | 唯一 img，非 JS 用 |
| `.header-box-wrapper` | `a` | `a-link-logo` | `.header-box-wrapper > a:first-child` | `page.less:59` / `faq.less:57` / `index.less:741` | 唯一 a 直子，各页面 less 均有 compound override |
| `#header-logo` | `img` | `header-logo` | `#header-logo` (id 已唯一) | `common.less:305` / 多页面 compound | 已有 id，class 冗余 |
| `.header-search-box-input-box` | `img` | `header-search-box-input-box-icon` | `.header-search-box-input-box > img:last-child` | `common.less:512` standalone→compound | 唯一 img，onclick 内联非 class 选择器 |
| `.header-signin` | `span` | `header-signin-text` | `.header-signin > span` | `common.less:731` standalone→compound | 唯一 span，父级有 `#header-signin` |
| `.header-join` | `span` | `header-join-text` | `.header-join > span` | `common.less:932` / `common.less:987` @media / `page.less:72` / `faq.less:70` / `index.less:754` | 唯一 span，父级有 `#header-join` |
| `.header-items-label`（每个） | `a` | `header-seller-text` | `.header-items-label:last-child > a` | `common.less:712` standalone→compound | 唯一 a，可 `:last-child` 定位 |

**需 JS 同步(§3)**

| 父级 class | 标签 | 现 class | JS 引用位置 | 建议 JS 改法 |
|---|---|---|---|---|
| `.header-search-box-label` | `label` | `header-search-box-label-text` | `common.js:122`(构造), `:698`(`.text()`), `:704,710`(读取) | 改用 `.header-search-box-label > label` |
| `.header-search-box-label` | `img` | `header-search-box-label-icon` | `common.js:122`(构造) | 改用 `.header-search-box-label > img` |
| `.header-search-box-input-box` | `input` | `header-search-box-input-box-input` | `common.js:699`(`.val()`) | 改用 `.header-search-box-input-box > input` |
| `.header-items-label-resource` / `.header-items-label-post` | `img` | `header-items-label-icon` | `common.js:123,124`(构造) | 改用对应父级 > img |
| `.item-avatar` (`.header-avatar`) | `span` | `header-avatar-badge` | `common.js:640,643`(`querySelector` / `className =`) | 改用 `.header-avatar > span:last-child` |
| `.item-avatar` (`.header-avatar`) | `img` | `header-user-icon` | `common.js:679`(`querySelector`) + `auth-static-init-script.html:23` | 改用 `.header-avatar > img` |

**保留**

| class | 原因 |
|---|---|
| `header-menu-box` | 外包 div（非语义标签） |
| `header-search-box-label` | 外包 div |
| `header-search-box-input-box` | 外包 span（但 span 在候选列表 — 不过 JS 用 `.header-search-box-input-box` 需保留） |
| `header-menu-container` / `header-menu-selector` / `header-menu-list` / `header-menu-item` | 筛选/状态/JS 用 |
| `header-items-label` / `header-items-label-resource` / `header-items-label-post` | 状态变体 class |
| `title` (on h2/a/div) | 跨组件通用复用类（8+ 文件），CSS 已多用 compound |
| `content` (on div) | 跨组件通用复用类 |
| `header-user-box` / `item-money` / `item-notice` / `item-avatar` | 非语义或状态 |
| `badge` | 跨组件通用 |

---

## 2. site-footer.html

**消费方**：~30 个页面

**可精简（3 个）**

| 父级 class | 标签 | 现 class | 建议选择器 | CSS(+less) | 备注 |
|---|---|---|---|---|---|
| `.footer-item-title-box` | `strong` | `footer-item-title` | `.footer-item-title-box > strong` | `common.less:2561` / @media `:2903` / `:2570`(`:not(:first-child)`) | — |
| `.footer-item-title-box` | `span` | `footer-item-title-icon` | `.footer-item-title-box > span` | `common.less:2574,2584` / @media `:2911,2920,2924` | — |
| `.bottom-copy-right-content` | `img` | `footer-logo` | `.bottom-copy-right-content > img` | `common.less:2644` / @media `:2775` | 唯一 img |

**需 JS 同步(§3)**

| 父级 class | 标签 | 现 class | JS 引用位置 | 建议 JS 改法 |
|---|---|---|---|---|
| `.footer-item-title-box` | `span` | `footer-item-title-icon` | `common.js:489`(`querySelector`) | 改用 `.footer-item-title-box > span` |

注意：`footer-item-title-icon` 既是可精简又是 JS 用，取决于是否要同步修改 JS。若不同步 JS，则归为「需 JS 同步」。

**保留**

| class | 原因 |
|---|---|
| `footer-item-title-box` / `footer-item-desc-box` / `footer-item-content` | 外包容器，非语义，`is-open` 状态 |
| `footer-item-text` (on a) | 多个 a 同层级同标签，无法 `:nth-child`（顺序不定），必须保留 class |
| `follow-us-text` (on span) | 跨组件通用？仅此文件用。但 JS 未引用，CSS standalone → `.left-part-wrapper > span:first-child` 可精简。等下补充。 |

**追加可精简**

| 父级 class | 标签 | 现 class | 建议选择器 | CSS(+less) | 备注 |
|---|---|---|---|---|---|
| `.left-part-wrapper` | `span` | `follow-us-text` | `.left-part-wrapper > span:first-child` | `common.less:2654` / @media `:2771` | 唯一 span |
| `.item-gmt` | `span` | —（无 class） | — | — | 未用 class，忽略 |

**疑似死类**

| class | 原因 |
|---|---|
| 无 | — |

---

## 3. site-cookies-tips.html

**消费方**：~23 个页面

**可精简（2 个）**

| 父级 class | 标签 | 现 class | 建议选择器 | CSS(+less) | 备注 |
|---|---|---|---|---|---|
| `.cookies-tips-content` | `a` | `cookie-href` | `.cookies-tips-content > a` | `common.less:2961` / `common.css` | 唯一 a |
| `.cookies-feature-content-wrapper` | `div` | `cookies-feature-title` | — | `common.less:3008` | 非语义 div（但内容仅有此 div 需要样式） |

**需 JS 同步(§3)**

| class | JS 位置 | 说明 |
|---|---|---|
| `accept-btn` on `.btns-wrapper > div` | `common.js:1269` `$('.cookies-accept-btn')` | 需改为 `.cookies-tips-content .btns-wrapper > div:first-child` |
| `customize-btn` on `.btns-wrapper > div` | `common.js:1272` `$('.cookies-customize-btn')` | 需改为 `.btns-wrapper > div:last-child` |
| `feature-accept-btn` on `.cookies-feature-save-btn > div` | `common.js:1276` `$('.feature-accept-btn')` | 需改为 `.cookies-feature-save-btn > div` |

注意：`accept-btn` / `customize-btn` / `feature-accept-btn` 在 HTML 中是 `<div>`（非语义），但上述条目是给 JS 和 CSS 的 reference。实际这些 div 不应出现在「可精简」表，因为它们不是语义标签。

**保留**

| class | 原因 |
|---|---|
| `text` (on div) | 跨组件通用类 |
| `cookies-feature-label` (on label) | — 看「疑似死类」 |
| `cookies-feature-wrapper` / `btns-wrapper` 等 | 容器 div |

**疑似死类**

| class | CSS | 说明 |
|---|---|---|
| `cookies-feature-label` | 无 CSS 规则 | 在 3 个 `<label>` 上，但 CSS 无 `.cookies-feature-label` 规则。若样式来自 `label` 标签默认或继承，则 class 完全无用。 |

---

## 4. site-slide-btns.html

**消费方**：~22 个页面

**可精简（0 个）** — 仅有 2 个 img，但均被 JS 引用。

**需 JS 同步(§3)**

| 父级 class | 标签 | 现 class | JS 位置 | 建议 JS 改法 |
|---|---|---|---|---|
| `.slide-btns-wrapper` | `img` | `kefu-icon` | `common.js:890` `$('.kefu-icon')` | `$('.slide-btns-wrapper img:first-child')` |
| `.slide-btns-wrapper` | `img` | `scroll-to-top` | `common.js:887` `$('.scroll-to-top')` | `$('.slide-btns-wrapper img:last-child')` |

**疑似死类**

| class | CSS | 说明 |
|---|---|---|
| `kefu-icon` | 无 CSS 规则 | 纯 JS 事件绑定，样式可能来自父级或默认 img |
| `scroll-to-top` | 无 CSS 规则 | 同 kefu-icon |

---

## 5. header-search-mobile.html

**消费方**：~24 个页面（含 page-top-sticky-main）

**需 JS 同步(§3)** — 此类与 desktop header-search 共享 JS，大部分 class 被 JS 引用。

| 父级 class | 标签 | 现 class | JS 位置 | 备注 |
|---|---|---|---|---|
| `.header-search-mobile-box-label` | `label` | `header-search-mobile-box-label-text` | `common.js:125`(构造), `:698`(`.text()`) | 与 desktop 版同构 |
| `.header-search-mobile-box-label` | `img` | `header-search-mobile-box-label-icon` | `common.js:125`(构造) | 与 desktop 版同构 |
| `.header-search-mobile-box-input-box` | `input` | `header-search-mobile-box-input-box-input` | `common.js:699`(`.val()`) | 与 desktop 版同构 |
| `.header-search-mobile-box-input-box` | `img` | `header-search-mobile-box-input-box-icon` | — onclick 内联 | 但 CSS 有 compound（`page.less` / `index.less` / `faq.less`），可精简为 `.header-search-mobile-box-input-box > img:last-child` |

**可精简（1 个）**

| 父级 class | 标签 | 现 class | 建议选择器 | CSS 说明 |
|---|---|---|---|---|
| `.header-search-mobile-box-input-box` | `img` | `header-search-mobile-box-input-box-icon` | `.header-search-mobile-box-input-box > img:last-child` | 唯一 img，onclick 内联；CSS compound 分布在 `common.less:370`、`page.less`、`faq.less`、`index.less` |

**保留**
- `header-search-mobile-box-line` (div)
- `header-menu-container` / `header-menu-selector` / `header-menu-list` / `header-menu-item` (跨组件、JS 用)
- `title` (h2, 跨组件通用)

---

## 6. page-top-sticky-main.html

**消费方**：5 个 static auth 页面（signin-login, signin-join, signin-2fa, signin-reset-2fa, signin-reset-password）

**可精简：0 个**
此文件几乎全为 `@include`，直接 HTML 仅有 `<div class="page-head page-head-main">` 和 `<div class="page-top-bread"><div class="page-nav-box">`，无语义标签候选。

---

## 7. page-home-breadcrumb.html

**消费方**：~15 个页面（含 page-top-sticky-main）

**可精简（3 个）**

| 父级 class | 标签 | 现 class | 建议选择器 | CSS(+less) | 备注 |
|---|---|---|---|---|---|
| `.page-home-breadcrumb-icon-frame` | `img` | `page-home-breadcrumb-icon` | `.page-home-breadcrumb-icon-frame > img` | `page.less:300` / `page.css` | 唯一 img |
| `.page-home-breadcrumb-text` | `span` | `page-home-breadcrumb-seperator` | `.page-home-breadcrumb-text > span:first-child` | `page.less:315` / `page.css` | 唯一 span，可 :first-child |
| `.page-home-breadcrumb-text` | `span` | `page-home-breadcrumb-current` | `.page-home-breadcrumb-text > span:last-child` | `page.less:320` / `page.css` | 唯一 span，可 :last-child |

**保留**

| class | 原因 |
|---|---|
| `page-home-breadcrumb-icon-frame` | 容器 div |
| `page-home-breadcrumb-text` | 容器 p（p 虽为语义，但需要容器 class 本身） |
| `page-home-breadcrumb` | nav 容器 |

---

## 8. page-sort-dropdown.html

**消费方**：~13 个页面

**可精简（1 个）**

| 父级 class | 标签 | 现 class | 建议选择器 | CSS(+less) | 备注 |
|---|---|---|---|---|---|
| `.page-sort-box` | `img` | `page-sort-icon` | `.page-sort-box > img` | `common.less:3171` 等 | 唯一 img |

**需 JS 同步(§3)**

| 现 class | JS 位置 | 说明 |
|---|---|---|
| `page-sort-icon` | `filter.js:178,183,207,235` / `resourcepage.js:179,190` | 多个 `$.attr('data-value')` 读写。需同步改为 `.page-sort-box > img` |

Note：由于 `page-sort-icon` 既是 img 标签（可精简）又是 JS `attr('data-value')` 的承载，**必须先改 JS 再删 class**。归为「需 JS 同步」。

**保留**

| class | 原因 |
|---|---|
| `title` (div) | 跨组件通用，非语义 div |
| `sort-item` / `sort-item-all` / `sort-list` / `sort-selector` / `sort-container` / `sort-triangle` | 状态/变体/容器 |
| `page-sort-box` | 容器 |

---

## 9. page-pagination.html

**消费方**：~13 个页面

**可精简（2 个）**

| 父级 class | 标签 | 现 class | 建议选择器 | CSS(+less) | 备注 |
|---|---|---|---|---|---|
| `.quick-jumper` | `span` | `go-to-text` | `.quick-jumper > span:first-child` | `pagination.less:173` / `.css:152` | 唯一 span |
| `.selection-item` | `span` | `selection-text` | `.selection-item > span` | `pagination.less:145` / `.css:128` | 唯一 span |

**保留**

| class | 原因 |
|---|---|
| `total-text` (div) | 非语义 |
| `pagination-item` (button) | 状态（prev/next） |
| `pagination-numbers` / `pagination-measure` | 容器/JS 动态填充 |
| `icon` (div) | 非语义，通用 |
| `size-changer-option` (div) | 非语义 |
| `input-wrapper` (div) | 容器 |

---

## 10. detail-page-menu.html

**消费方**：7 个详情页面

**可精简：0 个**
HTML 仅有一个 `<button class="detail-page-menu">` 含一个无 class 的 `<img>`。button 本身非候选语义列表中的标签，img 无 class。

---

## 11. show-more-button.html

**消费方**：~17 个页面

**可精简（1 个）**

| 父级 class | 标签 | 现 class | 建议选择器 | 备注 |
|---|---|---|---|---|
| `.{{button_class}}`（动态） | `span` | `load-more-text` | 父级 > span | 但父级 class 为动态参数，无法静态确定。且 JS 多处引用。 |

**需 JS 同步(§3)**

| 现 class | JS 位置 | 说明 |
|---|---|---|
| `load-more-text` | `demandpage.js:26,40` / `items.js:34,48` / `blog.js:26,40` / `attributepage.js:113,120` / `pagelist.js:55` | `.show()` / `.hide()` / `querySelector('.load-more-text')` |

建议：保留 class 不做精简（涉及 JS 文件过多，且父级 class 为动态参数）。

---

## 12. list-empty-state.html

**消费方**：~13 个页面

**可精简（2 个）**

| 父级 class | 标签 | 现 class | 建议选择器 | CSS(+less) | 备注 |
|---|---|---|---|---|---|
| `.list-empty-state-inner` | `svg` | `list-empty-state-image` | `.list-empty-state-inner > svg` | `page.less:196` / `page.css:164` | 唯一 svg |
| `.list-empty-state-inner` | `p` | `list-empty-state-text` | `.list-empty-state-inner > p` | `page.less:202` / `page.css:169` | 唯一 p |

**保留**

| class | 原因 |
|---|---|
| `no-data-wrapper` / `list-empty-state` / `list-empty-state-inner` | 容器 |

---

## 13. auth-static-main.html

**消费方**：5 个 static auth 页面

**可精简：0 个**
仅包含 `<main>` 和 `<section>` 容器 + `@include`，无语义标签候选。

---

## 14. auth-static-init-script.html

**消费方**：5 个 static auth 页面

**纯脚本，无候选。**
仅 `<script>` 块操作 DOM（`.header-user-icon`、`.header-user-avatar-box`、`#header-signin` 等），这些 class/id 定义在 site-header.html 中，已在 §1 分析。

---

## 15. index-purchase-flow.html

**消费方**：仅 `src/pages/index.html`

**可精简（若干）** — 但需注意此文件仅被首页消费。

| 父级 class | 标签 | 现 class | 建议选择器 | CSS(+less) | 备注 |
|---|---|---|---|---|---|
| `.index-purchase-tags` | `span`(×N) | `index-purchase-tag` | `.index-purchase-tags > span` | 需查 | 多个 span 同级同标签，无法 :nth-child 区分 |
| `.index-purchase-row` | `strong`(×N) | `index-purchase-orange` / `index-purchase-green` | 不可 | 多个 strong 不同样式，class 区分变体 |
| `.index-purchase-row` | `del` | — | — | 无 class | — |
| `.index-purchase-stepper` | `input` | `index-purchase-qty` | `.index-purchase-stepper > input[type="text"]` | 需查 | 唯一 input |
| `.index-purchase-stepper` | `button`(×2) | `index-purchase-qty-btn` + `index-purchase-qty-minus/plus` | 不可 | 两个 button 需区分加减 |

结论：此文件中大部分 class 为区分状态或变体（`-orange`/`-green`、`-minus`/`-plus`），不宜精简。

**可能可精简：**

| 父级 class | 标签 | 现 class | 建议选择器 | 备注 |
|---|---|---|---|---|
| `.index-purchase-stepper` | `input` | `index-purchase-qty` | `.index-purchase-stepper > input[type="text"]` | 唯一 text input |
| `.index-purchase-image-modal` | `img` | `index-purchase-image-modal-img` | `.index-purchase-image-modal > img` | 唯一 img |
| `.index-purchase-image-modal` | `button` | `index-purchase-image-modal-close` | `.index-purchase-image-modal > button` | 唯一 button |

**需 JS 同步(§3)**

| class | 说明 |
|---|---|
| `index-purchase-qty` | 检查 JS 是否引用 quantity input。先搜索。 |

让我先搜索 JS 对 `index-purchase-qty` 的引用。

---

## 16. resource-detail-article-content.html

**消费方**：仅 `src/pages/resource-detail.html`

**可精简（2 个）**

| 父级 class | 标签 | 现 class | 建议选择器 | CSS(+less) | 备注 |
|---|---|---|---|---|---|
| `.section-content` | `p`(×N) | — | — | 已有 compound `.section-content p` | p 无单独 class |
| `.section-content` | `image` | `article-image` | `.section-content image`（或 `img`） | `service.less:352` | 唯一 image 元素 |
| `.helpful-section-wrapper` | `span` | `text` | 保留 | 跨组件通用 | text 类在 49 个文件出现 |

等等，`<image>` 不是标准 HTML5 标签（应为 `<img>`）。但 issue 不在此次讨论范围。

| 父级 class | 标签 | 现 class | 建议选择器 | CSS(+less) | 备注 |
|---|---|---|---|---|---|
| `.share-icons` | `img`(×3) | `share-icon` | 不可 | 3 个 img，各有额外变体 class（facebook/twitter/link） | 同类不同修饰，需保留 `share-icon` |
| `.post-detail-pager` `.resource-page-item` | `img` | `resource-image` | `.resource-page-item > img` | `resource.less:15` | 唯一 img 在 `.resource-page-item` 内 |
| `.resource-page-item` `.item-title-box` | `span` | `item-title` | 保留 | 跨组件通用（18 文件） | 跨组件通用 |

**确切可精简：**

| 父级 class | 标签 | 现 class | 建议选择器 | 备注 |
|---|---|---|---|---|
| `.post-detail-section` `.section-content` | `image`(实为 img) | `article-image` | `.section-content img` | 唯一 img 在 section 内 |
| `.resource-page-item` | `img` | `resource-image` | `.resource-page-item > img` | 唯一 img |
| `.helpful-section-wrapper` | `span` | `text` | `.helpful-section-wrapper > span` | 唯一 span |

**保留**

| class | 原因 |
|---|---|
| `section-title` (span) | 跨组件通用（8 文件） |
| `share-label` (span) | 同 share-icon 区域，唯一保留用作区隔 |
| `share-icon` | 多个 img 需额外变体 class |
| `reviews-title` / `other-pages-title` (span) | 变体 class |
| `resource-action-label` (span) | 多个 action group |
| `resource-action-icon` (img) | JS 引用（`resourcepage.js:121-131`），状态变体 |
| `item-title` (span) | 跨组件通用 |
| `fixed-text` (p) | 跨组件通用（2 文件） |

---

## 汇总统计

| 分类 | 数量 | 涉及文件 |
|---|---|---|
| **可精简**（无风险） | ~14 个 | site-header(5), site-footer(3), site-cookies-tips(1), page-home-breadcrumb(3), list-empty-state(2), resource-detail-article-content(2), page-pagination(2), index-purchase-flow(—) |
| **需 JS 同步(§3)** | ~12 个 | site-header(6), site-footer(1), site-slide-btns(2), header-search-mobile(4), page-sort-dropdown(1), show-more-button(1), site-cookies-tips(—) |
| **保留** | — | 各文件容器/状态/跨组件通用类 |
| **疑似死类** | 1 个 | `cookies-feature-label`（有 class 无 CSS 规则） |
| **纯脚本无候选** | 2 个 | `auth-static-init-script.html`、`auth-static-main.html` |
| **无候选** | 2 个 | `page-top-sticky-main.html`、`detail-page-menu.html` |

## 重点关注

1. **header-search-mobile 的 JS 情况**：此组件与 desktop `site-header` 的搜索框共享 JS 逻辑（`common.js` 中 HeaderMenu 构造函数传入了两套 selector）。所有 `header-search-mobile-box-label-text/icon` 和 `header-search-mobile-box-input-box-input` 均被 JS 引用（`common.js:125`, `:698`, `:699`），不可直接移除 class。只有 `header-search-mobile-box-input-box-icon`（img）未在 JS 中以 class 选择器出现（仅内联 onclick），可精简为父级 > img。

2. **疑似死类 `cookies-feature-label`**：3 个 `<label>` 上使用了 `cookies-feature-label` class，但 CSS 中没有任何规则引用此 class。样式可能来自 `<label>` 标签默认，或完全缺失（实际未生效）。建议核实后删除。

3. **`kefu-icon` / `scroll-to-top`**：无 CSS 规则，但被 jQuery 事件绑定引用。若移除 HTML class，JS 事件绑定会失效。建议保留 class 或同时改 JS。

4. **`page-sort-icon`**：既是 img 标签候选，又是 JS `$.attr('data-value')` 的存储载体。必须优先改写 JS（将 data-value 移到父级或改用 data 属性），再移除 class。

5. **`footer-item-title-icon`** 出现在 site-footer.html 的 `span` 上，`common.js:489` 通过 `querySelector('.footer-item-title-icon')` 读取。若精简需同步改 JS。
