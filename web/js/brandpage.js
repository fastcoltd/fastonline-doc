document.addEventListener("DOMContentLoaded", function () {
    const pageHeader = document.querySelector('.page-header');
    const pageHeaderHeight = pageHeader.offsetHeight;
    document.documentElement.style.setProperty('--page-header-height', `${pageHeaderHeight}px`);
    const brandPageIndexs = document.querySelectorAll(".brand-page-index-box-item");
    const brandList = document.querySelectorAll('.brand-page-list');
    const brandListContainer = document.querySelector('.brand-page-list-container');
    brandPageIndexs.forEach(function (item) {
        item.addEventListener("click", function (e) {
            const text = e.currentTarget.textContent;
            scrollToGroup(text);
        });
    });
    let isScrolling = false;
    let scrollTimer = null;
    brandListContainer.addEventListener('scroll', function () {
        if (isScrolling) return;
        scrollTimer && clearTimeout(scrollTimer);
        scrollTimer = setTimeout(scrollWithBrand, 100);
    });

    function scrollWithBrand() {
        const scrollTop = brandListContainer.scrollTop;
        const brandListRect = brandListContainer.getBoundingClientRect();
        let brand = null;
        let minDistance = Infinity;

        // 找到当前最接近顶部的分组
        brandList.forEach(brandItem => {
            const brandRect = brandItem.getBoundingClientRect();
            const relativeTop = brandRect.top - brandListRect.top;

            // 如果分组在可视区域内或刚好超出顶部一点
            if (relativeTop <= 100 && relativeTop > -brandItem.offsetHeight) {
                const distance = Math.abs(relativeTop);
                if (distance < minDistance) {
                    minDistance = distance;
                    brand = brandItem;
                }
            }
        });

        // 如果没有找到，使用第一个完全可见的分组
        if (!brand) {
            brandList.forEach(brandItem => {
                const brandRect = brandItem.getBoundingClientRect();
                const relativeTop = brandRect.top - brandListRect.top;

                if (relativeTop >= 0 && relativeTop <= brandListRect.height) {
                    if (!brand) {
                        brand = brandItem;
                    }
                }
            });
        }

        if (brand) {
            console.log('当前滚动位置:', scrollTop); // 调试信息
            console.log(brand);
            const letter = brand.id;
            console.log('高亮索引:', letter); // 调试信息

            // 更新索引高亮
            selectIndex(letter);
        }
    }

    function selectIndex(letter) {
        brandPageIndexs.forEach(function (item) {
            const text = item.textContent;
            if (text === letter) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }

    function scrollToGroup(letter) {
        selectIndex(letter);
        const target = document.getElementById(letter);
        if (!target) return;
        brandListContainer.scrollTo({
            top: target.offsetTop,
            behavior: 'smooth'
        });
        isScrolling = true;
        setTimeout(() => {
            isScrolling = false;
        }, 1000);
    }
});