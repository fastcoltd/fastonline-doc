# item-detail.html 手机版购买区域样式修改

**日期**: 2026-06-17
**Figma**: https://www.figma.com/design/tSDKDZHIeanGhze3wX8rwx/FASTRESP-NEW?node-id=722-21849&m=dev
**状态**: 已完成

## 修改概要

item-detail.html 手机版（@media max-width: 768px）中 Sticky Header 购买区域的按钮和 Total price 样式修改，按 Figma 设计稿对齐。

## 修改文件

- `css/detail/item-detail.css` — 手机版 CSS 样式修改
- `css/detail/item-detail.less` — 同步修改
- `src/pages/item-detail.html` — CSS 防缓存版本号更新

## 关键变更（rem 基准 1rem=8px）

| 元素 | 修改前 | 修改后 | Figma 设计值 |
|------|--------|--------|-------------|
| Total price label 字号 | 1.4rem | 1.75rem | 14px |
| Total price label 行高 | 2.25rem | 2.625rem | 21px |
| Total price 字号 | 1.4rem | 1.75rem | 14px |
| Total price 行高 | 2.25rem | 2.625rem | 21px |
| Total section gap | 1.2rem | 1.5rem | 12px |
| BUY NOW 宽度 | 13.8rem | 17.25rem | 138px |
| BUY NOW 高度 | 3rem | 3.75rem | 30px |
| BUY NOW 字号 | 1.2rem | 1.5rem | 12px |
| BUY NOW 行高 | 2.2rem | 2.75rem | 22px |
| BUY NOW 圆角 | 0.4rem | 0.5rem | 4px |
| 字体 | var(--primary-popfont) | 'Inter', sans-serif | Inter |

## 注意事项

- 仅修改 `@media screen and (max-width: 768px)` 内样式，不影响 PC 版本
- 一加 Ace5 Pro 竖屏时 1rem=8px，按此基准计算 rem 值
