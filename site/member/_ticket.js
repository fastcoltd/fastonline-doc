// _ticket.js

const submittedTickets = new Set();
const platformNames = ['客服小明', '客服小红', '客服小刚'];
const storeName = '快购商店';
const buyerName = '张三';

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
            <select id="aftersales-type">
                <option value="refund">退款</option>
                <option value="exchange">换货</option>
                <option value="repair">维修</option>
            </select>
            <label>问题原因:</label>
            <select id="aftersales-subtype">
                <option value="quality">商品质量问题</option>
                <option value="delivery">配送问题</option>
                <option value="other">其他</option>
            </select>
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
    const subtype = document.getElementById('aftersales-subtype').value;
    const details = document.getElementById('submission-details').value.trim();
    let message = `【工单提交】售后类型: ${type}, 子项: ${subtype}`;

    if (order.posts_id) {
        message += details ? `, 问题描述: ${details}` : '';
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
        message += `, 问题信息: <a href="${url}" target="_blank" class="download-link">下载<i class="fa fa-download downloading"></i></a>, 数量: ${count}, 金额: $${amount}`;
    }

    submittedTickets.add(orderId);
    closeTicketDialog('ticket-submission-dialog');
    openChatDialog(orderId, message);
}

function openChatDialog(orderId, initialMessage = null) {
    const order = allOrders.find(o => o.id.sample === orderId);
    if (!order) return;

    const dialog = document.createElement('div');
    dialog.className = 'ticket-dialog';
    dialog.id = 'ticket-chat-dialog';

    const dialogContent = document.createElement('div');
    dialogContent.className = 'ticket-dialog-content';

    const header = document.createElement('div');
    header.className = 'ticket-dialog-header';
    header.innerHTML = `
        <h3>工单 - 订单 #${order.id.sample}</h3>
        <div class="order-info">
            <p>${userOrdersFieldConfig.itemName.format(null, order)} 数量: ${order.quantity.sample} 金额: ${order.amount.sample} 订单时间: ${order.paid_time.sample}</p>
        </div>
        <button class="ticket-dialog-close" onclick="closeTicketDialog('ticket-chat-dialog')">×</button>
    `;

    const body = document.createElement('div');
    body.className = 'ticket-dialog-body';

    const chatContainer = document.createElement('div');
    chatContainer.className = 'chat-container';
    chatContainer.id = 'chat-container';

    const chatMessages = initialMessage
        ? [`<div class="chat-message buyer-message" data-id="${Date.now()}">
                <div class="avatar-name">
                    <img src="https://picsum.photos/50/50?random=${Date.now()}" alt="buyer" class="chat-avatar">
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
                <button class="btn-small close-btn" onclick="openRequestDialog(${orderId}, 'close')">申请关闭</button>
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
        const content = templates[type] + (type !== 'support'
            ? `<div class="template-actions"><button class="btn-small" onclick="respondToRequest(${order.id.sample}, '${type}', 'agree', 'buyer', this)">同意</button><button class="btn-small" onclick="openRejectDialog(${order.id.sample}, '${type}', 'buyer', this)">拒绝</button></div>`
            : '');
        messages.push(`
            <div class="chat-message buyer-message" data-id="${Date.now() + messages.length}">
                <div class="avatar-name">
                    <img src="https://picsum.photos/50/50?random=${Date.now()}" alt="buyer" class="chat-avatar">
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
        let content = role === 'system' ? `System: ${faker.lorem.sentence()}` : faker.lorem.sentence();
        if (role === 'buyer' && randomInt(0, 3) === 0) {
            const type = faker.random.arrayElement(requiredTypes);
            content = templates[type] + (type !== 'support'
                ? `<div class="template-actions"><button class="btn-small" onclick="respondToRequest(${order.id.sample}, '${type}', 'agree', 'buyer', this)">同意</button><button class="btn-small" onclick="openRejectDialog(${order.id.sample}, '${type}', 'buyer', this)">拒绝</button></div>`
                : '');
        }

        const avatar = role === 'system' ? '' : `https://picsum.photos/50/50?random=${i}`;
        const name = role === 'system' ? '' : role === 'support' ? platformNames[randomInt(0, platformNames.length - 1)] : role === 'store' ? storeName : buyerName;
        const nameColor = {
            system: '#FF4500',
            store: '#333333',
            support: '#FF0000',
            buyer: '#4CAF50'
        }[role];

        messages.push(`
            <div class="chat-message ${role}-message" data-id="${Date.now() + i}">
                <div class="avatar-name">
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
    let content = '';
    switch (type) {
        case 'text':
            content = document.getElementById('chat-text-input').value.trim();
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

    chatContainer.innerHTML += `
        <div class="chat-message buyer-message" data-id="${Date.now()}">
            <div class="avatar-name">
                <img src="https://picsum.photos/50/50?random=${Date.now()}" alt="buyer" class="chat-avatar">
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
            <label>退款金额:</label>
            <input type="number" id="request-amount" min="0" max="${maxAmount}" step="0.01" value="0" placeholder="请输入退款金额">
        `;
    } else if ((order.demand_id || order.item_id) && (type === 'refund' || type === 'exchange')) {
        bodyContent = `
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
    let message = '';
    if (type === 'close') {
        message = `<span class="request-close">【关闭申请】</span>买家请求关闭工单<div class="template-actions"><button class="btn-small" onclick="respondToRequest(${orderId}, '${type}', 'agree', 'buyer', this)">同意</button><button class="btn-small" onclick="openRejectDialog(${orderId}, '${type}', 'buyer', this)">拒绝</button></div>`;
    } else if (order.posts_id && type === 'refund') {
        const amount = document.getElementById('request-amount').value;
        if (!amount || amount <= 0) {
            alert('请输入有效的退款金额');
            return;
        }
        message = `<span class="request-refund">【退款申请】</span>买家申请退款，退款金额：$${amount}<div class="template-actions"><button class="btn-small" onclick="openConfirmRefundDialog(${orderId}, '${type}', 'agree', 'buyer', this, ${amount})">同意</button><button class="btn-small" onclick="openRejectDialog(${orderId}, '${type}', 'buyer', this)">拒绝</button></div>`;
    } else if ((order.demand_id || order.item_id) && (type === 'refund' || type === 'exchange')) {
        const details = document.getElementById('request-details').value.trim();
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
            ? `<span class="request-refund">【退款申请】</span>买家申请退款，问题信息: <a href="${url}" target="_blank" class="download-link">下载<i class="fa fa-download downloading"></i></a>, 退款数量：${count}，退款金额：$${amount}`
            : `<span class="request-exchange">【换货申请】</span>买家申请换货，问题信息: <a href="${url}" target="_blank" class="download-link">下载<i class="fa fa-download downloading"></i></a>, 换货数量：${count}`;
        message += type === 'refund'
            ? `<div class="template-actions"><button class="btn-small" onclick="openConfirmRefundDialog(${orderId}, '${type}', 'agree', 'buyer', this, ${amount})">同意</button><button class="btn-small" onclick="openRejectDialog(${orderId}, '${type}', 'buyer', this)">拒绝</button></div>`
            : `<div class="template-actions"><button class="btn-small" onclick="respondToRequest(${orderId}, '${type}', 'agree', 'buyer', this)">同意</button><button class="btn-small" onclick="openRejectDialog(${orderId}, '${type}', 'buyer', this)">拒绝</button></div>`;
    }

    chatContainer.innerHTML += `
        <div class="chat-message buyer-message" data-id="${Date.now()}">
            <div class="avatar-name">
                <img src="https://picsum.photos/50/50?random=${Date.now()}" alt="buyer" class="chat-avatar">
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
    chatContainer.innerHTML += `
        <div class="chat-message buyer-message" data-id="${Date.now()}">
            <div class="avatar-name">
                <img src="https://picsum.photos/50/50?random=${Date.now()}" alt="buyer" class="chat-avatar">
                <span class="chat-name" style="color: #4CAF50">${buyerName}</span>
            </div>
            <div class="chat-content">
                <div class="chat-bubble"><span class="request-support">【客服介入】</span>买家请求平台客服介入处理</div>
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

    if (actions) actions.style.display = 'none';
    bubble.innerHTML += response === 'agree'
        ? `<div class="response-status" style="color: #32CD32">${senderText}: 已同意</div>`
        : `<div class="response-status" style="color: #FF4500">${senderText}: 已拒绝</div>`;

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

    if (actions) actions.style.display = 'none';
    bubble.innerHTML += `<div class="response-status" style="color: #32CD32">${senderText}: 已同意</div>`;

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

    if (actions) actions.style.display = 'none';
    bubble.innerHTML += `
        <div class="response-status">${senderText}: <span style="color: #FF4500">已拒绝</span> 理由: <span style="color: #FF4500">${reason}</span></div>
    `;

    document.querySelector('.reject-dialog').remove();
    chatContainer.scrollTop = chatContainer.scrollHeight;
}