# Task: tag-all 手机版模式切换与筛选按钮调换位置

**日期**: 2026-06-25
**状态**: 已完成

## 修改内容

tag-all.html 手机版：模式切换组件和筛选按钮调换位置，与 attribute-all 完全一致的布局方案。

### 最终布局
```
┌─────────────────────────────────────────┐
│  12 Pro freelancers for Logo Deslgn     │  ← 上排，左对齐
├──────────────────────┬──────────────────┤
│  模式切换 (flex:1)    │  筛选按钮         │  ← 下排，纵向居中
└──────────────────────┴──────────────────┘
```

### 修改文件
- `css/tag-all.less` — 手机版 flex 布局
- `css/tag-all.css` — 同步
- 30 个 HTML — 构建刷新

### 关键改动
- 父容器：`flex-direction: column` + `position: relative`
- 12 Pro：`order: 1; justify-content: flex-start`（上排左对齐）
- 控制盒：`order: 2; display: flex; align-items: center`（下排居中）
- 模式切换：`flex: 1; width: 100%`（撑满）
- 筛选按钮：与模式切换同高 `5rem`
- 间距：`gap: 0.625rem; margin: 0.667rem 0 calc(-2rem + 5px)`
