var person = {
  name: 'jay',
  hello: function () {    // 함수를 값으로 넣음
    console.log('hello')
  }
};
// 호출이 가능하면 메소드 / 호출이 안되면 그냥 속성(프로퍼티)
// name 은 그냥 속성이고, hello는 메소드

var name = person.name; // person 객체의 name 속성에 접근한다.
person.age = 20;  // 속성이 없으면 새로운 속성을 추가하고 값을 할당한다.
person.name = 'jin';  // 있으면 기존값을 덮어쓴다.

var age = person["age"] // person 객체는 일종의 연관배열로 배열의 요소에 접근하듯 접근할 수 있다.
// 속성 접근 방법 1 => object.property
// 속성 접근 방법 2 => object["property"]
// 방법 1이 편리

var numOfChildren = person.children.length;   // 에러가 발생
// children이 undefined
// 없는 속성에 접근하면 undefined가 반환된다.


delete person.age;  // 속성제거

person.hasOwnProperty("age"); // 속성 존재 확인