# C 档：通用类族重构 · 独立立项计划

> 关联主计划：`docs/plan/partials-selector-simplification-plan.md`（P1、P2[除C档]、P4 已完成，P3 跳过）。
> 本文档专门评估通用类族（`item-*` / `store-item-*` / `summary-box` 等）能否精简、如何精简。
> 依据 `rules/html_selector_simplification_rule.md`（§2 必须精简的前提：能用父级作用域选择器**等价表达**；§4 跨组件复用需**所有消费者在范围内且可等价表达**）。

## 0. 结论先行（重要）

**核心通用类族无共同父级结构，无法父级作用域化 → 应保留，不精简。** 仅极少数受限子族勉强算候选，ROI 低。整体建议：**保留 C 档通用类族**（零风险、符合规则、不劣化代码）。

## 1. 分布数据（采集自本仓库，js 全为 0）

| 类 | 消费组件数 | css 文件数 | 能否结构化 |
|---|---|---|---|
| `item-title` | 32 | 22 | ❌ 32 组件父级各异 |
| `item-title-box` | 22 | 20 | ❌ |
| `item-brand` | 24 | 12 | ❌ |
| `item-brand-text` | 24 | 10 | ❌ |
| `item-service` | 23 | 14 | ❌ |
| `item-service-text` | 23 | 12 | ❌ |
| `item-mark` | 14 | 15 | ❌ |
| `item-desc` | 13 | 7 | ❌ |
| `item-stock` | 12 | 10 | ❌ |
| `item-stock-text` | 12 | 9 | ❌ |
| `item-price` | 11 | 10 | ❌ |
| `item-price-text` | 6 | 8 | ❌ |
| `best-items-item-icon` | 2 | 7 | ❌ 跨 7 css + 2-img 歧义 |
| `store-item-icon` | 6 | 1 (store.css) | ⚠️ 受限候选 |
| `store-item-detail` | 6 | 1 (store.css) | ⚠️ 受限候选 |
| `summary-box` / `summary-box2` | 2 | 1 (search-all) | ⚠️ 受限候选 |

## 2. 关键结论（为什么核心 item-* 家族不能精简）

- 同一个通用类被 **11~32 个结构各异的组件**复用。要精简就得用"父级作用域选择器"等价替换，但**不存在能一次覆盖全部消费方、且只命中目标元素的单一父级/结构选择器**。
- 强行做只有两种结局，都违反"零视觉变化"最高原则：
  1. 用某个组件的父级 → 只覆盖部分消费方，其余掉样式；
  2. 用宽泛选择器（如 `.item-brand-box p`）→ 爆炸半径覆盖全站、极易误伤。
- 因此按规则 §2/§4：**这些是合法的可复用工具/语义类（无 JS、纯样式、但不可等价父级表达）→ 保留。** 这正是规则"可用父级作用域等价表达"前提的**反例**。

## 3. 受限候选（若坚持推进，逐族独立小批 + 全消费页回归）

- **`store-item-icon` / `store-item-detail`**（6 组件、store.css 单文件）：需逐一核对 6 个组件的父级是否一致（如是否都为 `.store-item-user-box img` / `.store-item-detail-box p`）。**仅当 6 组件结构完全一致**才可转，否则保留。回归 store-all / store-detail / index(best-store) / tag-all / search-all 等所有 store 卡片页面。ROI 低。
- **`summary-box` / `summary-box2`**（2 组件、search-all）：父级 `.card-content` 是通用类，且两者是不同行数（3行/2行）的变体，用 `.card-content > p` 需顺序依赖、易误伤其它卡片的 p。**建议保留。**
- **`best-items-item-icon`**：2 组件但跨 7 css、且是 cover+like 的 2-img 歧义 → 保留。

## 4. 推进准则（若未来做受限候选）

1. 逐类扫出**全部**消费组件（`rg -l "\bCLASS\b" src`）与共享 css 落点。
2. 逐一确认每个消费组件里该类的**父级+同级结构完全一致**，且存在能等价覆盖全部消费方、只命中目标的结构选择器；**任一不满足则保留**。
3. 改共享 css（store.css 等）后同步 `.less`，`node scripts/build-pages.js`，并**回归所有消费页面**（PC+手机）。
4. 每类单独小批提交，便于回退。

## 5. 状态

- [x] 核心 `item-*` 家族评估 → **结论：保留，不立项精简**（无法等价父级表达）。
- [ ] 受限候选评估（`store-item-icon`/`store-item-detail`）— 可选，未排期，需先逐组件核对父级一致性。
- [ ] `summary-box` / `best-items-item-icon` → 建议保留，不排期。
