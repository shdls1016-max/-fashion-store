(function () {
  'use strict';

  var products = [
    { id: 'silk-draped-blouse', name: 'Silk Draped Blouse', category: 'clothing', categoryLabel: 'Clothing', price: 121600, oldPrice: 128000, sale: '5%', badge: '5% OFF', front: 'new-clothing-1-front.jpg', alt: 'new-clothing-1-alt.jpg', collections: ['new'], featuredNew: true, description: '은은한 광택과 유연한 드레이프가 돋보이는 블라우스입니다. 여유 있는 실루엣으로 낮부터 저녁까지 자연스럽게 이어집니다.' },
    { id: 'structured-shoulder-bag', name: 'Structured Shoulder Bag', category: 'bag', categoryLabel: 'Bag', price: 189000, front: 'new-bag-1-front.jpg', alt: 'new-bag-1-alt.jpg', collections: ['new'], featuredNew: true, description: '단정한 구조감과 부드러운 곡선을 함께 담은 데일리 숄더백입니다.' },
    { id: 'sculptural-drop-earrings', name: 'Sculptural Drop Earrings', category: 'acc', categoryLabel: 'Jewelry', price: 62000, front: 'new-acc-1-front.jpg', alt: 'new-acc-1-alt.jpg', collections: ['new'], featuredNew: true, description: '얼굴선을 따라 은은하게 빛나는 가벼운 드롭 이어링입니다.' },
    { id: 'contour-tailored-trousers', name: 'Contour Tailored Trousers', category: 'clothing', categoryLabel: 'Clothing', price: 148000, front: 'new-clothing-2-front.jpg', alt: 'new-clothing-2-alt.jpg', collections: ['new'], featuredNew: true, description: '정교한 허리선과 유연한 와이드 실루엣이 돋보이는 테일러드 팬츠입니다.' },
    { id: 'essential-cotton-shirt', name: 'Essential Cotton Shirt', category: 'clothing', categoryLabel: 'Clothing', price: 118000, front: 'new-clothing-3-front.jpg', alt: 'new-clothing-3-alt.jpg', collections: ['new'], description: '바스락한 고밀도 코튼으로 완성한 여유로운 에센셜 셔츠입니다.' },
    { id: 'single-breasted-blazer', name: 'Single Breasted Blazer', category: 'clothing', categoryLabel: 'Clothing', price: 248000, front: 'new-clothing-4-front.jpg', alt: 'new-clothing-4-alt.jpg', collections: ['new'], description: '절제된 어깨선과 가벼운 착용감의 싱글 브레스티드 블레이저입니다.' },
    { id: 'soft-hobo-bag', name: 'Soft Hobo Bag', category: 'bag', categoryLabel: 'Bag', price: 178000, front: 'new-bag-2-front.jpg', alt: 'new-bag-2-alt.jpg', collections: ['new'], description: '자연스럽게 흐르는 형태와 넉넉한 수납력을 갖춘 호보백입니다.' },
    { id: 'ivory-mini-top-handle', name: 'Ivory Mini Top Handle', category: 'bag', categoryLabel: 'Bag', price: 150100, oldPrice: 158000, sale: '5%', badge: '5% OFF', front: 'new-bag-3-front.jpg', alt: 'new-bag-3-alt.jpg', collections: ['new'], description: '크림 아이보리 컬러와 간결한 핸들이 조화를 이루는 미니백입니다.' },
    { id: 'crescent-crossbody-bag', name: 'Crescent Crossbody Bag', category: 'bag', categoryLabel: 'Bag', price: 168000, front: 'new-bag-4-front.jpg', alt: 'new-bag-4-alt.jpg', collections: ['new'], description: '몸을 따라 편안하게 감기는 초승달 형태의 크로스바디 백입니다.' },
    { id: 'fine-drop-pendant', name: 'Fine Drop Pendant', category: 'acc', categoryLabel: 'Jewelry', price: 58000, front: 'new-acc-2-front.jpg', alt: 'new-acc-2-alt.jpg', collections: ['new'], description: '얇은 체인과 작은 드롭 장식으로 완성한 섬세한 펜던트입니다.' },
    { id: 'minimal-leather-belt', name: 'Minimal Leather Belt', category: 'acc', categoryLabel: 'Accessories', price: 72000, front: 'new-acc-3-front.jpg', alt: 'new-acc-3-alt.jpg', collections: ['new'], description: '매끈한 천연가죽과 작은 버클로 룩을 정돈하는 미니멀 벨트입니다.' },
    { id: 'silk-trim-scarf', name: 'Silk Trim Scarf', category: 'acc', categoryLabel: 'Accessories', price: 68000, front: 'new-acc-4-front.jpg', alt: 'new-acc-4-alt.jpg', collections: ['new'], description: '부드러운 실크 촉감과 그래픽 트리밍이 돋보이는 스카프입니다.' },
    { id: 'oatmeal-cropped-cardigan', name: 'Oatmeal Cropped Cardigan', category: 'clothing', categoryLabel: 'Clothing', price: 110400, oldPrice: 138000, sale: '20%', badge: 'SALE', front: 'best-clothing-1-front.jpg', alt: 'best-clothing-1-alt.jpg', collections: ['best'], featuredBest: true, description: '포근한 오트밀 컬러와 단정한 크롭 비율의 데일리 카디건입니다.' },
    { id: 'essential-soft-tote', name: 'Essential Soft Tote', category: 'bag', categoryLabel: 'Bag', price: 198000, front: 'best-bag-1-front.jpg', alt: 'best-bag-1-alt.jpg', collections: ['best'], featuredBest: true, description: '부드러운 가죽과 넓은 수납공간을 갖춘 에센셜 토트백입니다.' },
    { id: 'petite-gold-hoops', name: 'Petite Gold Hoops', category: 'acc', categoryLabel: 'Jewelry', price: 58000, front: 'best-acc-1-front.jpg', alt: 'best-acc-1-alt.jpg', collections: ['best'], featuredBest: true, description: '매일 부담 없이 착용할 수 있는 작은 골드 후프 이어링입니다.' },
    { id: 'fluid-black-midi-dress', name: 'Fluid Black Midi Dress', category: 'clothing', categoryLabel: 'Clothing', price: 188000, front: 'best-clothing-2-front.jpg', alt: 'best-clothing-2-alt.jpg', collections: ['best'], featuredBest: true, description: '움직임에 따라 유연하게 흐르는 블랙 미디 드레스입니다.' },
    { id: 'soft-taupe-knit-top', name: 'Soft Taupe Knit Top', category: 'clothing', categoryLabel: 'Clothing', price: 128000, front: 'best-clothing-3-front.jpg', alt: 'best-clothing-3-alt.jpg', collections: ['best'], description: '차분한 토프 컬러와 부드러운 촉감의 슬림 니트 톱입니다.' },
    { id: 'ivory-pleated-skirt', name: 'Ivory Pleated Skirt', category: 'clothing', categoryLabel: 'Clothing', price: 158000, front: 'best-clothing-4-front.jpg', alt: 'best-clothing-4-alt.jpg', collections: ['best'], description: '섬세한 플리츠가 걸음마다 가볍게 움직이는 아이보리 스커트입니다.' },
    { id: 'cream-bucket-bag', name: 'Cream Bucket Bag', category: 'bag', categoryLabel: 'Bag', price: 168000, front: 'best-bag-2-front.jpg', alt: 'best-bag-2-alt.jpg', collections: ['best'], description: '유연한 크림 가죽과 실용적인 수납력을 갖춘 버킷백입니다.' },
    { id: 'east-west-shoulder-bag', name: 'East West Shoulder Bag', category: 'bag', categoryLabel: 'Bag', price: 178000, front: 'best-bag-3-front.jpg', alt: 'best-bag-3-alt.jpg', collections: ['best'], description: '가로로 긴 비율과 간결한 스트랩이 돋보이는 숄더백입니다.' },
    { id: 'soft-pointed-slingback', name: 'Soft Pointed Slingback', category: 'shoes', categoryLabel: 'Shoes', price: 168000, front: 'instagram-5.jpg', alt: 'hero-secondary.png', collections: ['best'], description: '낮은 굽과 부드러운 포인티드 토로 완성한 슬링백입니다.' },
    { id: 'burgundy-mini-shoulder', name: 'Burgundy Mini Shoulder', category: 'bag', categoryLabel: 'Bag', price: 142400, oldPrice: 178000, sale: '20%', badge: 'SALE', front: 'best-bag-4-front.jpg', alt: 'best-bag-4-alt.jpg', collections: ['best'], description: '깊은 버건디 컬러가 룩에 차분한 포인트를 더하는 미니 숄더백입니다.' },
    { id: 'layered-pearl-necklace', name: 'Layered Pearl Necklace', category: 'acc', categoryLabel: 'Jewelry', price: 93100, oldPrice: 98000, sale: '5%', badge: '5% OFF', front: 'best-acc-2-front.jpg', alt: 'best-acc-2-alt.jpg', collections: ['best'], description: '크기가 다른 진주를 섬세하게 연결한 레이어드 네크리스입니다.' },
    { id: 'oval-frame-sunglasses', name: 'Oval Frame Sunglasses', category: 'acc', categoryLabel: 'Accessories', price: 88000, front: 'best-acc-3-front.jpg', alt: 'best-acc-3-alt.jpg', collections: ['best'], description: '슬림한 오벌 프레임으로 완성한 감각적인 데일리 선글라스입니다.' },
    { id: 'sculptural-silver-cuff', name: 'Sculptural Silver Cuff', category: 'acc', categoryLabel: 'Jewelry', price: 78000, front: 'best-acc-4-front.jpg', alt: 'best-acc-4-alt.jpg', collections: ['best'], description: '매끄러운 곡면이 손목 위에서 은은하게 빛나는 실버 커프입니다.' }
  ];

  var keys = { wishlist: 'elane:wishlist', cart: 'elane:cart', orders: 'elane:orders' };

  function read(key, fallback) {
    try { return JSON.parse(window.localStorage.getItem(key)) || fallback; } catch (error) { return fallback; }
  }
  function write(key, value) {
    try { window.localStorage.setItem(key, JSON.stringify(value)); } catch (error) { /* Cafe24 preview can still render without storage. */ }
    document.dispatchEvent(new CustomEvent('elane:store-change', { detail: { key: key } }));
  }
  function money(value) { return '₩' + Number(value || 0).toLocaleString('ko-KR'); }
  function findProduct(id) { return products.find(function (product) { return product.id === id; }); }
  function wishlist() { return read(keys.wishlist, []); }
  function isWished(id) { return wishlist().indexOf(id) > -1; }
  function toggleWish(id) {
    var next = wishlist();
    next = next.indexOf(id) > -1 ? next.filter(function (item) { return item !== id; }) : next.concat(id);
    write(keys.wishlist, next);
    return next.indexOf(id) > -1;
  }
  function cart() { return read(keys.cart, []); }
  function addToCart(id, option) {
    var next = cart();
    var normalized = option || 'One size';
    var existing = next.find(function (item) { return item.id === id && item.option === normalized; });
    if (existing) existing.quantity += 1;
    else next.push({ id: id, option: normalized, quantity: 1 });
    write(keys.cart, next);
  }
  function updateCart(id, option, quantity) {
    var next = cart().map(function (item) {
      if (item.id === id && item.option === option) item.quantity = Math.max(1, Number(quantity) || 1);
      return item;
    });
    write(keys.cart, next);
  }
  function removeFromCart(id, option) {
    write(keys.cart, cart().filter(function (item) { return !(item.id === id && item.option === option); }));
  }
  function cartCount() { return cart().reduce(function (sum, item) { return sum + item.quantity; }, 0); }

  function cardMarkup(product, headingLevel) {
    var badge = product.badge ? '<span class="product-card__label">' + product.badge + '</span>' : '';
    var oldPrice = product.oldPrice ? '<span class="product-card__price--old">' + money(product.oldPrice) + '</span>' : '';
    var sale = product.sale ? '<span class="product-card__sale">' + product.sale + '</span>' : '';
    var heading = headingLevel || 'h3';
    var active = isWished(product.id);
    return '<article class="product-card" data-product-id="' + product.id + '" data-category="' + product.category + '">' +
      '<a class="product-card__link" href="product_detail.html?id=' + encodeURIComponent(product.id) + '">' +
      '<div class="product-card__image-wrapper">' + badge +
      '<img class="product-card__image" src="assets/images/' + product.front + '" alt="' + product.name + ' 상품 이미지">' +
      '<img class="product-card__image product-card__image--alt" src="assets/images/' + product.alt + '" alt="' + product.name + ' 다른 각도 이미지"></div>' +
      '<div class="product-card__info"><p class="product-card__category">' + product.categoryLabel + '</p><' + heading + ' class="product-card__name">' + product.name + '</' + heading + '><p class="product-card__price">' + sale + money(product.price) + oldPrice + '</p></div></a>' +
      '<button class="product-card__wish' + (active ? ' is-active' : '') + '" type="button" data-wish-id="' + product.id + '" aria-label="' + product.name + ' 찜하기" aria-pressed="' + active + '"><i class="fa-' + (active ? 'solid' : 'regular') + ' fa-heart"></i></button></article>';
  }

  window.ElaneStore = {
    products: products,
    keys: keys,
    money: money,
    findProduct: findProduct,
    wishlist: wishlist,
    isWished: isWished,
    toggleWish: toggleWish,
    cart: cart,
    addToCart: addToCart,
    updateCart: updateCart,
    removeFromCart: removeFromCart,
    cartCount: cartCount,
    cardMarkup: cardMarkup,
    read: read,
    write: write
  };
}());
