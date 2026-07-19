class PostAllLayout {
    constructor(stateRoot = document.getElementById('items-grid')) {
        this.mobileMedia = window.matchMedia('(max-width: 768px)');
        this.stateClasses = [
            'post-all-card--desktop',
            'post-all-card--mobile'
        ];
        this.stateRoot = stateRoot;
        this.init();
    }

    init() {
        this.bindViewportChange();
        this.syncState();
    }

    bindViewportChange() {
        const handleViewportChange = () => this.syncState();
        if (typeof this.mobileMedia.addEventListener === 'function') {
            this.mobileMedia.addEventListener('change', handleViewportChange);
        } else {
            this.mobileMedia.addListener(handleViewportChange);
        }
    }

    getStateClass() {
        return this.mobileMedia.matches
            ? 'post-all-card--mobile'
            : 'post-all-card--desktop';
    }

    syncState() {
        if (!this.stateRoot) return;
        this.stateRoot.classList.remove(...this.stateClasses);
        this.stateRoot.classList.add(this.getStateClass());
    }
}
