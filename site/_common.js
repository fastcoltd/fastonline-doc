const tagColors = ['ant-tag-blue', 'ant-tag-green', 'ant-tag-orange', 'ant-tag-red', 'ant-tag-purple', 'ant-tag-cyan'];

function generateCards(containerId, cardType, data, fieldConfig) {
    const container = document.getElementById(containerId);

    data.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = cardType;

        let headerHtml = '';
        let contentHtml = '';
        const processedFields = new Set();

        for (const [fieldName, config] of Object.entries(fieldConfig)) {
            const value = item[fieldName] !== undefined ? item[fieldName] : config.value;
            if (value === undefined || processedFields.has(fieldName)) continue;
            if (config.mergeWith) {
                config.mergeWith.forEach(mergeField => processedFields.add(mergeField));
            }

            if (undefined == config[cardType] || !config[cardType]){
                continue;
            }
            const fieldContent = generateFieldContent(fieldConfig, item, fieldName, value, config, containerId, index);
            if (config.position === 'header') {
                headerHtml += fieldContent.html;
            } else {
                contentHtml += fieldContent.html;
            }
        }

        card.innerHTML = `
          ${headerHtml}
          <div class="card-content">
            ${contentHtml}
          </div>
        `;
        card.onclick = item.link && !fieldConfig.button ? () => window.location.href = item.link : null;
        container.appendChild(card);

        // 渲染后绑定点击事件
        for (const [fieldName, config] of Object.entries(fieldConfig)) {
            if (config.onClick) {
                const elementId = `${containerId}-${fieldName}-${index}`;
                const element = card.querySelector(`#${elementId}`);
                if (element) {
                    element.addEventListener('click', (event) => {
                        event.stopPropagation(); // 防止冒泡到卡片
                        config.onClick(item, element); // 只在点击时执行
                    });
                }
            }
        }
    });
}

function generateFieldContent(fieldConfig, item, fieldName, value, config, containerId, index) {
    const { type = 'text', label, format, style = {}, customClass, mergeWith, position } = config;
    let content = '';
    const elementId = `${containerId}-${fieldName}-${index}`;

    switch (type) {
        case 'text':
            content = typeof value === 'string' || typeof value === 'number'
                ? format ? format(value) : value
                : '';
            return {
                html: position === 'header'
                    ? `<h3 id="${elementId}"${applyStyle(style)}>${content}</h3>`
                    : `<p id="${elementId}"${applyStyle(style)}>${label ? `${label}:` : ""} ${content}</p>`
            };
        case 'price':
            let showPrice = format ? format(fieldConfig, value['sample']) : value
            return {
                html: `<p class="${customClass || ''}" id="${elementId}"${applyStyle(style)}>${label ? `${label}:` : ""} ${showPrice}</p>`
            };
        case 'tag':
            if (Array.isArray(value)) {
                content = value.map((tag, idx) =>
                    `<span class="ant-tag ${tagColors[idx % tagColors.length]}"${applyStyle(style)}>${tag}</span>`
                ).join('');
                return { html: `<p${applyStyle(config.containerStyle)}>${content}</p>` };
            }
            break;
        case 'button':
            if (value) {
                return { html: `<a href="${item.link || '#'}" id="${elementId}" class="card-button"${applyStyle(style)}>${value}</a>` };
            }
            break;
        case 'icon':
            if (value){
                return { html: `<i id="${elementId}" class="${value}"${applyStyle(style)}></i>` };
            }
            break;
        case 'favorite':
            let fullClass = customClass + (value ? "" : " favorited")
            return { html: `<i id="${elementId}" class="${fullClass}"${applyStyle(style)}></i>` };
            break;
        case 'image':
            if (value) {
                return { html: `<img id="${elementId}" src="${value}" alt="${fieldName}" onerror="this.src='${placeholderImage}'"${applyStyle(style)}>` };
            }
            break;

        case 'rating':
            return { html: generateRating(item, value, style) };
        default:
            console.warn(`不支持的字段类型: ${type}`);
            return { html: '' };
    }
    return { html: '' };
}

function applyStyle(styleObj) {
    if (!styleObj) return '';
    const styles = [];
    if (styleObj.color) styles.push(`color: ${styleObj.color}`);
    if (styleObj.fontSize) styles.push(`font-size: ${styleObj.fontSize}`);
    if (styleObj.bold) styles.push(`font-weight: bold`);
    if (styleObj.textAlign) styles.push(`text-align: ${styleObj.textAlign}`);
    if (styleObj.position) styles.push(`position: ${styleObj.position}`);
    if (styleObj.top) styles.push(`top: ${styleObj.top}`);
    if (styleObj.right) styles.push(`right: ${styleObj.right}`);
    return styles.length ? ` style="${styles.join(';')}"` : '';
}

function generateRating(item, value, style) {
    let count = typeof value == 'object' ? value['count'] : 0
    value = typeof value == 'object' ? value['sample'] : 0.0
    const rating = parseFloat(value) || 0;
    const starOutlined = '<svg><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" fill="none" stroke="var(--vibrant-orange)" stroke-width="1"/></svg>';
    const starFilled = '<svg starPercent><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" fill="var(--vibrant-orange)" stroke="var(--vibrant-orange)" stroke-width="1"/></svg>';

    // 计算填充比例
    const fullStars = Math.floor(rating); // 完整星星数量
    const partialStar = parseFloat(parseFloat(rating - fullStars).toFixed(2)); // 小数部分
    // 生成实心星星
    let filledStarsHtml = '';
    for (let i = 0; i < 5; i++) {
        if (i < fullStars) {
            filledStarsHtml += `<span class="star">${starFilled}</span>`.replace('starPercent', '');
        } else if (i == fullStars && partialStar > 0) {
            filledStarsHtml += `<span class="star partial">${starFilled}</span>`.replace('starPercent', `style="width:${partialStar * 100}%"`);
        } else {
            filledStarsHtml += `<span class="star empty"></span>`;
        }
    }
    let contentHtml = `
            <p class="rating"${item.position ? ` style="text-align: ${item.position};"` : ''}>
                <span class="stars">
                    <span class="star-bg">${starOutlined.repeat(5)}</span>
                    <span class="star-filled">${filledStarsHtml}</span>
                </span>
                <span class="rating-count">${value} (${count || 0})</span>
            </p>`;
    return contentHtml;
}

function generateData(fieldConfig, count) {
    return Array(count).fill().map((_, i) => {
        const item = { link: '#' };
        for (const [fieldName, config] of Object.entries(fieldConfig)) {
            if (config.value){
                item[fieldName] = config.value
                continue
            }

            let values = {}, index = 0, keys = Object.keys(config)
            Object.values(config).forEach(_value =>{
                let key = keys[index]
                if (['onClick'].includes(key)){

                }
                else if (typeof _value == 'function'){
                    values[key] = _value(i)
                }
                index++
            })
            let valueLen = Object.keys(values).length;
            item[fieldName] = valueLen <= 0 ? "N/A" : valueLen == 1 ? Object.values(values)[0] : values;
        }
        return item;
    });
}

function showModal(modalId, content, options = {}) {
    const { className = '', style = {} } = options; // 解构 options，设置默认值
    let modal = document.getElementById(modalId);
    if (!modal) {
        modal = document.createElement('div');
        modal.id = modalId;
        modal.className = 'modal';
        modal.innerHTML = '<div class="modal-content"><span class="modal-close" onclick="hideModal(\'' + modalId + '\')">×</span></div>';
        document.body.appendChild(modal);
    }

    const modalContent = modal.querySelector('.modal-content');
    modalContent.className = 'modal-content ' + className;
    Object.assign(modalContent.style, style);

    // 注入内容
    modalContent.innerHTML = '<span class="modal-close" onclick="hideModal(\'' + modalId + '\')">×</span>' + content;
    modal.style.display = 'block';
}

function hideModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.style.display = 'none';
}

function getPicsumImage(width, height, seed) {
    return `https://picsum.photos/seed/${seed}/${width}/${height}`;
}

const placeholderImage = 'https://via.placeholder.com/300x200?text=Image+Not+Found';

function initCarousel() {
    let current = 0;
    const items = document.querySelectorAll('.carousel-item');
    setInterval(() => {
        items[current].style.opacity = 0;
        current = (current + 1) % items.length;
        items[current].style.opacity = 1;
    }, 3000);
}

function generateArticles(containerId, min, max) {
    const container = document.getElementById(containerId);
    const count = faker.datatype.number({min: min, max: max});
    for (let i = 0; i < count; i++) {
        const li = document.createElement('li');
        li.innerHTML = `<a href="#">${faker.lorem.sentence()}</a>`;
        container.appendChild(li);
    }
}

window.addEventListener("load", function()  {
    setTimeout(()=>{
        generateServiceMenu()
        generateArticles('about-posts', 5, 8);
        generateArticles('buyer-posts', 5, 8);
        generateArticles('seller-posts', 5, 8);
        generateArticles('resource-posts', 5, 8);
    }, 100)
})
