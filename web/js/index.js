

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
    // brandContent.addEventListener('wheel', { passive: window.innerWidth <= 750 });
    // brandContent.addEventListener('touchmove', { passive: window.innerWidth <= 750 });
    let brandScrollOffsetX = brandContent.scrollLeft
    const BRAND_SCROLL_EPSILON = 1;

    function getBrandMaxScrollOffsetX() {
        return Math.max(0, brandContent.scrollWidth - brandContent.clientWidth);
    }

    function getBrandScrollStep() {
        return ($('.brand-item').width() || 0) * 2;
    }

    brandRightMore.addEventListener('click', function (event) {
        event.preventDefault();
        event.stopPropagation();
        const maxBrandScrollOffsetX = getBrandMaxScrollOffsetX();
        brandScrollOffsetX += getBrandScrollStep();
        if (brandScrollOffsetX > maxBrandScrollOffsetX) {
            brandScrollOffsetX = maxBrandScrollOffsetX
        }
        brandContent.scrollLeft = brandScrollOffsetX;
        requestAnimationFrame(() => {
            brandScroll();
        });
    })
    brandLeftMore.addEventListener('click', function (event) {
        event.preventDefault();
        event.stopPropagation();
        brandScrollOffsetX -= getBrandScrollStep();
        if (brandScrollOffsetX < 0) {
            brandScrollOffsetX = 0
        }
        brandContent.scrollLeft = brandScrollOffsetX;
        requestAnimationFrame(() => {
            brandScroll();
        });
    })

    function brandScroll() {
        const isMobile = window.innerWidth <= 768;
        const maxBrandScrollOffsetX = getBrandMaxScrollOffsetX();
        const offsetX = brandContent.scrollLeft;
        const canScrollHorizontal = maxBrandScrollOffsetX > BRAND_SCROLL_EPSILON;

        if (isMobile || !canScrollHorizontal) {
            brandLeftMore.style.display = 'none';
            brandRightMore.style.display = 'none';
            return;
        }

        brandLeftMore.style.display = offsetX <= BRAND_SCROLL_EPSILON ? 'none' : 'block';
        brandRightMore.style.display = offsetX >= maxBrandScrollOffsetX - BRAND_SCROLL_EPSILON ? 'none' : 'block';
    }

    brandContent.addEventListener('scroll', brandScroll, { passive: true });
    window.addEventListener('resize', brandScroll);
    brandScroll()
})
