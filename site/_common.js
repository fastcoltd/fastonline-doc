// 生成卡片函数
function generateCards(containerId, cardType, data, fieldConfig) {
    const container = document.getElementById(containerId);
    const tagColors = ['ant-tag-blue', 'ant-tag-green', 'ant-tag-orange', 'ant-tag-red', 'ant-tag-purple', 'ant-tag-cyan'];

    data.forEach(item => {
        const card = document.createElement('div');
        card.className = cardType === 'scroll' ? 'scroll-card' : 'card';

        let headerHtml = '';
        let contentHtml = '';
        const processedFields = new Set();

        for (const [fieldName, config] of Object.entries(fieldConfig)) {
            const value = item[fieldName];
            if (value === undefined || processedFields.has(fieldName)) continue;

            if (config.mergeWith) {
                config.mergeWith.forEach(mergeField => processedFields.add(mergeField));
            }

            const fieldContent = generateFieldContent(item, fieldName, value, config, tagColors);
            if (config.position === 'header') {
                headerHtml += fieldContent;
            } else {
                contentHtml += fieldContent;
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
    });
}

// 动态应用样式
function applyStyle(styleObj) {
    if (!styleObj) return '';
    const styles = [];
    if (styleObj.color) styles.push(`color: ${styleObj.color}`);
    if (styleObj.fontSize) styles.push(`font-size: ${styleObj.fontSize}`);
    if (styleObj.bold) styles.push(`font-weight: bold`);
    if (styleObj.textAlign) styles.push(`text-align: ${styleObj.textAlign}`);
    return styles.length ? ` style="${styles.join(';')}"` : '';
}

// 生成字段内容
function generateFieldContent(item, key, config) {
    let html = '';
    const value = item[key];
    const customClass = config.class ? ` ${config.class}` : ''; // 支持自定义 class

    // 根据字段类型生成内容
    switch (config.type) {
        case 'image':
            if (config.position === 'header') {
                html = `<img src="${value}" alt="${item.title || item.name || ''}" class="card-image${customClass}" style="${Object.entries(config.style || {}).map(([k, v]) => `${k}: ${v}`).join(';')}">`;
            }
            break;

        case 'text':
            if (config.position === 'header') {
                html = `<h3 class="card-title${customClass}" style="${Object.entries(config.style || {}).map(([k, v]) => `${k}: ${v}`).join(';')}">${value}</h3>`;
            } else {
                html = `<p class="card-text${customClass}" style="${Object.entries(config.style || {}).map(([k, v]) => `${k}: ${v}`).join(';')}">${config.label ? `${config.label}: ` : ''}${config.format ? config.format(value) : value}</p>`;
            }
            break;

        case 'icon':
            html = `<i class="${value || config.iconClass}${customClass}" style="${Object.entries(config.style || {}).map(([k, v]) => `${k}: ${v}`).join(';')}"></i>`;
            if (key === 'icon' && item.title) {
                html = `<div class="card-content${customClass}"><i class="${value || config.iconClass}"></i><p>${item.title}</p></div>`;
            }
            break;

        case 'rating':
            const rating = value;
            const count = config.count ? item[`${key}Count`] : '';
            html = `
                <div class="rating${customClass}" style="${Object.entries(config.style || {}).map(([k, v]) => `${k}: ${v}`).join(';')}">
                    <div class="stars">
                        <div class="star-bg">${'<svg><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>'.repeat(5)}</div>
                        <div class="star-filled" style="width: ${rating / 5 * 100}%">${'<svg><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>'.repeat(5)}</div>
                    </div>
                    ${count ? `<span class="rating-count">(${count})</span>` : ''}
                </div>`;
            break;

        case 'tag':
            html = `<div class="card-tags${customClass}" style="${Object.entries(config.style || {}).map(([k, v]) => `${k}: ${v}`).join(';')}">${value.map(tag => `<span class="ant-tag">${tag}</span>`).join('')}</div>`;
            break;

        case 'favorite': // 新增收藏类型
            html = `<i class="far fa-heart${customClass}" style="${Object.entries(config.style || {}).map(([k, v]) => `${k}: ${v}`).join(';')}"></i>`;
            break;

        default:
            break;
    }

    return html;
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

// 样本数据生成函数
function generateSampleData(fieldConfig, count = 10) {
    return Array(count).fill().map((_, i) => {
        const item = { link: '#' };
        for (const [fieldName, config] of Object.entries(fieldConfig)) {
            item[fieldName] = generateFieldSample(config, i);
        }
        return item;
    });
}

function generateData(fieldConfig, count) {
    return Array(count).fill().map((_, i) => {
        const item = { link: '#' };
        for (const [fieldName, config] of Object.entries(fieldConfig)) {

            let values = {}, index = 0, keys = Object.keys(config)
            Object.values(config).forEach(_value =>{
                if (typeof _value == 'function'){
                    values[keys[index]] = _value(i)
                }
                index++
            })
            let valueLen = Object.keys(values).length;
            item[fieldName] = valueLen <= 0 ? "N/A" : valueLen == 1 ? Object.values(values)[0] : values;
        }
        return item;
    });
}

// 根据字段类型生成样本数据
function generateFieldSample(config, index) {
    const { type = 'text', sample } = config;
    if (sample) return typeof sample === 'function' ? sample(index) : sample;

    switch (type) {
        case 'text': return faker.lorem.words(3);
        case 'tag': return faker.lorem.words(3).split(' ');
        case 'button': return '点击我';
        case 'icon': return `fa fa-star`;
        case 'badge': return faker.datatype.number({ min: 1, max: 99 });
        case 'avatar': return getPicsumImage(50, 50, `avatar${index}`);
        case 'image': return getPicsumImage(300, 200, `image${index}`);
        case 'rating': return faker.datatype.float({ min: 1, max: 5, precision: 0.1 });
        default: return null;
    }
}

// 弹窗函数
function showModal(modalId, content) {
    let modal = document.getElementById(modalId);
    if (!modal) {
        modal = document.createElement('div');
        modal.id = modalId;
        modal.className = 'modal';
        modal.innerHTML = '<div class="modal-content"><span class="modal-close" onclick="hideModal(\'' + modalId + '\')">×</span></div>';
        document.body.appendChild(modal);
    }
    modal.querySelector('.modal-content').innerHTML = '<span class="modal-close" onclick="hideModal(\'' + modalId + '\')">×</span>' + content;
    modal.style.display = 'block';
}

function hideModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.style.display = 'none';
}

// 图片占位符
function getPicsumImage(width, height, seed) {
    return `https://picsum.photos/seed/${seed}/${width}/${height}`;
}

const placeholderImage = 'https://via.placeholder.com/300x200?text=Image+Not+Found';

// 轮播图动态效果
function initCarousel() {
    let current = 0;
    const items = document.querySelectorAll('.carousel-item');
    setInterval(() => {
        items[current].style.opacity = 0;
        current = (current + 1) % items.length;
        items[current].style.opacity = 1;
    }, 3000);
}

// 生成文章列表（不含业务文字，参数化）
function generateArticles(containerId, min, max) {
    const container = document.getElementById(containerId);
    const count = faker.datatype.number({min: min, max: max});
    for (let i = 0; i < count; i++) {
        const li = document.createElement('li');
        li.innerHTML = `<a href="#">${faker.lorem.sentence()}</a>`;
        container.appendChild(li);
    }
}