const headerJoinButton = document.getElementById('header-join');
const headerSignInButton = document.getElementById('header-signin');
const signin = document.getElementById('signin');
const signinCloseButton = document.getElementById('signin-close');
const signinBackButton = document.getElementById('signin-back');
const body = document.getElementsByTagName('body')[0];
const loginForm = document.getElementById('signin-login-form');
const loginAccoutErrTipEle = document.getElementById('signin-login-accout-tip');
let countryList = [
    { value: 'china', text: 'China' },
    { value: 'english', text: 'English' }
]
$('div.filter-custom-select[data-type="countryList"]').each(function () {
    // 生成下拉内容
    generateDropdownHtml($(this));
    let that = this
    $(that).on('click', '.filter-dropdown-item', function (e) {
        e.stopPropagation();
        let value = $(e.target).data('value')
        let text = $(e.target).text()
        $(that).attr('data-value', value)
        $(that).find('.filter-custom-select-text').text(text)
        $(that).toggleClass('active')
    })
    $(that).on('click', function () {
        $(this).toggleClass('active')
    })
})
$('.registere-btn').on('click', function() {
    let postData = {
        firstName: $('#firstname').val(),
        lastName: $('#lastname').val(),
        account: $('.regist-account-input').val(),
        password: $('.regist-account-password').val(),
        country: $('.filter-custom-select[data-type="countryList"]').attr('data-value'),
        agree1: $('#agree1').prop('checked'),
        agree2: $('#agree2').prop('checked')
    }
    console.log(postData, '00000')
})
function generateDropdownHtml(item) {
    let options = countryList
    let htmlStr = ''
    if (options && options.length) {
        options.forEach(function (option) {
            htmlStr += `<div class="filter-dropdown-item" data-value="${option.value}"><span
        class="filter-dropdown-item-text" data-value="${option.value}">${option.text}</span></div>`
        })
        item.find('.filter-dropdown-content').html(htmlStr)
    }
}
let user = null
let loginSuccess = false
loginForm.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!loginSuccess) {
        loginAccoutErrTipEle.style.display = '';
        loginAccoutErrTipEle.textContent = '请输入正确账号';
        loginSuccess = true;
        return;
    }
    window.user = new UserInfo('Test', 'https://avatars.githubusercontent.com/u/10436682?v=4', 'fastresp@163.com', '10436682', 1, new Date('1998-01-01'), 'China');
    signin.style.display = 'none';
    body.classList.toggle('modal-open', false);
    dismissHomeMenuPage();
    refreshHeaderUserUI();
})

let signinNavArray = []
let loginRemember = false
let registRemember1 = false
let registRemember2 = false

signinCloseButton.addEventListener('click', function () {
    signin.style.display = 'none';
    body.classList.toggle('modal-open', false);
});

function showJoinFn() {
    signinNavArray = ['regist']
    setup();
}

function showSigninFn() {
    signinNavArray = ['login']
    setup();
}

signinBackButton.addEventListener('click', function () {
    signinNavArray.pop();
    displayBackButton();
    displaySigninPage();
});

headerJoinButton.addEventListener('click', function () {
    showJoinFn();
})

headerSignInButton.addEventListener('click', function () {
    showSigninFn();
})

function displayBackButton() {
    signinBackButton.style.display = signinNavArray.length > 1 ? 'block' : 'none';
}

function displaySigninPage() {
    const login = document.getElementById('signin-login');
    const regist = document.getElementById('signin-regist');
    const resetpwd = document.getElementById('signin-resetpwd');
    const twofa = document.getElementById('signin-2fa');
    const reset2fa = document.getElementById('signin-reset-2fa');
    regist.style.display = 'none';
    resetpwd.style.display = 'none';
    login.style.display = 'none';
    const lastSigninType = signinNavArray[signinNavArray.length - 1];
    if (lastSigninType === 'login') {
        login.style.display = 'flex';
        showLogin();
    } else if (lastSigninType === 'regist') {
        regist.style.display = 'flex';
        showRegist();
    } else if (lastSigninType === 'resetpwd') {
        resetpwd.style.display = 'flex';
        showResetpwd();
    } else if (lastSigninType === '2fa') {
        twofa.style.display = 'flex';
        show2fa();
    } else if (lastSigninType === 'reset2fa') {
        reset2fa.style.display = 'flex';
        showReset2fa();
    }
}

function setup() {
    loginRemember = false;
    registRemember1 = false;
    registRemember2 = false;


    body.classList.toggle('modal-open', true);
    signin.style.display = 'flex';

    displayBackButton();
    displaySigninPage();
}

function updateSigninNavArray(name) {
    const index = signinNavArray.indexOf(name);
    if (index >= 0) {
        signinNavArray.splice(index + 1);
    } else {
        signinNavArray.push(name);
    }
}

function showLogin() {

    const registButton = document.getElementById('signin-login-regist');
    registButton.addEventListener('click', function () {
        updateSigninNavArray('regist');
        displaySigninPage();
        displayBackButton();
    });
}

function showRegist() {
    const loginButton = document.getElementById('signin-regist-login');
    loginButton.addEventListener('click', function () {
        updateSigninNavArray('login');
        displaySigninPage();
        displayBackButton();
    });
}

function showResetpwd() {
}

function show2fa() {

    const registButton = document.getElementById('signin-2fa-regist');
    registButton.addEventListener('click', function () {
        updateSigninNavArray('regist');
        displaySigninPage();
        displayBackButton();
    });

    const reset2faButton = document.getElementById('signin-form-tool-box-reset2fa');
    reset2faButton.addEventListener('click', function () {
        updateSigninNavArray('reset2fa');
        displaySigninPage();
        displayBackButton();
    });
}

function showReset2fa() {

    const registButton = document.getElementById('signin-reset2fa-regist');
    registButton.addEventListener('click', function () {
        updateSigninNavArray('regist');
        displaySigninPage();
        displayBackButton();
    });
}