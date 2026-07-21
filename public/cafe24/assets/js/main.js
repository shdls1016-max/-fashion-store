document.addEventListener('DOMContentLoaded', function () {
  var q = function (selector, context) { return (context || document).querySelector(selector); };
  var qa = function (selector, context) { return Array.prototype.slice.call((context || document).querySelectorAll(selector)); };

  var catalogs = {
    new: [
      { category: 'clothing', categoryLabel: 'Clothing', name: 'Silk Draped Blouse', price: '₩128,000', badge: 'NEW 5%', front: 'product-1-front.jpg', alt: 'product-1-alt.jpg' },
      { category: 'bag', categoryLabel: 'Bag', name: 'Form Shoulder Bag', price: '₩189,000', badge: 'MUST HAVE', front: 'product-3-front.jpg', alt: 'product-3-alt.jpg' },
      { category: 'acc', categoryLabel: 'Jewelry', name: 'Liquid Silver Earrings', price: '₩72,000', badge: 'NEW 5%', front: 'product-4-front.jpg', alt: 'product-4-alt.jpg' },
      { category: 'clothing', categoryLabel: 'Clothing', name: 'Contour Wide Trousers', price: '₩148,000', badge: 'PRE-ORDER', front: 'product-2-front.jpg', alt: 'product-2-alt.jpg' },
      { category: 'bag', categoryLabel: 'Bag', name: 'Mini Curve Bag', price: '₩158,000', badge: 'NEW 5%', front: 'instagram-3.jpg', alt: 'product-3-alt.jpg' },
      { category: 'acc', categoryLabel: 'Shoes', name: 'Soft Pointed Slingback', price: '₩168,000', badge: 'PRE-ORDER', front: 'instagram-5.jpg', alt: 'product-4-alt.jpg' },
      { category: 'clothing', categoryLabel: 'Clothing', name: 'Essential Cotton Shirt', price: '₩118,000', badge: 'MUST HAVE', front: 'instagram-6.jpg', alt: 'instagram-1.jpg' },
      { category: 'bag', categoryLabel: 'Bag', name: 'Arc Daily Tote', price: '₩218,000', badge: 'NEW 5%', front: 'product-3-alt.jpg', alt: 'product-3-front.jpg' },
      { category: 'acc', categoryLabel: 'Jewelry', name: 'Sculpted Cuff Bracelet', price: '₩88,000', badge: 'MUST HAVE', front: 'instagram-2.jpg', alt: 'product-4-front.jpg' },
      { category: 'clothing', categoryLabel: 'Clothing', name: 'Single Breasted Blazer', price: '₩248,000', badge: 'PRE-ORDER', front: 'hero-secondary.png', alt: 'instagram-4.jpg' },
      { category: 'bag', categoryLabel: 'Bag', name: 'Soft Square Bag', price: '₩178,000', badge: 'MUST HAVE', front: 'instagram-1.jpg', alt: 'instagram-3.jpg' },
      { category: 'acc', categoryLabel: 'Jewelry', name: 'Drop Line Necklace', price: '₩82,000', badge: 'NEW 5%', front: 'product-4-alt.jpg', alt: 'instagram-2.jpg' }
    ],
    best: [
      { category: 'clothing', categoryLabel: 'Clothing', name: 'Contour Wide Trousers', price: '₩133,200', oldPrice: '₩148,000', sale: '10%', badge: 'BEST', front: 'product-2-front.jpg', alt: 'product-2-alt.jpg' },
      { category: 'bag', categoryLabel: 'Bag', name: 'Form Shoulder Bag', price: '₩189,000', badge: 'BEST', front: 'product-3-front.jpg', alt: 'product-3-alt.jpg' },
      { category: 'acc', categoryLabel: 'Jewelry', name: 'Liquid Silver Earrings', price: '₩72,000', badge: 'MUST HAVE', front: 'product-4-front.jpg', alt: 'product-4-alt.jpg' },
      { category: 'clothing', categoryLabel: 'Clothing', name: 'Silk Draped Blouse', price: '₩128,000', badge: 'BEST', front: 'product-1-front.jpg', alt: 'product-1-alt.jpg' },
      { category: 'bag', categoryLabel: 'Bag', name: 'Mini Curve Bag', price: '₩158,000', badge: 'BEST', front: 'instagram-3.jpg', alt: 'product-3-alt.jpg' },
      { category: 'acc', categoryLabel: 'Shoes', name: 'Soft Pointed Slingback', price: '₩168,000', badge: 'BEST', front: 'instagram-5.jpg', alt: 'product-4-alt.jpg' },
      { category: 'clothing', categoryLabel: 'Clothing', name: 'Essential Cotton Shirt', price: '₩118,000', badge: 'MUST HAVE', front: 'instagram-6.jpg', alt: 'instagram-1.jpg' },
      { category: 'bag', categoryLabel: 'Bag', name: 'Arc Daily Tote', price: '₩218,000', badge: 'MUST HAVE', front: 'product-3-alt.jpg', alt: 'product-3-front.jpg' },
      { category: 'acc', categoryLabel: 'Jewelry', name: 'Sculpted Cuff Bracelet', price: '₩88,000', badge: 'BEST', front: 'instagram-2.jpg', alt: 'product-4-front.jpg' },
      { category: 'clothing', categoryLabel: 'Clothing', name: 'Single Breasted Blazer', price: '₩248,000', badge: 'BEST', front: 'hero-secondary.png', alt: 'instagram-4.jpg' },
      { category: 'bag', categoryLabel: 'Bag', name: 'Soft Square Bag', price: '₩178,000', badge: 'BEST', front: 'instagram-1.jpg', alt: 'instagram-3.jpg' },
      { category: 'acc', categoryLabel: 'Jewelry', name: 'Drop Line Necklace', price: '₩82,000', badge: 'MUST HAVE', front: 'product-4-alt.jpg', alt: 'instagram-2.jpg' }
    ]
  };

  function productPrice(product) {
    var sale = product.sale ? '<span class="product-card__sale">' + product.sale + '</span>' : '';
    var oldPrice = product.oldPrice ? '<span class="product-card__price--old">' + product.oldPrice + '</span>' : '';
    return sale + product.price + oldPrice;
  }

  function productCard(product) {
    return '<article class="product-card" data-category="' + product.category + '">' +
      '<a class="product-card__link" href="product_detail.html">' +
        '<div class="product-card__image-wrapper">' +
          '<span class="product-card__label">' + product.badge + '</span>' +
          '<img class="product-card__image" src="assets/images/' + product.front + '" alt="' + product.name + ' 대표 이미지">' +
          '<img class="product-card__image product-card__image--alt" src="assets/images/' + product.alt + '" alt="' + product.name + ' 다른 각도 이미지">' +
        '</div>' +
        '<div class="product-card__info"><p class="product-card__category">' + product.categoryLabel + '</p><h3 class="product-card__name">' + product.name + '</h3><p class="product-card__price">' + productPrice(product) + '</p></div>' +
      '</a>' +
      '<button class="product-card__wish" type="button" aria-label="' + product.name + ' 위시리스트" aria-pressed="false">♡</button>' +
    '</article>';
  }

  function renderSection(section, category) {
    var catalog = catalogs[section.dataset.productSection] || [];
    var products = category === 'all' ? catalog.slice(0, 8) : catalog.filter(function (product) { return product.category === category; }).slice(0, 4);
    q('[data-product-grid]', section).innerHTML = products.map(productCard).join('');
  }

  qa('[data-product-section]').forEach(function (section) {
    renderSection(section, 'all');
    qa('.tabs__button', section).forEach(function (button) {
      button.addEventListener('click', function () {
        qa('.tabs__button', section).forEach(function (item) { item.classList.remove('is-active'); item.setAttribute('aria-selected', 'false'); });
        button.classList.add('is-active');
        button.setAttribute('aria-selected', 'true');
        renderSection(section, button.dataset.category);
      });
    });
  });

  document.addEventListener('click', function (event) {
    var button = event.target.closest('.product-card__wish');
    if (!button) return;
    button.classList.toggle('is-active');
    button.setAttribute('aria-pressed', String(button.classList.contains('is-active')));
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
    Object.keys(values).forEach(function (key) { var el = q('[data-timer="' + key + '"]'); if (el) el.textContent = String(values[key]).padStart(2, '0'); });
  }
  renderTimer();
  window.setInterval(renderTimer, 1000);

  var topButton = q('.top-button');
  if (topButton) {
    window.addEventListener('scroll', function () { topButton.classList.toggle('is-visible', window.scrollY > 500); }, { passive: true });
    topButton.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });
  }

  var menu = q('.mobile-menu');
  function toggleMenu(open) { if (!menu) return; menu.classList.toggle('is-open', open); document.body.classList.toggle('is-locked', open); }
  var menuOpen = q('.site-header__mobile-button');
  var menuClose = q('.mobile-menu__close');
  if (menuOpen) menuOpen.addEventListener('click', function () { toggleMenu(true); });
  if (menuClose) menuClose.addEventListener('click', function () { toggleMenu(false); });
});
