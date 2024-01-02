// - class 문법
class Cart {
  constructor(user) {
    console.log(this);
    this.user = user;
    this.store = {};
  }
  update(id, product) {
    this.stroe[id] = product;
  }
  getProduct(id) {
    return this.store[id];
  }
}

// - class 상속
function Person(name) {
  this.name = name;
}

class Korean extends Person {
  constructor(name, city) {
    super(name) // Person의 this.name이 실행됨
    this.city = city;
  }
  kimchy() {
    console.log("^^");
  }
}
const john = new Korean("john", "seoul");
john.kimchy();
john.name;

// 프로토타입이 사라진게 아니라 class 문법을 이용해서 간편하게 사용할 수 있는 것!