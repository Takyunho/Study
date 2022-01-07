/* const title = document.getElementsByTagName("h1");

console.log(title);

*/


const title = document.querySelector(".hello h1");

title.innerText = "hello";






// tag 는 anchor, div, section, button 같은 것들을 의미함
// element를 가지고 오는 가장 멋진 방법은 querySelector와 querySelectorAll 임
// querySelector는 element를 CSS 방식으로 검색할 수 있다.
// 쿼리셀렉터는 단 하나의 요소만 리턴(첫번째 값)
// 모든 요소를 찾기 위해서는 querySelectorAll 사용

/*
ex. getElementByid("title") = String을 전달받는 함수(id 안의 요소를)
ex. getElementsByClassName("button") = array를 가져다 줌(class 안의 요소들을)
ex. getElementsByTagName("h1") = h1 array를 줌
ex. querySelector는 예를 들어 const title = document.querySelector(".hello h1:first-child");와
같이 사용

const title = document.querySelector("#hello"); // id니까 # / Class면 .
와
const title = document.getElementById("hello");
는 같은 역할을 함
*/