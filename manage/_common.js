// _common.js

// 历史点击页面记录
let isInitHistoryNav = false
let historyPages = JSON.parse(localStorage.getItem('historyPages')) || [];

function resetTopNav(){
    historyPages = JSON.parse(localStorage.getItem('historyPages')) || [];
    if (!historyPages || historyPages.length <= 0){
        document.querySelector('.content-wrapper').style = "";
        document.querySelector('.history-nav-floating').style = "display: none;";
    }else{
        document.querySelector('.content-wrapper').style = "margin-top: 7em;";
        document.querySelector('.history-nav-floating').style = "";
    }

}

function insertHistoryNav() {
    // 检查是否已存在，避免重复插入
    if (document.querySelector('.history-nav-floating')) return;

    isInitHistoryNav = true;

    const navDiv = document.createElement('div');
    navDiv.className = 'history-nav-floating';
    navDiv.innerHTML = `
        <button class="nav-arrow left" id="historyNavLeftArrow" style="display: none;">
            <span class="anticon anticon-left">
                <svg viewBox="64 64 896 896" focusable="false" data-icon="left" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                    <path d="M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 0 0 0 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z"></path>
                </svg>
            </span>
        </button>
        <div class="history-nav-container" id="historyNavContainer"></div>
        <button class="nav-arrow right" id="historyNavRightArrow">
            <span class="anticon anticon-right">
                <svg viewBox="64 64 896 896" focusable="false" data-icon="right" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                    <path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 0 0 302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 0 0 0-50.4z"></path>
                </svg>
            </span>
        </button>
    `;

    // 查找 tabs-container 或 main-content 作为插入点
    const tabsContainer = document.querySelector('.tabs-container');
    const mainContent = document.querySelector('.main-content');
    if (tabsContainer) {
        tabsContainer.parentNode.insertBefore(navDiv, tabsContainer);
    } else if (mainContent) {
        mainContent.insertBefore(navDiv, mainContent.firstChild);
    }
    resetTopNav()
}

function updateHistoryNav() {
    const container = document.getElementById('historyNavContainer');
    const leftArrow = document.getElementById('historyNavLeftArrow');
    const rightArrow = document.getElementById('historyNavRightArrow');
    if (!container) return;


    container.innerHTML = '';
    let historyPagesSort = historyPages
    if (isInitHistoryNav){
        historyPagesSort.sort((a, b) => b.priority - a.priority);
        isInitHistoryNav = false;
    }

    historyPagesSort.forEach((page, index) => {
        const item = document.createElement('div');
        item.className = 'history-nav-item';
        item.draggable = true;
        item.dataset.index = index;

        const dot = document.createElement('span');
        dot.className = `priority-dot priority-${page.priority || 0}`;
        dot.onclick = (e) => {
            e.stopPropagation();
            togglePriority(index);
        };

        const title = document.createElement('span');
        title.textContent = page.title;
        title.onclick = () => window.location.href = page.url;

        const closeBtn = document.createElement('button');
        closeBtn.className = 'close-btn';
        closeBtn.textContent = `X`;
        closeBtn.onclick = (e) => {
            e.stopPropagation();
            removeHistoryPage(index);
        };

        item.appendChild(dot);
        item.appendChild(title);
        item.appendChild(closeBtn);
        container.appendChild(item);

        // 拖拽事件
        item.addEventListener('dragstart', handleDragStart);
        item.addEventListener('dragover', handleDragOver);
        item.addEventListener('drop', handleDrop);
        item.addEventListener('dragend', handleDragEnd);
    });

    // 更新箭头显示
    updateArrows(container, leftArrow, rightArrow);

    container.addEventListener('scroll', () => updateArrows(container, leftArrow, rightArrow));
    leftArrow.onclick = () => container.scrollBy({ left: -200, behavior: 'smooth' });
    rightArrow.onclick = () => container.scrollBy({ left: 200, behavior: 'smooth' });

    localStorage.setItem('historyPages', JSON.stringify(historyPagesSort));
    resetTopNav()
}

function updateArrows(container, leftArrow, rightArrow) {
    const scrollLeft = container.scrollLeft;
    const scrollWidth = container.scrollWidth;
    const clientWidth = container.clientWidth;

    // 确保箭头始终可见，只要有可滚动内容
    leftArrow.style.display = scrollLeft > 0 ? 'block' : 'none';
    rightArrow.style.display = scrollLeft + clientWidth < scrollWidth ? 'block' : 'none';
}

// 添加历史页面
function addHistoryPage(title, url) {
    const existingIndex = historyPages.findIndex(page => page.url === url);
    if (existingIndex !== -1) {
        // 如果页面已存在，移到最前
        const [page] = historyPages.splice(existingIndex, 1);
        historyPages.unshift(page);
    } else {
        // 新增页面，不限制个数
        historyPages.unshift({ title, url, priority: 0 });
    }
    updateHistoryNav();
}

// 移除历史页面
function removeHistoryPage(index) {
    historyPages.splice(index, 1);
    updateHistoryNav();
}

// 切换优先级
function togglePriority(index) {
    const page = historyPages[index];
    page.priority = (page.priority + 1) % 6; // 0 -> 1 -> 2 -> 3 -> 0
    updateHistoryNav();
}

// 拖拽功能
let draggedIndex = null;

function handleDragStart(e) {
    draggedIndex = parseInt(e.target.dataset.index);
    e.target.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
}

function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
}

function handleDrop(e) {
    e.preventDefault();
    const targetIndex = parseInt(e.target.closest('.history-nav-item')?.dataset.index);
    if (targetIndex !== undefined && draggedIndex !== targetIndex) {
        const [draggedPage] = historyPages.splice(draggedIndex, 1);
        historyPages.splice(targetIndex, 0, draggedPage);
        updateHistoryNav();
    }
}

function handleDragEnd(e) {
    e.target.classList.remove('dragging');
    draggedIndex = null;
}

// 在 initMenus 中监听 sidebar 点击并添加历史记录
function initMenus() {
    const topMenuItems = document.querySelectorAll('.top-menu-item');
    topMenuItems.forEach(item => {
        item.addEventListener('click', () => {
            topMenuItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            const menuId = item.getAttribute('data-menu') + '-menu';
            document.querySelectorAll('.sidebar-menu').forEach(menu => {
                const isActive = menu.id === menuId;
                menu.classList.toggle('active', isActive);
                if (isActive) {
                    menu.querySelectorAll('.sidebar-menu-item').forEach(subItem => subItem.classList.add('expand'));
                } else {
                    menu.querySelectorAll('.sidebar-menu-item').forEach(subItem => subItem.classList.remove('expand'));
                }
            });
        });
    });

    // 监听 sidebar 点击
    document.querySelectorAll('.sidebar-submenu-item a').forEach(link => {
        link.addEventListener('click', (e) => {
            const title = link.textContent.trim();
            const url = link.getAttribute('href');
            addHistoryPage(title, url);
        });
    });

    // 动态插入导航条并初始化
    insertHistoryNav();
    updateHistoryNav();

    // 其余已有代码...
    const currentUrl = window.location.pathname.split('/').pop() || 'dashboard.html';
    let activeTopMenu = null;

    document.querySelectorAll('.sidebar-submenu-item a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentUrl) {
            const parentSidebarMenu = link.closest('.sidebar-menu');
            if (parentSidebarMenu) {
                const menuId = parentSidebarMenu.id.replace('-menu', '');
                activeTopMenu = document.querySelector(`.top-menu-item[data-menu="${menuId}"]`);
            }
        }
    });

    if (activeTopMenu) {
        topMenuItems.forEach(item => item.classList.remove('active'));
        activeTopMenu.classList.add('active');
        const menuId = activeTopMenu.getAttribute('data-menu') + '-menu';
        document.querySelectorAll('.sidebar-menu').forEach(menu => {
            const isActive = menu.id === menuId;
            menu.classList.toggle('active', isActive);
            if (isActive) {
                menu.querySelectorAll('.sidebar-menu-item').forEach(item => item.classList.add('expand'));
            } else {
                menu.querySelectorAll('.sidebar-menu-item').forEach(item => item.classList.remove('expand'));
            }
        });
    } else {
        const defaultTopMenu = document.querySelector('.top-menu-item[data-menu="dashboard"]');
        if (defaultTopMenu) {
            topMenuItems.forEach(item => item.classList.remove('active'));
            defaultTopMenu.classList.add('active');
            document.querySelectorAll('.sidebar-menu').forEach(menu => {
                menu.classList.toggle('active', menu.id === 'dashboard-menu');
                if (menu.id === 'dashboard-menu') {
                    menu.querySelectorAll('.sidebar-menu-item').forEach(item => item.classList.add('expand'));
                } else {
                    menu.querySelectorAll('.sidebar-menu-item').forEach(item => item.classList.remove('expand'));
                }
            });
        }
    }

    const langSelect = document.getElementById('languageSelect');
    if (langSelect) {
        langSelect.addEventListener('change', (e) => {
            console.log(`切换语言为: ${e.target.value}`);
        });
    }

    document.querySelectorAll('.sidebar-menu-item > a').forEach(item => {
        item.addEventListener('click', (e) => {
            const submenu = item.nextElementSibling;
            if (submenu && submenu.classList.contains('sidebar-submenu')) {
                e.preventDefault();
                item.parentElement.classList.toggle('expand');
            }
        });
    });

    updateTime();
    setInterval(updateTime, 1000);
    highlightCurrentMenu();

    handleMobileSidebar();
    window.addEventListener('resize', handleMobileSidebar);

    initModalClose();
}

// 其余已有代码保持不变...

function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const contentWrapper = document.querySelector('.content-wrapper');

    sidebar.classList.toggle('collapsed');
    sidebar.classList.toggle('active');

    if (window.innerWidth > 768) {
        if (sidebar.classList.contains('collapsed')) {
            contentWrapper.style.marginLeft = '0';
        } else {
            contentWrapper.style.marginLeft = '14em';
        }
    } else {
        contentWrapper.style.marginLeft = '0';
        if (sidebar.classList.contains('active')) {
            sidebar.style.transform = 'translateX(0)';
        } else {
            sidebar.style.transform = 'translateX(-100%)';
        }
    }
}

function updateTime() {
    const now = moment();
    const timezone = moment.tz.guess();
    const timeString = now.format('MM-DD HH:mm:ss');
    const timezoneElement = document.getElementById('timezone');
    if (timezoneElement) {
        timezoneElement.textContent = `${timezone} ${timeString}`;
    }
}

function highlightCurrentMenu() {
    const currentUrl = window.location.pathname.split('/').pop() || 'dashboard.html';
    document.querySelectorAll('.sidebar-submenu-item a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentUrl) {
            link.parentElement.classList.add('active');
            const parentMenuItem = link.closest('.sidebar-menu-item');
            if (parentMenuItem) {
                parentMenuItem.classList.add('expand');
            }
            const parentSidebarMenu = link.closest('.sidebar-menu');
            if (parentSidebarMenu) {
                parentSidebarMenu.classList.add('active');
                const menuId = parentSidebarMenu.id.replace('-menu', '');
                const topMenuItem = document.querySelector(`.top-menu-item[data-menu="${menuId}"]`);
                if (topMenuItem) {
                    document.querySelectorAll('.top-menu-item').forEach(item => item.classList.remove('active'));
                    topMenuItem.classList.add('active');
                }
            }
        }
    });
}

function handleMobileSidebar() {
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
        console.log(`isMobile: ${isMobile}, create mobile menu`)
        if (!document.querySelector('.mobile-sidebar')) {
            createMobileSidebar();
        }
    } else {
        const mobileSidebar = document.querySelector('.mobile-sidebar');
        const floatingToggle = document.querySelector('.floating-toggle');
        if (mobileSidebar) mobileSidebar.remove();
        if (floatingToggle) floatingToggle.remove();
    }
}

function createMobileSidebar() {
    const mobileSidebar = document.createElement('div');
    mobileSidebar.className = 'mobile-sidebar';
    const menuList = document.createElement('ul');
    menuList.className = 'mobile-menu';

    const topMenuItems = document.querySelectorAll('.top-menu-item');
    topMenuItems.forEach(topItem => {
        const menuText = topItem.textContent;
        const menuId = topItem.getAttribute('data-menu');
        const menuItem = document.createElement('li');
        menuItem.className = 'mobile-menu-item';

        const menuLink = document.createElement('a');
        menuLink.textContent = menuText;
        menuLink.href = '#';
        menuLink.addEventListener('click', (e) => {
            e.preventDefault();
            menuItem.classList.toggle('expanded');
            const submenu = menuItem.querySelector('.mobile-submenu');
            if (submenu) {
                submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block';
            }
        });
        menuItem.appendChild(menuLink);

        const sidebarMenu = document.getElementById(`${menuId}-menu`);
        if (sidebarMenu) {
            const submenuList = document.createElement('ul');
            submenuList.className = 'mobile-submenu';
            submenuList.style.display = 'none'; // 默认隐藏

            const sidebarItems = sidebarMenu.querySelectorAll('.sidebar-menu-item');
            sidebarItems.forEach(sidebarItem => {
                const submenuItem = document.createElement('li');
                submenuItem.className = 'mobile-submenu-item';

                const submenuLink = sidebarItem.querySelector('a').cloneNode(true);
                submenuLink.addEventListener('click', (e) => {
                    e.preventDefault();
                    submenuItem.classList.toggle('expanded');
                    const subSubmenu = submenuItem.querySelector('.mobile-submenu');
                    if (subSubmenu) {
                        subSubmenu.style.display = subSubmenu.style.display === 'block' ? 'none' : 'block';
                    }
                });
                submenuItem.appendChild(submenuLink);

                const sidebarSubmenu = sidebarItem.querySelector('.sidebar-submenu');
                if (sidebarSubmenu) {
                    const subSubmenuList = document.createElement('ul');
                    subSubmenuList.className = 'mobile-submenu';
                    subSubmenuList.style.display = 'none'; // 默认隐藏三级菜单

                    const subItems = sidebarSubmenu.querySelectorAll('.sidebar-submenu-item');
                    subItems.forEach(subItem => {
                        const subSubmenuItem = document.createElement('li');
                        subSubmenuItem.className = 'mobile-submenu-item';
                        const subSubmenuLink = subItem.querySelector('a').cloneNode(true);
                        subSubmenuItem.appendChild(subSubmenuLink);
                        subSubmenuList.appendChild(subSubmenuItem);

                        // 检查当前页面是否为三级菜单项，若是则展开二级菜单
                        const currentUrl = window.location.pathname.split('/').pop() || 'dashboard.html';
                        if (subSubmenuLink.getAttribute('href') === currentUrl) {
                            submenuItem.classList.add('expanded');
                            subSubmenuList.style.display = 'block'; // 展开三级菜单
                            menuItem.classList.add('expanded');
                            submenuList.style.display = 'block'; // 展开二级菜单
                        }
                    });

                    submenuItem.appendChild(subSubmenuList);
                }

                submenuList.appendChild(submenuItem);
            });

            menuItem.appendChild(submenuList);
        }

        menuList.appendChild(menuItem);
    });

    mobileSidebar.appendChild(menuList);
    document.body.appendChild(mobileSidebar);

    const floatingToggle = document.createElement('div');
    floatingToggle.className = 'floating-toggle';
    floatingToggle.addEventListener('click', toggleMobileSidebar);
    document.body.appendChild(floatingToggle);

    highlightMobileMenu();
}

function toggleMobileSidebar() {
    const mobileSidebar = document.querySelector('.mobile-sidebar');
    mobileSidebar.classList.toggle('open');
}

function highlightMobileMenu() {
    const currentUrl = window.location.pathname.split('/').pop() || 'dashboard.html';
    document.querySelectorAll('.mobile-submenu-item a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentUrl) {
            link.parentElement.classList.add('active');
            const parentMenuItem = link.closest('.mobile-menu-item');
            if (parentMenuItem) {
                parentMenuItem.classList.add('expanded');
                const submenu = parentMenuItem.querySelector('.mobile-submenu');
                if (submenu) submenu.style.display = 'block';
            }
            const parentSubmenuItem = link.closest('.mobile-submenu-item');
            if (parentSubmenuItem && parentSubmenuItem !== parentMenuItem) {
                parentSubmenuItem.classList.add('expanded');
                const subSubmenu = parentSubmenuItem.querySelector('.mobile-submenu');
                if (subSubmenu) subSubmenu.style.display = 'block';
            }
        }
    });
}

// 新增函数：初始化弹窗关闭逻辑
function initModalClose() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            // 如果点击的是modal本身（空白区域），而不是modal-content或其子元素
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    });
}

// 请假相关函数
function openLeaveModal() {
    document.getElementById('leaveStartTime').value = moment().format('YYYY-MM-DDTHH:mm');
    document.getElementById('leaveEndTime').value = '';
    document.getElementById('leaveReason').value = '';
    document.getElementById('leaveModal').style.display = 'flex';
}

function closeLeaveModal() {
    document.getElementById('leaveModal').style.display = 'none';
}

function submitLeave() {
    const startTime = document.getElementById('leaveStartTime').value;
    const endTime = document.getElementById('leaveEndTime').value;
    const type = document.getElementById('leaveType').value;
    const reason = document.getElementById('leaveReason').value;

    if (!startTime || !endTime || !reason) {
        alert('请填写所有必填项！');
        return;
    }

    const name = "张三";
    const position = "客服专员";
    const shift = "2025/03/08 早班1";
    console.log(`请假申请: 姓名: ${name}, 职位: ${position}, 班次: ${shift}, 时间: ${startTime} - ${endTime}, 类型: ${type}, 理由: ${reason}`);
    closeLeaveModal();
}

// 新增函数：初始化弹窗关闭逻辑
function initModalClose() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            // 如果点击的是modal本身（空白区域），而不是modal-content或其子元素
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    });
}

// 打卡相关函数
let checkinTimer;
function openCheckinModal() {
    document.getElementById('checkinModal').style.display = 'flex';
    const types = [
        { name: "上班打卡", color: "#52c41a" }, // 绿色
        { name: "迟到打卡", color: "#faad14" }, // 黄色
        { name: `第${Math.floor(Math.random() * 5) + 1}次在岗卡`, color: "#1890ff" }, // 蓝色
        { name: "下班打卡", color: "#f5222d" }  // 红色
    ];
    const randomType = types[Math.floor(Math.random() * types.length)];
    const checkinTypeElement = document.getElementById('checkinType');
    const checkinButton = document.getElementById('checkinButton');
    checkinTypeElement.textContent = randomType.name;
    checkinTypeElement.style.color = randomType.color; // 设置类型字段颜色
    checkinButton.style.backgroundColor = randomType.color; // 设置按钮背景色

    let countdown = 30;
    const countdownElement = document.getElementById('checkinCountdown');
    countdownElement.textContent = `${countdown}`;
    checkinTimer = setInterval(() => {
        countdown--;
        countdownElement.textContent = `${countdown}`;
        if (countdown <= 0) {
            clearInterval(checkinTimer);
            closeCheckinModal();
            console.log('打卡超时，记录为缺卡');
        }
    }, 1000);
}

function closeCheckinModal() {
    clearInterval(checkinTimer);
    document.getElementById('checkinModal').style.display = 'none';
}

function submitCheckin() {
    const name = "张三";
    const position = "客服专员";
    const shift = "2025/03/08 早班1";
    const checkinType = document.getElementById('checkinType').textContent;
    console.log(`打卡成功: 姓名: ${name}, 职位: ${position}, 班次: ${shift}, 类型: ${checkinType}`);
    clearInterval(checkinTimer);
    closeCheckinModal();
}

// 每5分钟触发打卡弹窗
setInterval(() => {
    openCheckinModal();
}, 300000); // 5分钟 = 300,000毫秒

// _common.js (替换或更新事件弹窗相关代码)

const eventPopupTypes = {
    articleReview: { name: "文章审核", color: "#ec4899", actionLink: "posts.html", button: "action" },
    leaveRequest: { name: "请假事件", color: "#6366f1", actionLink: "schedule_leave_log.html", button: "action" },
    kycVerification: { name: "实名认证", color: "#3b82f6", actionLink: "user_kyc.html", button: "action" },
    demandReview: { name: "需求审核", color: "#3b82f6", actionLink: "demand.html", button: "action" },
    ticketInvite: { name: "工单邀请", color: "#10b981", actionLink: "orders_ticket.html", button: "action" },
    customerComplaint: { name: "客户投诉", color: "#ef4444", actionLink: "complaint.html", button: "action" },
    storeReview: { name: "店铺审核", color: "#8b5cf6", actionLink: "store.html", button: "action" },
    storeFaqReview: { name: "店铺FAQ审核", color: "#8b5cf6", actionLink: "store_faq.html", button: "action" },
    blogReview: { name: "博客审核", color: "#ec4899", actionLink: "user_blog.html", button: "action" },
    violationEvent: { name: "违规事件", color: "#ef4444", actionLink: "violations_event.html", button: "action" },
    handoverEvent: { name: "交接事件", color: "#6366f1", actionLink: "schedule_handover.html", button: "view" },
    withdrawalReview: { name: "提现审核", color: "#14b8a6", actionLink: "store_withdrawal.html", button: "action" },
    paymentDispute: { name: "支付争议", color: "#14b8a6", actionLink: "payment_dispute.html", button: "action" },
    riskControlEvent: { name: "风控事件", color: "#ef4444", actionLink: "risk_control_finance.html", button: "action" }
};

function generateEventContent(eventType) {
    const users = ["张三", "李四", "王五", "赵六", "刘七"];
    const stores = ["TechTrend", "GizmoHub", "EcoMart", "GearZone", "TrendyTech"];
    const articles = ["Tech Trends 2025", "AI Revolution", "Green Living Tips", "Gadget Reviews", "Future Work"];
    const demands = ["Web Design", "Mobile App Dev", "SEO Optimization", "Graphic Design", "Content Writing"];
    const tickets = ["TK001", "TK002", "TK003", "TK004", "TK005"];
    const complaints = ["延迟发货", "商品质量问题", "服务态度差", "退款纠纷", "虚假宣传"];
    const violations = ["发布违禁内容", "恶意刷单", "虚假交易", "违规广告", "账户异常"];

    switch (eventType) {
        case "articleReview":
            return `文章 <span style="color: ${eventPopupTypes[eventType].color}">${articles[Math.floor(Math.random() * articles.length)]}</span> 提交了审核。`;
        case "leaveRequest":
            return `用户 <span style="color: ${eventPopupTypes[eventType].color}">${users[Math.floor(Math.random() * users.length)]}</span> 提交了请假申请。`;
        case "kycVerification":
            return `用户 <span style="color: ${eventPopupTypes[eventType].color}">${users[Math.floor(Math.random() * users.length)]}</span> 提交了实名认证审核。`;
        case "demandReview":
            return `需求 <span style="color: ${eventPopupTypes[eventType].color}">${demands[Math.floor(Math.random() * demands.length)]}</span> 提交了审核。`;
        case "ticketInvite":
            return `工单 <span style="color: ${eventPopupTypes[eventType].color}">${tickets[Math.floor(Math.random() * tickets.length)]}</span> 邀请您加入。`;
        case "customerComplaint":
            return `用户 <span style="color: ${eventPopupTypes[eventType].color}">${users[Math.floor(Math.random() * users.length)]}</span> 提交了投诉：${complaints[Math.floor(Math.random() * complaints.length)]}。`;
        case "storeReview":
            return `店铺 <span style="color: ${eventPopupTypes[eventType].color}">${stores[Math.floor(Math.random() * stores.length)]}</span> 提交了开店审核。`;
        case "storeFaqReview":
            return `店铺 <span style="color: ${eventPopupTypes[eventType].color}">${stores[Math.floor(Math.random() * stores.length)]}</span> 提交了FAQ审核。`;
        case "blogReview":
            return `用户 <span style="color: ${eventPopupTypes[eventType].color}">${users[Math.floor(Math.random() * users.length)]}</span> 提交了博客审核。`;
        case "violationEvent":
            return `用户 <span style="color: ${eventPopupTypes[eventType].color}">${users[Math.floor(Math.random() * users.length)]}</span> 触发了 <span style="color: ${eventPopupTypes[eventType].color}">${violations[Math.floor(Math.random() * violations.length)]}</span> 违规。`;
        case "handoverEvent":
            return `客服 <span style="color: ${eventPopupTypes[eventType].color}">${users[Math.floor(Math.random() * users.length)]}</span> 提交了交接事项查看。`;
        case "withdrawalReview":
            return `店铺 <span style="color: ${eventPopupTypes[eventType].color}">${stores[Math.floor(Math.random() * stores.length)]}</span> 提交了提现 <span style="color: ${eventPopupTypes[eventType].color}">$${Math.floor(Math.random() * 1000)}</span> 审核。`;
        case "paymentDispute":
            return `用户 <span style="color: ${eventPopupTypes[eventType].color}">${users[Math.floor(Math.random() * users.length)]}</span> 提交了支付争议审核。`;
        case "riskControlEvent":
            return `用户 <span style="color: ${eventPopupTypes[eventType].color}">${users[Math.floor(Math.random() * users.length)]}</span> 触发了 <span style="color: ${eventPopupTypes[eventType].color}">${violations[Math.floor(Math.random() * violations.length)]}</span> 风控异常。`;
        default:
            return "未知事件，请检查配置。";
    }
}

function showEventPopup() {
    const popup = document.getElementById('eventPopup');

    if (popup.style.display === 'block') {
        return;
    }

    const title = document.getElementById('eventTitle');
    const message = document.getElementById('eventMessage');
    const buttonsContainer = document.getElementById('eventButtons');

    const eventKeys = Object.keys(eventPopupTypes);
    const randomEventKey = eventKeys[Math.floor(Math.random() * eventKeys.length)];
    const eventConfig = eventPopupTypes[randomEventKey];

    title.textContent = `新的 ${eventConfig.name} 事件`;
    message.innerHTML = generateEventContent(randomEventKey);

    popup.style.backgroundColor = `${eventConfig.color}22`;

    buttonsContainer.innerHTML = '';
    const button = document.createElement('button');
    if (eventConfig.button === 'action') {
        button.className = 'ant-btn ant-btn-primary';
        button.textContent = '立即处理';
        button.style.backgroundColor = eventConfig.color;
        button.style.borderColor = eventConfig.color;
        button.onclick = () => {
            clearTimeout(popup.autoClose);
            window.location.href = eventConfig.actionLink;
            hideEventPopup();
        };
    } else if (eventConfig.button === 'okay') {
        button.className = 'ant-btn';
        button.textContent = '好的';
        button.onclick = () => {
            clearTimeout(popup.autoClose);
            hideEventPopup();
        };
    } else if (eventConfig.button === 'view') {
        button.className = 'ant-btn ant-btn-primary';
        button.textContent = '查看';
        button.style.backgroundColor = eventConfig.color;
        button.style.borderColor = eventConfig.color;
        button.onclick = () => {
            clearTimeout(popup.autoClose);
            window.location.href = eventConfig.actionLink;
            hideEventPopup();
        };
    }
    buttonsContainer.appendChild(button);

    popup.style.display = 'block';
    setTimeout(() => {
        popup.classList.add('active');
    }, 10);

    popup.autoClose = setTimeout(hideEventPopup, 10000);
}

function hideEventPopup() {
    const popup = document.getElementById('eventPopup');
    popup.classList.remove('active');
    setTimeout(() => {
        popup.style.display = 'none';
    }, 300);
}

document.addEventListener('keydown', (e) => {
    if (e.shiftKey && e.key === 'F') {
        showEventPopup();
    }
});

function startRandomEventPopups() {
    function scheduleNextPopup() {
        const delay = Math.floor(Math.random() * (10000 - 5000 + 1)) + 30000; // 5-10秒
        setTimeout(() => {
            showEventPopup();
            scheduleNextPopup();
        }, delay);
    }
    scheduleNextPopup();
}

document.addEventListener('DOMContentLoaded', () => {
    startRandomEventPopups();
});