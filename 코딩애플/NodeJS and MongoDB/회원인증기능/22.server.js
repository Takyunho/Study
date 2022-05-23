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

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');

app.use(session({ secret: '비밀코드', resave: true, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

/* ⭐ 
어떤 흐름으로 개발할 것이냐면..

어떤 사람이 로그인을 해주면 일단 그 사람의 아이디와 비번이 DB에 있는 아이디와 비번이 맞는지 검사해야합니다. 
그리고 검사 결과가 맞으면 세션을 하나 생성해주고 성공페이지로 이동시키기,
실패하면 실패페이지로 이동시키기 입니다. 

개발1. 로그인 페이지 제작 / 라우팅
개발2. 로그인 요청시 아이디/비번 검증 미들웨어 실행시키기 
개발3. 아이디/비번 검증하는 세부 코드 작성
개발4. 아이디/비번을 DB데이터와 비교
개발5. 맞으면 세션아이디 만들어서 쿠키로 보내기
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
  // 4️⃣ 아이디/비번 DB와 맞는지 비교
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


// 5️⃣ 아이디/비번 DB와 맞는지 비교 후 맞으면 세션 만들고 세션아이디 발급해서 쿠키로 보내주기 
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



// ⭐마이페이지 만들기
// 1️⃣ 마이페이지.ejs 만들기 및 라우팅
app.get('/mypage', 로그인했니 /* 로그인한 사람만 마이페이지를 보여주기 */, function (요청, 응답) {
  console.log(요청.user); // user 는 deserializeUser에서 찾았던 유저의 정보(id, pw 등등 )
  응답.render('mypage.ejs', { 사용자: 요청.user });
})

// 2️⃣ 로그인한 사람만 마이페이지를 보여주기
/* 마이페이지 접속 전 실행할 미들웨어
미들웨어(로그인했니)는 누가 mypage를 요청시 mypage.ejs를 응답해주기 전에 실행할 짧은 코드를 의미함. 그 미들웨어에서 "야 너 로그인했니?" 라고 물어보도록 하자.
*/
function 로그인했니(요청, 응답, next) {
  // console.log(요청.user); // 그냥 출력해보면 아무것도 없고, 이걸 사용하려면 deserializeUser 라는 부분 기능개발이 필요 => deserializeUser의 결과가 요청.user 부분에 꽂힘
  // 즉, 세션아이디 쿠키가 존재하면 deserializeUser 라는 함수 덕분에 항상 요청.user라는 데이터가 존재하게 된다.
  // 결론: 요청.user는 deserializeUser가 보내준 그냥 로그인한 유저의 DB 데이터

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


// 로그아웃 기능
/*
로그아웃시키는 방법은 누군가 /logout 페이지 방문시(GET 요청시) 요청.logout() 이라는 짧은 코드를 실행하시면 됩니다.
server.js에 하나 작성하시면 되겠습니다. 
(작성할 때 까먹지 말고 응답도 꼭 해주셔야합니다) 
*/

// 회원가입기능
/*
누군가 회원가입 POST 요청을 하면, 
회원가입 form에 입력했던 아이디/ 비번/ 이름 이런 정보들을 DB(login이라는 콜렉션)에 저장시키면 됩니다.
하지만 저장하기 전에 아이디가 이미 DB에 있는지 중복검사도 한번 해주면 좋겠죠?
그리고 비밀번호를 저장할 땐 비밀번호를 암호화해서 저장하는 것도 매우 좋은 관습입니다. (라기보단 그냥 필수죠)
암호화하는 라이브러리를 하나 찾아서 그대로 따라하시면 되겠습니다. 

그럼 DB에 qwer1234 라는 멋진 패스워드를
qwer1214 -> 35d91262b3c3ec8841b
뭐 이런 식으로 암호화해서 저장할 수 있습니다.  

그리고 로그인할 때도 지금은 사용자가 입력한 비번을 그대로 DB와 비교하고 있는데
사용자가 입력한 qwer1234 비밀번호를 
qwer1214 -> 35d91262b3c3ec8841b
이런 식으로 암호화해서 DB에 있는 암호화된 비번과 같은지 비교하면 되겠죠?
*/

// (참고)
/*
Q. 내가 이런 기능을 만들고 싶은데 동작 프로세스를 어떻게 짜야할지 모르겠어요.

A. 시작은 벤치마킹입니다. 비슷한 프로세스를 가진 사이트를 구경해보십시오.
쇼핑몰을 만들고 싶다면 쇼핑몰 관리자 페이지를 구경해보십쇼. (요즘은 무료 쇼핑몰개설 사이트 많으니까요)
그 사이트에 나와있는 페이지와 프로세스를 똑같이 따라 구현하시면 기능개발 끝입니다. 


Q. 실제 서버 제작을 위해 신경쓰거나 더 공부해봐야할 사항들이 있나요? 

- 디자인, UI 개발, IE 호환성, 반응형 웹 등 프론트엔드 내용
- 악성 유저가 아이디를 너무 길거나 이상하게 적으면 어떻게 할지 (직접 악성 유저가 되어 이것저것 테스트해보시면 됩니다)
- DB에 저장하기 전에 빈칸이 없는지, 길이가 너무 길지 않은지 정규식과 if문으로 검증하기 
- helmet 라이브러리 등으로 보안 약간 더하기
- 이미지 업로드 등 서버에서 이미지 처리하기 (압축, 저장, 리사이즈 등)
- Oauth 등 다른 로그인 방식 도입해보기
- express-session 라이브러리는 세션이 많아지면 서버의 메모리를 많이 잡아먹기 때문에 connect-mongo 등의 라이브러리로 DB에 세션데이터를 저장해서 사용하기 

등 여러분이 필요한 서비스에 따라 많은 것들이 달라질 수 있습니다. 
*/