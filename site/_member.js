// _member.js
let signInRegisterStyle = { width: '35em' };

// 本地存储用户登录信息
function saveUserLoginInfo(username) {
    const userData = {
        username: username,
        balance: faker.commerce.price(100, 1000, 2),
        messages: { user: 6, tickets: 5, system: 5 }
    };
    localStorage.setItem('userData', JSON.stringify(userData));
    updateHeaderUI();
}

// 从本地存储获取用户信息
function getUserLoginInfo() {
    return JSON.parse(localStorage.getItem('userData')) || null;
}

// 更新头部 UI
function updateHeaderUI() {
    const userData = getUserLoginInfo();
    const headerActions = document.getElementById('header-actions');
    if (!headerActions) return;

    if (!window.originalHeaderContent) {
        window.originalHeaderContent = headerActions.innerHTML;
    }

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
        if (becomeSeller) headerActions.appendChild(becomeSeller.cloneNode(true));

        headerActions.innerHTML += `
            <div class="user-actions">
                <a href="#" class="balance" onclick="showModal('topup-modal', generateTopUpModal(), { className: 'topup-modal', style: signInRegisterStyle })">$${userData.balance}</a>
                <div class="messages-wrapper">
                    <a href="#" class="messages"><i class="fas fa-envelope"></i><span class="message-count">${userData.messages.user + userData.messages.tickets + userData.messages.system}</span></a>
                    <div class="messages-tooltip">
                        <a href="#" class="message-item">消息: ${userData.messages.user}</a>
                        <a href="#" class="message-item">工单: ${userData.messages.tickets}</a>
                        <a href="#" class="message-item">系统: ${userData.messages.system}</a>
                    </div>
                </div>
                <div class="user-avatar-wrapper">
                    <a href="#" class="user-avatar"><img src="${getPicsumImage(40, 40, userData.username)}" alt="${userData.username}"></a>
                    <div class="user-menu">
                        <a href="#"><i class="fas fa-user"></i> Profile</a>
                        <a href="#"><i class="fas fa-shopping-cart"></i> 我的订单</a>
                        <a href="#"><i class="fas fa-list"></i> 我的需求</a>
                        <a href="#"><i class="fas fa-blog"></i> 我的博客</a>
                        <a href="#" onclick="showModal('topup-modal', generateTopUpModal(), { className: 'topup-modal', style: signInRegisterStyle })"><i class="fas fa-wallet"></i> Top-Up</a>
                        <a href="#"><i class="fas fa-money-bill"></i> 资金记录</a>
                        <a href="#"><i class="fas fa-heart"></i> 我的收藏</a>
                        <a href="#"><i class="fas fa-comment"></i> 我的评论</a>
                        <a href="#" onclick="logout()"><i class="fas fa-sign-out-alt"></i> Logout</a>
                    </div>
                </div>
            </div>
        `;
    } else {
        headerActions.innerHTML = window.originalHeaderContent;
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
        <input type="text" id="login-username" placeholder="Username" class="ant-input" value="fastresp-test" style="margin-bottom: 1.25em; padding: 0.75em; color: var(--text-primary);">
        <input type="password" id="login-password" placeholder="Password" class="ant-input" value="test1234" style="margin-bottom: 1.25em; padding: 0.75em; color: var(--text-primary);">
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

// 充值弹窗
const paymentMethods = [
    { name: 'Digital', feeType: 'fixed', fee: 2, minAmount: 10 },
    { name: 'PayPal', feeType: 'percent', fee: 0.029, minAmount: 20 },
    { name: 'Alipay', feeType: 'fixed', fee: 1.5, minAmount: 15 },
    { name: 'Stripe', feeType: 'percent', fee: 0.025, minAmount: 25 }
];

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

// 初始化
window.addEventListener("load", function() {
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