

window.addEventListener('DOMContentLoaded', function () {
    const isMobile = window.innerWidth <= 768;
    const banner = new Carousel('banner', 5);
    const bestItems = new Carousel('best-items', 11);
    const bestStore = new Carousel('best-store', 23);
    const hotCompaign = new Carousel('hot-compaigns', 47);
    if (!isMobile) {
        new Carousel('popuar-demands', 97);
    }
    const hotPosts = new Carousel('hot-posts', 197);
    const popularDemandsMobile = document.getElementById('popuar-demands-mobile');
    const brand = document.querySelector('.brand');
    const brandContent = brand.querySelector('.brand-content');
    const brandRightMore = brand.querySelector('.brand-right-box');
    const brandLeftMore = brand.querySelector('.brand-left-box');
    // brandContent.addEventListener('wheel', { passive: window.innerWidth <= 750 });
    // brandContent.addEventListener('touchmove', { passive: window.innerWidth <= 750 });
    let brandScrollOffsetX = brandContent.scrollLeft
    const BRAND_SCROLL_EPSILON = 1;

    function getBrandMaxScrollOffsetX() {
        return Math.max(0, brandContent.scrollWidth - brandContent.clientWidth);
    }

    function getBrandScrollStep() {
        return ($('.brand-item').width() || 0) * 2;
    }

    function setBrandArrowDisabled(ele, disabled) {
        ele.classList.toggle('brand-arrow-disabled', disabled);
        ele.setAttribute('aria-disabled', disabled ? 'true' : 'false');
    }

    brandRightMore.addEventListener('click', function (event) {
        if (brandRightMore.classList.contains('brand-arrow-disabled')) {
            return;
        }
        event.preventDefault();
        event.stopPropagation();
        const maxBrandScrollOffsetX = getBrandMaxScrollOffsetX();
        brandScrollOffsetX += getBrandScrollStep();
        if (brandScrollOffsetX > maxBrandScrollOffsetX) {
            brandScrollOffsetX = maxBrandScrollOffsetX
        }
        brandContent.scrollLeft = brandScrollOffsetX;
        requestAnimationFrame(() => {
            brandScroll();
        });
    })
    brandLeftMore.addEventListener('click', function (event) {
        if (brandLeftMore.classList.contains('brand-arrow-disabled')) {
            return;
        }
        event.preventDefault();
        event.stopPropagation();
        brandScrollOffsetX -= getBrandScrollStep();
        if (brandScrollOffsetX < 0) {
            brandScrollOffsetX = 0
        }
        brandContent.scrollLeft = brandScrollOffsetX;
        requestAnimationFrame(() => {
            brandScroll();
        });
    })

    function brandScroll() {
        const isMobile = window.innerWidth <= 768;
        const maxBrandScrollOffsetX = getBrandMaxScrollOffsetX();
        const offsetX = brandContent.scrollLeft;
        const canScrollHorizontal = maxBrandScrollOffsetX > BRAND_SCROLL_EPSILON;

        if (isMobile) {
            brandLeftMore.style.display = 'none';
            brandRightMore.style.display = 'none';
            return;
        }

        brandLeftMore.style.display = 'block';
        brandRightMore.style.display = 'block';

        if (!canScrollHorizontal) {
            setBrandArrowDisabled(brandLeftMore, true);
            setBrandArrowDisabled(brandRightMore, true);
            return;
        }

        setBrandArrowDisabled(brandLeftMore, offsetX <= BRAND_SCROLL_EPSILON);
        setBrandArrowDisabled(brandRightMore, offsetX >= maxBrandScrollOffsetX - BRAND_SCROLL_EPSILON);
    }

    brandContent.addEventListener('scroll', brandScroll, { passive: true });
    window.addEventListener('resize', brandScroll);
    brandScroll()

    function bindBestStoreTagRandomJump() {
        const bestStoresWrapper = document.querySelector('.best-stores-wrapper');
        if (!bestStoresWrapper) {
            return;
        }

        bestStoresWrapper.addEventListener('click', function (event) {
            const clickedTag = event.target.closest('.figma-best-store-item .item-tag');
            if (!clickedTag || !bestStoresWrapper.contains(clickedTag)) {
                return;
            }

            event.preventDefault();
            const targetPage = Math.random() < 0.5 ? 'tag-all.html' : 'attribute-all.html';
            window.location.href = targetPage;
        });
    }

    bindBestStoreTagRandomJump();

    function bindIndexPurchaseFlow() {
        const purchaseMask = document.getElementById('index-purchase-mask');
        if (!purchaseMask) {
            return;
        }
        const panels = Array.from(purchaseMask.querySelectorAll('.index-purchase-panel'));
        const qtyInputs = Array.from(purchaseMask.querySelectorAll('.index-purchase-qty'));
        const unitPrice = 156;
        const maxCount = 77;

        function getLoginState() {
            let userInfo = {};
            try {
                userInfo = JSON.parse(sessionStorage.getItem('user') || '{}');
            } catch (error) {
                userInfo = {};
            }
            const params = new URLSearchParams(window.location.search);
            return Boolean(userInfo.id || userInfo.uid || (window.user && window.user.uid) || params.get('isLogin') === 'true');
        }

        function setStep(step) {
            panels.forEach(function (panel) {
                panel.classList.toggle('is-active', panel.dataset.purchaseStep === step);
            });
            purchaseMask.dataset.purchaseStep = step;
            if (window.innerWidth <= 768) {
                window.scrollTo({ top: 0, behavior: 'auto' });
            }
        }

        function syncQuantity(value) {
            let count = parseInt(value, 10);
            if (Number.isNaN(count)) {
                count = 1;
            }
            count = Math.min(maxCount, Math.max(1, count));
            qtyInputs.forEach(function (input) {
                input.value = count;
            });
            purchaseMask.querySelectorAll('.index-purchase-total').forEach(function (item) {
                item.textContent = `$${(unitPrice * count).toFixed(2)}`;
            });
            purchaseMask.querySelectorAll('.index-purchase-summary-qty').forEach(function (item) {
                item.textContent = count;
            });
            purchaseMask.querySelectorAll('.index-purchase-qty-minus').forEach(function (button) {
                button.classList.toggle('is-disabled', count <= 1);
            });
            purchaseMask.querySelectorAll('.index-purchase-qty-plus').forEach(function (button) {
                button.classList.toggle('is-disabled', count >= maxCount);
            });
        }

        function openPurchaseFlow() {
            setStep('product');
            purchaseMask.style.display = 'flex';
            purchaseMask.setAttribute('aria-hidden', 'false');
            document.body.classList.add('index-purchase-open');
            syncQuantity(qtyInputs[0] ? qtyInputs[0].value : 1);
        }

        function closePurchaseFlow() {
            purchaseMask.style.display = 'none';
            purchaseMask.setAttribute('aria-hidden', 'true');
            document.body.classList.remove('index-purchase-open');
            setStep('product');
        }

        document.body.addEventListener('click', function (event) {
            const buyButton = event.target.closest('.index-best-item-buy-btn');
            if (!buyButton) {
                return;
            }
            event.preventDefault();
            event.stopPropagation();
            if (!getLoginState()) {
                const signinButton = document.getElementById('header-signin');
                if (signinButton) {
                    signinButton.click();
                }
                return;
            }
            openPurchaseFlow();
        });

        purchaseMask.addEventListener('click', function (event) {
            if (event.target === purchaseMask && window.innerWidth > 768) {
                closePurchaseFlow();
                return;
            }
            const closeButton = event.target.closest('.index-purchase-close');
            if (closeButton) {
                closePurchaseFlow();
                return;
            }
            const nextButton = event.target.closest('[data-purchase-next]');
            if (nextButton) {
                const nextStep = nextButton.dataset.purchaseNext;
                setStep(nextStep);
                return;
            }
            const prevButton = event.target.closest('[data-purchase-prev]');
            if (prevButton) {
                setStep(prevButton.dataset.purchasePrev);
                return;
            }
            const minusButton = event.target.closest('.index-purchase-qty-minus');
            if (minusButton) {
                syncQuantity((parseInt(qtyInputs[0].value, 10) || 1) - 1);
                return;
            }
            const plusButton = event.target.closest('.index-purchase-qty-plus');
            if (plusButton) {
                syncQuantity((parseInt(qtyInputs[0].value, 10) || 1) + 1);
                return;
            }
            if (event.target.closest('.index-purchase-link-btn')) {
                closePurchaseFlow();
            }
        });

        qtyInputs.forEach(function (input) {
            input.addEventListener('input', function () {
                syncQuantity(input.value);
            });
        });
        var fileDataMap = {};

        function bindUpload() {
            var uploadInputs = purchaseMask.querySelectorAll('.index-purchase-upload-input');
            uploadInputs.forEach(function (input) {
                input.addEventListener('change', function (event) {
                    var files = Array.from(event.target.files || []);
                    var container = input.closest('.index-purchase-upload');
                    var previewsEl = container.querySelector('.index-purchase-upload-previews');
                    files.forEach(function (file) {
                        var id = Date.now() + '-' + Math.random().toString(36).substr(2, 9);
                        fileDataMap[id] = file;
                        var previewEl = document.createElement('div');
                        previewEl.className = 'index-purchase-upload-preview';
                        previewEl.dataset.fileId = id;
                        var removeBtn = document.createElement('button');
                        removeBtn.className = 'index-purchase-upload-remove';
                        removeBtn.type = 'button';
                        removeBtn.textContent = '×';
                        previewEl.appendChild(removeBtn);
                        if (file.type.startsWith('image/')) {
                            var reader = new FileReader();
                            reader.onload = function (e) {
                                var img = document.createElement('img');
                                img.src = e.target.result;
                                img.alt = file.name;
                                previewEl.appendChild(img);
                            };
                            reader.readAsDataURL(file);
                        } else {
                            previewEl.classList.add('index-purchase-upload-file-preview');
                            var icon = document.createElement('span');
                            icon.className = 'index-purchase-upload-file-icon';
                            icon.textContent = '📄';
                            var name = document.createElement('span');
                            name.className = 'index-purchase-upload-file-name';
                            name.textContent = file.name;
                            previewEl.appendChild(icon);
                            previewEl.appendChild(name);
                        }
                        previewsEl.appendChild(previewEl);
                    });
                    if (previewsEl.children.length > 0) {
                        container.classList.add('has-files');
                    }
                    input.value = '';
                });
            });
        }

        function bindUploadRemove() {
            purchaseMask.addEventListener('click', function (event) {
                var removeBtn = event.target.closest('.index-purchase-upload-remove');
                if (!removeBtn) return;
                event.stopPropagation();
                var previewEl = removeBtn.closest('.index-purchase-upload-preview');
                var container = previewEl.closest('.index-purchase-upload');
                var previewsEl = container.querySelector('.index-purchase-upload-previews');
                delete fileDataMap[previewEl.dataset.fileId];
                previewEl.remove();
                if (previewsEl.children.length === 0) {
                    container.classList.remove('has-files');
                }
            });
        }

        function bindImagePreview() {
            purchaseMask.addEventListener('click', function (event) {
                var previewEl = event.target.closest('.index-purchase-upload-preview');
                if (!previewEl) return;
                if (previewEl.classList.contains('index-purchase-upload-file-preview')) return;
                event.preventDefault();
                event.stopPropagation();
                var img = previewEl.querySelector('img');
                if (!img) return;
                var modal = document.getElementById('index-purchase-image-modal');
                if (modal) {
                    modal.querySelector('.index-purchase-image-modal-img').src = img.src;
                    modal.classList.add('is-open');
                    modal.setAttribute('aria-hidden', 'false');
                }
            });
            var imageModal = document.getElementById('index-purchase-image-modal');
            if (imageModal) {
                imageModal.addEventListener('click', function (event) {
                    if (event.target === imageModal || event.target.closest('.index-purchase-image-modal-close')) {
                        imageModal.classList.remove('is-open');
                        imageModal.setAttribute('aria-hidden', 'true');
                        imageModal.querySelector('.index-purchase-image-modal-img').src = '';
                    }
                });
            }
        }

        bindUpload();
        bindUploadRemove();
        bindImagePreview();
        syncQuantity(1);
    }

    bindIndexPurchaseFlow();

    if (isMobile && popularDemandsMobile) {
        let mouseDown = false;
        let mouseStartX = 0;
        let scrollStartX = 0;

        popularDemandsMobile.addEventListener('mousedown', function (event) {
            mouseDown = true;
            mouseStartX = event.clientX;
            scrollStartX = popularDemandsMobile.scrollLeft;
            popularDemandsMobile.classList.add('is-dragging');
            event.preventDefault();
        });

        popularDemandsMobile.addEventListener('mousemove', function (event) {
            if (!mouseDown) return;
            const deltaX = event.clientX - mouseStartX;
            popularDemandsMobile.scrollLeft = scrollStartX - deltaX;
            event.preventDefault();
        });

        function stopDrag() {
            mouseDown = false;
            popularDemandsMobile.classList.remove('is-dragging');
        }

        popularDemandsMobile.addEventListener('mouseleave', stopDrag);
        popularDemandsMobile.addEventListener('mouseup', stopDrag);
    }
})
