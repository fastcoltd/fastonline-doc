
// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
  let pageType = "best-items-item";
  let pageList = null;
  let attributeValue = null;
  const attributes = document.querySelectorAll(".tag-page-header-desc-tag-item");
  const brandPageIndexs = document.querySelectorAll(".page-link");

  function getActiveItemPager() {
    return $('#items-grid');
  }

  function getActiveDemandPager() {
    return $('#demand-items-grid');
  }

  // 初始化 - 设置第一个链接为激活状态
  if (brandPageIndexs.length > 0) {
    brandPageIndexs[0].classList.add('active');
    pageType = brandPageIndexs[0].id;
    changePageType(pageType);
  }
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
  const layoutSwitchRoot = document.querySelector('.attribute-header-function-box');
  this.itemLayout = new PageLayout(document.getElementById('items-grid'), layoutSwitchRoot);
  this.demandLayout = new DemandAllLayout(document.getElementById('demand-items-grid'), layoutSwitchRoot);
  //   this.sort = new SortSelector();
  $('.load-more').on('click', function () {
    const type = $('.page-link.active').attr('data-type');
    let $targetPager;
    if (type === 'demand') {
      $targetPager = getActiveDemandPager();
    } else {
      $targetPager = getActiveItemPager();
    }
    const cardSelector = type === 'demand' ? '.demand-all-card' : '.item-all-card';
    const $cards = $targetPager.children(cardSelector);
    $('.loading').show()
    $('.show-more-btn > span').hide()
    setTimeout(() => {
      const $clones = $cards.clone();
      const $emptyState = $targetPager.children('.list-empty-state').first();
      if ($emptyState.length > 0) {
        $clones.insertBefore($emptyState);
      } else {
        $targetPager.append($clones);
      }
      $('.loading').hide()
      $('.show-more-btn > span').show()
    }, 2000)
  })
});
