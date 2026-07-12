# HTML 选择器精简计划 — brand/stats/top-level partials

> 只读分析，不修改任何 HTML/CSS/JS。
> 规则：语义标签 img/a/p/span/label/h1-h6/ul/ol/li 上，父级 class 唯一限定、纯样式、不被 JS 引用时，可移除内部 class 改用父级作用域选择器。

---

## 1. components/brand-all-item.html

**消费方：** brand-all-section-[a-g].html (8 处) → brand-all.html

**可精简表：**

| 父级 class | 标签 | 现 class | 建议选择器 | css(+less) | 备注 |
|---|---|---|---|---|---|
| `.brand-item-top-box-icon-wrapper` | img | `brand-item-top-box-icon` | `.brand-item-top-box-icon-wrapper img` | brand.less:172, brand.css:152 | 父级下唯一 img |
| `.brand-item-top-text-box` | h3 | `brand-item-top-text-box-title` | `.brand-item-top-text-box h3` | brand.less:191,203, brand.css:169,180 | 父级下唯一 h3；子选择器 `h3 a` 也需同步 |
| `.brand-item-top-text-box` | p | `brand-item-top-text-box-desc` | `.brand-item-top-text-box p` | brand.less:207, brand.css:183 | 父级下唯一 p |
| `.brand-item-middle-box` | p (x3) | `brand-item-middle-box-text` | `.brand-item-middle-box p` | brand.less:232, brand.css:206 | 3 个 p 样式相同，选择器等价 |
| `.brand-item-bottom-box-item` | img (x5) | `brand-item-bottom-box-item-icon` | `.brand-item-bottom-box-item img` | brand.less:266, brand.css:236 | 每个 item 下唯一 img |
| `.brand-item-bottom-box-item` | p (x5) | `brand-item-bottom-box-item-text` | `.brand-item-bottom-box-item p` | brand.less:271, brand.css:240 | 每个 item 下唯一 p |

**需 JS 同步：** 无（仅根 class `brand-item` 被 js/index.js:28 引用，非内部 class）

**保留：** `brand-item-top-box`、`brand-item-top-box-icon-wrapper`、`brand-item-top-text-box`、`brand-item-middle-box`、`brand-item-middle-box-line`、`brand-item-bottom-box`、`brand-item-bottom-box-item` — 均为 div 容器或有多子元素需区分

**疑似死类：** 无

---

## 2. components/brand-faq-item.html

**消费方：** components/brand-faq-section.html → brand.html；faq-list.html

**可精简表：**

| 父级 class | 标签 | 现 class | 建议选择器 | css(+less) | 备注 |
|---|---|---|---|---|---|
| `.faq-header-icon-box` | img | `faq-header-icon` | `.faq-header-icon-box img` | faq.less:121,128; detail/brand.less:989 | 父级下唯一 img |
| `.faq-header-middle-box` | span | `faq-header-title-tag` | `.faq-header-middle-box span` | faq.less:154,168; detail/brand.less:1000 | 父级下唯一 span |
| `.faq-content .view-more-wrapper` | a | `view-more-btn` | `.faq-content .view-more-wrapper a` | faq.less:210; detail/brand.less:51; item-detail.less:1230 | wrapper 下唯一 a；注意 index.less 有同名不同作用域规则，不受影响 |
| `.faq-action-save` | img (x2) | `faq-action-icon` | `.faq-action-save img` | faq.less:319 | 2 张 img。default/active 切换依赖 img 顺序：`img:first-child` / `img:last-child` |
| `.faq-action-save` | span | `faq-action-count` | `.faq-action-save span` | faq.less:311 | 父级下唯一 span |

**需 JS 同步：** 1 处

| class | 文件:行 | 建议 JS 改法 |
|---|---|---|
| `faq-header-arrow-icon` | brand.js:50 (`$item.find('.faq-header-arrow-icon').toggleClass('open')`), brand.js:54 (`$('.faq-header-arrow-icon').on('click', ...)`) | 改为 `$item.find('.faq-header > img:last-child')` 和 `$('.faq-header > img:last-child').on(...)`。同时 CSS 中 `.faq-header-arrow-icon.open` 需改为 `.faq-header > img:last-child.open` |

**保留：** `faq-header-icon-box`、`faq-header-middle-box`、`faq-content`、`view-more-wrapper`、`faq-action-save`、`faq-action-group` — 均为容器或 JS 作用域

**疑似死类：** 无

---

## 3. components/brand-faq-section.html

**消费方：** brand.html

**可精简表：**

| 父级 class | 标签 | 现 class | 建议选择器 | css(+less) | 备注 |
|---|---|---|---|---|---|
| `.brand-section-title-wrapper .view-more-wrapper` | img | `view-more-arrow` | `.brand-section-title-wrapper .view-more-wrapper img` | detail/brand.less:27,1013 | wrapper 下唯一 img |

**需 JS 同步：** 无

**保留：** 无

**疑似死类：** 无

> 注意：`.view-more-arrow` 的 CSS 仅存在于 `detail/brand.less`，不在 `faq.less`/`brand.less`/`common.less` 中。

---

## 4. components/brand-hot-demands-section.html

**消费方：** brand.html

**可精简表：** 同 §3，`view-more-arrow` 结构与 brand-faq-section 相同。

**需 JS 同步：** 无

**保留：** 无

**疑似死类：** 无

---

## 5. components/brand-hot-items-section.html

**消费方：** brand.html

**可精简表：** 同 §3，`view-more-arrow` 结构相同。

**需 JS 同步：** 无

**保留：** 无

**疑似死类：** 无

---

## 6. components/brand-hot-posts-section.html

**消费方：** brand.html

**可精简表：** 同 §3，`view-more-arrow` 结构相同。

**需 JS 同步：** 无

**保留：** 无

**疑似死类：** 无

---

## 7. components/statistics-period-header.html

**消费方：** store-detail.html、item-detail.html

**可精简表：** 无

| 父级 class | 标签 | 现 class | 结论 |
|---|---|---|---|
| `.title-section` | span | `section-title` | **保留** — 全局跨文件复用（item-statistics.less:307），非当前组件独有 |
| `.tabs-container` | span | `tab-text` | **需 JS 同步** — item-detail.js:402、store-detail.js:199 通过 `tab.querySelector('.tab-text')` 引用 |

**需 JS 同步：**

| class | 文件:行 | 建议 |
|---|---|---|
| `tab-text` | js/detail/item-detail.js:402, js/detail/store-detail.js:199 | JS 用 `querySelector('.tab-text')` 取文本值。若移除 class，需改为 `querySelector('span')` 或 data 属性。风险低但涉及两处 JS |

**保留：** `section-title` — 全局复用类

**疑似死类：** 无

---

## 8. components/statistics-bar-panel.html

**消费方：** 仅被 statistics-rating-chart-panel.html `@include` 间接使用；页面直接使用 rating-chart-panel

**可精简表：**

| 父级 class | 标签 | 现 class | 建议选择器 | css(+less) | 备注 |
|---|---|---|---|---|---|
| `.statistics-frame` | h2 | `main-title` | `.statistics-frame h2` | item-statistics.less:21, css:19 | frame 下唯一 h2 |
| `.statistics-num-item` | span (x4) | `statistics-num-text` | `.statistics-num-item span:first-child` | item-statistics.less:59, css:51 | 顺序依赖 |
| `.statistics-num-item` | span (x4) | `statistics-num` | `.statistics-num-item span:nth-child(2)` | item-statistics.less:67, css:58 | 顺序依赖 |
| `.statistics-num-item` | span (x4) | `statistics-num-count` | `.statistics-num-item span:nth-child(3)` | item-statistics.less:75, css:65 | 有 `:empty` 伪类需迁移 |

**需 JS 同步：** 无

**保留（因全局复用/JS 引用）：**

| class | 原因 |
|---|---|
| `item-star-score` | common.less:3535 全局复用；js/common.js:86 用 querySelector 引用；多个 JS 模板字符串中使用 |
| `item-star-recommend` | 同上，JS 模板字符串多处使用 |

**疑似死类：** 无

---

## 9. components/statistics-rating-chart-panel.html

**消费方：** store-detail.html、item-detail.html

**可精简表：** 与 §8 (statistics-bar-panel) 完全一致，因为继承相同的 DOM 结构。

**需 JS 同步：** 无

**保留：** 同 §8

**疑似死类：** 无

---

## 10. components/resource-all-item.html

**消费方：** resource-all.html

**可精简表：**

| 父级 class | 标签 | 现 class | 建议选择器 | css(+less) | 备注 |
|---|---|---|---|---|---|
| `.resource-header` | a | `resource-title` | `.resource-header a` | resource.less:67, css:55 | header 下唯一 a |
| `.resource-header` | span | `resource-date` | `.resource-header span` | resource.less:80, css:67 | header 下唯一 span |
| `.resource-body` | span | `resource-content` | `.resource-body span` | resource.less:102, css:87 | body 下唯一 span（第一个子元素） |
| `.resource-action-group` | span (x4) | `resource-action-count` | `.resource-action-group span` | resource.less:148, css:124 | 每组唯一 span |

**需 JS 同步：** 无（JS 仅在模板字符串中拼 class，未用 querySelector 查）

**部分可精简：** `resource-action-icon` (img) — 有 `.resource-action-icon-default` / `.resource-action-icon-active` 子类用于状态切换（`has-activate` toggle），需保留子类名。

**保留：** 无

**疑似死类：** 无

---

## 11. components/resource-detail-other-page-item.html

**消费方：** 无（未被任何页面/partial include）

**可精简表：** 如果未来启用，可精简：

| 父级 class | 标签 | 现 class | 建议选择器 | css(+less) |
|---|---|---|---|---|
| `.resource-page-item` | img | `resource-image` | `.resource-page-item img` | detail/resource.less:15, css:14 |
| `.resource-page-item .item-title-box` | span | `item-title` | `.resource-page-item .item-title-box span` | detail/resource.less:52 (媒体查询) |
| `.resource-page-item .summary-section` | p | `fixed-text` | `.summary-section p` | detail/resource.less:27, css:24 |

**需 JS 同步：** 无

**疑似死类：** 整个组件未被引用，可考虑归档删除。

---

## 12. components/tag-all-mobile-horizontal-item.html

**消费方：** 无（仅被 docs 分析文档引用，未被任何页面 include）

**可精简表：** 如果未来启用，可精简：

| 父级 class | 标签 | 现 class | 建议选择器 | css(+less) |
|---|---|---|---|---|
| `.tag-mobile-horizontal-item-media` | img | `tag-mobile-horizontal-item-cover` | `.tag-mobile-horizontal-item-media img` | tag-all.less:366, css:278 |
| `.tag-mobile-horizontal-item-top` | a | `tag-mobile-horizontal-item-title` | `.tag-mobile-horizontal-item-top a` | tag-all.less:405, css:313 |
| `.tag-mobile-horizontal-item-top` | img | `tag-mobile-horizontal-item-like` | `.tag-mobile-horizontal-item-top img` | tag-all.less:419, css:326 |
| `.tag-mobile-horizontal-item-rating` | img | `tag-mobile-horizontal-item-star` | `.tag-mobile-horizontal-item-rating img` | tag-all.less:435, css:340 |
| `.tag-mobile-horizontal-item-rating` | span (最后一个) | `tag-mobile-horizontal-item-brand` | `.tag-mobile-horizontal-item-rating span:last-child` | tag-all.less:458, css:360 |
| `.tag-mobile-horizontal-item-meta` | span (第一个) | `tag-mobile-horizontal-item-service` | `.tag-mobile-horizontal-item-meta span:first-child` | tag-all.less:474, css:374 |

**部分可精简（顺序依赖）：**

| 父级 class | 标签 | 现 class | 建议选择器 |
|---|---|---|---|
| `.tag-mobile-horizontal-item-rating` | span (第 1 个) | `tag-mobile-horizontal-item-score` | `:first-of-type` |
| `.tag-mobile-horizontal-item-rating` | span (第 3 个) | `tag-mobile-horizontal-item-verified` | `:nth-child(4)` 脆弱 |

**需 JS 同步：** 无

**疑似死类（无 CSS 规则、无 JS 引用，可安全删除）：**

| class | 说明 |
|---|---|
| `tag-mobile-horizontal-item-recommend` | 无任何 CSS 规则，无 JS 引用 |
| `tag-mobile-horizontal-item-price` | 无任何 CSS 规则，无 JS 引用 |
| `tag-mobile-horizontal-item-stock` | 无任何 CSS 规则，无 JS 引用 |

---

## 13. src/partials/signin-modal.html

**消费方：** 26 个页面（index, brand-all, brand, search-all, item-all/detail, store-all/detail, post-all/detail, resource-all/detail, demand-all/detail, tag-all, attribute-all, faq-detail, compaign-all/detail, service, blog 等）+ auth-static-main.html

**可精简表（高可行性 — 父级下标签唯一）：**

| 父级 class | 标签 | 现 class | 建议选择器 | css(+less) |
|---|---|---|---|---|
| `.signin-close` | img | `signin-close-icon` | `.signin-close img` | signin.less:38,328,1452 |
| `.signin-back` | img | `signin-back-icon` | `.signin-back img` | signin.less:51,329,1461 |
| `.login-google-box` | img | `login-google-icon` | `.login-google-box img` | signin.less:249 |
| `.login-google-box` | p | `login-google` | `.login-google-box p` | signin.less:254 |
| `.login-apple-box` | img | `login-apple-icon` | `.login-apple-box img` | signin.less:275 |
| `.login-apple-box` | p | `login-apple` | `.login-apple-box p` | signin.less:280 |
| `.signin-otherway-box` | p (前) | `signin-otherway-text` | `.signin-otherway-box p:first-child` | signin.less:295,541,768,1048 |
| `.signin-otherway-box` | p (后) | `signin-otherway` | `.signin-otherway-box p:last-child` | signin.less:303,548,776,1055 |
| `.signin-line-box` | p | `signin-line-text` | `.signin-line-box p` | signin.less:227,476,696,854,1556 |
| `.agree-wrapper` | label | `agree-label` | `.agree-wrapper label` | signin.less:1016,1024,1029,1084 |
| `.remember-wrapper` | label | `remember-label` | `.remember-wrapper label` | signin.less:163,436,1343 |
| `.signin-login-form-tool-box` | p | `signin-login-form-resetpwd` | `.signin-login-form-tool-box p` | signin.less:188,445,662 |
| `.signin-from-2fa-item` | p | `signin-form-time` | `.signin-from-2fa-item p` | signin.less:644,1251,1288 |
| `.signin-from-2fa-item` | button | `signin-form-code-send` | `.signin-from-2fa-item button` | signin.less:1264,1280,1284 |

**需 JS 同步（§3 — 纯样式但被 JS 用 querySelector 引用）：**

| class | js 文件:行 | 建议 JS 改法 |
|---|---|---|
| `signin-password-toggle` | login.js:24 | `field.querySelector('button')` 或父级作用域 |
| `signin-form-code-send` | login.js:49,89 | `field.querySelector('button')` — 与 timeText 同容器 |
| `signin-form-time` | login.js:50,90,394 | `.signin-from-2fa-item p` 或 `field.querySelector('p')` |
| `signin-login-form-resetpwd` | login.js:318 | `document.querySelector('#signin-login .signin-login-form-tool-box p')` |
| `signin-form-title` | login.js:345 | `regist.querySelectorAll('form p')` — 但表单有多个 p，需更精确 |
| `signin-line-text` | login.js:367,404 | `querySelector('.signin-line-box p')` |
| `signin-otherway-text` | login.js:371 | `querySelector('.signin-otherway-box p:first-child')` |
| `signin-form-tip` | login.js:389 | `reset2fa.querySelector('form p:first-child')` |
| `signin-form-button` | login.js:399 | `reset2fa.querySelector('form button[type="submit"]')` |

> **注意：** signin-modal 涉及 login.js 大量 querySelector，修改需同步更新 JS。优先选 `> tag` 或 `[type]` 这类不依赖 class 的选择器。

**保留：** 以下场景下的 `signin-form-title` 和 `signin-form-error-tip`：同一表单内有多个相同标签（多个 p），无法通过标签选择器精确区分。

**疑似死类：** 无

---

## 14. src/partials/index-best-items-section.html

**消费方：** index.html

**可精简表：**

| 父级 class | 标签 | 现 class | 建议选择器 | css(+less) | 备注 |
|---|---|---|---|---|---|
| `.pager-wrapper` | h2 | `pager-wrapper-title` | `.pager-wrapper h2` | index.less:905,1385+ | pager-wrapper 下唯一 h2；多 breakpoint 覆盖需同步 |
| `.pager-subtitle-box` | h3 | `pager-subtitle` | `.pager-subtitle-box h3` | index.less:923,933,1396+ | pager-subtitle-box 下唯一 h3 |
| `.pager-more-box` | span | `pager-more` | `.pager-more-box span` | **无直接规则**（实际由 `.pager-more-box span` 子选择器样式化） | class 在 CSS 中无独立规则，可直接删除 |
| `.pager-more-box` | img | `pager-more-icon` | `.pager-more-box img` | index.less:1419, css:1204 | pager-more-box 下唯一 img |

**需 JS 同步：** 无

**保留：** 无

**疑似死类：** 无

> 注意：`.pager-wrapper-title` 和 `.pager-subtitle` 在 index.less 中被多个 section 复用（best-items、best-stores、hot-campaigns 等），建议选择器需覆盖所有使用场景。

---

## 15. src/partials/index-comment-item-main.html / index-comment-item-alt.html / index-comment-item-third.html

**消费方：** index.html

**可精简表（三个变体共享一致结构）：**

| 父级 class | 标签 | 现 class | 建议选择器 | css(+less) |
|---|---|---|---|---|
| `.comment-item-user-box` | img | `comment-item-user-avatar` | `.comment-item-user-box img` | comment.less:24,39; index.less:1779,2290 |
| `.comment-item-user-name-box` | p (前) | `comment-item-user-name` | `.comment-item-user-name-box p:first-child` | comment.less:51; index.less 媒体查询 |
| `.comment-item-user-name-box` | p (后) | `comment-item-user-time` | `.comment-item-user-name-box p:last-child` | comment.less:62 |
| `.comment-item-desc-box` | p | `comment-item-desc` | `.comment-item-desc-box p` | comment.less:80; index.less:1814 |
| `p.comment-item-desc` | span | `comment-item-desc-more` | `p.comment-item-desc span` | index.less:1814, css:1523（仅 main 有） |

**需 JS 同步：** 无

**保留（全局复用）：**

| class | 原因 |
|---|---|
| `item-tag` | 跨 7+ JS 文件模板字符串；js/index.js:104 事件委托；多个 CSS 文件 |
| `item-tag-text` | 跨 7+ JS 文件模板字符串；多个 CSS 文件 |

**疑似死类：** 无

---

## 16. src/partials/brand-all-section-[a-g].html

**消费方：** brand-all.html

**可精简表：**

| 父级 class | 标签 | 现 class | 建议选择器 | css(+less) |
|---|---|---|---|---|
| `.brand-page-list` | p | `brand-page-list-text` | `.brand-page-list p` | brand.less:82,350; second-page.less:51,74 |

**需 JS 同步：** 无

**保留：** 无

**疑似死类：** 无

> 7 个 section（A-G）结构完全一致，修改一处即全部生效。

---

## 汇总

| partial 文件 | 消费方 | 可精简 | 需JS同步 | 保留 | 疑似死类 | 备注 |
|---|---|---|---|---|---|---|
| brand-all-item.html | brand-all.html | 6 | 0 | 0 | 0 | 根 class brand-item 被 JS 引用，但内部 class 安全 |
| brand-faq-item.html | brand.html, faq-list.html | 5 | 1 | 0 | 0 | faq-header-arrow-icon 需 JS 同步 |
| brand-faq-section.html | brand.html | 1 | 0 | 0 | 0 | view-more-arrow 同下 |
| brand-hot-demands-section.html | brand.html | 1 | 0 | 0 | 0 | view-more-arrow 共享 |
| brand-hot-items-section.html | brand.html | 1 | 0 | 0 | 0 | view-more-arrow 共享 |
| brand-hot-posts-section.html | brand.html | 1 | 0 | 0 | 0 | view-more-arrow 共享 |
| statistics-period-header.html | store-detail, item-detail | 0 | 1 | 1 | 0 | tab-text JS 引用; section-title 全局 |
| statistics-bar-panel.html | (被 rating-chart 继承) | 1+3(顺序) | 0 | 2 | 0 | item-star-score/recommend 全局+JS |
| statistics-rating-chart-panel.html | store-detail, item-detail | 1+3(顺序) | 0 | 2 | 0 | 同 bar-panel |
| resource-all-item.html | resource-all.html | 4 | 0 | 0 | 0 | resource-action-icon 子类保留 |
| resource-detail-other-page-item.html | **无** | (3) | 0 | 0 | 1 (整个组件) | 未被引用，可归档 |
| tag-all-mobile-horizontal-item.html | **无** | (6+2顺序) | 0 | 0 | **3 疑似死类**+整个组件未被引用 | recommend/price/stock 无 CSS 规则 |
| signin-modal.html | 26 页面 | 14 | 9 | 2 | 0 | login.js 大量 querySelector 需同步 |
| index-best-items-section.html | index.html | 4 | 0 | 0 | 0 | pager-more 无独立 CSS 规则 |
| index-comment-item-main/alt/third.html | index.html | 5 | 0 | 2 | 0 | item-tag/item-tag-text 全局复用 |
| brand-all-section-[a-g].html | brand-all.html | 1 | 0 | 0 | 0 | 7 处相同结构 |

**关键注意点：**

1. **signin-modal 是最大工作量模块：** 14 个可精简 + 9 个需 JS 同步。login.js 中的 querySelector 调用较多，建议与 CSS 修改同步执行，逐一验证。
2. **疑似死类 3 个：** `tag-mobile-horizontal-item-recommend`、`tag-mobile-horizontal-item-price`、`tag-mobile-horizontal-item-stock` — 无 CSS 规则、无 JS 引用，可直接删除。
3. **未引用组件 2 个：** `resource-detail-other-page-item.html`、`tag-all-mobile-horizontal-item.html` — 未被任何页面 include，所有修改仅影响源码，无运行期影响。
4. **view-more-arrow 跨 4 个组件共享：** brand-faq-section、brand-hot-demands-section、brand-hot-items-section、brand-hot-posts-section — 结构相同，可批量修改。
5. `.section-title`（statistics-period-header）和 `.item-star-score` / `.item-star-recommend`（statistics panels）是**全局复用类**，不应改动。
