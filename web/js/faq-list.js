/*
 * pages/faq-list.html 专属：全品牌下拉（.filter-custom-select[data-type="faqBrand"]）选中一项后，
 * 整页跳到该品牌的 FAQ 列表 URL（选项的 data-value 就是拼好的完整 URL，带上当前 title/useType/sort）。
 *
 * 展开/收起/输入检索这套交互由全站通用的 js/filter-select-search.js 提供（scripts.html 里已全局引），
 * 这里只监听它选中项目时广播的 filterselect:change 事件做导航。
 */
(function () {
    var $ = window.jQuery;
    if (!$) {
        return;
    }
    $(document).on('filterselect:change', '.filter-custom-select[data-type="faqBrand"]', function (e, detail) {
        if (detail && detail.value) {
            window.location.href = detail.value;
        }
    });
})();
