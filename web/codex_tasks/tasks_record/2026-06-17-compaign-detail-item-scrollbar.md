# 2026-06-17 compaign-detail.html 手机版去掉 item 组件滚动条

## 任务内容
compaign-detail.html 页面中的 item 组件，右侧有滚动条，需要去掉。

## 修改文件
- `css/detail/compaign-detail.css`（编译产物）
- `css/detail/compaign-detail.less`（源码）

## 修改内容
移动端 (`@media screen and (max-width: 768px)`) 中，将两处 `overflow-x: hidden` 改为 `overflow: hidden`：

1. 第 486 行 - `.compaign-detail-page-content, .compaign-detail-page-content .compaign-detail-horizontal-list, .compaign-detail-page-content .compaign-detail-recommend-list`
2. 第 621 行 - `.compaign-detail-horizontal-list`

## 根因
CSS 规范中，当 `overflow-x` 设为 `hidden` 而 `overflow-y` 保持默认 `visible` 时，浏览器会将 `overflow-y` 自动计算为 `auto`，导致 item 内容在垂直方向出现滚动条。改为 `overflow: hidden` 后，两端均被裁剪，不产生滚动条。

## 影响范围
仅影响 compaign-detail.html 手机版，不影响 PC 版和其他页面。
