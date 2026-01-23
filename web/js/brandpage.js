

window.addEventListener('DOMContentLoaded', function () {
    const link = new LinkRef('brand-page-index-box-item', 'brand-page-list');
    $('.brand-page-index-box page-fix-box').on('click', function (e) {
        alert($(e.target).text())
    })
})