# brand-service.html 手机版摘要区域对齐

## 任务内容

`brand-service.html` 手机版中，品牌信息 / Service 区域左右两侧需要和截图中的竖线对齐：左侧对齐面包屑左侧，右侧对齐搜索框右侧。

## 修改页面

- `brand-service.html`

## Diff 总结

- `css/brand-service.less` / `css/brand-service.css`
  - 将移动端 `.brand-service-hero` 的左右 padding 从 `2rem` 调整为 `0`。
  - 保留原有上下间距，让内容复用页面 body 的统一移动端左右边距，从而与面包屑和搜索框边界对齐。
- `src/pages/brand-service.html`
  - 更新 `brand-service.css` 版本号，用于防缓存。
- `brand-service.html`
  - 通过 `node scripts/build-pages.js` 重新生成根目录产物，并刷新页面资源版本号。

## 检查

- 已执行 `node scripts/build-pages.js`，构建成功。
- 已执行 `node --check scripts/build-pages.js`，无语法错误。
- 未调用 Chrome MCP，按任务规则由用户自行确认视觉效果。
