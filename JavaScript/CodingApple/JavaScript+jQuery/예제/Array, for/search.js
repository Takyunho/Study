var 출석부 = ['흥민', '영희', '철수', '재호'];

function 이름찾기(name) {
  // 1️⃣ 기본 하드코딩
  // if (name == 출석부[0]) {           // 만약에 출석부에 이름이 있으면
  //   console.log('있어요');           // 있어요를 출력
  // }
  // else if (name == 출석부[1]) {
  //   console.log('있어요');
  // } else if (name == 출석부[2]) {
  //   console.log('있어요');
  // } else if (name == 출석부[3]) {
  //   console.log('있어요');
  // }
  // else {                          // 그렇지 않으면
  //   console.log('');                // 공백을 출력
  // } 
  
  // if문이 비슷한게 여러개 있으면 앞서 배운 반복문 등으로 축약도 가능
  // 2️⃣ for 반복문으로
  for (let i = 0; i < 4; i++) {
    if (name == 출석부[i]) {
      console.log('있어요~');
      return;
      // 철수가 Array 내에 2개가 있을 경우 문제가 발생할 수도 있겠죠? 
      // '있어요'가 콘솔창에 두번이나 출력된다거나 그럴 수 있겠습니다. 
      // 그래서 한번 발견하면 함수를 아예 끝내버리는 코드도 추가할 수 있겠습니다. 
      // console.log('있어요') 밑에 return 이라는 단어 하나만 추가하시면 됩니다.
      // 함수 내에서 return이라는 글자를 발견하면 바로 함수가 끝나니까요. 
    } // else {
      // console.log('');
      // }
      // else 안해도 공백 나오네?
  }
}

이름찾기('');
// 안됨
// 출석부.forEach(function 이름찾기(name) {
//   if (name == 출석부['']) {
//     console.log('있어요');
//   } else {
//     console.log('');
//   }
// })

