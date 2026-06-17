# item-detail.html 手机版数量步进器样式修改

**日期**: 2026-06-17
**Figma**: https://www.figma.com/design/tSDKDZHIeanGhze3wX8rwx/FASTRESP-NEW?node-id=722-21842&m=dev
**状态**: 已完成

## 修改概要

item-detail.html 手机版购买区域中的数量步进器（Stepper）组件，按 Figma 设计稿等比放大修改。

## 修改文件

- `css/detail/item-detail.css` — 手机版 CSS 样式修改
- `css/detail/item-detail.less` — 同步修改
- `src/pages/item-detail.html` — CSS 防缓存版本号更新

## 关键变更（rem 基准 1rem=8px）

| 属性 | 修改前 | 修改后 |
|------|--------|--------|
| controls 高度 | 2.8rem (22.4px) | 3.6rem (28.8px) |
| controls 宽度 | 10.8rem (86.4px) | 14.4rem (115.2px) |
| qty-btn 宽度 | 3.6rem (28.8px) | 4.8rem (38.4px) |
| qty-btn 高度 | 2.8rem (22.4px) | 3.6rem (28.8px) |
| qty-display 宽度 | 3.6rem (28.8px) | 4.8rem (38.4px) |
| qty-display 高度 | 2.8rem (22.4px) | 3.6rem (28.8px) |
| qty-display 字号 | 1.2rem (9.6px) | 1.5rem (12px) |
| qty-display 行高 | 1.8rem (14.4px) | 2.4rem (19.2px) |
| qty-icon 尺寸 | 1.6rem (12.8px) | 2.0rem (16px) |

## 注意事项

- 仅修改 `@media screen and (max-width: 768px)` 内样式，不影响 PC 版本
- 一加 Ace5 Pro 竖屏时 1rem=8px
