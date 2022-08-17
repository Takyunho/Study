//# var로 생성된 변수는 함수단위의 스코프를 가진다.
//# let은 블록단위의 스코프를 가진다.

//# var
(function () {
  var foo = "bar";
  if (foo) console.log(foo); // bar
})(); // ()를 통해 함수 바로실행

// console.log(foo); // ReferenceError: foo is not defined

//# let
let getValue, setValue;
{
  let data = {};
  setValue = function (key, val) {
    data[key] = val;
  };
  getValue = function (key) {
    return data[key];
  };
}
setValue("user1", "jay");
getValue("user1");
console.log(data); // data is not defined

//# const
//# let과 마찬가지로 블록단위의 스코프를 가진다.
//# 재할당을 할 수 없지만 불변객체는 아니다.
const URL = "http://hello";
URL = "http://opps"; //TypeError: Assignment to constant variable.

const CONST_OBJ = {};
CONST_OBJ.foo = "hello"; // 원하는 필드 추가 가능
CONST_OBJ.foo = "hi"; // 원래 있던 필드(속성값) 변경 가능
//^ 즉, 객체는 불변객체가 아니므로 재할당만 못할 뿐 요소 추가나 제거는 가능하다.
CONST_OBJ = { foo: "opps" }; //TypeError: Assignment to constant variable.

//# 템플릿 문자열
//# 문자열을 위한 새로운 리터럴이고 back-tick(`)을 사용하여 정의힌다.
//# 멀티라인 문자열처리 및 데이터 삽입이 용이해진다.
let cart = [
  { name: "옷", price: 2000 },
  { name: "가방", price: 1000 },
];
let interpolated = `카트에 ${cart.length}개의 아이템이 있습니다`;
let interpolated2 = `카트에는 ${cart.map(function (item) {
  return item.name;
})}이 있습니다.`;
console.log(interpolated); //카트에 1개의 아이템이 있습니다 console.log(interpolated2); //카트의 옷, 가방이 있습니다.
let multiline = `Hello, World`;
console.log(multiline);

//# Symbol
//# ES6의 새로운 기본형이고 리터럴 표현식이 없다.
//# 심볼로 만들어진 key는 for..in 루프, Object.keys, Object.getOwnPropertyNames에서 숨겨진다. (Json.stringify 조차도)

const symbol = Symbol();
const symbol2 = new Symbol(); // <- TypeError const hello = Symbol('hello') // 디버깅 목적
console.log(Number(3) === Number(3)); // <- true
console.log(Symbol() === Symbol()); // <- false
console.log(Symbol("symbol") === Symbol("symbol")); // <- false
console.log(typeof Symbol()); // <- 'symbol'
const nationility = Symbol("nationility");
const user = {
  name: "john",
  [nationility]: "korean",
};
console.log(user[nationility]); // korean

//# Default Parameters
//# 1. 함수의파라미터가호출시주어지지않을때의기본값을줄수있다.
//# 2. 기본 파라미터에 표현식을 줄 수 있고 이는 함수 바디에서 실행된다.
//# 3. 기본 파라미터는 함수가 호출될 때 평가된다.
function buildChart(width = 200, height = width / 2) {
  // 차트를 만든다.
}
const chartA = buildChart(); // 200, 100 const chartB = buildChart(100) // 100, 50
const chartB = buildChart(100); // 100, 50

//# Rest Parameters
//# 1. 3개의.으로...표현할수있다.
//# 2. 무조건 매개변수 목록중 마지막에 와야한다.
//# 3. 기본 파라미터는 함수가 호출될 때 평가된다.
function avg() {
  const args = Array.prototype.slice.call(arguments); //...
}
function avg() {
  const args = Array.from(arguments); //...
}
function avg(...args) {
  //...
}

//# 화살표 함수(Arrow Function)
//# 더 간결하게 함수를 만들 수 있는 표현식이다.
const double = x => x + x;    // 파라미터가 1개이면 괄호가 필요 없다.

const add = (a, b) => a + b;  // 파라미터가 1개 이상이면 괄호가 필요하다.

const rand1to10 = () => Math.floor(1 + Math.random() * 10); // 파라미터가 없을 경우 괄호가 필요하다.

const log = (...args) => console.log(args); // rest 파라미터일 경우 괄호가 필요하다.

const doThings = (a, b) => {
  doA();
  doB();
  // return ~~~ 
} // 표현식이 1개 이상일 경우 괄호가 필요하고, 명시적으로 return을 써줘야 함

