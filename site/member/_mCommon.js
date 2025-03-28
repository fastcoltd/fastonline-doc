const pageConfig = [
    {page: 10, selected: false},
    {page: 15, selected: true},
    {page: 20, selected: false},
    {page: 30, selected: false},
    {page: 50, selected: false},
    {page: 100, selected: false},
];

function generateSidebarMenu() {
    const currentPath = window.location.pathname.split('/').pop();
    let menuHtml = '';
    memberMenuConfig.forEach(item => {
        let show = typeof item.memberSidebar === 'function' ? item.memberSidebar() : item.memberSidebar;
        if (show) {
            const isActive = currentPath === item.href.split('/').pop();
            const style = item.style ? ` style="${item.style}"` : '';
            const onclickAttr = item.onclick ? ` onclick="${item.onclick}"` : '';
            menuHtml += `
                <a href="${item.href}" class="member-sidebar-item${isActive ? ' active' : ''}"${style}${onclickAttr}>
                    <i class="${item.icon}"></i> <span>${item.text}</span>
                </a>
            `;
            if (item.sub && item.sub.length > 0) {
                menuHtml += '<div class="sidebar-sub-menu">';
                item.sub.forEach(subItem => {
                    const subOnclickAttr = subItem.onclick ? ` onclick="${subItem.onclick}"` : '';
                    const isSubActive = currentPath === subItem.href.split('/').pop();
                    menuHtml += `
                        <a href="${subItem.href}" class="sidebar-sub-item${isSubActive ? ' active' : ''}"${subOnclickAttr}>
                            <i class="${subItem.icon}"></i> <span>${subItem.text}</span>
                        </a>
                    `;
                });
                menuHtml += '</div>';
            }
        }
    });
    return menuHtml;
}

window.addEventListener("load", function() {
    w3.includeHTML(() => {
        const sidebarMenu = document.getElementById('sidebar-menu');
        if (sidebarMenu) {
            sidebarMenu.innerHTML = generateSidebarMenu();
        }
    });
});