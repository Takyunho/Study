const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input");
const greeting = document.querySelector("#greeting");

const HIDDEN_CLASSNAME = "hidden"
// 일반적으로 string만 포함된 변수는 대문자로 표기하고 저장하고 싶을때 사용
// loginForm이나 loginInput처럼 중요한 정보를 담은게 아니므로 대문자로 작성

function onLoginSubmit(event) {   //event로 작성하는 것이 관행
  event.preventDefault();    // 어떤 event의 기본 행동(새로고침)이 발생되지 않도록 막는 함수
  loginForm.classList.add(HIDDEN_CLASSNAME);    //로그인 폼 숨겨
  const username = loginInput.value;            // 사용자로부터 입력받은 값을 변수로 저장
  greeting.innerText = `hello ${username}`;     // h1태그에 hello + 변수 값 넣어
  greeting.classList.remove(HIDDEN_CLASSNAME);  // h1 hidden 제거해서 화면에 보여줘
}
/*
string이랑 변수를 합치는 방법, 변수를 string 안에 포함시키는 방법

"Hello " + username; = `hello ${username}`;
'', "" 아니고 ``(백틱)임

*/

loginForm.addEventListener("submit", onLoginSubmit);