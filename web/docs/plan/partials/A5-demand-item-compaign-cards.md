# HTML 选择器精简分析：demand / item / compaign / post / blog / rating 组件

> 分析日期：2026-07-11
> 分析方式：只读分析，未修改任何文件
> 原则：当某节点只为样式而加 class、且父级 class 能唯一限定它时，可移除该内部 class，改用父级作用域选择器

---

## 1. demand-all-figma-item.html

**消费方**: demand-all-figma-items.html（间接被 demand-all.html 消费）

**说明**: 纯 `@include` 包装器，无自有 HTML 元素。全部通过参数传递给 demand-shared-item.html。无可精简目标。

---

## 2. demand-all-figma-items.html

**消费方**: src/pages/demand-all.html

**说明**: 纯 `@include` 包装器（3 次 `demand-all-figma-item.html`）。无可精简目标。

---

## 3. demand-all-horizontal-mobile-item.html

**消费方**: src/pages/demand-all.html, src/pages/attribute-all.html, src/partials/search-all-demand-item.html, demand-all-figma-item.html

### 可精简表

| 父级 class | 标签 | 现 class | 建议选择器 | CSS(+less) | 备注 |
|---|---|---|---|---|---|
| `.demand-all-horizontal-mobile-brand` | `span` | `demand-all-horizontal-mobile-brand-text` | `.demand-all-horizontal-mobile-brand > span` | demand.less:711 | parent 内唯一 span |
| `.demand-all-horizontal-mobile-service` | `span` | `demand-all-horizontal-mobile-service-text` | `.demand-all-horizontal-mobile-service > span` | demand.less:712 | parent 内唯一 span |
| `.demand-all-horizontal-mobile-date` | `span` | `demand-all-horizontal-mobile-date-text` | `.demand-all-horizontal-mobile-date > span` | demand.less:714 | parent 内唯一 span |
| `.demand-all-horizontal-mobile-bidder` | `span` | `demand-all-horizontal-mobile-bidder-icon` | `.demand-all-horizontal-mobile-bidder > span` | demand.less:791 | 唯一 span（有 ::before/::after） |
| `.demand-all-horizontal-mobile-card` | `a` | `demand-all-horizontal-mobile-title` | `.demand-all-horizontal-mobile-card > a` | demand.less:672 | card 内唯一 a |
| `.demand-all-horizontal-mobile-avatar-group` | `span` | `demand-all-horizontal-mobile-avatar-more` | `.demand-all-horizontal-mobile-avatar-group > span` | demand.less:831 | avatar-group 内唯一 span（混在多个 img 中） |

### 保留

| class | 原因 |
|---|---|
| `demand-all-horizontal-mobile-icon` (img) | 3 个父级共用同一样式，去掉 class 需在 3 处重复 CSS |
| `demand-all-horizontal-mobile-stat-label` / `demand-all-horizontal-mobile-stat-value` (span) | 每个 `.stat` 内有 2 个 span，需 `:nth-child` 区分，可读性下降 |
| `demand-all-horizontal-mobile-stat` (p) | 容器 div，无语义标签可替换 |
| `demand-all-horizontal-mobile-chip` (div) | 容器，且横竖版本共享样式 |
| `demand-all-horizontal-mobile-avatar` (img) | 多个 img，无法唯一选择 |
| `demand-all-horizontal-mobile-tags-more` (span) | 有独立 CSS 且语义上表示"更多" |
| `demand-all-horizontal-mobile-avatar-group` (div) | 容器 |
| `demand-all-horizontal-mobile-button` (button) | 有 disabled 状态变体 |
| `demand-all-horizontal-mobile-like` (img) | 来自 item-like-button include，动态类 |
| `item-tag` / `item-tag-text` | 跨组件共享 |

### 小计：6 个可精简

---

## 4. demand-all-vertical-mobile-item.html

**消费方**: 同上（与水平版平行展示）

结构与水平版完全一致，仅前缀 `horizontal` → `vertical`。同一套分析结论。

### 可精简表（对应项）

| 父级 class | 标签 | 现 class | 建议选择器 | CSS(+less) |
|---|---|---|---|---|
| `.demand-all-vertical-mobile-brand` | `span` | `demand-all-vertical-mobile-brand-text` | `.demand-all-vertical-mobile-brand > span` |
| `.demand-all-vertical-mobile-service` | `span` | `demand-all-vertical-mobile-service-text` | `.demand-all-vertical-mobile-service > span` |
| `.demand-all-vertical-mobile-date` | `span` | `demand-all-vertical-mobile-date-text` | `.demand-all-vertical-mobile-date > span` |
| `.demand-all-vertical-mobile-bidder` | `span` | `demand-all-vertical-mobile-bidder-icon` | `.demand-all-vertical-mobile-bidder > span` |
| `.demand-all-vertical-mobile-card` | `a` | `demand-all-vertical-mobile-title` | `.demand-all-vertical-mobile-card > a` |
| `.demand-all-vertical-mobile-avatar-group` | `span` | `demand-all-vertical-mobile-avatar-more` | `.demand-all-vertical-mobile-avatar-group > span` |

### 小计：6 个可精简（与水平版平行）

---

## 5. demand-shared-item.html

**消费方**: demand-all-figma-item.html, index-popular-demand-item-*-liked.html 等

**说明**: 参数化共享模板。大多数 class 通过模板变量接收（`{{title_class}}`、`{{content_class}}` 等），必须保留 class 属性以接收变量。硬编码的 `demand-item-*` 类为组件结构标识，`item-*` 共享类跨组件复用。

### 可精简

无。全部为模板参数或跨组件共享类。

### 保留原因摘要

| class | 原因 |
|---|---|
| `demand-item` | 根容器，且有 `{{root_class}}` 参数 |
| `demand-item-content` | 结构标识 |
| `item-brand-text` / `item-brand` / `item-service-text` / `item-service` | 跨 5+ 组件共享 |
| `item-title-box` / `item-title` | 跨 5+ 组件共享 |
| `item-tag-box` | 跨组件共享 |
| `demand-item-row-box` / `demand-item-coloumn-box` | 结构 | 
| `demand-item-bidder-text` | 有 `{{bidder_text_class}}` 参数 |

### 小计：0 个可精简

---

## 6. demand-detail-bidding-item.html

**消费方**: src/pages/demand-detail.html

### 可精简表

| 父级 class | 标签 | 现 class | 建议选择器 | CSS(+less) | 备注 |
|---|---|---|---|---|---|
| `.user-section` | `img` | `demand-detail-item-user-avatar` | `.user-section > img` | demand-detail-item.less:1 | user-section 内唯一 img |
| `.user-header` | `h2` | `demand-detail-item-user-name` | `.user-header > h2` | demand-detail-item.less:12 | user-header 内唯一 h2 |
| `.demand-detail-bidding-content` | `p` | `demand-detail-item-field-info` | `.demand-detail-bidding-content > p` | demand-detail-item.less:31 | content 内唯一直接 p |

### 保留

| class | 原因 |
|---|---|
| `demand-card` / `demand-detail-bidding-card` / `demand-detail-bidding-content` | 根/容器 |
| `user-section` / `user-header` / `user-icon-box` / `user-info` | 容器 div |
| `item-mark` | 跨组件共享 + 有 JS(querySelector) |
| `level-badge` / `level-badge1-6` | 状态变体 |
| `demand-detail-item-user-info` / `demand-detail-item-user-stats` | 容器 |
| `demand-detail-item-stat` / `demand-detail-item-stat-time` | 容器 + 有 modifier |
| `item-service-box` / `item-service-text` / `item-service-icon` / `item-service` | 跨组件共享 |
| `brand-tag-box` / `item-tag` / `item-tag-text` | 跨组件共享 |
| `other-info` / `other-label` / `other-text` | 容器/嵌套文本 |
| `bidding-text` / `bidding-box` | 容器 + content 内多个 span 不唯一 |
| `item-service.demand-desc` | item-service 共享 + demand-desc 语义后缀 |
| `demand-edit-box` / `demand-edit-box1` | 容器 + modifier |
| `status-badge` / `status-badge1` | 容器 + modifier |
| `card-content` | 容器 |

### 小计：3 个可精简

---

## 7. demand-detail-tabs-top.html

**消费方**: src/pages/demand-detail.html

### 可精简表

| 父级 class | 标签 | 现 class | 建议选择器 | CSS(+less) | 备注 |
|---|---|---|---|---|---|
| `.detail-tabs-top-title` | `span` | `detail-tabs-top-text` | `.detail-tabs-top-title > span` | demand-detail.less:426 | title 内唯一 span |

### 保留

| class | 原因 |
|---|---|
| `detail-tabs-top` | 根容器 + `{{extra_class}}` 参数 |
| `detail-tabs-top-title` | 容器 div |

### 小计：1 个可精简

---

## 8. item-all-horizontal-item.html

**消费方**: src/pages/item-all.html, src/pages/index.html, src/pages/attribute-all.html 等

### 可精简表

| 父级 class | 标签 | 现 class | 建议选择器 | CSS(+less) | 备注 |
|---|---|---|---|---|---|
| `.item-all-horizontal-item` | `img` | `item-all-horizontal-item-cover` | `.item-all-horizontal-item > img` | item-all.less:99 | root 内唯一直接 img |
| `.item-all-horizontal-item-actions` | `button` | `item-all-horizontal-buy-btn` | `.item-all-horizontal-item-actions > button` | item-all.less:159 | actions 内唯一 button |

### 保留

| class | 原因 |
|---|---|
| `item-all-horizontal-item` | 根容器 |
| `item-mark` | 跨组件共享 |
| `item-title-box` / `item-title` | 跨组件共享 |
| `item-brand-box` / `item-brand-text` / `item-brand` | 跨组件共享 |
| `item-service-box` / `item-service-text` / `item-service` | 跨组件共享 |
| `item-price-box` / `item-price-text` / `item-price` | 跨组件共享 |
| `item-stock-box` / `item-stock-text` / `item-stock` | 跨组件共享 |
| `item-tag-box` | 跨组件共享 |
| `item-all-horizontal-item-like` | like 按钮 modifier |
| `item-all-horizontal-price-box` / `item-all-horizontal-stock-box` / `item-all-horizontal-item-tags` | 组件 modifier |

### 小计：2 个可精简

---

## 9. item-all-horizontal-mobile-item.html

**消费方**: src/pages/item-all.html, src/pages/index.html, 多处 partial search/list 变体

### 可精简表

| 父级 class | 标签 | 现 class | 建议选择器 | CSS(+less) | 备注 |
|---|---|---|---|---|---|
| `.item-all-horizontal-mobile-media` | `img` | `item-all-horizontal-mobile-cover` | `.item-all-horizontal-mobile-media > img` | item-all.less:378 | media 内唯一 img |
| `.item-all-horizontal-mobile-main` | `a` | `item-all-horizontal-mobile-title` | `.item-all-horizontal-mobile-main > a` | item-all.less:409 | main 内唯一 a |
| `.item-all-horizontal-mobile-brand` | `span` | `item-all-horizontal-mobile-brand-text` | `.item-all-horizontal-mobile-brand > span` | item-all.less:447 | brand 内唯一 span |
| `.item-all-horizontal-mobile-service` | `span` | `item-all-horizontal-mobile-service-text` | `.item-all-horizontal-mobile-service > span` | item-all.less:448 | service 内唯一 span |
| `.item-all-horizontal-mobile-meta` | `span` | `item-all-horizontal-mobile-price` | `.item-all-horizontal-mobile-meta > span` | item-all.less:450 | meta 内唯一直接 span（注意：rating mobile include 也加 span，需验证 DOM 顺序） |
| `.item-all-horizontal-mobile-stock` | `span` | `item-all-horizontal-mobile-stock-text` | `.item-all-horizontal-mobile-stock > span` | item-all.less:449 | stock 内唯一 span |
| `.item-all-horizontal-mobile-main` | `button` | `item-all-horizontal-mobile-buy-btn` | `.item-all-horizontal-mobile-main > button` | item-all.less:478 | main 内唯一 button |

### 保留

| class | 原因 |
|---|---|
| `item-all-horizontal-mobile-item` / `card` / `media` / `main` / `meta` / `brand` / `service` / `stock` | 容器/结构 div |
| `item-mark` | 跨组件共享 |
| `item-all-horizontal-mobile-mark` | modifier |
| `item-all-horizontal-mobile-meta-icon` (img) | 3 处复用，共享样式 |
| `item-all-horizontal-mobile-like` | like modifier |

### 注意：`.item-all-horizontal-mobile-price` 在 meta 内的唯一性

`item-all-horizontal-mobile-meta` 的内容：
1. `@include rating-with-count-mobile` → 产生 `div.item-star-box-mobile`
2. `div.item-all-horizontal-mobile-brand`
3. `div.item-all-horizontal-mobile-service`
4. `span.item-all-horizontal-mobile-price`
5. `div.item-all-horizontal-mobile-stock`

meta > span 只有一个（price），所以 `.item-all-horizontal-mobile-meta > span` 是安全的。但需确认 rating-with-count-mobile 的 `div.item-star-box-mobile` 内没有 span（它内部有 `img` + `p` + `p`，没有 span），所以安全。

### 小计：7 个可精简

---

## 10. item-all-horizontal-item-responsive.html

**消费方**: src/pages/item-all.html（响应式容器）

**说明**: 仅包含 desktop 和 mobile 两个 `@include`。无自有 HTML 元素。

### 小计：0 个可精简

---

## 11. item-card-vertical.html

**消费方**: src/pages/index.html（best-items-section）, src/pages/store-detail.html, brand-hot-item-card.html（包装）

### 可精简表

| 父级 class | 标签 | 现 class | 建议选择器 | CSS(+less) | 备注 |
|---|---|---|---|---|---|
| `.best-items-item` | `img` | `best-items-item-icon` | `.best-items-item > img` | items.less:99 | root 内唯一直接 img（like-button 的 img 在 root 同级） |
| `.item-stock-box` | `img` | `item-stock-icon` | `.item-stock-box > img` | common.less:3839 | stock-box 内唯一 img |
| `.item-brand-box` | `img` | `item-brand-icon` | `.item-brand-box > img` | common.less:3728 | brand-box 内唯一 img |
| `.item-service-box` | `img` | `item-service-icon` | `.item-service-box > img` | common.less:3729 | service-box 内唯一 img |

### 保留

| class | 原因 |
|---|---|
| `best-items-item` / `figma-best-item` / `{{item_card_extra_class}}` | 根 + 变体 |
| `best-items-item-content` / `best-items-item-middle-box` / `best-items-item-price-stock-box` | 容器 div |
| `item-title-box` / `item-title` / `item-title-inline-flow` / `item-mark` / `item-title-text` | 跨组件共享 / 结构组合 |
| `item-price-box` / `item-price-text` / `item-price` | 跨组件共享 |
| `item-stock-box` / `item-stock-text` / `item-stock` | 跨组件共享 |
| `item-brand-box` / `item-brand-text` / `item-brand` | 跨组件共享 |
| `item-service-box` / `item-service-text` / `item-service` | 跨组件共享 |
| `item-tag-box` / `item-button-box` | 跨组件共享 |
| `icon-aixin` | iconfont，跨项目使用 |

### 小计：4 个可精简

---

## 12. item-like-button.html

**消费方**: 几乎所有卡片组件

**说明**: 单行模板，class 通过 `{{like_class}}` 参数动态传入。无可精简。

---

## 13. hot-compaign-item.html

**消费方**: src/pages/compaign-all.html（vertical 列表）, src/partials/index-hot-compaign-item.html

### 可精简表

| 父级 class | 标签 | 现 class | 建议选择器 | CSS(+less) | 备注 |
|---|---|---|---|---|---|
| `.compaign-item-products-box` | `p` | `compaign-item-products` | `.compaign-item-products-box > p` | compaign.less:346 | products-box 内唯一 p |

### 需 JS 同步

以下类在 JS 模板字符串中按名称硬编码，修改需同步 `js/compaignpage.js` 和 `js/tagpage.js`：

| 类名 | JS 文件:行 | 建议 JS 改法 |
|---|---|---|
| `compaign-item-icon` | compaignpage.js:89, tagpage.js:295 | 改为从 partial include 统一生成，不走 JS 拼接；或同步修改 |
| `compaign-item-content` | compaignpage.js:91, tagpage.js:297 | 同上 |
| `compaign-item-brand-box` | compaignpage.js:99,113, tagpage.js:305,319 | 同上 |
| `compaign-item-brand-text` | compaignpage.js:100,110, tagpage.js:306,316 | 同上 |
| `compaign-item-brand` | compaignpage.js:101,111,115, tagpage.js:307,317,321 | 同上 |
| `compaign-item-products-box` | compaignpage.js:119, tagpage.js:325 | 同上 |
| `compaign-item-products-text` | compaignpage.js:120, tagpage.js:326 | 同上 |
| `compaign-item-products` | compaignpage.js:121, tagpage.js:327 | 同上 |

### 保留

| class | 原因 |
|---|---|
| `compaign-item` / `figma-hot-compaign-item` | 根 + 变体 |
| `compaign-item-icon` (img) | 与 like-button img 同级，不唯一。JS 硬编码 |
| `compaign-item-content` | 容器 + JS 硬编码 |
| `item-title-box` / `item-title` | 跨组件共享 |
| `compaign-item-middle-box` / `compaign-item-box` / `compaign-item-brand-box` | 容器 div |
| `compaign-item-brand-text` / `compaign-item-brand` (div) | 标签为 div，无语义替换价值。JS 硬编码 |
| `compaign-item-products-box` / `compaign-item-products-text` | container div + JS 硬编码 |
| `icon-aixin` | iconfont |

### 小计：1 个可精简（条件：需同步 JS）

---

## 14. compaign-all-horizontal-item.html

**消费方**: src/pages/compaign-all.html（horizontal 列表）, src/pages/index.html

### 可精简表

| 父级 class | 标签 | 现 class | 建议选择器 | CSS(+less) | 备注 |
|---|---|---|---|---|---|
| `.compaign-item-products-box` | `span` | `compaign-item-products-text` | `.compaign-item-products-box > span` | compaign.less:336 | products-box 内唯一 span |
| `.compaign-item-products-box` | `p` | `compaign-item-products` | `.compaign-item-products-box > p` | compaign.less:346 | products-box 内唯一 p |

### 需 JS 同步

与 hot-compaign-item 相同，`js/compaignpage.js` 和 `js/tagpage.js` 中硬编码了 `compaign-item-*` 类。

### 保留

| class | 原因 |
|---|---|
| `compaign-item` / `figma-compaign-horizontal-item` | 根 + 变体 |
| `compaign-item-icon` (img) | 与 like-button img 同级不唯一 + JS 硬编码 |
| `compaign-item-content` | 容器 + JS |
| `compaign-horizontal-head` / `compaign-horizontal-stats` | 容器 div |
| `compaign-item-ad-mark` (span) | `a.item-title-box` 也用于其他组件，内部 span 不唯一。但本组件内唯一 — 条件性可精简 |
| `item-title-box` / `item-title` | 跨组件共享 |
| `compaign-item-brand-text` / `compaign-item-brand` (span) | 在每个 `p.compaign-horizontal-stat` 内 2 个 span，不唯一 |
| `compaign-horizontal-stat` (p) | 多个 p |
| `icon-aixin` | iconfont |

### 小计：2 个可精简（条件：需同步 JS）

---

## 15. brand-hot-item-card.html

**消费方**: src/partials/components/brand-hot-items-section.html

**说明**: 纯 `@include` 包装 `item-card-vertical.html`，传 `brand-best-items-item` 额外类。无自有 HTML。

---

## 16. blog-post-item-v2.html

**消费方**: src/pages/blog.html, src/partials/blog-post-item-v2-*-liked.html 等

### 可精简表

| 父级 class | 标签 | 现 class | 建议选择器 | CSS(+less) | 备注 |
|---|---|---|---|---|---|
| `.blog-post-item-v2-title-link` | `h3` | `blog-post-item-v2-title` | `.blog-post-item-v2-title-link > h3` | blog.less:205 | title-link 内唯一 h3 |
| `.blog-post-item-v2-content` | `p` | `blog-post-item-v2-desc` | `.blog-post-item-v2-content > p` | blog.less:215 | content 内唯一直接 p |
| `.blog-post-item-v2-brand` | `img` | `blog-post-item-v2-brand-icon` | `.blog-post-item-v2-brand > img` | blog.less:243 | brand 内唯一 img |
| `.blog-post-item-v2-brand` | `span` | `blog-post-item-v2-brand-name` | `.blog-post-item-v2-brand > span` | blog.less:249 | brand 内唯一 span |
| `.blog-post-item-v2-meta-row` | `a` | `blog-post-item-v2-brand` | `.blog-post-item-v2-meta-row > a` | blog.less:235 | meta-row 内唯一 a（read-all 在 footer-row） |
| `.blog-post-item-v2-footer-row` | `a` | `blog-post-item-v2-read-all` | `.blog-post-item-v2-footer-row > a` | blog.less:351 | footer-row 内唯一 a |

### 条件性可精简（父级内唯一但需 :nth-child / :first-child）

| 父级 class | 标签 | 现 class | 建议选择器 | 风险 |
|---|---|---|---|---|
| `.blog-post-item-v2-rate-pc` | `span` (×2) | `blog-post-item-v2-stars` / `blog-post-item-v2-score` | `> span:first-child` / `> span:last-child` | DOM 顺序依赖 |
| `.blog-post-item-v2-attr` | `span` (×2) | `blog-post-item-v2-attr-label` / `blog-post-item-v2-attr-value` | `> span:first-child` / `> span:last-child` | DOM 顺序依赖 |

### 保留

| class | 原因 |
|---|---|
| `blog-post-item-v2` / `{{card_extra_class}}` | 根 + 变体 |
| `blog-post-item-v2-cover` (img) | root 内与 like-button img 同级，不唯一 |
| `blog-post-item-v2-content` | 容器 |
| `blog-post-item-v2-title-link` (a) | `.blog-post-item-v2-content > a` 理论可行，但 name 用于 scope 更清晰 |
| `blog-post-item-v2-meta-row` / `blog-post-item-v2-stats-wrap` / `blog-post-item-v2-footer-row` / `blog-post-item-v2-tags` / `blog-post-item-v2-rate` | 容器 div |
| `blog-post-item-v2-rate-pc` / `item-star-box-pc` | 响应式切换（pc/mobile） |
| `blog-post-item-v2-attr` / `blog-post-item-v2-attr-value-bold` | 容器 + modifier |
| `item-star-box-pc` | 跨组件共享 |

### 小计：6 个可精简 + 4 个条件性

---

## 17. post-shared-item.html

**消费方**: src/pages/post-all.html, src/pages/index.html, src/pages/tag-all.html 等

### 可精简表

| 父级 class | 标签 | 现 class | 建议选择器 | CSS(+less) | 备注 |
|---|---|---|---|---|---|
| `.post-item-user-box` | `img` | `post-item-user-avatar` | `.post-item-user-box > img` | 见 post-all.less | user-box 内唯一 img |
| `.post-item-user-box` | `p` | `post-item-user-name` | `.post-item-user-box > p` | 见 post-all.less | user-box 内唯一 p |

### 需 JS 同步

| 类名 | JS 文件:行 | 建议 JS 改法 |
|---|---|---|
| `post-item-icon` | postpage.js:96, tagpage.js:357 | JS 模板中直接写 class，需同步去除或用 scope selector |
| `post-item-content` | postpage.js:98, tagpage.js:359 | 同上 |
| `post-item-user-box` | postpage.js:102, tagpage.js:363 | 同上 |
| `post-item-user-avatar` | postpage.js:103, tagpage.js:364 | 同上 |
| `post-item-user-name` | postpage.js:104, tagpage.js:365 | 同上 |
| `post-item-kind-box` | postpage.js:111, tagpage.js:376 | 同上 |
| `post-item-kind-text` | postpage.js:112, tagpage.js:377 | 同上 |

### 保留

| class | 原因 |
|---|---|
| `post-item` / `{{post_item_extra_class}}` | 根 + 变体 |
| `post-item-icon` (img) | 与 like-button img 同级不唯一 + JS 硬编码 |
| `post-item-content` | 容器 + JS |
| `item-title-box` / `item-title` | 跨组件共享 |
| `item-desc-box` / `item-desc` | 跨组件共享（也用于其他组件） |
| `item-brand-box` / `item-brand-text` / `item-brand` | 跨组件共享 |
| `post-item-kind-box` / `post-item-kind-text` | 容器 + p，JS 硬编码 |
| `icon-aixin` | iconfont |

### 小计：2 个可精简（条件：需同步 JS）

---

## 18. rating-score-only.html

**消费方**: item-detail.html, post-detail.html, store-detail-review-item.html 等

### 保留

| class | 原因 |
|---|---|
| `item-star-box` / `item-star-box-pc` | 响应式切换基础 |
| `{{rating_class}}` | 模板参数（可能传 `rating-score-selectable`） |
| `star-bg` | JS 引用（`js/detail/post-detail.js:255` querySelector） |
| `stars-outer` / `stars-inner` | CSS 星级渲染骨架（SVG mask），不可简化 |
| `item-star-score` | 跨组件共享 |

### 小计：0 个可精简

---

## 19. rating-with-count.html

**消费方**: item-all-horizontal-item.html, item-card-vertical.html, blog-post-item-v2.html, demand-detail-bidding-item.html 等

结构与 rating-score-only 相同，增加 `item-star-recommend`。保留理由同上。

### 小计：0 个可精简

---

## 20. rating-with-count-mobile.html

**消费方**: rating-score-only.html, rating-with-count.html（被 include 到桌面版组件中），及 item-all-horizontal-mobile-item.html

### 条件性可精简

| 父级 class | 标签 | 现 class | 建议选择器 | 备注 |
|---|---|---|---|---|
| `.item-star-box-mobile` | `img` | `item-star-mobile-icon` | `.item-star-box-mobile > img` | 唯一 img |
| `.item-star-box-mobile` | `p` (×2) | `item-star-mobile-score` / `item-star-mobile-recommend` | `> p:first-of-type` / `> p:last-of-type` | 2 个 p，顺序固定 |

### 保留

| class | 原因 |
|---|---|
| `item-star-box-mobile` | 根容器，响应式切换 |
| `item-star-mobile-icon` / `item-star-mobile-score` / `item-star-mobile-recommend` | 命名清晰，且手机版独立于桌面版，修改影响有限 |

### 小计：3 个条件性可精简

---

## 汇总

| # | 文件 | 可精简 | 条件性 | 需JS同步 | 保留 | 疑似死类 |
|---|---|---|---|---|---|---|
| 1 | demand-all-figma-item.html | 0 | 0 | 0 | 全部 | 无 |
| 2 | demand-all-figma-items.html | 0 | 0 | 0 | 全部 | 无 |
| 3 | demand-all-horizontal-mobile-item.html | **6** | 0 | 0 | 其余 | 无 |
| 4 | demand-all-vertical-mobile-item.html | **6** | 0 | 0 | 其余 | 无 |
| 5 | demand-shared-item.html | 0 | 0 | 0 | 全部 | 无 |
| 6 | demand-detail-bidding-item.html | **3** | 0 | 0 | 其余 | 无 |
| 7 | demand-detail-tabs-top.html | **1** | 0 | 0 | 其余 | 无 |
| 8 | item-all-horizontal-item.html | **2** | 0 | 0 | 其余 | 无 |
| 9 | item-all-horizontal-mobile-item.html | **7** | 0 | 0 | 其余 | 无 |
| 10 | item-all-horizontal-item-responsive.html | 0 | 0 | 0 | 全部 | 无 |
| 11 | item-card-vertical.html | **4** | 0 | 0 | 其余 | 无 |
| 12 | item-like-button.html | 0 | 0 | 0 | 全部 | 无 |
| 13 | hot-compaign-item.html | **1** | 0 | **8 个类需同步** | 其余 | 无 |
| 14 | compaign-all-horizontal-item.html | **2** | 0 | **同上** | 其余 | 无 |
| 15 | brand-hot-item-card.html | 0 | 0 | 0 | 全部 | 无 |
| 16 | blog-post-item-v2.html | **6** | **4** | 0 | 其余 | 无 |
| 17 | post-shared-item.html | **2** | 0 | **7 个类需同步** | 其余 | 无 |
| 18 | rating-score-only.html | 0 | 0 | 0 | 全部 | 无 |
| 19 | rating-with-count.html | 0 | 0 | 0 | 全部 | 无 |
| 20 | rating-with-count-mobile.html | 0 | **3** | 0 | 全部 | 无 |

**总计：40 个可精简 + 7 个条件性 + 跨 JS 模板引用需联动处理**

---

## 注意点

1. **跨组件共享类（保留）**：`item-title-box`、`item-title`、`item-brand-text`、`item-brand`、`item-service-text`、`item-service`、`item-price-text`、`item-price`、`item-stock-text`、`item-stock`、`item-tag`、`item-tag-text`、`item-mark` 等 `item-*` 类在 5+ 以上组件中复用，必须保留。

2. **JS 模板字符串中的类名**：`post-shared-item.html` 和 `hot-compaign-item.html`/`compaign-all-horizontal-item.html` 的部分类在 `js/postpage.js`、`js/tagpage.js`、`js/compaignpage.js` 中以字符串模板形式硬编码。修改 HTML 的同时必须同步修改 JS 文件，否则 JS 输出的 DOM 会缺少样式。建议方案是让 JS 也从 partial 生成，而不是硬编码 HTML。

3. **iconfont 类保留**：`icon-aixin` 是 iconfont 类，在 iconfont.css 中有 `:before` 伪元素定义。属于跨项目通用约定，不可简化。

4. **响应式类**：`item-star-box-pc`、`item-star-box-mobile` 用于桌面/移动端切换（media query `display:none/flex`），必须保留作为切换钩子。

5. **疑似死类**：本次扫描未发现明显死类。所有在 HTML 中出现的 class 都能在 `css/` 中找到对应 CSS 规则（部分可能仅在 less 中未被编译到 css，或因嵌套作用域间接生效）。

6. **DOM 结构依赖性**：当选择器改用 `> span`、`> img`、`:first-child` 时，简化的前提是 DOM 子元素顺序固定且不受模板变量（如 `{{bidders_html}}`、`{{tags_html}}`）影响。
