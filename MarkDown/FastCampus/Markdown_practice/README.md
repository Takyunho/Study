마크다운 연습

=> 깃허브에서 README라는 md 파일을 찾도록 설정되어 있기 때문에 다른 이름으로 바꾸는 것은 권장되지 않는다.

# 제목(Header)

# 제목 1

## 제목 2

### 제목 3

#### 제목 4

##### 제목 5

###### 제목 6

=> #을쓰고 띄어쓴 다음에 글자입력하면 제목이 됨

# 문장(Paragraph)

가나다라마바사아자차카타파하 그리고
하파타카차자아사바마라다나가

=> 그냥 쭉 이어쓰면 된다.

# 줄바꿈(Line Breaks)

동해물과 백두산이 마르고 닳도록  
하느님이 보우하사 우리나라 만세  
무궁화 삼천리 화려 강산<br/>
대한 사람 대한으로 길이 보전하세  

=> 띄어쓰기를 두번 하면 된다. <br/>
=> 그러나 마크다운 환경에 따라 적용이 안되는 경우도 있으므로 <br/>
br태그를 이용해서 띄워주는게 낫다.

# 강조(Emphasis)

_이텔릭체_ <br/>

**두껍게 글씨쓰기**<br/>

**_이텔릭체 + 두껍게_**<br/>

~~취소선~~<br/>

<u>밑줄</u><br/>

# 목록(List)

1. 순서가 필요한 목록
1. 순서가 필요한 목록
    1. 서브 목록
    1. 서브 목록
    1. 서브 목록
        1. 서브목록
        1. 서브목록
1. 순서가 필요한 목록

<br/>
-> 숫자 1번만 가지고도 자동으로 순서가 나열된다.
<br/>
<br/>

- 순서가 필요하지 않은 목록
- 순서가 필요하지 않은 목록
  - 순서가 필요하지 않은 목록
  - 순서가 필요하지 않은 목록
    - 순서가 필요하지 않은 목록
    - 순서가 필요하지 않은 목록
- 순서가 필요하지 않은 목록

# 링크(Links)

<a href="https://google.com">google</a>

[google](https://google.com)

<br/>
타이틀은 경로 다음 ""에다가 지정

<a href="https://naver.com" title="naver로 이동!">naver</a>

[naver](https://naver.com "naver로 이동!")

<br/>
markdown에서는 target="_blank" 속성이 적용되지 않음(원시html로 지정해야 함)
<br/>

<a href="https://naver.com" title="naver로 이동!" target="_blank">naver</a>

# 이미지(Images)

<p> 문법: ![대체텍스트](이미지링크주소) </p>

![대체텍스트](https://tistory1.daumcdn.net/tistory/3654586/attach/8a06417251284146839d9b31b22460e0)
<br/>
<br/>
<p> 문법: [이미지문법](링크주소) </p>
이미지에 링크를 넣고 싶으면?<br/>
앞에 느낌표 붙이지 말고 대괄호 사이에 이미지 전체 텍스트<br/>
그리고 소괄호에 링크주소<br/>
<br/>

[![대체텍스트](https://tistory1.daumcdn.net/tistory/3654586/attach/8a06417251284146839d9b31b22460e0)](https://funair1004.tistory.com/)

# 인용문(BlockQuote)

> 남의 말이나 글에서 직접 또는  
간접으로 따온 문장.  
> (네이버 국어 사전)

> 인용문 작성
>> 중첩도 가능하다
>>> 중중첩도 가능 1<br/>
>>> 중중첩도 가능 2  
>>> 중중첩도 가능 3  

# 인라인(inline) 코드 강조하기

CSS에서 `background` 혹은 `background-image` 속성으로  
요소에 배경 이미지를 삽입할 수 있습니다.

# 블록(block) 코드 강조하기

``` html
    <a href="https://naver.com" title="naver로 이동!" target="_blank">naver</a>
```

```css
li {
    color: #fff;
}
```

``` javascript
    const number = 1;
```

``` bash
git commit -m "마크다운 공부중"
```

```plaintext
그냥 문장을 강조하고 싶을때는
plaintext를 사용하네요
```

# 표(Table)

position 속성을 표로 나타내본다.

값 | 의미 | 기본값
-- | :--: | --:
static | 기준 없음 | O
relative | 요소 자신 | X
absolute | 위치 상 부모 요소 | X
fixed | 뷰포트 | X

```plaintext
-- | -- | -- 는 테이블의 head와 body를 구분해주는 용도이다.

글자 왼쪽 정렬하기 => -- (default)
글자 중앙 정렬하기 => :--:
글자 오른쪽 정렬하기 => --:
```

# 원시 HTML (Raw HTML)

동해물과 <u>백두산</u>이 마르고 닳도록<br/>
하느님이 <span style="text-decoration: underline;">보우하사</span> 우리나라 만세

```plaintext
markdown안에서 실제 html문법을 사용하는 것이 원시 html이라는 개념이다.

사용 예
1. a태그의 target 속성이 필요할 때
2. img 태그의 width를 지정하고 싶을 때
<img width="70" src="http://~~~" />

```

# 수평선(Horizontal Rule)

```plaintext
수평선은
1) ---
2) ***
3) ___ 으로 구성
중간에 띄어쓰기를 해도 상관없다. ( - - - 등)
```

---
* * *
___
