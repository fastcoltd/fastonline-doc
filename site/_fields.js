
// 定义字段配置，热门平台：上部 logo，下部名称
let brandFieldConfig = {
    logo: { card: true, cardSq: true, cardHoriz: true, type: 'image', style: { } },
    name: { card: true, cardSq: true, cardHoriz: true, type: 'text', style: { } },
};

// 定义字段配置，热门服务：icon + 文字组合
let servicesFieldConfig = {
    icon: { card: true, cardSq: true, cardHoriz: true, type: 'icon', style: { } },
    title: { card: true, cardSq: true, cardHoriz: true, type: 'text', style: {} },
};

// 热门商品字段配置，添加“立即购买”按钮
let itemFieldConfig = {
    favorite: {
        card: true, cardSq: true, cardHoriz: true, type: 'favorite',
        style: {},
        customClass: 'fas fa-heart favorite-icon',
        onClick: (item, element) => { element.classList.toggle('favorited'); },
        sample: () => faker.datatype.boolean()
    },
    image: { card: true, cardSq: true, cardHoriz: true, type: 'image',  style: { }, sample: i => getPicsumImage(300, 200, `items-${i}`) },
    title: { card: true, cardSq: true, cardHoriz: true, type: 'text',  style: {}, sample: () => faker.commerce.productName() },
    price: { card: true, cardSq: true, cardHoriz: true, type: 'price', label: '价格', format: (d, v) => `<span class="price">${v}</span>`, style: {}, sample: () => faker.commerce.price(50, 200, 2, "$") },
    stock: { card: true, cardSq: true, cardHoriz: true, type: 'text', label: '库存', style: {}, sample: () => faker.datatype.number({ min: 10, max: 100 }) },
    rating: { card: true, cardSq: true, cardHoriz: true, type: 'rating', label: '评分', style: {}, count: () => faker.datatype.number({ min: 50, max: 300 }), sample: () => faker.datatype.float({ min: 4, max: 5, precision: 0.1 }) },
    sales: { card: true, cardSq: true, cardHoriz: true, type: 'text', label: '销量', style: {}, sample: () => faker.datatype.number({ min: 100, max: 500 }) },
    brandName: { card: true, cardSq: true, cardHoriz: true, type: 'text', label: '品牌', style: {}, sample: () => faker.company.companyName() },
    tags: { card: true, cardSq: true, cardHoriz: true, type: 'tag', label: '标签', style: {}, sample: () => faker.lorem.words(3).split(' ') },
    buyNow: { card: true, cardSq: true, cardHoriz: true, type: 'button', value: '立即购买', style: { width: '100%', display: 'block', marginTop: '0.625em' } },
};

// 热门店铺字段配置，添加“进入”按钮
let storeFieldConfig = {
    favorite: {
        card: true, cardSq: true, cardHoriz: true, type: 'favorite',
        style: {},
        customClass: 'fas fa-heart favorite-icon',
        onClick: (item, element) => { element.classList.toggle('favorited'); },
        sample: () => faker.datatype.boolean()
    },
    image: { card: true, cardSq: true, cardHoriz: true, type: 'image',  style: {}, sample: i => getPicsumImage(300, 200, `store-${i}`) },
    name: { card: true, cardSq: true, cardHoriz: true, type: 'text',  style: {}, sample: () => faker.company.companyName() },
    sales: { card: true, cardSq: true, cardHoriz: true, type: 'text', label: '销量', style: {}, sample: () => faker.datatype.number({ min: 300, max: 1000 }) },
    rating: { card: true, cardSq: true, cardHoriz: true, type: 'rating', label: '评分', style: {}, count: () => faker.datatype.number({ min: 50, max: 300 }), sample: () => faker.datatype.float({ min: 4, max: 5, precision: 0.1 }) },
    slogan: { card: true, cardSq: true, cardHoriz: true, type: 'text', label: '标语', style: {}, sample: () => faker.company.catchPhrase() },
    tags: { card: true, cardSq: true, cardHoriz: true, type: 'tag', label: '标签', style: {}, sample: () => faker.lorem.words(3).split(' ') },
    enter: { card: true, cardSq: true, cardHoriz: true, type: 'button', value: '进入', style: { width: '100%', display: 'block', marginTop: '0.625em' } },
};

let demandFieldConfig = {
    image: { card: true, cardSq: true, cardHoriz: true, type: 'image',  style: {}, sample: i => getPicsumImage(300, 200, `shop${i}`) },
    demandTitle: { card: true, cardSq: true, cardHoriz: true, type: 'text',  style: {}, sample: () => faker.company.companyName() },
    brandName: { card: true, cardSq: true, cardHoriz: true, type: 'text', label: "品牌", style: {}, sample: () => faker.commerce.productName() },
    demandCount: { card: true, cardSq: true, cardHoriz: true, type: 'text', label: '需求数量', style: {}, sample: () => faker.datatype.number({ min: 5, max: 20 }) },
    price: { card: true, cardSq: true, cardHoriz: true, type: 'price', label: '出价范围', format: (d, v) => `<span class="price">${v}</span>`, style: {}, sample: () => faker.commerce.price(50, 200, 2, "$") },
    totalPrice: { card: true, cardSq: true, cardHoriz: true, type: 'price', label: '总价', format: (d, v) => `<span class="price">${v}</span>`, style: {}, sample: () => faker.commerce.price(1000, 5000, 2, "$") },
    bids: { card: true, cardSq: true, cardHoriz: true, type: 'text', label: '竞标人数', style: {}, sample: () => faker.datatype.number({ min: 300, max: 1000 }) },
    tags: { card: true, cardSq: true, cardHoriz: true, type: 'tag', label: '要求', style: {}, sample: () => faker.lorem.words(3).split(' ') },
    bidNow: { card: true, cardSq: true, cardHoriz: true, type: 'button', value: '投标', style: { width: '100%', display: 'block', marginTop: '0.625em' } },
};

let postsFieldConfig = {
    favorite: {
        card: true, cardSq: true, cardHoriz: true, type: 'favorite',
        style: {},
        customClass: 'fas fa-heart favorite-icon',
        onClick: (item, element) => { element.classList.toggle('favorited'); },
        sample: () => faker.datatype.boolean()
    },
    image: { card: true, cardSq: true, cardHoriz: true, type: 'image',  style: {}, sample: i => getPicsumImage(300, 200, `article${i}`) },
    title: { card: true, cardSq: true, cardHoriz: true, type: 'text',  style: {}, sample: () => faker.lorem.sentence() },
    rating: { card: true, cardSq: true, cardHoriz: true, type: 'rating', label: '评分', style: {}, count: () => faker.datatype.number({ min: 50, max: 300 }), sample: () => faker.datatype.float({ min: 4, max: 5, precision: 0.1 }) },
    author: { card: true, cardSq: true, cardHoriz: true, type: 'text', label: '作者', style: {}, sample: () => faker.name.findName() },
    content: { card: true, cardSq: true, cardHoriz: true, type: 'text', label: '内容', style: {}, sample: () => faker.lorem.paragraph() },
    tags: { card: false, cardSq: false, cardHoriz: true, type: 'tag', label: '标签', style: {}, sample: () => faker.lorem.words(3).split(' ') },
    joinNow: { card: false, cardSq: false, cardHoriz: true, type: 'button', value: '查看', style: { width: '100%', display: 'block', marginTop: '0.625em' } },
};

let campaignFieldConfig = {
    favorite: {
        card: true, cardSq: true, cardHoriz: true, type: 'favorite',
        style: {},
        customClass: 'fas fa-heart favorite-icon',
        onClick: (item, element) => { element.classList.toggle('favorited'); },
        sample: () => faker.datatype.boolean()
    },
    image: { card: true, cardSq: true, cardHoriz: true, type: 'image',  style: {}, sample: i => getPicsumImage(300, 200, `campaign${i}`) },
    title: { card: true, cardSq: true, cardHoriz: true, type: 'text',  style: {}, sample: () => faker.commerce.department() },
    itemCount: { card: true, cardSq: true, cardHoriz: true, type: 'text', label: '商品数', style: {}, sample: () => faker.datatype.number({ min: 5, max: 20 }) },
    sales: { card: true, cardSq: true, cardHoriz: true, type: 'text', label: '销量', style: {}, sample: () => faker.datatype.number({ min: 200, max: 600 }) },
    orders: { card: true, cardSq: true, cardHoriz: true, type: 'text', label: '订单数', style: {}, sample: () => faker.datatype.number({ min: 50, max: 200 }) },
    favorites: { card: true, cardSq: true, cardHoriz: true, type: 'text', label: '收藏数', style: {}, sample: () => faker.datatype.number({ min: 100, max: 300 }) },
    tags: { card: true, cardSq: true, cardHoriz: true, type: 'tag', label: '要求', style: {}, sample: () => faker.lorem.words(3).split(' ') },
    joinNow: { card: false, cardSq: false, cardHoriz: true, type: 'button', value: '查看', style: { width: '100%', display: 'block', marginTop: '0.625em' } },
};

let ordersCommentFieldConfig = {
    image: { card: true, cardSq: true, cardHoriz: true, type: 'image',  style: {}, sample: i => getPicsumImage(300, 200, `review${i}`) },
    title: { card: true, cardSq: true, cardHoriz: true, type: 'text',  style: {}, sample: () => faker.commerce.productName() },
    service: { card: true, cardSq: true, cardHoriz: true, type: 'text', label: '服务', style: {}, sample: () => faker.commerce.department() },
    rating: { card: true, cardSq: true, cardHoriz: true, type: 'rating', label: '评分', style: {}, count: () => faker.datatype.number({ min: 50, max: 300 }), sample: () => faker.datatype.float({ min: 4, max: 5, precision: 0.1 }) },
    content: { card: true, cardSq: true, cardHoriz: true, type: 'text', label: '内容', style: {}, sample: () => faker.lorem.paragraph() },
};


window.brandFieldConfig = brandFieldConfig;
window.servicesFieldConfig = servicesFieldConfig;
window.itemFieldConfig = itemFieldConfig;
window.storeFieldConfig = storeFieldConfig;
window.demandFieldConfig = demandFieldConfig;
window.postsFieldConfig = postsFieldConfig;
window.campaignFieldConfig = campaignFieldConfig;
window.ordersCommentFieldConfig = ordersCommentFieldConfig;