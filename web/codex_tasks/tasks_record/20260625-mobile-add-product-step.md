# Task: index.html 购物流程手机版缺少步骤补齐

**日期**: 2026-06-25  
**状态**: 已完成

## 修改内容

手机版购物流程相较于 PC 端缺少了商品详情步骤（Step 1），补齐该步骤使手机端与 PC 端对齐。

### 修改文件
- `js/index.js` — 1 行改动
- 30 个 HTML（构建刷新，防缓存版本号）

### 改动明细

**`js/index.js` 第 172 行：**
```diff
- setStep(window.innerWidth <= 768 ? 'requirements' : 'product');
+ setStep('product');
```

移除移动端跳过商品详情步骤的条件判断，手机端和 PC 端统一从商品详情步骤开始。

### 说明
- 无需 CSS 修改：现有手机版媒体查询已完全覆盖商品详情面板样式
- PC 端不受影响
