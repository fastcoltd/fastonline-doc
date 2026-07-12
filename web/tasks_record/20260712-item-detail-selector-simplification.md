# item-detail.html 选择器精简

- 日期：2026-07-12
- 任务：按 `rules/html_selector_simplification_rule.md`，对 item-detail.html 源码进行选择器精简
- 修改页面：item-detail.html

## 改动摘要

### HTML（src/pages/item-detail.html）去 4 类
- `item-detail-purchase-image`（img，1）
- `item-detail-purchase-wholesale-label`（span，1）
- `item-detail-purchase-total-label`（span，1）
- `item-detail-infomation-title`（span，3）

### CSS + LESS（css/detail/item-detail.css + .less，含 @media）
- `.item-detail-purchase-image` → `.item-detail-purchase-container > img`（含 `.is-sticky` 变体）
- `.item-detail-purchase-wholesale-label` → `.item-detail-purchase-wholesale > span`
- `.item-detail-purchase-total-label` → `.item-detail-purchase-total-section > span:first-child`
- `.item-detail-infomation-title` → `.item-detail-left-title span`

## 保留未动（原因）
- `item-detail-purchase-total-price`（item-detail.js 查询引用，JS 钩子）
- `item-detail-share` / `item-detail-more`（item-detail.js 1 引用，交互按钮）
- `item-detail-purchase-qty-icon`（qty 按钮内 img，购买操作，保守保留）
- `item-detail-purchase-wholesale-badge`（div，非语义标签）
- 通用类：`item-title` / `item-mark` / `item-service` / `item-price` / `item-tag` 等
- `page-link`（LinkRef JS 钩子）、`page-nav-*`（共享面包屑）、容器类、所有 `@include` partial

## 校验
- `node scripts/build-pages.js` 构建成功、缓存版本号刷新（防缓存）
- `git diff --check` 无空白错误；4 类清零
- total-price JS 钩子未受影响；新选择器就位（含 `.is-sticky` 变体）
- 未改任何 JS；未调用 playwright
