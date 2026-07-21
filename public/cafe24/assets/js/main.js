document.addEventListener('DOMContentLoaded', function () {
  var q = function (selector, context) { return (context || document).querySelector(selector); };
  var qa = function (selector, context) { return Array.prototype.slice.call((context || document).querySelectorAll(selector)); };

  var catalogs = {
    new: [
      { featured: true, category: 'clothing', categoryLabel: 'Clothing', name: 'Silk Draped Blouse', price: '₩121,600', oldPrice: '₩128,000', sale: '5%', badge: '5% OFF', front: 'new-clothing-1-front.jpg', alt: 'new-clothing-1-alt.jpg' },
      { featured: true, category: 'bag', categoryLabel: 'Bag', name: 'Structured Shoulder Bag', price: '₩189,000', front: 'new-bag-1-front.jpg', alt: 'new-bag-1-alt.jpg' },
      { featured: true, category: 'acc', categoryLabel: 'Jewelry', name: 'Sculptural Drop Earrings', price: '₩62,000', front: 'new-acc-1-front.jpg', alt: 'new-acc-1-alt.jpg' },
      { featured: true, category: 'clothing', categoryLabel: 'Clothing', name: 'Contour Tailored Trousers', price: '₩148,000', front: 'new-clothing-2-front.jpg', alt: 'new-clothing-2-alt.jpg' },
      { category: 'clothing', categoryLabel: 'Clothing', name: 'Essential Cotton Shirt', price: '₩118,000', front: 'new-clothing-3-front.jpg', alt: 'new-clothing-3-alt.jpg' },
      { category: 'clothing', categoryLabel: 'Clothing', name: 'Single Breasted Blazer', price: '₩248,000', front: 'new-clothing-4-front.jpg', alt: 'new-clothing-4-alt.jpg' },
      { category: 'bag', categoryLabel: 'Bag', name: 'Soft Hobo Bag', price: '₩178,000', front: 'new-bag-2-front.jpg', alt: 'new-bag-2-alt.jpg' },
      { category: 'bag', categoryLabel: 'Bag', name: 'Ivory Mini Top Handle', price: '₩150,100', oldPrice: '₩158,000', sale: '5%', badge: '5% OFF', front: 'new-bag-3-front.jpg', alt: 'new-bag-3-alt.jpg' },
      { category: 'bag', categoryLabel: 'Bag', name: 'Crescent Crossbody Bag', price: '₩168,000', front: 'new-bag-4-front.jpg', alt: 'new-bag-4-alt.jpg' },
      { category: 'acc', categoryLabel: 'Jewelry', name: 'Fine Drop Pendant', price: '₩58,000', front: 'new-acc-2-front.jpg', alt: 'new-acc-2-alt.jpg' },
      { category: 'acc', categoryLabel: 'Accessories', name: 'Minimal Leather Belt', price: '₩72,000', front: 'new-acc-3-front.jpg', alt: 'new-acc-3-alt.jpg' },
      { category: 'acc', categoryLabel: 'Accessories', name: 'Silk Trim Scarf', price: '₩68,000', front: 'new-acc-4-front.jpg', alt: 'new-acc-4-alt.jpg' }
    ],
    best: [
      { featured: true, category: 'clothing', categoryLabel: 'Clothing', name: 'Oatmeal Cropped Cardigan', price: '₩110,400', oldPrice: '₩138,000', sale: '20%', badge: 'SALE', front: 'best-clothing-1-front.jpg', alt: 'best-clothing-1-alt.jpg' },
      { featured: true, category: 'bag', categoryLabel: 'Bag', name: 'Essential Soft Tote', price: '₩198,000', front: 'best-bag-1-front.jpg', alt: 'best-bag-1-alt.jpg' },
      { featured: true, category: 'acc', categoryLabel: 'Jewelry', name: 'Petite Gold Hoops', price: '₩58,000', front: 'best-acc-1-front.jpg', alt: 'best-acc-1-alt.jpg' },
      { featured: true, category: 'clothing', categoryLabel: 'Clothing', name: 'Fluid Black Midi Dress', price: '₩188,000', front: 'best-clothing-2-front.jpg', alt: 'best-clothing-2-alt.jpg' },
      { category: 'clothing', categoryLabel: 'Clothing', name: 'Soft Taupe Knit Top', price: '₩128,000', front: 'best-clothing-3-front.jpg', alt: 'best-clothing-3-alt.jpg' },
      { category: 'clothing', categoryLabel: 'Clothing', name: 'Ivory Pleated Skirt', price: '₩158,000', front: 'best-clothing-4-front.jpg', alt: 'best-clothing-4-alt.jpg' },
      { category: 'bag', categoryLabel: 'Bag', name: 'Cream Bucket Bag', price: '₩168,000', front: 'best-bag-2-front.jpg', alt: 'best-bag-2-alt.jpg' },
      { category: 'bag', categoryLabel: 'Bag', name: 'East West Shoulder Bag', price: '₩178,000', front: 'best-bag-3-front.jpg', alt: 'best-bag-3-alt.jpg' },
      { category: 'bag', categoryLabel: 'Bag', name: 'Burgundy Mini Shoulder', price: '₩142,400', oldPrice: '₩178,000', sale: '20%', badge: 'SALE', front: 'best-bag-4-front.jpg', alt: 'best-bag-4-alt.jpg' },
      { category: 'acc', categoryLabel: 'Jewelry', name: 'Layered Pearl Necklace', price: '₩93,100', oldPrice: '₩98,000', sale: '5%', badge: '5% OFF', front: 'best-acc-2-front.jpg', alt: 'best-acc-2-alt.jpg' },
      { category: 'acc', categoryLabel: 'Accessories', name: 'Oval Frame Sunglasses', price: '₩88,000', front: 'best-acc-3-front.jpg', alt: 'best-acc-3-alt.jpg' },
      { category: 'acc', categoryLabel: 'Jewelry', name: 'Sculptural Silver Cuff', price: '₩78,000', front: 'best-acc-4-front.jpg', alt: 'best-acc-4-alt.jpg' }
    ]
  };

  function productPrice(product) {
    var sale = product.sale ? '<span class="product-card__sale">' + product.sale + '</span>' : '';
    var oldPrice = product.oldPrice ? '<span class="product-card__price--old">' + product.oldPrice + '</span>' : '';
    return sale + product.price + oldPrice;
  }

  function productCard(product) {
    var badge = product.badge ? '<span class="product-card__label">' + product.badge + '</span>' : '';
    return '<article class="product-card" data-category="' + product.category + '">' +
      '<a class="product-card__link" href="product_detail.html">' +
        '<div class="product-card__image-wrapper">' + badge +
          '<img class="product-card__image" src="assets/images/' + product.front + '" alt="' + product.name + ' 상품 이미지">' +
          '<img class="product-card__image product-card__image--alt" src="assets/images/' + product.alt + '" alt="' + product.name + ' 다른 각도 이미지">' +
        '</div>' +
        '<div class="product-card__info"><p class="product-card__category">' + product.categoryLabel + '</p><h3 class="product-card__name">' + product.name + '</h3><p class="product-card__price">' + productPrice(product) + '</p></div>' +
      '</a>' +
      '<button class="product-card__wish" type="button" aria-label="' + product.name + ' 위시리스트" aria-pressed="false">♡</button>' +
    '</article>';
  }

  function renderSection(section, category) {
    var catalog = catalogs[section.dataset.productSection] || [];
    var products = category === 'all'
      ? catalog.filter(function (product) { return product.featured; }).slice(0, 4)
      : catalog.filter(function (product) { return product.category === category; }).slice(0, 4);
    q('[data-product-grid]', section).innerHTML = products.map(productCard).join('');

    var viewAll = q('[data-view-all]', section);
    if (viewAll) {
      var sortMethod = section.dataset.productSection === 'new' ? '5' : '6';
      var categoryNumbers = { clothing: '24', bag: '25', acc: '26' };
      viewAll.href = 'product_list.html?sort_method=' + sortMethod + (categoryNumbers[category] ? '&cate_no=' + categoryNumbers[category] : '');
    }
  }

  qa('[data-product-section]').forEach(function (section) {
    renderSection(section, 'all');
    qa('.tabs__button', section).forEach(function (button) {
      button.addEventListener('click', function () {
        qa('.tabs__button', section).forEach(function (item) {
          item.classList.remove('is-active');
          item.setAttribute('aria-selected', 'false');
        });
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
    var body = document.body;

    if (open && !body.classList.contains('is-locked')) {
      var widthBeforeLock = document.documentElement.clientWidth;
      body.classList.add('is-locked');
      var widthAfterLock = document.documentElement.clientWidth;
      body.style.setProperty('--scrollbar-compensation', Math.max(0, widthAfterLock - widthBeforeLock) + 'px');
    } else if (!open) {
      body.classList.remove('is-locked');
      body.style.removeProperty('--scrollbar-compensation');
    }

    menu.classList.toggle('is-open', open);
    menu.setAttribute('aria-hidden', String(!open));
    if (menuOpen) menuOpen.setAttribute('aria-expanded', String(open));
  }
  var menuOpen = q('.site-header__mobile-button');
  var menuClose = q('.mobile-menu__close');
  if (menuOpen) menuOpen.addEventListener('click', function () { toggleMenu(true); });
  if (menuClose) menuClose.addEventListener('click', function () { toggleMenu(false); });
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && menu && menu.classList.contains('is-open')) toggleMenu(false);
  });
});
