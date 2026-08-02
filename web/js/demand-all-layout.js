class DemandAllLayout {
    constructor(stateRoot = document.getElementById('items-grid'), layoutSwitchRoot = document) {
        this.currentLayout = 'vertical';
        this.layoutSwitchRoot = layoutSwitchRoot;
        this.mobileMedia = window.matchMedia('(max-width: 768px)');
        this.stateClasses = [
            'demand-all-card--desktop-vertical',
            'demand-all-card--desktop-horizontal',
            'demand-all-card--mobile-vertical',
            'demand-all-card--mobile-horizontal'
        ];
        this.stateRoot = stateRoot;
        this.observedTagLists = new WeakSet();
        this.tagResizeObserver = typeof ResizeObserver === 'function'
            ? new ResizeObserver(() => this.scheduleTagOverflowSync())
            : null;
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
        if (document.fonts && document.fonts.ready) {
            document.fonts.ready.then(() => this.scheduleTagOverflowSync());
        }
    }

    observeItems() {
        if (!this.stateRoot) return;

        this.observeTagLists();
        this.itemsObserver = new MutationObserver(mutations => {
            const hasChangedItems = mutations.some(mutation =>
                mutation.addedNodes.length > 0 || mutation.removedNodes.length > 0
            );
            if (hasChangedItems) {
                this.observeTagLists();
                this.scheduleTagOverflowSync();
            }
        });
        this.itemsObserver.observe(this.stateRoot, { childList: true, subtree: true });
    }

    observeTagLists() {
        if (!this.tagResizeObserver || !this.stateRoot) return;

        this.stateRoot.querySelectorAll('.demand-all-card > nav').forEach(tagList => {
            if (this.observedTagLists.has(tagList)) return;
            this.observedTagLists.add(tagList);
            this.tagResizeObserver.observe(tagList);
        });
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

        this.stateRoot.querySelectorAll('.demand-all-card').forEach(card => {
            const tagList = card.querySelector(':scope > nav');
            if (!tagList) return;

            this.clearTagOverflow(tagList);
            this.fitTagOverflow(tagList);
        });
    }

    clearTagOverflow(tagList) {
        const more = tagList.querySelector(':scope > [data-role="more"]');
        if (more) more.hidden = true;
        tagList.querySelectorAll(':scope > a').forEach(tag => {
            tag.classList.remove('demand-all-tag-overflow-hidden');
        });
    }

    fitTagOverflow(tagList) {
        const tags = Array.from(tagList.querySelectorAll(':scope > a'));
        if (tags.length === 0) return;

        let more = tagList.querySelector(':scope > [data-role="more"]');
        if (!more) {
            more = document.createElement('span');
            more.dataset.role = 'more';
            more.hidden = true;
            tagList.appendChild(more);
        }

        if (this.getTagRowCount(tags) <= 2) return;

        let hiddenCount = 0;
        more.hidden = false;
        more.textContent = '+0';

        while (this.getTagRowCount([
            ...tags.filter(tag => !tag.classList.contains('demand-all-tag-overflow-hidden')),
            more
        ]) > 2) {
            const lastVisibleTag = tags.slice().reverse()
                .find(tag => !tag.classList.contains('demand-all-tag-overflow-hidden'));
            if (!lastVisibleTag) break;
            lastVisibleTag.classList.add('demand-all-tag-overflow-hidden');
            hiddenCount += 1;
            more.textContent = `+${hiddenCount}`;
        }
    }

    getTagRowCount(elements) {
        const rowTops = [];
        elements.forEach(element => {
            if (element.hidden || element.classList.contains('demand-all-tag-overflow-hidden')) return;
            const top = element.offsetTop;
            if (!rowTops.some(rowTop => Math.abs(rowTop - top) < 2)) {
                rowTops.push(top);
            }
        });
        return rowTops.length;
    }
}
