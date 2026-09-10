/*
 * FAQ（faq 表）列表 / 详情卡片的点赞、点踩、收藏交互。跟 js/resource.js（系统文章那套）同一套做法，
 * 只是换了接口路径和收藏业务类型：
 *
 *   点赞  [data-action="like"]   -> PUT  /like/faq/{id}?like=1
 *   点踩  [data-action="unlike"] -> PUT  /like/faq/{id}?like=2
 *          同一用户对同一条 FAQ 只能点一次（服务端 canOperateFaqLike 拦重复），点过之后本地也把
 *          like / unlike 两个按钮一起锁掉。
 *   收藏  [data-action="follow"] -> POST /favorites {saveType:"FAQ", relationId:id}
 *          只做「收藏」不做「取消收藏」——全站还没有取消收藏的接口。
 *
 * 所有请求走 js/fast-api.js 的 FastApi。未登录时 fast-api 返 401，这里弹 sign in 弹窗。
 * 列表卡 components/faq-item.html、详情页 pages/faq-detail.html 用的是同一套 data-action + data-id
 * 结构，复用这个脚本。之前这两处是纯前端 toggle 视觉态、不落库，现在改成接真接口。
 */
(function () {
    if (!window.FastApi || !window.jQuery) {
        return;
    }
    var $ = window.jQuery;

    function ok(res) {
        return res && (res.code === 0 || res.code === '0' || res.success === true);
    }

    function tip(type, msg) {
        if (window.FastFeedback && window.FastFeedback.tip && window.FastFeedback.tip[type]) {
            window.FastFeedback.tip[type](msg);
        }
    }

    function onFail(xhr) {
        var status = xhr && xhr.status;
        var body = xhr && xhr.responseJSON;
        if (status === 401 || (body && (body.code === 18 || body.code === 11))) {
            if (typeof window.showSigninFn === 'function') {
                window.showSigninFn();
            }
            return;
        }
        tip('error', (body && body.msg) || 'Operation failed, please try again.');
    }

    function bumpCount($group, delta) {
        var $num = $group.find('span').filter(function () {
            return /^\d+$/.test($.trim($(this).text()));
        }).last();
        if (!$num.length) {
            return;
        }
        var v = parseInt($.trim($num.text()), 10);
        if (!isNaN(v)) {
            $num.text(v + delta);
        }
    }

    // 点赞 / 点踩
    $(document).on('click', '[data-action="like"], [data-action="unlike"]', function () {
        var $g = $(this);
        var id = $g.attr('data-id');
        if (!id || $g.hasClass('is-locked') || $g.hasClass('has-activate') || $g.hasClass('is-busy')) {
            return;
        }
        var like = $g.attr('data-action') === 'like' ? 1 : 2;
        $g.addClass('is-busy');
        FastApi.put('/like/faq/' + id + '?like=' + like).then(function (res) {
            $g.removeClass('is-busy');
            if (!ok(res)) {
                return;
            }
            $g.addClass('has-activate');
            bumpCount($g, 1);
            $g.closest('.faq-item, .faq-detail-helpful-actions, .faq-actions, .faq-detail-article')
                .find('[data-action="like"], [data-action="unlike"]').addClass('is-locked');
        }, function (xhr) {
            $g.removeClass('is-busy');
            onFail(xhr);
        });
    });

    // 收藏（只加不取消）
    $(document).on('click', '[data-action="follow"]', function () {
        var $g = $(this);
        var id = $g.attr('data-id');
        if (!id || $g.hasClass('has-activate') || $g.hasClass('is-busy')) {
            return;
        }
        // 系统文章那套 follow 也用同一个 [data-action="follow"] 选择器 + js/resource.js，两个脚本可能
        // 同时在页面上（理论上不会，但保险）：saveType 不同，靠 data-save-type 区分，faq 页统一带 FAQ。
        var saveType = $g.attr('data-save-type') || 'FAQ';
        $g.addClass('is-busy');
        FastApi.post('/favorites', { saveType: saveType, relationId: Number(id) }).then(function (res) {
            $g.removeClass('is-busy');
            if (!ok(res)) {
                return;
            }
            $g.addClass('has-activate');
            var active = $g.attr('data-src-active');
            if ($g.is('img') && active) {
                $g.attr('src', active).attr('aria-pressed', 'true');
            } else {
                bumpCount($g, 1);
            }
        }, function (xhr) {
            $g.removeClass('is-busy');
            onFail(xhr);
        });
    });
})();
