class Pagination {
    constructor(options = {}) {
        this.currentPage = options.current || 1;
        this.pageSize = options.pageSize || 20;
        this.total = options.total || 85;
        this.showSizeChanger = options.showSizeChanger !== false;
        this.showQuickJumper = options.showQuickJumper !== false;

        this.totalPages = Math.ceil(this.total / this.pageSize);
        this.resizeTimer = null;

        this.initElements();
        this.bindEvents();

        // 延迟渲染以确保DOM已完全加载
        setTimeout(() => {
            this.render();
        }, 0);
    }

    initElements() {
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.paginationNumbers = document.getElementById('paginationNumbers');
        this.totalItemsSpan = document.getElementById('totalItems');
        this.sizeChanger = document.getElementById('sizeChanger');
        this.sizeDropdown = document.getElementById('sizeDropdown');
        this.sizeText = document.getElementById('sizeText');
        this.jumpInput = document.getElementById('jumpInput');
        this.jumpInputWrapper = document.getElementById('jumpInputWrapper');
    }

    bindEvents() {
        // 上一页按钮
        this.prevBtn.addEventListener('click', () => {
            if (this.currentPage > 1) {
                this.goToPage(this.currentPage - 1);
            }
        });

        // 下一页按钮
        this.nextBtn.addEventListener('click', () => {
            if (this.currentPage < this.totalPages) {
                this.goToPage(this.currentPage + 1);
            }
        });

        // 每页显示数量选择器
        this.sizeChanger.addEventListener('click', (e) => {
            e.stopPropagation();
            this.sizeDropdown.classList.toggle('show');
        });

        // 每页显示数量选项
        this.sizeDropdown.addEventListener('click', (e) => {
            e.stopPropagation();
            const option = e.target.closest('.size-changer-option');
            if (option) {
                const newSize = parseInt(option.dataset.size);
                this.changePageSize(newSize);
                this.sizeDropdown.classList.remove('show');
            }
        });

        // 快速跳转输入框
        this.jumpInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.handleQuickJump();
            }
        });

        this.jumpInput.addEventListener('blur', () => {
            this.handleQuickJump();
        });

        this.jumpInput.addEventListener('input', () => {
            // 移除错误状态
            this.jumpInputWrapper.classList.remove('error');
        });

        // 点击其他地方关闭下拉菜单
        document.addEventListener('click', () => {
            this.sizeDropdown.classList.remove('show');
        });

        // 窗口大小改变时重新渲染
        window.addEventListener('resize', () => {
            clearTimeout(this.resizeTimer);
            this.resizeTimer = setTimeout(() => {
                this.render();
            }, 150);
        });
    }

    goToPage(page) {
        if (page < 1 || page > this.totalPages || page === this.currentPage) {
            return;
        }
        console.log('go to page', page);
        this.currentPage = page;
        this.render();
        this.onPageChange && this.onPageChange(page, this.pageSize);
    }

    changePageSize(newSize) {
        this.pageSize = newSize;
        this.totalPages = Math.ceil(this.total / this.pageSize);

        // 调整当前页码，确保不超出范围
        if (this.currentPage > this.totalPages) {
            this.currentPage = this.totalPages;
        }

        this.render();
        this.onPageSizeChange && this.onPageSizeChange(this.currentPage, newSize);
    }

    handleQuickJump() {
        const value = this.jumpInput.value.trim();
        if (!value) {
            return;
        }

        const page = parseInt(value);
        if (isNaN(page) || page < 1 || page > this.totalPages) {
            // 显示错误状态
            this.jumpInputWrapper.classList.add('error');
            // 清空输入框
            setTimeout(() => {
                this.jumpInput.value = '';
                this.jumpInputWrapper.classList.remove('error');
            }, 1000);
            return;
        }

        this.jumpInput.value = '';
        this.goToPage(page);
    }

    calculateMaxVisiblePages() {
        // 获取容器的实际宽度
        const containerWidth = this.paginationNumbers.offsetWidth;
        if (!containerWidth || containerWidth <= 0) {
            // 无法获取宽度时，根据总页数返回合理默认值
            return Math.min(this.totalPages <= 10 ? this.totalPages : 8, this.totalPages);
        }
        // 估算每个元素的宽度
        const itemWidth = 40; // 每个页码按钮宽度（含间距）
        const ellipsisWidth = 40; // 省略号宽度

        // 简单情况：如果总页数很少，直接显示所有
        if (this.totalPages <= 7) {
            const requiredWidth = this.totalPages * itemWidth;
            return requiredWidth <= containerWidth ? this.totalPages : Math.floor(containerWidth / itemWidth);
        }

        // 复杂情况：需要考虑省略号
        // 预留两个省略号的空间
        const availableWidthForPages = containerWidth - (ellipsisWidth * 2);
        let maxPages = Math.floor(availableWidthForPages / itemWidth);

        // 确保最少显示5个页码（1 ... current ... total）
        maxPages = Math.max(5, maxPages);

        // 但不能超过总页数
        maxPages = Math.min(maxPages, this.totalPages);

        return maxPages;
    }

    generatePageNumbers() {
        const pages = [];
        const current = this.currentPage;
        const total = this.totalPages;
        let maxVisible = this.calculateMaxVisiblePages();
        maxVisible = Math.max(5, maxVisible);

        if (total <= maxVisible) {
            // 总页数不多，显示所有页码
            for (let i = 1; i <= total; i++) {
                pages.push(i);
            }
        } else {
            // 需要使用省略号的情况
            const sidePages = 2; // 首尾各显示的页数
            const centerPages = maxVisible - 4; // 中间区域可显示的页数（减去首尾页和两个省略号）
            if (current <= sidePages + centerPages) {
                // 当前页在前半部分
                for (let i = 1; i <= Math.min(maxVisible - 2, total - 1); i++) {
                    pages.push(i);
                }
                if (total > maxVisible - 2) {
                    pages.push('...');
                    pages.push(total);
                }
            } else if (current >= total - sidePages - centerPages + 1) {
                // 当前页在后半部分
                pages.push(1);
                pages.push('...');
                for (let i = Math.max(total - maxVisible + 3, 2); i <= total; i++) {
                    pages.push(i);
                }
            } else {
                // 当前页在中间
                pages.push(1);
                const centerStart = current - Math.floor(centerPages / 2);
                const centerEnd = current + Math.floor(centerPages / 2);

                // 左侧省略号
                if (centerStart > 2) {
                    pages.push('...');
                }
                // 中间页码
                for (let i = Math.max(2, centerStart); i <= Math.min(total - 1, centerEnd); i++) {
                    pages.push(i);
                }
                // 右侧省略号
                if (centerEnd < total - 1) {
                    pages.push('...');
                }
                pages.push(total);
            }
        }

        return pages;
    }

    render() {
        // 更新总数显示
        this.totalItemsSpan.textContent = this.total;

        // 更新上一页按钮状态
        if (this.currentPage <= 1) {
            this.prevBtn.classList.add('disabled');
        } else {
            this.prevBtn.classList.remove('disabled');
        }

        // 更新下一页按钮状态
        if (this.currentPage >= this.totalPages) {
            this.nextBtn.classList.add('disabled');
        } else {
            this.nextBtn.classList.remove('disabled');
        }

        // 生成页码
        const pages = this.generatePageNumbers();
        this.paginationNumbers.innerHTML = '';
        // 调试信息
        console.log(`当前页: ${this.currentPage}, 总页数: ${this.totalPages}, 容器宽度: ${this.paginationNumbers.offsetWidth}, 最大可显示: ${this.calculateMaxVisiblePages()}, 生成页码:`, pages);

        pages.forEach(page => {
            if (page === '...') {
                const ellipsis = document.createElement('span');
                ellipsis.className = 'pagination-ellipsis';
                ellipsis.textContent = '•••';
                this.paginationNumbers.appendChild(ellipsis);
            } else {
                const button = document.createElement('button');
                button.className = 'pagination-item';
                button.textContent = page;

                if (page === this.currentPage) {
                    button.classList.add('active');
                }

                button.addEventListener('click', () => {
                    this.goToPage(page);
                });

                this.paginationNumbers.appendChild(button);
            }
        });

        // 更新页面大小选择器
        this.sizeText.textContent = `${this.pageSize} / page`;

        // 更新下拉菜单选中状态
        const options = this.sizeDropdown.querySelectorAll('.size-changer-option');
        options.forEach(option => {
            option.classList.remove('selected');
            if (parseInt(option.dataset.size) === this.pageSize) {
                option.classList.add('selected');
            }
        });
    }

    // 设置总数
    setTotal(total) {
        this.total = total;
        this.totalPages = Math.ceil(this.total / this.pageSize);

        if (this.currentPage > this.totalPages) {
            this.currentPage = this.totalPages || 1;
        }

        this.render();
    }

    // 设置当前页
    setCurrent(page) {
        if (page >= 1 && page <= this.totalPages) {
            this.currentPage = page;
            this.render();
        }
    }
}