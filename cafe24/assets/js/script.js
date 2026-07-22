document.addEventListener('DOMContentLoaded', function () {
  'use strict';
  var q = function (selector, context) { return (context || document).querySelector(selector); };
  var qa = function (selector, context) { return Array.prototype.slice.call((context || document).querySelectorAll(selector)); };
  var store = window.ElaneStore;

  function initAnnouncement() {
    var banner = q('.announcement');
    if (!banner) return;
    var messages = [
      'Complimentary shipping on orders over ₩100,000',
      'New members enjoy 10% off the first order',
      'Same-day dispatch on orders placed before 1 PM'
    ];
    var index = 0;
    banner.setAttribute('aria-live', 'polite');
    banner.innerHTML = '<span class="announcement__message">' + messages[0] + '</span><button class="announcement__close" type="button" aria-label="상단 배너 닫기">×</button>';
    var message = q('.announcement__message', banner);
    var rotation = window.setInterval(function () {
      banner.classList.add('is-changing');
      window.setTimeout(function () {
        index = (index + 1) % messages.length;
        message.textContent = messages[index];
        banner.classList.remove('is-changing');
      }, 180);
    }, 4200);
    q('.announcement__close', banner).addEventListener('click', function () {
      window.clearInterval(rotation);
      banner.hidden = true;
      document.documentElement.classList.add('is-announcement-closed');
    });
  }
  initAnnouncement();

  function toast(message) {
    var element = q('.store-toast');
    if (!element) {
      element = document.createElement('div');
      element.className = 'store-toast';
      element.setAttribute('role', 'status');
      document.body.appendChild(element);
    }
    element.textContent = message;
    element.classList.add('is-visible');
    window.clearTimeout(toast.timer);
    toast.timer = window.setTimeout(function () { element.classList.remove('is-visible'); }, 1800);
  }

  function updateCounters() {
    qa('[data-cart-count]').forEach(function (element) {
      var count = store.cartCount();
      element.textContent = count;
      element.hidden = count === 0;
    });
    qa('[data-wish-count]').forEach(function (element) {
      var count = store.wishlist().length;
      element.textContent = count;
      element.hidden = count === 0;
    });
  }

  function syncWishButtons() {
    qa('[data-wish-id]').forEach(function (button) {
      var active = store.isWished(button.dataset.wishId);
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
      var icon = q('i', button);
      if (icon) icon.className = 'fa-' + (active ? 'solid' : 'regular') + ' fa-heart';
    });
  }

  document.addEventListener('click', function (event) {
    var wishButton = event.target.closest('[data-wish-id]');
    if (!wishButton) return;
    event.preventDefault();
    var active = store.toggleWish(wishButton.dataset.wishId);
    syncWishButtons();
    updateCounters();
    toast(active ? '위시리스트에 담았습니다.' : '위시리스트에서 삭제했습니다.');
    if (q('[data-wishlist-grid]')) renderWishlist();
  });
  document.addEventListener('elane:store-change', updateCounters);
  updateCounters();
  syncWishButtons();

  var topButton = q('.top-button');
  if (topButton) {
    window.addEventListener('scroll', function () { topButton.classList.toggle('is-visible', window.scrollY > 500); }, { passive: true });
    topButton.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });
  }

  var menu = q('.mobile-menu');
  var menuOpen = q('.site-header__mobile-button');
  function toggleMenu(open) {
    if (!menu) return;
    var body = document.body;
    if (open && !body.classList.contains('is-locked')) {
      var before = document.documentElement.clientWidth;
      body.classList.add('is-locked');
      body.style.setProperty('--scrollbar-compensation', Math.max(0, document.documentElement.clientWidth - before) + 'px');
    } else if (!open) {
      body.classList.remove('is-locked');
      body.style.removeProperty('--scrollbar-compensation');
    }
    menu.classList.toggle('is-open', open);
    menu.setAttribute('aria-hidden', String(!open));
    if (menuOpen) menuOpen.setAttribute('aria-expanded', String(open));
  }
  if (menuOpen) menuOpen.addEventListener('click', function () { toggleMenu(true); });
  var menuClose = q('.mobile-menu__close');
  if (menuClose) menuClose.addEventListener('click', function () { toggleMenu(false); });
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      toggleMenu(false);
      closeSearch();
    }
  });

  function ensureSearch() {
    var overlay = q('.search-panel');
    if (overlay) return overlay;
    overlay = document.createElement('section');
    overlay.className = 'search-panel';
    overlay.setAttribute('aria-hidden', 'true');
    overlay.innerHTML = '<div class="search-panel__inner"><button class="search-panel__close" type="button" aria-label="검색 닫기">×</button><p class="section__eyebrow">Search Élane</p><form class="search-panel__form"><label class="blind" for="site-search">상품 검색</label><input id="site-search" class="search-panel__input" name="q" type="search" placeholder="찾고 싶은 상품을 입력하세요" autocomplete="off"><button class="search-panel__submit" type="submit"><i class="fa-solid fa-arrow-right"></i><span class="blind">검색</span></button></form><p class="search-panel__hint">추천 검색어 · BLOUSE · BAG · JEWELRY</p></div>';
    document.body.appendChild(overlay);
    q('.search-panel__close', overlay).addEventListener('click', closeSearch);
    overlay.addEventListener('click', function (event) { if (event.target === overlay) closeSearch(); });
    q('form', overlay).addEventListener('submit', function (event) {
      event.preventDefault();
      var value = q('input', overlay).value.trim();
      if (value) window.location.href = 'product_list.html?q=' + encodeURIComponent(value);
    });
    return overlay;
  }
  function openSearch() {
    var overlay = ensureSearch();
    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');
    window.setTimeout(function () { q('input', overlay).focus(); }, 50);
  }
  function closeSearch() {
    var overlay = q('.search-panel');
    if (!overlay) return;
    overlay.classList.remove('is-open');
    overlay.setAttribute('aria-hidden', 'true');
  }
  qa('[data-search-open]').forEach(function (button) { button.addEventListener('click', openSearch); });

  function productListFilters() {
    var params = new URLSearchParams(window.location.search);
    var legacyCategories = { '24': 'clothing', '25': 'bag', '26': 'acc' };
    return {
      category: params.get('category') || legacyCategories[params.get('cate_no')] || 'all',
      collection: params.get('collection') || (params.get('sort_method') === '5' ? 'new' : params.get('sort_method') === '6' ? 'best' : 'all'),
      query: (params.get('q') || '').toLowerCase(),
      sort: params.get('sort') || 'newest'
    };
  }

  function renderProductList() {
    var grid = q('[data-list-grid]');
    if (!grid) return;
    var filters = productListFilters();
    var items = store.products.filter(function (product) {
      var categoryMatch = filters.category === 'all' || product.category === filters.category;
      var collectionMatch = filters.collection === 'all' || product.collections.indexOf(filters.collection) > -1;
      var queryMatch = !filters.query || (product.name + ' ' + product.categoryLabel).toLowerCase().indexOf(filters.query) > -1;
      return categoryMatch && collectionMatch && queryMatch;
    });
    var sortSelect = q('[data-list-sort]');
    var sortValue = sortSelect ? sortSelect.value : filters.sort;
    if (sortValue === 'low') items.sort(function (a, b) { return a.price - b.price; });
    if (sortValue === 'high') items.sort(function (a, b) { return b.price - a.price; });
    if (sortValue === 'best') items.sort(function (a, b) { return Number(b.collections.indexOf('best') > -1) - Number(a.collections.indexOf('best') > -1); });
    grid.innerHTML = items.length ? items.map(function (product) { return store.cardMarkup(product, 'h2'); }).join('') : '<div class="empty-state empty-state--wide"><i class="fa-regular fa-face-meh"></i><h2>검색 결과가 없습니다.</h2><p>다른 카테고리나 검색어로 다시 찾아보세요.</p><a class="button button--outline" href="product_list.html">전체 상품 보기</a></div>';
    var count = q('[data-list-count]');
    if (count) count.textContent = items.length + ' ITEMS';
    qa('[data-list-category]').forEach(function (link) {
      link.classList.toggle('is-active', link.dataset.listCategory === filters.category && filters.collection === 'all');
    });
    var newLink = q('[data-list-collection="new"]');
    if (newLink) newLink.classList.toggle('is-active', filters.collection === 'new');
    var title = q('[data-list-title]');
    if (title) title.textContent = filters.query ? 'Search' : filters.collection === 'new' ? 'New Arrivals' : filters.collection === 'best' ? 'Weekly Best' : filters.category === 'all' ? 'Shop' : filters.category.charAt(0).toUpperCase() + filters.category.slice(1);
    syncWishButtons();
  }
  if (q('[data-list-grid]')) {
    var listSort = q('[data-list-sort]');
    if (listSort) {
      var initialSort = productListFilters().sort;
      listSort.value = initialSort;
      listSort.addEventListener('change', renderProductList);
    }
    renderProductList();
  }

  function renderWishlist() {
    var grid = q('[data-wishlist-grid]');
    if (!grid) return;
    var items = store.wishlist().map(store.findProduct).filter(Boolean);
    var count = q('[data-wishlist-count]');
    if (count) count.textContent = items.length + ' ITEMS';
    grid.innerHTML = items.length ? items.map(function (product) { return store.cardMarkup(product, 'h2'); }).join('') : '<div class="empty-state empty-state--wide"><i class="fa-regular fa-heart"></i><h2>아직 찜한 상품이 없습니다.</h2><p>마음에 드는 상품의 하트를 눌러 모아보세요.</p><a class="button" href="product_list.html">상품 둘러보기</a></div>';
    syncWishButtons();
  }
  renderWishlist();

  function renderDetail() {
    var root = q('[data-product-detail]');
    if (!root) return;
    var id = new URLSearchParams(window.location.search).get('id') || store.products[0].id;
    var product = store.findProduct(id) || store.products[0];
    document.title = product.name + ' — ÉLANE';
    q('[data-detail-gallery]', root).innerHTML = '<img src="assets/images/' + product.front + '" alt="' + product.name + ' 정면"><img src="assets/images/' + product.alt + '" alt="' + product.name + ' 다른 각도">';
    q('[data-detail-category]', root).textContent = 'ÉLANE / ' + product.categoryLabel.toUpperCase();
    q('[data-detail-name]', root).textContent = product.name;
    q('[data-detail-price]', root).innerHTML = (product.sale ? '<span class="product-card__sale">' + product.sale + '</span>' : '') + store.money(product.price) + (product.oldPrice ? '<span class="product-card__price--old">' + store.money(product.oldPrice) + '</span>' : '');
    q('[data-detail-description]', root).textContent = product.description;
    var wishButton = q('[data-detail-wish]', root);
    wishButton.dataset.wishId = product.id;
    q('[data-add-cart]', root).dataset.productId = product.id;
    var related = q('[data-related-grid]');
    if (related) related.innerHTML = store.products.filter(function (item) { return item.id !== product.id && item.category === product.category; }).slice(0, 4).map(function (item) { return store.cardMarkup(item); }).join('');
    syncWishButtons();
  }
  renderDetail();

  qa('.option__button').forEach(function (button) {
    button.addEventListener('click', function () {
      qa('.option__button', button.parentElement).forEach(function (item) { item.classList.toggle('is-active', item === button); });
    });
  });
  qa('.accordion__button').forEach(function (button) {
    button.addEventListener('click', function () {
      var item = button.parentElement;
      item.classList.toggle('is-open');
      button.setAttribute('aria-expanded', String(item.classList.contains('is-open')));
      var symbol = q('span', button);
      if (symbol) symbol.textContent = item.classList.contains('is-open') ? '−' : '+';
    });
  });
  var addCart = q('[data-add-cart]');
  if (addCart) addCart.addEventListener('click', function () {
    var selections = qa('.option__button.is-active').map(function (button) { return button.textContent.trim(); });
    store.addToCart(addCart.dataset.productId, selections.join(' / ') || 'One size');
    updateCounters();
    toast('장바구니에 담았습니다.');
    addCart.textContent = 'Added to bag';
    window.setTimeout(function () { addCart.textContent = 'Add to bag'; }, 1600);
  });

  function renderCart() {
    var body = q('[data-cart-body]');
    if (!body) return;
    var items = store.cart();
    var subtotal = 0;
    body.innerHTML = items.map(function (item) {
      var product = store.findProduct(item.id);
      if (!product) return '';
      subtotal += product.price * item.quantity;
      return '<tr data-cart-row data-product-id="' + product.id + '" data-option="' + item.option + '"><td><a class="cart-table__product" href="product_detail.html?id=' + product.id + '"><img class="cart-table__image" src="assets/images/' + product.front + '" alt="' + product.name + '"><div><p class="cart-table__name">' + product.name + '</p><p class="cart-table__option">' + item.option + '</p></div></a></td><td>' + store.money(product.price) + '</td><td><div class="quantity"><button type="button" data-cart-action="minus" aria-label="수량 줄이기">−</button><input value="' + item.quantity + '" readonly aria-label="수량"><button type="button" data-cart-action="plus" aria-label="수량 늘리기">+</button></div></td><td data-row-total>' + store.money(product.price * item.quantity) + '</td><td><button type="button" data-cart-action="remove" aria-label="삭제">×</button></td></tr>';
    }).join('');
    var empty = q('[data-cart-empty]');
    if (empty) empty.hidden = items.length > 0;
    var content = q('[data-cart-content]');
    if (content) content.hidden = items.length === 0;
    qa('[data-cart-subtotal]').forEach(function (element) { element.textContent = store.money(subtotal); });
    var shipping = subtotal === 0 || subtotal >= 100000 ? 0 : 3000;
    var shippingElement = q('[data-cart-shipping]');
    if (shippingElement) shippingElement.textContent = shipping ? store.money(shipping) : '₩0';
    var total = q('[data-cart-total]');
    if (total) total.textContent = store.money(subtotal + shipping);
    var checkout = q('[data-checkout-link]');
    if (checkout) checkout.classList.toggle('is-disabled', items.length === 0);
    updateCounters();
  }
  document.addEventListener('click', function (event) {
    var button = event.target.closest('[data-cart-action]');
    if (!button) return;
    var row = button.closest('[data-cart-row]');
    var item = store.cart().find(function (entry) { return entry.id === row.dataset.productId && entry.option === row.dataset.option; });
    if (!item) return;
    if (button.dataset.cartAction === 'remove') store.removeFromCart(item.id, item.option);
    else store.updateCart(item.id, item.option, item.quantity + (button.dataset.cartAction === 'plus' ? 1 : -1));
    renderCart();
  });
  renderCart();

  function renderCheckout() {
    var list = q('[data-checkout-items]');
    if (!list) return;
    var items = store.cart();
    var subtotal = 0;
    list.innerHTML = items.map(function (item) {
      var product = store.findProduct(item.id);
      if (!product) return '';
      subtotal += product.price * item.quantity;
      return '<div class="checkout-item"><img src="assets/images/' + product.front + '" alt="' + product.name + '"><div><strong>' + product.name + '</strong><span>' + item.option + ' · QTY ' + item.quantity + '</span></div><b>' + store.money(product.price * item.quantity) + '</b></div>';
    }).join('');
    var total = q('[data-checkout-total]');
    if (total) total.textContent = store.money(subtotal + (subtotal && subtotal < 100000 ? 3000 : 0));
    var empty = q('[data-checkout-empty]');
    if (empty) empty.hidden = items.length > 0;
    var form = q('[data-checkout-form]');
    if (form) form.hidden = items.length === 0;
  }
  var checkoutForm = q('[data-checkout-form]');
  if (checkoutForm) checkoutForm.addEventListener('submit', function (event) {
    event.preventDefault();
    if (!checkoutForm.checkValidity()) return checkoutForm.reportValidity();
    var orders = store.read(store.keys.orders, []);
    orders.unshift({ number: 'EL' + Date.now().toString().slice(-10), date: new Date().toISOString(), items: store.cart() });
    store.write(store.keys.orders, orders);
    store.write(store.keys.cart, []);
    checkoutForm.hidden = true;
    var success = q('[data-order-success]');
    success.hidden = false;
    q('[data-order-number]', success).textContent = orders[0].number;
    updateCounters();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  renderCheckout();

  qa('[data-mypage-tab]').forEach(function (button) {
    button.addEventListener('click', function () {
      var panelName = button.dataset.mypageTab;
      qa('[data-mypage-tab]').forEach(function (item) { item.classList.toggle('is-active', item === button); });
      qa('[data-mypage-panel]').forEach(function (panel) { panel.hidden = panel.dataset.mypagePanel !== panelName; });
    });
  });
});
