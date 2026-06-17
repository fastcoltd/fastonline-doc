# 全局组件统一修改计划

## Context
项目中 5 种 item 类型（商品、Campaign、店铺、Posts、Demands）的组件存在重复定义、参数不一致、数据硬编码等问题。需要全局统一组件、参数化硬编码数据，以便后端替换数据用于 SEO。

## 修改原则
- 先 P0（参数化硬编码数据）→ P1（统一命名/删除死代码）→ P2（搜索页统一）→ P3（深层优化）
- 所有 CSS 修改同步到 .less
- 最小化修改，不影响已有功能
- 注意 PC 端和手机端兼容性

## 当前进度
- P0-1：item-card-vertical.html 组件已修改（`$325.00` → `{{item_price}}`，`52` → `{{item_stock}}`），**但引用方页面尚未更新参数**

---

## P0-1：item-card-vertical.html — 价格和库存参数化

**文件：** `src/partials/components/item-card-vertical.html`
**改什么：** `$325.00` → `{{item_price}}`，`52` → `{{item_stock}}`
**影响页面：** item-all.html（6处 include）、tag-all.html（需同步加参数）、index.html（通过 index-best-items-section.html）、brand.html（通过 brand-hot-item-card.html）
**风险：** 低（纯值替换，DOM/CSS 不变）
**状态：** 组件已改，引用方待更新

## P0-2：item-all-horizontal-item.html — 价格和库存参数化

**文件：** `src/partials/components/item-all-horizontal-item.html`
**改什么：** `$325.00` → `{{item_price}}`，`52` → `{{item_stock}}`
**影响文件：** item-all-horizontal-item-responsive.html（第2行 include 需传递新参数）
**风险：** 低

## P0-3：item-all-horizontal-mobile-item.html — 价格和库存参数化

**文件：** `src/partials/components/item-all-horizontal-mobile-item.html`
**改什么：** `$325.00` → `{{item_price}}`，`52` → `{{item_stock}}`
**影响文件：** item-all-horizontal-item-responsive.html（第3行 include 需传递新参数）
**风险：** 低

## P0-4：tag-all-mobile-horizontal-item.html — 价格和库存参数化

**文件：** `src/partials/components/tag-all-mobile-horizontal-item.html`
**改什么：** 价格和库存硬编码 → `{{item_price}}`、`{{item_stock}}`
**影响页面：** tag-all.html（5处 include 需添加新参数）
**风险：** 低

## P0-5：store-all-horizontal-item.html — 完全参数化（SEO 核心）

**文件：** `src/partials/components/store-all-horizontal-item.html`
**改什么（10项）：**
- `image/figma-best-store-avatar.png` → `{{store_avatar}}`
- `Store name` → `{{store_name}}`
- `Connecting Ideas...` → `{{store_subtitle}}`
- 评分 `5.0/(62)` → 通过 rating-with-count 参数传递
- 描述文本 → `{{store_description}}`
- `Quora` → `{{brand_name}}`
- `Cloud Service` → `{{service_name}}`
- 7个硬编码标签 → `{{item_tags}}`
- `store-detail.html?name=store-name` → `{{store_link}}`
**影响文件：** store-all-horizontal-item-responsive.html、store-all.html（8处）、tag-all.html（8处）
**风险：** 中（需确保参数传递链一致）

## P0-6：best-store-item.html — 完全参数化

**文件：** `src/partials/components/best-store-item.html`
**改什么：** 同 P0-5 模式，额外包括 `brand_color` 参数
**影响文件：** index-best-store-item.html、index-best-store-item-liked.html、store-all-vertical-item-responsive.html、index.html（12处）
**风险：** 中

## P0-7：store-all-horizontal-mobile-item.html — 完全参数化

**文件：** `src/partials/components/store-all-horizontal-mobile-item.html`
**改什么：** 13项替换，包括 avatar、AD标记、店名、描述、评分、品牌、服务、12个标签
**影响文件：** store-all-horizontal-item-responsive.html
**风险：** 中

## P0-8：store-all-vertical-mobile-item.html — 完全参数化

**文件：** `src/partials/components/store-all-vertical-mobile-item.html`
**改什么：** 同 P0-6 模式
**影响文件：** store-all-vertical-item-responsive.html
**风险：** 中

## P0-9：demand-all-horizontal-mobile-item.html — 标签参数化

**文件：** `src/partials/components/demand-all-horizontal-mobile-item.html`
**改什么：** 硬编码标签 → `{{tags_html}}`，硬编码 bidder → `{{bidders_html}}`
**影响文件：** demand-all-figma-items.html
**风险：** 低

## P0-10：demand-all-vertical-mobile-item.html — 标签参数化

**文件：** `src/partials/components/demand-all-vertical-mobile-item.html`
**改什么：** 同 P0-9
**影响文件：** demand-all-figma-items.html
**风险：** 低

---

## P1-1：Campaign 参数名统一 item_tags_block → item_tags

**文件：** `src/partials/components/hot-compaign-item.html`
**改什么：** `{{item_tags_block}}` → `<div class="item-tag-box">{{item_tags}}</div>`（组件内部封装标签容器）
**影响文件：** index-hot-compaign-item.html、compaign-all-vertical-item.html、index.html、compaign-all.html
**风险：** 中高（DOM 结构微调，需确认 CSS 兼容）

## P1-2：删除 Index 页面重复的 demand variant 文件

**删除：** `index-popular-demand-item-alt-unliked.html`、`index-popular-demand-item-alt-liked.html`
**保留：** `index-popular-demand-item-main-liked.html`
**修改：** index.html 中改用唯一文件 + 参数传递（root_class、like 状态）
**风险：** 低

## P1-3：删除 Index 页面重复的 post variant 文件

**需先验证是否被引用。** 如确认无引用，删除：
- `index-host-post-item-normal-liked.html`
- `index-host-post-item-alt-unliked.html`
- `index-host-post-item-red-liked.html`
- `index-host-post-item-red-unliked.html`
**风险：** 低

## P1-4：Blog post variant 合并

**保留：** `blog-post-item-v2.html`（核心组件）
**删除：** 2个重复 variant 文件
**修改：** blog.html 直接引用核心组件 + 参数
**风险：** 低

---

## P2：搜索页统一

- P2-1：是否将 `search-all-item-horizontal-mobile-item.html` 与标准组件统一（需进一步评估 DOM 差异）
- P2-2：确认 search-all-campaign-item 移动端已复用标准组件（已验证，无需修改）
- P2-3：确认 search-all-post-item 移动端已复用标准组件（已验证，无需修改）
- P2-4：确认 search-all-demand-item 移动端已复用标准组件（已验证，无需修改）

---

## P3：深层优化

- Cover 图片参数化（item-card-vertical、item-all-horizontal-item/mobile 的硬编码封面图）
- item-card-vertical 标签文本参数化（`Price：`、`In stock：`）
- CSS/LESS 同步检查

---

## 验证方式

1. 每个 P0 修改完成后 `node scripts/build-pages.js` 重新构建
2. Chrome DevTools 移动模拟器检查 item-all、store-all、index 页面
3. PC 端确认无回归
4. 确认所有 include 参数传递链一致
