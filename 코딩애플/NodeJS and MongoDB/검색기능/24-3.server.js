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

/*
find({ $text: { $search: 요청.query.value }})
find() 안에 저렇게 $text 어쩌구로 시작하시면 만들어둔 text 인덱스에서 검색이 가능합니다.
이렇게 기능개발해놓으면 간단한 검색엔진처럼 검색도 가능한데 

검색창에
이닦기 글쓰기라고 검색하면 이닦기 or 글쓰기가 포함된 모든 문서를 찾아줌
이닦기 -글쓰기라고 검색하면 이닦기인데 글쓰기라는 단어 제외 검색
"이닦기 글쓰기" 라고 검색하면 정확히 이닦기 글쓰기라는 phrase가 포함된 문서 검색
이렇게 가능합니다.

단점
글쓰기라고 검색하라면 글쓰기입니다~ 이런 문장은 못찾아줍니다.
영어는 상관없는데 영어가 아닌 언어들은 그래서 text search 기능을 쓸 수가 없습니다.
그래서 그냥 영어서비스 개발할거면 쓰시고 아니라면 지웁시다. 
그럼 100만개에서 '글쓰기'라는 단어가 포함된 문서를 검색해야하면 어떻게 하죠 ㄷㄷ


해결책 1. 검색할 문서의 양에 제한을 둡니다.

DB에다가 검색요청을 날릴 때 특정 날짜에서만 검색하라고 요구할 수도 있고
skip(), limit() 이런 함수를 이용하시면 pagination 기능을 개발할 수 있습니다.
그니까 맨 처음 검색할 땐 맨앞에 20개만 찾아줘~
그 다음엔 다음 20개를 찾아줘~ 
이렇게 요구할 수 있다는 겁니다. 대부분의 게시판들은 이런 방법을 이용합니다.


해결책 2. text search 기능을 굳이 쓰고 싶으면

MongoDB를 님들이 직접 설치하셔야합니다.
그리고 indexing할 때 띄어쓰기 단위로 글자들을 indexing하지말고
다른 알고리즘을 써라~ 라고 셋팅할 수 있습니다. 
nGram 이런 알고리즘을 쓰면 된다고 하는데 이걸 언제하고 있습니까 패스합시다 


해결책 3. Search index를 사용합니다.

MongoDB Atlas에서만 제공하는 기능인데 
클러스터 들어가보시면 아마 Search 어쩌구라는 메뉴가 있을겁니다. 그거 누르시면 됩니다. 
그러면 Search index라는걸 만들 수 있습니다.
전에 만든 text index랑 비슷한 기능을 제공하는데
아무튼 이름 잘 지어서 만들어주십시오. 
index 이름은 자유 작명이고
어떤 collection에 있는 항목을 indexing 할건지 선택하면 됩니다. 
그리고 Analyzer를 설정하는 부분이 있습니다.
이걸 lucene.korean으로 바꿔주시면 똑똑하게 한국어에 딱 맞게 인덱싱을 해줍니다. 
lucene이 뭐냐면 그 형태소분석기 이런건데 한국어는 쓸데없는 조사 이런게 붙지 않습니까
글쓰기를
글쓰기입니다
글쓰기지만
글쓰기라도
이런 식으로 단어 뒤에 쓸데없는 조사가 붙는데 이걸 다 제거하고 필요한 단어만 남긴다고 보시면 됩니다. 
아무튼 이렇게 하시면 Search index를 만들 수 있습니다. 끝 


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


