

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
    let brandScrollOffsetX = 0
    const brandContentScroll = brandContent.scrollWidth > brandContent.clientWidth;
    brandRightMore.style.display = (brandContentScroll && !isMobile) ? 'block' : 'none';
    brandRightMore.addEventListener('click', function (event) {
        event.preventDefault();
        event.stopPropagation();
        brandScrollOffsetX += 336;
        brandContent.scrollLeft = brandScrollOffsetX;
        brandScroll();
    })
    brandLeftMore.addEventListener('click', function (event) {
        event.preventDefault();
        event.stopPropagation();
        brandScrollOffsetX -= 336;
        brandContent.scrollLeft = brandScrollOffsetX;
        brandScroll();
    })

    function brandScroll() {
        if (isMobile) { return }
        const width = brandContent.clientWidth;
        const offsetX = brandContent.scrollLeft;
        const scrollWidth = brandContent.scrollWidth;
        if (offsetX + width >= scrollWidth) {
            brandRightMore.style.display = 'none';
        } else {
            brandRightMore.style.display = 'block';
        }
        if (offsetX > 0) {
            brandLeftMore.style.display = 'block';
        } else {
            brandLeftMore.style.display = 'none';
        }
    }
})