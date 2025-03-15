// 定义字段配置，热门平台：上部 logo，下部名称
let brandFieldConfig = {
    logo: { card: true, cardSq: true, cardHoriz: true, type: 'image', style: {}, sample: i => getPicsumImage(300, 200, `brand-${i}`) },
    name: { card: true, cardSq: true, cardHoriz: true, type: 'text', style: {}, sample: () => faker.company.companyName() },

    // 新增字段（面向客户展示）
    company: {card: false, cardSq: false, cardHoriz: true, type: 'text', label: '公司名称', style: {}, format: (d, v) => `<span style="color: #1E90FF">${v}</span>`, sample: () => faker.company.companyName()},
    summary: {card: false, cardSq: false, cardHoriz: true, type: 'text', label: '简介', style: {}, format: (d, v) => `<span style="color: #666">${v}</span>`, sample: () => faker.lorem.sentence()}
};

// 定义字段配置，热门服务：icon + 文字组合
let servicesFieldConfig = {
    icon: { card: true, cardSq: true, cardHoriz: true, type: 'icon', style: {}, sample: i => getPicsumImage(50, 50, `service-icon-${i}`) },
    title: { card: true, cardSq: true, cardHoriz: true, type: 'text', style: {}, sample: () => faker.commerce.product() },

    // 新增字段（面向客户展示）
    summary: {card: false, cardSq: false, cardHoriz: true, type: 'text', label: '简介', style: {}, format: (d, v) => `<span style="color: #666">${v}</span>`, sample: () => faker.lorem.sentence()}
};

// 热门商品字段配置，添加“立即购买”按钮
let itemFieldConfig = {
    favorite: {card: true, cardSq: true, cardHoriz: true, type: 'favorite', style: {}, customClass: 'fas fa-heart favorite-icon', onClick: (item, element) => { element.classList.toggle('favorited'); }, sample: () => faker.datatype.boolean()},
    image: { card: true, cardSq: true, cardHoriz: true, type: 'image', style: {}, sample: i => getPicsumImage(300, 200, `items-${i}`) },
    title: { card: true, cardSq: true, cardHoriz: true, type: 'text', style: {}, sample: () => faker.commerce.productName() },
    price: { card: true, cardSq: true, cardHoriz: true, type: 'price', label: '价格', style: {}, sample: () => faker.commerce.price(50, 200, 2, "$") },
    stock: { card: true, cardSq: true, cardHoriz: true, type: 'text', label: '库存', style: {}, sample: () => faker.datatype.number({ min: 10, max: 100 }) },
    rating: { card: true, cardSq: true, cardHoriz: true, type: 'rating', label: '评分', style: {}, count: () => faker.datatype.number({ min: 50, max: 300 }), sample: () => faker.datatype.float({ min: 4, max: 5, precision: 0.1 }) },
    sales: { card: true, cardSq: true, cardHoriz: true, type: 'text', label: '销量', style: {}, sample: () => faker.datatype.number({ min: 100, max: 500 }) },
    store: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: '店铺', style: {}, sample: () => faker.company.companyName() },
    brandName: { card: true, cardSq: true, cardHoriz: true, type: 'text', label: '品牌', style: {}, sample: () => faker.company.companyName() },
    lastUpdate: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: '最后更新', style: {}, sample: () => `2025-03-01 12:00:11` },
    tags: { card: true, cardSq: true, cardHoriz: true, type: 'tag', label: '标签', style: {}, sample: () => faker.lorem.words(3).split(' ') },
    buyNow: { card: true, cardSq: true, cardHoriz: true, type: 'button', value: '立即购买', style: { width: '100%', display: 'block', marginTop: '0.625em' } },

    // 新增字段（面向客户展示）
    original_price: {card: true, cardSq: true, cardHoriz: true, type: 'text', label: '原价', format: (d, v) => `<span style="color: #A9A9A9; text-decoration: line-through">${v}</span>`, style: {}, sample: () => faker.commerce.price(60, 250, 2, "$")},
    stock_quantity: {card: false, cardSq: false, cardHoriz: true, type: 'text', label: '总库存', format: (d, v) => `<span style="color: #4682B4">${v}</span>`, style: {}, sample: () => faker.datatype.number({ min: 50, max: 500 })},
    visit_count: {card: false, cardSq: false, cardHoriz: true, type: 'text', label: '访问量', format: (d, v) => `<span style="color: #32CD32">${v}</span>`, style: {}, sample: () => faker.datatype.number({ min: 100, max: 1000 })},
    orders_count: {card: false, cardSq: false, cardHoriz: true, type: 'text', label: '订单数', format: (d, v) => `<span style="color: #32CD32">${v}</span>`, style: {}, sample: () => faker.datatype.number({ min: 50, max: 200 })},
    sales_amount: {card: false, cardSq: false, cardHoriz: true, type: 'text', label: '总销售额', format: (d, v) => `<span style="color: #32CD32">${v}</span>`, style: {}, sample: () => faker.commerce.price(1000, 5000, 2, "$")},
    refund_count: {card: false, cardSq: false, cardHoriz: true, type: 'text', label: '退货数', format: (d, v) => `<span style="color: #FF4500">${v}</span>`, style: {}, sample: () => faker.datatype.number({ min: 0, max: 10 })},
    comment_count: {card: false, cardSq: false, cardHoriz: true, type: 'text', label: '评论数', format: (d, v) => `<span style="color: #4682B4">${v}</span>`, style: {}, sample: () => faker.datatype.number({ min: 10, max: 50 })},
    save_count: {card: false, cardSq: false, cardHoriz: true, type: 'text', label: '收藏数', format: (d, v) => `<span style="color: #32CD32">${v}</span>`, style: {}, sample: () => faker.datatype.number({ min: 20, max: 100 })},
    last_restock_time: {card: false, cardSq: false, cardHoriz: true, type: 'text', label: '最后补货时间', format: (d, v) => `<span style="color: #666">${v}</span>`, style: {}, sample: () => faker.date.recent().toLocaleDateString()},
    delivery_type: {card: false, cardSq: false, cardHoriz: true, type: 'text', label: '配送方式', format: (d, v) => `<span style="color: #4682B4">${v}</span>`, style: {}, sample: () => faker.random.arrayElement(['快递', '自提', '同城配送'])},
    shelf_life: {card: false, cardSq: false, cardHoriz: true, type: 'text', label: '保质期', format: (d, v) => `<span style="color: #4682B4">${v}</span>`, style: {}, sample: () => `${faker.datatype.number({ min: 1, max: 36 })}个月`}
};

// 热门店铺字段配置，添加“进入”按钮
let storeFieldConfig = {
    favorite: {card: true, cardSq: true, cardHoriz: true, type: 'favorite', style: {}, customClass: 'fas fa-heart favorite-icon', onClick: (item, element) => { element.classList.toggle('favorited'); }, sample: () => faker.datatype.boolean()},
    image: { card: true, cardSq: true, cardHoriz: true, type: 'image', style: {}, sample: i => getPicsumImage(300, 200, `store-${i}`) },
    name: { card: true, cardSq: true, cardHoriz: true, type: 'text', style: {}, sample: () => faker.company.companyName() },
    sales: { card: true, cardSq: true, cardHoriz: true, type: 'text', label: '销量', style: {}, sample: () => faker.datatype.number({ min: 300, max: 1000 }) },
    salesTotal: { card: false, cardSq: false, cardHoriz: true, type: 'price', label: '销售额', style: {}, sample: () => faker.commerce.price(5000, 200000, 2, "$") },
    rating: { card: true, cardSq: true, cardHoriz: true, type: 'rating', label: '评分', style: {}, count: () => faker.datatype.number({ min: 50, max: 300 }), sample: () => faker.datatype.float({ min: 4, max: 5, precision: 0.1 }) },
    slogan: { card: true, cardSq: true, cardHoriz: true, type: 'text', label: '标语', style: {}, sample: () => faker.company.catchPhrase() },
    tags: { card: true, cardSq: true, cardHoriz: true, type: 'tag', label: '标签', style: {}, sample: () => faker.lorem.words(3).split(' ') },
    enter: { card: true, cardSq: true, cardHoriz: true, type: 'button', value: '进入', style: { width: '100%', display: 'block', marginTop: '0.625em' } },

    // 新增字段（面向客户展示）
    level: {card: false, cardSq: false, cardHoriz: true, type: 'text', label: '店铺等级', format: (d, v) => `<span style="color: #FFD700">Lv${v}</span>`, style: {}, sample: () => faker.datatype.number({ min: 1, max: 5 })},
    verified: {card: true, cardSq: true, cardHoriz: true, type: 'text', label: '认证状态', format: (d, v) => `<span style="color: ${v === '已认证' ? '#32CD32' : '#FF4500'}">${v}</span>`, style: {}, sample: () => faker.datatype.number({ min: 0, max: 1 }) ? '已认证' : '未认证'},
    online_status: {card: true, cardSq: true, cardHoriz: true, type: 'text', label: '在线状态', format: (d, v) => `<span style="color: ${v === '在线' ? '#32CD32' : '#A9A9A9'}">${v}</span>`, style: {}, sample: () => faker.datatype.boolean() ? '在线' : '离线'},
    country: {card: false, cardSq: false, cardHoriz: true, type: 'text', label: '国家', format: (d, v) => `<span style="color: #4682B4">${v}</span>`, style: {}, sample: () => faker.address.country()},
    work_time: {card: false, cardSq: false, cardHoriz: true, type: 'text', label: '营业时间', format: (d, v) => `<span style="color: #666">${v}</span>`, style: {}, sample: () => `${faker.datatype.number({ min: 8, max: 10 })}:00 - ${faker.datatype.number({ min: 18, max: 22 })}:00`},
    visit_count: {card: false, cardSq: false, cardHoriz: true, type: 'text', label: '访问量', format: (d, v) => `<span style="color: #32CD32">${v}</span>`, style: {}, sample: () => faker.datatype.number({ min: 500, max: 2000 })},
    orders_count: {card: false, cardSq: false, cardHoriz: true, type: 'text', label: '订单数', format: (d, v) => `<span style="color: #32CD32">${v}</span>`, style: {}, sample: () => faker.datatype.number({ min: 100, max: 500 })},
    refund_count: {card: false, cardSq: false, cardHoriz: true, type: 'text', label: '退货数', format: (d, v) => `<span style="color: #FF4500">${v}</span>`, style: {}, sample: () => faker.datatype.number({ min: 0, max: 20 })},
    comment_count: {card: false, cardSq: false, cardHoriz: true, type: 'text', label: '评论数', format: (d, v) => `<span style="color: #4682B4">${v}</span>`, style: {}, sample: () => faker.datatype.number({ min: 20, max: 100 })},
    save_count: {card: false, cardSq: false, cardHoriz: true, type: 'text', label: '收藏数', format: (d, v) => `<span style="color: #32CD32">${v}</span>`, style: {}, sample: () => faker.datatype.number({ min: 50, max: 200 })}
};

let demandFieldConfig = {
    image: { card: true, cardSq: true, cardHoriz: true, type: 'image', style: {}, sample: i => getPicsumImage(300, 200, `shop${i}`) },
    demandTitle: { card: true, cardSq: true, cardHoriz: true, type: 'text', style: {}, sample: () => faker.company.companyName() },
    brandName: { card: true, cardSq: true, cardHoriz: true, type: 'text', label: "品牌", style: {}, sample: () => faker.commerce.productName() },
    demandCount: { card: true, cardSq: true, cardHoriz: true, type: 'text', label: '需求数量', style: {}, sample: () => faker.datatype.number({ min: 5, max: 20 }) },
    price: { card: true, cardSq: true, cardHoriz: true, type: 'price', label: '出价范围', style: {}, sample: () => faker.commerce.price(50, 200, 2, "$") },
    totalPrice: { card: true, cardSq: true, cardHoriz: true, type: 'price', label: '总价', style: {}, sample: () => faker.commerce.price(1000, 5000, 2, "$") },
    bids: { card: true, cardSq: true, cardHoriz: true, type: 'text', label: '竞标人数', style: {}, sample: () => faker.datatype.number({ min: 300, max: 1000 }) },
    tags: { card: true, cardSq: true, cardHoriz: true, type: 'tag', label: '要求', style: {}, sample: () => faker.lorem.words(3).split(' ') },
    bidNow: { card: true, cardSq: true, cardHoriz: true, type: 'button', value: '投标', style: { width: '100%', display: 'block', marginTop: '0.625em' } },

    // 新增字段（面向客户展示）
    quantity: {card: false, cardSq: false, cardHoriz: true, type: 'text', label: '需求总数', format: (d, v) => `<span style="color: #4682B4">${v}</span>`, style: {}, sample: () => faker.datatype.number({ min: 10, max: 100 })},
    price_from: {card: false, cardSq: false, cardHoriz: true, type: 'text', label: '最低出价', format: (d, v) => `<span style="color: #32CD32">${v}</span>`, style: {}, sample: () => faker.commerce.price(40, 150, 2, "$")},
    price_to: {card: false, cardSq: false, cardHoriz: true, type: 'text', label: '最高出价', format: (d, v) => `<span style="color: #32CD32">${v}</span>`, style: {}, sample: () => faker.commerce.price(150, 300, 2, "$")},
    deposit: {card: false, cardSq: false, cardHoriz: true, type: 'text', label: '定金', format: (d, v) => `<span style="color: #FFD700">${v}</span>`, style: {}, sample: () => faker.commerce.price(10, 50, 2, "$")},
    samples_need: {card: false, cardSq: false, cardHoriz: true, type: 'text', label: '是否需要样品', format: (d, v) => `<span style="color: ${v === '是' ? '#32CD32' : '#A9A9A9'}">${v}</span>`, style: {}, sample: () => faker.datatype.number({ min: 0, max: 1 }) ? '是' : '否'}
};

let postsFieldConfig = {
    favorite: {card: true, cardSq: true, cardHoriz: true, type: 'favorite', style: {}, customClass: 'fas fa-heart favorite-icon', onClick: (item, element) => { element.classList.toggle('favorited'); }, sample: () => faker.datatype.boolean()},
    image: { card: true, cardSq: true, cardHoriz: true, type: 'image', style: {}, sample: i => getPicsumImage(300, 200, `article${i}`) },
    title: { card: true, cardSq: true, cardHoriz: true, type: 'text', style: {}, sample: () => faker.lorem.sentence() },
    rating: { card: true, cardSq: true, cardHoriz: true, type: 'rating', label: '评分', style: {}, count: () => faker.datatype.number({ min: 50, max: 300 }), sample: () => faker.datatype.float({ min: 4, max: 5, precision: 0.1 }) },
    author: { card: true, cardSq: true, cardHoriz: true, type: 'text', label: '作者', style: {}, sample: () => faker.name.findName() },
    content: { card: true, cardSq: true, cardHoriz: true, type: 'text', label: '内容', style: {}, sample: () => faker.lorem.paragraph() },
    paid: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: '付费', style: {}, format: (d, v) => { return v ? `<span style="color: var(--font-orange)">付费</span>` : `<span style="color: var(--font-green)">免费</span>`; }, sample: () => faker.datatype.boolean() },
    tags: { card: false, cardSq: false, cardHoriz: true, type: 'tag', label: '标签', style: {}, sample: () => faker.lorem.words(3).split(' ') },
    viewNow: { card: false, cardSq: false, cardHoriz: true, type: 'button', value: '查看', style: { width: '100%', display: 'block', marginTop: '0.625em' } },

    // 新增字段（面向客户展示）
    read_count: {card: false, cardSq: false, cardHoriz: true, type: 'text', label: '阅读量', format: (d, v) => `<span style="color: #32CD32">${v}</span>`, style: {}, sample: () => faker.datatype.number({ min: 100, max: 1000 })},
    comment_count: {card: false, cardSq: false, cardHoriz: true, type: 'text', label: '评论数', format: (d, v) => `<span style="color: #4682B4">${v}</span>`, style: {}, sample: () => faker.datatype.number({ min: 10, max: 50 })},
    save_count: {card: false, cardSq: false, cardHoriz: true, type: 'text', label: '收藏数', format: (d, v) => `<span style="color: #32CD32">${v}</span>`, style: {}, sample: () => faker.datatype.number({ min: 20, max: 100 })},
    paid_count: {card: false, cardSq: false, cardHoriz: true, type: 'text', label: '付费阅读数', format: (d, v) => `<span style="color: #FFD700">${v}</span>`, style: {}, sample: () => faker.datatype.number({ min: 0, max: 50 })},
    blog_summary: {card: false, cardSq: false, cardHoriz: true, type: 'text', label: '文章摘要', format: (d, v) => `<span style="color: #666">${v}</span>`, style: {}, sample: () => faker.lorem.sentence()},
    category: {card: true, cardSq: true, cardHoriz: true, type: 'text', label: '文章分类', format: (d, v) => `<span style="color: #1E90FF">${v}</span>`, style: {}, sample: () => faker.random.arrayElement(['科技', '生活', '美食', '旅行', '时尚'])}
};

let campaignFieldConfig = {
    favorite: {card: true, cardSq: true, cardHoriz: true, type: 'favorite', style: {}, customClass: 'fas fa-heart favorite-icon', onClick: (item, element) => { element.classList.toggle('favorited'); }, sample: () => faker.datatype.boolean()},
    image: { card: true, cardSq: true, cardHoriz: true, type: 'image', style: {}, sample: i => getPicsumImage(300, 200, `campaign${i}`) },
    title: { card: true, cardSq: true, cardHoriz: true, type: 'text', style: {}, sample: () => faker.commerce.department() },
    itemCount: { card: true, cardSq: true, cardHoriz: true, type: 'text', label: '商品数', style: {}, sample: () => faker.datatype.number({ min: 5, max: 20 }) },
    sales: { card: true, cardSq: true, cardHoriz: true, type: 'text', label: '销量', style: {}, sample: () => faker.datatype.number({ min: 200, max: 600 }) },
    orders: { card: true, cardSq: true, cardHoriz: true, type: 'text', label: '订单数', style: {}, sample: () => faker.datatype.number({ min: 50, max: 200 }) },
    favorites: { card: true, cardSq: true, cardHoriz: true, type: 'text', label: '收藏数', style: {}, sample: () => faker.datatype.number({ min: 100, max: 300 }) },
    tags: { card: true, cardSq: true, cardHoriz: true, type: 'tag', label: '要求', style: {}, sample: () => faker.lorem.words(3).split(' ') },
    joinNow: { card: false, cardSq: false, cardHoriz: true, type: 'button', value: '查看', style: { width: '100%', display: 'block', marginTop: '0.625em' } },

    // 新增字段（面向客户展示）
    visit_count: {card: false, cardSq: false, cardHoriz: true, type: 'text', label: '访问量', format: (d, v) => `<span style="color: #32CD32">${v}</span>`, style: {}, sample: () => faker.datatype.number({ min: 300, max: 1500 })},
    sales_amount: {card: false, cardSq: false, cardHoriz: true, type: 'text', label: '总销售额', format: (d, v) => `<span style="color: #32CD32">${v}</span>`, style: {}, sample: () => faker.commerce.price(5000, 20000, 2, "$")},
    summary: {card: false, cardSq: false, cardHoriz: true, type: 'text', label: '活动简介', format: (d, v) => `<span style="color: #666">${v}</span>`, style: {}, sample: () => faker.lorem.sentence()}
};

let ordersCommentFieldConfig = {
    image: { card: true, cardSq: true, cardHoriz: true, type: 'image', style: {}, sample: i => getPicsumImage(300, 200, `review${i}`) },
    title: { card: true, cardSq: true, cardHoriz: true, type: 'text', style: {}, sample: () => faker.commerce.productName() },
    service: { card: true, cardSq: true, cardHoriz: true, type: 'text', label: '服务', style: {}, sample: () => faker.commerce.department() },
    rating: { card: true, cardSq: true, cardHoriz: true, type: 'rating', label: '评分', style: {}, count: () => faker.datatype.number({ min: 50, max: 300 }), sample: () => faker.datatype.float({ min: 4, max: 5, precision: 0.1 }) },
    content: { card: true, cardSq: true, cardHoriz: true, type: 'text', label: '内容', style: {}, sample: () => faker.lorem.paragraph() },

    // 新增字段（面向客户展示）
    like_count: {card: false, cardSq: false, cardHoriz: true, type: 'text', label: '点赞数', format: (d, v) => `<span style="color: #32CD32">${v}</span>`, style: {}, sample: () => faker.datatype.number({ min: 0, max: 50 })},
    un_like_count: {card: false, cardSq: false, cardHoriz: true, type: 'text', label: '反对数', format: (d, v) => `<span style="color: #FF4500">${v}</span>`, style: {}, sample: () => faker.datatype.number({ min: 0, max: 10 })}
};

window.brandFieldConfig = brandFieldConfig;
window.servicesFieldConfig = servicesFieldConfig;
window.itemFieldConfig = itemFieldConfig;
window.storeFieldConfig = storeFieldConfig;
window.demandFieldConfig = demandFieldConfig;
window.postsFieldConfig = postsFieldConfig;
window.campaignFieldConfig = campaignFieldConfig;
window.ordersCommentFieldConfig = ordersCommentFieldConfig;