
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
  const markClasses = ['best-items-item-mark1', 'best-items-item-mark2', 'best-items-item-mark3', 'best-items-item-mark4', 'best-items-item-mark5', 'best-items-item-mark6'];

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
  div.className = 'best-items-item';

  const ratingPercent = (parseFloat(item.rating) / 5 * 100).toFixed(0);

  div.innerHTML = `
           <img class="best-items-item-icon" src="{{item.image}}" />
           <img class="item-like" src="image/like.png" />
           <div class="best-items-item-content">
            <div class="item-title-box">
              <div class="item-mark item-mark1">{{item.mark}}</div>
              <a href="item-detail.html?item_id=123" target="_self" class="item-title">{{item 标题 item 标题 item 标题 item 标题 item 标题 item 标题}}</a>
            </div>
            <div class="item-star-box">
              <div class="star-bg">
                <div class="stars-outer">
                  <div class="stars-inner" style="width: 83%;"></div>
                </div>
              </div>
              <p class="item-star-score">4.3</p>
              <p class="item-star-recommend">(200)</p>
            </div>
            <div class="best-items-item-middle-box">
              <div class="item-brand-box">
                <p class="item-brand-text">品牌: </p>
                <img class="item-brand-icon" src="image/brand.png" />
                <p class="item-brand" style="color: #06C70C;">{{Google}}</p>
              </div>
              <div class="item-service-box">
                <p class="item-service-text">服务: </p>
                <img class="item-service-icon" src="image/service.png" />
                <p class="item-service">{{SEO & SA}}</p>
              </div>
              <div class="best-items-item-price-stock-box">
                <div class="item-price-box">
                  <p class="item-price-text">{{价格}}</p>
                  <p class="item-price">{{$10.0}}</p>
                </div>
                <div class="item-stock-box">
                  <p class="item-stock-text">{{库存}}</p>
                  <img class="item-stock-icon" src="image/stock.png" />
                  <p class="item-stock">{{80}}</p>
                </div>
              </div>
            </div>
            <div class="item-tag-box">
              <a href="tag-all.html?type=compaign&name=compaign-name" target="_self" class="item-tag">
                <p class="item-tag-text">{{新品发布}}</p>
              </a>
              <a href="tag-all.html?type=compaign&name=compaign-name" target="_self" class="item-tag">
                <p class="item-tag-text">{{运动户外}}</p>
              </a>
              <a href="tag-all.html?type=compaign&name=compaign-name" target="_self" class="item-tag">
                <p class="item-tag-text">{{配送时间: 24H+}}</p>
              </a>
            </div>
            <div class="item-button-box ${Math.random() > 0.5 ? 'active' : ''}">立即购买</div>
        </div>
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