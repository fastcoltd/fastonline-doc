# 星星评分组件使用规范（给 Codex）

## 目标
- 所有页面统一使用同一套评分组件结构与样式。
- 必须使用 `HTML + CSS`，禁止使用图片标签实现星星。
- 支持小数评分。

## 必须依赖
- `css/star.css`
- `css/common.css`

## 标准 HTML 结构（必须一致）
```html
<div class="item-star-box">
  <div class="star-bg">
    <div class="stars-outer">
      <div class="stars-inner" style="width: 86%;"></div>
    </div>
  </div>
  <p class="item-star-score">4.3</p>
  <p class="item-star-recommend">(200)</p>
</div>
```

## 小数评分规则
- `stars-inner` 的 `width` = `评分 / 5 * 100%`
- 示例：
  - `5.0` -> `100%`
  - `4.3` -> `86%`
  - `3.5` -> `70%`

## 约束
- 不要新增其他星星结构（如 `figma-item-stars`）。
- 不要改组件类名：`item-star-box / star-bg / stars-outer / stars-inner`。
- 新页面或新卡片出现评分时，直接复用本规范结构。
