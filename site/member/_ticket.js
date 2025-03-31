// _ticket.js
const submittedTickets = new Set();
const supportNames = ["Emma", "Zoe", "Ava", "Mia", "Lily", "Sophie", "Grace", "Ella", "Chloe", "Luna"];
const shopNames = ["Bloom Shop", "Spark Store", "Nest Shop", "Glow Store", "Vibe Shop", "Peak Store", "Brew Shop", "Dash Store", "Flux Shop", "Sage Store"];
const supportName = supportNames[randomInt(0, shopNames.length -1)];
const storeName = shopNames[randomInt(0, shopNames.length -1)];
const buyerName = 'Me';

function formatTimestamp(date) {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    return `${hours}:${minutes} ${day}/${month}`;
}

function openTicketDialog(orderId) {
    const order = allOrders.find(o => o.id.sample === orderId);
    if (!order) return;

    if (submittedTickets.has(orderId) || Math.random() < 0.5) {
        openChatDialog(orderId);
    } else {
        openTicketSubmissionDialog(orderId);
    }
}

function openTicketSubmissionDialog(orderId) {
    const order = allOrders.find(o => o.id.sample === orderId);
    if (!order) return;

    const dialog = document.createElement('div');
    dialog.className = 'ticket-dialog';
    dialog.id = 'ticket-submission-dialog';

    const dialogContent = document.createElement('div');
    dialogContent.className = 'ticket-dialog-content';

    const header = document.createElement('div');
    header.className = 'ticket-dialog-header';
    header.innerHTML = `
        <h3>提交工单 - 订单 #${order.id.sample}</h3>
        <button class="ticket-dialog-close" onclick="closeTicketDialog('ticket-submission-dialog')">×</button>
    `;

    const body = document.createElement('div');
    body.className = 'ticket-dialog-body';

    const isPost = order.posts_id;
    const isDemandOrItem = order.demand_id || order.item_id;
    let detailsField = '';
    if (isPost) {
        detailsField = `
            <label>问题描述（可选）:</label>
            <textarea id="submission-details" placeholder="请输入具体问题描述..."></textarea>
        `;
    } else if (isDemandOrItem) {
        const unitPrice = parseFloat(order.amount.sample.replace('$', '')) / order.quantity.sample;
        detailsField = `
            <label>问题账号（必填）:</label>
            <textarea id="submission-details" placeholder="请输入问题账号，每行一个..." rows="5" oninput="updateAccountStats(${unitPrice})" required></textarea>
            <div id="account-stats">数量: 0 金额: $0.00</div>
        `;
    }

    body.innerHTML = `
        <div class="submission-form">
            <label>问题类型:</label>
            <select id="aftersales-type" onchange="updateReasonDropdown()">
                ${aftersalesConfig.map(config => `<option value="${config.name}">${config.name}</option>`).join('')}
            </select>
            <label>问题原因:</label>
            <select id="aftersales-reason">
                ${aftersalesConfig[0].reasons.map(reason => `<option value="${reason}">${reason}</option>`).join('')}
            </select>
            <label>申请:</label>
            <div class="radio-group">
                <label><input type="radio" name="request-type" value="refund"> 退款</label>
                <label><input type="radio" name="request-type" value="exchange" checked> 换货</label>
            </div>
            ${detailsField}
            <div class="review-actions">
                <button class="btn-orange-solid-small" onclick="submitTicket(${orderId})">提交</button>
            </div>
        </div>
    `;

    dialogContent.appendChild(header);
    dialogContent.appendChild(body);
    dialog.appendChild(dialogContent);
    document.body.appendChild(dialog);
}

function updateReasonDropdown() {
    const typeSelect = document.getElementById('aftersales-type');
    const reasonSelect = document.getElementById('aftersales-reason');
    const selectedType = typeSelect.value;
    const config = aftersalesConfig.find(item => item.name === selectedType);
    reasonSelect.innerHTML = config.reasons.map(reason => `<option value="${reason}">${reason}</option>`).join('');
}

function updateAccountStats(unitPrice) {
    const details = document.getElementById('submission-details').value.trim();
    const lines = details.split('\n').filter(line => line.trim() !== '');
    const count = lines.length;
    const amount = (count * unitPrice).toFixed(2);
    document.getElementById('account-stats').innerHTML = `数量: ${count} 金额: $${amount}`;
}

function submitTicket(orderId) {
    const order = allOrders.find(o => o.id.sample === orderId);
    const type = document.getElementById('aftersales-type').value;
    const reason = document.getElementById('aftersales-reason').value;
    const requestType = document.querySelector('input[name="request-type"]:checked').value;
    const details = document.getElementById('submission-details').value.trim();
    const timestamp = formatTimestamp(new Date());
    let message = `【工单提交】<br>申请: <strong style="color: ${requestType === 'refund' ? '#FF4500' : '#1E90FF'}">${requestType === 'refund' ? '退款' : '换货'}</strong><br>原因: <span style="color: red">${reason}</span>`;

    if (order.posts_id) {
        message += details ? `<br>问题描述: ${details}` : '';
    } else if (order.demand_id || order.item_id) {
        if (!details) {
            alert('问题账号为必填项');
            return;
        }
        const lines = details.split('\n').filter(line => line.trim() !== '');
        const count = lines.length;
        const unitPrice = parseFloat(order.amount.sample.replace('$', '')) / order.quantity.sample;
        const amount = (count * unitPrice).toFixed(2);
        const blob = new Blob([details], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        message += `<br>问题信息: <a href="${url}" target="_blank" class="download-link">下载<i class="fa fa-download downloading"></i></a><br>数量: ${count}<br>金额: $${amount}`;
    }

    message += `<div class="template-actions"><button class="btn-small" onclick="respondToRequest(${orderId}, '${requestType}', 'agree', 'buyer', this)">同意</button><button class="btn-small" onclick="openRejectDialog(${orderId}, '${requestType}', 'buyer', this)">拒绝</button></div> <span class="timestamp">${timestamp}</span>`;

    submittedTickets.add(orderId);
    closeTicketDialog('ticket-submission-dialog');
    openChatDialog(orderId, message);
}

function openChatDialog(orderId, initialMessage = null) {
    const order = allOrders.find(o => o.id.sample === orderId);
    if (!order) return;
    console.log(order)

    const dialog = document.createElement('div');
    dialog.className = 'ticket-dialog';
    dialog.id = 'ticket-chat-dialog';

    const dialogContent = document.createElement('div');
    dialogContent.className = 'ticket-dialog-content';

    const isBuyer = true; // Simulating buyer role; adjust based on actual role logic
    const showCloseTicket = isBuyer && Math.random() < 0.8;
    const header = document.createElement('div');
    header.className = 'ticket-dialog-header';
    const simplifiedTime = order.paid_time; // Simplified to "HH:MM DD/MM"
    header.innerHTML = `
        <h3>工单 - 订单 #${order.id.sample}</h3>
        <div class="order-info">
            <p>${userOrdersFieldConfig.itemName.format(null, order)} 数量: ${order.quantity.sample} 金额: ${order.amount.sample} 订单时间: ${simplifiedTime}
            ${showCloseTicket ? `<button class="btn-small close-ticket-btn" onclick="openCloseTicketConfirmation(${orderId})">关闭工单</button>` : ''}
            </p>
        </div>
        <button class="ticket-dialog-close" onclick="closeTicketDialog('ticket-chat-dialog')">×</button>
    `;

    const body = document.createElement('div');
    body.className = 'ticket-dialog-body';

    const chatContainer = document.createElement('div');
    chatContainer.className = 'chat-container';
    chatContainer.id = 'chat-container';

    const timestamp = formatTimestamp(new Date());
    const chatMessages = initialMessage
        ? [`<div class="chat-message buyer-message" data-id="${Date.now()}">
                <div class="avatar-name">
                    <img src="https://picsum.photos/50/50?random=${buyerName}" alt="buyer" class="chat-avatar">
                    <span class="chat-name" style="color: #4CAF50">${buyerName}</span>
                </div>
                <div class="chat-content">
                    <div class="chat-bubble">${initialMessage}</div>
                </div>
            </div>`]
        : generateChatMessages(order);
    chatContainer.innerHTML = chatMessages.join('');

    const inputArea = document.createElement('div');
    inputArea.className = 'chat-input-area';
    inputArea.innerHTML = `
        <div class="message-controls">
            <div class="message-tabs">
                <div class="tab active" data-type="text" onclick="switchTab('text', ${orderId})">文本</div>
                <div class="tab" data-type="image" onclick="switchTab('image', ${orderId})">图片</div>
                <div class="tab" data-type="file" onclick="switchTab('file', ${orderId})">文件</div>
            </div>
            <div class="template-buttons">
                <button class="btn-small refund-btn" onclick="openRequestDialog(${orderId}, 'refund')">申请退款</button>
                ${!order.posts_id ? `<button class="btn-small exchange-btn" onclick="openRequestDialog(${orderId}, 'exchange')">申请换货</button>` : ''}
                ${!showCloseTicket ? `<button class="btn-small close-btn" onclick="openRequestDialog(${orderId}, 'close')">申请关闭</button>` : ''}
                <button class="btn-small support-btn" onclick="requestSupport(${orderId})">申请客服介入</button>
            </div>
        </div>
        <div class="message-content">
            <div id="text-input" class="input-content active">
                <textarea id="chat-text-input" placeholder="请输入消息..."></textarea>
                <button class="btn-orange-solid-small send-btn" onclick="sendMessage(${orderId}, 'text')">发送</button>
            </div>
            <div id="image-input" class="input-content">
                <input type="file" id="chat-image-input" accept="image/*" onchange="previewImage(${orderId})" style="display: none;">
                <div id="image-preview" onclick="document.getElementById('chat-image-input').click()">点击选择图片</div>
                <button class="btn-orange-solid-small send-btn" onclick="sendMessage(${orderId}, 'image')">发送</button>
            </div>
            <div id="file-input" class="input-content">
                <input type="file" id="chat-file-input" accept=".txt,.xls,.xlsx" onchange="previewFile(${orderId})" style="display: none;">
                <div id="file-preview" onclick="document.getElementById('chat-file-input').click()">点击选择文件</div>
                <button class="btn-orange-solid-small send-btn" onclick="sendMessage(${orderId}, 'file')">发送</button>
            </div>
        </div>
    `;

    body.appendChild(chatContainer);
    body.appendChild(inputArea);
    dialogContent.appendChild(header);
    dialogContent.appendChild(body);
    dialog.appendChild(dialogContent);
    document.body.appendChild(dialog);

    chatContainer.scrollTop = chatContainer.scrollHeight;

    dialog.addEventListener('click', (e) => {
        if (e.target === dialog) closeTicketDialog('ticket-chat-dialog');
    });
}

function closeTicketDialog(dialogId) {
    const dialog = document.getElementById(dialogId);
    if (dialog) dialog.remove();
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateChatMessages(order) {
    const roles = ['system', 'store', 'support', 'buyer'];
    const templates = {
        refund: `<span class="request-refund">【退款申请】</span>买家申请退款，退款数量：${randomInt(1, order.quantity.sample)}，退款金额：$${randomInt(10, parseFloat(order.amount.sample.replace('$', '')))}`,
        exchange: `<span class="request-exchange">【换货申请】</span>买家申请换货，换货数量：${randomInt(1, order.quantity.sample)}`,
        close: `<span class="request-close">【关闭申请】</span>买家请求关闭工单`,
        support: `<span class="request-support">【客服介入】</span>买家请求平台客服介入处理`
    };
    const messages = [];
    const requiredTypes = ['refund', order.posts_id ? '' : 'exchange', 'close', 'support'].filter(Boolean);

    requiredTypes.forEach(type => {
        const timestamp = formatTimestamp(new Date(Date.now() - randomInt(0, 86400000))); // Random time within last 24 hours
        const content = templates[type] + (type !== 'support'
            ? `<div class="template-actions"><button class="btn-small" onclick="respondToRequest(${order.id.sample}, '${type}', 'agree', 'buyer', this)">同意</button><button class="btn-small" onclick="openRejectDialog(${order.id.sample}, '${type}', 'buyer', this)">拒绝</button></div> <span class="timestamp">${timestamp}</span>`
            : ` <span class="timestamp">${timestamp}</span>`);
        messages.push(`
            <div class="chat-message buyer-message" data-id="${Date.now() + messages.length}">
                <div class="avatar-name">
                    <img src="https://picsum.photos/50/50?random=${buyerName}" alt="buyer" class="chat-avatar">
                    <span class="chat-name" style="color: #4CAF50">${buyerName}</span>
                </div>
                <div class="chat-content">
                    <div class="chat-bubble">${content}</div>
                </div>
            </div>
        `);
    });

    const totalMessages = randomInt(20, 30);
    for (let i = messages.length; i < totalMessages; i++) {
        const role = roles[randomInt(0, roles.length - 1)];
        const timestamp = formatTimestamp(new Date(Date.now() - randomInt(0, 86400000))); // Random time within last 24 hours
        let content = role === 'system' ? `System: ${faker.lorem.sentence()}` : faker.lorem.sentence();
        if (role === 'buyer' && randomInt(0, 3) === 0) {
            const type = faker.random.arrayElement(requiredTypes);
            content = templates[type] + (type !== 'support'
                ? `<div class="template-actions"><button class="btn-small" onclick="respondToRequest(${order.id.sample}, '${type}', 'agree', 'buyer', this)">同意</button><button class="btn-small" onclick="openRejectDialog(${order.id.sample}, '${type}', 'buyer', this)">拒绝</button></div> <span class="timestamp">${timestamp}</span>`
                : ` <span class="timestamp">${timestamp}</span>`);
        } else {
            content += ` <span class="timestamp">${timestamp}</span>`;
        }

        const name = role === 'system' ? '' : role === 'support' ? supportName : role === 'store' ? storeName : buyerName;
        const avatar = role === 'system' ? '' : `https://picsum.photos/50/50?random=${name}`;
        const nameColor = {
            system: 'var(--font-red)',
            store: 'var(--font-orange)',
            support: 'var(--font-red)',
            buyer: 'var(--font-green)'
        }[role];

        messages.push(`
            <div class="chat-message ${role}-message" data-id="${Date.now() + i}">
                <div class="avatar-name" title="${name}">
                    ${role !== 'system' ? `<img src="${avatar}" alt="${role}" class="chat-avatar">` : ''}
                    ${role !== 'system' ? `<span class="chat-name" style="color: ${nameColor}">${name}</span>` : '<span class="chat-name"></span>'}
                </div>
                <div class="chat-content">
                    <div class="chat-bubble">${content}</div>
                </div>
            </div>
        `);
    }

    return messages.sort(() => Math.random() - 0.5);
}

function switchTab(type, orderId) {
    const tabs = document.querySelectorAll('.message-tabs .tab');
    const contents = document.querySelectorAll('.input-content');
    tabs.forEach(tab => tab.classList.remove('active'));
    contents.forEach(content => content.classList.remove('active'));
    document.querySelector(`.tab[data-type="${type}"]`).classList.add('active');
    document.getElementById(`${type}-input`).classList.add('active');
}

function previewImage(orderId) {
    const fileInput = document.getElementById('chat-image-input');
    const preview = document.getElementById('image-preview');
    const file = fileInput.files[0];
    if (file) {
        if (file.size > 1024 * 1024) {
            alert('图片大小不能超过1MB');
            fileInput.value = '';
            return;
        }
        const reader = new FileReader();
        reader.onload = (e) => {
            preview.innerHTML = `<img src="${e.target.result}" alt="预览" style="max-height: 100%;">`;
            preview.onclick = null;
        };
        reader.readAsDataURL(file);
    }
}

function previewFile(orderId) {
    const fileInput = document.getElementById('chat-file-input');
    const preview = document.getElementById('file-preview');
    const file = fileInput.files[0];
    if (file) {
        if (file.size > 1024 * 1024) {
            alert('文件大小不能超过1MB');
            fileInput.value = '';
            return;
        }
        preview.innerHTML = `<span>${file.name}</span>`;
        preview.onclick = null;
    }
}

function sendMessage(orderId, type) {
    const chatContainer = document.getElementById('chat-container');
    const timestamp = formatTimestamp(new Date());
    let content = '';
    switch (type) {
        case 'text':
            let maxLine = 10, maxSize = 300
            content = document.getElementById('chat-text-input').value.trim();
            let lines = content.split("\n")
            if (lines.length > maxLine){
                alert(`content not more than ${maxLine} lines`)
                return;
            }
            if (content.length > maxSize){
                alert(`content length not more than ${maxSize}`)
                return;
            }

            content = content.replaceAll("\n", "<br/>")
            if (!content) return;
            break;
        case 'image':
            const imageInput = document.getElementById('chat-image-input');
            if (!imageInput.files[0]) return;
            content = `<img src="${URL.createObjectURL(imageInput.files[0])}" alt="用户上传图片" style="max-width: 200px;">`;
            imageInput.value = '';
            document.getElementById('image-preview').innerHTML = '点击选择图片';
            document.getElementById('image-preview').onclick = () => document.getElementById('chat-image-input').click();
            break;
        case 'file':
            const fileInput = document.getElementById('chat-file-input');
            if (!fileInput.files[0]) return;
            const fileUrl = URL.createObjectURL(fileInput.files[0]);
            content = `<a href="${fileUrl}" target="_blank" class="download-link">文件: ${fileInput.files[0].name} (${randomInt(1,500)}) <i class="fa fa-download downloading"></i></a>`;
            fileInput.value = '';
            document.getElementById('file-preview').innerHTML = '点击选择文件';
            document.getElementById('file-preview').onclick = () => document.getElementById('chat-file-input').click();
            break;
    }

    content += ` <span class="timestamp">${timestamp}</span>`;
    chatContainer.innerHTML += `
        <div class="chat-message buyer-message" data-id="${Date.now()}">
            <div class="avatar-name">
                <img src="https://picsum.photos/50/50?random=${buyerName}" alt="buyer" class="chat-avatar">
                <span class="chat-name" style="color: #4CAF50">${buyerName}</span>
            </div>
            <div class="chat-content">
                <div class="chat-bubble">${content}</div>
            </div>
        </div>
    `;
    if (type === 'text') document.getElementById('chat-text-input').value = '';
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function openRequestDialog(orderId, type) {
    const order = allOrders.find(o => o.id.sample === orderId);
    const maxAmount = parseFloat(order.amount.sample.replace('$', ''));
    const unitPrice = maxAmount / order.quantity.sample;

    const dialog = document.createElement('div');
    dialog.className = 'request-dialog';
    let bodyContent = '';
    if (type === 'close') {
        bodyContent = '<p>确认关闭工单？</p>';
    } else if (order.posts_id && type === 'refund') {
        bodyContent = `
            <label>问题类型:</label>
            <select id="request-type" onchange="updateRequestReasonDropdown()">
                ${aftersalesConfig.map(config => `<option value="${config.name}">${config.name}</option>`).join('')}
            </select>
            <label>问题原因:</label>
            <select id="request-reason">
                ${aftersalesConfig[0].reasons.map(reason => `<option value="${reason}">${reason}</option>`).join('')}
            </select>
            <label>退款金额:</label>
            <input type="number" id="request-amount" min="0" max="${maxAmount}" step="0.01" value="0" placeholder="请输入退款金额">
        `;
    } else if ((order.demand_id || order.item_id) && (type === 'refund' || type === 'exchange')) {
        bodyContent = `
            <label>问题类型:</label>
            <select id="request-type" onchange="updateRequestReasonDropdown()">
                ${aftersalesConfig.map(config => `<option value="${config.name}">${config.name}</option>`).join('')}
            </select>
            <label>问题原因:</label>
            <select id="request-reason">
                ${aftersalesConfig[0].reasons.map(reason => `<option value="${reason}">${reason}</option>`).join('')}
            </select>
            <label>问题账号:</label>
            <textarea id="request-details" placeholder="请输入问题账号，每行一个..." rows="5" oninput="updateRequestStats(${unitPrice})"></textarea>
            <div id="request-stats">数量: 0 金额: $0.00</div>
        `;
    }

    dialog.innerHTML = `
        <div class="request-dialog-content">
            <div class="dialog-header">
                <h3>${type === 'refund' ? '申请退款' : type === 'exchange' ? '申请换货' : '申请关闭'}</h3>
                <button class="dialog-close" onclick="this.parentElement.parentElement.parentElement.remove()">×</button>
            </div>
            <div class="dialog-body">
                ${bodyContent}
                <div class="review-actions">
                    <button class="btn-orange-solid-small" onclick="submitRequest(${orderId}, '${type}')">提交</button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(dialog);
}

function updateRequestReasonDropdown() {
    const typeSelect = document.getElementById('request-type');
    const reasonSelect = document.getElementById('request-reason');
    const selectedType = typeSelect.value;
    const config = aftersalesConfig.find(item => item.name === selectedType);
    reasonSelect.innerHTML = config.reasons.map(reason => `<option value="${reason}">${reason}</option>`).join('');
}

function updateRequestStats(unitPrice) {
    const details = document.getElementById('request-details').value.trim();
    const lines = details.split('\n').filter(line => line.trim() !== '');
    const count = lines.length;
    const amount = (count * unitPrice).toFixed(2);
    document.getElementById('request-stats').innerHTML = `数量: ${count} 金额: $${amount}`;
}

function submitRequest(orderId, type) {
    const order = allOrders.find(o => o.id.sample === orderId);
    const chatContainer = document.getElementById('chat-container');
    const timestamp = formatTimestamp(new Date());
    let message = '';
    if (type === 'close') {
        message = `<span class="request-close">【关闭申请】</span>买家请求关闭工单<div class="template-actions"><button class="btn-small" onclick="respondToRequest(${orderId}, '${type}', 'agree', 'buyer', this)">同意</button><button class="btn-small" onclick="openRejectDialog(${orderId}, '${type}', 'buyer', this)">拒绝</button></div> <span class="timestamp">${timestamp}</span>`;
    } else if (order.posts_id && type === 'refund') {
        const amount = document.getElementById('request-amount').value;
        const reason = document.getElementById('request-reason').value;
        if (!amount || amount <= 0) {
            alert('请输入有效的退款金额');
            return;
        }
        message = `<span class="request-refund">【退款申请】</span>买家申请退款, 退款金额：$${amount}<br>理由: <span style="color: red">${reason}</span> <div class="template-actions"><button class="btn-small" onclick="openConfirmRefundDialog(${orderId}, '${type}', 'agree', 'buyer', this, ${amount})">同意</button><button class="btn-small" onclick="openRejectDialog(${orderId}, '${type}', 'buyer', this)">拒绝</button></div> <span class="timestamp">${timestamp}</span>`;
    } else if ((order.demand_id || order.item_id) && (type === 'refund' || type === 'exchange')) {
        const details = document.getElementById('request-details').value.trim();
        const reason = document.getElementById('request-reason').value;
        if (!details) {
            alert('请输入问题账号');
            return;
        }
        const lines = details.split('\n').filter(line => line.trim() !== '');
        const count = lines.length;
        const unitPrice = parseFloat(order.amount.sample.replace('$', '')) / order.quantity.sample;
        const amount = (count * unitPrice).toFixed(2);
        const blob = new Blob([details], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        message = type === 'refund'
            ? `<span class="request-refund">【退款申请】</span>买家申请退款<br>问题信息: <a href="${url}" target="_blank" class="download-link">下载<i class="fa fa-download downloading"></i></a><br>退款数量：${count}<br>退款金额：$${amount}<br>理由: ${reason}`
            : `<span class="request-exchange">【换货申请】</span>买家申请换货<br>问题信息: <a href="${url}" target="_blank" class="download-link">下载<i class="fa fa-download downloading"></i></a><br>换货数量：${count}<br>理由: <span style="color: red">${reason}</span>`;
        message += type === 'refund'
            ? `<div class="template-actions"><button class="btn-small" onclick="openConfirmRefundDialog(${orderId}, '${type}', 'agree', 'buyer', this, ${amount})">同意</button><button class="btn-small" onclick="openRejectDialog(${orderId}, '${type}', 'buyer', this)">拒绝</button></div> <span class="timestamp">${timestamp}</span>`
            : `<div class="template-actions"><button class="btn-small" onclick="respondToRequest(${orderId}, '${type}', 'agree', 'buyer', this)">同意</button><button class="btn-small" onclick="openRejectDialog(${orderId}, '${type}', 'buyer', this)">拒绝</button></div> <span class="timestamp">${timestamp}</span>`;
    }

    chatContainer.innerHTML += `
        <div class="chat-message buyer-message" data-id="${Date.now()}">
            <div class="avatar-name">
                <img src="https://picsum.photos/50/50?random=${buyerName}" alt="buyer" class="chat-avatar">
                <span class="chat-name" style="color: #4CAF50">${buyerName}</span>
            </div>
            <div class="chat-content">
                <div class="chat-bubble">${message}</div>
            </div>
        </div>
    `;
    document.querySelector('.request-dialog').remove();
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function requestSupport(orderId) {
    const chatContainer = document.getElementById('chat-container');
    const timestamp = formatTimestamp(new Date());
    chatContainer.innerHTML += `
        <div class="chat-message buyer-message" data-id="${Date.now()}">
            <div class="avatar-name">
                <img src="https://picsum.photos/50/50?random=${buyerName}" alt="buyer" class="chat-avatar">
                <span class="chat-name" style="color: #4CAF50">${buyerName}</span>
            </div>
            <div class="chat-content">
                <div class="chat-bubble"><span class="request-support">【客服介入】</span>买家请求平台客服介入处理 <span class="timestamp">${timestamp}</span></div>
            </div>
        </div>
    `;
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function respondToRequest(orderId, type, response, sender, button) {
    const chatContainer = document.getElementById('chat-container');
    const messageElement = button.closest('.chat-message');
    const bubble = messageElement.querySelector('.chat-bubble');
    const actions = messageElement.querySelector('.template-actions');
    const senderText = sender === 'buyer' ? buyerName : storeName;
    const timestamp = formatTimestamp(new Date());

    if (actions) actions.style.display = 'none';
    bubble.innerHTML += response === 'agree'
        ? `<div class="response-status" style="color: #32CD32">${senderText}: 已同意 <span class="timestamp">${timestamp}</span></div>`
        : `<div class="response-status" style="color: #FF4500">${senderText}: 已拒绝 <span class="timestamp">${timestamp}</span></div>`;

    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function openConfirmRefundDialog(orderId, type, response, sender, button, amount) {
    const dialog = document.createElement('div');
    dialog.className = 'confirm-refund-dialog';
    dialog.innerHTML = `
        <div class="confirm-refund-dialog-content">
            <div class="dialog-header">
                <h3>确认退款</h3>
                <button class="dialog-close" onclick="this.parentElement.parentElement.parentElement.remove()">×</button>
            </div>
            <div class="dialog-body">
                <p>您同意后，将退还 <span style="color: var(--font-orange)">$${amount}</span> 给客户 ${buyerName}</p>
                <div class="review-actions">
                    <button class="btn-small" onclick="this.parentElement.parentElement.parentElement.parentElement.remove()">取消</button>
                    <button class="btn-orange-solid-small" onclick="confirmRefund(${orderId}, '${type}', '${response}', '${sender}', this, ${amount})">确认</button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(dialog);
}

function confirmRefund(orderId, type, response, sender, button, amount) {
    const chatContainer = document.getElementById('chat-container');
    const messageElement = button.closest('.chat-message');
    const bubble = messageElement.querySelector('.chat-bubble');
    const actions = messageElement.querySelector('.template-actions');
    const senderText = sender === 'buyer' ? buyerName : storeName;
    const timestamp = formatTimestamp(new Date());

    if (actions) actions.style.display = 'none';
    bubble.innerHTML += `<div class="response-status" style="color: #32CD32">${senderText}: 已同意 <span class="timestamp">${timestamp}</span></div>`;

    document.querySelector('.confirm-refund-dialog').remove();
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function openRejectDialog(orderId, type, sender, button) {
    const messageElement = button.closest('.chat-message');
    const messageId = messageElement.getAttribute('data-id');

    const dialog = document.createElement('div');
    dialog.className = 'reject-dialog';
    dialog.innerHTML = `
        <div class="reject-dialog-content">
            <div class="dialog-header">
                <h3>请输入拒绝理由</h3>
                <button class="dialog-close" onclick="this.parentElement.parentElement.parentElement.remove()">×</button>
            </div>
            <div class="dialog-body">
                <textarea id="reject-reason" placeholder="请输入拒绝理由..." rows="4"></textarea>
                <div class="review-actions">
                    <button class="btn-orange-solid-small" onclick="submitRejectReason(${orderId}, '${type}', '${sender}', '${messageId}')">提交</button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(dialog);
}

function submitRejectReason(orderId, type, sender, messageId) {
    const reason = document.getElementById('reject-reason').value.trim();
    if (!reason) {
        alert('拒绝理由不能为空');
        return;
    }

    const chatContainer = document.getElementById('chat-container');
    const messageElement = chatContainer.querySelector(`.chat-message[data-id="${messageId}"]`);
    const bubble = messageElement.querySelector('.chat-bubble');
    const actions = messageElement.querySelector('.template-actions');
    const senderText = sender === 'buyer' ? buyerName : storeName;
    const timestamp = formatTimestamp(new Date());

    if (actions) actions.style.display = 'none';
    bubble.innerHTML += `
        <div class="response-status" style="color: #FF4500">${senderText}: 已拒绝 理由: <span style="color: #FF4500">${reason}</span> <span class="timestamp">${timestamp}</span></div>
    `;

    document.querySelector('.reject-dialog').remove();
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function openCloseTicketConfirmation(orderId) {
    const dialog = document.createElement('div');
    dialog.className = 'close-ticket-dialog';
    dialog.innerHTML = `
        <div class="close-ticket-dialog-content">
            <div class="dialog-header">
                <h3>确认关闭工单</h3>
                <button class="dialog-close" onclick="this.parentElement.parentElement.parentElement.remove()">×</button>
            </div>
            <div class="dialog-body">
                <p>确定要关闭此工单吗？</p>
                <div class="review-actions">
                    <button class="btn-small" onclick="this.parentElement.parentElement.parentElement.parentElement.remove()">取消</button>
                    <button class="btn-orange-solid-small" onclick="closeTicket(${orderId})">确认</button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(dialog);
}

function closeTicket(orderId) {
    const chatContainer = document.getElementById('chat-container');
    const timestamp = formatTimestamp(new Date());
    chatContainer.innerHTML += `
        <div class="chat-message system-message" data-id="${Date.now()}">
            <div class="chat-content">
                <div class="chat-bubble">工单已关闭 <span class="timestamp">${timestamp}</span></div>
            </div>
        </div>
    `;
    document.querySelector('.close-ticket-dialog').remove();
    closeTicketDialog('ticket-chat-dialog');
}