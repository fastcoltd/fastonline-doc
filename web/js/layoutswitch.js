class PageLayout {
    constructor() {
        this.currentLayout = 'vertical';
        this.init();
    }

    init() {
        this.bindEvents();
    }

    // 绑定事件
    bindEvents() {
        // 布局切换事件
        document.querySelectorAll('.layout-switch').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchLayout(e.target.dataset.layout);
            });
        });
    }

    // 切换布局
    switchLayout(layout) {
        if (this.currentLayout === layout) return;

        this.currentLayout = layout;
        const container = document.getElementById('items-container');
        const buttons = document.querySelectorAll('.layout-switch');

        // 更新按钮状态
        buttons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.layout === layout);
        });

        // 更新容器类名
        container.className = `layout-${layout}`;
    }
}