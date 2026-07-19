class StoreAllLayout {
    constructor(itemsRoot = document, layoutSwitchRoot = document) {
        this.currentLayout = 'vertical';
        this.itemsRoot = itemsRoot || document;
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
        const itemsGrid = this.itemsRoot === document
            ? document.getElementById('items-grid')
            : this.itemsRoot;
        if (!itemsGrid) return;

        this.itemsObserver = new MutationObserver(mutations => {
            const hasNewItems = mutations.some(mutation => mutation.addedNodes.length > 0);
            if (hasNewItems) this.syncCards();
        });
        this.itemsObserver.observe(itemsGrid, { childList: true, subtree: true });
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
        this.syncCards();
    }

    syncCards() {
        const stateClass = this.getStateClass();
        this.itemsRoot.querySelectorAll('.store-all-card').forEach(card => {
            card.classList.remove(...this.stateClasses);
            card.classList.add(stateClass);
        });
        this.scheduleTagOverflowSync();
    }

    scheduleTagOverflowSync() {
        cancelAnimationFrame(this.tagOverflowFrame);
        this.tagOverflowFrame = requestAnimationFrame(() => this.syncTagOverflow());
    }

    syncTagOverflow() {
        this.itemsRoot.querySelectorAll('.store-all-card').forEach(card => {
            const tagList = card.querySelector(':scope > nav');
            if (!tagList) return;

            tagList.removeAttribute('data-overflow');
            const isHorizontal = card.classList.contains('store-all-card--desktop-horizontal')
                || card.classList.contains('store-all-card--mobile-horizontal');
            if (!isHorizontal) return;

            tagList.toggleAttribute('data-overflow', tagList.scrollWidth > tagList.clientWidth + 1);
        });
    }
}
