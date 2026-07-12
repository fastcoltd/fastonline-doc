# brand-all.html 选择器精简（评估结论：无可安全精简项，未改动代码）

- 日期：2026-07-12
- 任务：按 `rules/html_selector_simplification_rule.md`，对 brand-all.html 源码进行选择器精简
- 修改页面：brand-all.html
- 结论：**页面专属内联区无可安全精简项，未改动任何代码文件**（经用户确认按此收尾）。

## 评估过程

brand-all.html 页面专属内联内容只有 A–Z 索引区：
```
.brand-all-page.page-content
  .brand-page-index-box.page-fix-box
    <span class="brand-page-index-box-item [active]" id="A..Z">...</span> × 26
  .brand-page-list-container
    @include brand-all-section-a..g（partial，非本页任务）
```

### 唯一候选 `brand-page-index-box-item`（span）→ 保留（JS 钩子）
- `js/link.js` 的 `LinkRef` 内部 `document.querySelectorAll('.' + linkId)`——必须传**类名**（自动加 `.`）。
- `LinkRef` 是全站锚点导航组件，被 **8 处**调用：brandpage / brand / item-detail / store-detail / post-detail / system-post-detail / service / resource-detail。
- `js/brandpage.js` 另有 `querySelectorAll('.brand-page-index-box-item')` + `classList.add('active')`。
- 精简需改共享 `link.js` 的 LinkRef API，波及 8 个页面的锚点导航，风险高且无法运行时验证 → 按规则 §4（JS 行为钩子）**保留**。

### 其余
- 容器类 `brand-all-page` / `brand-page-index-box` / `page-fix-box` / `brand-page-list-container` / `page-top-sticky` 均为 `<div>`，非规则清单内的语义标签叶子 → 不适用。
- A–Z 区块为 `@include` partial（`brand-all-section-*`，其中 `brand-page-list-text` 已在此前 P1 精简）。

## 校验
- 未改动源码/CSS/JS；工作区仅本记录 + TASKS.md 状态变更。
- 未调用 playwright。
