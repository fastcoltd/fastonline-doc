const list = new PageList();
const searchTabCardClassMap = {
    items: 'item-all-card',
    campaigns: 'compaign-all-card',
    posts: 'post-all-card',
    store: 'store-all-card',
    demands: 'demand-all-card'
};
const searchTabTypeOrder = ['items', 'campaigns', 'posts', 'store', 'demands'];
const searchInitialCardTemplates = {};
let selectedSearchType = 'all';
let lastSearchLoadMoreTime = 0;

function getSearchContainer() {
    return document.querySelector('.search-list-container');
}

function getSearchResultCards() {
    const container = getSearchContainer();
    if (!container) {
        return [];
    }

    return Array.from(container.children).filter((child) => getSearchCardType(child));
}

function getSearchCardType(card) {
    return searchTabTypeOrder.find((type) => card.classList.contains(searchTabCardClassMap[type]));
}

function collectSearchInitialCardTemplates() {
    getSearchResultCards().forEach((card) => {
        const type = getSearchCardType(card);
        if (type && !searchInitialCardTemplates[type]) {
            searchInitialCardTemplates[type] = card.cloneNode(true);
        }
    });
}

function createSearchResultCard(type) {
    const template = searchInitialCardTemplates[type];
    if (!template) {
        return null;
    }

    const card = template.cloneNode(true);
    card.style.display = '';
    return card;
}

function appendSearchResultsPage(type) {
    const container = getSearchContainer();
    if (!container) {
        return;
    }

    const targetTypes = type === 'all' ? searchTabTypeOrder : [type];
    const fragment = document.createDocumentFragment();

    targetTypes.forEach((targetType) => {
        const card = createSearchResultCard(targetType);
        if (card) {
            fragment.appendChild(card);
        }
    });

    if (!fragment.childNodes.length) {
        return;
    }

    const noData = container.querySelector('.no-data-wrapper');
    container.insertBefore(fragment, noData || null);
    lastSearchLoadMoreTime = Date.now();
    filterSearchCardsByType(type);
}

function resetSearchResults() {
    const container = getSearchContainer();
    if (!container) {
        return;
    }

    getSearchResultCards().forEach((card) => card.remove());

    const fragment = document.createDocumentFragment();
    searchTabTypeOrder.forEach((type) => {
        const card = createSearchResultCard(type);
        if (card) {
            fragment.appendChild(card);
        }
    });

    const noData = container.querySelector('.no-data-wrapper');
    container.insertBefore(fragment, noData || null);
    filterSearchCardsByType(selectedSearchType);
}

// 加载搜索结果
async function loadItems() {
    console.log('load items');
    try {
        appendSearchResultsPage(selectedSearchType);
    } catch (error) {
        console.error('加载商品失败:', error);
    } finally {
        list.showLoading(false);
    }
}

function reloadItems() {
    console.log('reload items');
    resetSearchResults();
    list.showLoading(false);
}

function sortItems(value) {
    console.log('sort items', value);
}

function updateSearchNoDataState() {
    const noData = document.querySelector('.search-list-container .no-data-wrapper');
    if (noData) {
        noData.style.display = '';
    }
}

function filterSearchCardsByType(type) {
    const targetClass = searchTabCardClassMap[type];

    getSearchResultCards().forEach((card) => {
        const shouldShow = type === 'all' || (targetClass && card.classList.contains(targetClass));
        card.style.display = shouldShow ? '' : 'none';
    });

    updateSearchNoDataState();
}

function bindSearchTagRandomJump() {
    const container = getSearchContainer();
    if (!container) {
        return;
    }

    container.addEventListener('click', function (event) {
        const clickedTag = event.target.closest(
            '.item-all-card nav a, .compaign-all-card nav a, .post-all-card nav a, .store-all-card nav a, .demand-all-card nav a'
        );
        if (!clickedTag || !container.contains(clickedTag)) {
            return;
        }

        if (!window.matchMedia('(max-width: 768px)').matches) {
            return;
        }

        event.preventDefault();
        const targetPage = Math.random() < 0.5 ? 'attribute-all.html' : 'tag-all.html';
        window.location.href = targetPage;
    });
}

function initializeSearchLayouts() {
    const container = getSearchContainer();
    if (!container) {
        return;
    }

    window.searchItemLayout = new PageLayout(container, null);
    window.searchItemLayout.switchLayout('horizontal');

    window.searchCompaignLayout = new CompaignAllLayout(container, null);
    window.searchCompaignLayout.switchLayout('horizontal');

    window.searchPostLayout = new PostAllLayout(container);

    window.searchStoreLayout = new StoreAllLayout(container, null);
    window.searchStoreLayout.switchLayout('horizontal');

    window.searchDemandLayout = new DemandAllLayout(container, null);
    window.searchDemandLayout.switchLayout('horizontal');
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
    loadItems();
};

pagination.onPageSizeChange = (page, pageSize) => {
    console.log(`页面大小变化: 第${page}页, 每页${pageSize}条`);
    reloadItems();
};

$(document).ready(function () {
    const $pageLinks = $('.page-link');

    initializeSearchLayouts();
    collectSearchInitialCardTemplates();
    selectedSearchType = $('.page-link.active').attr('data-key') || 'all';

    $pageLinks.on('click', function () {
        selectedSearchType = $(this).attr('data-key');
        $pageLinks.removeClass('active');
        $(this).addClass('active');
        filterSearchCardsByType(selectedSearchType);
    });

    $('#load-more').on('click.searchAll', function () {
        if (Date.now() - lastSearchLoadMoreTime < 100) {
            return;
        }

        loadItems();
    });

    filterSearchCardsByType(selectedSearchType);
    bindSearchTagRandomJump();
});
