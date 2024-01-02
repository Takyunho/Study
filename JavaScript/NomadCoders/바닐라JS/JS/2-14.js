//NaN 판별 = isNaN함수 사용 -> 하나의 인자를 주면 넘버인지 아닌지 알려줌
//if 는 참일때 실행 else는 거짓일때 실행


const age = parseInt(prompt("How old are you?"));

if(isNaN(age)) { 
  console.log("Please write a number");
}
else {
  console.log("Thank you for writing your age.");
}