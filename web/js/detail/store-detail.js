const stickyHeader = document.getElementById('stickyHeader');
const stickyHeaderHeight = stickyHeader && stickyHeader.classList.contains('page-top-sticky')
    ? stickyHeader.offsetHeight
    : 0;
const pageContent = document.querySelector('.page-content');
const pageFix = document.querySelector('.page-fix-box');
const pageHead = document.querySelector('.page-head');
const pageHeadHeight = pageHead.offsetHeight;
const footer = document.getElementsByTagName('footer')[0];
const footerHeight = footer.offsetHeight;

document.addEventListener('DOMContentLoaded', function () {
    const link = new LinkRef('page-link', 'item-detail-right-group');
    const faqs = document.querySelectorAll('.item-detail-faq-box');
    faqs.forEach(element => {
        const content = element.querySelector('.item-detail-faq-content');
        const title = element.querySelector('.item-detail-faq-title-box');
        const arrow = title.querySelector('.item-detail-faq-title-arrow');
        title.addEventListener('click', function (event) {
            event.preventDefault();
            event.stopPropagation();
            if (content.style.display === 'none') {
                title.classList.toggle('toggle', true);
                content.style.display = 'inline-block';
                arrow.style.transform = 'rotate(180deg)';
            } else {
                title.classList.toggle('toggle', false);
                content.style.display = 'none';
                arrow.style.transform = 'rotate(0deg)';
            }
        })
    });

    const reviews = document.querySelectorAll('.item-detail-review-item');
    reviews.forEach(element => {
        const reviewer = element.querySelector('.item-detail-reiviewer-box');
        const user = reviewer.querySelector('.item-detail-reviewer-user-box')
        const arrow = user.querySelector('.item-detail-reviewer-arrow');
        const content = reviewer.querySelector('.item-detail-reviewer-content');
        user.addEventListener('click', function (event) {
            event.preventDefault();
            event.stopPropagation();
            if (content.style.display === 'none') {
                content.style.display = 'inline-block';
                arrow.style.transform = 'rotate(180deg)';
            } else {
                content.style.display = 'none';
                arrow.style.transform = 'rotate(0deg)';
            }
        });
    });

    const pageLink = document.querySelector('.page-link-box');
    const pageHead = document.querySelector('.page-head');
    const pageHeadHeight = pageHead.offsetHeight;
    // 滚动监听事件
    const handleScroll = debounce(function () {
        adjustLinkPosition();
    }, 10);

    window.addEventListener('scroll', adjustLinkPosition, { passive: true });

    // 页面加载时调整位置
    adjustLinkPosition();

    // 动态调整过滤器位置
    function adjustLinkPosition() {
        const body = document.getElementsByTagName('body')[0];
        const headIsSticky = stickyHeader.classList.contains('is-sticky');
        if (!pageLink) return;
        pageLink.classList.toggle('is-sticky', headIsSticky);
        // 设置过滤器的位置和高度
        if (headIsSticky) {
            // sticky状态：固定定位
            Object.assign(pageLink.style, {
                top: stickyHeaderHeight + 'px',
            });
        } else {
            Object.assign(pageLink.style, {
                top: 0,
            });
        }
    }

    initializeSearch();
    initializeDropdowns();
    initializeValidation();
    initializeOverviewTimeTabs();

    $('.item-detail-review-tool-icon-yes').on('click', function() {
        console.log($(this).parent())
        $(this).parent().toggleClass('has-activate')
    })
    $('.item-detail-review-tool-icon-no').on('click', function() {
        $(this).parent().toggleClass('has-activate')
    })
})

function initializeOverviewTimeTabs() {
    const tabItems = document.querySelectorAll('.overview-header .tabs-container .tab-item');
    if (!tabItems.length) return;

    const setActive = (targetTab) => {
        tabItems.forEach(tab => {
            const isActive = tab === targetTab;
            tab.classList.toggle('active', isActive);
            tab.setAttribute('aria-pressed', isActive ? 'true' : 'false');
        });
    };

    tabItems.forEach(tab => {
        if (!tab.querySelector('.ink-bar')) {
            const inkBar = document.createElement('div');
            inkBar.className = 'ink-bar';
            tab.insertBefore(inkBar, tab.firstChild);
        }
        tab.setAttribute('role', 'button');
        tab.setAttribute('tabindex', '0');
        tab.setAttribute('aria-pressed', tab.classList.contains('active') ? 'true' : 'false');

        tab.addEventListener('click', function () {
            setActive(tab);
        });

        tab.addEventListener('keydown', function (event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                setActive(tab);
            }
        });
    });
}



// 搜索功能
function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const brandInput = document.getElementById('brandInput');
    const tagInput = document.getElementById('tagInput');

    // 搜索按钮点击事件
    searchButton.addEventListener('click', function() {
        performSearch();
    });

    // 搜索框回车事件
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    // 输入框回车事件
    [brandInput, tagInput].forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    });

    // 执行搜索
    function performSearch() {
        const searchTerm = searchInput.value.trim();
        const brand = brandInput.value.trim();
        const tag = tagInput.value.trim();

        const searchParams = {
            title: searchTerm,
            brand: brand,
            tag: tag
        };

        console.log('搜索参数:', searchParams);
    }
}

// 下拉菜单功能
function initializeDropdowns() {
    const dropdowns = [
        {
            trigger: document.getElementById('brandDropdown'),
            list: document.getElementById('brandList'),
            input: document.getElementById('brandInput')
        },
        {
            trigger: document.getElementById('tagDropdown'),
            list: document.getElementById('tagList'),
            input: document.getElementById('tagInput')
        }
    ];

    dropdowns.forEach(dropdown => {
        // 点击下拉箭头
        dropdown.trigger.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // 关闭其他下拉菜单
            dropdowns.forEach(d => {
                if (d !== dropdown) {
                    d.list.classList.remove('show');
                }
            });
            
            // 切换当前下拉菜单
            dropdown.list.classList.toggle('show');
        });

        // 选择下拉项
        const items = dropdown.list.querySelectorAll('.dropdown-item');
        items.forEach(item => {
            item.addEventListener('click', function() {
                dropdown.input.value = this.textContent;
                dropdown.list.classList.remove('show');
            });
        });

        // 输入框获得焦点时显示下拉菜单
        dropdown.input.addEventListener('focus', function() {
            dropdown.list.classList.add('show');
        });

        // 输入时过滤选项
        dropdown.input.addEventListener('input', function() {
            const filter = this.value.toLowerCase();
            const items = dropdown.list.querySelectorAll('.dropdown-item');
            
            items.forEach(item => {
                const text = item.textContent.toLowerCase();
                if (text.includes(filter)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
            
            dropdown.list.classList.add('show');
        });
    });

    // 点击其他地方关闭下拉菜单
    document.addEventListener('click', function() {
        dropdowns.forEach(dropdown => {
            dropdown.list.classList.remove('show');
        });
    });
}

// 输入框验证
function initializeValidation() {
    const inputs = document.querySelectorAll('.input-field, .search-input');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value.trim() && this.value.length < 2) {
                this.style.borderColor = '#dc3545';
            } else {
                this.style.borderColor = '#C5C5C5';
            }
        });

        input.addEventListener('input', function() {
            if (this.style.borderColor === 'rgb(220, 53, 69)') {
                this.style.borderColor = '#C5C5C5';
            }
        });
    });
}

// 清空所有输入框
function clearAllInputs() {
    document.getElementById('searchInput').value = '';
    document.getElementById('brandInput').value = '';
    document.getElementById('tagInput').value = '';
}

// 滚动监听事件：每次滚动立即更新，避免快速滚动时出现“先越过再吸附”的突跳
window.addEventListener('scroll', function () {
    updateStickyHeader();
}, { passive: true });

// 页面加载时调整位置
document.addEventListener('DOMContentLoaded', adjustFilterPosition);

// 防抖函数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 更新sticky header状态
function updateStickyHeader() {
    if (!stickyHeader) return;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const pageLink = document.querySelector('.page-link-box');
    const pageLinkHeight = pageLink ? pageLink.offsetHeight : 0;
    if (scrollTop + pageLinkHeight > pageHeadHeight) {
        stickyHeader.classList.add('is-sticky');
    } else {
        stickyHeader.classList.remove('is-sticky');
    }
    adjustFilterPosition();
}
updateStickyHeader();

// 动态调整过滤器位置
function adjustFilterPosition() {
    const body = document.getElementsByTagName('body')[0];
    const headIsSticky = stickyHeader.classList.contains('is-sticky');
    if (!pageFix) return;
    if (body.offsetWidth < 768) {
        const pageFixVisble = pageFix.dataset.visible;
        if (!pageFixVisble) {
            return;
        }
        if (headIsSticky) {
            Object.assign(pageFix.style, {
                position: 'fixed',
                left: 16 + 'px',
                top: stickyHeaderHeight + 20 + 'px',
                // maxHeight: `calc(100vh - ${stickyHeaderHeight + 40}px)`
            });
            return;
        }
        Object.assign(pageFix.style, {
            position: 'relative',
            left: 0,
            top: 20 + 'px',
            // maxHeight: `calc(100vh - ${stickyHeaderHeight + pageHeadHeight + 40}px)`
        });
        return;
    };
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const pageContentRect = pageContent ? pageContent.getBoundingClientRect() : null;
    const pageContentTopDoc = pageContentRect ? pageContentRect.top + scrollTop : 0;
    const pageContentLeft = pageContentRect ? pageContentRect.left : 0;
    const baseTop = 20;
    const stickyTop = stickyHeaderHeight + baseTop;
    // 仅当左侧模块自然滚动到吸附线时，才切换 fixed，避免“突跳”
    const shouldSticky = headIsSticky && (scrollTop + stickyTop >= pageContentTopDoc + baseTop);

    pageFix.classList.toggle('is-sticky', shouldSticky);

    // 非吸顶状态：保持原始位置，线性随页面滚动
    if (!shouldSticky) {
        const currentTop = pageFix.getBoundingClientRect().top;
        const nonStickyMaxHeight = Math.max(100, window.innerHeight - currentTop - baseTop);
        Object.assign(pageFix.style, {
            position: 'absolute',
            left: '0px',
            transform: 'none',
            top: `${baseTop}px`,
            maxHeight: `${nonStickyMaxHeight}px`
        });
        return;
    }

    // 吸顶状态：顶部吸附，同时在接近 footer 时上推，避免遮挡底部
    let top = stickyTop;
    if (footer) {
        const footerTop = footer.getBoundingClientRect().top + scrollTop;
        const maxTop = footerTop - scrollTop - pageFix.offsetHeight - baseTop;
        if (maxTop < stickyTop) {
            top = maxTop;
        }
    }

    Object.assign(pageFix.style, {
        position: 'fixed',
        left: `${pageContentLeft}px`,
        transform: 'none',
        top: `${top}px`,
        maxHeight: `calc(100vh - ${stickyTop + 20}px)`
    });
}
