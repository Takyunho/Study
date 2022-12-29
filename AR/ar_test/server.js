// 서버를 express로 만들기 위한(띄우기 위한) 기본세팅
const express = require('express');
const app = express();

// listen(서버띄울 포트번호, 띄운 후 실행할 코드)
app.listen(3000, function () {    // function = 콜백함수 (함수안에 들어가는 함수로서 뭔가 순차적으로 실행하고 싶을 때 사용한다.)
  console.log('listening on 3000')
});

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');  // .sendFile('보낼파일경로');
})



// ⭐ 서버 실행방법
// node 경로 + 파일이름 => node server.js

// ⭐ nodemon으로 서버 재실행 자동화하기
// 터미널창에 npm install -g nodemon 입력
// 설치가 잘 되었다면 서버 실행할때
// nodemon 경로/파일이름 이라고 입력
// 그럼 파일 저장할 때 마다 알아서 서버를 새로 시작해줌(하지만 브라우저에서 새로고침은 해야함)
