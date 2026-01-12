
const stickyHeader = document.getElementById('stickyHeader');
const stickyHeaderHeight = stickyHeader.offsetHeight;
const pageContent = document.querySelector('.page-content');
const pageFix = document.querySelector('.page-fix-box');
const pageHead = document.querySelector('.page-head');
const itemsContainer = document.querySelector('.list-container')
const pageHeadHeight = pageHead.offsetHeight;
const footer = document.getElementsByTagName('footer')[0];
const footerHeight = footer.offsetHeight;
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
      this.list.showNoMore();
    }

  } catch (error) {
    console.error('加载商品失败:', error);
  } finally {
    /// 加载结束
    this.list.showLoading(false);
  }
}

function reloadItems() {
  console.log('reload items');
  const container = document.getElementById('items-grid');
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
  const markClasses = ['demand-item-mark1', 'demand-item-mark2', 'demand-item-mark3', 'demand-item-mark4', 'demand-item-mark5', 'demand-item-mark6'];

  const items = [];
  for (let i = 0; i < this.list.itemsPerPage; i++) {
    const price = (Math.random() * 1000 + 50).toFixed(2);
    const stock = Math.floor(Math.random() * 100) + 1;
    const rating = (Math.random() * 2 + 3).toFixed(1);
    const reviews = Math.floor(Math.random() * 500) + 10;
    const isLiked = Math.random() > 0.5;

    items.push({
      id: (this.list.currentPage - 1) * this.list.itemsPerPage + i + 1,
      title: `商品名称 ${(this.list.currentPage - 1) * this.list.itemsPerPage + i + 1}`,
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
  const container = document.getElementById('items-grid');

  items.forEach(item => {
    const itemElement = createItemElement(item);
    container.appendChild(itemElement);
  });
}

// 创建商品元素 - 完全按照Figma设计
function createItemElement(item) {
  const div = document.createElement('div');
  div.className = 'demand-item';

  const ratingPercent = (parseFloat(item.rating) / 5 * 100).toFixed(0);

  div.innerHTML = `
           <i class="iconfont icon-aixin" data-like="1" style="color: var(--primary-color)"></i>
                        <a href="demand-detail.html?name=demand-name" target="_self" class="item-title-box">
                            <p class="item-title">Experienced Art Director Needed for Website</p>
                        </a>
                        <div class="demand-item-content">
                            <div class="demand-item-middle-box">
                                <div class="demand-item-row-box">
                                    <div class="item-brand-box demand-item-coloumn-box">
                                        <p class="item-brand-text">品牌: </p>
                                        <img class="item-brand-icon" src="image/brand.png" />
                                        <p class="item-brand" style="color: #06C70C;">Google</p>
                                    </div>
                                    <div class="item-service-box demand-item-coloumn-box">
                                        <p class="item-service-text">服务: </p>
                                        <img class="item-service-icon" src="image/service.png" />
                                        <p class="item-service">SEO & SA</p>
                                    </div>
                                </div>
                                <div class="demand-item-row-box">
                                    <div class="item-service-box demand-item-coloumn-box">
                                        <p class="item-service-text" style="display: inline-block;">Quantity: </p>
                                        <p class="item-service">14</p>
                                    </div>
                                    <div class="item-service-box demand-item-coloumn-box">
                                        <p class="item-service-text" style="display: inline-block;">Total Price: </p>
                                        <p class="item-service">$1920</p>
                                    </div>
                                </div>
                                <div class="demand-item-row-box">
                                    <div class="item-service-box demand-item-coloumn-box demand-item-price-range-box">
                                        <p class="item-service-text" style="display: inline-block;">Price Range: </p>
                                        <p class="item-service">14</p>
                                    </div>
                                    <div class="item-service-box demand-item-coloumn-box">
                                        <img class="item-service-icon" src="image/date-range.png"
                                            style="display: inline-block;" />
                                        <p class="item-service">2025/05/28 ~ 2025/05/28</p>
                                    </div>
                                </div>
                            </div>

                            <div class="item-tag-box">
                                <a class="item-tag" href="attribute-all.html?type=demand&name=demand-name&value=demand-value" target="_self">
                                    <p class="item-tag-text">{{新品发布}}</p>
                                </a>
                                <a class="item-tag" href="attribute-all.html?type=demand&name=demand-name&value=demand-value" target="_self">
                                    <p class="item-tag-text">{{运动户外}}</p>
                                </a>
                                <a class="item-tag" href="attribute-all.html?type=demand&name=demand-name&value=demand-value" target="_self">
                                    <p class="item-tag-text">{{配送时间: 24H+}}</p>
                                </a>
                                <div class="item-tag-more-box">
                                    <p class="item-tag-more">+3</p>
                                </div>
                            </div>

                            <div class="demand-item-bidder-box">
                                <span class="demand-item-bidder-text">Bidder:</span>
                                <img class="demand-item-bidder-avatar" src="image/avatar.png" />
                                <img class="demand-item-bidder-avatar" src="image/avatar.png" />
                                <img class="demand-item-bidder-avatar" src="image/avatar.png" />
                                <img class="demand-item-bidder-avatar" src="image/avatar.png" />
                                <img class="demand-item-bidder-avatar" src="image/avatar.png" />
                                <img class="demand-item-bidder-avatar" src="image/avatar.png" />
                                <img class="demand-item-bidder-avatar" src="image/avatar.png" />
                                <img class="demand-item-bidder-avatar" src="image/avatar.png" />
                                <div class="demand-item-bidder-avatar-more">+2</div>
                            </div>
                        </div>
                        <div class="item-button-box demand-button">
                            Bid Now</div>
         `;

  return div;
}


// 初始化分页组件
const pagination = new Pagination({
  current: 1,
  pageSize: 20,
  total: 285,
  showSizeChanger: true,
  showQuickJumper: true
});

// 页面变化回调
pagination.onPageChange = (page, pageSize) => {
  console.log(`页面变化: 第${page}页, 每页${pageSize}条`);
  loadItems();
};

// 页面大小变化回调
pagination.onPageSizeChange = (page, pageSize) => {
  console.log(`页面大小变化: 第${page}页, 每页${pageSize}条`);
  reloadItems();
};


// 滚动监听事件
const handleScroll = debounce(function () {
  updateStickyHeader();
}, 16, 16, {
  leading: true,
  trailing: false,
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
    let menuContainerScrollTop = itemsContainer.scrollHeight - document.documentElement.scrollTop - pageFix.clientHeight + pageHeadHeight
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