class SortSelector {
    constructor() {
        this.sortContainer = document.querySelector('.sort-container');
        this.sortButton = document.querySelector('.page-sort-box');
        this.sortItems = document.querySelectorAll('.sort-item');
        this.init();
        this.setDefaultSelection();
    }

    init() {
        this.sortButton.addEventListener('click', () => {
            const sortContainerStyle = window.getComputedStyle(this.sortContainer);
            if (sortContainerStyle.display !== 'none') {
                this.sortContainer.style.display = 'none';
                return
            }
            const rect = this.sortButton.getBoundingClientRect()
            this.sortContainer.style.display = 'block';
            this.sortContainer.style.right = 0;
            this.sortContainer.style.top = rect.height + 8 + 'px';
        });

        // 绑定排序项点击事件
        this.sortItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                const value = item.dataset.value;
                const text = item.querySelector('.title').textContent;
                this.selectOption(value, text);
            });
        });
    }

    selectOption(value, text) {
        this.selectedValue = value;
        this.selectedText = text;
        // 更新选中状态
        this.updateSelectedState(value);

        this.sortContainer.style.display = 'none';
        /// 排序变化，触发排序
        window.sortItems(value);
        console.log(`选中: ${text}, 值: ${value}`);
    }

    updateSelectedState(selectedValue) {
        // 清除所有选中状态
        this.sortItems.forEach(item => {
            item.classList.remove('selected');
        });

        // 设置当前选中状态
        const selectedItem = document.querySelector(`[data-value="${selectedValue}"]`);
        if (selectedItem) {
            selectedItem.classList.add('selected');
        }
    }

    setDefaultSelection() {
        this.selectedValue = '';
        this.selectedText = 'all';
        this.updateSelectedState('');
    }
}