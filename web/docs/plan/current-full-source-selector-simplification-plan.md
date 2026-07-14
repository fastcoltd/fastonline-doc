# 当前源码全量 HTML 选择器精简计划

> 制定日期：2026-07-12  
> 唯一分析基线：制定本计划时工作区中的当前源码。本文不采用 Git 历史、旧计划的“已完成/不可做”结论。  
> 范围：`src/pages/**/*.html` 31 个文件、`src/partials/**/*.html` 93 个文件，共 124 个 HTML 源文件；以及所有命中选择器的 `css/**/*.css`、对应 `.less` 和 `js/**/*.js`。  
> 最高目标：删除所有能够被稳定父级/结构/属性选择器等价替代的样式 class，同时保证 UI、响应式样式和 JS 行为完全不变。

## 1. 执行边界

1. 页面内联结构只改 `src/pages`；共享组件只改 `src/partials`。根目录 HTML 只通过 `node scripts/build-pages.js` 生成。
2. 本任务是“全项目源文件任务”，因此共享组件及其全部消费页都在范围内；不会因为组件被多页使用而跳过。
3. JS 使用的内部 class 也纳入：先把 JS 改成父级作用域、稳定标签、`data-*` 或控件属性选择器，再删 HTML class、迁移 CSS/LESS。
4. 以下内容不删除：
   - 状态/修饰 class：`active`、`open`、`selected`、`disabled`、`loading`、布局变体等；
   - iconfont class：`iconfont`、`icon-*`；
   - 根容器、布局容器以及用于 include 参数注入的 class；
   - 无共同稳定父级结构的真正跨组件通用类；
   - 删除后只能依赖脆弱的全局顺序、宽泛全局标签或文案内容定位的 class。
5. 每个候选在执行时必须验证“改前 class 命中元素集合 = 改后结构选择器命中元素集合”。不相等则停止该候选，记录为保留，不能强删。

## 2. 当前全量扫描结论

- 当前共有 124 个 HTML 源文件。
- 22 个 partial 是纯 include/参数包装器，本身没有可精简的实际 DOM；它们随底层组件变化自动更新。
- 5 个认证页面只有 include 和页面元信息，页面自身没有可删的样式 class；修改发生在它们消费的 auth/footer partial。
- 剩余文件中，候选主要集中为六个依赖族：
  1. 多页面重复的 home-menu / 通用弹窗内联结构；
  2. site header/footer/search/auth 公共 partial；
  3. 页面筛选、排序、分页、面包屑公共 partial；
  4. item/store/demand/campaign/post/search 卡片组件族；
  5. detail/review/statistics/FAQ 组件族；
  6. 各页面独有的文章、详情、表单和购买弹窗结构。

## 3. 执行前基线

- [ ] 记录 `git status --short`，不得覆盖用户已有修改。
- [ ] 执行 `node scripts/build-pages.js`，确保当前源文件可以构建。
- [ ] 执行 `git diff --check`。
- [ ] 对全部 JS 执行 `find js -name '*.js' -not -name '*.min.js' -print0 | xargs -0 -n1 node --check`。
- [ ] 为每一批生成 class 命中清单：HTML 文件、CSS/LESS 规则、JS 字符串/模板、include 消费页。
- [ ] 对每个目标选择器比较改前/改后命中数量、标签类型、父级路径和特异性。

## 4. 批次 A：全站重复内联结构

### A1. Home menu

涉及除认证页外的大多数 `src/pages/*.html`。以实际 `rg -l 'home-menu-' src/pages` 结果作为完整消费集合，一次性处理，不逐页拆开。

优先结构化的内部类族：

| class 族 | 目标定位方式 | JS 联动 |
|---|---|---|
| `home-menu-login-text`、`home-menu-signin-text`、`home-menu-seller-text`、`home-menu-other-text` | 各自按钮/容器下的直接语义子元素 | `js/common.js`、`js/homemenu.js` 中改为父级作用域 |
| `home-menu-user-icon/name/email/logout` | user 区块下 `img`、文本节点和退出按钮 | 同步用户菜单查找逻辑 |
| `home-menu-item-title`、`home-menu-item-title-arrow`、`home-menu-item-title-content` | `.home-menu-item` / title 容器下的直接 `p/img/span` | 展开事件绑定改绑稳定父级或 `data-menu-*` |
| `home-menu-second-page-title/group-title/group-item` | second-page 对应容器下的标题及列表语义标签 | 返回、展开逻辑改为父级作用域 |
| `language-btn`、`gmt-btn`、`currency-btn` 里的内部语义节点 | 保留按钮行为根 class，只删内部纯展示 class | `common.js` 只保留根按钮钩子 |
| `notice-icon`、`language-gmt-country-close-btn` | 父级下唯一图标；若承担动作则给父级 `data-action` | 同步事件委托 |

保留：home-menu 根布局 div class、状态 class、菜单项身份/路由所需 `data-*`、iconfont class。

执行文件：`rg -l 'home-menu-' src/pages` 返回的全部页面，`css/common.css`、`css/common.less`、`js/common.js`、`js/homemenu.js` 及实际命中的其它 JS。

### A2. 多页面购买弹窗

涉及当前命中 `purchase-qty-*`、`close-buy-modal-btn`、`item-price-*` 的全部页面。

- 数量减/显示/加：改为弹窗父级下 `button:first-of-type`、输出节点、`button:last-of-type`，或增加 `data-purchase-action`；CSS 使用父级结构/属性选择器。
- 关闭、购买按钮：行为身份优先迁移为 `data-action="close|buy"`，删除只为 CSS/JS存在的展示 class。
- `update-time`、原价、现价：用价格行父级下的语义/属性定位；真正跨弹窗复用且没有共同父级的价格类保留。
- 同步 `js/item-purchase.js` 及实际引用这些 class 的 JS。

## 5. 批次 B：公共站点 partial

### B1. Header 与移动搜索（必须同批）

文件：

- `src/partials/components/site-header.html`
- `src/partials/components/header-search-mobile.html`
- `css/common.css` / `css/common.less`
- `js/common.js` 及搜索相关 JS

候选：搜索 label 文本/图标、输入框/搜索图标、header logo、items label 文本/图标、seller/signin/join 文本、用户图标与 badge。行为选择器改成组件根节点 + `:scope`、稳定 input 属性或 `data-role`。`header-menu-item` 等菜单身份类在无法用数据属性等价替代前保留。

### B2. Footer、cookies、浮动按钮

文件：

- `src/partials/components/site-footer.html`
- `src/partials/components/site-cookies-tips.html`
- `src/partials/components/site-slide-btns.html`

候选：`footer-item-title-icon`、`footer-item-text`、`footer-logo`、`follow-us-text`、cookie 内部链接文字；同步 footer 折叠 JS。客服、回顶等动作应迁移为父级/`data-action`，不使用宽泛 `img` 全局选择器。

### B3. Auth

文件：

- `src/partials/signin-modal.html`
- `src/partials/components/auth-static-main.html`
- `src/partials/components/auth-static-init-script.html`
- 五个 `src/pages/signin-*.html`（页面自身仅验证 include，无直接 class 删除）
- `css/signin.css` / `css/signin.less`
- `css/auth-pages.css` / `css/auth-pages.less`
- `js/login.js`

候选：close/back 图标、Google/Apple 图标与文字、分割线文字、remember/agree label、重置密码文字、验证码时间与按钮、表单 title/tip/submit。密码显示、验证码发送、提交等行为迁移为 `type`、父级、`data-auth-action`；错误/有效/禁用状态 class 保留。

## 6. 批次 C：公共页面结构 partial

| 文件 | 计划 |
|---|---|
| `page-home-breadcrumb.html` | icon/text/separator/current 改成 breadcrumb 根下的直接标签或 `aria-current`；保留 breadcrumb 根 class。同步所有页面的兼容覆盖。 |
| `page-pagination.html` | prev/next 用 `rel`/`aria-label` 或边界结构；selection/go-to 内部文字改父级标签；`pagination-item` 若 JS 依赖则保留根项或迁移 `data-page`。 |
| `page-sort-dropdown.html` | `page-sort-icon` 改父级唯一 img 或 `data-value`；同步 sort JS。 |
| `page-top-sticky-main.html` | 检查嵌套 breadcrumb/header 消费关系；只处理真实内部展示节点。 |
| `item-all-filter-panel.html` | 图标、数字、input/label/按钮内部类按 filter-group 作用域化；行为身份迁移 `name`/`data-filter-*`；根 group 与状态类保留。 |
| `list-empty-state.html` | `list-empty-state-text` 改根容器下直接文本标签；`no-data-wrapper` 若承担 JS 显隐则保留或迁移 `data-empty-state`。 |
| `show-more-button.html` | `load-more-text` 改 `.show-more-btn > span`；同步所有 show/hide 文案 JS。 |
| `detail-page-menu.html` | 若 class 同时承担选项身份，迁移 `data-detail-section`；内部展示标签结构化。 |

## 7. 批次 D：卡片组件族

### D1. Rating 与 like 基础组件

- `rating-score-only.html`
- `rating-with-count.html`
- `rating-with-count-mobile.html`
- `item-like-button.html`

分数、推荐数、星图标使用 rating 根容器下直接标签定位；所有 JS 模板和动态评分更新同步。收藏按钮保留行为根或迁移 `data-action="like"`，内部图标 class 可删。

### D2. Item 卡片族

- `item-all-horizontal-item.html`
- `item-all-horizontal-item-responsive.html`
- `item-all-horizontal-mobile-item.html`
- `search-all-item-horizontal-mobile-item.html`
- `item-card-vertical.html`
- 顶层 `src/partials/item-all-horizontal-item.html` 只验证参数包装

按共同子结构分别处理 cover、title 内标记/文字、brand/service/price/stock 的 label/value/icon、buy 按钮内部节点。`item-title`、`item-brand`、`item-service`、`item-price`、`item-stock` 只有在全部消费结构都能得到精确等价选择器时才整体删除；否则保留为真正通用类，不允许按单组件删一半。

### D3. Store 卡片族

- `best-store-item.html`
- `store-all-horizontal-item.html`
- `store-all-horizontal-item-responsive.html`
- `store-all-horizontal-mobile-item.html`
- `store-all-vertical-item-responsive.html`
- `store-all-vertical-mobile-item.html`

集中核对 `store-item-icon`、`store-item-detail`、`item-desc` 及 brand/service/tag 子结构。只有六种结构全部能由各自组件根 + 共同子容器精确命中时才删除共享 class；需要多组组件根联合选择器时，在 store CSS/LESS 中统一定义。

### D4. Demand 卡片族

- `demand-shared-item.html`
- `demand-all-horizontal-mobile-item.html`
- `demand-all-vertical-mobile-item.html`
- `demand-detail-bidding-item.html`
- `demand-detail-tabs-top.html`
- `demand-all-figma-item.html`、`demand-all-figma-items.html` 仅验证 include 参数

处理移动端 icon/stat label/avatar-more、竞标用户头像/名称/字段信息、tabs 文本。所有由 include HTML 参数注入的 `item-service-*`、tag、bidder 结构必须同时修改参数提供方，不能只改组件模板。

### D5. Campaign/Post/Blog 卡片族

- `hot-compaign-item.html`
- `compaign-all-horizontal-item.html`
- `post-shared-item.html`
- `blog-post-item-v2.html`
- 对应 15 个顶层 include 包装器

处理封面、标题、广告标记、统计项 label/value、用户头像/名称、摘要、brand/kind、产品文字、blog 评分和属性 label/value。同步 `js/compaignpage.js`、`js/postpage.js`、`js/tagpage.js` 及所有动态 HTML 模板字符串；参数中内嵌 HTML 的 class 也属于本批范围。

### D6. Search 卡片族

- `search-all-post-item.html`
- `search-all-store-item.html`
- `search-all-demand-item.html`
- `search-all-campaign-item.html`
- `search-all-featured-item.html`

处理 title highlight、summary、date-range、bidder-label、products、view/like count。`summary-box/summary-box2` 仅在两个组件的目标段落可由各自根精确限定时删除；不能改成宽泛 `.card-content > p` 后误命中其它卡片。

## 8. 批次 E：详情、FAQ、统计组件

### E1. Brand/FAQ

- `brand-all-item.html`
- `brand-faq-item.html`
- `brand-faq-section.html`
- `brand-hot-demands-section.html`
- `brand-hot-items-section.html`
- `brand-hot-posts-section.html`
- `brand-hot-item-card.html`（include 包装）

`brand-faq-item` 处理 header icon/title/arrow、view-more、action icon/count；arrow 和 action 同步 `js/brand.js`、资源动作 JS。状态图标 default/active class在能以父级状态 + `:first/last-child` 等价表达前保留。

### E2. Review

- `store-detail-review-item.html`
- 页面内联的 item/post/system-post review 结构

把 user avatar/name/time/status、content、info title/desc/icon、reviewer、tool text/icon 按 review 根作用域统一结构化。同步 `js/detail/item-detail.js`、`js/detail/store-detail.js`、`js/detail/post-detail.js`、`js/detail/system-post-detail.js`。yes/no/helpful 状态改为父项状态或 `data-action`，不能仅依赖图标顺序。

### E3. Statistics

- `statistics-bar-panel.html`
- `statistics-rating-chart-panel.html`
- `statistics-period-header.html`

`main-title` 改 `.statistics-frame > h2`；三个 statistics number span 使用明确 `data-stat-role` 优先于脆弱 nth-child；`tab-text` 改 tab 下 span 或 `data-period` 并同步 item/store detail JS。rating 内部类随 D1 一起处理。

### E4. Resource article

- `resource-all-item.html`
- `resource-detail-article-content.html`

处理文章 action label/icon/count、share label/icon、reviews/other-pages 标题、other page image/title/fixed text；动作 class 迁移 `data-action`，default/active 由父级状态表达。

## 9. 批次 F：31 个页面内联 HTML

以下仅列页面自身结构；其 include 内容归 B–E 批。

| 页面 | 当前重新扫描后的执行方向 |
|---|---|
| `attribute-all.html` | update-time、价格、购买数量与按钮；共享 home-menu 归 A。 |
| `become-seller.html` | 上传头像/logo、输入/textarea、agreement 文本；行为改用 input `name/type` 和 `data-upload-role`。 |
| `blog.html` | avatar、列表项、dl 项、评论用户/时间、目录关闭；保留真正通用排版工具类。 |
| `brand-all.html` | 索引项若 JS 需要身份则迁移 `data-letter`；共享结构归 A/B。 |
| `brand-service.html` | hero、brand mark、筛选结果 icon/数量/文字；筛选行为同步。 |
| `brand.html` | breadcrumb、描述详情文字/切换按钮；FAQ partial 归 E。 |
| `compaign-all.html` | filter 结果区域和内嵌 tag 参数；卡片归 D5。 |
| `compaign-detail.html` | summary、copy block、anchor/nav、recommend；like/复制行为迁移 data 属性。 |
| `demand-all.html` | filter 结果区；卡片归 D4。 |
| `demand-detail.html` | 用户、属性 label/value、textarea/upload/captcha；表单使用 name/type/data-role。 |
| `faq-detail.html` | article/info/helpful/share；资源 action 与 E4 同步。 |
| `faq-list.html` | dropdown/search/filter result；输入和选择行为使用控件属性。 |
| `fastesp-service.html` | article title/subtitle、section title、目录关闭；与 `service.html` 同结构同批。 |
| `index.html` | section title/view-more/bid 按钮、pager 标题；carousel 与购买流程按对应 JS 同步。 |
| `item-all.html` | filter result 和购买弹窗；卡片/筛选归 C/D。 |
| `item-detail.html` | title/share/more、价格/购买、section 标题、规则/FAQ/store/review、投诉弹窗；按模块小批执行。 |
| `post-all.html` | filter result；卡片归 D5。 |
| `post-detail.html` | product/meta/paywall/share/review/comment form；表单与解锁行为同步。 |
| `resource-all.html` | 页面自有 breadcrumb/dropdown/search；resource item 归 E4。 |
| `resource-detail.html` | product 信息、目录关闭及购买弹窗；文章 partial 归 E4。 |
| `search-all.html` | `search-list-container` 若仅用于 JS，迁移 `data-search-results`；卡片归 D6。 |
| `service.html` | 与 fastesp-service 同结构同批处理。 |
| `signin-2fa.html` | 页面自身无候选；验证 B3 组件构建结果。 |
| `signin-join.html` | 页面自身无候选；验证 B3 组件构建结果。 |
| `signin-login.html` | 页面自身无候选；验证 B3 组件构建结果。 |
| `signin-reset-2fa.html` | 页面自身无候选；验证 B3 组件构建结果。 |
| `signin-reset-password.html` | 页面自身无候选；验证 B3 组件构建结果。 |
| `store-all.html` | filter result；store 卡片归 D3。 |
| `store-detail.html` | service/after-sales/filter/FAQ/review；展开行为同步 store-detail JS。 |
| `system-post-detail.html` | action/date/article/share/review/comment form；与 post-detail 共用 review 结构同批。 |
| `tag-all.html` | filter result、购买弹窗；动态卡片/tag 参数同步。 |

## 10. 顶层 partial 全覆盖结论

### 10.1 纯 include/参数包装器：不直接删除 DOM class

以下 22 个文件无独立 DOM，计划动作是同步其内嵌 HTML 参数、验证构建，不应人为增加结构：

`blog-post-item-v2-alt-unliked.html`、`blog-post-item-v2-normal-liked.html`、`blog-post-item-v2-red-liked.html`、`brand-all-item.html`、`compaign-all-horizontal-item.html`、`compaign-all-vertical-item.html`、`components/brand-hot-item-card.html`、`components/demand-all-figma-item.html`、`components/demand-all-figma-items.html`、`index-best-store-item-liked.html`、`index-best-store-item.html`、`index-host-post-item-alt-unliked.html`、`index-host-post-item-normal-liked.html`、`index-host-post-item-red-liked.html`、`index-host-post-item-red-unliked.html`、`index-host-post-item.html`、`index-hot-compaign-item-no-tags.html`、`index-hot-compaign-item.html`、`index-popular-demand-item-alt-liked.html`、`index-popular-demand-item-alt-unliked.html`、`index-popular-demand-item-main-liked.html`、`item-all-horizontal-item.html`。

### 10.2 有独立 DOM，纳入修改

- `brand-all-section-a.html` ～ `brand-all-section-g.html`：逐一检查 section 标题/索引文字；重复 brand item 由组件处理。
- `index-best-items-section.html`：pager 标题/副标题/更多区；item 卡片由 D2 处理。
- `index-comment-item-main.html`、`index-comment-item-alt.html`、`index-comment-item-third.html`：评论用户、时间、描述、tag 参数与 rating include 同步。
- `signin-modal.html`：归 B3。

## 11. CSS/LESS 与 JS 修改原则

1. 每次 CSS 选择器变化必须同步对应 `.less`；若某 CSS 无 LESS，计划记录原因。
2. 保持所有声明值、顺序、媒体查询位置不变，只迁移选择器。
3. 结构选择器必须带组件/页面根作用域，优先直接子选择器 `>`。
4. 当顺序是业务身份而非纯展示顺序时，使用 `data-role`/`data-action`，不要用脆弱的 `nth-child`。
5. JS 行为钩子与 CSS 展示钩子分离：行为用 `data-*`、控件属性或父级事件委托；状态仍可使用状态 class。
6. JS 动态 HTML/template string 与 partial 必须保持相同 DOM 和属性。

## 12. 分批顺序与验收

按以下顺序执行，每批单独回归、单独记录候选完成/保留原因：

- [x] A1 home-menu 全消费页（第一轮全量扫描候选已完成，见下方执行记录）
- [x] A2 购买弹窗全消费页（公共弹窗 + index 独立流程已完成）
- [x] B1 header + mobile search
- [x] B2 footer/cookies/slide buttons
- [x] B3 auth
- [x] C 公共页面结构
- [x] D1 rating/like
- [x] D2 item 卡片族
- [x] D3 store 卡片族
- [x] D4 demand 卡片族
- [x] D5 campaign/post/blog 卡片族
- [x] D6 search 卡片族
- [x] E1 brand/FAQ
- [x] E2 review
- [x] E3 statistics
- [x] E4 resource
- [ ] F 页面独有结构，按页面逐个完成
- [ ] 124 个源文件覆盖表复核，无遗漏文件

每批至少执行：

```bash
node scripts/build-pages.js
git diff --check
find js -name '*.js' -not -name '*.min.js' -print0 | xargs -0 -n1 node --check
```

并执行该批删除 class 的残留检查：

```bash
rg 'REMOVED_CLASS' src/pages src/partials css js
```

验收条件：目标源码与本批 CSS/LESS/JS 中无意外残留；有意保留的状态、参数或第三方 class 必须记录；根目录 HTML 只出现构建生成的 diff；不调用 Playwright，除非用户明确要求。

## 13. 执行时计划维护要求

- 每开始一个批次，先把当前精确行号、旧选择器、新选择器、CSS/LESS/JS 文件补到该批执行记录中，再修改代码。
- 每完成一个候选，记录：修改文件、消费页、命中集合核对、特异性核对、构建/语法结果。
- 发现不能等价替代的候选时必须保留，并写明具体 DOM 冲突；“所有能改的都改”不等于删除必要的状态、行为或跨结构复用类。

## 14. 执行记录

### A1 Home menu（2026-07-12）

- 消费源码：`rg -l 'home-menu-' src/pages` 命中的 24 个页面。
- 已删除并结构化：`home-menu-user-icon/name/email/logout`、`home-menu-login-text`、`home-menu-signin-text`、`home-menu-item-title`、`home-menu-item-title-arrow`、`home-menu-seller-text`、`home-menu-second-page-title`、`home-menu-second-page-group-title/item`、`home-menu-other-text`。
- 已清理已经由结构规则命中、当前无 CSS/JS 消费的惰性类：`home-menu-item-content-item-title`、`home-menu-item-content-item-title-arrow`、`home-menu-second-page-title-back`。
- CSS/LESS：统一迁移到 `.home-menu-page` 下的直接子结构选择器；账户中心的 other-wrapper 同步迁移。
- JS：`js/common.js` 同步父级作用域查询、二级链接事件、动态 Posts 行和 logout 节点模板。
- 明确保留：home-menu 根/布局容器类、`home-menu-item-title-content`、`home-menu-item-title-box`、`home-menu-item-content-item`、`home-menu-second-page-group`、行为类 `language-btn/gmt-btn/currency-btn`、状态/动态辅助类。
- 回归：`node scripts/build-pages.js`、`git diff --check`、全部非 minified JS `node --check`、旧 class 残留检查。

### A2 购买弹窗（2026-07-12）

- 公共 `.item-buy-mask`：处理当前源码中 10 个消费页面。
- 已删除并结构化：`close-buy-modal-btn`、`update-time`、`purchase-qty-btn`、`purchase-qty-btn-left/right`、`purchase-qty-display`、`purchase-buy-btn`。
- JS：`js/common.js` 的数量增减、边界状态、购买和关闭逻辑统一改为 `.item-buy-mask` 作用域下的直接子结构选择器。
- Index 独立购买流程：修改 `src/partials/components/index-purchase-flow.html`、`css/index.css/less`、`js/index.js`。
- Index 已删除并结构化：`index-purchase-close`、`index-purchase-qty-btn/minus/plus/qty`、`index-purchase-back-btn`、`index-purchase-link-btn`、`index-purchase-image-modal-close/img`；改用 titlebar/stepper/success-actions/image-modal 父级及已有 `aria-label`、`data-purchase-*`。
- 明确保留：公共弹窗 `item-price-wrapper/item-price-original`（跨价格类族）；Index 主次按钮、上传组件根、状态 class。
- 回归：构建 31 页、`git diff --check`、全部非 minified JS 语法检查、两套旧 class 残留检查均通过。

### B1 Header 与移动搜索（2026-07-12）

- 源码：`src/partials/components/site-header.html`、`header-search-mobile.html`，并同步 `compaign-detail.html` 和 `auth-static-init-script.html` 的内联初始化脚本。
- 已删除并结构化：header 菜单图标、logo、桌面/移动搜索 label/arrow/input/search icon、导航文字/arrow、seller/signin/join 文本、用户头像、通知 badge、头像 badge。
- CSS/LESS：同步 `common`、`page`、`index`、`faq`、`item-all`、`resource`、`brand-service` 中全部基础及页面覆盖选择器。
- JS：HeaderMenu 子节点改为 `:scope > label/img`；搜索读写改为输入/label 父级结构；头像与 badge 改为 `.item-avatar` / `.item-notice` 作用域；动态 badge 不再写旧 class。
- 明确保留：`header-menu-box/container/selector/list/item`、`header-items-label-resource/post`、`header-user-avatar-box`、input wrapper、状态和 iconfont class。
- 回归：构建 31 页、`git diff --check`、全部非 minified JS 语法检查通过；删除 class 在源码、CSS/LESS、JS 及内联脚本中无残留。

### B2 Footer、Cookies、浮动按钮（2026-07-12）

- 源码：`site-footer.html`、`site-cookies-tips.html`、`site-slide-btns.html`，同步 `css/common.css/less`、`js/common.js`。
- Footer 已删除并结构化：标题、折叠图标、链接、logo、Follow us 文字、版权、GMT 外层容器；移动端状态规则同步迁移。
- Cookies 已删除并结构化：说明文本通用类、Policy 链接、按钮布局类、Accept/Customize 展示类、保存按钮展示/行为类；保留 `cookies-accept-btn`、`cookies-customize-btn` 行为钩子。
- 浮动按钮：删除客服/回顶动作 class，JS 改用 `.slide-btns-wrapper` 下首/末图片；父级定位 class 保留。
- 明确保留：footer 布局容器、`language-btn/gmt-btn/currency-btn` 行为类、cookies 根/弹层/状态和表单结构类、iconfont class。
- 回归：构建 31 页、`git diff --check`、全部非 minified JS 语法检查、旧 class 和异常重复结构选择器检查均通过。

### B3 Auth 与 signin-modal（2026-07-12）

- 源码：`src/partials/signin-modal.html`；同步 `css/signin.css/less`、`js/login.js`，构建影响普通页面登录弹窗和 5 个独立认证页。
- 已删除并结构化：close/back 图标、密码显示按钮、remember/agree label、重置密码入口、submit、分割文字、Google/Apple 图标与文字、登录/注册切换两段文字、验证码发送按钮/时间、reset-2FA 提示。
- JS：字段内部使用 `:scope > button/p`；其它查找使用具体 form/line/otherway/tool-box 父级和 submit 类型。
- 明确保留：`signin-form-title/error/input`（同一表单多种同标签混排，无法宽泛等价）、表单/内容/布局根、状态 class、register 按钮和 filter 组件行为类。
- 回归：构建 31 页、`git diff --check`、全部非 minified JS 语法检查和 17 组旧 class 精确残留检查均通过。

### C 公共页面结构组件（2026-07-12）

- 已完成组件：`page-home-breadcrumb`、`page-pagination`、`page-sort-dropdown`、`list-empty-state`、`show-more-button`；同步资源页自有 breadcrumb。
- Breadcrumb：删除 icon/text/separator/current，改为 icon-frame、breadcrumb p 及奇偶 span；资源页 modifier class 保留。
- Pagination：删除 prev/next/selection/go-to 展示类，使用既有 `prevBtn/nextBtn/sizeText` id 和 quick-jumper 直接子节点。
- Sort：删除 `page-sort-icon`，所有页面 CSS/LESS、JS 和 FAQ 内联脚本统一改为 `.page-sort-box > img`。
- Empty/show-more：文本改为组件根直接子结构；同步所有详情/FAQ/resource 样式、加载 JS 和内联脚本，并纠正 Less 嵌套为 `> span`。
- 无修改：`page-top-sticky-main`、`detail-page-menu` 当前无冗余内部样式 class。
- 延后到页面筛选族：`item-all-filter-panel` 的 back 可独立处理，但 `page-filter-icon/num` 跨多个页面不同父级；为保证完整消费集合一起迁移，归入 F 的 filter 家族。
- 回归：构建 31 页、`git diff --check`、全部非 minified JS 语法检查、旧 class 和结构选择器重复检查均通过。

### D1 Rating 与 Like 基础组件（2026-07-12）

- Rating 源码：`rating-score-only.html`、`rating-with-count.html`、`rating-with-count-mobile.html`，并同步 statistics 两个消费组件及所有 JS 动态评分模板。
- 已删除并结构化：`item-star-score/recommend`、`item-star-mobile-icon/score/recommend`；桌面使用 `.item-star-box > p:first-of-type/nth-of-type(2)`，移动使用 `.item-star-box-mobile > img/p`。
- CSS/LESS：同步 common、index、store、search-all、blog/demand/item/post/store/system detail 全部基础与覆盖选择器。
- JS：动态模板移除旧 class；已有 rating box 内部查询改为 `:scope > p:first-of-type`，其它上下文使用带 rating 根的结构选择器。
- Like 结论：`item-like-button.html` 没有固定展示 class，唯一 class 来自各消费者的 `like_class` 参数并承担布局/收藏行为，因此本批无可安全删除项。
- 回归：构建 31 页、`git diff --check`、全部非 minified JS 语法检查、5 组旧 class 及重复 rating scope 检查均通过。

### D2 Item 卡片组件族（2026-07-12）

- 组件：桌面横卡、响应式包装、标准/搜索移动横卡、竖卡；同步 `itempage.js`、`tagpage.js` 动态竖卡模板。
- 已删除并结构化：桌面/移动 buy button、移动 meta icon/price、搜索移动 title text、竖卡 cover、title inline flow/title text。
- 目标结构：actions/main 下直接 button；mobile meta 下非 rating div 的 img 和直接 span；搜索 title-row 末 span；竖卡根首 img、title-box 直接 a 及末 span。
- CSS/LESS：同步 item-all、items、brand-service、search-all、index、social-media、campaign/item/post/store/system detail 全部覆盖。
- 明确保留：`item-all-horizontal-mobile-mark`（标准卡与搜索卡父级不同）、搜索 title-row 父级、通用 `item-title/brand/service/price/stock`、参数化按钮状态和 like class。
- 回归：构建 31 页、`git diff --check`、全部非 minified JS 语法检查、8 组旧 class 及重复父级 scope 检查均通过。

### D3 Store 卡片组件族（2026-07-12）

- 组件：best-store、桌面横卡、响应式包装、移动横卡、响应式/移动竖卡；同步 `storepage.js`、`tagpage.js` 动态模板。
- 已删除并结构化：`store-item-icon`、`store-item-detail`、移动横卡 meta-icon/tags/like 专用类。
- 目标结构：user-box 直接 img、detail-box 直接 p；mobile meta 下排除 rating 的 div img、card 直接 item-tag-box、card 最后一个直接 img。
- CSS/LESS：同步 store 和 search-all 全部基础、响应式及搜索卡覆盖。
- 明确保留：`item-desc`（Post/Brand 等不同组件共同消费，归 D5）、store/card 布局根、通用 tag/brand/service/title、`icon-aixin` 行为类。
- 回归：构建 31 页、`git diff --check`、全部非 minified JS 语法检查、5 组旧专用 class 和重复父级 scope 检查均通过；残留字符串仅为必须保留的 `store-item-detail-box` 父级。

### D4 Demand 卡片组件族（2026-07-12）

- 组件：共享 Demand、水平/垂直移动卡、竞标详情项、详情 Tabs、Figma include 包装；同步 search-all 与 demand-detail 动态模板。
- 移动卡已删除并结构化：icon、stat、stat label/value、avatar、avatar-more，两种布局分别使用 meta/avatar-group 直接子结构。
- 详情卡已删除并结构化：用户头像/名称、字段说明、Bidding 标题、Demand 描述；Tabs 标题文字改 title 容器直接 span。
- CSS/LESS：同步 common、demand、demand-detail-item、demand-detail 全部基础及响应式覆盖。
- 明确保留：共享卡 bidder 文本及其 include 参数、通用 item/other/tag/service 类、头像组和 meta 等必要父级、状态与 like class。
- 回归：构建 31 页、`git diff --check`、全部非 minified JS 语法检查、17 组旧 class 及重复父级 scope 检查均通过。

### D5 Campaign、Post、Blog 卡片组件族（2026-07-12）

- 组件：hot campaign、campaign horizontal、post shared、blog-post-v2；同步顶层参数包装、`compaignpage.js`、`postpage.js`、`storepage.js`、`tagpage.js` 和 campaign-all 内联查询。
- Campaign/Post 已删除并结构化：封面、广告标记、统计行、用户头像/名称、Kind 文本。
- `item-desc`：当前全部 Store/Post/Brand 消费者均为 `.item-desc-box > p`，已跨组件和动态模板统一删除。
- Blog v2 已删除并结构化：封面、标题 link/title、品牌入口、stars/score、属性 label/value/bold；全部使用 article/content/meta/rate/attr 稳定父级。
- 明确保留：Campaign brand/products 类（同时被标签参数和多个结构复用）、布局根、通用 title/brand/tag、like 状态与行为类。
- 回归：构建 31 页、`git diff --check`、全部非 minified JS 语法检查、17 组旧 class 及 Campaign/Post/Blog 重复父级 scope 检查均通过。

### D6 Search 卡片组件族（2026-07-13）

- 组件：Search 的 featured、campaign、post、store、demand 五类桌面卡片；同步 search 页面 `bidders_html` include 参数。
- 已删除并结构化：Post 标题高亮和摘要、Store 摘要、Demand 日期图标及竞标人 label/avatar/more、Campaign 产品行及产品值、Featured/Campaign 浏览统计 item/icon/count。
- 目标结构：标题直接 span、各卡片 `.card-content > p`、日期容器直接 img、竞标人容器首 span/直接 img/末 span、浏览统计容器直接 span 及其 img/末 span。
- CSS/LESS：全部改为卡片类型或保留父级下的直接子结构选择器；Post 摘要原公共样式完整迁入专属结构规则，避免宽泛段落选择器误命中 Campaign/Store。
- 明确保留：搜索卡根及桌面/移动类型、title/meta/row/group/view/bidder 等布局作用域、通用 title/brand/service/stock/tag/rating、状态 badge 和 like 行为类。
- JS：本批删除项均未被脚本查询或写入，无需改动 JS。
- 回归：构建 31 页、`git diff --check`、全部非 minified JS 语法检查、15 组旧 class 及重复结构作用域检查均通过。

### E1 Brand 与 FAQ 组件族（2026-07-13）

- 组件：Brand 列表项、Hot Items/Demands/Posts/FAQ 四类区块、FAQ 卡片；核对 Brand 顶层参数包装和全部页面消费者。
- Brand 已删除并结构化：列表标签分隔线、底部统计项、区块标题、区块 view-more 链接；分别使用 middle/bottom/title wrapper 的直接子节点。
- FAQ 已删除并结构化：header 图标、品牌标签、标题、展开箭头、详情 view-more 容器/链接，以及 like/unlike/save 的展示图标和计数类。
- 状态：default/active 图标改由动作父级下首/次 `img` 与 `has-activate` 组合控制；`open`、`has-activate`、like/unlike/save 行为父类和 iconfont 类保留。
- CSS/LESS：同步 `brand`、`second-page`、`faq`、`detail/brand` 的基础、响应式及 Brand 详情覆盖；Resource 和 FAQ 详情仍使用的公共动作类保持不变。
- JS：`brand.js` 与 FAQ List 内联逻辑改为 FAQ header/content/action 父级下的直接子结构查询，动态克隆后的标题、箭头和详情链接更新行为保持一致。
- 回归：构建 31 页、`git diff --check`、全部非 minified JS 语法检查通过。

### E2 Review 组件族（2026-07-13）

- 源码：Store Review 共享 partial、Item Detail 内联 Review、Post/System Post 两套内联 Review；同步 Item/Post/System Post 动态 Review 模板。
- 已删除并结构化：主用户头像/名称/时间/状态、正文、信息字段 title/desc/icon、回复用户头像/名称/占位/箭头/正文、Helpful 工具文字与图标，以及 Post yes/no 专用 item 类。
- 目标结构：user/name/status/info/reviewer/tool 等布局父级下的直接 `img/span/div`；回复箭头使用 user box 的末 `img`，回复正文使用 reviewer box 的直接 `span`。
- 状态与行为：移除重复的 `review-like/review-unlike` id，工具项新增 `data-action="yes|no"`；`has-activate`、工具项布局类和 iconfont 状态类保留。
- CSS/LESS：同步 item、store、post、system-post、service、resource-detail 六组详情样式及响应式规则，样式值保持不变。
- JS：同步 `item-detail.js`、`store-detail.js`、`post-detail.js`、`system-post-detail.js` 的回复展开、动态克隆和 Helpful 点击选择器。
- 回归：构建 31 页、`git diff --check`、全部非 minified JS 语法检查、旧叶子类/重复 id/危险空选择器检查均通过。

### E3 Statistics 组件族（2026-07-13）

- 源码：`statistics-bar-panel.html`、`statistics-rating-chart-panel.html`、`statistics-period-header.html`，覆盖 Item Detail 与 Store Detail 两个消费页。
- 已删除并结构化：`main-title` 改为统计框架的直接 `h2`；统计标签、数值、计数改为 `data-stat-role="label|value|count"`；周期标题的红色指示条、tab 文本和激活下划线改为父级直接子元素。
- 保留项：`statistics-frame`、面板类型、数字布局、tabs/tab-item、active、data-period/data-chart 等布局、类型、状态与行为标识继续保留；`section-title`、`title-indicator` 仍被 Store Detail 的其他标题结构复用，不在本批删除。
- CSS/LESS：同步 `item-statistics` 的基础与响应式规则，以及 Store Detail 对统计数字的页面级覆盖，所有属性值保持不变。
- JS：Item/Store Detail 的周期初始化改为查询 tab 直接 `span/div`；动态补充激活条时不再写入展示类，原有 data-period、键盘与图表切换行为保持不变。
- 回归：旧叶子类在 `src/css/js` 中无残留；构建 31 页、`git diff --check`、全部非 minified JS 语法检查通过。

### E4 Resource article 组件族（2026-07-13）

- 源码：`resource-all-item.html`、`resource-detail-article-content.html`；同步 Resource All 的 6 处 include 参数、动态列表模板及 Resource Detail 交互。
- Resource All：删除动作图标、默认/激活图标、计数和 like/unlike 行为叶子类；动作身份迁移到 `data-action="view|like|unlike|follow"`，默认/激活图片由动作组下的图片顺序与 `has-activate` 状态表达。
- Resource Detail：删除文章章节标题、正文包装与文章图片叶子类、Helpful 文案/标签/图标/like-unlike 类、Share 标签/容器/平台图标类，以及 Other Pages 标题、卡片图片/标题/摘要叶子类，全部改由模块根下的直接子结构表达。
- 保留项：`resource-item`、`resource-actions`、`resource-action-group`、`content-section`、`share-section`、`resource-page-item`、轮播布局类等组件或布局根继续保留；`has-activate`、`active`、iconfont 类及 `resource-page-item` JS 卡片身份不可删除。
- CSS/LESS：同步 `resource`、`detail/resource`、`detail/resource-detail` 三组样式；Other Pages 卡片原先来自 common 的标题样式按相同属性迁移到卡片结构选择器，桌面与移动端最终样式保持一致。
- JS：`resourcepage.js` 的静态绑定与动态模板改用 `data-action`，`resource-detail.js` 的 Helpful 绑定同步迁移；动态轮播仍通过必要的 `resource-page-item` 根识别卡片。
- 回归：目标旧叶子类在 E4 源码、CSS/LESS、JS 中无残留；构建 31 页、`git diff --check`、全部非 minified JS 语法检查通过。

### F1 全消费页筛选结果行（2026-07-13）

- 页面与当前行：`attribute-all.html:83-87`、`brand-service.html:80-84`、`compaign-all.html:60-64`、`demand-all.html:59-63`、`faq-list.html:80-84`、`item-all.html:60-64`、`post-all.html:55-59`、`store-all.html:60-64`、`tag-all.html:68-77`。
- 旧选择器：`page-filterresult-num`、`page-filterresult-text`、`page-filterresult-content`，以及 Attribute 已有的 `data-result-num/text/content`。
- 新结构：在保留的 `.page-filterresult-box` 布局根下，三个直接子元素统一使用 `data-result-role="count|label|query"`；业务身份不用 `nth-child` 表达。
- CSS/LESS：`common` 的灰色 label 规则、`attribute-all` 的结果文字规则、`tag-all` 的移动端 label/query 规则同步到统一 data role；声明值和媒体查询位置不变。
- JS：`compaign-all.html`、`demand-all.html` 内联脚本按 `data-result-role` 查询并更新三段文字。
- 特异性：Common 从单叶子 class 改为布局根 + data role，限定范围更窄；Attribute、Tag 的页面作用域与原选择器层级保持，不引入跨模块命中。
- 回归：旧 `page-filterresult-num/text/content` class 和旧 `data-result-num/text/content` 在 `src/css/js` 中无残留；构建 31 页、`git diff --check`、全部非 minified JS 及全部页面内联脚本语法检查通过。

### F2 筛选入口图标与数量（2026-07-13）

- 页面与当前行：`brand-service.html:68-71`、`compaign-all.html:48-51`、`demand-all.html:47-50`、`item-all.html:48-51`、`post-all.html:48-51`、`store-all.html:48-51`；共享移动源码 `item-all-filter-panel.html:12-15`。
- 旧选择器：`page-filter-icon`、`page-filter-num`。
- 新结构：保留 `.page-filter-count`、`.item-all-filter-mobile-count` 布局根；直接 `img/p` 使用 `data-filter-role="icon|count"`，供跨桌面/移动结构的样式与行为统一识别。
- CSS/LESS：同步 `filter` 基础及响应式规则、`page` 通用覆盖、Campaign 桌面覆盖、Post All 页面覆盖，所有声明值与媒体查询位置保持不变。
- JS：`filter.js` 的数量更新与查询迁移到 `data-filter-role="count"`；Campaign/Demand 内联脚本同步查询 count，Demand 的图标切换同步查询 icon。
- 保留项：筛选容器、布局切换、active/is-active、data-layout 及过滤器业务组件 class 均不在本批删除。
- 回归：旧 `page-filter-icon/page-filter-num` 在 `src/css/js` 中无残留；7 个源码消费者和构建页面均生成 icon/count data role；构建 31 页、`git diff --check`、全部非 minified JS 及全部页面内联脚本语法检查通过。

### F3 Attribute 计划项与公共购买弹窗价格/库存补齐（2026-07-13）

- 当前审计：Attribute 计划中的 `update-time`、数量减/加/显示和购买按钮 class 已由 A2 完成；A2 原范围包含但尚残留的 `item-price-*`、库存数量和总价行为类需按当前全部 10 个消费页统一补齐。
- 消费页：`attribute-all.html:636-666`、`brand-service.html:622-652`、`brand.html:600-630`、`item-all.html:602-632`、`post-detail.html:945-975`、`resource-detail.html:611-641`、`search-all.html:570-600`、`store-detail.html:826-856`、`system-post-detail.html:910-940`、`tag-all.html:670-700`。
- 旧选择器：弹窗内的 `goods-count`、`item-price-wrapper`、`item-price`、`item-price-original`、`total-price`；页面卡片和 Item Detail 自身仍使用的同名价格 class 不属于本批删除集合。
- 新结构：公共 `.item-buy-mask` 内使用 `data-purchase-role="stock-count|unit-price-group|unit-price|total-price"`；原价由 unit-price 的相邻 `span` 表达，不使用展示 class。
- CSS/LESS：仅同步 `common` 中公共购买弹窗作用域规则；通用卡片价格规则继续保留，确保非弹窗消费者不变。
- JS：`common.js` 的库存读取、单价读取和总价写入均限定在 `.item-buy-mask` 下查询 data role；数量按钮/输入与 disabled 状态逻辑保持原结构。
- Attribute 结论：第 9 节表格所列 update-time、价格、购买数量与按钮均已由 A2 + 本批覆盖；页面头部 Attribute 信息与切换项此前已使用 data 属性，布局/状态根继续保留。
- 回归：10 个消费页均生成四种 purchase role；弹窗旧 `goods-count/item-price-wrapper/item-price/item-price-original/total-price` HTML class 在目标集合中无残留；构建 31 页、`git diff --check`、全部非 minified JS 及全部页面内联脚本语法检查通过。
