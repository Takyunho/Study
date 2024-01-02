export default function app() {
  // 얕은 복사(shallow copy)와 깊은 복사(deep copy)

  const user = {
    name: 'user',
    age: 100,
    emails: ['user@example.com'],
  }

  // 얕은 복사
  const copyUser = { ...user };
  console.log(user === copyUser);

  user.age = 22;
  console.log('user', user)
  console.log('copyUser', copyUser)

  console.log('------')
  


}