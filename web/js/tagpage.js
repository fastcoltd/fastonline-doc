

let pageType = "best-items-item";
let pageList = null;
const brandPageIndexs = document.querySelectorAll(".page-link");
// Items Tab 统一商品卡片原型：动态新增卡片通过克隆统一组件原型生成，
// 不在 JS 中维护第二份 item HTML（遵循 docs/unified-item-components.md）。
const itemAllCardRoot = document.querySelector('#best-items-item .items-pager');
const itemAllCardPrototype = itemAllCardRoot ? itemAllCardRoot.querySelector(':scope > .item-all-card') : null;
// Stories Tab 统一店铺卡片原型：动态新增卡片通过克隆统一组件原型生成，
// 不在 JS 中维护第二份 store HTML（遵循 docs/unified-item-components.md）。
const storeAllCardRoot = document.querySelector('#store-item .items-pager');
const storeAllCardPrototype = storeAllCardRoot ? storeAllCardRoot.querySelector(':scope > .store-all-card') : null;
// Compaigns Tab 统一活动卡片原型：动态新增卡片通过克隆统一组件原型生成，
// 不在 JS 中维护第二份 compaign HTML（遵循 docs/unified-item-components.md）。
const compaignAllCardRoot = document.querySelector('#compaign-item .items-pager');
const compaignAllCardPrototype = compaignAllCardRoot ? compaignAllCardRoot.querySelector(':scope > .compaign-all-card') : null;
// Posts Tab 统一文章卡片原型：动态新增卡片通过克隆统一组件原型生成，
// 不在 JS 中维护第二份 post HTML（遵循 docs/unified-item-components.md）。
const postAllCardRoot = document.querySelector('#post-item .items-pager');
const postAllCardPrototype = postAllCardRoot ? postAllCardRoot.querySelector(':scope > .post-all-card') : null;

// 初始化 - 设置第一个链接为激活状态
if (brandPageIndexs.length > 0) {
  brandPageIndexs[0].classList.add('active');
  pageType = brandPageIndexs[0].id;
  changePageType(pageType);
}

// 点击导航链接事件
brandPageIndexs.forEach(function (item) {
  item.addEventListener("click", function (e) {
    e.stopPropagation();
    brandPageIndexs.forEach(item => item.classList.remove('active'));
    e.currentTarget.classList.add('active');
    pageType = e.currentTarget.id;
    changePageType(pageType);
    if (pageType == 'post-item') {
      $('.layout-controls-box').hide()
    } else {
      $('.layout-controls-box').show()
    }
  });
});

function changePageType(type) {
  const allPageList = document.querySelectorAll('.page-list');
  allPageList.forEach(item => {
    const id = item.id
    item.style.display = id === type ? 'block' : 'none';
    if (id === type) {
      pageList = item;
    }
  });
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
  const container = pageList.querySelector('.items-pager');
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
  const container = pageList.querySelector('.items-pager');
  items.forEach(item => {
    if (pageType == 'best-items-item') {
      const itemElement = createBestItemElement(item);
      container.appendChild(itemElement);
    } else if (pageType == 'store-item') {
      const itemElement = createStoreItemElement(item);
      container.appendChild(itemElement);
    } else if (pageType == 'compaign-item') {
      const itemElement = createCompaignItemElement(item);
      container.appendChild(itemElement);
    } else if (pageType == 'post-item') {
      const itemElement = createPostItemElement(item);
      container.appendChild(itemElement);
    }
  });
}

function createBestItemElement(item) {
  // 克隆统一商品组件原型，不在 JS 中维护第二份 item HTML（遵循 docs/unified-item-components.md）
  if (!itemAllCardPrototype) return document.createElement('div');
  return itemAllCardPrototype.cloneNode(true);
}

function createStoreItemElement(item) {
  // 克隆统一店铺组件原型，不在 JS 中维护第二份 store HTML（遵循 docs/unified-item-components.md）
  if (!storeAllCardPrototype) return document.createElement('div');
  return storeAllCardPrototype.cloneNode(true);
}

function createCompaignItemElement(item) {
  // 克隆统一活动组件原型，不在 JS 中维护第二份 compaign HTML（遵循 docs/unified-item-components.md）
  if (!compaignAllCardPrototype) return document.createElement('div');
  return compaignAllCardPrototype.cloneNode(true);
}

function createPostItemElement(item) {
  // 克隆统一文章组件原型，不在 JS 中维护第二份 post HTML（遵循 docs/unified-item-components.md）
  if (!postAllCardPrototype) return document.createElement('div');
  return postAllCardPrototype.cloneNode(true);
}
