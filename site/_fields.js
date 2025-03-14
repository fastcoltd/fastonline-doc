
// 定义字段配置，热门平台：上部 logo，下部名称
const platformFieldConfig = {
    logo: { type: 'image', style: { } },
    name: { type: 'text', style: { } }
};

// 定义字段配置，热门服务：icon + 文字组合
const serviceFieldConfig = {
    icon: { type: 'icon', style: { } },
    title: { type: 'text', style: {} }
};

// 热门商品字段配置，添加“立即购买”按钮
const productFieldConfig = {
    favorite: {
        type: 'favorite',
        style: { position: 'absolute', top: '1.2em', right: '1.2em', fontSize: '1.5em' },
        customClass: 'fas fa-heart favorite-icon',
        onClick: (item, element) => { element.classList.toggle('favorited'); },
        sample: () => faker.datatype.boolean()
    },
    image: { type: 'image', position: 'header', style: { }, sample: i => getPicsumImage(300, 200, `product${i}`) },
    title: { type: 'text', position: 'header', style: {}, sample: () => faker.commerce.productName() },
    price: { type: 'price', label: '价格', format: (d, v) => `<span class="price">${v}</span>`, style: {}, sample: () => faker.commerce.price(50, 200, 2, "$") },
    stock: { type: 'text', label: '库存', style: {}, sample: () => faker.datatype.number({ min: 10, max: 100 }) },
    rating: { type: 'rating', label: '评分', style: {}, count: () => faker.datatype.number({ min: 50, max: 300 }), sample: () => faker.datatype.float({ min: 4, max: 5, precision: 0.1 }) },
    sales: { type: 'text', label: '销量', style: {}, sample: () => faker.datatype.number({ min: 100, max: 500 }) },
    brandName: { type: 'text', label: '品牌', style: {}, sample: () => faker.company.companyName() },
    tags: { type: 'tag', label: '标签', style: {}, sample: () => faker.lorem.words(3).split(' ') },
    buyNow: { type: 'button', value: '立即购买', style: { width: '100%', display: 'block', marginTop: '0.625em' } }
};

// 热门店铺字段配置，添加“进入”按钮
const shopFieldConfig = {
    favorite: {
        type: 'favorite',
        style: { position: 'absolute', top: '1.2em', right: '1.2em', fontSize: '1.5em' },
        customClass: 'fas fa-heart favorite-icon',
        onClick: (item, element) => { element.classList.toggle('favorited'); },
        sample: () => faker.datatype.boolean()
    },
    image: { type: 'image', position: 'header', style: {}, sample: i => getPicsumImage(300, 200, `shop${i}`) },
    name: { type: 'text', position: 'header', style: {}, sample: () => faker.company.companyName() },
    sales: { type: 'text', label: '销量', style: {}, sample: () => faker.datatype.number({ min: 300, max: 1000 }) },
    rating: { type: 'rating', label: '评分', style: {}, count: () => faker.datatype.number({ min: 50, max: 300 }), sample: () => faker.datatype.float({ min: 4, max: 5, precision: 0.1 }) },
    slogan: { type: 'text', label: '标语', style: {}, sample: () => faker.company.catchPhrase() },
    tags: { type: 'tag', label: '标签', style: {}, sample: () => faker.lorem.words(3).split(' ') },
    enter: { type: 'button', value: '进入', style: { width: '100%', display: 'block', marginTop: '0.625em' } }
};

const demandFieldConfig = {
    image: { type: 'image', position: 'header', style: {}, sample: i => getPicsumImage(300, 200, `shop${i}`) },
    demandName: { type: 'text', position: 'header', style: {}, sample: () => faker.company.companyName() },
    productName: { type: 'text', label: "品牌", style: {}, sample: () => faker.commerce.productName() },
    productCount: { type: 'text', label: '需求数量', style: {}, sample: () => faker.datatype.number({ min: 5, max: 20 }) },
    price: { type: 'price', label: '出价范围', format: (d, v) => `<span class="price">${v}</span>`, style: {}, sample: () => faker.commerce.price(50, 200, 2, "$") },
    totalPrice: { type: 'price', label: '总价', format: (d, v) => `<span class="price">${v}</span>`, style: {}, sample: () => faker.commerce.price(1000, 5000, 2, "$") },
    bids: { type: 'text', label: '竞标人数', style: {}, sample: () => faker.datatype.number({ min: 300, max: 1000 }) },
    tags: { type: 'tag', label: '要求', style: {}, sample: () => faker.lorem.words(3).split(' ') },
    bidNow: { type: 'button', value: '投标', style: { width: '100%', display: 'block', marginTop: '0.625em' } }
};

const articleFieldConfig = {
    favorite: {
        type: 'favorite',
        style: { position: 'absolute', top: '1.2em', right: '1.2em', fontSize: '1.5em' },
        customClass: 'fas fa-heart favorite-icon',
        onClick: (item, element) => { element.classList.toggle('favorited'); },
        sample: () => faker.datatype.boolean()
    },
    image: { type: 'image', position: 'header', style: {}, sample: i => getPicsumImage(300, 200, `article${i}`) },
    title: { type: 'text', position: 'header', style: {}, sample: () => faker.lorem.sentence() },
    rating: { type: 'rating', label: '评分', style: {}, count: () => faker.datatype.number({ min: 50, max: 300 }), sample: () => faker.datatype.float({ min: 4, max: 5, precision: 0.1 }) },
    author: { type: 'text', label: '作者', style: {}, sample: () => faker.name.findName() }
};

const campaignFieldConfig = {
    favorite: {
        type: 'favorite',
        style: { position: 'absolute', top: '1.2em', right: '1.2em', fontSize: '1.5em' },
        customClass: 'fas fa-heart favorite-icon',
        onClick: (item, element) => { element.classList.toggle('favorited'); },
        sample: () => faker.datatype.boolean()
    },
    image: { type: 'image', position: 'header', style: {}, sample: i => getPicsumImage(300, 200, `campaign${i}`) },
    title: { type: 'text', position: 'header', style: {}, sample: () => faker.commerce.department() },
    productCount: { type: 'text', label: '商品数', style: {}, sample: () => faker.datatype.number({ min: 5, max: 20 }) },
    sales: { type: 'text', label: '销量', style: {}, sample: () => faker.datatype.number({ min: 200, max: 600 }) },
    orders: { type: 'text', label: '订单数', style: {}, sample: () => faker.datatype.number({ min: 50, max: 200 }) },
    favorites: { type: 'text', label: '收藏数', style: {}, sample: () => faker.datatype.number({ min: 100, max: 300 }) },
    tags: { type: 'tag', label: '要求', style: {}, sample: () => faker.lorem.words(3).split(' ') },
};

const reviewFieldConfig = {
    image: { type: 'image', position: 'header', style: {}, sample: i => getPicsumImage(300, 200, `review${i}`) },
    title: { type: 'text', position: 'header', style: {}, sample: () => faker.commerce.productName() },
    service: { type: 'text', label: '服务', style: {}, sample: () => faker.commerce.department() },
    rating: { type: 'rating', label: '评分', style: {}, count: () => faker.datatype.number({ min: 50, max: 300 }), sample: () => faker.datatype.float({ min: 4, max: 5, precision: 0.1 }) },
    content: { type: 'text', label: '内容', style: {}, sample: () => faker.lorem.paragraph() }
};


window.platformFieldConfig = platformFieldConfig;
window.serviceFieldConfig = serviceFieldConfig;
window.productFieldConfig = productFieldConfig;
window.shopFieldConfig = shopFieldConfig;
window.demandFieldConfig = demandFieldConfig;
window.articleFieldConfig = articleFieldConfig;
window.campaignFieldConfig = campaignFieldConfig;
window.reviewFieldConfig = reviewFieldConfig;