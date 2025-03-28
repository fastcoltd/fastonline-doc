// member/_mCommon.js
function generateSidebarMenu() {
    const currentPath = window.location.pathname.split('/').pop();
    let menuHtml = '';
    memberMenuConfig.forEach(item => {
        let show = typeof item.show === 'function' ? item.show() : item.show;
        if (show) {
            const isActive = currentPath === item.href.split('/').pop();
            const style = item.style ? ` style="${item.style}"` : '';
            const onclickAttr = item.onclick ? ` onclick="${item.onclick}"` : '';
            menuHtml += `
                <a href="${item.href}" class="sidebar-item${isActive ? ' active' : ''}"${style}${onclickAttr}>
                    <i class="${item.icon}"></i> ${item.text}
                </a>
            `;
            if (item.sub && item.sub.length > 0) {
                menuHtml += '<div class="sidebar-sub-menu">';
                item.sub.forEach(subItem => {
                    const subOnclickAttr = subItem.onclick ? ` onclick="${subItem.onclick}"` : '';
                    const isSubActive = currentPath === subItem.href.split('/').pop();
                    menuHtml += `
                        <a href="${subItem.href}" class="sidebar-sub-item${isSubActive ? ' active' : ''}"${subOnclickAttr}>
                            <i class="${subItem.icon}"></i> ${subItem.text}
                        </a>
                    `;
                });
                menuHtml += '</div>';
            }
        }
    });
    return menuHtml;
}

// 在页面加载时生成侧边栏
window.addEventListener("load", function() {
    w3.includeHTML(() => {
        const sidebarMenu = document.getElementById('sidebar-menu');
        if (sidebarMenu) {
            sidebarMenu.innerHTML = generateSidebarMenu();
        }
    });
});