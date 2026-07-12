# compaign-detail.html 选择器精简

- 日期：2026-07-12
- 任务：按 `rules/html_selector_simplification_rule.md`，对 compaign-detail.html 源码进行选择器精简
- 修改页面：compaign-detail.html

## 改动摘要

### HTML（src/pages/compaign-detail.html）去 4 类
- `compaign-detail-summary-desc`（p，1）
- `compaign-detail-summary-stat`（p，5）
- `compaign-detail-copy-text`（p，4）
- `compaign-detail-recommend-title`（h2，1）

### CSS + LESS（css/detail/compaign-detail.css + .less，含 @media）
- `.compaign-detail-summary-desc` → `.compaign-detail-summary > p`
- `.compaign-detail-summary-stat`（含 `.label`/`.value` 子规则）→ `.compaign-detail-summary-stats p`（`.compaign-detail-summary-stats p .label` / `.value`）
- `.compaign-detail-copy-text` → `.compaign-detail-copy-block p`
- `.compaign-detail-recommend-title` → `.compaign-detail-recommend-section h2`

## 保留未动（原因）
- `compaign-detail-copy-title`（section-0 是 h2、其余 h3，**标签混用**，无统一标签选择器）
- `compaign-detail-summary-title-text`（本页内联脚本引用）
- side-nav / anchor-section / summary / main-right 等 scroll-spy 内联脚本钩子
- 通用类：`item-mark`/`item-tag`/`label`/`value`（`label`/`value` 重挂到 `.stats p` 下保留）
- 所有容器类与 `@include` partial

## 校验
- `node scripts/build-pages.js` 构建成功、缓存版本号刷新（防缓存）
- `git diff --check` 无空白错误；4 类清零、容器 `.compaign-detail-summary-stats` 未被误伤
- 新选择器就位；未改任何 JS（含内联脚本核对）；未调用 playwright
