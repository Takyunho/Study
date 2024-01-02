//^ DOM = document object model
// 문서 객체 모델 = html에 들어있는 여러가지 모델을 의미
// 여러가지 모델은 예를 들어 div, span 등을 의미

//^ API = Application Programming Interface
// 즉, 웹 사이트가 동작하기 위해 입력하는 프로그래밍 명령

//^ Dom Api = 자바스크립트에서 html을 제어하기위한 명령들

/* *************************************** */


// html의 box클래스(요소)를 찾아서 데이터를 boxEl에 저장
const boxEl = document.querySelector('.box');

//@ addEventListener
// 이벤트리스너 안의 첫번째 인수로는 이벤트가, 두번째 인수로는 핸들러가 들어간다.
// 핸들러는 일반적으로 익명함수가 들어간다.
boxEl.addEventListener('click', function () {
  console.log('click!!');
})

//@ classList.contains
// classList.contains(클래스명) = 클래스가 있는지 없는지 확인 (있으면 true를 반환)
boxEl.classList.add('active');
let isContains = boxEl.classList.contains('active'); 
console.log(isContains);    // true

boxEl.classList.remove('active');
isContains = boxEl.classList.contains('active');
console.log(isContains);    // false



/* *************************************** */
//@ querySelectorAll

const boxEls = document.querySelectorAll('.box2');
// querySelectorAll로 찾은 클래스는 NodeList(유사배열)가 된다.
console.log(boxEls);

// 따라서 forEach로 반복가능
boxEls.forEach(function (boxEl, index) {
  console.log(boxEl, index);
  boxEl.classList.add(`order-${index+1}`);
})


/* *************************************** */
//@ textContent속성

const boxEl2 = document.querySelector('.box2');

console.log(boxEl2)
console.log('textContent? = ' + boxEl2.textContent);

// textContent를 이용해 내용 바꾸기
boxEl2.textContent = '이내용으로 내용바꿀거에요';
console.log(boxEl2.textContent); // 변경된 값으로 콘솔이 출력


//! DOM API를 이용해서 html의 구조를 검색하고 제어하고 기타 명령들을 이용해서 원하는 내용을 만들 수 있다!!