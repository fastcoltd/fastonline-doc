# 全局组件统一分析计划

## 背景
全局 5 种 item 类型（商品、campaign、店铺、posts、demands）需要统一使用相同组件，消除重复定义和 UI 差异。

## 执行阶段

### 阶段一：全量扫描（只读分析）
1. 建立组件清单：扫描 `src/partials/components/` 下所有 5 类相关的组件文件
2. 建立页面-组件引用关系表：遍历所有页面，追踪 include 引用
3. 逐类型对比分析：HTML 结构、CSS 样式、可见差异
4. 输出差异清单

### 阶段二：制定统一方案
1. 确定每种类型最终的组件版本
2. 制定逐页面修改计划
3. 风险评估

### 阶段三：输出完整报告

## 5 种组件类型定义
| 类型 | Vertical 代表 | Horizontal 代表 |
|------|--------------|-----------------|
| 商品 (item) | index.html Best items | item-all.html Horizontal |
| Campaign | index.html Hot campaigns | compaign-all.html Horizontal |
| 店铺 (store) | index.html Best stores | store-all.html Horizontal |
| Posts | index.html Host posts | （仅一种） |
| Demands | index.html Popular demands | demand-all.html Horizontal |
