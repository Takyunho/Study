const age = parseInt(prompt("How old are you?"));

if(isNaN(age) || age < 0) {
  console.log("Please write a real positive number");
}
else if(age < 18) {
  console.log("You are too young.");
}
else if (age >= 18 && age <= 50) {
  console.log("You can drink.");
}
else if (age > 50 && age <= 80) {
  console.log("You should exercise");
}
else if (age === 100) {
  console.log("wow you are wise");
}
else if ( age > 80) {
  console.log("You can do whatever you want.");
}


// else if 순서 잘 확인해야 함 ( 종종 실행 안될때가 있기 때문)
// 같을때(확인할때) === 
// = 은 값(value)을 할당할 때 사용 하는 것
// 아니라면은 !==로 쓰면 됨
// 자바스크립트는 작은 괄호부터 시작해서 큰 괄호로 넘어감
// (함수가 안에서 밖으로 시작하는 것처럼)