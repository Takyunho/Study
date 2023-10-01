export default function app() {
  const user = {
    name: 'user',
    age: 36,
    email: 'user@example.com'
  }

  //^ Obejct.keys라는 정적 메소드는 객체의 키를 배열로 반환한다.
  const keys = Object.keys(user)
  console.log(keys) // [ 'name', 'age', 'email' ]

  console.log(user['email'])  // 'user@example.com'

  const values = keys.map(key => user[key])   // 각각의 키에 대한 값을 배열로 반환시키기
  console.log(values) // [ 'user', 36, 'user@example' ]

}