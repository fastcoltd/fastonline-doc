class StoreAllLayout {
    constructor(stateRoot = document.getElementById('items-grid'), layoutSwitchRoot = document) {
        this.currentLayout = 'vertical';
        this.stateRoot = stateRoot || document.getElementById('items-grid');
        this.layoutSwitchRoot = layoutSwitchRoot;
        this.mobileMedia = window.matchMedia('(max-width: 768px)');
        this.stateClasses = [
            'store-all-card--desktop-vertical',
            'store-all-card--desktop-horizontal',
            'store-all-card--mobile-vertical',
            'store-all-card--mobile-horizontal'
        ];
        this.init();
    }

    init() {
        this.bindEvents();
        this.observeItems();
        this.syncLayout();
    }

    getLayoutButtons() {
        return this.layoutSwitchRoot
            ? this.layoutSwitchRoot.querySelectorAll('.layout-switch')
            : [];
    }

    bindEvents() {
        this.getLayoutButtons().forEach(button => {
            button.addEventListener('click', event => {
                this.switchLayout(event.currentTarget.dataset.layout);
            });
        });

        const handleViewportChange = () => this.syncLayout();
        if (typeof this.mobileMedia.addEventListener === 'function') {
            this.mobileMedia.addEventListener('change', handleViewportChange);
        } else {
            this.mobileMedia.addListener(handleViewportChange);
        }

        window.addEventListener('resize', () => this.scheduleTagOverflowSync());
    }

    observeItems() {
        if (!this.stateRoot) return;

        this.itemsObserver = new MutationObserver(mutations => {
            const hasNewItems = mutations.some(mutation => mutation.addedNodes.length > 0);
            if (hasNewItems) this.scheduleTagOverflowSync();
        });
        this.itemsObserver.observe(this.stateRoot, { childList: true, subtree: true });
    }

    switchLayout(layout) {
        if (layout !== 'vertical' && layout !== 'horizontal') return;
        this.currentLayout = layout;
        this.syncLayout();
    }

    getStateClass() {
        const device = this.mobileMedia.matches ? 'mobile' : 'desktop';
        return `store-all-card--${device}-${this.currentLayout}`;
    }

    syncLayout() {
        this.getLayoutButtons().forEach(button => {
            button.classList.toggle('active', button.dataset.layout === this.currentLayout);
        });
        this.syncState();
        this.scheduleTagOverflowSync();
    }

    syncState() {
        if (!this.stateRoot) return;
        this.stateRoot.classList.remove(...this.stateClasses);
        this.stateRoot.classList.add(this.getStateClass());
    }

    scheduleTagOverflowSync() {
        cancelAnimationFrame(this.tagOverflowFrame);
        this.tagOverflowFrame = requestAnimationFrame(() => this.syncTagOverflow());
    }

    syncTagOverflow() {
        if (!this.stateRoot) return;
        const isHorizontal = this.stateRoot.classList.contains('store-all-card--desktop-horizontal')
            || this.stateRoot.classList.contains('store-all-card--mobile-horizontal');

        this.stateRoot.querySelectorAll('.store-all-card').forEach(card => {
            const tagList = card.querySelector(':scope > nav');
            if (!tagList) return;

            tagList.removeAttribute('data-overflow');
            if (!isHorizontal) return;

            tagList.toggleAttribute('data-overflow', tagList.scrollWidth > tagList.clientWidth + 1);
        });
    }
}
