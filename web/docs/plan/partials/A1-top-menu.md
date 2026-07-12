# Partial 精简计划 · top-menu.html

## 消费方

共有 26 个文件 include 此 partial（`rg -l "@include[^-]*top-menu\.html" src/pages src/partials`）：

```
src/pages/become-seller.html
src/pages/blog.html
src/pages/brand-all.html
src/pages/brand-service.html
src/pages/brand.html
src/pages/compaign-all.html
src/pages/compaign-detail.html
src/pages/demand-all.html
src/pages/demand-detail.html
src/pages/faq-detail.html
src/pages/faq-list.html
src/pages/fastesp-service.html
src/pages/index.html
src/pages/item-all.html
src/pages/item-detail.html
src/pages/post-all.html
src/pages/post-detail.html
src/pages/resource-all.html
src/pages/resource-detail.html
src/pages/search-all.html
src/pages/service.html
src/pages/store-all.html
src/pages/system-post-detail.html
src/pages/tag-all.html
src/partials/components/page-top-sticky-main.html
```

以及同结构变体 `src/partials/components/top-menu-store-detail.html`。

---

## 可精简

满足全部条件（稳定语义标签、父级 class 可唯一定位、纯样式、无 JS 引用、父级下标签唯一）。

| 父级 class | 标签 | 现 class | 建议选择器 | css 文件(+less) | 备注 |
|------------|------|----------|------------|-----------------|------|
| `.top-menu-item` | `h3` | `top-menu-item-text` | `.top-menu-item > h3` | `css/common.css`, `css/common.less` | 13 处。还需同步 `.top-menu-item.active .top-menu-item-text` → `.top-menu-item.active > h3`（less:1119, css:962） |
| `.top-menu-more-list-item` | `img` | `top-menu-more-list-item-icon` | `.top-menu-more-list-item > img` | `css/common.css`, `css/common.less` | 大量重复（每个 list-item 嵌套 1 img） |
| `.top-menu-more-list-item` | `a` | `top-menu-more-list-item-text` | `.top-menu-more-list-item > a` | `css/common.css`, `css/common.less` | 大量重复（每个 list-item 嵌套 1 a） |
| `.top-menu-container-left-box` / `.top-menu-container-right-box` | `img` | `top-menu-container-more-box-icon` | `.top-menu-container-left-box > img, .top-menu-container-right-box > img` | `css/common.css`, `css/common.less` | 仅 2 处（左右箭头）。当前 class 同一组 CSS 同时作用于左右两侧，改为联合选择器 |

---

## 需 JS 同步(§3)

（本 partial 中无符合条件的条目。`top-menu-more-box-left/center/right` 虽被 JS 引用，但它们在 `<div>` 上，不属于内部稳定语义标签，因此不在"需 JS 同步"分类中，而归入"保留"。）

---

## 保留

- `top-menu` — 容器 div，非语义标签
- `top-menu-container` — 容器 div，非语义标签
- `top-menu-content` — 容器 div，非语义标签
- `top-menu-item` — 容器 div，非语义标签；且带状态 class `active`（JS 切换）
- `top-menu-more-box` — 容器 div，非语义标签；且被 JS 引用（homemenu.js:82）
- `top-menu-more-box-left` — div，非语义标签；JS 钩子（homemenu.js:62 动态设 left）
- `top-menu-more-box-center` — div，非语义标签；JS 钩子（homemenu.js:65 动态设 left/transform）
- `top-menu-more-box-right` — div，非语义标签；JS 钩子（homemenu.js:69 动态设 right）
- `top-menu-more-list` — 容器 div，非语义标签
- `top-menu-more-list-title` — 标签不稳定：left/center 区域为 `<p>`，right 区域为 `<div>`，无法用稳定标签选择器唯一定位
- `top-menu-more-list-item` — 容器 div，非语义标签
- `top-menu-container-left-box` — 容器 div，非语义标签
- `top-menu-container-right-box` — 容器 div，非语义标签

### 补充说明：`top-menu-item-text` 的 active 状态

当前 CSS：
```less
.top-menu-item.active .top-menu-item-text { color: #62646a; }
```
改为 `.top-menu-item.active > h3`，语义等价，因 `active` 在父级 div 上，直接选中子 h3。

---

## 疑似死类(无 css 规则)

| class | 说明 |
|-------|------|
| `top-menu-more-box-left` | 无 CSS 规则。仅用作 HTML 标记 + JS 钩子（homemenu.js:62） |
| `top-menu-more-box-center` | 无 CSS 规则。仅用作 HTML 标记 + JS 钩子（homemenu.js:65） |
| `top-menu-more-box-right` | 无 CSS 规则。仅用作 HTML 标记 + JS 钩子（homemenu.js:69） |

严格来说不算"死类"（有 JS 消费），但没有任何 CSS 规则，精简时无需 CSS 迁移。

---

## 精简建议优先级

### 第一批（低风险，仅涉及 common.css/less 共享样式，不影响 JS）
1. `top-menu-more-list-item-icon` → `.top-menu-more-list-item > img`
2. `top-menu-more-list-item-text` → `.top-menu-more-list-item > a`
3. `top-menu-container-more-box-icon` → `.top-menu-container-left-box > img, .top-menu-container-right-box > img`

### 第二批（中等风险，涉及 active 状态变体）
4. `top-menu-item-text` → `.top-menu-item > h3`（含 `.top-menu-item.active > h3`）

### 注意
- 4 项可精简 class 均跨 `top-menu.html` 和 `top-menu-store-detail.html` 两个 partial 共用。需两处 partial 的 HTML 同步修改。
- 4 项共用的 CSS 在 `css/common.css` / `css/common.less`，按规则 §0.1.2 将共享 CSS 改为结构选择器。
