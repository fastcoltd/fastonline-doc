refreshHeaderUserUI();
function refreshHeaderUserUI () {
    const signinButtonEle = document.getElementById('header-signin');
    const loginButtonEle = document.getElementById('header-login');
    const headerUser = document.getElementById('header-user');
    signinButtonEle.style.display = !user ? '' : 'none';
    loginButtonEle.style.display = !user ? '' : 'none';
    headerUser.style.display = !user ? 'none' : '';
    if (user) {
        const headerUserAvatar = headerUser.getElementsByClassName('header-user-icon')[0];
        headerUserAvatar.src = user.avatar;
    }
}

const headerMenu = document.getElementsByClassName('header-menu-box')[0];
const homeMenuPage = document.getElementsByClassName('home-menu-page')[0];
const homeMenuBack = document.getElementsByClassName('home-menu-back')[0];
const homeMenuTitles = document.getElementsByClassName('home-menu-item-title-box');
const homeMenuFirstPage = document.getElementsByClassName('home-menu-first-page')[0];
const homeMenusecondPage = document.getElementsByClassName('home-menu-second-page')[0];
const joininEle = homeMenuFirstPage.getElementsByClassName('home-menu-signin-text')[0];
headerMenu.addEventListener('click', function () { 
    homeMenuPage.style.display = 'flex';
    homeMenuPage.style.width = '100vw';
    body.style.overflow = 'hidden';
    const homeMenuUserEle = homeMenuPage.getElementsByClassName('home-menu-user-box')[0];
    const homeMenuRegistEle = homeMenuPage.getElementsByClassName('home-menu-login-box')[0];
    const homeMenuLgoinEle = homeMenuPage.getElementsByClassName('home-menu-signin-text')[0];
    const homeMenuUserLine = homeMenuPage.getElementsByClassName('home-menu-seperate-line')[0]
    homeMenuLgoinEle.addEventListener('click', function (e) {
        showSigninLoginPage();
    })
    homeMenuRegistEle.addEventListener('click', function (e) {
        showSigninRegistPage();
    })
    const homeMenuLogoutEle = homeMenuUserEle.getElementsByClassName('home-menu-user-logout')[0];
    homeMenuLogoutEle.addEventListener('click', function (e) {
        user = null;
        dismissHomeMenuPage();
        refreshHeaderUserUI();
    })
    if (user) {
        homeMenuRegistEle.style.display = 'none';
        homeMenuLgoinEle.style.display = 'none';
        homeMenuUserEle.style.display = 'flex';
        homeMenuUserLine.style.display = '';
        const homeMenuUserIconEle = homeMenuUserEle.getElementsByClassName('home-menu-user-icon')[0];
        homeMenuUserIconEle.src = user.avatar;
        const homeMenuUserNameEle = homeMenuUserEle.getElementsByClassName('home-menu-user-name')[0];
        homeMenuUserNameEle.textContent = user.name;
        const homeMenuUserEmailEle = homeMenuUserEle.getElementsByClassName('home-menu-user-email')[0];
        homeMenuUserEmailEle.textContent = user.email;
    } else {
        homeMenuRegistEle.style.display = '';
        homeMenuLgoinEle.style.display = '';
        homeMenuUserEle.style.display = 'none';
        homeMenuUserLine.style.display = 'none';
    }
})
homeMenuBack.addEventListener('click', function (e) {
   dismissHomeMenuPage()
})
function dismissHomeMenuPage() {
    homeMenuPage.style.width = '0';
    homeMenuPage.style.display = 'none';
    body.style.overflow = 'auto';
}
const data = {
    title: 'Browser service',
    list: [
        { title: 'Browser service 1', list: [{title: 'Browser service 11', list: ['item11', 'item12', 'item13', 'item14', 'item15', 'item16']}]},
        { title: 'Browser service 2', list: [{title: 'Browser service 21', list: ['item21', 'item22', 'item23', 'item24', 'item25', 'item26', 'item27', 'item28', 'item29']}]},
        { title: 'Browser service 3', list: [{title: 'Browser service 31', list: ['item31', 'item32', 'item33', 'item34', 'item35', 'item36']}]},
        { title: 'Browser service 4', list: [{title: 'Browser service 41', list: ['item41', 'item42', 'item43', 'item44', 'item45', 'item46', 'item47', 'item48', 'item49']}]},
        { title: 'Browser service 5', list: [{title: 'Browser service 51', list: ['item51', 'item52', 'item53', 'item54', 'item55', 'item56']}]},
        { title: 'Browser service 6', list: [{title: 'Browser service 61', list: ['item61', 'item62', 'item63', 'item64', 'item65', 'item66', 'item67', 'item68', 'item69']}]}
    ]
}
const titleBox = document.createElement('div');
titleBox.classList.add('home-menu-item-title-box');

const titleContent = document.createElement('div');
titleContent.classList.add('home-menu-item-title-content');
const titleContentTextEle = document.createElement('p');
titleContentTextEle.classList.add('home-menu-item-title');
titleContentTextEle.textContent = data.title || '';
titleContent.appendChild(titleContentTextEle);
const titleContentImgEle = document.createElement('img');
titleContentImgEle.classList.add('home-menu-item-title-arrow');
titleContentImgEle.src = 'image/more-arrow.png';
titleContent.appendChild(titleContentImgEle);
titleBox.appendChild(titleContent);

const titleItemContent = document.createElement('div');
titleItemContent.classList.add('home-menu-item-content');
titleItemContent.style.display = 'none';
const list = data.list || []
for (let i = 0; i < list.length; i++) {
    const item = list[i];
    const titleItemContentItem = document.createElement('div');
    titleItemContentItem.classList.add('home-menu-item-content-item');
    titleItemContentItem.data = item.list || [];
    const titleItemContentItemTextEle = document.createElement('p');
    titleItemContentItemTextEle.classList.add('home-menu-item-content-item-title');
    titleItemContentItemTextEle.textContent = item.title || '';
    titleItemContentItem.appendChild(titleItemContentItemTextEle);
    const titleItemContentItemImgEle = document.createElement('img');
    titleItemContentItemImgEle.classList.add('home-menu-item-content-item-title-arrow');
    titleItemContentItemImgEle.src = 'image/gray-arrow.png';
    titleItemContentItem.appendChild(titleItemContentItemImgEle);
    titleItemContent.appendChild(titleItemContentItem);
}
titleBox.appendChild(titleItemContent)
homeMenuFirstPage.insertBefore(titleBox, homeMenuTitles.first);

for (let i = 0; i < homeMenuTitles.length; i++) {
    const title = homeMenuTitles[i];
    title.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        const titleArrow = e.currentTarget.getElementsByClassName('home-menu-item-title-arrow')[0];
        const titleContent = e.currentTarget.getElementsByClassName('home-menu-item-content')[0];
        if (!titleContent) {
            return
        }
        const itemContentList = titleContent.getElementsByClassName('home-menu-item-content-item')
        for (let j = 0; j < itemContentList.length; j++) {
            const item = itemContentList[j];
            item.addEventListener('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                const ele = e.currentTarget;
                const pageTitle = ele.getElementsByClassName('home-menu-item-content-item-title')[0].textContent;
                homeMenusecondPage.style.display = 'flex';
                const homeMenuSeconPageTitleBoxEle = homeMenusecondPage.getElementsByClassName('home-menu-second-page-title-box')[0];
                homeMenuSeconPageTitleBoxEle.addEventListener('click', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    homeMenusecondPage.style.display = 'none';
                })
                const secondPageTitleEle = homeMenusecondPage.getElementsByClassName('home-menu-second-page-title')[0];
                secondPageTitleEle.textContent = pageTitle;
                const data = ele.data || []
                for (let k = 0; k < data.length; k++) {
                    const item2 = data[k];
                    const secondPageGroupEle = document.createElement('div');
                    secondPageGroupEle.classList.add('home-menu-second-page-group');
                    const secondPageGroupTextEle = document.createElement('p');
                    secondPageGroupTextEle.classList.add('home-menu-second-page-group-title');
                    secondPageGroupTextEle.textContent = item2.title || '';
                    secondPageGroupEle.appendChild(secondPageGroupTextEle);
                    const list2 = item2.list || []
                    for (let l = 0; l < list2.length; l++) {
                        const secondPageGroupItemEle = document.createElement('p');
                        secondPageGroupItemEle.classList.add('home-menu-second-page-group-item');
                        secondPageGroupItemEle.textContent = list2[l] || '';
                        secondPageGroupEle.appendChild(secondPageGroupItemEle);
                    }
                    homeMenusecondPage.appendChild(secondPageGroupEle);
                }
            })
        }
        if (titleContent.style.display === 'none') {
            titleContent.style.display = 'flex';
            titleArrow.style.transform = 'rotate(0deg)';
        } else {   
            titleContent.style.display = 'none';
            titleArrow.style.transform = 'rotate(-90deg)';
        }
    })
}

const headerResource = document.getElementById('header-items-label-resource');
const headerPost = document.getElementById('header-items-label-post');

addHeaderItemsEvent(headerResource, ['header-resource-item-1', 'header-resource-item-2', 'header-resource-item-3', 'header-resource-item-4', 'header-resource-item-5', 'header-resource-item-6']);
addHeaderItemsEvent(headerPost, ['header-post-item-1', 'header-post-item-2', 'header-post-item-3', 'header-post-item-4', 'header-post-item-5', 'header-post-item-6']);

let headerMenuTimer = null
function addHeaderItemsEvent(ele, data) {
    const headdrItemsMore = ele.getElementsByClassName('header-items-more')[0];
    ele.addEventListener('mouseleave', function (e) {
        if (headdrItemsMore.contains(e.target) || ele.contains(e.target)) {
            headerMenuTimer = setTimeout(() => {
                showOrDismissHeaderResourceMore(ele, false, []);
            }, 200)
        }
    })

    ele.addEventListener('mouseenter', function (e) {
        if (e.currentTarget === headerResource) {
            showOrDismissHeaderResourceMore(headerPost, false, []);
        } else if (e.currentTarget === headerPost) {
            showOrDismissHeaderResourceMore(headerResource, false, []);
        }
        if (headdrItemsMore === e.currentTarget || ele === e.currentTarget) {
            headerMenuTimer && clearTimeout(headerMenuTimer)
            showOrDismissHeaderResourceMore(e.currentTarget, true, data);
        }
    })
}

function showOrDismissHeaderResourceMore(ele, show, data) {
    const headdrItemsMore = ele.getElementsByClassName('header-items-more')[0];
    const arrowEle = ele.getElementsByClassName('header-items-label-icon')[0];
    if (show) {
        const eleRect = ele.getBoundingClientRect();
        const eleHeight = eleRect.height;
        arrowEle.style.transform = 'rotate(180deg)';
        headdrItemsMore.style.display = 'flex';
        headdrItemsMore.style.left = 0 + 'px';
        headdrItemsMore.style.top = eleHeight + 'px';
        headdrItemsMore.innerHTML = '';
        for (let i = 0; i < data.length; i++) {
            const item = document.createElement('p');
            item.classList.add('header-items-more-text');
            item.textContent = data[i];
            headdrItemsMore.appendChild(item);
            item.addEventListener('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                /// 跳转二级页面
                headdrItemsMore.style.display = 'none';
                headdrItemsMore.innerHTML = '';
            })
        }
    } else {
        arrowEle.style.transform = 'rotate(0deg)';
        headdrItemsMore.style.display = 'none';
        headdrItemsMore.innerHTML = '';
    }
} 