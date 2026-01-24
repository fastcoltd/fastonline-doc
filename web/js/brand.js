$(document).ready(function () {
    const link = new LinkRef('page-link', 'brand-section');
    const headDetailBox = document.querySelector('.page-header-desc-right-detail-box');
    const text = headDetailBox.querySelector('.page-header-desc-right-detail-text');
    const button = headDetailBox.querySelector('.page-header-desc-right-detail-toggle-btn');
    button.addEventListener('click', function () {
        const isToggle = text.classList.contains('is-toggle');
        if (isToggle) {
            text.classList.remove('is-toggle');
            button.innerHTML = 'Show Detail';
        } else {
            text.classList.add('is-toggle');
            button.innerHTML = 'Show Less';
        }
    })
    $('.faq-header-arrow-icon').on('click', e => {
        $(e.target).toggleClass('open')
        $(e.target).parents('.faq-item').find('.faq-content').toggle(100)
    })
})