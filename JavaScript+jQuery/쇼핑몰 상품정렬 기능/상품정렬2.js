
// 서버가보낸 실제 상품 데이터라고 가정
var products = [
  { id: 0, price: 70000, title: '드레스' },
  { id: 1, price: 50000, title: '셔츠' },
  { id: 2, price: 60000, title: '바지' }
]

// 초기 데이터 바인딩
for (i = 0; i < 3; i++) {
  $('.title').eq(i).html(products[i].title);
  $('.price').eq(i).html('가격 : ' + products[i].price);
}


// 가격순 정렬
$('#sort-btn').click(function () {                          // 버튼 누르면
  products.sort(function (a, b) {                           // products 정렬하고
    return a.price - b.price
  })
  for (i = 0; i < 3; i++) {                                 // 데이터 바인딩 해주세요
    $('.title').eq(i).html(products[i].title);
    $('.price').eq(i).html('가격 : ' + products[i].price);
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
    $('.title').eq(i).html(products[i].title);
    $('.price').eq(i).html('가격 : ' + products[i].price);
  }
})

// 5만원 이하 필터버튼
// 1. 우선 상품목록 다 비워두고
// 2. 버튼 누르면 products에서 5만원 이하 상품만 남김
// 3. products array 개수만큼 HTML 동적으로 생성
$('#filter-btn').click(function () {
  var newProducts = products.filter(function (a) {
    return a.price <= 50000
  })
  console.log(newProducts);
  // products안의 데이터 개수만큼 HTML을 생성해줘 -> 더 확장성 있음
  newProducts.forEach(function (a) {
    var template = `
  <h5 class="title">${a.title}</h5>
  <p class="price">${'가격 : ' + a.price}</p>
  <button class="btn btn-danger">주문하기</button>
`
    $('#product1').html('');
    $('#product1').append(template);
  })
})


