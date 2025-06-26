const headerLoginButton = document.getElementById('header-login');
const headerSignInButton = document.getElementById('header-signin');
const signin = document.getElementById('signin');
const signinCloseButton = document.getElementById('signin-close');
const signinBackButton = document.getElementById('signin-back');
const body = document.getElementsByTagName('body')[0];
const loginForm = document.getElementById('signin-login-form');
const loginAccoutErrTipEle = document.getElementById('signin-login-accout-tip');

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
    user = new UserInfo('Test', 'https://avatars.githubusercontent.com/u/10436682?v=4', 'fastresp@163.com', '10436682', 1, new Date('1998-01-01'), 'China');
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
    body.classList.toggle('modal-open', true);
});

function showSigninLoginPage() {
    signinNavArray = ['login']
    setup();
}

function showSigninRegistPage() {
    signinNavArray = ['regist']
    setup();
}

signinBackButton.addEventListener('click', function () {
    signinNavArray.pop();
    displayBackButton();
    displaySigninPage();
});

headerLoginButton.addEventListener('click', function () {
    showSigninLoginPage();
})

headerSignInButton.addEventListener('click', function () {
    showSigninRegistPage();
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

    const resetpwdButton = document.getElementById('signin-form-tool-box-resetpwd');
    resetpwdButton.addEventListener('click', function () {
        updateSigninNavArray('resetpwd');
        displaySigninPage();
        displayBackButton();
    });

    const rememberIcon = document.getElementsByClassName('signin-login-form-remember-icon')[0];
    const rememberButton = document.getElementById('signin-form-tool-box-remember');
    rememberButton.addEventListener('click', function () {
        loginRemember = !loginRemember;
        rememberIcon.setAttribute('src', loginRemember ? 'image/checked.png' : 'image/unchecked.png')
    });
}

function showRegist() {
    const loginButton = document.getElementById('signin-regist-login');
    loginButton.addEventListener('click', function () {
        updateSigninNavArray('login');
        displaySigninPage();
        displayBackButton();
    });

    const rememberIcon1 = document.getElementsByClassName('signin-form-regist-form-remember-icon1')[0];
    const rememberButton1 = document.getElementById('signin-form-regist-form-remember1');
    const rememberIcon2 = document.getElementsByClassName('signin-form-regist-form-remember-icon1')[0];
    const rememberButton2 = document.getElementById('signin-form-regist-form-remember1');
    rememberButton1.addEventListener('click', function () {
        registRemember1 = !registRemember1;
        rememberIcon1.setAttribute('src', registRemember1 ? 'image/checked.png' : 'image/unchecked.png')
    });
    rememberButton2.addEventListener('click', function () {
        registRemember2 = !registRemember2;
        rememberIcon2.setAttribute('src', registRemember2 ? 'image/checked.png' : 'image/unchecked.png')
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