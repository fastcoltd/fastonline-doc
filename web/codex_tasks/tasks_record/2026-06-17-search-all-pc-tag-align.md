# search-all.html PC版 - 标签与标题纵向居中对齐

## 日期
2026-06-17

## 任务内容
search-all.html 页面的 PC 版，两个地方（image-188: Featured Item 的 HOT 标签；image-189: Campaign 的 AD 标签）的标题前面的标签，需要和标题纵向居中对齐。

## 修改文件
- `css/search-all.css`
- `css/search-all.less`

## 修改方案
在 `@media screen and (min-width: 769px)` 中：

1. `.search-list-container .search-card.search-card-first-item.search-card-first-item-desktop .item-title-main` 和 `.search-card-second-item-desktop` 的 `.item-title-main`：`align-items` 从 `center` 改为 `baseline`，使标签文字和标题文字基线对齐而非盒子居中。
2. 对应的 `.item-mark`：添加 `position: relative; top: -0.75rem;`，在基线对齐基础上将标签向上微调约 12px。

## 影响范围
仅影响 PC 端（>= 769px）search-all.html 的 first-item 和 second-item，不影响手机端和其他页面。
