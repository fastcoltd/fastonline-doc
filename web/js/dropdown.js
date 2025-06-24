class DropdownMenu {
    constructor(defaultValue) {
        this.menuButton = document.querySelector('.page-dropdown-select');
        this.menuArrow = this.menuButton.querySelector('.page-dropdown-icon');
        this.menuLabel = this.menuButton.querySelector('.page-dropdown-select-text');
        this.menuContainer = this.menuButton.querySelector('.page-dropdown');
        this.menuItems = this.menuButton.querySelectorAll('.page-dropdown-item');
        this.init();
        this.setDefaultSelection(defaultValue);
        this.dropdownTimer = null;
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
                this.dropdownTimer = setTimeout(() => {
                    this.dimissMenuContainer();
                }, 200)
            }
        })

        this.menuButton.addEventListener('mouseenter', (e) => {
            e.stopPropagation();
            if (this.menuContainer === e.currentTarget || this.menuButton === e.currentTarget) {
                this.dropdownTimer && clearTimeout(this.dropdownTimer)
                this.showMenuContainer();
            }
        })
    }

    showMenuContainer() {
        const rect = this.menuButton.getBoundingClientRect()
        this.menuContainer.style.display = 'block';
        this.menuContainer.style.left = 0 + 'px';
        this.menuContainer.style.top = rect.height + 'px';
        this.menuArrow.style.transform = 'rotate(180deg)';
    }

    dimissMenuContainer() {
        this.menuContainer.style.display = 'none';
        this.menuArrow.style.transform = 'rotate(0deg)';
    }

    selectOption(value, text) {
        // 更新选中状态
        this.updateSelectedState(value, text);
        window.reloadItems();
        this.dimissMenuContainer();
    }

    updateSelectedState(selectedValue, text) {
        this.selectedValue = selectedValue;
        this.selectedText = text;
        // 清除所有选中状态
        this.menuItems.forEach(item => {
            item.classList.remove('selected');
        });

        if (this.menuLabel) {
            this.menuLabel.textContent = text;
        }

        // 设置当前选中状态
        const selectedItem = this.menuContainer.querySelector(`[data-value="${selectedValue}"]`);
        console.log(`dropdown 选中: ${text}, 值: ${selectedValue}`);
        if (selectedItem) {
            selectedItem.classList.add('selected');
        }
    }

    setDefaultSelection(defaultValue) {
        this.menuItems.forEach(item => {
            const value = item.dataset.value;
            if (value === defaultValue) {
                const text = item.querySelector('.title').textContent;
                this.updateSelectedState(value, text);
            }
        });
    }
}