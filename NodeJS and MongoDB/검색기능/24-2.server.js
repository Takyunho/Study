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


// ⭐ 검색기능 만들기 /list
// 서버에서 query string 확인하는 법
app.get('/search', (요청, 응답) => {
  console.log(요청.query);  

  db.collection('post').find({title : 요청.query.value}).toArray(function (에러, 결과) {
    console.log(결과)
    응답.render('search.ejs', { 리스트: 결과 });
  })
})
// 문제점 : 정확히 일치하는 것만 찾아줌
// '약속'이라고 검색하면 '약속시간'이런 게시물은 못찾음
// 해결 방법 : 정규식을 쓰면된다.
// 정규식은 문자를 검사하는 식 // 안에다가 문자를 담으면 검사해줌
// /abc/ 이렇게 적으면 문자에 abc라는게 들어있냐~ 라고 검사해줄 수 있으니 이거 쓰면 해결


// Database가 게시물을 찾는 방법

/*
원래 게시물을 그냥 찾으면 매우 느립니다.
원하는걸 찾으려면 게시물 100만개를 전부 탐색해야하니까요.
그래서 데이터베이스는 보통 Binary Search라는걸 사용할 수 있습니다. 

이게 뭐냐면 제가 1부터 100까지 숫자를 하나 생각해볼테니 여러분이 한번 찾아보시길 바랍니다.
빠르게 찾고싶으면 저에게 어떻게 질문을 던져야할까요.

1입니까 2입니까~~ 이렇게 하나하나 물어보면 평생걸리겠죠?
그래서 똑똑한 사람들은 "50 이상입니까?" 라고 물어봅니다.
예라고 답하면 그 다음은 "75 이상입니까?" 라고 물어봅니다.
이렇게 반을 잘라가면서 물어보면 매우 빠르게 최소한의 질문으로 찾아낼 수 있습니다. 
5~6번만 질문 던지면 100개 중에 내가 원하는 항목을 빠르게 찾을 수 있게 됩니다.
게시물이 100만개라도 20번만 물어보면 될걸요? 
이게 Binary Search라는 알고리즘입니다.

거의 모든 Database들은 기본적으로 이걸로 게시물을 찾아주는데
근데 이걸 쓰려면 조건이 있습니다. 숫자가 1부터 100까지 미리 정렬이 되어있어야합니다.
그래야 "50 이상입니까~" 라고 물어보죠.
*/



// 그럼 글제목도 빠르게 찾으려면
/*
미리 정렬해두면 되지 않을까요? (글자도 정렬이 가능합니다)
맞습니다 이걸 멋진 용어로 indexing이라고 합니다. 
indexing을 해두면 이제 글자로 뭔가 검색할 때 매우 빠르게 찾을 수 있습니다.
indexing 하려면 MongoDB Atlas 들어가셔서
원하는 Collection 안에서 Index 만들기 누르시면 됩니다.
그 다음에

{ 인덱스만들항목이름 : 'text' }

이렇게 기입하면 끝입니다.
글자인 경우 'text' 숫자인 경우 1 또는 -1을 기입하면 끝입니다. 
그러면 index가 생성됩니다.
인덱싱이라는 용어가 어려워 보이지만 그냥 collection을 사본을 하나 더 만들어주는 작업일 뿐입니다. 근데 정렬된 사본임 
아무튼 index를 만들어두면 빠르게 찾아낼 수 있는데 한글 게시물들의 경우 문제점이 있을 수 있습니다. 

(참고) 정규식을 사용하면 항상 index를 사용하는게 아닙니다.
정규식을 쓸 때 시작하는 단어가 '이닦기'인걸 찾아주세요~ 라고 명령을 주면 index를 사용하고
'이닦기'가 포함된걸 다찾아주세요~ 라고 명령을 주면 index를 사용하지 않습니다.
그래서 인덱싱 이런게 항상 만능은 아닙니다. 
*/


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


