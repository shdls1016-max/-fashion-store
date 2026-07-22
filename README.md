# ÉLANE — Cafe24 Fashion Store

2030 여성을 위한 트렌디하고 미니멀한 무드의 Cafe24 HTML5 패션 스토어입니다.

## Live Preview

- [GitHub Pages](https://shdls1016-max.github.io/-fashion-store/)
- [Sites Preview](https://elane-seoul-fashion.shdls1016.chatgpt.site/cafe24/)

## Cafe24 Package

실제 Cafe24 등록용 정적 페이지와 공통 자산은 [`cafe24`](./cafe24) 폴더에 있습니다.

- `index.html`: 메인 페이지
- `product_list.html`: 상품 목록
- `product_detail.html`: 상품 상세
- `wishlist.html`: 로컬 저장 기반 위시리스트
- `cart.html`: 장바구니
- `checkout.html`: 주문서 및 주문 완료 데모
- `mypage.html`: 마이페이지 및 주문조회
- `lookbook.html`: 룩북 및 브랜드 스토리
- `assets/css/style.css`: BEM 기반 공통 스타일
- `assets/js/store.js`: 공통 상품·위시리스트·장바구니 데이터
- `assets/js/main.js`: 메인 전용 Vanilla JavaScript 인터랙션
- `assets/js/script.js`: 서브페이지 공통 인터랙션

## Local Preview

VS Code에서 `cafe24/index.html`을 우클릭한 뒤 **Open with Live Server**를 선택합니다.
또는 저장소 루트에서 아래 명령으로 정적 미리보기를 실행할 수 있습니다.

```bash
npx vite cafe24
```

GitHub Pages는 `main` 브랜치가 갱신될 때마다 `cafe24` 폴더를 자동으로 다시 배포합니다.
