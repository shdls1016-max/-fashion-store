# ÉLANE Cafe24 스킨 패키지

`cafe24/` 폴더는 카페24 디자인 편집기에 옮길 수 있는 독립형 원본입니다.

## 페이지 매핑

| 원본 파일 | 카페24 적용 화면 | 주요 모듈 |
|---|---|---|
| `index.html` | 쇼핑몰 메인 | `product_listmain_1`, `board_list_4`, `Layout_header` |
| `product_list.html` | 상품 분류 | `product_list`, `product_menupackage`, `product_listnormal` |
| `product_detail.html` | 상품 상세 | `product_detail`, `product_addimage` |
| `cart.html` | 장바구니 | `Order_BasketPackage`, `Order_normallist`, `Order_TotalSummary` |
| `mypage.html` | 마이쇼핑 / 주문조회 | `myshop_main`, `myshop_orderstate`, `myshop_asyncbenefit` |
| `lookbook.html` | 룩북 게시판 또는 추가 페이지 | `board_list_8` |

## 적용 순서

1. 카페24 관리자에서 사용할 디자인을 복사해 백업합니다.
2. `cafe24/assets/`를 디자인의 `/web/upload/elane/` 등에 업로드합니다.
3. 각 HTML의 `assets/` 경로를 업로드 위치(`/web/upload/elane/`)로 일괄 변경합니다.
4. 위 표에 맞춰 각 화면의 HTML을 디자인 편집기에 적용합니다.
5. 샘플 상품 카드는 카페24 반복 변수(`{$product_name}`, `{$product_price}`, `{$image_medium}`, `{$link_product_detail}` 등)로 교체합니다. `module` 속성과 BEM 클래스는 유지합니다.
6. 룩북은 게시판 8번을 기준으로 작성되어 있습니다. 실제 사용할 게시판 번호에 맞춰 모듈 번호를 변경합니다.

## 운영 전 체크

- 사업자 정보, 고객센터, 이용약관 및 개인정보처리방침 링크를 실제 값으로 교체합니다.
- 상품 옵션/총액 계산/결제 버튼은 카페24 기본 모듈의 버튼과 변수로 연결합니다.
- CDN 사용이 제한된 환경이라면 Google Fonts, Font Awesome, Swiper 파일을 자체 업로드 경로로 이동합니다.
- 생성형 실사 이미지는 모두 `cafe24/assets/images/`에 포함되어 있으며 SVG 플레이스홀더는 사용하지 않았습니다.
