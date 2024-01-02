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
const methodOverride = require('method-override')
app.use(methodOverride('_method'))


// db 전역변수로 선언
var db;

MongoClient.connect('mongodb+srv://yundb:1q2w3e4r@cluster0.5cjru.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', function (에러, client) {
  // 연결되면 할일
  if (에러) {
    return console.log(에러)
  }
  // 나의 db 가져와서 db에 할당
  db = client.db('yundb');
  // 서버와 연결
  app.listen(8080, function () {
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




// ⭐ 로그인 페이지 만들기 & 아이디 비번 검사

// (1) 로그인 & 세션생성을 도와줄 라이브러리 설치
/*
npm install passport passport-local express-session

을 터미널에 입력해서 설치하도록 합시다. 
저렇게 띄어쓰기로 동시에 3개 라이브러리를 설치하시면 됩니다. 
로그인, 로그인 검증, 세션생성을 도와주는 라이브러리 들입니다. 
(실제 서비스시 express-session 말고 MongoDB에 세션데이터를 저장해주는 라이브러리를 이용하시면 좋습니다.)
*/

// (2) server.js 상단에 설치한 라이브러리를 require 해줍니다.
// 그래야 설치한 것들을 사용할 수 있으니깐요. (라이브러리 사용법에 이렇게 나와있는거 그대로 작성한 것입니다)
// 대소문자 구분 해야함
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');

app.use(session({ secret: '비밀코드', resave: true, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
/* app.use() 어쩌구 부분은 '미들웨어를 쓰겠다'라는 뜻입니다. 
미들웨어가 뭐냐면..
서버는 요청을 받으면 응답을 해주는 기계랬죠?
그런데 요청과 응답 사이에 뭔가 실행시키는 코드들이 바로 미들웨어입니다. 
뭐.. 요청이 적법한지 검사하는 그런 기능들을 미들웨어에 많이 담습니다.

미들웨어를 어떻게 쓰냐면.. app.use 안에 담는 코드들은 전부 미들웨어 역할을 할 수 있습니다. 
그러니깐 위에 있는 코드 중에 passport.initialize() 그리고 passport.session() 이런 코드들이
모든 요청과 응답 중간에 실행된다는 뜻입니다. 

나중에 미들웨어를 직접 하나 만들고 싶다면 그것도 가능합니다.
그냥 app.use() 안에 집어넣어주시면 되겠습니다.
*/


/* ⭐ 
어떤 흐름으로 개발할 것이냐면..

어떤 사람이 로그인을 해주면 일단 그 사람의 아이디와 비번이 DB에 있는 아이디와 비번이 맞는지 검사해야합니다. 
그리고 검사 결과가 맞으면 세션을 하나 생성해주고 성공페이지로 이동시키기,
실패하면 실패페이지로 이동시키기 입니다. 
*/

// 1️⃣ 로그인 페이지 만들고 라우팅 하기
// 로그인할 페이지를 ejs로 만들고 action이랑 name 수정
// /login 방문시 보여주기
app.get('/login', function (요청, 응답) {
  응답.render('login.ejs')
})

// 2️⃣ 로그인 페이지에서 로그인을 하면 아이디, 비번 검사
// 어떤 사람이 로그인을 하면 (login페이지에서 post 요청을 하면(폼 전송을 하면))
app.post('/login', passport.authenticate('local', { failureRedirect : '/fail' }) , function (요청, 응답) {
  응답.redirect('/')  // 로그인 성공하면 홈으로 이동
})
/*
로그인시 그냥 홈으로 이동시키기만 하면 되는게 아니라 중간에 검사를 해야합니다. 
아이디랑 비번이 맞나요? 이렇게 물어보시면 됩니다. 
그런 코드는 어떻게 짜냐면 

passport.authenticate('local', {failureRedirect : '/fail'})
// passport 라는 라이브러리가 제공하는 '아이디 비번 인증도와주는 코드'

post() 라는 함수 두번째 파라미터로 위에 코드를 추가해주시면 요청과 응답 사이에 특정 기능을 실행할 수 있습니다. 
응답해주기 전에 local 방식으로 아이디 비번을 인증해주세요 라는 뜻으로 해석하시면 되겠습니다.
(failureRedirect라는 부분은 로그인 인증 실패시 이동시켜줄 경로를 적으시면 됩니다. 위의 코드는 실패시 /fail 경로로 유저를 이동시켜줍니다.)
*/


// 3️⃣ 어떻게 인증할건지 세부 코드를 작성
// 위에처럼만 작성하면 자동으로 인증해주진 않음
// 세부사항을 잘 정의 해야함
// 아래처럼 passport 라이브러리 예제코드를 복붙하면 됨
// 아이디/ 비번을 검사해주는 코드
passport.use(new LocalStrategy({
  usernameField: 'id',
  passwordField: 'pw',
  session: true,
  passReqToCallback: false,
}, function (입력한아이디, 입력한비번, done) {
  //console.log(입력한아이디, 입력한비번);
  db.collection('login').findOne({ id: 입력한아이디 }, function (에러, 결과) {
    if (에러) return done(에러)

    if (!결과) return done(null, false, { message: '존재하지않는 아이디요' })
    if (입력한비번 == 결과.pw) {
      return done(null, 결과)
    } else {
      return done(null, false, { message: '비번틀렸어요' })
    }
  })
}));

/*
이것이 여러분의 아이디/ 비번을 검사해주는 코드입니다. 
직접 창조해서 작성하기 어려우니 그냥 복사붙여넣기를 해주시고 원하는 부분 수정하는 식으로 접근하면 충분합니다. 

LocalStrategy() 라고 부르는 이상한 코드가 있습니다. 이게 여러분 local 방식으로 아이디/비번 검사를 어떻게 할지 도와주는 부분이라고 보시면 됩니다.
그리고 그 안에 세부설정을 해주시면 됩니다. 
LocalStrategy( { 설정 }, function(){ 아이디비번 검사하는 코드 } )
이런 흐름으로 되어있습니다. 

{설정}부분
설정은 여러가지가 가능한데 그중 필수로 해야하는 것들만 적었는데
상세히 무슨 뜻인지 설명해드리자면 

passport.use( new LocalStrategy({ 
    usernameField: 'id', (요기는 사용자가 제출한 아이디가 어디 적혔는지) 
    passwordField: 'pw', (요기는 사용자가 제출한 비번이 어디 적혔는지) 
    session: true, (요기는 세션을 만들건지) 
    passReqToCallback: false, (요기는 아이디/비번말고 다른 정보검사가 필요한지) 
}); 

옆에 하나씩 한글을 적은 것만 읽어도 충분하겠군요. 
- usernameField는 사용자가 제출한 아이디가 어떤 <input>인지 <input>의 name 속성값을 적어주시면 됩니다. 
- passwordField도 마찬가지입니다. 
- session : true는 세션을 하나 만들어줄건지 입니다. 만들어줘야 나중에 다시 로그인 안해도 되겠죠?
- passReqToCallback 부분은 사용자의 아이디/비번 말고도 다른 정보를 검사해야할 경우 true로 바꿔주시면 됩니다.
그러면 옆에 있는 콜백함수의 첫번째 파라미터로 기타 정보들이 들어가는데 파라미터.body 이런 식으로 출력해보시면 알 수 있습니다.
아직은 쓸 일이 없기 때문에 쓸일 있으시면 그 때 구글에 사용법을 찾아서 쓰도록 합시다. 

다른사람이 만든 라이브러리 갖다 쓰는건데 외우거나 전부 이해할 필요 전혀 없습니다
그저 웹을 만들고 싶다면 그냥 복붙잘하고 사용법만 익히면 끝입니다.
*/