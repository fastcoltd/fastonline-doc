# Index Best Stores 迁移到统一 Store Item 计划

## 目标

- 使用唯一组件 `src/partials/components/store-all-card.html` 替换首页 Best Stores 的 12 个 Item。
- 保留首页原有店铺头像、链接、标题、简介、评分、详情、Brand、Service、标签与收藏状态。
- 首页固定使用 Vertical 方向，PC / Mobile 只切换现有 Vertical 状态 class。
- 保留首页现有轮播、每页 6 张卡片、PC 三列与 Mobile 两列的外部布局。

## 明确不做

- 不还原首页旧 Store Item 的页面专用内部样式。
- 不新增组件 HTML、组件状态 class、组件 CSS 或 LESS 文件。
- 不迁移 `tag-all.html` 中仍在使用的旧 Store Item。
- 不删除仍有消费者的旧 Store partial 和共享样式。

## 盘点结果

- `src/pages/index.html` 包含两组 Best Stores 轮播页，每组 6 张，共 12 张静态 Item，其中 1 张为已收藏状态。
- 旧入口为 `src/partials/index-best-store-item.html` 和 `src/partials/index-best-store-item-liked.html`，底层结构为 `src/partials/components/best-store-item.html`。
- 上述旧 partial 仍被 `src/pages/tag-all.html` 使用，本轮不能删除。
- `js/carousel.js` 通过 `cloneNode(true)` 克隆现有轮播页，没有在 JavaScript 中维护另一份 Store Item HTML。
- `js/store-all-layout.js` 当前固定操作全页面布局按钮和 `#items-grid`，需要支持限定到首页 Best Stores 轮播容器。
- `css/index.css` / `css/index.less` 中旧 `.figma-best-store-item` 内部覆盖迁移后在首页失效，应从首页样式中移除。

## 数据映射

- `like`、`like_icon`、`aria_pressed`：保留原收藏状态。
- `avatar_src`：`image/figma-best-store-avatar.png`。
- `store_link`、`store_name`、`store_summary`：保留旧卡片链接、名称和简介。
- `rating_score`、`rating_recommend`：保留 `4.3`、`(200)`。
- `store_detail`、`brand_name`、`service_name`：保留旧详情、Quora、Cloud Service。
- `store_tags`：保留 3 个 ChangeUser 标签及原链接。
- `mark_text`：旧首页卡片无标志，传入空字符串；统一组件基础样式会隐藏该标志。
- `store_card_state_class`：初始为已有的 `store-all-card--desktop-vertical`。

## 样式与外部布局

- 组件内部复用 `store.css/.less`、`store-all-card-desktop-vertical.css/.less`、`store-all-card-mobile-vertical.css/.less`。
- `.best-store-pager` 继续负责轮播页 flex、换行、列数和卡片外部间距。
- PC 大屏保持三列，769–900px 保持两列，Mobile 保持两列。
- 首页只覆盖卡片作为轮播子项时的宽度和外边距，不覆盖组件内部节点。
- 删除首页中失效的旧 Store 标签内部样式选择器；共享 `store.css/.less` 中旧样式因 `tag-all.html` 仍在使用而保留。

## 状态切换

- 扩展现有 `StoreAllLayout` 构造参数，使 Item 容器和布局按钮可限定作用域；无参数调用保持 `store-all.html` 原行为。
- 首页传入 `#best-store` 且禁用布局按钮作用域，方向固定为 Vertical。
- PC 使用 `store-all-card--desktop-vertical`，Mobile 使用 `store-all-card--mobile-vertical`。
- MutationObserver 覆盖轮播克隆生成的 Store Item，并只切换根节点已有互斥状态 class。

## 实施步骤

- [x] 盘点统一组件、首页静态 Item、旧 partial 消费者、CSS / LESS 和轮播脚本。
- [x] 首页加载统一 Store Item 的两份 Vertical 状态 CSS。
- [x] 12 个旧 include 改为直接 include `store-all-card.html`。
- [x] 首页接入限定作用域的 `StoreAllLayout`。
- [x] 调整首页外部轮播布局并删除失效的旧内部覆盖。
- [x] 运行页面构建、JavaScript 语法、残留引用和差异检查。

## 验证矩阵

- PC：首页 Best Stores 全部使用 `store-all-card--desktop-vertical`，每页 6 张、每行 3 张。
- Mobile：首页 Best Stores 全部使用 `store-all-card--mobile-vertical`，每行 2 张。
- 轮播克隆节点保持统一组件 DOM 和当前设备状态 class。
- 12 张卡片数据及 1 个已收藏状态保留。
- `store-all.html` 的四状态切换和 `tag-all.html` 的旧 Store Item 保持兼容。
- 按项目规则，本轮用户未明确要求 Playwright，因此不执行浏览器截图验证。

## 检查命令

```sh
node scripts/build-pages.js
node --check js/store-all-layout.js
node --check js/index.js
rg -n "index-best-store-item|figma-best-store-item" src/pages/index.html index.html css/index.css css/index.less js/index.js
git diff --check
```
