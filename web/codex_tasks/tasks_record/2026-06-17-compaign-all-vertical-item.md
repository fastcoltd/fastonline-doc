# Task: compaign-all.html 手机版 Vertical 模式 item 组件替换

**日期:** 2026-06-17
**状态:** 已完成

## 任务内容

compaign-all.html 手机版 Vertical 模式下的 item 改用 index.html Hot campaigns 部分的组件。

## 修改详情

### 问题分析

`compaign-all-vertical-item.html` 和 `index-hot-compaign-item.html` 两个 partial 底层引用的都是同一个 `hot-compaign-item.html` 组件，HTML 结构相同。但 index.html 的 Hot campaigns 通过 `css/index.css` 中的 `display: none` 隐藏了 products-box，而 compaign-all.html 的 `css/compaign.css` 移动端样式中 products-box 是 `display: block`。

### 修改文件

1. **src/pages/compaign-all.html** — 将 Vertical 模式下的 7 个 `@include ../partials/compaign-all-vertical-item.html` 替换为 `@include ../partials/index-hot-compaign-item.html`

2. **css/compaign.css** (line 609) — 移动端 `.list-container-page-scoll .layout-vertical .figma-hot-compaign-item .compaign-item-products-box` 的 `display: block` 改为 `display: none`

3. **css/compaign.less** (line 704) — 同步 CSS 修改

### 影响范围

- 仅影响 compaign-all.html 手机版 Vertical 模式
- 不影响 PC 版本，不影响 Horizontal 模式，不影响其他页面
