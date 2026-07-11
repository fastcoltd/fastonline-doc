# attribute-all.html selector simplification

## 任务内容

使用 html-selector-simplification 这个 skill，对 attribute-all.html 源码进行修改，直到整个页面完成修改。

## 修改页面

- attribute-all.html

## Diff 总结

- 精简 `src/pages/attribute-all.html` 属性头部内部结构 class，将标题、描述、属性值列表切换为 `.tag-page-header-desc-box` 父级作用域下的 `data-attribute-*` 选择器。
- 精简属性页结果统计区域的内部 class，将 `page-filterresult-num/text/content` 替换为 `data-result-*`。
- 同步更新 `css/attribute-all.less` 与 `css/attribute-all.css`，补齐等价样式、移动端样式、选中态样式，保持 CSS/LESS 一致。
- 更新 `js/attributepage.js`，属性值点击逻辑改为使用新的 scoped selector。
- 运行 `node scripts/build-pages.js` 重新生成根目录 HTML 产物，并刷新资源版本号以满足防缓存要求。

## 检查

- `node scripts/build-pages.js`
- `node --check js/attributepage.js`
- `git diff --check`

