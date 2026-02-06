
const list = new PageList();
function sortItems(value) {
    console.log('sort items', value);
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
    list.loadItems();
};

// 页面大小变化回调
pagination.onPageSizeChange = (page, pageSize) => {
    console.log(`页面大小变化: 第${page}页, 每页${pageSize}条`);
    list.reloadItems();
};

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    this.layout = new PageLayout();
    //   this.sort = new SortSelector();
    $('.load-more').on('click', function () {
        let htmlStr = $('.item-all-items-pager').html()
        $('.loading').show()
        setTimeout(() => {
            $('.item-all-items-pager').append(htmlStr)
            $('.loading').hide()
        }, 2000)
    })
});