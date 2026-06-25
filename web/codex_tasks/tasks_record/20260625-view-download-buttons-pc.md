# Task: index.html 购物流程 PC版 View/Download 按钮样式

**日期**: 2026-06-25  
**Figma**: node-id=4151-83795 (View), node-id=4151-83796 (Download)  
**状态**: 已完成

## 修改内容

修改 index.html 页面购物流程成功页中 View 按钮和 Download 按钮的 PC 版样式，对齐 Figma 设计稿。

### 修改文件
- `css/index.less` (源码)
- `css/index.css` (编译产物，同步修改)
- 30 个 HTML 文件 (构建脚本重新生成，更新防缓存版本号)

### 改动明细

| 属性 | 改前 | 改后 | Figma |
|------|------|------|-------|
| View 边框 | `0`（无） | `0.125rem solid #409eff` | 1px solid #409EFF |
| Download 边框 | 继承蓝色 | `border-color: #00c907` | 1px solid #00C907 |
| padding 左右 | `1.5rem` (12px) | `1.25rem` (10px) | 10px |
| View 文字色 | `#40a9ff` | `#409eff` | #409EFF |
| min-width | `11.5rem` (92px) | 移除 | hug content |
