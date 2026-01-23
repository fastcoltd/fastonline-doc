
// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
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
    let htmlStr = $('.items-pager').html()
    $('.loading').show()
    $('.load-more-text').hide()
    setTimeout(() => {
      $('.items-pager').append(htmlStr)
      $('.loading').hide()
      $('.load-more-text').show()
    }, 2000)
  })
});