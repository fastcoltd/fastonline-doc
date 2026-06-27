# Task：store-detail.html 手机版 After-sales rules see more 功能

**日期：** 2026-06-27
**状态：** 已完成
**页面：** store-detail.html

---

## 任务内容

store-detail.html 手机版的 After-sales rules 部分，实现与 PC 版一致的 "see more" 交互逻辑：默认显示 2 行截断（超出 `...`），点击 "see more" 后全部展开（4 行或更多），按钮消失。

## 问题分析

- **PC 版**（`@media (min-width: 769px)`）：已实现 `-webkit-line-clamp: 2` 截断 + JS click 展开逻辑
- **手机版**（`@media (max-width: 768px)`）：extra-copy 文字被 `display: none` 直接隐藏，JS 中 `window.matchMedia('(max-width: 768px)').matches` 直接 return，导致 click 无效

## 修改内容

| 文件 | 修改 |
|------|------|
| `css/detail/store-detail.css` | 将 `.after-sales-rules-text` 的 `-webkit-line-clamp: 2` 样式从 `@media (min-width: 769px)` 移出为通用样式（PC + 手机端共用）；移除手机端 `.after-sales-rules-extra-copy { display: none }` |
| `css/detail/store-detail.less` | 与 CSS 同步修改 |
| `js/detail/store-detail.js` | `initializeAfterSalesRulesSeeMore()` 移除 `window.matchMedia('(max-width: 768px)').matches` 的 return 条件 |
| `src/pages/store-detail.html` | CSS 和 JS 引用版本号更新为 `20260627-after-sales-see-more-fix`（防缓存） |

## 核心 CSS 变更

```css
/* 从 @media (min-width: 769px) 移出为通用样式 */
.after-sales-rules-text {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
}
.after-sales-rules-text.is-expanded {
  display: block;
  overflow: visible;
  text-overflow: clip;
}
.after-sales-rules-more-btn.is-hidden {
  display: none;
}
```

## 核心 JS 变更

```js
// 修改前
if (!rulesText || !seeMoreBtn || window.matchMedia('(max-width: 768px)').matches) return;

// 修改后
if (!rulesText || !seeMoreBtn) return;
```
