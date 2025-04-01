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
        card.title = item.name ?? '';
        card.onclick = item.link && !fieldConfig.button ? () => window.location.href = `${item.link}` : null;
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
    content = value;
    if (format && typeof format == 'function'){
        if (format.length == 0){
            content = format()
        }
        else if (format.length == 2){
            content = format(fieldConfig, value['sample'])
        }
        else if (format.length == 3){
            content = format(item, fieldConfig, value['sample'])
        }
    }
    switch (type) {
        case 'text':
            return {
                html: position === 'header'
                    ? `<h3 id="${elementId}"${applyStyle(style)}>${content}</h3>`
                    : `<p id="${elementId}"${applyStyle(style)}>${label ? `${label}:` : ""} ${content}</p>`
            };
        case 'price':
            return {
                html: `<p class="${customClass || ''}" id="${elementId}"${applyStyle(style)}>${label ? `${label}:` : ""} ${content}</p>`
            };
        case 'tag':
            let resetValue = []
            if (fieldName == 'attributes'){
                Object.keys(value).forEach(k => {
                    let v = value[k]
                    resetValue.push(`${k} : <b>${v}</b>`)
                })
                value = resetValue;
            }
            if (Array.isArray(value)) {
                content = value.map((tag, idx) =>
                    `<span class="ant-tag ${tagColors[idx % tagColors.length]}"${applyStyle(style)}>${tag}</span>`
                ).join('');
                return { html: `<p${applyStyle(config.containerStyle)}>${content}</p>` };
            }
            break;
        case 'button':
            if (value) {
                return { html: `<a href="${item.link || '###'}" id="${elementId}" class="card-button"${applyStyle(style)}>${value}</a>` };
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
        case 'bidders':
            return { html: generateBidders(label, value, style) };
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

function generateCaptcha() {
    const canvas = document.getElementById('captchaCanvas');
    const ctx = canvas.getContext('2d');
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    captchaText = '';

    // 调整画布大小（移动端适配）
    const isMobile = window.innerWidth <= 768;
    canvas.width = isMobile ? 100 : 120;
    canvas.height = 30;

    // 清空画布
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 绘制背景
    ctx.fillStyle = '#f5f5f5';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 生成随机文字
    for (let i = 0; i < 4; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        captchaText += char;
        ctx.font = `bold ${isMobile ? 20 : 24}px Arial`;
        ctx.fillStyle = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // 添加随机旋转和位置偏移
        ctx.save();
        ctx.translate((canvas.width / 4) * i + (canvas.width / 8), 22);
        ctx.rotate((Math.random() - 0.5) * 0.4);
        ctx.fillText(char, 0, 0);
        ctx.restore();
    }

    // 添加干扰线
    for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
        ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
        ctx.strokeStyle = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.5)`;
        ctx.stroke();
    }

    // 添加噪点
    for (let i = 0; i < 20; i++) {
        ctx.fillStyle = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.8)`;
        ctx.beginPath();
        ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, 1, 0, 2 * Math.PI);
        ctx.fill();
    }
    document.getElementById('captcha') ? document.getElementById('captcha').value = captchaText : ''
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
                ${count <= 0 ? `<span class="rating-count">${value}</span>` : `<span class="rating-count">${value} (${count || 0})</span>`}
            </p>`;
    return contentHtml;
}

function generateBidders(label, value, style){
    const bidders = value.sample.slice(0, Math.min(5, value.sample.length));
    let biddersHtml = `<div class="bidders-wrapper" style="display: flex; align-items: center;">${label}：`;
    bidders.forEach((bidderImg, idx) => {
        biddersHtml += `<img src="${bidderImg}" alt="Bidder ${idx + 1}" style="width: 2em; height: 2em; border-radius: 50%; margin-left: ${idx > 0 ? '-0.5em' : '0'}; z-index: ${bidders.length - idx}; border: 2px solid #fff;">`;
    });
    biddersHtml += `(${value.sample.length} 人)</div>`;
    return biddersHtml;
}

function generateData(fieldConfig, count) {
    return Array(count).fill().map((_, i) => {
        const item = { link: '' };
        for (const [fieldName, config] of Object.entries(fieldConfig)) {
            if (config.value){
                item[fieldName] = config.value
                continue
            }

            let values = {}
            let index = 0, keys = Object.keys(config)
            Object.values(config).forEach(_value =>{
                let key = keys[index]
                if (['onClick'].includes(key)){

                }
                else if (typeof _value == 'function'){
                    if (_value.length == 0){
                        values[key] =  _value()
                    }
                    else if (_value.length == 1){
                        values[key] =  _value(i)
                    }
                    else if (_value.length >= 2){
                        values[key] =  _value
                    }
                }
                index++
            })
            let valueLen = Object.keys(values).length;

            let valuesFunction = {}
            if (valueLen <= 0){
                valuesFunction = "N/A";
            }else if (valueLen == 1){
                valuesFunction = Object.values(values)[0];
            }else {
                valuesFunction = values
            }

            item[fieldName] = valuesFunction;
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
    }, 10000);
}

function generateArticles(containerId, min, max) {
    const container = document.getElementById(containerId);
    if (containerId.indexOf('about') !== -1){
        const li = document.createElement('li');
        li.innerHTML = `<a href="/site/rules.html">Rules</a>`;
        container.appendChild(li);
    }
    const count = faker.datatype.number({min: min, max: max});
    for (let i = 0; i < count; i++) {
        const li = document.createElement('li');
        const title = faker.lorem.sentence()
        li.innerHTML = `<a href="/site/page.html?name=${title}">${title}</a>`;
        container.appendChild(li);
    }
}

function generateBadge(type, min, max){
    const selectedBadges = ecommerceBadges[type].sort(() => 0.5 - Math.random()).slice(0, randomInt(min, max));
    const badgesHtml = selectedBadges.map(badge => `
            <span class="badge"
                  onmouseover="showBadgeTooltip(this, '${badge.description.replace(/'/g, "\\'")}', '${badge.name}')"
                  onmouseout="hideBadgeTooltip(this)" style="color: ${badge.textColor};background: ${badge.backgroundColor}">
                ${badge.icon} ${badge.name}
                <span class="badge-tooltip">${badge.description}</span>
            </span>
        `).join('');
    return badgesHtml;
}

function showBadgeTooltip(element, description, name) {
    clearTimeout(element.tooltipTimeout);
    // 300ms 后显示 tooltip
    element.tooltipTimeout = setTimeout(() => {
        const tooltip = element.querySelector('.badge-tooltip');
        if (tooltip) {
            tooltip.style.display = 'block';
        }
    }, 300);
}

function hideBadgeTooltip(element) {
    // 清除定时器
    clearTimeout(element.tooltipTimeout);

    // 立即隐藏 tooltip
    const tooltip = element.querySelector('.badge-tooltip');
    if (tooltip) {
        tooltip.style.display = 'none';
    }
}

function generateShoppingPopup(item, cardElement) {
    let userInfo = getUserLoginInfo();
    if (!userInfo){
        return showMessageToast({ messageType: 'warning', message: 'please login first , after then buy it.', timeout: 3000, callback: () => {
                showModal('login-modal', generateLoginModal(), { className: 'login-modal', style: signInRegisterStyle })
        }})
    }
    const linkElement = cardElement.querySelector('a[href*="item.html"]');
    const itemName = linkElement ? linkElement.textContent.trim() : 'Unnamed Product';
    const priceText = cardElement.querySelector('[id*="price"]')?.textContent.replace(/[^0-9.]/g, '') || '0';
    const basePrice = parseFloat(priceText) || 0;
    const stockText = cardElement.querySelector('[id*="stock"]')?.textContent.replace(/[^0-9]/g, '') || '0';
    const stock = parseInt(stockText) || 0;

    // 售后时间计算
    let afterSalesHours = faker.datatype.number({ min: 24, max: 720 });
    const days = Math.floor(afterSalesHours / 24);
    const hours = afterSalesHours % 24;
    const afterSalesTime = days > 0 ? `${days}d ${hours}h` : `${afterSalesHours}h`;

    // 批发价数据
    const wholesaleData = generateData(itemWholesaleFieldConfig, randomInt(1, 5));
    const wholesaleOptions = wholesaleData.map(w => ({
        minQty: parseInt(w.quantity.sample),
        unitPrice: parseFloat(w.unit_price.replace('$', ''))
    })).sort((a, b) => a.minQty - b.minQty);

    // 标签和属性
    const tagsElements = cardElement.querySelectorAll('.ant-tag');
    let tags = [];
    let attributes = {};
    tagsElements.forEach(tag => {
        const text = tag.textContent.trim();
        if (text.includes(':')) {
            const [key, value] = text.split(':').map(t => t.trim());
            attributes[key] = value.replace(/<[^>]+>/g, '');
        } else {
            tags.push(text);
        }
    });

    // 价格随机 50% 概率显示原价
    const showOriginalPrice = Math.random() < 0.5;
    const originalPrice = showOriginalPrice ? (basePrice * faker.datatype.float({ min: 1.1, max: 1.5, precision: 0.01 })).toFixed(2) : null;
    const priceDisplay = `$${basePrice.toFixed(2)}${originalPrice ? ` <span class="original-price">$${originalPrice}</span>` : ''}`;

    // 弹窗内容
    let popupContent = `
        <h2 class="popup-title">${itemName}</h2>
        <div class="popup-content">
            <div class="popup-row">
                <label class="popup-label">After-sales Time:</label>
                <span class="popup-value popup-after-sales">${afterSalesTime}</span>
            </div>
            <div class="popup-row">
                <label class="popup-label">Price:</label>
                <span class="popup-value popup-price" id="popup-base-price">${priceDisplay}</span>
            </div>
            <div class="popup-row">
                <label class="popup-label">Wholesale Price:</label>
                <div class="popup-value popup-wholesale">
                    ${wholesaleOptions.map(w => `
                        <span class="wholesale-item">${w.minQty}~${w.minQty + 100}: <b>$${w.unitPrice.toFixed(2)}</b></span>
                    `).join('')}
                </div>
            </div>
            <div class="popup-row">
                <label class="popup-label">Tags:</label>
                <div class="popup-value popup-tags">
                    ${tags.length ? tags.map(t => `<span class="ant-tag ${tagColors[randomInt(0, tagColors.length - 1)]}">${t}</span>`).join('') : 'No Tags'}
                </div>
            </div>
            <div class="popup-row">
                <label class="popup-label">Attributes:</label>
                <div class="popup-value popup-attributes">
                    ${Object.keys(attributes).length ? Object.entries(attributes).map(([k, v]) => `
                        <span class="ant-tag ${tagColors[randomInt(0, tagColors.length - 1)]}">${k}: <b>${v}</b></span>
                    `).join('') : 'No Attributes'}
                </div>
            </div>
            <div class="popup-row">
                <label class="popup-label">Stock:</label>
                <span class="popup-value" id="popup-stock">${stock}</span>
            </div>
            <div class="popup-row">
                <label class="popup-label">Amount:</label>
                <div class="popup-value popup-quantity">
                    <div class="quantity-input">
                        <button class="minus" onclick="updateQuantity(-1)"><i class="fas fa-minus"></i></button>
                        <input type="number" id="popup-quantity" value="1" min="1" max="${stock}" oninput="updateSubtotal()">
                        <button class="plus" onclick="updateQuantity(1)"><i class="fas fa-plus"></i></button>
                    </div>
                </div>
            </div>
            <div class="popup-row">
                <label class="popup-label">Subtotal:</label>
                <div class="popup-value popup-subtotal">
                    <span id="popup-subtotal-value">$${basePrice.toFixed(2)}</span>
                    <span id="popup-save" class="popup-save">Save: $<span id="popup-save-amount">0.00</span></span>
                </div>
            </div>
        </div>
        <button id="popup-buy-btn" class="btn-solid-large">Accept & Buy</button>
        <p class="popup-agreement">
            Click Button you agree to abide by the 
            <a href="page.html?name=Platform Rules" target="_blank">Platform Rules</a>, 
            <a href="page.html?name=Usage Rules" target="_blank">Usage Rules</a>, 
            and <span class="store-rules" onmousemove="showStoreRules(event, this)" onmouseout="hideStoreRules(this)">Store Rules</span>.
        </p>
    `;

    // 显示弹窗
    showModal('shopping-popup', popupContent, { className: 'shopping-popup', style: { maxWidth: '30em', padding: '1.5em' } });

    // 更新小计和折扣
    function updateSubtotal() {
        const quantity = parseInt(document.getElementById('popup-quantity').value) || 1;
        let currentPrice = basePrice;
        let saveAmount = 0;

        for (const option of wholesaleOptions) {
            if (quantity >= option.minQty) {
                currentPrice = option.unitPrice;
                saveAmount = (basePrice - currentPrice) * quantity;
            }
        }

        const subtotal = (currentPrice * quantity).toFixed(2);
        document.getElementById('popup-subtotal-value').textContent = `$${subtotal}`;

        const saveElement = document.getElementById('popup-save');
        const saveAmountElement = document.getElementById('popup-save-amount');
        const plusButton = document.querySelector('.popup-quantity .plus');

        if (saveAmount > 0) {
            saveElement.style.display = 'inline';
            saveAmountElement.textContent = saveAmount.toFixed(2);
        } else {
            saveElement.style.display = 'none';
        }

        if (quantity >= stock) {
            plusButton.classList.add('disabled');
        } else {
            plusButton.classList.remove('disabled');
        }
    }

    // 更新数量
    window.updateQuantity = function(delta) {
        const input = document.getElementById('popup-quantity');
        let quantity = parseInt(input.value) || 1;
        quantity = Math.max(1, Math.min(stock, quantity + delta));
        input.value = quantity;
        updateSubtotal();
    };

    // Store Rules 浮动提示
    window.showStoreRules = function(event, element) {
        const existingTooltip = document.body.querySelector('.rules-tooltip');
        if (existingTooltip) existingTooltip.remove();

        const storeName = faker.company.companyName();
        const rules = [
            faker.lorem.sentence(),
            faker.lorem.sentence(),
            faker.lorem.sentence()
        ];
        const tooltip = document.createElement('div');
        tooltip.className = 'rules-tooltip';
        tooltip.innerHTML = `${storeName} shop rules:<br>1. ${rules[0]}<br>2. ${rules[1]}<br>3. ${rules[2]}`;
        document.body.appendChild(tooltip);

        tooltip.style.left = `${event.pageX + 10}px`;
        tooltip.style.top = `${event.pageY + 10}px`;

        element.onmousemove = (e) => {
            tooltip.style.left = `${e.pageX + 10}px`;
            tooltip.style.top = `${e.pageY + 10}px`;
        };
    };

    window.hideStoreRules = function(element) {
        const tooltip = document.body.querySelector('.rules-tooltip');
        if (tooltip) tooltip.remove();
        element.onmousemove = null;
    };

    // Accept & Buy 按钮事件
    document.getElementById('popup-buy-btn').addEventListener('click', () => {
        const buyButton = document.getElementById('popup-buy-btn');
        buyButton.classList.add('loading');
        buyButton.disabled = true; // 点击后保持禁用状态

        const quantity = parseInt(document.getElementById('popup-quantity').value) || 1;
        const subtotal = document.getElementById('popup-subtotal-value').textContent.replace('$', '');
        const saveAmount = document.getElementById('popup-save-amount')?.textContent || '0.00';
        const orderId = faker.datatype.number({ min: 100000, max: 999999 });

        setTimeout(() => {
            buyButton.classList.remove('loading');
            hideModal('shopping-popup');

            // 新弹窗内容
            const orderPopupContent = `
                <h2 class="popup-title">Order NO #${orderId}</h2>
                <div class="order-content">
                    <p>Order placed successfully!</p>
                    <p>Product: ${itemName}</p>
                    <p>Quantity: ${quantity}</p>
                    <p>Amount: <span class="price">$${subtotal}</span></p>
                    ${saveAmount !== '0.00' ? `<p>Save: <span class="save">$${saveAmount}</span></p>` : ''}
                </div>
                <div class="order-buttons">
                    <a href="/site/member/orders.html?id=${orderId}" class="btn-medium"><i class="fas fa-eye"></i> View Order</a>
                    <a href="/download/order_${itemName.replace(/\s+/g, '_')}_${quantity}_items.txt" download="${itemName}_${quantity}_items.txt" class="btn-medium"><i class="fas fa-download"></i> Download</a>
                </div>
            `;
            showModal('order-popup', orderPopupContent, { className: 'order-popup', style: { maxWidth: '30em', padding: '1.5em' } });
        }, 500);
    });

    // 初始化时更新加号状态
    updateSubtotal();
}

function showMessageToast({ messageType = 'info', message = '', timeout = 3000, callback = null } = {}) {
    /*
        showMessageToast({ messageType: 'success', message: 'Operation completed successfully!', timeout: 3000 });
        showMessageToast({ messageType: 'error', message: 'Something went wrong.', timeout: 2000, callback: () => console.log('Error closed') });
        showMessageToast({ messageType: 'warning', message: 'Please check your input.', timeout: 4000 });
        showMessageToast({ messageType: 'info', message: 'Loading data...', timeout: 0 }); // 不自动关闭
    */
    const toast = document.createElement('div');
    toast.className = `message-toast ${messageType}`;
    // 根据类型选择图标
    let iconClass;
    switch (messageType) {
        case 'success':
            iconClass = 'fas fa-check-circle';
            break;
        case 'error':
            iconClass = 'fas fa-exclamation-circle';
            break;
        case 'warning':
            iconClass = 'fas fa-exclamation-triangle';
            break;
        case 'info':
        default:
            iconClass = 'fas fa-info-circle';
            break;
    }

    // 设置内容
    toast.innerHTML = `
    <i class="${iconClass}"></i>
    <div class="toast-content">${message}</div>
`;

    // 添加到页面
    document.body.appendChild(toast);

    // 设置超时关闭
    if (timeout > 0) {
        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(toast);
                if (callback && typeof callback === 'function') {
                    callback();
                }
            }, 300); // 等待淡出动画完成
        }, timeout);
    }

    // 返回 toast 元素，以便外部控制
    return toast;
}

function findParentType(item){
    let type
    let parentClass = item.closest('.card-list')?.id;
    if (!parentClass){
        parentClass = item.closest('.similar-items')?.id;
    }
    if (!parentClass){
        parentClass = item.closest('.scroll-list')?.id;
    }
    if (!parentClass){
        parentClass = item.closest('.item-group')?.id;
    }
    if (!parentClass){
        parentClass = item.closest('.campaign-header')?.id;
    }
    if (parentClass){
        if (parentClass.indexOf("item") !== -1) {
            type = 'items'
        }else if (parentClass.indexOf("store") !== -1) {
            type = 'stories'
        }else if (parentClass.indexOf("post") !== -1) {
            type = 'posts'
        }else if (parentClass.indexOf("campaign") !== -1) {
            type = 'campaigns'
        }else if (parentClass.indexOf("demand") !== -1) {
            type = 'demands'
        }else if (parentClass.indexOf("page") !== -1) {
            type = 'pages'
        }
    }
    if(typeof tagType != 'undefined'){
        type = tagType
    }
    if(typeof attrType != 'undefined'){
        type = attrType
    }
    if (typeof searchType != 'undefined'){
        type = searchType
    }
    return type
}

function bindAllTagClick(){
    document.querySelectorAll('.ant-tag').forEach(item => {
        let attr, value
        let type = findParentType(item)
        if (undefined == type) return
        let isAttr = item.innerText.indexOf(":") !== -1
        if (isAttr){
            let attrValue = item.innerText.split(":")
            attr = attrValue[0].trim()
            value = attrValue[1].trim()
        }
        let link = isAttr ? `attr.html?type=${type}&name=${attr}&value=${value}` : `tag.html?type=${type}&name=${item.innerText}`;

        let tagLink = document.createElement("a")
        tagLink.classList = item.classList
        tagLink.href = link;
        tagLink.title = item.innerText
        tagLink.innerHTML = item.innerHTML;
        if (item.parentNode){
            item.parentNode.insertBefore(tagLink, item)
            item.remove()
        }
    })
}

function bindAllButtonClick(){
    document.querySelectorAll('.card-button').forEach(item => {
        let type = findParentType(item)
        let btnText = item.innerText;
        if (btnText.indexOf("Buy Now") !== -1){
            item.addEventListener('click', (e) => {
                e.stopPropagation(); // 防止冒泡到卡片本身的 onclick
                const card = item.closest('.card,.cardHoriz');
                generateShoppingPopup(null, card);
            });
        }
    })
}

function bindAllCardLink(){
    document.querySelectorAll('.card,.cardHoriz').forEach(item => {
        let type = findParentType(item)
        if (systemType[type]){
            let hasBtn = false, hasBindLink = false;
            let link = `${systemType[type].link}?name=`;
            item.querySelectorAll("p").forEach(p =>{
                let pid = p.id.toLowerCase()
                if ((pid.toLowerCase().indexOf("name") !== -1 || pid.indexOf("title") !== -1) && !hasBindLink){
                    link += encodeURIComponent(p.innerText);
                    p.innerHTML = `<a href="${link}">${p.innerHTML}</a>`

                    // let cardLink = document.createElement("a")
                    // cardLink.classList = item.classList
                    // cardLink.href = link;
                    // cardLink.innerHTML = item.innerHTML;
                    // if (item.parentNode){
                    //     item.parentNode.insertBefore(cardLink, item)
                    //     item.remove()
                    // }
                    hasBindLink = true
                }
            });

            item.querySelectorAll(".card-button").forEach(btn =>{
                let btnText = btn.innerText;
                if (["View", "Join"].includes(btnText)){
                    btn.href = link;
                }
                hasBtn = true;
            });
        }
    })
}

window.addEventListener("load", function()  {
    setTimeout(()=>{
        generateServiceMenu()
        generateArticles('about-posts', 5, 8);
        generateArticles('buyer-posts', 5, 8);
        generateArticles('seller-posts', 5, 8);
        generateArticles('resource-posts', 5, 8);
    }, 500)

    let contentLen;
    setInterval(()=>{
        if (undefined == contentLen || Math.abs(document.body.innerText.length - contentLen) > 500){
            bindAllButtonClick()
            bindAllCardLink()
            bindAllTagClick()
            console.log(`bind new content. ${contentLen}`)
            contentLen = document.body.innerText.length
        }
    }, 500)
})

