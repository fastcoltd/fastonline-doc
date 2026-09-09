function LinkRef(linkId, sectionId) {
    const usesSelector = ['.', '#', '['].includes(linkId.charAt(0));
    const linkSelector = usesSelector ? linkId : '.' + linkId;
    this.pageIndexs = document.querySelectorAll(linkSelector);
    this.sections = document.querySelectorAll('.' + sectionId);
    this.stickyHeader = document.getElementById('stickyHeader');
    this.setup();
}

LinkRef.prototype.getLinkValue = function (item) {
    return item.dataset.letter || item.id;
}

// 统一使用文档绝对坐标，避免 section 在不同父容器时 offsetTop 失真
LinkRef.prototype.getSectionTop = function (section) {
    return section.getBoundingClientRect().top + (window.pageYOffset || document.documentElement.scrollTop);
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
            // 拦掉 <a href="#xxx"> 的原生锚点跳转，否则它会先跳到 section 顶部（不扣 sticky 头高度），
            // 把下面 scrollToSection 算好的带偏移滚动冲掉，section 被卡在 sticky 头后面看不见。
            e.preventDefault();
            const value = this.getLinkValue(e.currentTarget);
            this.scrollToSection(value);
            if (window.history && window.history.replaceState) {
                window.history.replaceState(null, '', '#' + value);
            }
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

    // 深链接（#xxx 直接打开/刷新）：原生跳转不扣 sticky 头高度，section 会被顶部 sticky 头挡住。
    // 原生 hash 滚动可能在 load 之后才发生，这里在 load 之后再用带偏移的滚动纠正一次。
    if (window.location.hash && window.location.hash.length > 1) {
        const hashValue = decodeURIComponent(window.location.hash.slice(1));
        const hasSection = Array.prototype.some.call(this.sections, (s) => s.id === hashValue);
        if (hasSection) {
            const correct = () => this.scrollToSection(hashValue);
            // 原生 hash 滚动时机不定，多打几拍，最后一拍压在浏览器那次之后。
            [80, 250, 600].forEach((d) => setTimeout(correct, d));
            window.addEventListener('load', () => setTimeout(correct, 80), { once: true });
        }
    }
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
        const sectionTop = this.getSectionTop(section);
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
            const sectionTop = this.getSectionTop(section);
            if (scrollTop + offset >= sectionTop - 20) {
                activeSection = section;
            }
        });
    }

    // 如果还是没有找到，使用第一个section
    if (!activeSection && this.sections.length > 0 || scrollTop == 0) {
        activeSection = this.sections[0];
    }

    if (activeSection) {
        const sectionId = activeSection.id;
        this.updateNavigation(sectionId);
    }
}

// 更新导航高亮
LinkRef.prototype.updateNavigation = function (activeSectionId) {
    const linkRef = this;
    this.pageIndexs.forEach(function (item) {
        if (linkRef.getLinkValue(item) === activeSectionId) {
            item.classList.add('active');
            const isDesktopBrandIndex = item.closest('.brand-page-index-box') && window.innerWidth >= 769;
            if (!isDesktopBrandIndex) {
                item.scrollIntoView({behavior: "smooth", block: "nearest"});
            }
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
    const targetTop = this.getSectionTop(targetSection) - headerHeight;

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
