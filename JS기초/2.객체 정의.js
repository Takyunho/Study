// 객체 정의

// 1. 객체 리터럴을 이용
var person = {
  name : 'yun'
}
// 가장 간단한 방법


// 2. new 키워드를 이용
var obj = new Object();     // 빈 객체 생성, 리터럴 표현인 {}와 같다.
var arr = new Array();        // 빈 어레이(배열) 생성, 리터럴 표현인 []와 같다.
var date = new Date();      // 빈 현재 날짜 객체 생성
// 대문자로 시작하고 앞에 new가 붙는 함수들을 생성자 함수라고 한다.


// 3. Object를 사용
// Object.create를 이용하여 전달 받은 객체를 상속하는 객체 생성
var obj2 = Object.create({ x: 1, y: 2 });   // 필드(x:1, y:2)가 복사된 새로운 객체가 생성된다.
