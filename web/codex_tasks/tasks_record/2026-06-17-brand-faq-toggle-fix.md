# Task: brand.html 手机版 FAQ 展开/折叠修复

**日期**: 2026-06-17
**状态**: 已完成

## 任务内容

brand.html 页面 Adobe - Hot Posts 部分的 FAQ item：
- 第一个 item 点击关闭后自动打开，状态无法固定
- 第二个、第三个 item 点击箭头展开/关闭，内容没有变化

## 根因

1. CSS 中 `!important` 规则覆盖了 jQuery `.toggle()` 的行内样式
   - 第一个 item 有 `brand-faq-item-expanded` 类 → CSS `display: block !important` 强制显示
   - 第二个、第三个没有该类 → CSS `display: none !important` 强制隐藏
2. `js/brand.js` 第49行拼写错误 `.faq-itme` → `.faq-item`

## 修改文件

### css/detail/brand.css
- 移除 `display: block !important`
- 移除 `:not(.brand-faq-item-expanded)` 整条规则
- 保留 `max-height` 和 `overflow` 用于展开态

### css/detail/brand.less
- 同步 brand.css 修改

### js/brand.js
- 修复拼写 `.faq-itme` → `.faq-item`
- 添加 `brand-faq-item-expanded` 类的 toggle，确保样式正确跟随状态
