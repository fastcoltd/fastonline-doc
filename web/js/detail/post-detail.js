const stickyHeader = document.getElementById('stickyHeader');
const stickyHeaderHeight = stickyHeader.offsetHeight;
const pageContent = document.querySelector('.page-content');
const articleContent = document.querySelector('.article-content')
const pageFix = document.querySelector('.page-fix-box');
const pageHead = document.querySelector('.page-head');
const pageHeadHeight = pageHead.offsetHeight;
const footer = document.getElementsByTagName('footer')[0];
const footerHeight = footer.offsetHeight;

const menuContainer = document.querySelector('.table-of-container');

const close = menuContainer.querySelector('.table-of-container-close');

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
                                    <img class="post-detail-review-user-avatar" src="用户头像" />
                                    <div class="flex-column post-detail-review-user-name-box">
                                        <span class="post-detail-review-user-name">用户名</span>
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
                                            <div class="stars-inner" style="width: 83%;"></div>
                                        </div>
                                    </div>
                                    <p class="item-star-score">4.3</p>
                                    <p class="item-star-recommend">(200)</p>
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
                                    <img class="post-detail-reviewer-user-icon" src="用户头像" />
                                    <span class="post-detail-reviewer-user-name">用户名</span>
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
                                <span class="post-detail-review-tool-text">YES</span>
                            </div>
                            <div class="flex-row post-detail-review-tool-item" id="review-unlike">
                                <img class="post-detail-review-tool-icon" src="image/unlike-count.png" />
                                <span class="post-detail-review-tool-text">NO</span>
                            </div>
                        </div>
         `;

    return div;
}

// 博客文章详情页面交互功能
document.addEventListener('DOMContentLoaded', function () {
    const relateItems = new Carousel('best-items', 20);
    const link = new LinkRef('toc-item', 'post-detail-section');
    const reviews = document.querySelectorAll('.post-detail-review-item');
    reviews.forEach(element => {
        const reviewer = element.querySelector('.post-detail-reiviewer-box');
        const user = reviewer.querySelector('.post-detail-reviewer-user-box')
        const arrow = user.querySelector('.post-detail-reviewer-arrow');
        const content = reviewer.querySelector('.post-detail-reviewer-content');
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
    menu.addEventListener('click', function (event) {
        event.preventDefault();
        event.stopPropagation();
        const menuContainerStyle = window.getComputedStyle(menuContainer);
        close.addEventListener('click', function (event) {
            menuContainer.style.display = 'none';
            body.classList.toggle('modal-open', false);
        });
        if (menuContainerStyle.display === 'none') {
            menuContainer.style.display = 'block';
            body.classList.toggle('modal-open', true);
        } else {
            menuContainer.style.display = 'none';
            body.classList.toggle('modal-open', false);
        }
    });
});


const listContainer = document.querySelector('.list-container')
// 滚动监听事件
const handleScroll = debounce(function () {
    updateStickyHeader();
}, 4);

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
        const pageFixVisble = pageFix.dataset.visible;
        if (!pageFixVisble) {
            return;
        }
        if (headIsSticky) {
            Object.assign(pageFix.style, {
                position: 'fixed',
                left: 16 + 'px',
                top: stickyHeaderHeight + 20 + 'px',
                maxHeight: `calc(100vh - ${stickyHeaderHeight + 40}px)`
            });
            return;
        }
        Object.assign(pageFix.style, {
            position: 'relative',
            left: 0,
            top: 20 + 'px',
            maxHeight: `calc(100vh - ${stickyHeaderHeight + pageHeadHeight + 40}px)`
        });
        return;
    };
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
    $('.submit-btn').on('click', function() {
        let params = {
            content: $('.comment-textarea').val(),
            captcha: $('.captcha-input').val()
        }
        console.log(params, '000')
    })
})