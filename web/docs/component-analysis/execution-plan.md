# 全局组件统一 - 逐页面替换执行文档

> 目标：同类型、同展示模式的 item 组件，全局只有一份，所有地方复用同一份组件。

---

## 基准组件（以 TASKS.md 任务描述为准）

| 类型 | Vertical 模式 | Horizontal 模式 | 文件路径 |
|------|:---:|:---:|------|
| 商品 | index Best items | item-all Horizontal | 见下方 |
| Campaign | index Hot campaigns | compaign-all Horizontal | 见下方 |
| 店铺 | index Best stores | store-all Horizontal | 见下方 |
| Posts | index Host posts | （仅一种） | 见下方 |
| Demands | index Popular demands | demand-all Horizontal | 见下方 |

### 各类型基准组件文件

```
商品 Vertical:   src/partials/components/item-card-vertical.html
商品 Horizontal: src/partials/components/item-all-horizontal-item-responsive.html
                  ├── src/partials/components/item-all-horizontal-item.html (desktop)
                  └── src/partials/components/item-all-horizontal-mobile-item.html (mobile)

Campaign Vertical:   src/partials/components/hot-compaign-item.html
Campaign Horizontal: src/partials/components/compaign-all-horizontal-item.html

店铺 Vertical:   src/partials/components/store-all-vertical-item-responsive.html
                  ├── src/partials/components/best-store-item.html (desktop)
                  └── src/partials/components/store-all-vertical-mobile-item.html (mobile)
店铺 Horizontal: src/partials/components/store-all-horizontal-item-responsive.html
                  ├── src/partials/components/store-all-horizontal-item.html (desktop)
                  └── src/partials/components/store-all-horizontal-mobile-item.html (mobile)

Posts: src/partials/components/post-shared-item.html

Demands: src/partials/components/demand-shared-item.html
Demands Horizontal (demand-all): src/partials/components/demand-all-figma-item.html
```

---

## 一、逐页面现状与替换方案

### 1. index.html（首页）

| 类型 | 当前组件 | 是否基准 | 操作 |
|------|---------|:---:|------|
| 商品 Vertical | `item-card-vertical.html`（通过 `index-best-items-section.html`） | ✅ | 无需改 |
| Campaign Vertical | `hot-compaign-item.html`（通过 `index-hot-compaign-item.html` / `index-hot-compaign-item-no-tags.html`） | ✅ | 无需改 |
| 店铺 Vertical | `best-store-item.html`（通过 `index-best-store-item.html` /  `index-best-store-item-liked.html`） | ⚠️ | **改用 `store-all-vertical-item-responsive.html`** |
| Posts | `post-shared-item.html`（通过 `index-host-post-item.html`） | ✅ | 无需改 |
| Demands Vertical | `demand-shared-item.html`（通过 3 个 variant） | ✅ | 无需改（P1优化：合并 variant） |

**店铺 Vertical 替换详情：**
- 行 181-194：将 `@include index-best-store-item.html` / `index-best-store-item-liked.html` → `@include store-all-vertical-item-responsive.html`
- 共 12 处 include

---

### 2. item-all.html（商品列表页）

| 类型 | 当前组件 | 是否基准 | 操作 |
|------|---------|:---:|------|
| 商品 Vertical | `item-card-vertical.html` | ✅ | 无需改 |
| 商品 Horizontal | `item-all-horizontal-item-responsive.html` | ✅ | 无需改（是基准） |

---

### 3. store-all.html（店铺列表页）

| 类型 | 当前组件 | 是否基准 | 操作 |
|------|---------|:---:|------|
| 店铺 Vertical | `store-all-vertical-item-responsive.html` | ✅ | 无需改（是基准） |
| 店铺 Horizontal | `store-all-horizontal-item-responsive.html` | ✅ | 无需改（是基准） |

---

### 4. compaign-all.html（Campaign 列表页）

| 类型 | 当前组件 | 是否基准 | 操作 |
|------|---------|:---:|------|
| Campaign Vertical | `hot-compaign-item.html`（通过 `index-hot-compaign-item.html`） | ✅ | 无需改 |
| Campaign Horizontal | `compaign-all-horizontal-item.html`（通过 `compaign-all-horizontal-item.html` 包装器） | ✅ | 无需改 |

---

### 5. demand-all.html（需求列表页）

| 类型 | 当前组件 | 是否基准 | 操作 |
|------|---------|:---:|------|
| Demands Vertical | `demand-shared-item.html`（通过 `demand-all-figma-item.html`） | ✅ | 无需改 |
| Demands Horizontal | `demand-all-horizontal-mobile-item.html`（通过 `demand-all-figma-item.html`） | ✅ | 无需改（是基准） |

---

### 6. post-all.html（文章列表页）

| 类型 | 当前组件 | 是否基准 | 操作 |
|------|---------|:---:|------|
| Posts | `post-shared-item.html` | ✅ | 无需改 |

---

### 7. tag-all.html（标签聚合页）

| 类型 | 当前组件 | 是否基准 | 操作 |
|------|---------|:---:|------|
| 商品 Vertical | `item-card-vertical.html` | ✅ | 无需改 |
| **商品 Horizontal Mobile** | `tag-all-mobile-horizontal-item.html` | ❌ | **改用 `item-all-horizontal-item-responsive.html`** |
| Campaign Vertical | `hot-compaign-item.html`（通过 `compaign-all-vertical-item.html`） | ✅ | 无需改 |
| Campaign Horizontal | `compaign-all-horizontal-item.html` | ✅ | 无需改 |
| 店铺 Vertical | `best-store-item.html`（通过 `index-best-store-item.html`） | ⚠️ | **改用 `store-all-vertical-item-responsive.html`** |
| **店铺 Horizontal** | `store-all-horizontal-item.html` | ❌ | **改用 `store-all-horizontal-item-responsive.html`** |
| Posts | `post-shared-item.html` | ✅ | 无需改 |

**商品 Horizontal 替换详情：** 行 105-109（5 处），`tag-all-mobile-horizontal-item.html` → `item-all-horizontal-item-responsive.html`
**店铺 Vertical 替换详情：** 行 113-116（4 处），`index-best-store-item.html` → `store-all-vertical-item-responsive.html`
**店铺 Horizontal 替换详情：** 行 123-130（8 处），`store-all-horizontal-item.html` → `store-all-horizontal-item-responsive.html`

---

### 8. search-all.html（搜索页）

| 类型 | 当前组件 | 是否基准 | 操作 |
|------|---------|:---:|------|
| 商品 Featured | `search-all-featured-item.html` | - | ⚠️ 保留独立（搜索特有：状态角标、浏览统计） |
| 商品 Horizontal Mobile | `search-all-item-horizontal-mobile-item.html` | ❌ | **改用 `item-all-horizontal-mobile-item.html`**（需确认差异） |
| Campaign | `search-all-campaign-item.html` | - | ⚠️ 保留独立（移动端已复用标准组件） |
| 店铺 | `search-all-store-item.html` | - | ⚠️ 保留独立（搜索特有结构） |
| Posts | `search-all-post-item.html` | - | ⚠️ 保留独立（移动端已复用标准组件） |
| Demands | `search-all-demand-item.html` | - | ⚠️ 保留独立（移动端已复用标准组件） |

**搜索页特殊处理说明：** 搜索页 Desktop 端有搜索特有 UI（状态角标 `status-badge`、浏览统计 `view-info-wrapper`、标题高亮），强行统一成本高且降低搜索页 UX。Mobile 端已经正确复用标准 Horizontal 组件，保持不变。

---

### 9. compaign-detail.html（Campaign 详情页）

| 类型 | 当前组件 | 是否基准 | 操作 |
|------|---------|:---:|------|
| Campaign Vertical | `hot-compaign-item.html`（通过 `compaign-all-vertical-item.html`） | ✅ | 无需改 |
| Campaign Horizontal | `compaign-all-horizontal-item.html`（通过包装器） | ✅ | 无需改 |
| 商品 Horizontal | `item-all-horizontal-item.html`（通过包装器） | ✅ | 无需改 |

---

### 10. item-detail.html（商品详情页）

| 类型 | 当前组件 | 是否基准 | 操作 |
|------|---------|:---:|------|
| 商品 Vertical | `item-card-vertical.html` | ✅ | 无需改 |

---

### 11. store-detail.html（店铺详情页）

| 类型 | 当前组件 | 是否基准 | 操作 |
|------|---------|:---:|------|
| 商品 Vertical | `item-card-vertical.html` | ✅ | 无需改 |

---

### 12. demand-detail.html（需求详情页）

| 类型 | 当前组件 | 是否基准 | 操作 |
|------|---------|:---:|------|
| 无标准列表组件 | `demand-detail-bidding-item.html`（bidding 条目，非列表卡片） | - | 无需改 |

---

### 13. post-detail.html（文章详情页）

| 类型 | 当前组件 | 是否基准 | 操作 |
|------|---------|:---:|------|
| 商品 Vertical | `item-card-vertical.html` | ✅ | 无需改 |

---

### 14. brand.html（品牌页）

| 类型 | 当前组件 | 是否基准 | 操作 |
|------|---------|:---:|------|
| 商品 Vertical | `item-card-vertical.html`（通过 `brand-hot-item-card.html`） | ✅ | 无需改 |
| Demands Vertical | `demand-shared-item.html`（复用 index variant） | ✅ | 无需改 |
| Posts | `post-shared-item.html`（桌面端用 variant，移动端直接用） | ✅ | 无需改（P1优化：移除双重渲染） |

---

### 15. blog.html（博客页）

| 类型 | 当前组件 | 是否基准 | 操作 |
|------|---------|:---:|------|
| Posts | `blog-post-item-v2.html` | ❌ | **需评估是否统一** |

**blog 替换分析：**
`blog-post-item-v2.html` 与 `post-shared-item.html` 差异：
- blog 有星级评分、阅读数、评论数、收入金额
- blog 有品牌图标+链接、"Read All" 按钮
- blog 无作者头像/名称、无 Kind 标签
- blog 使用 `<article>` + `<h3>`（语义化更好）

**建议：** 给 `post-shared-item.html` 增加可选参数来支持 blog 特有字段（评分、统计、Read All 链接），使 blog 能复用同一个组件。

---

### 16. attribute-all.html（属性列表页）

| 类型 | 当前组件 | 是否基准 | 操作 |
|------|---------|:---:|------|
| 商品 Vertical | `item-card-vertical.html` | ✅ | 无需改 |
| **商品 Horizontal Mobile** | `tag-all-mobile-horizontal-item.html` | ❌ | **改用 `item-all-horizontal-item-responsive.html`** |
| Demands | `demand-all-figma-items.html` | ✅ | 无需改 |

---

### 17. brand-all.html（品牌列表页）

| 类型 | 当前组件 | 是否基准 | 操作 |
|------|---------|:---:|------|
| 品牌 | `brand-all-item.html`（非 5 种标准类型） | - | 无需改 |

---

### 18. brand-service.html（品牌服务页）

| 类型 | 当前组件 | 是否基准 | 操作 |
|------|---------|:---:|------|
| 商品 Vertical | `item-card-vertical.html` | ✅ | 无需改 |
| 商品 Horizontal | `item-all-horizontal-item-responsive.html` | ✅ | 无需改 |

---

### 19. resource-all.html（资源列表页）

| 类型 | 当前组件 | 是否基准 | 操作 |
|------|---------|:---:|------|
| 资源 | `resource-all-item.html`（非 5 种标准类型） | - | 无需改 |

---

### 20. system-post-detail.html

| 类型 | 当前组件 | 是否基准 | 操作 |
|------|---------|:---:|------|
| 商品 Vertical | `item-card-vertical.html` | ✅ | 无需改 |

---

## 二、需要修改的汇总

### A 类：替换为基准组件（必须修改）

| # | 页面 | 类型/模式 | 当前组件 | 替换为 | 处数 |
|---|------|----------|---------|--------|:---:|
| A1 | **index.html** | 店铺 Vertical | `index-best-store-item.html` / `index-best-store-item-liked.html` | `store-all-vertical-item-responsive.html` | 12 |
| A2 | **tag-all.html** | 商品 Horizontal | `tag-all-mobile-horizontal-item.html` | `item-all-horizontal-item-responsive.html` | 5 |
| A3 | **tag-all.html** | 店铺 Vertical | `index-best-store-item.html` / `index-best-store-item-liked.html` | `store-all-vertical-item-responsive.html` | 4 |
| A4 | **tag-all.html** | 店铺 Horizontal | `store-all-horizontal-item.html` | `store-all-horizontal-item-responsive.html` | 8 |
| A5 | **attribute-all.html** | 商品 Horizontal | `tag-all-mobile-horizontal-item.html` | `item-all-horizontal-item-responsive.html` | 5 |

### B 类：组件改造以兼容新场景

| # | 组件 | 改造内容 |
|---|------|---------|
| B1 | `item-all-horizontal-item-responsive.html` / `item-all-horizontal-mobile-item.html` | 支持 tag-all 场景（原 `tag-all-mobile-horizontal-item.html` 的 like 按钮行内布局等特性） |
| B2 | `store-all-vertical-item-responsive.html` | 确认参数传递链，确保 index.html 调用的参数能正确透传 |

### C 类：blog 统一（需决策）

| # | 页面 | 当前组件 | 方案 |
|---|------|---------|------|
| C1 | blog.html | `blog-post-item-v2.html` | 方案一：给 `post-shared-item.html` 加可选参数支持 blog 特有字段；方案二：保留 blog 独立组件 |

### D 类：死代码清理（P1 优化）

| # | 文件 | 操作 |
|---|------|------|
| D1 | `index-best-store-item.html` | 替换后不再被引用，可删除 |
| D2 | `index-best-store-item-liked.html` | 替换后不再被引用，可删除 |
| D3 | `tag-all-mobile-horizontal-item.html` | 替换后不再被引用，可删除 |
| D4 | `index-host-post-item-normal-liked.html` | 需验证是否还被引用，如不引用则删除 |
| D5 | `index-host-post-item-red-liked.html` | 同上 |
| D6 | `index-host-post-item-red-unliked.html` | 同上 |
| D7 | `index-host-post-item-alt-unliked.html` | 同上 |
| D8 | `index-popular-demand-item-alt-unliked.html` | 可合并到 main variant + 参数 |
| D9 | `index-popular-demand-item-alt-liked.html` | 同上 |

### E 类：参数化硬编码数据（SEO 必须）

见表 E（另附）。

---

## 三、执行顺序

```
第 1 步：A4（tag-all 店铺 Horizontal → responsive）— 最简单，8 处替换
第 2 步：A3（tag-all 店铺 Vertical → responsive）— 4 处替换
第 3 步：A1（index 店铺 Vertical → responsive）— 12 处替换，影响面最大
第 4 步：A2（tag-all 商品 Horizontal → responsive）— 需配合 B1 组件改造
第 5 步：A5（attribute-all 商品 Horizontal → responsive）
第 6 步：C1（blog Posts 统一）— 需决策
第 7 步：D 类（死代码清理）
第 8 步：E 类（参数化硬编码）
```

---

## 四、CSS 注意事项

- 替换组件时，基准组件的 CSS class 保持不变（如 `item-all-horizontal-item-responsive`、`store-all-vertical-item-responsive`）
- 需要验证被替换页面是否有针对旧组件的特殊 CSS 覆盖，如有需要同步修改
- 所有 CSS 修改需同步到对应的 `.less` 文件
