# Task: compaign-detail 手机版 BUY NOW 按钮右边缘与收藏按钮对齐

**日期**: 2026-06-25
**状态**: 已完成

## 修改内容

compaign-detail.html 手机版中，item 组件的 BUY NOW 按钮右侧与收藏组件右侧对齐。

### 修改文件
- `css/detail/compaign-detail.less` — 添加 BUY NOW 宽度覆盖
- `css/detail/compaign-detail.css` — 同步
- 30 个 HTML — 构建刷新

### 根因
compaign-detail.less 将 `item-all-horizontal-mobile-card` 的 `padding-right` 从默认 `1.25rem` 覆盖为 `4rem`，而收藏按钮 `right: 1.25rem` 未变，导致 BUY NOW 右边缘比收藏按钮靠左 `2.75rem`。

### 修复
```css
.compaign-detail-horizontal-list .item-all-horizontal-mobile-buy-btn {
    width: calc(100% + 2.75rem);
}
```
