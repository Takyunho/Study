const loginInput = document.querySelector("#login-form input");
const loginButton = document.querySelector("#login-form button");
// document 또는 하나의 element를 통해서 검색이 가능


function onLoginBtnClick() {
  const username = loginInput.value;
  console.log(username);
}
// 위의 코드는 선호하는 작업은 아님. 브라우저 자체의 기능을 사용할 수도 있음
// 요약 : JavaScript에서 구현하는 대신 할 수 있다면 HTML의 기본 속성을 최대한 이용하기
loginButton.addEventListener("click", onLoginBtnClick);