# Task: index.html 购物流程 PC版 stepper 样式修改

**日期**: 2026-06-25  
**Figma**: node-id=1902-78186  
**状态**: 已完成

## 修改内容

修改 index.html 页面购物流程中数量步进器（stepper）的 PC 版样式，对齐 Figma 设计稿。

### 修改文件
- `css/index.less` (源码)
- `css/index.css` (编译产物，同步修改)
- 30 个 HTML 文件 (构建脚本重新生成，更新防缓存版本号)

### CSS 改动明细

| 修改项 | 改前 | 改后 | 依据 |
|--------|------|------|------|
| 容器 border | `0.125rem solid #d9d9d9` | 去掉 | Figma: 无 border |
| 容器 border-radius | `0.5rem` (4px) | `0.25rem` (2px) | Figma: 2px |
| 容器 overflow | `hidden` | 去掉，改用 `gap: 0.25rem` | Figma: 2px 间距 |
| 按钮/输入背景 | `#fff` | `#f4f4f4` | Figma |
| 按钮/输入圆角 | 无 | `50px` (全圆) | Figma |
| 加号按钮背景 | 同减号 `#fff` | `#ff1a20` (红色) | Figma |
| 加号图标色 | `#000` | `#fff` (白色) | Figma |
| 加号按钮 disabled 态 | 无 | 回退为 `#f4f4f4` 背景 | 一致性 |
| 输入框左右边框 | `0.125rem solid #d9d9d9` | 去掉 | Figma: stroke.visible=false |
| 输入文字色 | `#000` | `#333` | Figma: #333333 |
