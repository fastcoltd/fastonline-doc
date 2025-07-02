document.addEventListener("DOMContentLoaded", function () {
    updateHeaderHeight();
    new LinkRef('brand-page-index-box-item', 'brand-page-list', true, 'brand-all-page');
    window.addEventListener('resize', function () {
        updateHeaderHeight();
    })
});

function updateHeaderHeight() {
    const stickyHeader = document.getElementById('stickyHeader');
    const pageHeaderHeight = stickyHeader ? stickyHeader.offsetHeight : 0;
    document.documentElement.style.setProperty('--page-header-height', `${pageHeaderHeight}px`);
}