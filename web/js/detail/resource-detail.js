/*
 * 系统文章详情页（pages/resource-detail.html）交互：
 *  1) 右侧目录（TOC）——CMS 正文（pages_lang.content）是一整块富文本，没有预分段，这里在前端按正文里的
 *     标题（h1~h4）现场生成目录：给每个标题补 id，往 .table-of-contents 里塞 .toc-item，点了平滑滚动
 *     过去（扣掉 sticky 头高度）。滚动时高亮当前所在标题。正文没有标题时，目录里仍固定保留一条指向
 *     底部「Other Pages」区块的入口（跟 static-source 原稿目录一致——原稿目录末尾就固定有 "Other page"
 *     这一条），只有连「Other Pages」都没有时才整个收起目录、正文收回整宽。
 *  2) 移动端目录抽屉：.detail-page-menu 按钮开合 .table-of-container（is-open）。
 *  3) 分享：复制当前页链接 / 跳社交分享。
 *  4) 底部「Other Pages」相关推荐轮播：多于一屏（4 张）时用 js/carousel.js 自动横向滚动。
 *
 * static-source 原稿 js/detail/resource-detail.js 假设正文已经是 <section id="section-N"> 结构 + 用
 * LinkRef 驱动，跟真实 CMS 正文对不上，这里重写成「按正文标题现算目录」。
 */
(function () {
    document.addEventListener('DOMContentLoaded', function () {
        var article = document.querySelector('.article-content');
        var tocPanel = document.querySelector('.table-of-container');
        var tocList = tocPanel ? tocPanel.querySelector('.table-of-contents') : null;
        var stickyHeader = document.querySelector('.page-top-sticky');
        var otherSection = document.getElementById('otherpage');
        var headerOffset = function () {
            return (stickyHeader ? stickyHeader.offsetHeight : 0) + 16;
        };

        // ---- 1) 生成目录 ----
        // 目录项 = 正文标题(h1~h4) + 末尾固定一条「Other Pages」（如果页面上有那个区块）。
        // spyTargets 跟 tocItems 一一对应，用来做滚动高亮。
        var headings = article ? Array.prototype.slice.call(article.querySelectorAll('h1, h2, h3, h4')) : [];
        var entries = [];
        headings.forEach(function (h, i) {
            if (!h.id) {
                h.id = 'section-' + i;
            }
            entries.push({ el: h, id: h.id, text: (h.textContent || '').trim() });
        });
        if (otherSection) {
            if (!otherSection.id) {
                otherSection.id = 'otherpage';
            }
            var otherLabel = otherSection.querySelector(':scope > span');
            entries.push({
                el: otherSection,
                id: 'otherpage',
                text: otherLabel ? (otherLabel.textContent || '').trim() : 'Other Pages'
            });
        }

        if (tocList && entries.length) {
            var tocItems = entries.map(function (e, i) {
                var item = document.createElement('div');
                item.className = 'toc-item' + (i === 0 ? ' active' : '');
                item.setAttribute('data-target', e.id);
                item.textContent = e.text;
                tocList.appendChild(item);
                return item;
            });

            tocList.addEventListener('click', function (e) {
                var item = e.target.closest('.toc-item');
                if (!item) {
                    return;
                }
                var target = document.getElementById(item.getAttribute('data-target'));
                if (!target) {
                    return;
                }
                var top = target.getBoundingClientRect().top + window.pageYOffset - headerOffset();
                window.scrollTo({ top: top, behavior: 'smooth' });
                if (tocPanel) {
                    tocPanel.classList.remove('is-open');
                }
            });

            var onScroll = function () {
                var y = window.pageYOffset + headerOffset() + 4;
                var currentIdx = 0;
                entries.forEach(function (entry, i) {
                    if (entry.el.getBoundingClientRect().top + window.pageYOffset <= y) {
                        currentIdx = i;
                    }
                });
                tocItems.forEach(function (it, i) {
                    it.classList.toggle('active', i === currentIdx);
                });
            };
            window.addEventListener('scroll', onScroll, { passive: true });
        } else if (tocPanel) {
            // 正文没标题、也没有「Other Pages」区块 → 没目录可导航：藏掉目录面板 + 移动端目录按钮。
            // 布局是 flex 两列（.resource-detail-body），面板 display:none 后 .article-content（flex:1）
            // 自动占满整宽，不用再手动改 margin / width。
            tocPanel.style.display = 'none';
            var menuBtn0 = document.querySelector('.detail-page-menu');
            if (menuBtn0) {
                menuBtn0.style.display = 'none';
            }
            if (article) {
                article.classList.add('article-content-full');
            }
        }

        // ---- 2) 移动端目录抽屉 ----
        var menuBtn = document.querySelector('.detail-page-menu');
        var closeBtn = tocPanel ? tocPanel.querySelector(':scope > img') : null;
        if (menuBtn && tocPanel) {
            menuBtn.addEventListener('click', function (e) {
                e.preventDefault();
                tocPanel.classList.toggle('is-open');
            });
        }
        if (closeBtn && tocPanel) {
            closeBtn.addEventListener('click', function () {
                tocPanel.classList.remove('is-open');
            });
        }

        // ---- 3) 分享 ----
        // 分享交互统一走全站的 js/share.js（[data-share] 事件委托 + ConfigKey.site_share 配的渠道），
        // 这里不再自己处理。

        // ---- 4) 「Other Pages」相关推荐轮播 ----
        // 结构（.carousel-track > 多个 .carousel-slide + .carousel-indicators）由模板按 view.partition
        // 切好，这里只在多于一屏时启动 js/carousel.js 的自动轮播。
        var pager = document.getElementById('best-items');
        if (pager && typeof window.Carousel === 'function') {
            var slideCount = pager.querySelectorAll('.carousel-track > .carousel-slide').length;
            if (slideCount > 1) {
                // carousel.js 只在 setup / resize 时量一次 carousel.offsetWidth 定位轨道，DOMContentLoaded
                // 时字体和 --container-width 布局可能还没稳，量偏了会导致首屏轨道错位（要等 20s 第一次自动
                // 翻页或窗口 resize 才纠正）。等 load 之后再启动，确保量到的是最终宽度。
                var startPager = function () {
                    try {
                        new window.Carousel('best-items', 20);
                    } catch (err) {
                        /* 轮播启动失败不影响页面其它部分 */
                    }
                };
                if (document.readyState === 'complete') {
                    startPager();
                } else {
                    window.addEventListener('load', startPager, { once: true });
                }
            }
        }
    });
})();
