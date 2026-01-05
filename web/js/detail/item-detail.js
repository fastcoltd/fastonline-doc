
const stickyHeader = document.getElementById('stickyHeader');
const stickyHeaderHeight = stickyHeader.offsetHeight;
const pageContent = document.querySelector('.page-content');
const pageFix = document.querySelector('.page-fix-box');
const pageHead = document.querySelector('.page-head');
const itemDetailLeftBox = document.querySelector('.item-detail-left-box')
const pageHeadHeight = pageHead.offsetHeight;
const footer = document.getElementsByTagName('footer')[0];
const footerHeight = footer.offsetHeight;
const bodyElement = document.getElementsByTagName('body')[0];
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
function renderStarsStatisticsChart() {
    let dom = document.getElementById('starsStatisticsEchart')
    var chartInstance = echarts.init(dom)
    var datas = [118, 50, 20, 10, 10]
    let starNames = ['5星', '4星', '3星', '2星', '1星']
    let maxVal = Math.max(...datas)
    let maxArr = [];
    for (let i = 0; i < datas.length; i++) {
        maxArr.push(maxVal + 20)
    }
    let option = {
        tooltip: {
            trigger: 'axis',
            formatter: '{b} : {c}',
        },
        legend: {
            show: false
        },
        grid: {
            left: 50,
            right: 20,
            top: 20,
            bottom: 0
        },
        xAxis: {
            show: true,
            position: 'top',
            type: 'value',
            max: 'dataMax',
            axisLine: {
                show: true, // 确保这一项设置为 true
                lineStyle: {
                    color: '#eaeaea', // 轴线颜色
                    width: 1, // 轴线宽度
                }
            },
            splitLine: {
                show: true,
                lineStyle: {
                    type: 'dashed'
                }
            },
            axisLabel: {
                color: '#333'
            }

        },
        yAxis: [{
            type: 'category',
            inverse: true,
            axisLine: {
                show: true,
                lineStyle: {
                    color: '#eaeaea'
                }
            },
            splitLine: {
                show: true,
                lineStyle: {
                    type: 'dashed'
                }
            },
            axisTick: {
                show: false
            },
            data: starNames,
            axisLabel: {
                margin: 40,
                fontSize: 17,
                align: 'left',
                color: '#333'
            }
        }],
        series: [{
            z: 2,
            name: 'value',
            type: 'bar',
            barWidth: 20,
            zlevel: 1,
            data: datas,
            itemStyle: {
                normal: {
                    color: '#8979FF'
                }
            },
            label: {
                show: true,
                position: 'right',
                color: '#000',
                fontSize: 12
            }
        },
        {
            name: '背景',
            type: 'bar',
            barWidth: 20,
            barGap: '-100%',
            itemStyle: {
                normal: {
                    color: '#D6DBED66',
                }
            },
            data: maxArr,
        }

        ]
    };
    chartInstance.setOption(option)
}
function randerOverviewStatisticschart() {
    let dom = document.getElementById('overviewStatisticsEchart')

    var chartInstance = echarts.init(dom)
    let option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
        },
        grid: {
            left: 50,
            right: 20,
            top: 20,
            bottom: 50
        },
        legend: {
            data: ['Goods rate', 'Response rate', 'Sufficient rate'],
            top: 'auto',
            bottom: 0
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: 'Goods rate',
                type: 'line',
                smooth: true,
                stack: 'Total',
                areaStyle: {},
                color: linearGradientColor('rgba(137, 121, 255, 0.8)', 'rgba(137, 121, 255, 0.1)'),
                emphasis: {
                    focus: 'series'
                },
                data: [120, 132, 101, 134, 90, 230, 210]
            },
            {
                name: 'Response rate',
                type: 'line',
                smooth: true,
                stack: 'Total',
                areaStyle: {},
                color: linearGradientColor('rgba(255, 146, 138, 0.8)', 'rgba(255, 146, 138, 0.1)'),
                emphasis: {
                    focus: 'series'
                },
                data: [220, 182, 191, 234, 290, 330, 310]
            },
            {
                name: 'Sufficient rate',
                type: 'line',
                smooth: true,
                stack: 'Total',
                areaStyle: {},
                color: linearGradientColor('rgba(60, 195, 223, 0.8)', 'rgba(60, 195, 223, 0.1)'),
                emphasis: {
                    focus: 'series'
                },
                data: [150, 232, 201, 154, 190, 330, 410]
            }
        ]
    }
    chartInstance.setOption(option)
}

function randerSalesCountStatisticschart() {
    let dom = document.getElementById('salesCountStatisticsEchart')

    var chartInstance = echarts.init(dom)
    let option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
        },
        grid: {
            left: 50,
            right: 20,
            top: 20,
            bottom: 70
        },
        legend: {
            data: ['Sales volume', 'After-sales volume', 'New volume'],
            top: 'auto',
            bottom: 0
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: 'Sales volume',
                type: 'line',
                smooth: true,
                stack: 'Total',
                areaStyle: {},
                color: linearGradientColor('rgba(0, 148, 178, 0.8)', 'rgba(0, 148, 178, 0.1)'),
                emphasis: {
                    focus: 'series'
                },
                data: [120, 132, 101, 134, 90, 230, 210]
            },
            {
                name: 'After-sales volume',
                type: 'line',
                smooth: true,
                stack: 'Total',
                areaStyle: {},
                color: linearGradientColor('rgba(239, 191, 1, 0.8)', 'rgba(239, 191, 1, 0.1)'),
                emphasis: {
                    focus: 'series'
                },
                data: [220, 182, 191, 234, 290, 330, 310]
            },
            {
                name: 'New volume',
                type: 'line',
                smooth: true,
                stack: 'Total',
                areaStyle: {},
                color: linearGradientColor('rgba(5, 66, 224, 0.8)', 'rgba(5, 66, 224, 0.1)'),
                emphasis: {
                    focus: 'series'
                },
                data: [150, 232, 201, 154, 190, 330, 410]
            }
        ]
    }
    chartInstance.setOption(option)
}
if (bodyElement.offsetWidth >= 768) {
    renderStarsStatisticsChart()
    randerSalesCountStatisticschart()
    randerOverviewStatisticschart()
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
                                    <p class="item-star-score">4.3</p>
                                    <p class="item-star-recommend">(200)</p>
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
    const screenshot = document.querySelector('.item-detail-screenshot');
    const screenshotContent = screenshot.querySelector('.item-detail-screenshot-content');
    const screenshotRightMore = screenshot.querySelector('.item-detail-screenshot-right-box');
    const screenshotLeftMore = screenshot.querySelector('.item-detail-screenshot-left-box');
    const isMobile = bodyElement.offsetWidth <= 768;
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
    $('#increase-qty').on('click', e => {
        $('#decrease-qty').removeClass('disabled')
        let val = Number($('#quantity-display').val()) + 1
        if (val >= 99) {
            val = 99
            $('#increase-qty').addClass('disabled')
        } else {
            $('#increase-qty').removeClass('disabled')
        }
        $('#quantity-display').val(val)
    })
    $('#decrease-qty').on('click', e => {
        $('#increase-qty').removeClass('disabled')
        let val = Number($('#quantity-display').val()) - 1
        if (val <= 1) {
            val = 1
            $('#decrease-qty').addClass('disabled')
        } else {
            $('#decrease-qty').removeClass('disabled')
        }
        $('#quantity-display').val(val)
    })
    $('#quantity-display').on('input', e => {
        let val = $(e.target).val()
        $('#increase-qty').removeClass('disabled')
        $('#decrease-qty').removeClass('disabled')
        if (val <= 1) {
            val = 1
            $('#decrease-qty').addClass('disabled')
        } else if (val >= 99) {
            val = 99
            $('#increase-qty').addClass('disabled')
        }
        $(e.target).val(val)
    })
    $('#buy-now-btn').on('click', () => {
        console.log('Buy~')
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
        });
        if (statisticsStyle.display === 'none') {
            statistics.style.display = 'flex';
        } else {
            statistics.style.display = 'none';
        }
        renderStarsStatisticsChart()
        randerSalesCountStatisticschart()
        randerOverviewStatisticschart()
    });
});


// 滚动监听事件
const handleScroll = debounce(function () {
    updateStickyHeader();
}, 16, {
    leading: true,
    trailing: false,
});

window.addEventListener('scroll', updateStickyHeader, { passive: true });

// 页面加载时调整位置
document.addEventListener('DOMContentLoaded', adjustFilterPosition);

// 更新sticky header状态
function updateStickyHeader() {
    if (!stickyHeader) return;
    const scrollTop = document.documentElement.scrollTop;
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
    const headIsSticky = stickyHeader.classList.contains('is-sticky');
    if (!pageFix) return;
    if (bodyElement.offsetWidth < 768) {
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
        let menuContainerScrollTop = itemDetailLeftBox.scrollHeight - document.documentElement.scrollTop - pageFix.clientHeight + pageHeadHeight
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