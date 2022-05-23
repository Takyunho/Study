
// 연습용 데이터
export default [
  {
    id : 0,
    title : "White and Black",
    content : "Born in France",
    price : 120000
  },

  {
    id : 1,
    title : "Red Knit",
    content : "Born in Seoul",
    price : 110000
  },

  {
    id : 2,
    title : "Grey Yordan",
    content : "Born in the States",
    price : 130000
  }
] 

// data.js ---> App.js 이렇게 변수, 혹은 데이터를 보내려면
// 1. 일단 data.js에서 원하는 데이터를 export 하고
// 2. App.js에서는 data.js를 import 하면 된다!!

// ⭐ export default 문법
// var 중요데이터 = 'Kim';
// export default 중요데이터;
// ➡️ 중요한 변수를 export 하고 싶을 땐 export default라는 문법을 쓰고
// 우측에 배출을 원하는 변수(여기서는 중요데이터)를 담아줄 수 있다.
// 변수명, 함수명, 자료형 전부 배출 가능
// 파일마다 export default라는 키워드는 하나만 사용 가능

// ⭐ 여러개의 변수들을 내보내고싶으면?
// var name1 = 'Kim';
// var name2 = 'Park';
// export { name1, name2 }
// 중괄호 안에 변수명 두개 적기
// 꼭 변수나 함수명이 있어야함
