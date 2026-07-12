const stickyHeader = document.getElementById('stickyHeader');
const stickyHeaderHeight = stickyHeader.offsetHeight;
const pageContent = document.querySelector('.page-content');
const articleContent = document.querySelector('.article-content')
const pageFix = document.querySelector('.page-fix-box');
const pageHead = document.querySelector('.page-head');
const pageHeadHeight = pageHead.offsetHeight;
const footer = document.getElementsByTagName('footer')[0];
const footerHeight = footer.offsetHeight;
const listContainer = document.querySelector('.list-container')
const menuContainer = document.querySelector('.table-of-container');
const menuToggle = document.querySelector('.detail-page-menu');

const close = menuContainer ? menuContainer.querySelector('.table-of-container-close') : null;

function toggleMobileToc(visible) {
    if (!menuContainer) {
        return;
    }
    menuContainer.classList.toggle('is-open', visible);
    menuContainer.setAttribute('aria-hidden', visible ? 'false' : 'true');
    if (menuToggle) {
        menuToggle.setAttribute('aria-expanded', visible ? 'true' : 'false');
    }
}

function applyMobileBreadcrumbSpacing() {
    const isMobileViewport = window.matchMedia('(max-width: 768px)').matches;
    const bread = document.querySelector('.page-top-bread');
    if (!bread) {
        return;
    }
    if (!isMobileViewport) {
        bread.style.removeProperty('width');
        bread.style.removeProperty('margin-left');
        bread.style.removeProperty('transform');
        bread.style.removeProperty('padding');
        bread.style.removeProperty('box-sizing');
        return;
    }
    bread.style.width = '100%';
    bread.style.marginLeft = '0';
    bread.style.transform = 'none';
    bread.style.padding = '0';
    bread.style.boxSizing = 'border-box';
}

const sort = new SortSelector();
function sortItems(value) {
    console.log('sort items', value);
}

const list = new PageList();

// 加载商品数据
async function loadItems() {
    try {
        // 模拟API调用
        await new Promise(resolve => setTimeout(resolve, 1000));

        const items = generateMockItems();
        renderItems(items);

        // 模拟没有更多数据的情况
        if (Math.random() > 0.8) {
            list.showNoMore();
        }

    } catch (error) {
        console.error('加载商品失败:', error);
    } finally {
        /// 加载结束
        list.showLoading(false);
    }
}

function reloadItems() {
    console.log('reload items');
    const container = document.querySelector('.post-detail-review-list');
    container.innerHTML = '';
    loadItems();
}

function sortItems(value) {
    console.log('sort items', value);
}

// 生成模拟商品数据
function generateMockItems() {
    const brands = ['Google', 'Apple', 'Microsoft', 'Amazon', 'Meta', 'Netflix'];
    const services = ['云服务', 'SEO服务', '社交媒体', '内容创作', '交易平台', '游戏服务'];
    const categories = ['科技产品', '服装鞋履', '家居用品', '数码配件', '美妆护肤', '运动户外'];
    const marks = ['Hot', 'New', '推荐', '热销', '限时', '特价'];
    const markClasses = ['best-items-item-mark1', 'best-items-item-mark2', 'best-items-item-mark3', 'best-items-item-mark4', 'best-items-item-mark5', 'best-items-item-mark6'];

    const items = [];
    for (let i = 0; i < list.itemsPerPage; i++) {
        const price = (Math.random() * 1000 + 50).toFixed(2);
        const stock = Math.floor(Math.random() * 100) + 1;
        const rating = (Math.random() * 2 + 3).toFixed(1);
        const reviews = Math.floor(Math.random() * 500) + 10;
        const isLiked = Math.random() > 0.5;

        items.push({
            id: (list.currentPage - 1) * list.itemsPerPage + i + 1,
            title: `商品名称 ${(list.currentPage - 1) * list.itemsPerPage + i + 1}`,
            price: `$${price}`,
            stock: stock,
            rating: rating,
            reviews: reviews,
            brand: brands[Math.floor(Math.random() * brands.length)],
            service: services[Math.floor(Math.random() * services.length)],
            category: categories[Math.floor(Math.random() * categories.length)],
            mark: marks[Math.floor(Math.random() * marks.length)],
            markClass: markClasses[Math.floor(Math.random() * markClasses.length)],
            isLiked: isLiked,
            image: 'https://via.placeholder.com/300x200'
        });
    }
    return items;
}

// 渲染商品
function renderItems(items) {
    const container = document.querySelector('.post-detail-review-list');

    items.forEach(item => {
        const itemElement = createItemElement(item);
        container.appendChild(itemElement);
    });
}

// 创建商品元素 - 完全按照Figma设计
function createItemElement(item) {
    const div = document.createElement('div');
    div.className = 'post-detail-review-item';

    const ratingPercent = (parseFloat(item.rating) / 5 * 100).toFixed(0);

    div.innerHTML = `
           <div class="page-section">
                            <div class="flex-column post-detail-review-box">
                                <div class="flex-row post-detail-review-user-box">
                                    <img class="post-detail-review-user-avatar" src="image/detailpage/review-main-avatar.png" />
                                    <div class="flex-column post-detail-review-user-name-box">
                                        <span class="post-detail-review-user-name">Han Solo</span>
                                        <span class="post-detail-review-user-time">1 day ago</span>
                                    </div>
                                    <div class="flex-row post-detail-review-user-status-box">
                                        <img class="post-detail-review-user-status-icon"
                                            src="image/detailpage/repeat-client.png" />
                                        <span class="post-detail-review-user-status-text">Repeat client</span>
                                    </div>
                                </div>
                                <span class="post-detail-review-content">We supply a series of design principles,
                                    practical
                                    patterns and high quality design resources (Sketch and Axure), to help people create
                                    their
                                    produc and see more，We supply a series of design principles, practical patterns and
                                    high
                                    quality design resources (Sketch and Axure), to help people create their produc
                                </span>
                                <div class="item-star-box">
                                    <div class="star-bg">
                                        <div class="stars-outer">
                                            <div class="stars-inner" style="--star-fill: 100%;"></div>
                                        </div>
                                    </div>
                                    <p>5.0</p>
                                    <p>(200)</p>
                                </div>
                                <div class="flex-row post-detail-review-info-box">
                                    <div class="flex-column post-detail-review-info-item">
                                        <span class="post-detail-review-info-title">$666.6</span>
                                        <span class="post-detail-review-info-desc">Price</span>
                                    </div>
                                    <div class="post-detail-review-info-line"></div>
                                    <div class="flex-column post-detail-review-info-item">
                                        <span class="post-detail-review-info-title">333</span>
                                        <span class="post-detail-review-info-desc">Quantity</span>
                                    </div>
                                    <div class="post-detail-review-info-line"></div>
                                    <div class="flex-column post-detail-review-info-item icon">
                                        <img class="post-detail-review-info-icon" src="review图片" />
                                    </div>
                                </div>
                            </div>
                            <div class="post-detail-review-line"></div>
                            <div class="flex-column post-detail-reiviewer-box">
                                <div class="flex-row post-detail-reviewer-user-box">
                                    <img class="post-detail-reviewer-user-icon" src="image/detailpage/review-reply-avatar.png" />
                                    <span class="post-detail-reviewer-user-name">Erinasa</span>
                                    <div class="post-detail-reviewer-user-empty"></div>
                                    <img class="post-detail-reviewer-arrow" src="image/detailpage/arrow-down.png" />
                                </div>
                                <span class="post-detail-reviewer-content" style="display: none;">Incidunt velit eveniet
                                    sint.
                                    Tempore est et quaerat
                                    quia. Nam consequatur tenetur quia ut sed esse molestias. Nulla enim vel et porro
                                    quisquam.
                                    Et sapiente velit quam adipisci voluptates sed nisi veritatis facilis. Omnis sed
                                    dignissimos.</span>
                            </div>
                        </div>
                        <div class="flex-row post-detail-review-tool-box">
                            <span class="post-detail-review-tool-text">Helpful?</span>
                            <div class="flex-row post-detail-review-tool-item" id="review-like">
                                <img class="post-detail-review-tool-icon" src="image/like-count.png" />
                                <span class="post-detail-review-tool-text">Yes</span>
                            </div>
                            <div class="flex-row post-detail-review-tool-item" id="review-unlike">
                                <img class="post-detail-review-tool-icon" src="image/unlike-count.png" />
                                <span class="post-detail-review-tool-text">No</span>
                            </div>
                        </div>
         `;

    return div;
}

function bindReviewItemEvents(element) {
    if (!element) {
        return;
    }
    const reviewer = element.querySelector('.post-detail-reiviewer-box');
    if (!reviewer) {
        return;
    }
    const user = reviewer.querySelector('.post-detail-reviewer-user-box');
    const arrow = user ? user.querySelector('.post-detail-reviewer-arrow') : null;
    const content = reviewer.querySelector('.post-detail-reviewer-content');
    if (!user || !arrow || !content) {
        return;
    }
    if (user.dataset.boundReviewToggle === 'true') {
        return;
    }
    user.dataset.boundReviewToggle = 'true';
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
}

function initializeSelectableRatings() {
    const ratingBoxes = document.querySelectorAll('.item-star-box[data-rating-selectable="true"]');
    ratingBoxes.forEach(box => {
        const starBg = box.querySelector('.star-bg');
        const starsInner = box.querySelector('.stars-inner');
        const scoreText = box.querySelector(':scope > p:first-of-type');
        if (!starBg || !starsInner || !scoreText) {
            return;
        }

        const setRating = (rating) => {
            const normalizedRating = Math.max(0, Math.min(5, rating));
            const displayValue = normalizedRating % 1 === 0 ? String(normalizedRating) : normalizedRating.toFixed(1);
            box.dataset.ratingValue = displayValue;
            scoreText.textContent = displayValue;
            starsInner.style.setProperty('--star-fill', `${normalizedRating / 5 * 100}%`);
            starBg.setAttribute('aria-valuemin', '0');
            starBg.setAttribute('aria-valuemax', '5');
            starBg.setAttribute('aria-valuenow', displayValue);
        };

        const getRatingFromPointer = (event) => {
            const rect = starBg.getBoundingClientRect();
            if (!rect.width) {
                return 0;
            }
            const ratio = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
            return Math.ceil(ratio * 10) / 2;
        };

        setRating(parseFloat(box.dataset.ratingValue || scoreText.textContent || '0') || 0);

        starBg.addEventListener('click', function (event) {
            setRating(getRatingFromPointer(event));
        });

        starBg.addEventListener('keydown', function (event) {
            const currentRating = parseFloat(box.dataset.ratingValue || '0') || 0;
            if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
                event.preventDefault();
                setRating(currentRating + 0.5);
            } else if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
                event.preventDefault();
                setRating(currentRating - 0.5);
            } else if (event.key === 'Home') {
                event.preventDefault();
                setRating(0);
            } else if (event.key === 'End') {
                event.preventDefault();
                setRating(5);
            }
        });
    });
}

function optimizeRelatedItemsForMobile() {
    const isMobileViewport = window.matchMedia('(max-width: 768px)').matches;
    const isTouchDevice = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    if (!isMobileViewport && !isTouchDevice) {
        return;
    }

    const carouselContainer = document.getElementById('best-items');
    if (!carouselContainer) {
        return;
    }

    const track = carouselContainer.querySelector('.carousel-track');
    const indicator = carouselContainer.querySelector('.carousel-indicators');
    if (!track || !indicator) {
        return;
    }

    const originSlides = Array.from(track.querySelectorAll('.carousel-slide'));
    if (!originSlides.length) {
        return;
    }

    const cards = [];
    originSlides.forEach(slide => {
        Array.from(slide.children).forEach(child => {
            if (child.classList && child.classList.contains('best-items-item')) {
                cards.push(child);
            }
        });
    });

    if (cards.length <= 2) {
        return;
    }

    const perSlide = 2;
    const expectedSlides = Math.ceil(cards.length / perSlide);
    const alreadyGrouped = originSlides.length === expectedSlides && originSlides.every(slide => {
        const cardCount = Array.from(slide.children).filter(child => child.classList && child.classList.contains('best-items-item')).length;
        return cardCount <= perSlide;
    });
    if (alreadyGrouped) {
        return;
    }

    const slideClassName = originSlides[0].className;
    track.innerHTML = '';

    for (let index = 0; index < cards.length; index += perSlide) {
        const slide = document.createElement('div');
        slide.className = slideClassName;
        cards.slice(index, index + perSlide).forEach(card => {
            slide.appendChild(card);
        });
        track.appendChild(slide);
    }

    indicator.innerHTML = '';
    for (let dotIndex = 0; dotIndex < expectedSlides; dotIndex++) {
        const dot = document.createElement('div');
        dot.className = `carousel-indicator home-section-indicator${dotIndex === 0 ? ' active' : ''}`;
        indicator.appendChild(dot);
    }
}

// 博客文章详情页面交互功能
document.addEventListener('DOMContentLoaded', function () {
    applyMobileBreadcrumbSpacing();
    window.addEventListener('resize', applyMobileBreadcrumbSpacing);
    window.addEventListener('orientationchange', applyMobileBreadcrumbSpacing);
    window.addEventListener('pageshow', applyMobileBreadcrumbSpacing);
    const mobileBreadMql = window.matchMedia('(max-width: 768px)');
    if (typeof mobileBreadMql.addEventListener === 'function') {
        mobileBreadMql.addEventListener('change', applyMobileBreadcrumbSpacing);
    } else if (typeof mobileBreadMql.addListener === 'function') {
        mobileBreadMql.addListener(applyMobileBreadcrumbSpacing);
    }

    optimizeRelatedItemsForMobile();
    const relateItems = new Carousel('best-items', 20);
    const link = new LinkRef('toc-item', 'post-detail-section');
    const reviews = document.querySelectorAll('.post-detail-review-item');
    reviews.forEach(element => {
        bindReviewItemEvents(element);
    });
    initializeSelectableRatings();
    const loadMore = document.getElementById('load-more');
    if (loadMore && document.body.clientWidth > 768) {
        loadMore.addEventListener('click', function (event) {
            event.preventDefault();
            event.stopPropagation();
            const reviewList = document.querySelector('.post-detail-review-list');
            const reviewTemplate = reviewList ? reviewList.querySelector('.post-detail-review-item') : null;
            if (!reviewList || !reviewTemplate) {
                return;
            }
            const newReview = reviewTemplate.cloneNode(true);
            const replyContent = newReview.querySelector('.post-detail-reviewer-content');
            const replyArrow = newReview.querySelector('.post-detail-reviewer-arrow');
            if (replyContent) {
                replyContent.style.display = 'none';
            }
            if (replyArrow) {
                replyArrow.style.transform = 'rotate(0deg)';
            }
            reviewList.appendChild(newReview);
            bindReviewItemEvents(newReview);
        });
    }
    if (menuToggle && menuContainer) {
        menuToggle.addEventListener('click', function (event) {
            event.preventDefault();
            event.stopPropagation();
            const visible = menuContainer.classList.contains('is-open');
            toggleMobileToc(!visible);
        });
    }

    if (close) {
        close.addEventListener('click', function (event) {
            event.preventDefault();
            event.stopPropagation();
            toggleMobileToc(false);
        });
    }

    if (menuContainer) {
        menuContainer.addEventListener('click', function (event) {
            if (event.target === menuContainer) {
                toggleMobileToc(false);
            }
        });

        const tocItems = menuContainer.querySelectorAll('.toc-item');
        tocItems.forEach(item => {
            item.addEventListener('click', function () {
                if (!window.matchMedia('(max-width: 768px)').matches) {
                    return;
                }
                const targetSectionId = item.id;
                // 先关闭抽屉再滚动，避免面板遮挡目标章节
                toggleMobileToc(false);
                window.setTimeout(function () {
                    link.scrollToSection(targetSectionId);
                }, 0);
            });
        });
    }

    if (window.matchMedia('(max-width: 768px)').matches) {
        toggleMobileToc(false);
    } else if (menuContainer) {
        menuContainer.setAttribute('aria-hidden', 'false');
    }
});



window.addEventListener('scroll', updateStickyHeader, { passive: true });

// 页面加载时调整位置
document.addEventListener('DOMContentLoaded', adjustFilterPosition);

// 更新sticky header状态
function updateStickyHeader() {
    if (!stickyHeader) return;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > pageHeadHeight) {
        stickyHeader.classList.add('is-sticky');
    } else {
        stickyHeader.classList.remove('is-sticky');
    }
    adjustFilterPosition();
}
updateStickyHeader();

// 动态调整过滤器位置
function adjustFilterPosition() {
    const body = document.getElementsByTagName('body')[0];
    const headIsSticky = stickyHeader.classList.contains('is-sticky');
    if (!pageFix) return;
    if (body.offsetWidth < 768) {
        pageFix.classList.remove('is-sticky');
        pageFix.style.position = '';
        pageFix.style.left = '';
        pageFix.style.right = '';
        pageFix.style.top = '';
        pageFix.style.maxHeight = '';
        pageFix.style.transform = '';
        return;
    };
    // 清理移动端分支可能遗留的内联定位，避免桌面端横向偏移
    pageFix.style.left = '';
    pageFix.style.right = '';
    pageFix.style.transform = '';

    pageFix.classList.toggle('is-sticky', headIsSticky);
    // 计算页面头部所有固定元素的总高度
    let totalHeight = stickyHeaderHeight;
    if (pageHead && !headIsSticky) {
        totalHeight += pageHeadHeight;
    }
    // 设置过滤器的位置和高度
    if (!headIsSticky) {
        // 非sticky状态：相对于page-content定位
        Object.assign(pageFix.style, {
            top: '20px',
            maxHeight: `calc(100vh - ${totalHeight + 40}px)` // 添加max-height
        });
    } else {
        let top = totalHeight + 20
        let menuContainerScrollTop = articleContent.scrollHeight - document.documentElement.scrollTop - pageFix.clientHeight + pageHeadHeight
        if (menuContainerScrollTop < 0) {
            top = totalHeight + menuContainerScrollTop
        }
        // sticky状态：固定定位
        Object.assign(pageFix.style, {
            top: top + 'px',
            maxHeight: `calc(100vh - ${totalHeight + 40}px)` // 添加max-height
        });
    }
}

$(document).ready(function () {
    const $articleContent = $('.article-content');
    $articleContent.addClass('is-unpaid').removeClass('is-paid');

    $('.submit-btn').on('click', function () {
        let params = {
            content: $('.comment-textarea').val(),
            captcha: $('.captcha-input').val()
        }
        console.log(params, '000')
    })
    $('.article-unlock-btn').on('click', function (event) {
        event.preventDefault();
        $articleContent.removeClass('is-unpaid').addClass('is-paid');
        updateStickyHeader();
    })
    $('.reading-mode-btn').on('click', function () {
        $(this).parent().toggleClass('is-reading-mode')
    })
    $(document).on('click', '.post-detail-review-tool-icon-like, .icon-is-dianzan', function () {
        $(this).parent('.post-detail-review-tool-item').toggleClass('has-activate')
    })
    $(document).on('click', '.post-detail-review-tool-icon-unlike, .icon-not-dianzan', function () {
        $(this).parent('.post-detail-review-tool-item').toggleClass('has-activate')
    })
    document.querySelectorAll('.star-list').forEach(function(starList, index) {
        lightStar(starList)
    })
    function lightStar (starList) {
        let index = -1;	//被点击的星星的索引，初始化

        //获取相关元素
        let ul = document.querySelector('.star-list');	//容器
        let liArr = starList.children;	//所有星星li的集合
        for (let i = 0; i < liArr.length; i++) {
            liArr[i].num = i;	//存储当前索引值
            liArr[i].onmouseenter = function () {
                //1 鼠标移入哪个星星，哪个星星及其前面的星星都高亮
                light(this.num);
            }
        }
        // 点亮
        function light(index) {
            //先把所有星星都熄灭
            for (let i = 0; i < liArr.length; i++) {
                liArr[i].style.background = 'url(image/star-un-16.png) no-repeat 100% 100%';
            }
            for (let i = 0; i <= index; i++) {
                liArr[i].style.background = 'url(image/star-16.png) no-repeat 100% 100%';
            }
        }
        light(index);
    }
})
