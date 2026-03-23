const headerJoinButton = document.getElementById('header-join');
const headerSignInButton = document.getElementById('header-signin');
const signin = document.getElementById('signin');
const signinContainer = signin ? signin.querySelector('.signin-container') : null;
const signinCloseButton = document.getElementById('signin-close');
const signinBackButton = document.getElementById('signin-back');
const body = document.getElementsByTagName('body')[0];
const loginForm = document.getElementById('signin-login-form');
const twofaForm = document.getElementById('signin-2fa-form');
const loginAccoutErrTipEle = document.getElementById('signin-login-accout-tip');
const twofaCodeErrTipEle = document.getElementById('signin-2fa-code-tip');
let countryList = [
    { value: 'china', text: 'China' },
    { value: 'english', text: 'English' }
]
$('.signin-regist-form .filter-custom-select[data-type="countryList"]').each(function () {
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
        country: $('.signin-regist-form .filter-custom-select[data-type="countryList"]').attr('data-value'),
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
function doSigninAction(errorTipEle) {
    if (!loginSuccess) {
        if (errorTipEle) {
            errorTipEle.style.display = '';
            errorTipEle.textContent = '请输入正确账号';
        }
        loginSuccess = true;
        return;
    }
    window.user = new UserInfo('Test', 'https://avatars.githubusercontent.com/u/10436682?v=4', 'fastresp@163.com', '10436682', 1, new Date('1998-01-01'), 'China');
    signin.style.display = 'none';
    body.classList.toggle('modal-open', false);
    dismissHomeMenuPage();
    refreshHeaderUserUI();
}

loginForm.addEventListener('submit', function (e) {
    e.preventDefault();
    if (loginAccoutErrTipEle) {
        loginAccoutErrTipEle.style.display = 'none';
    }
    if (twofaCodeErrTipEle) {
        twofaCodeErrTipEle.style.display = 'none';
        twofaCodeErrTipEle.textContent = '';
    }
    signinNavArray = ['login', '2fa'];
    displaySigninPage();
    displayBackButton();
})

if (twofaForm) {
    twofaForm.addEventListener('submit', function (e) {
        e.preventDefault();
        doSigninAction(twofaCodeErrTipEle);
    })
}

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
    twofa.style.display = 'none';
    reset2fa.style.display = 'none';
    const lastSigninType = signinNavArray[signinNavArray.length - 1];
    if (signinContainer) {
        const isRegist = lastSigninType === 'regist';
        const isTwoStep = lastSigninType === '2fa' || lastSigninType === 'reset2fa';
        signinContainer.classList.toggle('signin-container-regist', isRegist);
        signinContainer.classList.toggle('signin-container-2fa', isTwoStep);
        signinContainer.classList.toggle('signin-container-login', !isRegist && !isTwoStep);
    }
    if (lastSigninType === 'login') {
        login.style.display = 'flex';
        showLogin();
    } else if (lastSigninType === 'regist') {
        syncRegistContent();
        regist.style.display = 'flex';
        showRegist();
    } else if (lastSigninType === 'resetpwd') {
        resetpwd.style.display = 'flex';
        showResetpwd();
    } else if (lastSigninType === '2fa') {
        twofa.style.display = 'flex';
        show2fa();
    } else if (lastSigninType === 'reset2fa') {
        syncReset2faContent();
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

function syncRegistContent() {
    const regist = document.getElementById('signin-regist');
    if (!regist) return;
    const titleList = regist.querySelectorAll('.signin-form-title');
    if (titleList[0]) titleList[0].textContent = 'First Name';
    if (titleList[1]) titleList[1].textContent = 'Last Name';
    if (titleList[2]) titleList[2].textContent = 'Email Address';
    if (titleList[3]) titleList[3].textContent = 'Password';

    const passwordInput = regist.querySelector('.regist-account-password');
    if (passwordInput) {
        passwordInput.setAttribute('placeholder', 'Enter password');
    }
    const firstNameInput = regist.querySelector('#firstname');
    if (firstNameInput) {
        firstNameInput.setAttribute('placeholder', 'First name');
    }
    const lastNameInput = regist.querySelector('#lastname');
    if (lastNameInput) {
        lastNameInput.setAttribute('placeholder', 'Last Name');
    }
    const countryPlaceholder = regist.querySelector('.filter-custom-select-text.placeholder');
    if (countryPlaceholder) {
        countryPlaceholder.textContent = 'Select Country';
    }
    const splitText = regist.querySelector('.signin-line-text');
    if (splitText) {
        splitText.textContent = 'or';
    }
    const otherwayText = regist.querySelector('#signin-regist-login .signin-otherway-text');
    if (otherwayText) {
        otherwayText.textContent = 'Already registered to Fastresp?';
    }
    const agree1 = regist.querySelector('#agree1');
    if (agree1) {
        agree1.checked = true;
    }
    const agree2 = regist.querySelector('#agree2');
    if (agree2) {
        agree2.checked = false;
    }
}

function syncReset2faContent() {
    const reset2fa = document.getElementById('signin-reset-2fa');
    if (!reset2fa) return;

    const tip = reset2fa.querySelector('.signin-form-tip');
    if (tip) {
        tip.textContent = 'We have sent a 2FA reset email to jean***********@yahoo.com';
    }

    const timeText = reset2fa.querySelector('.signin-form-time');
    if (timeText) {
        timeText.textContent = 'Send 30s';
    }

    const submitButton = reset2fa.querySelector('.signin-form-button');
    if (submitButton) {
        submitButton.textContent = 'Verify';
    }

    const splitText = reset2fa.querySelector('.signin-line-text');
    if (splitText) {
        splitText.textContent = 'or';
    }
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
