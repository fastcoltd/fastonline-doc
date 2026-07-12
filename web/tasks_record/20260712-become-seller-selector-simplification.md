# become-seller.html 选择器精简

- 日期：2026-07-12
- 任务：按 `rules/html_selector_simplification_rule.md`，对 become-seller.html 源码进行选择器精简
- 修改页面：become-seller.html

## 改动摘要

### HTML（src/pages/become-seller.html）
- `<h1 class="seller-apply-title">Apply to become a seller</h1>` → `<h1>Apply to become a seller</h1>`
- 上传框 2 处 `<span class="text">Upload</span>` → `<span>Upload</span>`

### CSS（css/become-seller.css + css/become-seller.less）
- `.seller-apply-title`（base + @media 各 1 处）→ `.seller-apply-page h1`
- `.content-wrapper.seller-apply-page .upload-avatar-img/.upload-logo-img .text` → `... span`

## 保留未动（原因）
- **JS 钩子类**（become-seller.js）：`upload-avatar-img`/`upload-logo-img`/`avatar-img`/`logo-img`/`name-input`/`time-input`/`slogan-input`/`introduction-textarea`/`team-textarea`/`contact-information-input`/`submit-btn-wrapper`/`filter-*`
- **非语义标签**：`<input>`/`<textarea>`（不在规则清单）
- **通用复用类**：`.label`（18 页）、`.text` 类本身（26 页，仅去本页 2 处）、`item-wrapper`/`item-content` 等容器
- **共享内联块**：home-menu / 账户中心 / 通知 / 语言（跨 23 页共享，非本页任务；与 attribute-all 口径一致）

## 校验
- `node scripts/build-pages.js` 构建成功、缓存版本号刷新（防缓存）
- `git diff --check` 无空白错误；旧类 `seller-apply-title` / `upload .text` 全站清零
- 无回归：确认无全局裸 `.text` 规则（common.css 仅 `.text-colon-label`）；`.seller-apply-page` 内 h1 唯一、上传框内 span 唯一，选择器等价
- 未改任何 JS（候选均 js=0）；未调用 playwright
