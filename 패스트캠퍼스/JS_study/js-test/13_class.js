//^ ES6 Classes

// function User(first, last) {
//   this.firstname = first;
//   this.lastname = last;
// }
// User.prototype.getFullName = function () {
//   return `${this.firstname} ${this.lastname}`;
// }

// const yun = new User('yunho', 'tak');
// console.log(yun);
// const yun2 = new User('yun', 'ho');
// console.log(yun2.getFullName());

//-//////////////// 위의 prototype을 이용한 생성자 함수를 class로 바꾸기 /////////////////

class User {
  constructor(first, last) {
    this.firstname = first;
    this.lastname = last;
  }
  // prototype이라는 속성을 중간에 사용하지 않아도 prototype으로 만들어지는 메소드를 정의할 수 있다.
  getFullName() {
    return `${this.firstname} ${this.lastname}`;
  }
}

const yun = new User('yunho', 'tak');
console.log(yun);
const yun2 = new User('yun', 'ho');
console.log(yun2.getFullName());