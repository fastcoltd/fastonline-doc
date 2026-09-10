/**
 * 标签/属性行超出限定行数就折叠成 "+N"（点最后一个可见标签之后追加一个不可点击的 [data-role="more"]
 * 提示，被折叠的标签本身打上 HIDDEN_CLASS 罢工，不删除 DOM，尺寸变化时能随时复原）。
 *
 * 原本只服务商品卡片（文件名由来），首页 Comments 区块的品牌/服务标签行也要求"跟商品卡片一样只显示一行，
 * 多出显示 +N"（评论卡片不需要区分 PC/Mobile 状态，任何视口都按同一行数上限收），所以这里把原来写死的
 * 单一容器/行数改成一份 TARGETS 配置表，谁需要这种行为，往这个数组里加一条就行，不用再复制一份 JS。
 */
(function () {
    const HIDDEN_CLASS = 'item-all-tag-overflow-hidden';
    // 末行被「夹住只露一小截 + 省略号」的那个标签（clampLast 模式，目前只有品牌索引卡片用）。
    const CLAMP_CLASS = 'item-all-tag-overflow-clamp';

    const TARGETS = [
        {
            // 商品卡片：nav 里平铺 tag + attr 链接，PC/Mobile 状态一致地限制最多 2 行；只有 desktop 竖/横两个
            // 状态类下才折叠，其它（mobile）状态直接显示全部、不出现 "+N"（沿用原有行为）。
            navSelector: '.item-all-card > section > nav',
            maxRows: 2,
            desktopStateSelector: [
                '.item-all-card--desktop-vertical',
                '.item-all-card--desktop-horizontal'
            ].join(', ')
        },
        {
            // 首页 Comments 卡片：评论所属店铺的品牌 + 服务标签合并显示在同一行，超出的收进 "+N"，
            // 不区分视口状态（没有 mobile/desktop 两套展示差异，任何宽度都只显示一行）。
            navSelector: '.comments-pager .figma-comment-item > .post-item-kind-box',
            maxRows: 1,
            desktopStateSelector: null
        },
        {
            // 品牌索引页（/brands）单个品牌卡片下面的服务标签行，最多 2 行，不区分视口状态；
            // 折叠时末行最后一个服务留一小截 + 省略号（clampLast），"+N" 提示始终有预留空间。
            navSelector: '.brand-item > .brand-item-middle-box',
            maxRows: 2,
            desktopStateSelector: null,
            clampLast: true
        }
    ];

    // 我们自己往 nav 里塞 / 改的东西：末尾的 "+N" 提示（span[data-role="more"]），以及它内部的文本节点。
    // MutationObserver 不能把这些当"页面变了"再触发一轮 refresh——否则 refresh 改 more.textContent →
    // childList 变动 → 又 refresh → 死循环（用户反馈"服务 class 疯狂刷 DOM"）。
    function isSelfMutation(node) {
        if (!node) return true;
        if (node.nodeType === Node.TEXT_NODE) {
            return isSelfMutation(node.parentNode);
        }
        if (node.nodeType !== Node.ELEMENT_NODE) return true;
        return node.matches && node.matches('[data-role="more"]');
    }

    class TagOverflow {
        constructor(root = document) {
            this.root = root;
            this.frameId = null;
            this.applying = false;
            this.resizeObserver = typeof ResizeObserver === 'function'
                ? new ResizeObserver(() => { if (!this.applying) this.schedule(); })
                : null;
            this.mutationObserver = new MutationObserver(mutations => {
                if (this.applying) return;
                var real = mutations.some(function (mutation) {
                    if (!mutation.addedNodes.length && !mutation.removedNodes.length) return false;
                    var nodes = [].concat([].slice.call(mutation.addedNodes), [].slice.call(mutation.removedNodes));
                    return nodes.some(function (n) { return !isSelfMutation(n); });
                });
                if (real) {
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

        eachNav(callback) {
            TARGETS.forEach(target => {
                this.root.querySelectorAll(target.navSelector).forEach(nav => callback(nav, target));
            });
        }

        observeNavs() {
            if (!this.resizeObserver) return;
            this.eachNav(nav => {
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
            // 改 nav 之前先断开 MutationObserver，改完把这期间自己造成的变动记录丢掉（takeRecords）
            // 再重新观察——否则「改 more.textContent → childList 变动 → 回调 → 再 refresh」会死循环。
            this.applying = true;
            this.mutationObserver.disconnect();
            try {
                this.eachNav((nav, target) => this.updateNav(nav, target));
            } finally {
                this.mutationObserver.takeRecords();
                this.mutationObserver.observe(this.root.body || this.root, {
                    childList: true,
                    subtree: true
                });
                this.applying = false;
            }
        }

        updateNav(nav, target) {
            const tags = Array.from(nav.children).filter(child => child.matches('a'));
            let more = Array.from(nav.children).find(child => child.matches('[data-role="more"]'));

            tags.forEach(tag => {
                tag.classList.remove(HIDDEN_CLASS);
                tag.classList.remove(CLAMP_CLASS);
                tag.style.maxWidth = '';
            });

            if (target.desktopStateSelector && !nav.closest(target.desktopStateSelector)) {
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

            if (this.getRowCount(tags) <= target.maxRows) {
                return;
            }

            more.hidden = false;
            more.textContent = '+0';

            while (this.getRowCount([...tags.filter(tag => !tag.classList.contains(HIDDEN_CLASS)), more]) > target.maxRows) {
                const lastVisibleTag = tags.slice().reverse()
                    .find(tag => !tag.classList.contains(HIDDEN_CLASS));
                if (!lastVisibleTag) break;
                lastVisibleTag.classList.add(HIDDEN_CLASS);
                hiddenCount += 1;
                more.textContent = `+${hiddenCount}`;
            }

            // clampLast：把刚被完全折叠掉的那个标签放回来，夹在末行「最后可见标签」和 "+N" 之间的剩余
            // 宽度里，用省略号显示一小截（用户要求「最后一个服务显示小部分…，预留给 +n 空间」），"+N" -1。
            // 剩余空间不够（放回来会破行）就不放。
            if (target.clampLast && hiddenCount > 0) {
                const visible = tags.filter(tag => !tag.classList.contains(HIDDEN_CLASS));
                const lastVisible = visible[visible.length - 1];
                const clampTag = tags[tags.length - hiddenCount];
                if (clampTag && lastVisible) {
                    const navRect = nav.getBoundingClientRect();
                    const lastRect = lastVisible.getBoundingClientRect();
                    const csNav = getComputedStyle(nav);
                    const gap = parseFloat(csNav.columnGap || csNav.gap || '0') || 0;
                    const padRight = parseFloat(csNav.paddingRight) || 0;
                    const moreW = more.hidden ? 0 : more.getBoundingClientRect().width;
                    const room = (navRect.right - padRight) - lastRect.right - gap - moreW - gap;
                    if (room >= 48) {
                        clampTag.classList.remove(HIDDEN_CLASS);
                        clampTag.classList.add(CLAMP_CLASS);
                        clampTag.style.maxWidth = Math.floor(room) + 'px';
                        if (this.getRowCount([...tags.filter(tag => !tag.classList.contains(HIDDEN_CLASS)), more]) > target.maxRows) {
                            clampTag.classList.remove(CLAMP_CLASS);
                            clampTag.style.maxWidth = '';
                            clampTag.classList.add(HIDDEN_CLASS);
                        } else {
                            hiddenCount -= 1;
                            if (hiddenCount === 0) {
                                more.hidden = true;
                            } else {
                                more.textContent = `+${hiddenCount}`;
                            }
                        }
                    }
                }
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

    function initTagOverflow() {
        const hasTarget = TARGETS.some(target => document.querySelector(target.navSelector));
        if (!hasTarget) return;
        window.itemAllTagOverflow = new TagOverflow();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTagOverflow);
    } else {
        initTagOverflow();
    }
})();
