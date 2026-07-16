# 多状态组件统一封装规则（必须遵守）

## 1. 目标

当同一种业务对象因为 PC / Mobile、Vertical / Horizontal 或其它展示状态而维护了多份 HTML 时，必须优先评估将其统一为：

- 一份语义化 HTML 组件；
- 一个稳定的组件基础 class；
- 一个可替换的根状态 class；
- 若干份按展示状态拆分的 CSS，并同步维护对应 LESS；
- 只负责替换根状态 class 的切换逻辑。

统一后的模式切换只能改变样式和布局，不能替换组件 DOM、组件数据或业务行为。

## 2. 适用范围与合并边界

### 2.1 应当统一的情况

满足以下条件时，必须优先使用统一组件：

- 多份结构表达的是同一种业务对象；
- 各版本包含相同或可兼容的业务字段；
- 差异主要是方向、尺寸、间距、排列、内容显隐或响应式布局；
- 收藏、购买、跳转、禁用等交互语义一致；
- 可以通过根状态 class 和 CSS 等价实现现有 UI。

### 2.2 不允许强行统一的情况

出现以下情况时，必须先停止并向用户说明，不能为了减少文件数量强行合并：

- 不同版本代表不同业务对象；
- 核心字段或操作流程不同；
- 同一节点在不同版本承担互相冲突的语义或交互；
- 合并必须引入大量 JavaScript 行内样式或绝对定位；
- 合并会改变数据、可访问性、交互顺序或页面功能。

有几种实际展示状态，就建立几种状态样式；不机械要求所有组件都必须具备四种状态。PC / Mobile × Vertical / Horizontal 同时存在时，才对应四种状态。

## 3. 必须同时遵守的项目规则

组件统一任务还必须遵守：

- `AGENTS.md`；
- `rules/source_build_rule.md`；
- `rules/html_selector_simplification_rule.md`；
- 目标组件所依赖的其它专项规则，例如 `rules/star_component_rule.md`。

本任务属于独立的“组件 partial 封装/迁移任务”，允许在用户批准的范围内新建或修改 `src/partials/components`。`html_selector_simplification_rule.md` 中“页面精简任务不顺带修改 partial”的限制，仍适用于普通页面选择器精简任务；不能借组件统一任务顺带修改未纳入计划的其它 partial。

## 4. 动手前的只读盘点与批准流程

### 4.1 必须完成的盘点

开始修改前，必须使用 `rg` 等只读方式查清：

1. 各展示状态当前使用的 HTML / partial；
2. 每个旧 partial 的直接和间接消费者；
3. 静态 include 之外是否还有 JavaScript 动态拼接旧组件 HTML；
4. 现有 CSS / LESS 中完全可复用的规则；
5. 页面专属覆盖、根级扩展 class、状态 class 和行为 class；
6. JavaScript 对旧 class、DOM 层级、卡片数量和容器 ID 的依赖；
7. 各模式的数据、字段、卡片数量和交互状态是否一致；
8. `header`、`footer`、`article`、`figure` 等语义标签是否会受到全局选择器污染；
9. 受影响页面、视口、模式和回归范围。

不得只搜索目标页面；共享 partial 必须反向搜索整个 `src`、`css` 和 `js` 目录。

### 4.2 计划与批准

实施前必须先向用户说明理解、影响范围和详细方案。用户批准后，先将自包含计划写入：

```text
docs/plan/<component-name>-unified-component-plan.md
```

计划至少包含：

- 目标与明确不做的事项；
- 旧组件、消费页面和动态生成入口清单；
- 数据统一策略；
- 新组件结构与 include 参数；
- class 分类和结构选择器方案；
- 基础 CSS 与各状态 CSS / LESS 的职责；
- 状态 class 映射和切换逻辑；
- 页面上下文差异及兼容方案；
- 分批迁移顺序；
- Playwright 基线与回归矩阵；
- 构建、语法、残留和行为检查命令；
- 可勾选的进度清单。

用户未批准前，只允许只读盘点和方案沟通，不允许修改业务源码。

## 5. 统一组件 HTML 规范

### 5.1 唯一 DOM

同一个业务对象只能输出一份组件 DOM。禁止：

- PC 和 Mobile 各输出一份再通过 CSS 显隐；
- Vertical 和 Horizontal 各维护一个列表；
- 切换模式时删除并重建组件；
- 在 JavaScript 中再次手写一整份组件 HTML。

推荐结构示例：

```html
<article class="product-card product-card--desktop-vertical">
    <figure>
        <img src="image/product.png" alt="Product cover" />
    </figure>
    <section>
        <header>
            <span data-role="mark">HOT</span>
            <h2><a href="item-detail.html">Product title</a></h2>
        </header>
        <div data-role="meta">...</div>
        <nav aria-label="Product tags">...</nav>
        <footer>...</footer>
    </section>
</article>
```

### 5.2 根节点 class

根节点允许保留：

1. 一个稳定基础 class，例如 `product-card`；
2. 一个互斥状态 class，例如 `product-card--desktop-vertical`；
3. 确有页面上下文或 JS 行为用途的根级扩展 class。

页面上下文 class 不能代替状态 class，也不能在切换布局时被删除。

### 5.3 内部选择器精简

内部节点必须遵守 `rules/html_selector_simplification_rule.md`：

- 优先使用 `article`、`figure`、`section`、`header`、`h2`、`dl`、`dt`、`dd`、`nav`、`footer` 等语义标签；
- 稳定结构可以表达时，不新增仅用于样式的内部 class；
- 结构不足以稳定定位时，使用 `data-role`、`data-field` 等属性；
- 所有结构选择器必须带组件根作用域；
- 禁止新增 `img {}`、`a {}`、`header {}` 等宽泛全局选择器。

以下 class 可以保留：

- 状态：`active`、`selected`、`disabled`、`is-visible` 等；
- JS 行为钩子；
- 图标库和第三方 class；
- 经盘点确认的跨组件公共样式 class；
- 已有公共子组件要求的 class。

### 5.4 数据参数

文案、链接、图片、评分、标签、按钮状态等差异必须通过 include 参数传入，不能复制组件文件。

参数名称应表达数据或状态，不能把大段样式 class 当作普通数据。确需根级扩展 class 时，应使用单独且语义明确的参数，例如：

```text
component_state_class
component_context_class
button_state_class
```

## 6. CSS / LESS 架构

### 6.1 文件划分

公共样式与状态差异必须分开。以四状态组件为例：

```text
component-card.css
component-card.less
component-card-desktop-vertical.css
component-card-desktop-vertical.less
component-card-desktop-horizontal.css
component-card-desktop-horizontal.less
component-card-mobile-vertical.css
component-card-mobile-vertical.less
component-card-mobile-horizontal.css
component-card-mobile-horizontal.less
```

如果已有合适的基础 CSS / LESS，必须复用，不为满足文件示例而重复创建。

### 6.2 职责边界

- 基础文件：公共颜色、边框、阴影、通用节点样式和交互基础；
- 状态文件：该状态独有的方向、尺寸、网格、间距、内容显隐和顺序；
- 页面/列表容器：列数、卡片之间的外部间距、轮播宽度和页面专属排布。

组件内部布局与列表排布必须尽量解耦。不能把只适用于某个页面的三列宽度、`nth-child` 外边距等写成所有消费者都必须承受的组件默认值；确需保留旧 UI 时，使用明确的页面作用域或根级上下文 class。

### 6.3 状态入口

每份状态文件只能以对应根状态 class 为入口，例如：

```css
.product-card--mobile-horizontal > figure {}
.product-card--mobile-horizontal > section {}
.product-card--mobile-horizontal [data-field="brand"] {}
```

状态 CSS 不能依靠媒体查询决定当前模式。设备或方向变化由 JavaScript 替换状态 class；媒体查询只允许处理组件之外的页面上下文，或经计划明确说明的兼容需求。

### 6.4 样式约束

- 修改 `.css` 时必须同步修改对应 `.less`；
- 先查找并复用已有完全匹配的 CSS；
- 不引入 UI 库；
- 优先使用 Flex / Grid；
- 不大量使用绝对定位；
- 不改变现有颜色、字号、间距、圆角、阴影和交互效果；
- 不使用无组件根作用域的选择器；
- 只有在覆盖原有 `!important` 或全局强制规则且无等价低风险方案时才允许使用 `!important`，并在计划中说明原因；
- 使用 `header`、`footer` 等语义标签时，必须检查并中和命中的全局背景、内边距、对齐和安全区规则。

## 7. 状态 class 与切换逻辑

### 7.1 推荐命名

四状态组件使用以下映射：

| 设备 | 布局 | 状态 class |
| --- | --- | --- |
| PC | Vertical | `component-card--desktop-vertical` |
| PC | Horizontal | `component-card--desktop-horizontal` |
| Mobile | Vertical | `component-card--mobile-vertical` |
| Mobile | Horizontal | `component-card--mobile-horizontal` |

### 7.2 切换操作

每次同步状态时只能：

1. 计算目标状态；
2. 移除该组件完整的状态 class 集合；
3. 添加唯一目标状态 class；
4. 更新布局按钮自身的状态。

禁止在切换过程中：

- 改写内部 HTML；
- 切换到另一份数据；
- 显示另一套 PC / Mobile DOM；
- 克隆卡片；
- 给内部节点批量写入行内布局样式。

### 7.3 响应式与作用域

- 使用 `matchMedia` 监听项目确定的移动端断点；
- 使用 `event.currentTarget` 读取布局按钮状态；
- 切换逻辑必须限定在目标组件或目标容器作用域，不能误改页面上的 Store、Demand、Post 等其它组件；
- 页面存在多个独立列表时，每个列表必须有明确布局配置，不能依赖一个不受控的全局 `currentLayout`；
- 没有布局按钮的固定 Vertical / Horizontal 组件，也必须在 PC / Mobile 变化时替换对应设备状态 class；
- 动态新增卡片时，可使用限定目标容器的 `MutationObserver` 自动同步状态。

### 7.4 动态内容

静态页面中如果 JavaScript 需要生成或重新加载卡片：

- 优先克隆由统一 partial 生成的现有组件原型，再通过结构或 `data-*` 属性更新数据；
- 或使用由统一 partial 生成的 `<template>`；
- 禁止在 JavaScript 模板字符串中重新维护一整份组件结构；
- 动态卡片必须继承当前根状态 class、行为属性和可访问性属性。

## 8. 数据一致性

同一个组件从一种展示状态切换到另一种状态时，数据必须保持不变，包括：

- 卡片数量和顺序；
- 标题、图片和链接；
- 评分和评论数；
- Brand、Service、Price、Stock；
- 标签；
- 收藏和按钮状态。

如果旧模式使用了不同的演示数据或不同数量的卡片，必须在计划中列出差异并请求用户确认统一数据源。未经确认不能自行选择，也不能以“仅样式重构”为由悄悄改变数据。

## 9. 迁移与旧组件处理

### 9.1 分批迁移

按以下顺序实施和回归：

1. 建立基线截图和元素尺寸；
2. 新建统一组件和基础样式；
3. 完成一个最低风险状态；
4. 逐个完成其余状态；
5. 合并目标页面重复列表；
6. 接入状态切换和动态新增同步；
7. 处理页面上下文覆盖；
8. 逐个迁移批准范围内的消费者；
9. 清理无消费者的旧组件和旧规则；
10. 完成全量回归。

每一批通过检查后才能进入下一批。

### 9.2 共享消费者

- 修改或删除旧 partial 前，必须列出其全部直接和间接消费者；
- 未纳入用户批准范围的消费者必须保持不变；
- 旧 partial 仍有消费者时不得删除；
- 最后一个消费者迁移完成后，使用 `rg` 确认零引用，才能删除旧 partial 和只为旧结构服务的 CSS / JS；
- 为兼容页面行为而暂时保留的根 class 必须在计划和最终报告中说明。

### 9.3 最小修改

只修改统一组件所必需的 HTML、CSS / LESS、JS 和页面引用。不能顺带重命名无关 class、格式化整份文件或重构其它组件。

## 10. Playwright 视觉回归（组件统一任务必须执行）

用户明确要求按本规则统一组件，视为已授权对目标页面执行本节的 Playwright 回归；用户明确要求跳过时除外。使用 Playwright，不使用 Chrome MCP。

### 10.1 修改前基线

- 使用独立 Git worktree 或其它非破坏方式打开修改前版本；
- 禁止使用 `git reset --hard`、`git checkout --` 等破坏用户工作区的操作；
- 修改前后使用相同浏览器、视口、缩放、数据、滚动位置和布局状态；
- 基线环境与当前环境使用不同端口；
- 工作区已有改动必须保留，不能混入或覆盖。

### 10.2 截图矩阵

存在四种状态时必须覆盖：

1. PC Vertical；
2. PC Horizontal；
3. Mobile Vertical；
4. Mobile Horizontal。

固定布局组件至少覆盖 PC 与 Mobile。存在 hover、selected、disabled 等关键状态时，增加对应截图。

### 10.3 对比内容

逐项比较：

- 根卡片位置、宽度和高度；
- 图片、标记、标题和收藏按钮；
- 评分、字段、标签和按钮；
- 字体、行高、颜色、边框、圆角和阴影；
- 外部列表列数、间距、换行和分页位置；
- 页面其它区域是否发生非预期变化。

数据完全相同时，应执行同尺寸组件截图的像素差异检查，目标为 `0` 个变化像素。数据确实不同且已获用户确认时，必须至少比较对应元素的 bounding box，并在结果中说明像素对比不适用的原因。

测试结束后必须关闭 Playwright 浏览器和本地服务，并清理临时 worktree。

## 11. 行为回归

至少检查与目标组件有关的：

- PC / Mobile 跨断点切换；
- Vertical / Horizontal 切换；
- 收藏状态；
- 主操作按钮及 disabled 状态；
- 链接跳转；
- Show More；
- 分页、排序、筛选和重新加载；
- 动态新增组件；
- 轮播及基于旧根 class 的卡片数量计算；
- 空状态；
- 同页面其它业务组件不受影响。

## 12. 源码、构建与静态检查

### 12.1 HTML 源码

- 页面源码只改 `src/pages`；
- 可复用组件只改或新建 `src/partials/components`；
- 允许业务 partial include 统一组件；
- 根目录 `*.html` 只能通过构建脚本生成；
- 不允许手工修改根目录 HTML 产物。

### 12.2 必做命令

```bash
node scripts/build-pages.js
node --check <modified-js-file>
git diff --check
```

修改多个 JS 时逐个执行 `node --check`。没有修改 JS 时不需要虚构 JS 检查。

### 12.3 残留检查

根据任务实际名称执行等价检查：

```bash
rg "<old-component-name>|<old-root-class>" src css js
rg "<base-class>--" src/partials/components css js
rg "class=\"[^\"]+\"" src/partials/components/<component>.html
```

必须确认：

- 目标范围内不再输出重复 DOM；
- 每个组件只有一个互斥状态 class；
- CSS / LESS 文件成对存在且规则等价；
- 被删除的旧组件确实零引用；
- 有意保留的行为或兼容 class 已记录；
- 构建产物与源码一致；
- 没有语法错误和空白错误。

## 13. 完成汇报

最终汇报必须包含：

- 统一后的组件文件；
- 实际支持的状态与 class 映射；
- 迁移的页面和消费者；
- 保留或删除的旧组件；
- 数据统一策略；
- Playwright 视觉对比结果；
- 行为、构建、语法和残留检查结果；
- 尚未纳入范围的消费者或明确风险。

不得只报告“已封装完成”，也不得在视觉或行为尚未验证时声称与原版完全一致。

## 14. 实施计划模板

```markdown
# <组件名>统一封装计划

## 目标与非目标
- [ ] 明确统一范围
- [ ] 明确不修改的页面和组件

## 当前结构与消费者
- [ ] 列出所有旧 partial
- [ ] 列出直接/间接页面消费者
- [ ] 列出动态 HTML 生成入口
- [ ] 列出 CSS/LESS/JS 依赖

## 数据策略
- [ ] 对比各模式字段、数量和状态
- [ ] 确认唯一数据源

## 新组件
- [ ] 定义语义 HTML
- [ ] 定义 include 参数
- [ ] 分类根 class、状态 class、行为 class
- [ ] 定义结构和 data-* 选择器

## 样式与状态
- [ ] 基础 CSS/LESS
- [ ] 各状态 CSS/LESS
- [ ] 页面上下文覆盖
- [ ] 根状态切换逻辑
- [ ] 动态新增同步

## 分批迁移
- [ ] 最低风险页面
- [ ] 多模式页面
- [ ] 动态内容页面
- [ ] 旧组件零引用清理

## 回归
- [ ] 修改前 Playwright 基线
- [ ] 修改后同条件截图
- [ ] 像素/尺寸对比
- [ ] 行为回归
- [ ] 页面构建
- [ ] JS 语法检查
- [ ] CSS/LESS 同步检查
- [ ] 旧引用残留检查
- [ ] git diff --check
```
