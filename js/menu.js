const menu = document.getElementsByClassName('menu')[0];
const menuContent = document.getElementsByClassName('menu-content')[0];
const subMenuBox = menuContent.getElementsByClassName('sub-menu-box')[0];
const menuItems = menuContent.querySelectorAll('.menu-item');

let homeMenuTimer = null
menuContent.addEventListener('mouseleave', function (e) {
    if (menuContent === e.currentTarget || subMenuBox === e.currentTarget) {
        homeMenuTimer = setTimeout(() => {
            changeMenu(undefined);
        }, 200)
    }
})
menuItems.forEach(item => {
    item.addEventListener('mouseenter', function (e) {
        homeMenuTimer && clearTimeout(homeMenuTimer)
        changeMenu(e.currentTarget);
    });
});

showMenuMore();


window.addEventListener('resize', function (event) {
    showMenuMore();
})

function showMenuMore() {
    const menuContentScroll = menuContent.scrollWidth > menuContent.clientWidth;
    const menuMore = document.getElementsByClassName('menu-more-box')[0];
    menuMore.style.display = menuContentScroll ? 'block' : 'none';
    menuMore.addEventListener('click', function (event) {
        event.preventDefault();
        event.stopPropagation();
    })
}

function changeMenu(element) {
    let show = false;
    menuItems.forEach(item => {
        const indicator = item.getElementsByClassName('menu-item-indicator')[0];
        if (item === element) {
            indicator.style.display = 'block';
            show = true;
        } else {
            indicator.style.display = 'none';
        }
    })

    if (show) {
        const data = [
            {title: 'menu-title-1', list: ['menu-item-11', 'menu-item-12', 'menu-item-13', 'menu-item-14', 'menu-item-15', 'menu-item-16']},
            {title: 'menu-title-2', list: ['menu-item-21', 'menu-item-22', 'menu-item-23', 'menu-item-24', 'menu-item-25', 'menu-item-26', 'menu-item-27', 'menu-item-28']},
            {title: 'menu-title-3', list: ['menu-item-31', 'menu-item-32', 'menu-item-33', 'menu-item-34', 'menu-item-35']},
            {title: 'menu-title-4', list: ['menu-item-41', 'menu-item-42', 'menu-item-43', 'menu-item-44', 'menu-item-45']},
            {title: 'menu-title-5', list: ['menu-item-51', 'menu-item-52', 'menu-item-53', 'menu-item-54', 'menu-item-55', 'menu-item-56']},
            {title: 'menu-title-6', list: ['menu-item-61', 'menu-item-62', 'menu-item-63', 'menu-item-64', 'menu-item-65', 'menu-item-66', 'menu-item-67', 'menu-item-68']},
            {title: 'menu-title-7', list: ['menu-item-71', 'menu-item-72', 'menu-item-73', 'menu-item-74', 'menu-item-75']},
            {title: 'menu-title-8', list: ['menu-item-81', 'menu-item-82', 'menu-item-83', 'menu-item-84', 'menu-item-85']},
            {title: 'menu-title-9', list: ['menu-item-91', 'menu-item-92', 'menu-item-93', 'menu-item-94', 'menu-item-95', 'menu-item-96']},
            {title: 'menu-title-10', list: ['menu-item-101', 'menu-item-102', 'menu-item-103', 'menu-item-104', 'menu-item-105', 'menu-item-106', 'menu-item-107', 'menu-item-108']},
        ]
        const eleRect = menuContent.getBoundingClientRect();
        const eleHeight = eleRect.height;
        subMenuBox.style.display = 'flex';
        subMenuBox.style.top = eleHeight + 'px';
        subMenuBox.innerHTML = '';
        for (let i = 0; i < data.length; i++) {
            const itemEle = document.createElement('div');
            itemEle.classList.add('sub-menu-list');
            const titleEle = document.createElement('p');
            titleEle.classList.add('sub-menu-list-title');
            titleEle.textContent = data[i].title || '';
            itemEle.appendChild(titleEle);
            const list = data[i].list || []
            for (let j = 0; j < list.length; j++) {
                const item2Ele = document.createElement('div');
                item2Ele.classList.add('sub-menu-list-item');
                const item2ImgEle = document.createElement('img');
                item2ImgEle.classList.add('sub-menu-list-item-icon');
                item2ImgEle.src = '{{图像地址}}';
                item2Ele.appendChild(item2ImgEle);
                const item2TextEle = document.createElement('p');
                item2TextEle.classList.add('sub-menu-list-item-text');
                item2TextEle.textContent = list[j] || '';
                item2Ele.appendChild(item2TextEle);
                itemEle.appendChild(item2Ele);
            }
            subMenuBox.appendChild(itemEle);
        }
    } else {
        subMenuBox.style.display = 'none';
        subMenuBox.innerHTML = '';
    } 
}