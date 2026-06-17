# brand-all.html 手机版面包屑底部 padding 修改

**日期：** 2025-06-17
**任务：** brand-all.html 手机版面包屑底部 padding 增加 20px

## 修改内容

### css/brand.css
在 `@media screen and (max-width: 768px)` 中 `.page-top-bread` 块之后，新增：
```css
.page-nav-box {
    padding-bottom: 1.25rem;
}
```

### css/brand.less (行294)
同步新增：
```less
.page-nav-box {
    padding-bottom: 1.25rem;
}
```

## 影响范围
- 仅 brand-all.html 页面手机版
- 不影响 PC 版本
- 不影响其他页面

## 构建
- 运行 `node scripts/build-pages.js`，缓存版本更新至 `20260617004957`
