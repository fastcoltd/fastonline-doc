// 博客文章详情页面交互功能
document.addEventListener('DOMContentLoaded', function () {
    optimizeOtherPagesForMobile();

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

    $('.helpful-section-wrapper .resource-action-group').on('click', function () {
        $(this).toggleClass('has-activate')
    })
});

function optimizeOtherPagesForMobile() {
    const isMobileViewport = window.matchMedia('(max-width: 768px)').matches;
    const isTouchDevice = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    if (!isMobileViewport && !isTouchDevice) {
        return;
    }

    const carouselContainer = document.getElementById('best-items');
    if (!carouselContainer) {
        return;
    }

    const track = carouselContainer.querySelector('.carousel-track');
    const indicator = carouselContainer.querySelector('.carousel-indicators');
    if (!track || !indicator) {
        return;
    }

    const originSlides = Array.from(track.querySelectorAll('.carousel-slide'));
    if (!originSlides.length) {
        return;
    }

    const cards = [];
    originSlides.forEach(function (slide) {
        Array.from(slide.children).forEach(function (child) {
            if (child.classList && child.classList.contains('resource-page-item')) {
                cards.push(child);
            }
        });
    });

    if (cards.length <= 1) {
        return;
    }

    const perSlide = 2;
    const expectedSlides = Math.ceil(cards.length / perSlide);
    const alreadyGrouped = originSlides.length === expectedSlides && originSlides.every(function (slide) {
        const cardCount = Array.from(slide.children).filter(function (child) {
            return child.classList && child.classList.contains('resource-page-item');
        }).length;
        return cardCount <= perSlide;
    });
    if (alreadyGrouped) {
        return;
    }

    const slideClassName = originSlides[0].className;
    track.innerHTML = '';

    for (let index = 0; index < cards.length; index += perSlide) {
        const slide = document.createElement('div');
        slide.className = slideClassName;
        cards.slice(index, index + perSlide).forEach(function (card) {
            slide.appendChild(card);
        });
        track.appendChild(slide);
    }

    indicator.innerHTML = '';
    for (let dotIndex = 0; dotIndex < expectedSlides; dotIndex++) {
        const dot = document.createElement('div');
        dot.className = `carousel-indicator home-section-indicator${dotIndex === 0 ? ' active' : ''}`;
        indicator.appendChild(dot);
    }
}
