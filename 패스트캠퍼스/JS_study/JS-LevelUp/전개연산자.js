export default function app() { 
  // 전개 연산자
  const fruits = ['apple', 'banana', 'orange']
  console.log(fruits)
  console.log(...fruits)
  
  function toObject(a, b, c) {  // object로 변환하는 함수
    return {
      a: a,
      b: b,
      c: c
    }
  }
  console.log(toObject(...fruits))


  // -----------------
  // rest parameter를 통해 배열 안의 남은 아이템들을 모두 가져올 수 있다.
  const fruits2 = ['apple', 'banana', 'orange', 'grape', 'strawberry']

  function toObject2(a, b, ...c) {    // ...c => rest parameter
    return {
      a: a,
      b: b,
      c: c
    }
  }
  console.log(toObject2(...fruits2))

  // -------------------- 위의 함수를 리팩토링하면 아래와 같이 축약 가능하다.

  const toObject2_refactor = (a, b, ...c) => ({a, b, c})
  console.log(toObject2_refactor(...fruits2))

}

