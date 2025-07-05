const stickyHeader = document.getElementById('stickyHeader');
const stickyHeaderHeight = stickyHeader.offsetHeight;
const pageContent = document.querySelector('.page-content');
const pageFix = document.querySelector('.page-fix-box');
const pageHead = document.querySelector('.page-head');
const pageHeadHeight = pageHead.offsetHeight;
const footer = document.getElementsByTagName('footer')[0];
const footerHeight = footer.offsetHeight;
// 滚动监听事件
const handleScroll = debounce(function () {
    updateStickyHeader();
}, 10);

window.addEventListener('scroll', handleScroll, { passive: true });

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
        pageFix.classList.toggle('is-sticky', true);
    } else {
        stickyHeader.classList.remove('is-sticky');
        pageFix.classList.toggle('is-sticky', false);
    }
    adjustFilterPosition();
}
updateStickyHeader();

// 动态调整过滤器位置
function adjustFilterPosition() {
    const body = document.getElementsByTagName('body')[0];
    if (body.offsetWidth < 768) return;
    if (!pageFix) return;
    const headIsSticky = stickyHeader.classList.contains('is-sticky');
    // 计算页面头部所有固定元素的总高度
    let totalHeight = stickyHeaderHeight;
    if (pageHead && !headIsSticky) {
        totalHeight += pageHeadHeight;
    }
    // 设置过滤器的位置和高度
    if (!headIsSticky) {
        // 非sticky状态：相对于page-content定位
        Object.assign(pageFix.style, {
            top: '0px',
            maxHeight: `calc(100vh - ${totalHeight}px)` // 添加max-height
        });
    } else {
        // sticky状态：固定定位
        Object.assign(pageFix.style, {
            top: totalHeight + 'px',
            maxHeight: `calc(100vh - ${totalHeight + footerHeight}px)` // 添加max-height
        });
    }
}