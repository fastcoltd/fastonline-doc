$(document).ready(function () {
    const link = new LinkRef('page-link', 'brand-section');
    const headDetailBox = document.querySelector('.page-header-desc-right-detail-box');
    if (headDetailBox) {
        const text = headDetailBox.querySelector('[data-brand-detail-role="text"]');
        const button = headDetailBox.querySelector('[data-brand-detail-role="toggle"]');
        if (text && button) {
            const syncToggleVisibility = () => {
                const isExpanded = text.classList.contains('is-toggle');
                if (isExpanded) {
                    text.classList.remove('is-toggle');
                }
                const needToggle = text.scrollWidth > text.clientWidth + 1;
                if (needToggle) {
                    button.style.display = 'inline-block';
                    if (isExpanded) {
                        text.classList.add('is-toggle');
                        button.textContent = 'Show Less';
                    } else {
                        button.textContent = 'Show More';
                    }
                } else {
                    text.classList.remove('is-toggle');
                    button.style.display = 'none';
                    button.textContent = 'Show More';
                }
            };

            text.classList.remove('is-toggle');
            button.textContent = 'Show More';
            button.addEventListener('click', function () {
                const isToggle = text.classList.contains('is-toggle');
                if (isToggle) {
                    text.classList.remove('is-toggle');
                    button.textContent = 'Show More';
                } else {
                    text.classList.add('is-toggle');
                    button.textContent = 'Show Less';
                }
            });
            syncToggleVisibility();
            window.addEventListener('resize', syncToggleVisibility);
            if (document.fonts && document.fonts.ready) {
                document.fonts.ready.then(syncToggleVisibility);
            }
        }
    }
    $('.faq-header-middle-box > div').on('click', function () {
        var $item = $(this).parents('.faq-item');
        $item.find('.faq-header > img').toggleClass('open');
        $item.find('.faq-content').toggle(100);
        $item.toggleClass('brand-faq-item-expanded');
    })
    $('.faq-header > img').on('click', e => {
        var $item = $(e.target).parents('.faq-item');
        $(e.target).toggleClass('open');
        $item.find('.faq-content').toggle(100);
        $item.toggleClass('brand-faq-item-expanded');
    })
    $('.faq-item .resource-action-like > img, .icon-is-dianzan').on('click', function () {
        $(this).parent('.resource-action-group').toggleClass('has-activate')
    })
    $('.faq-item .resource-action-unlike > img, .icon-not-dianzan').on('click', function () {
        $(this).parent('.resource-action-group').toggleClass('has-activate')
    })
})
