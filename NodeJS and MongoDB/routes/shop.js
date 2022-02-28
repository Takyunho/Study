// 라우트를 시켜주는 파일

// URL route들을 이리저리 안내해주는 파일을 라우터라고 함 

// 그냥 옮기면 안되고 express가 시키는대로 옮겨야 한다.
var router = require('express').Router(); // express 라이브러리에 요구하고, Router()라는 함수를 쓰겠다는 의미


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

// shop.js에 있는 모든 URL에 적용할 미들웨어
// 미들웨어를 한번에 넣을 수 있음 
router.use(로그인했니);
// router.use('/shirts', 로그인했니);   // /shirts에 접속할 때 실행


// router.get('/shop/shirts', function (요청, 응답) {
//   응답.send('셔츠 파는 페이지입니다.');
// });

// router.get('/shop/pants', function (요청, 응답) {
//   응답.send('바지 파는 페이지입니다.');
// });


// 세부라우팅 (/shop을 제거하고 26.server.js에다가 추가)
router.get('/shirts', function (요청, 응답) {
  응답.send('셔츠 파는 페이지입니다.');
});

router.get('/pants', function (요청, 응답) {
  응답.send('바지 파는 페이지입니다.');
});


module.exports = router;  

// Node.js 환경에서 JS파일들을 불러와서 쓸 수 있는데 그 문법이 바로 require() 이것과 module.exports 이것임

// module.exports = 내보낼변수명
// 다른 곳에서 shop.js를 가져다 쓸 때 내보낼 변수

// require('파일경로')/require('라이브러리명')
// 다른 곳에있는 특정한 변수나 라이브러리를 가져올 때 씀