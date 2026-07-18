class DemandAllLayout {
    constructor() {
        this.currentLayout = 'vertical';
        this.mobileMedia = window.matchMedia('(max-width: 768px)');
        this.stateClasses = [
            'demand-all-card--desktop-vertical',
            'demand-all-card--desktop-horizontal',
            'demand-all-card--mobile-vertical',
            'demand-all-card--mobile-horizontal'
        ];
        this.itemsGrid = document.getElementById('items-grid');
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
        if (!this.itemsGrid) return;

        this.itemsObserver = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                mutation.addedNodes.forEach(node => {
                    if (!(node instanceof Element)) return;
                    if (node.matches('.demand-all-card')) this.syncCard(node);
                    node.querySelectorAll('.demand-all-card').forEach(card => this.syncCard(card));
                });
            });
        });
        this.itemsObserver.observe(this.itemsGrid, { childList: true });
    }

    switchLayout(layout) {
        if (layout !== 'vertical' && layout !== 'horizontal') return;
        this.currentLayout = layout;
        this.syncLayout();
    }

    getStateClass() {
        const device = this.mobileMedia.matches ? 'mobile' : 'desktop';
        return `demand-all-card--${device}-${this.currentLayout}`;
    }

    syncLayout() {
        document.querySelectorAll('.layout-switch').forEach(button => {
            button.classList.toggle('active', button.dataset.layout === this.currentLayout);
        });
        this.syncCards();
    }

    syncCards() {
        if (!this.itemsGrid) return;
        this.itemsGrid.querySelectorAll(':scope > .demand-all-card').forEach(card => this.syncCard(card));
    }

    syncCard(card) {
        card.classList.remove(...this.stateClasses);
        card.classList.add(this.getStateClass());
    }
}
