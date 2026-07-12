# blog.html 选择器精简

- 日期：2026-07-12
- 任务：按 `rules/html_selector_simplification_rule.md`，对 blog.html 源码进行选择器精简
- 修改页面：blog.html

## 改动摘要

### HTML（src/pages/blog.html）去 4 类
- `lv-icon`（img，1 处）
- `blog-des`（p，1 处）
- `ul-li`（li，4 处）
- `dl-li`（li，12 处）

### CSS + LESS（css/detail/blog.css + css/detail/blog.less）
- `.lv-icon` → `.blog-top-wrapper-title img`（base + @media）
- `.blog-des` → `.blog-intro-section > p`（base + 2×@media）
- `.ul-list .ul-li` → `.ul-list > li`（直接子，避免误伤 dl-li）
- `.ul-list .dl-list .dl-li` → `.ul-list .dl-list > li`

## 保留未动（原因）
- 通用/跨页复用类：`avatar`（25 页）、`avatar-icon`（blog+item-detail 2 页）、`title`/`des`/`label`/`value`/`line`/`industry-item`/`tag-item`/`post-item`
- 非语义标签：`search-input`（input）
- 交互 div：`follow-btn`/`search-btn`/`blog-title`/`blog-mark`
- JS 钩子（blog.js）：`detail-page-menu`/`other-info-wrapper`/`table-of-container-close`
- 共享内联块（home-menu/账户中心/通知/语言）与所有 `@include` partial

## 校验
- `node scripts/build-pages.js` 构建成功、缓存版本号刷新（防缓存）
- `git diff --check` 无空白错误；4 个旧类清零、新选择器就位
- 无回归：候选均 blog 单页专属、js=0、父级下语义标签唯一；`ul-li`/`dl-li` 用 `>` 直接子精确命中
- 未改任何 JS；未调用 playwright
