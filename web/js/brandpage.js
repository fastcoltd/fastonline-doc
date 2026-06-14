window.addEventListener('DOMContentLoaded', function () {
    const isMobileBrandPage = function () {
        return window.matchMedia('(max-width: 768px)').matches;
    };

    if (!isMobileBrandPage()) {
        new LinkRef('brand-page-index-box-item', 'brand-page-list');
        return;
    }

    const indexBox = document.querySelector('.brand-page-index-box');
    const listContainer = document.querySelector('.brand-page-list-container');
    const indexItems = Array.from(document.querySelectorAll('.brand-page-index-box-item'));
    const sections = Array.from(document.querySelectorAll('.brand-page-list'));
    let scrollTimer = null;
    let isClickScrolling = false;

    if (!indexBox || !listContainer || indexItems.length === 0 || sections.length === 0) {
        return;
    }

    const updateActiveIndex = function (sectionId) {
        indexItems.forEach(function (item) {
            const isActive = item.id === sectionId;
            item.classList.toggle('active', isActive);
            if (isActive) {
                item.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
            }
        });
    };

    const getSectionTopInContainer = function (section) {
        return section.getBoundingClientRect().top - listContainer.getBoundingClientRect().top + listContainer.scrollTop;
    };

    const updateActiveByScroll = function () {
        const currentTop = listContainer.scrollTop;
        const offset = 8;
        let activeSection = sections[0];

        sections.forEach(function (section) {
            if (currentTop + offset >= getSectionTopInContainer(section)) {
                activeSection = section;
            }
        });

        if (activeSection && activeSection.id) {
            updateActiveIndex(activeSection.id);
        }
    };

    indexItems.forEach(function (item) {
        item.addEventListener('click', function () {
            const targetSection = sections.find(function (section) {
                return section.id === item.id;
            });
            if (!targetSection) {
                return;
            }

            isClickScrolling = true;
            updateActiveIndex(item.id);
            listContainer.scrollTo({
                top: getSectionTopInContainer(targetSection),
                behavior: 'smooth'
            });

            if (scrollTimer) {
                clearTimeout(scrollTimer);
            }
            scrollTimer = setTimeout(function () {
                isClickScrolling = false;
                updateActiveByScroll();
            }, 500);
        });
    });

    listContainer.addEventListener('scroll', function () {
        if (isClickScrolling) {
            return;
        }
        updateActiveByScroll();
    }, { passive: true });

    window.addEventListener('resize', function () {
        if (isMobileBrandPage()) {
            updateActiveByScroll();
        }
    });

    updateActiveByScroll();
});
