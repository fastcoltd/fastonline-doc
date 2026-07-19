# 统一 Item 外层状态容器迁移计划

## 目标与非目标

- [x] 将商品、Store、Campaign、Demand、Post 五种统一 Item 的设备/方向状态 class 从组件 `<article>` 移到使用场景的公共外层容器。
- [x] 每个组件 partial 的根节点只保留稳定基础 class；Post 的 `post-all-card--featured` 等非互斥内容扩展 class 继续保留。
- [x] 保留现有状态 class 名称、状态 CSS/LESS 文件、组件 DOM、业务数据和页面外部布局，不新增页面专用组件状态。
- [x] 动态新增或轮播克隆的卡片通过外层状态容器自动继承样式，不再逐卡同步状态 class。
- [x] 不修改五种 Item 之外的旧业务组件，不调整本需求之外的视觉值和交互。

## 当前组件、消费者与动态入口

| 组件 | 唯一 partial | 独立页面 | 首页区域 | 动态入口 |
| --- | --- | --- | --- | --- |
| 商品 | `src/partials/components/item-all-card.html` | `src/pages/item-all.html` | `src/partials/index-best-items-section.html` | `js/items.js`、`js/carousel.js` |
| Store | `src/partials/components/store-all-card.html` | `src/pages/store-all.html` | `src/pages/index.html` / Best Stores | `js/carousel.js` |
| Campaign | `src/partials/components/compaign-all-card.html` | `src/pages/compaign-all.html` | `src/pages/index.html` / Hot Campaigns | `js/compaign-all-layout.js`、`js/carousel.js` |
| Demand | `src/partials/components/demand-all-card.html` | `src/pages/demand-all.html` | `src/pages/index.html` / Popular Demands | `js/demandpage.js`、`js/carousel.js` |
| Post | `src/partials/components/post-all-card.html` | `src/pages/post-all.html` | `src/pages/index.html` / Host Posts | `js/postpage.js`、`js/carousel.js` |

布局控制器为 `js/item-all-layout.js`、`js/store-all-layout.js`、`js/compaign-all-layout.js`、`js/demand-all-layout.js`、`js/post-all-layout.js`。首页通过 `js/index.js` 实例化五种控制器。

## 数据与组件结构策略

- [x] 删除组件 include 的 `item_card_state_class`、`store_card_state_class`、`compaign_card_state_class`、`demand_card_state_class`、`post_card_state_class` 参数。
- [x] 保留标题、图片、链接、标签、评分、收藏、按钮、ARIA 和其它业务参数。
- [x] 固定组件根节点分别为 `item-all-card`、`store-all-card`、`compaign-all-card`、`demand-all-card`、`post-all-card`。
- [x] Post 的 `post_card_context_class` 继续用于 `post-all-card--featured` 等非设备扩展。
- [x] 内部节点继续使用现有语义标签、结构选择器和 `data-role` / `data-field`，不新增仅用于样式的内部 class。

## 外层状态作用域

| 使用场景 | 状态容器 |
| --- | --- |
| 五个独立列表页 | 各页 `#items-grid` |
| 首页 Best Items | `#best-items` |
| 首页 Best Stores | `#best-store` |
| 首页 Hot Campaigns | `#hot-compaigns` |
| 首页 Popular Demands | `.popular-demands-wrapper` |
| 首页 Host Posts | `#hot-posts` |

- [x] 每个状态容器同时只保留一个对应组件的互斥状态 class。
- [x] 状态容器和卡片之间允许存在分页、轮播或滚动包装层，因此状态选择器使用“状态容器后代中的组件根”匹配。
- [x] 页面仍负责列数、间距、容器宽度、轮播和横向滚动；组件状态 CSS 只负责卡片内部布局。

## CSS / LESS 迁移

- [x] 保留现有 18 份状态 CSS 及对应 LESS，不增加新状态文件。
- [x] 将 `.component--state ...` 改为 `.component--state .component ...`；组件根样式改为 `.component--state .component`。
- [x] 逐一检查逗号选择器、伪类、直接子元素和页面外部布局选择器，避免状态 class 移位后改变命中集合。
- [x] CSS 与 LESS 同步修改并保持规则值不变。

## JavaScript 迁移

- [x] 五个布局控制器只在传入的状态容器上移除完整状态集合并添加唯一目标状态。
- [x] 删除仅用于逐卡状态同步的 `MutationObserver`、`syncCard` 和循环；保留布局按钮、断点监听和组件专用行为。
- [x] Store 标签溢出仍遍历卡片测量，但从公共外层状态判断 Horizontal 模式。
- [x] Campaign `createCard()`、Post 模板、商品/Demand 加载更多和首页轮播继续克隆统一 partial 生成的 DOM，插入后自动继承状态。

## 分批迁移顺序

- [x] 更新 `docs/unified-item-components.md` 和 `rules/component_unification_rule.md`，把“组件根状态”改为“使用场景外层状态”。
- [x] 商品：组件、两处消费者、四份 CSS/LESS、布局脚本。
- [x] Store：组件、两处消费者、四份 CSS/LESS、布局脚本和标签溢出。
- [x] Campaign：组件、两处消费者、四份 CSS/LESS、布局脚本和动态克隆。
- [x] Demand：组件、两处消费者、四份 CSS/LESS、布局脚本和动态克隆。
- [x] Post：组件、两处消费者、两份 CSS/LESS、布局脚本；保留特色卡片扩展。
- [x] 调整首页外部布局选择器，并检查五个控制器的实例化容器。

## 回归与检查

- [x] 检查四状态组件的 PC Vertical、PC Horizontal、Mobile Vertical、Mobile Horizontal；检查 Post 的 PC、Mobile。
- [x] 检查首页五个区域及商品四列、Store/Campaign 网格、Demand 双端容器、Post 列表/轮播外部布局。
- [x] 检查动态新增、轮播克隆、收藏、按钮、链接、标签溢出和布局按钮行为。
- [x] 使用 `rg` 确认组件 `<article>` 不再携带设备/方向状态 class，include 不再传状态参数，页面状态容器均有初始状态。
- [x] 使用 `rg` 确认 CSS/LESS 状态入口均通过外层状态容器匹配固定组件根。
- [x] 运行 `node scripts/build-pages.js`，保留构建生成的资源防缓存版本。
- [x] 对所有修改的 JavaScript 运行 `node --check`，并运行 `git diff --check`。
- [x] 按项目当前指令，本轮不调用 Playwright；如用户后续明确要求，再执行同视口视觉回归。

