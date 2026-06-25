# brand-all.html 手机版锚点组件高度调整

## 任务内容

`brand-all.html` 手机版锚点组件需要铺满整个可用高度，即 A-Z 字母索引等比例占满整个高度。

## 修改页面

- `brand-all.html`

## 修改内容

- 在 `css/brand.less` 的手机版媒体查询中，将 brand 字母锚点容器设置为占满父级可用高度。
- 将 A-Z 字母索引项设置为 `flex: 1 1 0`，让每个字母等比例均分高度。
- 同步修改 `css/brand.css`。
- 运行页面构建，刷新 `brand-all.html` 中 CSS/JS 的防缓存版本号。

## 验证

- 执行 `git diff --check` 通过。
