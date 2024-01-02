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
  
  app.listen(7080, function () {
    console.log('listening on 7080')
  });

})



// 홈
app.get('/', function (요청, 응답) {
  응답.sendFile(__dirname + '/12.home.html');
})

// Write
app.get('/write', function (요청, 응답) {
  응답.sendFile(__dirname + '/12.write.html');
})


// POST요청
app.post('/newPost', function (요청, 응답) {
  응답.send('전송완료');
    
  db.collection('post').insertOne(요청.body, function (에러, 결과) {
    console.log('저장됨');
  })
  
})


// 저장한 목록들을 보여주는 페이지
/* /list로 GET요청으로 접속하면,
실제 DB에 저장된 데이터들로 꾸며진 HTML을 보여줌 */
app.get('/list', function (요청, 응답) {
  응답.render("list.ejs")  // list.ejs 파일 렌더링해주기
});