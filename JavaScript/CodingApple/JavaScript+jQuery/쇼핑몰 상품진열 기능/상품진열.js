// 웹서비스 개발 방식에는 2가지가 있다.
// 1. 서버에서 HTML 파일을 미리 다 완성해서 보내주기
// 2. 서버에서 텅빈 HTML 파일 + 상품데이터만 보내고,
// HTML을 완성하는건 프론트엔드에서 자바스크립트로 시키기
// 중 택 1
// 각각 장단점이 있으나 2번을 주로 사용(웹앱에서도 사용)


// 서버가보낸 실제 상품 데이터라고 가정
var products = [
  { id : 0, price : 70000, title : 'Blossom Dress' },
  { id : 1, price : 50000, title : 'Springfield Shirt' },
  { id : 2, price : 60000, title : 'Black Monastery' }
]

// 내가 한 방법 ( div에 id부여해서 html 바꾸기)
// var 상품1 = `<h5>${products[0].title}</h5>
// <p>가격 : ${products[0].price}</p>
// <button class="btn btn-danger">주문하기</button>`
// $('#product1').html(상품1);

// var 상품2 = `<h5>${products[1].title}</h5>
// <p>가격 : ${products[1].price}</p>
// <button class="btn btn-danger">주문하기</button>`
// $('#product2').html(상품2);

// var 상품3 = `<h5>${products[2].title}</h5>
// <p>가격 : ${products[2].price}</p>
// <button class="btn btn-danger">주문하기</button>`
// $('#product3').html(상품3);

// 인강

$('.title').eq(0).html(products[0].title);
$('.price').eq(0).html('가격 : ' + products[0].price);

$('.title').eq(1).html(products[1].title);
$('.price').eq(1).html('가격 : ' + products[1].price);

$('.title').eq(2).html(products[2].title);
$('.price').eq(2).html('가격 : ' + products[2].price);
