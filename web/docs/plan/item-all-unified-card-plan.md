# item-all 四模式统一 Item 组件实施计划

## 1. 目标与已确认约束

- 目标页面：`src/pages/item-all.html`。
- 每条 Item 只生成一份 HTML，Vertical / Horizontal 不再各维护一份列表，PC / Mobile 不再各维护一份卡片 DOM。
- 新建一个 `src/partials/components` 组件，通过根节点的四个互斥状态 class 控制四种展示：
  - `item-all-card--desktop-vertical`
  - `item-all-card--desktop-horizontal`
  - `item-all-card--mobile-vertical`
  - `item-all-card--mobile-horizontal`
- 根节点始终保留基础 class `item-all-card`，切换时只替换上述状态 class，不替换内部 DOM。
- 四种状态的尺寸、字号、颜色、间距、圆角、阴影、内容显隐和交互效果与重构前保持一致。
- 统一列表采用当前默认 Vertical 列表的数据；模式切换只改变展示，不改变 Item 数据。
- 新增四份 CSS，并为每份 CSS 同步维护对应 LESS。
- 不修改其他页面的 Item HTML，不修改现有共享 Item partial，避免影响其它消费页面。
- HTML 源码只通过 `src/pages` / `src/partials` 修改，根目录 `item-all.html` 由构建脚本生成。
- 本轮不调用 Playwright，完成代码级构建、语法和选择器回归后交由用户确认视觉效果。

## 2. 当前实现基线

### 2.1 页面源码

文件：`src/pages/item-all.html`

- 第 20–28 行：现有公共样式及 `item-all.css` 引用。
- 第 54–58 行：Vertical / Horizontal 控制按钮。
- 第 70–95 行：两套独立列表结构：
  - 第 76–85 行为 Vertical 容器，使用 `item-card-vertical.html`。
  - 第 86–95 行为 Horizontal 容器，使用 `item-all-horizontal-item-responsive.html`。
- 第 653–657 行：加载后为旧 Vertical 卡片补充 `item-all-best-items-item` class。
- 页面底部当前引用共享 `js/layoutswitch.js`。

### 2.2 现有组件

- `src/partials/components/item-card-vertical.html`：PC / Mobile Vertical 共用组件，但内部依赖较多样式 class。
- `src/partials/components/item-all-horizontal-item.html`：PC Horizontal 组件。
- `src/partials/components/item-all-horizontal-mobile-item.html`：Mobile Horizontal 组件。
- `src/partials/components/item-all-horizontal-item-responsive.html`：同时生成两份 Horizontal DOM，再通过 CSS 显隐。

上述文件仍被其它页面消费，本轮全部保留不改。

### 2.3 现有样式来源

- `css/items.css` / `css/items.less`：当前 Vertical 卡片基础、PC Vertical 与 Mobile Vertical 规则。
- `css/item-all.css` / `css/item-all.less`：当前 item-all PC Horizontal、Mobile Horizontal、双容器显隐和页面局部规则。
- `css/common.css` / `css/common.less`：评分、标签、字段、标题、按钮等共享基础规则。

## 3. 新组件结构和选择器分类

### 3.1 新文件

新建 `src/partials/components/item-all-card.html`。

组件采用语义化结构：

- `article`：唯一组件根节点，保留基础 class、一个状态 class。
- `figure > img + span[data-role="mark"]`：封面和标记。
- `section > header > h2 > a`：标题。
- 评分区域：继续 include 已有评分组件，保证星级样式及共享行为不变。
- `dl > div[data-field] > dt + dd`：Brand、Service、Price、Stock。
- `nav > a > span`：标签列表；更多标签使用 `data-role="more"`。
- `footer > button`：购买按钮。
- 收藏按钮：继续 include `item-like-button.html`。

### 3.2 页面独有、可使用结构选择器的内部节点

以下节点不增加样式 class，使用明确根作用域和结构/属性选择器：

- `.item-all-card > figure`
- `.item-all-card > figure > img`
- `.item-all-card > figure > [data-role="mark"]`
- `.item-all-card > section`
- `.item-all-card > section > header`
- `.item-all-card > section > header a`
- `.item-all-card > section > dl`
- `.item-all-card [data-field="brand"]`
- `.item-all-card [data-field="service"]`
- `.item-all-card [data-field="price"]`
- `.item-all-card [data-field="stock"]`
- `.item-all-card > section > nav`
- `.item-all-card > section > nav > a`
- `.item-all-card > section > footer > button`

所有选择器均带 `.item-all-card` 根作用域，不新增 `img {}`、`a {}` 等全局选择器。

### 3.3 共享/行为/状态 class，保留不动

- `item-star-box`、`item-star-box-pc`、`item-star-box-mobile`：现有评分 partial 和共享 CSS 所需。
- `icon-aixin`：`js/common.js` 收藏点击代理和共享样式所需。
- `item-buy-btn`：`js/common.js` 购买弹层点击代理所需。
- `disabled`：按钮禁用状态，属于状态 class。
- 页面外部现有 `layout-switch`、`active`：布局按钮行为和状态所需。

### 3.4 保留不动的非目标页面 class

- `best-items-item`、`figma-best-item`、`item-all-horizontal-item*` 等旧组件 class：其它页面仍在使用，本轮不删除其 partial 或共享样式。
- `src/pages/item-all.html` 中 header、filter、pagination、footer、modal 等非 Item 模块 class：不属于本需求，保持不动。

## 4. 四份 CSS / LESS

新建：

1. `css/item-all-card-desktop-vertical.less` + `.css`
2. `css/item-all-card-desktop-horizontal.less` + `.css`
3. `css/item-all-card-mobile-vertical.less` + `.css`
4. `css/item-all-card-mobile-horizontal.less` + `.css`

规则要求：

- 每份文件只以对应根状态 class 为入口。
- 四份规则不依赖媒体查询决定布局；是否为 PC / Mobile 由 JS 替换根状态 class 决定。
- 共享的卡片基础规则放在现有 `css/item-all.less` / `.css` 的 `.item-all-card` 根作用域中，四份状态文件只维护差异，避免重复。
- 样式值从现有 `items.less` 和 `item-all.less` 原样迁移，不顺带调整视觉参数。
- `.less` 使用嵌套表达，`.css` 保持展开后的等价选择器和声明。

## 5. 页面改造

修改 `src/pages/item-all.html`：

1. 在 `item-all.css` 后依次加载四份新 CSS。
2. 将第 76–95 行两套列表合并为一个 `.items-container` 和一个 `#items-grid`。
3. 五条演示数据全部 include 新的 `item-all-card.html`，初始状态为 `item-all-card--desktop-vertical`。
4. 标签参数改为无内部样式 class 的语义标签 HTML。
5. 保留空状态、Show More、分页组件及原有顺序。
6. 删除第 655–657 行为旧卡片补 class 的逻辑。
7. 页面不再引用共享 `js/layoutswitch.js`，改为引用新的 `js/item-all-layout.js`；其它页面保持原引用。

## 6. 根 class 切换逻辑

新建 `js/item-all-layout.js`：

- 初始布局为 `vertical`。
- 使用 `matchMedia('(max-width: 768px)')` 判断设备状态。
- 建立状态映射：
  - desktop + vertical → `item-all-card--desktop-vertical`
  - desktop + horizontal → `item-all-card--desktop-horizontal`
  - mobile + vertical → `item-all-card--mobile-vertical`
  - mobile + horizontal → `item-all-card--mobile-horizontal`
- 切换时：
  1. 更新布局按钮的 `active` 状态。
  2. 遍历 `.item-all-card`。
  3. 移除四个旧状态 class。
  4. 只添加当前状态 class。
- 监听媒体查询 `change`，跨过 768px 时执行同样的根 class 替换。
- 不增删、克隆或显隐另一套 Item DOM，不修改列表容器布局 class。
- Show More 复制现有节点时会继承当前根状态 class，原行为保持不变。

## 7. 唯一性、特异性和影响面核对

- 新样式根作用域 `item-all-card` 为 item-all 新组件独有，不命中其它页面旧卡片。
- 四个状态 class 互斥；JS 每次先移除完整状态集合，再添加一个状态，避免样式叠加。
- 内部结构选择器从根节点开始，特异性不低于单个旧内部 class；需要覆盖共享评分/收藏规则时，使用根作用域增加特异性，不使用 `!important`，除非原规则已依赖 `!important`。
- 不改 `js/layoutswitch.js`，其它页面布局切换行为不变。
- 不删除旧 partial 和旧 CSS，使用它们的其它页面不受影响。
- `item-all.css` 只移除/替换 item-all 页面已不再使用且不会影响其它消费者的页面显隐规则；跨页面仍有引用的旧组件规则保留。

## 8. 分批执行清单

- [x] A. 新建统一组件，检查内部 class 分类。
- [x] B. 新建四份 LESS/CSS，先完成基础和 PC Vertical。
- [x] C. 完成 Mobile Vertical，并与当前移动端规则逐项对照。
- [x] D. 完成 PC Horizontal，并与当前 Horizontal 规则逐项对照。
- [x] E. 完成 Mobile Horizontal，并与当前独立移动组件规则逐项对照。
- [x] F. 将 item-all 页面合并为单列表。
- [x] G. 新建 item-all 专用切换脚本，只切根状态 class。
- [x] H. 构建根目录页面并完成回归检查。

## 9. 回归命令

```bash
node --check js/item-all-layout.js
node scripts/build-pages.js
git diff --check
rg "item-all-horizontal-item-responsive|items-grid-horizontal|items-container-horizontal|item-all-best-items-item" src/pages/item-all.html
rg "class=\"[^\"]+\"" src/partials/components/item-all-card.html
rg "item-all-card--" src/partials/components/item-all-card.html css/item-all-card-*.css css/item-all-card-*.less js/item-all-layout.js
```

额外检查：

- 构建后的根目录 `item-all.html` 中，每条演示 Item 只出现一个 `.item-all-card` 根节点。
- 源码和产物中不再存在 item-all 页面的第二套 Horizontal 列表。
- CSS/LESS 四个文件成对存在，状态选择器和声明保持一致。
- `git status --short` 中的源码改动只包含本需求相关文件；构建脚本会刷新全部根目录页面的资源版本号，其批量产物变化属于预期。
