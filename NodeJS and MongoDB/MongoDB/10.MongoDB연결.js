const express = require('express');
const app = express();
// 바디파서
app.use(express.urlencoded({ extended: true }));

// ⭐ 몽고디비 연결
const MongoClient = require('mongodb').MongoClient; // 이걸 쓰려면 몽고디비 라이브러리 설치가 필요함
// (1). npm install mongodb
// (2). 설치 후 몽고디비 연결하기
/* (참고) 접속 URL 복붙하실 때 mongodb+srv://디비계정아이디:디비계정패스워드@cluster0-qaxa3.mongodb.net/데이터베이스이름?retryWrites=true&w=majority
이거 3개를 잘 입력해야합니다. */
MongoClient.connect('mongodb+srv://yundb:1q2w3e4r@cluster0.5cjru.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', function (에러, client) {
  // (3). app.listen 옮기기
  app.listen(8081, function () {
    console.log('listening on 8081')
  });
})




// 홈
app.get('/', function (요청, 응답) {
  응답.sendFile(__dirname + '/8.home.html');
})

// Write
app.get('/write', function (요청, 응답) {
  응답.sendFile(__dirname + '/8.write.html');
})


// POST요청
app.post('/newPost', function (요청, 응답) {
  응답.send('전송완료');
  console.log(요청.body)
  // console.log(요청.body.title)  
  // console.log(요청.body.date)   
})


// ⭐ 웹사이트 기능만들기 기본
/*
1️⃣. 서버로 데이터 전송할 수 있는 UI 만들고 (html 작성하고)
2️⃣. 서버에서 원하는대로 정보를 처리하면 된다.
*/



// ⭐ Database
/*
그냥 데이터를 일정한 형식으로 저장할 수 있게 도와주는 곳이라고 보시면 되겠습니다. 
가장 쉽게볼 수 있는게 바로 엑셀입니다.
엑셀에선 시트를 하나 만드신 후 행과 열에 원하는 데이터를 기입하면 자료 저장 끝이죠?
데이터베이스도 동일합니다.
하지만 데이터베이스는 간지나는 SQL이라는 언어를 써서 데이터를 입력, 출력합니다.
대문자로 쓰는 이상한 언어입니다. 
하지만 이걸 또 배우고 그럴 시간이 없기 때문에 우린 NoSQL이라는 
SQL언어를 쓰지 않고도 쓸 수 있는 쉬운 DB를 배워보도록 합시다. 

그 중 MongoDB라는 것을 사용할 것인데 그 이유는..
- 처음 다룰 때 어려운 셋팅작업이 필요하지 않음 (스키마 생성 등 필요없음)
- SQL 안배워도 됨
- 복잡한 자료형 몰라도 됨
- 평생 무료 호스팅해주는 곳이 있음 
*/



// ⭐ MongoDB Atlas 가입 후 호스팅받기
/*
MongoDB Atlas라는 사이트 접속해서 가입 후 무료 티어 선택-> 서버위치 선택 해서 Cluster생성 -> Database Access 메뉴에서 DB 접속용 아이디/비번을 생성 -> Network Access 메뉴에서 IP를 추가 -> Database / collection 만들기를 진행 -> CONNECT라는 작은 흰색 버튼 누르기 -> 가운데 Connect Your Application 버튼 누르기 -> Choose your driver version 에서 Node.js 선택되어있는지 잘 확인하기 -> 밑에 접속 URL(Connection String) 긴게 뜨면 복사해서 일단 메모장 같은 곳에 저장해놓기
*/

// ⭐ 자바스크립트파일에서 DB접속
/*
1. 터미널 켜서 npm install mongodb 를 입력해서 라이브러리를 설치합니다.
그냥 MongoDB 접속을 쉽게 도와주는 라이브러리입니다. 
뭔가 에러가 나고 안된다면 npm uninstall mongodb 로 지웠다가
npm install mongodb@3.6.4 이렇게 설치해서 이용해보도록 합시다. 


2. server.js 상단 쯤에 다음 코드를 추가합니다.

const MongoClient = require('mongodb').MongoClient;

require 라는 글자 많은 곳에 함께 위치시켜 주면 될듯 합니다.


3. 하단에 다음 코드를 입력해줍니다. 

MongoClient.connect('아까 챙겨온 접속URL', function(에러, client){
  if (에러) return console.log(에러);
  //서버띄우는 코드 여기로 옮기기
  app.listen('8080', function(){
    console.log('listening on 8080')
  });
})

접속 URL은 대충 이렇게 생겼는데
mongodb+srv://디비계정아이디:디비계정패스워드@cluster0-qaxa3.mongodb.net/데이터베이스이름?retryWrites=true&w=majority
빨간 부분 3개를 여러분이 만든걸로 잘 채워 입력해야합니다. 
그리고 app.listen이라고 그 서버 띄우는 코드를 여기 안으로 옮겨주시면 되겠습니다.
그리고 터미널에서 nodemon server.js로 서버를 실행시켜보면 터미널에 listening on 8080이라고 잘 뜨죠?
아무튼 뜨면 성공입니다.
*/