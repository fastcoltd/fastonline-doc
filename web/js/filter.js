$(document).ready(function () {

    // Get all necessary elements
    const container = document.querySelector('.filter-container');
    const header = document.querySelector('.filter-header');
    const backBtn = document.querySelector('.filter-back-btn');
    // const clearBtn = document.querySelector('.filter-clear-btn');
    const filterGroups = document.querySelectorAll('.filter-group');
    const tagCloseButtons = document.querySelectorAll('.filter-tag-close');
    const filterInputs = document.querySelectorAll('.filter-input');
    const customSelects = document.querySelectorAll('.filter-content .filter-custom-select');
    const filterBox = document.querySelector('.page-filter-box');

    let currentSelect = null;
    let selectedTags = new Set([]); // 已选择的标签
    let selectedAttrs = new Set([]); // 已选择的属性
    let scrollPosition = 0; // 记录滚动位置
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
        ]
    };
    const attributeValue = {
        'warranty': [
            { value: 'warranty:year', text: 'warranty:Year' },
            { value: 'warranty:month', text: 'warranty:month' },
            { value: 'warranty:lifetime', text: 'warranty:Lifetime' }
        ],
        'return-policy': [
            { value: 'return-policy:7-days', text: 'return-policy:7 Days' },
            { value: 'return-policy:14-days', text: 'return-policy:14 Days' },
            { value: 'return-policy:30-days', text: 'return-policy:30 Days' }
        ],
        'shipping': [
            { value: 'shipping:free-shipping', text: 'shipping:Free Shipping' },
            { value: 'shipping:express', text: 'shipping:Express' },
            { value: 'shipping:standard', text: 'shipping:Standard' }
        ],
        'support': [
            { value: 'support:24-7', text: 'support:24/7 Support' },
            { value: 'support:business-hours', text: 'support:Business Hours' },
            { value: 'support:email-only', text: 'support:Email Only' }
        ]
    }

    $('.filter-content .filter-custom-select').each(function () {
        let dataType = $(this).data('type')
        let select = this
        // 生成下拉内容
        generateDropdownHtml($(this));
        if (dataType == 'attribute-value') {
            $(this).addClass('disabled')
        }
        let that = this
        $(this).on('click', '.filter-dropdown-item', function (e) {
            let value = $(e.target).data('value')
            let option = {
                value,
                text: $(e.target).text()
            }

            if (value && dataType == 'tag') {
                // 处理标签多选
                if (!selectedTags.has(option.value)) {
                    addTag(option);
                }
                $(select).removeClass('active')
            } else if (value && dataType == 'attribute-value') {
                // 处理标签多选
                if (!selectedAttrs.has(option.value)) {
                    addAttr(option);
                }
                $(select).removeClass('active')
            } else {
                $(that).attr('data-value', value)
                $(that).find('.filter-custom-select-text').text($(e.target).text())
                $(that).toggleClass('active')
            }
            filterCount()
            if (value && dataType == 'attribute-name') {
                generateAttrVal(value)
            }
        })
    })
    $(document).on('blur', '.filter-input', function () {
        filterCount()
    })
    function filterCount() {
        let count = selectedTags.size + selectedAttrs.size
        console.log(selectedAttrs.size, '000000', selectedAttrs)
        $nameInput = $('.name-input')
        $priceInputMin = $('.price-input-min')
        $priceInputMax = $('.price-input-max')
        $numberInputMin = $('.number-input-min')
        $numberInputMax = $('.number-input-max')
        $filterCustomSelect = $('.filter-content .filter-custom-select-count').not('[data-value=""]').not('[data-value="attribute-name"]').not('[data-value="attribute-value"]').not('[data-value="tag"]')
        count += $filterCustomSelect.length
        if ($nameInput.val()) {
            count += 1
        }
        if ($priceInputMin.val()) {
            count += 1
        }
        if ($priceInputMax.val()) {
            count += 1
        }
        if ($numberInputMin.val()) {
            count += 1
        }
        if ($numberInputMax.val()) {
            count += 1
        }

        $('.page-filter-num').text(`(${count})`)
    }
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
    // if (clearBtn) {
    //     clearBtn.addEventListener('click', function () {
    //         clearAllFilters();
    //     });
    // }

    // Apply button functionality
    // if (applyBtn) {
    //     applyBtn.addEventListener('click', function () {
    //         applyFilters();
    //     });
    // }
    $('.filter-apply-btn').on('click', function () {
        startFitterData()
    })
    $('.page-sort-icon').on('click', function (e) {
        e.stopPropagation()
        $('.sort-container').toggle()
    })
    $('.sort-item').on('click', function () {
        $('.page-sort-icon').attr('data-value', $(this).data('value'))
        $('.sort-container').hide()
        startFitterData()
    })
    $('.filter-clear-btn').on('click', function () {
        $nameInput = $('.name-input')
        $priceInputMin = $('.price-input-min')
        $priceInputMax = $('.price-input-max')
        $numberInputMin = $('.number-input-min')
        $numberInputMax = $('.number-input-max')
        $filterCustomSelect = $('.filter-content .filter-custom-select').not('[data-value=""]')
        $nameInput.val('')
        $priceInputMin.val('')
        $priceInputMax.val('')
        $numberInputMin.val('')
        $numberInputMax.val('')
        $('.filter-custom-select[data-type="brand"]').attr('data-value', '').find('.filter-custom-select-text').text('Select Brand')
        $('.filter-custom-select[data-type="service"]').attr('data-value', '').find('.filter-custom-select-text').text('Select service')
        $('.filter-custom-select[data-type="attribute-name"]').attr('data-value', '').find('.filter-custom-select-text').text('select attribute')
        $('.filter-custom-select[data-type="attribute-value"]').attr('data-value', '').find('.filter-custom-select-text').text('select value')
        $('.filter-custom-select[data-type="tag"]').find('.filter-tags').html('')
        $('.filter-custom-select[data-type="attribute-value"]').find('.filter-tags').html('')
        selectedTags.clear();
        selectedAttrs.clear();
        $('.page-sort-icon').attr('data-value', '')
        filterCount()
        startFitterData()
    })
    function startFitterData() {
        $nameInput = $('.name-input')
        $priceInputMin = $('.price-input-min')
        $priceInputMax = $('.price-input-max')
        $numberInputMin = $('.number-input-min')
        $numberInputMax = $('.number-input-max')
        $filterCustomSelect = $('.filter-custom-select').not('[data-value=""]')


        const filters = {
            name: $nameInput.val() || '',
            brand: $('.filter-custom-select[data-type="brand"]').attr('data-value') || '',
            service: $('.filter-custom-select[data-type="service"]').attr('data-value') || '',
            tags: Array.from(selectedTags),
            attributes: Array.from(selectedAttrs),
            price: {
                min: $priceInputMin.val() || '',
                max: $priceInputMax.val() || ''
            },
            inventory: {
                min: $numberInputMin.val() || '',
                max: $numberInputMax.val() || ''
            },
            sortBy: $('.page-sort-icon').attr('data-value') || ''
        };
        console.log(filters, '---')
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
                if ($(select).hasClass('disabled')) {
                    return
                }
                openDropdown(select);
            });
        }
    });

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
        customSelects.forEach(s => {
            s.classList.remove('active')
        });
        if (group.classList.contains('collapsed')) {
            // Expand
            group.classList.remove('collapsed');
            content.style.display = 'flex';
            icon.style.transform = 'rotate(0deg)';
        } else {
            // Collapse
            group.classList.add('collapsed');
            content.style.display = 'none';
            icon.style.transform = 'rotate(180deg)';
        }
    }

    function openDropdown(selectElement) {
        currentSelect = selectElement;

        // 关闭其他下拉框
        customSelects.forEach(s => {
            if (s != selectElement) {
                s.classList.remove('active')
            }
        });
        $(selectElement).toggleClass('active')
    }
    function generateDropdownHtml(item) {
        let options = selectOptions[item.data('type')]
        let htmlStr = ''
        if (options && options.length) {
            options.forEach(function (option) {
                htmlStr += `<div class="filter-dropdown-item" data-value="${option.value}"><span
            class="filter-dropdown-item-text" data-value="${option.value}">${option.text}</span></div>`
            })
            item.find('.filter-dropdown-content').html(htmlStr)
        }
    }
    function generateAttrVal(val) {
        let $attributeValue = $('[data-type="attribute-value"]')
        $attributeValue.removeClass('disabled')
        let options = attributeValue[val]
        let htmlStr = ''
        if (options && options.length) {
            options.forEach(function (option) {
                htmlStr += `<div class="filter-dropdown-item" data-value="${option.value}"><span
            class="filter-dropdown-item-text" data-value="${option.value}">${option.text}</span></div>`
            })
            $attributeValue.find('.filter-dropdown-content').html(htmlStr)
        }
    }
    function addAttr(option) {
        selectedAttrs.add(option.value);

        const attrsContainer = document.querySelector('.filter-attrs');
        const newAttr = document.createElement('div');
        newAttr.className = 'filter-attr';
        newAttr.innerHTML = `
            <span class="filter-attr-text" data-value="${option.value}">${option.text}</span>
            <svg class="filter-attr-close" width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M9 3L3 9M3 3L9 9" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        `;

        const closeBtn = newAttr.querySelector('.filter-attr-close');
        closeBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            removeAttr(this);
        });

        attrsContainer.appendChild(newAttr);
    }
    function addTag(option) {
        selectedTags.add(option.value);

        const tagsContainer = document.querySelector('.filter-tags');
        const newTag = document.createElement('div');
        newTag.className = 'filter-tag';
        newTag.innerHTML = `
            <span class="filter-tag-text" data-value="${option.value}">${option.text}</span>
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
    function removeAttr(closeBtn) {
        const attr = closeBtn.closest('.filter-attr');
        if (attr) {
            const attrText = $(attr).find('.filter-attr-text').attr('data-value');
            console.log(attrText, '8888888888')
            // 从选中集合中移除
            selectedAttrs.forEach(item => {
                console.log(item, '-------', item)
                console.log(item == attrText)
                if (item == attrText) {
                    selectedAttrs.delete(item);
                }
            });
            attr.style.opacity = '0';
            attr.style.transform = 'scale(0.8)';

            setTimeout(function () {
                attr.remove();
                updateTagsLayout();
                filterCount()
            }, 200);
        }
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
            filterCount()
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

        const attrsContainer = document.querySelector('.filter-attrs');
        if (attrsContainer) {
            const attrs = attrsContainer.querySelectorAll('.filter-attr');
            if (attrs.length === 0) {
                const attrSelect = document.querySelector('[data-type="attribute-value"], .multiselect');
                if (attrSelect) {
                    clearSelect(attrSelect);
                }
            }
        }
    }

    function getAllSelectValues() {
        const filters = {
            name: '',
            brand: '',
            service: '',
            tags: Array.from(selectedTags),
            attributes: Array.from(selectedAttrs),
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
        const filters = getAllSelectValues();
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
            top: 2.5rem;
            left: 50%;
            transform: translateX(-50%);
            background-color: #333;
            color: white;
            padding: 1.5rem 3rem;
            border-radius: 0.75rem;
            z-index: 60;
            font-size: 1.75rem;
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
    // document.addEventListener('keydown', function (e) {
    //     if (e.key === 'Escape') {
    //         if (dropdownOverlay.classList.contains('show')) {
    //             closeDropdown();
    //         } else if (backBtn) {
    //             backBtn.click();
    //         }
    //     } else if (e.key === 'Enter' && e.ctrlKey) {
    //         if (applyBtn) {
    //             applyBtn.click();
    //         }
    //     }
    // });

    // Add CSS for error state and transitions
    // const style = document.createElement('style');
    // style.textContent = `
    //     .filter-input.error {
    //         border-color: var(--primary-color);
    //         box-shadow: 0 0 0 2px rgba(255, 27, 32, 0.2);
    //     }

    //     .filter-tag {
    //         transition: opacity 0.2s ease, transform 0.2s ease;
    //     }

    //     .filter-dropdown-overlay {
    //         animation: fadeIn 0.3s ease;
    //     }

    //     @keyframes fadeIn {
    //         from { opacity: 0; }
    //         to { opacity: 1; }
    //     }
    // `;
    // document.head.appendChild(style);

})