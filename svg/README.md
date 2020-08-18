# SVG
## SVG 개요
- Scalable Vector Graphics
- 확장 가능한 백터 그래픽
- XML 기반의 2차원 그래픽
- DOM의 일부로써 각 개체별로 HTML 요소가 추가됨
- 백터이기 때문에, 이미지 크기에 상관 없이 선명하게 유지되고 모양이 많이 복잡하지 않을 경우 파일 용량도 작다.
- CSS와 js로 조작이 가능
- width, height가 큰 이미지 표현에 유리
- 하지만 모양이 복잡하고 개체수가 많으면 성능이 떨어짐

### Canvas와 비교
- Canvas는 비트맵 기반 그래픽(백터가 아님)
- 이미지나 비디오의 세세한 픽셀 조작이나 퍼포먼스가 중요한 이미지 조작에 사용됨
- `<canvas>` 단일 태그로만 표현할 수 있다.
- CSS로 접근이 불가능하고 JS로만 가능하다.
- 픽셀 단위의 조작이 가능해서 일반 HTML 요소로 불가능한 다양한 표현들이 가능
- Low Level API로 코딩량이 많고 까다로움
- 크기가 커질수록 성능이 떨어짐(백터는 크기가 아닌 요소의 개수)


## SVG 사용 방법
1. `<img>` 태그 사용
2. CSS Background 사용
3. inline 방식
    - svg 태그 안에 style을 넣는 경우 XML 파서에서의 오류 방지를 위해 다음과 같이 `<![CDATA[ ... ]]>`로 감싸준다.
    ```htmlmixed=
    <style>
    <![CDATA[
        ...style
    ]]
    </style>
    ]]>
    ```
5. `<object>` 태그 사용
    ```htmlmixed
    <object data="img/face.svg" type="image/svg+xml"></object>
    ```
    
## SVG 크기
- 기본적으로 width가 300px이다.
- svg 태그 속성으로 viewBox를 설정하면 svg 크기를 상대 크기로 정할 수 있다.
    ```htmlmixed=
    <svg viewBox="0 0 1000 1000">
        <style>
            svg {
                width: 500px;
                height: 500px;
                background: #ddd;
            }
        </style>
        <rect x="0" y="0" width="100" height="100"></rect>
    </svg>
    ```
    ![](https://i.imgur.com/Sn42x7V.png)
    - 이 상태에서 rect의 width와 height 수치를 바꾸면 svg 크기는 그대로지만 사각형의 크기가 변경된다.
    ```htmlmixed=
    <svg viewBox="0 0 1000 1000">
        <rect x="0" y="0" width="900" height="900"></rect>
    </svg>
    ```
    ![](https://i.imgur.com/dOvEBzo.png)
    - 이번에는 rect의 viewBox를 처음 그대로 width=100, height=100 으로 두고 viewBox의 크기를 변경한다.
    ```htmlmixed
    <svg viewBox="0 0 200 200">
        <rect x="0" y="0" width="100" height="100"></rect>
    </svg>
    ```
    ![](https://i.imgur.com/Pp77QHt.png)

## SVG 변경하기
- svg 요소내 채우기 효과는 background-color가 아닌 fill 이라는 속성을 사용한다.
- transform의 origin은 기본 갑으로 svg의 시작 지점(0,0) 으로 설정되어 있다.
- stroke으로 테두리의 색을 지정해줄 수 있다.
- stroke-width로 테두리 두께를 지정해줄 수 있다.
- svg 내에서 transform을 적용할 때 주의할 것은 transform-origin이 svg의 좌측 상단의 점이 기준이다.
