// # arguments 객체


function sumof() {
  var total = 0;
  for (var i = 0; i < arguments.length; i++) {
    console.log(arguments)
    console.log(arguments.length)
    total = total + arguments[i];
    // ^ 직접 파라미터를 넣는게 아니라, arguments를 이용해서 가변적으로 인자들을 접근할 수 있다.
  }
  return total;
}
// 함수를 정의하게되면 자바스크립트가 arguments를 자동으로 정의한다.
// 그래서 arguments를 쓸 수 있는 것.
// arguments는 배열처럼 length가 존재한다.

// 즉,
// 1. arguments 객체를 통하여 함수에 전달되는 인자(가변적인인자)에 접근할 수 있고,
// 2. arguments 객체의 length 속성을 통하여 인자의 개수를 확인할 수 있다.
// 3. 개별 인자에는 배열의 인자 접근과 같은방식으로 접근( 배열처럼 [0] 이런 식으로 접근할 수 있다.)
// 4. arguments 객체는 배열이 아님 (배열에서 쓸 수 있는 메소드를 쓰지 못하기 때문)


console.log(sumof(2, 3, 4)); 