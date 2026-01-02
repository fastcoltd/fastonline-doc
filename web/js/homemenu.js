
class HomeMenu {
    constructor(menuContent, menuButton) {
        this.menuContent = menuContent;
        this.menuButton = menuButton;
        this.menuContainer = this.menuButton.querySelector('.top-menu-more-box');
        this.menuItems = this.menuButton.querySelectorAll('.top-menu-more-list-item');
        this.init();
        this.topMenuTimer = null;
    }
    init() {
        this.menuButton.addEventListener('click', () => {
            if (!this.menuContainer) { return }
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
                this.dimissMenuContainer();
            });
        });
        this.menuButton.addEventListener('mouseenter', (e) => {
            if (!this.menuContainer) { return }
            if (this.menuContainer === e.currentTarget || this.menuButton === e.currentTarget) {
                this.topMenuTimer && clearTimeout(this.topMenuTimer)
                this.showMenuContainer();
            }
            // 全局搜索页面顶部定位层级调整
            $('.search-all-sticky-class-box').css('zIndex', 48)
        });
        this.menuButton.addEventListener('mouseleave', (e) => {
            if (!this.menuContainer) { return }
            this.topMenuTimer = setTimeout(() => {
                this.dimissMenuContainer();
            }, 200);
            // 全局搜索的时候顶部定位层级调整
            $('.search-all-sticky-class-box').css('zIndex', 49)
        });
        if (!this.menuContainer) { return }
        this.menuContainer.addEventListener('mouseleave', (e) => {
            if (!this.menuContainer) { return }
            this.topMenuTimer = setTimeout(() => {
                this.dimissMenuContainer();
            }, 200);
        });
    }

    showMenuContainer() {
        const rect = this.menuContent.getBoundingClientRect()
        if (!this.menuContainer) { return }
        this.menuContainer.style.display = 'flex';
        this.menuContainer.style.top = rect.height + 2 + 'px';
        this.menuButton.classList.toggle('active', true);
    }

    dimissMenuContainer() {
        if (!this.menuContainer) { return }
        this.menuContainer.style.display = 'none';
        this.menuButton.classList.toggle('active', false);
    }

    selectOption(value, text) {
        this.dimissMenuContainer();
        console.log(`header search menu 选中: ${text}, 值: ${value}`);
    }
}
$(document).ready(function () {
    const isMobile = body.offsetWidth <= 768;
    if (isMobile) { return }
    let topMenuBox = document.querySelector('.top-menu')
    const menuContent = document.querySelector('.top-menu-content');
    const menuleftMore = document.querySelector('.top-menu-container-left-box');
    const menuRightMore = document.querySelector('.top-menu-container-right-box');
    let menuScrollOffsetX = menuContent.scrollLeft
    let maxMenuScrollOffsetX = menuContent.scrollWidth - menuContent.clientWidth
    menuContent.querySelectorAll('.top-menu-item').forEach(item => {
        new HomeMenu(menuContent, item)
    })
    $('.top-menu').on('click', '.top-menu-container-right-box', function (event) {
        menuScrollOffsetX = menuContent.scrollLeft
        maxMenuScrollOffsetX = menuContent.scrollWidth - menuContent.clientWidth
        menuScrollOffsetX += 100;
        if (menuScrollOffsetX > maxMenuScrollOffsetX) {
            menuScrollOffsetX = maxMenuScrollOffsetX
        }
        menuContent.scrollLeft = menuScrollOffsetX;
        menuScroll();
    })
    $('.top-menu').on('click', '.top-menu-container-left-box', function (event) {
        menuScrollOffsetX = menuContent.scrollLeft
        maxMenuScrollOffsetX = menuContent.scrollWidth - menuContent.clientWidth
        menuScrollOffsetX -= 100;
        if (menuScrollOffsetX < 0) {
            menuScrollOffsetX = 0
        }
        menuContent.scrollLeft = menuScrollOffsetX;
        menuScroll();
    })
    function menuScroll() {

        const offsetX = Math.ceil(menuContent.scrollLeft);
        let maxMenuScrollOffsetX = menuContent.scrollWidth - menuContent.clientWidth
        if (maxMenuScrollOffsetX <= 0) {
            menuRightMore.style.display = 'none';
            menuleftMore.style.display = 'none';
            topMenuBox.style.padding = '0'
        } else {
            menuRightMore.style.display = 'block';
            menuleftMore.style.display = 'block';
            topMenuBox.style.padding = '0 3rem';
        }
        if (offsetX >= maxMenuScrollOffsetX) {
            menuRightMore.style.cursor = 'not-allowed';
            menuRightMore.style.opacity = '0.3';
        } else {
            menuRightMore.style.cursor = 'pointer';
            menuRightMore.style.opacity = '1';
        }
        if (offsetX <= 0) {
            menuleftMore.style.cursor = 'not-allowed';
            menuleftMore.style.opacity = '0.3';
        } else {
            menuleftMore.style.cursor = 'pointer';
            menuleftMore.style.opacity = '1';
        }
    }
    menuScroll()
    window.addEventListener('resize', function (event) {
        menuScroll();
    })
})