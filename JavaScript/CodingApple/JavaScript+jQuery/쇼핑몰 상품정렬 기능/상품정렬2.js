
// 서버가보낸 실제 상품 데이터라고 가정
var products = [
  { id: 0, price: 70000, title: '드레스' },
  { id: 1, price: 50000, title: '셔츠' },
  { id: 2, price: 40000, title: '바지' }
]
var products2 = [...products]; // 사본만들기 (원래대로 정렬할때 필요)
// 사본만들때 어레이2 = 어레이 하면 값이 공유됨
// 복사하고 싶으면 앞에다가 ... 써야함(spread operator 라고함)



// 1. 사이트처음 접속시 상품 3개 띄우려면?
// 사이트 방문시 products2 어레이 개수에맞게 즉, 상품 3개의 HTML을 동적으로 만들어 주세요~ 라고 코드
products2.forEach(function (a) {
  var 초기템플릿 = `<div class="card">
<img src="https://via.placeholder.com/600">
<div class="card-body product">
  <h5 class="title">${a.title}</h5>      
  <p class="price">${'가격 : ' + a.price}</p>
  <button class="btn btn-danger">주문하기</button>
</div>
</div>`
  $('.card-group').append(초기템플릿);
});


// 초기 데이터 바인딩
// for(i = 0; i < 3; i++) {
//   $('.title').eq(i).html(products[i].title);
//   $('.price').eq(i).html('가격 : ' + products[i].price);
// }
// forEach 문 사용하면 아래처럼 가능
// products.forEach(function(i) {
//  $('.title').eq(i).html(products[i].title);
//  $('.price').eq(i).html('가격 : ' + products[i].price);
// })

function 데이터바인딩(i) {
  $('.title').eq(i).html(products[i].title);
  $('.price').eq(i).html('가격 : ' + products[i].price);
}




// 가격순 정렬(오름차순)
$('#sort-btn').click(function () {                // 버튼 누르면
  products.sort(function (a, b) {                 // products 정렬하고
    return a.price - b.price
  })
  for (i = 0; i < 3; i++) {                        // 데이터바인딩
    데이터바인딩(i);
  }
})



// 가나다순 정렬 (드레스, 바지, 셔츠가 나와야함)
$('#sort-btn2').click(function () {
  products.sort(function (a, b) {
    // if (a.title < b.title) return -1;
    // if (a.title > b.title) return 1;    // +를 리턴하면 b를 왼쪽으로 
    // if (a.title === b.title) return 0;
    if (a.title < b.title == true) {
      return -1;   // true면 음수가 나오고 음수를 리턴하면 b를 오른쪽으로
      // 음수는 -1 이던 -2 던 상관없음
    } else {
      return 1;
    }
  })
  for (i = 0; i < 3; i++) {                                 // 데이터 바인딩 해주세요
    데이터바인딩(i);
  }
})




// // 5만원 이하 필터버튼
// // 1. 우선 상품목록 다 비워두고 (HTML 주석처리)
// // 2. 버튼 누르면 products에서 5만원 이하 상품만 남김
// $('#filter-btn').click(function () {
//   $('.card-group').html('');                          // 중복추가 방지
//   var 새상품 = products.filter(function (a) {
//     return a.price <= 50000
//   });
//   console.log(새상품);
//   // 3. products array 개수만큼 HTML 동적으로 생성해줘 -> 더 확장성 있음
//   // var template = `<div>상품</div>`
//   // $('.card-group').append(template);

//   // var template = `<div>상품</div>`
//   // $('.card-group').append(template);

//   // var template = `<div>상품</div>`
//   // $('.card-group').append(template);
//   // 🔻 반복문으로 확장성확보
//   새상품.forEach(function (a) {        // forEach = 어레이 안에있는 개수만큼 반복
//     var template = `<div class="card">
//     <img src="https://via.placeholder.com/600">
//     <div class="card-body product">
//       <h5 class="title">${a.title}</h5>
//       <p class="price">${'가격 : ' + a.price}</p>
//       <button class="btn btn-danger">주문하기</button>
//     </div>
//   </div>`;
//   $('.card-group').append(template);
//   })
// });


// input을 이용한 필터버튼
$('#filter-btn').click(function () {
  var 필터인풋값 = $('#filterInput').val();
  if (!필터인풋값) {                // filterInput의 값이 공백이면
    alert('숫자를 입력해주세요');     // 값을 입력해주세요
  } else {                          // 그렇지 않으면
    // 아래코드 실행 
    var 새상품 = products.filter(function (a) {
      return a.price <= 필터인풋값
    });
    $('.card-group').html('');           // 중복추가 방지
    새상품.forEach(function (a) {        // forEach = 어레이 안에있는 개수만큼 반복
      var template = `<div class="card">
  <img src="https://via.placeholder.com/600">
  <div class="card-body product">
    <h5 class="title">${a.title}</h5>
    <p class="price">${'가격 : ' + a.price}</p>
    <button class="btn btn-danger">주문하기</button>
  </div>
</div>`;
      $('.card-group').append(template);
    })
  }
});


// 원래대로 돌아가기
$('#restore-btn').click(function () {
  $('.card-group').html('');
  products2.forEach(function (a) {
    var 초기템플릿 = `<div class="card">
  <img src="https://via.placeholder.com/600">
  <div class="card-body product">
    <h5 class="title">${a.title}</h5>      
    <p class="price">${'가격 : ' + a.price}</p>
    <button class="btn btn-danger">주문하기</button>
  </div>
  </div>`;
    $('.card-group').append(초기템플릿);
  })
})


