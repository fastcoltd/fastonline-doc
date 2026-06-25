# Task: attribute-all 手机版模式切换与筛选按钮调换位置

**日期**: 2026-06-25
**状态**: 已完成

## 修改内容

attribute-all.html 手机版：模式切换组件和筛选按钮调换位置，模式切换撑满剩余宽度。

### 最终布局
```
┌─────────────────────────────────────────┐
│  27 Items for Social Media              │  ← 上排
├──────────────────────┬──────────────────┤
│  模式切换 (flex:1)    │  筛选 (abs)      │  ← 下排，间距15px
└──────────────────────┴──────────────────┘
```

### 修改文件
- `css/attribute-all.less` — 手机版布局重构
- `css/attribute-all.css` — 同步
- 30 个 HTML — 构建刷新

### 关键改动
- 父容器：`flex-direction: column` + `position: relative`
- 27 Items：`order: 1`，上排撑满
- 筛选按钮：`position: absolute; right:0; bottom:0`，移到下排右侧
- 模式切换：`order: 2; width: calc(100% - 3rem - 15px)`，撑满剩余宽度
- 切换子按钮：`flex: 1`，均分容器
- 底部间距：增加 5px
