# 源码与产物修改规则（必须遵守）

## 1. 目录职责
- `src/pages/*.html`：页面源码（允许修改）
- `src/partials/*.html`：可复用片段源码（允许修改）
- 项目根目录 `*.html`：构建产物（用于 CI/CD 发布）

## 2. 修改原则
- 后续所有 HTML 需求，优先修改 `src/pages` 和 `src/partials`。
- 根目录 `*.html` 不作为手工修改入口，必须通过构建生成。
- 如果需要复用内容，使用 include 占位：
  - `<!-- @include ../partials/xxx.html -->`
- 对于跨模块重复子结构（例如评分组件），必须优先抽到 `src/partials/components`。
- 允许 partial 嵌套 include（partial 内继续 include 组件 partial）。
- 存在文案/数值差异时，使用 include 参数（JSON）传值，避免复制整段结构。

示例：

```html
<!-- @include ../partials/components/rating-score-only.html {"width":"84%","score":"4.2"} -->
<!-- @include ../partials/components/rating-with-count.html {"width":"83%","score":"4.3","recommend":"(200)"} -->
```

## 3. 构建与预览
- 单次构建（将源码编译到根目录）：

```bash
node scripts/build-pages.js
```

- 开发监听（源码变化后自动构建到根目录）：

```bash
node scripts/watch-pages.js
```

- 本地预览与线上发布都以“根目录产物页面”为准。

## 4. 提交前检查
- 必须执行一次构建，确保根目录产物与源码一致。
- 必须检查语法错误，避免发布失败。
- 仅做最小化修改，不影响未指定功能。

## 5. 后续扩展建议
- 新增可复用模块时，优先放到 `src/partials`。
- 页面内仅保留 include 占位，减少重复代码和多处维护成本。
- 组件目录建议：`src/partials/components`。
- 命名建议：`业务-组件-状态`，例如 `rating-with-count`、`rating-score-only`。
