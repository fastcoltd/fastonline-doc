# index.html 选择器精简计划（可续接）

> 依据：`rules/html_selector_simplification_rule.md`
> 目标最高优先级（规则 §0）：**所有修改完成后，页面任何 UI / 样式 / JS 行为，PC 端与手机端都必须与修改前一模一样。** 本任务是纯重构，不新增/改动任何视觉或交互。
>
> 本文档用于对抗上下文长度限制：即使会话被截断，也可凭本文件从任意批次继续。**每完成一批，勾选下方「进度追踪」。**

---

## 1. 范围与约束（已与用户确认）

| 项 | 决定 |
|---|---|
| 只改的 HTML | **仅 `src/pages/index.html` 的内联标签**（非 `@include` 进来的部分） |
| 不改的 HTML | 任何 `src/partials/*`（用户后续自行逐个改）；任何**其它页面**的 HTML |
| CSS | 改样式所在的 `css/*.css`，并**同步 `.less`**（源码与产物一致，规则 §5） |
| 其它页面如何保持一致 | 共享 class 的样式改为**父级作用域/结构选择器**（按结构匹配）。其它页面 HTML 里的旧 class 变为无害惰性类，靠结构命中同一样式 → 展示与 JS 完全不变 |
| 保留不动的类 | JS 钩子、状态类（active/selected…）、`iconfont`/`icon-*`、通用复用类（icon/name/title/money/count/close-icon/des…）、被分区覆盖规则依赖的类、布局结构包裹类、带行为的按钮类 |
| 构建 | HTML 改 `src/pages`，再 `node scripts/build-pages.js` 生成根目录产物（会刷新 `?v=` 版本号，属正常，规则 §6） |

### 关键机制（务必理解，保证零风险）
- `css/index.css` 只被 `index.html` 与 `blog.html` 引用；已核实 **blog.html 不含 brand/banner/pager 任何结构**（命中数全 0）→ 在 index.css 内加结构选择器不会波及 blog。
- `css/common.css` 被 23~24 个页面引用；共享类的结构相同（复制粘贴），结构选择器对所有页面一致命中。
- 选择器由单类 `(0,1,0)` 升为 `.parent tag` `(0,1,1)` 或 `.a .b>tag` `(0,2,1)`；仅当**无处于中间特异性的竞争规则**时才安全——下方每项已核对。

---

## 2. 分类总览

- **Batch A（index.css，index 独有，JS=0，零跨页风险）** —— 5 类，优先执行。
- **Batch B（index.css，index 独有，JS=0，涉及 best-items partial 的同名类/覆盖规则）** —— 2 类，谨慎但安全。
- **Batch C（common.css，跨 23 页共享，JS=0）** —— 3 类，风险最高收益最小；**需用户二次确认后再做，放最后一批**。
- **保留清单** —— 见 §6，禁止精简。

---

## 3. Batch A —— brand + banner（`src/pages/index.html` + `css/index.css` + `css/index.less`）

### 3.1 HTML：`src/pages/index.html` 删除以下内部 class（保留标签与其它属性）
| class | 标签 | 处数 | 改为 |
|---|---|---|---|
| `banner-slide-img` | `<img>` | 2 | `<img>`（去 class） |
| `brand-item-icon` | `<img>` | 12 | `<img>` |
| `brand-item-text` | `<p>` | 12 | `<p>` |
| `brand-left-box-icon` | `<img>` | 1 | `<img>` |
| `brand-right-box-icon` | `<img>` | 1 | `<img>` |

### 3.2 CSS：`css/index.css`（仅改选择器，样式值原样不动）
| 行 | 现选择器 | 改为 |
|---|---|---|
| 738 | `.banner-slide-img {` | `.banner-slide img {` |
| 697（@media≤768） | `  .banner-slide-img {` | `  .banner-slide img {` |
| 1074 | `.brand-item-icon {` | `.brand-icon-box img {` |
| 1148（@media≤768） | `  .brand-item-icon {` | `  .brand-icon-box img {` |
| 1080 | `.brand-item-text {` | `.brand-item p {` |
| 1156（@media≤768） | `  .brand-item-text {` | `  .brand-item p {` |
| 1101 | `.brand-right-box-icon {` | `.brand-right-box img {` |
| 1115 | `.brand-left-box-icon {` | `.brand-left-box img {` |

> 注意：`.banner-slide-icon`（1218，另一个类）**不动**。

### 3.3 LESS：`css/index.less`（同步同样的选择器改写）
| 行 | 现选择器 | 改为 |
|---|---|---|
| 871 | `.banner-slide-img {` | `.banner-slide img {` |
| 823（@media） | `    .banner-slide-img {` | `    .banner-slide img {` |
| 1265 | `.brand-item-icon {` | `.brand-icon-box img {` |
| 1350（@media） | `    .brand-item-icon {` | `    .brand-icon-box img {` |
| 1272 | `.brand-item-text {` | `.brand-item p {` |
| 1360（@media） | `    .brand-item-text {` | `    .brand-item p {` |
| 1295 | `.brand-right-box-icon {` | `.brand-right-box img {` |
| 1311 | `.brand-left-box-icon {` | `.brand-left-box img {` |

### 3.4 唯一性/特异性核对
- 每个父容器内目标标签唯一：`.brand-icon-box` 内仅 1 个 img；`.brand-item` 内仅 1 个 p；`.brand-left-box`/`.brand-right-box` 内仅 1 个 img；`.banner-slide` 内仅 1 个 img（`.item-content-box` 无 img）。
- 特异性 (0,1,0)→(0,1,1)，无中间竞争规则 → 视觉不变。

---

## 4. Batch B —— pager-more / pager-more-icon（`src/pages/index.html` + `css/index.css` + `css/index.less`）

> `pager-more` / `pager-more-icon` 仅出现在 index.html（PAGES=1），样式仅在 index.css，JS=0。
> best-items 区来自 partial `src/partials/index-best-items-section.html`（**不改**），其内保留同名 class。

### 4.1 HTML：`src/pages/index.html`
| class | 标签 | 内联处数 | 改为 | 说明 |
|---|---|---|---|---|
| `pager-more` | `<span>` | 5（brand + best-stores + hot-compaigns + popular-demands + host-posts 各 1） | `<span>` | 无覆盖规则 |
| `pager-more-icon` | `<img>` | 5（同上位置） | `<img>` | 见 4.2 覆盖处理 |

### 4.2 CSS：`css/index.css`
| 行 | 现选择器 | 改为 |
|---|---|---|
| 805 | `.pager-more {` | `.pager-more-box span {` |
| 1193（@media） | `  .pager-more {` | `  .pager-more-box span {` |
| 812 | `.pager-more-icon {` | `.pager-more-box img {` |
| 1197（@media） | `  .pager-more-icon {` | `  .pager-more-box img {` |
| 1204（@media） | `  .best-items-wrapper .pager-more-icon {` | **保持不变** |

### 4.3 LESS：`css/index.less`
| 行 | 现选择器 | 改为 |
|---|---|---|
| 947 | `.pager-more {` | `.pager-more-box span {` |
| 1405（@media） | `    .pager-more {` | `    .pager-more-box span {` |
| 955 | `.pager-more-icon {` | `.pager-more-box img {` |
| 1410（@media） | `    .pager-more-icon {` | `    .pager-more-box img {` |
| 1419（@media） | `    .best-items-wrapper .pager-more-icon {` | **保持不变** |

### 4.4 核对
- best-items partial 保留 `pager-more`/`pager-more-icon` class：base `.pager-more-box span/img`(0,1,1) 按结构命中；覆盖 `.best-items-wrapper .pager-more-icon`(0,2,0) 仍更高、仍生效（含手机端 display 切换），相对层叠顺序不变。
- 手机端 base `.pager-more-icon{display:none}` → `.pager-more-box img{display:none}`；best-items 覆盖为 `display:block`，仍胜出。一致。

### 4.5 明确保留（本批不动）
- `pager-subtitle`（h3）、`pager-wrapper-title`（h2）：各有 6 条分区覆盖规则依赖该 class（`.best-stores-wrapper .pager-wrapper-title`、`.hot-compaigns-wrapper .pager-subtitle` 等），删 class 会破坏覆盖 → **保留**。
- `pager-subtitle-empty`（flex 占位 div）、`pager-more-box`（作用域父级，且被覆盖引用）→ 保留。

---

## 5. Batch C（可选，需用户二次确认）—— home-menu 共享类（`css/common.css` + `css/common.less`）

> 跨 23~24 页共享，JS=0。风险最高、收益最小；**默认不做，用户确认后再执行，且放最后**。
> 仅删 `src/pages/index.html` 内联的 class；其它页面靠结构选择器保持一致。

### 5.1 结构与目标选择器（必须用直接子选择器 `>`，避免命中嵌套 second-page 内的同类标签）
| class | 标签 | index.html 处数 | 现 CSS 选择器 | 目标选择器 |
|---|---|---|---|---|
| `home-menu-item-content-item-title` | `<p>` | 12 | `.home-menu-page .home-menu-item-content-item-title`（common.css 1194；@media 1421） | `.home-menu-page .home-menu-item-content-item > p` |
| `home-menu-item-content-item-title-arrow` | `<img>` | 12 | `.home-menu-page .home-menu-item-content-item-title-arrow`（common.css 1201） | `.home-menu-page .home-menu-item-content-item > img` |
| `home-menu-second-page-title-back` | `<img>` | 4 | `.home-menu-page .home-menu-second-page-title-back`（common.css 1251） | `.home-menu-page .home-menu-second-page-title-box img` |

### 5.2 LESS 同步（`css/common.less`，注意嵌套结构，需先读上下文）
- 1382 `.home-menu-item-content-item-title`（base）
- 1390 `.home-menu-item-content-item-title-arrow`（base）
- 1446 `.home-menu-second-page-title-back`（base）
- 1640 `.home-menu-item-content-item-title`（@media）
> LESS 多为嵌套写法（`.home-menu-page { .X { } }`），改成 `> p`/`> img`/`.home-menu-second-page-title-box img` 时需按实际嵌套层级书写，动手前先 Read 周边。

### 5.3 风险与核对（务必逐页回归）
- `.home-menu-item-content-item` 的**直接子** p/img 唯一（嵌套 `.home-menu-second-page` 内的 p/img 是更深层，`>` 不会误命中）。
- `.home-menu-second-page-title-box` 内仅 1 个 img（另一个是 `p.home-menu-second-page-title`，JS=1，保留）。
- 特异性 (0,2,0)→(0,2,1)/(0,2,0 保持)，已确认无中间竞争规则（各类在 common.css 仅上述出现）。
- 改的是共享 common.css：需抽查若干页面（如 item-all / store-all / blog）确认主菜单展开、二级页返回箭头、内容项标题/箭头样式不变。

---

## 6. 保留清单（禁止精简，含原因）

- **JS 钩子类**（js 引用≥1）：`home-menu-item-title`(+`-arrow`)、`home-menu-login-text`、`home-menu-signin-text`、`home-menu-seller-text`、`home-menu-other-text`、`home-menu-second-page-title`、`home-menu-second-page-group-title`、`home-menu-second-page-group-item`、`home-menu-user-icon/-name/-email/-logout`、`notice-icon`（common.js `$item.find('.notice-icon')`）、`language-gmt-country-close-btn`、`language-btn/gmt-btn/currency-btn`、`filter-*`（data-type 驱动）、`carousel-*` / `carousel-indicator`。
- **状态/修饰类**：`active`、`layout-vertical/-horizontal`、`brand-arrow-disabled`。
- **iconfont**：`iconfont`、`icon-*`。
- **通用复用类（§4 跨组件复用）**：`icon`、`name`、`email`、`title`、`money`、`count`、`close-icon`、`des`。
- **覆盖依赖类**：`pager-subtitle`、`pager-wrapper-title`。
- **布局结构包裹类**：`brand-icon-box`、`pager-more-box`、`pager-subtitle-box`、`pager-subtitle-empty`、`item-content`、`item-content-box`、`btns-wrapper`、`avatar-box`、`money-box`、`notice-box`、`title-wrapper`、`store-center-li`、`member-center-li`、`other-wrapper`、`split-line`。
- **带行为的按钮**：`bid-now-btn`(+`demand-button`)、`view-more-btn`。
- **account 中心整块**：子节点几乎全为通用类/iconfont/JS 驱动 → 本次无可安全精简项。

---

## 7. 每批执行后的回归校验（规则 §7）
```bash
node scripts/build-pages.js          # 重新生成根目录 *.html（?v= 版本号刷新属正常）
git diff --check                     # 无空白错误
node --check js/common.js            # 若动过 JS（本计划不动 JS，可略）
```
并用 rg 确认被删 class 无残留在 src / css / js（best-items partial 内 pager-* 属预期保留，不算残留）：
```bash
# Batch A
rg "brand-item-icon|brand-item-text|brand-left-box-icon|brand-right-box-icon|banner-slide-img" src/pages css/index.css css/index.less
# Batch B（应仅剩 partial 内 pager-more/pager-more-icon 与 index.css 覆盖行 .best-items-wrapper .pager-more-icon）
rg "\.pager-more\b|\.pager-more-icon\b" css/index.css css/index.less
# Batch C
rg "home-menu-item-content-item-title|home-menu-second-page-title-back" src/pages css/common.css css/common.less
```
> 另：`.claude/settings.local.json` 若有变更需随任务一起提交并 push（项目约定）。

---

## 8. 进度追踪
- [x] Batch A —— brand + banner（index.css/less）已改并回归
- [x] Batch B —— pager-more / pager-more-icon（index.css/less）已改并回归
- [x] Batch C —— home-menu 共享类（common.css/less）已改并回归
- [x] 全量 `node scripts/build-pages.js` 并 `git diff --check` 通过
- [x] rg 残留检查通过
- [ ] 用户确认最终效果（PC + 手机端与改前一致）
