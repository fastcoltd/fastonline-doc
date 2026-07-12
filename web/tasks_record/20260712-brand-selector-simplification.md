# brand.html 选择器精简

- 日期：2026-07-12
- 任务：按 `rules/html_selector_simplification_rule.md`，对 brand.html 源码进行选择器精简
- 修改页面：brand.html

## 改动摘要

### HTML（src/pages/brand.html）去 2 类
- `page-header-desc-icon`（img，1）
- `page-header-desc-right-title`（span，1）

### CSS + LESS
- `.page-header-desc-icon` → `.page-header-desc-icon-box img`（detail/brand.css+less、second-page.css+less，含 @media）
- `.page-header-desc-right-title` → `.page-header-desc-right-title-box span`（second-page.css+less，含 @media）

## 保留未动（原因）
- `page-header-desc-right-content-title/-text`（content-box 内 4 个 span 交替，顺序依赖）
- `page-header-desc-right-detail-text/-toggle-btn`（顺序依赖 + "Show More" 交互）
- `item-mark`（通用/双用）、`page-nav-*`（共享面包屑）、`page-link`（brand.js `LinkRef('page-link',...)` JS 钩子）
- 所有容器类（`-icon-box`/`-right-box`/`-right-title-box`/`-content-box`/`-detail-box`）与 `@include` partial

## 校验
- `node scripts/build-pages.js` 构建成功、缓存版本号刷新（防缓存）
- `git diff --check` 无空白错误；被删叶子类精确清零（避开 `-icon-box`/`-title-box` 容器）
- 新选择器就位；`second-page.css`（13 页共享）内 `page-header-desc-*` 结构仅 brand.html → 不波及其它页
- 未改任何 JS；未调用 playwright
