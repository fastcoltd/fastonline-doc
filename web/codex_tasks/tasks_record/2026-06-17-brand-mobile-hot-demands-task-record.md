# Task Record: brand.html 手机版 Adobe-Hot Demands 间距修复

**日期**：2026-06-17
**页面**：brand.html（品牌详情页，手机版）
**任务**：Adobe-Hot Demands 部分 BID NOW 按钮距离 tag 太远，修改为 tag 最多 2 行，按钮紧贴 tag 底部（间距 10px）

## 修改文件

### 1. `css/detail/brand.css` — 核心修复

**根因**：`@media (max-width: 768px)` 中 `.brand-detail-page #demands .figma-popular-demand-item .demand-item-content` 有 `padding-bottom: 4.5rem`（36px），并且 `.item-tag-box` 设置了 `max-height: none`。

| 属性 | 修改前 | 修改后 |
|------|--------|--------|
| `demand-item-content` | `padding-bottom: 4.5rem;` | `padding-bottom: 0;` |
| `item-tag-box` | `max-height: none;` | `max-height: 5rem; overflow: hidden;` |

### 2. `css/detail/brand.less` — 同步修改

同上。

### 3. `css/demand.css` — 辅助修复

`@media (max-width: 768px)` 中新增 `#demands .layout-vertical .item-tag-box`：
- `height: auto; max-height: 5rem; overflow: hidden; padding: 0;`

### 4. `css/demand.less` — 同步修改

同上。

### 5. `src/pages/brand.html` — 防缓存

`demand.css` 引用添加版本参数。

## 间距计算

- tag-box: height auto（内容自适应），padding 0，max-height 5rem（2 行 tag）
- demand-item-content: padding-bottom 0
- 按钮: margin-top 1.25rem（10px，来自 demand.css 原有规则）

**最终结果**：BID NOW 按钮顶部距离 tag 底部 = 10px
