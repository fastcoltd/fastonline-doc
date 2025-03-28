const paymentMethods = [
    { name: 'Digital', feeType: 'fixed', fee: 2, minAmount: 10 },
    { name: 'PayPal', feeType: 'percent', fee: 0.029, minAmount: 20 },
    { name: 'Alipay', feeType: 'fixed', fee: 1.5, minAmount: 15 },
    { name: 'Stripe', feeType: 'percent', fee: 0.025, minAmount: 25 }
];
let memberMenuConfig = [
    { text: "店铺管理", style: `color:var(--natural-green)`, icon: "fas fa-store", show: () => userHasStore(), memberSidebar: false, storeSidebar: true, href: "/site/store/overview.html", sub: [
            { text: "店铺中心", icon: "fas fa-tachometer-alt", href: "/site/store/overview.html" },
            { text: "店铺订单", icon: "fas fa-box-open", href: "/site/store/order-list.html" },
            { text: "库存管理", icon: "fas fa-warehouse", href: "/site/store/stock-manage.html" },
            { text: "商品管理", icon: "fas fa-shopping-bag", href: "/site/store/item-manage.html" },
            { text: "商品FAQ", icon: "fas fa-question-circle", href: "/site/store/item-faq.html" },
            { text: "提现管理", icon: "fas fa-money-check-alt", href: "/site/#", onclick: "showModal('topup-modal', generateTopUpModal(), { className: 'topup-modal', style: signInRegisterStyle })" },
            { text: "博客设置", icon: "fas fa-blog", href: "/site/store/blog.html" },
            { text: "文章管理", icon: "fas fa-newspaper", href: "/site/store/posts-manage.html" },
            { text: "店铺员工", icon: "fas fa-users", href: "/site/store/staff.html" },
            { text: "店铺KYC", icon: "fas fa-id-card", href: "/site/store/kyc.html" },
            { text: "店铺消息", icon: "fas fa-envelope", href: "/site/store/message.html" },
            { text: "店铺设置", icon: "fas fa-cogs", href: "/site/store/setting.html" },
            { text: "店铺日志", icon: "fas fa-list-alt", href: "/site/store/logs.html" },
        ]},
    { text: "我的订单", icon: "fas fa-shopping-cart", show: true, memberSidebar: true, store: false, href: "/site/member/orders.html" },
    { text: "我的需求", icon: "fas fa-clipboard-list", show: true, memberSidebar: true, store: false, href: "/site/member/demands.html" },
    { text: "Top-Up", icon: "fas fa-wallet", show: true, memberSidebar: false, store: false, href: "/site/#", onclick: "showModal('topup-modal', generateTopUpModal(), { className: 'topup-modal', style: signInRegisterStyle })" },
    { text: "资金记录", icon: "fas fa-money-check-alt", show: false, memberSidebar: true, store: false, href: "/site/member/transactions.html" },
    { text: "我的消息", icon: "fas fa-envelope", show: false, memberSidebar: true, store: false, href: "/site/member/message.html" },
    { text: "我的收藏", icon: "fas fa-heart", show: false, memberSidebar: true, store: false, href: "/site/member/save-list.html" },
    { text: "我的订阅", icon: "fas fa-bell", show: false, memberSidebar: true, store: false, href: "/site/member/subscribe-list.html" },
    { text: "我的评论", icon: "fas fa-comment-alt", show: false, memberSidebar: true, store: false, href: "/site/member/reviews.html" },
    { text: "账户日志", icon: "fas fa-list-alt", show: false, memberSidebar: true, store: false, href: "/site/member/logs.html" },
    { text: "个人资料", icon: "fas fa-user-circle", show: false, memberSidebar: true, store: false, href: "/site/member/profile.html" },
    { text: "账户设置", icon: "fas fa-cog", show: true, memberSidebar: true, store: false, href: "/site/member/setting.html" },
    { text: "Logout", icon: "fas fa-sign-out-alt", show: true, memberSidebar: false, store: false, href: "/site/#", onclick: "logout()" }
];

// _member.js
let signInRegisterStyle = { width: '35em' };

// 本地存储用户登录信息
function saveUserLoginInfo(username) {
    let store = generateData(storeFieldConfig, 1)[0];
    const userData = {
        username: username,
        balance: faker.commerce.price(100, 1000, 2),
        messages: { chat: randomInt(0, 50), tickets: randomInt(20, 50), system: randomInt(0, 10) },
        storeMessages: { newOrders: randomInt(0, 10), newTickets: randomInt(0, 5), inquiries: randomInt(0, 20), stockAlerts: randomInt(0, 3), system: randomInt(0, 5) },
        store: randomInt(0, 1) > 0 ? store : null
    };
    localStorage.setItem('userData', JSON.stringify(userData));
    updateHeaderUI();
}

// 从本地存储获取用户信息
function getUserLoginInfo() {
    return JSON.parse(localStorage.getItem('userData')) || null;
}

function userHasStore(){
    return getUserLoginInfo()?.store;
}

// 生成用户菜单
function generateUserMenu() {
    let menuHtml = '';
    memberMenuConfig.forEach(item => {
        let show = typeof item.show === 'function' ? item.show() : item.show;
        if (show) {
            const style = item.style ? ` style="${item.style}"` : '';
            const onclickAttr = item.onclick ? ` onclick="${item.onclick}"` : '';
            menuHtml += `
                <a href="${item.href}"${style}${onclickAttr}>
                    <i class="${item.icon}"></i> ${item.text}
                </a>
            `;
            if (item.sub && item.sub.length > 0) {
                menuHtml += '<div class="user-sub-menu">';
                item.sub.forEach(subItem => {
                    const subOnclickAttr = subItem.onclick ? ` onclick="${subItem.onclick}"` : '';
                    menuHtml += `
                        <a href="${subItem.href}"${subOnclickAttr}>
                            <i class="${subItem.icon}"></i> ${subItem.text}
                        </a>
                    `;
                });
                menuHtml += '</div>';
            }
        }
    });
    return menuHtml;
}

function updateHeaderUI() {
    const userData = getUserLoginInfo();
    const headerActions = document.getElementById('header-actions');
    if (!headerActions) return;

    if (!window.originalHeaderContent) {
        window.originalHeaderContent = headerActions.innerHTML;
    }

    let haveStore = userHasStore();
    if (userData) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(window.originalHeaderContent, 'text/html');
        const items = doc.querySelector('a[href="#"]:not(.become-seller):not([onclick])');
        const demands = doc.querySelector('a[href="demand-list.html"]');
        const resources = doc.querySelector('.dropdown:nth-child(3)');
        const posts = doc.querySelector('.dropdown:nth-child(4)');
        const becomeSeller = doc.querySelector('.become-seller');

        headerActions.innerHTML = '';
        if (items) headerActions.appendChild(items.cloneNode(true));
        if (demands) headerActions.appendChild(demands.cloneNode(true));
        if (resources) headerActions.appendChild(resources.cloneNode(true));
        if (posts) headerActions.appendChild(posts.cloneNode(true));
        if (becomeSeller) {
            if (haveStore) {
                let storeMenu = document.createElement("a");
                storeMenu.href = `/site/store.html?name=${userData.store.name}`;
                storeMenu.innerHTML = `<i class="fas fa-store"></i> ${userData.store.name}`;
                storeMenu.className = 'userStore';
                headerActions.appendChild(storeMenu);
            } else {
                let becomeSellerLink = becomeSeller.cloneNode(true);
                becomeSellerLink.title = "创建店铺（需完成KYC）";
                becomeSellerLink.style.color = "var(--vibrant-orange)";
                headerActions.appendChild(becomeSellerLink);
            }
        }

        const totalMessages = haveStore
            ? (userData.storeMessages.newOrders + userData.storeMessages.newTickets + userData.storeMessages.inquiries + userData.storeMessages.stockAlerts + userData.storeMessages.system)
            : (userData.messages.chat + userData.messages.tickets + userData.messages.system);
        const messageClass = totalMessages > 0 ? 'messages has-messages' : 'messages';

        headerActions.innerHTML += `
            <div class="user-actions">
                <a href="#" class="balance" onclick="showModal('topup-modal', generateTopUpModal(), { className: 'topup-modal', style: signInRegisterStyle })">$${userData.balance}</a>
                <div class="messages-wrapper">
                    <a href="#" class="${messageClass}"><i class="fas fa-envelope"></i><span class="message-count">${totalMessages}</span></a>
                    <div class="messages-tooltip">
                        ${generateMessagesTooltip(userData, haveStore)}
                    </div>
                </div>
                <div class="user-avatar-wrapper${haveStore ? ' has-store' : ''}">
                    <a href="/member/index.html" class="user-avatar"><img src="${getPicsumImage(40, 40, userData.username)}" alt="${userData.username}"></a>
                    <div class="user-menu">
                        ${generateUserMenu()}
                    </div>
                </div>
            </div>
        `;
    } else {
        headerActions.innerHTML = window.originalHeaderContent;
    }
}

// 新增函数：生成消息弹窗内容
function generateMessagesTooltip(userData, haveStore) {
    let tooltipHtml = '';
    if (haveStore) {
        tooltipHtml += `
            <a href="#" class="message-item" onclick="seeMessage(this)">新订单: ${userData.storeMessages.newOrders > 0 ? `<b style="color: red;">${userData.storeMessages.newOrders}</b>` : 0}</a>
            <a href="#" class="message-item" onclick="seeMessage(this)">新工单: ${userData.storeMessages.newTickets > 0 ? `<b style="color: red;">${userData.storeMessages.newTickets}</b>` : 0}</a>
            <a href="#" class="message-item" onclick="seeMessage(this)">新咨询: ${userData.storeMessages.inquiries > 0 ? `<b style="color: red;">${userData.storeMessages.inquiries}</b>` : 0}</a>
            <a href="#" class="message-item" onclick="seeMessage(this)">库存告警: ${userData.storeMessages.stockAlerts > 0 ? `<b style="color: red;">${userData.storeMessages.stockAlerts}</b>` : 0}</a>
            <a href="#" class="message-item" onclick="seeMessage(this)">系统通知: ${userData.storeMessages.system > 0 ? `<b style="color: red;">${userData.storeMessages.system}</b>` : 0}</a>
        `;
    } else {
        tooltipHtml += `
            <a href="#" class="message-item" onclick="seeMessage(this)">聊天: ${userData.messages.chat > 0 ? `<b style="color: red;">${userData.messages.chat}</b>` : 0}</a>
            <a href="#" class="message-item" onclick="seeMessage(this)">工单: ${userData.messages.tickets > 0 ? `<b style="color: red;">${userData.messages.tickets}</b>` : 0}</a>
            <a href="#" class="message-item" onclick="seeMessage(this)">系统: ${userData.messages.system > 0 ? `<b style="color: red;">${userData.messages.system}</b>` : 0}</a>
        `;
    }
    return tooltipHtml;
}

function seeMessage(o){
    let message = o.innerText
    let count = message.trim().split(":")[1]
    o.innerHTML = message.replaceAll(count, " 0")

    // alert(`see ${message}`)

    let total = document.querySelector('.message-count').innerText;
    let rest = total - count;
    if (rest <= 0){
        document.querySelector('.messages').classList.remove('has-messages');
    }else{
        document.querySelector('.message-count').innerText = rest
    }
}

// 退出登录
function logout() {
    localStorage.removeItem('userData');
    updateHeaderUI();
}

// 登录弹窗
function generateLoginModal() {
    return `
        <span class="modal-close" onclick="hideModal('login-modal')">×</span>
        <h3 style="font-size: var(--font-xlarge); color: var(--text-primary); margin-bottom: 1.5em; text-align: center;">Sign In to FASTRESP</h3>
        <input type="text" id="login-username" placeholder="Username" value="fastresp" class="ant-input" style="margin-bottom: 1.25em; padding: 0.75em; color: var(--text-primary);">
        <input type="password" id="login-password" placeholder="Password" value="fasstresp" class="ant-input" style="margin-bottom: 1.25em; padding: 0.75em; color: var(--text-primary);">
        <div style="display: flex; justify-content: space-between; margin-bottom: 1.5em; font-size: var(--font-medium); color: var(--text-primary);">
            <label><input type="checkbox" style="margin-right: 0.5em;"> Remember me</label>
            <a href="#" class="see-all">Reset Password</a>
        </div>
        <button class="btn-orange-solid-large" style="width: 100%; margin-bottom: 1em;" onclick="handleSignIn()">Sign In</button>
        <div style="margin-bottom: 1em; display: flex; flex-direction: column; justify-content: flex-end; height: 28em;">
            <div style="display: flex; align-items: center; margin: 1.5em 0; text-align: center;">
                <div style="flex-grow: 1; height: 1px; background-color: var(--border-color);"></div>
                <span style="padding: 0 10px; color: var(--text-secondary); font-size: var(--font-medium);">or</span>
                <div style="flex-grow: 1; height: 1px; background-color: var(--border-color);"></div>
            </div>
            <button class="btn-large" style="width: 100%; background: #4285f4; color: white; margin-bottom: 2em;">
                <i class="fab fa-google" style="margin-right: 0.5em;"></i> Sign in with Google
            </button>
            <button class="btn-large" style="width: 100%; background: #000; color: white; margin-bottom: 2em;">
                <i class="fab fa-apple" style="margin-right: 0.5em;"></i> Sign in with Apple
            </button>
            <p style="text-align: center; font-size: var(--font-small); color: var(--text-primary); margin: 0;">
                Not a member yet? <a href="#" onclick="showModal('register-modal', generateRegisterModal(), { className: 'register-modal', style: signInRegisterStyle }); hideModal('login-modal');" class="see-all">Join now</a>
            </p>
        </div>
    `;
}

// 处理登录
function handleSignIn() {
    const usernameInput = document.getElementById('login-username');
    if (usernameInput) {
        const username = usernameInput.value;
        if (username) {
            saveUserLoginInfo(username);
            hideModal('login-modal');
        } else {
            alert('请输入用户名');
        }
    } else {
        console.error('未找到 login-username 元素');
    }
}

// 注册弹窗
function generateRegisterModal() {
    return `
        <span class="modal-close" onclick="hideModal('register-modal')">×</span>
        <h3 style="font-size: var(--font-xlarge); color: var(--text-primary); margin-bottom: 1.5em; text-align: center;">Join FASTRESP</h3>
        <button class="btn-large" style="width: 100%; background: #4285f4; color: white; margin-bottom: 1em;">
            <i class="fab fa-google" style="margin-right: 0.5em;"></i> Sign up with Google
        </button>
        <button class="btn-large" style="width: 100%; background: #000; color: white; margin-bottom: 1em;">
            <i class="fab fa-apple" style="margin-right: 0.5em;"></i> Sign up with Apple
        </button>
        <div style="display: flex; align-items: center; margin: 1.5em 0; text-align: center;">
            <div style="flex-grow: 1; height: 1px; background-color: var(--border-color);"></div>
            <span style="padding: 0 10px; color: var(--text-secondary); font-size: var(--font-medium);">or</span>
            <div style="flex-grow: 1; height: 1px; background-color: var(--border-color);"></div>
        </div>
        <div style="display: flex; gap: 1em; margin-bottom: 1.25em;">
            <input type="text" placeholder="First Name" class="ant-input" style="width: 50%; padding: 0.75em; color: var(--text-primary);">
            <input type="text" placeholder="Last Name" class="ant-input" style="width: 50%; padding: 0.75em; color: var(--text-primary);">
        </div>
        <input type="email" placeholder="Email Address" class="ant-input" style="margin-bottom: 1.25em; padding: 0.75em; color: var(--text-primary);">
        <div style="position: relative; margin-bottom: 1.25em;">
            <input type="password" id="reg-password" placeholder="Password" class="ant-input" style="padding: 0.75em; color: var(--text-primary);">
            <i id="toggle-password" class="fas fa-eye" style="position: absolute; right: 1em; top: 50%; transform: translateY(-50%); cursor: pointer; color: var(--text-secondary);"></i>
        </div>
        <select class="ant-input" style="margin-bottom: 1.25em; padding: 0.75em; color: var(--text-primary);">
            <option value="">Select Country</option>
            ${generateCountryOptions()}
        </select>
        <div style="margin-bottom: 1.5em; font-size: var(--font-medium); color: var(--text-primary);">
            <label style="display: flex; align-items: center; margin-bottom: 0.75em;">
                <input type="checkbox" checked style="margin-right: 0.5em;">
                Send me emails with tips on how to find talent that fits my needs.
            </label>
            <label style="display: flex; align-items: flex-start; white-space: normal;">
                <input type="checkbox" style="margin-right: 0.5em; margin-top: 0.25em;">
                <span style="flex: 1;">Yes, I understand and agree to the <a href="#" class="see-all" style="white-space: nowrap;">Fastresp Terms of Service</a>, including the <a href="#" class="see-all" style="white-space: nowrap;">User Agreement</a> and <a href="#" class="see-all" style="white-space: nowrap;">Privacy Policy</a>.</span>
            </label>
        </div>
        <button class="btn-orange-solid-large" style="width: 100%; margin-bottom: 1em;">Create my account</button>
        <p style="text-align: center; font-size: var(--font-small); color: var(--text-primary); margin-top: 1.5em;">
            Already registered to Fastresp? <a href="#" onclick="showModal('login-modal', generateLoginModal(), { className: 'login-modal', style: signInRegisterStyle }); hideModal('register-modal');" class="see-all">Sign in</a>
        </p>
    `;
}

function generateTopUpModal() {
    return `
        <span class="modal-close" onclick="hideModal('topup-modal')">×</span>
        <h3 style="font-size: var(--font-xlarge); color: var(--text-primary); margin-bottom: 1.5em; text-align: center;">Top Up Your Balance</h3>
        <div class="topup-content" style="display: flex; gap: 1em;">
            <div class="payment-methods" style="flex: 1;">
                ${paymentMethods.map((method, index) => `
                    <button class="btn-large payment-option" style="width: 100%; margin-bottom: 0.5em; text-align: left; padding: 0.75em;" onclick="showPaymentDetails(${index})">
                        ${method.name}
                    </button>
                `).join('')}
            </div>
            <div class="payment-details" id="payment-details" style="flex: 2; padding: 1em; border-left: 0.0625em solid var(--border-color);">
                <p style="color: var(--text-secondary); font-size: var(--font-medium);">请选择支付方式</p>
            </div>
        </div>
    `;
}

function showPaymentDetails(index) {
    const method = paymentMethods[index];
    const usdRate = 1;
    document.getElementById('payment-details').innerHTML = `
        <h4 style="font-size: var(--font-large); color: var(--text-primary); margin-bottom: 0.5em;">${method.name}</h4>
        <p style="font-size: var(--font-medium); color: var(--text-secondary);">
            手续费: ${method.feeType === 'fixed' ? '$${method.fee}' : (method.fee * 100) + '%'}<br>
            最低充值金额: $${method.minAmount}<br>
            汇率: 1 ${method.name === 'Alipay' ? 'CNY' : 'USD'} = $${usdRate} USD
        </p>
        <input type="number" id="topup-amount" placeholder="输入金额 (USD)" class="ant-input" style="margin-top: 1em; padding: 0.75em; width: 100%;">
        <button class="btn-orange-solid-large" style="width: 100%; margin-top: 1em;" onclick="alert('充值成功: $' + document.getElementById('topup-amount').value)">Top Up</button>
    `;
}

// 生成国家选项
function generateCountryOptions() {
    if (typeof languages === 'undefined') {
        console.error('languages 未定义');
        return '';
    }
    return languages.map(lang => `<option value="${lang.country}">${lang.country}</option>`).join('');
}

// 密码切换显示
document.addEventListener('click', function(e) {
    if (e.target.id === 'toggle-password') {
        const passwordInput = document.getElementById('reg-password');
        const icon = e.target;
        if (passwordInput && icon) {
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                passwordInput.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        }
    }
});

function generateDropdownMenus() {
    const resourcesMenu = document.getElementById('resources-menu');
    const postsMenu = document.getElementById('posts-menu');

    // 生成 Resources 下拉菜单
    dropdownMenus.Resources.forEach(item => {
        const link = document.createElement('a');
        link.href = item.href;
        link.textContent = item.text;
        resourcesMenu.appendChild(link);
    });

    // 生成 Posts 下拉菜单（包含描述）
    dropdownMenus.Posts.forEach(item => {
        const link = document.createElement('a');
        link.href = item.href;
        link.innerHTML = `${item.text}<span class="dropdown-desc">${item.desc}</span>`;
        postsMenu.appendChild(link);
    });
}

// 初始化
window.addEventListener("load", function() {
    w3.includeHTML(() => {
        generateDropdownMenus();
    })

    setTimeout(() => {
        const footerLinks = document.querySelectorAll('.footer-right a:not([target])');
        if (footerLinks) {
            footerLinks.forEach(item => {
                item.onclick = function () {
                    showModal(`${this.id}-modal`, generateSelectorModal(this.id));
                };
            });
        }
        if (getUserLoginInfo()) {
            updateHeaderUI();
        }
    }, 100);
});
