const express = require('express');
const app = express();
// 바디파서 등록
app.use(express.urlencoded({ extended: true }));
// 몽고디비 연결
const MongoClient = require('mongodb').MongoClient;
// EJS 등록
app.set('view engine', 'ejs');
// app.engine('ejs', require('ejs').__express);
// css 적용을 위해
app.use('/public', express.static('public')); // 나는 static 파일을 보관하기 위해 public 폴더를 쓸거다 -> css 적용시 /public 경로 적어야함
// app.use(express.static('public'));   // /public 경로 안적어도 css파일 적용됨



var db;

MongoClient.connect('mongodb+srv://yundb:1q2w3e4r@cluster0.5cjru.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', function (에러, client) {
  // 연결되면 할일
  if (에러) {
    return console.log(에러)
  }

  db = client.db('yundb');

  app.listen(8080, function () {
    console.log('listening on 8080')
  });

})



// 홈
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
      db.collection('counter').updateOne({ name: '게시물개수' }, { $inc: { totalPost: 1 } }, function (에러, 결과) { if (에러) { return console.log(에러) } })

      응답.send('전송완료');
    })

  });

})



app.get('/list', function (요청, 응답) {

  // 순서 : 1. 데이터 꺼내고 2. list.ejs 파일 렌더링
  // db에 저장된 post라는 collection안의 모든 데이터를 꺼내주세요
  db.collection('post').find().toArray(function (에러, 결과) { // db에 저장된 모든 데이터 가져오기
    console.log(결과);
    응답.render("list.ejs", { posts: 결과 }) // 찾은걸 ejs 파일에 집어넣기
  });

  // 여기서 결과를 출력해보면 나오지 않음
});



// delete 요청
// 1. 버튼 클릭 2. ajax 요청 3. 서버에서 delete 요청
app.delete('/delete', function (요청, 응답) {
  console.log(요청.body); // (ajax 요청시 data)

  // 요청.body 내의 _id를 숫자로 변환시키자
  요청.body._id = parseInt(요청.body._id);

  // 요청.body에 담겨온 데이터를 가진 글을 찾아서 db에서 삭제해줘
  db.collection('post').deleteOne(요청.body, function (에러, 결과) {
    console.log('삭제완료');
    응답.status(200).send({ message: '성공했습니다.' });

  })

})


// (1). 어떤 사람이 /detail/:작명 로 접속하면(get요청하면)
app.get('/detail/:id', function (요청, 응답) {
  // (2). post 콜렉션에서 { _id : :id } 인 게시물 찾음
  db.collection('post').findOne({ _id: parseInt(요청.params.id) }, function (에러, 결과) {
    // console.log(결과);
    // console.log(parseInt(요청.params.id));
    // console.log(결과._id);
    // (3). 찾은 결과를 detail.ejs로 보냄

    // 없는 게시물 에러처리하기
    if (결과 == null) {
      // 응답.status(404).send('찾을 수 없는 페이지');
      응답.render('error.ejs');
    } else {
      응답.render('detail.ejs', { data: 결과 });
    }
  
  })

})



// CSS 파일 넣는법
/*
1. public 폴더 만들기 (CSS 파일은 보통 관습적으로 public 폴더에 보관)
  - CSS, 이미지 처럼 자주 바뀌지 않는 static 파일들을 다 public에 보관
  - public 폴더는 views 폴더 옆에 나란히 만들자

2. 원하는 HTML이나 EJS 파일에 가서 <head> 태그 안에 <link>로 집어넣기(당연한거)
  - 그냥 넣으면 작동 안됨 -> Node에게 '나는 public 폴더도 있다'라고 알려줘야 함

3. app.use('/public', express.static('public')) 를
서버.js에 적어야 함
  - "/public 위치에 있는 폴더를 쓰겠다"라는 뜻
*/



// HTML 파일 조립식으로 첨부하기
/*
페이지가 4개 정도 있는데 여기 <nav>태그로 이루어진 상단메뉴UI가 계속 출현하고 있습니다. 
이 UI는 전부 똑같은 모습을 하고 있어야하는데, 그럼 나중에 수정사항이 생기면 페이지4개에 있는 <nav> 직접 하나하나 수정해줄겁니까.
그럼 너무 오래걸리잖아요.

그래서 nav.html이라는 파일을 하나 만들고
그 파일을 다른 파일에다가 include(첨부) 하는 식으로 개발하는 것이 바람직합니다.

(1). list.ejs에 있던 <nav>태그를 잘라내어 nav.html 파일을 만들고 거기에 붙여넣습니다.

  (views/nav.html)

<nav>
  <a>링크</a>
  어쩌구...
  저쩌구...
</nav>


(2). <nav>태그 UI가 필요한 파일에 가서 이런 문법을 사용합니다.

(list.ejs)

<%- include('nav.html') %>

이 문법을 쓰시면 이 자리에 nav.html 내용이 전부 붙여넣기됩니다. 
그럼 list 페이지 방문하시면 nav태그가 잘 보이죠?
다른 ejs 파일들에도 nav.html을 조립식으로 첨부해보시길 바랍니다. 
*/