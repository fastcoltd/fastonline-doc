document.addEventListener("DOMContentLoaded", function () {
    const brandPageIndexs = document.querySelectorAll(".page-link");
    const brandSections = document.querySelectorAll('.brand-section');
    const stickyHeader = document.getElementById('stickyHeader');

    let isScrolling = false;
    let scrollTimeout;

    // 初始化 - 设置第一个链接为激活状态
    if (brandPageIndexs.length > 0) {
        brandPageIndexs[0].classList.add('active');
    }

    // 点击导航链接事件
    brandPageIndexs.forEach(function (item) {
        item.addEventListener("click", function (e) {
            e.stopPropagation();
            const value = e.currentTarget.id;
            scrollToSection(value);
        });
    });

    // 防抖函数
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // 滚动监听事件
    const handleScroll = debounce(function () {
        if (isScrolling) return;

        updateActiveLink();
        updateStickyHeader();
    }, 10);

    window.addEventListener('scroll', handleScroll, { passive: true });

    // 更新激活的导航链接
    function updateActiveLink() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const headerHeight = stickyHeader ? stickyHeader.offsetHeight : 0;
        const offset = headerHeight; // 额外偏移量

        let activeSection = null;
        let closestDistance = Infinity;

        brandSections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            const distance = Math.abs(scrollTop + offset - sectionTop);

            // 检查当前section是否在可视区域内
            if (scrollTop + offset >= sectionTop - 100 && scrollTop + offset < sectionBottom) {
                if (distance < closestDistance) {
                    closestDistance = distance;
                    activeSection = section;
                }
            }
        });

        // 如果没有找到活跃的section，使用最接近顶部的section
        if (!activeSection) {
            brandSections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (scrollTop + offset >= sectionTop - 20) {
                    activeSection = section;
                }
            });
        }

        // 如果还是没有找到，使用第一个section
        if (!activeSection && brandSections.length > 0) {
            activeSection = brandSections[0];
        }

        if (activeSection) {
            const sectionId = activeSection.id;
            updateNavigation(sectionId);
        }
    }

    // 更新导航高亮
    function updateNavigation(activeSectionId) {
        brandPageIndexs.forEach(function (item) {
            if (item.id === activeSectionId) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }

    // 滚动到指定section
    function scrollToSection(sectionId) {
        let targetSection = null;
        brandSections.forEach(brandItem => {
            if (brandItem.id === sectionId) {
                targetSection = brandItem;
            }
        });
        if (!targetSection) return;
        const headerHeight = stickyHeader ? stickyHeader.offsetHeight : 0;
        const targetTop = targetSection.offsetTop - headerHeight;

        isScrolling = true;

        // 先更新导航状态
        updateNavigation(sectionId);

        window.scrollTo({
            top: targetTop,
            behavior: 'smooth'
        });

        // 平滑滚动完成后重置标志
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            isScrolling = false;
        }, 1000);
    }

    // 更新sticky header状态
    function updateStickyHeader() {
        if (!stickyHeader) return;

        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > 50) {
            stickyHeader.classList.add('is-sticky');
        } else {
            stickyHeader.classList.remove('is-sticky');
        }
    }

    // 初始化时更新一次状态
    updateActiveLink();
    updateStickyHeader();

    // 监听窗口大小变化，重新计算位置
    window.addEventListener('resize', debounce(function () {
        if (!isScrolling) {
            updateActiveLink();
        }
    }, 250));
});