# Task: index.html 手机版 Popular demands 部分 item 增加收藏组件

**日期:** 2026-06-17
**状态:** 已完成

## 任务内容

index.html 手机版 Popular demands 部分的 item，在右上角增加收藏组件，复用 Best items 部分的收藏组件。

## 修改详情

### 问题分析

`demand-shared-item.html`（line 2）已经 include 了 `item-like-button.html` 收藏按钮组件（与 Best items 使用同一个组件），HTML 结构本身已经包含收藏按钮。但在手机端 CSS 中，通过 `display: none` 隐藏了该按钮。

### 修改文件

**css/index.css** (line 1904-1910) — 将移动端 `#popuar-demands-mobile .figma-popular-demand-item .icon-aixin` 的 `display: none` 替换为显示样式：

```css
#popuar-demands-mobile .figma-popular-demand-item .icon-aixin {
    width: 2.75rem;
    height: 2.75rem;
    right: 1rem;
    top: 1rem;
    font-size: 0;
}
```

### 复用说明

收藏组件 `item-like-button.html` 原本已在 `demand-shared-item.html` 中引用，与 Best items 使用的是同一组件。`.demand-item` 已有 `position: relative`（demand.css），`.icon-aixin` 已有 `position: absolute`（common.css），无需额外修改 HTML 结构。

### 影响范围

- 仅影响 index.html 手机端 Popular demands 区域
- 不影响 PC 版本（PC 版使用独立选择器 `#popuar-demands`）
- 不影响其他页面
