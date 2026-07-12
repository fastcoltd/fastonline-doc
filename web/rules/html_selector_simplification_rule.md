# HTML 选择器精简规则（必须遵守）

## 修改目标，优先级最高！！
所有的修改完成后，必须回归，保证不改变页面任何 ui、样式、js 行为，这些都需要和修改前一模一样！

## 0.1 范围与流程约束（额外要求，最高优先级：与下文任何条款冲突时以本节为准）

### 0.1.1 只改目标页面内联 HTML，不改 partial

- 本类精简任务只修改目标页面 `src/pages/<page>.html` 的**内联 HTML**，以及其样式所在的 `css/*.css` 与同步的 `.less`。
- **不修改任何 `src/partials/**` 组件源文件**（包括被 `@include` 进来的 header、menu、footer、item 卡片等），这些由人工后续单独处理。
- partial 的同类精简作为**独立任务**进行（见 `docs/plan/partials-selector-simplification-plan.md`），遵循本规则 §1–§7 同样准则；本条仅约束“页面任务不顺带改 partial”。

### 0.1.2 共享 class：只删目标页 class，其它页面靠结构选择器保持一致

- 当被精简的 class 是**跨页面共享**（样式在 common.css 等共享文件、多页面使用）时：
  - 只在**目标页面**的内联 HTML 删除该冗余 class；
  - 把共享 CSS 选择器改成**父级作用域/结构选择器**（按结构匹配，如 `.parent > p`、`.parent img`）；
  - **其它页面的 HTML 保持不动**，其残留的同名 class 变为无害惰性 class，靠结构选择器命中同一样式。
- 必须逐一核对：结构选择器在所有消费页面命中的元素集合与改前完全一致，且无特异性回归。
- 本条是对 §4「跨组件复用 class 需所有消费者在改动范围内」的落地方式。

### 0.1.3 动手前先落盘完整计划到 docs/plan/

- 修改前必须先产出一份**自包含、可续接**的计划文档，写入根目录 `docs/plan/`。
- 计划须覆盖：目标页所有候选 class 的分类（页面独有可改／共享可改／保留不动及原因）、每处改动的精确文件与行号、父级/结构选择器写法、唯一性与特异性核对、回归校验命令、以及可勾选的进度清单。
- 计划需经用户确认后再执行。

### 0.1.4 按风险分批执行、逐批回归

- 按风险从低到高分批：先做“页面独有、样式在页面专属 CSS”的类；再做涉及不可改 partial／覆盖规则的类；最后做“共享 common.css、跨多页”的类。
- 每批改完立即按 §7 回归，通过后再进入下一批。

## 1. 适用场景

当页面或组件存在明确父级容器时，内部节点如果只是为了样式而添加 class，必须优先移除内部 class，改用父级作用域选择器。

典型结构：

```html
<div class="top-menu-more-list-item">
    <img class="top-menu-more-list-item-icon" src="https://dummyimage.com/24x24" />
    <a class="top-menu-more-list-item-text" href="brand.html">CC</a>
</div>
```

应改为：

```html
<div class="top-menu-more-list-item">
    <img src="https://dummyimage.com/24x24" />
    <a href="brand.html">CC</a>
</div>
```

样式同步改为：

```css
.top-menu-more-list-item img {}
.top-menu-more-list-item a {}
```

## 2. 必须精简的 class

满足以下条件时，内部 class 必须移除：

- 父级 class 已经能唯一限定组件或模块范围。
- 内部节点是稳定语义标签，例如 `img`、`a`、`label`、`h2`、`p`、`span`、`ul`、`li`。
- 内部 class 只用于样式选择，不承担状态、数据、JS 行为或跨组件复用。
- 可以用父级作用域选择器等价表达，例如：
  - `.component img`
  - `.component a`
  - `.component > label`
  - `.component [data-value]`
  - `.component .menu-container h2`

## 3. JS 行为同步规则

如果内部 class 被 JS 使用，不能只删除 HTML class，必须同步改 JS 选择器。

示例：

```html
<div class="header-search-box-label">
    <label class="header-search-box-label-text">items</label>
    <img class="header-search-box-label-icon" src="image/header-search-arrow.png" />
</div>
```

应改为：

```html
<div class="header-search-box-label">
    <label>items</label>
    <img src="image/header-search-arrow.png" />
</div>
```

JS 应改为父级作用域查找：

```js
const box = document.querySelector('.header-search-box-label');
const text = box.querySelector(':scope > label');
const icon = box.querySelector(':scope > img');
```

如果需要兼容浏览器或已有写法，也可以使用：

```js
const text = Array.from(box.children).find(item => item.tagName === 'LABEL');
const icon = Array.from(box.children).find(item => item.tagName === 'IMG');
```

## 4. 需要慎重精简的 class

以下 class 不允许直接删除，需要先同步完成所有样式、JS、状态和回归检查：

- 状态 class：`active`、`selected`、`disabled`、`is-active`、`is-open`、`loading` 等。
- JS 行为钩子：事件绑定、DOM 查找、数据读取、状态切换使用的 class。
- 跨组件复用样式 class：多个不同组件依赖同一个 class 时，必须确认所有消费者都在本次改动范围内。
- 第三方库、图标库、字体图标 class，例如 `iconfont`、`icon-*`。
- 无稳定父级作用域的节点 class。

## 5. CSS / LESS 同步

- 修改 `.css` 时，如果存在对应 `.less`，必须同步修改 `.less`。
- 不允许只改构建产物或只改根目录 HTML。
- 原样迁移样式值，不借选择器精简顺手改颜色、字号、间距、圆角、布局。
- 选择器必须带明确父级作用域，禁止新增宽泛全局选择器，例如 `img {}`、`a {}`、`label {}`。

## 6. HTML 源码与构建

- HTML 只修改 `src/pages` 页面内联源码，不修改 `src/partials/**` 组件（partial 由人工后续单独处理）。
- 根目录 `*.html` 必须通过以下命令生成：

```bash
node scripts/build-pages.js
```

- 构建会重新生成全部根目录 `*.html`，根目录出现批量 diff 属正常。
- 构建会刷新资源版本号，必须保留，确保防缓存生效。

## 7. 检查要求

每次选择器精简后至少执行：

```bash
node scripts/build-pages.js
git diff --check
```

如果改了 JS，必须执行对应语法检查：

```bash
node --check js/common.js
```

还必须用 `rg` 确认被移除的旧 class 已不在“目标页面源码 + 本次改动的 CSS/LESS”中残留（`<page>` 为目标页，`<removed-class>` 为被删类）：

```bash
rg "<removed-class>" src/pages/<page>.html css/*.css css/*.less
```

- 被有意保留的同名 class（未改的 `src/partials/**`、其它页面 HTML、或为兼容 partial 结构而保留的覆盖规则）属预期，不算残留，检查时不纳入范围。

