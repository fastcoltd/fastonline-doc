# blog.html 手机版锚点关闭按钮修复

**日期**: 2026-06-17  
**任务**: blog.html页面的手机版需要修改 - 锚点面板增加关闭按钮

## 问题根因

关闭按钮代码（HTML + JS）已存在，但 CSS 选择器优先级冲突导致手机端按钮被隐藏。

- 桌面端规则：`.page-content .blog-sidebar-container .table-of-container-close` (优先级 0-3-0) → `display: none`
- 手机端规则：`.blog-sidebar-container .table-of-container-close` (优先级 0-2-0) → `display: block`
- 媒体查询不影响 CSS 优先级，桌面端高优先级规则覆盖了手机端规则

## 修改内容

### css/detail/blog.css
提升手机端关闭按钮选择器优先级，与桌面端选择器保持一致：
```diff
-  .blog-sidebar-container .table-of-container-close {
+  .page-content .blog-sidebar-container .table-of-container-close {
```

### css/detail/blog.less
同步修改：
```diff
-    .blog-sidebar-container .table-of-container-close {
+    .page-content .blog-sidebar-container .table-of-container-close {
```

### src/pages/blog.html
防缓存版本号更新：
```diff
- css/detail/blog.css?v=20260613-1
+ css/detail/blog.css?v=20260617-1
```

## 影响范围
- 仅影响 blog.html 手机版（≤768px）锚点面板中的关闭按钮显示
- 不影响 PC 版、不影响其他页面
