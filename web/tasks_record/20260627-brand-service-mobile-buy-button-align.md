# brand-service.html 手机版 Horizontal item 按钮对齐

## 任务内容

brand-service.html 页面手机版 Horizontal 模式下的 item，需要修改 Buy now 按钮布局，使按钮右侧对齐收藏按钮右侧。

## 修改页面

- brand-service.html

## Diff 总结

- 调整 `css/brand-service.less` 中手机版 Horizontal item 的右侧内容区，将固定宽度改为 `flex: 1; min-width: 0;`，让内容区占满卡片剩余宽度。
- 同步调整 `css/brand-service.css`，保持 LESS 源码与 CSS 产物一致。
- 将 `.item-all-horizontal-mobile-buy-btn` 宽度从固定 `26.125rem` 改为 `100%`，使按钮右边缘跟随卡片右内边距，从而与收藏按钮右侧对齐。
- 更新 `src/pages/brand-service.html` 中 `brand-service.css` 的版本号，满足防缓存要求。
- 执行 `node scripts/build-pages.js` 生成根目录 HTML 产物，根目录页面的 CSS/JS 版本号随构建统一刷新。

## 验证

- `node scripts/build-pages.js`
- `node --check scripts/build-pages.js`
- `git diff --check -- css/brand-service.less css/brand-service.css src/pages/brand-service.html brand-service.html`

