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


// // Write POST요청 ====> ( user.id를 사용하기 위해 아래로 이동 )
// app.post('/newPost', function (요청, 응답) {
//   // (1). counter라는 collection에서 name : '게시물개수'인 데이터를 찾아주세요
//   db.collection('counter').findOne({ name: '게시물개수' }, function (에러, 결과) {
//     console.log(결과.totalPost);
//     var 총게시물개수 = 결과.totalPost;  // (2). 결과.totalPost를 총게시물개수라는 변수에 저장

//     // (3). post라는 콜렉션에 insertOner을 써서 id와 함께 데이터 저장
//     db.collection('post').insertOne({ _id: 총게시물개수 + 1, title: 요청.body.title, date: 요청.body.date }, function (에러, 결과) {
//       console.log('저장됨');

//       // (4). post라는 콜렉션에 데이터를 저장하고 나면, counter라는 콜렉션에 있는 totalPost 라는 항목도 1 증가시켜야함
//       db.collection('counter').updateOne({ name: '게시물개수' }, { $inc: { totalPost: 1 } }, function (에러, 결과) {
//         if (에러) {
//           return console.log(에러)
//         }
//       })
//       응답.redirect('/list');
//     })
//   });
// });


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



// delete 요청(글 삭제기능) ====> 아래로 이동 (passport.serializeUser 아래로)
// // 1. 버튼 클릭 2. ajax 요청 3. 서버에서 delete 요청
// app.delete('/delete', function (요청, 응답) {
//   console.log(요청.body); // (ajax 요청시 data)

//   // 요청.body 내의 _id를 숫자로 변환시키자
//   요청.body._id = parseInt(요청.body._id);

//   // 요청.body에 담겨온 데이터를 가진 글을 찾아서 db에서 삭제해줘
//   db.collection('post').deleteOne(요청.body, function (에러, 결과) {
//     console.log('삭제완료');
//     응답.status(200).send({ message: '성공했습니다.' });

//   });
// });


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
/*
요청.user 는
로그인 한 유저의 DB상 정보(아이디, 비번, 유저명 등)
*/

/*  ⭐
회원들이 자유롭게 게시물을 올릴 수 있다면 그것이 게시판아니겠습니까 만들어봅시다.
근데 게시판 기능은 이미 다 만들어놨는데요
CSS 디자인만 게시판이 아닐 뿐 write/list 페이지 보니까 게시판 맞습니다. 
다만 지금은 누구나 게시물을 삭제가 가능한데 이걸 본인 글만 삭제가능하게 제한을 두면 되겠습니다. 
그러려면 유저가 몇명 필요해서 일단 회원가입기능부터 만들어봅시다.
*/

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




/*
(참고1) 아이디 중복체크는 어떻게할까요?

당연히 DB에 저장시키기 전에 한번 검사를 거치는게 좋겠군요.
1. 만약 DB에 id가 test인게 이미 있으면 가입안된다고 메세지를 띄우기
2. 그게 아니면 DB에 저장시키기   
이게 끝일 것 같은데요 여러분 if문법 아시지 않습니까. 모른다면 자바스크립트를 공부할 때입니다. 


(참고2) 아이디는 알파벳과 숫자로 구성되어있는지 이런건 어떻게 검사할까요

자바스크립트 잘하시면 프론트엔드에서도 거를 수 있지만
서버에서도 입력한 아이디가 이상한 문자면 걸러주는 코드를 작성해두는게 좋습니다. 역시 if문이 필요합니다. 
이거 말고도 비번 길이라든지 여러가지 제약을 걸어도 되겠죠? 


(참고3) 간단히 보여드리기 위해 암호화는 안했으나

비밀번호를 저장할 땐 난수로 바꿔서 DB에 저장하고 로그인시에도 난수로 바꿔서 비교하셔야합니다.
이것도 쉽게 암호화해주는 라이브러리들이 매우 많습니다.
*/


// ⭐ 글 주인만 삭제가능하게 만들어봅시다
/*
지금은 글발행할 때 제목, 날짜, _id 이것만 저장하고 있습니다.
그러면 안되겠군요. 누가 발행했는지도 함께 저장해야 나중에 주인만 삭제가능하게 만들 수 있지 않을까요. 

그래서 작성자라는 항목에 작성자의 _id를 집어넣는겁니다. 
이건 여러분의 글발행하는 코드를 고치면 됩니다.
요청.user 하면 로그인한 유저의 개인정보들이 가득 담겨있다고 했죠?
(이 정보들은 deserializeUser() 이 함수에서 제공하고 있고요)
그럼 글 발행할 때 요청.user._id 이것도 저장하면 됩니다. 끝

이거 말고도 유저의 _id, 아이디명, 이름 있으면 유저 이름도 함께 저장하면 좋습니다. 
근데 여기서 궁금한 점이 하나 생깁니다.

Q. 유저 아이디와 _id 이런거 동시에 저장할 필요 없는거 같은데여?
넹 맞습니다 유저의 _id를 알면 다른 컬렉션에서 조회해보면 아이디를 알 수 있으니까 유저의 _id만 저장해두면 끝 아니겠습니까. 
근데 싫습니다. 전부 게시물과 함께 저장해버릴거임 
게시물에다가 유저이름, 아이디 이런걸 다 저장해두면 이게
글쓴이 이름과 아이디가 필요해질 때 다른 컬렉션을 굳이 검색할 필요가 없기 때문에 DB 검색횟수를 줄일 수 있어서 성능적으로 이득이라 그렇습니다. 다만 하드용량은 늘어나겠지만요.
하드용량을 희생해서 검색성능을 높일 수 있다면 그게 이득 아니겠습니까. 

이걸 denormalizing이라고 하는데 NoSQL 데이터베이스들은 항상 이런 식으로 데이터를 저장하는걸 권장합니다.

그래서 자주 바뀌지 않는 아이디 이런 정보들은 필요한 게시물들에 함께 저장해두면 좋습니다.

단점 : 나중에 유저 아이디를 바꾸고 싶어하면 그걸 쓰고 있는 게시물들을 다 찾아서 바꿔줘야하겠군요. 이게 단점입니다.  
옛날에 SQL하던 분들은 싫어할 수 있습니다. 
따로 denormalizing 검색해보시면 여러 관습들을 배울 수 있습니다. 


// 게시물 삭제기능 업그레이드

지금은 개나소나 삭제가 가능한데
내 게시물만 삭제 가능하도록 만들려면 삭제기능을 어떻게 바꿔야되겠습니까.
7번 게시물을 삭제하라~라는 요청이 들어오면
1. 지금 삭제요청중인 유저의 요청.user._id를 까봐야하지 않을까요?
2. 그리고 그게 7번 글에 저장되어있는 작성자 정보랑 일치하면 삭제해야합니다. 

삭제요청할 때 예전엔 { _id : 요청.body._id } 이거 글번호만 확인하라고 해놨는데
{ 작성자 : 지금로그인한사용자의_id } 이것도 가지고 있으면 삭제하라고 업그레이드 해놨습니다. 
그러면 사용자1은 사용자2가 발행한 게시물 삭제가 불가능합니다.

*/