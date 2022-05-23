// AND = && 
// 둘다 true여야 true
// OR = ||
// 둘 중에 하나라도 true면 true
// else는 꼭 사용 안해도 됨

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
else if ( age > 80) {
  console.log("You can do whatever you want.");
}

