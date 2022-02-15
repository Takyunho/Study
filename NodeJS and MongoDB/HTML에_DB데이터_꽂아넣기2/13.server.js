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
  응답.sendFile(__dirname + '/13.home.html');
})

// Write
app.get('/write', function (요청, 응답) {
  응답.sendFile(__dirname + '/13.write.html');
})


// POST요청
app.post('/newPost', function (요청, 응답) {
  응답.send('전송완료');
    
  db.collection('post').insertOne(요청.body, function (에러, 결과) {
    console.log('저장됨');
  })
  
})



/* ⭐
1. 누군가 /list로 GET 요청을 하면
2. MongoDB에서 데이터를 꺼낸 뒤에
3. list.ejs 파일에 그 데이터를 꽂아넣어서 고객에게 보내줌
*/
app.get('/list', function (요청, 응답) {
  
  // 순서 : 1. 데이터 꺼내고 2. list.ejs 파일 렌더링
  // db에 저장된 post라는 collection안의 모든 데이터를 꺼내주세요
  db.collection('post').find().toArray(function (에러, 결과) { // db에 저장된 모든 데이터 가져오기
    console.log(결과);
    응답.render("list.ejs", { posts : 결과 }) // 찾은걸 ejs 파일에 집어넣기
  }); 

  // 여기서 결과를 출력해보면 나오지 않음
});




// ⭐ MongoDB에서 데이터를 꺼내고 싶다면
/*
db.collection('post').find() 
db.colleciton('post').findOne()
이런 식으로 쓰시면 데이터를 꺼낼 수 있습니다.

근데 우리는 "post 콜렉션에 저장된 모든 데이터를 가져와주세요~" 라고 명령을 주고 싶습니다. 그렇다면 이렇게 칩니다.

app.get('/list', function(요청, 응답){
  db.collection('post').find().toArray(function(에러, 결과){
    console.log(결과)
    응답.render('list.ejs')
  })
})

✅ .find().toArray() 라고 적으시면 collection('post')에 있는 모든 데이터를 Array 자료형으로 가져옵니다. 
[자료1, 자료2 ...] 이런 식으로 담겨오게 됩니다. 궁금하면 결과라는 변수를 콘솔창에 출력해보십시오. 
그리고 자료들이 안오거나 에러나면 실제 DB에 데이터 몇개가 제대로 저장되어 있는지 확인합시다. 
DB 데이터가 오염되어있거나 그러면 원하는대로 보이지 않을 수 있으니까요. 
*/



// ⭐ 데이터를 list.ejs 파일에 보내고 싶다면?
/*
그리고 가져온 데이터를 list.ejs 파일로 보내주면 이제 접속자들이 그 데이터들을 볼 수 있겠죠? 

app.get('/list', function(요청, 응답){
  db.collection('post').find().toArray(function(에러, 결과){
    console.log(결과)
    응답.render('list.ejs', { posts : 결과 })
  })
})

.render()라는 함수에 둘째 파라미터를 요로케 적어주시면 
list.ejs 파일을 렌더링함과 동시에 {posts: 결과} 라는 데이터를 함께 보내줄 수 있습니다. 
✅ (정확히 말하면 결과라는 데이터를 posts 라는 이름으로 ejs 파일에 보내주세요~ 입니다)
그러면 이제 list.ejs 파일에서 데이터를 가지고 여기저기 쑤셔 집어넣는 일만 남았군요. 
*/



// ⭐ 데이터를 가지고 EJS 파일을 꾸며보자 
/*
(views/list.ejs)

<h4><%= posts %></h4>
<p><%= posts %></p>

<h4>임시 제목</h4>
<p>임시 날짜</p>

posts 까지만 꽂아도 뭔가 나오죠? 아까 결과라는 데이터를 posts 라는 이름으로 여기에 보냈으니까요.
근데 결과라는 데이터는 출력해보시면 [{어쩌구}, {어쩌구}] 이런 식으로 되어있으니 원하는 제목과 날짜 데이터를 출력하려면

<h4><%= posts[0].제목 %></h4>
<p><%= posts[0].날짜 %></p>

<h4><%= posts[1].제목 %></h4>
<p><%= posts[1].날짜 %></p>
이런 식으로 쓰시면 되겠습니다.
에러나면 실제 DB에 데이터 몇개가 제대로 저장되어 있는지 확인합시다. (두번째 강조)

반복되는 코드를 발견하면 반복문으로 축약할 수 있습니다. 
<% for (var i = 0; i < posts.length; i ++) { %>
  <h4><%= posts[i].제목 %></h4>
  <p><%= posts[i].날짜 %></p>
<% } %>

(참고)
EJS 안에서 자바스크립트 문법을 쓸땐 <% %> 내부에 담아야 한다.

*/