function Carousel(domId, duration) {
  this.setup(domId, duration)
}
Carousel.prototype.setup = function (domId, duration) {
  // 手势滑动
  this.startX = 0;
  this.startY = 0;
  this.isTouching = false;
  this.isHorizontalSwipe = false;
  // 鼠标拖动（桌面）
  this.mouseStartX = 0;
  this.isMousing = false;
  this.timeInteval = duration * 1000;
  this.carousel = document.getElementById(domId);
  this.track = this.carousel.getElementsByClassName('carousel-track')[0];
  const slideList = this.track.querySelectorAll('.carousel-slide');
  this.indicator = this.carousel.getElementsByClassName('carousel-indicators')[0];
  this.dotList = this.indicator.querySelectorAll('.carousel-indicator');
  this.slideCount = slideList.length;
  this.index = this.slideCount > 1 ? 1 : 0; // 初始指向第一个实际 slide
  if (this.slideCount > 1) {
    const firstSlide = slideList[0].cloneNode(true);
    const lastSlide = slideList[slideList.length - 1].cloneNode(true);
    this.track.append(firstSlide);
    this.track.insertBefore(lastSlide, this.track.firstElementChild);
    const that = this;
    this.track.addEventListener('transitionend', () => {
      that.handleTransitionEnd();
    })
    this.startCarouselTime();
    // 点击指示器跳转
    this.dotList.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        that.startCarouselTime();
        that.goToSlide(i + 1);
      });
    });
    this.indicator.style.display = '';
    this.addCarouselEvent();
  } else {
    this.indicator.style.display = 'none';
  }
  // 初始化位置
  this.track.style.transition = 'none';
  this.track.style.transform = `translateX(-${this.index * this.carousel.offsetWidth}px)`;
}
Carousel.prototype.startCarouselTime = function () {
  if (this.slideCount <= 1) return;
  this.stopCarouselTime();
  const that = this;
  this.carouselTimer = setInterval(() => {
    that.goToSlide(that.index + 1);
  }, this.timeInteval);
}

Carousel.prototype.stopCarouselTime = function () {
  if (this.carouselTimer) {
    clearInterval(this.carouselTimer);
    this.carouselTimer = null;
  }
}

Carousel.prototype.addCarouselEvent = function () {
  const that = this;

  // 触摸开始
  this.carousel.addEventListener('touchstart', e => {
    that.startX = e.touches[0].clientX;
    that.startY = e.touches[0].clientY;
    that.isTouching = true;
    that.isHorizontalSwipe = false;
    // 不要在这里preventDefault，让页面可以正常响应
  }, { passive: true });

  // 触摸移动 - 判断滑动方向
  this.carousel.addEventListener('touchmove', e => {
    if (!that.isTouching) return;

    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    const deltaX = Math.abs(currentX - that.startX);
    const deltaY = Math.abs(currentY - that.startY);

    // 如果还没确定滑动方向且移动距离足够
    if (!that.isHorizontalSwipe && (deltaX > 10 || deltaY > 10)) {
      // 判断是横向滑动还是竖向滑动
      if (deltaX > deltaY && deltaX > 15) {
        // 横向滑动，阻止默认行为并停止自动播放
        that.isHorizontalSwipe = true;
        that.stopCarouselTime();
        e.preventDefault();
      } else if (deltaY > deltaX) {
        // 竖向滑动，取消触摸状态，让页面正常滚动
        that.isTouching = false;
        that.isHorizontalSwipe = false;
      }
    } else if (that.isHorizontalSwipe) {
      // 已确定为横向滑动，继续阻止默认行为
      e.preventDefault();
    }
  }, { passive: false });

  // 触摸结束
  this.carousel.addEventListener('touchend', e => {
    if (!that.isTouching || !that.isHorizontalSwipe) {
      that.isTouching = false;
      that.isHorizontalSwipe = false;
      return;
    }

    const endX = e.changedTouches[0].clientX;
    const deltaX = endX - that.startX;

    // 只有在明确的横向滑动且距离足够时才切换
    if (Math.abs(deltaX) > 50) {
      if (deltaX < 0) {
        that.goToSlide(that.index + 1); // 向左滑
      } else {
        that.goToSlide(that.index - 1); // 向右滑
      }
    }

    that.isTouching = false;
    that.isHorizontalSwipe = false;
    that.startCarouselTime();
  }, { passive: true });

  // 鼠标事件保持原样（桌面端）
  this.carousel.addEventListener('mousedown', e => {
    that.mouseStartX = e.clientX;
    that.isMousing = true;
    e.preventDefault();
    that.stopCarouselTime();
  });

  this.carousel.addEventListener('mouseup', e => {
    e.preventDefault();
    if (!that.isMousing) return;
    const mouseEndX = e.clientX;
    if (Math.abs(mouseEndX - that.mouseStartX) > 50) {
      if (mouseEndX < that.mouseStartX) {
        that.goToSlide(that.index + 1);
      } else {
        that.goToSlide(that.index - 1);
      }
    }
    that.isMousing = false;
    that.startCarouselTime();
  });

  // 窗口大小改变事件
  window.addEventListener('resize', () => {
    that.startCarouselTime();
    that.track.style.transition = 'none';
    that.track.style.transform = `translateX(-${that.index * that.carousel.offsetWidth}px)`;
  });
}

Carousel.prototype.updateIndicators = function (i) {
  if (this.slideCount <= 1) return;
  this.dotList.forEach((dot, idx) => {
    dot.classList.toggle('active', idx === i);
  });
}

Carousel.prototype.goToSlide = function (i) {
  this.track.style.transition = 'transform 0.25s ease-in-out';
  this.track.style.transform = `translateX(-${i * this.carousel.offsetWidth}px)`;
  this.index = i;
}

Carousel.prototype.handleTransitionEnd = function () {
  if (this.index <= 0) {
    this.track.style.transition = 'none';
    this.index = this.slideCount;
    this.track.style.transform = `translateX(-${this.index * this.carousel.offsetWidth}px)`;
  } else if (this.index >= this.slideCount + 1) {
    this.track.style.transition = 'none';
    this.index = 1;
    this.track.style.transform = `translateX(-${this.index * this.carousel.offsetWidth}px)`;
  }
  this.updateIndicators((this.index - 1 + this.slideCount) % this.slideCount);
}
