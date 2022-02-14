const express = require('express');
const app = express();

// listen(서버띄울 포트번호, 띄운 후 실행할 코드)
app.listen(8081, function () {    
  console.log('listening on 8081')
});


// 홈
app.get('/', function (요청, 응답) {
  응답.sendFile(__dirname + '/7.home.html');  // .sendFile('보낼파일경로');
})

// Write
app.get('/Write', function (요청, 응답) {
  응답.sendFile(__dirname + '/7.Write.html');  // .sendFile('보낼파일경로');
})
