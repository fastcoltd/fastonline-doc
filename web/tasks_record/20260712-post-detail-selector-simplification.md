# post-detail.html 选择器精简（评估结论：无可安全精简项，未改动代码）

- 日期：2026-07-12
- 任务：按 `rules/html_selector_simplification_rule.md`，对 post-detail.html 源码进行选择器精简
- 修改页面：post-detail.html
- 结论：**页面专属内联区无可安全精简项，未改动任何代码文件**（经用户确认按此收尾）。

## 评估过程

- `product-title` — 跨 3 页（post-detail / system-post-detail / service / resource-detail），非页面专属
- `product-breadcrumb` — 跨多页共享
- `content-section` / `section-title` / `section-content` — 跨 4–5 页（detail 页通用）
- `info-avatar-store-icon` / `meta-icon-image` / `article-paywall-*` / `unlock-icon` — 样式同时存在于 `post-detail.css` 与 `system-post-detail.css`，属于"结构性共享类"（两个 detail 页共用同名 CSS），非 post-detail 专属
- 所有 candidate 均为跨页或跨 css 共享 → 无一符合"页面专属可精简"条件

## 校验
- 未改动源码/CSS/JS；工作区仅本记录 + TASKS.md 状态变更。
- 未调用 playwright。
