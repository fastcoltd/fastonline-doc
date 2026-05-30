

window.addEventListener('DOMContentLoaded', function () {
    const isMobile = window.innerWidth <= 768;
    const banner = new Carousel('banner', 5);
    const bestItems = new Carousel('best-items', 11);
    const bestStore = new Carousel('best-store', 23);
    const hotCompaign = new Carousel('hot-compaigns', 47);
    if (!isMobile) {
        new Carousel('popuar-demands', 97);
    }
    const hotPosts = new Carousel('hot-posts', 197);
    const popularDemandsMobile = document.getElementById('popuar-demands-mobile');
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

    function setBrandArrowDisabled(ele, disabled) {
        ele.classList.toggle('brand-arrow-disabled', disabled);
        ele.setAttribute('aria-disabled', disabled ? 'true' : 'false');
    }

    brandRightMore.addEventListener('click', function (event) {
        if (brandRightMore.classList.contains('brand-arrow-disabled')) {
            return;
        }
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
        if (brandLeftMore.classList.contains('brand-arrow-disabled')) {
            return;
        }
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

        if (isMobile) {
            brandLeftMore.style.display = 'none';
            brandRightMore.style.display = 'none';
            return;
        }

        brandLeftMore.style.display = 'block';
        brandRightMore.style.display = 'block';

        if (!canScrollHorizontal) {
            setBrandArrowDisabled(brandLeftMore, true);
            setBrandArrowDisabled(brandRightMore, true);
            return;
        }

        setBrandArrowDisabled(brandLeftMore, offsetX <= BRAND_SCROLL_EPSILON);
        setBrandArrowDisabled(brandRightMore, offsetX >= maxBrandScrollOffsetX - BRAND_SCROLL_EPSILON);
    }

    brandContent.addEventListener('scroll', brandScroll, { passive: true });
    window.addEventListener('resize', brandScroll);
    brandScroll()

    if (isMobile && popularDemandsMobile) {
        let mouseDown = false;
        let mouseStartX = 0;
        let scrollStartX = 0;

        popularDemandsMobile.addEventListener('mousedown', function (event) {
            mouseDown = true;
            mouseStartX = event.clientX;
            scrollStartX = popularDemandsMobile.scrollLeft;
            popularDemandsMobile.classList.add('is-dragging');
            event.preventDefault();
        });

        popularDemandsMobile.addEventListener('mousemove', function (event) {
            if (!mouseDown) return;
            const deltaX = event.clientX - mouseStartX;
            popularDemandsMobile.scrollLeft = scrollStartX - deltaX;
            event.preventDefault();
        });

        function stopDrag() {
            mouseDown = false;
            popularDemandsMobile.classList.remove('is-dragging');
        }

        popularDemandsMobile.addEventListener('mouseleave', stopDrag);
        popularDemandsMobile.addEventListener('mouseup', stopDrag);
    }
})
