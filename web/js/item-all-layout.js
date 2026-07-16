class PageLayout {
    constructor() {
        this.currentLayout = 'vertical';
        this.mobileMedia = window.matchMedia('(max-width: 768px)');
        this.stateClasses = [
            'item-all-card--desktop-vertical',
            'item-all-card--desktop-horizontal',
            'item-all-card--mobile-vertical',
            'item-all-card--mobile-horizontal'
        ];
        this.init();
    }

    init() {
        this.bindEvents();
        this.observeItems();
        this.syncLayout();
    }

    bindEvents() {
        document.querySelectorAll('.layout-switch').forEach(button => {
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
    }

    observeItems() {
        const itemsGrid = document.getElementById('items-grid');
        if (!itemsGrid) return;

        this.itemsObserver = new MutationObserver(mutations => {
            const hasNewItems = mutations.some(mutation => mutation.addedNodes.length > 0);
            if (hasNewItems) this.syncCards();
        });
        this.itemsObserver.observe(itemsGrid, { childList: true });
    }

    switchLayout(layout) {
        if (layout !== 'vertical' && layout !== 'horizontal') return;
        this.currentLayout = layout;
        this.syncLayout();
    }

    getStateClass() {
        const device = this.mobileMedia.matches ? 'mobile' : 'desktop';
        return `item-all-card--${device}-${this.currentLayout}`;
    }

    syncLayout() {
        document.querySelectorAll('.layout-switch').forEach(button => {
            button.classList.toggle('active', button.dataset.layout === this.currentLayout);
        });
        this.syncCards();
    }

    syncCards() {
        const stateClass = this.getStateClass();
        document.querySelectorAll('.item-all-card').forEach(card => {
            card.classList.remove(...this.stateClasses);
            card.classList.add(stateClass);
        });
    }
}
