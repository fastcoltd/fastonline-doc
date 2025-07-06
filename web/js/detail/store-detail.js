document.addEventListener('DOMContentLoaded', function () {
    const link = new LinkRef('page-link', 'item-detail-right-group');
    const faqs = document.querySelectorAll('.item-detail-faq-box');
    faqs.forEach(element => {
        const content = element.querySelector('.item-detail-faq-content');
        const title = element.querySelector('.item-detail-faq-title-box');
        const arrow = title.querySelector('.item-detail-faq-title-arrow');
        title.addEventListener('click', function (event) {
            event.preventDefault();
            event.stopPropagation();
            if (content.style.display === 'none') {
                title.classList.toggle('toggle', true);
                content.style.display = 'inline-block';
                arrow.style.transform = 'rotate(180deg)';
            } else {
                title.classList.toggle('toggle', false);
                content.style.display = 'none';
                arrow.style.transform = 'rotate(0deg)';
            }
        })
    });

    const reviews = document.querySelectorAll('.item-detail-review-item');
    reviews.forEach(element => {
        const reviewer = element.querySelector('.item-detail-reiviewer-box');
        const user = reviewer.querySelector('.item-detail-reviewer-user-box')
        const arrow = user.querySelector('.item-detail-reviewer-arrow');
        const content = reviewer.querySelector('.item-detail-reviewer-content');
        user.addEventListener('click', function (event) {
            event.preventDefault();
            event.stopPropagation();
            if (content.style.display === 'none') {
                content.style.display = 'inline-block';
                arrow.style.transform = 'rotate(180deg)';
            } else {
                content.style.display = 'none';
                arrow.style.transform = 'rotate(0deg)';
            }
        });
    });

    const stickyHeader = document.getElementById('stickyHeader');
    const stickyHeaderHeight = stickyHeader.offsetHeight;
    const pageLink = document.querySelector('.page-link-box');
    const pageHead = document.querySelector('.page-head');
    const pageHeadHeight = pageHead.offsetHeight;
    // 滚动监听事件
    const handleScroll = debounce(function () {
        adjustLinkPosition();
    }, 10);

    window.addEventListener('scroll', handleScroll, { passive: true });

    // 页面加载时调整位置
    adjustLinkPosition();

    // 动态调整过滤器位置
    function adjustLinkPosition() {
        const body = document.getElementsByTagName('body')[0];
        const headIsSticky = stickyHeader.classList.contains('is-sticky');
        if (!pageLink) return;
        pageLink.classList.toggle('is-sticky', headIsSticky);
        // 设置过滤器的位置和高度
        if (headIsSticky) {
            // sticky状态：固定定位
            Object.assign(pageLink.style, {
                top: stickyHeaderHeight + 'px',
            });
        } else {
            Object.assign(pageLink.style, {
                top: 0,
            });
        }
    }
})