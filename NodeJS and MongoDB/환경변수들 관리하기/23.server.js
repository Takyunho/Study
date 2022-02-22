const express = require('express');
const app = express();
// 바디파서 등록
app.use(express.urlencoded({ extended: true }));
// 몽고디비 연결
const MongoClient = require('mongodb').MongoClient;
// EJS 등록
app.set('view engine', 'ejs');
// css 적용을 위해
app.use('/public', express.static('public')); // 나는 static 파일을 보관하기 위해 public 폴더를 쓸거다 -> css 적용시 /public 경로 적어야함
// 메소드 오버라이드 라이브러리
const methodOverride = require('method-override');
app.use(methodOverride('_method'));
// 환경변수 라이브러리 등록
require('dotenv').config();



// db 전역변수로 선언
var db;

MongoClient.connect(process.env.DB_URL, function (에러, client) {
  // 연결되면 할일
  if (에러) {
    return console.log(에러)
  }
  // 나의 db 가져와서 db에 할당
  db = client.db('yundb');
  // 서버와 연결
  app.listen(process.env.PORT, function () {
    console.log('listening on 8080')
  });

})


// home
app.get('/', function (요청, 응답) {
  응답.render('home.ejs');
})
// Write
app.get('/write', function (요청, 응답) {
  응답.render('write.ejs');
})


// POST요청
app.post('/newPost', function (요청, 응답) {
  // (1). counter라는 collection에서 name : '게시물개수'인 데이터를 찾아주세요
  db.collection('counter').findOne({ name: '게시물개수' }, function (에러, 결과) {
    console.log(결과.totalPost);
    var 총게시물개수 = 결과.totalPost;  // (2). 결과.totalPost를 총게시물개수라는 변수에 저장

    // (3). post라는 콜렉션에 insertOner을 써서 id와 함께 데이터 저장
    db.collection('post').insertOne({ _id: 총게시물개수 + 1, title: 요청.body.title, date: 요청.body.date }, function (에러, 결과) {
      console.log('저장됨');

      // (4). post라는 콜렉션에 데이터를 저장하고 나면, counter라는 콜렉션에 있는 totalPost 라는 항목도 1 증가시켜야함
      db.collection('counter').updateOne({ name: '게시물개수' }, { $inc: { totalPost: 1 } }, function (에러, 결과) {
        if (에러) {
          return console.log(에러)
        }
      })
      응답.redirect('/list');
    })
  });
});


// list
app.get('/list', function (요청, 응답) {
  // 순서 : 1. list에 get요청하면 2.데이터 꺼내고 3. list.ejs 파일 렌더링
  // db에 저장된 post라는 collection안의 모든 데이터를 꺼내주세요
  db.collection('post').find().toArray(function (에러, 결과) { // db에 저장된 모든 데이터 가져오기
    console.log(결과);
    응답.render("list.ejs", { posts: 결과 }) // 찾은걸 ejs 파일에 집어넣기
  });
  // 여기서 결과를 출력해보면 나오지 않음
});


// delete 요청(글 삭제기능)
// 1. 버튼 클릭 2. ajax 요청 3. 서버에서 delete 요청
app.delete('/delete', function (요청, 응답) {
  console.log(요청.body); // (ajax 요청시 data)

  // 요청.body 내의 _id를 숫자로 변환시키자
  요청.body._id = parseInt(요청.body._id);

  // 요청.body에 담겨온 데이터를 가진 글을 찾아서 db에서 삭제해줘
  db.collection('post').deleteOne(요청.body, function (에러, 결과) {
    console.log('삭제완료');
    응답.status(200).send({ message: '성공했습니다.' });

  });
});


// detail/:id
// (1). 어떤 사람이 /detail/:작명 로 접속하면(get요청하면)
app.get('/detail/:id', function (요청, 응답) {
  // (2). post 콜렉션에서 { _id : :id } 인 게시물 찾음
  db.collection('post').findOne({ _id: parseInt(요청.params.id) }, function (에러, 결과) {

    // (3). 찾은 결과를 detail.ejs로 보냄
    // 없는 게시물 에러처리하기
    if (결과 == null) {
      // 응답.status(404).send('찾을 수 없는 페이지');
      응답.render('error.ejs');
    } else {
      응답.render('detail.ejs', { data: 결과 });
    }
  
  });
});


// edit/:id
app.get('/edit/:id', function (요청, 응답) {

  db.collection('post').findOne({ _id : parseInt(요청.params.id)}, function (에러, 결과) {
    console.log(결과);

    // 없는 게시물 에러처리하기
    if (결과 == null) {
      // 응답.status(404).send('찾을 수 없는 페이지');
      응답.render('error.ejs');
    } else {
      응답.render('edit.ejs', { postData : 결과 } )
    }
  
  })

})

// PUT 요청 (글수정)
app.put('/edit', function (요청, 응답) {
  
  console.log(요청.body);
  // 폼에담긴 제목데이터, 날짜데이터를 가지고 db.collection에다가 업데이트함
  db.collection('post').updateOne({ _id: parseInt(요청.body.id) }, { $set: { title: 요청.body.title, date: 요청.body.date } }, function (에러, 결과) {
    응답.redirect('/list')  // 요청이 성공하면 /list로 이동
  });
});




// 로그인 페이지 만들기 & 아이디 비번 검사

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');

app.use(session({ secret: '비밀코드', resave: true, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// 1️로그인 페이지 만들고 라우팅 하기
// /login 방문시 보여주기
app.get('/login', function (요청, 응답) {
  응답.render('login.ejs')
})

// 2️로그인 페이지에서 로그인을 하면 아이디, 비번 검사
// 어떤 사람이 로그인을 하면 (login페이지에서 post 요청을 하면(폼 전송을 하면))
app.post('/login', passport.authenticate('local', { failureRedirect : '/fail' }) , function (요청, 응답) {
  응답.redirect('/')  // 로그인 성공하면 홈으로 이동
})


// 3️어떻게 인증할건지 세부 코드를 작성
// 아이디/ 비번을 검사해주는 코드
passport.use(new LocalStrategy({
  usernameField: 'id',
  passwordField: 'pw',
  session: true,
  passReqToCallback: false,
}, function (입력한아이디, 입력한비번, done) {
  //console.log(입력한아이디, 입력한비번);
  // 4️아이디/비번 DB와 맞는지 비교
  db.collection('login').findOne({ id: 입력한아이디 }, function (에러, 결과) {   
    if (에러) return done(에러)

    if (!결과) return done(null, false, { message: '존재하지않는 아이디요' })
    if (입력한비번 == 결과.pw) {
      return done(null, 결과) // 아이디/비번 검사가 성공
    } else {
      return done(null, false, { message: '비번틀렸어요' })
    }
  })
}));


// 5️아이디/비번 DB와 맞는지 비교 후 맞으면 세션 만들고 세션아이디 발급해서 쿠키로 보내주기 
// id를 이용해서 세션을 저장시키는 코드(로그인 성공시 발동)
passport.serializeUser(function (user /* = 결과 */, done) {  
  done(null, user.id) // user = { id: test, pw: test} / user.id = test
});

// 로그인 된 유저가 마이페이지 등을 접속했을 때 실행되는 함수
// deserializeUser() = 로그인한 유저의 세션아이디를 바탕으로 개인정보를 DB에서 찾는 역할을 하는 함수 / 그리고 그 결과를 요청.user 부분에 꽂아줌
passport.deserializeUser(function (아이디 /* = user.id */, done) {  
  
  // db에서 위에 있는 user.id로 사용자를 찾은 뒤에 유저 정보를  done({})에 넣음
  db.collection('login').findOne({ id: 아이디 /* test */ }, function (에러, 결과) {
    done(null, 결과)  // DB에서 {id : 세션아이디에 숨겨져있던 유저의 아이디} 인 게시물을 하나 찾아서 그 찾은 DB데이터 결과를 done(null, 결과) 이렇게 해줌
    // 그러면 결과가 요청.user 부분으로 ㄱㄱ
  })
  
});



// 마이페이지 만들기
// 1️마이페이지.ejs 만들기 및 라우팅
app.get('/mypage', 로그인했니 /* 로그인한 사람만 마이페이지를 보여주기 */, function (요청, 응답) {
  console.log(요청.user); // user 는 deserializeUser에서 찾았던 유저의 정보(id, pw 등등 )
  응답.render('mypage.ejs', { 사용자: 요청.user });
})

// 2️로그인한 사람만 마이페이지를 보여주기
function 로그인했니(요청, 응답, next) {
  // console.log(요청.user); // 요청.user는 deserializeUser가 보내준 그냥 로그인한 유저의 DB 데이터

  // "요청.user 가 있으면 next()로 통과시켜주시고요, 없으면 에러메세지를 응답.render() 해주세요~"
  if (요청.user) {  // 요청.user가 있나염?
    next();         // 있으면 next = 통과 
  } else {
    응답.render('login.ejs');
  }
}
/*
요청.user 는
로그인 한 유저의 DB상 정보(아이디, 비번, 유저명 등)
*/


// ⭐ .env 파일에서 민감한 환경변수들 관리하기
// 선택사항이긴 하지만 실제 서버배포시 필수라고 볼 수 있는 .env 파일

/*
서버 띄울 때 작성 했던 코드에
8080 이라는 포트번호, mongodb+srv라고 시작하는 이상한 DB접속 문자열이 존재합니다. 
이런 값들은 다른 개발환경이나 다른 컴퓨터로 코드를 옮긴다면 수정이 필요할 수 있습니다.
-다른 컴퓨터에선 8070 포트를 연다든지,
- 나중에 DB 이사를 가서 DB접속 문자열이 바뀐다든지
- 아니면 내가 만든 코드를 팀원과 share 해야하는데 내 아이디 비번이 적혀있으면 좀 그렇잖습니까 
(이런 환경에 따라 가변적인 변수 데이터들을 보통 환경변수라고 부릅니다.)

그래서 개발자들은 미래를 생각하는 코딩을 하기 위해 환경변수를 한곳에 모아서 관리합니다. 
.env파일이라는 곳입니다. 
.env파일에 모든 중요 환경변수들을 다 쑤셔박아넣은 뒤에,
server.js에 가서 ".env파일에 있는 포트숫자를 여기에 넣어주세요~" 이런 식으로 코딩합니다.
이 경우 server.js 파일이 털릴 경우에도 중요한 정보들은 env 파일에 있기 때문에 조그만한 보안상 이점도 있긴 있습니다. 
구체적으로 어떻게 사용하는지 튜토리얼 들어갑니다. 


1. 환경변수 사용을 위한 라이브러리를 설치합니다.
오늘도 어김없이 라이브러리 설치입니다. 
터미널을 켜시고 npm install dotenv 라고 입력하셔서 설치하시면 됩니다. 


2. 환경변수가 있는 server.js에 방금 설치한 라이브러리를 등록합니다.

(server.js)
require('dotenv').config()

server.js 상단에 (const 모여있는 곳에) 이렇게 적어주시면 됩니다.
이제 하단에서 환경변수를 자유롭게 사용가능합니다.


3. server.js와 같은 경로에 .env 파일을 하나 만들어줍니다.
그리고 내부에 여러분이 나중에 변경이 될 것 같은 환경변수들을 전부 다 적고 저장해주시면 됩니다.

(.env 파일)

PORT=8080
DB_URL="mongodb+srv://codingapple1@저쩌구"

이런 식입니다. 
형식은 var 문법으로 숫자, 문자 변수만드는거랑 똑같이 왼쪽엔 변수명, 오른쪽은 값을 넣는다고 보시면 됩니다.
다만 변수 이름들은 보통 대문자로 표기합니다. 
여기 파일에 모든 환경변수를 모아놓으면 나중에 이 파일만 수정하면 되니까 관리도 편해지고,
나중에 작업환경이 바뀌거나 클라우드에 올릴 때도 요것만 변경해주면 쉽게 환경셋팅이 가능해집니다. 


4. 그럼 환경변수들을 server.js에다가 불러오도록 합시다.
server.js에서 env파일의 변수들을 불러오실 때는 process.env.변수이름 이렇게 불러올 수 있습니다

(env 파일을 적용하는 server.js 코드)

var db;
  MongoClient.connect(process.env.DB_URL, function(err, client){
  if (err) return console.log(err)
  db = client.db('Example1');
  app.listen(process.env.PORT, function() {
    console.log('listening on 8080')
  })
}) 

이렇게 코드를 짜시면 이제 나중에 환경변수 변경이 필요할 때
직접 server.js 코드를 뒤져서 바꾸는게 아니라 .env 파일만 손보면 되니 약간 더 편리하겠죠?

여러분이 나중에 AWS, Google, Naver 클라우드 등을 이용해서 서버를 발행할 때 env파일을 똑같이 이용할 수 있습니다. 
구글 클라우드 서비스에 올릴 경우 env 파일을 따로 만드는게 아니라 app.yaml 파일 내에 환경변수들을 포함해야하는데

https://cloud.google.com/appengine/docs/standard/nodejs/config/appref#environment_variables
이런 곳을 참고해서 똑같이 환경변수를 제작하면 되겠습니다. 
다만 변수만드는 문법에 등호 대신 콜론 (:)을 씁니다.

그러니 어서 .env 파일을 활용해보시길 바랍니다. 
.env 파일 만드실 때 파일명에 마침표 있는거 잊지 마시고요.
*/