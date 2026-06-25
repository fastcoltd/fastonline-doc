# Task: 新增 faq-list 页面

**日期**: 2026-06-26
**状态**: 已完成

## 修改内容

新增 faq-list 页面，复用现有组件。

### 新增文件
- `src/pages/faq-list.html` — 页面源码
- `faq-list.html` — 构建产物

### 修改文件
- `css/faq.less` — 新增 faq-item 手机版 padding
- `css/faq.css` — 同步

### 实现内容
- header/top-menu/footer 复用 index.html 组件，完全一致
- 列表项复用 `brand-faq-item.html` 组件（展开/折叠 + 点赞/点踩 + 收藏）
- Show More 按钮加载效果
- 空数据状态组件
- faq-list 页面专属 JS（点赞点踩、展开折叠、Show More loading）
- PC 版和手机版均适配
