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
function generateFieldContent(item, fieldName, value, config, tagColors) {
    const { type = 'text', label, format, style = {}, mergeWith, position } = config;
    let content = '';

    switch (type) {
        case 'text':
            content = typeof value === 'string' || typeof value === 'number'
                ? format ? format(value) : value
                : '';
            return position === 'header'
                ? `<h3${applyStyle(style)}>${content}</h3>`
                : `<p${applyStyle(style)}>${label ? `${label}:` : ""} ${content}</p>`;

        case 'tag':
            if (Array.isArray(value)) {
                content = value.map((tag, index) =>
                    `<span class="ant-tag ${tagColors[index % tagColors.length]}"${applyStyle(style)}>${tag}</span>`
                ).join('');
                return `<p${applyStyle(config.containerStyle)}>${content}</p>`;
            }
            break;

        case 'button':
            if (value) {
                return `<a href="${item.link || '#'}" class="card-button"${applyStyle(style)}>${value}</a>`;
            }
            break;

        case 'icon':
            if (value) {
                return `<i class="${value}"${applyStyle(style)}></i>`;
            }
            break;

        case 'badge':
            if (value) {
                return `<span class="badge"${applyStyle(style)}>${format ? format(value) : value}</span>`;
            }
            break;

        case 'avatar':
            if (value) {
                return `<img src="${value}" alt="${fieldName}" style="width: 3em; height: 3em; border-radius: 50%;"${applyStyle(style)}>`;
            }
            break;

        case 'image':
            if (value) {
                return `<img src="${value}" alt="${fieldName}" onerror="this.src='${placeholderImage}'"${applyStyle(style)}>`;
            }
            break;

        case 'rating':
            return generateRating(item, value, style);

        default:
            console.warn(`不支持的字段类型: ${type}`);
            return '';
    }
    return '';
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