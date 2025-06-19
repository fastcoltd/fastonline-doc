// Filter page JavaScript functionality
document.addEventListener('DOMContentLoaded', function () {

    // Get all necessary elements
    const container = document.querySelector('.filter-container');
    const header = document.querySelector('.filter-header');
    const backBtn = document.querySelector('.filter-back-btn');
    const clearBtn = document.querySelector('.filter-clear-btn');
    const applyBtn = document.querySelector('.filter-apply-btn');
    const filterGroups = document.querySelectorAll('.filter-group');
    const tagCloseButtons = document.querySelectorAll('.filter-tag-close');
    const filterInputs = document.querySelectorAll('.filter-input');
    const customSelects = document.querySelectorAll('.filter-custom-select');
    const dropdownOverlay = document.querySelector('.filter-dropdown-overlay');
    const filterBox = document.querySelector('.page-filter-box');
    // 下拉框选项数据
    const selectOptions = {
        brand: [
            { value: 'airtable', text: 'Airtable' },
            { value: 'notion', text: 'Notion' },
            { value: 'slack', text: 'Slack' },
            { value: 'figma', text: 'Figma' },
            { value: 'github', text: 'GitHub' }
        ],
        service: [
            { value: 'web-design', text: 'Web Design' },
            { value: 'development', text: 'Development' },
            { value: 'marketing', text: 'Marketing' },
            { value: 'consulting', text: 'Consulting' }
        ],
        tag: [
            { value: 'no-deductible', text: 'No Deductible' },
            { value: '7-day-return', text: '7-Day Return' },
            { value: 'new-release', text: 'New Release' },
            { value: 'spend-save', text: 'Spend & Save' },
            { value: 'cod', text: 'COD' },
            { value: 'in-stock', text: 'In Stock' }
        ],
        'attribute-name': [
            { value: 'warranty', text: 'Warranty' },
            { value: 'return-policy', text: 'Return Policy' },
            { value: 'shipping', text: 'Shipping' },
            { value: 'support', text: 'Support' }
        ],
        'attribute-value': {
            'warranty': [
                { value: '1-year', text: '1 Year' },
                { value: '2-year', text: '2 Years' },
                { value: 'lifetime', text: 'Lifetime' }
            ],
            'return-policy': [
                { value: '7-days', text: '7 Days' },
                { value: '14-days', text: '14 Days' },
                { value: '30-days', text: '30 Days' }
            ],
            'shipping': [
                { value: 'free', text: 'Free Shipping' },
                { value: 'express', text: 'Express' },
                { value: 'standard', text: 'Standard' }
            ],
            'support': [
                { value: '24-7', text: '24/7 Support' },
                { value: 'business-hours', text: 'Business Hours' },
                { value: 'email-only', text: 'Email Only' }
            ]
        }
    };

    let currentSelect = null;
    let selectedTags = new Set([]); // 已选择的标签
    let scrollPosition = 0; // 记录滚动位置

    if (filterBox) {
        filterBox.addEventListener('click', function () {
            const containerStyle = window.getComputedStyle(container);
            if (containerStyle.display !== 'none') {
                return
            }
            container.style.display = 'flex';
            disableScroll();
        })
    }

    // Back button functionality
    if (backBtn) {
        backBtn.addEventListener('click', function () {
            container.style.display = 'none';
            enableScroll();
        });
    }

    // Clear all functionality
    if (clearBtn) {
        clearBtn.addEventListener('click', function () {
            clearAllFilters();
        });
    }

    // Apply button functionality
    if (applyBtn) {
        applyBtn.addEventListener('click', function () {
            applyFilters();
        });
    }

    // Filter group expand/collapse functionality
    filterGroups.forEach(function (group) {
        const header = group.querySelector('.filter-group-header');

        if (header) {
            header.addEventListener('click', function () {
                toggleFilterGroup(group);
            });
        }
    });

    // Tag close button functionality
    tagCloseButtons.forEach(function (closeBtn) {
        closeBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            removeTag(this);
        });
    });

    // Input change handlers
    filterInputs.forEach(function (input) {
        input.addEventListener('input', function () {
            validateInput(this);
            restrictNumberInput(this);
        });

        // 阻止非数字字符输入（针对数字类型输入框）
        input.addEventListener('keypress', function (e) {
            if (this.type === 'number') {
                const char = String.fromCharCode(e.which);
                const currentValue = this.value;

                // 允许数字、小数点、退格、删除、方向键等
                if (!/[\d.]/.test(char) && e.which !== 8 && e.which !== 46 && e.which !== 37 && e.which !== 39) {
                    e.preventDefault();
                    return false;
                }

                // 对于价格输入，允许小数点，但只能有一个
                if (this.classList.contains('price-input') && char === '.') {
                    if (currentValue.indexOf('.') !== -1) {
                        e.preventDefault();
                        return false;
                    }
                }

                // 对于数量输入，不允许小数点
                if (this.classList.contains('number-input') && char === '.') {
                    e.preventDefault();
                    return false;
                }
            }
        });
    });

    // Custom select functionality
    customSelects.forEach(function (select) {
        const trigger = select.querySelector('.filter-custom-select-trigger');
        if (trigger) {
            trigger.addEventListener('click', function (e) {
                e.stopPropagation();
                openDropdown(select);
            });
        }
    });

    // Dropdown overlay click to close
    if (dropdownOverlay) {
        dropdownOverlay.addEventListener('click', function (e) {
            if (e.target === dropdownOverlay) {
                closeDropdown();
            }
        });
    }

    // 禁止页面滚动
    function disableScroll() {
        scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
        document.body.classList.add('scroll-disabled');
        document.body.style.top = -scrollPosition + 'px';
    }

    // 恢复页面滚动
    function enableScroll() {
        document.body.classList.remove('scroll-disabled');
        document.body.style.removeProperty('top');
        window.scrollTo(0, scrollPosition);
    }

    // Functions
    function toggleFilterGroup(group) {
        const content = group.querySelector('.filter-group-content');
        const icon = group.querySelector('.filter-expand-icon');

        if (group.classList.contains('collapsed')) {
            // Expand
            group.classList.remove('collapsed');
            content.style.display = 'flex';
            icon.style.transform = 'rotate(0deg)';
        } else {
            // Collapse
            group.classList.add('collapsed');
            content.style.display = 'none';
            icon.style.transform = 'rotate(-90deg)';
        }
    }

    function openDropdown(selectElement) {
        currentSelect = selectElement;
        const selectType = getSelectType(selectElement);
        let options = [];

        // 关闭其他下拉框
        customSelects.forEach(s => s.classList.remove('active'));
        selectElement.classList.add('active');

        // 获取选项数据
        if (selectType === 'attribute-value') {
            const attributeNameSelect = document.querySelector('[data-type="attribute-name"]');
            const attributeName = attributeNameSelect ? attributeNameSelect.dataset.value : '';
            options = selectOptions['attribute-value'][attributeName] || [];
        } else if (selectType === 'tag') {
            options = selectOptions.tag;
        } else {
            options = selectOptions[selectType] || [];
        }

        // 生成下拉内容
        generateDropdownContent(options, selectType);

        // 禁止页面滚动
        disableScroll();

        // 在禁用滚动后计算并设置下拉框位置
        positionDropdown(selectElement, options);

        // 显示下拉框
        dropdownOverlay.classList.add('show');
    }

    function positionDropdown(selectElement, options = []) {
        const dropdownPanel = dropdownOverlay.querySelector('.filter-dropdown-panel');
        const rect = selectElement.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        const viewportHeight = containerRect.height;
        const viewportWidth = containerRect.width;

        // 设置宽度与触发元素相同
        dropdownPanel.style.width = rect.width + 'px';

        // 计算垂直位置
        const spaceBelow = viewportHeight - rect.bottom;
        const spaceAbove = rect.top;
        const dropdownHeight = Math.min(200, options.length * 45); // 估算高度

        let top, left;

        // 检查body是否处于固定定位状态
        const isScrollDisabled = document.body.classList.contains('scroll-disabled');

        // 决定显示在上方还是下方
        if (spaceBelow >= dropdownHeight || spaceBelow >= spaceAbove) {
            // 显示在下方
            if (isScrollDisabled) {
                // body固定定位时，直接使用getBoundingClientRect的值
                top = rect.bottom + 4;
            } else {
                top = rect.bottom + 4;
            }
        } else {
            // 显示在上方
            if (isScrollDisabled) {
                // body固定定位时，直接使用getBoundingClientRect的值
                top = rect.top - dropdownHeight - 4;
            } else {
                top = rect.top - dropdownHeight - 4;
            }
        }

        // 计算水平位置
        if (isScrollDisabled) {
            // body固定定位时，直接使用getBoundingClientRect的值
            left = rect.left;
        } else {
            left = rect.left + window.scrollX;
        }

        // 确保不超出视口右边界
        if (left + rect.width > viewportWidth) {
            left = viewportWidth - rect.width;
        }

        // 确保不超出视口左边界
        if (left < 0) {
            left = 0;
            dropdownPanel.style.width = viewportWidth + 'px';
        }

        // 确保垂直位置不超出视口
        if (top < 0) {
            top = 0;
        }
        if (top + dropdownHeight > viewportHeight - 0) {
            top = viewportHeight - dropdownHeight - 0;
        }

        dropdownPanel.style.top = top - containerRect.top + 'px';
        dropdownPanel.style.left = left + 'px';
    }

    function generateDropdownContent(options, selectType) {
        const dropdownContent = dropdownOverlay.querySelector('.filter-dropdown-content');

        dropdownContent.innerHTML = '';

        // 生成选项
        options.forEach(function (option) {
            const item = document.createElement('div');
            item.className = 'filter-dropdown-item';

            // 检查是否已选中
            if (currentSelect && currentSelect.dataset.value === option.value) {
                item.classList.add('selected');
            }

            // 对于标签类型，检查是否已被选择
            if (selectType === 'tag' && selectedTags.has(option.value)) {
                item.classList.add('disabled');
            }

            const itemText = document.createElement('span');
            itemText.className = 'filter-dropdown-item-text';
            itemText.textContent = option.text;
            item.appendChild(itemText);

            item.addEventListener('click', function () {
                if (!item.classList.contains('disabled')) {
                    selectOption(option, selectType);
                }
            });

            dropdownContent.appendChild(item);
        });
    }

    function selectOption(option, selectType) {
        if (!currentSelect) return;

        const textElement = currentSelect.querySelector('.filter-custom-select-text');

        if (selectType === 'tag') {
            // 处理标签多选
            if (!selectedTags.has(option.value)) {
                addTag(option);
            }
        } else {
            // 处理单选
            currentSelect.dataset.value = option.value;
            textElement.textContent = option.text;
            textElement.classList.remove('placeholder');

            // 如果是属性名称改变，清空属性值
            if (selectType === 'attribute-name') {
                const attributeValueSelect = document.querySelector('[data-type="attribute-value"]');
                if (attributeValueSelect) {
                    clearSelect(attributeValueSelect);
                }
            }
        }

        closeDropdown();
    }

    function addTag(option) {
        selectedTags.add(option.value);

        const tagsContainer = document.querySelector('.filter-tags');
        const newTag = document.createElement('div');
        newTag.className = 'filter-tag';
        newTag.innerHTML = `
            <span class="filter-tag-text">${option.text}</span>
            <svg class="filter-tag-close" width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M9 3L3 9M3 3L9 9" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        `;

        const closeBtn = newTag.querySelector('.filter-tag-close');
        closeBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            removeTag(this);
        });

        tagsContainer.appendChild(newTag);
    }

    function clearSelect(selectElement) {
        selectElement.dataset.value = '';
        const textElement = selectElement.querySelector('.filter-custom-select-text');
        textElement.classList.add('placeholder');

        if (selectElement.dataset.type === 'attribute-value') {
            textElement.textContent = 'Select attribute value';
        } else {
            textElement.textContent = 'Select option';
        }
    }

    function closeDropdown() {
        dropdownOverlay.classList.remove('show');
        customSelects.forEach(s => s.classList.remove('active'));

        // 恢复页面滚动
        enableScroll();

        currentSelect = null;
    }

    function getSelectType(selectElement) {
        const dataType = selectElement.dataset.type;
        if (dataType) return dataType;

        if (selectElement.classList.contains('multiselect')) return 'tag';

        // 根据父级组件判断类型
        const group = selectElement.closest('.filter-group');
        const title = group.querySelector('.filter-group-title').textContent.toLowerCase();

        if (title.includes('brand')) return 'brand';
        if (title.includes('service')) return 'service';
        if (title.includes('tag')) return 'tag';

        return 'generic';
    }

    function removeTag(closeBtn) {
        const tag = closeBtn.closest('.filter-tag');
        if (tag) {
            const tagText = tag.querySelector('.filter-tag-text').textContent;

            // 从选中集合中移除
            for (let [key, value] of Object.entries(selectOptions.tag)) {
                if (value.text === tagText) {
                    selectedTags.delete(value.value);
                    break;
                }
            }

            tag.style.opacity = '0';
            tag.style.transform = 'scale(0.8)';

            setTimeout(function () {
                tag.remove();
                updateTagsLayout();
            }, 200);
        }
    }

    function updateTagsLayout() {
        const tagsContainer = document.querySelector('.filter-tags');
        if (tagsContainer) {
            const tags = tagsContainer.querySelectorAll('.filter-tag');
            if (tags.length === 0) {
                const tagSelect = document.querySelector('[data-type="tag"], .multiselect');
                if (tagSelect) {
                    clearSelect(tagSelect);
                }
            }
        }
    }

    function clearAllFilters() {
        // 先关闭下拉框
        if (dropdownOverlay.classList.contains('show')) {
            closeDropdown();
        }

        // Clear all input fields
        filterInputs.forEach(function (input) {
            input.value = '';
        });

        // Reset all custom select boxes
        customSelects.forEach(function (select) {
            clearSelect(select);
        });

        // Remove all tags
        const tags = document.querySelectorAll('.filter-tag');
        tags.forEach(function (tag) {
            tag.remove();
        });
        selectedTags.clear();

        // Reset tag select
        const tagSelect = document.querySelector('.multiselect');
        if (tagSelect) {
            const textElement = tagSelect.querySelector('.filter-custom-select-text');
            textElement.textContent = 'Select tags';
            textElement.classList.add('placeholder');
        }

        showMessage('All filters cleared');
    }

    function getAllSelectValues() {
        const filters = {
            name: '',
            brand: '',
            service: '',
            tags: Array.from(selectedTags),
            attributes: {
                name: '',
                value: ''
            },
            price: {
                min: '',
                max: ''
            },
            inventory: {
                min: '',
                max: ''
            }
        };
        let selectedCount = 0;
        // Get name filter
        const nameInput = document.querySelector('.filter-group:first-child .filter-input');
        if (nameInput) {
            filters.name = nameInput.value.trim();
            if (filters.name.length > 0) {
                selectedCount++;
            }
        }

        // Get brand filter
        const brandSelect = document.querySelector('.filter-group:nth-child(3) .filter-custom-select');
        if (brandSelect && brandSelect.dataset.value) {
            filters.brand = brandSelect.dataset.value;
            if (filters.brand.length > 0) {
                selectedCount++;
            }
        }

        // Get service filter
        const serviceSelect = document.querySelector('.filter-group:nth-child(4) .filter-custom-select');
        if (serviceSelect && serviceSelect.dataset.value) {
            filters.service = serviceSelect.dataset.value;
            if (filters.service.length > 0) {
                selectedCount++;
            }
        }

        // Get attributes
        const attributeNameSelect = document.querySelector('[data-type="attribute-name"]');
        const attributeValueSelect = document.querySelector('[data-type="attribute-value"]');
        if (attributeNameSelect) {
            filters.attributes.name = attributeNameSelect.dataset.value;
        }
        if (attributeValueSelect) {
            filters.attributes.value = attributeValueSelect.dataset.value;
            if (filters.attributes.name.length && filters.attributes.value.length > 0) {
                selectedCount++;
            }
        }

        // Get price range
        const priceInputs = document.querySelectorAll('.filter-price-input .filter-input');
        if (priceInputs.length >= 2) {
            filters.price.min = priceInputs[0].value.trim();
            filters.price.max = priceInputs[1].value.trim();
            if (filters.price.min.length > 0 && filters.price.max.length > 0) {
                selectedCount++;
            }
        }

        // Get inventory range
        const inventoryInputs = document.querySelectorAll('.filter-number-input .filter-input');
        if (inventoryInputs.length >= 2) {
            filters.inventory.min = inventoryInputs[0].value.trim();
            filters.inventory.max = inventoryInputs[1].value.trim();
            if (filters.inventory.min.length > 0 && filters.inventory.max.length > 0) {
                selectedCount++;
            }
        }
        const filterCount = document.querySelector('.page-filter-num');
        filterCount.textContent = '(' + selectedCount + ')';
        return filters
    }

    function applyFilters() {
        // 先关闭下拉框
        if (dropdownOverlay.classList.contains('show')) {
            closeDropdown();
        }
        const filters = getAllSelectValues();


        console.log('Applied filters:', filters);
        showMessage('Filters applied successfully');
        applyFiltersToResults(filters);
    }

    function validateInput(input) {
        const value = input.value.trim();
        input.classList.remove('error');

        if (input.classList.contains('price-input')) {
            if (value && !/^\d+(\.\d{1,2})?$/.test(value)) {
                input.classList.add('error');
                return false;
            }
        } else if (input.classList.contains('number-input')) {
            if (value && !/^\d+$/.test(value)) {
                input.classList.add('error');
                return false;
            }
        }

        return true;
    }

    function restrictNumberInput(input) {
        if (input.type === 'number') {
            let value = input.value;

            // 移除非数字字符（除了小数点）
            if (input.classList.contains('price-input')) {
                // 价格允许小数
                value = value.replace(/[^\d.]/g, '');
                // 确保只有一个小数点
                const parts = value.split('.');
                if (parts.length > 2) {
                    value = parts[0] + '.' + parts.slice(1).join('');
                }
                // 限制小数位数为2位
                if (parts[1] && parts[1].length > 2) {
                    value = parts[0] + '.' + parts[1].substring(0, 2);
                }
            } else if (input.classList.contains('number-input')) {
                // 数量只允许整数
                value = value.replace(/[^\d]/g, '');
            }

            if (input.value !== value) {
                input.value = value;
            }
        }
    }

    function showMessage(message) {
        const toast = document.createElement('div');
        toast.className = 'filter-toast';
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background-color: #333;
            color: white;
            padding: 12px 24px;
            border-radius: 6px;
            z-index: 1001;
            font-size: 14px;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;

        document.body.appendChild(toast);

        setTimeout(function () {
            toast.style.opacity = '1';
        }, 100);

        setTimeout(function () {
            toast.style.opacity = '0';
            setTimeout(function () {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }, 2000);
    }

    function applyFiltersToResults(filters) {
        const headerStyle = window.getComputedStyle(header);
        if (headerStyle.display !== 'none') {
            container.style.display = 'none';
            enableScroll();
            window.list.reloadItems();
        }
    }

    // Close dropdown on escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            if (dropdownOverlay.classList.contains('show')) {
                closeDropdown();
            } else if (backBtn) {
                backBtn.click();
            }
        } else if (e.key === 'Enter' && e.ctrlKey) {
            if (applyBtn) {
                applyBtn.click();
            }
        }
    });

    // Add CSS for error state and transitions
    const style = document.createElement('style');
    style.textContent = `
        .filter-input.error {
            border-color: var(--primary-color);
            box-shadow: 0 0 0 2px rgba(255, 27, 32, 0.2);
        }
        
        .filter-tag {
            transition: opacity 0.2s ease, transform 0.2s ease;
        }
        
        .filter-dropdown-overlay {
            animation: fadeIn 0.3s ease;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
    `;
    document.head.appendChild(style);
}); 