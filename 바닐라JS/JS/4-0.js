/*
const loginForm = document.querySelector("login-form");
const loginInput = loginForm.querySelector("input");
const loginButton = loginForm.querySelector("button");
*/

const loginInput = document.querySelector("#login-form input");
const loginButton = document.querySelector("#login-form button");
// document 또는 하나의 element를 통해서 검색이 가능


function onLoginBtnClick() {
  console.log(loginInput.value);    //console.dir(“title”); = element를 더 자세하게 보여줌
  // console.log("hello", loginInput.value);
  // console.log("click!");
}

loginButton.addEventListener("click", onLoginBtnClick);
