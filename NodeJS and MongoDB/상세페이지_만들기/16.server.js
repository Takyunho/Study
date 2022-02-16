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
app.use(express.static('public'));



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
  응답.sendFile(__dirname + '/16.home.html');
})

// Write
app.get('/write', function (요청, 응답) {
  응답.sendFile(__dirname + '/16.write.html');
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
    응답.status(200).send({ message : '성공했습니다.' });
    
  })

})


// /detail/1 이면 1번 게시물, /detail/2이면 2번 게시물 보여주기
// /:id = URL의 파라미터(파라미터는 쉽게 말하면 URL 뒤에 무작위의 문자를 붙일 수 있게 만들어주는 URL 작명 방식)

// (1). 어떤 사람이 /detail/:작명 로 접속하면(get요청하면)
app.get('/detail/:id', function (요청, 응답) {
  // (2). post 콜렉션에서 { _id : :id } 인 게시물 찾음
  db.collection('post').findOne({ _id : parseInt(요청.params.id)}, function (에러, 결과) {
    console.log(결과);
    // (3). 찾은 결과를 detail.ejs로 보냄
    응답.render('detail.ejs', { data : 결과 })
  })
  
})



// 파라미터 문법 이용해서 상세 페이지 만들기
/*
파라미터는 쉽게 말하면 URL 뒤에 무작위의 문자를 붙일 수 있게 만들어주는 URL 작명 방식입니다. 

app.get('/detail/:id', function(요청, 응답){
  응답.render('detail.ejs', {어쩌구} )
});

저렇게 콜론 (:) 기호를 붙여주면 누군가 /detail/ 뒤에 아무 문자열이나 입력하면~ 이라는 소리입니다. 
이제 사용자가 /detail/ 뒤에 어떤 숫자나 문자를 붙이든 위의 코드3줄로 인식할 수 있는 것이죠.

Q. 왜 id라고 썼는가?
땡땡 기호 뒤엔 여러분이 자유롭게 작명하시면 됩니다. 전 id라는 이름이 좋아서 그랬어요. 
그냥 detail 뒤의 무작위의 문자를 id라고 부르겠습니다~ 라는 뜻입니다. 
(참고로 파라미터는 두개 세개 계속 이어붙일 수도 있습니다.)



그럼 detail/2로 방문하면 2번 게시물을 보내야합니다.

그럼 일단 누군가 detail/2로 방문하면 _id가 2인 게시물을 DB에서 찾아와야합니다. (당연)
DB에서 게시물 찾기는 처음 하는 내용일 수 있으니 제가 한번 만들어보겠습니다.

app.get('/detail/:id', function(요청, 응답){
  db.collection('post').findOne({ _id : URL에입력한id값 }, function(에러, 결과){
    응답.render('detail.ejs', {어쩌구} )
  })
});

db.어쩌구.findOne() 이라는 함수를 사용했습니다.
이 함수는 db에서 원하는 게시물 하나 찾고싶을 때 사용합니다. 
사용법은 .findOne({원하는게시물정보}, function(){ 완료시 실행할 코드 }) 이렇게 하시면 됩니다.

이제 위 코드에 사용자가 URL에 입력한 :id값을 그대로 넣어주면 되는데 어떻게 할까요?
이런건 생각해서 나오는게 아니라 구글 검색을 하셔야합니다.
검색하시면 아마 요청.params.id 라고 나올 것입니다. 
그래서 적용해봤습니다. 

app.get('/detail/:id', function(요청, 응답){
  db.collection('post').findOne({ _id : 요청.params.id }, function(에러, 결과){
    응답.render('detail.ejs', {data : 결과} )
  })
});
마지막으로 셋째 줄에서 DB에서 찾은 결과를 data라는 이름으로 ejs파일로 보내고 있습니다. 
그럼 ejs파일 내에서 그 게시물 데이터를 가지고 HTML에 꽂아넣을 수 있겠죠?

하지만 결과를 출력해보니 null이 나오는데요?

console.log 등을 써보시면 DB에서 찾은 결과가 null이라고 출력됩니다.
그래서 이걸 ejs에 보내도 아무 쓸모짝에도 없겠군요.
이제 여러분이 이 문제를 찾고 해결하시면 됩니다. 
실은 DB에서 찾은 결과가 null, 즉 아무것도 없다는 뜻인데.. 그 이유는 여러분이 findOne을 잘못 썼기 때문이 아닐까요?

app.get('/detail/:id', function(요청, 응답){
  db.collection('post').findOne({ _id : parseInt(요청.params.id) }, function(에러, 결과){
    응답.render('detail.ejs', {data : 결과} )
  })
});

그래서 위 코드처럼 parseInt()를 이용해서 제대로 사용하시면 됩니다. 
왜냐면 요청.params.id를 출력해보면 '2' 이런 식으로 문자자료형으로 출력됩니다.
그런데 DB엔 _id가 '2'인 자료는 없죠? _id가 2인 자료는 있습니다. 
그래서 이걸 숫자로 변환하기 위해 parseInt를 쓴 것입니다.
(parseInt는 자바스크립트에서 문자를 정수로 변환해주는 고마운 함수입니다.)


다 해결되었으니 이제 EJS 파일을 디자인해봅시다

1. detail.ejs 파일을 view 폴더 안에 만들어줍니다
2. 다른 ejs파일에 있던 HTML 코드를 전부 복사 붙여넣기 해준 다음 <body> 태그 내에 필요없는 태그들을 삭제합니다.
3. 하단 코드를 <body>태그 내에 추가합니다.


<h4>상세페이지 입니다.</h4>
<h4>제목 : <%= data.제목 %></h4>
<h4>날짜 : <%= data.날짜 %></h4>
이렇게 쓰면 완성!


그럼 지금까지의 코드를 테스트를 해보면 
- URL란에 /detail/4를 입력시
- detail.ejs파일이 렌더링되는데 data라는 변수에 실제 DB에 있던 _id가 4인 게시물이 담겨옵니다. 
- data.제목 이렇게 4번게시물의 제목과 날짜를 ejs파일 안에서 보여줍니다.
상세페이지 완성 ㄷㄷ

*/

// (참고) 예전에 했던 Ajax delete 요청도 

/*
 $.ajax({
  method: 'DELETE',
  url: '/delete',
  data: { _id: 1 },
})
▲ 이런 식으로 data를 전달해서 요청.body로 꺼내쓰도록 만들었는데 


$.ajax({
  method: 'DELETE',
  url: '/delete/1',
})
▲ 이런 식으로 url parameter로 원하는 데이터를 전달할 수도 있겠네요. 

어떻게하든 정보만 전달된다면 상관은 없지만 delete 요청시엔 이게 약간 더 자주 쓰는 사용방법입니다.

원래 delete 요청으로 data를 전달하는게 일반적이진 않아서요 근데 보낼 정보가 길면 data로 전달해야죠 뭐 

*/