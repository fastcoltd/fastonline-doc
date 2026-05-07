// 博客文章详情页面交互功能
document.addEventListener('DOMContentLoaded', function () {
    const carouselContainer = document.getElementById('best-items');
    if (carouselContainer) {
        new Carousel('best-items', 20);
    }

    const tocItem = document.querySelector('.toc-item');
    if (tocItem) {
        new LinkRef('toc-item', 'post-detail-section');
    }

    const menu = document.querySelector('.detail-page-menu');
    const menuContainer = document.querySelector('.table-of-container');
    const close = menuContainer ? menuContainer.querySelector('.table-of-container-close') : null;

    function toggleMenu(visible) {
        if (!menuContainer) {
            return;
        }
        menuContainer.style.display = visible ? 'block' : 'none';
        document.body.classList.toggle('modal-open', visible);
    }

    if (menu && menuContainer) {
        menu.addEventListener('click', function (event) {
            event.preventDefault();
            event.stopPropagation();
            const isHidden = window.getComputedStyle(menuContainer).display === 'none';
            toggleMenu(isHidden);
        });
    }

    if (close) {
        close.addEventListener('click', function (event) {
            event.preventDefault();
            event.stopPropagation();
            toggleMenu(false);
        });
    }

    $('.helpful-section-wrapper .resource-action-like-icon, .helpful-section-wrapper .resource-action-like .resource-action-label').on('click', function () {
        const wrapper = $(this).closest('.helpful-section-wrapper')
        wrapper.find('.resource-action-like').addClass('has-activate')
        wrapper.find('.resource-action-unlike').removeClass('has-activate')
    })
    $('.helpful-section-wrapper .resource-action-unlike-icon, .helpful-section-wrapper .resource-action-unlike .resource-action-label').on('click', function () {
        const wrapper = $(this).closest('.helpful-section-wrapper')
        wrapper.find('.resource-action-unlike').addClass('has-activate')
        wrapper.find('.resource-action-like').removeClass('has-activate')
    })
});
