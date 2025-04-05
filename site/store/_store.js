// 店铺中心公用 JS
const storeId = Math.floor(Math.random() * 10000); // 随机店铺ID

// 消息模板配置
const messageTemplates = [
    { type: 'kyc', content: '当前您的店铺还未进行KYC认证，当前佣金比例为 {commission}%，请在 {days} 天内完成认证。', level: 'high', color: '#d32f2f', button: { text: 'Go', action: `/site/store/kyc.html?id=${storeId}` }, closable: true, icon: 'fas fa-user-check' },
    { type: 'withdraw', content: '提现失败：余额不足，请检查账户余额。', level: 'medium', color: '#f59e0b', button: { text: '查看', action: '/site/store/balance.html?id={id}' }, closable: true, icon: 'fas fa-wallet' },
    { type: 'complaint', content: '收到用户投诉：商品质量问题，请及时处理。', level: 'high', color: '#d32f2f', button: { text: '处理', action: '/site/store/complaints.html?id={id}' }, closable: true, icon: 'fas fa-exclamation-triangle' },
    { type: 'review', content: '商品审核失败：{product} 未通过审核，请修改后重新提交。', level: 'medium', color: '#f59e0b', button: { text: '修改', action: '/site/store/items.html?id={id}' }, closable: true, icon: 'fas fa-file-alt' },
    { type: 'violation', content: '违规通知：店铺存在虚假宣传行为，请整改。', level: 'high', color: '#d32f2f', button: { text: '详情', action: '/site/store/violations.html?id={id}' }, closable: true, icon: 'fas fa-ban' },
    { type: 'stock', content: '{product} 库存告警：仅剩 {stock} 件，请及时补货。', level: 'medium', color: '#f59e0b', button: { text: '补货', action: '/site/store/stock-restock.html?id={id}' }, closable: true, icon: 'fas fa-box-open' },
    { type: 'global', content: '全局通报：平台将于 {date} 进行维护，请提前准备。', level: 'low', color: '#4CAF50', button: null, closable: true, icon: 'fas fa-bullhorn' }
];

function initSidebar() {
    const menu = document.getElementById('store-menu');
    menu.innerHTML = '';
    const currentPage = window.location.pathname;
    memberMenuConfig[0].sub.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `<a href="${item.href}"><i class="${item.icon}"></i>${item.text}</a>`;
        if (item.href === currentPage) {
            li.classList.add('active');
        }
        menu.appendChild(li);
    });
}

function InitSidebarContent() {
    const roles = ['owner', 'customer-service'];
    const role = roles[Math.floor(Math.random() * roles.length)];
    const nickname = faker.internet.userName();
    document.querySelector('.role').textContent = role === 'owner' ? 'Owner' : 'Support';
    document.querySelector('.role').classList.add(role);
    document.getElementById('user-nickname').innerHTML = `<b>${nickname}</b>`;

    const storeName = faker.company.companyName();
    const isVerified = Math.random() > 0.5; // 随机认证状态
    const storeLink = document.getElementById('store-name');
    storeLink.innerHTML = `${isVerified ? '<i class="fas fa-check-circle" style="color: #4CAF50;"></i>' : '<i class="fas fa-exclamation-circle unverified" style="color: #d32f2f;" data-id="${storeId}"></i>'} ${storeName}`;
    storeLink.href = `/site/store.html?name=${encodeURIComponent(storeName)}&id=${storeId}`;

    // 随机头像
    const storeLogo = document.querySelector('.store-logo');
    storeLogo.src = `https://picsum.photos/seed/${Math.random().toString(36).substring(7)}/80/80`;

    document.getElementById('store-balance').textContent = `$${faker.finance.amount(1000, 10000, 2)}`;
    document.getElementById('store-rating').textContent = `${faker.datatype.number({ min: 3, max: 5, precision: 0.1 }).toFixed(1)} (${faker.datatype.number({ min: 50, max: 500 })})`;
    document.getElementById('store-badges').innerHTML = generateBadge('Store', 0, 2);

    // 添加保证金和佣金（显示图标和数字）
    const margin = faker.finance.amount(50, 500, 2);
    const commission = faker.datatype.number({ min: 20, max: 60 });
    const extraInfo = document.createElement('div');
    extraInfo.className = 'extra-info';
    extraInfo.innerHTML = `
        <span class="margin" data-tooltip="保证金: $${margin}"><i class="fas fa-shield-alt"></i> $${margin}</span>
        <span class="commission" data-commission="${commission}"><i class="fas fa-hand-holding-usd"></i> ${commission}%</span>
    `;
    document.querySelector('.balance-rating').before(extraInfo);

    // 未认证图标悬停提示
    const unverifiedIcon = document.querySelector('.unverified');
    if (unverifiedIcon) {
        unverifiedIcon.addEventListener('mouseover', () => showUnverifiedTooltip(unverifiedIcon, commission));
        unverifiedIcon.addEventListener('mouseout', () => hideTooltip());
        unverifiedIcon.addEventListener('click', () => location.href = `/site/store/kyc.html?id=${storeId}`);
    }

    // 保证金悬停提示，佣金悬停显示弹窗
    const commissionEl = document.querySelector('.commission');
    commissionEl.addEventListener('mouseover', (e) => showCommissionPopup(commission, margin, isVerified, e, true));
    commissionEl.addEventListener('click', () => showCommissionPopup(commission, margin, isVerified, null, false));
    document.querySelector('.margin').addEventListener('mouseover', () => showTooltip(document.querySelector('.margin')));
    document.querySelector('.margin').addEventListener('mouseout', () => hideTooltip());
}

// 未认证提示
function showUnverifiedTooltip(el, commission) {
    const days = faker.datatype.number({ min: 1, max: 7 });
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.innerHTML = `当前您的店铺还未进行KYC认证，当前佣金比例为 ${commission}%，请在 ${days} 天内完成认证。`;
    document.body.appendChild(tooltip);
    const rect = el.getBoundingClientRect();
    tooltip.style.top = `${rect.bottom + 5}px`;
    tooltip.style.left = `${rect.left - (tooltip.offsetWidth - el.offsetWidth) / 2}px`;
    tooltip.style.display = 'block';
}

// 通用提示
function showTooltip(el) {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.innerHTML = el.dataset.tooltip;
    document.body.appendChild(tooltip);
    const rect = el.getBoundingClientRect();
    tooltip.style.top = `${rect.bottom + 5}px`;
    tooltip.style.left = `${rect.left - (tooltip.offsetWidth - el.offsetWidth) / 2}px`;
    tooltip.style.display = 'block';
}

function hideTooltip() {
    const tooltip = document.querySelector('.tooltip');
    if (tooltip) tooltip.remove();
}

// 佣金弹窗（支持悬停和点击两种模式）
function showCommissionPopup(commission, margin, isVerified, event, isHover) {
    const existingPopup = document.querySelector('.commission-popup');
    if (existingPopup) existingPopup.remove();

    const rating = parseFloat(document.getElementById('store-rating').textContent.split(' ')[0]);
    const avgOrder = faker.finance.amount(100, 500, 2);
    const popup = document.createElement('div');
    popup.className = `commission-popup ${isHover ? 'hover-mode' : ''}`;
    popup.innerHTML = `
        <div class="popup-content">
            <h3>当前佣金: <span style="color: #f59e0b;">${commission}%</span></h3>
            <p>佣金说明：例如你的商品价格 $100，当前你将获得 <span style="color: #4CAF50;">$${(100 * (1 - commission / 100)).toFixed(2)}</span></p>
            <h4>降低佣金方法</h4>
            <ul>
                <li><i class="fas fa-user-check"></i> 进行店铺KYC认证，当前：<span style="color: ${isVerified ? '#4CAF50' : '#d32f2f'}">${isVerified ? '<i class="fas fa-check"></i> 已认证' : '<i class="fas fa-times"></i> 未认证'}</span>，佣金：<span style="color: #4CAF50">${isVerified ? '-10%' : '0%'}</span> ${!isVerified ? '<a href="/site/store/kyc.html" class="action-btn">去认证</a>' : ''}</li>
                <li><i class="fas fa-shield-alt"></i> 提高保证金，当前：<span style="color: #4CAF50">$${margin}</span>，佣金：<span style="color: #4CAF50">${margin >= 100 ? '-5%' : '0%'}</span>，最高 -10% ${margin < 500 ? '<a href="/site/store/margin.html" class="action-btn">追加</a>' : ''}</li>
                <li><i class="fas fa-star"></i> 提升品质，当前：<span style="color: #4CAF50">${rating}</span>分（最高5），佣金：<span style="color: #4CAF50">${rating >= 4 ? '-2%' : '0%'}</span>，最高 -10%</li>
                <li><i class="fas fa-dollar-sign"></i> 提升客单价，当前：<span style="color: #4CAF50">$${avgOrder}</span>，佣金：<span style="color: #4CAF50">${avgOrder >= 200 ? '-1%' : '0%'}</span>，最高 -10%</li>
            </ul>
            ${!isHover ? '<button class="close-btn"><i class="fas fa-times"></i></button>' : ''}
        </div>
    `;
    document.body.appendChild(popup);

    if (isHover && event) {
        const rect = document.querySelector('.commission').getBoundingClientRect();
        popup.style.position = 'absolute';
        popup.style.top = `${rect.bottom + window.scrollY + 10}px`; // 保持下方显示
        popup.style.left = `${rect.left + window.scrollX - 20}px`; // 稍微偏移，确保箭头指向佣金图标
        popup.addEventListener('mouseleave', () => popup.remove());
    } else {
        popup.querySelector('.close-btn').addEventListener('click', () => popup.remove());
    }
}

function initStoreMessages() {
    // 动态创建 store-messages 容器并插入到 store-container 最前面
    let storeMessages = document.getElementById('store-messages');
    if (!storeMessages) {
        storeMessages = document.createElement('div');
        storeMessages.id = 'store-messages';
        storeMessages.className = 'store-messages';
        const storeContainer = document.querySelector('.store-container');
        storeContainer.insertBefore(storeMessages, storeContainer.firstChild);
    }

    const isVerified = document.getElementById('store-name').innerHTML.includes('fa-check-circle');
    const commission = document.querySelector('.commission').dataset.commission;
    const messages = [];

    // 未认证强制添加KYC消息
    if (!isVerified) {
        const days = faker.datatype.number({ min: 1, max: 7 });
        messages.push({
            type: 'kyc',
            content: `当前您的店铺还未进行KYC认证，当前佣金比例为 ${commission}%，请在 ${days} 天内完成认证。`,
            time: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleString(),
            level: 'high',
            color: '#d32f2f',
            button: { text: 'Go', action: `/site/store/kyc.html?id=${storeId}` },
            closable: true,
            icon: 'fas fa-user-check'
        });
    }

    // 随机生成0-3条其他消息
    const extraCount = faker.datatype.number({ min: 0, max: 3 });
    for (let i = 0; i < extraCount; i++) {
        const template = messageTemplates[Math.floor(Math.random() * (messageTemplates.length - 1)) + 1];
        let content = template.content;
        const itemId = Math.floor(Math.random() * 10000);
        if (template.type === 'review' || template.type === 'stock') {
            const product = faker.commerce.productName();
            content = content.replace('{product}', product).replace('{stock}', faker.datatype.number({ min: 1, max: 10 }));
        } else if (template.type === 'global') {
            const date = new Date(Date.now() + Math.random() * 7 * 24 * 60 * 60 * 1000).toLocaleDateString();
            content = content.replace('{date}', date);
        }
        messages.push({
            type: template.type,
            content,
            time: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleString(),
            level: template.level,
            color: template.color,
            button: template.button ? { text: template.button.text, action: template.button.action.replace('{id}', itemId) } : null,
            closable: template.closable,
            icon: template.icon
        });
    }

    // 按等级排序
    messages.sort((a, b) => ['high', 'medium', 'low'].indexOf(b.level) - ['high', 'medium', 'low'].indexOf(a.level));

    // 显示消息
    const messageContainer = document.getElementById('store-messages');
    messageContainer.innerHTML = '';
    messages.slice(0, 3).forEach(msg => {
        const msgEl = document.createElement('div');
        msgEl.className = 'store-message';
        msgEl.style.backgroundColor = `${msg.color}22`;
        msgEl.style.borderLeft = `4px solid ${msg.color}`;
        msgEl.innerHTML = `
            <i class="${msg.icon}" style="color: ${msg.color};margin-right: 0.5em;font-size: var(--font-large);"></i>
            <span class="message-content">${msg.content}</span>
            <span class="message-time">${msg.time}</span>
            ${msg.button ? `<button class="message-btn" onclick="location.href='${msg.button.action}'">${msg.button.text}</button>` : ''}
            ${msg.closable ? '<i class="fas fa-times close-message"></i>' : ''}
        `;
        messageContainer.appendChild(msgEl);

        // 添加悬停提示
        msgEl.addEventListener('mouseover', () => showMessageTooltip(msgEl, msg.content));
        msgEl.addEventListener('mouseout', () => hideTooltip());

        // 关闭逻辑
        if (msg.closable) {
            msgEl.querySelector('.close-message').addEventListener('click', () => {
                msgEl.remove();
                setTimeout(() => initStoreMessages(), 6 * 60 * 60 * 1000); // 6小时后重显
            });
        }

        // 滚动动画
        const contentEl = msgEl.querySelector('.message-content');
        if (contentEl.scrollWidth > contentEl.clientWidth) {
            contentEl.classList.add('scrolling');
        }
    });
}

// 消息悬停提示
function showMessageTooltip(el, content) {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.innerHTML = content;
    document.body.appendChild(tooltip);
    const rect = el.getBoundingClientRect();
    tooltip.style.top = `${rect.bottom + 5}px`;
    tooltip.style.left = `${rect.left - (tooltip.offsetWidth - el.offsetWidth) / 2}px`;
    tooltip.style.display = 'block';
}