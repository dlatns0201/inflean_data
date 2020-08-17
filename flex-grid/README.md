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

## Grid
### 용어
1. Grid Container: `display: grid`를 선언하는 요소, 해당 요소 안의 자식들이 Grid 규칙의 영향을 받아 정렬된다.
2. Grid Item: Grid Container의 자식 요소들
3. Grid Track: Grid의 Row나 Column
4. Grid Cell: Grid Item과 다르게 Grid Line들로 구성된 하나의 정사각형 칸(Grid Item을 감싸고 있음)
5. Grid Line: Grid Cell을 구분하는 선
6. Grid Number: Grid Line의 각 번호
7. Grid Gap: Grid Cell 간의 간격
8. Grid Area: Grid 라인으로 둘러싼 사각형 영역, Grid Cell의 집합

- Container 속성-
grid-template-columns
grid-template-rows
repeat
minmax: (최소, 최대) 길이를 설정한다.
auto-fill: 개수만큼 알아서 채워준다. 개수가 모자라면 빈공간이 생긴다.
auto-fit: 개수가 모자라도 빈공간 없이 알아서 채워준다.

gap, row-gap, column-gap으로 사용하지만 옛날 브라우저(IE x) 지원을 위해 grid-gap을 위에 선언해놓을 수 있다.

grid-auto-columns
grid-auto-rows
위 두 석승은 grid-template-xxx 와 같이 사용될 수 있다.
grid-template-areas로 grid cell마다 이름을 주어줄 수 있다.
grid-auto-flow: Item이 자동 배치되는 흐름을 결정하는 속성 (row, column, dense, row-dense, column-dense)

align-items: Item을 Cell 안에서 Column(세로축) 방향으로 정렬한다.
justify-items: Item을 Cell 안에서 Row(가로축) 방향으로 정렬한다.
place-items로 align-items와 justify-items를 축약할 수 있다. 하나만 입력하면 두 속성에 똑같이 적용된다.
align-content, justify-content: align-items는 cell 안에서의 item들을 각각 정렬하였다면, 이 속성은 Cell들을 정렬한다.
place-content: align-content와 justify-content를 축약할 수 있다.


- Item 속성 -
grid-column(grid-column-start, grid-column-end)
grid-row(grid-row-start, grid-row-end)
grid-column과 grid-row는 끝 번호(end)가 몇 번째가 아닌 감싸고 있는 Grid Line의 번호가 와야 한다.
grid-row: 3 / 5; => 3-4, 4-5의 Line으로 둘러싼 영역 두개를 가리킨다.
grid-row: 3 / span 2; => 위와 똑같은 결과가 나온다.
이 속성들로 위치가 잡혀있으면 다른 것을 밀지 않고 남의 영역에 침범해 같은 영역에 위치할 수 있다.
grid-area는 item들에다 미리 정의한 grid-template-areas의 이름들을 요소에 지정해줄 수 있다.

align-self: container의 규칙을 무시하고 item에 column 방향(y축)의 정렬을 정할 수 있다.
justify-self: container의 규칙을 무시하고 item에 row 방향(x축)의 정렬을 정할 수 있다.
place-self: align-self와 justify-self을 축약할 수 있다.