
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
        });
        this.menuButton.addEventListener('mouseleave', (e) => {
            if (!this.menuContainer) { return }
            this.topMenuTimer = setTimeout(() => {
                this.dimissMenuContainer();
            }, 200);
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
        this.menuContainer.style.top = rect.height + 4 + 'px';
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

window.addEventListener('DOMContentLoaded', function (event) {
    const menuContent = document.querySelector('.top-menu-content');
    menuContent.querySelectorAll('.top-menu-item').forEach(item => {
        new HomeMenu(menuContent, item)
    })

    showMenuMore();
    window.addEventListener('resize', function (event) {
        showMenuMore();
    })
    function showMenuMore() {
        const menuContentScroll = menuContent.scrollWidth > menuContent.clientWidth;
        const menuMore = document.getElementsByClassName('top-menu-container-more-box')[0];
        menuMore.style.display = menuContentScroll ? 'block' : 'none';
        menuMore.addEventListener('click', function (event) {
            event.preventDefault();
            event.stopPropagation();
        })
    }
})