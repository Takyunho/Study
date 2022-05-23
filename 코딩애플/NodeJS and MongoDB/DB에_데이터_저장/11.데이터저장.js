const express = require('express');
const app = express();
// 바디파서
app.use(express.urlencoded({ extended: true }));
// 몽고디비 연결
const MongoClient = require('mongodb').MongoClient; 


// 어떤 데이터베이스에다가 자료를 저장할 것인지 명시해야한다.
var db;

MongoClient.connect('mongodb+srv://yundb:1q2w3e4r@cluster0.5cjru.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', function (에러, client) {
  // 연결되면 할일
  if (에러) {
    return console.log(에러)
  }

  // yundb라는 데이터베이스에 연결하기
  db = client.db('yundb'); 

  // db에 데이터 저장하기
  // post라는 파일에 insertOne({저장할데이터}, function(){})
  db.collection('post').insertOne({_id : 001, name : 'tak', age : 30 }, function (에러, 결과) {
    console.log('저장완료');
  }); // 대부분은 이해할 필요  X '그냥 이렇게 쓰는구나' 암기


  app.listen(8080, function () {
    console.log('listening on 8080')
  });

})




// 홈
app.get('/', function (요청, 응답) {
  응답.sendFile(__dirname + '/11.home.html');
})

// Write
app.get('/write', function (요청, 응답) {
  응답.sendFile(__dirname + '/11.write.html');
})


// POST요청
/*
어떤 사람이 /newPost라는 경로로 post 요청을 하면,
데이터 2개(제목, 날짜)를 보내주는데,
이때 'post'라는 이름을 가진 collection에 두 개 데이터를 저장하기
오브젝트 형식으로 { 제목 : 어쩌구, 날짜 : 어쩌구 }
*/
app.post('/newPost', function (요청, 응답) {
  응답.send('전송완료');
  // console.log(요청.body)
  // console.log(요청.body.title)  
  // console.log(요청.body.date)   
  
  db.collection('post').insertOne(요청.body, function (에러, 결과) {
    console.log('저장됨');
  })
  // db.collection('post').insertOne({ 제목: 요청.body.title, 날짜: 요청.body.date }, function (에러, 결과) {
  //   console.log('저장됐다');
  // })
})






// ⭐ 자료를 저장하기 위해선 일단 MongoDB에 저장할 폴더와 파일을 만들자
/*
database/ collection 만들기
1. MongoDB Atlas 메인 대시보드에서 Collections 라는 버튼클릭
2. Add my own data 버튼을 클릭 (혹은 이미 뭐가 있다면 create database)
3. database 이름, collection 이름 정하고 저장
  - database는 하나의 폴더, collection은 하나의 엑셀파일이라고 생각하면 된다.
*/



// ⭐ db와 통신하기
/*
var db;
MongoClient.connect('접속URL', { useUnifiedTopology: true }, function (에러, client) {
	if (에러) return console.log(에러)
	db = client.db('todoapp');

	app.listen(8080, function () {
		console.log('listening on 8080')
	});
});
(둘째줄에 { useUnifiedTopology: true } 이건 쓰면 좋습니다. 워닝메세지를 제거해줍니다.)
이렇게 여러분 코드를 바꿔주시면 됩니다. 첫줄과 넷째줄에 코드가 추가되었죠?
var db;로 페이지 전체에서 쓸 수 있는 전역 변수를 하나 만들고,
그리고 client.db('todoapp') 이라는 이상한 함수로 todoapp 이라는 database 에 접속해주세요~라는 명령을 내렸습니다.
*/



// ⭐ collection에 자료 하나 추가하는 법
/*
var db;
MongoClient.connect('접속URL', { useUnifiedTopology: true }, function (에러, client) {
	if (에러) return console.log(에러)
	db = client.db('todoapp');

  // 추가
        db.collection('post').insertOne( {이름 : 'John', _id : 100} , function(에러, 결과){
	    console.log('저장완료'); 
	});

	app.listen(8080, function () {
		console.log('listening on 8080')
	});
});

중간에 세줄이 추가되었습니다. DB에 자료 추가할 일이 있을 때마다 저거 세줄 쓰시면 됩니다.
db.collection('post') 라는건 collection 중에 post 라는걸 선택한다는 뜻이고
뒤에 insertOne을 붙이시면 자료를 추가할 수 있습니다. (Object 자료형식으로 추가가능)
그리고 insertOne 함수는 insertOne(추가할 자료, 콜백함수) 이렇게 쓰시면 되겠습니다.
*/

/*
⭐ db.collection('post').insertOne() 
이 패턴 잘 기억해주시길 바랍니다.
나중에 데이터 추가하고 삭제하고 수정할 때도 이거와 동일한 형식으로 쓸 거니까요.
(서버개발은 이해보다 패턴 외우는게 중요합니다)

몇줄에 걸친 긴 코드를 합쳐서 한번에 작성한다면
client.db('todoapp').collection('post').insertOne(추가할 자료, 콜백함수)
이렇게 쓰셔도 됩니다.
*/


// _id 라는건 왜 붙이죠?
/*
mongoDB에선 자료들을 서로 구분하기 위해 _id가 꼭 있어야합니다.
일종의 출석번호라고 생각하시면 됩니다.
이걸 직접 집어넣으셔야 하는데
안집어넣으시면 알아서 하나 만들어줍니다.
_id : 어쩌구 이런 식으로 유니크한 아이디를 하나 자동으로 부여해줍니다.

근데 저런 이상한 문자들 보기싫으니까 보통 번호붙여 저장을 합니다.
_id : 1
_id : 2
_id : 3
이렇게 저장하는 자료들에 항상 유니크한 출석번호를 붙여서 저장을 하는게 좋습니다.
*/