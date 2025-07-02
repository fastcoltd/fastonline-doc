// 博客文章详情页面交互功能
document.addEventListener('DOMContentLoaded', function () {
    const link = new LinkRef('toc-item', 'post-detail-section', true, 'post-detail-container');
    updateHeaderHeight();
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