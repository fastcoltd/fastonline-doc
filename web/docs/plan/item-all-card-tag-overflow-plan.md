# 商品 Item PC 标签两行溢出计划

## 目标与非目标

- [x] PC Vertical 与 PC Horizontal 的商品标签最多展示两行。
- [x] 超出两行时，在第二行末尾展示 `+N`，`N` 为未展示标签数量。
- [x] 保留标签顺序、链接和业务数据。
- [x] Mobile Vertical 与 Mobile Horizontal 保持现状。
- [x] 不修改 Store、Campaign、Demand、Post 等其它统一组件。

## 当前结构与消费者

- [x] 复用唯一组件 `src/partials/components/item-all-card.html`。
- [x] 复用标签容器 `nav[aria-label="Item tags"]`、标签链接和现有 `[data-role="more"]` 标志。
- [x] 覆盖直接消费者：attribute-all、brand-service、compaign-detail、item-all、item-detail、post-detail、search-all、store-detail、system-post-detail、tag-all。
- [x] 覆盖间接消费者：brand 的 Hot Items 与 index 的 Best Items。
- [x] 检查布局切换、动态新增、筛选、分页和轮播入口。

## 数据策略

- [x] 所有真实标签继续由 `item_tags` 参数传入，不改标题、链接或顺序。
- [x] 运行时只隐藏超出两行的标签，不删除标签 DOM。
- [x] `[data-role="more"]` 仅在真实标签超过两行时展示，数值只统计本次隐藏的标签数量。

## 组件结构与行为

- [x] 不建立第二份 PC/Mobile 或 Vertical/Horizontal DOM。
- [x] 为没有标志的标签容器按需生成唯一 `[data-role="more"]` 节点。
- [x] 根据实际换行位置测量前两行，并为第二行末尾的 `+N` 预留空间。
- [x] 监听视口、状态 class 和动态卡片变化，重新计算标签展示。
- [x] Mobile 状态恢复全部标签 DOM 状态并隐藏溢出标志。

## 样式与状态

- [x] 修改 `item-all-card-desktop-vertical.css` / `.less`，限制标签区域为两行。
- [x] 修改 `item-all-card-desktop-horizontal.css` / `.less`，限制标签区域为两行。
- [x] 复用 `item-all.css` / `.less` 中 `[data-role="more"]` 的基础视觉样式。
- [x] 不增加页面专用组件状态或页面祖先覆盖。

## 实施顺序

- [x] 建立修改前 Playwright 基线。
- [x] 实现共享溢出计算逻辑。
- [x] 接入 PC Vertical。
- [x] 接入 PC Horizontal。
- [x] 回归两个 Mobile 状态。
- [x] 检查所有共享消费者。

## Playwright 回归矩阵

- [x] PC Vertical：不足两行、刚好两行、超过两行。
- [x] PC Horizontal：不足两行、刚好两行、超过两行。
- [x] PC Vertical/Horizontal 往返切换和窗口缩放。
- [x] Mobile Vertical 与 Mobile Horizontal 无回归。
- [x] 抽查 item-all、attribute-all、tag-all、search-all、index 和 brand-service。
- [x] 检查标签链接、收藏、购买、分页、筛选和动态新增行为。

## 构建与静态检查

- [x] `node scripts/build-pages.js`
- [x] `node --check` 检查修改的 JavaScript。
- [x] 检查 CSS/LESS 成对同步。
- [x] 反向搜索组件、状态 class 和溢出标志消费者。
- [x] `git diff --check`
