# Blog Post Item 统一组件迁移计划

## 目标与非目标

- [x] 仅迁移 `blog.html` 的 Posts 列表，将三张旧卡片改为唯一公共组件 `post-all-card.html`。
- [x] PC / Mobile 共用一份组件 DOM，设备变化只切换列表外层状态 class。
- [x] 保留页面原有三条 Post 的顺序、封面、标题、详情链接、摘要和收藏状态。
- [x] 继续复用 Blog 页面现有列表间距，不新增页面专用组件 class 或组件内部 CSS。
- [x] 不修改 Blog 介绍、侧栏、分页及其它页面。

## 当前结构与消费者

- [x] 目标列表为 `#items-grid.hot-posts-pager`，旧入口是
  `blog-post-item-v2-normal-liked.html`、`blog-post-item-v2-alt-unliked.html`、
  `blog-post-item-v2-red-liked.html`。
- [x] 三个数据 partial 均只消费 `components/blog-post-item-v2.html`，反向搜索确认除
  `blog.html` 外没有其它页面消费者。
- [x] 旧组件内部样式只存在于 `css/detail/blog.css/.less` 的
  `.blog-post-item-v2*` 规则中。
- [x] `js/blog.js` 的 Show More 会复制列表内所有非空状态子节点，且页面当前使用
  `PageLayout`；迁移后需限定为克隆 `.post-all-card` 并接入 `PostAllLayout`。
- [x] 公共收藏行为由 `js/common.js` 对 `.icon-aixin` 事件委托处理，统一组件已经保留
  所需 class、`data-like` 和 `aria-pressed`。

## 数据映射

- [x] 三张卡片继续使用原封面、标题、详情链接、摘要和 `已收藏 / 未收藏 / 已收藏` 状态。
- [x] Brand 继续使用 `Twitch`，通过统一参数传入 `Brand：` 与公共颜色变量。
- [x] 原卡片没有作者字段；统一 Post 组件所需作者采用当前 Blog 的真实作者
  `Erinasa` 及页面现有头像。
- [x] 原 `Flash Sale`、`In stock` 标签转为统一组件的 Kind 链接。
- [x] 旧实现的评分、Reads、Comments、Paid 不在公共 Post Item 参数结构内；按统一规则
  直接采用标准组件结构，不新增 Blog 私有字段或内部样式。

## 组件、状态与样式

- [x] HTML 只 include `src/partials/components/post-all-card.html`，不复制其内部结构。
- [x] 加载公共 `css/post-all.css`、`post-all-card-desktop.css`、
  `post-all-card-mobile.css`；不修改公共组件样式。
- [x] 初始在 `#items-grid` 设置 `post-all-card--desktop`，由
  `js/post-all-layout.js` 在 768px 断点切换为 `post-all-card--mobile`。
- [x] 组件根始终只保留 `.post-all-card`，不携带设备状态 class。
- [x] 页面现有 `.hot-posts-pager` 继续只负责列表宽度、方向和卡片外部间距。

## 实施顺序

- [x] 使用独立临时 Git worktree 完成 PC / Mobile 修改前 Playwright 基线。
- [x] 替换 Blog 源页面 include、样式引用和状态脚本。
- [x] 将 Show More 改为仅克隆统一卡片，同时保留空状态位置。
- [x] 反向确认零引用后删除旧 partial 与只服务旧结构的 CSS / LESS 规则。
- [x] 运行页面构建、JS 语法、CSS / LESS 同步、残留与空白检查。
- [x] 使用相同视口完成修改后 Playwright 视觉和行为回归。
- [x] 更新 `codex_tasks/TASKS.md` 状态并清理临时服务、浏览器和 worktree。

## Playwright 基线与回归

- [x] Desktop：1440 × 1200；基线为 3 张旧卡片、收藏状态 `1/0/1`、1 个空状态，
  Blog 侧栏可见，页面无 console / page error。
- [x] Mobile：390 × 844；基线为相同 3 条数据和收藏状态、1 个空状态，Blog 侧栏默认
  隐藏，页面无 console / page error。
- [x] 修改后检查 PC / Mobile 外层状态 class、卡片数量、数据、链接、收藏和空状态。
- [x] 跨 768px 调整视口时只切换 `#items-grid` 的设备状态 class，卡片 DOM 不重建。
- [x] Show More 将 3 张统一卡片复制为 6 张，空状态仍只有一个且保持末尾位置。
- [x] 收藏切换和 Mobile 侧栏开关行为正常，页面无 console / page error。
- [x] 统一组件与旧组件结构和字段不同，不做“零像素差异”声明；按公共 Post Item 标准样式
  检查关键尺寸、溢出和响应式状态。

## 完成检查

```bash
node scripts/build-pages.js
node --check js/blog.js
node --check js/post-all-layout.js
git diff --check
```

- [x] `blog.html` 根目录产物与 `src/pages/blog.html` 构建结果一致。
- [x] 目标列表只输出 `.post-all-card`，没有 `.blog-post-item-v2` 或旧 include 残留。
- [x] 被删除的旧 partial 和旧样式规则均为零引用。
- [x] CSS / LESS 对应旧规则同步删除，公共 Post CSS / LESS 未发生页面私有改动。

## 实际回归结果

- Desktop 1440 × 1200：`#items-grid` 唯一状态为 `post-all-card--desktop`，三张统一卡片
  尺寸正常、无横向溢出，标题、封面、作者、Brand、标签、链接与收藏初始状态正确。
- Mobile 390 × 844：唯一状态切换为 `post-all-card--mobile`，三张卡片继续复用原 DOM，
  首卡尺寸为 358 × 142，无横向溢出。
- 视口跨断点后预先写入首卡的 DOM 标记仍存在，确认未删除或重建组件。
- Show More 后卡片由 3 张变为 6 张，空状态仍为 1 个并保持列表末尾。
- 收藏按钮图片与 `aria-pressed` 正常切换；Mobile 侧栏可打开、关闭并同步 ARIA。
- 修改后页面无 console error、page error；Playwright 截图人工检查未发现组件裁切、
  重叠或页面其它区域异常。
- `build-pages.js`、两份 JS 语法检查、LESS 编译、残留搜索和 `git diff --check` 均通过。
