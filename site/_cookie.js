// _cookie.js
(function () {
    // Check if the cookie consent has already been accepted
    if (document.cookie.includes('cookie_consent=accepted')) {
        return;
    }

    // Create the cookie consent popup
    const popup = document.createElement('div');
    popup.id = 'cookie-consent-popup';
    popup.style.cssText = `
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        background: #fff;
        box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
        padding: 15px 20px;
        z-index: 1000;
        font-family: Arial, sans-serif;
        font-size: 14px;
        line-height: 1.5;
        color: #333;
    `;

    // Popup content
    popup.innerHTML = `
        <div style="max-width: 1200px; margin: 0 auto; display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between;">
            <div style="flex: 1; min-width: 200px; padding-right: 20px;">
                <p>We use cookies to enhance your experience, analyze site usage, and deliver personalized content. By continuing to use this site, you consent to our use of cookies as described in our <a href="/site/privacy-policy.html#cookies" style="text-decoration: underline;">Cookie Policy</a>.</p>
            </div>
            <div style="display: flex; gap: 10px; flex-wrap: wrap; padding-top: 10px;">
                <button id="accept-cookies" style="background: var(--font-green); color: #fff; border: none; padding: 8px 20px; border-radius: 4px; cursor: pointer;">Accept All</button>
                <button id="customize-cookies" style="background: #fff; color: var(--font-green); border: 1px solid var(--font-green); padding: 8px 20px; border-radius: 4px; cursor: pointer;">Customize</button>
            </div>
        </div>
        <div id="cookie-customize-section" style="display: none; margin-top: 15px; border-top: 1px solid #eee; padding-top: 15px;">
            <h3 style="font-size: 16px; margin-bottom: 10px;">Cookie Preferences</h3>
            <label style="display: block; margin-bottom: 10px;">
                <input type="checkbox" id="essential-cookies" checked disabled> Essential Cookies (Required for site functionality)
            </label>
            <label style="display: block; margin-bottom: 10px;">
                <input type="checkbox" id="analytics-cookies"> Analytics Cookies (Help us improve the site)
            </label>
            <label style="display: block; margin-bottom: 10px;">
                <input type="checkbox" id="marketing-cookies"> Marketing Cookies (Personalized ads and content)
            </label>
            <button id="save-cookies" style="background: var(--font-green); color: #fff; border: none; padding: 8px 20px; border-radius: 4px; cursor: pointer; margin-top: 10px;">Save Preferences</button>
        </div>
    `;

    // Mobile responsiveness
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        @media (max-width: 768px) {
            #cookie-consent-popup {
                font-size: 12px;
                padding: 10px;
            }
            #cookie-consent-popup p {
                margin: 0 0 10px 0;
            }
            #cookie-consent-popup div:first-child {
                flex-direction: column;
                text-align: center;
            }
            #cookie-consent-popup div:first-child > div {
                padding-right: 0;
            }
            #cookie-consent-popup button {
                width: 100%;
                padding: 10px;
            }
        }
    `;
    document.head.appendChild(styleSheet);

    // Append popup to the body
    document.body.appendChild(popup);

    // Event listeners for buttons
    const acceptButton = document.getElementById('accept-cookies');
    const customizeButton = document.getElementById('customize-cookies');
    const saveButton = document.getElementById('save-cookies');
    const customizeSection = document.getElementById('cookie-customize-section');

    acceptButton.addEventListener('click', () => {
        // Set cookie to indicate consent
        document.cookie = 'cookie_consent=accepted; path=/; max-age=31536000'; // 1 year expiry
        popup.remove();
    });

    customizeButton.addEventListener('click', () => {
        customizeSection.style.display = 'block';
        customizeButton.style.display = 'none'; // Hide customize button when section is open
    });

    saveButton.addEventListener('click', () => {
        const analytics = document.getElementById('analytics-cookies').checked;
        const marketing = document.getElementById('marketing-cookies').checked;
        // Save preferences (you can extend this to store detailed preferences if needed)
        document.cookie = `cookie_consent=custom; analytics=${analytics}; marketing=${marketing}; path=/; max-age=31536000`;
        popup.remove();
    });
})();