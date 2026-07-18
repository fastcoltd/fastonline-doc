class PostAllLayout {
    constructor() {
        this.mobileMedia = window.matchMedia('(max-width: 768px)');
        this.stateClasses = [
            'post-all-card--desktop',
            'post-all-card--mobile'
        ];
        this.itemsGrid = document.getElementById('items-grid');
        this.init();
    }

    init() {
        this.bindViewportChange();
        this.observeItems();
        this.syncCards();
    }

    bindViewportChange() {
        const handleViewportChange = () => this.syncCards();
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
                    if (node.matches('.post-all-card')) this.syncCard(node);
                    node.querySelectorAll('.post-all-card').forEach(card => this.syncCard(card));
                });
            });
        });
        this.itemsObserver.observe(this.itemsGrid, { childList: true });
    }

    getStateClass() {
        return this.mobileMedia.matches
            ? 'post-all-card--mobile'
            : 'post-all-card--desktop';
    }

    syncCards() {
        if (!this.itemsGrid) return;
        this.itemsGrid.querySelectorAll(':scope > .post-all-card').forEach(card => this.syncCard(card));
    }

    syncCard(card) {
        card.classList.remove(...this.stateClasses);
        card.classList.add(this.getStateClass());
    }
}
