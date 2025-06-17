const brand = document.getElementsByClassName('brand')[0];
const brandContent = document.getElementsByClassName('brand-content')[0];
const brandRightMore = document.getElementsByClassName('brand-right-box')[0];
const brandLeftMore = document.getElementsByClassName('brand-left-box')[0];
brandContent.addEventListener('wheel', { passive: window.innerWidth <= 750 });
brandContent.addEventListener('touchmove', { passive: window.innerWidth <= 750 });
const brandItems = brandContent.querySelectorAll('.brand-item');
brandItems.forEach(item => {
    item.addEventListener('click', function (event) {
        event.preventDefault();
        event.stopPropagation();
        if (event.target == event.currentTarget) {
            
        }
    });
});
let brandScrollOffsetX = 0
const brandContentScroll = brandContent.scrollWidth > brandContent.clientWidth;
brandRightMore.style.display = brandContentScroll ? 'block' : 'none';
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