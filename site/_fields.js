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
    title: { card: true, cardSq: true, cardHoriz: true, type: 'text', style: {}, sample: () => faker.commerce.productName() },

    // 新增字段（面向客户展示）
    summary: {card: false, cardSq: false, cardHoriz: true, type: 'text', label: '简介', style: {}, format: (d, v) => `<span style="color: #666">${v}</span>`, sample: () => faker.lorem.sentence()}
};

// 热门商品字段配置，添加“立即购买”按钮
let itemFieldConfig = {
    favorite: {card: true, cardSq: true, cardHoriz: true, type: 'favorite', style: {}, customClass: 'fas fa-heart favorite-icon', onClick: (item, element) => {
        element.classList.toggle('favorited');
    }, sample: () => faker.datatype.boolean()},
    image: { card: true, cardSq: true, cardHoriz: true, type: 'image', style: {}, sample: i => getPicsumImage(300, 200, `items-${randomInt(0,1000)}`) },
    name: { card: true, cardSq: true, cardHoriz: true, type: 'text', style: {}, sample: () => faker.commerce.productName() },
    price: { card: true, cardSq: true, cardHoriz: true, type: 'price', label: '价格', style: {}, sample: () => faker.commerce.price(50, 200, 2, "$") },
    stock: { card: true, cardSq: true, cardHoriz: true, type: 'text', label: '库存', style: {}, sample: () => faker.datatype.number({ min: 10, max: 100 }) },
    rating: { card: true, cardSq: true, cardHoriz: true, type: 'rating', label: '评分', style: {}, count: () => faker.datatype.number({ min: 50, max: 300 }), sample: () => faker.datatype.float({ min: 4, max: 5, precision: 0.1 }) },
    sales: { card: false, cardSq: true, cardHoriz: true, type: 'text', label: '销量', style: {}, sample: () => faker.datatype.number({ min: 100, max: 500 }) },
    store: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: '店铺', style: {}, sample: () => faker.company.companyName() },
    brandName: { card: true, cardSq: true, cardHoriz: true, type: 'text', label: '品牌', style: {}, sample: () => {return generateBrand()} },
    service: { card: true, cardSq: true, cardHoriz: true, type: 'text', label: '服务', style: {}, sample: () => {return generateServices()} },
    lastUpdate: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: '最后更新', style: {}, sample: () => `2025-03-01 12:00:11` },
    tags: { card: true, cardSq: true, cardHoriz: true, type: 'tag', label: '标签', style: {}, sample: () => {return generateTag(1,3)} },
    attributes: { card: true, cardSq: true, cardHoriz: true, type: 'tag', label: '属性', style: {}, sample: () => {return generateAttr(1,3)}},

    // 新增字段（面向客户展示）
    original_price: {card: false, cardSq: false, cardHoriz: true, type: 'text', label: '原价', format: (d, v) => `<span style="color: #A9A9A9; text-decoration: line-through">${v}</span>`, style: {}, sample: () => faker.commerce.price(60, 250, 2, "$")},
    stock_quantity: {card: false, cardSq: false, cardHoriz: true, type: 'text', label: '总库存', format: (d, v) => `<span style="color: #4682B4">${v}</span>`, style: {}, sample: () => faker.datatype.number({ min: 50, max: 500 })},
    visit_count: {card: false, cardSq: false, cardHoriz: true, type: 'text', label: '访问量', format: (d, v) => `<span style="color: #32CD32">${v}</span>`, style: {}, sample: () => faker.datatype.number({ min: 100, max: 1000 })},
    orders_count: {card: false, cardSq: false, cardHoriz: true, type: 'text', label: '订单数', format: (d, v) => `<span style="color: #32CD32">${v}</span>`, style: {}, sample: () => faker.datatype.number({ min: 50, max: 200 })},
    sales_amount: {card: false, cardSq: false, cardHoriz: true, type: 'text', label: '总销售额', format: (d, v) => `<span style="color: #32CD32">${v}</span>`, style: {}, sample: () => faker.commerce.price(1000, 5000, 2, "$")},
    refund_count: {card: false, cardSq: false, cardHoriz: true, type: 'text', label: '退货数', format: (d, v) => `<span style="color: #FF4500">${v}</span>`, style: {}, sample: () => faker.datatype.number({ min: 0, max: 10 })},
    replacement_count: {card: false, cardSq: false, cardHoriz: true, type: 'text', label: '换货数', format: (d, v) => `<span style="color: #FF4500">${v}</span>`, style: {}, sample: () => faker.datatype.number({ min: 0, max: 10 })},
    comment_count: {card: false, cardSq: false, cardHoriz: true, type: 'text', label: '评论数', format: (d, v) => `<span style="color: #4682B4">${v}</span>`, style: {}, sample: () => faker.datatype.number({ min: 10, max: 50 })},
    save_count: {card: false, cardSq: false, cardHoriz: true, type: 'text', label: '收藏数', format: (d, v) => `<span style="color: #32CD32">${v}</span>`, style: {}, sample: () => faker.datatype.number({ min: 20, max: 100 })},
    after_sales_time: {card: false, cardSq: false, cardHoriz: true, type: 'text', label: '售后时间', format: (d, v) => `<span style="color: #666">${v}</span>`, style: {}, sample: () => faker.date.recent().toLocaleDateString()},
    last_restock_time: {card: false, cardSq: false, cardHoriz: true, type: 'text', label: '最后补货时间', format: (d, v) => `<span style="color: #666">${v}</span>`, style: {}, sample: () => faker.date.recent().toLocaleDateString()},
    delivery_type: {card: false, cardSq: false, cardHoriz: true, type: 'text', label: '配送方式', format: (d, v) => `<span style="color: #4682B4">${v}</span>`, style: {}, sample: () => faker.random.arrayElement(['快递', '自提', '同城配送'])},

    seo_keywords: { card: false, cardSq: false, cardHoriz: false, type: 'text', label: 'SEO关键词', style: {}, sample: () => faker.lorem.words(5) },
    seo_description: { card: false, cardSq: false, cardHoriz: false, type: 'text', label: 'SEO描述', style: {}, sample: () => faker.lorem.sentence() },
    after_sales_rules: { card: false, cardSq: false, cardHoriz: false, type: 'text', label: '售后规则', format: (d, v) => `<span style="color: #666">${v}</span>`, style: {}, sample: () => faker.lorem.paragraph() },
    sample_pics: { card: false, cardSq: false, cardHoriz: false, type: 'image', label: '样品图片', style: {}, sample: i => `[${getPicsumImage(300, 200, `sample-${randomInt(0,1000)}`)}]` },
    content: { card: false, cardSq: false, cardHoriz: false, type: 'text', label: '商品内容', style: {}, sample: () => faker.lorem.paragraphs(3) },

    buyNow: { card: true, cardSq: true, cardHoriz: true, type: 'button', value: 'Buy Now', style: { width: '100%', display: 'block', marginTop: '0.625em' } },
};

let itemShowFieldConfig = {
    id: { card: false, cardSq: false, cardHoriz: false, type: 'text', label: 'ID', style: {}, sample: () => faker.datatype.number({ min: 1, max: 10000 }) },
    item_id: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: '商品ID', style: {}, sample: () => faker.datatype.number({ min: 1, max: 10000 }) },
    status: {
        card: true, cardSq: true, cardHoriz: true,
        type: 'text',
        label: '状态',
        format: (d, v) => `<span style="color: ${v === 0 ? '#A9A9A9' : '#32CD32'}">${v === 0 ? '禁用' : '启用'}</span>`,
        style: {},
        sample: () => faker.datatype.number({ min: 0, max: 1 })
    },
    sort_index: { card: true, cardSq: true, cardHoriz: true, type: 'text', label: '排序', style: {}, sample: () => faker.datatype.number({ min: 0, max: 100 }) },
    version: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: '版本', style: {}, sample: () => faker.datatype.number({ min: 0, max: 5 }) },
    language: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: '语言', style: {}, sample: () => faker.random.arrayElement(['en_US', 'zh_CN']) },
    title: { card: true, cardSq: true, cardHoriz: true, type: 'text', label: '标题', style: {}, sample: () => faker.lorem.sentence() },
    summary: { card: true, cardSq: true, cardHoriz: true, type: 'text', label: '摘要', style: {}, sample: () => faker.lorem.paragraph() },
    show_data: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: '展示数据', style: {}, sample: () => Array(randomInt(2, 5)).fill().map((_, i) => getPicsumImage(300, 200, `sample-${i}`)) },
    create_time: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: '创建时间', style: {}, sample: () => faker.date.past().toLocaleString() },
    update_time: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: '更新时间', style: {}, sample: () => faker.date.recent().toLocaleString() }
};

let itemStatLogFieldConfig = {
    id: { card: false, cardSq: false, cardHoriz: false, type: 'text', label: 'ID', style: {}, sample: () => faker.datatype.number({ min: 1, max: 10000 }) },
    date: { card: true, cardSq: true, cardHoriz: true, type: 'text', label: '日期', style: {}, sample: () => faker.date.recent().toLocaleDateString() },
    store_id: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: '店铺ID', style: {}, sample: () => faker.datatype.number({ min: 1, max: 500 }) },
    item_id: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: '商品ID', style: {}, sample: () => faker.datatype.number({ min: 1, max: 10000 }) },
    visit_count: { card: true, cardSq: true, cardHoriz: true, type: 'text', label: '访问量', format: (d, v) => `<span style="color: #32CD32">${v}</span>`, style: {}, sample: () => faker.datatype.number({ min: 100, max: 1000 }) },
    orders_count: { card: true, cardSq: true, cardHoriz: true, type: 'text', label: '订单数', format: (d, v) => `<span style="color: #32CD32">${v}</span>`, style: {}, sample: () => faker.datatype.number({ min: 50, max: 200 }) },
    sales_amount: { card: true, cardSq: true, cardHoriz: true, type: 'text', label: '总销售额', format: (d, v) => `<span style="color: #32CD32">${v}</span>`, style: {}, sample: () => faker.commerce.price(1000, 5000, 2, "$") },
    refund_amount: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: '退款金额', format: (d, v) => `<span style="color: #FF4500">${v}</span>`, style: {}, sample: () => faker.commerce.price(0, 100, 2, "$") },
    sales_count: { card: true, cardSq: true, cardHoriz: true, type: 'text', label: '销售数量', format: (d, v) => `<span style="color: #32CD32">${v}</span>`, style: {}, sample: () => faker.datatype.number({ min: 100, max: 500 }) },
    replacement_count: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: '换货数', format: (d, v) => `<span style="color: #FF4500">${v}</span>`, style: {}, sample: () => faker.datatype.number({ min: 0, max: 10 }) },
    refund_count: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: '退货数', format: (d, v) => `<span style="color: #FF4500">${v}</span>`, style: {}, sample: () => faker.datatype.number({ min: 0, max: 10 }) },
    comment_count: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: '评论数', format: (d, v) => `<span style="color: #4682B4">${v}</span>`, style: {}, sample: () => faker.datatype.number({ min: 10, max: 50 }) },
    rating_count: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: '评分次数', style: {}, sample: () => faker.datatype.number({ min: 50, max: 300 }) },
    rating: { card: true, cardSq: true, cardHoriz: true, type: 'rating', label: '评分', style: {}, count: () => faker.datatype.number({ min: 50, max: 300 }), sample: () => faker.datatype.float({ min: 4, max: 5, precision: 0.1 }) },
    save_count: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: '收藏数', format: (d, v) => `<span style="color: #32CD32">${v}</span>`, style: {}, sample: () => faker.datatype.number({ min: 20, max: 100 }) },
    ticket_count: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: '票据数', format: (d, v) => `<span style="color: #4682B4">${v}</span>`, style: {}, sample: () => faker.datatype.number({ min: 0, max: 20 }) },
    subscribe_count: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: '订阅数', format: (d, v) => `<span style="color: #32CD32">${v}</span>`, style: {}, sample: () => faker.datatype.number({ min: 0, max: 50 }) },
    deal_avg_count: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: '平均订单数', format: (d, v) => `<span style="color: #4682B4">${v}</span>`, style: {}, sample: () => faker.datatype.float({ min: 0, max: 100, precision: 0.01 }) },
    deal_avg_money: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: '平均订单金额', format: (d, v) => `<span style="color: #4682B4">${v}</span>`, style: {}, sample: () => faker.commerce.price(10, 1000, 2, "$") },
    update_time: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: '更新时间', style: {}, sample: () => faker.date.recent().toLocaleString() }
};

let itemWholesaleFieldConfig = {
    id: { card: false, cardSq: false, cardHoriz: false, type: 'text', label: 'ID', style: {}, sample: () => faker.datatype.number({ min: 1, max: 10000 }) },
    item_id: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: '商品ID', style: {}, sample: () => faker.datatype.number({ min: 1, max: 10000 }) },
    status: {
        card: true, cardSq: true, cardHoriz: true,
        type: 'text',
        label: '状态',
        format: (d, v) => `<span style="color: ${v === 0 ? '#A9A9A9' : '#32CD32'}">${v === 0 ? '禁用' : '启用'}</span>`,
        style: {},
        sample: () => faker.datatype.number({ min: 0, max: 1 })
    },
    quantity: { card: true, cardSq: true, cardHoriz: true, type: 'text', label: '批发数量', format: (d, v) => `<span style="color: #4682B4">${v}</span>`, style: {}, sample: () => faker.datatype.number({ min: 10, max: 100 }) },
    discount: { card: true, cardSq: true, cardHoriz: true, type: 'text', label: '折扣', format: (d, v) => `<span style="color: #32CD32">${(v * 100).toFixed(0)}%</span>`, style: {}, sample: () => faker.datatype.float({ min: 0.1, max: 0.5, precision: 0.01 }) },
    unit_price: { card: true, cardSq: true, cardHoriz: true, type: 'price', label: '批发单价', style: {}, sample: () => faker.commerce.price(50, 200, 2, "$") },
    create_time: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: '创建时间', style: {}, sample: () => faker.date.past().toLocaleString() },
    update_time: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: '更新时间', style: {}, sample: () => faker.date.recent().toLocaleString() }
};

// 热门店铺字段配置，添加“进入”按钮
let storeFieldConfig = {
    favorite: {card: true, cardSq: true, cardHoriz: true, type: 'favorite', style: {}, customClass: 'fas fa-heart favorite-icon', onClick: (item, element) => { element.classList.toggle('favorited'); }, sample: () => faker.datatype.boolean()},
    image: { card: true, cardSq: true, cardHoriz: true, type: 'image', style: {}, sample: i => getPicsumImage(300, 200, `store-${randomInt(0,1000)}`) },
    name: { card: true, cardSq: true, cardHoriz: true, type: 'text', style: {}, sample: () => {
        let name = faker.company.companyName()
        return name.length > 12 ? name.substring(0,12): name;
    } },
    sales: { card: true, cardSq: true, cardHoriz: true, type: 'text', label: '销量', style: {}, sample: () => faker.datatype.number({ min: 300, max: 1000 }) },
    salesTotal: { card: false, cardSq: false, cardHoriz: true, type: 'price', label: '销售额', style: {}, sample: () => faker.commerce.price(5000, 200000, 2, "$") },
    rating: { card: true, cardSq: true, cardHoriz: true, type: 'rating', label: '评分', style: {}, count: () => faker.datatype.number({ min: 50, max: 300 }), sample: () => faker.datatype.float({ min: 4, max: 5, precision: 0.1 }) },
    slogan: { card: true, cardSq: true, cardHoriz: true, type: 'text', label: '标语', style: {}, sample: () => faker.lorem.paragraph(2) },
    about_me: { card: false, cardSq: false, cardHoriz: false, type: 'text', label: '关于我', style: {}, sample: () => faker.lorem.paragraph(3) },
    services: {
        card: true, cardSq: true, cardHoriz: true, type: 'text', label: '服务', style: {},
        format: (t, d, v) => {
                let all = v.map(service => `<a href="store.html?name=${t.name}&services=${service}" style="color: var(--font-orange);">${service}</a>`).join('，');
                return `${all}`;
        },
        sample: () => {
            const count = randomInt(1, 3);
            const shuffled = services.sort(() => 0.5 - Math.random());
            return shuffled.slice(0, count).map(service => service.name);
        }
    },
    brands: {
        card: true, cardSq: true, cardHoriz: true,type: 'text', label: '品牌',style: {},
        format: (t, d, v) => {
            let all = v.map(brand => `<a href="store.html?name=${t.name}&brandName=${brand.name}" style="color: ${brand.themeColor}">${brand.name}</a>`).join('，');
            return `${all}`;
        },
        sample: () => {
            const count = randomInt(1, 3);
            const shuffled = hotBrands.sort(() => 0.5 - Math.random());
            return shuffled.slice(0, count).map(brand => brand);
        }
    },

    tags: { card: true, cardSq: true, cardHoriz: true, type: 'tag', label: '要求', style: {}, sample: () => {return generateTag(1,3)} },
    enter: { card: true, cardSq: true, cardHoriz: true, type: 'button', value: 'View', style: { width: '100%', display: 'block', marginTop: '0.625em' } },

    // 新增字段（面向客户展示）
    level: {card: false, cardSq: false, cardHoriz: true, type: 'text', label: '店铺等级', format: (d, v) => `<span style="color: #FFD700">Lv${v}</span>`, style: {}, sample: () => faker.datatype.number({ min: 1, max: 5 })},
    verified: {card: false, cardSq: false, cardHoriz: true, type: 'text', label: '认证状态', format: (d, v) => `<span style="color: ${v === '已认证' ? '#32CD32' : '#FF4500'}">${v}</span>`, style: {}, sample: () => faker.datatype.number({ min: 0, max: 1 }) ? '已认证' : '未认证'},
    online_status: {card: false, cardSq: false, cardHoriz: true, type: 'text', label: '在线状态', format: (d, v) => `<span style="color: ${v === '在线' ? '#32CD32' : '#A9A9A9'}">${v}</span>`, style: {}, sample: () => faker.datatype.boolean() ? '在线' : '离线'},
    country: {card: false, cardSq: false, cardHoriz: true, type: 'text', label: '国家', format: (d, v) => `<span style="color: #4682B4">${v}</span>`, style: {}, sample: () => faker.address.country()},
    work_time: {card: false, cardSq: false, cardHoriz: true, type: 'text', label: '营业时间', format: (d, v) => `<span style="color: #666">${v}</span>`, style: {}, sample: () => `${faker.datatype.number({ min: 8, max: 10 })}:00 - ${faker.datatype.number({ min: 18, max: 22 })}:00`},
    visit_count: {card: false, cardSq: false, cardHoriz: true, type: 'text', label: '访问量', format: (d, v) => `<span style="color: #32CD32">${v}</span>`, style: {}, sample: () => faker.datatype.number({ min: 500, max: 2000 })},
    orders_count: {card: false, cardSq: false, cardHoriz: true, type: 'text', label: '订单数', format: (d, v) => `<span style="color: #32CD32">${v}</span>`, style: {}, sample: () => faker.datatype.number({ min: 100, max: 500 })},
    refund_count: {card: false, cardSq: false, cardHoriz: true, type: 'text', label: '退货数', format: (d, v) => `<span style="color: #FF4500">${v}</span>`, style: {}, sample: () => faker.datatype.number({ min: 0, max: 20 })},
    comment_count: {card: false, cardSq: false, cardHoriz: true, type: 'text', label: '评论数', format: (d, v) => `<span style="color: #4682B4">${v}</span>`, style: {}, sample: () => faker.datatype.number({ min: 20, max: 100 })},
    save_count: {card: false, cardSq: true, cardHoriz: true, type: 'text', label: '收藏数', format: (d, v) => `<span style="color: #32CD32">${v}</span>`, style: {}, sample: () => faker.datatype.number({ min: 50, max: 200 })}
};

let demandFieldConfig = {
    image: { card: true, cardSq: true, cardHoriz: true, type: 'image', style: {}, sample: i => getPicsumImage(300, 200, `shop${i}`) },
    demandTitle: { card: true, cardSq: true, cardHoriz: true, type: 'text', style: {}, sample: () => faker.company.companyName() },
    brandName: { card: true, cardSq: true, cardHoriz: true, type: 'text', label: '品牌', style: {}, sample: () => {return generateBrand()} },
    service: { card: true, cardSq: true, cardHoriz: true, type: 'text', label: '服务', style: {}, sample: () => {return generateServices()} },
    demandCount: { card: true, cardSq: true, cardHoriz: true, type: 'text', label: '需求数量', style: {}, sample: () => faker.datatype.number({ min: 5, max: 20 }) },
    price: { card: true, cardSq: true, cardHoriz: true, type: 'price', label: '出价范围', style: {}, sample: () => faker.commerce.price(50, 200, 2, "$") },
    totalPrice: { card: true, cardSq: true, cardHoriz: true, type: 'price', label: '总价', style: {}, sample: () => faker.commerce.price(1000, 5000, 2, "$") },
    bid_time: {card: true, cardSq: false, cardHoriz: true, type: 'text', label: '投标时间', style: {}, format: (d, v) => {
        return `<em style="color: var(--font-green)">${v[0]}</em> ~ <em style="color: var(--red)">${v[1]}</em>`
    }, sample: () => [
        faker.date.recent().toLocaleDateString(),
            faker.date.recent().toLocaleDateString()
    ]},
    // bids: { card: true, cardSq: true, cardHoriz: true, type: 'text', label: '竞标人数', style: {}, sample: () => faker.datatype.number({ min: 300, max: 1000 }) },
    bidders: { card: true, cardSq: true, cardHoriz: true, type: 'bidders', label: '投标者', style: {}, format: (d, v) => {return ``}, sample: () => {
            return Array(randomInt(3, 10)).fill().map(() => getPicsumImage(50, 50, `bidder-${Math.random()}`))
    }},
    attributes: { card: true, cardSq: true, cardHoriz: true, type: 'tag', label: '属性', style: {}, sample: () => {return generateAttr(2,5)}},

    demand_information: { card: false, cardSq: false, cardHoriz: false, type: 'text', label: '描述', style: {}, sample: () => faker.lorem.paragraph() },
    bidNow: { card: true, cardSq: true, cardHoriz: true, type: 'button', value: 'Bid Now', style: { width: '100%', display: 'block', marginTop: '0.625em' } },

    // 新增字段（面向客户展示）
    quantity: {card: false, cardSq: false, cardHoriz: true, type: 'text', label: '需求总数', format: (d, v) => `<span style="color: #4682B4">${v}</span>`, style: {}, sample: () => faker.datatype.number({ min: 10, max: 100 })},
    price_from: {card: false, cardSq: false, cardHoriz: true, type: 'text', label: '最低出价', format: (d, v) => `<span style="color: #32CD32">${v}</span>`, style: {}, sample: () => faker.commerce.price(40, 150, 2, "$")},
    price_to: {card: false, cardSq: false, cardHoriz: true, type: 'text', label: '最高出价', format: (d, v) => `<span style="color: #32CD32">${v}</span>`, style: {}, sample: () => faker.commerce.price(150, 300, 2, "$")},
    deposit: {card: false, cardSq: false, cardHoriz: true, type: 'text', label: '定金', format: (d, v) => `<span style="color: #FFD700">${v}</span>`, style: {}, sample: () => faker.commerce.price(10, 50, 2, "$")},
    samples_need: {card: false, cardSq: false, cardHoriz: true, type: 'text', label: '是否需要样品', format: (d, v) => `<span style="color: ${v === '是' ? '#32CD32' : '#A9A9A9'}">${v}</span>`, style: {}, sample: () => faker.datatype.number({ min: 0, max: 1 }) ? '是' : '否'}
};

let postsFieldConfig = {
    image: { card: true, cardSq: true, cardHoriz: true, type: 'image', style: {}, sample: i => getPicsumImage(300, 200, `article${i}`) },
    title: { card: true, cardSq: true, cardHoriz: true, type: 'text', style: {}, sample: () => faker.lorem.sentence() },
    author: { card: true, cardSq: true, cardHoriz: true, type: 'text', label: '作者', style: {}, format: (d, v)=>{
            return `<a href="blog.html?name=${v}" style="color: var(--font-green)">${v}</a>`
        },sample: () => faker.name.findName() },
    favorite: {card: true, cardSq: true, cardHoriz: true, type: 'favorite', style: {}, customClass: 'fas fa-heart favorite-icon', onClick: (item, element) => { element.classList.toggle('favorited'); }, sample: () => faker.datatype.boolean()},
    brandName: { card: true, cardSq: true, cardHoriz: true, type: 'text', label: '品牌', style: {}, sample: () => {return generateBrand()} },
    category: {card: true, cardSq: true, cardHoriz: true, type: 'text', label: '分类', format: (d, v) => `${v}</b>`, style: {}, sample: () => {return generateArticleCategory()}},
    blog_summary: { card: true, cardSq: true, cardHoriz: true, type: 'text', label: '摘要', style: {}, sample: () => faker.lorem.paragraph() },
    paid: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: '付费', style: {}, format: (d, v) => { return v ? `<span style="color: var(--font-orange)">付费</span>` : `<span style="color: var(--font-green)">免费</span>`; }, sample: () => faker.datatype.boolean() },
    rating: { card: true, cardSq: true, cardHoriz: true, type: 'rating', label: '评分', style: {}, count: () => faker.datatype.number({ min: 50, max: 300 }), sample: () => faker.datatype.float({ min: 4, max: 5, precision: 0.1 }) },
    tags: { card: true, cardSq: true, cardHoriz: true, type: 'tag', label: '要求', style: {}, sample: () => {return generateTag(1,3)} },
    viewNow: { card: true, cardSq: false, cardHoriz: true, type: 'button', value: 'View', style: { width: '100%', display: 'block', marginTop: '0.625em' } },

    read_count: {card: false, cardSq: false, cardHoriz: true, type: 'text', label: '阅读量', format: (d, v) => `<span style="color: #32CD32">${v}</span>`, style: {}, sample: () => faker.datatype.number({ min: 100, max: 1000 })},
    comment_count: {card: false, cardSq: false, cardHoriz: true, type: 'text', label: '评论数', format: (d, v) => `<span style="color: #4682B4">${v}</span>`, style: {}, sample: () => faker.datatype.number({ min: 10, max: 50 })},
    save_count: {card: false, cardSq: false, cardHoriz: true, type: 'text', label: '收藏数', format: (d, v) => `<span style="color: #32CD32">${v}</span>`, style: {}, sample: () => faker.datatype.number({ min: 20, max: 100 })},
    paid_count: {card: false, cardSq: false, cardHoriz: true, type: 'text', label: '付费阅读数', format: (d, v) => `<span style="color: #FFD700">${v}</span>`, style: {}, sample: () => faker.datatype.number({ min: 0, max: 50 })}
};

let campaignFieldConfig = {
    favorite: {card: true, cardSq: true, cardHoriz: true, type: 'favorite', style: {}, customClass: 'fas fa-heart favorite-icon', onClick: (item, element) => { element.classList.toggle('favorited'); }, sample: () => faker.datatype.boolean()},
    image: { card: true, cardSq: true, cardHoriz: true, type: 'image', style: {}, sample: i => getPicsumImage(300, 200, `campaign${i}`) },
    title: { card: true, cardSq: true, cardHoriz: true, type: 'text', style: {}, sample: () => faker.commerce.productName() },
    itemCount: { card: true, cardSq: true, cardHoriz: true, type: 'text', label: '商品数', style: {}, sample: () => faker.datatype.number({ min: 5, max: 20 }) },
    sales: { card: true, cardSq: true, cardHoriz: true, type: 'text', label: '销量', style: {}, sample: () => faker.datatype.number({ min: 200, max: 600 }) },
    orders: { card: true, cardSq: true, cardHoriz: true, type: 'text', label: '订单数', style: {}, sample: () => faker.datatype.number({ min: 50, max: 200 }) },
    favorites: { card: true, cardSq: true, cardHoriz: true, type: 'text', label: '收藏数', style: {}, sample: () => faker.datatype.number({ min: 100, max: 300 }) },
    items: { card: true, cardSq: true, cardHoriz: true,type: 'text', label: '商品',style: {},
        format: (d, v) => {
            let all = v.map(item => `<a href="item.html?name=${item.name}" style="color: var(--font-orange);border: 1">${item.name}</a> <b style="color: red">(${item.stock}</b>)`).join('，');
            return `${all}`
        },
        sample: () => {
            return Array(randomInt(3, 5)).fill().map(() => ({
                name: faker.commerce.productName(),
                stock: faker.datatype.number({ min: 10, max: 100 })
            }));
        }
    },

    tags: { card: true, cardSq: true, cardHoriz: true, type: 'tag', label: '要求', style: {}, sample: () => {return generateTag(2,4)} },
    joinNow: { card: false, cardSq: false, cardHoriz: true, type: 'button', value: 'View', style: { width: '100%', display: 'block', marginTop: '0.625em' } },

    // 新增字段（面向客户展示）
    visit_count: {card: false, cardSq: false, cardHoriz: true, type: 'text', label: '访问量', format: (d, v) => `<span style="color: #32CD32">${v}</span>`, style: {}, sample: () => faker.datatype.number({ min: 300, max: 1500 })},
    sales_amount: {card: false, cardSq: false, cardHoriz: true, type: 'text', label: '总销售额', format: (d, v) => `<span style="color: #32CD32">${v}</span>`, style: {}, sample: () => faker.commerce.price(5000, 20000, 2, "$")},
    summary: {card: false, cardSq: false, cardHoriz: true, type: 'text', label: '活动简介', format: (d, v) => `<span style="color: #666">${v}</span>`, style: {}, sample: () => faker.lorem.sentence()}
};

const faqFieldConfig = {
    brandName: {
        type: 'tag',
        label: 'Brand',
        format: (d, v) => {
            const brand = hotBrands.find(b => b.name === v);
            const color = brand ? brand.themeColor : '#000000';
            return `<span class="ant-tag" style="color: ${color}">${v}</span>`;
        },
        sample: () => hotBrands[Math.floor(Math.random() * hotBrands.length)].name
    },
    useType: {
        type: 'tag',
        label: 'Type',
        format: (d, v) => {
            const types = ['Account Issues', 'Payment Problems', 'Shipping Delays', 'Product Questions', 'Technical Support'];
            return `<span class="${typeColors[v]}">${types[v]}</span>`;
        },
        sample: () => Math.floor(Math.random() * 5)
    },
    title: { type: 'text', label: 'Question' },
    content: { type: 'text', label: 'Answer' },
    usefulCount: { type: 'text', label: 'Useful', sample: () => Math.floor(Math.random() * 101) },
    uselessCount: { type: 'text', label: 'Useless', sample: () => Math.floor(Math.random() * 51) },
    favorited: { type: 'favorite', sample: () => Math.random() > 0.5 }
};

// orders 配置（基于 orders 和相关表）
let ordersFieldConfig = {
    id: { card: false, cardSq: false, cardHoriz: false, type: 'text', label: '订单ID', style: {}, sample: () => faker.datatype.number({ min: 100000, max: 999999 }) },
    user_id: { card: false, cardSq: false, cardHoriz: false, type: 'text', label: '用户ID', style: {}, sample: () => faker.datatype.number({ min: 1, max: 1000 }) },
    item_id: { card: false, cardSq: false, cardHoriz: false, type: 'text', label: '商品ID', style: {}, sample: () => faker.datatype.number({ min: 1, max: 10000 }) },
    posts_id: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: '帖子ID', style: {}, sample: () => faker.datatype.number({ min: 1, max: 10000 }) },
    demand_id: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: '需求ID', style: {}, sample: () => faker.datatype.number({ min: 1, max: 10000 }) },
    store_id: { card: false, cardSq: false, cardHoriz: false, type: 'text', label: '店铺ID', style: {}, sample: () => faker.datatype.number({ min: 1, max: 500 }) },
    orders_type: {
        card: true, cardSq: true, cardHoriz: true,
        type: 'text',
        label: '订单类型',
        format: (d, v) =>{
            const type = [
                "",'商品(自动)', '商品(手动)','文章','需求'
            ]
            return `<span style="color: ${d === 1 ? '#32CD32' : d === 2 ? '#FFD700' : '#4682B4'}">${type[d]}</span>`
        },
        style: {},
        sample: () => faker.random.arrayElement([1, 2, 3, 4])
    },
    status: {
        card: true, cardSq: true, cardHoriz: true,
        type: 'text',
        label: '状态',
        format: (d, v) =>{
            const type = [
                "确认中",'已付款', '已发货','已收货','已退款','完成','已取消','超时'
            ]
            const colors = {
                0: "#A9A9A9", // 确认中 - 灰色（待处理）
                1: "#32CD32", // 已付款 - 绿色（进行中）
                2: "#FFA500", // 已发货 - 橙色（运输中）
                3: "#1E90FF", // 已收货 - 蓝色（接近完成）
                4: "#FF4500", // 已退款 - 红色（异常/终止）
                5: "#008000", // 完成 - 深绿色（成功结束）
                6: "#DC143C", // 已取消 - 深红色（终止）
                7: "#708090"  // 超时 - 蓝灰色（异常）
            };
            return `<span style="color: ${colors[d]}">${type[d]}</span>`
        },
        style: {},
        sample: () => faker.datatype.number({ min: 0, max: 7 })
    },
    price: { card: true, cardSq: true, cardHoriz: true, type: 'price', label: '单价', style: {}, sample: () => faker.commerce.price(10, 500, 2, "$") },
    original_price: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: '原价', format: (d, v) => `<span style="color: #A9A9A9; text-decoration: line-through">${v}</span>`, style: {}, sample: () => faker.commerce.price(15, 600, 2, "$") },
    quantity: { card: true, cardSq: true, cardHoriz: true, type: 'text', label: '数量', style: {}, sample: () => faker.datatype.number({ min: 1, max: 10 }) },
    coupon: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: '优惠券', style: {}, sample: () => randomInt(0,1)> 0 ? String(faker.random.alphaNumeric(6)).toUpperCase() : '--' },
    coupon_discount: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: '折扣', format: (d, v) => `<span style="color: #32CD32">${(v * 100).toFixed(0)}%</span>`, style: {}, sample: () => faker.datatype.float({ min: 0.1, max: 0.5, precision: 0.01 }) },
    amount: { card: true, cardSq: true, cardHoriz: true, type: 'price', label: '总金额', style: {}, sample: () => faker.commerce.price(50, 2000, 2, "$") },
    original_amount: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: '原始总金额', format: (d, v) => `<span style="color: #A9A9A9">${v}</span>`, style: {}, sample: () => faker.commerce.price(60, 2500, 2, "$") },
    commission_amount: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: '佣金', style: {}, sample: () => faker.commerce.price(5, 100, 2, "$") },
    create_time: { card: false, cardSq: false, cardHoriz: false, type: 'text', label: '创建时间', style: {}, sample: () => faker.date.recent().toLocaleString() },
    paid_time: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: '支付时间', style: {}, sample: () => faker.date.recent().toLocaleString() },
    transaction_id: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: '交易ID', style: {}, sample: () => faker.datatype.number({ min: 1000000, max: 9999999 }) },
    finish_time: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: '完成时间', style: {}, sample: () => faker.date.recent().toLocaleString() },
    delivery_time: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: '配送时间', style: {}, sample: () => faker.date.recent().toLocaleString() },
    refund_quantity: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: '退货数量', format: (d, v) => `<span style="color: #FF4500">${v}</span>`, style: {}, sample: () => faker.datatype.number({ min: 0, max: 5 }) },
    refund_amount: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: '退款金额', format: (d, v) => `<span style="color: #FF4500">${v}</span>`, style: {}, sample: () => faker.commerce.price(0, 100, 2, "$") },
    replacement_quantity: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: '换货数量', format: (d, v) => `<span style="color: #FF4500">${v}</span>`, style: {}, sample: () => faker.datatype.number({ min: 0, max: 3 }) },
};

let ordersTicketFieldConfig = {
    id: { card: false, cardSq: false, cardHoriz: false, type: 'text', label: '票据ID', style: {}, sample: () => faker.datatype.number({ min: 100000, max: 999999 }) },
    orders_id: { card: false, cardSq: false, cardHoriz: false, type: 'text', label: '订单ID', style: {}, sample: () => faker.datatype.number({ min: 100000, max: 999999 }) },
    ticket_type: {
        card: true, cardSq: true, cardHoriz: true,
        type: 'text',
        label: '票据类型',
        format: (d, v) => `<span style="color: ${v === 0 ? '#4682B4' : '#32CD32'}">${v === 0 ? '发票' : '收据'}</span>`,
        style: {},
        sample: () => faker.datatype.number({ min: 0, max: 1 })
    },
    status: {
        card: true, cardSq: true, cardHoriz: true,
        type: 'text',
        label: '状态',
        format: (d, v) => `<span style="color: ${v === 0 ? '#A9A9A9' : '#32CD32'}">${v === 0 ? '未开具' : '已开具'}</span>`,
        style: {},
        sample: () => faker.datatype.number({ min: 0, max: 1 })
    },
    create_time: { card: false, cardSq: false, cardHoriz: false, type: 'text', label: '创建时间', style: {}, sample: () => faker.date.recent().toLocaleString() },
    issue_time: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: '开具时间', style: {}, sample: () => faker.date.recent().toLocaleString() },
};

let ordersRefundsFieldConfig = {
    id: {card: false, cardSq: false, cardHoriz: false, type: 'text', label: 'ID', style: {}, sample: () => faker.datatype.number({min: 1, max: 10000})},
    orders_id: {card: false, cardSq: false, cardHoriz: true, type: 'text', label: '订单ID', style: {}, sample: () => faker.datatype.number({min: 100000, max: 999999})},
    manage_id: {card: false, cardSq: false, cardHoriz: true, type: 'text', label: '管理员ID', style: {}, sample: () => faker.datatype.number({min: 1, max: 100})},
    store_id: {card: false, cardSq: false, cardHoriz: true, type: 'text', label: '店铺ID', style: {}, sample: () => faker.datatype.number({min: 1, max: 500})},
    quantity: {card: true, cardSq: true, cardHoriz: true, type: 'text', label: '退款数量', style: {}, sample: () => faker.datatype.number({min: 0, max: 100})},
    refund_amount: {card: true, cardSq: true, cardHoriz: true, type: 'price', label: '退款金额', style: {}, sample: () => faker.commerce.price(0, 1000, 2, "$")},
    refund_time: {card: true, cardSq: true, cardHoriz: true, type: 'text', label: '退款时间', style: {}, format: (d, v) => `<span style="color: #666">${new Date(v * 1000).toLocaleString()}</span>`, sample: () => Math.floor(faker.date.recent().getTime() / 1000)}
};

// orders_replacements 配置（订单换货记录）
let ordersReplacementsFieldConfig = {
    id: {card: false, cardSq: false, cardHoriz: false, type: 'text', label: 'ID', style: {}, sample: () => faker.datatype.number({min: 1, max: 10000})},
    orders_id: {card: false, cardSq: false, cardHoriz: true, type: 'text', label: '订单ID', style: {}, sample: () => faker.datatype.number({min: 100000, max: 999999})},
    store_id: {card: false, cardSq: false, cardHoriz: true, type: 'text', label: '店铺ID', style: {}, sample: () => faker.datatype.number({min: 1, max: 500})},
    quantity: {card: true, cardSq: true, cardHoriz: true, type: 'text', label: '换货数量', style: {}, sample: () => faker.datatype.number({min: 0, max: 100})},
    source_type: {card: true, cardSq: true, cardHoriz: true, type: 'text', label: '来源类型', format: (d, v) => `<span style="color: ${v === 1 ? '#32CD32' : '#4682B4'}">${v === 1 ? '库存' : '已发货'}</span>`, style: {}, sample: () => faker.datatype.number({min: 1, max: 2})},
    replacement_time: {card: true, cardSq: true, cardHoriz: true, type: 'text', label: '换货时间', style: {}, format: (d, v) => `<span style="color: #666">${new Date(v * 1000).toLocaleString()}</span>`, sample: () => Math.floor(faker.date.recent().getTime() / 1000)},
    replacement_data: {card: false, cardSq: false, cardHoriz: true, type: 'text', label: '换货数据', style: {}, sample: () => JSON.stringify({reason: faker.lorem.sentence()})}
};

let ordersCommentFieldConfig = {
    image: { card: true, cardSq: true, cardHoriz: true, type: 'image', style: {}, sample: i => getPicsumImage(300, 200, `review${i}`) },
    title: { card: true, cardSq: true, cardHoriz: true, type: 'text', style: {}, sample: () => faker.commerce.productName() },
    store: { card: true, cardSq: true, cardHoriz: true, type: 'text', label: "店铺",style: {}, sample: () => faker.company.companyName() },
    brandName: { card: true, cardSq: true, cardHoriz: true, type: 'text', label: '品牌', style: {}, sample: () => {return generateBrand()} },
    service: { card: true, cardSq: true, cardHoriz: true, type: 'text', label: '服务', style: {}, sample: () => {return generateServices()} },
    itemName: { card: true, cardSq: true, cardHoriz: true, type: 'text',label: 'Item', style: {}, sample: () => faker.commerce.productName() },
    rating: { card: true, cardSq: true, cardHoriz: true, type: 'rating', label: '评分', style: {}, count: () => 0, sample: () => faker.datatype.float({ min: 4, max: 5, precision: 0.1 }) },
    content: { card: true, cardSq: true, cardHoriz: true, type: 'text', label: '内容', style: {}, sample: () => faker.lorem.paragraph() },

    // 新增字段（面向客户展示）
    total: { card: false, cardSq: false, cardHoriz: false, type: 'price', label: '总价', style: {}, sample: () => faker.commerce.price(100, 1000, 2, "$") },
    quantity: { card: false, cardSq: false, cardHoriz: false, type: 'price', label: '总价', style: {}, sample: () => faker.datatype.number({ min: 1, max: 500 }) },
    item_price: { card: false, cardSq: false, cardHoriz: false, type: 'price', label: '价格', style: {}, sample: () => faker.commerce.price(50, 200, 2, "$") },
    item_image: { card: false, cardSq: false, cardHoriz: false, type: 'image', style: {}, sample: i => getPicsumImage(300, 200, `item_image${i}`) },
    like_count: {card: false, cardSq: false, cardHoriz: true, type: 'text', label: '点赞数', format: (d, v) => `<span style="color: #32CD32">${v}</span>`, style: {}, sample: () => faker.datatype.number({ min: 0, max: 50 })},
    un_like_count: {card: false, cardSq: false, cardHoriz: true, type: 'text', label: '反对数', format: (d, v) => `<span style="color: #FF4500">${v}</span>`, style: {}, sample: () => faker.datatype.number({ min: 0, max: 10 })},
};

// store_staff 配置
let storeStaffFieldConfig = {
    id: { card: false, cardSq: false, cardHoriz: false, type: 'text', label: '员工ID', style: {}, sample: () => faker.datatype.number({ min: 1, max: 10000 }) },
    store_id: { card: false, cardSq: false, cardHoriz: false, type: 'text', label: '店铺ID', style: {}, sample: () => faker.datatype.number({ min: 1, max: 500 }) },
    status: {
        card: true, cardSq: true, cardHoriz: true,
        type: 'text',
        label: '状态',
        format: (d, v) => `<span style="color: ${v === 0 ? '#A9A9A9' : '#32CD32'}">${v === 0 ? '禁用' : '启用'}</span>`,
        style: {},
        sample: () => faker.datatype.number({ min: 0, max: 1 })
    },
    title: { card: true, cardSq: true, cardHoriz: true, type: 'text', label: '职位', style: {}, sample: () => storeTitles[randomInt(0, storeTitles.length -1)] },
    username: { card: true, cardSq: true, cardHoriz: true, type: 'text', label: '用户名', style: {}, sample: () => faker.internet.userName() },
    nick_name: { card: true, cardSq: true, cardHoriz: true, type: 'text', label: '昵称', style: {}, sample: () => faker.name.firstName() },
    avatar: { card: true, cardSq: true, cardHoriz: true, type: 'image', label: '头像', style: {}, sample: i => getPicsumImage(50, 50, `staff-${i}`) },
    phone: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: '电话', style: {}, sample: () => faker.phone.phoneNumber() },
    telegram: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: 'Telegram', style: {}, sample: () => faker.internet.userName() },
    create_time: { card: false, cardSq: false, cardHoriz: false, type: 'text', label: '创建时间', style: {}, sample: () => faker.date.past().toLocaleString() },
    last_login_ip: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: '最后登录IP', style: {}, sample: () => faker.internet.ip() },
    last_login_time: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: '最后登录时间', style: {}, sample: () => faker.date.recent().toLocaleString() },
    permissions: {
        card: false, cardSq: false, cardHoriz: true,
        type: 'text',
        label: '权限',
        format: (d, v) => `<span style="color: #4682B4">${v.join(', ')}</span>`,
        style: {},
        sample: () => faker.random.arrayElements(['订单管理', '商品管理', '客户服务'], faker.datatype.number({ min: 1, max: 3 }))
    },

    online_status: {card: false, cardSq: false, cardHoriz: true, type: 'text', label: '在线状态', format: (d, v) => `<span style="color: ${v === '在线' ? '#32CD32' : '#A9A9A9'}">${v}</span>`, style: {}, sample: () => faker.datatype.boolean() ? '在线' : '离线'},
};

// store_faq 配置（合并 store_faq_lang）
let storeFaqFieldConfig = {
    id: { card: false, cardSq: false, cardHoriz: false, type: 'text', label: 'FAQ ID', style: {}, sample: () => faker.datatype.number({ min: 1, max: 10000 }) },
    store_id: { card: false, cardSq: false, cardHoriz: false, type: 'text', label: '店铺ID', style: {}, sample: () => faker.datatype.number({ min: 1, max: 500 }) },
    item_id: { card: false, cardSq: false, cardHoriz: false, type: 'text', label: '商品ID', style: {}, sample: () => faker.datatype.number({ min: 1, max: 10000 }) },
    status: {
        card: true, cardSq: true, cardHoriz: true,
        type: 'text',
        label: '状态',
        format: (d, v) => `<span style="color: ${v === 0 ? '#A9A9A9' : '#32CD32'}">${v === 0 ? '禁用' : '启用'}</span>`,
        style: {},
        sample: () => faker.datatype.number({ min: 0, max: 1 })
    },
    sort_index: { card: true, cardSq: true, cardHoriz: true, type: 'text', label: '排序', style: {}, sample: () => faker.datatype.number({ min: 0, max: 100 }) },
    create_time: { card: false, cardSq: false, cardHoriz: false, type: 'text', label: '创建时间', style: {}, sample: () => faker.date.past().toLocaleString() },
    // 合并 store_faq_lang
    question: { card: true, cardSq: true, cardHoriz: true, type: 'text', label: '问题', style: {}, sample: () => faker.lorem.sentence() },
    answer: { card: true, cardSq: true, cardHoriz: true, type: 'text', label: '回答', style: {}, sample: () => faker.lorem.paragraphs(3) },
    language: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: '语言', style: {}, sample: () => faker.random.arrayElement(['en_US', 'zh_CN']) },
    version: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: '版本', style: {}, sample: () => faker.datatype.number({ min: 0, max: 5 }) },
    seo_keywords: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: 'SEO关键词', style: {}, sample: () => faker.lorem.words(5) },
    seo_description: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: 'SEO描述', style: {}, sample: () => faker.lorem.sentence() },
    site_reply: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: '系统回复', style: {}, sample: () => faker.lorem.paragraph() },
};

// store_logs 配置
let storeLogsFieldConfig = {
    id: { card: false, cardSq: false, cardHoriz: false, type: 'text', label: '日志ID', style: {}, sample: () => faker.datatype.number({ min: 1, max: 10000 }) },
    store_id: { card: false, cardSq: false, cardHoriz: false, type: 'text', label: '店铺ID', style: {}, sample: () => faker.datatype.number({ min: 1, max: 500 }) },
    staff_id: { card: false, cardSq: false, cardHoriz: false, type: 'text', label: '员工ID', style: {}, sample: () => faker.datatype.number({ min: 1, max: 10000 }) },
    method: { card: true, cardSq: true, cardHoriz: true, type: 'text', label: '方法', style: {}, sample: () => faker.random.arrayElement(['GET', 'POST', 'PUT', 'DELETE']) },
    module: { card: true, cardSq: true, cardHoriz: true, type: 'text', label: '模块', style: {}, sample: () => faker.random.arrayElement(['订单', '商品', '用户']) },
    action: { card: true, cardSq: true, cardHoriz: true, type: 'text', label: '操作', style: {}, sample: () => faker.random.arrayElement(['创建', '更新', '删除']) },
    code: {
        card: true, cardSq: true, cardHoriz: true,
        type: 'text',
        label: '状态码',
        format: (d, v) => `<span style="color: ${v === 200 ? '#32CD32' : '#FF4500'}">${v}</span>`,
        style: {},
        sample: () => faker.random.arrayElement([200, 400, 500])
    },
    ip: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: 'IP地址', style: {}, sample: () => faker.internet.ip() },
    ua: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: '用户代理', style: {}, sample: () => faker.internet.userAgent() },
    params: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: '参数', style: {}, sample: () => JSON.stringify({ id: faker.datatype.number(), name: faker.lorem.word() }) },
    response: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: '响应', style: {}, sample: () => faker.lorem.paragraph() },
    create_time: { card: false, cardSq: false, cardHoriz: false, type: 'text', label: '创建时间', style: {}, sample: () => faker.date.recent().toLocaleString() },
};

// store_stat 配置
let storeStatFieldConfig = {
    id: { card: false, cardSq: false, cardHoriz: false, type: 'text', label: '统计ID', style: {}, sample: () => faker.datatype.number({ min: 1, max: 10000 }) },
    store_id: { card: false, cardSq: false, cardHoriz: false, type: 'text', label: '店铺ID', style: {}, sample: () => faker.datatype.number({ min: 1, max: 500 }) },
    visit_count: { card: true, cardSq: true, cardHoriz: true, type: 'text', label: '访问量', format: (d, v) => `<span style="color: #32CD32">${v}</span>`, style: {}, sample: () => faker.datatype.number({ min: 500, max: 2000 }) },
    orders_count: { card: true, cardSq: true, cardHoriz: true, type: 'text', label: '订单数', format: (d, v) => `<span style="color: #32CD32">${v}</span>`, style: {}, sample: () => faker.datatype.number({ min: 100, max: 500 }) },
    sales_amount: { card: true, cardSq: true, cardHoriz: true, type: 'text', label: '总销售额', format: (d, v) => `<span style="color: #32CD32">${v}</span>`, style: {}, sample: () => faker.commerce.price(5000, 20000, 2, "$") },
    sales_count: { card: true, cardSq: true, cardHoriz: true, type: 'text', label: '销售数量', style: {}, sample: () => faker.datatype.number({ min: 300, max: 1000 }) },
    sales_profit: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: '销售利润', style: {}, sample: () => faker.commerce.price(1000, 5000, 2, "$") },
    refund_amount: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: '退款金额', format: (d, v) => `<span style="color: #FF4500">${v}</span>`, style: {}, sample: () => faker.commerce.price(0, 1000, 2, "$") },
    withdraw_amount: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: '提现金额', style: {}, sample: () => faker.commerce.price(100, 5000, 2, "$") },
    risk_chat_count: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: '风险聊天数', style: {}, sample: () => faker.datatype.number({ min: 0, max: 50 }) },
    risk_sale_count: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: '风险销售数', style: {}, sample: () => faker.datatype.number({ min: 0, max: 50 }) },
    replacement_count: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: '换货数', format: (d, v) => `<span style="color: #FF4500">${v}</span>`, style: {}, sample: () => faker.datatype.number({ min: 0, max: 20 }) },
    refund_count: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: '退货数', format: (d, v) => `<span style="color: #FF4500">${v}</span>`, style: {}, sample: () => faker.datatype.number({ min: 0, max: 20 }) },
    comment_count: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: '评论数', format: (d, v) => `<span style="color: #4682B4">${v}</span>`, style: {}, sample: () => faker.datatype.number({ min: 20, max: 100 }) },
    save_count: { card: false, cardSq: true, cardHoriz: true, type: 'text', label: '收藏数', format: (d, v) => `<span style="color: #32CD32">${v}</span>`, style: {}, sample: () => faker.datatype.number({ min: 50, max: 200 }) },
    ticket_count: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: '票据数', style: {}, sample: () => faker.datatype.number({ min: 0, max: 50 }) },
    report_count: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: '举报数', format: (d, v) => `<span style="color: #FF4500">${v}</span>`, style: {}, sample: () => faker.datatype.number({ min: 0, max: 10 }) },
    rating_count: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: '评分次数', style: {}, sample: () => faker.datatype.number({ min: 50, max: 300 }) },
    rating: { card: true, cardSq: true, cardHoriz: true, type: 'rating', label: '评分', style: {}, count: () => faker.datatype.number({ min: 50, max: 300 }), sample: () => faker.datatype.float({ min: 4, max: 5, precision: 0.1 }) },
    response_avg_time: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: '平均响应时间', style: {}, sample: () => `${faker.datatype.number({ min: 1, max: 60 })}分钟` },
    deal_avg_money: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: '平均交易金额', style: {}, sample: () => faker.commerce.price(50, 500, 2, "$") },
    update_time: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: '更新时间', style: {}, sample: () => faker.date.recent().toLocaleString() },
};

// store_withdraw 配置
let storeWithdrawFieldConfig = {
    id: { card: false, cardSq: false, cardHoriz: false, type: 'text', label: '提现ID', style: {}, sample: () => faker.datatype.number({ min: 1, max: 10000 }) },
    user_id: { card: false, cardSq: false, cardHoriz: false, type: 'text', label: '用户ID', style: {}, sample: () => faker.datatype.number({ min: 1, max: 1000 }) },
    store_id: { card: false, cardSq: false, cardHoriz: false, type: 'text', label: '店铺ID', style: {}, sample: () => faker.datatype.number({ min: 1, max: 500 }) },
    user_wallet_id: { card: false, cardSq: false, cardHoriz: false, type: 'text', label: '钱包ID', style: {}, sample: () => faker.datatype.number({ min: 1, max: 1000 }) },
    status: {
        card: true, cardSq: true, cardHoriz: true,
        type: 'text',
        label: '状态',
        format: (d, v) => `<span style="color: ${v === 0 ? '#A9A9A9' : '#32CD32'}">${v === 0 ? '待处理' : '已完成'}</span>`,
        style: {},
        sample: () => faker.datatype.number({ min: 0, max: 1 })
    },
    current_rate: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: '当前汇率', format: (d, v) => `<span style="color: #4682B4">${(v * 100).toFixed(2)}%</span>`, style: {}, sample: () => faker.datatype.float({ min: 0.9, max: 1.1, precision: 0.01 }) },
    withdraw_amount: { card: true, cardSq: true, cardHoriz: true, type: 'text', label: '提现金额', style: {}, sample: () => faker.commerce.price(100, 5000, 2, "$") },
    transfer_amount: { card: true, cardSq: true, cardHoriz: true, type: 'text', label: '转账金额', style: {}, sample: () => faker.commerce.price(90, 4900, 2, "$") },
    fee_fixed: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: '固定费用', style: {}, sample: () => faker.commerce.price(1, 10, 2, "$") },
    fee_percent: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: '百分比费用', format: (d, v) => `<span style="color: #FF4500">${(v * 100).toFixed(2)}%</span>`, style: {}, sample: () => faker.datatype.float({ min: 0.01, max: 0.05, precision: 0.01 }) },
    create_time: { card: false, cardSq: false, cardHoriz: false, type: 'text', label: '创建时间', style: {}, sample: () => faker.date.recent().toLocaleString() },
    proof_document: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: '证明文件', style: {}, sample: () => faker.internet.url() },
    payment_bills: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: '支付账单', style: {}, sample: () => JSON.stringify({ bill_id: faker.datatype.number() }) },
    system_reply: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: '系统回复', style: {}, sample: () => faker.lorem.sentence() },
    finished_time: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: '完成时间', style: {}, sample: () => faker.date.recent().toLocaleString() },
};

// user 配置（合并 user_stat 和 user_bind）
let userFieldConfig = {
    id: { card: false, cardSq: false, cardHoriz: false, type: 'text', label: '用户ID', style: {}, sample: () => faker.datatype.number({ min: 1, max: 1000 }) },
    username: { card: true, cardSq: true, cardHoriz: true, type: 'text', label: '用户名', style: {}, sample: () => faker.internet.userName() },
    email: { card: true, cardSq: true, cardHoriz: true, type: 'text', label: '邮箱', style: {}, sample: () => faker.internet.email() },
    nickname: { card: true, cardSq: true, cardHoriz: true, type: 'text', label: '昵称', style: {}, sample: () => faker.name.findName() },
    first_name: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: '名字', style: {}, sample: () => faker.name.firstName() },
    last_name: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: '姓氏', style: {}, sample: () => faker.name.lastName() },
    avatar: { card: true, cardSq: true, cardHoriz: true, type: 'image', label: '头像', style: {}, sample: i => getPicsumImage(50, 50, `user-${i}`) },
    birth_date: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: '生日', style: {}, sample: () => faker.date.past(30).toLocaleDateString() },
    gender: {
        card: false, cardSq: false, cardHoriz: true,
        type: 'text',
        label: '性别',
        format: (d, v) => `<span style="color: ${v === 0 ? '#4682B4' : '#FF69B4'}">${v === 0 ? '男' : '女'}</span>`,
        style: {},
        sample: () => faker.datatype.number({ min: 0, max: 1 })
    },
    country: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: '国家', style: {}, sample: () => faker.address.country() },
    currency: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: '货币', style: {}, sample: () => faker.finance.currencyCode() },
    language: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: '语言', style: {}, sample: () => faker.random.arrayElement(['en_US', 'zh_CN']) },
    timezone: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: '时区', style: {}, sample: () => faker.datatype.number({ min: -12, max: 12 }) },
    api_key: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: 'API密钥', style: {}, sample: () => faker.random.alphaNumeric(32) },
    two_factors: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: '双重认证', style: {}, sample: () => faker.random.alphaNumeric(16) },
    about_me: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: '关于我', style: {}, sample: () => faker.lorem.paragraph() },
    telegram: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: 'Telegram', style: {}, sample: () => faker.internet.userName() },
    create_time: { card: false, cardSq: false, cardHoriz: false, type: 'text', label: '创建时间', style: {}, sample: () => faker.date.past().toLocaleString() },
    last_login_time: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: '最后登录时间', style: {}, sample: () => faker.date.recent().toLocaleString() },
    level: { card: true, cardSq: true, cardHoriz: true, type: 'text', label: '等级', format: (d, v) => `<span style="color: #FFD700">Lv${v}</span>`, style: {}, sample: () => faker.datatype.number({ min: 0, max: 5 }) },
    amount: { card: true, cardSq: true, cardHoriz: true, type: 'text', label: '余额', style: {}, sample: () => faker.commerce.price(0, 10000, 2, "$") },
    pending_amount: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: '待处理金额', style: {}, sample: () => faker.commerce.price(0, 1000, 2, "$") },
    freeze_amount: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: '冻结金额', style: {}, sample: () => faker.commerce.price(0, 500, 2, "$") },
    status: {
        card: true, cardSq: true, cardHoriz: true,
        type: 'text',
        label: '状态',
        format: (d, v) => `<span style="color: ${v === 0 ? '#A9A9A9' : '#32CD32'}">${v === 0 ? '禁用' : '启用'}</span>`,
        style: {},
        sample: () => faker.datatype.number({ min: 0, max: 1 })
    },
    verified: {
        card: false, cardSq: false, cardHoriz: true,
        type: 'text',
        label: '认证状态',
        format: (d, v) => `<span style="color: ${v === 0 ? '#FF4500' : '#32CD32'}">${v === 0 ? '未认证' : '已认证'}</span>`,
        style: {},
        sample: () => faker.datatype.number({ min: 0, max: 1 })
    },
    // 合并 user_stat
    stat_type: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: '统计类型', style: {}, sample: () => faker.random.arrayElement(['订单数', '消费金额']) },
    stat_count: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: '统计值', style: {}, sample: () => faker.datatype.number({ min: 0, max: 1000 }) },
    // 合并 user_bind
    platform: {
        card: false, cardSq: false, cardHoriz: true,
        type: 'text',
        label: '绑定平台',
        format: (d, v) => `<span style="color: #4682B4">${v === 0 ? '未知' : '其他'}</span>`,
        style: {},
        sample: () => faker.datatype.number({ min: 0, max: 1 })
    },
    platform_id: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: '平台ID', style: {}, sample: () => faker.random.alphaNumeric(32) },
    bind_time: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: '绑定时间', style: {}, sample: () => faker.date.past().toLocaleString() },
    relation_data: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: '关联数据', style: {}, sample: () => JSON.stringify({ key: faker.lorem.word() }) },
};

// user_sanctions 配置
let userSanctionsFieldConfig = {
    id: { card: false, cardSq: false, cardHoriz: false, type: 'text', label: '制裁ID', style: {}, sample: () => faker.datatype.number({ min: 1, max: 10000 }) },
    violations_event_id: { card: false, cardSq: false, cardHoriz: false, type: 'text', label: '违规事件ID', style: {}, sample: () => faker.datatype.number({ min: 1, max: 1000 }) },
    user_id: { card: false, cardSq: false, cardHoriz: false, type: 'text', label: '用户ID', style: {}, sample: () => faker.datatype.number({ min: 1, max: 1000 }) },
    status: {
        card: true, cardSq: true, cardHoriz: true,
        type: 'text',
        label: '状态',
        format: (d, v) => `<span style="color: ${v === 0 ? '#A9A9A9' : '#32CD32'}">${v === 0 ? '待执行' : '已执行'}</span>`,
        style: {},
        sample: () => faker.datatype.number({ min: 0, max: 1 })
    },
    sanction_type: {
        card: true, cardSq: true, cardHoriz: true,
        type: 'text',
        label: '制裁类型',
        format: (d, v) => `<span style="color: #FF4500">${v === 0 ? '聊天限制' : '其他'}</span>`,
        style: {},
        sample: () => faker.datatype.number({ min: 0, max: 1 })
    },
    action_class: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: '执行类', style: {}, sample: () => 'com.xxx.xxx.xxx' },
    sanction_data: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: '制裁数据', style: {}, sample: () => JSON.stringify({ duration: '30天' }) },
    sanction_start: { card: true, cardSq: true, cardHoriz: true, type: 'text', label: '开始时间', style: {}, sample: () => faker.date.recent().toLocaleString() },
    sanction_end: { card: true, cardSq: true, cardHoriz: true, type: 'text', label: '结束时间', style: {}, sample: () => faker.date.future().toLocaleString() },
    mark: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: '备注', style: {}, sample: () => faker.lorem.sentence() },
    create_time: { card: false, cardSq: false, cardHoriz: false, type: 'text', label: '创建时间', style: {}, sample: () => faker.date.past().toLocaleString() },
};

// user_kyc 配置
let userKycFieldConfig = {
    id: { card: false, cardSq: false, cardHoriz: false, type: 'text', label: 'KYC ID', style: {}, sample: () => faker.datatype.number({ min: 1, max: 10000 }) },
    status: {
        card: true, cardSq: true, cardHoriz: true,
        type: 'text',
        label: '状态',
        format: (d, v) => `<span style="color: ${v === 0 ? '#A9A9A9' : '#32CD32'}">${v === 0 ? '待审核' : '已通过'}</span>`,
        style: {},
        sample: () => faker.datatype.number({ min: 0, max: 1 })
    },
    user_id: { card: false, cardSq: false, cardHoriz: false, type: 'text', label: '用户ID', style: {}, sample: () => faker.datatype.number({ min: 1, max: 1000 }) },
    version: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: '版本', style: {}, sample: () => faker.datatype.number({ min: 0, max: 5 }) },
    kyc_type: {
        card: true, cardSq: true, cardHoriz: true,
        type: 'text',
        label: 'KYC类型',
        format: (d, v) => `<span style="color: #4682B4">${v === 0 ? '身份证' : v === 1 ? '护照' : '驾驶证'}</span>`,
        style: {},
        sample: () => faker.datatype.number({ min: 0, max: 2 })
    },
    country: { card: true, cardSq: true, cardHoriz: true, type: 'text', label: '国家', style: {}, sample: () => faker.address.country() },
    first_name: { card: true, cardSq: true, cardHoriz: true, type: 'text', label: '名字', style: {}, sample: () => faker.name.firstName() },
    middle_name: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: '中间名', style: {}, sample: () => faker.name.firstName() },
    last_name: { card: true, cardSq: true, cardHoriz: true, type: 'text', label: '姓氏', style: {}, sample: () => faker.name.lastName() },
    id_number: { card: true, cardSq: true, cardHoriz: true, type: 'text', label: '证件号码', style: {}, sample: () => faker.random.alphaNumeric(10) },
    birth_date: { card: true, cardSq: true, cardHoriz: true, type: 'text', label: '出生日期', style: {}, sample: () => faker.date.past(30).toLocaleDateString() },
    start_date: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: '生效日期', style: {}, sample: () => faker.date.past(5).toLocaleDateString() },
    expire_date: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: '到期日期', style: {}, sample: () => faker.date.future(5).toLocaleDateString() },
    id_pic: { card: true, cardSq: true, cardHoriz: true, type: 'image', label: '证件照片', style: {}, sample: i => getPicsumImage(300, 200, `kyc-${i}`) },
    hands_pic: { card: false, cardSq: false, cardHoriz: true, type: 'image', label: '手持照片', style: {}, sample: i => getPicsumImage(300, 200, `hands-${i}`) },
    reply_message: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: '回复消息', style: {}, sample: () => faker.lorem.sentence() },
    create_time: { card: false, cardSq: false, cardHoriz: false, type: 'text', label: '创建时间', style: {}, sample: () => faker.date.past().toLocaleString() },
};

// user_blog 配置
let userBlogFieldConfig = {
    id: { card: false, cardSq: false, cardHoriz: false, type: 'text', label: '博客ID', style: {}, sample: () => faker.datatype.number({ min: 1, max: 10000 }) },
    user_id: { card: false, cardSq: false, cardHoriz: false, type: 'text', label: '用户ID', style: {}, sample: () => faker.datatype.number({ min: 1, max: 1000 }) },
    store_id: { card: false, cardSq: false, cardHoriz: false, type: 'text', label: '店铺ID', style: {}, sample: () => faker.datatype.number({ min: 1, max: 500 }) },
    version: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: '版本', style: {}, sample: () => faker.datatype.number({ min: 0, max: 5 }) },
    author_name: { card: true, cardSq: true, cardHoriz: true, type: 'text', label: '作者', style: {}, sample: () => faker.name.findName() },
    blog_status: {
        card: true, cardSq: true, cardHoriz: true,
        type: 'text',
        label: '状态',
        format: (d, v) => `<span style="color: ${v === 0 ? '#A9A9A9' : '#32CD32'}">${v === 0 ? '草稿' : '已发布'}</span>`,
        style: {},
        sample: () => faker.datatype.number({ min: 0, max: 1 })
    },
    blog_url: { card: true, cardSq: true, cardHoriz: true, type: 'text', label: '博客URL', style: {}, sample: () => faker.internet.url() },
    read_count: { card: true, cardSq: true, cardHoriz: true, type: 'text', label: '阅读量', format: (d, v) => `<span style="color: #32CD32">${v}</span>`, style: {}, sample: () => faker.datatype.number({ min: 100, max: 1000 }) },
    rating_count: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: '评分次数', style: {}, sample: () => faker.datatype.number({ min: 50, max: 300 }) },
    save_count: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: '收藏数', format: (d, v) => `<span style="color: #32CD32">${v}</span>`, style: {}, sample: () => faker.datatype.number({ min: 20, max: 100 }) },
    paid_count: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: '付费阅读数', format: (d, v) => `<span style="color: #FFD700">${v}</span>`, style: {}, sample: () => faker.datatype.number({ min: 0, max: 50 }) },
    posts_count: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: '帖子数', style: {}, sample: () => faker.datatype.number({ min: 1, max: 20 }) },
    risk_post_count: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: '风险帖子数', format: (d, v) => `<span style="color: #FF4500">${v}</span>`, style: {}, sample: () => faker.datatype.number({ min: 0, max: 5 }) },
    money_posts_count: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: '付费帖子数', style: {}, sample: () => faker.datatype.number({ min: 0, max: 10 }) },
    comment_count: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: '评论数', format: (d, v) => `<span style="color: #4682B4">${v}</span>`, style: {}, sample: () => faker.datatype.number({ min: 10, max: 50 }) },
    money_amount: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: '收入金额', style: {}, sample: () => faker.commerce.price(0, 1000, 2, "$") },
    seo_keywords: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: 'SEO关键词', style: {}, sample: () => faker.lorem.words(5) },
    seo_description: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: 'SEO描述', style: {}, sample: () => faker.lorem.sentence() },
    blog_summary: { card: true, cardSq: true, cardHoriz: true, type: 'text', label: '摘要', style: {}, sample: () => faker.lorem.paragraph() },
    blog_info: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: '博客内容', style: {}, sample: () => faker.lorem.paragraphs(5) },
    create_time: { card: false, cardSq: false, cardHoriz: false, type: 'text', label: '创建时间', style: {}, sample: () => faker.date.past().toLocaleString() },
    update_time: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: '更新时间', style: {}, sample: () => faker.date.recent().toLocaleString() },
    site_reply: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: '系统回复', style: {}, sample: () => faker.lorem.paragraph() },
};

// user_transaction 配置
let userTransactionFieldConfig = {
    id: { card: false, cardSq: false, cardHoriz: false, type: 'text', label: '交易ID', style: {}, sample: () => faker.datatype.number({ min: 1, max: 10000 }) },
    user_id: { card: false, cardSq: false, cardHoriz: false, type: 'text', label: '用户ID', style: {}, sample: () => faker.datatype.number({ min: 1, max: 1000 }) },
    store_id: { card: false, cardSq: false, cardHoriz: false, type: 'text', label: '店铺ID', style: {}, sample: () => faker.datatype.number({ min: 1, max: 500 }) },
    change_type: {
        card: true, cardSq: true, cardHoriz: true,
        type: 'text',
        label: '变动类型',
        format: (d, v) => `<span style="color: ${v === 0 ? '#32CD32' : '#FF4500'}">${v === 0 ? '收入' : '支出'}</span>`,
        style: {},
        sample: () => faker.datatype.number({ min: 0, max: 1 })
    },
    change_money: { card: true, cardSq: true, cardHoriz: true, type: 'text', label: '变动金额', style: {}, sample: () => faker.commerce.price(10, 1000, 2, "$") },
    rest_amount: { card: true, cardSq: true, cardHoriz: true, type: 'text', label: '剩余金额', style: {}, sample: () => faker.commerce.price(0, 10000, 2, "$") },
    relation_id: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: '关联ID', style: {}, sample: () => faker.datatype.number({ min: 1, max: 10000 }) },
    change_info: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: '变动信息', style: {}, sample: () => JSON.stringify({ reason: faker.lorem.word() }) },
    status: {
        card: true, cardSq: true, cardHoriz: true,
        type: 'text',
        label: '状态',
        format: (d, v) => `<span style="color: ${v === 0 ? '#A9A9A9' : '#32CD32'}">${v === 0 ? '待处理' : '已完成'}</span>`,
        style: {},
        sample: () => faker.datatype.number({ min: 0, max: 1 })
    },
    create_time: { card: false, cardSq: false, cardHoriz: false, type: 'text', label: '创建时间', style: {}, sample: () => faker.date.recent().toLocaleString() },
};

// user_wallet 配置
let userWalletFieldConfig = {
    id: { card: false, cardSq: false, cardHoriz: false, type: 'text', label: '钱包ID', style: {}, sample: () => faker.datatype.number({ min: 1, max: 1000 }) },
    status: {
        card: true, cardSq: true, cardHoriz: true,
        type: 'text',
        label: '状态',
        format: (d, v) => `<span style="color: ${v === 0 ? '#A9A9A9' : '#32CD32'}">${v === 0 ? '禁用' : '启用'}</span>`,
        style: {},
        sample: () => faker.datatype.number({ min: 0, max: 1 })
    },
    wallet_name: { card: true, cardSq: true, cardHoriz: true, type: 'text', label: '钱包名称', style: {}, sample: () => faker.finance.accountName() },
    user_id: { card: false, cardSq: false, cardHoriz: false, type: 'text', label: '用户ID', style: {}, sample: () => faker.datatype.number({ min: 1, max: 1000 }) },
    wallet_type: {
        card: true, cardSq: true, cardHoriz: true,
        type: 'text',
        label: '钱包类型',
        format: (d, v) => `<span style="color: #4682B4">${v === 0 ? '银行卡' : v === 1 ? 'PayPal' : '其他'}</span>`,
        style: {},
        sample: () => faker.datatype.number({ min: 0, max: 2 })
    },
    country: { card: true, cardSq: true, cardHoriz: true, type: 'text', label: '国家', style: {}, sample: () => faker.address.country() },
    first_name: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: '名字', style: {}, sample: () => faker.name.firstName() },
    middle_name: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: '中间名', style: {}, sample: () => faker.name.firstName() },
    last_name: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: '姓氏', style: {}, sample: () => faker.name.lastName() },
    receive_account: { card: true, cardSq: true, cardHoriz: true, type: 'text', label: '收款账户', style: {}, sample: () => faker.finance.account() },
    extra_data: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: '额外数据', style: {}, sample: () => JSON.stringify({ bank: faker.finance.accountName() }) },
    create_time: { card: false, cardSq: false, cardHoriz: false, type: 'text', label: '创建时间', style: {}, sample: () => faker.date.past().toLocaleString() },
};

// user_logs 配置
let userLogsFieldConfig = {
    id: { card: false, cardSq: false, cardHoriz: false, type: 'text', label: '日志ID', style: {}, sample: () => faker.datatype.number({ min: 1, max: 10000 }) },
    user_id: { card: false, cardSq: false, cardHoriz: false, type: 'text', label: '用户ID', style: {}, sample: () => faker.datatype.number({ min: 1, max: 1000 }) },
    method: { card: true, cardSq: true, cardHoriz: true, type: 'text', label: '方法', style: {}, sample: () => faker.random.arrayElement(['GET', 'POST', 'PUT', 'DELETE']) },
    module: { card: true, cardSq: true, cardHoriz: true, type: 'text', label: '模块', style: {}, sample: () => faker.random.arrayElement(['订单', '商品', '用户']) },
    action: { card: true, cardSq: true, cardHoriz: true, type: 'text', label: '操作', style: {}, sample: () => faker.random.arrayElement(['创建', '更新', '删除']) },
    code: {
        card: true, cardSq: true, cardHoriz: true,
        type: 'text',
        label: '状态码',
        format: (d, v) => `<span style="color: ${v === 200 ? '#32CD32' : '#FF4500'}">${v}</span>`,
        style: {},
        sample: () => faker.random.arrayElement([200, 400, 500])
    },
    ip: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: 'IP地址', style: {}, sample: () => faker.internet.ip() },
    ua: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: '用户代理', style: {}, sample: () => faker.internet.userAgent() },
    params: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: '参数', style: {}, sample: () => JSON.stringify({ id: faker.datatype.number(), name: faker.lorem.word() }) },
    response: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: '响应', style: {}, sample: () => faker.lorem.paragraph() },
    create_time: { card: false, cardSq: false, cardHoriz: false, type: 'text', label: '创建时间', style: {}, sample: () => faker.date.recent().toLocaleString() },
};

// complaint 配置
let complaintFieldConfig = {
    id: { card: false, cardSq: false, cardHoriz: false, type: 'text', label: '投诉ID', style: {}, sample: () => faker.datatype.number({ min: 1, max: 10000 }) },
    report_user_id: { card: false, cardSq: false, cardHoriz: false, type: 'text', label: '举报用户ID', style: {}, sample: () => faker.datatype.number({ min: 1, max: 1000 }) },
    store_id: { card: false, cardSq: false, cardHoriz: false, type: 'text', label: '店铺ID', style: {}, sample: () => faker.datatype.number({ min: 1, max: 500 }) },
    item_id: { card: false, cardSq: false, cardHoriz: false, type: 'text', label: '商品ID', style: {}, sample: () => faker.datatype.number({ min: 1, max: 10000 }) },
    manage_id: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: '管理员ID', style: {}, sample: () => faker.datatype.number({ min: 1, max: 100 }) },
    posts_id: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: '帖子ID', style: {}, sample: () => faker.datatype.number({ min: 1, max: 10000 }) },
    demand_id: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: '需求ID', style: {}, sample: () => faker.datatype.number({ min: 1, max: 10000 }) },
    rules_id: { card: false, cardSq: false, cardHoriz: false, type: 'text', label: '规则ID', style: {}, sample: () => faker.datatype.number({ min: 1, max: 1000 }) },
    status: {
        card: true, cardSq: true, cardHoriz: true,
        type: 'text',
        label: '状态',
        format: (d, v) => `<span style="color: ${v === 0 ? '#A9A9A9' : '#32CD32'}">${v === 0 ? '待处理' : '已处理'}</span>`,
        style: {},
        sample: () => faker.datatype.number({ min: 0, max: 1 })
    },
    create_time: { card: false, cardSq: false, cardHoriz: false, type: 'text', label: '创建时间', style: {}, sample: () => faker.date.past().toLocaleString() },
    store_reply_time: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: '店铺回复时间', style: {}, sample: () => faker.date.recent().toLocaleString() },
    system_reply_time: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: '系统回复时间', style: {}, sample: () => faker.date.recent().toLocaleString() },
    complaint_content: { card: true, cardSq: true, cardHoriz: true, type: 'text', label: '投诉内容', style: {}, sample: () => faker.lorem.paragraphs(3) },
    store_reply: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: '店铺回复', style: {}, sample: () => faker.lorem.paragraph() },
    site_reply: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: '系统回复', style: {}, sample: () => faker.lorem.paragraph() },
};

// pages 配置（假设 pages 主表，合并 pages_lang）
let pagesFieldConfig = {
    id: { card: false, cardSq: false, cardHoriz: false, type: 'text', label: '页面ID', style: {}, sample: () => faker.datatype.number({ min: 1, max: 10000 }) },
    status: {
        card: false, cardSq: false, cardHoriz: false,
        type: 'text',
        label: '状态',
        format: (d, v) => `<span style="color: ${v === 0 ? '#A9A9A9' : '#32CD32'}">${v === 0 ? '未激活' : '已激活'}</span>`,
        style: {},
        sample: () => faker.datatype.number({ min: 0, max: 1 })
    },
    custom_url: { card: false, cardSq: false, cardHoriz: false, type: 'text', label: '自定义URL', style: {}, sample: () => faker.internet.url() },
    cover_pic: { card: true, cardSq: true, cardHoriz: true, type: 'image', label: '封面图片', style: {}, sample: i => getPicsumImage(300, 200, `page-${i}`) },
    create_time: { card: false, cardSq: false, cardHoriz: false, type: 'text', label: '创建时间', style: {}, sample: () => faker.date.past().toLocaleString() },
    update_time: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: '更新时间', style: {}, sample: () => faker.date.recent().toLocaleString() },
    // 合并 pages_lang（假设存在多语言表）
    language: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: '语言', style: {}, sample: () => faker.random.arrayElement(['en_US', 'zh_CN']) },
    title: { card: true, cardSq: true, cardHoriz: true, type: 'text', style: {}, sample: () => faker.lorem.sentence() },
    summary: { card: true, cardSq: true, cardHoriz: true, type: 'text', label: '摘要', style: {}, sample: () => faker.lorem.paragraph() },
    seo_keywords: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: 'SEO关键词', style: {}, sample: () => faker.lorem.words(5) },
    seo_description: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: 'SEO描述', style: {}, sample: () => faker.lorem.sentence() },
    content: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: '页面内容', style: {}, sample: () => faker.lorem.paragraphs(5) },
    // 额外字段（参考 campaign 表风格）
    visit_count: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: '访问量', format: (d, v) => `<span style="color: #32CD32">${v}</span>`, style: {}, sample: () => faker.datatype.number({ min: 300, max: 1500 }) },
    save_count: { card: false, cardSq: true, cardHoriz: true, type: 'text', label: '收藏数', format: (d, v) => `<span style="color: #32CD32">${v}</span>`, style: {}, sample: () => faker.datatype.number({ min: 50, max: 200 }) },
};

// pages 相关配置（假设 pages_type 表存在）
let pagesTypeFieldConfig = {
    id: { card: false, cardSq: false, cardHoriz: false, type: 'text', label: '页面类型ID', style: {}, sample: () => faker.datatype.number({ min: 1, max: 1000 }) },
    status: {
        card: true, cardSq: true, cardHoriz: true,
        type: 'text',
        label: '状态',
        format: (d, v) => `<span style="color: ${v === 0 ? '#A9A9A9' : '#32CD32'}">${v === 0 ? '禁用' : '启用'}</span>`,
        style: {},
        sample: () => faker.datatype.number({ min: 0, max: 1 })
    },
    page_type: {
        card: true, cardSq: true, cardHoriz: true,
        type: 'text',
        label: '页面类型',
        format: (d, v) => `<span style="color: #4682B4">${v === 0 ? '首页' : v === 1 ? '商品页' : '其他'}</span>`,
        style: {},
        sample: () => faker.datatype.number({ min: 0, max: 2 })
    },
    custom_url: { card: true, cardSq: true, cardHoriz: true, type: 'text', label: '自定义URL', style: {}, sample: () => faker.internet.url() },
    create_time: { card: false, cardSq: false, cardHoriz: false, type: 'text', label: '创建时间', style: {}, sample: () => faker.date.past().toLocaleString() },
    update_time: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: '更新时间', style: {}, sample: () => faker.date.recent().toLocaleString() },
};

// rules 配置（合并 rules_lang）
let rulesFieldConfig = {
    id: { card: false, cardSq: false, cardHoriz: false, type: 'text', label: '规则ID', style: {}, sample: () => faker.datatype.number({ min: 1, max: 1000 }) },
    status: {
        card: true, cardSq: true, cardHoriz: true,
        type: 'text',
        label: '状态',
        format: (d, v) => `<span style="color: ${v === 0 ? '#A9A9A9' : '#32CD32'}">${v === 0 ? '禁用' : '启用'}</span>`,
        style: {},
        sample: () => faker.datatype.number({ min: 0, max: 1 })
    },
    rules_type: {
        card: true, cardSq: true, cardHoriz: true,
        type: 'text',
        label: '规则类型',
        format: (d, v) => `<span style="color: #4682B4">${v === 0 ? '用户规则' : '店铺规则'}</span>`,
        style: {},
        sample: () => faker.datatype.number({ min: 0, max: 1 })
    },
    index_number: { card: true, cardSq: true, cardHoriz: true, type: 'text', label: '规则编号', style: {}, sample: () => `${faker.datatype.number({ min: 1, max: 10 })}.${faker.datatype.number({ min: 0, max: 9 })}.${faker.datatype.number({ min: 0, max: 9 })}` },
    create_time: { card: false, cardSq: false, cardHoriz: false, type: 'text', label: '创建时间', style: {}, sample: () => faker.date.past().toLocaleString() },
    // 合并 rules_lang
    language: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: '语言', style: {}, sample: () => faker.random.arrayElement(['en_US', 'zh_CN']) },
    content: { card: true, cardSq: true, cardHoriz: true, type: 'text', label: '规则内容', style: {}, sample: () => faker.lorem.paragraphs(3) },
    sanction: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: '制裁措施', style: {}, sample: () => faker.lorem.paragraph() },
    solution: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: '解决方案', style: {}, sample: () => faker.lorem.paragraph() },
};

// rules_sanctions 配置
let rulesSanctionsFieldConfig = {
    id: { card: false, cardSq: false, cardHoriz: false, type: 'text', label: '制裁ID', style: {}, sample: () => faker.datatype.number({ min: 1, max: 10000 }) },
    rules_id: { card: false, cardSq: false, cardHoriz: false, type: 'text', label: '规则ID', style: {}, sample: () => faker.datatype.number({ min: 1, max: 1000 }) },
    status: {
        card: true, cardSq: true, cardHoriz: true,
        type: 'text',
        label: '状态',
        format: (d, v) => `<span style="color: ${v === 0 ? '#A9A9A9' : '#32CD32'}">${v === 0 ? '待执行' : '已执行'}</span>`,
        style: {},
        sample: () => faker.datatype.number({ min: 0, max: 1 })
    },
    sanction_type: {
        card: true, cardSq: true, cardHoriz: true,
        type: 'text',
        label: '制裁类型',
        format: (d, v) => `<span style="color: #FF4500">${['聊天', '店铺', '商品', '博客', '需求', '评论', '账户', '充值', '提现'][v]}</span>`,
        style: {},
        sample: () => faker.datatype.number({ min: 0, max: 8 })
    },
    action_class: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: '执行类', style: {}, sample: () => 'com.xxx.xxx.xxx' },
    sanction_config: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: '制裁配置', style: {}, sample: () => JSON.stringify({ duration: '30天' }) },
    create_time: { card: false, cardSq: false, cardHoriz: false, type: 'text', label: '创建时间', style: {}, sample: () => faker.date.past().toLocaleString() },
};

// aftersales 配置（合并 aftersales_lang）
let aftersalesFieldConfig = {
    id: { card: false, cardSq: false, cardHoriz: false, type: 'text', label: '售后ID', style: {}, sample: () => faker.datatype.number({ min: 1, max: 10000 }) },
    brand_id: { card: false, cardSq: false, cardHoriz: false, type: 'text', label: '品牌ID', style: {}, sample: () => faker.datatype.number({ min: 1, max: 1000 }) },
    aftersales_type_id: { card: false, cardSq: false, cardHoriz: false, type: 'text', label: '售后类型ID', style: {}, sample: () => faker.datatype.number({ min: 1, max: 1000 }) },
    status: {
        card: true, cardSq: true, cardHoriz: true,
        type: 'text',
        label: '状态',
        format: (d, v) => `<span style="color: ${v === 0 ? '#A9A9A9' : '#32CD32'}">${v === 0 ? '待处理' : '已处理'}</span>`,
        style: {},
        sample: () => faker.datatype.number({ min: 0, max: 1 })
    },
    create_time: { card: false, cardSq: false, cardHoriz: false, type: 'text', label: '创建时间', style: {}, sample: () => faker.date.past().toLocaleString() },
    update_time: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: '更新时间', style: {}, sample: () => faker.date.recent().toLocaleString() },
    // 合并 aftersales_lang
    language: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: '语言', style: {}, sample: () => faker.random.arrayElement(['en_US', 'zh_CN']) },
    reason: { card: true, cardSq: true, cardHoriz: true, type: 'text', label: '售后原因', style: {}, sample: () => faker.lorem.sentence() },
};

// aftersales_type 配置（合并 aftersales_type_lang）
let aftersalesTypeFieldConfig = {
    id: { card: false, cardSq: false, cardHoriz: false, type: 'text', label: '售后类型ID', style: {}, sample: () => faker.datatype.number({ min: 1, max: 1000 }) },
    parent_id: { card: false, cardSq: false, cardHoriz: false, type: 'text', label: '父类型ID', style: {}, sample: () => faker.datatype.number({ min: 0, max: 999 }) },
    status: {
        card: true, cardSq: true, cardHoriz: true,
        type: 'text',
        label: '状态',
        format: (d, v) => `<span style="color: ${v === 0 ? '#A9A9A9' : '#32CD32'}">${v === 0 ? '禁用' : '启用'}</span>`,
        style: {},
        sample: () => faker.datatype.number({ min: 0, max: 1 })
    },
    custom_url: { card: true, cardSq: true, cardHoriz: true, type: 'text', label: '自定义URL', style: {}, sample: () => faker.internet.url() },
    create_time: { card: false, cardSq: false, cardHoriz: false, type: 'text', label: '创建时间', style: {}, sample: () => faker.date.past().toLocaleString() },
    update_time: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: '更新时间', style: {}, sample: () => faker.date.recent().toLocaleString() },
    // 合并 aftersales_type_lang
    language: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: '语言', style: {}, sample: () => faker.random.arrayElement(['en_US', 'zh_CN']) },
    type_name: { card: true, cardSq: true, cardHoriz: true, type: 'text', label: '类型名称', style: {}, sample: () => faker.random.arrayElement(['退货', '换货', '维修']) },
};

// payment 配置（假设存在 payment 表，基于常见支付逻辑）
let paymentFieldConfig = {
    id: { card: false, cardSq: false, cardHoriz: false, type: 'text', label: '支付ID', style: {}, sample: () => faker.datatype.number({ min: 1, max: 10000 }) },
    user_id: { card: false, cardSq: false, cardHoriz: false, type: 'text', label: '用户ID', style: {}, sample: () => faker.datatype.number({ min: 1, max: 1000 }) },
    store_id: { card: false, cardSq: false, cardHoriz: false, type: 'text', label: '店铺ID', style: {}, sample: () => faker.datatype.number({ min: 1, max: 500 }) },
    order_id: { card: false, cardSq: false, cardHoriz: false, type: 'text', label: '订单ID', style: {}, sample: () => faker.datatype.number({ min: 100000, max: 999999 }) },
    payment_method: {
        card: true, cardSq: true, cardHoriz: true,
        type: 'text',
        label: '支付方式',
        format: (d, v) => `<span style="color: #4682B4">${v === 0 ? '信用卡' : v === 1 ? 'PayPal' : '银行转账'}</span>`,
        style: {},
        sample: () => faker.datatype.number({ min: 0, max: 2 })
    },
    amount: { card: true, cardSq: true, cardHoriz: true, type: 'price', label: '支付金额', style: {}, sample: () => faker.commerce.price(10, 5000, 2, "$") },
    status: {
        card: true, cardSq: true, cardHoriz: true,
        type: 'text',
        label: '状态',
        format: (d, v) => `<span style="color: ${v === 0 ? '#A9A9A9' : v === 1 ? '#32CD32' : '#FF4500'}">${v === 0 ? '待支付' : v === 1 ? '已支付' : '失败'}</span>`,
        style: {},
        sample: () => faker.datatype.number({ min: 0, max: 2 })
    },
    transaction_id: { card: false, cardSq: false, cardHoriz: false, type: 'text', label: '交易ID', style: {}, sample: () => faker.random.alphaNumeric(20) },
    create_time: { card: false, cardSq: false, cardHoriz: false, type: 'text', label: '创建时间', style: {}, sample: () => faker.date.past().toLocaleString() },
    paid_time: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: '支付时间', style: {}, sample: () => faker.date.recent().toLocaleString() },
    payment_details: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: '支付详情', style: {}, sample: () => JSON.stringify({ card_number: faker.finance.creditCardNumber() }) },
};

// payment_dispute 配置（假设存在 payment_dispute 表，基于常见支付争议逻辑）
let paymentDisputeFieldConfig = {
    id: { card: false, cardSq: false, cardHoriz: false, type: 'text', label: '争议ID', style: {}, sample: () => faker.datatype.number({ min: 1, max: 10000 }) },
    payment_id: { card: false, cardSq: false, cardHoriz: false, type: 'text', label: '支付ID', style: {}, sample: () => faker.datatype.number({ min: 1, max: 10000 }) },
    user_id: { card: false, cardSq: false, cardHoriz: false, type: 'text', label: '用户ID', style: {}, sample: () => faker.datatype.number({ min: 1, max: 1000 }) },
    store_id: { card: false, cardSq: false, cardHoriz: false, type: 'text', label: '店铺ID', style: {}, sample: () => faker.datatype.number({ min: 1, max: 500 }) },
    order_id: { card: false, cardSq: false, cardHoriz: false, type: 'text', label: '订单ID', style: {}, sample: () => faker.datatype.number({ min: 100000, max: 999999 }) },
    status: {
        card: true, cardSq: true, cardHoriz: true,
        type: 'text',
        label: '状态',
        format: (d, v) => `<span style="color: ${v === 0 ? '#A9A9A9' : v === 1 ? '#32CD32' : '#FF4500'}">${v === 0 ? '待处理' : v === 1 ? '已解决' : '拒绝'}</span>`,
        style: {},
        sample: () => faker.datatype.number({ min: 0, max: 2 })
    },
    dispute_reason: { card: true, cardSq: true, cardHoriz: true, type: 'text', label: '争议原因', style: {}, sample: () => faker.lorem.sentence() },
    dispute_amount: { card: true, cardSq: true, cardHoriz: true, type: 'price', label: '争议金额', style: {}, sample: () => faker.commerce.price(10, 1000, 2, "$") },
    create_time: { card: false, cardSq: false, cardHoriz: false, type: 'text', label: '创建时间', style: {}, sample: () => faker.date.past().toLocaleString() },
    resolve_time: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: '解决时间', style: {}, sample: () => faker.date.recent().toLocaleString() },
    dispute_details: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: '争议详情', style: {}, sample: () => faker.lorem.paragraphs(3) },
    store_response: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: '店铺回复', style: {}, sample: () => faker.lorem.paragraph() },
    system_response: { card: false, cardSq: false, cardHoriz: true, type: 'text', label: '系统回复', style: {}, sample: () => faker.lorem.paragraph() },
};

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateAttr(min, max){
    let attributes = {}
    let len = randomInt(min, max)
    if (typeof ecommerceAttributes !== 'undefined') {
        const attrKeys = Object.keys(ecommerceAttributes);
        for (let j = 0; j < len; j++) {
            const key = attrKeys[Math.floor(Math.random() * attrKeys.length)];
            attributes[key] = ecommerceAttributes[key][Math.floor(Math.random() * ecommerceAttributes[key].length)];
        }
    }
    return attributes;
}

function generateTag(min, max){
    let tags = []
    let len = randomInt(min, max)
    if (typeof ecommerceTags !== 'undefined') {
        for (let j = 0; j < len; j++) {
            let choose = ecommerceTags[Math.floor(Math.random() * ecommerceTags.length)]
            tags.push(choose);
        }
    }
    return tags;
}

function generateArticleCategory(){
    let chooseCategory = articleCategories[Math.floor(Math.random() * articleCategories.length)]
    const randomCategory = chooseCategory.sub[Math.floor(Math.random() * chooseCategory.sub.length)];
    return `${chooseCategory.name} - ${randomCategory}`;
}

function generateBrand(){
    let choose = hotBrands[Math.floor(Math.random() * hotBrands.length)]
    return generateBrandColor(choose.name, choose.themeColor);
}

function generateBrandColor(name, color){
    return `<b style="color: ${color};">${name}</b>`;
}

function generateServices(){
    let choose = services[Math.floor(Math.random() * services.length)]
    return `<b style="color: var(--font-orange);">${choose['name']}</b>`;
}


window.brandFieldConfig = brandFieldConfig;
window.servicesFieldConfig = servicesFieldConfig;
window.itemFieldConfig = itemFieldConfig;
window.itemStatLogFieldConfig = itemStatLogFieldConfig;
window.itemShowFieldConfig = itemShowFieldConfig;
window.itemWholesaleFieldConfig = itemWholesaleFieldConfig;
window.storeFieldConfig = storeFieldConfig;
window.demandFieldConfig = demandFieldConfig;
window.postsFieldConfig = postsFieldConfig;
window.campaignFieldConfig = campaignFieldConfig;
window.ordersCommentFieldConfig = ordersCommentFieldConfig;
window.ordersRefundsFieldConfig = ordersRefundsFieldConfig;
window.ordersReplacementsFieldConfig = ordersReplacementsFieldConfig;
window.aftersalesFieldConfig = aftersalesFieldConfig;
window.aftersalesTypeFieldConfig = aftersalesTypeFieldConfig;
window.paymentFieldConfig = paymentFieldConfig;
window.pagesFieldConfig = pagesFieldConfig;
window.paymentDisputeFieldConfig = paymentDisputeFieldConfig;
