# brand-service.html 选择器精简

- 日期：2026-07-12
- 任务：按 `rules/html_selector_simplification_rule.md`，对 brand-service.html 源码进行选择器精简
- 修改页面：brand-service.html

## 改动摘要

### HTML（src/pages/brand-service.html）去 4 类
- `brand-service-brand-icon`（img，1）
- `brand-service-brand-title`（h1，1）
- `brand-service-service-label`（span，1）
- `brand-service-service-chip`（a，5；去基础类，**保留首个 `active` 状态**）

### CSS + LESS（css/brand-service.css + css/brand-service.less，含 @media）
- `.brand-service-brand-icon` → `.brand-service-brand-icon-box img`
- `.brand-service-brand-title` → `.brand-service-brand-row h1`
- `.brand-service-service-label` → `.brand-service-service-row span`
- `.brand-service-service-chip`（+`.active`）→ `.brand-service-service-row a`（+`a.active`）

## 保留未动（原因）
- `brand-service-brand-mark`（双类变体 `-hot/-sale`，且 brand-row 内多 span 难唯一定位）
- 容器/作用域锚点：`brand-service-brand-icon-box`/`brand-row`/`service-row`/`summary`
- 跨页共享：`page-filterresult-*`（8 页）、`page-filter-icon/-num`（6 页）
- JS/状态：`layout-switch`
- 所有 `@include` partial 与共享内联块

## 校验
- `node scripts/build-pages.js` 构建成功、缓存版本号刷新（防缓存）
- `git diff --check` 无空白错误；被删叶子类清零（残留检查 4 处为保留容器 `-icon-box` 的 `\b` 假阳性）
- 新选择器就位、`active` 状态保留、容器类保留
- 未改任何 JS；未调用 playwright
