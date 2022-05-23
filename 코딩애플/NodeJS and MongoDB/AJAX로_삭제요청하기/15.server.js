const express = require('express');
const app = express();
// 바디파서 등록
app.use(express.urlencoded({ extended: true }));
// 몽고디비 연결
const MongoClient = require('mongodb').MongoClient;
// EJS 등록
app.set('view engine', 'ejs');
// app.engine('ejs', require('ejs').__express);


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
  응답.sendFile(__dirname + '/15.home.html');
})

// Write
app.get('/write', function (요청, 응답) {
  응답.sendFile(__dirname + '/15.write.html');
})


// POST요청
app.post('/newPost', function (요청, 응답) {

  // (1). counter라는 collection에서 name : '게시물개수'인 데이터를 찾아주세요
  db.collection('counter').findOne({ name: '게시물개수' }, function (에러, 결과) {
    console.log(결과.totalPost);  // = 총게시물개수
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



// ⭐ delete 요청
// 1. 버튼 클릭 2. ajax 요청 3. 서버에서 delete 요청
app.delete('/delete', function (요청, 응답) {
  console.log(요청.body); // (ajax 요청시 data)

  /*
  DB에 저장된 { _id : 1 } 이라는 아이디는 숫자고
  AJAX로 보낸 데이터를 (요청.body) 출력해보면 { _id : '1' } 이렇게 문자임
  Q. 전 분명 AJAX코드에서 { _id : 1 }를 보냈는데 왜 바뀌어있죠?
  AJAX요청 등으로 데이터를 서버에 전송할 때 숫자 자료들이 가끔 문자화 되는 경우가 있습니다.
  그래서 사기행위에 당황하지 마시고 이걸 다시 숫자로 바꿔주셔야합니다.
  */
  // 요청.body 내의 _id를 숫자로 변환시키자
  요청.body._id = parseInt(요청.body._id);

  // 요청.body에 담겨온 데이터를 가진 글을 찾아서 db에서 삭제해줘
  db.collection('post').deleteOne(요청.body, function (에러, 결과) {
    // 삭제후 실행할 코드
    console.log('삭제완료');
    // 삭제가 완료되면(요청이 성공했으면) 응답코드 200을 보내주세요~
    // 2XX 는 요청성공이라는 뜻 / 4XX는 고객 잘못으로 요청 실패라는 뜻
    // 5XX 는 서버 문제로 요청실패라는 뜻
    응답.status(200).send({ message : '성공했습니다.' });
    // .send는 서버에서 메시지를 보낼때 쓰는 함수
    

    // 응답.send('삭제완료!');  // ⭐ 위에서 응답.status를 쓰고 이걸 또 쓰면 [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client 오류가 발생한다.
    // 오류 [ERR_HTTP_HEADERS_SENT]는 서버가 클라이언트에 둘 이상의 응답을 보내려고 할 때 발생하는 오류이다. 주어진 클라이언트 요청에 대해 서버가 이전에 응답 (요청 된 리소스가있는 성공 응답 또는 잘못된 요청에 대한 오류 응답)을 클라이언트로 보냈고 이제 예기치 않게 다른 응답을 보내려고한다는 것
  })
  /*
  deleteOne 함수를 쓰면 원하는 데이터를 삭제 가능합니다.
  deleteOne(삭제원하는 데이터이름, function(){} ) 이렇게 쓰시면 됩니다. 
  그리고 AJAX요청시 data : { _id : 1 } 이라고 적은 정보는 요청.body라는 곳에 담겨옵니다.
  그래서 그 정보를 그대로 deleteOne에 집어넣으면 { _id : 1 }이라는 게시물을 삭제할 수 있겠죠? 
  */

  

})



// ⭐ 고객 요청에 응답하는 방법은 여러가지가 있습니다
/*
app.get('/어쩌구', function(요청, 응답){
  응답.send('<p>some html</p>')
  응답.status(404).send('Sorry, we cannot find that!')
  응답.sendFile('/uploads/logo.png')
  응답.render('list.ejs', { ejs에 보낼 데이터 })
  응답.json(제이슨데이터)
});

send는 간단한 문자나 HTML을 보낼 수 있습니다. 
status는 응답코드를 보낼 수 있습니다. 
sendFile은 static 파일들을 보낼 수 있습니다. 
render는 ejs등의 템플릿이 적용된 페이지들을 렌더링해줄 수 있습니다. 
json은 제이슨 데이터를 담아보낼 수 있습니다. 
*/