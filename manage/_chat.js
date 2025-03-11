// _chat.js

// 独立聊天数据
const independentChatData = {
    tickets: [
        { id: 1, title: "工单 1 - ORD-2025-001", summary: "用户反馈: 商品损坏，等待处理。", status: "未处理", time: "2025-03-10 09:00" },
        { id: 2, title: "工单 2 - ORD-2025-002", summary: "用户反馈: 配送延迟，请核查。", status: "处理中", time: "2025-03-10 10:30" },
        { id: 3, title: "工单 3 - ORD-2025-003", summary: "用户反馈: 订单错误，已解决。", status: "处理中", time: "2025-03-09 15:45" },
        { id: 4, title: "工单 4 - ORD-2025-004", summary: "用户反馈: 质量问题，待确认。", status: "处理中", time: "2025-03-11 08:15" },
        { id: 5, title: "工单 5 - ORD-2025-005", summary: "用户反馈: 服务不满，处理中。", status: "处理中", time: "2025-03-11 11:00" },
        { id: 6, title: "工单 6 - ORD-2025-006", summary: "用户反馈: 退款未到账，需核查。", status: "未处理", time: "2025-03-11 13:20" },
        { id: 7, title: "工单 7 - ORD-2025-007", summary: "用户反馈: 商品描述不符，请处理。", status: "处理中", time: "2025-03-11 14:45" },
        { id: 8, title: "工单 8 - ORD-2025-008", summary: "用户反馈: 物流信息错误，需更新。", status: "未处理", time: "2025-03-12 09:30" },
        { id: 9, title: "工单 9 - ORD-2025-009", summary: "用户反馈: 换货请求，等待确认。", status: "处理中", time: "2025-03-12 11:15" },
        { id: 10, title: "工单 10 - ORD-2025-010", summary: "用户反馈: 订单取消未成功，需协助。", status: "未处理", time: "2025-03-12 15:00" },
        { id: 11, title: "工单 11 - ORD-2025-011", summary: "用户反馈: 商品未收到，要求退款。", status: "处理中", time: "2025-03-13 08:50" },
        { id: 12, title: "工单 12 - ORD-2025-012", summary: "用户反馈: 客服未及时回复，需处理。", status: "未处理", time: "2025-03-13 10:20" },
        { id: 13, title: "工单 13 - ORD-2025-013", summary: "用户反馈: 商品包装破损，需换货。", status: "处理中", time: "2025-03-13 14:30" },
        { id: 14, title: "工单 14 - ORD-2025-014", summary: "用户反馈: 支付异常，需核实。", status: "未处理", time: "2025-03-14 09:10" },
        { id: 15, title: "工单 15 - ORD-2025-015", summary: "用户反馈: 商品缺货，要求退款。", status: "处理中", time: "2025-03-14 11:45" }
    ],
    messages: {
        1: [
            { role: "system", content: "张三 对订单 ORD-2025-001 提交了工单，原因：商品损坏", time: moment().subtract(6, 'days').unix() },
            { role: "customer", content: "我收到商品时已经损坏了，外包装也有明显破损，请尽快处理！", time: moment().subtract(5, 'days').unix() },
            { role: "admin", content: "您好，我们已经收到您的反馈，正在核查物流情况，请稍等。", time: moment().subtract(4, 'days').unix() },
            { role: "customer", content: "好的，但请尽快，我急着用这个商品。", time: moment().subtract(3, 'days').unix() },
            { role: "admin", content: "感谢您的耐心，我们已联系物流公司，预计明天会有结果。", time: moment().subtract(2, 'days').unix() }
        ],
        2: [
            { role: "system", content: "李四 对订单 ORD-2025-002 提交了工单，原因：配送延迟", time: moment().subtract(3, 'days').unix() },
            { role: "customer", content: "我的订单显示已经发货三天了，但物流信息还没更新，太慢了！", time: moment().subtract(2, 'days').unix() },
            { role: "store", content: "您好，我们已经核实，物流因天气原因延迟，预计明天送达。", time: moment().subtract(1, 'days').unix() },
            { role: "customer", content: "天气原因可以理解，但能不能提供一个具体的送达时间？", time: moment().subtract(12, 'hours').unix() },
            { role: "store", content: "根据物流最新反馈，预计明天上午10点前送达，感谢您的理解。", time: moment().subtract(6, 'hours').unix() }
        ],
        3: [
            { role: "system", content: "王五 对订单 ORD-2025-003 提交了工单，原因：订单错误", time: moment().subtract(7, 'days').unix() },
            { role: "customer", content: "我订的是黑色款，结果发来的是白色款，请更换！", time: moment().subtract(6, 'days').unix() },
            { role: "admin", content: "非常抱歉，我们已经核实库存，已安排重新发货黑色款，预计3天内送达。", time: moment().subtract(5, 'days').unix() },
            { role: "customer", content: "好的，麻烦快点处理，谢谢。", time: moment().subtract(4, 'days').unix() },
            { role: "admin", content: "已加急处理，物流单号稍后提供给您，处理中更换。", time: moment().subtract(3, 'days').unix() }
        ],
        4: [
            { role: "system", content: "赵六 对订单 ORD-2025-004 提交了工单，原因：质量问题", time: moment().subtract(2, 'days').unix() },
            { role: "customer", content: "我买的这个产品用了两天就坏了，质量太差，能退货吗？", time: moment().subtract(1, 'days').unix() },
            { role: "store", content: "您好，请提供损坏的照片和订单号，我们会尽快处理。", time: moment().subtract(1, 'hours').unix() },
            { role: "customer", content: "照片已经上传了，请查收，订单号是 ORD-2025-004。", time: moment().subtract(30, 'minutes').unix() },
            { role: "store", content: "已收到照片，我们确认是质量问题，已发起退货流程，请留意退款通知。", time: moment().subtract(15, 'minutes').unix() }
        ],
        5: [
            { role: "system", content: "刘七 对订单 ORD-2025-005 提交了工单，原因：服务不满", time: moment().subtract(1, 'days').unix() },
            { role: "customer", content: "你们的客服回复太慢了，我的问题到现在还没解决，太失望了！", time: moment().subtract(12, 'hours').unix() },
            { role: "admin", content: "非常抱歉给您带来不便，我们已加急处理您的问题，请问具体是什么情况？", time: moment().subtract(6, 'hours').unix() },
            { role: "customer", content: "就是订单状态一直没更新，我问了好几次都没人理。", time: moment().subtract(5, 'hours').unix() },
            { role: "admin", content: "我们已核实，订单因系统问题未更新，已手动调整状态，请您刷新查看。", time: moment().subtract(4, 'hours').unix() }
        ],
        6: [
            { role: "system", content: "孙八 对订单 ORD-2025-006 提交了工单，原因：退款未到账", time: moment().subtract(1, 'days').unix() },
            { role: "customer", content: "我申请退款已经三天了，钱还没到账，请查一下！", time: moment().subtract(20, 'hours').unix() },
            { role: "admin", content: "您好，我们正在核查退款状态，请提供退款申请的时间和订单号。", time: moment().subtract(18, 'hours').unix() },
            { role: "customer", content: "退款是3月10号申请的，订单号 ORD-2025-006。", time: moment().subtract(16, 'hours').unix() },
            { role: "admin", content: "已确认，退款因银行处理延迟，预计明天到账，请留意账户。", time: moment().subtract(14, 'hours').unix() }
        ],
        7: [
            { role: "system", content: "周九 对订单 ORD-2025-007 提交了工单，原因：商品描述不符", time: moment().subtract(1, 'days').unix() },
            { role: "customer", content: "商品页面说有防水功能，实际没有，太坑了！", time: moment().subtract(22, 'hours').unix() },
            { role: "store", content: "抱歉造成误解，请提供照片和订单号，我们会核实处理。", time: moment().subtract(20, 'hours').unix() },
            { role: "customer", content: "照片已发，订单号 ORD-2025-007，赶紧处理吧。", time: moment().subtract(18, 'hours').unix() },
            { role: "store", content: "已核实，确实描述有误，已发起退款流程，请确认。", time: moment().subtract(16, 'hours').unix() }
        ],
        8: [
            { role: "system", content: "吴十 对订单 ORD-2025-008 提交了工单，原因：物流信息错误", time: moment().subtract(1, 'days').unix() },
            { role: "customer", content: "物流信息显示已签收，但我根本没收到货！", time: moment().subtract(15, 'hours').unix() },
            { role: "admin", content: "您好，我们正在联系物流核实，请稍等。", time: moment().subtract(14, 'hours').unix() },
            { role: "customer", content: "麻烦快点查，我很急。", time: moment().subtract(13, 'hours').unix() },
            { role: "admin", content: "已确认是物流误签，已重新派送，预计明天到达。", time: moment().subtract(12, 'hours').unix() }
        ],
        9: [
            { role: "system", content: "郑十一 对订单 ORD-2025-009 提交了工单，原因：换货请求", time: moment().subtract(1, 'days').unix() },
            { role: "customer", content: "我买的衣服尺码不合适，想换大一号。", time: moment().subtract(10, 'hours').unix() },
            { role: "store", content: "您好，请提供订单号和需要更换的尺码，我们会安排换货。", time: moment().subtract(9, 'hours').unix() },
            { role: "customer", content: "订单号 ORD-2025-009，要换成L号，谢谢。", time: moment().subtract(8, 'hours').unix() },
            { role: "store", content: "已安排换货，物流单号稍后发送给您，请留意。", time: moment().subtract(7, 'hours').unix() }
        ],
        10: [
            { role: "system", content: "钱十二 对订单 ORD-2025-010 提交了工单，原因：订单取消未成功", time: moment().subtract(1, 'days').unix() },
            { role: "customer", content: "我在发货前取消订单，但还是发货了，怎么回事？", time: moment().subtract(8, 'hours').unix() },
            { role: "admin", content: "抱歉，可能是系统延迟，已核实订单状态，请问您需要退货吗？", time: moment().subtract(7, 'hours').unix() },
            { role: "customer", content: "是的，请帮我退货退款。", time: moment().subtract(6, 'hours').unix() },
            { role: "admin", content: "已发起退货流程，请将商品寄回，退款会在收到后处理。", time: moment().subtract(5, 'hours').unix() }
        ],
        11: [
            { role: "system", content: "陈十三 对订单 ORD-2025-011 提交了工单，原因：商品未收到", time: moment().subtract(1, 'days').unix() },
            { role: "customer", content: "订单显示已送达，但我没收到，要求退款！", time: moment().subtract(6, 'hours').unix() },
            { role: "store", content: "您好，我们正在联系物流核实，请提供收货地址确认。", time: moment().subtract(5, 'hours').unix() },
            { role: "customer", content: "地址是XX市XX路123号，快点查吧。", time: moment().subtract(4, 'hours').unix() },
            { role: "store", content: "物流反馈可能是送错地址，已重新派送或可退款，您选择哪种？", time: moment().subtract(3, 'hours').unix() }
        ],
        12: [
            { role: "system", content: "杨十四 对订单 ORD-2025-012 提交了工单，原因：客服未及时回复", time: moment().subtract(1, 'days').unix() },
            { role: "customer", content: "我在平台问了三次订单状态，都没人回复，太差劲了！", time: moment().subtract(4, 'hours').unix() },
            { role: "admin", content: "非常抱歉，我们客服因高峰期回复延迟，已加急处理您的问题。", time: moment().subtract(3, 'hours').unix() },
            { role: "customer", content: "订单号 ORD-2025-012，麻烦查一下物流。", time: moment().subtract(2, 'hours').unix() },
            { role: "admin", content: "已查，订单预计明天送达，物流单号是XXX，请关注。", time: moment().subtract(1, 'hours').unix() }
        ],
        13: [
            { role: "system", content: "朱十五 对订单 ORD-2025-013 提交了工单，原因：商品包装破损", time: moment().subtract(1, 'days').unix() },
            { role: "customer", content: "包装破损严重，里面的东西都散了，能换货吗？", time: moment().subtract(3, 'hours').unix() },
            { role: "store", content: "您好，请上传破损照片，我们会尽快处理换货。", time: moment().subtract(2, 'hours').unix() },
            { role: "customer", content: "照片发过去了，订单号 ORD-2025-013。", time: moment().subtract(1, 'hours').unix() },
            { role: "store", content: "已确认破损，已安排新货发出，请注意查收。", time: moment().subtract(30, 'minutes').unix() }
        ],
        14: [
            { role: "system", content: "秦十六 对订单 ORD-2025-014 提交了工单，原因：支付异常", time: moment().subtract(1, 'days').unix() },
            { role: "customer", content: "我支付时显示失败，但钱被扣了，怎么回事？", time: moment().subtract(2, 'hours').unix() },
            { role: "admin", content: "您好，请提供支付时间和订单号，我们会核查。", time: moment().subtract(1, 'hours').unix() },
            { role: "customer", content: "3月14号9点支付的，订单号 ORD-2025-014。", time: moment().subtract(45, 'minutes').unix() },
            { role: "admin", content: "已核实，支付重复扣款，已退回多扣部分，请查收。", time: moment().subtract(30, 'minutes').unix() }
        ],
        15: [
            { role: "system", content: "尤十七 对订单 ORD-2025-015 提交了工单，原因：商品缺货", time: moment().subtract(1, 'days').unix() },
            { role: "customer", content: "你们发货时说缺货，为什么不提前通知？我要退款！", time: moment().subtract(1, 'hours').unix() },
            { role: "store", content: "抱歉，因库存更新延迟未及时通知，已发起退款，预计明天到账。", time: moment().subtract(45, 'minutes').unix() },
            { role: "customer", content: "那麻烦快点处理，谢谢。", time: moment().subtract(30, 'minutes').unix() },
            { role: "store", content: "已加急处理，退款处理中，请确认账户余额。", time: moment().subtract(15, 'minutes').unix() }
        ]
    }
};

// 打开独立聊天弹窗
function openIndependentChatModal() {
    let modal = document.getElementById('independentChatModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'independentChatModal';
        modal.className = 'modal';
        document.body.appendChild(modal);
    }

    const ticketList = independentChatData.tickets;
    const selectedTicket = ticketList[0];

    modal.innerHTML = `
        <div class="modal-content chat-modal-content">
            <button class="event-close-btn" onclick="closeIndependentChatModal()">×</button>
            <div class="chat-sidebar">
                <h3 style="margin: 0">工单列表</h3>
                <div class="ticket-list" id="independentTicketList">
                    ${ticketList.map(ticket => `
                        <div class="ticket-item ${ticket.id === selectedTicket.id ? 'active' : ''}" onclick="selectIndependentTicket(${ticket.id})">
                            <div class="ticket-title">${ticket.title}</div>
                            <div class="ticket-summary">${ticket.summary}</div>
                            <div class="ticket-meta">
                                <span class="ticket-status ant-tag ant-tag-${ticket.status === '未处理' ? 'red' : ticket.status === '处理中' ? 'blue' : 'green'}">${ticket.status}</span>
                                <span class="ticket-time">${ticket.time}</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
            <div class="chat-main" id="independentChatMain">
                <!-- 主内容区域由 selectIndependentTicket 填充 -->
            </div>
        </div>
    `;

    modal.style.display = 'block';
    selectIndependentTicket(selectedTicket.id);
    hideIndependentChatBadge();
}

// 选择工单并显示聊天内容
function selectIndependentTicket(ticketId) {
    const ticket = independentChatData.tickets.find(t => t.id === ticketId);
    const chatMain = document.getElementById('independentChatMain');
    chatMain.innerHTML = `
        <h3 style="margin: 0">工单号: <a onclick="alert('复制成功')">${ticket.id}</a> | 订单: <a onclick="alert('复制成功')">${ticket.title.split(' - ')[1]}</a></h3>
        <div class="chat-ticket-info">
            <div class="row">
                <div>工单进度:</div>
                <div>状态: <strong>${ticket.status}</strong></div>
                <div>金额: <strong>$${Math.floor(Math.random() * 200)}</strong></div>
                <div>换货: <strong>${Math.floor(Math.random() * 5)}</strong></div>
                <div>退款: <strong>${Math.floor(Math.random() * 3)}</strong></div>
                <div>换货: <strong>${Math.floor(Math.random() * 2)}</strong></div>
            </div>
            <div class="row">
                <div>工单原因:</div>
                <div>类型: <strong>${['退款', '换货', '维修'][Math.floor(Math.random() * 3)]}</strong></div>
                <div>原因: <strong>${ticket.summary.split(': ')[1]}</strong></div>
                <div>时间: <strong>${moment().format('HH:mm:ss')}</strong></div>
            </div>
            <div class="row">
                <div>在线状态:</div>
                <div>店铺: <strong>TechShop (${Math.random() > 0.5 ? '在线' : '离线'})</strong></div>
                <div>客户: <strong>张三 (${Math.random() > 0.5 ? '在线' : '离线'})</strong></div>
            </div>
            <div class="row">
                <div>操作工单:</div>
                <div><button class="ant-btn ant-btn-danger" onclick="console.log('关闭工单 ${ticket.id}')">关闭工单</button></div>
                <div><button class="ant-btn ant-btn-primary" onclick="console.log('操作退款 ${ticket.id}')">操作退款</button></div>
            </div>
        </div>
        <div class="chat-section">
            <div class="chat-header">
                <strong>商品示例 * ${Math.floor(Math.random() * 10 + 1)}</strong> | <strong>$${Math.floor(Math.random() * 450 + 50)}</strong> |
                <strong><a href="#">下载</a></strong>
            </div>
            <div class="chat-container" id="independentChatHistory"></div>
            <div class="chat-input">
                <div class="message-types" id="independentMessageTypes">
                    <button class="ant-btn" onclick="setIndependentMessageType('image', ${ticket.id})">图片</button>
                    <button class="ant-btn" onclick="setIndependentMessageType('file', ${ticket.id})">文件</button>
                </div>
                <div class="input-row">
                    <textarea id="independentChatInput" placeholder="输入消息 (Ctrl + Enter 发送)"></textarea>
                    <button class="ant-btn ant-btn-primary send-btn" onclick="sendIndependentMessage(${ticket.id})">发送</button>
                </div>
            </div>
            <input type="file" id="independentFileUpload" style="display: none;" onchange="uploadIndependentFile(${ticket.id})">
        </div>
    `;

    // 更新侧边栏选中状态
    const ticketItems = document.querySelectorAll('#independentTicketList .ticket-item');
    ticketItems.forEach(item => {
        item.classList.remove('active');
        if (parseInt(item.getAttribute('onclick').match(/\d+/)[0]) === ticketId) {
            item.classList.add('active');
        }
    });

    renderIndependentChatHistory(ticketId);
}

// 渲染独立聊天记录
function renderIndependentChatHistory(ticketId) {
    const chatHistory = document.getElementById('independentChatHistory');
    const messages = independentChatData.messages[ticketId] || [];
    chatHistory.innerHTML = messages.map(msg => {
        return `
            <div class="chat-message ${msg.role}">
                <div class="message-wrapper">
                    <div class="message-content">
                        <span class="message-text">${msg.role === 'system' ? `系统：${msg.content}` : msg.content}</span>
                        <span class="message-time">${moment.unix(msg.time).format('HH:mm')}</span>
                    </div>
                </div>
            </div>
        `;
    }).join('');
    chatHistory.scrollTop = chatHistory.scrollHeight;
}

// 设置消息类型
let independentMessageType = 'text';
let independentSelectedImage = null;
let independentSelectedFile = null;

function setIndependentMessageType(type, ticketId) {
    independentMessageType = type;
    if (type === 'image' && !independentSelectedImage) {
        document.getElementById('independentFileUpload').accept = 'image/*';
        document.getElementById('independentFileUpload').click();
    } else if (type === 'file' && !independentSelectedFile) {
        document.getElementById('independentFileUpload').accept = '';
        document.getElementById('independentFileUpload').click();
    }
}

// 发送消息
function sendIndependentMessage(ticketId) {
    const input = document.getElementById('independentChatInput');
    if (independentMessageType === 'text' && input.value.trim()) {
        console.log(`发送文本: ${input.value}`);
        independentChatData.messages[ticketId].push({
            role: 'admin',
            content: input.value,
            time: moment().unix()
        });
        input.value = '';
        renderIndependentChatHistory(ticketId);
    } else if (independentMessageType === 'image' && independentSelectedImage) {
        console.log(`发送图片: ${independentSelectedImage}`);
        independentChatData.messages[ticketId].push({
            role: 'admin',
            content: `<img src="${independentSelectedImage}" alt="上传图片">`,
            time: moment().unix()
        });
        independentSelectedImage = null;
        renderIndependentChatHistory(ticketId);
    } else if (independentMessageType === 'file' && independentSelectedFile) {
        console.log(`发送文件: ${independentSelectedFile.name}`);
        independentChatData.messages[ticketId].push({
            role: 'admin',
            content: `附件: <a href="#">${independentSelectedFile.name}</a>`,
            time: moment().unix()
        });
        independentSelectedFile = null;
        renderIndependentChatHistory(ticketId);
    }
}

// 文件上传
function uploadIndependentFile(ticketId) {
    const file = document.getElementById('independentFileUpload').files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            if (independentMessageType === 'image') {
                independentSelectedImage = reader.result;
                sendIndependentMessage(ticketId);
            } else if (independentMessageType === 'file') {
                independentSelectedFile = file;
                sendIndependentMessage(ticketId);
            }
        };
        reader.readAsDataURL(file);
    }
}

// 关闭聊天弹窗
function closeIndependentChatModal() {
    const modal = document.getElementById('independentChatModal');
    if (modal) modal.style.display = 'none';
}

// 显示角标并闪烁
function showIndependentChatBadge(count) {
    const badge = document.getElementById('chatBadge');
    if (badge) {
        badge.textContent = count;
        badge.style.display = 'inline-block';
        badge.classList.add('blink');
    }
}

// 隐藏角标
function hideIndependentChatBadge() {
    const badge = document.getElementById('chatBadge');
    if (badge) {
        badge.style.display = 'none';
        badge.classList.remove('blink');
    }
}

// 初始化角标
document.addEventListener('DOMContentLoaded', () => {
    showIndependentChatBadge(999); // 初始化显示 999
});