# Posts 类型组件深度分析报告

## 1. 文件清单与职责

### 1.1 标准 Post 组件（体系 A）

| 文件 | 路径 | 角色 |
|------|------|------|
| `post-shared-item.html` | `components/post-shared-item.html` | 核心组件 |
| `index-host-post-item.html` | `partials/index-host-post-item.html` | 参数透传包装 |
| `index-host-post-item-normal-liked.html` | `partials/` | 变体：normal + liked |
| `index-host-post-item-red-liked.html` | `partials/` | 变体：red + liked |
| `index-host-post-item-red-unliked.html` | `partials/` | 变体：red + unliked |
| `index-host-post-item-alt-unliked.html` | `partials/` | 变体：alt + unliked |

### 1.2 Blog Post 组件（体系 B）

| 文件 | 路径 | 角色 |
|------|------|------|
| `blog-post-item-v2.html` | `components/blog-post-item-v2.html` | 核心组件 |
| `blog-post-item-v2-normal-liked.html` | `partials/` | 变体：normal + liked |
| `blog-post-item-v2-alt-unliked.html` | `partials/` | 变体：alt + unliked |
| `blog-post-item-v2-red-liked.html` | `partials/` | 变体：red + liked |

### 1.3 搜索页

| 文件 | 路径 | 角色 |
|------|------|------|
| `search-all-post-item.html` | `components/search-all-post-item.html` | 桌面端独立布局，移动端复用 post-shared-item |

---

## 2. DOM 结构逐层对比

### 2.1 post-shared-item.html（体系 A）

```
div.post-item.{{post_item_extra_class}}
  img.post-item-icon                     ← 封面图（无 alt）
  img.icon-aixin                         ← include item-like-button.html
  div.post-item-content
    a.item-title-box > p.item-title      ← 标题（p 标签）
    div.post-item-user-box
      img.post-item-user-avatar          ← 作者头像
      p.post-item-user-name              ← 作者名
    div.item-desc-box > p.item-desc      ← 描述
    div.item-brand-box
      p.item-brand-text                  ← "Brand："
      p.item-brand                       ← 品牌名
    div.post-item-kind-box
      p.post-item-kind-text              ← "Kind："
      {{item_tags}}                      ← HTML 标签列表
```

### 2.2 blog-post-item-v2.html（体系 B）

```
article.blog-post-item-v2.{{card_extra_class}}
  img.blog-post-item-v2-cover            ← 封面图（有 alt）
  img.icon-aixin                         ← include item-like-button.html
  div.blog-post-item-v2-content
    a > h3.blog-post-item-v2-title       ← 标题（h3，SEO 友好）
    p.blog-post-item-v2-desc             ← 描述
    div.blog-post-item-v2-meta-row
      a.blog-post-item-v2-brand          ← 品牌链接
        img.blog-post-item-v2-brand-icon ← 品牌图标
        span.blog-post-item-v2-brand-name
      div.blog-post-item-v2-stats-wrap
        div.blog-post-item-v2-rate       ← 星级评分
        div.blog-post-item-v2-attr       ← Reads
        div.blog-post-item-v2-attr       ← Comments
        div.blog-post-item-v2-attr       ← Paid
    div.blog-post-item-v2-footer-row
      div.blog-post-item-v2-tags         ← 标签（span 无链接）
      a.blog-post-item-v2-read-all       ← "Read All" 链接
```

### 2.3 关键 DOM 差异

| 方面 | 体系 A | 体系 B |
|------|--------|--------|
| 外层标签 | `<div>` | `<article>`（语义化） |
| 标题标签 | `<p>` | `<h3>`（SEO 更好） |
| 封面图 alt | 无 | 有 |
| 作者信息 | 有 avatar + name | 无 |
| Brand 展示 | 纯文字 | 可点击链接 + 图标 |
| 标签列表 | `<a>` 带链接 | `<span>` 无链接 |
| 底部链接 | 无 | "Read All" |
| 评分系统 | 无 | 星级评分 + 分数 |
| 统计信息 | 无 | Reads / Comments / Paid |
| Kind 标签 | 有 "Kind：" | 无 |

---

## 3. 参数对比

### 3.1 体系 A 参数（14个）

```
post_item_extra_class, cover_image, like, like_icon, aria_pressed
item_link, item_title, user_avatar, user_name, item_desc
brand_label, brand_style_attr, brand_name, kind_label, item_tags
```

### 3.2 体系 B 参数（16个）

```
card_extra_class, cover_image, cover_alt, like, like_icon, aria_pressed
item_link, item_title, item_desc, brand_link, brand_icon, brand_alt
brand_name, score_text, reads, comments, paid, item_tags
```

### 3.3 交叉对比

| 功能 | 体系 A | 体系 B |
|------|--------|--------|
| 容器类 | `post_item_extra_class` | `card_extra_class` |
| 封面 alt | **无** | `cover_alt` |
| 作者信息 | `user_avatar`, `user_name` | **无** |
| Brand 前缀 | `brand_label` | 硬编码无前缀 |
| Brand 样式 | `brand_style_attr` | 无 |
| Brand 链接 | 无 | `brand_link` |
| Brand 图标 | 无 | `brand_icon`, `brand_alt` |
| Kind 标签 | `kind_label` | 无 |
| 星级评分 | 无 | `score_text` |
| 阅读/评论/收入 | 无 | `reads`, `comments`, `paid` |
| 标签 | `item_tags` | `item_tags` |

---

## 4. 页面引用追踪

### 4.1 index.html
通过 5 个 variant 包装文件引用 `post-shared-item.html`，参数在 include 行硬编码。

### 4.2 post-all.html
直接引用 `post-shared-item.html`，包含 `post-all-featured-item` 特色项。

### 4.3 brand.html
通过 `brand-hot-posts-section.html` 间接使用，**桌面端用 variant 文件、移动端直接引用 post-shared-item**，CSS 与 index.css 重复。

### 4.4 tag-all.html
直接引用 `post-shared-item.html`，4 个完全相同参数。

### 4.5 blog.html
通过 3 个 variant 文件引用 `blog-post-item-v2.html`。

### 4.6 search-all.html
直接引用 `search-all-post-item.html`，桌面端独立布局，移动端复用 `post-shared-item.html`。

---

## 5. CSS 差异

| 属性 | post-shared-item | blog-post-item-v2 |
|------|-----------------|-------------------|
| 容器标签 | `.post-item` | `.blog-post-item-v2` |
| 容器圆角 | PC: 5rem / Mobile: 1.25rem | 1.5rem |
| 封面尺寸 | 43.5rem x 31.25rem (PC) | 27.5rem x 22.25rem (PC) |
| 标题字体 | 3.5rem / 500 / Poppins | 2.5rem / 500 / Poppins |
| 标签样式 | `item-tag` 带链接边框 | `blog-post-item-v2-tag` 圆角边框 |

另外 `detail/brand.css` 第 214-278 行**几乎完全复制**了 `index.css` 中 `#hot-posts .figma-hot-post-item*` 样式。

---

## 6. 统一方案

### 6.1 blog-post-item-v2 是否可以基于 post-shared-item 扩展？

**短期内不建议完全统一。** 理由：
1. DOM 结构差异过大（评分、统计行、Read All 链接在体系 A 中不存在）
2. CSS 命名空间体系完全不同
3. HTML 语义层级不同（`<article>`+`<h3>` vs `<div>`+`<p>`）

**但可以通过增加可选参数来统一：**

| 新增参数 | 默认值 | 说明 |
|----------|--------|------|
| `cover_alt` | `""` | 封面图 alt |
| `enable_rating` | `"false"` | 评分区域 |
| `score_text` | `""` | 评分文字 |
| `enable_stats` | `"false"` | 统计行 |
| `reads` | `""` | 阅读数 |
| `comments` | `""` | 评论数 |
| `paid` | `""` | 收入金额 |
| `brand_link` | `""` | 品牌链接 |
| `brand_icon` | `""` | 品牌图标 |
| `enable_read_all` | `"false"` | Read All 链接 |

**代价**：`post-shared-item.html` 从 24 行膨胀到 80-100 行，含大量条件分支。

### 6.2 search-all-post-item.html

**保持独立。** 桌面端有搜索结果特殊展示需求（标题高亮、角标），不应统一。移动端已正确复用 `post-shared-item.html`。

### 6.3 Index 页面的 5 个 variant 文件

**可以大幅简化。** 5 个文件的核心差异仅 3 个维度（变体类型 × 收藏状态）。

建议在 `index.html` 中直接引用 `post-shared-item.html` 并传递完整参数，删除 4 个重复 variant 文件。

### 6.4 修改清单

**核心组件：**
- `post-shared-item.html`：增加可选参数支持（rating、stats、brand_link 等）

**页面层：**
- `pages/index.html`：直接引用 post-shared-item，删除 variant 中间层
- `pages/blog.html`：根据统一结果保留或改为 post-shared-item
- `pages/search-all.html`：标准化参数名前缀

**可删除的中间层文件：**
- `index-host-post-item-normal-liked.html`
- `index-host-post-item-red-liked.html`
- `index-host-post-item-red-unliked.html`
- `index-host-post-item-alt-unliked.html`
- `blog-post-item-v2-normal-liked.html`
- `blog-post-item-v2-alt-unliked.html`
- `blog-post-item-v2-red-liked.html`

**其他组件：**
- `brand-hot-posts-section.html`：移除双重渲染，统一为 post-shared-item
- `search-all-post-item.html`：参数名标准化

**CSS：**
- `detail/brand.css`：移除与 index.css 重复的样式
- `index.css`：保留 index 专属变体样式
- `post.css`：基础样式保持不变

### 6.5 SEO 影响

- ✅ 使用 `<article>` + `<h3>` 提升语义化
- ✅ 封面图增加 alt 属性提升图片 SEO
- ✅ 减少代码重复，DOM 结构更一致
- ✅ Brand 链接增加内链
- ⚠️ 统一 CSS 命名空间需后端同步更新
