document.addEventListener('DOMContentLoaded', function () {
  var q = function (s, c) { return (c || document).querySelector(s); };
  var qa = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  if (window.Swiper && q('.hero__swiper')) {
    new Swiper('.hero__swiper', {
      loop: true,
      speed: 950,
      effect: 'fade',
      autoplay: { delay: 5200, disableOnInteraction: false },
      pagination: { el: '.hero__pagination', clickable: true }
    });
  }

  qa('.tabs__button').forEach(function (button) {
    button.addEventListener('click', function () {
      var category = button.dataset.category;
      qa('.tabs__button').forEach(function (item) { item.classList.remove('is-active'); });
      button.classList.add('is-active');
      qa('.product-card[data-category]').forEach(function (card) {
        card.hidden = category !== 'all' && card.dataset.category !== category;
      });
    });
  });

  qa('.product-card__wish').forEach(function (button) {
    button.addEventListener('click', function (event) {
      event.preventDefault();
      button.classList.toggle('is-active');
      button.setAttribute('aria-pressed', button.classList.contains('is-active'));
    });
  });

  var deadline = new Date();
  deadline.setDate(deadline.getDate() + 3);
  deadline.setHours(23, 59, 59, 999);
  function renderTimer() {
    var remaining = Math.max(0, deadline.getTime() - Date.now());
    var values = {
      days: Math.floor(remaining / 86400000),
      hours: Math.floor(remaining / 3600000) % 24,
      minutes: Math.floor(remaining / 60000) % 60,
      seconds: Math.floor(remaining / 1000) % 60
    };
    Object.keys(values).forEach(function (key) {
      var el = q('[data-timer="' + key + '"]');
      if (el) el.textContent = String(values[key]).padStart(2, '0');
    });
  }
  renderTimer();
  window.setInterval(renderTimer, 1000);

  var topButton = q('.top-button');
  if (topButton) {
    window.addEventListener('scroll', function () { topButton.classList.toggle('is-visible', window.scrollY > 500); }, { passive: true });
    topButton.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });
  }

  var menu = q('.mobile-menu');
  function toggleMenu(open) {
    if (!menu) return;
    menu.classList.toggle('is-open', open);
    document.body.classList.toggle('is-locked', open);
  }
  var menuOpen = q('.site-header__mobile-button');
  var menuClose = q('.mobile-menu__close');
  if (menuOpen) menuOpen.addEventListener('click', function () { toggleMenu(true); });
  if (menuClose) menuClose.addEventListener('click', function () { toggleMenu(false); });

  qa('.accordion__button').forEach(function (button) {
    button.addEventListener('click', function () {
      var item = button.parentElement;
      item.classList.toggle('is-open');
      button.setAttribute('aria-expanded', item.classList.contains('is-open'));
    });
  });

  qa('.option__button').forEach(function (button) {
    button.addEventListener('click', function () {
      qa('.option__button', button.parentElement).forEach(function (item) { item.classList.remove('is-active'); });
      button.classList.add('is-active');
    });
  });

  qa('[data-quantity]').forEach(function (wrap) {
    var input = q('input', wrap);
    qa('button', wrap).forEach(function (button) {
      button.addEventListener('click', function () {
        var next = Number(input.value) + (button.dataset.action === 'plus' ? 1 : -1);
        input.value = Math.max(1, next);
      });
    });
  });
});
