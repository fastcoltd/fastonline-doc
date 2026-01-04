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
  console.log('reload items', this.dropdownMenu.selectedValue);
  const container = document.getElementById('items-grid');
  container.innerHTML = '';
  loadItems();
}

function sortItems(value) {
  console.log('sort items', value);
}

function searchItems(inputValue) {
  console.log('search items', inputValue)
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
  div.className = 'resource-item';

  const ratingPercent = (parseFloat(item.rating) / 5 * 100).toFixed(0);

  div.innerHTML = `
           <div class="resource-header">
                    <span class="resource-title">Resource Title,Resource Title,Resource Title,Resource Title,Resource
                        Title,Resource Title,Resource Title,Resource Title,Resource Title,Resource Title,Resource
                        Title,Resource Title,Resource Title,Resource Title,Resource Title,Resource Title,Resource
                        Title,Resource Title,Resource Title,Resource Title,Resource Title,Resource Title,Resource
                        Title,Resource Title,Resource Title,Resource Title,Resource Title,Resource Title</span>
                    <span class="resource-date">Update: 2023/05/16 12:13:14</span>
                </div>
                <div class="resource-body">
                    <span class="resource-content">Resource content,Resource content,Resource content,Resource
                        content,Resource content,Resource content,Resource content,Resource content,Resource
                        content,Resource content,Resource content,Resource content,Resource content,Resource
                        content,Resource content,Resource content,Resource content,Resource content,Resource
                        content,Resource content,Resource content,Resource content,Resource content,Resource
                        content,Resource content,Resource content,Resource content,Resource content,Resource
                        content,Resource content,Resource content,Resource content,Resource content,Resource
                        content,Resource content,Resource content,Resource content,Resource content,Resource
                        content,Resource content,Resource content,Resource content,</span>
                    <div class="resource-actions">
                        <div class="resource-action-group">
                            <img src="image/view-count.png" class="resource-action-icon" />
                            <span class="resource-action-count">304</span>
                        </div>
                        <div class="resource-action-group">
                            <img src="image/like-count.png" class="resource-action-icon" />
                            <span class="resource-action-count">203</span>
                        </div>
                        <div class="resource-action-group">
                            <img src="image/unlike-count.png" class="resource-action-icon" />
                            <span class="resource-action-count">102</span>
                        </div>
                        <div class="resource-action-group">
                            <img src="image/follow-count.png" class="resource-action-icon" />
                            <span class="resource-action-count">502</span>
                        </div>
                    </div>
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


$(document).ready(function () {
  $('.page-dropdown-select').on('click', function() {
    $(this).toggleClass('active')
  })
  $('.page-dropdown-item').on('click', function() {
    let value = $(this).attr('data-value')
    let text = $(this).find('.title').text()
    $('#selectedCategory').attr('data-value', value).text(text)
    searchData()
  })
  $('.sort-item').on('click', function () {
    $('.page-sort-icon').attr('data-value', $(this).attr('data-value'))
    searchData()
  })
  $('.page-search-icon').on('click', function() {
    searchData()
  })
})
function searchData () {
  let params = {
    category: $('#selectedCategory').attr('data-value'),
    name: $('#searchInput').val(),
    sortBy: $('.page-sort-icon').attr('data-value')
  }
  console.log(params, 'dddd')
}