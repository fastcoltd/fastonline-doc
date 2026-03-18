# 第一个 Item 卡片布局规范（基准模板）

## 适用范围
- 页面：`index.html`
- 基准卡片：`#best-items` 下第一个 `.best-items-item.figma-best-item`
- 设计基准：Figma `129:2974`（整卡）、`129:2977`（标题行）、`129:2984/129:2985`（信息区/标签）、`129:3018`（按钮）

## 结构（不要改类名）
```html
.best-items-item.figma-best-item
  .best-items-item-icon
  .icon-aixin
  .best-items-item-content
    .item-title-box
      .item-mark
      .item-title
    .best-items-item-middle-box
      .best-items-item-price-stock-box
        .item-price-box
        .item-stock-box
      .item-star-box
      .item-brand-box
      .item-service-box
      .item-tag-box
    .item-button-box.item-buy-btn.disabled
    .item-button-box.item-buy-btn.disabled.item-buy-btn-red
```

## 全局基准
- 桌面基准：`1rem = 8px`
- 本卡片主要局部样式来源：
  - `css/index.less`（`#best-items` 与 `.figma-best-item`）
  - `css/common.less`（通用文字/标签/标题/按钮基础）
  - `css/star.less`（评分星星）

## 布局与尺寸（按模块）

### 1) 卡片容器
- 选择器：`#best-items .figma-best-item`
- 圆角：`5rem`（40px）
- 内边距：`2.5rem`（20px）
- 定位：`position: relative`
- 阴影：`none`（按当前实现）

### 2) 主图
- 选择器：`.best-items-item-icon`
- 高度：`26.25rem`（210px）
- 圆角：`3.75rem`（30px）

### 2.1) 收藏按钮（选中/取消）
- 位置：卡片右上角（基于 `.best-items-item` 绝对定位）
- 尺寸：`24 x 24`
- 结构：使用图片，不使用远程字体，不使用 CSS 画图
- 资源：
  - 取消收藏：`image/Vector_nor.png`
  - 已收藏：`image/Vector_sel.png`
- 推荐 HTML：
```html
<img class="icon-aixin" data-like="1" src="image/Vector_sel.png" alt="收藏按钮" aria-label="收藏" aria-pressed="true" />
```
- 交互规则：
  - `data-like="1"`：已收藏，`src = image/Vector_sel.png`
  - `data-like="0"`：未收藏，`src = image/Vector_nor.png`
  - 点击时在 `1/0` 间切换，并同步 `aria-pressed`（`true/false`）

### 3) 内容主列
- 选择器：`.best-items-item-content`
- 子项纵向间距：`gap: 1.25rem`（10px）
- 底部留白：`padding-bottom: 8.75rem`（70px，给固定按钮留空间）

### 4) 标题行（mark + title）
- 选择器：`.figma-best-item .item-title-box`
- 横向间距：`gap: 1.25rem`（10px）
- 纵向对齐：`align-items: center`
- 固定两行区域高度：`min-height: 10rem`（80px）

- `mark`（`.figma-best-item .item-mark`）
  - 对齐：`align-self: center`
  - 文字：`14px/14px`（`1.75rem/1.75rem`）
  - 内边距：`0.5rem 1rem`（4px 8px）
  - 圆角：`0 0 1rem 0`
  - 背景：通常线性渐变（如 `#FF4D10 -> #FF7A02`）

- 标题（`.figma-best-item .item-title`）
  - 字号/行高：`3.5rem/5rem`（28px/40px）
  - 字重：`600`
  - 最多两行：`-webkit-line-clamp: 2`
  - 溢出：第二行末尾省略号
  - 高度限制：`max-height: 10rem`（80px）

### 5) 中间信息区
- 选择器：`.best-items-item-middle-box`
- 纵向间距：`gap: 0.75rem`（6px）

- Price / In stock 行
  - `Price` 文本：`2.5rem/3rem`（20px/24px）
  - `In stock` 文本：`1.75rem/3rem`（14px/24px）
  - 数值使用同组对应字号，默认字重中等

- 评分行
  - 行间距：`gap: 0.75rem`（6px）
  - 星星区：`21.125rem x 3.625rem`（169px x 29px）
  - 分数字号：`2.5rem`（20px），`Roboto 600`
  - `(count)`：`2.5rem`（20px），`Roboto 400`，颜色 `#6D6D6D`

- Brand / Service 行
  - 文本：`1.75rem/3rem`（14px/24px）
  - label 颜色：`#6D6D6D`
  - value 颜色：品牌可单独覆盖（如 `#06C70C`）

### 6) 标签区（129:2985）
- 选择器：`.figma-best-item .item-tag-box`
- 布局：多行换行
- 行/列间距：`0.75rem`（6px）
- 相对 Service 上移：`margin-top: -0.75rem`（-6px）
- 防裁剪：`overflow: visible`
- 底部保护：`padding-bottom: 0.25rem`（2px）

- 单个标签（`.figma-best-item .item-tag`）
  - 最小高度：`4rem`（32px）
  - 内边距：`0.625rem 1.125rem`（5px 9px）
  - 边框：`1px #D9D9D9`
  - 圆角：`2.5rem`（20px）
  - 阴影：`0 2px 0 rgba(0,0,0,0.02)`

- 标签文字
  - 字号/行高：`1.75rem/2.75rem`（14px/22px）
  - 颜色：`#6D6D6D`

### 7) 按钮（固定到底部）
- 选择器：`.figma-best-item .item-buy-btn`
- 高度：`6.25rem`（50px）
- 圆角：`6.25rem`（50px）
- 定位：`position: absolute`
- 左右：`2.5rem`（20px）
- 底部：`2.5rem`（20px）`<= 固定，不随上方内容变化`
- 文本：`BUY NOW`，`1.75rem/2.75rem`（14px/22px），`Roboto 400`
- 默认（灰色）态：背景 `#F4F4F4`，文字 `rgba(0,0,0,0.85)`，边框无（如 `.item-buy-btn.disabled`）
- 红色变体（按 Figma 红色按钮标注）：背景 `#FF1B20`，文字 `rgba(255,255,255,0.85)`，边框无（如 `.item-buy-btn.item-buy-btn-red`）

## 后续修改建议（给 Codex）
- 修改第 N 个 item 时，优先复用第一张卡片结构与类名。
- 只改内容时，通常仅改：
  - 主图 `src`
  - `item-mark` 文案/渐变色
  - `item-title` 文案
  - `Price / stock / score / count / brand / service`
  - 标签列表项文本
- 不要改上述类名与关键布局值（尤其按钮固定底部和标题两行规则），除非需求明确要求。
