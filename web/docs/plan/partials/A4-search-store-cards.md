# HTML 选择器精简分析 — search/store 卡片类 partial 组件

分析日期: 2026-07-11
分析范围: src/partials/components/ 下 13 个文件

---

## 目录

1. [search-all-post-item.html](#1-search-all-post-itemhtml)
2. [search-all-item-horizontal-mobile-item.html](#2-search-all-item-horizontal-mobile-itemhtml)
3. [search-all-store-item.html](#3-search-all-store-itemhtml)
4. [search-all-featured-item.html](#4-search-all-featured-itemhtml)
5. [search-all-demand-item.html](#5-search-all-demand-itemhtml)
6. [search-all-campaign-item.html](#6-search-all-campaign-itemhtml)
7. [store-all-vertical-item-responsive.html](#7-store-all-vertical-item-responsivehtml)
8. [store-all-horizontal-item-responsive.html](#8-store-all-horizontal-item-responsivehtml)
9. [store-all-vertical-mobile-item.html](#9-store-all-vertical-mobile-itemhtml)
10. [store-all-horizontal-mobile-item.html](#10-store-all-horizontal-mobile-itemhtml)
11. [store-all-horizontal-item.html](#11-store-all-horizontal-itemhtml)
12. [store-detail-review-item.html](#12-store-detail-review-itemhtml)
13. [best-store-item.html](#13-best-store-itemhtml)

---

## 1. search-all-post-item.html

**消费者:** `src/pages/search-all.html`

### 可精简

| 父级class | 标签 | 现class | 建议选择器 | css(+less) | 备注 |
|---|---|---|---|---|---|
| `.item-title` | span | `search-post-title-highlight` | `.item-title > span` | search-all.less:579 | 父级内唯一 span；title_prefix/title_suffix 为文本节点不影响 |
| `.search-card-content` | img | `card-item-img` | `.search-card-content img` | search-all.less:126,361,473,599,709,1528,1545,1662,1718 | 4 组件同模式，父级内唯一 img |
| `.card-content` | p | `summary-box` | `.card-content > p` | search-all.less:152,611,1768 | 父级内唯一 p；但需合并 `.summary-box` 规则到 `p` |
| `.status-badge` | p | (无独立class, `<p>`自身) | `.status-badge > p` | search-all.less:281 | `<p>` 无 class，不做精简，仅记录 |

### 需 JS 同步(§3)

无

### 保留

| class | 原因 |
|---|---|
| `search-card` / `search-card-third-item` / `-desktop` / `-mobile` | JS search-all.js 字符串引用 (map value) |
| `item-title-wrapper` | 父级容器，跨 5 组件 |
| `item-title` | 跨 8 组件复用 |
| `search-card-content` | 父级容器，跨 5 组件 |
| `card-content` | 父级容器，跨 5 组件 |
| `search-post-summary` | 与 `summary-box` 组成 compound selector，自身跨组件？仅本文件 |
| `best-items-item-middle-box` | 跨 4 组件 |
| `search-post-meta` | 子选择器锚点 |
| `item-stock-box` | 跨 10 组件，父级容器 |
| `item-stock-text` / `item-stock` | 跨 10 组件，同父级下多兄弟 |
| `status-badge` / `status-badge1` | 跨 6/5 组件 |
| `layout-horizontal` | 工具类，跨 3 组件 |
| `search-all-post-mobile-layout` | 子选择器锚点 |

### 疑似死类

无

---

## 2. search-all-item-horizontal-mobile-item.html

**消费者:** `src/pages/search-all.html`

### 可精简

| 父级class | 标签 | 现class | 建议选择器 | css(+less) | 备注 |
|---|---|---|---|---|---|
| `.item-all-horizontal-mobile-media` | img | `item-all-horizontal-mobile-cover` | `.item-all-horizontal-mobile-media img` | brand-service.less:565, search-all.less:1170 | 父级内唯一 img |
| `.item-all-horizontal-mobile-title` | span | `item-all-horizontal-mobile-mark` | `.item-all-horizontal-mobile-title > span:first-child` | brand-service.less:573, search-all.less:1170 | 父级内第一个 span |
| `.item-all-horizontal-mobile-title` | span | `search-all-item-mobile-title-text` | `.item-all-horizontal-mobile-title > span:last-child` | search-all.less:1183 | 父级内最后一个 span |
| `.item-all-horizontal-mobile-brand` | span | `item-all-horizontal-mobile-brand-text` | `.item-all-horizontal-mobile-brand > span` | brand-service.less:634, search-all.less:1196 | 父级内唯一 span |
| `.item-all-horizontal-mobile-service` | span | `item-all-horizontal-mobile-service-text` | `.item-all-horizontal-mobile-service > span` | brand-service.less:635 | 父级内唯一 span |
| `.item-all-horizontal-mobile-stock` | span | `item-all-horizontal-mobile-stock-text` | `.item-all-horizontal-mobile-stock > span` | brand-service.less:636,661 | 父级内唯一 span |
| `.item-all-horizontal-mobile-meta` | span | `item-all-horizontal-mobile-price` | `.item-all-horizontal-mobile-meta > span` | brand-service.less:637,657 | 父级内唯一裸 span（非 div 包裹） |
| `.item-all-horizontal-mobile-brand` | img | `item-all-horizontal-mobile-meta-icon` | — | brand-service.less:620 | 但 `.meta-icon` 在 brand/service/stock 重复3次，需改 CSS 为 `.item-all-horizontal-mobile-brand img, .item-all-horizontal-mobile-service img, .item-all-horizontal-mobile-stock img` → **暂保留，因多处复用** |

### 需 JS 同步(§3)

无

### 保留

| class | 原因 |
|---|---|
| `search-card` / `search-card-first-item` / `-mobile` | JS search-all.js 字符串引用 |
| `search-all-item-mobile-item` | 子选择器锚点，跨组件？仅本文件 |
| `item-all-horizontal-mobile-item` | 父级容器，CSS 入口 |
| `item-all-horizontal-mobile-card` | 父级容器 |
| `item-all-horizontal-mobile-media` | 父级容器 |
| `item-all-horizontal-mobile-main` | 父级容器 |
| `search-all-item-mobile-title-row` | 父级容器 |
| `item-all-horizontal-mobile-title` | 父级容器 |
| `item-all-horizontal-mobile-meta` | 父级容器 |
| `item-all-horizontal-mobile-brand` | 父级容器 |
| `item-all-horizontal-mobile-service` | 父级容器 |
| `item-all-horizontal-mobile-stock` | 父级容器 |
| `item-all-horizontal-mobile-buy-btn` | 按钮状态类(disabled), CSS 有 `.disabled` 变体 |
| `item-all-horizontal-mobile-meta-icon` | 跨 3 子容器复用(img ×3)，改为标签选择器需聚合 CSS |
| `item-mark` | 跨 4 组件复用 |
| `item-all-horizontal-mobile-like` | like 按钮(icon-aixin)，收藏状态，JS 处理 |

### 疑似死类

无

---

## 3. search-all-store-item.html

**消费者:** `src/pages/search-all.html`

### 可精简

| 父级class | 标签 | 现class | 建议选择器 | css(+less) | 备注 |
|---|---|---|---|---|---|
| `.search-card-content` | img | `card-item-img` | `.search-card-content img` | (同文件1) | 同上 |
| `.search-store-title-group` | div | `item-title` | — | common.less:3358 | ❌ 跨8组件复用 → 保留 |
| `.search-store-title-group` | p | `search-store-subtitle` | `.search-store-title-group > p` | search-all.less:679 | 父级内唯一 p |
| `.item-brand-box` | p | `item-brand-text` | — | common.less:3714 | ❌ 跨6组件复用 → 保留 |
| `.item-brand-box` | p | `item-brand` | — | common.less:3716 | ❌ 跨6组件复用 → 保留 |
| `.item-service-box` | p | `item-service-text` | — | common.less:3715 | ❌ 跨7组件复用 → 保留 |
| `.item-service-box` | p | `item-service` | — | common.less:3717 | ❌ 跨7组件复用 → 保留 |
| `.card-content` | p | `summary-box2` | `.card-content > p` | search-all.less:163,1768 | 父级内唯一 p（注意区分 summary-box/summary-box2）→ **可精简** |
| `.card-content` | p | `search-store-summary` | — | search-all.less:731,1834 | compound with `summary-box2` → 保留 |
| `.status-badge` | p | (无class) | `.status-badge > p` | — | 同文件1 |

### 需 JS 同步(§3)

无

### 保留

| class | 原因 |
|---|---|
| `search-card` / `search-card-fourth-item` / `-desktop` / `-mobile` | JS 字符串引用 |
| `search-store-title-group` | 父级容器 |
| `search-store-subtitle` | 已列为可精简 → 但 `summary-box2.search-store-summary` 模式类似 |
| `best-items-item-middle-box` | 跨4组件 |
| `search-store-meta` | 子选择器锚点 |
| `search-store-summary` | compound with `summary-box2` |
| `store-all-mobile-horizontal-page` | 父级容器 |
| `items-container-horizontal` | 父级容器 |
| `store-all-horizontal-items-pager` | 父级容器 |
| `summary-box2` | 跨？仅本文件，但与 `summary-box` 同族，保留一致性 |
| `item-title-wrapper` | 跨5组件 |
| `card-content` / `search-card-content` | 父级容器 |
| `item-brand-box` / `item-service-box` | 跨6+组件 |
| `item-brand-text` / `item-brand` | 跨6组件 |
| `item-service-text` / `item-service` | 跨7组件 |
| `item-tag-box` | 跨8组件 |
| `status-badge` / `status-badge1` | 跨组件 |

### 疑似死类

无

---

## 4. search-all-featured-item.html

**消费者:** `src/pages/search-all.html`

### 可精简

| 父级class | 标签 | 现class | 建议选择器 | css(+less) | 备注 |
|---|---|---|---|---|---|
| `.search-card-content` | img | `card-item-img` | `.search-card-content img` | search-all.less | 同文件1 |
| `.best-items-item-middle-box` | p | `item-brand-text` | — | ❌ 跨6组件 | 保留 |
| `.best-items-item-middle-box` | p | `item-brand` | — | ❌ 跨6组件 | 保留 |
| `.best-items-item-middle-box` | p | `item-service-text` | — | ❌ 跨7组件 | 保留 |
| `.best-items-item-middle-box` | p | `item-service` | — | ❌ 跨7组件 | 保留 |
| `.best-items-item-middle-box` | p | `item-price-text` | `.best-items-item-middle-box > .item-price-box > p:first-child` | ❌ 有 `item-price-box` 包裹 | 保留(嵌套结构) |
| `.best-items-item-middle-box` | p | `item-price` | 同上 | — | 同上 |
| `.best-items-item-middle-box` | p | `item-stock-text` | — | ❌ 跨10组件 | 保留 |
| `.best-items-item-middle-box` | p | `item-stock` | — | ❌ 跨10组件 | 保留 |
| `.view-info-item` | img | `view-count` | `.view-info-item:first-child img` | search-all.less:234 | 父级内唯一 img + 第一个 view-info-item |
| `.view-info-item` | img | `like-count` | `.view-info-item:last-child img` | search-all.less:235 | 父级内唯一 img + 最后一个 view-info-item |
| `.view-info-item` | span | `count` | `.view-info-item > span` | common.less:1808,2173 | ❌ 跨6组件 → 保留 |

### 需 JS 同步(§3)

无

### 保留

| class | 原因 |
|---|---|
| `search-card` | 根容器，template var `{{card_class}}` 动态 |
| `item-title-wrapper` | 跨5组件 |
| `item-title-main` | 父级容器 |
| `item-mark` | 跨4组件 |
| `item-title` | 跨8组件 |
| `search-card-content` / `card-content` | 父级容器 |
| `best-items-item-middle-box` | 跨4组件 |
| `item-brand-box` / `item-service-box` / `item-price-box` / `item-stock-box` | 跨6+组件，父级容器 |
| `item-brand-text` / `item-brand` 等 label-value 对 | 跨6+组件 |
| `view-info-wrapper` | 父级容器 |
| `view-info-item` | 父级容器(×3兄弟) |
| `count` | 跨6组件 |
| `iconfont` / `icon-pinglun` | 图标类，约定不精简 |
| `buy-btn` / `item-buy-btn` | 按钮状态，CSS 有变体 |

### 疑似死类

无

---

## 5. search-all-demand-item.html

**消费者:** `src/pages/search-all.html`

### 可精简

| 父级class | 标签 | 现class | 建议选择器 | css(+less) | 备注 |
|---|---|---|---|---|---|
| `.search-demand-date-box` | img | `date-range` | `.search-demand-date-box img` | search-all.less:174,856 | 父级内唯一 img |
| `.search-demand-date-box` | p | `item-stock` | — | common.less:3813 | ❌ 跨10组件 → 保留 |
| `.bidder-info-wrapper` | span | `bidder-label` | `.bidder-info-wrapper > span:first-child` | search-all.less:183,883 | 父级内唯一 label span |

### 需 JS 同步(§3)

无

### 保留

| class | 原因 |
|---|---|
| `search-card` / `search-card-fifth-item` / `-desktop` / `-mobile` | JS 字符串引用 |
| `item-title-wrapper` / `item-title` | 跨组件 |
| `search-card-content` / `card-content` | 父级容器 |
| `search-demand-meta-row` / `-top` / `-bottom` | 父级容器+子选择器锚点 |
| `item-brand-box` / `item-service-box` / `item-stock-box` | 跨6+组件 |
| `item-brand-text` / `item-brand` 等 label-value 对 | 跨组件 |
| `search-demand-date-box` | 父级容器 |
| `item-tag-box` | 跨8组件 |
| `buy-btn` / `item-buy-btn` | 按钮状态 |
| `bidder-info-wrapper` | 父级容器 |
| `layout-horizontal` | 工具类 |
| `demand-all-mobile-horizontal-page` | 父级容器 |
| `list-container-page-scoll` | 父级容器 |
| `demand-all-figma-container` | 父级容器 |

### 疑似死类

无

---

## 6. search-all-campaign-item.html

**消费者:** `src/pages/search-all.html`

### 可精简

同 featured 模式：`view-count`、`like-count` 为 img 在 `.view-info-item` 内唯一。

### 需 JS 同步(§3)

无

### 保留

| class | 原因 |
|---|---|
| `search-card` / `search-card-second-item` / `-desktop` / `-mobile` | JS 字符串引用 |
| `item-title-main` / `item-mark` / `item-title` | 跨组件 |
| `search-card-content` / `card-content` | 父级容器 |
| `best-items-item-middle-box` | 跨4组件 |
| `search-campaign-stats` | 子选择器锚点 |
| `item-stock-box` / `item-stock-text` / `item-stock` | 跨10组件 |
| `search-campaign-products` | 子选择器锚点 |
| `search-campaign-product-value` | 跨？仅本文件，但为 span 且复合 CSS |
| `item-tag-box` | 跨8组件 |
| `view-info-wrapper` / `view-info-item` | 父级容器 |
| `count` | 跨6组件 |
| `iconfont` / `icon-pinglun` | 图标类 |
| `status-badge` / `status-badge1` | 跨组件 |
| `item-all-mobile-horizontal-page` | 父级容器 |
| `layout-horizontal` / `list-container-page-scoll` | 父级/工具类 |

### 疑似死类

无

---

## 7. store-all-vertical-item-responsive.html

**消费者:** `src/pages/store-all.html`

本文件仅 3 个容器 div，无语义标签 class，无可精简项。

### 保留

| class | 原因 |
|---|---|
| `store-all-vertical-item-responsive` | 根容器，CSS 入口 |
| `store-all-vertical-desktop-item` | 父级容器 |
| `store-all-vertical-mobile-item` | 父级容器 |

---

## 8. store-all-horizontal-item-responsive.html

**消费者:** `src/pages/store-all.html`

仅 1 个容器 div，无可精简项。

### 保留

| class | 原因 |
|---|---|
| `store-all-horizontal-item-responsive` | 根容器，CSS 入口 |

---

## 9. store-all-vertical-mobile-item.html

**消费者:** `src/partials/components/store-all-vertical-item-responsive.html`

### 可精简

| 父级class | 标签 | 现class | 建议选择器 | css(+less) | 备注 |
|---|---|---|---|---|---|
| `.store-item-user-box` | img | `store-item-icon` | `.store-item-user-box > img` | store.less:113,914 | 父级内唯一 img |
| `.item-title-box` | p | `item-title` | — | common.less:3358 | ❌ 跨8组件 → 保留 |
| `.item-desc-box` | p | `item-desc` | `.item-desc-box > p` | common.less:3375 | 父级内唯一 p → **可精简** |
| `.store-item-detail-box` | p | `store-item-detail` | `.store-item-detail-box > p` | store.less:261,950 | 父级内唯一 p → **可精简** |
| `.item-brand-box` | p | `item-brand-text` | — | ❌ 跨6组件 | 保留 |
| `.item-brand-box` | p | `item-brand` | — | ❌ 跨6组件 | 保留 |
| `.item-service-box` | p | `item-service-text` | — | ❌ 跨7组件 | 保留 |
| `.item-service-box` | p | `item-service` | — | ❌ 跨7组件 | 保留 |
| `.item-tag` | span | `item-tag-text` | `.item-tag > span` | common.less:3602 | ❌ 跨25组件(标签系统) → 保留(约定不精简约简) |
| `a.item-tag` | a | `item-tag` | — | common.less:3591 | ❌ 跨25组件 | 保留 |

### 需 JS 同步(§3)

无

### 保留

| class | 原因 |
|---|---|
| `store-item` / `figma-best-store-item` / `store-all-vertical-mobile-item-card` | 根容器/CSS 入口 |
| `store-item-user-box` / `store-item-name-box` | 父级容器 |
| `item-title-box` | 父级容器，跨？仅 store 类但多处 |
| `item-title` | 跨8组件 |
| `item-desc-box` | 父级容器 |
| `item-brand-box` / `item-service-box` | 跨6+组件 |
| `item-brand-text` / `item-brand` / `item-service-text` / `item-service` | 跨组件 |
| `store-item-content` | 父级容器 |
| `store-item-detail-box` | 父级容器 |
| `store-item-brand-service-box` | 父级容器 |
| `item-tag-box` | 跨8组件 |
| `item-tag` / `item-tag-text` | 跨25组件(标签系统) |

### 疑似死类

无

---

## 10. store-all-horizontal-mobile-item.html

**消费者:** `src/partials/components/search-all-store-item.html`, `src/partials/components/store-all-horizontal-item-responsive.html`

### 可精简

| 父级class | 标签 | 现class | 建议选择器 | css(+less) | 备注 |
|---|---|---|---|---|---|
| `.store-all-horizontal-mobile-avatar-box` | img | `store-all-horizontal-mobile-avatar` | `.store-all-horizontal-mobile-avatar-box img` | store.less:648, search-all.less:1307 | 父级内唯一 img |
| `.store-all-horizontal-mobile-title-row` | span | `store-all-horizontal-mobile-ad` | `.store-all-horizontal-mobile-title-row > span:first-child` | store.less:667, search-all.less:1326 | 第一个 span |
| `.store-all-horizontal-mobile-title-row` | a | `store-all-horizontal-mobile-title` | `.store-all-horizontal-mobile-title-row > a` | store.less:679, search-all.less:1338 | 父级内唯一 a |
| `.store-all-horizontal-mobile-main` | p | `store-all-horizontal-mobile-desc` | `.store-all-horizontal-mobile-main > p` | store.less:692, search-all.less:1351 | 父级内唯一 p |
| `.store-all-horizontal-mobile-brand` | span | `store-all-horizontal-mobile-brand-text` | `.store-all-horizontal-mobile-brand > span` | store.less:748, search-all.less:1407 | 父级内唯一 span |
| `.store-all-horizontal-mobile-service` | span | `store-all-horizontal-mobile-service-text` | `.store-all-horizontal-mobile-service > span` | store.less:761, search-all.less:1420 | 父级内唯一 span |
| `.store-all-horizontal-mobile-brand` | img | `store-all-horizontal-mobile-meta-icon` | `.store-all-horizontal-mobile-brand img` | store.less:742, search-all.less:1401 | 但 service/stock 也使用同名 class img → 需聚合 CSS |
| `.item-tag` | span | `item-tag-text` | — | ❌ 跨25组件 | 保留 |

### 需 JS 同步(§3)

无

### 保留

| class | 原因 |
|---|---|
| `store-all-horizontal-mobile-item` | 根容器，CSS 入口 |
| `store-all-horizontal-mobile-card` | 父级容器 |
| `store-all-horizontal-mobile-top` | 父级容器 |
| `store-all-horizontal-mobile-avatar-box` | 父级容器 |
| `store-all-horizontal-mobile-main` | 父级容器 |
| `store-all-horizontal-mobile-title-row` | 父级容器 |
| `store-all-horizontal-mobile-meta` | 父级容器 |
| `store-all-horizontal-mobile-brand` / `-service` | 父级容器 |
| `store-all-horizontal-mobile-meta-icon` | 3 处复用(img)，改为标签选择器需聚合 |
| `store-all-horizontal-mobile-tags` | 父级容器，额外边距 |
| `store-all-horizontal-mobile-like` | like 按钮(icon-aixin)，收藏状态 |
| `item-tag-box` / `item-tag` / `item-tag-text` | 跨组件标签系统 |

### 疑似死类

无

---

## 11. store-all-horizontal-item.html

**消费者:** `src/pages/store-all.html`, `src/pages/tag-all.html`, `src/partials/components/store-all-horizontal-item-responsive.html`

### 可精简

| 父级class | 标签 | 现class | 建议选择器 | css(+less) | 备注 |
|---|---|---|---|---|---|
| `.store-item-user-box` | img | `store-item-icon` | `.store-item-user-box > img` | store.less:113,371 | 父级内唯一 img → **可精简** |
| `.item-title-box` | p | `item-title` | — | ❌ 跨8组件 | 保留 |
| `.item-desc-box` | p | `item-desc` | `.item-desc-box > p` | common.less:3375 | **可精简** |
| `.store-item-detail-box` | p | `store-item-detail` | `.store-item-detail-box > p` | store.less:261,410 | **可精简** |
| `.item-brand-box` | p | `item-brand-text` | — | ❌ 跨6组件 | 保留 |
| `.item-brand-box` | p | `item-brand` | — | ❌ 跨6组件 | 保留 |
| `.item-service-box` | p | `item-service-text` | — | ❌ 跨7组件 | 保留 |
| `.item-service-box` | p | `item-service` | — | ❌ 跨7组件 | 保留 |
| `.item-tag` | span | `item-tag-text` | — | ❌ 跨25组件 | 保留 |

### 需 JS 同步(§3)

无

### 保留

| class | 原因 |
|---|---|
| `store-item` / `figma-store-horizontal-item` | 根容器，CSS 入口 |
| `store-item-user-box` / `store-item-name-box` | 父级容器 |
| `item-title-box` | 父级容器 |
| `item-title` | 跨8组件 |
| `item-desc-box` | 父级容器 |
| `store-item-content` | 父级容器 |
| `store-item-detail-box` | 父级容器 |
| `store-item-brand-service-box` | 父级容器 |
| `item-brand-box` / `item-service-box` | 跨6+组件 |
| `item-brand-text` / `item-brand` 等 | 跨组件 |
| `item-tag-box` / `item-tag` / `item-tag-text` | 跨组件标签系统 |

### 疑似死类

无

---

## 12. store-detail-review-item.html

**消费者:** `src/pages/store-detail.html`

### 可精简

| 父级class | 标签 | 现class | 建议选择器 | css(+less) | 备注 |
|---|---|---|---|---|---|
| `.item-detail-review-user-box` | img | `item-detail-review-user-avatar` | `.item-detail-review-user-box > img` | store-detail.less:662,908 | 父级内唯一 img |
| `.item-detail-review-user-name-box` | span | `item-detail-review-user-name` | `.item-detail-review-user-name-box > span:first-child` | store-detail.less:677,919 | 第一个 span |
| `.item-detail-review-user-name-box` | span | `item-detail-review-user-time` | `.item-detail-review-user-name-box > span:last-child` | store-detail.less:688,923 | 最后一个 span |
| `.item-detail-review-user-status-box` | img | `item-detail-review-user-status-icon` | `.item-detail-review-user-status-box > img` | store-detail.less:706,932 | 父级内唯一 img |
| `.item-detail-review-user-status-box` | span | `item-detail-review-user-status-text` | `.item-detail-review-user-status-box > span` | store-detail.less:711,937 | 父级内唯一 span |
| `.item-detail-review-box` | span | `item-detail-review-content` | `.item-detail-review-box > span` | store-detail.less:723,941 | 父级内最后一个 span；注意 rating-score-only 也生成 span，需 `:last-child` |
| `.item-detail-review-info-item` | span | `item-detail-review-info-title` | `.item-detail-review-info-item > span:first-child` | store-detail.less:753,957 | 第一个 span |
| `.item-detail-review-info-item` | span | `item-detail-review-info-desc` | `.item-detail-review-info-item > span:last-child` | store-detail.less:766,962 | 最后一个 span |
| `.item-detail-review-info-item.icon` | img | `item-detail-review-info-icon` | `.item-detail-review-info-item.icon > img` | store-detail.less:784,967 | 父级内唯一 img |
| `.item-detail-reviewer-user-box` | img | `item-detail-reviewer-user-icon` | `.item-detail-reviewer-user-box > img:first-child` | store-detail.less:807,987 | 第一个 img |
| `.item-detail-reviewer-user-box` | span | `item-detail-reviewer-user-name` | `.item-detail-reviewer-user-box > span` | store-detail.less:815,993 | 父级内唯一 span（.empty 为 div） |
| `.item-detail-reviewer-user-box` | img | `item-detail-reviewer-arrow` | `.item-detail-reviewer-user-box > img:last-child` | store-detail.less:832 | 最后一个 img |
| `.item-detail-reiviewer-box` | span | `item-detail-reviewer-content` | `.item-detail-reiviewer-box > span` | store-detail.less:838,998 | 父级内唯一 span |
| `.item-detail-review-tool-item` | img | `item-detail-review-tool-icon` | `.item-detail-review-tool-item > img` | store-detail.less:882,1020 | 每个 tool-item 内唯一 img |
| `.item-detail-review-tool-item` | span | `item-detail-review-tool-text` | `.item-detail-review-tool-item > span:last-child` | store-detail.less:857,1011 | 最后一个 span |

### 需 JS 同步(§3)

以下 class 被 JS 直接用作选择器，不可单独移除 class；若精简需同步改 JS：

| class | JS 文件:行 | 当前 JS 用法 | 建议 JS 改法 |
|---|---|---|---|
| `item-detail-reviewer-user-box` | store-detail.js:51, item-detail.js:129 | `reviewer.querySelector('.item-detail-reviewer-user-box')` | 改为 `reviewer.querySelector('.item-detail-reiviewer-box > div')` 或保留 class |
| `item-detail-reviewer-arrow` | store-detail.js:52, item-detail.js:130 | `user.querySelector('.item-detail-reviewer-arrow')` | 改为 `user.querySelector('img:last-child')` 或保留 class |
| `item-detail-reviewer-content` | store-detail.js:53, item-detail.js:131 | `reviewer.querySelector('.item-detail-reviewer-content')` | 改为 `reviewer.querySelector('span')` 或保留 class |
| `item-detail-review-tool-icon-yes` | store-detail.js, item-detail.js (delegated) | `$('.item-detail-review-tool-icon-yes')` / `$(document).on('click', '.item-detail-review-tool-icon-yes', ...)` | 改用父级选择器 + `img:first-child` 或保留 |
| `item-detail-review-tool-icon-no` | store-detail.js, item-detail.js (delegated) | `$('.item-detail-review-tool-icon-no')` / `$(document).on('click', '.item-detail-review-tool-icon-no', ...)` | 改用父级选择器 + `img:last-child` 或保留 |

### 保留

| class | 原因 |
|---|---|
| `item-detail-review-item` | 根容器，template var |
| `page-section` | 跨组件(post-detail等) |
| `item-detail-review-card` | 父级容器 |
| `item-detail-review-box` | 父级容器 |
| `item-detail-review-user-box` | 父级容器，JS  selector |
| `item-detail-review-user-name-box` | 父级容器 |
| `item-detail-review-user-status-box` | 父级容器 |
| `item-detail-review-info-box` | 父级容器 |
| `item-detail-review-info-item` | 父级容器(×3兄弟) |
| `item-detail-review-info-line` | div 装饰线，非语义 |
| `item-detail-review-line` | div 装饰线，非语义 |
| `item-detail-reiviewer-box` | 父级容器 |
| `item-detail-reviewer-user-box` | 父级容器 + JS selector |
| `item-detail-reviewer-user-empty` | div 占位，非语义 |
| `item-detail-reviewer-arrow` | JS selector |
| `item-detail-reviewer-content` | JS selector |
| `item-detail-review-tool-box` | 父级容器 |
| `item-detail-review-tool-item` | 父级容器(×2兄弟)，状态变体 `{{helpful_yes_class}}` 动态 |
| `item-detail-review-tool-icon` | 父级容器内唯一 img 但跨 tool-item |
| `item-detail-review-tool-icon-yes` / `-no` | JS selector，状态变体 |
| `item-detail-review-tool-text` | 跨3处使用，multi-sibling |
| `iconfont` / `icon-dianzan` / `icon-not-dianzan` | 图标类 |
| `flex-row` / `flex-column` | 工具类，跨多文件 |
| `icon` (in `.item-detail-review-info-item.icon`) | 复合选择器锚点 |

### 疑似死类

无

---

## 13. best-store-item.html

**消费者:** `src/partials/index-best-store-item.html`, `src/pages/tag-all.html`, `src/pages/index.html`, `src/partials/components/store-all-vertical-item-responsive.html`, `src/partials/index-best-store-item-liked.html`

### 可精简

同 store-all-vertical-mobile-item.html 模式：

| 父级class | 标签 | 现class | 建议选择器 | css(+less) | 备注 |
|---|---|---|---|---|---|
| `.store-item-user-box` | img | `store-item-icon` | `.store-item-user-box > img` | store.less:113,914 | **可精简** |
| `.item-desc-box` | p | `item-desc` | `.item-desc-box > p` | common.less:3375 | **可精简** |
| `.store-item-detail-box` | p | `store-item-detail` | `.store-item-detail-box > p` | store.less:261,950 | **可精简** |

### 需 JS 同步(§3)

无

### 保留

| class | 原因 |
|---|---|
| `store-item` / `figma-best-store-item` | 根容器，CSS 入口 |
| `store-item-user-box` / `store-item-name-box` | 父级容器 |
| `item-title-box` | 父级容器 |
| `item-title` | 跨8组件 |
| `item-desc-box` | 父级容器 |
| `store-item-content` | 父级容器 |
| `store-item-detail-box` | 父级容器 |
| `store-item-brand-service-box` | 父级容器 |
| `item-brand-box` / `item-service-box` | 跨6+组件 |
| `item-brand-text` / `item-brand` / `item-service-text` / `item-service` | 跨组件 |
| `item-tag-box` / `item-tag` / `item-tag-text` | 跨组件标签系统 |

### 疑似死类

无

---

## 跨文件可精简汇总（仅语义标签 + 父级唯一 + 无 JS + 无跨组件复用）

| 组件文件 | 可精简 class | 建议选择器 | 优先级 |
|---|---|---|---|
| search-all-post-item | `search-post-title-highlight` | `.item-title > span` | 安全 |
| search-all-post-item | `card-item-img` | `.search-card-content img` | 安全（4组件同模式） |
| search-all-post-item | `summary-box` | `.card-content > p` | 安全（注意合并 CSS 规则） |
| search-all-item-horizontal-mobile-item | `item-all-horizontal-mobile-cover` | `.item-all-horizontal-mobile-media img` | 安全 |
| search-all-item-horizontal-mobile-item | `item-all-horizontal-mobile-mark` | `.item-all-horizontal-mobile-title > span:first-child` | 安全 |
| search-all-item-horizontal-mobile-item | `search-all-item-mobile-title-text` | `.item-all-horizontal-mobile-title > span:last-child` | 安全 |
| search-all-item-horizontal-mobile-item | `item-all-horizontal-mobile-brand-text` | `.item-all-horizontal-mobile-brand > span` | 安全 |
| search-all-item-horizontal-mobile-item | `item-all-horizontal-mobile-service-text` | `.item-all-horizontal-mobile-service > span` | 安全 |
| search-all-item-horizontal-mobile-item | `item-all-horizontal-mobile-stock-text` | `.item-all-horizontal-mobile-stock > span` | 安全 |
| search-all-item-horizontal-mobile-item | `item-all-horizontal-mobile-price` | `.item-all-horizontal-mobile-meta > span` | 安全 |
| search-all-store-item | `card-item-img` | `.search-card-content img` | 安全（同上） |
| search-all-store-item | `summary-box2` | `.card-content > p` | 安全（注意与 summary-box 区分） |
| search-all-store-item | `search-store-subtitle` | `.search-store-title-group > p` | 安全 |
| search-all-featured-item | `card-item-img` | `.search-card-content img` | 安全 |
| search-all-demand-item | `date-range` | `.search-demand-date-box img` | 安全 |
| search-all-demand-item | `bidder-label` | `.bidder-info-wrapper > span:first-child` | 安全 |
| search-all-campaign-item | `card-item-img` | `.search-card-content img` | 安全 |
| store-all-vertical-mobile-item | `store-item-icon` | `.store-item-user-box > img` | 安全，3文件同模式 |
| store-all-vertical-mobile-item | `item-desc` | `.item-desc-box > p` | 安全 |
| store-all-vertical-mobile-item | `store-item-detail` | `.store-item-detail-box > p` | 安全 |
| store-all-horizontal-mobile-item | `store-all-horizontal-mobile-avatar` | `.store-all-horizontal-mobile-avatar-box img` | 安全 |
| store-all-horizontal-mobile-item | `store-all-horizontal-mobile-ad` | `.store-all-horizontal-mobile-title-row > span:first-child` | 安全 |
| store-all-horizontal-mobile-item | `store-all-horizontal-mobile-title` | `.store-all-horizontal-mobile-title-row > a` | 安全 |
| store-all-horizontal-mobile-item | `store-all-horizontal-mobile-desc` | `.store-all-horizontal-mobile-main > p` | 安全 |
| store-all-horizontal-mobile-item | `store-all-horizontal-mobile-brand-text` | `.store-all-horizontal-mobile-brand > span` | 安全 |
| store-all-horizontal-mobile-item | `store-all-horizontal-mobile-service-text` | `.store-all-horizontal-mobile-service > span` | 安全 |
| store-all-horizontal-item | `store-item-icon` | `.store-item-user-box > img` | 安全（同 store-all-vertical-mobile-item） |
| store-all-horizontal-item | `item-desc` | `.item-desc-box > p` | 安全 |
| store-all-horizontal-item | `store-item-detail` | `.store-item-detail-box > p` | 安全 |
| store-detail-review-item | `item-detail-review-user-avatar` | `.item-detail-review-user-box > img` | 安全 |
| store-detail-review-item | `item-detail-review-user-name` | `.item-detail-review-user-name-box > span:first-child` | 安全 |
| store-detail-review-item | `item-detail-review-user-time` | `.item-detail-review-user-name-box > span:last-child` | 安全 |
| store-detail-review-item | `item-detail-review-user-status-icon` | `.item-detail-review-user-status-box > img` | 安全 |
| store-detail-review-item | `item-detail-review-user-status-text` | `.item-detail-review-user-status-box > span` | 安全 |
| store-detail-review-item | `item-detail-review-content` | `.item-detail-review-box > span:last-child` | 需注意 rating 也产生 span |
| store-detail-review-item | `item-detail-review-info-title` | `.item-detail-review-info-item > span:first-child` | 安全 |
| store-detail-review-item | `item-detail-review-info-desc` | `.item-detail-review-info-item > span:last-child` | 安全 |
| store-detail-review-item | `item-detail-review-info-icon` | `.item-detail-review-info-item.icon > img` | 安全 |
| store-detail-review-item | `item-detail-reviewer-user-icon` | — | ❌ JS selector 阻止（item-detail-reviewer-user-box 需要保留） |
| store-detail-review-item | `item-detail-reviewer-user-name` | — | ❌ 同上 |
| store-detail-review-item | `item-detail-reviewer-arrow` | — | ❌ JS selector (store-detail.js, item-detail.js) |
| store-detail-review-item | `item-detail-reviewer-content` | — | ❌ JS selector (store-detail.js, item-detail.js) |
| store-detail-review-item | `item-detail-review-tool-icon` | — | ❌ JS selector (store-detail.js, item-detail.js) |
| best-store-item | `store-item-icon` | `.store-item-user-box > img` | 安全（同 store-all-vertical-mobile-item） |
| best-store-item | `item-desc` | `.item-desc-box > p` | 安全 |
| best-store-item | `store-item-detail` | `.store-item-detail-box > p` | 安全 |

---

## 关键风险项

1. **store-detail-review-item 与 JS 耦合深** — `item-detail-reviewer-user-box`、`item-detail-reviewer-arrow`、`item-detail-reviewer-content`、`item-detail-review-tool-icon-yes`、`item-detail-review-tool-icon-no` 被 JS 直接 selector 引用。精简需同步修改 `js/detail/item-detail.js` 和 `js/detail/store-detail.js`。

2. **`card-item-img` 跨 4 组件** — 所有 `.search-card-content` 内唯一 img，统一改为 `.search-card-content img` 可行，但需确保无其他组件意外引入 img。

3. **`item-detail-review-content` 用 `:last-child`** — `.item-detail-review-box` 内包含 rating-score-only include 也产生 span，需确认 `:last-child` 精确指向 content span。

4. **`store-all-horizontal-mobile-meta-icon` 3 处 img 复用** — 不可单独移除 class，因为 brand/service/stock 各有一个 img，全部改为标签选择器需聚合 CSS 规则。
