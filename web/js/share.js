/*
 * 全站分享。fragments/share.html 渲出 <img data-share="{type}">（渠道 / 图标由 ConfigKey.site_share
 * 配置决定），这里按 type 拼各平台的 share intent URL 新窗口打开，或复制当前页链接。
 *
 * 事件委托绑在 document 上，页面没有 [data-share] 元素就是零开销——可以全站无脑引。
 * 之前 js/detail/resource-detail.js 里自带一份分享逻辑、faq-detail.html 里是写死的 <a> 分享链接，
 * 都已经改成走这里。
 */
(function () {
    function currentUrl() {
        var canonical = document.querySelector('link[rel="canonical"]');
        return (canonical && canonical.href) || window.location.href;
    }

    function currentTitle() {
        var og = document.querySelector('meta[property="og:title"]');
        return (og && og.getAttribute('content')) || document.title || '';
    }

    function enc(s) {
        return encodeURIComponent(s == null ? '' : s);
    }

    function popup(url) {
        window.open(url, '_blank', 'noopener,noreferrer,width=600,height=540');
    }

    var HANDLERS = {
        x: function (url, title) {
            popup('https://twitter.com/intent/tweet?url=' + enc(url) + '&text=' + enc(title));
        },
        facebook: function (url) {
            popup('https://www.facebook.com/sharer/sharer.php?u=' + enc(url));
        },
        linkedin: function (url) {
            popup('https://www.linkedin.com/sharing/share-offsite/?url=' + enc(url));
        },
        telegram: function (url, title) {
            popup('https://t.me/share/url?url=' + enc(url) + '&text=' + enc(title));
        },
        whatsapp: function (url, title) {
            popup('https://api.whatsapp.com/send?text=' + enc(title + ' ' + url));
        },
        reddit: function (url, title) {
            popup('https://www.reddit.com/submit?url=' + enc(url) + '&title=' + enc(title));
        },
        email: function (url, title) {
            window.location.href = 'mailto:?subject=' + enc(title) + '&body=' + enc(url);
        },
        copy: function (url, title, el) {
            var done = function () {
                if (el) {
                    el.classList.add('is-copied');
                    setTimeout(function () { el.classList.remove('is-copied'); }, 1500);
                }
                if (window.FastFeedback && window.FastFeedback.tip) {
                    window.FastFeedback.tip.success('Link copied');
                }
            };
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(url).then(done, function () {});
            } else {
                var ta = document.createElement('textarea');
                ta.value = url;
                ta.style.position = 'fixed';
                ta.style.opacity = '0';
                document.body.appendChild(ta);
                ta.select();
                try { document.execCommand('copy'); done(); } catch (e) { /* ignore */ }
                document.body.removeChild(ta);
            }
        }
    };
    // twitter 作为 x 的别名
    HANDLERS.twitter = HANDLERS.x;

    document.addEventListener('click', function (e) {
        var el = e.target.closest ? e.target.closest('[data-share]') : null;
        if (!el) {
            return;
        }
        var type = (el.getAttribute('data-share') || '').toLowerCase().trim();
        var handler = HANDLERS[type];
        if (!handler) {
            return;
        }
        e.preventDefault();
        handler(currentUrl(), currentTitle(), el);
    });
})();
