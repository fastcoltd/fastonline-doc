function Carousel(domId, duration) {
  this.setup(domId, duration)
}
Carousel.prototype.setup = function (domId, duration) {
  // 手势滑动
  this.startX = 0;
  this.isTouching = false;
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
  // this.carouselTimer = setInterval(() => {
  //   that.goToSlide(that.index + 1);
  // }, this.timeInteval);
}

Carousel.prototype.stopCarouselTime = function () {
  if (this.carouselTimer) {
    clearInterval(this.carouselTimer);
    this.carouselTimer = null;
  }
}

Carousel.prototype.addCarouselEvent = function () {
  const that = this;
  this.carousel.addEventListener('touchstart', e => {
    that.startX = e.touches[0].clientX;
    that.isTouching = true;
    e.preventDefault();
    that.stopCarouselTime();
  });
  this.carousel.addEventListener('touchend', e => {
    e.preventDefault();
    if (!this.isTouching) return;
    const endX = e.changedTouches[0].clientX;
    if (Math.abs(endX - that.startX) > 50) {
      if (endX < that.startX) {
        that.goToSlide(that.index + 1); // 向左滑
      } else {
        that.goToSlide(that.index - 1); // 向右滑
      }
    }
    that.isTouching = false;
    that.startCarouselTime();
  });
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
    that.isTouching = false;
    that.startCarouselTime();
  });
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
