# Campaign 类型组件深度分析报告

## 1. 组件文件全景

项目中共有 **3 个核心组件** 和 **4 个包装器**。

### 1.1 核心组件

| 文件 | 位置 | 布局模式 | CSS 标识类 | 用途 |
|------|------|----------|-----------|------|
| `hot-compaign-item.html` | `components/` | Vertical | `figma-hot-compaign-item` | 所有 Vertical 模式的核心 |
| `compaign-all-horizontal-item.html` | `components/` | Horizontal | `figma-compaign-horizontal-item` | 所有 Horizontal 模式的核心 |
| `search-all-campaign-item.html` | `components/` | Horizontal(自成一派) | `search-card-second-item` | 搜索页专用 |

### 1.2 包装器

| 文件 | 位置 | 引用核心组件 | 参数特点 |
|------|------|-------------|---------|
| `index-hot-compaign-item.html` | `partials/` | `hot-compaign-item.html` | 完整参数 + 有标签 |
| `index-hot-compaign-item-no-tags.html` | `partials/` | `hot-compaign-item.html` | 完整参数 + `item_tags_block=""` |
| `compaign-all-vertical-item.html` | `partials/` | `hot-compaign-item.html` | 同组参数，不同 label 文本 |
| `compaign-all-horizontal-item.html` | `partials/` | `components/compaign-all-horizontal-item.html` | 水平布局参数 |

---

## 2. DOM 结构对比

### 2.1 Vertical 核心组件 (`hot-compaign-item.html`)

```
div.compaign-item.figma-hot-compaign-item
  img.compaign-item-icon
  @include item-like-button.html  (like 按钮)
  div.compaign-item-content
    a.item-title-box > h4.item-title
    div.compaign-item-middle-box
      div.compaign-item-box
        div.compaign-item-brand-box
          div.compaign-item-brand-text
          div.compaign-item-brand
        div.compaign-item-brand-box
          div.compaign-item-brand-text
          div.compaign-item-brand
      div.compaign-item-box (同上结构, 第二组)
    div.compaign-item-products-box
      div.compaign-item-products-text
      p.compaign-item-products
    {{item_tags_block}}
```

**特点**: 统计信息分两列排列（items/sales 一列，orders/favorites 一列），使用嵌套的 `compaign-item-box` 和 `compaign-item-brand-box`。

### 2.2 Horizontal 核心组件 (`compaign-all-horizontal-item.html`)

```
div.compaign-item.figma-compaign-horizontal-item
  img.compaign-item-icon
  @include item-like-button.html  (like 按钮)
  div.compaign-item-content
    div.compaign-horizontal-head
      a.item-title-box
        span.compaign-item-ad-mark  (AD 标记)
        h4.item-title
    div.compaign-horizontal-stats
      p.compaign-horizontal-stat
        span.compaign-item-brand-text
        span.compaign-item-brand
      p.compaign-horizontal-stat (同上, 物流: sales)
      p.compaign-horizontal-stat (orders)
      p.compaign-horizontal-stat (favorites)
    div.compaign-item-products-box
      span.compaign-item-products-text
      p.compaign-item-products
    div.item-tag-box
      {{item_tags}}
```

**特点**: 统计信息一行排列（4 个 `<p>` 标签），有 `ad-mark` 广告标记，标题区域有 `compaign-horizontal-head` 包裹。

### 2.3 搜索页组件 (`search-all-campaign-item.html`)

```
div.search-card.card_class.search-card-second-item-desktop
  div.item-title-wrapper
    div.item-title-main
      div.item-mark (含 style 内联)
      div.item-title
    @include item-like-button.html
  div.search-card-content
    img.card-item-img
    div.card-content
      div.best-items-item-middle-box.search-campaign-stats
        div.item-stock-box
          p.item-stock-text
          p.item-stock
        ...(4 组 item-stock-box)
      p.search-campaign-products
        span.item-stock-text
        span.search-campaign-product-value
      div.item-tag-box
        {{item_tags}}
      div.view-info-wrapper
        span.view-info-item(view_count)
        span.view-info-item(comment_count)
        span.view-info-item(favorite_count)
  div.status-badge.status-badge1
    p {{status_text}}

--- 移动版 ---

div.search-card.card_class.search-card-second-item-mobile
  div.item-all-mobile-horizontal-page
    div.list-container-page-scoll
      div.layout-horizontal
        @include compaign-all-horizontal-item.html
```

**特点**: 结构完全不同，有 `item-mark` 标记、`status-badge` 角标、`view-info-wrapper` 浏览统计。移动版 desktop 版双结构，**移动版已复用 Horizontal 组件**。

---

## 3. CSS 样式差异

### 3.1 样式文件分布

| CSS 文件 | 作用域 |
|----------|--------|
| `css/compaign.css` / `compaign.less` | 通用 `.compaign-item` + `.figma-hot-compaign-item` + `.figma-compaign-horizontal-item` |
| `css/search-all.css` | `.search-card-second-item` 系列 |
| `css/detail/compaign-detail.css` | 详情页相关 |

### 3.2 核心差异

- 基础 `.compaign-item` 在 compaign.css 中，Vertical 和 Horizontal 共享此基类
- `.figma-hot-compaign-item` 在 `list-container-page-scoll` 上下文中生效
- `.figma-compaign-horizontal-item` 有独立的 `ad-mark`、`compaign-horizontal-stats`、`compaign-horizontal-stat` 样式
- `.search-card-second-item` 在 search-all.css 中，完全不同的样式体系

---

## 4. 参数对比

### 4.1 Vertical 组件参数

```
item_link, item_title
items_label, items_value
sales_label, sales_value
orders_label, orders_value
favorites_label, favorites_value
products_label, products_text
item_tags_block    - HTML 代码块(含外围标签结构), 可空
```

### 4.2 Horizontal 组件参数

```
like, like_icon, aria_pressed
item_link, ad_text, item_title
items_label, items_value
sales_label, sales_value
orders_label, orders_value
favorites_label, favorites_value
products_label, products_text
item_tags          - HTML 代码块(仅标签内部,不含外围容器)
```

### 4.3 搜索页组件参数

```
card_class, mark_style, mark_text, item_title
like_class, like, like_icon, like_alt, aria_label, aria_pressed
image_src, image_alt
items_label, items_value
sales_label, sales_value
orders_label, orders_value
favorites_label, favorites_value
products_label, products_value
item_tags
view_count, comment_count, favorite_count  (额外)
status_badge_style, status_text            (额外)
```

### 4.4 关键差异总结

| 参数 | Vertical | Horizontal | Search |
|------|----------|------------|--------|
| 广告标记 | 无 | `ad_text` | `mark_text` (通用) |
| 标签传递 | `item_tags_block` (含容器) | `item_tags` (仅标签) | `item_tags` (仅标签) |
| 浏览统计 | 无 | 无 | `view_count/comment_count/favorite_count` |
| 状态角标 | 无 | 无 | `status_badge_style/status_text` |
| 产品文本 | `products_text` | `products_text` | `products_value` |
| like 类名 | 硬编码 `icon-aixin` | 硬编码 `icon-aixin` | 可配置 `{{like_class}}` |

---

## 5. 页面引用追踪

```
index.html
  -> index-hot-compaign-item.html (有标签)
  -> index-hot-compaign-item-no-tags.html (无标签)

compaign-all.html
  -> (vertical) index-hot-compaign-item.html (8次)
  -> (horizontal) compaign-all-horizontal-item.html (7次)

tag-all.html
  -> (compaign tab vertical) compaign-all-vertical-item.html (7次)
  -> (compaign tab horizontal) components/compaign-all-horizontal-item.html (7次)

search-all.html
  -> search-all-campaign-item.html (1次)
     -> (mobile) include compaign-all-horizontal-item.html

compaign-detail.html
  -> (recommend) compaign-all-vertical-item.html (4次)
  -> (section-3) compaign-all-horizontal-item.html (1次)
```

---

## 6. 统一方案

### 6.1 Vertical 和 Horizontal 是否合为一个 responsive 组件？

**不建议。** 理由：
1. DOM 结构差异显著：Vertical 统计信息两列嵌套，Horizontal 一行排列
2. Horizontal 有 `ad-mark` 广告标记，Vertical 没有
3. 但可以统一核心参数命名（当前大部分已相同，只有 `item_tags_block` vs `item_tags` 不同）

### 6.2 Horizontal 模式统一

**已基本统一。** 所有场景都使用 `components/compaign-all-horizontal-item.html` 作为核心。搜索页移动版也已复用此组件。

### 6.3 search-all 独立组件处理

**推荐方案：保留独立组件，对齐命名规范。**

搜索页 Desktop 版的展示模式（状态角标、浏览统计、mark 标记）与列表页差异太大，强行合并会导致大量条件渲染。但可以：
- 将 `item-stock-text`/`item-stock` 重命名为 `compaign-item-brand-text`/`compaign-item-brand`
- 统一参数名 `products_value` -> `products_text`
- 给 like 按钮使用固定类名而非参数化类名

### 6.4 修改清单

**核心修改（统一参数名和标签传递方式）：**

| 文件 | 修改内容 |
|------|---------|
| `components/hot-compaign-item.html` | 将 `{{item_tags_block}}` 改为 `{{item_tags}}` |
| `components/compaign-all-horizontal-item.html` | 标签容器移到组件内部，统一为 Vertical 风格 |
| `components/search-all-campaign-item.html` | 参数名 `products_value` -> `products_text`，CSS 类名对齐 |
| `index-hot-compaign-item.html` | `item_tags_block` -> `item_tags` |
| `index-hot-compaign-item-no-tags.html` | `item_tags_block` -> `item_tags=""` |
| `compaign-all-vertical-item.html` | `item_tags_block` -> `item_tags` |
| `pages/index.html` | 修改调用参数 |
| `pages/compaign-all.html` | 修改调用参数 |
| `pages/tag-all.html` | 修改调用参数 |
| `css/compaign.css` | 调整 Vertical 体内标签容器选择器 |
| `css/search-all.css` | 搜索页 CSS 类重命名 |

**可选优化：**
- 消除不必要的包装器层级（页面直接引用核心组件）

### 6.5 统一参数格式

```json
{
  "like": "1",
  "like_icon": "image/Vector_sel.png",
  "aria_pressed": "true",
  "item_link": "compaign-detail.html?name=compaign-name",
  "ad_text": "AD",
  "item_title": "Campaign title",
  "items_label": "Items:",
  "items_value": "14",
  "sales_label": "Sales:",
  "sales_value": "5633",
  "orders_label": "Orders:",
  "orders_value": "122",
  "favorites_label": "Favorites:",
  "favorites_value": "155",
  "products_label": "Products:",
  "products_text": "Product list text...",
  "item_tags": "<a class=\"item-tag\" ...>...</a>"
}
```

### 6.6 SEO 影响

- ✅ 统一 DOM 结构有利于搜索引擎实体识别
- ✅ 减少重复代码，HTML 体积减小
- ⚠️ 图片缺少 alt 属性，建议参数化 `image_alt`

---

## 7. 总结

### 当前问题

1. **参数名不一致**：`item_tags_block` vs `item_tags`，`products_text` vs `products_value`
2. **标签传递方式不一致**：Vertical 要求调用者传递包含容器 div 的 HTML，Horizontal 只传递标签
3. **搜索页组件独立**：CSS 类名体系不同（`item-stock-*` vs `compaign-item-brand-*`）
4. **不必要的包装层级**：`compaign-all-horizontal-item.html`（包装器）只是透传参数

### 建议优先级

| 优先级 | 内容 |
|--------|------|
| **P0** | 统一参数名：`item_tags_block` -> `item_tags`，`products_value` -> `products_text` |
| **P1** | 统一标签传递方式：所有组件将标签容器内置 |
| **P1** | 统一 like 按钮类名 |
| **P2** | 对齐 CSS 命名：搜索页 `item-stock-text` -> `compaign-item-brand-text` |
| **P3** | 消除不必要的包装器 |
| **P3** | 添加图片 alt 参数 |
