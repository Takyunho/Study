const clock = document.querySelector("h2#clock");

function getclock() {
  const date = new Date();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  clock.innerText = (`${hours}:${minutes}:${seconds}`);
}

getclock(); // 이걸 지우면 화면에 00:00:00을 1초동안 표시하게됨
setInterval(getclock, 1000);
//함수를 정해진 시간마다 실행 5000 = 5000ms = 5초
// setInterval(호출하려는 함수 이름, 시간)




/*
setTimeout(sayHello, 5000);
// 함수를 정해진 시간에 1번 실행
// setTimeout(호출하려는 함수 이름, 시간)
*/


/*
padStart() : 패드 스타트는 스트링에 쓸 수 있는 펑션임
"1".padStart(2, "0") = "01"

=>>> 길이를 2로 늘려서 앞에 0 추가



padEnd() : 뒤쪽에 문자를 추가하는 것
"1".padEnd(2, "0") = "10"

=>>> 길이를 2로 늘려서 뒤에 0 추가

숫자에는 못쓰고 String에 사용 가능.
*/