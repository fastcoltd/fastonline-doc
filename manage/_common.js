// _common.js

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

    // 初始化移动端侧边栏并监听窗口大小变化
    handleMobileSidebar();
    window.addEventListener('resize', handleMobileSidebar);

    // 添加弹窗关闭逻辑
    initModalClose();
}

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

const eventTypes = {
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
            return `文章 <span style="color: ${eventTypes[eventType].color}">${articles[Math.floor(Math.random() * articles.length)]}</span> 提交了审核。`;
        case "leaveRequest":
            return `用户 <span style="color: ${eventTypes[eventType].color}">${users[Math.floor(Math.random() * users.length)]}</span> 提交了请假申请。`;
        case "kycVerification":
            return `用户 <span style="color: ${eventTypes[eventType].color}">${users[Math.floor(Math.random() * users.length)]}</span> 提交了实名认证审核。`;
        case "demandReview":
            return `需求 <span style="color: ${eventTypes[eventType].color}">${demands[Math.floor(Math.random() * demands.length)]}</span> 提交了审核。`;
        case "ticketInvite":
            return `工单 <span style="color: ${eventTypes[eventType].color}">${tickets[Math.floor(Math.random() * tickets.length)]}</span> 邀请您加入。`;
        case "customerComplaint":
            return `用户 <span style="color: ${eventTypes[eventType].color}">${users[Math.floor(Math.random() * users.length)]}</span> 提交了投诉：${complaints[Math.floor(Math.random() * complaints.length)]}。`;
        case "storeReview":
            return `店铺 <span style="color: ${eventTypes[eventType].color}">${stores[Math.floor(Math.random() * stores.length)]}</span> 提交了开店审核。`;
        case "storeFaqReview":
            return `店铺 <span style="color: ${eventTypes[eventType].color}">${stores[Math.floor(Math.random() * stores.length)]}</span> 提交了FAQ审核。`;
        case "blogReview":
            return `用户 <span style="color: ${eventTypes[eventType].color}">${users[Math.floor(Math.random() * users.length)]}</span> 提交了博客审核。`;
        case "violationEvent":
            return `用户 <span style="color: ${eventTypes[eventType].color}">${users[Math.floor(Math.random() * users.length)]}</span> 触发了 <span style="color: ${eventTypes[eventType].color}">${violations[Math.floor(Math.random() * violations.length)]}</span> 违规。`;
        case "handoverEvent":
            return `客服 <span style="color: ${eventTypes[eventType].color}">${users[Math.floor(Math.random() * users.length)]}</span> 提交了交接事项查看。`;
        case "withdrawalReview":
            return `店铺 <span style="color: ${eventTypes[eventType].color}">${stores[Math.floor(Math.random() * stores.length)]}</span> 提交了提现 <span style="color: ${eventTypes[eventType].color}">$${Math.floor(Math.random() * 1000)}</span> 审核。`;
        case "paymentDispute":
            return `用户 <span style="color: ${eventTypes[eventType].color}">${users[Math.floor(Math.random() * users.length)]}</span> 提交了支付争议审核。`;
        case "riskControlEvent":
            return `用户 <span style="color: ${eventTypes[eventType].color}">${users[Math.floor(Math.random() * users.length)]}</span> 触发了 <span style="color: ${eventTypes[eventType].color}">${violations[Math.floor(Math.random() * violations.length)]}</span> 风控异常。`;
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

    const eventKeys = Object.keys(eventTypes);
    const randomEventKey = eventKeys[Math.floor(Math.random() * eventKeys.length)];
    const eventConfig = eventTypes[randomEventKey];

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