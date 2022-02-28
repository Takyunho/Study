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

  // Search index 이용해서 검색요청하는 법
  var 검색조건 = [
    // aggregate() 안에 [ {검색조건1}, {검색조건2} ... ] 이렇게 조건을 여러개 집어넣을 수 있다.
    {
      $search: {  // 연산자인 $search를 넣으면 search index에서 검색이 된다
        index: 'titleSearch',
        text: {
          query: 요청.query.value,
          path: 'title'    // 제목날짜 둘다 찾고 싶으면 ['title', 'date']
        }
      }
    },
    // 여러가지 검색용 연산자
    // $sort를 쓰면 결과를 정렬해서 가져옴 / _id를 오름차순으로 정렬
    // { $sort: { _id: 1 } },
    // $limit을 쓰면 결과를 제한함 / 맨위에서 10개만 가져옴
    // { $limit: 10 },
    // $project를 쓰면 찾아온 결과 중에 원하는 항목만 보여줌
    // 0은 안보여주고 1은 보여주라는 뜻
    // { $project : { title : 1, _id : 1, date : 1 } }  // _id는 빼고 제목만 가져옴

    // 이 외에도 많음 ( 필요할 때 찾아서 쓰자 )
  ]
  // aggregate() 함수 : 검색조건 여러개를 붙이고 싶을 때 유용한 함수
  db.collection('post').aggregate(검색조건).toArray(function (에러, 결과) {
    console.log(결과)
    응답.render('search.ejs', { 리스트: 결과 });
  })
})




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
    // 응답.render('login.ejs');
    응답.redirect('/login');
  }
}





// 회원가입기능
app.get('/register', function (요청, 응답) {
  응답.render('register.ejs')
})

app.post('/register', function (요청, 응답) {

  console.log(요청.body.id);  // test1

  if (요청.body.id == '') {
    alert('올바른 아이디가 아닙니다.')
  } else {
    
    db.collection('login').insertOne({ id: 요청.body.id, pw: 요청.body.pw }, function (에러, 결과) {
      응답.redirect('/');
    })

  }
  
})





// 글 주인만 삭제 가능하도록 게시물 발행하는 POST 요청처리하는 코드바꾸기
// Write POST요청
app.post('/newPost', function (요청, 응답) {

  console.log(요청.user._id);

  db.collection('counter').findOne({ name: '게시물개수' }, function (에러, 결과) {
    console.log(결과.totalPost);
    var 총게시물개수 = 결과.totalPost;  // (2). 결과.totalPost를 총게시물개수라는 변수에 저장

    var 저장할거 = { _id: 총게시물개수 + 1, 작성자 : 요청.user._id, title: 요청.body.title, date: 요청.body.date, /* 저장날짜 : new Date() */}  // 작성자 이름이나 번호도 기록할 수 있음 그러나 그럴 필요가 없음 _id는 유니크한 id니까 그걸 다른 컬렉션에 조회해보면 이름같은거 금방 나옴
    // 날짜 저장도 가능
    // 자바스크립트로 new Date() 이렇게 쓰면 그 자리에 날짜데이터가 남습니다. 그거 그대로 DB에 저장하면 날짜 저장 끝임

    db.collection('post').insertOne(저장할거, function (에러, 결과) {
      console.log('저장됨');
      db.collection('counter').updateOne({ name: '게시물개수' }, { $inc: { totalPost: 1 } }, function (에러, 결과) {
        if (에러) {
          return console.log(에러)
        }
      })
      응답.redirect('/list');
    })
  });
});



// delete요청
// 1. 버튼 클릭 2. ajax 요청 3. 서버에서 delete 요청
app.delete('/delete', function (요청, 응답) {
  console.log(요청.body);       // (ajax 요청시 data)
  console.log(요청.user._id);
  // 요청.body 내의 _id를 숫자로 변환시키자
  요청.body._id = parseInt(요청.body._id);

  var 삭제할거 = { _id : 요청.body._id, 작성자 : 요청.user._id} // 삭제요청할 때 예전엔 { _id : 요청.body._id } 이거 글번호만 확인하라고 해놨는데 { 작성자 : 지금로그인한사용자의_id } 이것도 가지고 있으면 삭제하라고 업그레이드

  // 요청.body에 담겨온 데이터를 가진 글을 찾아서 db에서 삭제해줘
  db.collection('post').deleteOne(삭제할거, function (에러, 결과) {
    console.log('삭제완료');
    응답.status(200).send({ message: '성공했습니다.' });

  });
});



// ⭐ Route 관리하기

// app.use()를 사용해서 전역 미들웨어의 형식으로 라우터를 넣어주시면 라우터를 적용할 수 있다.(express가 그렇게 쓰래요)

// app.use('/') 이런 식으로 URL 경로를 넣으면 미들웨어를 조건부로 실행
// 누군가 /shop으로 요청하면 실행
app.use('/shop', require('../routes/shop.js')); // 경로를 /shop으로 하면 1. 라우트들 관리가 편해짐(보기가 쉬워지므로) 2. /shop과 관련된 route들에만 미들웨어를 적용하고 싶을 때도 매우 편리해짐

// shop.js로 이동
// app.get('/shop/shirts', function (요청, 응답) {
//   응답.send('셔츠 파는 페이지입니다.');
// });

// app.get('/shop/pants', function (요청, 응답) {
//   응답.send('바지 파는 페이지입니다.');
// });

app.use('/board/sub', require('../routes/board.js'));