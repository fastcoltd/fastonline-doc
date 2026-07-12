# demand-all.html 选择器精简（评估结论：无可安全精简项，未改动代码）

- 日期：2026-07-12
- 任务：按 `rules/html_selector_simplification_rule.md`，对 demand-all.html 源码进行选择器精简
- 修改页面：demand-all.html
- 结论：**页面专属内联区无可安全精简项，未改动任何代码文件**（经用户确认按此收尾）。

## 评估过程

页面专属内联区与 compaign-all.html 完全一致：只有 sticky 筛选/排序栏。
- 外层 wrapper `item-all-filter-layoutcontrol-box`（5 页共享，且被 JS `classList.add`）
- 内含 `page-filter-icon` / `page-filter-num` / `page-filterresult-num/-text/-content` / `layout-switch` 均为共享类
- 唯一 demand 前缀类 `demand-all-figma-container` 是 `<div>` 容器（非规则清单内的语义标签叶子）
- 列表项（`demand-all-figma-items` 等）为 `@include` partial

无 demand 专属作用域可挂 data-attr；硬转共享筛选类会波及 5 页 → 保留。

## 校验
- 未改动源码/CSS/JS；工作区仅本记录 + TASKS.md 状态变更。
- 未调用 playwright。
