class PageLayout {
    constructor(stateRoot = document.getElementById('items-grid'), layoutSwitchRoot = document) {
        this.currentLayout = 'vertical';
        this.stateRoot = stateRoot || document.getElementById('items-grid');
        this.layoutSwitchRoot = layoutSwitchRoot;
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
        return `item-all-card--${device}-${this.currentLayout}`;
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
}
