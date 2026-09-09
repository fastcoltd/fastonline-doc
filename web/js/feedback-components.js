(function (global) {
    'use strict';

    var DEFAULT_TIP_DURATION = 4000;
    var VALID_TYPES = ['success', 'info', 'warning', 'error'];
    var tipSequence = 0;
    var alertSequence = 0;
    var tipControllers = new Map();
    var tipStacks = new Set();
    var activeAlert = null;

    function isElement(value) {
        return value && value.nodeType === 1;
    }

    function normalizeType(type, fallback) {
        return VALID_TYPES.indexOf(type) > -1 ? type : fallback;
    }

    function normalizeOptions(value, fallbackType) {
        if (typeof value === 'string' || typeof value === 'number') {
            return {
                title: String(value),
                type: fallbackType
            };
        }
        return Object.assign({ type: fallbackType }, value || {});
    }

    function resolveElement(value, optionName) {
        if (!value) {
            return null;
        }
        if (isElement(value)) {
            return value;
        }
        if (typeof value === 'string') {
            var element = document.querySelector(value);
            if (element) {
                return element;
            }
        }
        throw new Error('FastFeedback: ' + optionName + ' 必须是有效的元素或选择器。');
    }

    function createTextElement(tagName, role, text, id) {
        var element = document.createElement(tagName);
        element.dataset.role = role;
        if (id) {
            element.id = id;
        }
        element.textContent = text;
        return element;
    }

    function createStatusIcon() {
        var icon = document.createElement('span');
        icon.dataset.role = 'icon';
        icon.setAttribute('aria-hidden', 'true');
        return icon;
    }

    function createButton(role, text, ariaLabel) {
        var button = document.createElement('button');
        button.type = 'button';
        button.dataset.role = role;
        if (ariaLabel) {
            button.setAttribute('aria-label', ariaLabel);
        }
        if (text) {
            button.textContent = text;
        }
        return button;
    }

    function getTipStack(container) {
        var host = container || document.body;
        if (!host) {
            throw new Error('FastFeedback: 页面尚未创建 body，无法显示 Tip。');
        }

        var selector = container
            ? ':scope > .fr-tip-stack.fr-tip-stack--inline'
            : ':scope > .fr-tip-stack:not(.fr-tip-stack--inline)';
        var stack = host.querySelector(selector);

        if (!stack) {
            stack = document.createElement('div');
            stack.className = 'fr-tip-stack' + (container ? ' fr-tip-stack--inline' : '');
            stack.setAttribute('role', 'region');
            stack.setAttribute('aria-label', container ? 'Tip 组件预览' : '页面通知');
            host.appendChild(stack);
            tipStacks.add(stack);
        }

        return stack;
    }

    function removeTipStackIfEmpty(stack) {
        if (!stack || stack.children.length) {
            return;
        }
        tipStacks.delete(stack);
        stack.remove();
    }

    function showTip(value) {
        var options = normalizeOptions(value, 'info');
        var type = normalizeType(options.type, 'info');
        var title = options.title === undefined || options.title === null
            ? ''
            : String(options.title);
        var description = options.description === undefined || options.description === null
            ? ''
            : String(options.description);
        var durationValue = Number(options.duration);
        var duration = Number.isFinite(durationValue) && durationValue >= 0
            ? durationValue
            : DEFAULT_TIP_DURATION;
        var container = resolveElement(options.container, 'container');
        var stack = getTipStack(container);
        var id = 'fr-tip-' + (++tipSequence);
        var tip = document.createElement('div');
        var content = document.createElement('div');
        var timer = null;
        var removeTimer = null;
        var closed = false;

        tip.className = 'fr-tip fr-tip--' + type
            + (description ? ' fr-tip--detailed' : '')
            + (options.actionText ? ' fr-tip--with-action' : '');
        tip.dataset.feedbackId = id;
        tip.setAttribute('role', type === 'error' || type === 'warning' ? 'alert' : 'status');
        tip.setAttribute('aria-atomic', 'true');
        content.dataset.role = 'content';

        tip.appendChild(createStatusIcon());
        content.appendChild(createTextElement('p', 'title', title || '提示'));
        if (description) {
            content.appendChild(createTextElement('p', 'description', description));
        }
        tip.appendChild(content);

        function finishRemove(reason) {
            if (tip.isConnected) {
                tip.remove();
            }
            tipControllers.delete(id);
            removeTipStackIfEmpty(stack);
            if (typeof options.onClose === 'function') {
                options.onClose(reason, controller);
            }
        }

        function close(reason) {
            if (closed) {
                return;
            }
            closed = true;
            if (timer) {
                global.clearTimeout(timer);
            }
            if (removeTimer) {
                global.clearTimeout(removeTimer);
            }
            tip.classList.remove('is-visible');
            tip.classList.add('is-closing');
            removeTimer = global.setTimeout(function () {
                finishRemove(reason || 'programmatic');
            }, 220);
        }

        var controller = {
            id: id,
            element: tip,
            close: function () {
                close('programmatic');
            }
        };

        if (options.actionText) {
            var actionButton = createButton('action', String(options.actionText));
            actionButton.addEventListener('click', function () {
                if (typeof options.onAction === 'function') {
                    options.onAction(controller);
                }
                if (options.closeOnAction) {
                    close('action');
                }
            });
            tip.appendChild(actionButton);
        }

        if (options.closable !== false) {
            var closeButton = createButton('close', '', options.closeAriaLabel || '关闭提示');
            closeButton.addEventListener('click', function () {
                close('close');
            });
            tip.appendChild(closeButton);
        }

        stack.appendChild(tip);
        tipControllers.set(id, controller);
        global.requestAnimationFrame(function () {
            tip.classList.add('is-visible');
        });

        if (duration > 0) {
            timer = global.setTimeout(function () {
                close('timeout');
            }, duration);
        }

        return controller;
    }

    function closeTip(id) {
        var controller = tipControllers.get(id);
        if (controller) {
            controller.close();
        }
    }

    function clearTips(containerValue) {
        var container = resolveElement(containerValue, 'container');
        Array.from(tipControllers.values()).forEach(function (controller) {
            if (!container || container.contains(controller.element)) {
                controller.close();
            }
        });
    }

    function lockPage() {
        var body = document.body;
        var root = document.documentElement;
        var scrollbarWidth = Math.max(0, global.innerWidth - root.clientWidth);
        body.style.setProperty('--fr-feedback-body-padding-right', global.getComputedStyle(body).paddingRight);
        body.style.setProperty('--fr-feedback-scrollbar-width', scrollbarWidth + 'px');
        body.classList.add('fr-feedback-scroll-locked');
        root.classList.add('fr-feedback-scroll-locked');
    }

    function unlockPage() {
        var body = document.body;
        document.documentElement.classList.remove('fr-feedback-scroll-locked');
        body.classList.remove('fr-feedback-scroll-locked');
        body.style.removeProperty('--fr-feedback-body-padding-right');
        body.style.removeProperty('--fr-feedback-scrollbar-width');
    }

    function makeBackgroundInert(mask) {
        var states = [];
        Array.from(document.body.children).forEach(function (element) {
            if (element === mask || !('inert' in element)) {
                return;
            }
            states.push({ element: element, inert: element.inert });
            element.inert = true;
        });
        return states;
    }

    function restoreBackgroundInert(states) {
        states.forEach(function (state) {
            state.element.inert = state.inert;
        });
    }

    function showAlert(value) {
        if (!document.body) {
            throw new Error('FastFeedback: 页面尚未创建 body，无法显示 Alert。');
        }
        var options = normalizeOptions(value, 'warning');
        var type = normalizeType(options.type, 'warning');
        var title = options.title === undefined || options.title === null
            ? '请确认操作'
            : String(options.title);
        var message = options.message === undefined || options.message === null
            ? ''
            : String(options.message);

        if (activeAlert) {
            activeAlert.dismiss('replaced', true);
        }

        var id = 'fr-alert-' + (++alertSequence);
        var titleId = id + '-title';
        var messageId = id + '-message';
        var mask = document.createElement('div');
        var dialog = document.createElement('section');
        var main = document.createElement('div');
        var content = document.createElement('div');
        var actions = document.createElement('div');
        var errorText = createTextElement('p', 'error', '');
        var cancelButton = null;
        var confirmButton = null;
        var previousFocus = document.activeElement;
        var inertStates = [];
        var closed = false;
        var loading = false;
        var closeTimer = null;
        var resolveResult;
        var result = new Promise(function (resolve) {
            resolveResult = resolve;
        });

        mask.className = 'fr-alert-mask';
        mask.dataset.feedbackId = id;
        mask.setAttribute('aria-hidden', 'false');
        dialog.className = 'fr-alert-dialog fr-alert-dialog--' + type;
        dialog.setAttribute('role', 'alertdialog');
        dialog.setAttribute('aria-modal', 'true');
        dialog.setAttribute('aria-labelledby', titleId);
        if (message) {
            dialog.setAttribute('aria-describedby', messageId);
        }
        main.dataset.role = 'main';
        content.dataset.role = 'content';
        actions.dataset.role = 'actions';
        errorText.hidden = true;

        main.appendChild(createStatusIcon());
        content.appendChild(createTextElement('h2', 'title', title, titleId));
        if (message) {
            content.appendChild(createTextElement('p', 'message', message, messageId));
        }
        content.appendChild(errorText);
        main.appendChild(content);
        dialog.appendChild(main);

        function setLoading(nextLoading) {
            if (closed) {
                return;
            }
            loading = !!nextLoading;
            dialog.classList.toggle('is-loading', loading);
            if (confirmButton) {
                confirmButton.disabled = loading;
                confirmButton.textContent = loading
                    ? String(options.loadingText || '处理中...')
                    : String(options.confirmText || '确认');
            }
            if (cancelButton) {
                cancelButton.disabled = loading;
            }
        }

        function showConfirmError(error) {
            if (closed) {
                return;
            }
            var fallback = options.confirmErrorText || '操作失败，请重试。';
            errorText.textContent = options.useThrownErrorMessage && error && error.message
                ? error.message
                : fallback;
            errorText.hidden = false;
            setLoading(false);
            confirmButton.focus();
        }

        function cleanup(reason) {
            if (closeTimer) {
                global.clearTimeout(closeTimer);
            }
            mask.remove();
            restoreBackgroundInert(inertStates);
            unlockPage();
            document.removeEventListener('keydown', handleKeydown, true);
            if (activeAlert === controller) {
                activeAlert = null;
            }
            if (previousFocus && previousFocus.isConnected && typeof previousFocus.focus === 'function') {
                previousFocus.focus();
            }
            resolveResult({ action: reason, confirmed: reason === 'confirm' });
            if (typeof options.onClose === 'function') {
                options.onClose(reason, controller);
            }
        }

        function dismiss(reason, immediate) {
            if (closed) {
                return;
            }
            closed = true;
            mask.setAttribute('aria-hidden', 'true');
            mask.classList.remove('is-visible');
            mask.classList.add('is-closing');
            Array.from(actions.querySelectorAll('button')).forEach(function (button) {
                button.disabled = true;
            });
            if (immediate) {
                cleanup(reason || 'programmatic');
                return;
            }
            closeTimer = global.setTimeout(function () {
                cleanup(reason || 'programmatic');
            }, 180);
        }

        function handleCancel() {
            if (loading || closed) {
                return;
            }
            try {
                if (typeof options.onCancel === 'function') {
                    options.onCancel(controller);
                }
            } finally {
                dismiss('cancel');
            }
        }

        function handleConfirm() {
            if (loading || closed) {
                return;
            }
            errorText.hidden = true;
            var confirmResult;
            try {
                confirmResult = typeof options.onConfirm === 'function'
                    ? options.onConfirm(controller)
                    : true;
            } catch (error) {
                showConfirmError(error);
                return;
            }

            if (confirmResult && typeof confirmResult.then === 'function') {
                setLoading(true);
                Promise.resolve(confirmResult).then(function (resolvedValue) {
                    if (closed) {
                        return;
                    }
                    setLoading(false);
                    if (resolvedValue !== false) {
                        dismiss('confirm');
                    }
                }).catch(showConfirmError);
                return;
            }

            if (confirmResult !== false) {
                dismiss('confirm');
            }
        }

        function handleKeydown(event) {
            if (event.key === 'Escape') {
                event.preventDefault();
                event.stopPropagation();
                return;
            }
            if (event.key !== 'Tab') {
                return;
            }
            var focusable = Array.from(dialog.querySelectorAll('button:not([disabled])'));
            if (!focusable.length) {
                event.preventDefault();
                dialog.focus();
                return;
            }
            var first = focusable[0];
            var last = focusable[focusable.length - 1];
            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        }

        var controller = {
            id: id,
            element: mask,
            result: result,
            close: function () {
                dismiss('programmatic');
            },
            setLoading: setLoading,
            dismiss: dismiss
        };

        if (options.showCancel !== false) {
            cancelButton = createButton('cancel', String(options.cancelText || '取消'));
            cancelButton.addEventListener('click', handleCancel);
            actions.appendChild(cancelButton);
        }

        confirmButton = createButton('confirm', String(options.confirmText || '确认'));
        confirmButton.addEventListener('click', handleConfirm);
        actions.appendChild(confirmButton);
        dialog.appendChild(actions);
        mask.appendChild(dialog);

        mask.addEventListener('click', function (event) {
            if (event.target === mask && !loading) {
                event.preventDefault();
                (cancelButton || confirmButton).focus();
            }
        });

        document.body.appendChild(mask);
        lockPage();
        inertStates = makeBackgroundInert(mask);
        document.addEventListener('keydown', handleKeydown, true);
        activeAlert = controller;

        global.requestAnimationFrame(function () {
            mask.classList.add('is-visible');
            (cancelButton || confirmButton).focus();
        });

        return controller;
    }

    var tipApi = {
        show: showTip,
        success: function (value) {
            return showTip(Object.assign(normalizeOptions(value, 'success'), { type: 'success' }));
        },
        info: function (value) {
            return showTip(Object.assign(normalizeOptions(value, 'info'), { type: 'info' }));
        },
        warning: function (value) {
            return showTip(Object.assign(normalizeOptions(value, 'warning'), { type: 'warning' }));
        },
        error: function (value) {
            return showTip(Object.assign(normalizeOptions(value, 'error'), { type: 'error' }));
        },
        close: closeTip,
        clear: clearTips
    };

    var alertApi = {
        show: showAlert,
        confirm: showAlert,
        close: function () {
            if (activeAlert) {
                activeAlert.close();
            }
        }
    };

    global.FastFeedback = Object.freeze({
        tip: Object.freeze(tipApi),
        alert: Object.freeze(alertApi)
    });
})(window);
