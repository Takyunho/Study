export default function app() {
  // 데이터 불변성 (immutability)
  // 원시 데이터 : String, Number, Boolean, undefined, null
  // 참조형 데이터 : Object, Array, Function


  // 1. 원시 데이터는 불변성을 가진다.
  // -------------------------------------------------------
  // 1번 메모리 : 1
  // 2번 메모리 : 4
  // 3번 메모리 : 7
  // 4번 메모리 :
  // -------------------------------------------------------

  let a = 1;
  let b = 4;
  console.log(a, b, a === b); // 1 4 false

  b = a;
  console.log(a, b, a === b); // 1 1 true

  a = 7;
  console.log(a, b, a === b); // 7 1 false

  let c = 1;  // 4번 메모리에 할당되는 것이 아니라 1번 메모리에 할당된다.
  // 왜냐하면 이미 1번 메모리에 1이라는 원시 데이터가 있기 떄문(불변성)
  // 즉, 새로운 메모리를 참조하는게 아니라 기존에 만들었던 값이 있는 메모리를 참조하게 된다.
  console.log(b, c, b === c); // 1 1 true

  
  // 2. 참조형 데이터는 불변성을 가지지 않는다.
  // 새로 할당한 값들이 새로운 메모리를 참조하게 된다.
  // ---------------------------------------------------------
  // 1번 메모리 : 
  // 2번 메모리 :
  // 3번 메모리 :
  // 4번 메모리 :
  // ---------------------------------------------------------

  let obj1 = { k: 1 };
  let obj2 = { k: 1 };
  console.log(obj1, obj2, obj1 === obj2); // { k: 1 } { k: 1 } false
  
  obj1.k = 7;
  obj2 = obj1;
  console.log(obj1, obj2, obj1 === obj2); // { k: 7 } { k: 7 } true
  
  obj1.k = 2;
  console.log(obj1, obj2, obj1 === obj2); // { k: 2 } { k: 2 } true
  //! => obj2도 1번 메모리를 바라보고 있기 때문에 obj1의 값이 바뀌면 obj2의 값도 바뀐다.
  
  let obj3 = obj2;
  console.log(obj1, obj2, obj3, obj1 === obj3) // { k: 2 } { k: 2 } { k: 2 } true

  obj1.k = 9;
  console.log(obj1, obj2, obj3, obj1 === obj3) // { k: 9 } { k: 9 } { k: 9 } true

}