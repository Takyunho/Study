const express = require('express');
const app = express();

// listen(서버띄울 포트번호, 띄운 후 실행할 코드)
app.listen(8080, function () {    
  console.log('listening on 8080')
});


// ⭐ nodemon으로 서버 재실행 자동화하기
// 터미널창에 npm install -g nodemon 입력
// 설치가 잘 되었다면 서버 실행할때
// nodemon 경로/파일이름 이라고 입력
// 그럼 파일 저장할 때 마다 알아서 서버를 새로 시작해줌(하지만 브라우저에서 새로고침은 해야함)



// ⭐ GET 요청시 HTML 파일을 보내주기
// /는 홈페이지를 의미함
app.get('/', function (요청, 응답) {
  응답.sendFile(__dirname + '/5.html전송.html');  // .sendFile('보낼파일경로');
})
// __dirname은 현재 파일의 경로