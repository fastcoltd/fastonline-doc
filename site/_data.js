
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


// 电商属性/属性值数据（50个属性类型，每个至少10个属性值）
const ecommerceAttributes = {
    "国家": ["USA", "China", "Japan", "Germany", "France", "UK", "Canada", "Australia", "India", "Brazil"],
    "颜色": ["红色", "蓝色", "绿色", "黑色", "白色", "黄色", "紫色", "橙色", "粉色", "灰色"],
    "尺寸": ["XS", "S", "M", "L", "XL", "XXL", "3XL", "4XL", "5XL", "定制"],
    "材质": ["棉", "聚酯", "丝绸", "羊毛", "皮革", "牛仔", "麻", "尼龙", "绒", "竹纤维"],
    "品牌类型": ["奢侈品", "高端", "中端", "平价", "快时尚", "运动", "户外", "手工", "环保", "本地品牌"],
    "季节": ["春季", "夏季", "秋季", "冬季", "全季", "春夏", "秋冬", "夏季清凉", "冬季保暖", "过渡季"],
    "风格": ["休闲", "正式", "运动", "复古", "时尚", "简约", "街头", "民族", "商务", "朋克"],
    "用途": ["日常", "运动", "旅行", "派对", "工作", "家用", "户外", "礼品", "收藏", "装饰"],
    "性别": ["男", "女", "中性", "儿童", "婴儿", "青少年", "成人", "孕妇", "情侣", "全家"],
    "年龄段": ["0-3岁", "4-6岁", "7-12岁", "13-18岁", "19-25岁", "26-35岁", "36-45岁", "46-60岁", "60岁以上", "全年龄"],
    "包装": ["盒装", "袋装", "散装", "礼盒", "真空", "瓶装", "罐装", "纸袋", "塑料", "环保包装"],
    "重量": ["<100g", "100-200g", "200-500g", "500g-1kg", "1-2kg", "2-5kg", "5-10kg", "10-20kg", "20kg以上", "定制重量"],
    "容量": ["<50ml", "50-100ml", "100-250ml", "250-500ml", "500ml-1L", "1-2L", "2-5L", "5-10L", "10L以上", "定制容量"],
    "保质期": ["1个月", "3个月", "6个月", "1年", "2年", "3年", "5年", "10年", "永久", "无保质期"],
    "产地": ["本地", "进口", "亚洲", "欧洲", "北美", "南美", "非洲", "澳洲", "手工", "工厂生产"],
    "认证": ["有机", "无添加", "环保", "FDA", "CE", "ISO", "QS", "绿色食品", "非转基因", "公平贸易"],
    "电源": ["电池", "USB", "插电", "太阳能", "手动", "无线", "充电", "风能", "混合动力", "无电源"],
    "屏幕尺寸": ["<5寸", "5-7寸", "7-10寸", "10-13寸", "13-15寸", "15-17寸", "17-20寸", "20寸以上", "无屏幕", "可调节"],
    "分辨率": ["720p", "1080p", "2K", "4K", "8K", "标清", "高清", "超高清", "定制", "无分辨率"],
    "内存": ["<1GB", "1-2GB", "2-4GB", "4-8GB", "8-16GB", "16-32GB", "32-64GB", "64-128GB", "128GB以上", "可扩展"],
    "存储": ["<16GB", "16-32GB", "32-64GB", "64-128GB", "128-256GB", "256-512GB", "512GB-1TB", "1-2TB", "2TB以上", "云存储"],
    "网络": ["2G", "3G", "4G", "5G", "WiFi", "蓝牙", "有线", "无网络", "双模", "多模"],
    "操作系统": ["Android", "iOS", "Windows", "Linux", "MacOS", "无系统", "定制", "RTOS", "HarmonyOS", "其他"],
    "电池容量": ["<1000mAh", "1000-2000mAh", "2000-3000mAh", "3000-5000mAh", "5000-8000mAh", "8000-10000mAh", "10000mAh以上", "无电池", "可更换", "固定"],
    "充电时间": ["<1小时", "1-2小时", "2-3小时", "3-4小时", "4-6小时", "6-8小时", "8小时以上", "快速充电", "无线充电", "无充电"],
    "使用场景": ["室内", "室外", "办公", "家庭", "旅行", "运动", "派对", "学习", "娱乐", "紧急"],
    "目标人群": ["学生", "职场人士", "老年人", "儿童", "运动员", "旅行者", "家庭主妇", "收藏家", "DIY爱好者", "专业人士"],
    "配件": ["充电器", "耳机", "数据线", "保护套", "支架", "电池", "说明书", "工具包", "清洁布", "无配件"],
    "运输方式": ["快递", "物流", "空运", "海运", "陆运", "自提", "无人机", "专车", "邮寄", "即时配送"],
    "配送时间": ["1-2天", "3-5天", "5-7天", "7-10天", "10-15天", "15-30天", "1个月以上", "即时", "预订", "定制"],
    "退换政策": ["7天无理由", "15天退换", "30天退换", "不支持退换", "仅换不退", "仅退不换", "需联系客服", "保修期内", "特殊条件", "无政策"],
    "促销类型": ["满减", "折扣", "赠品", "秒杀", "团购", "预售", "返现", "积分", "免邮", "无促销"],
    "产品类别": ["电子产品", "服装", "鞋帽", "家居", "食品", "美妆", "玩具", "文具", "运动用品", "汽车配件"],
    "清洁方式": ["手洗", "机洗", "干洗", "擦拭", "水洗", "不可洗", "专业清洗", "蒸汽清洗", "超声波清洗", "自清洁"],
    "耐用性": ["一次性", "短期使用", "1年内", "1-3年", "3-5年", "5-10年", "10年以上", "超耐用", "易损", "视使用情况"],
    "防水等级": ["不防水", "生活防水", "IPX4", "IPX5", "IPX6", "IPX7", "IPX8", "完全防水", "防泼溅", "定制防水"],
    "噪音等级": ["无声", "<20dB", "20-40dB", "40-60dB", "60-80dB", "80-100dB", "100dB以上", "低噪", "静音", "高噪"],
    "能耗等级": ["A+++", "A++", "A+", "A", "B", "C", "D", "E", "无能耗", "超低能耗"],
    "安装方式": ["免安装", "自助安装", "专业安装", "壁挂", "落地", "嵌入式", "便携", "固定", "模块化", "定制安装"],
    "灯光类型": ["无灯光", "LED", "白炽灯", "荧光灯", "RGB", "暖光", "冷光", "可调光", "氛围灯", "智能灯"],
    "连接方式": ["有线", "无线", "蓝牙", "WiFi", "NFC", "USB", "红外", "Zigbee", "双连接", "多连接"],
    "控制方式": ["手动", "遥控", "语音", "APP", "触摸", "按键", "感应", "自动", "智能", "混合控制"],
    "适用设备": ["手机", "平板", "电脑", "电视", "相机", "游戏机", "音响", "通用", "专用", "多设备"],
    "语言支持": ["中文", "英文", "多语言", "日文", "韩文", "法文", "德文", "西班牙文", "俄文", "无语言"],
    "版本类型": ["基础版", "标准版", "高级版", "专业版", "旗舰版", "限量版", "定制版", "测试版", "开发版", "收藏版"],
    "更新频率": ["每日", "每周", "每月", "每季", "每年", "不定期", "无更新", "实时", "手动更新", "自动更新"],
    "安全等级": ["低", "中", "高", "超高", "军用级", "民用级", "商业级", "基础保护", "多重保护", "无保护"],
    "环保等级": ["无环保", "低环保", "中环保", "高环保", "全环保", "可回收", "可降解", "零排放", "节能", "绿色认证"],
    "定制选项": ["不可定制", "颜色定制", "尺寸定制", "图案定制", "功能定制", "全定制", "部分定制", "限量定制", "个性化", "无定制"],
    "认证机构": ["国家标准", "国际标准", "第三方认证", "品牌认证", "无认证", "ISO9001", "CE认证", "UL认证", "RoHS", "其他认证"]
};

// 电商标签（30个一级标签）
const ecommerceTags = [
    "货到付款", "不计免赔", "包邮", "正品保证", "7天退换", "快速发货", "官方授权", "限时折扣", "满额减免", "新品首发",
    "热销推荐", "高性价比", "环保材料", "手工制作", "支持定制", "买家秀", "好评如潮", "库存充足", "现货供应", "预售特惠",
    "会员专享", "闪购特价", "节日礼品", "跨境直邮", "本地仓发", "无忧售后", "品质认证", "时尚潮流", "经典款式", "稀缺库存"
];

const articleCategories = [
    { name: 'Technology', sub: ['Artificial Intelligence', 'Blockchain', 'Cloud Computing', 'Internet of Things', '5G Technology', 'Big Data', 'Virtual Reality'] },
    { name: 'Lifestyle', sub: ['Health & Wellness', 'Food & Cooking', 'Home Decor', 'Fashion Trends', 'Travel Tips', 'Pet Care', 'Sustainable Living'] },
    { name: 'Finance', sub: ['Investing & Wealth', 'Stock Market', 'Cryptocurrency', 'Startup Stories', 'Economic Trends', 'Personal Finance', 'Tax Planning', 'Real Estate'] },
    { name: 'Entertainment', sub: ['Movie Reviews', 'Music Picks', 'Gaming Guides', 'Celebrity Gossip', 'TV Shows', 'Anime Culture', 'Live Streaming'] },
    { name: 'Education', sub: ['Online Learning', 'Career Skills', 'Language Learning', 'Exam Prep', 'Kids Education', 'Higher Education', 'Lifelong Learning', 'Coding Basics'] },
    { name: 'Sports', sub: ['Football Updates', 'Basketball Insights', 'Fitness Tutorials', 'Outdoor Sports', 'Esports', 'Olympics News', 'Running Tips'] },
    { name: 'Culture', sub: ['History Tales', 'Art Appreciation', 'Literary Reviews', 'Traditional Culture', 'Modern Art', 'Museum Tours', 'Philosophy Thoughts', 'Religion Studies'] },
    { name: 'News', sub: ['Global News', 'Local Updates', 'Tech Briefs', 'Finance Digest', 'Entertainment Highlights', 'Sports Roundup', 'Social Issues', 'Breaking News'] },
    { name: 'Community', sub: ['User Stories', 'Experience Sharing', 'Q&A Discussions', 'Interest Groups', 'Event Recaps', 'Volunteer Logs', 'Forum Highlights'] },
    { name: 'Career', sub: ['Job Hunting Tips', 'Workplace Stories', 'Industry Insights', 'Remote Work', 'Leadership Skills', 'Team Management', 'Career Planning', 'Startup Ideas'] }
];

// 从 hotPlatforms 随机选取 20-50 个平台名称和 logo
function getRandomPlatforms(min, max) {
    const count = Math.floor(Math.random() * (max - min + 1)) + min;
    const shuffled = hotPlatforms.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count).map(platform => ({ name: platform.name, logo: platform.logo }));
}

// 更新 services 数据，随机附带 hotPlatforms 中的名称和 logo
const services = [
    { name: 'Social Media', sub: getRandomPlatforms(hotPlatforms.length * 0.4, hotPlatforms.length) },
    { name: 'Social Accounts', sub: getRandomPlatforms(hotPlatforms.length * 0.4, hotPlatforms.length) },
    { name: 'SEO & SEM', sub: getRandomPlatforms(hotPlatforms.length * 0.4, hotPlatforms.length) },
    { name: 'Ecommerce', sub: getRandomPlatforms(hotPlatforms.length * 0.4, hotPlatforms.length) },
    { name: 'Gaming', sub: getRandomPlatforms(hotPlatforms.length * 0.4, hotPlatforms.length) },
    { name: 'Content', sub: getRandomPlatforms(hotPlatforms.length * 0.4, hotPlatforms.length) },
    { name: 'Design', sub: getRandomPlatforms(hotPlatforms.length * 0.4, hotPlatforms.length) },
    { name: 'Promotion & Ads', sub: getRandomPlatforms(hotPlatforms.length * 0.4, hotPlatforms.length) },
    { name: 'Trading', sub: getRandomPlatforms(hotPlatforms.length * 0.4, hotPlatforms.length) },
    { name: 'Mobile Apps', sub: getRandomPlatforms(hotPlatforms.length * 0.4, hotPlatforms.length) },
    { name: 'Soft Develop', sub: getRandomPlatforms(hotPlatforms.length * 0.4, hotPlatforms.length) },
    { name: 'Cloud Service', sub: getRandomPlatforms(hotPlatforms.length * 0.4, hotPlatforms.length) },
    { name: 'Security', sub: getRandomPlatforms(hotPlatforms.length * 0.4, hotPlatforms.length) }
];

const tagColors = ['ant-tag-blue', 'ant-tag-green', 'ant-tag-orange', 'ant-tag-red', 'ant-tag-purple', 'ant-tag-cyan'];

// 生成服务菜单（调整为横向分组，每 3 个字母）
function generateServiceMenu() {
    const menu = document.getElementById('menu2');

    const menuLevel1 = document.querySelectorAll('.menu2 .level-1');
    if (menuLevel1.length > 0){
        return
    }
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


// 导出新增数据
window.generateServiceMenu = generateServiceMenu;
window.ecommerceAttributes = ecommerceAttributes;
window.ecommerceTags = ecommerceTags;
window.hotPlatforms = hotPlatforms;
window.services = services;