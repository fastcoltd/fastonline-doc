$(document).ready(function () {
    document.querySelectorAll('.brand-hot-items-pager').forEach(function (pager) {
        new PageLayout(pager, pager);
    });

    const demandsPager = document.getElementById('popuar-demands');
    if (demandsPager) {
        new DemandAllLayout(demandsPager, demandsPager);
    }

    const postsPager = document.getElementById('hot-posts');
    if (postsPager) {
        new PostAllLayout(postsPager);
    }

    const link = new LinkRef('page-link', 'brand-section');
    // 品牌描述「一行 + Show More/Less」展开收起挪到全站通用的 js/desc-toggle.js（标签详情 / 属性详情
    // 也要一样的），brand.html 的 scripts 里已跟着引了那个文件。
    // FAQ 卡片的展开/收起、点赞/点踩/收藏交互挪到 js/faq-item.js 了（faq-item 现在是全站公共组件，
    // pages/faq-list.html 也要用，不能只在这个文件里写一份），brand.html 的 scripts 里已经跟着引了那个
    // 文件，这里不用重复写。
})
