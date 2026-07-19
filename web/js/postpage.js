
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
  return Array.from({ length: this.list.itemsPerPage });
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

// 创建商品元素 - 完全按照Figma设计
function createItemElement() {
  const template = document.getElementById('post-all-card-template');
  if (!template) {
    throw new Error('Post card template not found');
  }

  const itemElement = template.content.firstElementChild.cloneNode(true);
  return itemElement;
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
  window.postAllLayout = new PostAllLayout();
  window.list = new PageList();
  // this.sort = new SortSelector();
});
