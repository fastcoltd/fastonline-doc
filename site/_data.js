
// 热门平台样本数据：全球 Top 50 科技平台（真实数据）
const hotBrands = [
    { logo: 'https://logo.clearbit.com/facebook.com', name: 'Facebook', link: 'brand.html?name=Facebook', home: 'https://facebook.com', parentCompany: 'Meta', description: 'Social networking platform for connecting people globally.', themeColor: '#1877F2' }, // Facebook Blue
    { logo: 'https://logo.clearbit.com/google.com', name: 'Google', link: 'brand.html?name=Google', home: 'https://google.com', parentCompany: 'Alphabet', description: 'Search engine and tech giant offering diverse services.', themeColor: '#4285F4' }, // Google Blue
    { logo: 'https://logo.clearbit.com/twitter.com', name: 'Twitter', link: 'brand.html?name=Twitter', home: 'https://twitter.com', parentCompany: 'X Corp', description: 'Microblogging platform for real-time updates.', themeColor: '#1DA1F2' }, // Twitter Blue
    { logo: 'https://logo.clearbit.com/tiktok.com', name: 'TikTok', link: 'brand.html?name=TikTok', home: 'https://tiktok.com', parentCompany: 'ByteDance', description: 'Short-form video sharing and creation app.', themeColor: '#000000' }, // TikTok Black
    { logo: 'https://logo.clearbit.com/instagram.com', name: 'Instagram', link: 'brand.html?name=Instagram', home: 'https://instagram.com', parentCompany: 'Meta', description: 'Photo and video sharing social network.', themeColor: '#E1306C' }, // Instagram Pink/Purple
    { logo: 'https://logo.clearbit.com/youtube.com', name: 'YouTube', link: 'brand.html?name=YouTube', home: 'https://youtube.com', parentCompany: 'Alphabet', description: 'Video streaming and sharing platform.', themeColor: '#FF0000' }, // YouTube Red
    { logo: 'https://logo.clearbit.com/amazon.com', name: 'Amazon', link: 'brand.html?name=Amazon', home: 'https://amazon.com', parentCompany: 'Amazon', description: 'E-commerce and cloud computing leader.', themeColor: '#FF9900' }, // Amazon Orange
    { logo: 'https://logo.clearbit.com/microsoft.com', name: 'Microsoft', link: 'brand.html?name=Microsoft', home: 'https://microsoft.com', parentCompany: 'Microsoft', description: 'Software, hardware, and cloud services provider.', themeColor: '#00A4EF' }, // Microsoft Blue
    { logo: 'https://logo.clearbit.com/apple.com', name: 'Apple', link: 'brand.html?name=Apple', home: 'https://apple.com', parentCompany: 'Apple', description: 'Consumer electronics and software innovator.', themeColor: '#000000' }, // Apple Black
    { logo: 'https://logo.clearbit.com/linkedin.com', name: 'LinkedIn', link: 'brand.html?name=LinkedIn', home: 'https://linkedin.com', parentCompany: 'Microsoft', description: 'Professional networking and career platform.', themeColor: '#0A66C2' }, // LinkedIn Blue
    { logo: 'https://logo.clearbit.com/netflix.com', name: 'Netflix', link: 'brand.html?name=Netflix', home: 'https://netflix.com', parentCompany: 'Netflix', description: 'Streaming service for movies and TV shows.', themeColor: '#E50914' }, // Netflix Red
    { logo: 'https://logo.clearbit.com/spotify.com', name: 'Spotify', link: 'brand.html?name=Spotify', home: 'https://spotify.com', parentCompany: 'Spotify', description: 'Music and podcast streaming service.', themeColor: '#1DB954' }, // Spotify Green
    { logo: 'https://logo.clearbit.com/pinterest.com', name: 'Pinterest', link: 'brand.html?name=Pinterest', home: 'https://pinterest.com', parentCompany: 'Pinterest', description: 'Visual discovery and inspiration platform.', themeColor: '#E60023' }, // Pinterest Red
    { logo: 'https://logo.clearbit.com/snapchat.com', name: 'Snapchat', link: 'brand.html?name=Snapchat', home: 'https://snapchat.com', parentCompany: 'Snap Inc.', description: 'Multimedia messaging app with disappearing content.', themeColor: '#FFFC00' }, // Snapchat Yellow
    { logo: 'https://logo.clearbit.com/whatsapp.com', name: 'WhatsApp', link: 'brand.html?name=WhatsApp', home: 'https://whatsapp.com', parentCompany: 'Meta', description: 'Secure messaging and calling app.', themeColor: '#25D366' }, // WhatsApp Green
    { logo: 'https://logo.clearbit.com/reddit.com', name: 'Reddit', link: 'brand.html?name=Reddit', home: 'https://reddit.com', parentCompany: 'Reddit', description: 'Community-driven discussion and content platform.', themeColor: '#FF4500' }, // Reddit Orange
    { logo: 'https://logo.clearbit.com/discord.com', name: 'Discord', link: 'brand.html?name=Discord', home: 'https://discord.com', parentCompany: 'Discord', description: 'Chat app for gaming and communities.', themeColor: '#5865F2' }, // Discord Purple/Blue
    { logo: 'https://logo.clearbit.com/telegram.org', name: 'Telegram', link: 'brand.html?name=Telegram', home: 'https://telegram.org', parentCompany: 'Telegram', description: 'Privacy-focused messaging app.', themeColor: '#0088CC' }, // Telegram Blue
    { logo: 'https://logo.clearbit.com/twitch.tv', name: 'Twitch', link: 'brand.html?name=Twitch', home: 'https://twitch.tv', parentCompany: 'Amazon', description: 'Live streaming platform for gamers.', themeColor: '#9146FF' }, // Twitch Purple
    { logo: 'https://logo.clearbit.com/slack.com', name: 'Slack', link: 'brand.html?name=Slack', home: 'https://slack.com', parentCompany: 'Salesforce', description: 'Team communication and collaboration tool.', themeColor: '#4A154B' }, // Slack Purple
    { logo: 'https://logo.clearbit.com/dropbox.com', name: 'Dropbox', link: 'brand.html?name=Dropbox', home: 'https://dropbox.com', parentCompany: 'Dropbox', description: 'Cloud storage and file-sharing service.', themeColor: '#0061FF' }, // Dropbox Blue
    { logo: 'https://logo.clearbit.com/zoom.us', name: 'Zoom', link: 'brand.html?name=Zoom', home: 'https://zoom.us', parentCompany: 'Zoom', description: 'Video conferencing and remote meeting platform.', themeColor: '#2D8CFF' }, // Zoom Blue
    { logo: 'https://logo.clearbit.com/ebay.com', name: 'eBay', link: 'brand.html?name=eBay', home: 'https://ebay.com', parentCompany: 'eBay', description: 'Online marketplace for buying and selling.', themeColor: '#E53238' }, // eBay Red
    { logo: 'https://logo.clearbit.com/paypal.com', name: 'PayPal', link: 'brand.html?name=PayPal', home: 'https://paypal.com', parentCompany: 'PayPal', description: 'Online payment and money transfer service.', themeColor: '#003087' }, // PayPal Blue
    { logo: 'https://logo.clearbit.com/adobe.com', name: 'Adobe', link: 'brand.html?name=Adobe', home: 'https://adobe.com', parentCompany: 'Adobe', description: 'Creative software and digital tools provider.', themeColor: '#FF0000' }, // Adobe Red
    { logo: 'https://logo.clearbit.com/shopify.com', name: 'Shopify', link: 'brand.html?name=Shopify', home: 'https://shopify.com', parentCompany: 'Shopify', description: 'E-commerce platform for online stores.', themeColor: '#96BF48' }, // Shopify Green
    { logo: 'https://logo.clearbit.com/salesforce.com', name: 'Salesforce', link: 'brand.html?name=Salesforce', home: 'https://salesforce.com', parentCompany: 'Salesforce', description: 'CRM and cloud-based business solutions.', themeColor: '#00A1E0' }, // Salesforce Blue
    { logo: 'https://logo.clearbit.com/uber.com', name: 'Uber', link: 'brand.html?name=Uber', home: 'https://uber.com', parentCompany: 'Uber', description: 'Ride-hailing and delivery service platform.', themeColor: '#000000' }, // Uber Black
    { logo: 'https://logo.clearbit.com/airbnb.com', name: 'Airbnb', link: 'brand.html?name=Airbnb', home: 'https://airbnb.com', parentCompany: 'Airbnb', description: 'Vacation rental and travel booking platform.', themeColor: '#FF5A5F' }, // Airbnb Red/Pink
    { logo: 'https://logo.clearbit.com/tesla.com', name: 'Tesla', link: 'brand.html?name=Tesla', home: 'https://tesla.com', parentCompany: 'Tesla', description: 'Electric vehicles and energy solutions.', themeColor: '#CC0000' }, // Tesla Red
    { logo: 'https://logo.clearbit.com/oracle.com', name: 'Oracle', link: 'brand.html?name=Oracle', home: 'https://oracle.com', parentCompany: 'Oracle', description: 'Enterprise software and cloud solutions.', themeColor: '#F80000' }, // Oracle Red
    { logo: 'https://logo.clearbit.com/ibm.com', name: 'IBM', link: 'brand.html?name=IBM', home: 'https://ibm.com', parentCompany: 'IBM', description: 'Technology and consulting services provider.', themeColor: '#006699' }, // IBM Blue
    { logo: 'https://logo.clearbit.com/cisco.com', name: 'Cisco', link: 'brand.html?name=Cisco', home: 'https://cisco.com', parentCompany: 'Cisco', description: 'Networking hardware and software solutions.', themeColor: '#1BA0D7' }, // Cisco Blue
    { logo: 'https://logo.clearbit.com/intel.com', name: 'Intel', link: 'brand.html?name=Intel', home: 'https://intel.com', parentCompany: 'Intel', description: 'Semiconductor and processor manufacturer.', themeColor: '#0071C5' }, // Intel Blue
    { logo: 'https://logo.clearbit.com/nvidia.com', name: 'NVIDIA', link: 'brand.html?name=NVIDIA', home: 'https://nvidia.com', parentCompany: 'NVIDIA', description: 'Graphics processing units and AI tech.', themeColor: '#76B900' }, // NVIDIA Green
    { logo: 'https://logo.clearbit.com/dell.com', name: 'Dell', link: 'brand.html?name=Dell', home: 'https://dell.com', parentCompany: 'Dell Technologies', description: 'Computers and IT infrastructure provider.', themeColor: '#0085C3' }, // Dell Blue
    { logo: 'https://logo.clearbit.com/hp.com', name: 'HP', link: 'brand.html?name=HP', home: 'https://hp.com', parentCompany: 'HP Inc.', description: 'Personal computers and printing solutions.', themeColor: '#0096D6' }, // HP Blue
    { logo: 'https://logo.clearbit.com/samsung.com', name: 'Samsung', link: 'brand.html?name=Samsung', home: 'https://samsung.com', parentCompany: 'Samsung Group', description: 'Electronics and mobile device leader.', themeColor: '#1428A0' }, // Samsung Blue
    { logo: 'https://logo.clearbit.com/sony.com', name: 'Sony', link: 'brand.html?name=Sony', home: 'https://sony.com', parentCompany: 'Sony Group', description: 'Entertainment and electronics innovator.', themeColor: '#000000' }, // Sony Black
    { logo: 'https://logo.clearbit.com/alibaba.com', name: 'Alibaba', link: 'brand.html?name=Alibaba', home: 'https://alibaba.com', parentCompany: 'Alibaba Group', description: 'Global e-commerce and cloud services.', themeColor: '#FF6A00' }, // Alibaba Orange
    { logo: 'https://logo.clearbit.com/tencent.com', name: 'Tencent', link: 'brand.html?name=Tencent', home: 'https://tencent.com', parentCompany: 'Tencent', description: 'Social media, gaming, and tech conglomerate.', themeColor: '#1478C8' }, // Tencent Blue
    { logo: 'https://logo.clearbit.com/baidu.com', name: 'Baidu', link: 'brand.html?name=Baidu', home: 'https://baidu.com', parentCompany: 'Baidu', description: 'Chinese search engine and AI leader.', themeColor: '#2932E1' }, // Baidu Blue
    { logo: 'https://logo.clearbit.com/jd.com', name: 'JD.com', link: 'brand.html?name=JD.com', home: 'https://jd.com', parentCompany: 'JD.com', description: 'Chinese e-commerce and logistics platform.', themeColor: '#E62321' }, // JD.com Red
    { logo: 'https://logo.clearbit.com/wechat.com', name: 'WeChat', link: 'brand.html?name=WeChat', home: 'https://wechat.com', parentCompany: 'Tencent', description: 'All-in-one messaging and payment app.', themeColor: '#07C160' }, // WeChat Green
    { logo: 'https://logo.clearbit.com/vimeo.com', name: 'Vimeo', link: 'brand.html?name=Vimeo', home: 'https://vimeo.com', parentCompany: 'Vimeo', description: 'Video hosting and creative platform.', themeColor: '#1AB7EA' }, // Vimeo Blue
    { logo: 'https://logo.clearbit.com/quora.com', name: 'Quora', link: 'brand.html?name=Quora', home: 'https://quora.com', parentCompany: 'Quora', description: 'Question-and-answer knowledge-sharing site.', themeColor: '#B92B27' }, // Quora Red
    { logo: 'https://logo.clearbit.com/stackoverflow.com', name: 'Stack Overflow', link: 'brand.html?name=Stack Overflow', home: 'https://stackoverflow.com', parentCompany: 'Stack Exchange', description: 'Developer Q&A and coding community.', themeColor: '#F48024' }, // Stack Overflow Orange
    { logo: 'https://logo.clearbit.com/gitlab.com', name: 'GitLab', link: 'brand.html?name=GitLab', home: 'https://gitlab.com', parentCompany: 'GitLab', description: 'DevOps and code collaboration platform.', themeColor: '#FC6D26' }, // GitLab Orange
    { logo: 'https://logo.clearbit.com/github.com', name: 'GitHub', link: 'brand.html?name=GitHub', home: 'https://github.com', parentCompany: 'Microsoft', description: 'Code hosting and version control platform.', themeColor: '#000000' }, // GitHub Black
    { logo: 'https://logo.clearbit.com/bitbucket.org', name: 'Bitbucket', link: 'brand.html?name=Bitbucket', home: 'https://bitbucket.org', parentCompany: 'Atlassian', description: 'Git repository management for teams.', themeColor: '#0052CC' }, // Bitbucket Blue
    { logo: 'https://logo.clearbit.com/x.com', name: 'X', link: 'brand.html?name=X', home: 'https://x.com', parentCompany: 'X Corp', description: 'Social media platform evolving from Twitter.', themeColor: '#000000' }, // X Black
    { logo: 'https://logo.clearbit.com/spacex.com', name: 'SpaceX', link: 'brand.html?name=SpaceX', home: 'https://spacex.com', parentCompany: 'SpaceX', description: 'Aerospace company for space exploration.', themeColor: '#000000' }, // SpaceX Black
    { logo: 'https://logo.clearbit.com/openai.com', name: 'OpenAI', link: 'brand.html?name=OpenAI', home: 'https://openai.com', parentCompany: 'OpenAI', description: 'AI research org behind ChatGPT.', themeColor: '#10A37F' }, // OpenAI Teal
    { logo: 'https://logo.clearbit.com/xai.com', name: 'xAI', link: 'brand.html?name=xAI', home: 'https://xai.com', parentCompany: 'xAI', description: 'AI firm advancing human scientific discovery.', themeColor: '#000000' }, // xAI Black (aligned with X)
    { logo: 'https://logo.clearbit.com/bytedance.com', name: 'ByteDance', link: 'brand.html?name=ByteDance', home: 'https://bytedance.com', parentCompany: 'ByteDance', description: 'Parent of TikTok, focused on content tech.', themeColor: '#000000' }, // ByteDance Black (aligned with TikTok)
    { logo: 'https://logo.clearbit.com/epicgames.com', name: 'Epic Games', link: 'brand.html?name=Epic Games', home: 'https://epicgames.com', parentCompany: 'Epic Games', description: 'Game developer and store, known for Fortnite.', themeColor: '#000000' }, // Epic Games Black
    { logo: 'https://logo.clearbit.com/robinhood.com', name: 'Robinhood', link: 'brand.html?name=Robinhood', home: 'https://robinhood.com', parentCompany: 'Robinhood', description: 'Commission-free trading app.', themeColor: '#00C805' }, // Robinhood Green
    { logo: 'https://logo.clearbit.com/stripe.com', name: 'Stripe', link: 'brand.html?name=Stripe', home: 'https://stripe.com', parentCompany: 'Stripe', description: 'Payment processing for online businesses.', themeColor: '#635BFF' }, // Stripe Purple
    { logo: 'https://logo.clearbit.com/binance.com', name: 'Binance', link: 'brand.html?name=Binance', home: 'https://binance.com', parentCompany: 'Binance', description: 'Leading cryptocurrency exchange platform.', themeColor: '#F0B90B' }, // Binance Yellow
    { logo: 'https://logo.clearbit.com/coinbase.com', name: 'Coinbase', link: 'brand.html?name=Coinbase', home: 'https://coinbase.com', parentCompany: 'Coinbase', description: 'Crypto trading and wallet service.', themeColor: '#0052FF' }, // Coinbase Blue
    { logo: 'https://logo.clearbit.com/notion.so', name: 'Notion', link: 'brand.html?name=Notion', home: 'https://notion.so', parentCompany: 'Notion', description: 'All-in-one workspace for productivity.', themeColor: '#000000' }, // Notion Black
    { logo: 'https://logo.clearbit.com/figma.com', name: 'Figma', link: 'brand.html?name=Figma', home: 'https://figma.com', parentCompany: 'Adobe', description: 'Collaborative design tool for UI/UX.', themeColor: '#F24E1E' }, // Figma Orange
    { logo: 'https://logo.clearbit.com/canva.com', name: 'Canva', link: 'brand.html?name=Canva', home: 'https://canva.com', parentCompany: 'Canva', description: 'Graphic design platform for all users.', themeColor: '#00C4B4' }, // Canva Teal
    { logo: 'https://logo.clearbit.com/trello.com', name: 'Trello', link: 'brand.html?name=Trello', home: 'https://trello.com', parentCompany: 'Atlassian', description: 'Task management with boards and cards.', themeColor: '#0079BF' }, // Trello Blue
    { logo: 'https://logo.clearbit.com/asana.com', name: 'Asana', link: 'brand.html?name=Asana', home: 'https://asana.com', parentCompany: 'Asana', description: 'Work management for teams.', themeColor: '#F06A6A' }, // Asana Red/Pink
    { logo: 'https://logo.clearbit.com/monday.com', name: 'Monday.com', link: 'brand.html?name=Monday.com', home: 'https://monday.com', parentCompany: 'Monday.com', description: 'Customizable team collaboration tool.', themeColor: '#FF3C7E' }, // Monday.com Pink
    { logo: 'https://logo.clearbit.com/atlassian.com', name: 'Atlassian', link: 'brand.html?name=Atlassian', home: 'https://atlassian.com', parentCompany: 'Atlassian', description: 'Software tools like Jira and Confluence.', themeColor: '#0052CC' }, // Atlassian Blue
    { logo: 'https://logo.clearbit.com/bitly.com', name: 'Bitly', link: 'brand.html?name=Bitly', home: 'https://bitly.com', parentCompany: 'Bitly', description: 'Link shortening and analytics service.', themeColor: '#EE6123' }, // Bitly Orange
    { logo: 'https://logo.clearbit.com/cloudflare.com', name: 'Cloudflare', link: 'brand.html?name=Cloudflare', home: 'https://cloudflare.com', parentCompany: 'Cloudflare', description: 'Web security and performance solutions.', themeColor: '#F38020' }, // Cloudflare Orange
    { logo: 'https://logo.clearbit.com/aws.amazon.com', name: 'AWS', link: 'brand.html?name=AWS', home: 'https://aws.amazon.com', parentCompany: 'Amazon', description: 'Amazon’s cloud computing platform.', themeColor: '#FF9900' }, // AWS Orange (aligned with Amazon)
    { logo: 'https://logo.clearbit.com/azure.microsoft.com', name: 'Azure', link: 'brand.html?name=Azure', home: 'https://azure.microsoft.com', parentCompany: 'Microsoft', description: 'Microsoft’s cloud computing service.', themeColor: '#0078D4' }, // Azure Blue
    { logo: 'https://logo.clearbit.com/gcp.google.com', name: 'Google Cloud', link: 'brand.html?name=Google Cloud', home: 'https://cloud.google.com', parentCompany: 'Alphabet', description: 'Google’s cloud infrastructure platform.', themeColor: '#4285F4' }, // Google Cloud Blue (aligned with Google)
    { logo: 'https://logo.clearbit.com/digitalocean.com', name: 'DigitalOcean', link: 'brand.html?name=DigitalOcean', home: 'https://digitalocean.com', parentCompany: 'DigitalOcean', description: 'Cloud hosting for developers.', themeColor: '#0080FF' }, // DigitalOcean Blue
    { logo: 'https://logo.clearbit.com/heroku.com', name: 'Heroku', link: 'brand.html?name=Heroku', home: 'https://heroku.com', parentCompany: 'Salesforce', description: 'PaaS for easy app deployment.', themeColor: '#6762A6' }, // Heroku Purple
    { logo: 'https://logo.clearbit.com/vercel.com', name: 'Vercel', link: 'brand.html?name=Vercel', home: 'https://vercel.com', parentCompany: 'Vercel', description: 'Frontend development and deployment.', themeColor: '#000000' }, // Vercel Black
    { logo: 'https://logo.clearbit.com/netlify.com', name: 'Netlify', link: 'brand.html?name=Netlify', home: 'https://netlify.com', parentCompany: 'Netlify', description: 'Static site hosting and automation.', themeColor: '#00C7B7' }, // Netlify Teal
    { logo: 'https://logo.clearbit.com/huggingface.co', name: 'Hugging Face', link: 'brand.html?name=Hugging Face', home: 'https://huggingface.co', parentCompany: 'Hugging Face', description: 'AI models and NLP community.', themeColor: '#FFD21E' }, // Hugging Face Yellow
    { logo: 'https://logo.clearbit.com/replit.com', name: 'Replit', link: 'brand.html?name=Replit', home: 'https://replit.com', parentCompany: 'Replit', description: 'Online coding and learning platform.', themeColor: '#F26207' }, // Replit Orange
    { logo: 'https://logo.clearbit.com/codepen.io', name: 'CodePen', link: 'brand.html?name=CodePen', home: 'https://codepen.io', parentCompany: 'CodePen', description: 'Frontend code showcase tool.', themeColor: '#000000' }, // CodePen Black
    { logo: 'https://logo.clearbit.com/jsfiddle.net', name: 'JSFiddle', link: 'brand.html?name=JSFiddle', home: 'https://jsfiddle.net', parentCompany: 'JSFiddle', description: 'Online code testing playground.', themeColor: '#0074D9' }, // JSFiddle Blue
    { logo: 'https://logo.clearbit.com/leetcode.com', name: 'LeetCode', link: 'brand.html?name=LeetCode', home: 'https://leetcode.com', parentCompany: 'LeetCode', description: 'Coding practice for interviews.', themeColor: '#FFA116' }, // LeetCode Orange
    { logo: 'https://logo.clearbit.com/hackerrank.com', name: 'HackerRank', link: 'brand.html?name=HackerRank', home: 'https://hackerrank.com', parentCompany: 'HackerRank', description: 'Programming challenges and skills.', themeColor: '#2EC866' }, // HackerRank Green
    { logo: 'https://logo.clearbit.com/coursera.org', name: 'Coursera', link: 'brand.html?name=Coursera', home: 'https://coursera.org', parentCompany: 'Coursera', description: 'Online courses from top universities.', themeColor: '#0056D2' }, // Coursera Blue
    { logo: 'https://logo.clearbit.com/udemy.com', name: 'Udemy', link: 'brand.html?name=Udemy', home: 'https://udemy.com', parentCompany: 'Udemy', description: 'Platform for learning diverse skills.', themeColor: '#A435F0' }, // Udemy Purple
    { logo: 'https://logo.clearbit.com/khanacademy.org', name: 'Khan Academy', link: 'brand.html?name=Khan Academy', home: 'https://khanacademy.org', parentCompany: 'Khan Academy', description: 'Free educational resources online.', themeColor: '#14BF96' }, // Khan Academy Teal
    { logo: 'https://logo.clearbit.com/edx.org', name: 'edX', link: 'brand.html?name=edX', home: 'https://edx.org', parentCompany: '2U', description: 'Online university courses and certificates.', themeColor: '#02262B' }, // edX Dark Teal
    { logo: 'https://logo.clearbit.com/pluralsight.com', name: 'Pluralsight', link: 'brand.html?name=Pluralsight', home: 'https://pluralsight.com', parentCompany: 'Pluralsight', description: 'Tech skills training platform.', themeColor: '#F15B2A' }, // Pluralsight Orange
    { logo: 'https://logo.clearbit.com/skillshare.com', name: 'Skillshare', link: 'brand.html?name=Skillshare', home: 'https://skillshare.com', parentCompany: 'Skillshare', description: 'Creative and career learning community.', themeColor: '#00D4B9' }, // Skillshare Teal
    { logo: 'https://logo.clearbit.com/duolingo.com', name: 'Duolingo', link: 'brand.html?name=Duolingo', home: 'https://duolingo.com', parentCompany: 'Duolingo', description: 'Gamified language learning app.', themeColor: '#58CC02' }, // Duolingo Green
    { logo: 'https://logo.clearbit.com/medium.com', name: 'Medium', link: 'brand.html?name=Medium', home: 'https://medium.com', parentCompany: 'Medium', description: 'Publishing platform for writers.', themeColor: '#000000' }, // Medium Black
    { logo: 'https://logo.clearbit.com/substack.com', name: 'Substack', link: 'brand.html?name=Substack', home: 'https://substack.com', parentCompany: 'Substack', description: 'Newsletter and subscription platform.', themeColor: '#FF6719' }, // Substack Orange
    { logo: 'https://logo.clearbit.com/patreon.com', name: 'Patreon', link: 'brand.html?name=Patreon', home: 'https://patreon.com', parentCompany: 'Patreon', description: 'Crowdfunding for creators.', themeColor: '#FF424D' }, // Patreon Red
    { logo: 'https://logo.clearbit.com/kickstarter.com', name: 'Kickstarter', link: 'brand.html?name=Kickstarter', home: 'https://kickstarter.com', parentCompany: 'Kickstarter', description: 'Crowdfunding for creative projects.', themeColor: '#05CE78' }, // Kickstarter Green
    { logo: 'https://logo.clearbit.com/indiegogo.com', name: 'Indiegogo', link: 'brand.html?name=Indiegogo', home: 'https://indiegogo.com', parentCompany: 'Indiegogo', description: 'Platform for innovative product funding.', themeColor: '#EB1478' }, // Indiegogo Pink
    { logo: 'https://logo.clearbit.com/producthunt.com', name: 'Product Hunt', link: 'brand.html?name=Product Hunt', home: 'https://producthunt.com', parentCompany: 'Product Hunt', description: 'New product discovery community.', themeColor: '#DA552F' }, // Product Hunt Orange
    { logo: 'https://logo.clearbit.com/dribbble.com', name: 'Dribbble', link: 'brand.html?name=Dribbble', home: 'https://dribbble.com', parentCompany: 'Dribbble', description: 'Design portfolio and community.', themeColor: '#EA4C89' }, // Dribbble Pink
    { logo: 'https://logo.clearbit.com/behance.net', name: 'Behance', link: 'brand.html?name=Behance', home: 'https://behance.net', parentCompany: 'Adobe', description: 'Creative work showcase platform.', themeColor: '#1769FF' }, // Behance Blue
    { logo: 'https://logo.clearbit.com/deviantart.com', name: 'DeviantArt', link: 'brand.html?name=DeviantArt', home: 'https://deviantart.com', parentCompany: 'Wix', description: 'Art community and portfolio site.', themeColor: '#05CC47' }, // DeviantArt Green
    { logo: 'https://logo.clearbit.com/wix.com', name: 'Wix', link: 'brand.html?name=Wix', home: 'https://wix.com', parentCompany: 'Wix', description: 'Website builder for all users.', themeColor: '#0C6EFD' }, // Wix Blue
    { logo: 'https://logo.clearbit.com/squarespace.com', name: 'Squarespace', link: 'brand.html?name=Squarespace', home: 'https://squarespace.com', parentCompany: 'Squarespace', description: 'Elegant website creation tool.', themeColor: '#000000' }, // Squarespace Black
    { logo: 'https://logo.clearbit.com/wordpress.com', name: 'WordPress', link: 'brand.html?name=WordPress', home: 'https://wordpress.com', parentCompany: 'Automattic', description: 'Popular blogging and CMS platform.', themeColor: '#0073AA' }, // WordPress Blue
    { logo: 'https://logo.clearbit.com/tumblr.com', name: 'Tumblr', link: 'brand.html?name=Tumblr', home: 'https://tumblr.com', parentCompany: 'Automattic', description: 'Microblogging and social networking.', themeColor: '#36465D' }, // Tumblr Dark Blue
    { logo: 'https://logo.clearbit.com/weebly.com', name: 'Weebly', link: 'brand.html?name=Weebly', home: 'https://weebly.com', parentCompany: 'Square', description: 'Simple website and e-commerce builder.', themeColor: '#1A73E8' }, // Weebly Blue
    { logo: 'https://logo.clearbit.com/mailchimp.com', name: 'Mailchimp', link: 'brand.html?name=Mailchimp', home: 'https://mailchimp.com', parentCompany: 'Intuit', description: 'Email marketing and automation tool.', themeColor: '#FFE01B' }, // Mailchimp Yellow
    { logo: 'https://logo.clearbit.com/hubspot.com', name: 'HubSpot', link: 'brand.html?name=HubSpot', home: 'https://hubspot.com', parentCompany: 'HubSpot', description: 'CRM and marketing software.', themeColor: '#FF7A59' }, // HubSpot Orange
    { logo: 'https://logo.clearbit.com/zendesk.com', name: 'Zendesk', link: 'brand.html?name=Zendesk', home: 'https://zendesk.com', parentCompany: 'Zendesk', description: 'Customer service and support platform.', themeColor: '#03363D' }, // Zendesk Teal
    { logo: 'https://logo.clearbit.com/intercom.com', name: 'Intercom', link: 'brand.html?name=Intercom', home: 'https://intercom.com', parentCompany: 'Intercom', description: 'Customer messaging and support tool.', themeColor: '#1F8DED' }, // Intercom Blue
    { logo: 'https://logo.clearbit.com/freshdesk.com', name: 'Freshdesk', link: 'brand.html?name=Freshdesk', home: 'https://freshdesk.com', parentCompany: 'Freshworks', description: 'Cloud-based customer support software.', themeColor: '#FF6D00' }, // Freshdesk Orange
    { logo: 'https://logo.clearbit.com/zoho.com', name: 'Zoho', link: 'brand.html?name=Zoho', home: 'https://zoho.com', parentCompany: 'Zoho Corporation', description: 'Suite of business and productivity apps.', themeColor: '#D81E05' }, // Zoho Red
    { logo: 'https://logo.clearbit.com/okta.com', name: 'Okta', link: 'brand.html?name=Okta', home: 'https://okta.com', parentCompany: 'Okta', description: 'Identity and access management service.', themeColor: '#007DC1' }, // Okta Blue
    { logo: 'https://logo.clearbit.com/auth0.com', name: 'Auth0', link: 'brand.html?name=Auth0', home: 'https://auth0.com', parentCompany: 'Okta', description: 'Authentication and authorization platform.', themeColor: '#EB5424' }, // Auth0 Orange
    { logo: 'https://logo.clearbit.com/1password.com', name: '1Password', link: 'brand.html?name=1Password', home: 'https://1password.com', parentCompany: '1Password', description: 'Password manager for security.', themeColor: '#1C2526' }, // 1Password Dark Blue
    { logo: 'https://logo.clearbit.com/lastpass.com', name: 'LastPass', link: 'brand.html?name=LastPass', home: 'https://lastpass.com', parentCompany: 'GoTo', description: 'Password management and security tool.', themeColor: '#D32D27' }, // LastPass Red
    { logo: 'https://logo.clearbit.com/dashlane.com', name: 'Dashlane', link: 'brand.html?name=Dashlane', home: 'https://dashlane.com', parentCompany: 'Dashlane', description: 'Password and identity management.', themeColor: '#007CFF' }, // Dashlane Blue
    { logo: 'https://logo.clearbit.com/bitwarden.com', name: 'Bitwarden', link: 'brand.html?name=Bitwarden', home: 'https://bitwarden.com', parentCompany: 'Bitwarden', description: 'Open-source password manager.', themeColor: '#175DDC' }, // Bitwarden Blue
    { logo: 'https://logo.clearbit.com/nordvpn.com', name: 'NordVPN', link: 'brand.html?name=NordVPN', home: 'https://nordvpn.com', parentCompany: 'Nord Security', description: 'VPN service for privacy.', themeColor: '#4680FF' }, // NordVPN Blue
    { logo: 'https://logo.clearbit.com/expressvpn.com', name: 'ExpressVPN', link: 'brand.html?name=ExpressVPN', home: 'https://expressvpn.com', parentCompany: 'Kape Technologies', description: 'High-speed VPN for security.', themeColor: '#F42C4C' }, // ExpressVPN Red
    { logo: 'https://logo.clearbit.com/proton.me', name: 'ProtonMail', link: 'brand.html?name=ProtonMail', home: 'https://proton.me', parentCompany: 'Proton', description: 'Encrypted email service.', themeColor: '#6D4AFF' }, // ProtonMail Purple
    { logo: 'https://logo.clearbit.com/signal.org', name: 'Signal', link: 'brand.html?name=Signal', home: 'https://signal.org', parentCompany: 'Signal Foundation', description: 'Private messaging app.', themeColor: '#3A76F5' }, // Signal Blue
    { logo: 'https://logo.clearbit.com/teams.microsoft.com', name: 'Microsoft Teams', link: 'brand.html?name=Microsoft Teams', home: 'https://teams.microsoft.com', parentCompany: 'Microsoft', description: 'Collaboration and chat for teams.', themeColor: '#6264A7' }, // Microsoft Teams Purple
    { logo: 'https://logo.clearbit.com/webex.com', name: 'Webex', link: 'brand.html?name=Webex', home: 'https://webex.com', parentCompany: 'Cisco', description: 'Video conferencing and collaboration.', themeColor: '#00A68F' }, // Webex Teal
    { logo: 'https://logo.clearbit.com/gotomeeting.com', name: 'GoToMeeting', link: 'brand.html?name=GoToMeeting', home: 'https://gotomeeting.com', parentCompany: 'GoTo', description: 'Online meeting and webinar tool.', themeColor: '#F68F1E' }, // GoToMeeting Orange
    { logo: 'https://logo.clearbit.com/skype.com', name: 'Skype', link: 'brand.html?name=Skype', home: 'https://skype.com', parentCompany: 'Microsoft', description: 'Video and voice calling app.', themeColor: '#00AFF0' }, // Skype Blue
    { logo: 'https://logo.clearbit.com/meet.google.com', name: 'Google Meet', link: 'brand.html?name=Google Meet', home: 'https://meet.google.com', parentCompany: 'Alphabet', description: 'Video conferencing by Google.', themeColor: '#00897B' }, // Google Meet Teal
    { logo: 'https://logo.clearbit.com/loom.com', name: 'Loom', link: 'brand.html?name=Loom', home: 'https://loom.com', parentCompany: 'Loom', description: 'Video messaging for work.', themeColor: '#6257FE' }, // Loom Purple
    { logo: 'https://logo.clearbit.com/calendly.com', name: 'Calendly', link: 'brand.html?name=Calendly', home: 'https://calendly.com', parentCompany: 'Calendly', description: 'Scheduling and appointment booking.', themeColor: '#006BFF' }, // Calendly Blue
    { logo: 'https://logo.clearbit.com/docusign.com', name: 'DocuSign', link: 'brand.html?name=DocuSign', home: 'https://docusign.com', parentCompany: 'DocuSign', description: 'Electronic signature and agreements.', themeColor: '#0057D2' }, // DocuSign Blue
    { logo: 'https://logo.clearbit.com/hellosign.com', name: 'HelloSign', link: 'brand.html?name=HelloSign', home: 'https://hellosign.com', parentCompany: 'Dropbox', description: 'E-signature and document tool.', themeColor: '#00A94F' }, // HelloSign Green
    { logo: 'https://logo.clearbit.com/evernote.com', name: 'Evernote', link: 'brand.html?name=Evernote', home: 'https://evernote.com', parentCompany: 'Bending Spoons', description: 'Note-taking and organization app.', themeColor: '#00A82D' }, // Evernote Green
    { logo: 'https://logo.clearbit.com/onenote.com', name: 'OneNote', link: 'brand.html?name=OneNote', home: 'https://onenote.com', parentCompany: 'Microsoft', description: 'Digital note-taking by Microsoft.', themeColor: '#7719AA' }, // OneNote Purple
    { logo: 'https://logo.clearbit.com/todoist.com', name: 'Todoist', link: 'brand.html?name=Todoist', home: 'https://todoist.com', parentCompany: 'Doist', description: 'Task management and to-do app.', themeColor: '#E44332' }, // Todoist Red
    { logo: 'https://logo.clearbit.com/wunderlist.com', name: 'Wunderlist', link: 'brand.html?name=Wunderlist', home: 'https://wunderlist.com', parentCompany: 'Microsoft', description: 'Task list app (now part of To Do).', themeColor: '#2B96F1' }, // Wunderlist Blue
    { logo: 'https://logo.clearbit.com/clickup.com', name: 'ClickUp', link: 'brand.html?name=ClickUp', home: 'https://clickup.com', parentCompany: 'ClickUp', description: 'All-in-one productivity platform.', themeColor: '#7B68EE' }, // ClickUp Purple
    { logo: 'https://logo.clearbit.com/airtable.com', name: 'Airtable', link: 'brand.html?name=Airtable', home: 'https://airtable.com', parentCompany: 'Airtable', description: 'Spreadsheet-database hybrid tool.', themeColor: '#18BFFF' }, // Airtable Blue
    { logo: 'https://logo.clearbit.com/smartsheet.com', name: 'Smartsheet', link: 'brand.html?name=Smartsheet', home: 'https://smartsheet.com', parentCompany: 'Smartsheet', description: 'Collaborative work management.', themeColor: '#00A859' }, // Smartsheet Green
    { logo: 'https://logo.clearbit.com/basecamp.com', name: 'Basecamp', link: 'brand.html?name=Basecamp', home: 'https://basecamp.com', parentCompany: 'Basecamp', description: 'Project management and team tool.', themeColor: '#1D2D44' }, // Basecamp Dark Blue
    { logo: 'https://logo.clearbit.com/jira.com', name: 'Jira', link: 'brand.html?name=Jira', home: 'https://jira.com', parentCompany: 'Atlassian', description: 'Issue tracking for software teams.', themeColor: '#0052CC' }, // Jira Blue (aligned with Atlassian)
    { logo: 'https://logo.clearbit.com/confluence.com', name: 'Confluence', link: 'brand.html?name=Confluence', home: 'https://confluence.com', parentCompany: 'Atlassian', description: 'Team workspace for documentation.', themeColor: '#172B4D' }, // Confluence Dark Blue
    { logo: 'https://logo.clearbit.com/servicenow.com', name: 'ServiceNow', link: 'brand.html?name=ServiceNow', home: 'https://servicenow.com', parentCompany: 'ServiceNow', description: 'IT service management platform.', themeColor: '#000000' }, // ServiceNow Black
    { logo: 'https://logo.clearbit.com/splunk.com', name: 'Splunk', link: 'brand.html?name=Splunk', home: 'https://splunk.com', parentCompany: 'Cisco', description: 'Data analytics and monitoring tool.', themeColor: '#FF2C35' }, // Splunk Red
    { logo: 'https://logo.clearbit.com/datadog.com', name: 'Datadog', link: 'brand.html?name=Datadog', home: 'https://datadog.com', parentCompany: 'Datadog', description: 'Cloud monitoring and analytics.', themeColor: '#7745FF' }, // Datadog Purple
    { logo: 'https://logo.clearbit.com/newrelic.com', name: 'New Relic', link: 'brand.html?name=New Relic', home: 'https://newrelic.com', parentCompany: 'New Relic', description: 'Application performance monitoring.', themeColor: '#00AC69' }, // New Relic Green
    { logo: 'https://logo.clearbit.com/elastic.co', name: 'Elastic', link: 'brand.html?name=Elastic', home: 'https://elastic.co', parentCompany: 'Elastic', description: 'Search and analytics engine.', themeColor: '#FFC107' }, // Elastic Yellow
    { logo: 'https://logo.clearbit.com/snowflake.com', name: 'Snowflake', link: 'brand.html?name=Snowflake', home: 'https://snowflake.com', parentCompany: 'Snowflake', description: 'Cloud data platform.', themeColor: '#29A1F5' }, // Snowflake Blue
    { logo: 'https://logo.clearbit.com/tableau.com', name: 'Tableau', link: 'brand.html?name=Tableau', home: 'https://tableau.com', parentCompany: 'Salesforce', description: 'Data visualization and analytics.', themeColor: '#E97627' }, // Tableau Orange
    { logo: 'https://logo.clearbit.com/powerbi.microsoft.com', name: 'Power BI', link: 'brand.html?name=Power BI', home: 'https://powerbi.microsoft.com', parentCompany: 'Microsoft', description: 'Business intelligence by Microsoft.', themeColor: '#F2C811' }, // Power BI Yellow
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
const tagColors = ['ant-tag-blue', 'ant-tag-green', 'ant-tag-orange', 'ant-tag-red', 'ant-tag-purple', 'ant-tag-cyan'];
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
    return shuffled.slice(0, count).map(platform => (platform));
}

// 更新 services 数据，随机附带 hotBrands 中的名称和 logo
const services = [
    { name: 'Social Media', sub: getRandomPlatforms(hotBrands.length * 0.3, hotBrands.length * 0.55) },
    { name: 'Social Accounts', sub: getRandomPlatforms(hotBrands.length * 0.3, hotBrands.length * 0.55) },
    { name: 'SEO & SEM', sub: getRandomPlatforms(hotBrands.length * 0.3, hotBrands.length * 0.55) },
    { name: 'Ecommerce', sub: getRandomPlatforms(hotBrands.length * 0.3, hotBrands.length * 0.55) },
    { name: 'Gaming', sub: getRandomPlatforms(hotBrands.length * 0.3, hotBrands.length * 0.55) },
    { name: 'Content', sub: getRandomPlatforms(hotBrands.length * 0.3, hotBrands.length * 0.55) },
    { name: 'Design', sub: getRandomPlatforms(hotBrands.length * 0.3, hotBrands.length * 0.55) },
    { name: 'Promotion & Ads', sub: getRandomPlatforms(hotBrands.length * 0.3, hotBrands.length * 0.55) },
    { name: 'Trading', sub: getRandomPlatforms(hotBrands.length * 0.3, hotBrands.length * 0.55) },
    { name: 'Mobile Apps', sub: getRandomPlatforms(hotBrands.length * 0.3, hotBrands.length * 0.55) },
    { name: 'Soft Develop', sub: getRandomPlatforms(hotBrands.length * 0.3, hotBrands.length * 0.55) },
    { name: 'Cloud Service', sub: getRandomPlatforms(hotBrands.length * 0.3, hotBrands.length * 0.55) },
    { name: 'Security', sub: getRandomPlatforms(hotBrands.length * 0.3, hotBrands.length * 0.55) }
];

const realFaqs = [
    {
        title: "How do I reset my password?",
        content: "If you've forgotten your password or need to reset it for security reasons, follow these steps to regain access to your account. First, navigate to the login page on our website or app. Below the login fields, you'll see a 'Forgot Password?' link—click it. You’ll be prompted to enter the email address associated with your account. Once submitted, check your inbox for a password reset email from us (be sure to look in your spam or junk folder if it doesn’t appear within a few minutes). The email will contain a secure link; click it to proceed. You’ll be directed to a page where you can enter a new password. Make sure it’s at least 8 characters long, includes a mix of letters, numbers, and symbols for security, and isn’t something you’ve used before on this site. After confirming the new password, click 'Save' or 'Submit,' and you should be able to log in with your updated credentials. If you don’t receive the email after 10 minutes, try resending it or contact our support team with your account details for further assistance.",
        useType: 0
    },
    {
        title: "Why is my payment not going through?",
        content: "Payment issues can be frustrating, but they’re often caused by a few common reasons that can be resolved with some troubleshooting. This might happen if your card has insufficient funds—check your account balance to ensure it covers the transaction amount, including any taxes or shipping fees. Another possibility is an expired or blocked card; verify the expiration date and ensure your bank hasn’t flagged the transaction for security reasons. Sometimes, the problem lies with our payment gateway experiencing temporary downtime, which is rare but can occur during high traffic periods like sales events. To fix this, double-check your card details (number, expiry date, CVV, and billing address) for typos, then try again. If it still fails, attempt using a different payment method, like another card or a digital wallet such as PayPal. You can also contact your bank to confirm there are no restrictions on your account, such as daily spending limits or international transaction blocks. If none of these work, reach out to our customer support team with your order number and a description of the error message (if any) so we can investigate further and assist you in completing your purchase.",
        useType: 1
    },
    {
        title: "What should I do if my order is delayed?",
        content: "Order delays can happen due to various factors like weather conditions, carrier issues, or seller processing times, but we’re here to help you track down your package. Start by logging into your account and going to the 'Orders' section. Find the delayed order and click on it to view the tracking information provided by the seller. This will show you the latest status, such as 'In Transit' or 'Held at Customs,' along with the estimated delivery date. If it’s been more than 5 business days past that date and there’s no update, take action. First, contact the seller directly through our messaging system—include your order number and politely ask for an update or an explanation for the delay. Most sellers respond within 24-48 hours. If the tracking shows the package is stuck or lost, or if the seller doesn’t reply within 3 days, escalate the issue to our support team. Submit a ticket with your order details, tracking number, and a brief description of the problem. We’ll work with the seller and carrier to locate your package or, if necessary, arrange a replacement or refund based on our policies. In the meantime, avoid canceling the order unless advised, as this could complicate the resolution process.",
        useType: 2
    },
    {
        title: "Is this product compatible with my device?",
        content: "Determining product compatibility is crucial before making a purchase, and we provide several ways to ensure you get the right item. Every product listing on our platform includes a detailed description section—scroll down to find specifications like supported devices, operating systems, or hardware requirements. For example, if you’re buying a phone charger, it might list compatible brands (e.g., Apple, Samsung) and connection types (e.g., USB-C, Lightning). If the description doesn’t explicitly mention your device, look for a 'Compatibility' or 'Specifications' tab, which often includes model numbers or versions (e.g., iPhone 12, Windows 11). Still unsure? Use the 'Ask a Question' feature on the product page to message the seller directly—include your device’s make, model, and any relevant details (e.g., 'Will this work with a 2021 MacBook Pro M1?'). Sellers typically respond within a day with tailored advice. If you’ve already bought the item and it turns out to be incompatible, check the return policy in the listing; most items qualify for a refund within 30 days if unopened and in original condition. To avoid surprises, we recommend cross-checking specs with your device manual or manufacturer’s website before ordering.",
        useType: 3
    },
    {
        title: "How can I fix a login error on the app?",
        content: "Login errors can disrupt your experience, but they’re usually fixable with a few steps. If you’re seeing an error like 'Invalid Credentials' or 'Unable to Connect,' start by ensuring your username and password are correct—double-check for typos or extra spaces, and use the 'Show Password' option if available. If you’re sure they’re right, the issue might be app-related. First, try closing the app completely (swipe it away from your recent apps list) and reopening it. If that doesn’t work, clear the app’s cache: on Android, go to Settings > Apps > [App Name] > Storage > Clear Cache; on iOS, you’ll need to offload or reinstall the app (Settings > General > iPhone Storage > [App Name]). Next, check for updates in your app store—install the latest version, as bugs are often fixed in new releases. If the problem persists, uninstall and reinstall the app, then try logging in again. Network issues could also be the culprit—switch between Wi-Fi and mobile data to test connectivity, and ensure you’re not using a VPN that might block our servers. If none of these resolve it, submit a support ticket via our website with your device type (e.g., iPhone 14, Samsung Galaxy S23), app version, and a screenshot of the error. Our technical team will investigate and get back to you within 24-48 hours.",
        useType: 4
    },
    {
        title: "Can I change my email address?",
        content: "Yes, you can update your email address in your account settings, and it’s a straightforward process to keep your contact information current. Log into your account on our website or app, then navigate to the 'Account Settings' or 'Profile' section—look for an option like 'Change Email' or 'Edit Contact Info.' Click it, and you’ll be asked to enter your new email address. For security, we’ll send a verification code or link to your current email first; check your inbox (and spam folder) to confirm your identity. Once verified, enter the new email address and, in some cases, re-enter your password to authorize the change. After submitting, you’ll receive a confirmation email at the new address—click the link inside to finalize the update. This ensures no one else can hijack your account. If you no longer have access to your old email, contact our support team with your account username and proof of identity (e.g., a recent order number or a government-issued ID with sensitive info redacted). We’ll manually verify your request and update it within 48 hours. Note that changing your email won’t affect your order history or saved preferences, but you’ll need to use the new email for future logins and notifications.",
        useType: 0
    },
    {
        title: "Why was my payment declined?",
        content: "A declined payment can stem from several issues, and understanding the cause is the first step to resolving it. The most common reason is insufficient funds—check your bank account or credit card balance to confirm it covers the total amount, including shipping and taxes. Another frequent issue is an expired card; look at the expiration date on your card and update it in your payment settings if needed. Banks sometimes decline transactions for security reasons, like unusual activity (e.g., a large purchase from a new location)—call your bank to verify and approve the transaction. Incorrect details, such as a wrong CVV code or billing address, can also trigger a decline; review your saved payment method on our site and ensure all fields match your card exactly. Occasionally, our payment processor might experience a glitch, especially during peak times like holidays—wait a few minutes and retry. If it’s still declined, switch to another card or payment option (e.g., PayPal, Apple Pay). For persistent issues, take a screenshot of the error message and contact our support team with your order attempt details. We’ll coordinate with the processor to pinpoint the problem, and you can also ask your bank if they’ve blocked the merchant (us) for any reason, which they can usually unblock instantly.",
        useType: 1
    },
    {
        title: "How long does shipping usually take?",
        content: "Shipping times depend on multiple factors like your location, the seller’s warehouse, and the shipping method chosen, but we can give you a general idea to set expectations. For domestic orders within the same country as the seller, standard shipping typically takes 3-7 business days after the seller processes your order (processing can add 1-3 days). International shipping varies widely—expect 7-20 business days for standard options, though express shipping (if offered) can cut this to 3-10 days. You’ll find an estimated delivery date on your order confirmation email or in the 'Orders' section of your account—log in and check there first. Delays can occur due to holidays, customs clearance (for international orders), or unexpected events like storms; track your package with the provided tracking number for real-time updates. If the estimate passes and there’s no movement, message the seller via our platform with your order number for clarification—they might need to expedite it or investigate with the carrier. If they don’t respond within 48 hours or the package is lost, file a support ticket with us. We’ll step in to either expedite delivery, replace the item, or refund you, depending on the situation and our shipping policy terms.",
        useType: 2
    },
    {
        title: "Does this item come with a warranty?",
        content: "Whether an item includes a warranty depends on the seller and the product, and we make this information available to help you decide. On every product page, scroll to the 'Product Details' or 'Warranty' section—most sellers list it there. A typical warranty might be 1 year for manufacturing defects, covering repairs or replacements, but some items (like electronics) could offer 2-3 years, while others (like consumables) might have none. Look for specifics like what’s covered (e.g., parts, labor) and what’s not (e.g., accidental damage, wear and tear). If it’s not mentioned, use the 'Ask a Question' feature to ask the seller directly—something like, 'Does this come with a warranty, and what are the terms?' Include the product name for clarity; they’ll usually reply within 24-48 hours. After purchase, keep your order confirmation and any warranty docs emailed by the seller. To claim a warranty, contact the seller first with your order number and issue description—if they don’t resolve it within a reasonable time (e.g., 7 days), escalate to our support team. We’ll enforce our policy, which requires sellers to honor stated warranties, and assist with returns or refunds if the item fails within the warranty period.",
        useType: 3
    },
    {
        title: "Why can’t I access the website?",
        content: "If you’re unable to access our website, it could be due to a local issue on your end, a browser problem, or a rare server-side outage—let’s troubleshoot step-by-step. First, check your internet connection—try loading another site like Google to confirm it’s working. If it is, clear your browser’s cache and cookies: in Chrome, go to Settings > Privacy and Security > Clear Browsing Data (select 'Cached images and files'); in Safari, it’s Preferences > Privacy > Manage Website Data. Then, reload our site. If that fails, test it in a different browser (e.g., switch from Chrome to Firefox) or an incognito window to rule out extension conflicts. A VPN might also block access—disable it temporarily and retry. On our end, we occasionally perform maintenance, usually announced on our status page or social media—check there for updates if you suspect downtime. If you see an error like '503 Service Unavailable,' wait 10-15 minutes and try again, as it’s likely temporary. Still stuck? Use another device (e.g., your phone) to see if it’s device-specific. If all else fails, submit a ticket to our support team with your location, device type, browser version, and the exact error message or behavior (e.g., blank page, timeout). We’ll diagnose it and get you back online ASAP.",
        useType: 4
    }
];

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
                        subHtml += `<a href="item-list.html?services=${encodeURIComponent(cat.name)}&brandName=${item.name}" class="platform-item"><img src="${item.logo}" alt="${item.name}" class="platform-logo">${item.name}</a>`;
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