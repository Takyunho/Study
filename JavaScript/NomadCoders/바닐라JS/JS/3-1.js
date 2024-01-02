//getElementById = String을 전달받는 함수
// getElementById란 함수를 통해 id로 element를 가져올 수 있다. 그 외에도 여러가지 방법이 있음

/* document.getElementById(“title”)은 html에 있는 id를 불러올 수 있다.
js에서는 html이 표현하는 object를 보여준다

console.dir(“title”); = element를 더 자세하게 보여주는 console.dir()

title.innerText = “got you” 처럼 js에서 html을 바꿀 수 있음.(id를 추가했기에 가능.)
모든 것들을 html에서 항목들을 가지고와서 js에서 변경한다 */

const title = document.getElementById("title");

title.innerText = "Got you!";


