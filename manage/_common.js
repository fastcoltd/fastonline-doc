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
            contentWrapper.style.marginLeft = '256px';
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

// 处理移动端侧边栏的生成和移除
function handleMobileSidebar() {
    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
        // 移动模式：如果尚未生成，则生成侧边栏和悬浮按钮
        if (!document.querySelector('.mobile-sidebar')) {
            createMobileSidebar();
        }
    } else {
        // PC 模式：移除移动端侧边栏和悬浮按钮
        const mobileSidebar = document.querySelector('.mobile-sidebar');
        const floatingToggle = document.querySelector('.floating-toggle');
        if (mobileSidebar) mobileSidebar.remove();
        if (floatingToggle) floatingToggle.remove();
    }
}

// 移动端侧边栏创建函数
function createMobileSidebar() {
    const mobileSidebar = document.createElement('div');
    mobileSidebar.className = 'mobile-sidebar';
    const menuList = document.createElement('ul');
    menuList.className = 'mobile-menu';

    // 获取一级菜单（header中的top-menu）
    const topMenuItems = document.querySelectorAll('.top-menu-item');
    topMenuItems.forEach(topItem => {
        const menuText = topItem.textContent;
        const menuId = topItem.getAttribute('data-menu');
        const menuItem = document.createElement('li');
        menuItem.className = 'mobile-menu-item';

        const menuLink = document.createElement('a');
        menuLink.textContent = menuText;
        menuLink.href = '#'; // 可根据需要调整跳转逻辑
        menuLink.addEventListener('click', (e) => {
            e.preventDefault();
            menuItem.classList.toggle('expanded');
            const submenu = menuItem.querySelector('.mobile-submenu');
            if (submenu) {
                submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block';
            }
        });
        menuItem.appendChild(menuLink);

        // 获取对应的二级和三级菜单
        const sidebarMenu = document.getElementById(`${menuId}-menu`);
        if (sidebarMenu) {
            const submenuList = document.createElement('ul');
            submenuList.className = 'mobile-submenu';
            submenuList.style.display = 'none'; // 默认折叠

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

                // 三级菜单
                const sidebarSubmenu = sidebarItem.querySelector('.sidebar-submenu');
                if (sidebarSubmenu) {
                    const subSubmenuList = document.createElement('ul');
                    subSubmenuList.className = 'mobile-submenu';
                    subSubmenuList.style.display = 'none'; // 默认折叠

                    const subItems = sidebarSubmenu.querySelectorAll('.sidebar-submenu-item');
                    subItems.forEach(subItem => {
                        const subSubmenuItem = document.createElement('li');
                        subSubmenuItem.className = 'mobile-submenu-item';
                        const subSubmenuLink = subItem.querySelector('a').cloneNode(true);
                        subSubmenuItem.appendChild(subSubmenuLink);
                        subSubmenuList.appendChild(subSubmenuItem);
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

    // 添加悬浮按钮
    const floatingToggle = document.createElement('div');
    floatingToggle.className = 'floating-toggle';
    floatingToggle.addEventListener('click', toggleMobileSidebar);
    document.body.appendChild(floatingToggle);

    // 高亮当前页面
    highlightMobileMenu();
}

// 切换移动端侧边栏
function toggleMobileSidebar() {
    const mobileSidebar = document.querySelector('.mobile-sidebar');
    mobileSidebar.classList.toggle('open');
}

// 高亮移动端当前菜单
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