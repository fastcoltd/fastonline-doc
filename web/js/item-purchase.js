// 购买组件交互功能
document.addEventListener('DOMContentLoaded', function() {
    // 获取DOM元素
    const decreaseBtn = document.getElementById('decrease-qty');
    const increaseBtn = document.getElementById('increase-qty');
    const quantityDisplay = document.getElementById('quantity-display');
    const totalPriceElement = document.querySelector('.item-purchase-total-price');
    const buyNowBtn = document.getElementById('buy-now-btn');
    const likeBtn = document.querySelector('.item-purchase-like-btn');
    const shareBtn = document.querySelector('.item-purchase-share-btn');
    const ellipsisBtn = document.querySelector('.item-purchase-ellipsis');

    // 商品数据
    let productData = {
        basePrice: 179.00,
        originalPrice: 210.00,
        quantity: 1,
        minQuantity: 1,
        maxQuantity: 262,
        inStock: 262,
        isLiked: false
    };

    // 初始化
    function init() {
        updateDisplay();
        bindEvents();
    }

    // 更新显示
    function updateDisplay() {
        quantityDisplay.textContent = productData.quantity;
        const totalPrice = (productData.basePrice * productData.quantity).toFixed(2);
        totalPriceElement.textContent = `$${totalPrice}`;
        
        // 更新按钮状态
        decreaseBtn.disabled = productData.quantity <= productData.minQuantity;
        increaseBtn.disabled = productData.quantity >= productData.maxQuantity;
        
        // 更新按钮样式
        if (decreaseBtn.disabled) {
            decreaseBtn.style.opacity = '0.5';
            decreaseBtn.style.cursor = 'not-allowed';
        } else {
            decreaseBtn.style.opacity = '1';
            decreaseBtn.style.cursor = 'pointer';
        }
        
        if (increaseBtn.disabled) {
            increaseBtn.style.opacity = '0.5';
            increaseBtn.style.cursor = 'not-allowed';
        } else {
            increaseBtn.style.opacity = '1';
            increaseBtn.style.cursor = 'pointer';
        }
    }

    // 绑定事件
    function bindEvents() {
        // 减少数量
        decreaseBtn.addEventListener('click', function() {
            if (productData.quantity > productData.minQuantity) {
                productData.quantity--;
                updateDisplay();
            }
        });

        // 增加数量
        increaseBtn.addEventListener('click', function() {
            if (productData.quantity < productData.maxQuantity) {
                productData.quantity++;
                updateDisplay();
            }
        });

        // 购买按钮
        buyNowBtn.addEventListener('click', function() {
            handleBuyNow();
        });

        // 点赞按钮
        likeBtn.addEventListener('click', function() {
            handleLike();
        });

        // 分享按钮
        shareBtn.addEventListener('click', function() {
            handleShare();
        });

        // 更多操作按钮
        ellipsisBtn.addEventListener('click', function() {
            handleEllipsis();
        });

        // 批发价格标签点击
        const wholesaleBadges = document.querySelectorAll('.item-purchase-wholesale-badge');
        wholesaleBadges.forEach(badge => {
            badge.addEventListener('click', function() {
                handleWholesaleSelect(this);
            });
        });
    }

    // 处理购买
    function handleBuyNow() {
        const totalPrice = (productData.basePrice * productData.quantity).toFixed(2);
        
        // 模拟购买流程
        console.log('购买信息：', {
            quantity: productData.quantity,
            unitPrice: productData.basePrice,
            totalPrice: totalPrice
        });

        // 显示购买确认
        if (confirm(`确认购买 ${productData.quantity} 件商品，总价 $${totalPrice}？`)) {
            // 这里可以添加实际的购买逻辑，比如跳转到支付页面
            alert('购买成功！正在跳转到支付页面...');
            
            // 模拟跳转
            // window.location.href = '/checkout';
        }
    }

    // 处理点赞
    function handleLike() {
        productData.isLiked = !productData.isLiked;
        
        if (productData.isLiked) {
            likeBtn.style.background = '#FF1B20';
            likeBtn.setAttribute('aria-pressed', 'true');
            console.log('已添加到收藏');
        } else {
            likeBtn.style.background = '#ccc';
            likeBtn.setAttribute('aria-pressed', 'false');
            console.log('已取消收藏');
        }
    }

    // 处理分享
    function handleShare() {
        // 检查是否支持 Web Share API
        if (navigator.share) {
            navigator.share({
                title: '商品分享',
                text: '查看这个很棒的商品！',
                url: window.location.href
            }).then(() => {
                console.log('分享成功');
            }).catch((error) => {
                console.log('分享失败:', error);
                fallbackShare();
            });
        } else {
            fallbackShare();
        }
    }

    // 备用分享方法
    function fallbackShare() {
        // 复制链接到剪贴板
        if (navigator.clipboard) {
            navigator.clipboard.writeText(window.location.href).then(() => {
                alert('链接已复制到剪贴板！');
            }).catch(() => {
                showShareModal();
            });
        } else {
            showShareModal();
        }
    }

    // 显示分享模态框
    function showShareModal() {
        const shareText = `分享链接: ${window.location.href}`;
        prompt('复制下面的链接进行分享：', shareText);
    }

    // 处理更多操作
    function handleEllipsis() {
        // 显示更多操作菜单
        const actions = [
            '添加到愿望清单',
            '比较商品',
            '举报商品',
            '查看详细规格'
        ];
        
        const action = prompt('选择操作：\n' + actions.map((item, index) => `${index + 1}. ${item}`).join('\n'));
        
        if (action) {
            const actionIndex = parseInt(action) - 1;
            if (actionIndex >= 0 && actionIndex < actions.length) {
                console.log(`执行操作: ${actions[actionIndex]}`);
                alert(`已执行: ${actions[actionIndex]}`);
            }
        }
    }

    // 处理批发价格选择
    function handleWholesaleSelect(selectedBadge) {
        // 移除其他标签的选中状态
        const allBadges = document.querySelectorAll('.item-purchase-wholesale-badge');
        allBadges.forEach(badge => {
            badge.classList.remove('selected');
            badge.style.background = 'transparent';
            badge.style.borderColor = '#C5C5C5';
        });
        
        // 设置当前标签为选中状态
        selectedBadge.classList.add('selected');
        selectedBadge.style.background = '#f0f0f0';
        selectedBadge.style.borderColor = '#FF1B20';
        
        // 解析价格信息
        const text = selectedBadge.textContent;
        const priceMatch = text.match(/\$(\d+\.?\d*)/);
        if (priceMatch) {
            const wholesalePrice = parseFloat(priceMatch[1]);
            productData.basePrice = wholesalePrice;
            updateDisplay();
            console.log(`选择批发价格: $${wholesalePrice}`);
        }
    }

    // 键盘事件支持
    document.addEventListener('keydown', function(e) {
        if (e.target.closest('.item-purchase-container')) {
            switch(e.key) {
                case 'ArrowUp':
                case '+':
                    e.preventDefault();
                    if (productData.quantity < productData.maxQuantity) {
                        productData.quantity++;
                        updateDisplay();
                    }
                    break;
                case 'ArrowDown':
                case '-':
                    e.preventDefault();
                    if (productData.quantity > productData.minQuantity) {
                        productData.quantity--;
                        updateDisplay();
                    }
                    break;
                case 'Enter':
                    if (e.target === buyNowBtn) {
                        handleBuyNow();
                    }
                    break;
            }
        }
    });

    // 数量输入框直接编辑（可选功能）
    quantityDisplay.addEventListener('click', function() {
        const input = document.createElement('input');
        input.type = 'number';
        input.min = productData.minQuantity;
        input.max = productData.maxQuantity;
        input.value = productData.quantity;
        input.style.width = '100%';
        input.style.height = '100%';
        input.style.border = 'none';
        input.style.textAlign = 'center';
        input.style.fontSize = '12px';
        input.style.fontFamily = 'Lexend, sans-serif';
        
        quantityDisplay.innerHTML = '';
        quantityDisplay.appendChild(input);
        input.focus();
        input.select();
        
        function finishEdit() {
            const newValue = parseInt(input.value);
            if (newValue >= productData.minQuantity && newValue <= productData.maxQuantity) {
                productData.quantity = newValue;
            }
            quantityDisplay.innerHTML = productData.quantity;
            updateDisplay();
        }
        
        input.addEventListener('blur', finishEdit);
        input.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                finishEdit();
            } else if (e.key === 'Escape') {
                quantityDisplay.innerHTML = productData.quantity;
            }
        });
    });

    // 初始化组件
    init();
}); 