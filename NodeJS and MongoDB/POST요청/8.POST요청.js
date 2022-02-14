const express = require('express');
const app = express();

// ⭐ POST요청으로 서버에 데이터를 전송하고 싶으면
// ⭐ 1. body-parser 필요
// body-parser는 요청 데이터(body)의 해석을 쉽게 도와주는 역할을 한다.
// body-parser 라이브러리 설치 후 아래 코드 기재
const bodyParser = require('body-parser');
app.use(express.urlencoded({ extended: true }));
// 2021년 이후로 설치한 프로젝트들은 body-parser 라이브러리가 express에 기본 포함이라 따로 npm으로 설치할 필요가 없습니다.

// ⭐ 2. form 데이터의 경우 input들에 name 써야함


app.listen(8081, function () {
  console.log('listening on 8081')
});


// 홈
app.get('/', function (요청, 응답) {
  응답.sendFile(__dirname + '/8.home.html');
})

// Write
app.get('/write', function (요청, 응답) {
  응답.sendFile(__dirname + '/8.write.html');
})


// ⭐ POST요청
// 어떤 사람이 /add 경로로 POST 요청을 하면...
// 콜백함수를 실행 해주세요~
app.post('/add', function (요청, 응답) {  // input에 적은 정보들은 요청에 저장됨 (근데 쉽게 꺼내쓰려면 라이브러리 필요 => body-parser)
  응답.send('전송완료');

  // ⭐ 3. 요청했던 form에 적힌 데이터 수신
  console.log(요청.body)  // input에 입력한 값이 오브젝트 자료형으로 출력된다.
  console.log(요청.body.title)  // name이 title인 input에 입력한 값이 출력
  console.log(요청.body.date)   // name이 date인 input에 입력한 값이 출력
})


// ⭐ POST요청 정리(4가지 스텝)
/*
1️⃣. form 태그에 action, method 속성 정의
  - action="/add" , method="POST"

2️⃣. input에 이름 부여하기
  - <input name="title">

3️⃣. body-parser 라이브러리 설치하기
  - body-parser 라이브러리가 있어야 보낸 데이터들 처리가 쉬움
  - 터미널에 npm install body-parser 입력해서 설치
  - 설치 후 아래 코드를 js파일 위쪽에 추가
  const bodyParser= require('body-parser')
  app.use(bodyParser.urlencoded({extended: true})) 

  - ✅ 하지만 2021년 이후로 설치한 프로젝트들은 body-parser 라이브러리가 express에 기본 포함되어있어서 따로 npm으로 설치할 필요가 없고 아래 코드만 추가하면 된다.
  app.use(express.urlencoded({extended: true})) 
  
4️⃣. POST 요청 처리하는 코드짜기
  - app.get 하던 것이랑 비슷하게 post요청 처리하는 코드짜기
  
  app.post('/add', function(요청, 응답){
  console.log(요청.body);
  응답.send('전송완료')
  });

  그럼 누군가가 /add 경로로 post 요청을 할 때 
  터미널 콘솔창에 요청.body를 출력해볼 수 있습니다. 

*/