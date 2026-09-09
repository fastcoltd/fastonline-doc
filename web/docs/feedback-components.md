# Tip 与 Alert 通用组件

组件不依赖第三方库。复制以下两个文件到其它静态项目即可使用：

- `css/feedback-components.css`
- `js/feedback-components.js`

```html
<link rel="stylesheet" href="css/feedback-components.css" />
<script src="js/feedback-components.js"></script>
```

## Tip

```js
FastFeedback.tip.success('操作成功');

FastFeedback.tip.warning({
    title: '请检查填写内容',
    description: '部分字段尚未填写完整。',
    actionText: '查看',
    duration: 4000,
    closable: true,
    closeOnAction: false,
    onAction: function (tip) {
        tip.close();
    },
    onClose: function (reason) {
        console.log(reason);
    }
});
```

可用方法：

- `FastFeedback.tip.show(options)`
- `FastFeedback.tip.success(options)`
- `FastFeedback.tip.info(options)`
- `FastFeedback.tip.warning(options)`
- `FastFeedback.tip.error(options)`
- `FastFeedback.tip.close(id)`
- `FastFeedback.tip.clear([container])`

`duration` 默认为 `4000` 毫秒；设为 `0` 时不会自动关闭。传入 `container` 元素或选择器后，可将 Tip 以内嵌形式挂载到指定容器，适合组件预览和文档页面。

## Alert

```js
var alertController = FastFeedback.alert.confirm({
    type: 'warning',
    title: '确认删除？',
    message: '删除后无法恢复，请确认是否继续。',
    cancelText: '取消',
    confirmText: '确认删除',
    loadingText: '处理中...',
    onCancel: function () {},
    onConfirm: function () {
        return saveData();
    }
});

alertController.result.then(function (result) {
    console.log(result.action, result.confirmed);
});
```

Alert 打开时会锁定页面滚动和背景焦点。点击遮罩及按 `Esc` 不会关闭弹框。`onConfirm` 支持返回 Promise；返回 `false` 或 Promise 解析为 `false` 时保持弹框显示，Promise 被拒绝时显示错误提示并允许重试。

可用方法：

- `FastFeedback.alert.show(options)`
- `FastFeedback.alert.confirm(options)`
- `FastFeedback.alert.close()`：供业务代码主动结束流程，不对应任何用户点击行为。

## 样式定制

颜色变量定义在 `.fr-tip-stack` 和 `.fr-alert-mask` 中，复制组件后可以覆盖 `--fr-feedback-*-background`、`--fr-feedback-*-border`、`--fr-feedback-*-accent` 及 `--fr-feedback-font` 完成主题适配。
