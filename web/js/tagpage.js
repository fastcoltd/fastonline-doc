
// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
  let pageType = 'best-items-item';
  let pageList = null;
  const brandPageIndexs = document.querySelectorAll('.page-link');

  const pagerMap = {
    'best-items-item': '#items-grid',
    'store-item': '#store-items-grid',
    'compaign-item': '#compaign-items-grid',
    'post-item': '#post-items-grid'
  };

  const cardSelectorMap = {
    item: '.item-all-card',
    store: '.store-all-card',
    compaign: '.compaign-all-card',
    post: '.post-all-card'
  };

  function getActivePager() {
    const selector = pagerMap[pageType] || '#items-grid';
    return $(selector);
  }

  // 初始化 - 设置第一个链接为激活状态
  if (brandPageIndexs.length > 0) {
    brandPageIndexs[0].classList.add('active');
    pageType = brandPageIndexs[0].id;
    changePageType(pageType);
  }

  // 点击导航链接事件
  brandPageIndexs.forEach(function (item) {
    item.addEventListener('click', function (e) {
      e.stopPropagation();
      brandPageIndexs.forEach(link => link.classList.remove('active'));
      e.currentTarget.classList.add('active');
      pageType = e.currentTarget.id;
      changePageType(pageType);
      if (pageType === 'post-item') {
        $('.layout-controls-box').hide();
      } else {
        $('.layout-controls-box').show();
      }
    });
  });

  function changePageType(type) {
    const allPageList = document.querySelectorAll('.page-list');
    allPageList.forEach(item => {
      const id = item.id;
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

  pagination.onPageChange = (page, pageSize) => {
    console.log(`页面变化: 第${page}页, 每页${pageSize}条`);
  };

  pagination.onPageSizeChange = (page, pageSize) => {
    console.log(`页面大小变化: 第${page}页, 每页${pageSize}条`);
  };

  const layoutSwitchRoot = document.querySelector('.tag-page-function-wrap .page-header-function-box');
  this.itemLayout = new PageLayout(document.getElementById('items-grid'), layoutSwitchRoot);
  this.storeLayout = new StoreAllLayout(document.getElementById('store-items-grid'), layoutSwitchRoot);
  this.compaignLayout = new CompaignAllLayout(document.getElementById('compaign-items-grid'), layoutSwitchRoot);
  this.postLayout = new PostAllLayout(document.getElementById('post-items-grid'));

  $('.load-more').on('click', function () {
    const type = $('.page-link.active').attr('data-type') || 'item';
    const $targetPager = getActivePager();
    const cardSelector = cardSelectorMap[type] || '.item-all-card';
    const $cards = $targetPager.children(cardSelector);
    $('.loading').show();
    $('.show-more-btn > span').hide();
    setTimeout(() => {
      const $clones = $cards.clone();
      const $emptyState = $targetPager.children('.list-empty-state, .no-data-wrapper').first();
      if ($emptyState.length > 0) {
        $clones.insertBefore($emptyState);
      } else {
        $targetPager.append($clones);
      }
      $('.loading').hide();
      $('.show-more-btn > span').show();
    }, 2000);
  });
});
