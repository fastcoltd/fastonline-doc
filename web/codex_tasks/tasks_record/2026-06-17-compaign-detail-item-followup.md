# 2026-06-17 compaign-detail.html 手机版 item 组件后续修复

## 修复内容

### 1. 去掉右侧滚动条
将 `overflow-x: hidden` 改为 `overflow: hidden`，避免 `overflow-y` 被浏览器自动计算为 `auto` 导致滚动条。

### 2. 标题被收藏按钮遮挡
- `figma-compaign-horizontal-item` 的 `.item-title-box`: `padding-right: 3rem → 4.25rem`
- `item-all-horizontal-mobile-item` 的 `.item-all-horizontal-mobile-title`: 覆盖 `width: auto; max-width: 100%`
- `item-all-horizontal-mobile-card`: `padding-right: 4rem`

### 3. item 高度自适应
- `.item-all-horizontal-mobile-card`: `height: auto; align-items: stretch`
- `.item-all-horizontal-mobile-main`: `height: auto`
- `.item-all-horizontal-mobile-media`: `height: auto`
- `.item-all-horizontal-mobile-cover`: `height: 100%`
- `.figma-compaign-horizontal-item`: `min-height: auto`
- `.figma-compaign-horizontal-item .compaign-item-icon`: `height: auto`

## 修改文件
- `css/detail/compaign-detail.css`
- `css/detail/compaign-detail.less`

## 影响范围
仅 compaign-detail.html 手机版 (`@media screen and (max-width: 768px)`)
