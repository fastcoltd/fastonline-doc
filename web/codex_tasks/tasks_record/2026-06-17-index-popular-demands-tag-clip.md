# index.html 手机版 Popular demands tag 裁切问题修复

**日期:** 2026-06-17

**任务:** index.html 手机版 Popular demands 部分的 item，tag 第二行下半部分被裁切，需要完整展示。

**根因:** 移动端 `.figma-popular-demand-item .item-tag-box` 设置了 `height: 4rem` 和 `overflow: hidden`，但两行 tag（每行约 2.25rem + 间距 0.4rem）需要约 4.9rem，4rem 高度不足以完整显示两行。

**修改文件:**
- `css/index.less`（行 2454-2463）
- `css/index.css`（行 2043-2052）

**具体修改:**

| 属性 | 修改前 | 修改后 |
|------|--------|--------|
| `max-height` | `4rem` | `5.2rem` |
| `height` | `4rem` | `auto` |

**影响范围:** 仅手机版 index.html 中 `#popuar-demands-mobile` 内的 Popular demands item tag 区域。

**缓存版本:** `20260617030725`
