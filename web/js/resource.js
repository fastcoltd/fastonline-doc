/*
 * 系统文章（pages 表）列表 / 详情卡片的点赞、点踩、收藏交互。
 *
 * fast-site 原来引的 resourcepage.js 是从 static-source 原封搬来的原型代码（全是 mock 数据 +
 * new Pagination() 会直接抛异常），已经不再引用，用这个替代。
 *
 *   点赞  [data-action="like"]   -> PUT  /like/pages/{id}?like=1
 *   点踩  [data-action="unlike"] -> PUT  /like/pages/{id}?like=2
 *          同一用户对同一条 pages 只能点一次（服务端 canOperatePagesLike 拦重复），点过之后本地也把
 *          like / unlike 两个按钮一起锁掉。
 *   收藏  [data-action="follow"] -> POST /favorites {saveType:"PAGES", relationId:id}
 *          目前只做「收藏」不做「取消收藏」——全站还没有取消收藏的接口（FavoritesController 只有 POST）。
 *
 * 所有请求走 js/fast-api.js 的 FastApi（host 解析 / CSRF / withCredentials 都在那边统一处理）。
 * 未登录时 fast-api 返 401（{"code":18,...}），这里弹站点的 sign in 弹窗（login.js 的 showSigninFn）。
 * 详情页 pages/resource-detail.html 用的是同一套 data-action + data-id 结构，复用这个脚本。
 */
(function () {
    if (!window.FastApi || !window.jQuery) {
        return;
    }
    var $ = window.jQuery;

    function ok(res) {
        return res && (res.code === 0 || res.code === '0' || res.success === true);
    }

    // 请求失败兜底：401 / code 18（未登录）弹 sign in 弹窗，其它错误静默。
    function onFail(xhr) {
        var status = xhr && xhr.status;
        var body = xhr && xhr.responseJSON;
        if (status === 401 || (body && (body.code === 18 || body.code === 11))) {
            if (typeof window.showSigninFn === 'function') {
                window.showSigninFn();
            }
        }
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
        if (!id || $g.hasClass('is-locked') || $g.hasClass('has-activate')) {
            return;
        }
        var like = $g.attr('data-action') === 'like' ? 1 : 2;
        $g.addClass('is-busy');
        FastApi.put('/like/pages/' + id + '?like=' + like).then(function (res) {
            $g.removeClass('is-busy');
            if (!ok(res)) {
                return;
            }
            $g.addClass('has-activate');
            bumpCount($g, 1);
            // 一条 pages 点赞/点踩二选一且只能一次，锁掉同一组里的两个按钮
            $g.closest('.resource-item, .helpful-section-wrapper, .resource-detail-article-content, .page-content')
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
        $g.addClass('is-busy');
        FastApi.post('/favorites', { saveType: 'PAGES', relationId: Number(id) }).then(function (res) {
            $g.removeClass('is-busy');
            if (!ok(res)) {
                return;
            }
            $g.addClass('has-activate');
            bumpCount($g, 1);
        }, function (xhr) {
            $g.removeClass('is-busy');
            onFail(xhr);
        });
    });
})();
