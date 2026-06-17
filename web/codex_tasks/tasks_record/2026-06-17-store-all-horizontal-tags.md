# Task Record: store-all.html 手机版 Horizontal 模式 tag 修改

**日期**: 2026-06-17

**任务**: store-all.html 页面的手机版 Horizontal 模式下的 item，tag 增加到 12 个，最多展示 1 行，超出的部分展示 `...`

**修改的文件**:

1. `src/partials/components/store-all-horizontal-mobile-item.html` — tag 从 6 个增加到 12 个
2. `css/store.less` — tag 容器 `flex-wrap: wrap` → `nowrap`，`overflow: visible` → `hidden`，新增 `position: relative` 和 `::after` 伪元素（右侧 `...` + 渐变遮罩）
3. `css/store.css` — 同上，与 `.less` 同步

**技术方案**:

- 模板层：在移动端 Horizontal item 组件中新增 6 个 tag，共 12 个
- 样式层：`flex-wrap: nowrap` 限制单行，`overflow: hidden` 隐藏超出部分
- 溢出提示：通过 `::after` 伪元素在容器右侧固定显示 `...`，配合 `linear-gradient(to right, transparent, #F5F5F5 50%)` 渐变背景自然遮挡被截断的 tag

**影响范围**: 仅 store-all.html 手机版 Horizontal 模式 item，不影响 PC 版和其他页面
