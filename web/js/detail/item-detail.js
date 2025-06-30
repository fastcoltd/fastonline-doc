const sort = new SortSelector();
function sortItems(value) {
    console.log('sort items', value);
}
document.addEventListener("DOMContentLoaded", function () {
    const similar = new Carousel('best-items', 20);
    const body = document.getElementsByTagName('body')[0];
    const screenshot = document.querySelector('.item-detail-screenshot');
    const screenshotContent = screenshot.querySelector('.item-detail-screenshot-content');
    const screenshotRightMore = screenshot.querySelector('.item-detail-screenshot-right-box');
    const screenshotLeftMore = screenshot.querySelector('.item-detail-screenshot-left-box');
    const isMobile = body.offsetWidth <= 768;
    // screenshotContent.addEventListener('wheel', { passive: window.innerWidth <= 750 });
    // screenshotContent.addEventListener('touchmove', { passive: window.innerWidth <= 750 });
    let screenshotScrollOffsetX = 0
    const screenshotContentScroll = screenshotContent.scrollWidth > screenshotContent.clientWidth;
    screenshotLeftMore.style.display = (screenshotContentScroll && !isMobile) ? 'flex' : 'none';
    screenshotRightMore.style.display = (screenshotContentScroll && !isMobile) ? 'flex' : 'none';
    screenshotScroll();
    screenshotRightMore.addEventListener('click', function (event) {
        event.preventDefault();
        event.stopPropagation();
        screenshotScrollOffsetX += 260;
        screenshotContent.scrollLeft = screenshotScrollOffsetX;
        screenshotScroll();
    })
    screenshotLeftMore.addEventListener('click', function (event) {
        event.preventDefault();
        event.stopPropagation();
        screenshotScrollOffsetX -= 260;
        screenshotContent.scrollLeft = screenshotScrollOffsetX;
        screenshotScroll();
    })

    function screenshotScroll() {
        if (isMobile) { return }
        const width = screenshotContent.clientWidth;
        const offsetX = screenshotContent.scrollLeft;
        const scrollWidth = screenshotContent.scrollWidth;
        if (offsetX + width >= scrollWidth) {
            screenshotRightMore.classList.toggle('active', false);
        } else {
            screenshotRightMore.classList.toggle('active', true);
        }
        if (offsetX > 0) {
            screenshotLeftMore.classList.toggle('active', true);
        } else {
            screenshotLeftMore.classList.toggle('active', false);
        }
    }

    const rules = document.querySelectorAll('.item-detail-rules-box');
    rules.forEach(element => {
        const content = element.querySelector('.item-detail-rules-content');
        const moreButton = element.querySelector('.item-detail-rules-more-button');
        moreButton.addEventListener('click', function (event) {
            event.preventDefault();
            event.stopPropagation();
            content.classList.toggle('toggle', true);
            moreButton.style.display = 'none';
        })
    });

    const faqs = document.querySelectorAll('.item-detail-faq-box');
    faqs.forEach(element => {
        const content = element.querySelector('.item-detail-faq-content');
        const title = element.querySelector('.item-detail-faq-title-box');
        const arrow = title.querySelector('.item-detail-faq-title-arrow');
        title.addEventListener('click', function (event) {
            event.preventDefault();
            event.stopPropagation();
            if (content.style.display === 'none') {
                title.classList.toggle('toggle', true);
                content.style.display = 'inline-block';
                arrow.style.transform = 'rotate(180deg)';
            } else {
                title.classList.toggle('toggle', false);
                content.style.display = 'none';
                arrow.style.transform = 'rotate(0deg)';
            }
        })
    });

    const reviews = document.querySelectorAll('.item-detail-review-item');
    reviews.forEach(element => {
        const reviewer = element.querySelector('.item-detail-reiviewer-box');
        const user = reviewer.querySelector('.item-detail-reviewer-user-box')
        const arrow = user.querySelector('.item-detail-reviewer-arrow');
        const content = reviewer.querySelector('.item-detail-reviewer-content');
        user.addEventListener('click', function (event) {
            event.preventDefault();
            event.stopPropagation();
            if (content.style.display === 'none') {
                content.style.display = 'inline-block';
                arrow.style.transform = 'rotate(180deg)';
            } else {
                content.style.display = 'none';
                arrow.style.transform = 'rotate(0deg)';
            }
        });
    });
});