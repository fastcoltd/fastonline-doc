# attribute-all.html 页面 PC 版 Demands Vertical 双列展示

## 任务内容

attribute-all.html 页面 PC 版，在选择 Demands，并且选择 Vertical 模式的情况下，每行需要显示 2 个 item。

## 修改页面

- attribute-all.html

## 修改内容

- 在 `src/pages/attribute-all.html` 的 Demands Vertical 列表容器上增加 `popular-demands-pager` 类，复用现有列表布局样式。
- 在 `css/attribute-all.less` 和 `css/attribute-all.css` 中，将 PC 端 Demands Vertical 卡片宽度从 `50%` 调整为 `calc((100% - 3.75rem) / 2)`，扣除两列之间的 gap，确保同一行可以展示 2 个 item。
- 执行 `node scripts/build-pages.js` 重新生成根目录页面产物，并刷新 CSS/JS 防缓存版本号。

## 验证

- 执行 `node --check scripts/build-pages.js`，语法检查通过。
- 使用 Browser 插件打开 `attribute-all.html` 验证：
  - `Demands` + `Vertical` 状态下第一、第二张卡片同一行展示。
  - 第三、第四张卡片在下一行展示。
  - 最新 `attribute-all.css` 防缓存版本号已加载。
