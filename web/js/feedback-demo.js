document.addEventListener('DOMContentLoaded', function () {
    'use strict';

    var feedback = window.FastFeedback;
    var previewHost = document.getElementById('feedback-tip-preview-host');

    function renderTipPreview() {
        feedback.tip.success({
            title: 'Success Text',
            duration: 0,
            container: previewHost
        });
        feedback.tip.info({
            title: 'Info Text',
            duration: 0,
            container: previewHost
        });
        feedback.tip.warning({
            title: 'Warning Text',
            description: 'Description text explains what happened and what the user can do next.',
            actionText: 'View',
            duration: 0,
            container: previewHost
        });
        feedback.tip.error({
            title: 'Error Text',
            description: 'Description text explains what happened and what the user can do next.',
            duration: 0,
            container: previewHost
        });
    }

    function showTipDemo(action) {
        if (action === 'tip-success') {
            feedback.tip.success('操作成功，提示将在 4 秒后消失。');
        } else if (action === 'tip-info') {
            feedback.tip.info({
                title: '信息提示',
                description: '这是一条带描述内容的信息提示。'
            });
        } else if (action === 'tip-warning') {
            feedback.tip.warning({
                title: '请检查填写内容',
                description: '部分字段尚未填写完整。',
                actionText: '查看',
                onAction: function (controller) {
                    controller.close();
                }
            });
        } else if (action === 'tip-error') {
            feedback.tip.error('操作失败，请稍后重试。');
        } else if (action === 'tip-custom-width') {
            feedback.tip.info({
                title: '自定义宽度提示',
                description: '该示例宽度为 720px；当内容较长或屏幕较窄时，文案会在可用区域内自动换行。',
                width: 720
            });
        }
    }

    function showAlertDemo(action) {
        if (action === 'alert-warning') {
            feedback.alert.confirm({
                type: 'warning',
                title: '确认删除这条记录？',
                message: '删除后无法恢复，请确认是否继续。',
                cancelText: '取消',
                confirmText: '确认删除',
                onConfirm: function () {
                    feedback.tip.success('记录已删除。');
                }
            });
        } else if (action === 'alert-info') {
            feedback.alert.confirm({
                type: 'info',
                title: '确认提交当前内容？',
                message: '提交后系统将开始处理当前任务。',
                onCancel: function () {
                    feedback.tip.info('已取消提交。');
                },
                onConfirm: function () {
                    feedback.tip.success('内容已提交。');
                }
            });
        } else if (action === 'alert-async') {
            feedback.alert.confirm({
                type: 'success',
                title: '确认保存设置？',
                message: '点击确认后将模拟一次异步保存操作。',
                confirmText: '保存',
                loadingText: '保存中...',
                onConfirm: function () {
                    return new Promise(function (resolve) {
                        window.setTimeout(function () {
                            feedback.tip.success('设置已保存。');
                            resolve(true);
                        }, 1200);
                    });
                }
            });
        } else if (action === 'alert-error') {
            feedback.alert.confirm({
                type: 'error',
                title: '确认终止任务？',
                message: '终止后本次执行进度将不会保留。',
                confirmText: '确认终止',
                onConfirm: function () {
                    feedback.tip.error('任务已终止。');
                }
            });
        }
    }

    document.addEventListener('click', function (event) {
        var button = event.target.closest('[data-demo-action]');
        if (!button) {
            return;
        }
        var action = button.dataset.demoAction;
        if (action.indexOf('tip-') === 0) {
            showTipDemo(action);
        } else if (action.indexOf('alert-') === 0) {
            showAlertDemo(action);
        } else if (action === 'reset-preview') {
            feedback.tip.clear(previewHost);
            window.setTimeout(renderTipPreview, 240);
        }
    });

    renderTipPreview();
});
