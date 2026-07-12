# resource-all.html 选择器精简（评估结论：无可安全精简项，未改动代码）

- 日期：2026-07-12
- 任务：按 `rules/html_selector_simplification_rule.md`，对 resource-all.html 源码进行选择器精简
- 修改页面：resource-all.html
- 结论：**页面专属内联区无可安全精简项，未改动任何代码文件**（经用户确认按此收尾）。

## 评估过程

- `page-dropdown-*` — 跨 2 页（resource-all + faq-list），非页面专属
- `page-dropdown-item` / `page-search-icon` — 内联脚本 JS 钩子
- `page-home-breadcrumb-*`（icon/text/seperator/current）— 样式在 `page.css`（跨页共享 CSS），非页面专属
- `resource-page-*` — 容器 div，非语义标签叶子
- 列表项 `resource-all-item` 为 `@include` partial（此前 P1 已精简）

## 校验
- 未改动源码/CSS/JS；工作区仅本记录 + TASKS.md 状态变更。
- 未调用 playwright。
