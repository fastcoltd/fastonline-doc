# Task: brand-all.html 手机版锚点组件 A-Z 完整显示

**日期**: 2026-06-27

**状态**: 已完成

**修改页面**: brand-all.html (手机版)

---

## 问题描述

brand-all.html 手机版左侧 A-Z 字母锚点导航组件，无法在当前屏幕可见高度内完整显示所有 26 个字母（只显示到 W/Y，Z 被裁剪）。

## 根因分析

1. 父容器 `.brand-all-page.page-content` 使用 `100vh` 计算高度，移动端浏览器地址栏/工具栏占用空间导致 `100vh` 大于实际可见高度
2. 锚点容器 `.brand-page-index-box` 设置了 `overflow: visible !important`，导致溢出内容被父容器 `overflow: hidden` 裁剪

## 修改内容

### css/brand.less (第 277-288 行, 第 301-308 行)

```diff
@media screen and (max-width: 768px) {
    .brand-all-page .brand-page-index-box.page-fix-box,
    .brand-all-page .brand-page-index-box.page-fix-box.is-sticky {
-       overflow: visible !important;
+       overflow-y: auto !important;
    }

    .brand-all-page.page-content {
-       height: calc(100vh - 14rem);
+       height: calc(100dvh - 14rem - 6.25rem);
        overflow: hidden;
    }
}
```

### css/brand.css (同步修改)

同上。

## 变更说明

| 变更 | 原值 | 新值 | 说明 |
|------|------|------|------|
| overflow-y | `visible` | `auto` | 溢出时可滚动，安全兜底 |
| 高度单位 | `100vh` | `100dvh` | 动态视口高度，排除浏览器 UI |
| 底部偏移 | `-14rem` | `-14rem - 6.25rem` | 底部上移 50px (6.25rem at 8px base) |

## 影响范围

- 仅影响 brand-all.html 手机版 (`max-width: 768px`)
- 不影响 PC 版本
- 不影响其他页面
