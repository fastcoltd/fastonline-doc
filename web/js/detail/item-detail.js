const sort = new SortSelector();
function sortItems(value) {
    console.log('sort items', value);
}

const list = new PageList();

// 加载商品数据
async function loadItems() {
    console.log('load items');
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
    const container = document.querySelector('.item-detail-review-list');
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
    const container = document.querySelector('.item-detail-review-list');

    items.forEach(item => {
        const itemElement = createItemElement(item);
        container.appendChild(itemElement);
    });
}

// 创建商品元素 - 完全按照Figma设计
function createItemElement(item) {
    const div = document.createElement('div');
    div.className = 'item-detail-review-item';

    const ratingPercent = (parseFloat(item.rating) / 5 * 100).toFixed(0);

    div.innerHTML = `
           <div class="page-section">
                            <div class="flex-column item-detail-review-box">
                                <div class="flex-row item-detail-review-user-box">
                                    <img class="item-detail-review-user-avatar" src="用户头像" />
                                    <div class="flex-column item-detail-review-user-name-box">
                                        <span class="item-detail-review-user-name">用户名</span>
                                        <span class="item-detail-review-user-time">1 day ago</span>
                                    </div>
                                    <div class="flex-row item-detail-review-user-status-box">
                                        <img class="item-detail-review-user-status-icon"
                                            src="image/detailpage/repeat-client.png" />
                                        <span class="item-detail-review-user-status-text">Repeat client</span>
                                    </div>
                                </div>
                                <span class="item-detail-review-content">We supply a series of design principles,
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
                                            <div class="stars-inner" style="width: 83%;"></div>
                                        </div>
                                    </div>
                                    <p class="item-star-score">{{4.3}}</p>
                                    <p class="item-star-recommend">{{(200)}}</p>
                                </div>
                                <div class="flex-row item-detail-review-info-box">
                                    <div class="flex-column item-detail-review-info-item">
                                        <span class="item-detail-review-info-title">$666.6</span>
                                        <span class="item-detail-review-info-desc">Price</span>
                                    </div>
                                    <div class="item-detail-review-info-line"></div>
                                    <div class="flex-column item-detail-review-info-item">
                                        <span class="item-detail-review-info-title">333</span>
                                        <span class="item-detail-review-info-desc">Quantity</span>
                                    </div>
                                    <div class="item-detail-review-info-line"></div>
                                    <div class="flex-column item-detail-review-info-item icon">
                                        <img class="item-detail-review-info-icon" src="review图片" />
                                    </div>
                                </div>
                            </div>
                            <div class="item-detail-review-line"></div>
                            <div class="flex-column item-detail-reiviewer-box">
                                <div class="flex-row item-detail-reviewer-user-box">
                                    <img class="item-detail-reviewer-user-icon" src="用户头像" />
                                    <span class="item-detail-reviewer-user-name">用户名</span>
                                    <div class="item-detail-reviewer-user-empty"></div>
                                    <img class="item-detail-reviewer-arrow" src="image/detailpage/arrow-down.png" />
                                </div>
                                <span class="item-detail-reviewer-content" style="display: none;">Incidunt velit eveniet
                                    sint.
                                    Tempore est et quaerat
                                    quia. Nam consequatur tenetur quia ut sed esse molestias. Nulla enim vel et porro
                                    quisquam.
                                    Et sapiente velit quam adipisci voluptates sed nisi veritatis facilis. Omnis sed
                                    dignissimos.</span>
                            </div>
                        </div>
                        <div class="flex-row item-detail-review-tool-box">
                            <span class="item-detail-review-tool-text">Helpful?</span>
                            <div class="flex-row item-detail-review-tool-item" id="review-like">
                                <img class="item-detail-review-tool-icon" src="image/like-count.png" />
                                <span class="item-detail-review-tool-text">YES</span>
                            </div>
                            <div class="flex-row item-detail-review-tool-item" id="review-unlike">
                                <img class="item-detail-review-tool-icon" src="image/unlike-count.png" />
                                <span class="item-detail-review-tool-text">NO</span>
                            </div>
                        </div>
         `;

    return div;
}
document.addEventListener("DOMContentLoaded", function () {
    const similar = new Carousel('best-items', 20);
    const link = new LinkRef('page-link', 'item-detail-left-group');
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

    const menu = document.querySelector('.detail-page-menu');
    const statistics = document.querySelector('.item-detail-right-box');
    menu.addEventListener('click', function (event) {
        event.preventDefault();
        event.stopPropagation();
        const statisticsStyle = window.getComputedStyle(statistics);
        const close = statistics.querySelector('.item-detail-right-close');
        close.addEventListener('click', function (event) {
            statistics.style.display = 'none';
            body.classList.toggle('modal-open', false);
        });
        if (statisticsStyle.display === 'none') {
            statistics.style.display = 'flex';
            body.classList.toggle('modal-open', true);
        } else {
            statistics.style.display = 'none';
            body.classList.toggle('modal-open', false);
        }
    });
});