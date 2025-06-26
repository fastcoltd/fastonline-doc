const tagRect = document.querySelector('.tag-page-header-desc-tag-box').getBoundingClientRect();
const layoutRect = document.querySelector('.page-filter-layoutcontrol-box').getBoundingClientRect();
const sortBox = document.querySelector('.page-filterresult-sort-box');
const listBox = document.querySelector('.list-container');
const filterBox = document.querySelector('.filter-container');
sortBox.style.top = tagRect.bottom + 10 + 'px';
listBox.style.top = tagRect.bottom + 69 + 'px';
filterBox.style.top = layoutRect.bottom + 'px';

let tagValue = null;
const tags = document.querySelectorAll(".tag-page-header-desc-tag-item");
if (tags.length > 0) {
    tags[0].classList.add('active');
    tagValue = tags[0].textContent;
}
tags.forEach(function (item) {
    item.addEventListener("click", function (e) {
        e.stopPropagation();
        tags.forEach(item => item.classList.remove('active'));
        e.currentTarget.classList.add('active');
        tagValue = e.currentTarget.textContent;
        reloadItems();
    });
});