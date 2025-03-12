// 卡片生成函数
function generateCards(containerId, cardType, data) {
    const container = document.getElementById(containerId);
    data.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
      <img src="${item.cover || 'placeholder.jpg'}" alt="${item.title || item.name}">
      <div class="card-content">
        <h3>${item.title || item.name}</h3>
        ${item.price ? `<p>价格: ${item.price}</p>` : ''}
        ${item.sales ? `<p>销量: ${item.sales}</p>` : ''}
        ${item.rating ? `<p>评分: ${item.rating} (${item.ratingCount || 0})</p>` : ''}
        ${item.stock ? `<p>库存: ${item.stock}</p>` : ''}
        ${item.shopName ? `<p>店铺: ${item.shopName}</p>` : ''}
        ${item.slogan ? `<p>${item.slogan}</p>` : ''}
        ${item.tags ? `<p>标签: ${item.tags.join(', ')}</p>` : ''}
        ${item.buttonText ? `<a href="#" class="card-button">${item.buttonText}</a>` : ''}
      </div>
    `;
        card.onclick = () => window.location.href = item.link || '#';
        container.appendChild(card);
    });
}

// 弹窗生成函数
function showModal(modalId, content) {
    const modal = document.getElementById(modalId);
    modal.querySelector('.modal-content').innerHTML = content;
    modal.style.display = 'block';
}
function hideModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// 轮播图动态效果
function initCarousel() {
    let current = 0;
    const items = document.querySelectorAll('.carousel-item');
    setInterval(() => {
        items[current].style.opacity = 0;
        current = (current + 1) % items.length;
        items[current].style.opacity = 1;
    }, 3000);
}