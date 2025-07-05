// 博客文章详情页面交互功能
document.addEventListener('DOMContentLoaded', function () {
    const relateItems = new Carousel('best-items', 20);
    const link = new LinkRef('toc-item', 'post-detail-section');
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
});
