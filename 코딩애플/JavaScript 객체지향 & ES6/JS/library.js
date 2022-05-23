// import 가져올거 from '경로'
// export default 내보낼거;
// (참고)
// export default는 한번 밖에 사용못함


// (1) export default 하기
var a = 1000;   // 이 변수 a를 html에서 import하기 위해 아래에서 export
export default a;



// (2) 여러개를 export 할 수도 있다.
var aa = 10;
var b = 20;

export { aa, b }; // export {aa} / export {b} 처럼 나눠서도 가능

  /*
  export {변수명1, 변수명2 ...} 이렇게 담아야 한다.
  혹은 export var a = 10; 이렇게 써도됨 (변수나 함수 앞에다가 export)
  */



  // (3) export와 export default 동시에 사용가능
var c = 10;
var d = 20;
var e = 30;

export { c, d };
// export default e;  // export default는 1번밖에 사용못함(위에서 a에서 사용중)



// (4) 변수명이 마음에 안들면 as로 새로 짓자
var 이상한변수명 = 22222;
var 이상한변수 = 11111;

export { 이상한변수명, 이상한변수 };



// (5) import할 때 변수들이 너무 많으면 * 기호를 씁시다

var 변수명1 = 'kim';

export { 변수명1 };