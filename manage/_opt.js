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
            input.id = `${field.id}Filter`;
            if (typeof field.options == 'function'){
                let options = field.options();
                field.options = options
            }
            let optIndex = 1
            field.options.forEach(opt => {
                if (typeof opt == 'object'){
                    const option = document.createElement('option');
                    option.value = opt.value;
                    option.textContent = opt.label;
                    input.appendChild(option);
                }else{
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

        tab.fields.forEach(tabField => {
            const field = config.fields.find(f => f.name === tabField.name) || tabField;
            if (isEditingMode && tabField.showInEdit === false) return;
            if (!isEditingMode && tabField.showInAdd === false) return;

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
                if (typeof tabField.options == 'function'){
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
                if (typeof tabField.options == 'function'){
                    let options = tabField.options();
                    tabField.options = options;
                }
                input = document.createElement('div');
                input.id = `modal${field.name}`;
                const tags = isEditingMode ? JSON.parse((tableData.find(item => item.id === editId) || {})[field.name] || '[]') : [];
                tags.forEach(tag => {
                    if (typeof tag == 'number'){
                        tag = tabField.options[tag]
                    }
                    input.innerHTML += `<span class="ant-tag ant-tag-${tabField.color || 'blue'}" data-value="${tag}">${tag} <span class="tag-close" onclick="removeTag(this)">×</span></span>`;
                });
                if (isEditingMode ? tabField.editableInEdit : tabField.editableInAdd) {
                    const select = document.createElement('select');
                    select.onchange = () => addTag(select, field.name);
                    select.innerHTML = `<option value="">添加标签</option>` + tabField.options.map(opt => `<option value="${opt}">${opt}</option>`).join('');
                    input.appendChild(select);
                    if (tabField.allowCustom) {
                        const customInput = document.createElement('input');
                        customInput.type = 'text';
                        customInput.placeholder = '自定义标签';
                        customInput.onkeydown = (e) => { if (e.key === 'Enter') addCustomTag(customInput, field.name); };
                        input.appendChild(customInput);
                    }
                }
            } else if (tabField.type === 'tree') {
                input = document.createElement('div');
                input.id = `modal${field.name}`;
                input.className = 'tree-container';
                const tree = renderTree(tabField.treeData, isEditingMode ? tableLangData.filter(p => p.role_id === editId).map(p => p.resource_id.toString()) : [], field.name, isEditingMode ? tabField.editableInEdit : tabField.editableInAdd);
                input.appendChild(tree);
            } else {
                input = document.createElement('input');
                input.type = tabField.type || 'text';
                input.id = `modal${field.name}`;
            }
            input.disabled = isEditingMode ? !tabField.editableInEdit : !tabField.editableInAdd;
            formItem.appendChild(input);
            tabPane.appendChild(formItem);
        });

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
    container.className = 'ant-tree';

    function renderNode(nodes, level = 0) {
        const ul = document.createElement('ul');
        ul.className = 'ant-tree-list';
        nodes.forEach(node => {
            const li = document.createElement('li');
            li.className = 'ant-tree-treenode';
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
    const checkboxes = document.querySelectorAll(`#modal${fieldName} .ant-tree input[type="checkbox"]`);
    checkboxes.forEach(checkbox => {
        const parent = checkbox.closest('.ant-tree-treenode');
        const children = parent.querySelectorAll('.ant-tree-treenode input[type="checkbox"]');
        if (checkbox.checked) {
            children.forEach(child => child.checked = true);
        }
        const siblings = parent.parentElement.querySelectorAll(':scope > .ant-tree-treenode > input[type="checkbox"]');
        const allChecked = Array.from(siblings).every(sib => sib.checked);
        const parentCheckbox = parent.parentElement.closest('.ant-tree-treenode')?.querySelector('input[type="checkbox"]');
        if (parentCheckbox) parentCheckbox.checked = allChecked;
    });
}

// 添加标签
function addTag(select, fieldName) {
    const value = select.value;
    if (!value) return;
    const container = document.getElementById(`modal${fieldName}`);
    const tags = Array.from(container.querySelectorAll('.ant-tag')).map(tag => tag.dataset.value);
    if (!tags.includes(value)) {
        const color = container.closest('.ant-form-item').querySelector('label').nextElementSibling.className.includes('ant-tag-') ? container.closest('.ant-form-item').querySelector('.ant-tag').className.match(/ant-tag-\w+/)[0].replace('ant-tag-', '') : 'blue';
        container.insertBefore(document.createRange().createContextualFragment(`<span class="ant-tag ant-tag-${color}" data-value="${value}">${value} <span class="tag-close" onclick="removeTag(this)">×</span></span>`), select);
    }
    select.value = '';
}

// 添加自定义标签
function addCustomTag(input, fieldName) {
    const value = input.value.trim();
    if (!value) return;
    const container = document.getElementById(`modal${fieldName}`);
    const tags = Array.from(container.querySelectorAll('.ant-tag')).map(tag => tag.dataset.value);
    if (!tags.includes(value)) {
        const color = container.closest('.ant-form-item').querySelector('label').nextElementSibling.className.includes('ant-tag-') ? container.closest('.ant-form-item').querySelector('.ant-tag').className.match(/ant-tag-\w+/)[0].replace('ant-tag-', '') : 'orange';
        container.insertBefore(document.createRange().createContextualFragment(`<span class="ant-tag ant-tag-${color}" data-value="${value}">${value} <span class="tag-close" onclick="removeTag(this)">×</span></span>`), container.querySelector('select'));
    }
    input.value = '';
}

// 删除标签
function removeTag(closeBtn) {
    closeBtn.parentElement.remove();
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
    const listContainer = document.getElementById(`${config.tableName}-list`);
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
    return langRecord;
}

// 渲染表内容
function renderTableList() {
    const listContainer = document.getElementById(`${config.tableName}-list`);
    listContainer.innerHTML = '<div class="ant-spin ant-spin-spinning"><span class="ant-spin-dot ant-spin-dot-spin"><i class="ant-spin-dot-item"></i><i class="ant-spin-dot-item"></i><i class="ant-spin-dot-item"></i><i class="ant-spin-dot-item"></i></span></div>';

    requestAnimationFrame(() => {
        listContainer.innerHTML = '';

        const start = (currentPage - 1) * perPage;
        const end = Math.min(start + perPage, tableData.length);
        const paginatedData = tableData.slice(start, end);

        let randomLang = randomInt(0, config.langFields?.languages.length-1) ?? 0;
        const langFilter = document.querySelector(`#languageFilter`)?.value || (config.langFields?.languages[randomLang] || '');
        paginatedData.forEach(item => {
            const row = document.createElement('div');
            row.className = 'task-item';
            row.style = 'border-bottom: 1px solid #ddd;';
            let rowHtml = `<div class="col-checkbox"><input type="checkbox" class="select-item" data-id="${item.id}"></div>`;

            config.listFields.forEach(field => {
                let value;
                if (field.isLangField && langFilter) {
                    const langData = tableLangData.find(l => l.language === langFilter);
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
            <select id="perPage" onchange="changePerPage()">
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
            if (buttonConfig.action === 'addRecord') {
                addRecord();
            } else if (buttonConfig.action === 'batchDelete') {
                batchDelete();
            } else if (buttonConfig.field) {
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
    if (typeof fieldConfig.options == 'function'){
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
                    <select id="new${fieldConfig.name}">
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

// 初始化
window.onload = () => {
    w3.includeHTML(() => {
        initMenus();
        initTable(window.tableConfig);
    });
};