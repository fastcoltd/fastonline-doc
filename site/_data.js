
// 热门平台样本数据：全球 Top 50 科技平台（真实数据）
const hotPlatforms = [
    { logo: 'https://logo.clearbit.com/facebook.com', name: 'Facebook', link: 'https://facebook.com' },
    { logo: 'https://logo.clearbit.com/google.com', name: 'Google', link: 'https://google.com' },
    { logo: 'https://logo.clearbit.com/twitter.com', name: 'Twitter', link: 'https://twitter.com' },
    { logo: 'https://logo.clearbit.com/tiktok.com', name: 'TikTok', link: 'https://tiktok.com' },
    { logo: 'https://logo.clearbit.com/instagram.com', name: 'Instagram', link: 'https://instagram.com' },
    { logo: 'https://logo.clearbit.com/youtube.com', name: 'YouTube', link: 'https://youtube.com' },
    { logo: 'https://logo.clearbit.com/amazon.com', name: 'Amazon', link: 'https://amazon.com' },
    { logo: 'https://logo.clearbit.com/microsoft.com', name: 'Microsoft', link: 'https://microsoft.com' },
    { logo: 'https://logo.clearbit.com/apple.com', name: 'Apple', link: 'https://apple.com' },
    { logo: 'https://logo.clearbit.com/linkedin.com', name: 'LinkedIn', link: 'https://linkedin.com' },
    { logo: 'https://logo.clearbit.com/netflix.com', name: 'Netflix', link: 'https://netflix.com' },
    { logo: 'https://logo.clearbit.com/spotify.com', name: 'Spotify', link: 'https://spotify.com' },
    { logo: 'https://logo.clearbit.com/pinterest.com', name: 'Pinterest', link: 'https://pinterest.com' },
    { logo: 'https://logo.clearbit.com/snapchat.com', name: 'Snapchat', link: 'https://snapchat.com' },
    { logo: 'https://logo.clearbit.com/whatsapp.com', name: 'WhatsApp', link: 'https://whatsapp.com' },
    { logo: 'https://logo.clearbit.com/reddit.com', name: 'Reddit', link: 'https://reddit.com' },
    { logo: 'https://logo.clearbit.com/discord.com', name: 'Discord', link: 'https://discord.com' },
    { logo: 'https://logo.clearbit.com/telegram.org', name: 'Telegram', link: 'https://telegram.org' },
    { logo: 'https://logo.clearbit.com/twitch.tv', name: 'Twitch', link: 'https://twitch.tv' },
    { logo: 'https://logo.clearbit.com/slack.com', name: 'Slack', link: 'https://slack.com' },
    { logo: 'https://logo.clearbit.com/dropbox.com', name: 'Dropbox', link: 'https://dropbox.com' },
    { logo: 'https://logo.clearbit.com/zoom.us', name: 'Zoom', link: 'https://zoom.us' },
    { logo: 'https://logo.clearbit.com/ebay.com', name: 'eBay', link: 'https://ebay.com' },
    { logo: 'https://logo.clearbit.com/paypal.com', name: 'PayPal', link: 'https://paypal.com' },
    { logo: 'https://logo.clearbit.com/adobe.com', name: 'Adobe', link: 'https://adobe.com' },
    { logo: 'https://logo.clearbit.com/shopify.com', name: 'Shopify', link: 'https://shopify.com' },
    { logo: 'https://logo.clearbit.com/salesforce.com', name: 'Salesforce', link: 'https://salesforce.com' },
    { logo: 'https://logo.clearbit.com/uber.com', name: 'Uber', link: 'https://uber.com' },
    { logo: 'https://logo.clearbit.com/airbnb.com', name: 'Airbnb', link: 'https://airbnb.com' },
    { logo: 'https://logo.clearbit.com/tesla.com', name: 'Tesla', link: 'https://tesla.com' },
    { logo: 'https://logo.clearbit.com/oracle.com', name: 'Oracle', link: 'https://oracle.com' },
    { logo: 'https://logo.clearbit.com/ibm.com', name: 'IBM', link: 'https://ibm.com' },
    { logo: 'https://logo.clearbit.com/cisco.com', name: 'Cisco', link: 'https://cisco.com' },
    { logo: 'https://logo.clearbit.com/intel.com', name: 'Intel', link: 'https://intel.com' },
    { logo: 'https://logo.clearbit.com/nvidia.com', name: 'NVIDIA', link: 'https://nvidia.com' },
    { logo: 'https://logo.clearbit.com/dell.com', name: 'Dell', link: 'https://dell.com' },
    { logo: 'https://logo.clearbit.com/hp.com', name: 'HP', link: 'https://hp.com' },
    { logo: 'https://logo.clearbit.com/samsung.com', name: 'Samsung', link: 'https://samsung.com' },
    { logo: 'https://logo.clearbit.com/sony.com', name: 'Sony', link: 'https://sony.com' },
    { logo: 'https://logo.clearbit.com/alibaba.com', name: 'Alibaba', link: 'https://alibaba.com' },
    { logo: 'https://logo.clearbit.com/tencent.com', name: 'Tencent', link: 'https://tencent.com' },
    { logo: 'https://logo.clearbit.com/baidu.com', name: 'Baidu', link: 'https://baidu.com' },
    { logo: 'https://logo.clearbit.com/jd.com', name: 'JD.com', link: 'https://jd.com' },
    { logo: 'https://logo.clearbit.com/wechat.com', name: 'WeChat', link: 'https://wechat.com' },
    { logo: 'https://logo.clearbit.com/vimeo.com', name: 'Vimeo', link: 'https://vimeo.com' },
    { logo: 'https://logo.clearbit.com/quora.com', name: 'Quora', link: 'https://quora.com' },
    { logo: 'https://logo.clearbit.com/stackoverflow.com', name: 'Stack Overflow', link: 'https://stackoverflow.com' },
    { logo: 'https://logo.clearbit.com/gitlab.com', name: 'GitLab', link: 'https://gitlab.com' },
    { logo: 'https://logo.clearbit.com/github.com', name: 'GitHub', link: 'https://github.com' },
    { logo: 'https://logo.clearbit.com/bitbucket.org', name: 'Bitbucket', link: 'https://bitbucket.org' }
];

// 热门服务样本数据：50 个互联网服务（真实数据，带 Font Awesome 图标）
const hotServices = [
    { icon: 'fas fa-user-plus', title: 'Account Creation', link: '#' },
    { icon: 'fas fa-users', title: 'Follower Growth', link: '#' },
    { icon: 'fas fa-video', title: 'Video Streaming', link: '#' },
    { icon: 'fas fa-shopping-cart', title: 'E-commerce', link: '#' },
    { icon: 'fas fa-cloud', title: 'Cloud Storage', link: '#' },
    { icon: 'fas fa-search', title: 'SEO Optimization', link: '#' },
    { icon: 'fas fa-ad', title: 'Ad Placement', link: '#' },
    { icon: 'fas fa-code', title: 'Web Development', link: '#' },
    { icon: 'fas fa-pen', title: 'Content Writing', link: '#' },
    { icon: 'fas fa-paint-brush', title: 'Graphic Design', link: '#' },
    { icon: 'fas fa-comments', title: 'Live Chat', link: '#' },
    { icon: 'fas fa-envelope', title: 'Email Marketing', link: '#' },
    { icon: 'fas fa-mobile-alt', title: 'Mobile App Development', link: '#' },
    { icon: 'fas fa-shield-alt', title: 'Cybersecurity', link: '#' },
    { icon: 'fas fa-database', title: 'Database Management', link: '#' },
    { icon: 'fas fa-globe', title: 'Website Hosting', link: '#' },
    { icon: 'fas fa-analytics', title: 'Data Analytics', link: '#' },
    { icon: 'fas fa-headset', title: 'Customer Support', link: '#' },
    { icon: 'fas fa-share-alt', title: 'Social Sharing', link: '#' },
    { icon: 'fas fa-photo-video', title: 'Photo Editing', link: '#' },
    { icon: 'fas fa-play', title: 'Music Streaming', link: '#' },
    { icon: 'fas fa-shopping-bag', title: 'Online Marketplace', link: '#' },
    { icon: 'fas fa-lock', title: 'VPN Service', link: '#' },
    { icon: 'fas fa-cogs', title: 'IT Consulting', link: '#' },
    { icon: 'fas fa-chart-line', title: 'Traffic Analysis', link: '#' },
    { icon: 'fas fa-gamepad', title: 'Game Development', link: '#' },
    { icon: 'fas fa-camera', title: 'Live Streaming', link: '#' },
    { icon: 'fas fa-wifi', title: 'Network Setup', link: '#' },
    { icon: 'fas fa-trash', title: 'Spam Filtering', link: '#' },
    { icon: 'fas fa-blog', title: 'Blog Hosting', link: '#' },
    { icon: 'fas fa-robot', title: 'AI Chatbots', link: '#' },
    { icon: 'fas fa-file-alt', title: 'Document Sharing', link: '#' },
    { icon: 'fas fa-sync', title: 'Data Backup', link: '#' },
    { icon: 'fas fa-tools', title: 'Tech Support', link: '#' },
    { icon: 'fas fa-calendar', title: 'Event Scheduling', link: '#' },
    { icon: 'fas fa-map', title: 'Location Services', link: '#' },
    { icon: 'fas fa-microphone', title: 'Voice Recording', link: '#' },
    { icon: 'fas fa-credit-card', title: 'Payment Processing', link: '#' },
    { icon: 'fas fa-question-circle', title: 'Q&A Forums', link: '#' },
    { icon: 'fas fa-folder-open', title: 'File Management', link: '#' },
    { icon: 'fas fa-bell', title: 'Notifications', link: '#' },
    { icon: 'fas fa-user-shield', title: 'User Authentication', link: '#' },
    { icon: 'fas fa-tachometer-alt', title: 'Performance Monitoring', link: '#' },
    { icon: 'fas fa-video-slash', title: 'Content Moderation', link: '#' },
    { icon: 'fas fa-poll', title: 'Survey Tools', link: '#' },
    { icon: 'fas fa-shopping-basket', title: 'Subscription Services', link: '#' },
    { icon: 'fas fa-link', title: 'URL Shortening', link: '#' },
    { icon: 'fas fa-desktop', title: 'Remote Desktop', link: '#' },
    { icon: 'fas fa-bug', title: 'Bug Tracking', link: '#' },
    { icon: 'fas fa-tasks', title: 'Project Management', link: '#' }
];

// 从 hotPlatforms 随机选取 20-50 个平台名称和 logo
function getRandomPlatforms(min, max) {
    const count = Math.floor(Math.random() * (max - min + 1)) + min;
    const shuffled = hotPlatforms.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count).map(platform => ({ name: platform.name, logo: platform.logo }));
}

// 更新 services 数据，随机附带 hotPlatforms 中的名称和 logo
const services = [
    { name: 'Social Media', sub: getRandomPlatforms(15, hotPlatforms.length) },
    { name: 'Social Accounts', sub: getRandomPlatforms(15, hotPlatforms.length) },
    { name: 'SEO & SEM', sub: getRandomPlatforms(15, hotPlatforms.length) },
    { name: 'Ecommerce', sub: getRandomPlatforms(15, hotPlatforms.length) },
    { name: 'Gaming', sub: getRandomPlatforms(15, hotPlatforms.length) },
    { name: 'Content', sub: getRandomPlatforms(15, hotPlatforms.length) },
    { name: 'Design', sub: getRandomPlatforms(15, hotPlatforms.length) },
    { name: 'Promotion & Ads', sub: getRandomPlatforms(15, hotPlatforms.length) },
    { name: 'Trading', sub: getRandomPlatforms(15, hotPlatforms.length) },
    { name: 'Mobile Apps', sub: getRandomPlatforms(15, hotPlatforms.length) },
    { name: 'Soft Develop', sub: getRandomPlatforms(15, hotPlatforms.length) },
    { name: 'Cloud Service', sub: getRandomPlatforms(15, hotPlatforms.length) },
    { name: 'Security', sub: getRandomPlatforms(15, hotPlatforms.length) }
];

// 生成服务菜单（调整为横向分组，每 3 个字母）
function generateServiceMenu() {
    const menu = document.getElementById('service-menu');
    services.forEach(cat => {
        const div = document.createElement('div');
        div.className = 'level-1';
        const subByLetter = {};
        cat.sub.forEach(item => {
            const firstLetter = item.name[0].toUpperCase();
            if (!subByLetter[firstLetter]) subByLetter[firstLetter] = [];
            subByLetter[firstLetter].push(item);
        });
        let subHtml = '<div class="letter-groups">';
        const letterGroups = ['A-C', 'D-F', 'G-I', 'J-L', 'M-O', 'P-R', 'S-U', 'V-X', 'Y-Z'];
        letterGroups.forEach(group => {
            const [start, end] = group.split('-');
            const groupLetters = Object.keys(subByLetter).sort().filter(letter => letter >= start && letter <= end);
            if (groupLetters.length > 0) {
                subHtml += '<div class="letter-group">';
                subHtml += `<span class="letter-header">${groupLetters.join('')}</span><div class="platform-list">`;
                groupLetters.forEach(letter => {
                    subByLetter[letter].forEach(item => {
                        subHtml += `<a href="#" class="platform-item"><img src="${item.logo}" alt="${item.name}" class="platform-logo">${item.name}</a>`;
                    });
                });
                subHtml += '</div></div>';
            }
        });
        subHtml += '</div>';
        div.innerHTML = `${cat.name}<div class="level-2">${subHtml}</div>`;
        menu.appendChild(div);
    });
}

window.generateServiceMenu = generateServiceMenu;
window.hotPlatforms = hotPlatforms;
window.hotServices = hotServices;
window.services = services;