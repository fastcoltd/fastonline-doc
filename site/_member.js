// _member.js
let signInRegisterStyle = { width: '35em' }


function generateLoginModal() {
    return `
        <span class="modal-close" onclick="hideModal('login-modal')">×</span>
        <h3 style="font-size: var(--font-xlarge); color: var(--text-primary); margin-bottom: 1.5em; text-align: center;">Sign In to FASTRESP</h3>
        <input type="text" placeholder="Username" class="ant-input" style="margin-bottom: 1.25em; padding: 0.75em; color: var(--text-primary);">
        <input type="password" placeholder="Password" class="ant-input" style="margin-bottom: 1.25em; padding: 0.75em; color: var(--text-primary);">
        <div style="display: flex; justify-content: space-between; margin-bottom: 1.5em; font-size: var(--font-medium); color: var(--text-primary);">
            <label><input type="checkbox" style="margin-right: 0.5em;"> Remember me</label>
            <a href="#" class="see-all">Reset Password</a>
        </div>
        <button class="btn-orange-solid-large" style="width: 100%; margin-bottom: 1em;" onclick="hideModal('login-modal')">Sign In</button>
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

function generateCountryOptions() {
    return languages.map(lang => `<option value="${lang.country}">${lang.country}</option>`).join('');
}

document.addEventListener('click', function(e) {
    if (e.target.id === 'toggle-password') {
        const passwordInput = document.getElementById('reg-password');
        const icon = e.target;
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
});

window.addEventListener("load", function()  {
    setTimeout(()=>{
        document.querySelectorAll('.footer-right a:not([target])').forEach(item => {
            item.onclick = function () {
                showModal(`${this.id}-modal`, generateSelectorModal(this.id));
            };
        });
    }, 100)
})