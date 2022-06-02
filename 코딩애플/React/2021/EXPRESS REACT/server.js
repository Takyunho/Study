// 서버는 유저가 페이지로 접속하면 리액트로 만든 html 파일을 보내주면 끝
/* 서버는 누가 html 파일 요청하면 보내주는 간단한 프로그램이다.
예를 들어서 어떤 고객이 naver.com으로 접속하면 거기 맞는 html을 보내주는 기계일 뿐이다. */

/* ⭐ 임시 서버를 Node + Express로 만들기
(0). 작업 폴더를 에디터로 오픈 한 뒤에 터미널에 npm init => package.json 설치
(1). npm install express 설치
(2). server.js 만들고 아래 코드 입력
*/
const express = require('express');
const path = require('path');
const app = express();

const http = require('http').createServer(app);
http.listen(8080, function () {
  console.log('listening on 8080')
}); 
/*
(3). 터미널에 node server.js 로 서버실행하면
브라우저로 localhost:8080 접속시 서버가 뜸
(4). nodemon이라는게 있다면 nodemon server.js를 입력하자.(그러면 서버 코드 바꿀 때마다 node server.js로 다시 입력 안해도 됨)
*/


/*⭐ 리액트로 만든 HTML 전송하는법
리액트 폴더 만들어서 만들고 싶은거 개발 후 npm run build를 입력해서 리액트 완성본을 만들고 서버로 보내는 것이 Nodejs 서버랑 리액트를 합치는 것임
*/
// (server.js에 추가)
// 🔻 project1폴더안 build폴더의 스태틱 파일들을 사용하겠다는 뜻
app.use(express.static(path.join(__dirname, 'project1/build'))) // express.static이라는걸 쓰면 특정 폴더 안의 파일들을 static 파일로 고객들에게 잘 보내줄 수 있다. 그래서 build 폴더 안의 css, js, img 파일들도 잘 사용할 수 있다.

// 🔻 누가 /로 접속하면 'project1/build/index.html'을 보내준다는 뜻
app.get('/', function (요청, 응답) { 
  응답.sendFile(path.join(__dirname, 'project1/build/index.html'));
})



// ⭐ (리액트에서 라우팅을 담당하는 경우)
// 리액트에서도 서버가 하던 라우팅을 대신 해줄 수 있음.(react-router-dom 설치 해서 사용)
// 그럼 누가 /list 로 접속하면 글목록 보여주고 /mypage 접속하면 마이페이지도 보여줄 수 있음
// 그러면 nodejs 서버에서 라우팅이 필요 없어지겠네?
// 근데 리액트 라우팅으로 /list 페이지를 개발해놨는데 실제 localhost:8080/list 로 접속하면 아무것도 안뜸
// 왜냐면 브라우저 URL창에 때려박는건 서버에게 요청하는거지 리액트 라우터에게 라우팅 요청하는게 아니기 때문
// 이걸 리액트가 라우팅하게 전권을 넘기고 싶다면 server.js 에 다음과 같은 코드를 밑에 추가
app.get('*', function (요청, 응답) {
  응답.sendFile(path.join(__dirname, '/react-project/build/index.html'));
});
// 별표 * 라는 것은 모든 문자라는 뜻
// "고객이 URL란에 아무거나 입력하면 걍 리액트 프로젝트나 보내주셈"이라는 뜻인데 이렇게 하면 리액트 라우팅 잘됨



// ⭐ (리액트로 프론트엔드를 만들 경우 개발흐름)
// (1) 서버는 누군가 /경로 로 GET요청을 하면 DB에서 데이터를 꺼내서 보내준다고 API를 짠다.
// (2) 리액트는 예를 들어서 글목록 페이지를 보여주고 싶으면 서버로 useEffect 사용해서 서버 로드시 ajax GET요청을 보낸다.
// (3) 그럼 리액트는 서버로부터 데이터를 받아서 그걸 가지고 html에 집어넣든 맘대로 개발하면 된다.

// (참고)
// 리액트는 페이지가 index.html 하나만 있기 때문에
// 서버와의 통신은 거의 ajax로 진행한다.
// 세션이 있을 경우, 회원정보 확인같은 것도 ajax로 알아서 된다.

// 그리고 nodejs 서버파일에 const 여러개 모여있는 곳 하단(여기서는 12번째줄 정도)에다가
app.use(express.json());
var cors = require('cors');
const exp = require('constants');
app.use(cors());
// 이 코드 넣고 시작해야 리액트와 nodejs 서버간 ajax 요청이 잘 된다.



// ⭐ (서브디렉토리에 리액트앱 발행하고 싶은 경우)

// 🔻 / 경로일때 publick 폴더의 static 파일들을 사용하겠다는 뜻
app.use('/', express.static(path.join(__dirname, 'public')))
// 🔻 /react 경로일때 project1 폴더 안 build폴더의 스태틱 파일들을 사용하겠다는 뜻
app.use('/react', express.static(path.join(__dirname, 'project1/build')))

app.get('/', function (요청, 응답) { 
  응답.sendFile(path.join(__dirname, 'public/main.html'))
})
app.get('/react', function (요청, 응답) {  
  응답.sendFile(path.join(__dirname, 'project1/build/index.html'))
})
// 메인 페이지는 / 일때 main.html을 보여주고
// /react 이렇게 접속하면 리액트 앱(index.html)을 보여줌
// 위와 같이 코드를 입력 후
// 리액트 프로젝트 내의 package.json에 가서 homepage라는 항목을 발행하기 원하는 서브디렉토리명으로 새로 기입해주면 된다.
// {
//   "homepage": "/react",
//   "version": "0.1.0",
//   ... 등
// }



// ⭐ (서버앱과 리액트앱을 동시에 띄워서 개발을 진행하고 싶으면)
// 리액트도 localhost로 미리보기 띄워놓고, 서버도 localhost로 미리보기를 띄워두고 개발을 진행하고 싶으면
// 리액트에서 package.json이라는 파일을 열어서
// proxy라는 부분 설정을
// 서버 localhost:8080(서버 미리보기 띄우던거) 이걸로 설정
// 그럼 리액트에서 서버로 ajax 요청 이런거 잘됨
// (참고)
// https://create-react-app.dev/docs/proxying-api-requests-in-development/