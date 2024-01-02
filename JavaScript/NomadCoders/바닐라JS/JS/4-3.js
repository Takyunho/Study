const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input");

const link = document.querySelector("a");

function onLoginSubmit(event) {   //event로 작성하는 것이 관행
  event.preventDefault();    // 어떤 event의 기본 행동(새로고침)이 발생되지 않도록 막는 함수
  console.log(loginInput.value);
}

function handleLinkClick(event) {
  event.preventDefault();
  console.log(event);
  
}

loginForm.addEventListener("submit", onLoginSubmit);
link.addEventListener("click", handleLinkClick);

// 1. 가장 중요한건 addEventListener 안에 있는 함수는 직접 실행하지 않는다는 것
// 내가 하는게 아니라 브라우저에서 실행시켜줌. 이때 브라우저는 실행만 시켜주는 것이 아니라
// event에 대한 정보도 담아준다.

// 2. preventDefault 함수를 실행하면 event는 멈추게 되고 아무 것도 진행되지 않는다.
// 