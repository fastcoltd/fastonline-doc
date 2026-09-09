
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
            this.hideSiblingMenusImmediately();
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
        this.positionMenuContainer();
    }

    // 浮窗展开方向按当前分类在屏幕上的实时位置算（service 条可横向滚动，不能在模板里写死方向）：
    // 分类中心落在视口左 1/3 → 从它左缘往右展开；中间 1/3 → 以它为中心；右 1/3 → 右缘对齐、往左展开。
    // 最后统一夹在视口内（两边各留 16px），配合 CSS 的 max-width 保证不顶出屏幕。
    positionMenuContainer() {
        if (!this.menuContainer) { return }
        const vw = document.documentElement.clientWidth
        const btnRect = this.menuButton.getBoundingClientRect()
        const boxWidth = Math.min(this.menuContainer.offsetWidth, vw - 32)
        const btnCenter = btnRect.left + btnRect.width / 2
        const offsetParent = this.menuContainer.offsetParent || this.menuButton.offsetParent
        const parentLeft = offsetParent ? offsetParent.getBoundingClientRect().left : 0

        let desiredLeft
        if (btnCenter < vw / 3) {
            desiredLeft = btnRect.left
        } else if (btnCenter > vw * 2 / 3) {
            desiredLeft = btnRect.right - boxWidth
        } else {
            desiredLeft = btnCenter - boxWidth / 2
        }
        desiredLeft = Math.max(16, Math.min(desiredLeft, vw - boxWidth - 16))

        this.menuContainer.style.right = 'auto'
        this.menuContainer.style.transform = 'none'
        this.menuContainer.style.left = (desiredLeft - parentLeft) + 'px'
    }

    hideSiblingMenusImmediately() {
        if (!this.menuContent) { return }
        const siblingItems = this.menuContent.querySelectorAll('.top-menu-item');
        siblingItems.forEach((item) => {
            if (item === this.menuButton) {
                return;
            }
            item.classList.remove('active');
            const siblingMenu = item.querySelector('.top-menu-more-box');
            if (siblingMenu) {
                siblingMenu.style.display = 'none';
            }
        });
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
        const canScrollLeft = offsetX > 0;
        const canScrollRight = offsetX < maxMenuScrollOffsetX;

        // 不可滚动方向隐藏对应箭头
        menuRightMore.style.display = canScrollRight ? 'block' : 'none';
        menuleftMore.style.display = canScrollLeft ? 'block' : 'none';
        topMenuBox.style.padding = '0 3rem';
        menuRightMore.style.cursor = 'pointer';
        menuRightMore.style.opacity = '1';
        menuleftMore.style.cursor = 'pointer';
        menuleftMore.style.opacity = '1';
    }
    menuScroll()
    menuContent.addEventListener('scroll', menuScroll, { passive: true })
    window.addEventListener('resize', function (event) {
        menuScroll();
    })
})
