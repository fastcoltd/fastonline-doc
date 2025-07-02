// 博客文章详情页面交互功能
document.addEventListener('DOMContentLoaded', function () {
    const relateItems = new Carousel('best-items', 20);
    const link = new LinkRef('toc-item', 'post-detail-section', true, 'post-detail-container');
    updateHeaderHeight();
    const reviews = document.querySelectorAll('.post-detail-review-item');
    reviews.forEach(element => {
        const reviewer = element.querySelector('.post-detail-reiviewer-box');
        const user = reviewer.querySelector('.post-detail-reviewer-user-box')
        const arrow = user.querySelector('.post-detail-reviewer-arrow');
        const content = reviewer.querySelector('.post-detail-reviewer-content');
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
    const menu = document.querySelector('.detail-page-menu');
    const menuContainer = document.querySelector('.table-of-container');
    menu.addEventListener('click', function (event) {
        event.preventDefault();
        event.stopPropagation();
        const menuContainerStyle = window.getComputedStyle(menuContainer);
        const close = menuContainer.querySelector('.table-of-container-close');
        close.addEventListener('click', function (event) {
            menuContainer.style.display = 'none';
            body.classList.toggle('modal-open', false);
        });
        if (menuContainerStyle.display === 'none') {
            menuContainer.style.display = 'block';
            body.classList.toggle('modal-open', true);
        } else {
            menuContainer.style.display = 'none';
            body.classList.toggle('modal-open', false);
        }
    });

    window.addEventListener('resize', function () {
        updateHeaderHeight();
    })
});

function updateHeaderHeight() {
    const stickyHeader = document.getElementById('stickyHeader');
    const pageHeaderHeight = stickyHeader ? stickyHeader.offsetHeight : 0;
    document.documentElement.style.setProperty('--page-header-height', `${pageHeaderHeight}px`);
}