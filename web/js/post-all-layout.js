class PostAllLayout {
    constructor(stateRoot = document.getElementById('items-grid')) {
        this.mobileMedia = window.matchMedia('(max-width: 768px)');
        this.stateClasses = [
            'post-all-card--desktop',
            'post-all-card--mobile'
        ];
        this.stateRoot = stateRoot;
        this.observedTagLists = new WeakSet();
        this.tagResizeObserver = typeof ResizeObserver === 'function'
            ? new ResizeObserver(() => this.scheduleTagOverflowSync())
            : null;
        this.init();
    }

    init() {
        this.bindViewportChange();
        this.observeItems();
        this.syncState();
    }

    bindViewportChange() {
        const handleViewportChange = () => this.syncState();
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

        this.stateRoot.querySelectorAll('.post-all-card > section > nav').forEach(tagList => {
            if (this.observedTagLists.has(tagList)) return;
            this.observedTagLists.add(tagList);
            this.tagResizeObserver.observe(tagList);
        });
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
        this.scheduleTagOverflowSync();
    }

    scheduleTagOverflowSync() {
        cancelAnimationFrame(this.tagOverflowFrame);
        this.tagOverflowFrame = requestAnimationFrame(() => this.syncTagOverflow());
    }

    syncTagOverflow() {
        if (!this.stateRoot) return;

        this.stateRoot.querySelectorAll('.post-all-card').forEach(card => {
            const tagList = card.querySelector(':scope > section > nav');
            if (!tagList) return;

            this.clearTagOverflow(tagList);
            this.fitTagOverflow(tagList);
        });
    }

    clearTagOverflow(tagList) {
        const more = tagList.querySelector(':scope > [data-role="more"]');
        if (more) more.hidden = true;
        tagList.querySelectorAll(':scope > a').forEach(tag => {
            tag.classList.remove('post-all-tag-overflow-hidden');
        });
    }

    fitTagOverflow(tagList) {
        const label = tagList.querySelector(':scope > [data-role="label"]');
        const tags = Array.from(tagList.querySelectorAll(':scope > a'));
        if (tags.length === 0) return;

        let more = tagList.querySelector(':scope > [data-role="more"]');
        if (!more) {
            more = document.createElement('span');
            more.dataset.role = 'more';
            more.hidden = true;
            tagList.appendChild(more);
        }

        const rowElements = label ? [label, ...tags] : tags;
        if (this.getTagRowCount(rowElements) <= 2) return;

        let hiddenCount = 0;
        more.hidden = false;
        more.textContent = '+0';

        while (this.getTagRowCount([
            ...(label ? [label] : []),
            ...tags.filter(tag => !tag.classList.contains('post-all-tag-overflow-hidden')),
            more
        ]) > 2) {
            const lastVisibleTag = tags.slice().reverse()
                .find(tag => !tag.classList.contains('post-all-tag-overflow-hidden'));
            if (!lastVisibleTag) break;
            lastVisibleTag.classList.add('post-all-tag-overflow-hidden');
            hiddenCount += 1;
            more.textContent = `+${hiddenCount}`;
        }
    }

    getTagRowCount(elements) {
        const rowCenters = [];
        elements.forEach(element => {
            if (element.hidden || element.classList.contains('post-all-tag-overflow-hidden')) return;
            const center = element.offsetTop + element.offsetHeight / 2;
            if (!rowCenters.some(rowCenter => Math.abs(rowCenter - center) < 3)) {
                rowCenters.push(center);
            }
        });
        return rowCenters.length;
    }
}
