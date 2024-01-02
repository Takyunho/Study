
export default function app() {
  // 구조 분해 할당 (Destructuring assignment)
  // 비구조화 할당이라고도 함

  const user = {
    name: 'yun',
    age: 29,
    email: 'test@example.com',
  }

  const { name, age, email, address } = user
  // address는 user 객체에 존재하지 않지만, 구조 분해 할당 문법에서 기본값을 지정해 줄 수 있다.
  // const { name, age, email, address = 'Korea' } = user

  // name이라는 변수의 이름을 바꿔서 사용하고 싶으면 아래와 같이 변수명을 바꿀 수도 있다.
  // const {name: yun, age, email, address = 'Korea' } = user


  console.log(`사용자의 이름 : ${name}`)
  console.log(`사용자의 나이 : ${age}`)
  console.log(`사용자의 이메일 : ${email}`)
  console.log(`사용자의 주소 : ${address}`) // undefined


  // -------------------------------------------------
  // 배열도 구조 분해 할당이 가능하다.

  const fruits = ['apple', 'banana', 'orange']
  const [a, b, c, d] = fruits
  console.log(a, b, c, d); // apple banana orange undefined가 출력된다.

  // 하나만 추출하고 싶은 경우에는?
  const fruits2 = ['apple', 'orange', 'banana'];
  const [, , e] = fruits2;  // 사용하지 않는 인덱스는 쉼표로 구분해서 남겨두기
  console.log(e)  // banana가 출력된다.
}