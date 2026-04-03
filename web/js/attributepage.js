
// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
  let pageType = "best-items-item";
  let pageList = null;
  let attributeValue = null;
  const attributes = document.querySelectorAll(".tag-page-header-desc-tag-item");
  const brandPageIndexs = document.querySelectorAll(".page-link");

  function syncItemAllBestItemsClass() {
    document.querySelectorAll('#best-items-item #items-grid > .best-items-item').forEach(item => {
      item.classList.add('item-all-best-items-item');
    });
  }

  function getActiveItemPager() {
    const $activePager = $('#best-items-item .items-container[data-layout].is-active .item-all-items-pager');
    if ($activePager.length > 0) {
      return $activePager.first();
    }
    const $defaultPager = $('#best-items-item .item-all-items-pager');
    if ($defaultPager.length > 0) {
      return $defaultPager.first();
    }
    return $('#best-items-item .items-pager').first();
  }

  // 初始化 - 设置第一个链接为激活状态
  if (brandPageIndexs.length > 0) {
    brandPageIndexs[0].classList.add('active');
    pageType = brandPageIndexs[0].id;
    changePageType(pageType);
  }
  syncItemAllBestItemsClass();

  if (attributes.length > 0) {
    attributes[0].classList.add('active');
    attributeValue = attributes[0].textContent;
  }

  // 点击导航链接事件
  brandPageIndexs.forEach(function (item) {
    item.addEventListener("click", function (e) {
      e.stopPropagation();
      brandPageIndexs.forEach(item => item.classList.remove('active'));
      e.currentTarget.classList.add('active');
      pageType = e.currentTarget.id;
      changePageType(pageType);
    });
  });

  attributes.forEach(function (item) {
    item.addEventListener("click", function (e) {
      e.stopPropagation();
      attributes.forEach(item => item.classList.remove('active'));
      e.currentTarget.classList.add('active');
      attributeValue = e.currentTarget.textContent;
      reloadItems();
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
    if (type === 'best-items-item') {
      syncItemAllBestItemsClass();
    }
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
  this.layout = new PageLayout();
  //   this.sort = new SortSelector();
  $('.load-more').on('click', function () {
    let type = $('.page-link.active').attr('data-type');
    let $targetPager = $();
    if (type == 'demand') {
      $targetPager = $('#demand-item .items-pager').first();
    } else {
      $targetPager = getActiveItemPager();
    }
    const htmlStr = $targetPager.html();
    $('.loading').show()
    $('.load-more-text').hide()
    setTimeout(() => {
      $targetPager.append(htmlStr);
      if (type != 'demand') {
        syncItemAllBestItemsClass();
      }
      $('.loading').hide()
      $('.load-more-text').show()
    }, 2000)
  })
});
