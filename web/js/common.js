function parseSessionUser() {
    try {
        const raw = sessionStorage.getItem('user');
        if (!raw) {
            return null;
        }
        const sessionUser = JSON.parse(raw);
        if (!sessionUser || typeof sessionUser !== 'object') {
            return null;
        }
        if (sessionUser.id || sessionUser.name || sessionUser.email) {
            return sessionUser;
        }
    } catch (e) {
        return null;
    }
    return null;
}

function getMockLoginUser() {
    return {
        name: 'Erinasa_he',
        email: '80*******@yaho.com',
        avatar: '',
        badgeCount: 2
    };
}

function getCurrentAuthUser() {
    if (window.__forceLoggedOut) {
        return null;
    }
    if (window.user && typeof window.user === 'object') {
        return window.user;
    }
    const sessionUser = parseSessionUser();
    if (sessionUser) {
        return sessionUser;
    }
    if (location.href.indexOf('isLogin') > -1) {
        return getMockLoginUser();
    }
    return null;
}

function getUserDisplayName(currentUser) {
    if (!currentUser || typeof currentUser !== 'object') {
        return 'Erinasa_he';
    }
    if (currentUser.name && typeof currentUser.name === 'string') {
        const trimmedName = currentUser.name.trim();
        if (trimmedName) {
            return trimmedName;
        }
    }
    return 'Erinasa_he';
}

function getUserDisplayEmail(currentUser) {
    if (!currentUser || typeof currentUser !== 'object') {
        return '80*******@yaho.com';
    }
    if (currentUser.email && typeof currentUser.email === 'string') {
        const trimmedEmail = currentUser.email.trim();
        if (trimmedEmail) {
            return trimmedEmail;
        }
    }
    return '80*******@yaho.com';
}

function getAvatarLabel(currentUser) {
    const displayName = getUserDisplayName(currentUser);
    return displayName.charAt(0).toUpperCase() || 'E';
}

document.addEventListener('DOMContentLoaded', function () {
    function applyStarFill(node) {
        if (!node || node.nodeType !== 1 || !node.classList || !node.classList.contains('stars-inner')) {
            return;
        }
        if (node.style.getPropertyValue('--star-fill')) {
            return;
        }
        let fill = '';
        const scoreNode = node.closest('.item-star-box')?.querySelector('.item-star-score');
        const score = parseFloat((scoreNode?.textContent || '').trim());
        if (!Number.isNaN(score)) {
            fill = `${Math.max(0, Math.min(5, score)) / 5 * 100}%`;
        } else {
            const legacyWidth = (node.style.width || '').trim();
            if (legacyWidth && legacyWidth.endsWith('%')) {
                fill = legacyWidth;
            }
        }
        if (fill) {
            node.style.setProperty('--star-fill', fill);
        }
    }

    function initStarFill(root) {
        if (!root || !root.querySelectorAll) {
            return;
        }
        root.querySelectorAll('.stars-inner').forEach(applyStarFill);
        if (root.matches && root.matches('.stars-inner')) {
            applyStarFill(root);
        }
    }

    initStarFill(document);
    const starObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                initStarFill(node);
            });
        });
    });
    starObserver.observe(document.body, { childList: true, subtree: true });

    const body = document.getElementsByTagName('body')[0];
    this.headerSearchMenu = new HeaderMenu('.header-search-box-label', '.header-search-box-label-icon', '.header-search-box-label-text', 'items');
    this.headerResourceMenu = new HeaderMenu('.header-items-label-resource', '.header-items-label-icon', '', '');
    this.headerPostMenu = new HeaderMenu('.header-items-label-post', '.header-items-label-icon', '', 'Blog');
    this.headerSearchMenuForMobile = new HeaderMenu('.header-search-mobile-box-label', '.header-search-mobile-box-label-icon', '.header-search-mobile-box-label-text', 'items')
    refreshHeaderUserUI();

    function setHomeMenuSectionDisplay(sectionBox, shouldOpen) {
        const titleArrow = sectionBox.querySelector('.home-menu-item-title-arrow');
        const titleContent = sectionBox.querySelector('.home-menu-item-content');
        if (!titleContent) {
            return;
        }
        titleContent.style.display = shouldOpen ? 'flex' : 'none';
        if (titleArrow) {
            titleArrow.style.transform = shouldOpen ? 'rotate(180deg)' : 'rotate(0deg)';
        }
    }

    function ensureMobileMenuExtraPostsRow(homeMenuRoot) {
        if (homeMenuRoot.querySelector('.home-menu-item-title-box-mobile-extra-posts')) {
            return;
        }
        const sellerTextNode = homeMenuRoot.querySelector('.home-menu-seller-text');
        if (!sellerTextNode) {
            return;
        }
        const extraPostsTitleBox = document.createElement('div');
        extraPostsTitleBox.className = 'home-menu-item-title-box home-menu-item-title-box-mobile-extra-posts';
        extraPostsTitleBox.innerHTML = `
            <div class="home-menu-item-title-content">
                <p class="home-menu-item-title">Posts</p>
                <img class="home-menu-item-title-arrow" src="image/more-arrow.png" />
            </div>
        `;
        sellerTextNode.insertAdjacentElement('afterend', extraPostsTitleBox);
    }

    function ensureHomeMenuAvatarLetterNode(homeMenuUserEle) {
        let avatarLetterNode = homeMenuUserEle.querySelector('.home-menu-user-avatar-letter');
        if (avatarLetterNode) {
            return avatarLetterNode;
        }
        avatarLetterNode = document.createElement('div');
        avatarLetterNode.className = 'home-menu-user-avatar-letter';
        const userInfoBox = homeMenuUserEle.querySelector('.home-menu-user-info-box');
        if (userInfoBox) {
            homeMenuUserEle.insertBefore(avatarLetterNode, userInfoBox);
        } else {
            homeMenuUserEle.appendChild(avatarLetterNode);
        }
        return avatarLetterNode;
    }

    function normalizeHomeMenuForMobile(homeMenuRoot, isAuthenticated) {
        if (window.innerWidth > 768) {
            return;
        }
        const joinTextNode = homeMenuRoot.querySelector('.home-menu-login-text');
        if (joinTextNode) {
            joinTextNode.textContent = 'Join Fastresp';
        }

        const firstMenuTitleNode = homeMenuRoot.querySelector('.home-menu-item-title');
        if (firstMenuTitleNode && firstMenuTitleNode.textContent.trim() !== 'Browse categories' && firstMenuTitleNode.textContent.trim() !== 'Browse services') {
            firstMenuTitleNode.textContent = isAuthenticated ? 'Browse categories' : 'Browse services';
        } else if (firstMenuTitleNode) {
            firstMenuTitleNode.textContent = isAuthenticated ? 'Browse categories' : 'Browse services';
        }

        ensureMobileMenuExtraPostsRow(homeMenuRoot);
        const homeMenuTitleBoxes = homeMenuRoot.querySelectorAll('.home-menu-item-title-box');
        for (let i = 0; i < homeMenuTitleBoxes.length; i++) {
            const titleBox = homeMenuTitleBoxes[i];
            const titleArrow = titleBox.querySelector('.home-menu-item-title-arrow');
            const titleContent = titleBox.querySelector('.home-menu-item-content');
            if (titleContent) {
                titleContent.style.display = 'none';
            }
            if (titleArrow) {
                titleArrow.style.transform = 'rotate(0deg)';
            }
        }
    }

    const homeMenuPage = document.querySelector('.home-menu-page');
    const headerMenu = document.querySelector('.header-menu-box');
    const homeMenuBack = homeMenuPage.querySelector('.home-menu-back');
    const homeMenuTitles = homeMenuPage.querySelectorAll('.home-menu-item-title-box');
    headerMenu.addEventListener('click', function () {
        const currentUser = getCurrentAuthUser();
        homeMenuPage.style.display = 'flex';
        homeMenuPage.style.width = '100vw';
        body.classList.toggle('modal-open', true);
        const homeMenuUserEle = homeMenuPage.querySelector('.home-menu-user-box');
        const homeMenuRegistEle = homeMenuPage.querySelector('.home-menu-login-box');
        const homeMenuLgoinEle = homeMenuPage.querySelector('.home-menu-signin-text');
        const homeMenuUserLine = homeMenuPage.querySelector('.home-menu-seperate-line');
        normalizeHomeMenuForMobile(homeMenuPage, !!currentUser);
        homeMenuLgoinEle.onclick = function (e) {
            showSigninFn();
        };
        homeMenuRegistEle.onclick = function (e) {
            showJoinFn();
        };
        const homeMenuLogoutEle = homeMenuUserEle.querySelector('.home-menu-user-logout');
        homeMenuLogoutEle.onclick = function (e) {
            window.user = null;
            window.__forceLoggedOut = true;
            try {
                sessionStorage.removeItem('user');
            } catch (error) {}
            dismissHomeMenuPage();
            refreshHeaderUserUI();
        };
        if (currentUser) {
            homeMenuRegistEle.style.display = 'none';
            homeMenuLgoinEle.style.display = 'none';
            homeMenuUserEle.style.display = 'flex';
            homeMenuUserLine.style.display = '';
            const homeMenuUserIconEle = homeMenuUserEle.querySelector('.home-menu-user-icon');
            const homeMenuAvatarLetterEle = ensureHomeMenuAvatarLetterNode(homeMenuUserEle);
            homeMenuAvatarLetterEle.textContent = getAvatarLabel(currentUser);
            homeMenuAvatarLetterEle.style.display = 'flex';
            if (homeMenuUserIconEle) {
                homeMenuUserIconEle.style.display = 'none';
                homeMenuUserIconEle.removeAttribute('src');
            }
            const homeMenuUserNameEle = homeMenuUserEle.querySelector('.home-menu-user-name');
            homeMenuUserNameEle.textContent = getUserDisplayName(currentUser);
            const homeMenuUserEmailEle = homeMenuUserEle.querySelector('.home-menu-user-email');
            homeMenuUserEmailEle.textContent = getUserDisplayEmail(currentUser);
        } else {
            homeMenuRegistEle.style.display = '';
            homeMenuLgoinEle.style.display = '';
            homeMenuUserEle.style.display = 'none';
            homeMenuUserLine.style.display = 'none';
        }
    })
    homeMenuBack.addEventListener('click', function (e) {
        dismissHomeMenuPage()
    })
    for (let i = 0; i < homeMenuTitles.length; i++) {
        const title = homeMenuTitles[i];
        title.addEventListener('click', function (e) {
            const titleContent = e.currentTarget.querySelector('.home-menu-item-content');
            if (!titleContent) {
                return
            }
            const itemContentList = titleContent.querySelectorAll('.home-menu-item-content-item')
            for (let j = 0; j < itemContentList.length; j++) {
                const item = itemContentList[j];
                if (item.dataset.mobileMenuEventBound === '1') {
                    continue;
                }
                item.dataset.mobileMenuEventBound = '1';
                item.addEventListener('click', function (e) {
                    e.stopPropagation();
                    const ele = e.currentTarget;
                    if (!ele.querySelector('.home-menu-second-page')) { return }
                    const homeMenusecondPage = ele.querySelector('.home-menu-second-page');
                    homeMenusecondPage.style.display = 'flex';
                    const homeMenuSeconPageTitleBoxEle = homeMenusecondPage.querySelector('.home-menu-second-page-title-box');
                    homeMenuSeconPageTitleBoxEle.onclick = function (e) {
                        e.preventDefault();
                        e.stopPropagation();
                        homeMenusecondPage.style.display = 'none';
                    };
                });
            }
            const isTitleContentHidden = titleContent.style.display === 'none' || window.getComputedStyle(titleContent).display === 'none';
            setHomeMenuSectionDisplay(e.currentTarget, isTitleContentHidden);
        })
    }

    const footerContent = document.querySelector('.footer-content');
    if (footerContent) {
        const footerItems = footerContent.querySelectorAll('.footer-item-content');
        footerItems.forEach(item => {
            const itemTitleBox = item.querySelector('.footer-item-title-box');
            const itemTitleIcon = itemTitleBox.querySelector('.footer-item-title-icon');
            const itemTitleIconStyle = window.getComputedStyle(itemTitleIcon);
            if (itemTitleIconStyle.display === 'none') {
                return;
            }
            const itemDescBox = item.querySelector('.footer-item-desc-box');
            const defaultOpen = item.classList.contains('footer-item-content-open');
            item.classList.toggle('is-open', defaultOpen);
            itemDescBox.style.display = defaultOpen ? 'flex' : 'none';
            itemTitleBox.addEventListener('click', function (e) {
                e.stopPropagation();
                const isOpen = item.classList.contains('is-open');
                item.classList.toggle('is-open', !isOpen);
                itemDescBox.style.display = isOpen ? 'none' : 'flex';
            });
        });
    }
})

class HeaderMenu {
    constructor(domId, imgId, labId, defaultValue) {
        this.menuButton = document.querySelector(domId);
        if (!this.menuButton) {
            this.menuArrow = null;
            this.menuLabel = null;
            this.menuContainer = null;
            this.menuItems = [];
            this.selectedValue = defaultValue;
            this.selectedText = '';
            this.headerMenuTimer = null;
            return;
        }
        this.menuArrow = this.menuButton.querySelector(imgId);
        if (labId && labId.length > 0) {
            this.menuLabel = this.menuButton.querySelector(labId);
        }

        this.menuContainer = this.menuButton.querySelector('.header-menu-container');
        this.menuItems = this.menuButton.querySelectorAll('.header-menu-item');
        this.init();
        this.setDefaultSelection(defaultValue);
        this.headerMenuTimer = null;
    }

    init() {
        this.menuButton.addEventListener('click', () => {
            const menuContainerStyle = window.getComputedStyle(this.menuContainer);
            if (menuContainerStyle.display !== 'none') {
                this.dimissMenuContainer();
                return
            }
            this.showMenuContainer();
        });

        // 绑定排序项点击事件
        this.menuItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                const value = item.dataset.value;
                const text = item.querySelector('.title').textContent;
                this.selectOption(value, text);
            });
        });

        this.menuButton.addEventListener('mouseleave', (e) => {
            e.stopPropagation();
            if (this.menuContainer.contains(e.target) || this.menuButton.contains(e.target)) {
                this.headerMenuTimer = setTimeout(() => {
                    this.dimissMenuContainer();
                }, 200)
            }
        })

        this.menuButton.addEventListener('mouseenter', (e) => {
            e.stopPropagation();
            if (this.menuContainer === e.currentTarget || this.menuButton === e.currentTarget) {
                this.headerMenuTimer && clearTimeout(this.headerMenuTimer)
                this.showMenuContainer();
            }
        })
    }

    showMenuContainer() {
        const rect = this.menuButton.getBoundingClientRect()
        this.menuContainer.style.display = 'block';
        this.menuContainer.style.left = 0;
        this.menuContainer.style.top = rect.height + 'px';
        this.menuArrow.style.transform = 'rotate(180deg)';
        if (this.menuButton.classList.contains('header-items-label')) {
            this.menuButton.style.backgroundColor = '#f4f4f4';
            this.menuButton.style.borderRadius = '0.5rem';
        }
    }

    dimissMenuContainer() {
        this.menuContainer.style.display = 'none';
        this.menuArrow.style.transform = 'rotate(0deg)';
        if (this.menuButton.classList.contains('header-items-label')) {
            this.menuButton.style.backgroundColor = '#fff';
            this.menuButton.style.borderRadius = '0';
        }
    }

    selectOption(value, text) {
        this.selectedValue = value;
        this.selectedText = text;
        // 更新选中状态
        this.updateSelectedState(value);
        if (this.menuLabel) {
            this.menuLabel.textContent = text;
        }

        this.dimissMenuContainer();

        console.log(`header search menu 选中: ${text}, 值: ${value}`);
    }

    updateSelectedState(selectedValue) {
        // 清除所有选中状态
        this.menuItems.forEach(item => {
            item.classList.remove('selected');
        });

        // 设置当前选中状态
        const selectedItem = this.menuContainer.querySelector(`[data-value="${selectedValue}"]`);
        if (selectedItem) {
            selectedItem.classList.add('selected');
        }
    }

    setDefaultSelection(defaultValue) {
        this.selectedValue = defaultValue;
        this.selectedText = defaultValue;
        this.updateSelectedState(defaultValue);
    }
}
function dismissHomeMenuPage() {
    const body = document.getElementsByTagName('body')[0];
    const homeMenuPage = document.querySelector('.home-menu-page');
    homeMenuPage.style.width = '0';
    homeMenuPage.style.display = 'none';
    body.classList.toggle('modal-open', false);
}

function syncHeaderAvatarBadge(headerUser, isAuthenticated, currentUser) {
    const avatarItem = headerUser.querySelector('.item-avatar');
    if (!avatarItem) {
        return;
    }
    let avatarBadge = avatarItem.querySelector('.header-avatar-badge');
    if (!avatarBadge) {
        avatarBadge = document.createElement('span');
        avatarBadge.className = 'header-avatar-badge';
        avatarItem.appendChild(avatarBadge);
    }
    if (!isAuthenticated) {
        avatarBadge.style.display = 'none';
        return;
    }
    const badgeCount = currentUser && typeof currentUser === 'object' && Number.isFinite(Number(currentUser.badgeCount))
        ? Number(currentUser.badgeCount)
        : 2;
    avatarBadge.textContent = `${badgeCount}`;
    avatarBadge.style.display = '';
}

function refreshHeaderUserUI() {
    const currentUser = getCurrentAuthUser();
    const isAuthenticated = !!currentUser;
    const signinButtonEle = document.getElementById('header-signin');
    const headerJoinButton = document.getElementById('header-join');
    const headerUser = document.getElementById('header-user');
    if (!signinButtonEle || !headerJoinButton || !headerUser) {
        return;
    }
    document.body.classList.toggle('is-authenticated', isAuthenticated);
    signinButtonEle.style.display = isAuthenticated ? 'none' : '';
    headerJoinButton.style.display = isAuthenticated ? 'none' : '';
    headerUser.style.display = isAuthenticated ? '' : 'none';

    const badgeEle = headerUser.querySelector('.badge');
    if (badgeEle) {
        badgeEle.textContent = '20';
    }
    syncHeaderAvatarBadge(headerUser, isAuthenticated, currentUser);

    if (isAuthenticated) {
        const avatarTextEle = headerUser.querySelector('.header-user-avatar-box');
        const avatarImageEle = headerUser.querySelector('.header-user-icon');
        const avatarLabel = getAvatarLabel(currentUser);
        if (avatarTextEle) {
            avatarTextEle.textContent = avatarLabel;
            avatarTextEle.style.display = 'flex';
        }
        if (avatarImageEle) {
            avatarImageEle.style.display = 'none';
        }
    } else {
        window.__forceLoggedOut = false;
    }
}
function setSearchData() {
    if (!window.Qs) {
        return
    }
    let params = Qs.parse(location.href.split('?')[1])
    console.log(params, '999')
    $('.header-search-box-label-text, .header-search-mobile-box-label-text').text(params.type)
    $('.header-search-mobile-box-input-box-input, .header-search-box-input-box-input').val(params.q)
}
function handleEnterFn(e) {
    if (e.key == 'Enter') {
        let input = e.target
        let type = $('.header-search-box-label-text').text()
        window.open(`search-all.html?q=${input.value.trim()}&type=${type}`, '_self')
    }
}
function handleSearchFn(e) {
    let input = e.target.previousElementSibling
    let type = $('.header-search-box-label-text').text()
    window.open(`search-all.html?q=${input.value.trim()}&type=${type}`, '_self')
}
function searchAction(params) {
    console.log(params, 'sdf')
}
function linearGradientColor(colorBegin, colorEnd, config = {}) {
    let otherInfo = {
        startOffset: 0,
        endOffset: 1,
        durationInfo: [0, 0, 0, 1]
    }
    if (config.startOffset) {
        otherInfo.startOffset = config.startOffset
    }
    if (config.endOffset) {
        otherInfo.endOffset = config.endOffset
    }
    if (config.durationInfo) {
        otherInfo.durationInfo = config.durationInfo
    }
    return new echarts.graphic.LinearGradient(...otherInfo.durationInfo, [
        {
            offset: otherInfo.startOffset,
            color: colorBegin
        },
        {
            offset: otherInfo.endOffset,
            color: colorEnd
        }
    ])
}
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
}
$(document).ready(function () {
    $('.registere-btn').on('click', function () {
        let postData = {
            firstName: $('#firstname').val(),
            lastName: $('#lastname').val(),
            account: $('.regist-account-input').val(),
            password: $('.regist-account-password').val(),
            country: $('.language-gmt-country-content .filter-custom-select[data-type="countryList"]').attr('data-value'),
            agree1: $('#agree1').prop('checked'),
            agree2: $('#agree2').prop('checked')
        }
        console.log(postData, '00000')
    })
    let optionsMap = {
        switchLanguage: [
            { value: 'china', text: 'China' },
            { value: 'english', text: 'English' }
        ],
        switchGmt: [
            {
                value: 'GMT+1',
                text: 'GMT+1'
            },
            {
                value: 'GMT+2',
                text: 'GMT+2'
            },
            {
                value: 'GMT+3',
                text: 'GMT+3'
            },
            {
                value: 'GMT+4',
                text: 'GMT+4'
            },
            {
                value: 'GMT+5',
                text: 'GMT+5'
            },
            {
                value: 'GMT+6',
                text: 'GMT+6'
            },
            {
                value: 'GMT+7',
                text: 'GMT+7'
            },
            {
                value: 'GMT+8',
                text: 'GMT+8'
            },
            ,
            {
                value: 'GMT+9',
                text: 'GMT+9'
            }
        ],
        switchCurrency: [
            {
                value: 'BMD',
                text: 'BMD'
            },
            {
                value: 'RMB',
                text: 'RMB'
            }
        ]
    }
    $('.language-gmt-country-content .filter-custom-select').each(function () {
        // 生成下拉内容
        generateDropdownHtml($(this));
        let that = this
        $(that).on('click', '.filter-dropdown-item', function (e) {
            e.stopPropagation();
            let value = $(e.target).data('value')
            let text = $(e.target).text()
            let switchType = $(that).attr('data-type')
            $(that).attr('data-value', value)
            $(that).find('.filter-custom-select-text').text(text)
            $(that).toggleClass('active')
            if (switchType == 'switchLanguage') {
                $('.language-btn').text(text)
                console.log('语言已经切换成：', value)
            } else if (switchType == 'switchGmt') {
                $('.gmt-btn').text(text)
                console.log('时区已经切换成：', value)
            } else if (switchType == 'switchCurrency') {
                $('.currency-btn').text(text)
                console.log('币种已经切换成：', value)
            }
            $('.language-gmt-country-close-btn').trigger('click')
        })
        $(that).on('click', function () {
            $(this).toggleClass('active')
        })
    })
    $('.language-btn').on('click', function () {
        $('.language-gmt-country-mask').css({
            display: 'flex'
        })
        $('.filter-custom-select').hide()
        $('.filter-custom-select[data-type="switchLanguage"]').show()
        $('.language-gmt-country-content .filter-custom-select').removeClass('active')
    })
    $('.gmt-btn').on('click', function () {
        $('.language-gmt-country-mask').css({
            display: 'flex'
        })
        $('.filter-custom-select').hide()
        $('.filter-custom-select[data-type="switchGmt"]').show()
        $('.language-gmt-country-content .filter-custom-select').removeClass('active')
    })
    $('.currency-btn').on('click', function () {
        $('.language-gmt-country-mask').css({
            display: 'flex'
        })
        $('.filter-custom-select').hide()
        $('.filter-custom-select[data-type="switchCurrency"]').show()
        $('.language-gmt-country-content .filter-custom-select').removeClass('active')
    })
    $('.language-gmt-country-close-btn').on('click', function () {
        $('.language-gmt-country-mask').css({
            display: 'none'
        })
        $('.filter-custom-select').hide()
    })
    function generateDropdownHtml(item) {
        let options = optionsMap[item.attr('data-type')]
        let htmlStr = ''
        if (options && options.length) {
            options.forEach(function (option) {
                htmlStr += `<div class="filter-dropdown-item" data-value="${option.value}"><span
            class="filter-dropdown-item-text" data-value="${option.value}">${option.text}</span></div>`
            })
            item.find('.filter-dropdown-content').html(htmlStr)
        }
    }

    setSearchData()
    $('.scroll-to-top').on('click', function () {
        scrollToTop()
    })
    $('.kefu-icon').on('click', function () {
        alert('你好，客服为您服务')
    })
    const AIXIN_NORMAL_SRC = 'image/Vector_nor.svg'
    const AIXIN_SELECTED_SRC = 'image/Vector_sel.png'

    function syncAixinState($icon) {
        const like = Number($icon.data('like')) === 1
        $icon.attr('aria-pressed', like ? 'true' : 'false')
        if ($icon.is('img')) {
            $icon.attr('src', like ? AIXIN_SELECTED_SRC : AIXIN_NORMAL_SRC)
            return
        }
        $icon.css({ color: like ? '#FF1B20' : '#C5C5C5' })
    }

    $('body').on('click', '.icon-aixin', function () {
        const $icon = $(this)
        const like = Number($icon.data('like')) === 1
        $icon.data('like', like ? 0 : 1)
        syncAixinState($icon)
    })
    const $centerWrapper = $('.center-wrapper');
    const $headerAvatarTrigger = $('.header-avatar');
    let centerWrapperHideTimer = null;
    const centerWrapperStoreIconMap = {
        'shop center': 'image/account-center-mobile/store-shop-center.svg',
        'shop orders': 'image/account-center-mobile/store-shop-orders.svg',
        'shop messages': 'image/account-center-mobile/store-shop-messages.svg',
        'product management': 'image/account-center-mobile/store-product-management.svg',
        'inventory management': 'image/account-center-mobile/store-inventory-management.svg',
        'product faq': 'image/account-center-mobile/store-product-faq.svg',
        'withdrawal management': 'image/account-center-mobile/store-withdrawal-management.svg',
        'order log': 'image/account-center-mobile/store-order-log.svg',
        'fund records': 'image/account-center-mobile/store-fund-records.svg',
        'shop staff': 'image/account-center-mobile/store-shop-staff.svg',
        'shop kyc': 'image/account-center-mobile/store-shop-kyc.svg',
        'shop log': 'image/account-center-mobile/store-shop-log.svg',
        'shop information': 'image/account-center-mobile/store-shop-information.svg',
        'wallet management': 'image/account-center-mobile/store-wallet-management.svg',
        'blog settings': 'image/account-center-mobile/store-blog-settings.svg',
        'article classification': 'image/account-center-mobile/store-article-classification.svg',
        'article management': 'image/account-center-mobile/store-article-management.svg'
    };
    const centerWrapperMemberIconMap = {
        'my order': 'image/account-center-mobile/member-my-order.svg',
        'my demand': 'image/account-center-mobile/member-my-demand.svg',
        'my message': 'image/account-center-mobile/member-my-message.svg',
        'fund record': 'image/account-center-mobile/member-fund-record.svg',
        'my favorites': 'image/account-center-mobile/member-my-favorites.svg',
        'my subscription': 'image/account-center-mobile/member-my-subscription.svg',
        'my comments': 'image/account-center-mobile/member-my-comments.svg',
        'account log': 'image/account-center-mobile/member-account-log.svg',
        'personal informati': 'image/account-center-mobile/member-personal-information.svg',
        'account settings': 'image/account-center-mobile/member-account-settings.svg'
    };

    function normalizeCenterWrapperName(name) {
        return (name || '').toLowerCase().replace(/\s+/g, ' ').trim();
    }

    function applyCenterWrapperIcons() {
        if (!$centerWrapper.length) {
            return;
        }
        $centerWrapper.find('.store-center .store-center-li').each(function () {
            const $item = $(this);
            const itemName = normalizeCenterWrapperName($item.find('.name').text());
            const iconSrc = centerWrapperStoreIconMap[itemName];
            if (iconSrc) {
                $item.find('.icon').attr({
                    src: iconSrc,
                    alt: ''
                });
            }
        });
        $centerWrapper.find('.member-center .member-center-li').each(function () {
            const $item = $(this);
            const itemName = normalizeCenterWrapperName($item.find('.name').text());
            const iconSrc = centerWrapperMemberIconMap[itemName];
            if (iconSrc) {
                $item.find('.icon').attr({
                    src: iconSrc,
                    alt: ''
                });
            }
        });
    }

    applyCenterWrapperIcons();

    function showCenterWrapper() {
        if (centerWrapperHideTimer) {
            clearTimeout(centerWrapperHideTimer);
            centerWrapperHideTimer = null;
        }
        applyCenterWrapperIcons();
        $centerWrapper.find('.account-item-center').removeClass('account-item-center-hide');
        $centerWrapper.find('.account-content-wrapper').scrollTop(0);
        $centerWrapper.find('.store-center .title').text('Store center');
        $centerWrapper.find('.member-center .other-wrapper').each(function () {
            const $otherWrapper = $(this);
            if ($otherWrapper.find('.home-menu-other-text.logout-text').length === 0) {
                $otherWrapper.append('<p class="home-menu-other-text logout-text">logout</p>');
            }
        });
        $centerWrapper.show();
    }

    function closeCenterWrapper() {
        if (centerWrapperHideTimer) {
            clearTimeout(centerWrapperHideTimer);
            centerWrapperHideTimer = null;
        }
        hideNoticeItems();
        if ($centerWrapper.is(':visible')) {
            $centerWrapper.hide();
        }
    }

    function hideCenterWrapperWithDelay(delay) {
        if (centerWrapperHideTimer) {
            clearTimeout(centerWrapperHideTimer);
        }
        centerWrapperHideTimer = setTimeout(function () {
            $centerWrapper.hide();
            centerWrapperHideTimer = null;
        }, delay);
    }

    $headerAvatarTrigger.on('click', function () {
        showCenterWrapper();
    })

    $headerAvatarTrigger.on('mouseenter', function () {
        if (window.innerWidth >= 768) {
            showCenterWrapper();
        }
    });

    $headerAvatarTrigger.on('mouseleave', function () {
        if (window.innerWidth >= 768) {
            hideCenterWrapperWithDelay(120);
        }
    });

    $centerWrapper.on('mouseenter', function () {
        if (window.innerWidth >= 768 && centerWrapperHideTimer) {
            clearTimeout(centerWrapperHideTimer);
            centerWrapperHideTimer = null;
        }
    });

    $centerWrapper.on('mouseleave', function () {
        if (window.innerWidth >= 768) {
            hideCenterWrapperWithDelay(120);
        }
    });

    $('.center-wrapper .close-icon').on('click', function () {
        closeCenterWrapper()
    })
    $(document).on('click', function (e) {
        const $target = $(e.target);
        const isInCenterWrapper = $target.closest('.center-wrapper').length > 0;
        const isOnAvatarTrigger = $target.closest('.header-avatar').length > 0;
        const isInNoticeItemsWrapper = $target.closest('.notice-items-wrapper').length > 0;
        if (!isInCenterWrapper && !isOnAvatarTrigger && !isInNoticeItemsWrapper) {
            closeCenterWrapper();
        }
    })
    $('.center-wrapper .icon-arrow_up').on('click', function () {
        $(this).parents('.account-item-center').toggleClass('account-item-center-hide')
    })
    const $noticeItemsWrapper = $('.notice-items-wrapper');
    const $headerNoticeTrigger = $('.header-user-box .item-notice');
    const $centerNoticeTrigger = $('.center-wrapper .account-info-box .notice-box');
    const centerNoticePopoverClass = 'notice-items-wrapper-mobile-center';
    const centerNoticeIconList = [
        'image/account-center-mobile/notice-popover-icon1.svg',
        'image/account-center-mobile/notice-popover-icon2.svg',
        'image/account-center-mobile/notice-popover-icon3.svg',
        'image/account-center-mobile/notice-popover-icon4.svg',
        'image/account-center-mobile/notice-popover-icon5.svg'
    ];
    const centerNoticeCountList = ['10', '12', '8', '2', '22'];
    let noticeHideTimer = null;

    function applyCenterNoticeItems() {
        $noticeItemsWrapper.find('.notice-item').each(function (index) {
            const $item = $(this);
            const iconSrc = centerNoticeIconList[index];
            const countText = centerNoticeCountList[index];
            if (iconSrc) {
                $item.find('.notice-icon').attr({
                    src: iconSrc,
                    alt: ''
                });
            }
            if (typeof countText === 'string') {
                $item.find('span').text(countText);
            }
        });
    }

    function resetNoticeItemsWrapperMode() {
        $noticeItemsWrapper.removeClass(centerNoticePopoverClass).css({
            width: '',
            left: '',
            right: '',
            top: ''
        });
    }

    function hideNoticeItems() {
        if (noticeHideTimer) {
            clearTimeout(noticeHideTimer);
            noticeHideTimer = null;
        }
        resetNoticeItemsWrapperMode();
        $noticeItemsWrapper.hide();
    }

    function positionNoticeItemsWrapper($trigger) {
        if (body.offsetWidth < 768 || !$noticeItemsWrapper.length || !$trigger || !$trigger.length) {
            return;
        }
        const triggerEl = $trigger.get(0);
        const triggerRect = triggerEl.getBoundingClientRect();
        const noticeWidth = $noticeItemsWrapper.outerWidth() || 0;
        const viewportWidth = window.innerWidth || document.documentElement.clientWidth || body.offsetWidth;
        const edgeGap = 12;
        const topGap = 10;
        const noticeArrowRatio = 0.7261;
        let noticeLeft = triggerRect.left + triggerRect.width / 2 - (noticeWidth * noticeArrowRatio);
        const minLeft = edgeGap;
        const maxLeft = Math.max(edgeGap, viewportWidth - noticeWidth - edgeGap);
        noticeLeft = Math.min(Math.max(noticeLeft, minLeft), maxLeft);

        $noticeItemsWrapper.css({
            top: `${triggerRect.bottom + topGap}px`,
            left: `${noticeLeft}px`,
            right: 'auto'
        });
    }

    function positionCenterNoticeItemsWrapperMobile($trigger) {
        const $target = $trigger && $trigger.length ? $trigger : $centerNoticeTrigger.first();
        if (!$target || !$target.length) {
            return;
        }
        const centerWrapperRect = $centerWrapper.length ? $centerWrapper.get(0).getBoundingClientRect() : { left: 0, top: 0 };
        const viewportWidth = window.innerWidth || document.documentElement.clientWidth || body.offsetWidth;
        const noticeWidth = 343;
        const edgeGap = 4;
        let noticeLeft = centerWrapperRect.left + 16;
        const minLeft = edgeGap;
        const maxLeft = Math.max(edgeGap, viewportWidth - noticeWidth - edgeGap);
        noticeLeft = Math.min(Math.max(noticeLeft, minLeft), maxLeft);
        const noticeTop = Math.max(0, centerWrapperRect.top + 110);
        $noticeItemsWrapper.css({
            width: `${noticeWidth}px`,
            left: `${Math.round(noticeLeft)}px`,
            right: 'auto',
            top: `${Math.round(noticeTop)}px`
        });
    }

    function showNoticeItems($trigger) {
        if (noticeHideTimer) {
            clearTimeout(noticeHideTimer);
            noticeHideTimer = null;
        }
        resetNoticeItemsWrapperMode();
        positionNoticeItemsWrapper($trigger);
        $noticeItemsWrapper.show();
    }

    function showCenterNoticeItemsMobile() {
        if (noticeHideTimer) {
            clearTimeout(noticeHideTimer);
            noticeHideTimer = null;
        }
        applyCenterNoticeItems();
        $noticeItemsWrapper.addClass(centerNoticePopoverClass);
        positionCenterNoticeItemsWrapperMobile($centerNoticeTrigger.first());
        $noticeItemsWrapper.show();
    }

    function hideNoticeItemsWithDelay(delay) {
        if (noticeHideTimer) {
            clearTimeout(noticeHideTimer);
        }
        noticeHideTimer = setTimeout(function () {
            hideNoticeItems();
        }, delay);
    }

    $headerNoticeTrigger.on('click', function (e) {
        if (body.offsetWidth < 768) {
            e.stopPropagation();
            resetNoticeItemsWrapperMode();
            positionNoticeItemsWrapper($(this));
            $noticeItemsWrapper.toggle();
        }
    });

    $centerNoticeTrigger.on('click', function (e) {
        if (body.offsetWidth < 768) {
            e.stopPropagation();
            if ($noticeItemsWrapper.is(':visible') && $noticeItemsWrapper.hasClass(centerNoticePopoverClass)) {
                hideNoticeItems();
            } else {
                showCenterNoticeItemsMobile();
            }
        }
    });

    $headerNoticeTrigger.on('mouseenter', function () {
        if (body.offsetWidth >= 768) {
            showNoticeItems($(this));
        }
    });

    $headerNoticeTrigger.on('mouseleave', function () {
        if (body.offsetWidth >= 768) {
            hideNoticeItemsWithDelay(120);
        }
    });

    $noticeItemsWrapper.on('mouseenter', function () {
        if (body.offsetWidth >= 768 && noticeHideTimer) {
            clearTimeout(noticeHideTimer);
            noticeHideTimer = null;
        }
    });

    $noticeItemsWrapper.on('mouseleave', function () {
        if (body.offsetWidth >= 768) {
            hideNoticeItems();
        }
    });

    $(document).on('click', function (e) {
        if (body.offsetWidth >= 768 || !$noticeItemsWrapper.hasClass(centerNoticePopoverClass) || !$noticeItemsWrapper.is(':visible')) {
            return;
        }
        const $target = $(e.target);
        const isOnCenterNoticeTrigger = $target.closest('.center-wrapper .account-info-box .notice-box').length > 0;
        const isInNoticeItemsWrapper = $target.closest('.notice-items-wrapper').length > 0;
        if (!isOnCenterNoticeTrigger && !isInNoticeItemsWrapper) {
            hideNoticeItems();
        }
    });

    $(window).on('resize', function () {
        if (body.offsetWidth >= 768 && $noticeItemsWrapper.is(':visible')) {
            positionNoticeItemsWrapper($headerNoticeTrigger.first());
        } else if (body.offsetWidth < 768 && $noticeItemsWrapper.is(':visible') && $noticeItemsWrapper.hasClass(centerNoticePopoverClass)) {
            positionCenterNoticeItemsWrapperMobile($centerNoticeTrigger.first());
        }
    });
    $('body').on('click', '.item-buy-btn', function () {
        if ($(this).hasClass('disabled')) {
            return
        }
        let userInfo = JSON.parse(sessionStorage.getItem('user') || '{}')
        if (userInfo.id) {
            $('.item-buy-mask').css({
                display: 'flex'
            })
        } else {
            $('#header-signin').trigger('click')
        }

    })
    $('.cookies-accept-btn').on('click', function () {
        $(this).closest('.cookies-tips-wrapper').hide()
    })
    $('.cookies-customize-btn').on('click', function () {
        $('.cookies-feature-wrapper').show()
        $(this).hide()
    })
    $('.feature-accept-btn').on('click', function() {
        let $cookiesFeature1 = $('#cookiesFeature1')
        let $cookiesFeature2 = $('#cookiesFeature2')
        let $cookiesFeature3 = $('#cookiesFeature3')
        let postData = []
        if($cookiesFeature1.prop('checked')) {
            postData.push('custom1')
        }
        if($cookiesFeature2.prop('checked')) {
            postData.push('custom2')
        }
        if($cookiesFeature3.prop('checked')) {
            postData.push('custom3')
        }
        alert(`Save Preferences:${postData.join(',')}`)
    })
    $('body').on('click', '.demand-button', function () {
        if ($(this).hasClass('disabled')) {
            return
        }
        alert('bid it')
    })
    $('.purchase-qty-btn-left').on('click', function () {
        let count = Number($('.purchase-qty-display').val()) - 1
        $('.purchase-qty-display').val(count)
        changeBuyCount()
    })
    $('.purchase-qty-btn-right').on('click', function () {
        let count = Number($('.purchase-qty-display').val()) + 1
        $('.purchase-qty-display').val(count)
        changeBuyCount()
    })
    $('.purchase-buy-btn').on('click', function () {
        let count = Number($('.purchase-qty-display').val())
        console.log(count, '数量')
    })
    $('.close-buy-modal-btn').on('click', function () {
        $('.item-buy-mask').hide()
    })
    function changeBuyCount() {
        let totalCount = Number($('.goods-count').text())
        let count = Number($('.purchase-qty-display').val())
        if (count < 2) {
            $('.purchase-qty-display').val(1)
            $('.purchase-qty-btn-left').addClass('disabled')
        } else {
            $('.purchase-qty-btn-left').removeClass('disabled')
        }
        if (count >= totalCount) {
            $('.purchase-qty-display').val(totalCount)
            $('.purchase-qty-btn-right').addClass('disabled')
        } else {
            $('.purchase-qty-btn-right').removeClass('disabled')
        }
        let totalPrice = Number($('.item-buy-wrapper .item-price').attr('data-value')) * Number($('.purchase-qty-display').val())

        $('.total-price').text(`$${totalPrice}`)
    }
    changeBuyCount()
    $(document).on('scroll', computedSideIconPosition)
    $(window).on('resize', computedSideIconPosition)
    computedSideIconPosition()
})
function computedSideIconPosition() {
    let contentWidth = $('header').width()
    let slidePaddingWidth = ($('body').width() - contentWidth) / 2
    var element = $('.common-footer-wrapper');
    var elementTop = element.offset().top;
    var windowScrollTop = $(window).scrollTop();
    var windowHeight = $(window).height();

    if (parseInt(windowScrollTop + windowHeight - elementTop) < 0) {
        $('.slide-btns-wrapper').css({
            bottom: `10rem`
        })
    } else {
        $('.slide-btns-wrapper').css({
            bottom: `calc(10rem + ${parseInt(windowScrollTop + windowHeight - elementTop)}px)`
        })
    }

    if (slidePaddingWidth > 46) {
        $('.slide-btns-wrapper').css({
            left: `${contentWidth + slidePaddingWidth + 10}px`
        })
    } else {
        $('.slide-btns-wrapper').css({
            left: `${contentWidth + slidePaddingWidth - 36}px`
        })
    }
}
