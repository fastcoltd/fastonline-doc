// 博客文章详情页面交互功能
document.addEventListener('DOMContentLoaded', function () {
    const similar = new Carousel('best-items', 20);
    const link = new LinkRef('page-link', 'item-detail-left-group');
    // 评分功能
    initRatingSystem();

    // 评论功能
    initCommentFeatures();

    // 分享功能
    initShareFeatures();

    // 相关商品功能
    initRelatedItems();

    // 目录导航
    initTableOfContents();

    // 字符计数
    initCharacterCount();

    // 响应式功能
    initResponsiveFeatures();
});

// 评分系统
function initRatingSystem() {
    const ratingInputs = document.querySelectorAll('.rating-input');

    ratingInputs.forEach(ratingInput => {
        const stars = ratingInput.querySelectorAll('.star');
        const scoreElement = ratingInput.querySelector('.rating-score');
        let currentRating = 0;

        stars.forEach((star, index) => {
            star.addEventListener('click', () => {
                currentRating = index + 1;
                updateStars(stars, currentRating);
                updateScore(scoreElement, currentRating);
            });

            star.addEventListener('mouseenter', () => {
                updateStars(stars, index + 1);
            });
        });

        ratingInput.addEventListener('mouseleave', () => {
            updateStars(stars, currentRating);
        });
    });
}

function updateStars(stars, rating) {
    stars.forEach((star, index) => {
        star.classList.remove('active', 'half');

        if (index < Math.floor(rating)) {
            star.classList.add('active');
        } else if (index < rating && rating % 1 !== 0) {
            star.classList.add('half');
        }
    });
}

function updateScore(scoreElement, rating) {
    if (scoreElement) {
        scoreElement.textContent = rating.toFixed(1);
    }
}

// 评论功能
function initCommentFeatures() {
    // 点赞/踩功能
    const actionGroups = document.querySelectorAll('.action-group');

    actionGroups.forEach(group => {
        group.addEventListener('click', () => {
            const isThumbUp = group.querySelector('.thumb-up');
            const actionText = group.querySelector('.action-text');

            // 切换状态
            group.classList.toggle('active');

            // 更新样式
            if (group.classList.contains('active')) {
                group.style.color = '#FF1B20';
            } else {
                group.style.color = '#000000';
            }
        });
    });

    // 回复功能
    const replyIcons = document.querySelectorAll('.reply-icon');

    replyIcons.forEach(icon => {
        icon.addEventListener('click', () => {
            // 这里可以添加回复功能的逻辑
            console.log('回复评论');
        });
    });

    // 显示更多评论
    const showMoreBtn = document.querySelector('.show-more-btn');

    if (showMoreBtn) {
        showMoreBtn.addEventListener('click', () => {
            // 这里可以添加加载更多评论的逻辑
            console.log('加载更多评论');
        });
    }
}

// 分享功能
function initShareFeatures() {
    const shareIcons = document.querySelectorAll('.share-icon');

    shareIcons.forEach(icon => {
        icon.addEventListener('click', () => {
            const platform = icon.classList[1]; // facebook, twitter, link

            switch (platform) {
                case 'facebook':
                    shareToFacebook();
                    break;
                case 'twitter':
                    shareToTwitter();
                    break;
                case 'link':
                    copyLink();
                    break;
            }
        });
    });
}

function shareToFacebook() {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(document.title);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank', 'width=600,height=400');
}

function shareToTwitter() {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(document.title);
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${title}`, '_blank', 'width=600,height=400');
}

function copyLink() {
    navigator.clipboard.writeText(window.location.href).then(() => {
        // 显示复制成功提示
        showToast('链接已复制到剪贴板');
    }).catch(err => {
        console.error('复制失败:', err);
    });
}

// 相关商品功能
function initRelatedItems() {
    // 购买按钮
    const buyBtns = document.querySelectorAll('.buy-btn');

    buyBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // 这里可以添加购买逻辑
            console.log('购买商品');
            showToast('已添加到购物车');
        });
    });

    // 喜欢按钮
    const likeBtns = document.querySelectorAll('.like-btn');

    likeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            btn.classList.toggle('active');

            if (btn.classList.contains('active')) {
                btn.style.background = '#FF1B20';
                showToast('已添加到收藏');
            } else {
                btn.style.background = 'rgba(255, 255, 255, 0.5)';
                showToast('已取消收藏');
            }
        });
    });

    // 分页功能
    const paginationDots = document.querySelectorAll('.pagination-dot');

    paginationDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            // 移除其他active状态
            paginationDots.forEach(d => d.classList.remove('active'));
            // 添加当前active状态
            dot.classList.add('active');

            // 这里可以添加切换商品页面的逻辑
            console.log(`切换到第${index + 1}页`);
        });
    });
}

// 目录导航
function initTableOfContents() {
    const tocItems = document.querySelectorAll('.toc-item');

    // 点击目录项功能
    tocItems.forEach((item) => {
        item.addEventListener('click', () => {
            const sectionId = item.getAttribute('data-section');

            // 移除其他active状态
            tocItems.forEach(i => i.classList.remove('active'));
            // 添加当前active状态
            item.classList.add('active');

            // 滚动到对应部分
            scrollToSection(sectionId);
        });
    });

    // 滚动时自动高亮当前章节
    initScrollSpy();
}

function scrollToSection(sectionId) {
    const targetSection = document.getElementById(sectionId);

    if (targetSection) {
        // 计算偏移量，确保内容不被固定头部遮挡
        const offset = 80; // 根据实际的头部高度调整
        const elementPosition = targetSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}

// 滚动监听，自动高亮当前可见的章节
function initScrollSpy() {
    const tocItems = document.querySelectorAll('.toc-item');
    const sections = document.querySelectorAll('.content-section, #section-10, #section-11');

    function updateActiveSection() {
        let currentSection = null;

        // 找到当前在视窗中的章节
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const isVisible = rect.top <= 100 && rect.bottom >= 100;

            if (isVisible) {
                currentSection = section.id;
            }
        });

        // 更新目录高亮
        if (currentSection) {
            tocItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('data-section') === currentSection) {
                    item.classList.add('active');
                }
            });
        }
    }

    // 节流滚动事件
    let ticking = false;

    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateActiveSection();
                ticking = false;
            });
            ticking = true;
        }
    }

    window.addEventListener('scroll', onScroll);

    // 初始化时执行一次
    updateActiveSection();
}

// 字符计数
function initCharacterCount() {
    const textarea = document.querySelector('.comment-textarea');
    const charCountElement = document.querySelector('.char-count');

    if (textarea && charCountElement) {
        textarea.addEventListener('input', () => {
            const currentLength = textarea.value.length;
            const maxLength = 100;

            charCountElement.textContent = `${currentLength} / ${maxLength}`;

            if (currentLength > maxLength) {
                charCountElement.style.color = '#FF1B20';
            } else {
                charCountElement.style.color = 'rgba(0, 0, 0, 0.25)';
            }
        });
    }
}

// 响应式功能
function initResponsiveFeatures() {
    // 监听窗口大小变化
    window.addEventListener('resize', handleResize);

    // 初始加载时执行一次
    handleResize();
}

function handleResize() {
    const container = document.querySelector('.post-detail-container');
    const tableOfContents = document.querySelector('.table-of-contents');

    if (window.innerWidth <= 968) {
        // 移动端处理
        if (tableOfContents) {
            tableOfContents.style.position = 'static';
        }
    } else {
        // 桌面端处理
        if (tableOfContents) {
            tableOfContents.style.position = 'sticky';
        }
    }
}

// 表单提交
function initFormSubmission() {
    const submitBtn = document.querySelector('.submit-btn');
    const commentForm = document.querySelector('.comment-form');

    if (submitBtn && commentForm) {
        submitBtn.addEventListener('click', (e) => {
            e.preventDefault();

            // 获取表单数据
            const formData = getFormData();

            // 验证表单
            if (validateForm(formData)) {
                // 提交评论
                submitComment(formData);
            }
        });
    }
}

function getFormData() {
    const textarea = document.querySelector('.comment-textarea');
    const captchaInput = document.querySelector('.captcha-input');
    const ratingInputs = document.querySelectorAll('.rating-input');

    const ratings = {};
    ratingInputs.forEach((input, index) => {
        const score = input.querySelector('.rating-score').textContent;
        ratings[`rating_${index}`] = parseFloat(score);
    });

    return {
        comment: textarea ? textarea.value : '',
        captcha: captchaInput ? captchaInput.value : '',
        ratings: ratings
    };
}

function validateForm(formData) {
    if (!formData.comment.trim()) {
        showToast('请输入评论内容');
        return false;
    }

    if (formData.comment.length > 100) {
        showToast('评论内容不能超过100字符');
        return false;
    }

    if (!formData.captcha.trim()) {
        showToast('请输入验证码');
        return false;
    }

    return true;
}

function submitComment(formData) {
    // 这里可以添加实际的提交逻辑
    console.log('提交评论:', formData);

    // 模拟提交成功
    showToast('评论提交成功');

    // 清空表单
    const textarea = document.querySelector('.comment-textarea');
    const captchaInput = document.querySelector('.captcha-input');

    if (textarea) textarea.value = '';
    if (captchaInput) captchaInput.value = '';

    // 重置评分
    const ratingInputs = document.querySelectorAll('.rating-input');
    ratingInputs.forEach(input => {
        const stars = input.querySelectorAll('.star');
        const scoreElement = input.querySelector('.rating-score');

        stars.forEach(star => star.classList.remove('active', 'half'));
        if (scoreElement) scoreElement.textContent = '0';
    });
}

// 工具函数：显示提示信息
function showToast(message) {
    // 创建toast元素
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;

    // 添加样式
    Object.assign(toast.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: '#333333',
        color: '#ffffff',
        padding: '12px 24px',
        borderRadius: '8px',
        zIndex: '9999',
        fontSize: '14px',
        fontFamily: 'Roboto, sans-serif',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease'
    });

    // 添加到页面
    document.body.appendChild(toast);

    // 显示动画
    setTimeout(() => {
        toast.style.transform = 'translateX(0)';
    }, 100);

    // 自动隐藏
    setTimeout(() => {
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

// 懒加载图片
function initLazyLoading() {
    const images = document.querySelectorAll('.item-image, .article-image, .product-image');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        imageObserver.observe(img);
    });
}

// 滚动优化
function initScrollOptimization() {
    let ticking = false;

    function updateScrollPosition() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;

        // 这里可以添加视差滚动效果

        ticking = false;
    }

    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateScrollPosition);
            ticking = true;
        }
    }

    window.addEventListener('scroll', requestTick);
}

// 初始化所有功能
document.addEventListener('DOMContentLoaded', function () {
    initRatingSystem();
    initCommentFeatures();
    initShareFeatures();
    initRelatedItems();
    initTableOfContents();
    initCharacterCount();
    initResponsiveFeatures();
    initFormSubmission();
    initLazyLoading();
    initScrollOptimization();
}); 