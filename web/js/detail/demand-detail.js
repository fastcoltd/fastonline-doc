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
    const container = document.querySelector('.list-container');

    items.forEach(item => {
        const itemElement = createItemElement(item);
        container.appendChild(itemElement);
    });
}

// 创建商品元素 - 完全按照Figma设计
function createItemElement(item) {
    const div = document.createElement('div');
    div.className = 'demand-card';

    const ratingPercent = (parseFloat(item.rating) / 5 * 100).toFixed(0);

    div.innerHTML = `
    <div class="card-content">
          <!-- 第一行：用户信息 -->
          <div class="user-section">
            <img class="demand-detail-item-user-avatar" src="image" />
            <div class="demand-detail-item-user-info">
              <div class="user-header">
                <h2 class="demand-detail-item-user-name">Sergio Tremblay</h2>
                <div class="user-icon-box">
                  <div class="item-mark item-mark1">Hot</div>
                  <div class="item-mark item-mark2">LV1</div>
                  <div class="level-badge level-badge1"></div>
                  <div class="item-star-box">
                    <div class="star-bg">
                        <div class="stars-outer">
                            <div class="stars-inner" style="width: 83%;"></div>
                        </div>
                    </div>
                    <p class="item-star-score">4.3</p>
                    <p class="item-star-recommend">(200)</p>
                  </div>
                </div>
              </div>
              <div class="demand-detail-item-user-stats">
                <div class="item-service-box">
                  <img class="item-service-icon" src="image" />
                  <span class="item-service-text">Order volumn:</span>
                  <span class="item-service">40</span>
                </div>
                <div class="item-service-box">
                  <img class="item-service-icon" src="image" />
                  <span class="item-service-text">Bidding/Winning:</span>
                  <span class="item-service">33</span>
                </div>
                <div class="item-service-box">
                  <img class="item-service-icon" src="image" />
                  <span class="item-service-text">Winning rate:</span>
                  <span class="item-service">70.2%</span>
                </div>
                <div class="item-service-box">
                  <img class="item-service-icon" src="image" />
                  <span class="item-service-text">Bidding time:</span>
                  <span class="item-service">2025/07/31 ~ 2025/09/30</span>
                </div>
              </div>
            </div>
          </div>
          <div class="brand-tag-box">
            <div class="item-tag"><p class="item-tag-text">Screen Size: 17-20in</p></div>
            <div class="item-tag"><p class="item-tag-text">Waterproof: IPX7</p></div>
            <div class="item-tag"><p class="item-tag-text">Cleaning: Pro Clean</p></div>
            <div class="item-tag"><p class="item-tag-text">Lighting:Incandescent</p></div>
          </div>
          <div class="other-info">
            <p class="other-label">Provide samples: <span class="other-text">
                Nesciunt quibusdam quae nihil debitis eveniet quidem perspiciatis numquam. Voluptatem necessitatibus occaecati voluptatem qui blanditiis eligendi. Quod rerum itaque tempora dolorem tenetur molestias aut deleniti incidunt. Sit alias sed ea dolorem unde culpa incidunt neque.
            </span></p>
          </div>
          <span class="item-service">Fuga nisi id dicta fugi Fuga nisi id dicta fugit.Fuga nisi id dicta fugit.Fuga nisi id dicta fugit.Fuga nisi id dicta fugit.Fuga nisi id dicta fugit.Fuga nisi id dicta fugit.Fuga nisi id dicta fugit.Fuga nisi id dicta fugit.Fuga nisi id dicta fugit.t.</span>
        </div>
        <div class="demand-edit-box demand-edit-box1">Edit</div>
        <!-- 状态标签 -->
        <div class="status-badge status-badge1">
          <p>Delivered</p>
        </div>
         `;

    return div;
}
document.addEventListener("DOMContentLoaded", function () {
    
});

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