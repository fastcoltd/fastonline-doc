# brand-all.html PC 版锚点组件底部滚动修复

## 任务内容

`brand-all.html` 的 PC 版左侧锚点组件在页面滚动到最底部时，会因为 footer 出现而被挤压。期望 footer 出现时不挤压锚点组件，而是让锚点组件顺势往上滚动，即使顶部滚动到看不见也可以。

## 修改页面

- `brand-all.html`

## 修改内容

- 调整 `js/pagescroll.js` 中 brand 字母锚点的 PC 端处理逻辑：PC 端不再由 JS 根据 footer 可见区域动态压缩锚点高度，改为使用 CSS sticky 自然跟随内容区域滚动。
- 在 `css/brand.less` 与 `css/brand.css` 的 PC 媒体查询中为锚点容器补充 `height: 100vh` 与 `max-height: 100vh`，保持 A-Z 字母索引撑满可展示高度。
- 调整 `js/link.js`：PC 端 brand 字母索引高亮时跳过 `scrollIntoView`，避免滚动到底部时被高亮项反向拉动页面，导致 footer 无法完整展示和回弹。
- 通过页面构建刷新 `brand-all.html` 中 CSS/JS 的防缓存版本号。

## 验证

- 使用 Chrome MCP 复现并确认原问题：滚动到底部时 footer 无法完整展示，页面会回弹。
- 使用 Chrome MCP 验证修复结果：连续滚动到底部时实际滚动值稳定等于最大滚动值，footer 可完整展示，锚点组件顺势向上滚动。
- 执行 `node --check js/pagescroll.js && node --check js/link.js && node --check js/brandpage.js` 通过。
- 执行 `git diff --check` 通过。
