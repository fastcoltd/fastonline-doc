# attribute-all.html 选择器精简

- 日期：2026-07-12
- 任务：按 `rules/html_selector_simplification_rule.md`，对 attribute-all.html 源码进行选择器精简
- 修改页面：attribute-all.html
- 说明：当前分支状态正是历史提交 `de96007 (Simplify attribute page selectors)` 的“改前”版；本次复刻其 data-* 属性方案（`git apply` 该补丁到源码，另行提交）。

## 改动摘要（3 文件，+150/−38）

### HTML（src/pages/attribute-all.html）
- `<div class="tag-page-header-desc-title-box">` → `<div data-attribute-heading>`；内部 `.tag-page-header-desc-title` / `.tag-page-header-desc-text`（span）去 class
- `<span class="tag-page-header-desc-content">` → `<span data-attribute-desc>`
- `<div class="tag-page-header-desc-tag-box">` → `<div data-attribute-values>`
- `<div class="tag-page-header-desc-tag-item ...">`（×9）→ `<div data-attribute-value ...>`（**保留 `.active` 状态**）
- `<p class="page-filterresult-num/-text/-content">` → `<p data-result-num/-text/-content>`
- 内联脚本：`document.querySelector('.tag-page-header-desc-content')` → `document.querySelector('.tag-page-header-desc-box [data-attribute-desc]')`

### CSS + LESS（css/attribute-all.css + css/attribute-all.less）
- 对应选择器改写为 `.tag-page-header-desc-box [data-attribute-heading|desc|values|value]`（含 `span:first/last-child`、`[data-attribute-value].active`）
- `.attribute-header-function-box .page-filterresult-box [data-result-text]` 等

## 保留未动（原因）
- 列表项/排序/分页/空状态等 `@include` partial（§0.1.1 页面任务不改 partial）
- 共享内联块：home-menu / 账户中心 / 通知 / 语言
- 带 JS/状态的类：`page-link`、`layout-switch` 等

## 校验
- `de96007` 补丁 `git apply --check` 干净应用
- `node scripts/build-pages.js` 构建成功、缓存版本号刷新（防缓存）
- `git diff --check` 无空白错误；8 个旧类清零、16 处新 data-attr 就位
- 内联脚本已同步；`.active` 状态保留；未调用 playwright
