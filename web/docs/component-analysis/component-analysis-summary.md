# 全局组件统一分析报告（总结）

## 总览

| 类型 | Vertical 模式 | Horizontal 模式 | 搜索页 | 整体评估 |
|------|:---:|:---:|:---:|:---:|
| 商品 (item) | ✅ 统一 | ❌ 3种不同组件 | ❌ 独立组件 | **需统一 Horizontal** |
| Campaign | ✅ 统一 | ⚠️ 独立组件 | ❌ 独立组件 | **需统一 Horizontal** |
| 店铺 (store) | ✅ 统一 | ⚠️ 有 responsive | ❌ 独立组件 | **基本统一** |
| Posts | ✅ 统一 | - | ❌ 独立组件 | **blog 用了完全不同体系** |
| Demands | ✅ 统一 | ✅ 统一 | ❌ 独立组件 | **最统一** |

## 跨类型通用问题

### 搜索页是重灾区
search-all.html 的 5 种 item 全部使用了独立组件（search-all-*-item.html），与其他页面不共享，需要同步维护两套。

### 参数命名不一致
| 组件 | item_tags 格式 |
|------|---------------|
| index.html 商品 | `<span class="compaign-item-products-text">` |
| item-all.html 商品 | `<p class="item-tag-text">` |
| tag-all.html 商品 | 混用 span 和 p |

### 共享子组件
item-like-button.html（收藏按钮）是唯一被所有 5 种类型共用的组件，调用方式一致。

## 待修改汇总

| 修改项 | 涉及文件数 | 优先级 | 说明 |
|--------|:---:|:---:|------|
| 统一 Horizontal 商品组件 | 5+ | 🔴 高 | tag-all、search-all 改用标准组件 |
| 统一 Horizontal Campaign 组件 | 3 | 🔴 高 | search-all 改用标准组件 |
| 统一 blog Posts 组件 | 8+ | 🔴 高 | blog 改用 post-shared-item.html 或扩展它 |
| 统一搜索页 5 种组件 | 5 | 🟡 中 | search-all 各组件改为引用标准组件 |
| 统一 item_tags 参数格式 | 5+ | 🟡 中 | 统一使用相同的 HTML 标签结构 |
| 店铺组件参数化 | 3 | 🟢 低 | 将硬编码数据改为参数传递，便于 SEO |

## 风险评估

1. **改动影响面大**：修改一个组件可能影响多个页面，需要逐页验证
2. **PC 端和手机端都要改**：responsive 组件中 desktop 和 mobile 是两个独立子组件
3. **参数兼容性**：替换组件时需要确保所有调用方传入的参数一致
4. **CSS 耦合**：不同页面可能对同一组件有不同样式覆盖，需要排查

## 详细分析文件

- [商品 (item) 详细分析](./component-analysis-item.md)
- [Campaign 详细分析](./component-analysis-campaign.md)
- [店铺 (store) 详细分析](./component-analysis-store.md)
- [Posts 详细分析](./component-analysis-posts.md)
- [Demands 详细分析](./component-analysis-demands.md)
