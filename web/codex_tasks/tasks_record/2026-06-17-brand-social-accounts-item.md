# brand.html 手机版 Social Accounts Hot items 全局 item 组件修改

**日期**: 2026-06-17  
**状态**: 已完成  
**Figma 设计稿**: https://www.figma.com/design/tSDKDZHIeanGhze3wX8rwx/FASTRESP-NEW?node-id=263-1225&m=dev

## 修改内容

参考 Figma 设计稿 (node-id=263-1225)，修改手机版全局 item-card-vertical 组件的样式。修改仅涉及 `@media screen and (max-width: 768px)` 范围内的样式，不影响 PC 版本。

## 修改文件

| 文件 | 说明 |
|------|------|
| `css/items.less` | 全局 item 组件移动端样式（源码） |
| `css/items.css` | 全局 item 组件移动端样式（编译产物） |
| `css/detail/brand.less` | brand 页面特定覆盖（源码） |
| `css/detail/brand.css` | brand 页面特定覆盖（编译产物） |

## 具体变更

| # | 修改点 | 修改前 | 修改后 |
|---|--------|--------|--------|
| 1 | 元素排序 | 标题(order:1)→评分(order:2) | 评分(order:1)→标题(order:2) |
| 2 | 按钮背景 | `#fff` | `#F4F4F4` |
| 3 | 按钮边框 | `#FF1B20 solid 0.125rem` | `none` |
| 4 | 按钮文字颜色 | `#FF1B20` | `rgba(0,0,0,0.85)` |
| 5 | 按钮圆角 | `0.75rem` | `0.4rem` |
| 6 | 按钮高度 | `3.75rem` | `3rem` |
| 7 | 按钮上边距 | `margin-top: 2rem` | `margin-top: 0` |
| 8 | 品牌/服务标签显示 | 隐藏文字标签，显示图标 | 显示文字标签，隐藏图标 |
| 9 | 价格行布局 | `justify-content: flex-end` | `justify-content: space-between` |
| 10 | 内容区间距 | `0.625rem` | `0.75rem` |

## 影响范围

所有使用 `item-card-vertical.html` 组件的页面手机版：brand.html、brand-service.html、item-all.html、tag-all.html、post-detail.html、item-detail.html、store-detail.html、attribute-all.html、system-post-detail.html、index.html
