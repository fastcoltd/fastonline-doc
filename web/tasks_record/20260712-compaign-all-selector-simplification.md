# compaign-all.html 选择器精简（评估结论：无可安全精简项，未改动代码）

- 日期：2026-07-12
- 任务：按 `rules/html_selector_simplification_rule.md`，对 compaign-all.html 源码进行选择器精简
- 修改页面：compaign-all.html
- 结论：**页面专属内联区无可安全精简项，未改动任何代码文件**（经用户确认按此收尾）。

## 评估过程

页面专属内联区只有 sticky 筛选/排序栏，其内容全部是**跨页共享类**：
- 外层 wrapper 为 `item-all-filter-layoutcontrol-box`（5 个页面共享，非 compaign 专属）
- 内含 `page-filter-icon` / `page-filter-num` / `page-filterresult-num/-text/-content` / `layout-switch` 均为共享类
- `compaign.css` 相关规则挂在共享 wrapper 下（`.item-all-filter-layoutcontrol-box .page-filterresult-box` 等），对 5 页生效
- 内联区无任何 `compaign-*` 专属前缀类

与 attribute-all 的差异：attribute-all 筛选栏外层是其专属的 `.attribute-header-function-box`，可在该作用域下把 `page-filterresult-*` 转 data-attr（页面级）；compaign-all 用共享 `item-all-filter-layoutcontrol-box`，无专属作用域，硬转会波及 5 页 → 保留。

列表项（`index-hot-compaign-item`、`compaign-all-horizontal-item`）为 `@include` partial（后者含 compaignpage.js 模板耦合，属 P3）。

## 校验
- 未改动源码/CSS/JS；工作区仅本记录 + TASKS.md 状态变更。
- 未调用 playwright。
