const stickyHeader = document.getElementById('stickyHeader');
const stickyHeaderHeight = stickyHeader.offsetHeight;
const filterContainer = document.querySelector('.filter-container');
// filterContainer.style.top = `${stickyHeaderHeight}px`;
const pageHead = document.querySelector('.page-head');
const pageHeadHeight = pageHead.offsetHeight;
const footer = document.getElementsByTagName('footer');
const footerHeight = footer.offsetHeight;
// 滚动监听事件
const handleScroll = debounce(function () {
    updateStickyHeader();
}, 10);

window.addEventListener('scroll', handleScroll, { passive: true });

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
}
updateStickyHeader();