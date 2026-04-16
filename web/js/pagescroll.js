const stickyHeader = document.getElementById('stickyHeader');
const stickyHeaderHeight = stickyHeader.offsetHeight;
const pageContent = document.querySelector('.page-content');
const pageFix = document.querySelector('.page-fix-box');
const pageHead = document.querySelector('.page-head');
const pageHeadHeight = pageHead.offsetHeight;
const footer = document.getElementsByTagName('footer')[0];
const footerHeight = footer.offsetHeight;
const listContainer = document.querySelector('.list-container-page-scoll')
const isBrandPageIndexBox = pageFix && pageFix.classList.contains('brand-page-index-box');

window.addEventListener('scroll', updateStickyHeader, { passive: true });
window.addEventListener('resize', adjustFilterPosition);

// 页面加载时调整位置
document.addEventListener('DOMContentLoaded', adjustFilterPosition);

// 更新sticky header状态
function updateStickyHeader() {
    if (!stickyHeader) return;
    const stickyTop = stickyHeader.getBoundingClientRect().top;
    const isHeaderReachedTop = stickyTop <= 0;
    if (isHeaderReachedTop) {
        stickyHeader.classList.add('is-sticky');
    } else {
        stickyHeader.classList.remove('is-sticky');
    }
    adjustFilterPosition();
}
updateStickyHeader();

function syncStickyHorizontalPosition(headIsSticky) {
    if (!pageFix) return;
    if (!headIsSticky || !pageContent) {
        pageFix.style.left = '';
        pageFix.style.transform = '';
        return;
    }
    const pageContentRect = pageContent.getBoundingClientRect();
    pageFix.style.left = `${pageContentRect.left}px`;
    pageFix.style.transform = 'none';
}

// 动态调整过滤器位置
function adjustFilterPosition() {
    const body = document.getElementsByTagName('body')[0];
    const headIsSticky = stickyHeader.classList.contains('is-sticky');
    if (!pageFix) return;
    if (isBrandPageIndexBox) {
        const headerElement = document.querySelector('.page-head header');
        const topMenuElement = document.querySelector('.page-head .top-menu-container');
        const footerElement = document.querySelector('footer.common-footer-wrapper') || footer;
        const headerHeightCurrent = headerElement ? headerElement.offsetHeight : 0;
        const topMenuHeightCurrent = topMenuElement ? topMenuElement.offsetHeight : 0;
        const footerHeightCurrent = footerElement ? footerElement.offsetHeight : 0;
        const pageContentRect = pageContent ? pageContent.getBoundingClientRect() : null;
        const baseTop = headerHeightCurrent + topMenuHeightCurrent;
        const contentTop = pageContentRect ? pageContentRect.top : baseTop;
        const fixedTop = Math.max(baseTop, contentTop);
        const anchorHeight = Math.max(window.innerHeight - fixedTop - footerHeightCurrent, 0);
        Object.assign(pageFix.style, {
            position: 'fixed',
            left: pageContentRect ? `${pageContentRect.left}px` : '',
            transform: 'none',
            top: `${fixedTop}px`,
            height: `${anchorHeight}px`,
            maxHeight: `${anchorHeight}px`,
            overflowY: 'visible'
        });
        return;
    }
    if (body.offsetWidth < 768) {
        const pageFixVisble = pageFix.dataset.visible;
        if (!pageFixVisble) {
            return;
        }
        if (headIsSticky) {
            const pageFixHeight = `calc(100vh - ${stickyHeaderHeight + 40}px)`;
            Object.assign(pageFix.style, {
                position: 'fixed',
                left: 16 + 'px',
                transform: 'none',
                top: stickyHeaderHeight + 20 + 'px',
                maxHeight: pageFixHeight,
                height: isBrandPageIndexBox ? pageFixHeight : ''
            });
            return;
        }
        const pageFixHeight = `calc(100vh - ${stickyHeaderHeight + pageHeadHeight + 40}px)`;
        Object.assign(pageFix.style, {
            position: 'relative',
            left: '',
            transform: '',
            top: 20 + 'px',
            maxHeight: pageFixHeight,
            height: isBrandPageIndexBox ? pageFixHeight : ''
        });
        return;
    };
    pageFix.classList.toggle('is-sticky', headIsSticky);
    syncStickyHorizontalPosition(headIsSticky);
    // 计算页面头部所有固定元素的总高度
    let totalHeight = stickyHeaderHeight;
    if (pageHead && !headIsSticky) {
        totalHeight += pageHeadHeight;
    }
    // 设置过滤器的位置和高度
    if (!headIsSticky) {
        const pageFixHeight = `calc(100vh - ${totalHeight + 40}px)`;
        // 非sticky状态：相对于page-content定位
        Object.assign(pageFix.style, {
            top: '20px',
            maxHeight: pageFixHeight, // 添加max-height
            height: isBrandPageIndexBox ? pageFixHeight : ''
        });
    } else {
        let top = totalHeight + 20
        let menuContainerScrollTop = listContainer.scrollHeight - document.documentElement.scrollTop - pageFix.clientHeight + pageHeadHeight
        if (menuContainerScrollTop < 0) {
            top = totalHeight + menuContainerScrollTop
        }
        const pageFixHeight = `calc(100vh - ${totalHeight + 40}px)`;
        // sticky状态：固定定位
        Object.assign(pageFix.style, {
            top: top + 'px',
            maxHeight: pageFixHeight, // 添加max-height
            height: isBrandPageIndexBox ? pageFixHeight : ''
        });
    }
}
