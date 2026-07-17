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
  container.querySelectorAll(':scope > :not(.no-data-wrapper)').forEach(function (child) {
    child.remove();
  });
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
    const emptyState = container.querySelector(':scope > .no-data-wrapper');
    if (emptyState) {
      container.insertBefore(itemElement, emptyState);
    } else {
      container.appendChild(itemElement);
    }
  });
}

let storeCardPrototype = null;

// 创建 Store 元素：克隆统一 partial 生成的 DOM，不在 JavaScript 中维护第二份 HTML
function createItemElement(item) {
  const sourceCard = storeCardPrototype || document.querySelector('#items-grid > .store-all-card');
  if (!sourceCard) return document.createElement('article');

  const card = sourceCard.cloneNode(true);
  const rating = Number.parseFloat(item.rating);
  const ratingText = Number.isFinite(rating) ? rating.toFixed(1) : '4.3';
  const reviewText = `(${item.reviews || 200})`;
  const ratingPercent = Number.isFinite(rating) ? `${Math.max(0, Math.min(100, rating / 5 * 100))}%` : '86%';

  const avatar = card.querySelector(':scope > figure > img');
  const title = card.querySelector(':scope > header h2 > a');
  const mark = card.querySelector(':scope > header [data-role="mark"]');
  const ratingFill = card.querySelector('[data-role="rating"] .stars-inner');
  const ratingScores = card.querySelectorAll('[data-role="rating"] p:first-of-type');
  const ratingReviews = card.querySelectorAll('[data-role="rating"] p:nth-of-type(2)');
  const brand = card.querySelector('[data-field="brand"] > dd');
  const service = card.querySelector('[data-field="service"] > dd');
  const likeButton = card.querySelector(':scope > .icon-aixin');

  if (avatar && item.image) avatar.src = item.image;
  if (title && item.title) title.textContent = item.title;
  if (mark && item.mark) mark.textContent = item.mark;
  if (ratingFill) ratingFill.style.setProperty('--star-fill', ratingPercent);
  ratingScores.forEach(node => { node.textContent = ratingText; });
  ratingReviews.forEach(node => { node.textContent = reviewText; });
  if (brand && item.brand) brand.textContent = item.brand;
  if (service && item.service) service.textContent = item.service;
  if (likeButton) {
    const isLiked = Boolean(item.isLiked);
    likeButton.dataset.like = isLiked ? '1' : '0';
    likeButton.setAttribute('aria-pressed', String(isLiked));
    likeButton.src = isLiked ? 'image/Vector_sel.png' : 'image/Vector_nor.svg';
  }

  return card;
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
};

// 页面大小变化回调
pagination.onPageSizeChange = (page, pageSize) => {
  console.log(`页面大小变化: 第${page}页, 每页${pageSize}条`);
};

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
  const firstStoreCard = document.querySelector('#items-grid > .store-all-card');
  storeCardPrototype = firstStoreCard ? firstStoreCard.cloneNode(true) : null;
  window.storeAllLayout = new StoreAllLayout();
  // this.sort = new SortSelector();
  $('.load-more').on('click', function () {
      const $targetPager = $('.store-all-unified-items-pager').first();
      const clonedCards = $targetPager.children('.store-all-card').clone().get();
      $('.loading').show()
      setTimeout(() => {
          const $emptyState = $targetPager.children('.no-data-wrapper').first();
          if ($emptyState.length) {
              clonedCards.forEach(card => $emptyState.before(card));
          } else {
              clonedCards.forEach(card => $targetPager.append(card));
          }
          $('.loading').hide()
      }, 2000)
  })
});
