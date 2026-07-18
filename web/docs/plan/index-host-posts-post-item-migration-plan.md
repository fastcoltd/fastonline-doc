# Index Host posts 迁移到统一 Post Item 计划

## 目标

- 使用唯一组件 `src/partials/components/post-all-card.html` 替换 `src/pages/index.html` 中 Host posts 的 6 个 Item。
- 保留首页现有标题、图片、链接、作者、摘要、Brand、标签和收藏状态数据。
- PC 与 Mobile 分别使用现有 `post-all-card--desktop`、`post-all-card--mobile` 状态。
- 保留首页现有轮播、分页圆点和轮播克隆行为。

## 明确不做

- 不还原首页旧 Post Item 的页面专用内部样式。
- 不新增组件 HTML、组件 class、状态 class、CSS 或 LESS 文件。
- 不迁移 Brand、Tag、Search 等其他页面的旧 Post Item。
- 不删除仍被其他页面使用的 `post-shared-item.html` 和旧变体 partial。

## 盘点结果

- 首页 Host posts：`src/pages/index.html` 中两组轮播页，每组 3 张，共 6 张静态 Item。
- 首页专用包装：`src/partials/index-host-post-item.html`，迁移后无消费者，可删除。
- 旧底层结构：`src/partials/components/post-shared-item.html`，仍被 Brand、Tag、Search 等页面使用，本次保留。
- 首页旧样式：`css/index.css` / `css/index.less` 中 `#hot-posts .figma-hot-post-item...`，迁移后无消费者，可同步删除。
- 轮播动态行为：`js/carousel.js` 通过 `cloneNode(true)` 克隆现有轮播页，没有手写 Item HTML。
- 现有状态逻辑：`js/post-all-layout.js` 当前固定操作 `#items-grid`，需要改为支持传入目标容器。

## 数据映射

| 旧参数 | 统一组件参数 |
| --- | --- |
| `cover_image` | `cover_image` |
| `item_link` | `item_link` |
| `item_title` | `item_title` |
| `user_avatar` | `author_avatar` |
| `user_name` | `author_name` |
| `item_desc` | `summary` |
| `brand_label` | `brand_label` |
| `brand_name` | `brand_name` |
| 旧变体 Brand 颜色 | `brand_color` |
| `kind_label` | `kind_label` |
| `item_tags` | `item_tags` |
| `like` / `like_icon` / `aria_pressed` | 同名参数 |

新增的无障碍参数使用已有组件参数 `cover_alt`、`author_avatar_alt`，不改变业务数据。

## 样式与布局职责

- 组件内部：复用 `post-all.css/.less`、`post-all-card-desktop.css/.less`、`post-all-card-mobile.css/.less`。
- 页面外部：保留 `.hot-posts-pager`、轮播容器、轮播页和圆点布局。
- 删除首页旧 `.figma-hot-post-item` 内部样式覆盖。
- `.hot-posts-pager` 只处理卡片之间的外部间距。

## 状态切换

- `PostAllLayout` 支持传入容器，默认仍使用 `#items-grid`，保证 `post-all.html` 兼容。
- 首页传入 `#hot-posts`，脚本同步该轮播下全部 `.post-all-card`。
- 视口变化时只替换卡片根节点的两个互斥状态 class。
- `MutationObserver` 覆盖轮播克隆产生的后代节点。

## 实施步骤

- [x] 盘点首页静态 Item、旧 partial、CSS / LESS、脚本和间接消费者。
- [x] 首页加载统一 Post Item 的基础与两个状态 CSS。
- [x] 6 个旧 include 改为直接 include `post-all-card.html`。
- [x] 首页接入可复用的 `PostAllLayout`。
- [x] 删除零消费者的首页专用旧 partial 和样式覆盖。
- [x] 运行页面构建、JavaScript 语法、残留引用和差异检查。

## 验证矩阵

- PC：首页 Host posts 全部使用 `post-all-card--desktop`。
- Mobile：首页 Host posts 全部使用 `post-all-card--mobile`。
- 轮播克隆节点保持统一组件 DOM 和当前状态 class。
- 6 张卡片的数据及收藏状态与迁移前一致。
- `post-all.html` 的默认状态脚本调用保持有效。
- 按项目规则，本轮用户未明确要求 Playwright，因此不执行浏览器截图验证。

## 检查命令

```sh
node scripts/build-pages.js
node --check js/post-all-layout.js
node --check js/index.js
rg -n "index-host-post-item|figma-hot-post-item" src/pages/index.html index.html css/index.css css/index.less
git diff --check
```
