(function () {
    const DESKTOP_STATE_SELECTOR = [
        '.item-all-card--desktop-vertical',
        '.item-all-card--desktop-horizontal'
    ].join(', ');
    const NAV_SELECTOR = '.item-all-card > section > nav';
    const HIDDEN_CLASS = 'item-all-tag-overflow-hidden';

    class ItemAllTagOverflow {
        constructor(root = document) {
            this.root = root;
            this.frameId = null;
            this.resizeObserver = typeof ResizeObserver === 'function'
                ? new ResizeObserver(() => this.schedule())
                : null;
            this.mutationObserver = new MutationObserver(mutations => {
                if (mutations.some(mutation => mutation.addedNodes.length || mutation.removedNodes.length)) {
                    this.observeNavs();
                    this.schedule();
                }
            });
            this.init();
        }

        init() {
            this.observeNavs();
            this.mutationObserver.observe(this.root.body || this.root, {
                childList: true,
                subtree: true
            });
            window.addEventListener('resize', () => this.schedule());
            this.root.addEventListener('click', event => {
                if (event.target.closest('.layout-switch')) {
                    this.schedule();
                }
            });
            if (document.fonts && document.fonts.ready) {
                document.fonts.ready.then(() => this.schedule());
            }
            this.schedule();
        }

        observeNavs() {
            if (!this.resizeObserver) return;
            this.root.querySelectorAll(NAV_SELECTOR).forEach(nav => {
                if (nav.dataset.tagOverflowObserved === 'true') return;
                nav.dataset.tagOverflowObserved = 'true';
                this.resizeObserver.observe(nav);
            });
        }

        schedule() {
            if (this.frameId !== null) {
                cancelAnimationFrame(this.frameId);
            }
            this.frameId = requestAnimationFrame(() => {
                this.frameId = null;
                this.refresh();
            });
        }

        refresh() {
            this.root.querySelectorAll(NAV_SELECTOR).forEach(nav => this.updateNav(nav));
        }

        updateNav(nav) {
            const tags = Array.from(nav.children).filter(child => child.matches('a'));
            let more = Array.from(nav.children).find(child => child.matches('[data-role="more"]'));

            tags.forEach(tag => tag.classList.remove(HIDDEN_CLASS));

            if (!nav.closest(DESKTOP_STATE_SELECTOR)) {
                if (more) more.hidden = true;
                return;
            }

            if (!more) {
                more = document.createElement('span');
                more.dataset.role = 'more';
                more.hidden = true;
                nav.appendChild(more);
            }

            let hiddenCount = 0;
            more.hidden = true;

            if (this.getRowCount(tags) <= 2) {
                return;
            }

            more.hidden = false;
            more.textContent = '+0';

            while (this.getRowCount([...tags.filter(tag => !tag.classList.contains(HIDDEN_CLASS)), more]) > 2) {
                const lastVisibleTag = tags.slice().reverse()
                    .find(tag => !tag.classList.contains(HIDDEN_CLASS));
                if (!lastVisibleTag) break;
                lastVisibleTag.classList.add(HIDDEN_CLASS);
                hiddenCount += 1;
                more.textContent = `+${hiddenCount}`;
            }
        }

        getRowCount(elements) {
            const rowTops = [];
            elements.forEach(element => {
                if (element.hidden || element.classList.contains(HIDDEN_CLASS)) return;
                const top = element.offsetTop;
                if (!rowTops.some(rowTop => Math.abs(rowTop - top) < 2)) {
                    rowTops.push(top);
                }
            });
            return rowTops.length;
        }
    }

    function initItemAllTagOverflow() {
        if (!document.querySelector('.item-all-card')) return;
        window.itemAllTagOverflow = new ItemAllTagOverflow();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initItemAllTagOverflow);
    } else {
        initItemAllTagOverflow();
    }
})();
