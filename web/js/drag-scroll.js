/* Mouse drag with momentum for native horizontal scroll areas. Touch keeps native scrolling. */
(function () {
    'use strict';

    var BREAKPOINT = 768;
    var DRAG_THRESHOLD = 4;

    function maxScroll(track) {
        return Math.max(0, track.scrollWidth - track.clientWidth);
    }

    function setup(track) {
        if (!track || track.nodeType !== 1 || track.dataset.dragScrollReady === '1' ||
                track === document.body || track === document.documentElement) {
            return;
        }
        var overflow = getComputedStyle(track).overflowX;
        if (overflow !== 'auto' && overflow !== 'scroll') {
            return;
        }
        track.dataset.dragScrollReady = '1';

        var pointerId = null;
        var startX = 0;
        var startScroll = 0;
        var lastScroll = 0;
        var lastTime = 0;
        var velocity = 0;
        var moved = false;
        var suppressClickUntil = 0;
        var momentumFrame = 0;
        var previousBehavior = '';
        var previousSnap = '';

        function updateCursor() {
            track.classList.toggle('drag-scrollable', window.innerWidth > BREAKPOINT && maxScroll(track) > 2);
        }

        function restoreScrollStyle() {
            track.style.scrollBehavior = previousBehavior;
            track.style.scrollSnapType = previousSnap;
        }

        function stopMomentum() {
            if (momentumFrame) {
                cancelAnimationFrame(momentumFrame);
                momentumFrame = 0;
                restoreScrollStyle();
            }
        }

        function startMomentum() {
            if (Math.abs(velocity) < 0.03 || matchMedia('(prefers-reduced-motion: reduce)').matches) {
                restoreScrollStyle();
                return;
            }
            velocity = Math.max(-3.5, Math.min(3.5, velocity));
            var frameTime = performance.now();
            function step(now) {
                var dt = Math.min(now - frameTime, 32);
                frameTime = now;
                velocity *= Math.pow(0.90, dt / 16);
                var before = track.scrollLeft;
                track.scrollLeft = Math.max(0, Math.min(maxScroll(track), before + velocity * dt));
                if (Math.abs(velocity) < 0.025 || Math.abs(track.scrollLeft - before) < 0.2) {
                    momentumFrame = 0;
                    restoreScrollStyle();
                    return;
                }
                momentumFrame = requestAnimationFrame(step);
            }
            momentumFrame = requestAnimationFrame(step);
        }

        function onMove(event) {
            if (event.pointerId !== pointerId) {
                return;
            }
            var dx = event.clientX - startX;
            if (!moved && Math.abs(dx) <= DRAG_THRESHOLD) {
                return;
            }
            if (!moved) {
                moved = true;
                previousBehavior = track.style.scrollBehavior;
                previousSnap = track.style.scrollSnapType;
                track.style.scrollBehavior = 'auto';
                track.style.scrollSnapType = 'none';
                track.classList.add('drag-scroll-dragging');
            }
            event.preventDefault();
            var now = performance.now();
            track.scrollLeft = Math.max(0, Math.min(maxScroll(track), startScroll - dx));
            var dt = Math.max(1, now - lastTime);
            var instantVelocity = (track.scrollLeft - lastScroll) / dt;
            velocity = velocity * 0.35 + instantVelocity * 0.65;
            lastScroll = track.scrollLeft;
            lastTime = now;
        }

        function onEnd(event) {
            if (event.pointerId !== pointerId) {
                return;
            }
            pointerId = null;
            window.removeEventListener('pointermove', onMove);
            window.removeEventListener('pointerup', onEnd);
            window.removeEventListener('pointercancel', onEnd);
            track.classList.remove('drag-scroll-dragging');
            if (moved) {
                suppressClickUntil = Date.now() + 450;
                if (performance.now() - lastTime > 80 || event.type === 'pointercancel') {
                    velocity = 0;
                }
                startMomentum();
            }
            updateCursor();
        }

        track.addEventListener('pointerdown', function (event) {
            if (event.pointerType !== 'mouse' || event.button !== 0 || window.innerWidth <= BREAKPOINT ||
                    maxScroll(track) <= 2 || event.target.closest('button, input, textarea, select, [contenteditable="true"]')) {
                return;
            }
            stopMomentum();
            pointerId = event.pointerId;
            startX = event.clientX;
            startScroll = track.scrollLeft;
            lastScroll = startScroll;
            lastTime = performance.now();
            velocity = 0;
            moved = false;
            window.addEventListener('pointermove', onMove, { passive: false });
            window.addEventListener('pointerup', onEnd);
            window.addEventListener('pointercancel', onEnd);
        });
        track.addEventListener('click', function (event) {
            if (Date.now() < suppressClickUntil) {
                event.preventDefault();
                event.stopImmediatePropagation();
            }
        }, true);
        track.addEventListener('dragstart', function (event) {
            if (window.innerWidth > BREAKPOINT && maxScroll(track) > 2) {
                event.preventDefault();
            }
        });
        track.addEventListener('pointerenter', updateCursor);
        window.addEventListener('resize', updateCursor);
        updateCursor();
    }

    function init(root) {
        root = root || document;
        if (root.nodeType === 1) {
            setup(root);
        }
        root.querySelectorAll('*').forEach(setup);
    }

    window.DragScroll = { init: init };
    function start() {
        init(document);
        if (window.MutationObserver) {
            new MutationObserver(function (records) {
                records.forEach(function (record) {
                    record.addedNodes.forEach(function (node) {
                        if (node.nodeType === 1) {
                            init(node);
                        }
                    });
                });
            }).observe(document.body, { childList: true, subtree: true });
        }
    }
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', start);
    } else {
        start();
    }
})();
