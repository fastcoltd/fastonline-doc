// _opt.js
let tableData = [];
let tableLangData = [];
let currentPage = 1;
let perPage = 20;
let currentImageIndex = 0;
let currentImageContext = null;
let isEditing = false;
let editId = null;

// 通用配置对象
let config = {};

// 初始化函数，接收配置
function initTable(tableConfig) {
    config = tableConfig;
    if(undefined == config.values){
        config.values = {}
    }
    perPage = config.defaultPerPage || 20;
    renderFilterArea();
    renderTableHeader();
    renderActionButtons(); // 新增
    fetchTableData(config.sampleCount || 200);
    setupPagination();
}

// 动态生成筛选区域
function renderFilterArea() {
    const filterContainer = document.querySelector('.filter-container');
    filterContainer.innerHTML = '';
    config.filterFields.forEach(field => {
        const div = document.createElement('div');
        div.className = field.type === 'select' ? 'ant-select ant-select-single ant-select-show-arrow' : '';
        let input;
        if (field.type === 'select') {
            input = document.createElement('select');
            input.className = "ant-select"
            input.id = `${field.id}Filter`;
            if (typeof field.options == 'function') {
                let options = field.options();
                field.options = options
            }
            let optIndex = 1
            field.options.forEach(opt => {
                if (typeof opt == 'object') {
                    const option = document.createElement('option');
                    option.value = opt.value;
                    option.textContent = opt.label;
                    input.appendChild(option);
                } else {
                    const option = document.createElement('option');
                    option.value = String(optIndex++);
                    option.textContent = opt;
                    input.appendChild(option)
                }
            });
        } else {
            input = document.createElement('input');
            input.type = field.type;
            input.id = `${field.id}Filter`;
            input.className = 'ant-input';
            input.placeholder = field.placeholder || '';
        }
        div.appendChild(input);
        filterContainer.appendChild(div);
    });
    const queryBtn = document.createElement('button');
    queryBtn.className = 'ant-btn ant-btn-primary';
    queryBtn.textContent = '查询';
    queryBtn.onclick = applyFilters;
    filterContainer.appendChild(queryBtn);
}

// 动态生成表头
function renderTableHeader() {
    const tableHeader = document.querySelector('.table-header');
    tableHeader.innerHTML = '';
    tableHeader.style = 'padding: 10px;padding-left: 0px; background: #f5f5f5; font-weight: bold; border-bottom: 1px solid #ddd;';

    const checkboxDiv = document.createElement('div');
    checkboxDiv.className = 'col-checkbox';
    checkboxDiv.innerHTML = '<input type="checkbox" id="selectAll" onclick="toggleSelectAll()">';
    tableHeader.appendChild(checkboxDiv);

    config.listFields.forEach(field => {
        const div = document.createElement('div');
        div.className = field.className || '';
        div.textContent = field.label || field.name;
        tableHeader.appendChild(div);
    });
}

// 动态生成添加/编辑弹窗
function renderModal(isEditingMode) {
    let modal = document.getElementById(`${config.tableName}Modal`);
    if (!modal) {
        modal = document.createElement('div');
        modal.id = `${config.tableName}Modal`;
        modal.className = 'modal';
        document.body.appendChild(modal);
    }

    modal.innerHTML = `
        <div class="modal-content">
            <button class="close-btn" onclick="closeModal()">×</button>
            <h3 id="modalTitle">${isEditingMode ? '编辑' : '添加'}${config.tableTitle}</h3>
            <form id="${config.tableName}Form">
                <div class="ant-tabs ant-tabs-top">
                    <div class="ant-tabs-nav">
                        <div class="ant-tabs-nav-wrap">
                            <div class="ant-tabs-nav-list"></div>
                        </div>
                    </div>
                    <div class="ant-tabs-content-holder">
                        <div class="ant-tabs-content"></div>
                    </div>
                </div>
                <div class="modal-buttons">
                    <button type="button" class="ant-btn" onclick="closeModal()">取消</button>
                    <button type="button" class="ant-btn ant-btn-primary" onclick="saveRecord()">保存</button>
                </div>
            </form>
        </div>
    `;

    const navList = modal.querySelector('.ant-tabs-nav-list');
    const contentHolder = modal.querySelector('.ant-tabs-content');

    config.modalTabs.forEach((tab, index) => {
        const tabButton = document.createElement('div');
        tabButton.className = `ant-tabs-tab ${index === 0 ? 'ant-tabs-tab-active' : ''}`;
        tabButton.setAttribute('data-tab', tab.id);
        tabButton.innerHTML = `<span class="ant-tabs-tab-btn">${tab.title}</span>`;
        navList.appendChild(tabButton);

        const tabPane = document.createElement('div');
        tabPane.className = `ant-tabs-tabpane ${index === 0 ? 'ant-tabs-tabpane-active' : ''}`;
        tabPane.id = tab.id;
        tabPane.style.display = index === 0 ? 'block' : 'none';

        let fieldCount = 0;
        tab.fields.forEach(tabField => {
            const field = config.fields.find(f => f.name === tabField.name) || tabField;
            if (isEditingMode && tabField.showInEdit === false) return;
            if (!isEditingMode && tabField.showInAdd === false) return;

            fieldCount++;

            const formItem = document.createElement('div');
            formItem.className = 'ant-form-item' + (tabField.type === 'textarea' ? ' textarea-item' : tabField.type === 'file' ? ' image-item' : tabField.type === 'tree' ? ' tree-item' : '');
            formItem.dataset.fieldName = field.name;

            const label = document.createElement('label');
            label.textContent = tabField.label || field.name;
            formItem.appendChild(label);

            let input;
            if (tabField.type === 'select') {
                input = document.createElement('select');
                input.id = `modal${field.name}`;
                if (typeof tabField.options == 'function') {
                    let options = tabField.options();
                    tabField.options = options
                }
                tabField.options.forEach(opt => {
                    const option = document.createElement('option');
                    option.value = String(opt.value);
                    option.textContent = opt.label;
                    input.appendChild(option);
                });
            } else if (tabField.type === 'textarea') {
                input = document.createElement('textarea');
                input.id = `modal${field.name}`;
                input.rows = 5;
            } else if (tabField.type === 'file') {
                input = document.createElement('input');
                input.type = 'file';
                input.id = `modal${field.name}`;
                input.accept = 'image/*';
                input.onchange = (e) => previewImage(field.name, e.target);
                const previewDiv = document.createElement('div');
                previewDiv.className = 'image-preview';
                previewDiv.id = `modal${field.name}Preview`;
                formItem.appendChild(previewDiv);
            } else if (tabField.type === 'tag') {
                if (typeof tabField.options == 'function') {
                    let options = tabField.options();
                    tabField.options = options;
                }
                input = document.createElement('div');
                input.id = `modal${field.name}`;
                const tags = isEditingMode ? JSON.parse((tableData.find(item => item.id === editId) || {})[field.name] || '[]') : [];
                tags.forEach(tag => {
                    if (typeof tag == 'number') {
                        tag = tabField.options[tag]
                    }
                    input.innerHTML += `<span class="ant-tag ant-tag-${tabField.color || 'blue'}" data-value="${tag}">${tag} <span class="tag-close" onclick="removeTag(this, '${field.name}')">×</span></span>`;
                });
                if (isEditingMode ? tabField.editableInEdit : tabField.editableInAdd) {
                    const select = document.createElement('select');
                    select.onchange = () => addTag(select, field.name);
                    select.innerHTML = `<option value="">添加</option>` + tabField.options.map(opt => `<option value="${opt}">${opt}</option>`).join('');
                    input.appendChild(select);
                    if (tabField.allowCustom) {
                        const customInput = document.createElement('input');
                        customInput.type = 'text';
                        customInput.placeholder = '自定义';
                        customInput.onkeydown = (e) => {
                            if (e.key === 'Enter') addCustomTag(customInput, field.name);
                        };
                        input.appendChild(customInput);
                    }
                }
            } else if (tabField.type === 'tree') {
                input = document.createElement('div');
                input.id = `modal${field.name}`;
                input.className = 'tree-container';
                const tree = renderTree(tabField.treeData, isEditingMode ? tableLangData.filter(p => p.role_id === editId).map(p => p.resource_id.toString()) : [], field.name, isEditingMode ? tabField.editableInEdit : tabField.editableInAdd);
                input.appendChild(tree);
            }
            else if (tabField.type === 'list') {
                input = document.createElement('div'); input.id = `modal${field.name}`; input.className = 'list-container';
                const list = document.createElement('div'); list.className = 'list-items';
                const maxItems = tabField.maxItems || Infinity;
                const updateAddButton = () => {
                    let addBtn = input.querySelector('.ant-btn-primary');
                    if (list.children.length < maxItems) {
                        if (!addBtn) {
                            addBtn = document.createElement('a'); addBtn.className = 'ant-btn ant-btn-primary'; addBtn.textContent = '添加';
                            addBtn.onclick = () => {
                                if (list.children.length < maxItems) {
                                    createListItem();
                                    updateAddButton();
                                }
                            };
                            input.insertBefore(addBtn, list);
                        }
                    } else if (addBtn) {
                        addBtn.remove();
                    }
                };
                const createListItem = (item = null, idx = list.children.length) => {
                    const itemDiv = document.createElement('div'); itemDiv.className = 'list-item';
                    const removeBtn = document.createElement('button'); removeBtn.className = 'ant-btn-danger'; removeBtn.textContent = '删除';
                    removeBtn.onclick = () => { itemDiv.remove(); updateAddButton(); };
                    itemDiv.appendChild(removeBtn);
                    tabField.subFields.forEach(field => {
                        const subFormItem = document.createElement('div'); subFormItem.className = 'ant-form-item' + (field.type === 'textarea' ? ' textarea-item' : field.type === 'file' ? ' image-item' : '');
                        const label = document.createElement('label'); label.textContent = field.label; subFormItem.appendChild(label);
                        let subInput;
                        if (field.type === 'select') {
                            subInput = document.createElement('select'); subInput.className = 'ant-select';
                            subInput.innerHTML = field.options.map(opt => `<option value="${opt.value}">${opt.label}</option>`).join('');
                            if (item) subInput.value = item[field.name] || '';
                        } else if (field.type === 'textarea') {
                            subInput = document.createElement('textarea'); subInput.rows = 3;
                            if (item) subInput.value = item[field.name] || '';
                        } else if (field.type === 'file') {
                            subInput = document.createElement('input'); subInput.type = 'file'; subInput.accept = 'image/*'; subInput.multiple = true;
                            const previewDiv = document.createElement('div'); previewDiv.className = 'image-preview';
                            if (item && item[field.name]) {
                                JSON.parse(item[field.name] || '[]').forEach(img => {
                                    const wrapper = document.createElement('div'); wrapper.className = 'image-wrapper';
                                    const imgTag = document.createElement('img'); imgTag.src = img; imgTag.className = 'preview-img';
                                    const delBtn = document.createElement('button'); delBtn.className = 'delete-btn'; delBtn.textContent = '×';
                                    delBtn.onclick = () => wrapper.remove();
                                    wrapper.appendChild(imgTag); wrapper.appendChild(delBtn); previewDiv.appendChild(wrapper);
                                });
                            }
                            subInput.onchange = (e) => {
                                Array.from(e.target.files).forEach(file => {
                                    const reader = new FileReader();
                                    reader.onload = (ev) => {
                                        const wrapper = document.createElement('div'); wrapper.className = 'image-wrapper';
                                        const img = document.createElement('img'); img.src = ev.target.result; img.className = 'preview-img';
                                        const delBtn = document.createElement('button'); delBtn.className = 'delete-btn'; delBtn.textContent = '×';
                                        delBtn.onclick = () => wrapper.remove();
                                        wrapper.appendChild(img); wrapper.appendChild(delBtn); previewDiv.appendChild(wrapper);
                                    };
                                    reader.readAsDataURL(file);
                                });
                            };
                            subFormItem.appendChild(previewDiv);
                        } else {
                            subInput = document.createElement('input'); subInput.type = field.type || 'text';
                            if (item) subInput.value = item[field.name] || '';
                        }
                        subInput.id = `modal${field.name}_${field.name}_${idx}`;
                        subFormItem.appendChild(subInput);
                        itemDiv.appendChild(subFormItem);
                    });
                    list.appendChild(itemDiv);
                };
                input.appendChild(list);
                if (isEditingMode) {
                    const record = tableData.find(item => item.id === editId);
                    const items = JSON.parse(record[field.name] || '[]');
                    if (items.length > 0) {
                        items.forEach((item, idx) => createListItem(item, idx));
                    }
                }
                updateAddButton();
            }
            else if (tabField.type === 'attr') {
                input = document.createElement('div');
                input.id = `modal${field.name}`;
                input.className = 'attr-container';
                const attrSelect = document.createElement('select');
                attrSelect.className = 'ant-select attr-select';
                attrSelect.innerHTML = '<option value="">选择属性</option>' + tabField.attrOptions.map(opt => `<option value="${opt.id}">${opt.name}</option>`).join('');
                const valueSelect = document.createElement('select');
                valueSelect.className = 'ant-select value-select';
                valueSelect.disabled = true;
                valueSelect.innerHTML = '<option value="">选择属性值</option>';
                const addBtn = document.createElement('button');
                addBtn.className = 'ant-btn ant-btn-primary';
                addBtn.textContent = '添加';
                addBtn.disabled = true;
                addBtn.onclick = () => {
                    const attrId = attrSelect.value;
                    const valueId = valueSelect.value;
                    if (attrId && valueId) {
                        const attrName = tabField.attrOptions.find(opt => opt.id == attrId)?.name;
                        const valueName = tabField.valueOptions[attrId]?.find(v => v.id == valueId)?.name;
                        if (attrName && valueName) {
                            const tags = JSON.parse(input.dataset.tags || '[]');
                            if (!tags.some(t => t.attrId == attrId)) {
                                const tag = `<span class="ant-tag ant-tag-${tabField.color || 'blue'}" data-attr-id="${attrId}" data-value-id="${valueId}">${attrName}: ${valueName} <span class="tag-close" onclick="removeTag(this, '${field.name}')">×</span></span>`;
                                input.insertBefore(document.createRange().createContextualFragment(tag), attrSelect);
                                tags.push({ attrId, valueId });
                                input.dataset.tags = JSON.stringify(tags);
                                attrSelect.value = '';
                                valueSelect.value = '';
                                valueSelect.disabled = true;
                                addBtn.disabled = true;
                                valueSelect.innerHTML = '<option value="">选择属性值</option>';
                                const options = Array.from(attrSelect.options).map(opt => opt.value);
                                const usedAttrs = tags.map(t => t.attrId.toString());
                                attrSelect.innerHTML = '<option value="">选择属性</option>' + tabField.attrOptions
                                    .filter(opt => !usedAttrs.includes(opt.id.toString()))
                                    .map(opt => `<option value="${opt.id}">${opt.name}</option>`).join('');
                            }
                        }
                    }
                };
                attrSelect.onchange = () => {
                    valueSelect.disabled = !attrSelect.value;
                    addBtn.disabled = !attrSelect.value;
                    valueSelect.innerHTML = '<option value="">选择属性值</option>';
                    if (attrSelect.value) {
                        const values = tabField.valueOptions[attrSelect.value] || [];
                        valueSelect.innerHTML += values.map(v => `<option value="${v.id}">${v.name}</option>`).join('');
                    }
                };
                valueSelect.onchange = () => addBtn.disabled = !valueSelect.value;
                input.appendChild(attrSelect);
                input.appendChild(valueSelect);
                input.appendChild(addBtn);
                if (isEditingMode) {
                    const record = tableData.find(item => item.id === editId);
                    const tags = JSON.parse(record[field.name] || '[]');
                    tags.forEach(tag => {
                        const attrName = tabField.attrOptions.find(opt => opt.id == tag.attrId)?.name;
                        const valueName = tabField.valueOptions[tag.attrId]?.find(v => v.id == tag.valueId)?.name;
                        if (attrName && valueName) {
                            input.innerHTML += `<span class="ant-tag ant-tag-${tabField.color || 'blue'}" data-attr-id="${tag.attrId}" data-value-id="${tag.valueId}">${attrName}: ${valueName} <span class="tag-close" onclick="removeTag(this, '${field.name}')">×</span></span>`;
                        }
                    });
                    input.dataset.tags = JSON.stringify(tags);
                    const usedAttrs = tags.map(t => t.attrId.toString());
                    attrSelect.innerHTML = '<option value="">选择属性</option>' + tabField.attrOptions
                        .filter(opt => !usedAttrs.includes(opt.id.toString()))
                        .map(opt => `<option value="${opt.id}">${opt.name}</option>`).join('');
                }
            }
            else if (tabField.type === 'table-list') {
                input = document.createElement('div');
                input.id = `modal${field.name}`;
                input.className = 'table-list';
                const list = document.createElement('div');
                list.className = 'list-items';
                input.appendChild(list);

                const maxItems = tabField.maxItems || Infinity;
                const createListItem = (item = null, idx = list.children.length) => {
                    const itemDiv = document.createElement('div');
                    itemDiv.className = 'field-list-item';
                    itemDiv.draggable = true;
                    itemDiv.dataset.index = idx;

                    tabField.subFields.forEach(subField => {
                        const subFormItem = document.createElement('div');
                        subFormItem.className = 'ant-form-item';
                        const label = document.createElement('label');
                        label.textContent = subField.label;
                        subFormItem.appendChild(label);
                        let subInput;
                        if (subField.type == 'select'){
                            subInput = document.createElement('select');
                            subInput.id = `${tabField.name}_${subField.name}_${idx}`;
                            if (typeof subField.options === 'function') {
                                subField.options = subField.options();
                            }
                            subInput.innerHTML = subField.options.map(opt => `<option value="${opt.value}" ${item && item[subField.name] == opt.value ? 'selected' : ''}>${opt.label}</option>`).join('');
                        } else {
                            subInput = document.createElement('input');
                            subInput.type = subField.type || 'text';
                            subInput.placeholder = subField.placeholder || '';
                            subInput.id = `${tabField.name}_${subField.name}_${idx}`;
                        }
                        subFormItem.appendChild(subInput);
                        itemDiv.appendChild(subFormItem);
                    });

                    const removeBtn = document.createElement('button');
                    removeBtn.className = 'ant-btn ant-btn-danger';
                    removeBtn.textContent = '刪除';
                    removeBtn.onclick = (e) => {
                        e.preventDefault();
                        itemDiv.remove();
                        updateAddButton();
                    };
                    itemDiv.appendChild(removeBtn);

                    itemDiv.addEventListener('dragstart', (e) => {
                        e.target.dataset.index = idx;
                        draggedFieldIndex = idx;
                        e.target.classList.add('dragging');
                        e.dataTransfer.effectAllowed = 'move';
                    });
                    itemDiv.addEventListener('dragover', (e) => {
                        e.preventDefault();
                        e.dataTransfer.dropEffect = 'move';
                    });
                    itemDiv.addEventListener('drop', (e) => {
                        e.preventDefault();
                        const targetIndex = parseInt(e.target.closest('.field-list-item').dataset.index);
                        if (draggedFieldIndex !== null && draggedFieldIndex !== targetIndex) {
                            const items = Array.from(list.children);
                            const [draggedItem] = items.splice(draggedFieldIndex, 1);
                            items.splice(targetIndex, 0, draggedItem);
                            list.innerHTML = '';
                            items.forEach((item, newIdx) => {
                                item.dataset.index = newIdx;
                                const selects = item.querySelectorAll('select');
                                if (selects[0]) selects[0].id = `modal_${tabField.id}_${tabField.subFields[0].name}_${newIdx}`;
                                if (selects[1]) selects[1].id = `modal_${tabField.id}_${tabField.subFields[1].name}_${newIdx}`;
                                list.appendChild(item);
                            });
                            draggedFieldIndex = null;
                        }
                    });
                    itemDiv.addEventListener('dragend', (e) => {
                        e.target.classList.remove('dragging');
                        draggedFieldIndex = null;
                    });

                    list.appendChild(itemDiv);
                };

                const updateAddButton = () => {
                    let addBtn = input.querySelector('.add-field-btn');
                    if (list.children.length < maxItems) {
                        if (!addBtn) {
                            addBtn = document.createElement('button');
                            addBtn.className = 'ant-btn ant-btn-primary add-field-btn';
                            addBtn.textContent = '添加';
                            addBtn.onclick = (e) => {
                                e.preventDefault();
                                if (list.children.length < maxItems) {
                                    createListItem();
                                    updateAddButton();
                                } else {
                                    alert(`最多添加${maxItems}個字段`);
                                }
                            };
                            input.appendChild(addBtn);
                        }
                    } else if (addBtn) {
                        addBtn.remove();
                    }
                };

                if (isEditingMode) {
                    const record = tableData.find(item => item.id === editId);
                    const items = record[field.name] || [];
                    if (items.length > 0) {
                        items.forEach((item, idx) => createListItem(item, idx));
                    }
                }

                updateAddButton();
            }
            else {
                input = document.createElement('input');
                input.type = tabField.type || 'text';
                input.placeholder = tabField.placeholder || '';
                input.value = undefined === tabField.defaultValue ? '' : tabField.defaultValue;
                input.id = `modal${field.name}`;
            }
            input.disabled = isEditingMode ? !tabField.editableInEdit : !tabField.editableInAdd;
            formItem.appendChild(input);
            tabPane.appendChild(formItem);
        });


        if (fieldCount <= 0){
            navList.removeChild(tabButton)
        }

        contentHolder.appendChild(tabPane);
    });

    const inkBar = document.createElement('div');
    inkBar.className = 'ant-tabs-ink-bar ant-tabs-ink-bar-animated';
    inkBar.style.left = '0';
    inkBar.style.width = '80px';
    navList.appendChild(inkBar);

    setupTabs();

    if (isEditingMode) {
        const record = tableData.find(item => item.id === editId);
        config.modalTabs.forEach(tab => {
            tab.fields.forEach(tabField => {
                const field = config.fields.find(f => f.name === tabField.name) || tabField;
                const element = document.getElementById(`modal${field.name}`);
                if (!element || tabField.type === 'tree' || tabField.type === 'file' || tabField.type === 'tag') return;
                const value = record[field.name];
                element.value = value !== undefined && value !== null ? String(value) : '';
            });
        });
    }
}

// 渲染树状结构
function renderTree(treeData, checkedKeys, fieldName, editable) {
    const container = document.createElement('div');

    function renderNode(nodes, level = 0) {
        const ul = document.createElement('ul');
        ul.className = 'ant-tree-list0';
        nodes.forEach(node => {
            const li = document.createElement('li');
            li.className = 'ant-tree-treenode0';
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.value = node.key;
            checkbox.checked = checkedKeys.includes(node.key);
            checkbox.disabled = !editable;
            checkbox.dataset.fieldName = fieldName;
            checkbox.onchange = () => updateTreeSelection(fieldName);
            li.appendChild(checkbox);
            const title = document.createElement('span');
            title.textContent = node.title;
            title.style.marginLeft = `${level * 0.05}em`;
            li.appendChild(title);
            if (node.children) {
                li.appendChild(renderNode(node.children, level + 1));
            }
            ul.appendChild(li);
        });
        return ul;
    }

    container.appendChild(renderNode(treeData));
    return container;
}

// 更新树的选择状态
function updateTreeSelection(fieldName) {
    const checkboxes = document.querySelectorAll(`#modal${fieldName} .ant-tree0 input[type="checkbox"]`);
    checkboxes.forEach(checkbox => {
        const parent = checkbox.closest('.ant-tree-treenode0');
        const children = parent.querySelectorAll('.ant-tree-treenode0 input[type="checkbox"]');
        if (checkbox.checked) {
            children.forEach(child => child.checked = true);
        }
        const siblings = parent.parentElement.querySelectorAll(':scope > .ant-tree-treenode0 > input[type="checkbox"]');
        const allChecked = Array.from(siblings).every(sib => sib.checked);
        const parentCheckbox = parent.parentElement.closest('.ant-tree-treenod0e')?.querySelector('input[type="checkbox"]');
        if (parentCheckbox) parentCheckbox.checked = allChecked;
    });
}

// 添加
function addTag(select, fieldName) {
    const value = select.value;
    if (!value) return;
    const container = document.getElementById(`modal${fieldName}`);
    const tags = Array.from(container.querySelectorAll('.ant-tag')).map(tag => tag.dataset.value);
    if (!tags.includes(value)) {
        const color = container.closest('.ant-form-item').querySelector('label').nextElementSibling.className.includes('ant-tag-')
            ? container.closest('.ant-form-item').querySelector('.ant-tag').className.match(/ant-tag-\w+/)[0].replace('ant-tag-', '')
            : 'blue';
        container.insertBefore(document.createRange().createContextualFragment(`<span class="ant-tag ant-tag-${color}" data-value="${value}">${value} <span class="tag-close" onclick="removeTag(this, '${fieldName}')">×</span></span>`), select);

        // 从下拉列表中移除已选项
        const option = select.querySelector(`option[value="${value}"]`);
        if (option) option.remove();
    }
    select.value = '';
}

// 添加自定义
function addCustomTag(input, fieldName) {
    const value = input.value.trim();
    if (!value) return;
    const container = document.getElementById(`modal${fieldName}`);
    const tags = Array.from(container.querySelectorAll('.ant-tag')).map(tag => tag.dataset.value);
    if (!tags.includes(value)) {
        const color = container.closest('.ant-form-item').querySelector('label').nextElementSibling.className.includes('ant-tag-') ? container.closest('.ant-form-item').querySelector('.ant-tag').className.match(/ant-tag-\w+/)[0].replace('ant-tag-', '') : 'orange';
        container.insertBefore(document.createRange().createContextualFragment(`<span class="ant-tag ant-tag-${color}" data-value="${value}">${value} <span class="tag-close" onclick="removeTag(this, '${fieldName}')">×</span></span>`), container.querySelector('select'));
    }
    input.value = '';
}

// 删除
function removeTag(closeBtn) {
    closeBtn.parentElement.remove();
}
function removeTag(closeBtn, fieldName) {
    const tag = closeBtn.parentElement;
    const value = tag.dataset.value;
    tag.remove();

    // 将移除的选项加回下拉列表并排序
    const container = document.getElementById(`modal${fieldName}`);
    const select = container.querySelector('select');
    const options = Array.from(select.options).map(opt => ({ value: opt.value, text: opt.text }));

    // 从配置中获取原始选项文本（假设 tabField.options 可用）
    const tabField = config.modalTabs
        .flatMap(tab => tab.fields)
        .find(f => f.name === fieldName && f.type === 'tag');
    const optionText = tabField?.options?.find(opt => opt.value === value)?.label || value;

    options.push({ value: value, text: optionText });
    options.sort((a, b) => a.value === '' ? -1 : a.value.localeCompare(b.value)); // 保持“添加”选项在首位并按值排序
    select.innerHTML = options.map(opt => `<option value="${opt.value}">${opt.text}</option>`).join('');
}

// 生成样本数据
async function fetchTableData(sampleCount) {
    console.log(`Fetching data for table: ${config.tableName}, sample count: ${sampleCount}`);
    tableData = [];
    tableLangData = [];

    const batchSize = 100; // 每批生成 50 条数据
    const languages = config.langFields?.languages || ['en_US'];
    const totalBatches = Math.ceil(sampleCount / batchSize);

    // 显示加载提示
    const listContainer = getTableDataListElement();
    listContainer.innerHTML = '<div class="ant-spin ant-spin-spinning"><span class="ant-spin-dot ant-spin-dot-spin"><i class="ant-spin-dot-item"></i><i class="ant-spin-dot-item"></i><i class="ant-spin-dot-item"></i><i class="ant-spin-dot-item"></i></span><span> 数据加载中...</span></div>';

    // 分批生成数据的异步函数
    async function generateBatch(start, end) {
        return new Promise(resolve => {
            setTimeout(() => {
                for (let i = start; i <= end && i <= sampleCount; i++) {
                    const record = generateRecord(i);
                    tableData.push(record);

                    if (config.langFields) {
                        languages.forEach((lang, index) => {
                            const langRecord = generateLangRecord(i, lang, index);
                            tableLangData.push(langRecord);
                        });
                    }
                }
                resolve();
            }, 0); // 将任务推到下一个事件循环
        });
    }

    // 逐步生成所有批次
    for (let batch = 0; batch < totalBatches; batch++) {
        const start = batch * batchSize + 1;
        const end = Math.min(start + batchSize - 1, sampleCount);
        await generateBatch(start, end);
        // 可选：每批完成后更新 UI，显示进度
        listContainer.innerHTML = `<div class="ant-spin ant-spin-spinning"><span class="ant-spin-dot ant-spin-dot-spin"><i class="ant-spin-dot-item"></i><i class="ant-spin-dot-item"></i><i class="ant-spin-dot-item"></i><i class="ant-spin-dot-item"></i></span><span> 数据加载中 (${Math.min((batch + 1) * batchSize, sampleCount)}/${sampleCount})...</span></div>`;
    }

    // 数据生成完成后渲染列表
    renderTableList();
}

// 生成主表记录
function generateRecord(id) {
    const record = {id};
    config.fields.forEach(field => {
        if (field.isSystemField) {
            record[field.name] = field.generator ? field.generator(id) : moment().unix();
        } else if (!field.isLangField) {
            record[field.name] = field.generator ? field.generator(id) : `Value_${id}`; // 默认值确保非空
        }
    });
    config.values[id] = record
    return record;
}

// 生成多语言表记录
function generateLangRecord(id, lang, index) {
    const langRecord = {
        id: id * (config.langFields?.languages.length || 1) + index + 1,
        [config.langFields.foreignKey]: id,
        language: lang
    };

    config.fields.filter(f => f.isLangField).forEach(field => {
        if (/(pic|logo|avatar|show_data|extra_data)/i.test(field.name)) {
            langRecord[field.name] = field.generator ? field.generator(id, lang) : getRandomImage('sexy');
        } else {
            langRecord[field.name] = field.generator ? field.generator(id, lang) : `${lang}_${field.name}_${id}`;
        }
    });

    config.values[id] = Object.assign({}, config.values[id] , langRecord);
    return langRecord;
}

function getTableDataListElement() {
    let list = document.getElementById(`${config.tableName}-list`.replaceAll("_", "-"))
    let _list = document.getElementById(`${config.tableName}-list`)
    return _list ?? list;
}

// 渲染表内容
function renderTableList() {
    const listContainer = getTableDataListElement();
    listContainer.innerHTML = '<div class="ant-spin ant-spin-spinning"><span class="ant-spin-dot ant-spin-dot-spin"><i class="ant-spin-dot-item"></i><i class="ant-spin-dot-item"></i><i class="ant-spin-dot-item"></i><i class="ant-spin-dot-item"></i></span></div>';

    requestAnimationFrame(() => {
        listContainer.innerHTML = '';

        const start = (currentPage - 1) * perPage;
        const end = Math.min(start + perPage, tableData.length);
        const paginatedData = tableData.slice(start, end);

        let randomLang = randomInt(0, config.langFields?.languages.length - 1) ?? 0;
        const langFilter = document.querySelector(`#languageFilter`)?.value || (config.langFields?.languages[randomLang] || '');
        paginatedData.forEach(item => {
            const row = document.createElement('div');
            row.className = 'task-item';
            row.style = 'border-bottom: 1px solid #ddd;';
            let rowHtml = `<div class="col-checkbox"><input type="checkbox" class="select-item" data-id="${item.id}"></div>`;

            config.listFields.forEach(field => {
                let value;
                if (field.isLangField && langFilter) {
                    const langData = tableLangData.find(l => l[config.langFields.foreignKey] === item.id && l.language === langFilter);
                    value = langData ? langData[field.name] : '';
                } else {
                    value = item[field.name];
                }
                rowHtml += `<div class="${field.className || ''}">${field.formatter ? field.formatter(value, item) : (value !== undefined && value !== null ? value : '')}</div>`;
            });

            row.innerHTML = rowHtml;
            listContainer.appendChild(row);
        });

        updatePaginationInfo();
    });
}

// 更新分页信息
function updatePaginationInfo() {
    const totalPages = Math.ceil(tableData.length / perPage);
    const pageInfo = document.getElementById('page-info');
    if (pageInfo) {
        pageInfo.textContent = `第 ${currentPage} 页 / 共 ${totalPages} 页`;
    }
    const pageJump = document.getElementById('pageJump');
    if (pageJump) {
        pageJump.max = totalPages;
        pageJump.value = currentPage;
    }
}

// 初始化分页控件
function setupPagination() {
    const pagination = document.querySelector('.pagination');
    pagination.innerHTML = `
        <button class="ant-btn" onclick="changePage(-1)">上一页</button>
        <input type="number" id="pageJump" min="1" class="ant-input" style="width: 60px; padding: 4px;" placeholder="页码">
        <button class="ant-btn" onclick="jumpToPage()">跳转</button>
        <span id="page-info">第 1 页 / 共 1 页</span>
        <div class="ant-select ant-select-single ant-select-show-arrow">
            <select class="ant-select" id="perPage" onchange="changePerPage()">
                <option value="10">10 条/页</option>
                <option value="20" selected>20 条/页</option>
                <option value="50">50 条/页</option>
                <option value="100">100 条/页</option>
            </select>
        </div>
        <button class="ant-btn" onclick="changePage(1)">下一页</button>
    `;
}

// 应用筛选
function applyFilters() {
    let filteredData = tableData;
    config.filterFields.forEach(field => {
        const element = document.getElementById(`${field.id}Filter`);
        if (element && element.value) {
            filteredData = field.filter(filteredData, element.value);
        }
    });
    currentPage = 1;
    tableData = filteredData;
    renderTableList();
}

// 分页相关函数
function changePage(delta) {
    const totalPages = Math.ceil(tableData.length / perPage);
    currentPage += delta;
    if (currentPage < 1) currentPage = 1;
    if (currentPage > totalPages) currentPage = totalPages;
    renderTableList();
}

function jumpToPage() {
    const page = parseInt(document.getElementById('pageJump').value);
    const totalPages = Math.ceil(tableData.length / perPage);
    if (page >= 1 && page <= totalPages) {
        currentPage = page;
        renderTableList();
    } else {
        alert('请输入有效的页码');
    }
}

function changePerPage() {
    perPage = parseInt(document.getElementById('perPage').value);
    currentPage = 1;
    renderTableList();
}

function toggleSelectAll() {
    const selectAll = document.getElementById('selectAll').checked;
    document.querySelectorAll('.select-item').forEach(checkbox => checkbox.checked = selectAll);
}

// 添加记录
function addRecord() {
    isEditing = false;
    editId = null;
    resetModal();
    renderModal(false);
    document.getElementById(`${config.tableName}Modal`).style.display = 'block';
}

// 编辑记录
function editRecord(id, isViewOnly = false) {
    isEditing = true;
    editId = id;
    const record = tableData.find(item => item.id === id);
    const lang = config.langFields ? tableLangData.find(l => l[config.langFields.foreignKey] === id && l.language === config.langFields.languages[0]) : {};

    resetModal();
    renderModal(true);
    document.getElementById('modalTitle').textContent = `${isViewOnly ? '查看' : '编辑'}${config.tableTitle}`;

    // 初始化 currentImageContext 为当前记录的图片 URL
    currentImageContext = record.brand_logo;

    config.modalTabs.forEach(tab => {
        tab.fields.forEach(tabField => {
            const field = config.fields.find(f => f.name === tabField.name) || tabField;
            const element = document.getElementById(`modal${field.name}`);
            if (!element) return;

            if (tabField.type === 'file') {
                const value = field.isLangField ? lang[field.name] : record[field.name];
                if (value) {
                    renderImagePreview(field.name, value);
                }
            } else {
                const value = field.isLangField ? lang[field.name] : (tabField.formatter ? tabField.formatter(record[field.name]) : record[field.name]);
                element.value = value !== undefined && value !== null ? String(value) : '';
            }
        });
    });

    document.getElementById(`${config.tableName}Modal`).style.display = 'block';
}

// 保存记录
function saveRecord() {
    const record = {id: isEditing ? editId : tableData.length + 1};
    const langRecord = config.langFields ? {
        id: tableLangData.length + 1,
        [config.langFields.foreignKey]: record.id,
        language: document.getElementById('modallanguage')?.value || config.langFields.languages[0]
    } : null;

    config.modalTabs.forEach(tab => {
        tab.fields.forEach(tabField => {
            const field = config.fields.find(f => f.name === tabField.name) || tabField;
            const element = document.getElementById(`modal${field.name}`);
            if (!element) return;
            const value = element.value;

            if (field.isLangField && langRecord) {
                if (tabField.type === 'file') {
                    langRecord[field.name] = currentImageContext || (isEditing ? tableLangData.find(l => l[config.langFields.foreignKey] === editId && l.language === langRecord.language)?.[field.name] : '');
                } else {
                    langRecord[field.name] = value === '' ? '' : (tabField.type === 'number' ? parseInt(value) : value);
                }
            } else if (tabField.type === 'tag') {
                const tags = Array.from(element.querySelectorAll('.ant-tag')).map(tag => tag.dataset.value);
                record[field.name] = JSON.stringify(tags);
            } else if (tabField.type === 'tree') {
                const checkedKeys = Array.from(element.querySelectorAll('input[type="checkbox"]:checked')).map(cb => cb.value);
                const resourceIds = checkedKeys.filter(key => !key.includes('-')).map(key => parseInt(key));
                record[field.name] = JSON.stringify(resourceIds);
                resourceIds.forEach((resourceId, index) => {
                    langRecords.push({
                        id: isEditing ? tableLangData.find(l => l.role_id === editId && l.resource_id === resourceId)?.id || (tableLangData.length + index + 1) : (tableLangData.length + index + 1),
                        role_id: record.id,
                        resource_id: resourceId
                    });
                });
            } else if (!field.isSystemField) {
                if (tabField.type === 'file') {
                    // 如果是编辑模式且未上传新图片，保留原有图片值
                    record[field.name] = isEditing && !currentImageContext ? tableData.find(item => item.id === editId)[field.name] : currentImageContext;
                } else {
                    record[field.name] = value === '' ? '' : (tabField.type === 'number' ? parseInt(value) : value);
                }
            } else if (tabField.type === 'attr') {
                const tags = JSON.parse(element.dataset.tags || '[]');
                record[field.name] = JSON.stringify(tags);
            } else if (tabField.type === 'list') {
                const items = [];
                const listItems = element.querySelectorAll('.list-item');
                listItems.forEach((itemDiv, idx) => {
                    const item = {};
                    tabField.subFields.forEach(subField => {
                        const subInput = document.getElementById(`modal${field.name}_${subField.name}_${idx}`);
                        if (subField.type === 'file') {
                            const previewDiv = subInput.nextElementSibling;
                            const images = Array.from(previewDiv.querySelectorAll('img')).map(img => img.src);
                            item[subField.name] = JSON.stringify(images);
                        } else {
                            item[subField.name] = subInput ? (subField.type === 'number' ? parseInt(subInput.value) || 0 : subInput.value) : '';
                        }
                    });
                    items.push(item);
                });
                record[field.name] = JSON.stringify(items);
            }
        });
    });

    if (isEditing) {
        const index = tableData.findIndex(item => item.id === editId);
        tableData[index] = {...tableData[index], ...record, update_time: moment().unix()};
        if (langRecord) {
            const langIndex = tableLangData.findIndex(l => l[config.langFields.foreignKey] === editId && l.language === langRecord.language);
            if (langIndex !== -1) tableLangData[langIndex] = {...tableLangData[langIndex], ...langRecord};
            else tableLangData.push(langRecord);
        }
    } else {
        record.create_time = moment().unix();
        record.update_time = moment().unix();
        tableData.push(record);
        if (langRecord) tableLangData.push(langRecord);
    }
    closeModal();
    renderTableList();
}

// 重置弹窗
function resetModal() {
    config.modalTabs.forEach(tab => {
        tab.fields.forEach(tabField => {
            const field = config.fields.find(f => f.name === tabField.name) || tabField;
            const element = document.getElementById(`modal${field.name}`);
            if (element) {
                if (tabField.type === 'file') {
                    element.value = '';
                    document.getElementById(`modal${field.name}Preview`).innerHTML = '';
                } else {
                    element.value = '';
                }
                element.disabled = isEditing ? !tabField.editableInEdit : !tabField.editableInAdd;
            }
        });
    });
}

// 删除记录
function deleteRecord(id) {
    if (confirm(`确定要删除此${config.tableTitle}记录吗？`)) {
        tableData = tableData.filter(item => item.id !== id);
        if (config.langFields) tableLangData = tableLangData.filter(lang => lang[config.langFields.foreignKey] !== id);
        renderTableList();
    }
}

// 批量删除
function batchDelete() {
    const selectedIds = getSelectedIds();
    if (selectedIds.length === 0) {
        alert(`请先选择要删除的${config.tableTitle}`);
        return;
    }
    if (confirm(`确定要删除 ${selectedIds.length} 个${config.tableTitle}记录吗？`)) {
        tableData = tableData.filter(item => !selectedIds.includes(item.id));
        if (config.langFields) tableLangData = tableLangData.filter(lang => !selectedIds.includes(lang[config.langFields.foreignKey]));
        renderTableList();
    }
}

// 新增：动态渲染操作按钮
function renderActionButtons() {
    const actionContainer = document.querySelector('.action-container');
    actionContainer.innerHTML = '';

    config.actionButtons.forEach((buttonConfig, index) => {
        const button = document.createElement('button');
        button.className = buttonConfig.className;
        button.textContent = buttonConfig.label;
        if (buttonConfig.color) {
            button.style.backgroundColor = buttonConfig.color;
            button.style.color = '#fff';
        }
        button.style.marginRight = '8px'; // 添加按钮间隙
        button.onclick = () => {
            if(typeof window[buttonConfig.action] == 'function'){
                window[buttonConfig.action]()
            }else if (buttonConfig.action === 'addRecord') {
                addRecord();
            } else if (buttonConfig.action === 'batchDelete') {
                batchDelete();
            }else if (buttonConfig.field) {
                batchEditField(buttonConfig.field);
            }
        };
        actionContainer.appendChild(button);
    });

    // 移除最后一个按钮的右边距，避免多余间隙
    const buttons = actionContainer.querySelectorAll('button');
    if (buttons.length > 0) {
        buttons[buttons.length - 1].style.marginRight = '0';
    }
}

// 批量修改索引字段
function batchEditField(fieldConfig) {
    const selectedIds = getSelectedIds();
    if (selectedIds.length === 0) {
        alert(`请先选择要修改${fieldConfig.label}的${config.tableTitle}`);
        return;
    }

    let modal = document.getElementById(`${fieldConfig.name}Modal`);
    if (!modal) {
        modal = document.createElement('div');
        modal.id = `${fieldConfig.name}Modal`;
        modal.className = 'modal';
        document.body.appendChild(modal);
    }
    if (typeof fieldConfig.options == 'function') {
        fieldConfig.options = fieldConfig.options()
    }
    modal.innerHTML = `
        <div class="modal-content">
            <button class="close-btn" onclick="closeFieldModal('${fieldConfig.name}')">×</button>
            <h3>批量修改${fieldConfig.label}</h3>
            <form id="${fieldConfig.name}Form">
                <div class="ant-form-item">
                    <label>选中的ID:</label>
                    <input type="text" id="selectedIds${fieldConfig.name}" disabled>
                </div>
                <div class="ant-form-item">
                    <label>新${fieldConfig.label}:</label>
                    <select class="ant-select" id="new${fieldConfig.name}">
                        ${fieldConfig.options.map(opt => `<option value="${opt.value}">${opt.label}</option>`).join('')}
                    </select>
                </div>
                <div class="modal-buttons">
                    <button type="button" class="ant-btn" onclick="closeFieldModal('${fieldConfig.name}')">取消</button>
                    <button type="button" class="ant-btn ant-btn-primary" onclick="saveBatchField(config.actionButtons[${config.actionButtons.findIndex(btn => btn.field && btn.field.name === fieldConfig.name)}].field)">保存</button>
                </div>
            </form>
        </div>
    `;

    document.getElementById(`selectedIds${fieldConfig.name}`).value = selectedIds.join(', ');
    modal.style.display = 'block';
}

function saveBatchField(fieldConfig) {
    const newValue = fieldConfig.type === 'number'
        ? parseInt(document.getElementById(`new${fieldConfig.name}`).value)
        : document.getElementById(`new${fieldConfig.name}`).value;
    const selectedIds = getSelectedIds();
    tableData = tableData.map(item => selectedIds.includes(item.id) ? {
        ...item,
        [fieldConfig.name]: newValue,
        update_time: moment().unix()
    } : item);
    closeFieldModal(fieldConfig.name);
    renderTableList();
}

function closeFieldModal(fieldName) {
    const modal = document.getElementById(`${fieldName}Modal`);
    if (modal) modal.style.display = 'none';
}

// 获取选中ID
function getSelectedIds() {
    return Array.from(document.querySelectorAll('.select-item:checked')).map(cb => parseInt(cb.dataset.id));
}

// 关闭主弹窗
function closeModal() {
    document.getElementById(`${config.tableName}Modal`).style.display = 'none';
    currentImageContext = null;
}

// 设置页签
function setupTabs() {
    const modal = document.getElementById(`${config.tableName}Modal`);
    if (!modal) return;

    const tabButtons = modal.querySelectorAll('.ant-tabs-tab');
    const tabPanes = modal.querySelectorAll('.ant-tabs-tabpane');
    const inkBar = modal.querySelector('.ant-tabs-ink-bar');

    tabButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            tabButtons.forEach(btn => btn.classList.remove('ant-tabs-tab-active'));
            tabPanes.forEach(pane => pane.style.display = 'none');

            button.classList.add('ant-tabs-tab-active');
            const tabId = button.getAttribute('data-tab');
            const activePane = modal.querySelector(`#${tabId}`);
            if (activePane) {
                activePane.style.display = 'block';
            }

            inkBar.style.left = `${button.offsetLeft}px`;
            inkBar.style.width = `${button.offsetWidth}px`;
        });
    });
}

// 图片预览
function previewImage(field, input) {
    const file = input.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            currentImageContext = e.target.result;
            renderImagePreview(field, e.target.result);
        };
        reader.readAsDataURL(file);
    }
}


function renderImagePreview(field, url) {
    const preview = document.getElementById(`modal${field}Preview`);
    preview.innerHTML = '';
    if (url) {
        let urls = [];
        if (url.indexOf("[") !== -1) {
            urls = JSON.parse(url)
        } else {
            urls = [url]
        }
        urls.forEach(url => {
            const wrapper = document.createElement('div');
            wrapper.className = 'image-wrapper';
            const img = document.createElement('img');
            img.src = url;
            img.onclick = () => enlargeImage(null, 0, [url]);
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'delete-btn';
            deleteBtn.textContent = '×';
            deleteBtn.onclick = () => {
                currentImageContext = '';
                preview.innerHTML = '';
            };
            wrapper.appendChild(img);
            wrapper.appendChild(deleteBtn);
            preview.appendChild(wrapper);
        })
    }
}

function enlargeImage(id, index, picsArray = null) {
    currentImageContext = id ? tableLangData.find(lang => lang[config.langFields.foreignKey] === id && lang.language === config.langFields.languages[0]).cover_pic : picsArray[0];
    currentImageIndex = index;
    const pics = picsArray || [currentImageContext].filter(Boolean);
    document.getElementById('enlargedImage').src = pics[currentImageIndex];
    const modal = document.getElementById('imageModal');
    modal.style.zIndex = '1001'; // 确保图片预览弹窗在添加/编辑弹窗之上
    const leftBtn = modal.querySelector('.carousel-btn.left');
    const rightBtn = modal.querySelector('.carousel-btn.right');
    if (pics.length > 1) {
        leftBtn.style.display = 'block';
        rightBtn.style.display = 'block';
    } else {
        leftBtn.style.display = 'none';
        rightBtn.style.display = 'none';
    }
    modal.style.display = 'block';
}

function shiftImage(direction) {
    const pics = currentImageContext ? [currentImageContext].filter(Boolean) : [currentImageContext];
    currentImageIndex = (currentImageIndex + direction + pics.length) % pics.length;
    document.getElementById('enlargedImage').src = pics[currentImageIndex];
}

function closeImageModal() {
    document.getElementById('imageModal').style.display = 'none';
    currentImageIndex = 0;
}

if (undefined == randomInt) {
    function randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

// 初始化
window.onload = () => {
    w3.includeHTML(() => {
        initMenus();
        initTable(window.tableConfig);
    });
};