
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