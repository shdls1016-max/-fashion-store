document.addEventListener('DOMContentLoaded', function () {
  'use strict';
  var q = function (selector, context) { return (context || document).querySelector(selector); };
  var qa = function (selector, context) { return Array.prototype.slice.call((context || document).querySelectorAll(selector)); };
  var store = window.ElaneStore;

  function sectionProducts(sectionName, category) {
    var flag = sectionName === 'new' ? 'featuredNew' : 'featuredBest';
    var list = store.products.filter(function (product) { return product.collections.indexOf(sectionName) > -1; });
    if (category === 'all') return list.filter(function (product) { return product[flag]; }).slice(0, 4);
    return list.filter(function (product) { return product.category === category; }).slice(0, 4);
  }

  function renderSection(section, category) {
    var sectionName = section.dataset.productSection;
    var products = sectionProducts(sectionName, category);
    q('[data-product-grid]', section).innerHTML = products.map(function (product) { return store.cardMarkup(product); }).join('');
    var viewAll = q('[data-view-all]', section);
    if (viewAll) {
      var params = new URLSearchParams();
      params.set('collection', sectionName);
      if (category !== 'all') params.set('category', category);
      viewAll.href = 'product_list.html?' + params.toString();
    }
  }

  qa('[data-product-section]').forEach(function (section) {
    renderSection(section, 'all');
    qa('.tabs__button', section).forEach(function (button) {
      button.addEventListener('click', function () {
        qa('.tabs__button', section).forEach(function (item) {
          item.classList.toggle('is-active', item === button);
          item.setAttribute('aria-selected', String(item === button));
        });
        renderSection(section, button.dataset.category);
      });
    });
  });

  if (window.Swiper && q('.hero__swiper')) {
    new Swiper('.hero__swiper', { loop: true, speed: 950, effect: 'fade', autoplay: { delay: 5200, disableOnInteraction: false }, pagination: { el: '.hero__pagination', clickable: true } });
  }
  if (window.Swiper && q('.review__swiper')) {
    new Swiper('.review__swiper', { slidesPerView: 1, spaceBetween: 14, pagination: { el: '.review__pagination', clickable: true }, breakpoints: { 720: { slidesPerView: 2 }, 1100: { slidesPerView: 3 } } });
  }

  var deadline = new Date();
  deadline.setDate(deadline.getDate() + 3);
  deadline.setHours(23, 59, 59, 999);
  function renderTimer() {
    var remaining = Math.max(0, deadline.getTime() - Date.now());
    var values = { days: Math.floor(remaining / 86400000), hours: Math.floor(remaining / 3600000) % 24, minutes: Math.floor(remaining / 60000) % 60, seconds: Math.floor(remaining / 1000) % 60 };
    Object.keys(values).forEach(function (key) {
      var element = q('[data-timer="' + key + '"]');
      if (element) element.textContent = String(values[key]).padStart(2, '0');
    });
  }
  renderTimer();
  window.setInterval(renderTimer, 1000);
});
