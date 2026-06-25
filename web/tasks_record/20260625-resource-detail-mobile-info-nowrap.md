# Task: resource-detail.html 手机版信息栏单行显示

## 任务内容

`resource-detail.html` 手机版中，截图所示 Author / Reads / Last Edited on 信息不能换行，需要在同一行显示。

## 修改内容

- 在 `css/detail/resource-detail.less` 的手机版规则中，将 `.info-section` 改为单行不换行显示。
- 为 `.info-section` 增加横向滚动能力并隐藏滚动条，避免窄屏时内容溢出破坏布局。
- 为 `.info-item` 增加 `flex: 0 0 auto` 与 `white-space: nowrap`，保证每个信息项内部不换行。
- 同步修改 `css/detail/resource-detail.css`。
- 更新 `src/pages/resource-detail.html` 中 `resource-detail.css` 防缓存版本，并通过 `node scripts/build-pages.js` 生成根目录 `resource-detail.html`。

## 验证

- 已执行 `node scripts/build-pages.js`。
- 已执行 `git diff --check`。
- 已执行 CSS/LESS 花括号检查。
- 本任务未要求调用 chrome mcp，因此未做浏览器确认。
