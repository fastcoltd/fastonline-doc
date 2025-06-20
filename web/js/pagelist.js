// 商品数据管理
class PageList {
    constructor() {
        this.currentPage = 1;
        this.isLoading = false;
        this.hasMore = true;
        this.itemsPerPage = 20;
        this.init();
    }

    init() {
        this.bindEvents();
        this.resetNoMore();
    }

    // 绑定事件
    bindEvents() {
        document.querySelector('.load-more').addEventListener('click', () => {
            this.loadItems(false);
        })
    }

    async reloadItems() {
        console.log('reload list');
        this.currentPage = 1;
        this.isLoading = false;
        this.hasMore = true;
        this.resetNoMore();
        this.loadItems(true);
    }

    // 加载商品数据
    loadItems(reload) {
        if (this.isLoading || !this.hasMore) return;
        this.showLoading(true);
        if (reload) {
            window.reloadItems();
            return
        }
        window.loadItems();
    }

    // 显示加载状态
    showLoading(show) {
        this.isLoading = show;
        const loading = document.querySelector('.loading');
        const loadText = document.querySelector('.load-more-text');
        if (show) {
            loading.style.display = 'inline-block';
            loadText.style.display = 'none';
        } else {
            loading.style.display = 'none';
            loadText.style.display = 'inline-block';
        }
    }

    showNoMore() {
        this.hasMore = false;
        const moreBox = document.querySelector('.load-more');
        moreBox.style.display = 'none';
    }

    resetNoMore() {
        this.hasMore = true;
        const moreBox = document.querySelector('.load-more');
        moreBox.style.display = 'iload-more';
    }
}