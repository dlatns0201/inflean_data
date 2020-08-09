align-content 속성은 container에서 flex-wrap: wrap일 때 작동한다.
보조축을 기준으로 wrap으로 떨어진 요소와 원래 자리에 있던 요소간의 간격을 정해준다.

flex-grow는 default가 0이지만 flex-shrink는 1이다.
flex-grow는 ie에서 transition이 적용되지 않기 때문에 이같은 경우엔 width의 %로 해결하는 것이 좋다.

## 뷰포트 기술
- 뷰포트
  - 화면에서 실제 내용이 표시되는 영역
  - MDN: 현재 창에서 문서를 볼 수 있는 부분
  - 뷰포트가 적용되지 않으면 모바일 환경에서 PC 기준으로 제작된 웹페이지가 화면 기기에 맞게 뷰가 맞춰진다.
  - 그렇게 되면 스크롤 없이 화면을 한 번에 볼 수 있다는 장점이 있지만 콘텐츠들이 작아져 보기 힘들다는 단점이 있다.

### 뷰포트 태그 속성
```html
<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no">
```
- width: 뷰포트의 너비를 지정
  - device-width or 양수
  - 디바이스의 너비가 375px일 때, `width: device-width`을 사용하면 body의 기본 너비가 375px이 된다.
  - 만약, width 속성을 사용하지 않는 경우 브라우저의 기본 뷰포트를 사용한다(web-kit 기준 980px)
  - 크롬에서 확인한 결과, initial-scale의 값으로 실제 device-width의 배율만큼 body의 기본 너비가 결정된다.
  - 하지만 width 값이 initial-scale의 배율로 정해진 너비보다 커야만 width 값이 적용이 된다.
  - 네이버 메인, 검색 페이지 기준 1100px 기준으로 양옆에 여백이 오도록 수치가 설정됨
- height: 뷰포트의 높이를 지정
  - device-height or 양수
- initial-scale: 뷰포트의 초기 배율을 지정
  - 기본값은 1로, 양수가 들어가며 1보다 작은 값을 사용하면 축소된 페이지를 표시한다.
  - 1보다 큰 값을 사용하면 확대된 페이지를 표시한다.
- user-scalable: 뷰포트의 확대와 축소 여부를 지정한다.
  - 기본값은 yes로, no를 설정하면 사용자가 페이지를 확대할 수 없다.
- minimum-scale: 뷰포트의 최소 축소 비율을 지정한다.
  - 기본값은 0.25이다.
- maximum-scale: 뷰포트의 최대 확대 비율을 지정한다.
  - 기본값은 5.0이다.

### 스마트폰의 뷰포트 크기
- web-kit 기반의 브라우저: 980px
- 트라이던트 엔진(ie): 1024px
- firefox


## Flex
### Flex 지원 범위
- IE11~
- 사파리 7.0~(-webkit 접두사 필요)
- 안드로이드 4.4~
- flex order는 ie10부터 지원

### 제목을 뭐로 할까
- 플렉스 요소들마다 flex 값으로 개별적으로 증감을 설정하는 것은 추천하지 않는다.
- flex를 적용하면 기존의 div같은 block tag는 width가 부모의 너비만큼 차지 않는다. 그래서 안에 콘텐츠가 없으면 width는 0이 됨
- flex-basis는 기본값이 auto이며 auto일 땐 width 값이 flex-basis 값이 된다.
- IE11 에선 min-height가 적용되지 않기 때문에 flex-grow와 함께 사용할 때 조심해야 한다.
- order는 html의 순서를 바꾸지 않기 때문에 접근성을 고려해서 적용해야 한다.

## 미디어 쿼리
- 태블릿은 768px 기준
- PC는 960px or 1024px 기준
- 하지만 고정적인 너비를 기준으로 하지 않고 브라우저 크기를 줄였을 때 문제가 되는 해상도 크기를 기준으로 고려해야 한다.
- 화면이 커질수록 가변적인 콘텐츠들이 비대하게 커지는 문제가 발생할 수 있기 때문에 max-width 사용을 고려해야 한다.