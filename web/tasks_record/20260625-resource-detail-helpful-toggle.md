# Task: resource-detail Helpful 选中效果

## 任务内容

`resource-detail.html` 手机版和 PC 版中，截图所示 Helpful? Yes / No 区域点击后需要有选中和取消选中效果，参考 `item-detail.html` 页面的 Reviews 部分实现。

## 修改内容

- 将 `resource-detail` Helpful 区域的 Yes 默认选中状态移除，初始状态与任务截图一致。
- 调整 `resource-detail` Helpful 区域样式：
  - 未选中时显示默认图片图标。
  - 选中时显示 iconfont 图标。
  - Yes 选中为蓝色点赞 `#1E9FDB`。
  - No 选中为橙色点踩 `#FD8E2D`，并旋转 180 度。
- 修改 `js/detail/resource-detail.js`，点击 Yes / No 可切换选中状态，再次点击可取消选中。
- 更新 `src/pages/resource-detail.html` 中 CSS/JS 防缓存版本，并通过 `node scripts/build-pages.js` 生成根目录 `resource-detail.html`。

## 验证

- 已执行 `node scripts/build-pages.js`。
- 已执行 `git diff --check`。
- 已执行 CSS/LESS/JS 花括号检查。
- 本任务未要求调用 chrome mcp，因此未做浏览器确认。
