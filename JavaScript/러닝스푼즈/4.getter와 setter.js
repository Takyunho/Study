var person = {        // 객체를 정의
  firstName: 'jun',     // 속성을 정의
  lastName: 'ko',

  get fullName() {
    return this.firstName + ' ' + this.lastName;
    // getter나 setter 혹은 메소드에서의 this는 객체 자신을 가르킨다. 즉, person이 되는 것.
  },

  set fullName(name) {
    var words = name.toString().split(' ');
    this.firstName = words[0] || '';
    this.lastName = words[1] || '';
  }
}


console.log(person.fullName);   // .으로 속성에 접근하면 getter함수가 호출되면서 get에서 반환된걸 return해줌
// .연산자로 호출하면 바로 실행되는 것!

person.fullName = 'jun ko';  // = 뒤의 문자열이 set함수의 fullName()의 파라미터 즉 name이 된다.
console.log(person.firstName);    // jun
console.log(person.lastName);   // ko