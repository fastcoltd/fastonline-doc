class CompaignAllLayout {
    constructor() {
        this.currentLayout = 'vertical';
        this.mobileMedia = window.matchMedia('(max-width: 768px)');
        this.stateClasses = [
            'compaign-all-card--desktop-vertical',
            'compaign-all-card--desktop-horizontal',
            'compaign-all-card--mobile-vertical',
            'compaign-all-card--mobile-horizontal'
        ];
        this.itemsGrid = document.getElementById('items-grid');
        this.cardPrototype = this.itemsGrid
            ?.querySelector(':scope > .compaign-all-card')
            ?.cloneNode(true) || null;
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
                    if (node.matches('.compaign-all-card')) this.syncCard(node);
                    node.querySelectorAll('.compaign-all-card').forEach(card => this.syncCard(card));
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
        return `compaign-all-card--${device}-${this.currentLayout}`;
    }

    syncLayout() {
        document.querySelectorAll('.layout-switch').forEach(button => {
            button.classList.toggle('active', button.dataset.layout === this.currentLayout);
        });
        this.syncCards();
    }

    syncCards() {
        if (!this.itemsGrid) return;
        this.itemsGrid.querySelectorAll(':scope > .compaign-all-card').forEach(card => this.syncCard(card));
    }

    syncCard(card) {
        card.classList.remove(...this.stateClasses);
        card.classList.add(this.getStateClass());
    }

    createCard() {
        if (!this.cardPrototype) return null;
        const card = this.cardPrototype.cloneNode(true);
        this.syncCard(card);
        return card;
    }
}
