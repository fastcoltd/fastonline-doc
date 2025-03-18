
// 热门平台样本数据：全球 Top 50 科技平台（真实数据）
const hotBrands = [
    { logo: 'https://logo.clearbit.com/facebook.com', name: 'Facebook', link: 'brand-list.html?name=Facebook', home: 'https://facebook.com', parentCompany: 'Meta', description: 'Social networking platform for connecting people globally.', themeColor: '#1877F2' }, // Facebook Blue
    { logo: 'https://logo.clearbit.com/google.com', name: 'Google', link: 'brand-list.html?name=Google', home: 'https://google.com', parentCompany: 'Alphabet', description: 'Search engine and tech giant offering diverse services.', themeColor: '#4285F4' }, // Google Blue
    { logo: 'https://logo.clearbit.com/twitter.com', name: 'Twitter', link: 'brand-list.html?name=Twitter', home: 'https://twitter.com', parentCompany: 'X Corp', description: 'Microblogging platform for real-time updates.', themeColor: '#1DA1F2' }, // Twitter Blue
    { logo: 'https://logo.clearbit.com/tiktok.com', name: 'TikTok', link: 'brand-list.html?name=TikTok', home: 'https://tiktok.com', parentCompany: 'ByteDance', description: 'Short-form video sharing and creation app.', themeColor: '#000000' }, // TikTok Black
    { logo: 'https://logo.clearbit.com/instagram.com', name: 'Instagram', link: 'brand-list.html?name=Instagram', home: 'https://instagram.com', parentCompany: 'Meta', description: 'Photo and video sharing social network.', themeColor: '#E1306C' }, // Instagram Pink/Purple
    { logo: 'https://logo.clearbit.com/youtube.com', name: 'YouTube', link: 'brand-list.html?name=YouTube', home: 'https://youtube.com', parentCompany: 'Alphabet', description: 'Video streaming and sharing platform.', themeColor: '#FF0000' }, // YouTube Red
    { logo: 'https://logo.clearbit.com/amazon.com', name: 'Amazon', link: 'brand-list.html?name=Amazon', home: 'https://amazon.com', parentCompany: 'Amazon', description: 'E-commerce and cloud computing leader.', themeColor: '#FF9900' }, // Amazon Orange
    { logo: 'https://logo.clearbit.com/microsoft.com', name: 'Microsoft', link: 'brand-list.html?name=Microsoft', home: 'https://microsoft.com', parentCompany: 'Microsoft', description: 'Software, hardware, and cloud services provider.', themeColor: '#00A4EF' }, // Microsoft Blue
    { logo: 'https://logo.clearbit.com/apple.com', name: 'Apple', link: 'brand-list.html?name=Apple', home: 'https://apple.com', parentCompany: 'Apple', description: 'Consumer electronics and software innovator.', themeColor: '#000000' }, // Apple Black
    { logo: 'https://logo.clearbit.com/linkedin.com', name: 'LinkedIn', link: 'brand-list.html?name=LinkedIn', home: 'https://linkedin.com', parentCompany: 'Microsoft', description: 'Professional networking and career platform.', themeColor: '#0A66C2' }, // LinkedIn Blue
    { logo: 'https://logo.clearbit.com/netflix.com', name: 'Netflix', link: 'brand-list.html?name=Netflix', home: 'https://netflix.com', parentCompany: 'Netflix', description: 'Streaming service for movies and TV shows.', themeColor: '#E50914' }, // Netflix Red
    { logo: 'https://logo.clearbit.com/spotify.com', name: 'Spotify', link: 'brand-list.html?name=Spotify', home: 'https://spotify.com', parentCompany: 'Spotify', description: 'Music and podcast streaming service.', themeColor: '#1DB954' }, // Spotify Green
    { logo: 'https://logo.clearbit.com/pinterest.com', name: 'Pinterest', link: 'brand-list.html?name=Pinterest', home: 'https://pinterest.com', parentCompany: 'Pinterest', description: 'Visual discovery and inspiration platform.', themeColor: '#E60023' }, // Pinterest Red
    { logo: 'https://logo.clearbit.com/snapchat.com', name: 'Snapchat', link: 'brand-list.html?name=Snapchat', home: 'https://snapchat.com', parentCompany: 'Snap Inc.', description: 'Multimedia messaging app with disappearing content.', themeColor: '#FFFC00' }, // Snapchat Yellow
    { logo: 'https://logo.clearbit.com/whatsapp.com', name: 'WhatsApp', link: 'brand-list.html?name=WhatsApp', home: 'https://whatsapp.com', parentCompany: 'Meta', description: 'Secure messaging and calling app.', themeColor: '#25D366' }, // WhatsApp Green
    { logo: 'https://logo.clearbit.com/reddit.com', name: 'Reddit', link: 'brand-list.html?name=Reddit', home: 'https://reddit.com', parentCompany: 'Reddit', description: 'Community-driven discussion and content platform.', themeColor: '#FF4500' }, // Reddit Orange
    { logo: 'https://logo.clearbit.com/discord.com', name: 'Discord', link: 'brand-list.html?name=Discord', home: 'https://discord.com', parentCompany: 'Discord', description: 'Chat app for gaming and communities.', themeColor: '#5865F2' }, // Discord Purple/Blue
    { logo: 'https://logo.clearbit.com/telegram.org', name: 'Telegram', link: 'brand-list.html?name=Telegram', home: 'https://telegram.org', parentCompany: 'Telegram', description: 'Privacy-focused messaging app.', themeColor: '#0088CC' }, // Telegram Blue
    { logo: 'https://logo.clearbit.com/twitch.tv', name: 'Twitch', link: 'brand-list.html?name=Twitch', home: 'https://twitch.tv', parentCompany: 'Amazon', description: 'Live streaming platform for gamers.', themeColor: '#9146FF' }, // Twitch Purple
    { logo: 'https://logo.clearbit.com/slack.com', name: 'Slack', link: 'brand-list.html?name=Slack', home: 'https://slack.com', parentCompany: 'Salesforce', description: 'Team communication and collaboration tool.', themeColor: '#4A154B' }, // Slack Purple
    { logo: 'https://logo.clearbit.com/dropbox.com', name: 'Dropbox', link: 'brand-list.html?name=Dropbox', home: 'https://dropbox.com', parentCompany: 'Dropbox', description: 'Cloud storage and file-sharing service.', themeColor: '#0061FF' }, // Dropbox Blue
    { logo: 'https://logo.clearbit.com/zoom.us', name: 'Zoom', link: 'brand-list.html?name=Zoom', home: 'https://zoom.us', parentCompany: 'Zoom', description: 'Video conferencing and remote meeting platform.', themeColor: '#2D8CFF' }, // Zoom Blue
    { logo: 'https://logo.clearbit.com/ebay.com', name: 'eBay', link: 'brand-list.html?name=eBay', home: 'https://ebay.com', parentCompany: 'eBay', description: 'Online marketplace for buying and selling.', themeColor: '#E53238' }, // eBay Red
    { logo: 'https://logo.clearbit.com/paypal.com', name: 'PayPal', link: 'brand-list.html?name=PayPal', home: 'https://paypal.com', parentCompany: 'PayPal', description: 'Online payment and money transfer service.', themeColor: '#003087' }, // PayPal Blue
    { logo: 'https://logo.clearbit.com/adobe.com', name: 'Adobe', link: 'brand-list.html?name=Adobe', home: 'https://adobe.com', parentCompany: 'Adobe', description: 'Creative software and digital tools provider.', themeColor: '#FF0000' }, // Adobe Red
    { logo: 'https://logo.clearbit.com/shopify.com', name: 'Shopify', link: 'brand-list.html?name=Shopify', home: 'https://shopify.com', parentCompany: 'Shopify', description: 'E-commerce platform for online stores.', themeColor: '#96BF48' }, // Shopify Green
    { logo: 'https://logo.clearbit.com/salesforce.com', name: 'Salesforce', link: 'brand-list.html?name=Salesforce', home: 'https://salesforce.com', parentCompany: 'Salesforce', description: 'CRM and cloud-based business solutions.', themeColor: '#00A1E0' }, // Salesforce Blue
    { logo: 'https://logo.clearbit.com/uber.com', name: 'Uber', link: 'brand-list.html?name=Uber', home: 'https://uber.com', parentCompany: 'Uber', description: 'Ride-hailing and delivery service platform.', themeColor: '#000000' }, // Uber Black
    { logo: 'https://logo.clearbit.com/airbnb.com', name: 'Airbnb', link: 'brand-list.html?name=Airbnb', home: 'https://airbnb.com', parentCompany: 'Airbnb', description: 'Vacation rental and travel booking platform.', themeColor: '#FF5A5F' }, // Airbnb Red/Pink
    { logo: 'https://logo.clearbit.com/tesla.com', name: 'Tesla', link: 'brand-list.html?name=Tesla', home: 'https://tesla.com', parentCompany: 'Tesla', description: 'Electric vehicles and energy solutions.', themeColor: '#CC0000' }, // Tesla Red
    { logo: 'https://logo.clearbit.com/oracle.com', name: 'Oracle', link: 'brand-list.html?name=Oracle', home: 'https://oracle.com', parentCompany: 'Oracle', description: 'Enterprise software and cloud solutions.', themeColor: '#F80000' }, // Oracle Red
    { logo: 'https://logo.clearbit.com/ibm.com', name: 'IBM', link: 'brand-list.html?name=IBM', home: 'https://ibm.com', parentCompany: 'IBM', description: 'Technology and consulting services provider.', themeColor: '#006699' }, // IBM Blue
    { logo: 'https://logo.clearbit.com/cisco.com', name: 'Cisco', link: 'brand-list.html?name=Cisco', home: 'https://cisco.com', parentCompany: 'Cisco', description: 'Networking hardware and software solutions.', themeColor: '#1BA0D7' }, // Cisco Blue
    { logo: 'https://logo.clearbit.com/intel.com', name: 'Intel', link: 'brand-list.html?name=Intel', home: 'https://intel.com', parentCompany: 'Intel', description: 'Semiconductor and processor manufacturer.', themeColor: '#0071C5' }, // Intel Blue
    { logo: 'https://logo.clearbit.com/nvidia.com', name: 'NVIDIA', link: 'brand-list.html?name=NVIDIA', home: 'https://nvidia.com', parentCompany: 'NVIDIA', description: 'Graphics processing units and AI tech.', themeColor: '#76B900' }, // NVIDIA Green
    { logo: 'https://logo.clearbit.com/dell.com', name: 'Dell', link: 'brand-list.html?name=Dell', home: 'https://dell.com', parentCompany: 'Dell Technologies', description: 'Computers and IT infrastructure provider.', themeColor: '#0085C3' }, // Dell Blue
    { logo: 'https://logo.clearbit.com/hp.com', name: 'HP', link: 'brand-list.html?name=HP', home: 'https://hp.com', parentCompany: 'HP Inc.', description: 'Personal computers and printing solutions.', themeColor: '#0096D6' }, // HP Blue
    { logo: 'https://logo.clearbit.com/samsung.com', name: 'Samsung', link: 'brand-list.html?name=Samsung', home: 'https://samsung.com', parentCompany: 'Samsung Group', description: 'Electronics and mobile device leader.', themeColor: '#1428A0' }, // Samsung Blue
    { logo: 'https://logo.clearbit.com/sony.com', name: 'Sony', link: 'brand-list.html?name=Sony', home: 'https://sony.com', parentCompany: 'Sony Group', description: 'Entertainment and electronics innovator.', themeColor: '#000000' }, // Sony Black
    { logo: 'https://logo.clearbit.com/alibaba.com', name: 'Alibaba', link: 'brand-list.html?name=Alibaba', home: 'https://alibaba.com', parentCompany: 'Alibaba Group', description: 'Global e-commerce and cloud services.', themeColor: '#FF6A00' }, // Alibaba Orange
    { logo: 'https://logo.clearbit.com/tencent.com', name: 'Tencent', link: 'brand-list.html?name=Tencent', home: 'https://tencent.com', parentCompany: 'Tencent', description: 'Social media, gaming, and tech conglomerate.', themeColor: '#1478C8' }, // Tencent Blue
    { logo: 'https://logo.clearbit.com/baidu.com', name: 'Baidu', link: 'brand-list.html?name=Baidu', home: 'https://baidu.com', parentCompany: 'Baidu', description: 'Chinese search engine and AI leader.', themeColor: '#2932E1' }, // Baidu Blue
    { logo: 'https://logo.clearbit.com/jd.com', name: 'JD.com', link: 'brand-list.html?name=JD.com', home: 'https://jd.com', parentCompany: 'JD.com', description: 'Chinese e-commerce and logistics platform.', themeColor: '#E62321' }, // JD.com Red
    { logo: 'https://logo.clearbit.com/wechat.com', name: 'WeChat', link: 'brand-list.html?name=WeChat', home: 'https://wechat.com', parentCompany: 'Tencent', description: 'All-in-one messaging and payment app.', themeColor: '#07C160' }, // WeChat Green
    { logo: 'https://logo.clearbit.com/vimeo.com', name: 'Vimeo', link: 'brand-list.html?name=Vimeo', home: 'https://vimeo.com', parentCompany: 'Vimeo', description: 'Video hosting and creative platform.', themeColor: '#1AB7EA' }, // Vimeo Blue
    { logo: 'https://logo.clearbit.com/quora.com', name: 'Quora', link: 'brand-list.html?name=Quora', home: 'https://quora.com', parentCompany: 'Quora', description: 'Question-and-answer knowledge-sharing site.', themeColor: '#B92B27' }, // Quora Red
    { logo: 'https://logo.clearbit.com/stackoverflow.com', name: 'Stack Overflow', link: 'brand-list.html?name=Stack Overflow', home: 'https://stackoverflow.com', parentCompany: 'Stack Exchange', description: 'Developer Q&A and coding community.', themeColor: '#F48024' }, // Stack Overflow Orange
    { logo: 'https://logo.clearbit.com/gitlab.com', name: 'GitLab', link: 'brand-list.html?name=GitLab', home: 'https://gitlab.com', parentCompany: 'GitLab', description: 'DevOps and code collaboration platform.', themeColor: '#FC6D26' }, // GitLab Orange
    { logo: 'https://logo.clearbit.com/github.com', name: 'GitHub', link: 'brand-list.html?name=GitHub', home: 'https://github.com', parentCompany: 'Microsoft', description: 'Code hosting and version control platform.', themeColor: '#000000' }, // GitHub Black
    { logo: 'https://logo.clearbit.com/bitbucket.org', name: 'Bitbucket', link: 'brand-list.html?name=Bitbucket', home: 'https://bitbucket.org', parentCompany: 'Atlassian', description: 'Git repository management for teams.', themeColor: '#0052CC' }, // Bitbucket Blue
    { logo: 'https://logo.clearbit.com/x.com', name: 'X', link: 'brand-list.html?name=X', home: 'https://x.com', parentCompany: 'X Corp', description: 'Social media platform evolving from Twitter.', themeColor: '#000000' }, // X Black
    { logo: 'https://logo.clearbit.com/spacex.com', name: 'SpaceX', link: 'brand-list.html?name=SpaceX', home: 'https://spacex.com', parentCompany: 'SpaceX', description: 'Aerospace company for space exploration.', themeColor: '#000000' }, // SpaceX Black
    { logo: 'https://logo.clearbit.com/openai.com', name: 'OpenAI', link: 'brand-list.html?name=OpenAI', home: 'https://openai.com', parentCompany: 'OpenAI', description: 'AI research org behind ChatGPT.', themeColor: '#10A37F' }, // OpenAI Teal
    { logo: 'https://logo.clearbit.com/xai.com', name: 'xAI', link: 'brand-list.html?name=xAI', home: 'https://xai.com', parentCompany: 'xAI', description: 'AI firm advancing human scientific discovery.', themeColor: '#000000' }, // xAI Black (aligned with X)
    { logo: 'https://logo.clearbit.com/bytedance.com', name: 'ByteDance', link: 'brand-list.html?name=ByteDance', home: 'https://bytedance.com', parentCompany: 'ByteDance', description: 'Parent of TikTok, focused on content tech.', themeColor: '#000000' }, // ByteDance Black (aligned with TikTok)
    { logo: 'https://logo.clearbit.com/epicgames.com', name: 'Epic Games', link: 'brand-list.html?name=Epic Games', home: 'https://epicgames.com', parentCompany: 'Epic Games', description: 'Game developer and store, known for Fortnite.', themeColor: '#000000' }, // Epic Games Black
    { logo: 'https://logo.clearbit.com/robinhood.com', name: 'Robinhood', link: 'brand-list.html?name=Robinhood', home: 'https://robinhood.com', parentCompany: 'Robinhood', description: 'Commission-free trading app.', themeColor: '#00C805' }, // Robinhood Green
    { logo: 'https://logo.clearbit.com/stripe.com', name: 'Stripe', link: 'brand-list.html?name=Stripe', home: 'https://stripe.com', parentCompany: 'Stripe', description: 'Payment processing for online businesses.', themeColor: '#635BFF' }, // Stripe Purple
    { logo: 'https://logo.clearbit.com/binance.com', name: 'Binance', link: 'brand-list.html?name=Binance', home: 'https://binance.com', parentCompany: 'Binance', description: 'Leading cryptocurrency exchange platform.', themeColor: '#F0B90B' }, // Binance Yellow
    { logo: 'https://logo.clearbit.com/coinbase.com', name: 'Coinbase', link: 'brand-list.html?name=Coinbase', home: 'https://coinbase.com', parentCompany: 'Coinbase', description: 'Crypto trading and wallet service.', themeColor: '#0052FF' }, // Coinbase Blue
    { logo: 'https://logo.clearbit.com/notion.so', name: 'Notion', link: 'brand-list.html?name=Notion', home: 'https://notion.so', parentCompany: 'Notion', description: 'All-in-one workspace for productivity.', themeColor: '#000000' }, // Notion Black
    { logo: 'https://logo.clearbit.com/figma.com', name: 'Figma', link: 'brand-list.html?name=Figma', home: 'https://figma.com', parentCompany: 'Adobe', description: 'Collaborative design tool for UI/UX.', themeColor: '#F24E1E' }, // Figma Orange
    { logo: 'https://logo.clearbit.com/canva.com', name: 'Canva', link: 'brand-list.html?name=Canva', home: 'https://canva.com', parentCompany: 'Canva', description: 'Graphic design platform for all users.', themeColor: '#00C4B4' }, // Canva Teal
    { logo: 'https://logo.clearbit.com/trello.com', name: 'Trello', link: 'brand-list.html?name=Trello', home: 'https://trello.com', parentCompany: 'Atlassian', description: 'Task management with boards and cards.', themeColor: '#0079BF' }, // Trello Blue
    { logo: 'https://logo.clearbit.com/asana.com', name: 'Asana', link: 'brand-list.html?name=Asana', home: 'https://asana.com', parentCompany: 'Asana', description: 'Work management for teams.', themeColor: '#F06A6A' }, // Asana Red/Pink
    { logo: 'https://logo.clearbit.com/monday.com', name: 'Monday.com', link: 'brand-list.html?name=Monday.com', home: 'https://monday.com', parentCompany: 'Monday.com', description: 'Customizable team collaboration tool.', themeColor: '#FF3C7E' }, // Monday.com Pink
    { logo: 'https://logo.clearbit.com/atlassian.com', name: 'Atlassian', link: 'brand-list.html?name=Atlassian', home: 'https://atlassian.com', parentCompany: 'Atlassian', description: 'Software tools like Jira and Confluence.', themeColor: '#0052CC' }, // Atlassian Blue
    { logo: 'https://logo.clearbit.com/bitly.com', name: 'Bitly', link: 'brand-list.html?name=Bitly', home: 'https://bitly.com', parentCompany: 'Bitly', description: 'Link shortening and analytics service.', themeColor: '#EE6123' }, // Bitly Orange
    { logo: 'https://logo.clearbit.com/cloudflare.com', name: 'Cloudflare', link: 'brand-list.html?name=Cloudflare', home: 'https://cloudflare.com', parentCompany: 'Cloudflare', description: 'Web security and performance solutions.', themeColor: '#F38020' }, // Cloudflare Orange
    { logo: 'https://logo.clearbit.com/aws.amazon.com', name: 'AWS', link: 'brand-list.html?name=AWS', home: 'https://aws.amazon.com', parentCompany: 'Amazon', description: 'Amazon’s cloud computing platform.', themeColor: '#FF9900' }, // AWS Orange (aligned with Amazon)
    { logo: 'https://logo.clearbit.com/azure.microsoft.com', name: 'Azure', link: 'brand-list.html?name=Azure', home: 'https://azure.microsoft.com', parentCompany: 'Microsoft', description: 'Microsoft’s cloud computing service.', themeColor: '#0078D4' }, // Azure Blue
    { logo: 'https://logo.clearbit.com/gcp.google.com', name: 'Google Cloud', link: 'brand-list.html?name=Google Cloud', home: 'https://cloud.google.com', parentCompany: 'Alphabet', description: 'Google’s cloud infrastructure platform.', themeColor: '#4285F4' }, // Google Cloud Blue (aligned with Google)
    { logo: 'https://logo.clearbit.com/digitalocean.com', name: 'DigitalOcean', link: 'brand-list.html?name=DigitalOcean', home: 'https://digitalocean.com', parentCompany: 'DigitalOcean', description: 'Cloud hosting for developers.', themeColor: '#0080FF' }, // DigitalOcean Blue
    { logo: 'https://logo.clearbit.com/heroku.com', name: 'Heroku', link: 'brand-list.html?name=Heroku', home: 'https://heroku.com', parentCompany: 'Salesforce', description: 'PaaS for easy app deployment.', themeColor: '#6762A6' }, // Heroku Purple
    { logo: 'https://logo.clearbit.com/vercel.com', name: 'Vercel', link: 'brand-list.html?name=Vercel', home: 'https://vercel.com', parentCompany: 'Vercel', description: 'Frontend development and deployment.', themeColor: '#000000' }, // Vercel Black
    { logo: 'https://logo.clearbit.com/netlify.com', name: 'Netlify', link: 'brand-list.html?name=Netlify', home: 'https://netlify.com', parentCompany: 'Netlify', description: 'Static site hosting and automation.', themeColor: '#00C7B7' }, // Netlify Teal
    { logo: 'https://logo.clearbit.com/huggingface.co', name: 'Hugging Face', link: 'brand-list.html?name=Hugging Face', home: 'https://huggingface.co', parentCompany: 'Hugging Face', description: 'AI models and NLP community.', themeColor: '#FFD21E' }, // Hugging Face Yellow
    { logo: 'https://logo.clearbit.com/replit.com', name: 'Replit', link: 'brand-list.html?name=Replit', home: 'https://replit.com', parentCompany: 'Replit', description: 'Online coding and learning platform.', themeColor: '#F26207' }, // Replit Orange
    { logo: 'https://logo.clearbit.com/codepen.io', name: 'CodePen', link: 'brand-list.html?name=CodePen', home: 'https://codepen.io', parentCompany: 'CodePen', description: 'Frontend code showcase tool.', themeColor: '#000000' }, // CodePen Black
    { logo: 'https://logo.clearbit.com/jsfiddle.net', name: 'JSFiddle', link: 'brand-list.html?name=JSFiddle', home: 'https://jsfiddle.net', parentCompany: 'JSFiddle', description: 'Online code testing playground.', themeColor: '#0074D9' }, // JSFiddle Blue
    { logo: 'https://logo.clearbit.com/leetcode.com', name: 'LeetCode', link: 'brand-list.html?name=LeetCode', home: 'https://leetcode.com', parentCompany: 'LeetCode', description: 'Coding practice for interviews.', themeColor: '#FFA116' }, // LeetCode Orange
    { logo: 'https://logo.clearbit.com/hackerrank.com', name: 'HackerRank', link: 'brand-list.html?name=HackerRank', home: 'https://hackerrank.com', parentCompany: 'HackerRank', description: 'Programming challenges and skills.', themeColor: '#2EC866' }, // HackerRank Green
    { logo: 'https://logo.clearbit.com/coursera.org', name: 'Coursera', link: 'brand-list.html?name=Coursera', home: 'https://coursera.org', parentCompany: 'Coursera', description: 'Online courses from top universities.', themeColor: '#0056D2' }, // Coursera Blue
    { logo: 'https://logo.clearbit.com/udemy.com', name: 'Udemy', link: 'brand-list.html?name=Udemy', home: 'https://udemy.com', parentCompany: 'Udemy', description: 'Platform for learning diverse skills.', themeColor: '#A435F0' }, // Udemy Purple
    { logo: 'https://logo.clearbit.com/khanacademy.org', name: 'Khan Academy', link: 'brand-list.html?name=Khan Academy', home: 'https://khanacademy.org', parentCompany: 'Khan Academy', description: 'Free educational resources online.', themeColor: '#14BF96' }, // Khan Academy Teal
    { logo: 'https://logo.clearbit.com/edx.org', name: 'edX', link: 'brand-list.html?name=edX', home: 'https://edx.org', parentCompany: '2U', description: 'Online university courses and certificates.', themeColor: '#02262B' }, // edX Dark Teal
    { logo: 'https://logo.clearbit.com/pluralsight.com', name: 'Pluralsight', link: 'brand-list.html?name=Pluralsight', home: 'https://pluralsight.com', parentCompany: 'Pluralsight', description: 'Tech skills training platform.', themeColor: '#F15B2A' }, // Pluralsight Orange
    { logo: 'https://logo.clearbit.com/skillshare.com', name: 'Skillshare', link: 'brand-list.html?name=Skillshare', home: 'https://skillshare.com', parentCompany: 'Skillshare', description: 'Creative and career learning community.', themeColor: '#00D4B9' }, // Skillshare Teal
    { logo: 'https://logo.clearbit.com/duolingo.com', name: 'Duolingo', link: 'brand-list.html?name=Duolingo', home: 'https://duolingo.com', parentCompany: 'Duolingo', description: 'Gamified language learning app.', themeColor: '#58CC02' }, // Duolingo Green
    { logo: 'https://logo.clearbit.com/medium.com', name: 'Medium', link: 'brand-list.html?name=Medium', home: 'https://medium.com', parentCompany: 'Medium', description: 'Publishing platform for writers.', themeColor: '#000000' }, // Medium Black
    { logo: 'https://logo.clearbit.com/substack.com', name: 'Substack', link: 'brand-list.html?name=Substack', home: 'https://substack.com', parentCompany: 'Substack', description: 'Newsletter and subscription platform.', themeColor: '#FF6719' }, // Substack Orange
    { logo: 'https://logo.clearbit.com/patreon.com', name: 'Patreon', link: 'brand-list.html?name=Patreon', home: 'https://patreon.com', parentCompany: 'Patreon', description: 'Crowdfunding for creators.', themeColor: '#FF424D' }, // Patreon Red
    { logo: 'https://logo.clearbit.com/kickstarter.com', name: 'Kickstarter', link: 'brand-list.html?name=Kickstarter', home: 'https://kickstarter.com', parentCompany: 'Kickstarter', description: 'Crowdfunding for creative projects.', themeColor: '#05CE78' }, // Kickstarter Green
    { logo: 'https://logo.clearbit.com/indiegogo.com', name: 'Indiegogo', link: 'brand-list.html?name=Indiegogo', home: 'https://indiegogo.com', parentCompany: 'Indiegogo', description: 'Platform for innovative product funding.', themeColor: '#EB1478' }, // Indiegogo Pink
    { logo: 'https://logo.clearbit.com/producthunt.com', name: 'Product Hunt', link: 'brand-list.html?name=Product Hunt', home: 'https://producthunt.com', parentCompany: 'Product Hunt', description: 'New product discovery community.', themeColor: '#DA552F' }, // Product Hunt Orange
    { logo: 'https://logo.clearbit.com/dribbble.com', name: 'Dribbble', link: 'brand-list.html?name=Dribbble', home: 'https://dribbble.com', parentCompany: 'Dribbble', description: 'Design portfolio and community.', themeColor: '#EA4C89' }, // Dribbble Pink
    { logo: 'https://logo.clearbit.com/behance.net', name: 'Behance', link: 'brand-list.html?name=Behance', home: 'https://behance.net', parentCompany: 'Adobe', description: 'Creative work showcase platform.', themeColor: '#1769FF' }, // Behance Blue
    { logo: 'https://logo.clearbit.com/deviantart.com', name: 'DeviantArt', link: 'brand-list.html?name=DeviantArt', home: 'https://deviantart.com', parentCompany: 'Wix', description: 'Art community and portfolio site.', themeColor: '#05CC47' }, // DeviantArt Green
    { logo: 'https://logo.clearbit.com/wix.com', name: 'Wix', link: 'brand-list.html?name=Wix', home: 'https://wix.com', parentCompany: 'Wix', description: 'Website builder for all users.', themeColor: '#0C6EFD' }, // Wix Blue
    { logo: 'https://logo.clearbit.com/squarespace.com', name: 'Squarespace', link: 'brand-list.html?name=Squarespace', home: 'https://squarespace.com', parentCompany: 'Squarespace', description: 'Elegant website creation tool.', themeColor: '#000000' }, // Squarespace Black
    { logo: 'https://logo.clearbit.com/wordpress.com', name: 'WordPress', link: 'brand-list.html?name=WordPress', home: 'https://wordpress.com', parentCompany: 'Automattic', description: 'Popular blogging and CMS platform.', themeColor: '#0073AA' }, // WordPress Blue
    { logo: 'https://logo.clearbit.com/tumblr.com', name: 'Tumblr', link: 'brand-list.html?name=Tumblr', home: 'https://tumblr.com', parentCompany: 'Automattic', description: 'Microblogging and social networking.', themeColor: '#36465D' }, // Tumblr Dark Blue
    { logo: 'https://logo.clearbit.com/weebly.com', name: 'Weebly', link: 'brand-list.html?name=Weebly', home: 'https://weebly.com', parentCompany: 'Square', description: 'Simple website and e-commerce builder.', themeColor: '#1A73E8' }, // Weebly Blue
    { logo: 'https://logo.clearbit.com/mailchimp.com', name: 'Mailchimp', link: 'brand-list.html?name=Mailchimp', home: 'https://mailchimp.com', parentCompany: 'Intuit', description: 'Email marketing and automation tool.', themeColor: '#FFE01B' }, // Mailchimp Yellow
    { logo: 'https://logo.clearbit.com/hubspot.com', name: 'HubSpot', link: 'brand-list.html?name=HubSpot', home: 'https://hubspot.com', parentCompany: 'HubSpot', description: 'CRM and marketing software.', themeColor: '#FF7A59' }, // HubSpot Orange
    { logo: 'https://logo.clearbit.com/zendesk.com', name: 'Zendesk', link: 'brand-list.html?name=Zendesk', home: 'https://zendesk.com', parentCompany: 'Zendesk', description: 'Customer service and support platform.', themeColor: '#03363D' }, // Zendesk Teal
    { logo: 'https://logo.clearbit.com/intercom.com', name: 'Intercom', link: 'brand-list.html?name=Intercom', home: 'https://intercom.com', parentCompany: 'Intercom', description: 'Customer messaging and support tool.', themeColor: '#1F8DED' }, // Intercom Blue
    { logo: 'https://logo.clearbit.com/freshdesk.com', name: 'Freshdesk', link: 'brand-list.html?name=Freshdesk', home: 'https://freshdesk.com', parentCompany: 'Freshworks', description: 'Cloud-based customer support software.', themeColor: '#FF6D00' }, // Freshdesk Orange
    { logo: 'https://logo.clearbit.com/zoho.com', name: 'Zoho', link: 'brand-list.html?name=Zoho', home: 'https://zoho.com', parentCompany: 'Zoho Corporation', description: 'Suite of business and productivity apps.', themeColor: '#D81E05' }, // Zoho Red
    { logo: 'https://logo.clearbit.com/okta.com', name: 'Okta', link: 'brand-list.html?name=Okta', home: 'https://okta.com', parentCompany: 'Okta', description: 'Identity and access management service.', themeColor: '#007DC1' }, // Okta Blue
    { logo: 'https://logo.clearbit.com/auth0.com', name: 'Auth0', link: 'brand-list.html?name=Auth0', home: 'https://auth0.com', parentCompany: 'Okta', description: 'Authentication and authorization platform.', themeColor: '#EB5424' }, // Auth0 Orange
    { logo: 'https://logo.clearbit.com/1password.com', name: '1Password', link: 'brand-list.html?name=1Password', home: 'https://1password.com', parentCompany: '1Password', description: 'Password manager for security.', themeColor: '#1C2526' }, // 1Password Dark Blue
    { logo: 'https://logo.clearbit.com/lastpass.com', name: 'LastPass', link: 'brand-list.html?name=LastPass', home: 'https://lastpass.com', parentCompany: 'GoTo', description: 'Password management and security tool.', themeColor: '#D32D27' }, // LastPass Red
    { logo: 'https://logo.clearbit.com/dashlane.com', name: 'Dashlane', link: 'brand-list.html?name=Dashlane', home: 'https://dashlane.com', parentCompany: 'Dashlane', description: 'Password and identity management.', themeColor: '#007CFF' }, // Dashlane Blue
    { logo: 'https://logo.clearbit.com/bitwarden.com', name: 'Bitwarden', link: 'brand-list.html?name=Bitwarden', home: 'https://bitwarden.com', parentCompany: 'Bitwarden', description: 'Open-source password manager.', themeColor: '#175DDC' }, // Bitwarden Blue
    { logo: 'https://logo.clearbit.com/nordvpn.com', name: 'NordVPN', link: 'brand-list.html?name=NordVPN', home: 'https://nordvpn.com', parentCompany: 'Nord Security', description: 'VPN service for privacy.', themeColor: '#4680FF' }, // NordVPN Blue
    { logo: 'https://logo.clearbit.com/expressvpn.com', name: 'ExpressVPN', link: 'brand-list.html?name=ExpressVPN', home: 'https://expressvpn.com', parentCompany: 'Kape Technologies', description: 'High-speed VPN for security.', themeColor: '#F42C4C' }, // ExpressVPN Red
    { logo: 'https://logo.clearbit.com/proton.me', name: 'ProtonMail', link: 'brand-list.html?name=ProtonMail', home: 'https://proton.me', parentCompany: 'Proton', description: 'Encrypted email service.', themeColor: '#6D4AFF' }, // ProtonMail Purple
    { logo: 'https://logo.clearbit.com/signal.org', name: 'Signal', link: 'brand-list.html?name=Signal', home: 'https://signal.org', parentCompany: 'Signal Foundation', description: 'Private messaging app.', themeColor: '#3A76F5' }, // Signal Blue
    { logo: 'https://logo.clearbit.com/teams.microsoft.com', name: 'Microsoft Teams', link: 'brand-list.html?name=Microsoft Teams', home: 'https://teams.microsoft.com', parentCompany: 'Microsoft', description: 'Collaboration and chat for teams.', themeColor: '#6264A7' }, // Microsoft Teams Purple
    { logo: 'https://logo.clearbit.com/webex.com', name: 'Webex', link: 'brand-list.html?name=Webex', home: 'https://webex.com', parentCompany: 'Cisco', description: 'Video conferencing and collaboration.', themeColor: '#00A68F' }, // Webex Teal
    { logo: 'https://logo.clearbit.com/gotomeeting.com', name: 'GoToMeeting', link: 'brand-list.html?name=GoToMeeting', home: 'https://gotomeeting.com', parentCompany: 'GoTo', description: 'Online meeting and webinar tool.', themeColor: '#F68F1E' }, // GoToMeeting Orange
    { logo: 'https://logo.clearbit.com/skype.com', name: 'Skype', link: 'brand-list.html?name=Skype', home: 'https://skype.com', parentCompany: 'Microsoft', description: 'Video and voice calling app.', themeColor: '#00AFF0' }, // Skype Blue
    { logo: 'https://logo.clearbit.com/meet.google.com', name: 'Google Meet', link: 'brand-list.html?name=Google Meet', home: 'https://meet.google.com', parentCompany: 'Alphabet', description: 'Video conferencing by Google.', themeColor: '#00897B' }, // Google Meet Teal
    { logo: 'https://logo.clearbit.com/loom.com', name: 'Loom', link: 'brand-list.html?name=Loom', home: 'https://loom.com', parentCompany: 'Loom', description: 'Video messaging for work.', themeColor: '#6257FE' }, // Loom Purple
    { logo: 'https://logo.clearbit.com/calendly.com', name: 'Calendly', link: 'brand-list.html?name=Calendly', home: 'https://calendly.com', parentCompany: 'Calendly', description: 'Scheduling and appointment booking.', themeColor: '#006BFF' }, // Calendly Blue
    { logo: 'https://logo.clearbit.com/docusign.com', name: 'DocuSign', link: 'brand-list.html?name=DocuSign', home: 'https://docusign.com', parentCompany: 'DocuSign', description: 'Electronic signature and agreements.', themeColor: '#0057D2' }, // DocuSign Blue
    { logo: 'https://logo.clearbit.com/hellosign.com', name: 'HelloSign', link: 'brand-list.html?name=HelloSign', home: 'https://hellosign.com', parentCompany: 'Dropbox', description: 'E-signature and document tool.', themeColor: '#00A94F' }, // HelloSign Green
    { logo: 'https://logo.clearbit.com/evernote.com', name: 'Evernote', link: 'brand-list.html?name=Evernote', home: 'https://evernote.com', parentCompany: 'Bending Spoons', description: 'Note-taking and organization app.', themeColor: '#00A82D' }, // Evernote Green
    { logo: 'https://logo.clearbit.com/onenote.com', name: 'OneNote', link: 'brand-list.html?name=OneNote', home: 'https://onenote.com', parentCompany: 'Microsoft', description: 'Digital note-taking by Microsoft.', themeColor: '#7719AA' }, // OneNote Purple
    { logo: 'https://logo.clearbit.com/todoist.com', name: 'Todoist', link: 'brand-list.html?name=Todoist', home: 'https://todoist.com', parentCompany: 'Doist', description: 'Task management and to-do app.', themeColor: '#E44332' }, // Todoist Red
    { logo: 'https://logo.clearbit.com/wunderlist.com', name: 'Wunderlist', link: 'brand-list.html?name=Wunderlist', home: 'https://wunderlist.com', parentCompany: 'Microsoft', description: 'Task list app (now part of To Do).', themeColor: '#2B96F1' }, // Wunderlist Blue
    { logo: 'https://logo.clearbit.com/clickup.com', name: 'ClickUp', link: 'brand-list.html?name=ClickUp', home: 'https://clickup.com', parentCompany: 'ClickUp', description: 'All-in-one productivity platform.', themeColor: '#7B68EE' }, // ClickUp Purple
    { logo: 'https://logo.clearbit.com/airtable.com', name: 'Airtable', link: 'brand-list.html?name=Airtable', home: 'https://airtable.com', parentCompany: 'Airtable', description: 'Spreadsheet-database hybrid tool.', themeColor: '#18BFFF' }, // Airtable Blue
    { logo: 'https://logo.clearbit.com/smartsheet.com', name: 'Smartsheet', link: 'brand-list.html?name=Smartsheet', home: 'https://smartsheet.com', parentCompany: 'Smartsheet', description: 'Collaborative work management.', themeColor: '#00A859' }, // Smartsheet Green
    { logo: 'https://logo.clearbit.com/basecamp.com', name: 'Basecamp', link: 'brand-list.html?name=Basecamp', home: 'https://basecamp.com', parentCompany: 'Basecamp', description: 'Project management and team tool.', themeColor: '#1D2D44' }, // Basecamp Dark Blue
    { logo: 'https://logo.clearbit.com/jira.com', name: 'Jira', link: 'brand-list.html?name=Jira', home: 'https://jira.com', parentCompany: 'Atlassian', description: 'Issue tracking for software teams.', themeColor: '#0052CC' }, // Jira Blue (aligned with Atlassian)
    { logo: 'https://logo.clearbit.com/confluence.com', name: 'Confluence', link: 'brand-list.html?name=Confluence', home: 'https://confluence.com', parentCompany: 'Atlassian', description: 'Team workspace for documentation.', themeColor: '#172B4D' }, // Confluence Dark Blue
    { logo: 'https://logo.clearbit.com/servicenow.com', name: 'ServiceNow', link: 'brand-list.html?name=ServiceNow', home: 'https://servicenow.com', parentCompany: 'ServiceNow', description: 'IT service management platform.', themeColor: '#000000' }, // ServiceNow Black
    { logo: 'https://logo.clearbit.com/splunk.com', name: 'Splunk', link: 'brand-list.html?name=Splunk', home: 'https://splunk.com', parentCompany: 'Cisco', description: 'Data analytics and monitoring tool.', themeColor: '#FF2C35' }, // Splunk Red
    { logo: 'https://logo.clearbit.com/datadog.com', name: 'Datadog', link: 'brand-list.html?name=Datadog', home: 'https://datadog.com', parentCompany: 'Datadog', description: 'Cloud monitoring and analytics.', themeColor: '#7745FF' }, // Datadog Purple
    { logo: 'https://logo.clearbit.com/newrelic.com', name: 'New Relic', link: 'brand-list.html?name=New Relic', home: 'https://newrelic.com', parentCompany: 'New Relic', description: 'Application performance monitoring.', themeColor: '#00AC69' }, // New Relic Green
    { logo: 'https://logo.clearbit.com/elastic.co', name: 'Elastic', link: 'brand-list.html?name=Elastic', home: 'https://elastic.co', parentCompany: 'Elastic', description: 'Search and analytics engine.', themeColor: '#FFC107' }, // Elastic Yellow
    { logo: 'https://logo.clearbit.com/snowflake.com', name: 'Snowflake', link: 'brand-list.html?name=Snowflake', home: 'https://snowflake.com', parentCompany: 'Snowflake', description: 'Cloud data platform.', themeColor: '#29A1F5' }, // Snowflake Blue
    { logo: 'https://logo.clearbit.com/tableau.com', name: 'Tableau', link: 'brand-list.html?name=Tableau', home: 'https://tableau.com', parentCompany: 'Salesforce', description: 'Data visualization and analytics.', themeColor: '#E97627' }, // Tableau Orange
    { logo: 'https://logo.clearbit.com/powerbi.microsoft.com', name: 'Power BI', link: 'brand-list.html?name=Power BI', home: 'https://powerbi.microsoft.com', parentCompany: 'Microsoft', description: 'Business intelligence by Microsoft.', themeColor: '#F2C811' }, // Power BI Yellow
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

const demandStatusColors = {
    '通过': '#32CD32',        // 绿色
    '已交定金': '#FFD700',    // 金色
    '暂未开始': '#A9A9A9',    // 灰色
    '竞标中': '#1E90FF',      // 蓝色
    '已中标': '#32CD32',      // 绿色
    '已付尾款': '#FFD700',    // 金色
    '已交付': '#32CD32',      // 绿色
    '需求完成': '#32CD32',    // 绿色
    '评价完成': '#32CD32',    // 绿色
    '需求过期': '#FF4500',    // 橙红色
    '已退款': '#FF4500',      // 橙红色
    '客户关闭': '#FF4500',    // 橙红色
    '已废弃': '#FF4500'       // 橙红色
};

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

// 从 hotBrands 随机选取 20-50 个平台名称和 logo
function getRandomPlatforms(min, max) {
    const count = Math.floor(Math.random() * (max - min + 1)) + min;
    const shuffled = hotBrands.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count).map(platform => ({ name: platform.name, logo: platform.logo }));
}

// 更新 services 数据，随机附带 hotBrands 中的名称和 logo
const services = [
    { name: 'Social Media', sub: getRandomPlatforms(hotBrands.length * 0.4, hotBrands.length) },
    { name: 'Social Accounts', sub: getRandomPlatforms(hotBrands.length * 0.4, hotBrands.length) },
    { name: 'SEO & SEM', sub: getRandomPlatforms(hotBrands.length * 0.4, hotBrands.length) },
    { name: 'Ecommerce', sub: getRandomPlatforms(hotBrands.length * 0.4, hotBrands.length) },
    { name: 'Gaming', sub: getRandomPlatforms(hotBrands.length * 0.4, hotBrands.length) },
    { name: 'Content', sub: getRandomPlatforms(hotBrands.length * 0.4, hotBrands.length) },
    { name: 'Design', sub: getRandomPlatforms(hotBrands.length * 0.4, hotBrands.length) },
    { name: 'Promotion & Ads', sub: getRandomPlatforms(hotBrands.length * 0.4, hotBrands.length) },
    { name: 'Trading', sub: getRandomPlatforms(hotBrands.length * 0.4, hotBrands.length) },
    { name: 'Mobile Apps', sub: getRandomPlatforms(hotBrands.length * 0.4, hotBrands.length) },
    { name: 'Soft Develop', sub: getRandomPlatforms(hotBrands.length * 0.4, hotBrands.length) },
    { name: 'Cloud Service', sub: getRandomPlatforms(hotBrands.length * 0.4, hotBrands.length) },
    { name: 'Security', sub: getRandomPlatforms(hotBrands.length * 0.4, hotBrands.length) }
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
                        subHtml += `<a href="brand-list.html?services=${cat.name}&name=${item.name}" class="platform-item"><img src="${item.logo}" alt="${item.name}" class="platform-logo">${item.name}</a>`;
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
window.hotBrands = hotBrands;
window.services = services;