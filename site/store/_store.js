// 店铺中心公用 JS

function initSidebar() {
    const menu = document.getElementById('store-menu');
    menu.innerHTML = '';
    const currentPage = window.location.pathname;
    memberMenuConfig[0].sub.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `<a href="${item.href}"><i class="${item.icon}"></i>${item.text}</a>`;
        if (item.href === currentPage) {
            li.classList.add('active');
        }
        menu.appendChild(li);
    });
}

function InitSidebarContent() {
    const roles = ['owner', 'customer-service'];
    const role = roles[Math.floor(Math.random() * roles.length)];
    const nickname = faker.internet.userName();
    document.querySelector('.role').textContent = role === 'owner' ? 'Owner' : 'Support';
    document.querySelector('.role').classList.add(role);
    document.getElementById('user-nickname').innerHTML = `<b>${nickname}</b>`;

    const storeName = faker.company.companyName();
    const storeLink = document.getElementById('store-name');
    storeLink.textContent = storeName;
    storeLink.href = `/site/store.html?name=${encodeURIComponent(storeName)}`;
    document.getElementById('store-balance').textContent = `$${faker.finance.amount(1000, 10000, 2)}`;
    document.getElementById('store-rating').textContent = `${faker.random.number({ min: 3, max: 5, precision: 0.1 }).toFixed(1)} (${faker.random.number({ min: 50, max: 500 })})`;
    document.getElementById('store-badges').innerHTML = generateBadge('Store', 0, 2);
}