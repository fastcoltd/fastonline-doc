# faq-detail.html 选择器精简

- 日期：2026-07-12
- 任务：按 `rules/html_selector_simplification_rule.md`，对 faq-detail.html 源码进行选择器精简
- 修改页面：faq-detail.html

## 改动摘要

### HTML（src/pages/faq-detail.html）去 4 类
- `faq-detail-title`（h1，1）
- `faq-detail-author-avatar`（img，1）
- `faq-detail-helpful-title`（h2，1；**保留 id** faq-detail-helpful-title）
- content 区 `<p>`（去 class；CSS 已有 `.faq-detail-content p` 父级作用域规则，不变）

### CSS + LESS（css/faq.css + faq.less，base + @media 各 2 处/类）
- `.faq-detail-title` → `.faq-detail-title-row h1`
- `.faq-detail-author-avatar` → `.faq-detail-author img`
- `.faq-detail-helpful-title` → `.faq-detail-helpful h2`
- `.faq-detail-content p` 保持不变（已是父级作用域）

## 保留未动（原因）
- `faq-detail-info-item`（复用通用类，非 page 专属）
- 容器/作用域：`faq-detail-header` / `faq-detail-title-row` / `faq-detail-info-row` / `faq-detail-content` / `faq-detail-helpful` / `faq-detail-share`
- 通用类：`share-label` / `share-icon` / `resource-action-*`
- `faq-detail-favorite`（like 按钮容器）、所有 `@include` partial

## 校验
- `node scripts/build-pages.js` 构建成功、缓存版本号刷新（防缓存）
- `git diff --check` 无空白错误；3 个叶子类清零
- content p 已有 `.faq-detail-content p` 规则不变；新选择器就位
- 未改任何 JS；未调用 playwright
