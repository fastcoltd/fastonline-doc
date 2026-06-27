# brand-service.html 手机版 Service分类按钮单行横向滚动

## 任务内容
brand-service.html 手机版中 "Service:" 标签后面的 5 个服务分类按钮（Social Media、Gaming、Content、Mobile Apps、Cloud Service），当前因为 `flex-wrap: wrap` 导致换行显示为 2 行，需要改成一行显示，超出部分支持横向滚动查看。

## 修改文件

### css/brand-service.less
移动端 `@media screen and (max-width: 768px)` 中：

**1. `.brand-service-service-row`** — 新增横向滚动属性
```diff
.brand-service-service-row {
    gap: 0.75rem;
+   flex-wrap: nowrap;
+   overflow-x: auto;
+   -webkit-overflow-scrolling: touch;
+   scrollbar-width: none;
+   &::-webkit-scrollbar {
+       display: none;
+   }
}
```

**2. `.brand-service-hero`** — 调整底部间距
```diff
.brand-service-hero {
    width: 100%;
-   padding: 1.25rem 0 1.5rem;
+   padding: 1.25rem 0 0;
    box-sizing: border-box;
}
```

**3. `.item-all-filter-layoutcontrol-box`** — 精确控制与下方内容间距为 15px
```diff
.item-all-filter-layoutcontrol-box {
    ...
-   margin-top: 2rem;
+   margin-top: 15px;
}
```

### css/brand-service.css
同步修改编译产物，保持一致。

## Playwright 验证结果
- `flexWrap: nowrap` ✅
- `overflowX: auto` ✅
- `scrollWidth: 547px > clientWidth: 343px` — 内容超出，滚动可用 ✅
- 所有 5 个芯片按钮在同一行 ✅
- service row 底部到下方内容间距 = 15px ✅
