# Task：item-detail.html PC版 Reviews Show More Reviews 按钮修复

**日期**：2026-06-27

**状态**：已完成

**修改页面**：item-detail.html

## 任务内容

Reviews 的部分，点击 "Show More Reviews" 后，没有反应。改为点击后增加一条完整 Review（包含用户信息、评分、价格/数量统计、回复评论、Helpful 反馈按钮）。

## 修改文件

`js/detail/item-detail.js`

## Diff 总结

```diff
diff --git a/js/detail/item-detail.js b/js/detail/item-detail.js
index 8dfd302..cf388f8 100644
--- a/js/detail/item-detail.js
+++ b/js/detail/item-detail.js
@@ -42,10 +42,6 @@ function syncMobileStickyPlaceholder(shouldSticky) {
     pageContent.style.marginTop = `${getStickyHeaderHeight()}px`;
 }
 
-function sortItems(value) {
-    console.log('sort items', value);
-}
-
 const REVIEW_INCREMENT_COUNT = 1;
 const list = new PageList();
 list.itemsPerPage = REVIEW_INCREMENT_COUNT;
@@ -848,10 +844,11 @@ document.addEventListener("DOMContentLoaded", function () {
         $(this).parent().toggleClass('has-activate')
     })
     const loadMore = document.getElementById('load-more');
-    if (loadMore && bodyElement.offsetWidth > 768) {
+    if (loadMore && window.innerWidth > 768) {
         loadMore.addEventListener('click', function(event) {
             event.preventDefault();
             event.stopPropagation();
+            list.currentPage++;
             renderItems(generateMockItems());
         })
     }
```

## 修改说明

| 序号 | 修改项 | 说明 |
|------|--------|------|
| 1 | 删除重复的 `sortItems` 函数 | 代码中存在两个完全相同的 `function sortItems` 声明，删除第一个 |
| 2 | `bodyElement.offsetWidth > 768` → `window.innerWidth > 768` | 使用 `window.innerWidth` 判断 PC 端更可靠，避免依赖 body 元素引用 |
| 3 | 新增 `list.currentPage++` | 每次点击 "Show More Reviews" 时递增页码，确保生成的 Review item 数据有区分度 |
