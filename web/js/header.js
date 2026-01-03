
document.addEventListener('DOMContentLoaded', function () {
    const body = document.getElementsByTagName('body')[0];
    this.headerSearchMenu = new HeaderMenu('.header-search-box-label', '.header-search-box-label-icon', '.header-search-box-label-text', 'items');
    this.headerResourceMenu = new HeaderMenu('.header-items-label-resource', '.header-items-label-icon', '', '');
    this.headerPostMenu = new HeaderMenu('.header-items-label-post', '.header-items-label-icon', '', '');
    this.headerSearchMenuForMobile = new HeaderMenu('.header-search-mobile-box-label', '.header-search-mobile-box-label-icon', '.header-search-mobile-box-label-text', 'items')
    refreshHeaderUserUI();

    const homeMenuPage = document.querySelector('.home-menu-page');
    const headerMenu = document.querySelector('.header-menu-box');
    const homeMenuBack = homeMenuPage.querySelector('.home-menu-back');
    const homeMenuTitles = homeMenuPage.querySelectorAll('.home-menu-item-title-box');
    headerMenu.addEventListener('click', function () {
        homeMenuPage.style.display = 'flex';
        homeMenuPage.style.width = '100vw';
        body.classList.toggle('modal-open', true);
        const homeMenuUserEle = homeMenuPage.querySelector('.home-menu-user-box');
        const homeMenuRegistEle = homeMenuPage.querySelector('.home-menu-login-box');
        const homeMenuLgoinEle = homeMenuPage.querySelector('.home-menu-signin-text');
        const homeMenuUserLine = homeMenuPage.querySelector('.home-menu-seperate-line');
        homeMenuLgoinEle.addEventListener('click', function (e) {
            showSigninFn();
        })
        homeMenuRegistEle.addEventListener('click', function (e) {
            showJoinFn();
        })
        const homeMenuLogoutEle = homeMenuUserEle.querySelector('.home-menu-user-logout');
        homeMenuLogoutEle.addEventListener('click', function (e) {
            user = null;
            dismissHomeMenuPage();
            refreshHeaderUserUI();
        })
        if (user) {
            homeMenuRegistEle.style.display = 'none';
            homeMenuLgoinEle.style.display = 'none';
            homeMenuUserEle.style.display = 'flex';
            homeMenuUserLine.style.display = '';
            const homeMenuUserIconEle = homeMenuUserEle.querySelector('.home-menu-user-icon');
            homeMenuUserIconEle.src = user.avatar;
            const homeMenuUserNameEle = homeMenuUserEle.querySelector('.home-menu-user-name');
            homeMenuUserNameEle.textContent = user.name;
            const homeMenuUserEmailEle = homeMenuUserEle.querySelector('.home-menu-user-email');
            homeMenuUserEmailEle.textContent = user.email;
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
    $('.scroll-to-top').on('click', function () {
        scrollToTop()
    })
    $('.kefu-icon').on('click', function () {
        alert('你好，客服为您服务')
    })
    $('.icon-aixin').on('click', function (e) {
        let like = $(this).data('like')
        if(like) {
            $(this).data('like', 0)
            $(this).css({color: '#F4F4F4'})
        } else {
            $(this).data('like', 1)
            $(this).css({color: '#FF1B20'})
        }
    })
    $('.header-avatar').on('click', function() {
        $('.center-wrapper').show()
    })
    $('.center-wrapper .close-icon').on('click', function() {
        $('.center-wrapper').hide()
    })
    $('.icon-arrow_up').on('click', function () {
        $(this).parents('.account-item-center').toggleClass('account-item-center-hide')
    })
    $('.icon-youjian').on('click', function() {
        if (body.offsetWidth < 768) {
            $('.notice-items-wrapper').toggle()   
        }
    })
    $('.icon-youjian').on('mouseover', function() {
        if (body.offsetWidth >= 768) {
            $('.notice-items-wrapper').show()   
        }
    })
    $('.icon-youjian').on('mouseout', function() {
        if (body.offsetWidth >= 768) {
            $('.notice-items-wrapper').hide()   
        }
    })
    for (let i = 0; i < homeMenuTitles.length; i++) {
        const title = homeMenuTitles[i];
        title.addEventListener('click', function (e) {
            const titleArrow = e.currentTarget.querySelector('.home-menu-item-title-arrow');
            const titleContent = e.currentTarget.querySelector('.home-menu-item-content');
            if (!titleContent) {
                return
            }
            const itemContentList = titleContent.querySelectorAll('.home-menu-item-content-item')
            for (let j = 0; j < itemContentList.length; j++) {
                const item = itemContentList[j];
                item.addEventListener('click', function (e) {
                    e.stopPropagation();
                    const ele = e.currentTarget;
                    if (!ele.querySelector('.home-menu-second-page')) { return }
                    const homeMenusecondPage = ele.querySelector('.home-menu-second-page');
                    homeMenusecondPage.style.display = 'flex';
                    const homeMenuSeconPageTitleBoxEle = homeMenusecondPage.querySelector('.home-menu-second-page-title-box');
                    homeMenuSeconPageTitleBoxEle.addEventListener('click', function (e) {
                        e.preventDefault();
                        e.stopPropagation();
                        homeMenusecondPage.style.display = 'none';
                    })
                })
            }
            if (titleContent.style.display === 'none') {
                titleContent.style.display = 'flex';
                titleArrow.style.transform = 'rotate(0deg)';
            } else {
                titleContent.style.display = 'none';
                titleArrow.style.transform = 'rotate(-90deg)';
            }
        })
    }

    const footerContent = document.querySelector('.footer-content');
    const footerItems = footerContent.querySelectorAll('.footer-item-content');
    footerItems.forEach(item => {
        const itemTitleBox = item.querySelector('.footer-item-title-box');
        const itemTitleIcon = itemTitleBox.querySelector('.footer-item-title-icon');
        const itemTitleIconStyle = window.getComputedStyle(itemTitleIcon);
        if (itemTitleIconStyle.display === 'none') {
            return;
        }
        const itemDescBox = item.querySelector('.footer-item-desc-box');
        itemTitleBox.addEventListener('click', function (e) {
            e.stopPropagation();
            const itemDescStyle = window.getComputedStyle(itemDescBox);
            if (itemDescStyle.display === 'none') {
                itemDescBox.style.display = 'flex';
                itemTitleIcon.style.transform = 'rotate(0deg)';
            } else {
                itemDescBox.style.display = 'none';
                itemTitleIcon.style.transform = 'rotate(180deg)';
            }
        });
    });
})

class HeaderMenu {
    constructor(domId, imgId, labId, defaultValue) {
        this.menuButton = document.querySelector(domId);
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
function refreshHeaderUserUI() {
    let user = window.user
    const signinButtonEle = document.getElementById('header-signin');
    const headerJoinButton = document.getElementById('header-join');
    const headerUser = document.getElementById('header-user');
    signinButtonEle.style.display = !user ? '' : 'none';
    headerJoinButton.style.display = !user ? '' : 'none';
    headerUser.style.display = !user ? 'none' : '';

    if (user) {
        // const headerUserAvatar = headerUser.querySelector('.header-user-icon');
        // headerUserAvatar.src = user.avatar;
    }
}
function handleEnterFn(e) {
    console.log(e.target.value, '222222222', e)
}
function handleSearchFn(e) {
    let input = e.target.previousElementSibling
    console.log(input.value)
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
