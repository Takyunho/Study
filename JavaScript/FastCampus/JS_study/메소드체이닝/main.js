//^ 메소드  체이닝
// 메소드가 마치 체인처럼 연결된 형태를 의미한다.
// 명령들을 하나씩 분리해서 작성하는 것보다 메소드 체이닝을 통해 깔끔하게 작성할 수 있다. 

const a = 'Hello~';
const b = a.split('').reverse().join('');
//# split: 문자를 인수 기준으로 쪼개서 배열로 반환.
//# reverse: 배열을 뒤집기.
//# join: 배열을 인수 기준으로 문자로 병합해 반환.

console.log(a); // Hello~
console.log(b); // ~olleH