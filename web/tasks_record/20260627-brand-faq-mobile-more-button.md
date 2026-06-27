# Task：brand.html 手机版 FAQ more 按钮修复

**日期**：2026-06-27
**页面**：brand.html
**任务**：Adobe - Hot Posts（FAQ section）手机版展开后 more 按钮不显示

## 问题根因
`css/detail/brand.css` 手机版中以下规则裁剪了 FAQ 展开后的 more 按钮：
```css
.brand-detail-page #FAQ .faq-item.brand-faq-item-expanded .faq-content {
  max-height: 15.75rem;
  overflow: hidden;  /* 实际内容 176px > 126px 限制，more 被切除 */
}
```
faq.css 无此限制，故 faq-list 页面正常。

## 修改内容

### css/detail/brand.less
1. **新增**（`.faq-header-title` 后）：FAQ content 内 view-more-wrapper 右对齐、view-more-btn 黑色 + hover 主色
2. **删除**（`@media max-width: 768px` 内）：`brand-faq-item-expanded .faq-content` 的 `max-height`/`overflow:hidden` 规则

### css/detail/brand.css
同步 less 修改。

## 影响范围
- brand.html 手机版 FAQ section — 展开后 more 按钮正常显示
- PC 版、其他页面无影响
