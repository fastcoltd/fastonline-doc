class CompaignAllLayout {
    constructor(stateRoot = document.getElementById('items-grid'), layoutSwitchRoot = document) {
        this.currentLayout = 'vertical';
        this.layoutSwitchRoot = layoutSwitchRoot;
        this.mobileMedia = window.matchMedia('(max-width: 768px)');
        this.stateClasses = [
            'compaign-all-card--desktop-vertical',
            'compaign-all-card--desktop-horizontal',
            'compaign-all-card--mobile-vertical',
            'compaign-all-card--mobile-horizontal'
        ];
        this.stateRoot = stateRoot;
        this.cardPrototype = this.stateRoot
            ?.querySelector('.compaign-all-card')
            ?.cloneNode(true) || null;
        this.init();
    }

    init() {
        this.bindEvents();
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
        this.getLayoutButtons().forEach(button => {
            button.classList.toggle('active', button.dataset.layout === this.currentLayout);
        });
        this.syncState();
    }

    syncState() {
        if (!this.stateRoot) return;
        this.stateRoot.classList.remove(...this.stateClasses);
        this.stateRoot.classList.add(this.getStateClass());
    }

    createCard() {
        if (!this.cardPrototype) return null;
        return this.cardPrototype.cloneNode(true);
    }
}
