# item-all.html 选择器精简（评估结论：无可安全精简项，未改动代码）

- 日期：2026-07-12
- 任务：按 `rules/html_selector_simplification_rule.md`，对 item-all.html 源码进行选择器精简
- 修改页面：item-all.html
- 结论：**页面专属内联区无可安全精简项，未改动任何代码文件**（经用户确认按此收尾）。

## 评估过程

页面专属内联区仅 sticky 筛选/排序栏（与 brand-service/compaign-all/demand-all 完全一致）：
- 外层 wrapper `item-all-filter-layoutcontrol-box`（5 页共享）
- 内含 `page-filter-icon` / `page-filter-num` / `page-filterresult-num/-text/-content` / `layout-switch` 均为共享类
- 无 item-all 页面专属前缀语义叶子类
- 列表项（`item-card-vertical`、`item-all-horizontal-item-responsive`）为 `@include` partial

## 校验
- 未改动源码/CSS/JS；工作区仅本记录 + TASKS.md 状态变更。
- 未调用 playwright。
