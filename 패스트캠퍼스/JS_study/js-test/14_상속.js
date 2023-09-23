export default function app() {
  // 상속
  // extends를 이용

  class Vehicle {
    constructor(name, wheel) {
      this.name = name;
      this.wheel = wheel;
    }
  }
  const myVehicle = new Vehicle("운송수단", 2);
  console.log(myVehicle);

  // 상속받은 클래스!
  class Bicycle extends Vehicle {
    constructor(name, wheel) {
      super(name, wheel); // super를 이용해서 부모의 constructor 호출가능
    }
  }
  const myBicycle = new Bicycle("삼천리", 2);
  const daughtersBicycle = new Bicycle("세발", 3);
  console.log(myBicycle);
  console.log(daughtersBicycle);

  class Car extends Vehicle {
    constructor(name, wheel, license) {
      super(name, wheel); // super를 이용해서 부모의 constructor 호출하고
      this.license = license; // 자식 클래스에서 새로운 속성을 추가할 수 있다.
    }
  }
  const myCar = new Car("우라칸", 4, true);
  const secondCar = new Car("벤츠", 4);
  console.log(myCar);
  console.log(secondCar);
}
