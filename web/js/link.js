function LinkRef(linkId, sectionId) {
    this.pageIndexs = document.querySelectorAll('.' + linkId);
    this.sections = document.querySelectorAll('.' + sectionId);
    this.stickyHeader = document.getElementById('stickyHeader');
    this.setup();
}

// 滚动监听事件
LinkRef.prototype.handleScroll = function () {
    if (this.isScrolling) return;

    this.updateActiveLink();
}

LinkRef.prototype.setup = function () {
    this.isScrolling = false;
    this.scrollTimeout = null;
    // 初始化 - 设置第一个链接为激活状态
    if (this.pageIndexs.length > 0) {
        this.pageIndexs[0].classList.add('active');
    }
    // 点击导航链接事件
    this.pageIndexs.forEach((item) => {
        item.addEventListener("click", (e) => {
            e.stopPropagation();
            const value = e.currentTarget.id;
            this.scrollToSection(value);
        });
    });
    // 修正滚动事件监听器的绑定问题
    window.addEventListener('scroll', this.handleScroll.bind(this), { passive: true });

    // 初始化时更新一次状态
    this.updateActiveLink();

    // 监听窗口大小变化，重新计算位置
    window.addEventListener('resize', () => {
        if (!this.isScrolling) {
            this.updateActiveLink();
        }
    });
}

// 更新激活的导航链接
LinkRef.prototype.updateActiveLink = function () {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const headerHeight = (this.stickyHeader) ? this.stickyHeader.offsetHeight : 0;
    const offset = headerHeight; // 额外偏移量
    let activeSection = null;
    let closestDistance = Infinity;
    this.sections.forEach(section => {
        if (activeSection) { return }
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        const distance = Math.abs(scrollTop + offset - sectionTop);
        // 检查当前section是否在可视区域内
        if (scrollTop + offset >= sectionTop - 20 && scrollTop + offset < sectionBottom) {
            if (distance < closestDistance) {
                closestDistance = distance;
                activeSection = section;
            }
        }
    });
    // 如果没有找到活跃的section，使用最接近顶部的section
    if (!activeSection) {
        this.sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollTop + offset >= sectionTop - 20) {
                activeSection = section;
            }
        });
    }

    // 如果还是没有找到，使用第一个section
    if (!activeSection && this.sections.length > 0) {
        activeSection = this.sections[0];
    }

    if (activeSection) {
        const sectionId = activeSection.id;
        this.updateNavigation(sectionId);
    }
}

// 更新导航高亮
LinkRef.prototype.updateNavigation = function (activeSectionId) {
    this.pageIndexs.forEach(function (item) {
        if (item.id === activeSectionId) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

// 滚动到指定section
LinkRef.prototype.scrollToSection = function (sectionId) {
    let targetSection = null;
    this.sections.forEach(brandItem => {
        if (brandItem.id === sectionId) {
            targetSection = brandItem;
        }
    });
    if (!targetSection) return;
    const headerHeight = (this.stickyHeader) ? this.stickyHeader.offsetHeight : 0;
    const targetTop = targetSection.offsetTop - headerHeight;

    this.isScrolling = true;

    // 先更新导航状态
    this.updateNavigation(sectionId);
    window.scrollTo({
        top: targetTop,
        behavior: 'smooth'
    });

    // 平滑滚动完成后重置标志
    this.scrollTimeout && clearTimeout(this.scrollTimeout);
    this.scrollTimeout = setTimeout(() => {
        this.isScrolling = false;
    }, 1000);
}