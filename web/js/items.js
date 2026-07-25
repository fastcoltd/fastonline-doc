
const list = new PageList();
const itemCardsRoot = document.getElementById('items-grid');
const initialItemCards = itemCardsRoot
    ? Array.from(itemCardsRoot.querySelectorAll(':scope > .item-all-card')).map(card => card.cloneNode(true))
    : [];
let isAppendingItems = false;

function setItemsLoading(show) {
    const loadMore = document.getElementById('load-more');
    if (!loadMore) return;
    const loading = loadMore.querySelector('.loading');
    const label = loadMore.querySelector(':scope > span');
    if (loading) loading.style.display = show ? 'inline-block' : 'none';
    if (label) label.style.display = show ? 'none' : 'inline';
}

function insertItemCards(cards) {
    if (!itemCardsRoot) return;
    const emptyState = itemCardsRoot.querySelector(':scope > .no-data-wrapper');
    cards.forEach(card => itemCardsRoot.insertBefore(card, emptyState));
}

function loadItems() {
    if (!itemCardsRoot || isAppendingItems) return;
    const cards = Array.from(itemCardsRoot.querySelectorAll(':scope > .item-all-card'));
    if (!cards.length) return;

    isAppendingItems = true;
    setItemsLoading(true);
    window.setTimeout(() => {
        insertItemCards(cards.map(card => card.cloneNode(true)));
        isAppendingItems = false;
        setItemsLoading(false);
        list.showLoading(false);
    }, 2000);
}

function reloadItems() {
    if (!itemCardsRoot) return;
    itemCardsRoot.querySelectorAll(':scope > .item-all-card').forEach(card => card.remove());
    insertItemCards(initialItemCards.map(card => card.cloneNode(true)));
    isAppendingItems = false;
    setItemsLoading(false);
    list.showLoading(false);
}

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
    new PageLayout();
    //   this.sort = new SortSelector();
    if (document.body.clientWidth > 768) {
        document.getElementById('load-more')?.addEventListener('click', loadItems);
    }
});
