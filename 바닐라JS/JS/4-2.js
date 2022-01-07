const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input");


function onLoginSubmit(event) {   //event로 작성하는 것이 관행
  event.preventDefault();    // 어떤 event의 기본 행동(새로고침)이 발생되지 않도록 막는 함수
  console.log(loginInput.value);
}

loginForm.addEventListener("submit", onLoginSubmit)
 

//sumbit은 엔터를 누르거나 버튼을 클릭할 때 발생한다.
//새로고침이 일어나는건 form submit의 기본 동작이다.(브라우저가 그러도록 프로그래밍 되어있음)
//(브라우저는 엔터를 누를 때 새로고침을 하고 form을 submit 하도록 되어있음.)

/* 모든 이벤트리스너 함수의 첫번째 인수는 항상 지금 막 벌어진 일들에 대한 정보가 된다.
그리고 JS가 우리에게 그 정보를 무료로 제공한다.
JS가 방금 일어난 이벤트에 대한 정보를 지닌 인수를 채워넣음
*/
// 
