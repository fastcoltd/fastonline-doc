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
        const demands = doc.querySelector('a[href="/site/demand-list.html"]');
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

        const messageUrl = haveStore ? '/site/member/message.html' : `/site/member/message.html`
        headerActions.innerHTML += `
            <div class="user-actions">
                <a href="#" class="balance" onclick="showModal('topup-modal', generateTopUpModal(), { className: 'topup-modal', style: signInRegisterStyle })">$${userData.balance}</a>
                <div class="messages-wrapper">
                    <a href="${messageUrl}" class="${messageClass}"><i class="fas fa-envelope"></i><span class="message-count">${totalMessages}</span></a>
                    <div class="messages-tooltip">
                        ${generateMessagesTooltip(userData, haveStore)}
                    </div>
                </div>
                <div class="user-avatar-wrapper${haveStore ? ' has-store' : ''}">
                    <a href="/site/member/profile.html" class="user-avatar"><img src="${getPicsumImage(40, 40, userData.username)}" alt="${userData.username}"></a>
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

function generateRandomEmail() {
    const domains = ['gmail.com', 'yahoo.com', 'hotmail.com'];
    const name = faker.internet.userName().toLowerCase();
    const domain = domains[randomInt(0, domains.length - 1)];
    return `${name}@${domain}`;
}

function obfuscateEmail(email) {
    const [name, domain] = email.split('@');
    return `${name.slice(0, 4)}${'*'.repeat(Math.max(name.length - 4, 0))}@${domain}`;
}

function startCountdown(elementId, duration, callback) {
    let timeLeft = duration;
    const element = document.getElementById(elementId);
    if (!element) return;
    element.textContent = `${timeLeft}s`;
    element.disabled = true;
    const interval = setInterval(() => {
        timeLeft--;
        element.textContent = `${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(interval);
            element.textContent = 'Resend';
            element.disabled = false;
            if (callback) callback();
        }
    }, 1000);
    return interval;
}

function start2FACountdown() {
    const initialTime = 30; // 30s cycle
    const countdownElement = document.getElementById('2fa-countdown');
    if (!countdownElement) return;
    let timeLeft = randomInt(5, initialTime); // Random initial time between 5s and 30s
    countdownElement.textContent = `${timeLeft}s`;
    const interval = setInterval(() => {
        timeLeft--;
        countdownElement.textContent = `${timeLeft}s`;
        if (timeLeft <= 0) {
            timeLeft = initialTime; // Reset to 30s
        }
    }, 1000);
    return interval;
}

// Local Storage for User Data
function saveUserLoginInfo(username) {
    let requires2FA = Math.random() < 0.8
    let store = generateData(storeFieldConfig, 1)[0];
    const userData = {
        username: username,
        email: generateRandomEmail(),
        balance: faker.commerce.price(100, 1000, 2),
        messages: { chat: randomInt(0, 50), tickets: randomInt(20, 50), system: randomInt(0, 10) },
        storeMessages: { newOrders: randomInt(0, 10), newTickets: randomInt(0, 5), inquiries: randomInt(0, 20), stockAlerts: randomInt(0, 3), system: randomInt(0, 5) },
        store: Math.random() < 0.5 ? store : null,
        requires2FA: requires2FA // 50% chance to require 2FA
    };
    localStorage.setItem('userData', JSON.stringify(userData));
    if (!requires2FA){
        updateHeaderUI();
    }
}

function getUserLoginInfo() {
    return JSON.parse(localStorage.getItem('userData')) || null;
}

function userHasStore() {
    return getUserLoginInfo()?.store;
}

// Login Modal
function generateLoginModal() {
    return `
        <span class="modal-close" onclick="hideModal('login-modal')">×</span>
        <h3 style="font-size: var(--font-xlarge); color: var(--text-primary); margin-bottom: 1.5em; text-align: center;">Sign In to FASTRESP</h3>
        <input type="text" id="login-username" placeholder="Username" value="fastresp" class="ant-input" style="margin-bottom: 1.25em; padding: 0.75em; color: var(--text-primary);">
        <input type="password" id="login-password" placeholder="Password" value="fastresp" class="ant-input" style="margin-bottom: 1.25em; padding: 0.75em; color: var(--text-primary);">
        <div style="display: flex; justify-content: space-between; margin-bottom: 1.5em; font-size: var(--font-medium); color: var(--text-primary);">
            <label><input type="checkbox" style="margin-right: 0.5em;"> Remember me</label>
            <a href="#" class="see-all" onclick="showModal('reset-password-verify-modal', generateResetPasswordVerifyModal(), { className: 'reset-password-verify-modal', style: signInRegisterStyle }); hideModal('login-modal');">Reset Password</a>
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

function handleSignIn() {
    const usernameInput = document.getElementById('login-username');
    if (usernameInput) {
        const username = usernameInput.value;
        if (username) {
            saveUserLoginInfo(username);
            const userData = getUserLoginInfo();
            if (userData.requires2FA) {
                showModal('2fa-modal', generate2FAModal(), { className: '2fa-modal', style: signInRegisterStyle });
                hideModal('login-modal');
                start2FACountdown();
            } else {
                hideModal('login-modal');
            }
        } else {
            alert('Please enter a username');
        }
    } else {
        console.error('Element login-username not found');
    }
}

// 2FA Modal
function generate2FAModal() {
    return `
        <i class="fas fa-arrow-left" style="position: absolute; top: 1em; left: 1em; font-size: 1.25em; cursor: pointer; color: var(--text-secondary);" onclick="showModal('login-modal', generateLoginModal(), { className: 'login-modal', style: signInRegisterStyle }); hideModal('2fa-modal');"></i>
        <span class="modal-close" onclick="hideModal('2fa-modal')">×</span>
        <h3 style="font-size: var(--font-xlarge); color: var(--text-primary); margin-bottom: 1.5em; text-align: center;">Two-Step Verification</h3>
        <div style="display: flex; align-items: center; margin-bottom: 1.25em; background: var(--bg-white); border: 0.0625em solid var(--border-color); border-radius: 0.375em; overflow: hidden;">
            <input type="text" id="2fa-code" placeholder="Enter 2FA Code" class="ant-input" style="flex: 1; padding: 0.75em; color: var(--text-primary); border: none;">
            <span id="2fa-countdown" style="padding: 0.75em; border-left: 0.0625em solid var(--border-color); background: var(--bg-white); font-size: var(--font-medium); color: var(--text-secondary); min-width: 3em; text-align: center;"></span>
        </div>
        <div style="text-align: right; margin-bottom: 1.5em;">
            <a href="#" class="see-all" onclick="showModal('reset-2fa-modal', generateReset2FAModal(), { className: 'reset-2fa-modal', style: signInRegisterStyle }); hideModal('2fa-modal');">Reset 2FA Code</a>
        </div>
        <button class="btn-orange-solid-large" style="width: 100%; margin-bottom: 1em;" onclick="verify2FA()">Verify & Login</button>
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
        </div>
    `;
}

function verify2FA() {
    const codeInput = document.getElementById('2fa-code');
    if (codeInput && codeInput.value) {
        // alert('Login successful!');
        hideModal('2fa-modal');
        updateHeaderUI()
    } else {
        alert('Please enter a valid 2FA code');
    }
}

// Reset 2FA Modal (Step 1)
function generateReset2FAModal() {
    const userData = getUserLoginInfo();
    const email = obfuscateEmail(userData.email);
    return `
        <i class="fas fa-arrow-left" style="position: absolute; top: 1em; left: 1em; font-size: 1.25em; cursor: pointer; color: var(--text-secondary);" onclick="showModal('2fa-modal', generate2FAModal(), { className: '2fa-modal', style: signInRegisterStyle }); hideModal('reset-2fa-modal');"></i>
        <span class="modal-close" onclick="hideModal('reset-2fa-modal')">×</span>
        <h3 style="font-size: var(--font-xlarge); color: var(--text-primary); margin-bottom: 1.5em; text-align: center;">Reset 2FA Code</h3>
        <p style="font-size: var(--font-medium); color: var(--text-primary); margin-bottom: 1.25em;">We have sent a 2FA reset email to ${email}</p>
        <div style="display: flex; align-items: center; margin-bottom: 1.25em; background: var(--bg-white); border: 0.0625em solid var(--border-color); border-radius: 0.375em; overflow: hidden;">
            <input type="text" id="reset-2fa-code" placeholder="Enter Verification Code" class="ant-input" style="flex: 1; padding: 0.75em; color: var(--text-primary); border: none;">
            <button id="resend-2fa" style="padding: 0.75em; border: none; border-left: 0.0625em solid var(--border-color); background: var(--bg-white); cursor: pointer; font-size: var(--font-medium); color: var(--text-secondary);">Send 30s</button>
        </div>
        <button class="btn-orange-solid-large" style="width: 100%; margin-bottom: 1em;" onclick="verifyReset2FA()">Verify</button>
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
        </div>
    `;
}

function verifyReset2FA() {
    const codeInput = document.getElementById('reset-2fa-code');
    if (codeInput && codeInput.value) {
        showModal('reset-2fa-code-modal', generateReset2FACodeModal(), { className: 'reset-2fa-code-modal', style: signInRegisterStyle });
        hideModal('reset-2fa-modal');
        start2FACodeCountdown();
    } else {
        alert('Please enter a valid verification code');
    }
}

window.addEventListener('load', () => {
    setTimeout(() => {
        const reset2FAModal = document.getElementById('reset-2fa-modal');
        if (reset2FAModal) {
            startCountdown('resend-2fa', 30);
        }
        const resetPasswordVerifyModal = document.getElementById('reset-password-verify-modal');
        if (resetPasswordVerifyModal) {
            startCountdown('resend-password', 60);
        }
    }, 100);
});

// Reset 2FA Code Modal (Step 2)
function generateReset2FACodeModal() {
    const new2FACode = faker.random.alphaNumeric(16, { casing: 'upper' }).match(/.{1,4}/g).join(' ').toUpperCase(); // Uppercase 2FA code
    return `
        <i class="fas fa-arrow-left" style="position: absolute; top: 1em; left: 1em; font-size: 1.25em; cursor: pointer; color: var(--text-secondary);" onclick="showModal('reset-2fa-modal', generateReset2FAModal(), { className: 'reset-2fa-modal', style: signInRegisterStyle }); hideModal('reset-2fa-code-modal');"></i>
        <span class="modal-close" onclick="hideModal('reset-2fa-code-modal')">×</span>
        <h3 style="font-size: var(--font-xlarge); color: var(--text-primary); margin-bottom: 1.5em; text-align: center;">Reset 2FA Code</h3>
        <div style="margin-bottom: 1.25em; text-align: center;">
            <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=otpauth://totp/FASTRESP:${getUserLoginInfo().username}?secret=${new2FACode.replace(/\s/g, '')}&issuer=FASTRESP" alt="QR Code" style="display: block; margin: 0 auto 0.5em; width: 150px; height: 150px;">
            <p style="font-size: var(--font-small); color: var(--text-secondary); margin-bottom: 0.5em;">May use Google Authentication app scan it</p>
            <div style="display: flex; justify-content: center; align-items: center;">
                <p style="font-size: var(--font-large); color: var(--text-primary); font-weight: bold; background: var(--bg-light); padding: 0.25em 0.5em; border-radius: 0.25em; margin: 0 0.25em 0 0;">${new2FACode}</p>
                <button style="padding: 0.375em 0.75em; background: var(--natural-green); border: 0.0625em solid var(--natural-green); border-radius: 0.375em; color: var(--font-white); font-size: var(--font-small); cursor: pointer;" onclick="navigator.clipboard.writeText('${new2FACode.replace(/\s/g, '')}'); alert('Copied to clipboard!');">Copy</button>
            </div>
        </div>
        <div style="display: flex; align-items: center; margin-bottom: 1.25em; background: var(--bg-white); border: 0.0625em solid var(--border-color); border-radius: 0.375em; overflow: hidden;">
            <input type="text" id="new-2fa-code" placeholder="Enter 2FA Code" class="ant-input" style="flex: 1; padding: 0.75em; color: var(--text-primary); border: none;">
            <span id="new-2fa-countdown" style="padding: 0.75em; border-left: 0.0625em solid var(--border-color); background: var(--bg-white); font-size: var(--font-medium); color: var(--text-secondary); min-width: 3em; text-align: center;"></span>
        </div>
        <button class="btn-orange-solid-large" style="width: 100%; margin-bottom: 1em;" onclick="verifyAndReset2FA()">Verify & Reset</button>
        <div style="display: flex; align-items: center; margin: 1em 0; text-align: center;">
            <div style="flex-grow: 1; height: 1px; background-color: var(--border-color);"></div>
            <span style="padding: 0 10px; color: var(--text-secondary); font-size: var(--font-medium);">usage</span>
            <div style="flex-grow: 1; height: 1px; background-color: var(--border-color);"></div>
        </div>
        <ol style="margin: 0 0 1em 2em; padding-left: 1.5em; font-size: var(--font-small); color: var(--text-primary); text-align: left;">
            <li>Download Google Authenticator</li>
            <li>Copy the 2FA Code above</li>
            <li>Enter it to get a temporary code</li>
        </ol>
        <div style="height: 10em;"></div>
    `;
}

function start2FACodeCountdown() {
    const initialTime = 30;
    const countdownElement = document.getElementById('new-2fa-countdown');
    if (!countdownElement) return;
    let timeLeft = randomInt(5, initialTime);
    countdownElement.textContent = `${timeLeft}s`;
    const interval = setInterval(() => {
        timeLeft--;
        countdownElement.textContent = `${timeLeft}s`;
        if (timeLeft <= 0) {
            timeLeft = initialTime;
        }
    }, 1000);
    return interval;
}

function verifyAndReset2FA() {
    const codeInput = document.getElementById('new-2fa-code');
    if (codeInput && codeInput.value) {
        alert('2FA reset successful!');
        showModal('login-modal', generateLoginModal(), { className: 'login-modal', style: signInRegisterStyle });
        hideModal('reset-2fa-code-modal');
    } else {
        alert('Please enter a valid 2FA code');
    }
}

// Reset Password Verify Modal
function generateResetPasswordVerifyModal() {
    return `
        <i class="fas fa-arrow-left" style="position: absolute; top: 1em; left: 1em; font-size: 1.25em; cursor: pointer; color: var(--text-secondary);" onclick="showModal('login-modal', generateLoginModal(), { className: 'login-modal', style: signInRegisterStyle }); hideModal('reset-password-verify-modal');"></i>
        <span class="modal-close" onclick="hideModal('reset-password-verify-modal')">×</span>
        <h3 style="font-size: var(--font-xlarge); color: var(--text-primary); margin-bottom: 1.5em; text-align: center;">Reset Password</h3>
        <input type="email" id="reset-password-email" placeholder="Enter Email" class="ant-input" style="margin-bottom: 1.25em; padding: 0.75em; color: var(--text-primary);">
        <div style="display: flex; align-items: center; margin-bottom: 1.25em; background: var(--bg-white); border: 0.0625em solid var(--border-color); border-radius: 0.375em; overflow: hidden;">
            <input type="text" id="reset-password-code" placeholder="Enter Verification Code" class="ant-input" style="flex: 1; padding: 0.75em; color: var(--text-primary); border: none;">
            <button id="resend-password" style="padding: 0.75em; border: none; border-left: 0.0625em solid var(--border-color); background: var(--bg-white); cursor: pointer; font-size: var(--font-medium); color: var(--text-secondary);" onclick="startCountdown('resend-password', 60)">Send</button>
        </div>
        <button class="btn-orange-solid-large" style="width: 100%; margin-bottom: 1em;" onclick="verifyResetPassword()">Verify</button>
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
        </div>
    `;
}

function verifyResetPassword() {
    const emailInput = document.getElementById('reset-password-email');
    const codeInput = document.getElementById('reset-password-code');
    if (!emailInput.value) {
        alert('Please enter an email address');
    } else if (!codeInput.value) {
        alert('Please enter a valid verification code');
    } else {
        showModal('reset-password-modal', generateResetPasswordModal(), { className: 'reset-password-modal', style: signInRegisterStyle });
        hideModal('reset-password-verify-modal');
    }
}

// Reset Password Modal
function generateResetPasswordModal() {
    return `
        <i class="fas fa-arrow-left" style="position: absolute; top: 1em; left: 1em; font-size: 1.25em; cursor: pointer; color: var(--text-secondary);" onclick="showModal('reset-password-verify-modal', generateResetPasswordVerifyModal(), { className: 'reset-password-verify-modal', style: signInRegisterStyle }); hideModal('reset-password-modal');"></i>
        <span class="modal-close" onclick="hideModal('reset-password-modal')">×</span>
        <h3 style="font-size: var(--font-xlarge); color: var(--text-primary); margin-bottom: 1.5em; text-align: center;">Reset Password</h3>
        <input type="password" id="new-password" placeholder="New Password" class="ant-input" style="margin-bottom: 1.25em; padding: 0.75em; color: var(--text-primary);">
        <input type="password" id="confirm-password" placeholder="Confirm New Password" class="ant-input" style="margin-bottom: 1.25em; padding: 0.75em; color: var(--text-primary);">
        <p style="font-size: var(--font-small); color: var(--text-secondary); margin-bottom: 1.5em;">Password must be at least 8 characters, include a number, and a special character.</p>
        <button class="btn-orange-solid-large" style="width: 100%; margin-bottom: 1em;" onclick="resetPassword()">Reset</button>
        <div style="height: 28em;"></div>
    `;
}

function resetPassword() {
    const newPassword = document.getElementById('new-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
    if (!newPassword || !confirmPassword) {
        alert('Please fill in both password fields');
    } else if (newPassword !== confirmPassword) {
        alert('Passwords do not match');
    } else if (!passwordRegex.test(newPassword)) {
        alert('Password must be at least 8 characters, include a number, and a special character');
    } else {
        alert('Password reset successful!');
        showModal('login-modal', generateLoginModal(), { className: 'login-modal', style: signInRegisterStyle });
        hideModal('reset-password-modal');
    }
}

// Generate random order fields for the form
function generateOrderFields() {
    const fieldTypeMap = {
        0: '文本',
        1: '数字',
        2: '日期',
        3: '下拉',
        4: '复选框',
        5: '多行文本',
        6: '单选',
        7: '图片',
        8: '链接'
    };
    const numFields = randomInt(3, 5);
    const selectedTypes = [];
    const fields = [];

    // Ensure unique field types
    while (selectedTypes.length < numFields) {
        const typeIndex = randomInt(0, 8);
        if (!selectedTypes.includes(typeIndex)) {
            selectedTypes.push(typeIndex);
            const fieldName = faker.lorem.word();
            const isRequired = Math.random() < 0.5; // 50% chance to be required
            fields.push({
                name: fieldName,
                type: typeIndex,
                label: `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} (${fieldTypeMap[typeIndex]})`,
                required: isRequired
            });
        }
    }

    return fields;
}

// Generate HTML for order fields form
function generateOrderFieldsForm(fields, itemName, quantity, subtotal, saveAmount, orderId) {
    let formHtml = `
        <h3 class="popup-title">Add Order Requirements for ${itemName}</h3>
        <div class="order-fields-content" style="margin-bottom: 1.5em;">
    `;

    fields.forEach((field, index) => {
        formHtml += `<div class="popup-row" style="margin-bottom: 1em;">`;
        formHtml += `<label class="popup-label">${field.label}${field.required ? '<span style="color: red;"> *</span>' : ''}:</label>`;
        formHtml += `<div class="popup-value">`;

        switch (field.type) {
            case 0: // Text
                formHtml += `<input type="text" id="order-field-${index}" class="ant-input" style="width: 100%; padding: 0.5em;" ${field.required ? 'required' : ''}>`;
                break;
            case 1: // Number
                formHtml += `<input type="number" id="order-field-${index}" class="ant-input" style="width: 100%; padding: 0.5em;" min="0" ${field.required ? 'required' : ''}>`;
                break;
            case 2: // Date
                formHtml += `<input type="date" id="order-field-${index}" class="ant-input" style="width: 100%; padding: 0.5em;" ${field.required ? 'required' : ''}>`;
                break;
            case 3: // Dropdown
                formHtml += `
                    <select id="order-field-${index}" class="ant-input" style="width: 100%; padding: 0.5em;" ${field.required ? 'required' : ''}>
                        <option value="">Select an option</option>
                        ${Array.from({length: 3}, () => `<option value="${faker.lorem.word()}">${faker.lorem.word()}</option>`).join('')}
                    </select>
                `;
                break;
            case 4: // Checkbox
                formHtml += `
                    <label style="display: flex; align-items: center;">
                        <input type="checkbox" id="order-field-${index}" style="margin-right: 0.5em;" ${field.required ? 'required' : ''}>
                        ${faker.lorem.word()}
                    </label>
                `;
                break;
            case 5: // Textarea
                formHtml += `<textarea id="order-field-${index}" class="ant-input" style="width: 100%; padding: 0.5em; min-height: 4em;" ${field.required ? 'required' : ''}></textarea>`;
                break;
            case 6: // Radio
                formHtml += `
                    <div style="display: flex; flex-direction: column; gap: 0.5em;">
                        ${Array.from({length: 3}, () => `
                            <label style="display: flex; align-items: center;">
                                <input type="radio" name="order-field-${index}" value="${faker.lorem.word()}" style="margin-right: 0.5em;" ${field.required ? 'required' : ''}>
                                ${faker.lorem.word()}
                            </label>
                        `).join('')}
                    </div>
                `;
                break;
            case 7: // Image
                formHtml += `<input type="file" id="order-field-${index}" accept="image/*" class="ant-input" style="width: 100%; padding: 0.5em;" ${field.required ? 'required' : ''}>`;
                break;
            case 8: // Link
                formHtml += `<input type="url" id="order-field-${index}" class="ant-input" style="width: 100%; padding: 0.5em;" placeholder="https://" ${field.required ? 'required' : ''}>`;
                break;
        }
        formHtml += `</div></div>`;
    });

    formHtml += `
        </div>
        <button id="submit-order-fields" class="btn-orange-solid-large" style="width: 100%;">Submit Order</button>
    `;

    return { html: formHtml, fields, itemName, quantity, subtotal, saveAmount, orderId };
}

// Generate confirmation popup for order fields
function generateOrderFieldsConfirmation(fields, itemName, quantity, subtotal, saveAmount, orderId) {
    let confirmationHtml = `
        <h3 class="popup-title">Confirm Order Requirements</h3>
        <div class="order-confirmation-content" style="margin-bottom: 1.5em;">
            <p><strong>Product:</strong> ${itemName}</p>
            <p><strong>Quantity:</strong> ${quantity}</p>
            <p><strong>Subtotal:</strong> $${subtotal}</p>
            ${saveAmount !== '0.00' ? `<p><strong>Save:</strong> $${saveAmount}</p>` : ''}
            <h3 style="margin: 1em 0 0.5em;">Order Requirements:</h3>
    `;

    fields.forEach((field, index) => {
        const inputElement = document.getElementById(`order-field-${index}`);
        let value = 'Not provided';

        if (inputElement) {
            if (field.type === 4) { // Checkbox
                value = inputElement.checked ? 'Checked' : 'Unchecked';
            } else if (field.type === 6) { // Radio
                const selectedRadio = document.querySelector(`input[name="order-field-${index}"]:checked`);
                value = selectedRadio ? selectedRadio.value : 'None selected';
            } else if (field.type === 7) { // Image
                value = inputElement.files.length > 0 ? inputElement.files[0].name : 'No file selected';
            } else {
                value = inputElement.value || 'Not provided';
            }
        }

        confirmationHtml += `
            <div class="popup-row" style="margin-bottom: 0.5em;">
                <label class="popup-label">${field.label}${field.required ? '<span style="color: red;"> *</span>' : ''}:</label>
                <span class="popup-value">${value}</span>
            </div>
        `;
    });

    confirmationHtml += `
        </div>
        <div class="order-buttons" style="display: flex; gap: 1em;">
            <button id="confirm-order" class="btn-orange-solid-large" style="flex: 1;">Confirm</button>
            <button id="cancel-order" class="btn-large" style="flex: 1;">Cancel</button>
        </div>
    `;

    return { html: confirmationHtml, fields, itemName, quantity, subtotal, saveAmount, orderId };
}

// Modified generateShoppingPopup function
function generateShoppingPopup(item, cardElement) {
    let userInfo = getUserLoginInfo();
    if (!userInfo) {
        return showMessageToast({
            messageType: 'warning',
            message: 'please login first, after then buy it.',
            timeout: 3000,
            callback: () => {
                showModal('login-modal', generateLoginModal(), { className: 'login-modal', style: signInRegisterStyle })
            }
        });
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
    const afterSalesTime = days > 0 ? `${days}d,${hours}h` : `${afterSalesHours}h`;

    // 批发价数据
    const wholesaleData = generateData(itemWholesaleFieldConfig, randomInt(0, 3));
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
                <label class="popup-label">Price:</label>
                <span class="popup-value popup-price" id="popup-base-price">${priceDisplay}</span>
            </div>
            <div class="popup-row">
                <label class="popup-label">Stock:</label>
                <span class="popup-value" id="popup-stock">${stock}</span>
            </div>
            ${wholesaleData.length <= 0 ? `` : `
                <div class="popup-row">
                    <label class="popup-label">Wholesale Price:</label>
                    <div class="popup-value popup-wholesale">
                        ${wholesaleOptions.map(w => `
                            <span class="wholesale-item">${w.minQty}~${w.minQty + 100}: <b>$${w.unitPrice.toFixed(2)}</b></span>
                        `).join('')}
                    </div>
                </div>
                `}
            <div class="popup-row">
                <label class="popup-label">Amount:</label>
                <div class="popup-value popup-quantity">
                    <div class="quantity-input">
                        <button class="minus" onclick="updateQuantity(-1)"><i class="fas fa-minus"></i></button>
                        <input type="number" id="popup-quantity" value="1" min="1" max="${stock}" oninput="updateSubtotal()" onblur="updateSubtotal()">
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
    showModal('shopping-popup', popupContent, { className: 'shopping-popup', style: { maxWidth: '28em', padding: '1.5em' } });

    // 更新小计和折扣
    window.updateSubtotal = function updateSubtotal() {
        let quantityEle = document.getElementById('popup-quantity');
        let quantity = parseInt(quantityEle.value) || 1;
        if (quantity > quantityEle.getAttribute('max')) {
            quantity = quantityEle.value = quantityEle.getAttribute('max');
        }
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

        if (saveAmount != 0) {
            saveElement.style.display = 'inline';
            saveAmountElement.textContent = Math.abs(saveAmount).toFixed(2);
        } else {
            saveElement.style.display = 'none';
        }

        if (quantity >= stock) {
            plusButton.classList.add('disabled');
        } else {
            plusButton.classList.remove('disabled');
        }
    };

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
        buyButton.disabled = true;

        const quantity = parseInt(document.getElementById('popup-quantity').value) || 1;
        const subtotal = document.getElementById('popup-subtotal-value').textContent.replace('$', '');
        const saveAmount = document.getElementById('popup-save-amount')?.textContent || '0.00';
        const orderId = faker.datatype.number({ min: 100000, max: 999999 });

        setTimeout(() => {
            buyButton.classList.remove('loading');
            buyButton.disabled = false;
            hideModal('shopping-popup');

            // 50% 概率显示订单要素弹窗
            if (Math.random() < 0.5) {
                const fields = generateOrderFields();
                const formData = generateOrderFieldsForm(fields, itemName, quantity, subtotal, saveAmount, orderId);
                showModal('order-fields-popup', formData.html, { className: 'order-fields-popup', style: { maxWidth: '30em', padding: '1.5em' } });

                // Submit order fields
                document.getElementById('submit-order-fields').addEventListener('click', () => {
                    // Validate required fields
                    let isValid = true;
                    fields.forEach((field, index) => {
                        const inputElement = document.getElementById(`order-field-${index}`);
                        if (field.required) {
                            if (field.type === 4) { // Checkbox
                                if (!inputElement.checked) {
                                    isValid = false;
                                    alert(`Please check the required field: ${field.label}`);
                                }
                            } else if (field.type === 6) { // Radio
                                const selectedRadio = document.querySelector(`input[name="order-field-${index}"]:checked`);
                                if (!selectedRadio) {
                                    isValid = false;
                                    alert(`Please select an option for the required field: ${field.label}`);
                                }
                            } else if (field.type === 7) { // Image
                                if (inputElement.files.length === 0) {
                                    isValid = false;
                                    alert(`Please upload an image for the required field: ${field.label}`);
                                }
                            } else {
                                if (!inputElement.value) {
                                    isValid = false;
                                    alert(`Please fill in the required field: ${field.label}`);
                                }
                            }
                        }
                    });

                    if (isValid) {
                        const confirmationData = generateOrderFieldsConfirmation(fields, itemName, quantity, subtotal, saveAmount, orderId);
                        showModal('order-confirmation-popup', confirmationData.html, { className: 'order-confirmation-popup', style: { maxWidth: '30em', padding: '1.5em' } });

                        // Confirm order
                        document.getElementById('confirm-order').addEventListener('click', () => {
                            hideModal('order-fields-popup');
                            hideModal('order-confirmation-popup');
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
                        });

                        // Cancel and return to form
                        document.getElementById('cancel-order').addEventListener('click', () => {
                            hideModal('order-confirmation-popup');
                            showModal('order-fields-popup', formData.html, { className: 'order-fields-popup', style: { maxWidth: '30em', padding: '1.5em' } });
                        });
                    }
                });
            } else {
                // 原流程
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
            }
        }, 500);
    });

    // 初始化时更新加号状态
    updateSubtotal();
}

// Initialization
window.addEventListener("load", function() {
    w3.includeHTML(() => {
        generateDropdownMenus();
    });

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
