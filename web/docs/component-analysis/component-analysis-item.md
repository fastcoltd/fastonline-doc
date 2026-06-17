# 商品（Item）类型组件深度分析报告

> 生成日期：2026-06-18
> 项目：fastresp-server-web（静态HTML，`<!-- @include -->` 组件系统）

---

## 目录

1. [组件文件清单](#1-组件文件清单)
2. [每个组件的 DOM 结构](#2-每个组件的-dom-结构)
3. [逐页引用追踪](#3-逐页引用追踪)
4. [CSS 样式分析](#4-css-样式分析)
5. [差异对比表](#5-差异对比表)
6. [统一方案](#6-统一方案)
7. [风险评估](#7-风险评估)

---

## 1. 组件文件清单

### 1.1 Vertical 组件

| 文件 | 路径 | 说明 |
|------|------|------|
| Vertical 卡片 | `src/partials/components/item-card-vertical.html` | 唯一 Vertical 组件，所有页面共享 |

### 1.2 Horizontal 组件

| 文件 | 路径 | 说明 |
|------|------|------|
| Responsive 包装器 | `src/partials/components/item-all-horizontal-item-responsive.html` | 按屏幕宽度分发到 desktop/mobile |
| Desktop 版 | `src/partials/components/item-all-horizontal-item.html` | 桌面端横排 |
| Mobile 版（标准） | `src/partials/components/item-all-horizontal-mobile-item.html` | 移动端横排标准版 |
| Tag 页专用 | `src/partials/components/tag-all-mobile-horizontal-item.html` | tag-all 页 mobile 横排（独立实现） |
| 搜索页专用 | `src/partials/components/search-all-item-horizontal-mobile-item.html` | search-all 页 mobile 横排（基于标准版改造） |

### 1.3 特色组件

| 文件 | 路径 | 说明 |
|------|------|------|
| 搜索页 Featured | `src/partials/components/search-all-featured-item.html` | search-all 页首条"推荐"（桌面端） |

### 1.4 包装器 / 中介

| 文件 | 路径 | 说明 |
|------|------|------|
| 首页 Best Items | `src/partials/index-best-items-section.html` | index.html 中引用 vertical 卡片的容器 |
| Brand Hot Item 卡片 | `src/partials/components/brand-hot-item-card.html` | 只有一行：调用了 `item-card-vertical.html` 并传参 |
| Brand Hot Items Section | `src/partials/components/brand-hot-items-section.html` | 品牌页 section 容器，包含多个 `brand-hot-item-card.html` |

### 1.5 子组件

| 文件 | 路径 | 说明 |
|------|------|------|
| 收藏按钮 | `src/partials/components/item-like-button.html` | 被所有组件（除 tag 版）引用 |
| 评分（PC） | `src/partials/components/rating-with-count.html` | 桌面端评分展示 |
| 评分（Mobile） | `src/partials/components/rating-with-count-mobile.html` | 移动端评分展示 |

---

## 2. 每个组件的 DOM 结构

### 2.1 Vertical: `item-card-vertical.html`

```
div.best-items-item.figma-best-item.{{item_card_extra_class}}
  img.best-items-item-icon
  <!-- item-like-button.html -->
    img.{{like_class}}[data-like="{{like}}"][aria-pressed="{{aria_pressed}}"]
  div.best-items-item-content
    div.item-title-box
      a.item-title.item-title-inline-flow[href="{{item_link}}"]
        span.item-mark[style="{{mark_style}}"]  {{mark_text}}
        span.item-title-text  {{item_title}}
    div.best-items-item-middle-box
      div.best-items-item-price-stock-box
        div.item-price-box
          p.item-price-text  Price：
          p.item-price  $325.00
        div.item-stock-box
          p.item-stock-text  In stock：
          img.item-stock-icon
          p.item-stock  52
      <!-- rating-with-count.html -->
        div.item-star-box.item-star-box-pc
          (... stars ...)
          p.item-star-score  {{rating_score}}
          p.item-star-recommend  {{rating_recommend}}
        <!-- rating-with-count-mobile.html (内嵌) -->
      div.item-brand-box
        p.item-brand-text  Brand：
        img.item-brand-icon
        p.item-brand[style="color: {{brand_color}}"]  {{brand_name}}
      div.item-service-box
        p.item-service-text  Service：
        img.item-service-icon
        p.item-service  {{service_name}}
      div.item-tag-box
        {{item_tags}}
    div.item-button-box.{{item_button_class}}
      BUY NOW
```

**参数列表：**

| 参数名 | 传递方式 | 备注 |
|--------|----------|------|
| `item_card_extra_class` | 直接 | 附加 CSS class |
| `like` | -> like-button | 是否已收藏 |
| `like_icon` | -> like-button | 收藏图标路径 |
| `aria_pressed` | -> like-button | 无障碍 |
| `mark_style` | 直接 | mark 标签样式 |
| `mark_text` | 直接 | mark 标签文本 |
| `item_link` | 直接 | 跳转链接 |
| `item_title` | 直接 | 标题 |
| `rating_score` | -> rating-with-count | 评分数值 |
| `rating_recommend` | -> rating-with-count | 推荐数 `(62)` |
| `brand_color` | 直接 | 品牌颜色 |
| `brand_name` | 直接 | 品牌名 |
| `service_name` | 直接 | 服务名 |
| `item_tags` | 直接 | HTML 标签组 |
| `item_button_class` | 直接 | 按钮附加类 |

**特点：** 唯一支持 `item_card_extra_class` 的组件，用于 brand 页追加 `brand-best-items-item`。

---

### 2.2 Responsive 包装器: `item-all-horizontal-item-responsive.html`

```
div.item-all-horizontal-item-responsive
  <!-- item-all-horizontal-item.html {"like":"{{like}}","like_icon":"{{like_icon}}",...} -->
  <!-- item-all-horizontal-mobile-item.html {"like":"0","like_icon":"image/Vector_nor.svg","aria_pressed":"false",...} -->
```

**说明：** 容器只是分发层，desktop 和 mobile 版本各一套实例。Mobile 版传参时 `like` / `like_icon` / `aria_pressed` 写死为默认值。

---

### 2.3 Desktop Horizontal: `item-all-horizontal-item.html`

```
article.item-all-horizontal-item
  img.item-all-horizontal-item-cover[src="image/best-item-cover.png"][alt="item cover"]
  div.item-all-horizontal-item-main
    div.item-all-horizontal-item-top
      div.item-title-box.item-all-horizontal-item-title-box
        div.item-mark[style="{{mark_style}}"]  {{mark_text}}
        a[href="{{item_link}}"].item-title  {{item_title}}
      div.item-all-horizontal-item-actions
        button.item-all-horizontal-buy-btn.{{item_button_class}}  BUY NOW
        <!-- item-like-button.html {"like_class":"item-all-horizontal-item-like",...} -->
    div.item-all-horizontal-item-row.item-all-horizontal-item-row-rating
      <!-- rating-with-count.html {"score":"{{rating_score}}","recommend":"{{rating_recommend}}"} -->
    div.item-all-horizontal-item-row.item-all-horizontal-item-row-meta
      div.item-brand-box
        p.item-brand-text  Brand：
        p.item-brand[style="color: {{brand_color}}"]  {{brand_name}}
      div.item-service-box
        p.item-service-text  Service：
        p.item-service  {{service_name}}
      div.item-price-box.item-all-horizontal-price-box
        p.item-price-text  Price：
        p.item-price  $325.00
      div.item-stock-box.item-all-horizontal-stock-box
        p.item-stock-text  In stock：
        p.item-stock  52
    div.item-tag-box.item-all-horizontal-item-tags
      {{item_tags}}
```

**参数列表：** 同 vertical 版但有简化——无 `item_card_extra_class`。

---

### 2.4 Mobile Horizontal（标准）: `item-all-horizontal-mobile-item.html`

```
article.item-all-horizontal-mobile-item
  div.item-all-horizontal-mobile-card
    div.item-all-horizontal-mobile-media
      img.item-all-horizontal-mobile-cover
      span.item-mark.item-all-horizontal-mobile-mark[style="{{mark_style}}"]  {{mark_text}}
    div.item-all-horizontal-mobile-main
      a[href="{{item_link}}"].item-all-horizontal-mobile-title  {{item_title}}
      div.item-all-horizontal-mobile-meta
        <!-- rating-with-count-mobile.html -->
        div.item-all-horizontal-mobile-brand
          img.item-all-horizontal-mobile-meta-icon
          span.item-all-horizontal-mobile-brand-text[style="color: {{brand_color}}"]  {{brand_name}}
        div.item-all-horizontal-mobile-service
          img.item-all-horizontal-mobile-meta-icon
          span.item-all-horizontal-mobile-service-text  {{service_name}}
        span.item-all-horizontal-mobile-price  $325.00
        div.item-all-horizontal-mobile-stock
          img.item-all-horizontal-mobile-meta-icon
          span.item-all-horizontal-mobile-stock-text  52
      button.item-all-horizontal-mobile-buy-btn.{{item_button_class}}  BUY NOW
  <!-- item-like-button.html {"like_class":"icon-aixin item-all-horizontal-mobile-like",...} -->
```

**与 desktop 版差异：**
- 使用 `rating-with-count-mobile.html` 而非 PC 版
- 不包含 tags 区域（无 `item-tag-box`）
- 元素使用 `item-all-horizontal-mobile-*` 前缀 class
- mark 放在 media 区而非 title 区

---

### 2.5 Tag 页专用 Mobile: `tag-all-mobile-horizontal-item.html`

```
article.tag-mobile-horizontal-item
  div.tag-mobile-horizontal-item-media
    img.tag-mobile-horizontal-item-cover
    div.tag-mobile-horizontal-item-mark[style="{{mark_style}}"]  {{mark_text}}
  div.tag-mobile-horizontal-item-main
    div.tag-mobile-horizontal-item-top
      a[href="{{item_link}}"].tag-mobile-horizontal-item-title  {{item_title}}
      img.tag-mobile-horizontal-item-like[src="{{like_icon}}"]  <!-- 直接 img，非 item-like-button -->
    div.tag-mobile-horizontal-item-rating
      img.tag-mobile-horizontal-item-star
      span.tag-mobile-horizontal-item-score  {{rating_score}}
      span.tag-mobile-horizontal-item-recommend  {{rating_recommend}}
      span.tag-mobile-horizontal-item-verified  B
      span.tag-mobile-horizontal-item-brand[style="color: {{brand_color}}"]  {{brand_name}}
    div.tag-mobile-horizontal-item-meta
      span.tag-mobile-horizontal-item-service  {{service_name}}
      span.tag-mobile-horizontal-item-price  $325.00
      span.tag-mobile-horizontal-item-stock  52
    button.tag-mobile-horizontal-item-buy-btn.{{item_button_class}}  BUY NOW
```

**与标准 Mobile 版的差异（重要）：**
1. **未使用 `item-like-button.html`** —— 收藏按钮是裸 `<img>`，无 `aria-pressed` 等无障碍属性
2. **未使用 `rating-with-count-mobile.html`** —— 评分是内联 HTML，不可复用
3. **没有 `item-tag-box`** —— 完全不渲染 tags
4. **有额外 `tag-mobile-horizontal-item-verified`** —— 验证标识 B（标准版没有）
5. **全部使用 `tag-mobile-horizontal-*` class 前缀** —— 独立的样式体系

---

### 2.6 搜索页专用 Mobile: `search-all-item-horizontal-mobile-item.html`

```
div.search-card.search-card-first-item.search-card-first-item-mobile
  article.item-all-horizontal-mobile-item.search-all-item-mobile-item
    div.item-all-horizontal-mobile-card
      div.item-all-horizontal-mobile-media
        img.item-all-horizontal-mobile-cover
        <!-- 此处无 mark -->
      div.item-all-horizontal-mobile-main
        a.search-all-item-mobile-title-row.item-all-horizontal-mobile-title
          span.item-mark.item-all-horizontal-mobile-mark[style="{{mark_style}}"]  {{mark_text}}
          span.search-all-item-mobile-title-text  {{item_title}}
        div.item-all-horizontal-mobile-meta
          <!-- rating-with-count-mobile.html -->
          ...（与标准 mobile 版相同结构）
        button.item-all-horizontal-mobile-buy-btn.{{item_button_class}}  BUY NOW
    <!-- item-like-button.html {"like_class":"icon-aixin item-all-horizontal-mobile-like",...} -->
```

**与标准 Mobile 版的差异：**
1. **外层包裹 `div.search-card`** —— 为搜索列表布局服务
2. **`mark` 移到了 title 行内** —— 作为 `span` 内联在 title a 标签内，而非放在 media 区
3. **title 结构更复杂** —— 使用 `span.search-all-item-mobile-title-text` 包裹文本
4. **使用 `item-like-button.html`** —— 正确复用子组件
5. **使用 `rating-with-count-mobile.html`** —— 正确复用子组件
6. **没有 `item-tag-box`** —— 不渲染 tags

---

### 2.7 搜索页 Featured: `search-all-featured-item.html`

```
div.search-card.{{card_class}}
  div.item-title-wrapper
    div.item-title-main
      div.item-mark[style="{{mark_style}}"]  {{mark_text}}
      div.item-title  {{item_title}}
    <!-- item-like-button.html -->
  div.search-card-content
    img.card-item-img[src="{{image_src}}"][alt="{{image_alt}}"]
    div.card-content
      <!-- rating-with-count.html -->
      div.best-items-item-middle-box
        div.item-brand-box
          p.item-brand-text  {{brand_label}}
          p.item-brand[style="color: {{brand_color}}"]  {{brand_name}}
        div.item-service-box
          p.item-service-text  {{service_label}}
          p.item-service  {{service_name}}
        div.item-price-box
          p.item-price-text  {{price_label}}
          p.item-price  {{price_value}}
        div.item-stock-box
          p.item-stock-text  {{stock_label}}
          p.item-stock  {{stock_value}}
      div.item-tag-box
        {{item_tags}}
      div.view-info-wrapper  <!-- 独有区域 -->
        span.view-info-item
          img.view-count
          span.count  {{view_count}}
        span.view-info-item
          i.icon-pinglun
          span.count  {{comment_count}}
        span.view-info-item
          img.like-count
          span.count  {{favorite_count}}
    div.buy-btn.item-buy-btn  {{buy_text}}
  div.status-badge.status-badge1[style="{{status_badge_style}}"]
    p  {{status_text}}
```

**参数列表（与其他组件差异巨大）：**

| 参数名 | 对应标准参数 | 说明 |
|--------|-------------|------|
| `card_class` | 无 | 搜索卡附加类 |
| `image_src` / `image_alt` | 无（标准版硬编码 src） | 图片可控 |
| `brand_label` / `service_label` / `price_label` / `stock_label` | 硬编码标签 | label 也参数化了 |
| `price_value` / `stock_value` | 硬编码 | 价格/库存值参数化 |
| `view_count` / `comment_count` / `favorite_count` | 无 | **独有**：浏览量、评论数、收藏数 |
| `buy_text` | 无 | 按钮文字参数化 |
| `status_badge_style` / `status_text` | 无 | **独有**：状态角标 |
| `like_class` / `like_alt` / `aria_label` | 硬编码 | 收藏按钮参数更完整 |

**核心差异：** 这是一个**完全不同的组件**，结构是搜索页特有的（标题栏 + 图片 + 内容区 + 操作区 + 状态角标），与其他 horizontal 卡片没有复用关系。

---

## 3. 逐页引用追踪

### 3.1 `index.html`（首页）

```
index.html
  └── @include ../partials/index-best-items-section.html
        └── .carousel-slide.best-items-pager.layout-vertical
              └── @include ./components/item-card-vertical.html  (×8 每slide)
              └── @include ./components/item-card-vertical.html  (×8 每slide)
```

- **Vertical 组件**: `item-card-vertical.html`，用于 Best Items 轮播
- **Horizontal 组件**: **无**
- **参数传递**: 完整传递所有参数，包含 `item_button_class` 为 `item-buy-btn disabled` 或 `item-buy-btn item-buy-btn-red index-best-item-buy-btn`

### 3.2 `item-all.html`（商品列表页）

```
item-all.html
  └── .layout-vertical  (垂直视图)
        └── @include ../partials/components/item-card-vertical.html  (×5)
  └── .layout-horizontal  (水平视图)
        └── @include ../partials/components/item-all-horizontal-item-responsive.html  (×5)
```

- **Vertical 组件**: `item-card-vertical.html` — 5 次调用
- **Horizontal 组件**: `item-all-horizontal-item-responsive.html` — 5 次调用（内部自动分发到 desktop + mobile）
- **参数传递**: 完整传递

### 3.3 `tag-all.html`（标签页）

```
tag-all.html
  └── #best-items-item  (items tab)
        └── .layout-vertical
              └── @include ../partials/components/item-card-vertical.html  (×8)
        └── .layout-horizontal  ← 注意：tag-all 将 horizontal 放在 layout-horizontal 容器内
              └── @include ../partials/components/tag-all-mobile-horizontal-item.html  (×5)
```

- **Vertical 组件**: `item-card-vertical.html` — 8 次调用
- **Horizontal 组件**: **`tag-all-mobile-horizontal-item.html`** — 5 次调用
- **不引用**: `item-all-horizontal-item-responsive.html` —— tag 页使用自己的独立实现
- **CSS 控制**: `tag-all.css` 中：
  - `#best-items-item .layout-vertical .tag-mobile-horizontal-item` → `display: none`
  - `#best-items-item .layout-horizontal .tag-mobile-horizontal-item` → 在 mobile 显示为 `display: flex`

### 3.4 `search-all.html`（搜索页）

```
search-all.html
  └── section.search-list-container
        └── @include ../partials/components/search-all-featured-item.html  (桌面端第一条)
        └── @include ../partials/components/search-all-item-horizontal-mobile-item.html  (移动端商品)
```

- **Featured 组件**: `search-all-featured-item.html` — 1 次调用（桌面端搜索首条）
- **Mobile 组件**: `search-all-item-horizontal-mobile-item.html` — 1 次调用（移动端商品条目）
- **不引用**: 任何标准 vertical/horizontal 组件
- **CSS 控制**: `search-all.css` 中：
  - 桌面端（>768px）: `.search-card.search-card-first-item-mobile` → `display: none`
  - 移动端（≤768px）: `.search-card.search-card-first-item-desktop` → `display: none`

### 3.5 `brand.html`（品牌页）

```
brand.html
  └── @include ../partials/components/brand-hot-items-section.html  (×5 个 section)
        └── .items-pager
              └── @include ./brand-hot-item-card.html  (×4 每 section)
                    └── @include ./item-card-vertical.html
```

- **Vertical 组件**: `item-card-vertical.html` — 通过 `brand-hot-item-card.html` 间接引用
- **包装器**: `brand-hot-item-card.html` 只有一行 `@include ./item-card-vertical.html {"item_card_extra_class":"brand-best-items-item",...}`
- **Horizontal 组件**: **无**
- **关键点**: brand 页将 vertical 卡片水平排列作为"hot items"，不提供 layout 切换

### 3.6 `compaign-detail.html`（活动详情页）

```
compaign-detail.html
  └── #section-2 .compaign-detail-horizontal-list
        └── @include ../partials/item-all-horizontal-item.html  (直接引用，无参数)
  └── #section-3 .compaign-detail-horizontal-list-compaign
        └── @include ../partials/compaign-all-horizontal-item.html  (compaign 组件，非 item)
  └── #section-5 .compaign-detail-horizontal-list
        └── @include ../partials/item-all-horizontal-item.html  (直接引用，无参数)
  └── #section-7 .layout-horizontal
        └── @include ../partials/item-all-horizontal-item.html  (×4，直接引用，无参数)
```

- **Horizontal 组件**: `item-all-horizontal-item.html` — **直接引用 desktop 版**，未通过 responsive 包装器
- **参数传递**: **无参数** —— 所有引用都是裸 `<!-- @include ../partials/item-all-horizontal-item.html -->`
- **Vertical 组件**: 使用 `compaign-all-vertical-item.html`（campaign 特有，非 item）
- **问题**: 直接引用 desktop 版会丢失 mobile 版本（整个页面无 mobile 回退）

### 3.7 `item-detail.html`（商品详情页）

```
item-detail.html
  └── #Similar Items .carousel-slide.best-items-pager.layout-vertical
        └── @include ../partials/components/item-card-vertical.html  (×8)
```

- **Vertical 组件**: `item-card-vertical.html` — 8 次调用，用于"Similar Items"推荐
- **Horizontal 组件**: **无**

---

### 引用汇总表

| 页面 | Vertical 组件 | Horizontal 组件 | 参数完整性 | 问题 |
|------|---------------|-----------------|-----------|------|
| index.html | item-card-vertical.html (×16) | - | 完整 | - |
| item-all.html | item-card-vertical.html (×5) | item-all-horizontal-item-responsive.html (×5) | 完整 | - |
| tag-all.html | item-card-vertical.html (×8) | **tag-all-mobile-horizontal-item.html** (×5) | 完整 | 使用独立组件 |
| search-all.html | - | **search-all-featured-item.html** + **search-all-item-horizontal-mobile-item.html** | 完整 | 使用独立组件 |
| brand.html | item-card-vertical.html (×20 via wrapper) | - | 完整 | - |
| compaign-detail.html | - | **item-all-horizontal-item.html** (裸引用) | **无参数** | 未通过 responsive wrapper，无 mobile |
| item-detail.html | item-card-vertical.html (×8) | - | 完整 | - |

---

## 4. CSS 样式分析

### 4.1 相关 CSS 文件

| CSS 文件 | 服务组件 |
|-----------|----------|
| `css/items.css` | `.best-items-item`（vertical 卡片在两种 layout 下的样式） |
| `css/item-all.css` | `.item-all-horizontal-item`, `.item-all-horizontal-mobile-item`, responsive 控制 |
| `css/tag-all.css` | `.tag-mobile-horizontal-item` 及其子元素, layout 显隐控制 |
| `css/search-all.css` | `.search-card`, `.search-card-first-item`, mobile 端适配 |
| `css/brand.css` | brand 相关样式 |
| `css/compaign.css` | .compaign-detail-horizontal-list 相关 |

### 4.2 关键样式差异

| 特性 | vertical (item-card-vertical) | desktop horizontal | mobile horizontal | tag mobile | search mobile |
|------|------|------|------|------|------|
| **base class** | `.best-items-item` | `.item-all-horizontal-item` | `.item-all-horizontal-mobile-item` | `.tag-mobile-horizontal-item` | `.search-all-item-mobile-item` |
| **background** | white | white | white | white | white（外层 search-card） |
| **border-radius** | 5rem | 5rem (mobile: 1.25rem) | 1.25rem | 1.25rem (tag-all.css 控制) | 1.25rem |
| **padding** | 2.5rem | 2.5rem (mobile: 0) | 0 (card padding) | 0 | 0 |
| **图片尺寸** | vert: 100%×26.5rem; horz: 36.5rem×23.5rem | 36.5rem×23.5rem | 14.125rem×13.875rem | 14.125rem×14.5rem | 同标准 mobile |
| **tags 区域** | 显示 | 显示（mobile: none） | 无 | 无 | 无 |
| **like button** | `.icon-aixin` | `.item-all-horizontal-item-like` | `.icon-aixin.item-all-horizontal-mobile-like` | 裸 img | `.icon-aixin.item-all-horizontal-mobile-like` |

---

## 5. 差异对比表

### 5.1 Horizontal 三/四个版本详细对比

| 对比维度 | **标准 Desktop** (item-all-horizontal-item) | **标准 Mobile** (item-all-horizontal-mobile-item) | **Tag Mobile** (tag-all-mobile-horizontal-item) | **Search Mobile** (search-all-item-horizontal-mobile-item) |
|----------|------|------|------|------|
| **外层标签** | `article` | `article` | `article` | `div.search-card > article` |
| **图片** | `img.item-all-horizontal-item-cover` | `img.item-all-horizontal-mobile-cover` | `img.tag-mobile-horizontal-item-cover` | `img.item-all-horizontal-mobile-cover` |
| **Mark 位置** | title 旁 | media 区覆盖 | media 区覆盖 | title 行内 |
| **标题** | `a.item-title` | `a.item-all-horizontal-mobile-title` | `a.tag-mobile-horizontal-item-title` | `a.search-all-item-mobile-title-row` (内含 title-text span) |
| **评分组件** | rating-with-count.html (PC) | rating-with-count-mobile.html | **内联** (img + span) | rating-with-count-mobile.html |
| **收藏按钮** | item-like-button.html | item-like-button.html | **裸 img** | item-like-button.html |
| **Brand** | `div.item-brand-box > p.item-brand` | `div.item-all-horizontal-mobile-brand > span` | `span` inline in rating | `div.item-all-horizontal-mobile-brand > span` |
| **Service** | `div.item-service-box > p` | `div.item-all-horizontal-mobile-service > span` | `span.tag-mobile-horizontal-item-service` | `div.item-all-horizontal-mobile-service > span` |
| **Price** | `div.item-price-box.item-all-horizontal-price-box > p` | `span.item-all-horizontal-mobile-price` | `span.tag-mobile-horizontal-item-price` | `span.item-all-horizontal-mobile-price` |
| **Stock** | `div.item-stock-box > p` | `div.item-all-horizontal-mobile-stock > span` | `span.tag-mobile-horizontal-item-stock` | `div.item-all-horizontal-mobile-stock > span` |
| **Tags** | `div.item-tag-box` | 无 | 无 | 无 |
| **按钮** | `button.item-all-horizontal-buy-btn` | `button.item-all-horizontal-mobile-buy-btn` | `button.tag-mobile-horizontal-item-buy-btn` | `button.item-all-horizontal-mobile-buy-btn` |
| **额外元素** | - | - | **Verified badge** `B` | - |
| **item_tags 参数** | 有 | **无** | **无** | **无** |
| **CSS 文件** | item-all.css | item-all.css | tag-all.css | search-all.css |

### 5.2 参数命名不一致问题

所有组件共享一组核心数据，但参数命名和传递方式存在差异：

| 数据含义 | Vertical | Horizontal Desktop | Horizontal Mobile | Tag Mobile | Search Featured |
|----------|----------|-------------------|-------------------|------------|----------------|
| 收藏状态 | `like` | `like` | `like` (写死 0) | `like` | `like` |
| 收藏图标 | `like_icon` | `like_icon` | `like_icon` (写死) | `like_icon` | `like_icon` |
| 品牌名称 | `brand_name` | `brand_name` | `brand_name` | `brand_name` | `brand_name` |
| 品牌标签 | 硬编码 "Brand：" | 硬编码 "Brand：" | 无 | 无 | **参数化**: `brand_label` |
| 价格值 | 硬编码 $325.00 | 硬编码 $325.00 | 硬编码 $325.00 | 硬编码 $325.00 | **参数化**: `price_value` |
| 价格标签 | 硬编码 "Price：" | 硬编码 "Price：" | 无 | 无 | **参数化**: `price_label` |
| 浏览量 | 无 | 无 | 无 | 无 | `view_count`（独有） |
| 评论数 | 无 | 无 | 无 | 无 | `comment_count`（独有） |
| 收藏数 | 无 | 无 | 无 | 无 | `favorite_count`（独有） |
| 状态角标 | 无 | 无 | 无 | 无 | `status_badge_style` / `status_text`（独有） |

### 5.3 SEO 影响分析

| 维度 | 现状 | 统一后 |
|------|------|--------|
| 组件复用 | Tag mobile 不共用，后端需维护多套模板 | 统一结构，后端只输出一套数据 |
| 语义标签 | tag 版无 `item-like-button` 的 `aria-pressed` | 统一后可提供完整无障碍支持 |
| 数据字段 | 不同组件接收不同字段名 | 统一参数名，后端子模板只改一个入口 |
| 维护成本 | 修改需要同步 4 处 | 只改 1 处 |

---

## 6. 统一方案

### 6.1 Horizontal 模式基准组件

**推荐使用 `item-all-horizontal-item-responsive.html` 作为统一包装器，其内部引用 `item-all-horizontal-item.html`（desktop）和 `item-all-horizontal-mobile-item.html`（mobile）。**

理由：
1. `responsive` 包装器已实现响应式分发逻辑
2. `item-all-horizontal-item.html` 和 `item-all-horizontal-mobile-item.html` 正确复用了子组件（rating-with-count, item-like-button）
3. 这两个组件有完备的 CSS 支持（在 `item-all.css` 中）
4. `tag-all-mobile-horizontal-item.html` 是早期独立开发的组件，功能是 `item-all-horizontal-mobile-item.html` 的子集（缺少 tags, 缺少子组件复用）

### 6.2 被替换组件的功能差异处理

#### 处理 `tag-all-mobile-horizontal-item.html` 的差异

| 差异项 | 处理方案 | 说明 |
|--------|----------|------|
| **Verified badge "B"** | 在标准 mobile 组件中**新增条件渲染** | 添加 `{{show_verified}}` 参数或通过 `item_tags` 传递验证徽标 |
| **裸 img 收藏按钮** | 替换为 `item-like-button.html` | tag 页必须使用标准子组件 |
| **内联评分** | 替换为 `rating-with-count-mobile.html` | 已存在且 tag-all.css 中有对应样式 |
| **无 tags** | 添加 `item-tag-box`（同标准 mobile） | tag-all.css 中已有 tags 样式 |
| **class 命名** | 从 `tag-mobile-horizontal-*` 改为 `item-all-horizontal-mobile-*` | tag-all.css 中对应样式迁移到 item-all.css |

#### 处理 `search-all-item-horizontal-mobile-item.html` 的差异

| 差异项 | 处理方案 | 说明 |
|--------|----------|------|
| **外层 div.search-card** | 保留 —— 这是搜索页布局需要，非组件内容 | 不应放入组件内部 |
| **Mark 在 title 行内** | 在标准 mobile 组件中**增加行内 mark 模式** | 添加 `{{mark_inline}}` 参数切换 mark 位置：media 覆盖 vs title 行内 |
| **title 结构** | 保持标准 mobile 版本不变 | search 版通过外层 CSS 覆盖 `.search-all-item-mobile-title-row` 和 `.search-all-item-mobile-title-text` 样式 |

#### 处理 `search-all-featured-item.html` 的差异

**此组件不应统一到标准 horizontal 组件中。** 它是搜索页独有的"推荐卡片"，具有：
- 独有的 `view-info-wrapper`（浏览量/评论数/收藏数）
- 独有的 `status-badge`（状态角标）
- 独有的 `buy-btn`（按钮位置不同）
- 独有的参数化 label 体系

**建议：** 保持该组件独立，但将其参数命名规范化（与标准组件保持一致）。

### 6.3 需修改的文件清单

#### 第一步：统一 Tag 页水平组件

| 文件 | 修改内容 |
|------|----------|
| `src/pages/tag-all.html` | 将 `@include ../partials/components/tag-all-mobile-horizontal-item.html` 替换为 `@include ../partials/components/item-all-horizontal-item-responsive.html` |
| `src/partials/components/tag-all-mobile-horizontal-item.html` | **废弃**（标记删除） |
| `css/tag-all.css` | 移除 `.tag-mobile-horizontal-item-*` 样式（约 50 行） |
| `css/item-all.css` | 若需要为 tag 页 horizontal 模式补充样式（如 verified badge），可在此添加 |

#### 第二步：统一 Search 页水平组件

| 文件 | 修改内容 |
|------|----------|
| `src/pages/search-all.html` | 将 `@include ../partials/components/search-all-item-horizontal-mobile-item.html` 替换为 `@include ../partials/components/item-all-horizontal-item-responsive.html`，并包裹必要的 `.search-card` div |
| `src/partials/components/search-all-item-horizontal-mobile-item.html` | **废弃**（标记删除） |
| `css/search-all.css` | 保留 `.search-card-first-item-mobile` 相关样式（用于外层布局）；移除 `.search-all-item-mobile-item`、`.search-all-item-mobile-title-row`、`.search-all-item-mobile-title-text` 相关样式 |

#### 第三步：修复 compaign-detail.html 的裸引用

| 文件 | 修改内容 |
|------|----------|
| `src/pages/compaign-detail.html` | 将裸 `@include ../partials/item-all-horizontal-item.html` 替换为 `@include ../partials/components/item-all-horizontal-item-responsive.html`，并填充必要参数 |

#### 第四步：标准化参数命名

| 文件 | 修改内容 |
|------|----------|
| `src/partials/components/search-all-featured-item.html` | 参数命名对齐：`price_value` → 硬编码变量占位符格式统一；`buy_text` 保持 |
| `src/partials/components/item-all-horizontal-item.html` | 将硬编码的 `Price：`、`In stock：` 等 text 参数化 |
| `src/partials/components/item-all-horizontal-mobile-item.html` | 增加 `item_tags` 支持 |

#### 第五步：增强标准 Mobile 组件

| 文件 | 修改内容 |
|------|----------|
| `src/partials/components/item-all-horizontal-mobile-item.html` | 1. 增加 `item_tags` 区域（有则显示）2. 增加 `{{show_verified}}` 条件渲染 verified badge 3. 增加 `{{mark_inline}}` 控制 mark 位置 |

### 6.4 统一参数格式（建议）

```
{
  // 通用
  "like": "0|1",
  "like_icon": "image/Vector_nor.svg",
  "aria_pressed": "false",
  
  // Mark
  "mark_style": "background: linear-gradient(...)",
  "mark_text": "HOT",
  "mark_inline": "false",  // 新增：mark 位置控制
  
  // 标题与链接
  "item_link": "item-detail.html?item_id=123",
  "item_title": "Items title",
  
  // 评分
  "rating_score": "5.0",
  "rating_recommend": "(62)",
  
  // 品牌
  "brand_color": "#06C70C",
  "brand_name": "Quora",
  
  // 服务
  "service_name": "Cloud Service",
  
  // 标签
  "item_tags": "<a class=\"item-tag\" ...>...</a>",
  
  // 按钮
  "item_button_class": "item-buy-btn",
  
  // 新增：可选扩展
  "show_verified": "false",
  "view_count": "",
  "comment_count": "",
  "favorite_count": ""
}
```

### 6.5 SEO 影响评估

**正面影响：**

1. **统一 DOM 结构**：后端模板引擎只需输出一套 HTML 结构，更方便配置 SSR 策略
2. **无障碍支持**：所有卡片正确使用 `aria-pressed`（通过 item-like-button 组件）
3. **语义化标签**：全部统一使用 `<article>` + `<button>` + `<a>` 的正确组合
4. **结构化数据**：统一结构后更便于注入 schema.org/LD+JSON

**风险点：**

1. tag 页和 search 页的 CSS 有大量特异性选择器（`#best-items-item .layout-horizontal .tag-mobile-horizontal-item`），替换后需确保样式正确迁移
2. compaign-detail.html 当前参数传空，统一后需要后端填充真实数据

---

## 7. 风险评估

| 风险项 | 影响面 | 可控度 | 缓解措施 |
|--------|--------|--------|----------|
| Tag 页 CSS 样式覆盖 | tag-all 页面 horizontal 布局 | 中 | 在 item-all.css 中复制迁移样式 |
| Search 页 search-card 额外包裹层 | search-all 页面布局 | 低（只需保留外层 wrapper） | search-card 保留在页面级而非组件级 |
| Compaign-detail 传参 | 页面显示空数据 | 高 | 补充参数或后端确保默认值 |
| 回归测试 | 7 个页面 | 中 | 逐页截图对比 |
| Desktop/Mobile 响应式断点 | 所有页面 | 中 | 统一使用 768px 断点（已一致） |

---

## 结论

1. **Vertical 组件**（`item-card-vertical.html`）已是全局唯一的，无需改动。
2. **Horizontal 组件**存在 4 个版本，应精简为 1 个响应式方案（responsive wrapper + desktop + mobile），废弃 `tag-all-mobile-horizontal-item.html` 和 `search-all-item-horizontal-mobile-item.html`。
3. `search-all-featured-item.html` 是搜索页特有组件，保持独立。
4. `compaign-detail.html` 中的裸引用需修复——通过 responsive wrapper 并补全参数。
5. 标准 mobile 组件需增强以支持：tags 显示、verified badge、mark 位置切换。
6. 统一后，后端只需维护一套参数格式，所有页面共用。
