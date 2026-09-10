/*
 * components/faq-item.html 的交互：点标题栏原地展开/收起摘要（不跳转，只有卡片里的 "more" 链接才跳
 * 详情页）。全站公共组件的交互脚本，哪个页面用了 faq-item 就引这个文件（pages/brand.html 的 FAQ 分区、
 * pages/faq-list.html）。
 *
 * 点赞/点踩/收藏原来是这里纯前端 toggle 视觉态、不落库，现在改成接真接口，逻辑挪到 js/faq.js
 * （[data-action] + [data-id] → fast-api PUT /like/faq/{id}、POST /favorites{saveType:FAQ}），
 * 跟系统文章那套 js/resource.js 一致。faq-list 页两个脚本都引；brand.html 只引这个（brand 页 FAQ 分区
 * 目前不接收藏/点赞接口，卡片上那几个图标只做展示，点了没反应也不误导——要接的话把 js/faq.js 也引上）。
 */
$(document).ready(function () {
    $('.faq-header-middle-box > div').on('click', function () {
        var $item = $(this).parents('.faq-item');
        $item.find('.faq-header > img').toggleClass('open');
        $item.find('.faq-content').toggle(100);
        $item.toggleClass('brand-faq-item-expanded');
    });
    $('.faq-header > img').on('click', function (e) {
        var $item = $(e.target).parents('.faq-item');
        $(e.target).toggleClass('open');
        $item.find('.faq-content').toggle(100);
        $item.toggleClass('brand-faq-item-expanded');
    });
});
