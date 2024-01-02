
// prompt는 사용자에게 창을 띄우는 역할

// function은 내부에서 외부로 시작됨

// parseInt() = String을 Number로 변환하는 역할 ===>   "15" => 15
// 문자를 parseInt()로 하면 숫자가 아님을 알 수 있음

// typeof = 변수의 type을 보는 방법   ex ===> typeof age
// number 은 크기 비교가 가능하다. string 은 불가능
const age = parseInt( prompt("How old are you?") );

console.log(age);
/* console.log(typeof age, typeof parseInt(age)); */
 