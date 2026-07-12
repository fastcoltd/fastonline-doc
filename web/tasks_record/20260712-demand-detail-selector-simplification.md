# demand-detail.html 选择器精简

- 日期：2026-07-12
- 任务：按 `rules/html_selector_simplification_rule.md`，对 demand-detail.html 源码进行选择器精简
- 修改页面：demand-detail.html

## 改动摘要

### HTML（src/pages/demand-detail.html）去 4 类
- `upload-text`（span，1）
- `submit-text`（span，1）
- `word-count`（span，3；**保留 id** fieldInfoCount/samplesInfoCount/biddingInstructionsCount，JS 靠 id）
- `captcha-placeholder`（span，1；**保留 id** captchaCode）

### CSS + LESS（css/detail/demand-detail.css + .less，含 @media）
- `.upload-text` → `.upload-button span`
- `.submit-text` + `.submit-button:hover .submit-text` → `.submit-button span` + `.submit-button:hover span`
- `.word-count` → `.textarea-container span`
- `.captcha-placeholder` → `.captcha-image span`

## 保留未动（原因）
- `other-label`（与 bidding-item partial 共用 demand-detail.css 裸规则；partial 另有 scoped 规则）
- `other-text` / `user-avatar` / `user-name` / `attribute-value`（跨页共享）
- `upload-required` / `upload-title`（upload-label 内多 span，无唯一父级）
- `attribute-label`（attribute-row 内 2 个 span 顺序依赖）
- 通用类：`item-service-*` / `item-tag` / `item-mark` / `level-badge` 等
- 所有非语义标签（input/textarea）、JS 钩子、容器类、`@include` partial

## 校验
- `node scripts/build-pages.js` 构建成功、缓存版本号刷新（防缓存）
- `git diff --check` 无空白错误；4 类清零；hover 选择器正确
- `word-count` id（fieldInfoCount/samplesInfoCount/biddingInstructionsCount）保留；`captchaCode` id 保留
- 未改 JS（word-count/captcha 靠 id、upload/submit 靠 onclick/id）；未调用 playwright
