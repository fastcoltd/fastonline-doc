# Task: faq-detail.html PC版 header 位置修复

**日期**: 2026-06-25
**状态**: 已完成

## 修改内容

faq-detail.html header 从页面最左侧展示，未居中，与其他页面不一致。

### 根因
`page.css` 定义了 `.page-top-sticky` 的居中定位样式，但 faq-detail.html 未加载该 CSS 文件。

### 修复
在 `src/pages/faq-detail.html` 中添加：
```html
<link rel="stylesheet" href="css/page.css" />
```

### 修改文件
- `src/pages/faq-detail.html` — 添加 page.css 引用
- 30 个 HTML — 构建刷新
