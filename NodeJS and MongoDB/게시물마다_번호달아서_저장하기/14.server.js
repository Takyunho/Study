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
  응답.sendFile(__dirname + '/14.home.html');
})

// Write
app.get('/write', function (요청, 응답) {
  응답.sendFile(__dirname + '/14.write.html');
})


// POST요청
app.post('/newPost', function (요청, 응답) {
  
  // (1). counter라는 collection에서 name : '게시물개수'인 데이터를 찾아주세요
  db.collection('counter').findOne({ name: '게시물개수' }, function (에러, 결과) {
    console.log(결과.totalPost);  // = 총게시물개수
    var 총게시물개수 = 결과.totalPost;  // (2). 결과.totalPost를 총게시물개수라는 변수에 저장

    // (3). post라는 콜렉션에 insertOner을 써서 id와 함께 데이터 저장
    db.collection('post').insertOne({_id : 총게시물개수 + 1, title : 요청.body.title, date : 요청.body.date}, function (에러, 결과) {
      console.log('저장됨');

      // (4). post라는 콜렉션에 데이터를 저장하고 나면, counter라는 콜렉션에 있는 totalPost 라는 항목도 1 증가시켜야함
      // db.collection('counter').updateOne({어떤 데이터를 수정할지 찾기위한거}, {수정값 입력}, function(){})
      db.collection('counter').updateOne({ name: '게시물개수' }, { $inc : { totalPost:1 }}, function(에러, 결과){ if(에러){return console.log(에러)} })

      응답.send('전송완료');
    })

  });

})


app.get('/list', function (요청, 응답) {
  
  // 순서 : 1. 데이터 꺼내고 2. list.ejs 파일 렌더링
  // db에 저장된 post라는 collection안의 모든 데이터를 꺼내주세요
  db.collection('post').find().toArray(function (에러, 결과) { // db에 저장된 모든 데이터 가져오기
    console.log(결과);
    응답.render("list.ejs", { posts : 결과 }) // 찾은걸 ejs 파일에 집어넣기
  }); 

  // 여기서 결과를 출력해보면 나오지 않음
});



// ⭐ _id를 달아서 저장합시다.
/*
MongoDB에 데이터를 저장할 땐 _id라는 값을 꼭 넣으셔야합니다. 그래야 삭제도 쉽고 나중에 수정도 쉬우니까요. 
아까 모르고 안넣으셨다고요? 괜찮습니다.
안넣으시면 MongoDB에서 알아서 ObjectId() 어쩌구 이런걸 만들어서 아이디를 강제로 부여해줍니다.  


다른 DB에선 _id를 자동으로 1증가시켜서 추가해주세요~ 이런 기능이 있는데 (Auto Increment라고 합니다)
MongoDB는 그런거 없습니다. (실은 별로 필요없어서 그렇습니다. 정수말고 자동으로 부여되는 ObjectId도 전혀 문제없음) 
그래서 여러분이 직접 지금까지 몇번 게시물을 발행했는지를 어딘가에 기록해두셔야합니다.
*/


// ⭐ 지금까지 몇번 게시물을 발행했는지 기록합시다.
/*
mongodb atlas 홈페이지 들어가셔서 대시보드에서 collection을 하나 더 만들도록 합시다. 
+ 버튼을 누르시면 collection(파일)을 하나 더 생성 가능합니다. 
counter라는 이름을 가진 collection을 생성합시다. 
방금 새로만든 counter라는 콜렉션에 데이터를 하나 강제로 집어넣어봅시다.
우측에 보면 Insert Document 흰버튼을 누르시면 강제로 항목을 하나 추가 가능합니다. 
그리고 이렇게 그대로 작성한 후 Insert 버튼을 누르면 되겠습니다. 
(totalPost 라는 항목은 Int32로 셋팅하는거 잊지마세요)

이게 바로 여러분이 지금까지 몇번 게시물을 발행했는지를 기록할 공간입니다. 
totalPost라는 곳에 저장할 것입니다. 
지금은 아무 게시물도 발행되지 않았다고 생각하고 초기값은 0이라고 합시다. 

그리고 방금 코드를 이렇게 바꾸면 되겠죠? 

app.post('/add', function(요청, 응답){
  
  counter라는 콜렉션에서 totalPost라는 총 게시물 갯수 숫자를 가져와서
  var 총게시물갯수 = 여기에 저장함
  그 다음에 밑에 코드 실행
  db.collection('post').insertOne( { _id : (총게시물갯수 + 1), 제목 : 요청.body.title, 날짜 : 요청.body.date } , function(){
    console.log('저장완료')
    응답.send('전송완료');
  });
});
한글로 예쁘게 적은 부분을 자바스크립트 코드로 그대로 번역만 하시면 되겠습니다. 

app.post('/add', function(요청, 응답){
  db.collection('counter').findOne({name : '게시물갯수'}, function(에러, 결과){
    var 총게시물갯수 = 결과.totalPost;
    db.collection('post').insertOne( { _id : (총게시물갯수 + 1), 제목 : 요청.body.title, 날짜 : 요청.body.date } , function(){
      console.log('저장완료')
      응답.send('전송완료');
    });
  });
  
});

1. findOne함수를 쓰시면 collection 내에서 내가 원하는 문서를 쉽게 찾을 수 있습니다. 

쓰는 법은 강의를 참고합니다. 그럼 찾은 결과는 function내의 결과라는 이름의 변수에 담겨옵니다.

2. 그럼 아까 저장한 totalPost라는 자료도 출력가능합니다. 그걸 총게시물갯수 변수에 저장합니다. 

3. 그리고 그 다음에 post라는 콜렉션에 insertOne을 써서 제대로된 _id와 함께 자료를 저장합니다. 끝!

4. 그리고 응답.send 라는 코드를 이용해 응답해줍니다. (응답.어쩌구는 꼭 들어있어야합니다)
*/


// ⭐ DB 데이터를 수정하고 싶으면 updateOne을 쓰면 됩니다.
/*
counter라는 콜렉션 내의 자료를 수정하고 싶으면 이렇게 하시면 됩니다. 

db.collection('counter').updateOne( {요런 이름의 자료를} , {이렇게 수정해주세요} , function(에러, 결과){
  console.log('수정완료')
})

updateOne 함수엔 파라미터가 세개가 필요합니다. 

왼쪽 {}엔 { name : '게시물갯수' } 이렇게 자료를 찾을 수 있는 이름이라든지 쿼리문을 적어주면 됩니다. 

가운데는 여러분이 수정할 값을 입력해주시면 됩니다. 그런데 약간 특이합니다. 
{ $set : { totalPost : 100 } } 이렇게 넣어서 값을 아예 100으로 변경할 수도 있고
{ $inc : { totalPost : 5 } } 이렇게 넣어서 값을 5만큼 더해줄 수도 있습니다. 
$ 표시 붙은게 바로 operator 라는 문법입니다. 여러 종류가 있으니 나머지는 필요할 때 찾아쓰도록 합시다. 

오른쪽은 그냥 콜백함수입니다. 수정이 실패나 성공시 실행할 코드를 안에 담으시면 됩니다.

*/