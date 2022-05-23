/*
const h1 = document.querySelector("div.hello:first-child h1")

function handleTitleClick() {
  const activeClass = "active";
  if (h1.classList.contains(activeClass)) { // classList가 activeClass를 포함하고 있는지 확인
    h1.classList.remove(activeClass); 
  }
  else {
    h1.classList.add(activeClass);
  }
}

h1.addEventListener("click", handleTitleClick);
*/


/*
classList 우리가 class들의 목록으로 작업할수 있게끔 허용해준다.
className은 이전calss를 상관하지않고 모든걸 교체해 버린다.

classList를 이용하는건
js에서 건드리는건 HTML element가 가지고있는 또하나의 요소 사용하는 것이다.
= element의 class내용물을 조작하는 것을 허용한다는 뜻

contains은 우리가 명시한 class가 HTML element의 class에 포함되어 있는지 말해준다

toggle은 토큰이 존재하면 토큰제거
토큰존재 하지않으면 토큰 추가

ex)
toggle은 h1의 classList에 clicked class가 이미있는지 확인하여
만약있다면 toggle 이 clicked를 제거해준다
만약 class name이 존재하지 않는다면 toggle은 classname 추가
*/

const h1 = document.querySelector("div.hello:first-child h1")

function handleTitleClick() {
  h1.classList.toggle("active");  //toggle은 h1의 classList에 active가 이미 있는지 확인해서
  // 만약 있다면, toggle이 active를 제거해주고, 만약 없다면 active를 추가해줌
}

h1.addEventListener("click", handleTitleClick);

// className, classList, if, else, contains, add, remove, toggle