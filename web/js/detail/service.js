const stickyHeader = document.getElementById('stickyHeader');
const stickyHeaderHeight = stickyHeader.offsetHeight;
const pageContent = document.querySelector('.page-content');
const pageFix = document.querySelector('.page-fix-box');
const pageHead = document.querySelector('.page-head');
const pageHeadHeight = pageHead.offsetHeight;
const footer = document.getElementsByTagName('footer')[0];
const footerHeight = footer.offsetHeight;
const articleContent = document.querySelector('.article-content')
// 博客文章详情页面交互功能
document.addEventListener('DOMContentLoaded', function () {
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

// 滚动监听事件
const handleScroll = debounce(function () {
    updateStickyHeader();
}, 16);

window.addEventListener('scroll', updateStickyHeader, { passive: true });

// 页面加载时调整位置
document.addEventListener('DOMContentLoaded', adjustFilterPosition);

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

// 更新sticky header状态
function updateStickyHeader() {
    if (!stickyHeader) return;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > pageHeadHeight) {
        stickyHeader.classList.add('is-sticky');
    } else {
        stickyHeader.classList.remove('is-sticky');
    }
    adjustFilterPosition();
}
updateStickyHeader();

// 动态调整过滤器位置
function adjustFilterPosition() {
    const body = document.getElementsByTagName('body')[0];
    const headIsSticky = stickyHeader.classList.contains('is-sticky');
    if (!pageFix) return;
    if (body.offsetWidth < 768) {
        const pageFixVisble = pageFix.dataset.visible;
        if (!pageFixVisble) {
            return;
        }
        if (headIsSticky) {
            Object.assign(pageFix.style, {
                position: 'fixed',
                left: 16 + 'px',
                top: stickyHeaderHeight + 20 + 'px',
                maxHeight: `calc(100vh - ${stickyHeaderHeight + 40}px)`
            });
            return;
        }
        Object.assign(pageFix.style, {
            position: 'relative',
            left: 0,
            top: 20 + 'px',
            maxHeight: `calc(100vh - ${stickyHeaderHeight + pageHeadHeight + 40}px)`
        });
        return;
    };
    pageFix.classList.toggle('is-sticky', headIsSticky);
    // 计算页面头部所有固定元素的总高度
    let totalHeight = stickyHeaderHeight;
    if (pageHead && !headIsSticky) {
        totalHeight += pageHeadHeight;
    }
    // 设置过滤器的位置和高度
    if (!headIsSticky) {
        // 非sticky状态：相对于page-content定位
        Object.assign(pageFix.style, {
            top: '20px',
            maxHeight: `calc(100vh - ${totalHeight + 40}px)` // 添加max-height
        });
    } else {
        let top = totalHeight + 20
        let menuContainerScrollTop = articleContent.scrollHeight - document.documentElement.scrollTop - pageFix.clientHeight + pageHeadHeight
        if (menuContainerScrollTop < 0) {
            top = totalHeight + menuContainerScrollTop
        }
        // sticky状态：固定定位
        Object.assign(pageFix.style, {
            top: top + 'px',
            maxHeight: `calc(100vh - ${totalHeight + 40}px)` // 添加max-height
        });
    }
}


function LinkRef(linkId, sectionId) {
    this.pageIndexs = document.querySelectorAll('.' + linkId);
    this.sections = document.querySelectorAll('.' + sectionId);
    this.stickyHeader = document.getElementById('stickyHeader');
    this.setup();
}

// 滚动监听事件
LinkRef.prototype.handleScroll = function () {
    if (this.isScrolling) return;

    this.updateActiveLink();
}

LinkRef.prototype.setup = function () {
    this.isScrolling = false;
    this.scrollTimeout = null;
    // 初始化 - 设置第一个链接为激活状态
    if (this.pageIndexs.length > 0) {
        this.pageIndexs[0].classList.add('active');
    }
    // 点击导航链接事件
    this.pageIndexs.forEach((item) => {
        item.addEventListener("click", (e) => {
            e.stopPropagation();
            const value = e.currentTarget.id;
            this.scrollToSection(value);
        });
    });
    // 修正滚动事件监听器的绑定问题
    window.addEventListener('scroll', this.handleScroll.bind(this), { passive: true });

    // 初始化时更新一次状态
    this.updateActiveLink();

    // 监听窗口大小变化，重新计算位置
    window.addEventListener('resize', () => {
        if (!this.isScrolling) {
            this.updateActiveLink();
        }
    });
}

// 更新激活的导航链接
LinkRef.prototype.updateActiveLink = function () {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const headerHeight = (this.stickyHeader) ? this.stickyHeader.offsetHeight : 0;
    const offset = headerHeight; // 额外偏移量
    let activeSection = null;
    let closestDistance = Infinity;
    this.sections.forEach(section => {
        if (activeSection) { return }
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        const distance = Math.abs(scrollTop + offset - sectionTop);
        // 检查当前section是否在可视区域内
        if (scrollTop + offset >= sectionTop - 20 && scrollTop + offset < sectionBottom) {
            if (distance < closestDistance) {
                closestDistance = distance;
                activeSection = section;
            }
        }
    });
    // 如果没有找到活跃的section，使用最接近顶部的section
    if (!activeSection) {
        this.sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollTop + offset >= sectionTop - 20) {
                activeSection = section;
            }
        });
    }

    // 如果还是没有找到，使用第一个section
    if (!activeSection && this.sections.length > 0 || scrollTop == 0) {
        activeSection = this.sections[0];
    }

    if (activeSection) {
        const sectionId = activeSection.id;
        this.updateNavigation(sectionId);
    }
}

// 更新导航高亮
LinkRef.prototype.updateNavigation = function (activeSectionId) {
    this.pageIndexs.forEach(function (item) {
        if (item.id === activeSectionId) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

// 滚动到指定section
LinkRef.prototype.scrollToSection = function (sectionId) {
    let targetSection = null;
    this.sections.forEach(brandItem => {
        if (brandItem.id === sectionId) {
            targetSection = brandItem;
        }
    });
    if (!targetSection) return;
    const headerHeight = (this.stickyHeader) ? this.stickyHeader.offsetHeight : 0;
    const targetTop = targetSection.offsetTop + headerHeight;

    this.isScrolling = true;

    // 先更新导航状态
    this.updateNavigation(sectionId);
    window.scrollTo({
        top: targetTop,
        behavior: 'smooth'
    });

    // 平滑滚动完成后重置标志
    this.scrollTimeout && clearTimeout(this.scrollTimeout);
    this.scrollTimeout = setTimeout(() => {
        this.isScrolling = false;
    }, 1000);
}