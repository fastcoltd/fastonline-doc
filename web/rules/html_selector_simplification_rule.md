# HTML 选择器精简规则（必须遵守）

## 修改目标，优先级最高！！
所有的修改完成后，必须回归，保证不改变页面任何 ui、样式、js 行为，这些都需要和修改前一模一样！

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

- HTML 必须优先修改 `src/pages` 和 `src/partials` 源码。
- 根目录 `*.html` 必须通过以下命令生成：

```bash
node scripts/build-pages.js
```

- 共享 partial 被修改后，所有引用该 partial 的根目录 HTML 出现 diff 是正常的。
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

还必须用 `rg` 确认被移除的旧 class 没有残留在源码、样式和 JS 中，例如：

```bash
rg "header-search-box-label-(text|icon)|top-menu-more-list-item-(icon|text)" src css js
```

