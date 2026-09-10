/**
 * 全站访问 fast-api（买家站点的兄弟 REST 服务）的唯一入口。任何页面脚本要调 fast-api 的接口，都应该走
 * 这里的 FastApi.get/post，不要在各自文件里各写一遍 $.ajax + 拼 host——原因：
 *
 *   1) host 要按环境切换（本地 config.apiHost:8081，线上走 https://{apiHost}），由后端
 *      GlobalSiteModelAdvice 通过 <meta name="site-api-host"> 注入，读取逻辑只写这一处，
 *      环境判断改动不用满仓库找 $.ajax。
 *   2) 以后要加统一的错误提示 / 鉴权 header / 超时重试之类的横切逻辑，也只用改这一个文件。
 *
 * 业务层的数据缓存（比如 locale-data.js 的 FastLocale.load 要把 /basic/locales 在整个页面生命周期内
 * 只真正请求一次）不属于这里管，那是业务模块自己在这个基础上包一层。
 */
(function (window, $) {
    if (!$) {
        return;
    }

    function apiHost() {
        var meta = document.querySelector('meta[name="site-api-host"]');
        return meta ? meta.getAttribute('content') : '';
    }

    // fast-api（Spring Security）给 POST/PUT/DELETE/PATCH 这类写请求开了 CSRF 校验（CsrfFilter，token
    // 存在 HttpSession 里，见 fast-api SecurityConfig），登录态本身对了（session cookie 有效）也会因为
    // 没带 CSRF token 被拦成 403——这是 become-seller 提交/上传"登录了还是失败"的真正原因，之前只查到
    // "需要登录态"这一层，没往下查到"登录了也还要带 CSRF token"这一层。
    //
    // fast-api 专门开了一个 GET /csrf 端点，会把当前 session 绑定的 token 序列化成
    // {token, headerName, parameterName} 返回（release 环境这个端点直接返回 null，CSRF 校验在生产环境
    // 具体怎么处理不在这次改动范围内，这里只管本地/dev 环境能跑通）。这里请求一次就缓存住（同一个
    // session 生命周期内 HttpSessionCsrfTokenRepository 不会换 token，不需要每次写请求都重新拉一遍），
    // 写请求发出前先等这个缓存到位，再把 headerName/token 塞进请求头——header 名字不写死，跟着接口返回
    // 的 headerName 走，服务端配置换了（比如 X-CSRF-TOKEN 换成 X-XSRF-TOKEN）这边不用跟着改。
    //
    // 所有请求（含 GET）都要带 xhrFields:{withCredentials:true}，不然浏览器压根不会把 fast-api 的
    // session cookie 带过去（fast-site 8080、fast-api 8081 是跨源请求），"模拟登录了但还是当匿名"这个
    // 现象十有八九也是漏了这个——fast-api CORS 配置（SecurityConfig#corsConfigurationSource）已经对
    // http://localhost:8080 开了 allow-credentials:true，服务端这边是通的，问题都在客户端没带。
    var MUTATING_METHODS = { POST: true, PUT: true, DELETE: true, PATCH: true };
    var csrfPromise = null;
    function getCsrfToken() {
        if (!csrfPromise) {
            csrfPromise = $.ajax({
                url: apiHost() + '/csrf',
                method: 'GET',
                dataType: 'json',
                xhrFields: { withCredentials: true }
            }).catch(function () {
                // 拉 token 失败（比如 release 环境端点被禁用）不应该让所有写请求全挂在这里，退化成
                // "不带 token 直接发"，跟以前的行为一致，至少不会比现在更差。
                return null;
            });
        }
        return csrfPromise;
    }

    function sendWithCredentials(settings) {
        return $.ajax($.extend({ xhrFields: { withCredentials: true } }, settings));
    }

    function request(method, path, data, options) {
        var host = apiHost();
        if (!host) {
            console.warn('site-api-host meta 缺失，fast-api 请求未发出：', path);
            return $.Deferred().reject({}, 'error', 'site-api-host missing').promise();
        }
        var settings = $.extend({
            url: host + path,
            method: method,
            dataType: 'json'
        }, data ? { data: data } : {}, options || {});

        if (!MUTATING_METHODS[method]) {
            return sendWithCredentials(settings);
        }

        return getCsrfToken().then(function (csrf) {
            if (csrf && csrf.headerName && csrf.token) {
                settings.headers = $.extend({}, settings.headers, { [csrf.headerName]: csrf.token });
            }
            return sendWithCredentials(settings);
        });
    }

    window.FastApi = {
        apiHost: apiHost,
        get: function (path, data, options) {
            return request('GET', path, data, options);
        },
        post: function (path, data, options) {
            return request('POST', path, null, $.extend({
                contentType: 'application/json',
                data: data ? JSON.stringify(data) : undefined
            }, options || {}));
        },
        // PUT/DELETE：data 当查询串走（跟 get 一样），CSRF 头由 request() 自动带。
        put: function (path, data, options) {
            return request('PUT', path, data, options);
        },
        del: function (path, data, options) {
            return request('DELETE', path, data, options);
        },
        // 文件上传（multipart/form-data），FormData 场景——跟 post() 的 JSON body 不是同一回事，
        // jQuery 要求 contentType:false + processData:false 才不会把 FormData 当普通对象序列化掉。
        // 第一个用到的地方是 pages/become-seller.html 的 logo 上传（POST /file/upload/{path}），
        // 见 js/become-seller.js。
        upload: function (path, formData, options) {
            return request('POST', path, null, $.extend({
                data: formData,
                contentType: false,
                processData: false
            }, options || {}));
        }
    };
})(window, window.jQuery);
