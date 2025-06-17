function Star(domId, value, readonly, onChange) {
  this.setup(domId, value, readonly, onChange);
}

Star.prototype.setup = function(domId, value, readonly, onChange) {
  this.max = 5;
  this.star = document.getElementById(domId);
  this.value = value;
  this.readonly = !!readonly;
  this.onChange = onChange || function () {};
  this.stars = this.star.querySelectorAll('.star');
  
  this.stars.forEach((star, index) => {
    if (!this.readonly) {
      this.attachEvents(star, index);
    }
    star.classList.toggle('readonly', this.readonly);
  })
  this.update(this.value);
}

Star.prototype.attachEvents = function (star, index) {
  const that = this;
  star.addEventListener('click', function (e) {
    that.update(index);
    that.onChange && that.onChange(index);
  })
}

Star.prototype.update = function (value) {
  this.stars.forEach((star, index) => {
    const fill = Math.min(1, Math.max(0, value - index));
    star.querySelector('::after');
    star.style.setProperty('--fill', fill * 100 + '%');
    star.style.setProperty('--fill-width', `${fill * 100}%`);
    // star.querySelector('::after').style.width = (fill * 100) + '%';
    star.classList.toggle('none', value < index);
  })
}
