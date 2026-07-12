# faq-list.html 选择器精简（评估结论：无可安全精简项，未改动代码）

- 日期：2026-07-12
- 任务：按 `rules/html_selector_simplification_rule.md`，对 faq-list.html 源码进行选择器精简
- 修改页面：faq-list.html
- 结论：**页面专属内联区无可安全精简项，未改动任何代码文件**（经用户确认按此收尾）。

## 评估过程

- `page-dropdown-label/select-text/icon` — 跨 2 页（faq-list + resource-all），非页面专属
- `page-dropdown-item` — 内联脚本 jQuery 事件 `$('.page-dropdown-item').on('click', ...)`，JS 钩子
- `page-search-icon` — 内联脚本 `$('.page-search-icon').on('click', ...)`，JS 钩子
- `page-filterresult-num/-text/-content` — 跨 8 页共享
- `faq-list-filter-sticky`/`faq-list-page-header-content`/`faq-list-result-row` — 容器 div，部分无 CSS 规则
- `title` — 通用类（31 页）
- `page-search-input` — `<input>`，不在规则语义标签清单
- 列表项 `brand-faq-item` 为 `@include` partial

## 校验
- 未改动源码/CSS/JS；工作区仅本记录 + TASKS.md 状态变更。
- 未调用 playwright。
