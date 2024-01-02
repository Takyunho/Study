export default function app() {
  // Object.assign => 정적 메소드이고, 객체를 복사할 때 주로 사용함.
  // Object.assign(대상객체, 참조객체1, 참조객체2, ...)
  const fruits = {
    apple: 1200,
    banana: 1000,
    orange: 2000,
  };

  const person = {
    name: "Lee",
    sayHello: function () {
      console.log(`Hello! My name is ${this.name}.`);
    },
  };

  const target = Object.assign({}, person); // 새로운 객체로 복사하기
  const target2 = Object.assign(person, fruits); // 기존 객체에 복사하기
  console.log(target);
  console.log(target2); // target2와 person은 같은 객체를 참조하고 있으므로 일치연산자(===)를 통해 비교하면 true가 반환된다.
  console.log(target2 === person);
}