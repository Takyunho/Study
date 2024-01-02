// 함수 선언문
function add(x, y) {
  var result = x + y;
  return result;
}
console.log(result);

// 함수 표현식 (익명함수 표현식 & 이름있는 함수 표현식)
// 이름이 있는 함수 ( 예를들어, function v(x,y)) 일수도 있고, 없는 함수 (예를들어, function(x,y)) 일수도 있다.
var add = function(x, y) {
  var result = x + y;
  return result;
}
console.log(result);

// 즉각실행 함수 표현식
var result = (function (x, y) {
  var result = x + y;
  return result;
})(1, 2);
console.log(result);

// 함수를 함수 생성자로 정의하는 방법
var add = new Function('x', 'y', 'var result = x+y; return result;');
var result = add(1, 2);
console.log(result);