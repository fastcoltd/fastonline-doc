// 博客文章详情页面交互功能
document.addEventListener('DOMContentLoaded', function () {
    const carouselContainer = document.getElementById('best-items');
    if (carouselContainer) {
        new Carousel('best-items', 20);
    }

    const tocItem = document.querySelector('.toc-item');
    let link = null;
    if (tocItem) {
        link = new LinkRef('toc-item', 'post-detail-section');
    }

    const menu = document.querySelector('.detail-page-menu');
    const menuContainer = document.querySelector('.table-of-container');
    const close = menuContainer ? menuContainer.querySelector('.table-of-container-close') : null;

    function toggleMenu(visible) {
        if (!menuContainer) {
            return;
        }
        menuContainer.classList.toggle('is-open', visible);
        document.body.classList.toggle('modal-open', visible);
        menuContainer.setAttribute('aria-hidden', visible ? 'false' : 'true');
        if (menu) {
            menu.setAttribute('aria-expanded', visible ? 'true' : 'false');
        }
    }

    if (menu && menuContainer) {
        menu.addEventListener('click', function (event) {
            event.preventDefault();
            event.stopPropagation();
            const isOpen = menuContainer.classList.contains('is-open');
            toggleMenu(!isOpen);
        });
    }

    if (close) {
        close.addEventListener('click', function (event) {
            event.preventDefault();
            event.stopPropagation();
            toggleMenu(false);
        });
    }

    if (menuContainer) {
        menuContainer.addEventListener('click', function (event) {
            if (event.target === menuContainer) {
                toggleMenu(false);
            }
        });

        const tocItems = menuContainer.querySelectorAll('.toc-item');
        tocItems.forEach(function (item) {
            item.addEventListener('click', function () {
                if (!window.matchMedia('(max-width: 768px)').matches || !link) {
                    return;
                }
                const targetSectionId = item.id;
                toggleMenu(false);
                window.setTimeout(function () {
                    link.scrollToSection(targetSectionId);
                }, 0);
            });
        });
    }

    if (window.matchMedia('(max-width: 768px)').matches) {
        toggleMenu(false);
    } else if (menuContainer) {
        menuContainer.setAttribute('aria-hidden', 'false');
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
