/*
 * 详情页头部「一行描述 + Show More / Show Less」通用展开收起（品牌详情 / 标签详情 / 属性详情共用）。
 * 样式在 css/second-page.css。
 *
 * DOM 约定（两种都认）：
 *   1) 通用：容器 [data-desc-toggle] > 文本 [data-desc-toggle-text] + 按钮 [data-desc-toggle-btn]
 *   2) 品牌那套历史写法：.page-header-desc-right-detail-box > [data-brand-detail-role="text"] +
 *      [data-brand-detail-role="toggle"]
 *
 * 这个脚本只在容器上切两个 class，收起 / 展开、按钮怎么放全交给 CSS：
 *   - .desc-has-toggle ：正文真的放不下一行、需要显示按钮（放得下就不加，按钮 CSS 里默认 display:none）
 *   - .desc-expanded   ：当前是展开态（容器回 block，正文 white-space:normal 铺满多行，按钮 inline 跟末尾）
 * 收起态是 flex 一行：正文可收缩 + 省略号，按钮紧跟省略号后面（不是贴到最右边）。
 *
 * 量「是否放得下一行」时先临时去掉 .desc-has-toggle（按钮 display:none、正文占满整行），只看正文本身。
 * 除了 load / resize / fonts.ready，还挂了 ResizeObserver 盯父容器宽度变化（视口旋转、字号 rem 缩放、
 * 布局迟到），用宽度值去抖，避免 class 切换自触发死循环 —— 移动端「首次没量准所以按钮不出现」就是这里补的。
 */
(function () {
    function wire(box, text, btn) {
        if (!text || !btn || box.dataset.descToggleWired === '1') {
            return;
        }
        box.dataset.descToggleWired = '1';

        var moreText = btn.getAttribute('data-more') || btn.textContent.trim() || 'Show More';
        var lessText = btn.getAttribute('data-less') || 'Show Less';

        var sync = function () {
            var expanded = box.classList.contains('desc-expanded');
            // 收起 + 去掉按钮，正文占满整行，只看正文本身一行放不放得下
            box.classList.remove('desc-expanded');
            box.classList.remove('desc-has-toggle');
            var overflowing = text.scrollWidth > text.clientWidth + 1;
            box.classList.toggle('desc-has-toggle', overflowing);
            if (!overflowing) {
                btn.textContent = moreText;
                return;
            }
            if (expanded) {
                box.classList.add('desc-expanded');
                btn.textContent = lessText;
            } else {
                btn.textContent = moreText;
            }
        };

        btn.textContent = moreText;
        btn.addEventListener('click', function () {
            if (box.classList.toggle('desc-expanded')) {
                btn.textContent = lessText;
            } else {
                btn.textContent = moreText;
            }
        });

        sync();
        window.addEventListener('resize', sync);
        window.addEventListener('load', sync);
        if (document.fonts && document.fonts.ready) {
            document.fonts.ready.then(sync);
        }

        var host = box.parentElement;
        if (window.ResizeObserver && host) {
            var lastW = -1;
            var ro = new ResizeObserver(function (entries) {
                var w = Math.round(entries[0].contentRect.width);
                if (w === lastW) {
                    return;
                }
                lastW = w;
                sync();
            });
            ro.observe(host);
        }
    }

    function init() {
        document.querySelectorAll('[data-desc-toggle]').forEach(function (box) {
            wire(box,
                box.querySelector('[data-desc-toggle-text]'),
                box.querySelector('[data-desc-toggle-btn]'));
        });
        document.querySelectorAll('.page-header-desc-right-detail-box').forEach(function (box) {
            wire(box,
                box.querySelector('[data-brand-detail-role="text"]'),
                box.querySelector('[data-brand-detail-role="toggle"]'));
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
