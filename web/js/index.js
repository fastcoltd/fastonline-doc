

window.addEventListener('DOMContentLoaded', function () {
    const banner = new Carousel('banner', 5);
    const bestItems = new Carousel('best-items', 11);
    const bestStore = new Carousel('best-store', 23);
    const hotCompaign = new Carousel('hot-compaigns', 47);
    const popuarDemands = new Carousel('popuar-demands', 97);
    const hotPosts = new Carousel('hot-posts', 197);
    const brand = document.querySelector('.brand');
    const brandContent = brand.querySelector('.brand-content');
    const brandRightMore = brand.querySelector('.brand-right-box');
    const brandLeftMore = brand.querySelector('.brand-left-box');
    const body = this.document.getElementsByTagName('body')[0];
    const isMobile = body.offsetWidth <= 768;
    // brandContent.addEventListener('wheel', { passive: window.innerWidth <= 750 });
    // brandContent.addEventListener('touchmove', { passive: window.innerWidth <= 750 });
    let brandScrollOffsetX = brandContent.scrollLeft
    let maxBrandScrollOffsetX = brandContent.scrollWidth - brandContent.clientWidth
    brandRightMore.addEventListener('click', function (event) {
        event.preventDefault();
        event.stopPropagation();
        brandScrollOffsetX += 100;
        if (brandScrollOffsetX > maxBrandScrollOffsetX) {
            brandScrollOffsetX = maxBrandScrollOffsetX
        }
        brandContent.scrollLeft = brandScrollOffsetX;
        brandScroll();
    })
    brandLeftMore.addEventListener('click', function (event) {
        event.preventDefault();
        event.stopPropagation();
        brandScrollOffsetX -= 100;
        if (brandScrollOffsetX < 0) {
            brandScrollOffsetX = 0
        }
        brandContent.scrollLeft = brandScrollOffsetX;
        brandScroll();
    })

    function brandScroll() {
        if (isMobile) { return }
        const width = brandContent.clientWidth;
        const offsetX = brandContent.scrollLeft;
        let maxBrandScrollOffsetX = brandContent.scrollWidth - brandContent.clientWidth
        const scrollWidth = brandContent.scrollWidth;

        if (offsetX >= maxBrandScrollOffsetX) {
            brandRightMore.style.cursor = 'not-allowed';
            brandRightMore.style.opacity = '0.3';
        } else {
            brandRightMore.style.cursor = 'pointer';
            brandRightMore.style.opacity = '1';
        }
        if (offsetX <= 0) {
            brandLeftMore.style.cursor = 'not-allowed';
            brandLeftMore.style.opacity = '0.3';
        } else {
            brandLeftMore.style.cursor = 'pointer';
            brandLeftMore.style.opacity = '1';
        }
    }
    brandScroll()
})