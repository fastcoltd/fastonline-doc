# Task: index.html 购物流程 PC版 Accept & Buy 按钮宽度

**日期**: 2026-06-25  
**Figma**: node-id=1902-78195  
**状态**: 已完成

## 修改内容

修改 index.html 页面购物流程中 Accept & Buy 按钮的宽度和样式，对齐 Figma 设计稿。

### 修改文件
- `css/index.less` (源码)
- `css/index.css` (编译产物，同步修改)
- 30 个 HTML 文件 (构建脚本重新生成，更新防缓存版本号)

### `.index-purchase-primary` 改动明细

| 属性 | 改前 | 改后 | Figma 设计 |
|------|------|------|-----------|
| 宽度 | `min-width: 14.25rem` (114px) | `width: 22.25rem` (178px) | 178px FIXED |
| 边框 | `0.125rem solid #ff2424` | `none` | stroke.visible=false |
| 背景色 | `#ff2424` | `#ff1a20` | #FF1A20 |
| 阴影 | 无 | `0 0.25rem 0 rgba(0,0,0,0.016)` | drop-shadow |
