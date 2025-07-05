const stickyHeader = document.getElementById('stickyHeader');
const stickyHeaderHeight = stickyHeader.offsetHeight;
const pageContent = document.querySelector('.page-content');
const filterContainer = document.querySelector('.filter-container');
const pageHead = document.querySelector('.page-head');
const pageHeadHeight = pageHead.offsetHeight;
const footer = document.getElementsByTagName('footer');
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
        filterContainer.classList.toggle('is-sticky', true);
    } else {
        stickyHeader.classList.remove('is-sticky');
        filterContainer.classList.toggle('is-sticky', false);
    }
    adjustFilterPosition();
}
updateStickyHeader();

// 动态调整过滤器位置
function adjustFilterPosition() {

    if (!filterContainer) return;
    const headIsSticky = stickyHeader.classList.contains('is-sticky');
    const pageContent = document.querySelector('.page-content');
    const pageContentHeight = pageContent.offsetTop;
    // 计算页面头部所有固定元素的总高度
    let totalHeight = stickyHeaderHeight;
    if (pageHead && !headIsSticky) {
        totalHeight += pageHeadHeight;
    }
    // 设置过滤器的top位置
    if (!headIsSticky) {
        Object.assign(filterContainer.style, {
            top: 0,
            height: `calc(100vh - ${totalHeight + footerHeight}px)`
        });
        return;
    }
    Object.assign(filterContainer.style, {
        top: totalHeight + 'px',
        height: `calc(100vh - ${totalHeight + footerHeight}px)`
    });
}