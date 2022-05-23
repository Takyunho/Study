// # 값 타입(원시형 타입)과 참조 타입

// # 값 타입(총 6개) = 원시형 타입
// 숫자(number), 문자열(string), 불린(boolean), 정의되지 않은(undefined), 객체가 없음(null), 심볼(Symbol)


// # 참조 타입(총 3개)
// 값 타입 데이터를 제외한 객체, 배열, 함수는 모두 참조 타입이다.


var people = [
  {
    name: 'jay',
    age: 20
  },
  {
    name: 'jun',
    age: 10
  }
];

var makeCapital = function (name) {
  name = name.charAt(0).toUpperCase() + name.slice(1);
  return name;
}

var increaseAge = function (person) {
  { person.age += 1; }  // people의 age가 바뀜
}

var addPerson = function (people, name, age) {
  people.push({ name: name, age: age });
}

makeCapital(people[0].name);
increaseAge(people[1]);

addPerson(people, 'jim', 32);
console.table(people);

// 값타입은 값이 바뀌는 것이 아니라 복사되고,
// 참조 타입(참조형, 레퍼런스 타입)은 전달했던 곳의 값이 바뀌어버림
