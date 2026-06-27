# 手机版 Cookie 同意协议 UI - 增加左右边距

**日期**: 2026-06-27

**任务**: 手机版的同意 cookie 协议 ui 需要修改

**修改页面**: 所有页面（Cookie 组件 `src/partials/components/site-cookies-tips.html` 被所有页面引用）

## 需求描述

手机版 Cookie 弹窗点击 Customize 展开后，下半部分 `Cookie Preferences` 区域（复选框 + Save Preferences 按钮）没有左右边距，内容从屏幕最左侧开始布局。需要增加左右边距，使其与上半部分（文本 + Accept All / Customize 按钮区域）左右对齐。

## 修改文件

| 文件 | 修改内容 |
|---|---|
| `css/common.css` | 在 `@media (max-width: 768px)` 中新增 `.cookies-feature-wrapper .cookies-feature-content-wrapper { padding: 0 1.25rem; }` |
| `css/common.less` | 同步新增相同规则 |

## Diff

```diff
+ .cookies-tips-wrapper .cookies-feature-wrapper .cookies-feature-content-wrapper {
+   padding: 0 1.25rem;
+ }
```

## 影响范围

- 仅手机版（768px 以下），不影响 PC 版
- CSS 与 LESS 保持同步
