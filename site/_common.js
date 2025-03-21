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
                <span class="rating-count">${value} (${count || 0})</span>
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

            let values = {}, index = 0, keys = Object.keys(config)
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
    }, 10000);
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

function findParentType(item){
    let type
    let parentClass = item.closest('.card-list')?.id;
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
        if (btnText.indexOf("Now") !== -1){
            item.onclick = () => {
                console.log(type, btnText)
            }
        }
    })
}

function bindAllCardLink(){
    document.querySelectorAll('.card,.cardHoriz').forEach(item => {
        let type = findParentType(item)
        if (systemType[type]){
            let hasBtn = false;
            let link = `${systemType[type].link}?name=`;
            item.querySelectorAll("p").forEach(p =>{
                let pid = p.id.toLowerCase()
                if (pid.toLowerCase().indexOf("name") !== -1 || pid.indexOf("title") !== -1){
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

    let content;
    setInterval(()=>{
        if (document.body.innerText.length != content){
            bindAllButtonClick()
            bindAllCardLink()
            bindAllTagClick()
            console.log(`bind new content. ${content}`)
            content = document.body.innerText.length
        }
    }, 500)
})

