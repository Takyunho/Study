// 함수의 특성

// 1. 호출 할 수 있다. => 함수 바디의 문장들이 실행된다.
// 2. 자바스크립트에서 함수는 일급객체(first-class object)이다.(객체가 할 수 있는 것들을 함수도 다 할 수 있다.)
// 2-1. 함수는 리터럴로 생성되고 변수나 데이터 구조에 할당될 수 있다.
// 2-2. 함수는 함수의 인자로 전달할 수 있다.
// 2-3. 함수는 반환값으로 사용할 수 있다.
// 2-4. 함수는 런타임에 생성될 수 있다.


// 객체
var person = {};   // 변수에 할당한다.

person.job = {};    // 속성을 생성하고 새로운 객체를 할당

hide({});   // 인자로 전달한다.

function returnNewObject() {    // 실행결과로 리턴한다.
  return {};
}


// 함수
var noop = function () { };   // 변수에 할당한다.
person.eat = function (food) { };   // 객체의 속성에 할당
function ask(func) {
  func();
}
ask(function () { });   // 인자로 전달한다.

function returnNewFunc() {    // 함수가 함수를 리턴 => 실행결과로 리턴한다.
  return function () { };
}