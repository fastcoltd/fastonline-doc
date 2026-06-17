# 店铺 (Store) 类型组件深度分析报告

## 1. 组件文件与依赖关系总览

### 1.1 核心组件层级

```
best-store-item.html (核心 Vertical 组件)
  +-- item-like-button.html (子组件)
  +-- rating-with-count.html (子组件)

store-all-vertical-item-responsive.html (Vertical 响应式容器)
  +-- best-store-item.html (桌面端)
  +-- store-all-vertical-mobile-item.html (移动端)

store-all-horizontal-item-responsive.html (Horizontal 响应式容器)
  +-- store-all-horizontal-item.html (桌面端)
  +-- store-all-horizontal-mobile-item.html (移动端)

search-all-store-item.html (搜索页专用)
  +-- item-like-button.html
  +-- rating-with-count.html
  +-- store-all-horizontal-mobile-item.html (移动端降级)

index-best-store-item.html / index-best-store-item-liked.html (首页包装)
  +-- best-store-item.html (仅传递 like 状态)
```

### 1.2 文件路径

| 文件 | 路径 | 角色 |
|------|------|------|
| best-store-item.html | `components/best-store-item.html` | 核心 Vertical 组件 |
| store-all-vertical-item-responsive.html | `components/store-all-vertical-item-responsive.html` | Vertical 响应式容器 |
| store-all-vertical-mobile-item.html | `components/store-all-vertical-mobile-item.html` | Vertical 移动端变体 |
| store-all-horizontal-item-responsive.html | `components/store-all-horizontal-item-responsive.html` | Horizontal 响应式容器 |
| store-all-horizontal-item.html | `components/store-all-horizontal-item.html` | Horizontal 桌面端 |
| store-all-horizontal-mobile-item.html | `components/store-all-horizontal-mobile-item.html` | Horizontal 移动端 |
| search-all-store-item.html | `components/search-all-store-item.html` | 搜索页专用 |
| index-best-store-item.html | `partials/index-best-store-item.html` | 首页包装（未 liked） |
| index-best-store-item-liked.html | `partials/index-best-store-item-liked.html` | 首页包装（已 liked） |

---

## 2. 逐组件 DOM 结构对比

### 2.1 best-store-item.html -- 核心 Vertical

```
div.store-item.figma-best-store-item
  include: item-like-button.html            ← 参数: like, like_icon, aria_pressed
  div.store-item-user-box
    img.store-item-icon                     ← 硬编码 src
    div.store-item-name-box
      a href="store-detail.html?name=store-name"
        p.item-title                        ← 硬编码: "Store name"
      div.item-desc-box
        p.item-desc                         ← 硬编码
  div.store-item-content
    include: rating-with-count.html         ← 硬编码: score="4.3", recommend="(200)"
    div.store-item-detail-box
      p.store-item-detail                   ← 硬编码: 占位拉丁文
    div.store-item-brand-service-box
      div.item-brand-box
        p.item-brand-text                   ← 硬编码: "Brand："
        p.item-brand style="color: #FF1B20;" ← 硬编码: "Quora"
      div.item-service-box
        p.item-service-text                 ← 硬编码: "Service："
        p.item-service                      ← 硬编码: "Cloud Service"
  div.item-tag-box
    a.item-tag x3                           ← 全部硬编码
```

### 2.2 store-all-vertical-mobile-item.html

结构与 best-store-item.html **几乎完全一致**，仅额外 class `store-all-vertical-mobile-item-card`，数据完全相同。

### 2.3 store-all-horizontal-item.html

```
div.store-item.figma-store-horizontal-item
  include: item-like-button.html
  div.store-item-user-box
    img.store-item-icon
    div.store-item-name-box
      a href="store-detail.html?name=store-name"
        p.item-title
      div.item-desc-box
        p.item-desc
      include: rating-with-count.html       ← 硬编码: score="5.0", recommend="(62)" (值不同!)
  div.store-item-content
    div.store-item-detail-box
      p.store-item-detail                   ← 不同文本
    div.store-item-brand-service-box
      div.item-brand-box
        p.item-brand-text
        p.item-brand                        ← 无内联 color (差异)
      div.item-service-box
        ...
  div.item-tag-box
    a.item-tag x7                           ← 7个标签 (比Vertical多4个)
```

### 2.4 store-all-horizontal-mobile-item.html

**完全不同的结构**，使用 `<article>` 标签：

```
article.store-all-horizontal-mobile-item
  div.store-all-horizontal-mobile-card
    div.store-all-horizontal-mobile-top
      div.store-all-horizontal-mobile-avatar-box
        img
      div.store-all-horizontal-mobile-main
        div.store-all-horizontal-mobile-title-row
          span "AD"                         ← AD 标签 (vertical 没有!)
          a.store-all-horizontal-mobile-title
        p.store-all-horizontal-mobile-desc
    div.store-all-horizontal-mobile-meta
      include: rating-with-count.html       ← 硬编码: "5.0", "(62)"
      div.store-all-horizontal-mobile-brand
        img + span                          ← 带图标的 brand
      div.store-all-horizontal-mobile-service
        img + span
    div.item-tag-box
      a.item-tag x12                        ← 12个标签!
    include: item-like-button.html
```

### 2.5 search-all-store-item.html

**唯一全部参数化的组件**，但结构独立：

```
div.search-card.{{card_class}}.search-card-fourth-item-desktop
  div.item-title-wrapper
    div.search-store-title-group
      div.item-title {{item_title}}
      p.search-store-subtitle {{item_subtitle}}
    include: item-like-button.html
  div.search-card-content
    img.card-item-img src="{{image_src}}"
    div.card-content
      include: rating-with-count.html       ← 全部参数化
      div.best-items-item-middle-box.search-store-meta
        div.item-brand-box                  ← 全部参数化
        div.item-service-box
      p.summary-box2 {{summary_text}}
      div.item-tag-box {{item_tags}}
  div.status-badge style="{{status_badge_style}}"
    p {{status_text}}

--- 移动版 ---
div.search-card.search-card-fourth-item-mobile
  include: store-all-horizontal-mobile-item.html  ← 复用 horizontal mobile
```

---

## 3. 参数化程度对比

| 组件 | 参数化字段 | 硬编码字段 | 参数化率 |
|------|-----------|-----------|:---:|
| best-store-item.html | like, like_icon, aria_pressed (3) | 标题、描述、评分、推荐、品牌、服务、标签、头像 (10+) | ~20% |
| store-all-vertical-mobile-item.html | like, like_icon, aria_pressed (3) | 同上 | ~20% |
| store-all-horizontal-item.html | like, like_icon, aria_pressed (3) | 同上 + 标签数量不同 | ~20% |
| store-all-horizontal-mobile-item.html | like, like_icon, aria_pressed (3) | 同上 + AD文本 + 12个标签 | ~20% |
| **search-all-store-item.html** | **全部字段** | **无** | **100%** |

---

## 4. 页面引用追踪

### 4.1 index.html
```
@include index-best-store-item.html x5 (like=0)
@include index-best-store-item-liked.html x1 (like=1)
// 所有数据硬编码，不传业务参数
```

### 4.2 store-all.html
```
Vertical: @include store-all-vertical-item-responsive.html x8
Horizontal: @include store-all-horizontal-item-responsive.html x8
// 仅传 like 状态
```

### 4.3 tag-all.html
```
@include index-best-store-item.html x5
@include index-best-store-item-liked.html x1
@include store-all-horizontal-item.html x8
// 混合使用不同组件，所有数据硬编码
```

### 4.4 search-all.html
```
@include search-all-store-item.html (全部参数化传递)
// 移动端降级复用 store-all-horizontal-mobile-item.html
```

---

## 5. 主要问题

**问题1: 大量数据硬编码，SEO 灾难**
所有核心组件（除了 search-all）都把店铺数据写死在 HTML 中，搜索引擎看到的所有店铺内容完全相同。

**问题2: 组件版本之间数据不一致**
- rating: Vertical `4.3/(200)`, Horizontal `5.0/(62)`
- 详情文本: Vertical 2行, Horizontal 4行
- 标签数量: Vertical 3个, Horizontal 桌面7个/移动12个
- Brand 颜色: Vertical 有内联 `#FF1B20`, Horizontal 无

**问题3: 组件层级不统一**
- index.html: `index-best-store-item.html` (薄包装)
- store-all.html: `*-responsive.html` (响应式容器)
- tag-all.html: 混合使用两种
- search-all.html: 完全独立组件

**问题4: Horizontal mobile 结构完全独立**
使用 `<article>` 标签，有 AD 标签，brand/service 带图标，与 desktop 无关联。

**问题5: 布局切换导致 HTML 体积翻倍**
Vertical 和 Horizontal 各渲染一份数据，JS 切换显示，实际浪费带宽。

---

## 6. 统一方案

### 6.1 建议组件结构

```
store-item.html (统一组件，全部参数化)
  +-- item-like-button.html
  +-- rating-with-count.html

store-item-responsive.html (响应式容器)
  +-- store-item.html (一份HTML，CSS自适应)
```

### 6.2 统一参数格式（向 search-all-store-item.html 看齐）

```jsonc
{
  "store_title": "Quora Official Store",
  "store_desc": "Best services provider",
  "store_avatar": "image/store-avatar-1.png",
  "store_link": "store-detail.html?name=quora",
  "rating_score": "4.8",
  "rating_recommend": "(1.2k)",
  "brand_name": "Quora",
  "brand_color": "#FF1B20",
  "service_name": "Cloud Service",
  "store_detail": "Short description...",
  "like": "0",
  "like_icon": "image/Vector_nor.svg",
  "aria_pressed": "false",
  "store_tags": "<a class=\"item-tag\" ...>...</a>",
  "ad_tag": "AD",
  "extra_class": ""
}
```

### 6.3 修改清单

| 文件 | 操作 | 说明 |
|------|------|------|
| `best-store-item.html` | 重写 | 改为 store-item.html，全部参数化 |
| `store-all-vertical-item-responsive.html` | 合并 | 统一为一个 responsive 容器 |
| `store-all-vertical-mobile-item.html` | 删除/合并 | 通过 CSS 媒体查询处理 |
| `store-all-horizontal-item-responsive.html` | 合并 | 同上 |
| `store-all-horizontal-item.html` | 删除 | 合并到统一组件 |
| `store-all-horizontal-mobile-item.html` | 删除/合并 | 通过 CSS 处理 |
| `index-best-store-item.html` | 删除 | 直接传参数即可 |
| `index-best-store-item-liked.html` | 删除 | 直接传参数即可 |
| `search-all-store-item.html` | 保留或统一 | 搜索特有结构可保留 |
| `pages/index.html` | 修改引用 | 传递真实数据参数 |
| `pages/store-all.html` | 修改引用 | 传递真实数据参数 |
| `pages/tag-all.html` | 修改引用 | 统一使用同一组件 |
| `css/store.css` | 简化 | 移除独立样式 |
| `css/store.less` | 简化 | 同步修改 |

### 6.4 SEO 影响

- **改造前**：所有店铺显示相同硬编码文本，搜索引擎无法区分
- **改造后**：每个店铺有唯一 title、desc、brand、service，搜索引擎可正确索引
- **影响等级**：P0，对 SEO 有根本性正面影响
