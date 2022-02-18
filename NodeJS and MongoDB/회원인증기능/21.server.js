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

/*
if ( 입력한비번 == 결과.pw ) 라는 부분에서 사용자가 입력한 비밀번호와 DB의 pw 항목을 같은지 비교하고 있는데
- 애초에 DB에 pw를 저장할 때 암호화해서 저장하는 것이 좋으며
- 사용자가 입력한 비번을 암호화해준 뒤에 이게 결과.pw와 같은지 비교하는게 조금 더 보안에 신경쓴 방법입니다. 

하지만 보안보안 암호화암호화 거리면 강의가 너무나 복잡해져서 이해도가 떨어질 수 있기 때문에
나중에 구글에 좋은 비번저장 예제를 찾아서 한번 그대로 적용해보시길 바랍니다.
*/



// 5️⃣ 세션 만들고 세션아이디 발급해서 쿠키로 보내주기 
/*
아이디/비번을 DB데이터와 비교해서 이게 맞다면 어떻게 해야합니까.
세션 방식을 적용한다고 했으니 세션데이터를 하나 만들어주면 되겠죠? (이건 라이브러리가 알아서 합니다)
그리고 세션데이터에 포함된 세션아이디를 발급해서 유저에게 보내면 됩니다. 
실은 쿠키로 만들어서 보내주시면 됩니다.
*/
// id를 이용해서 세션을 저장시키는 코드(로그인 성공시 발동)
passport.serializeUser(function (user, done) {
  done(null, user.id)
});
/*
세션데이터를 만들고 세션아이디를 만들어 보내주는 것은
serializeUser 라는 함수가 하는 역할
- 유저의 id 데이터를 바탕으로 세션데이터를 만들어주고
- 그 세션데이터의 아이디를 쿠키로 만들어서 사용자의 브라우저로 보내줍니다.
*/

// 세션 데이터에 있으면 어떤 사람인지 해석하는 부분
// 로그인 된 유저가 마이페이지 등을 접속했을 때 실행되는 함수
passport.deserializeUser(function (아이디, done) {
  done(null, {})
});



// 테스트
/*
어떤 사람이 DB에 저장된 아이디/비번 한쌍으로 로그인하면
쿠키가 만들어져서 고객의 브라우저로 전송되어야 한다.
그럼 로그인 페이지에서 로그인을 시도해보고
쿠키가 진짜 서버에서 들어오는지 확인하자.

쿠키는 개발자도구의 어플리케이션 탭의 좌측 Cookies에서 확인할 수 있다.

로그인 성공시 session 어쩌구라고 적힌 쿠키가 새로 하나 생성되면 성공이다.
*/


