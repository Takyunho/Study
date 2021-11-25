
// 서버가보낸 실제 상품 데이터라고 가정
var products = [
  { id: 0, price: 70000, title: 'Blossom Dress' },
  { id: 1, price: 50000, title: 'Springfield Shirt' },
  { id: 2, price: 60000, title: 'Black Monastery' }
]

for (i = 0; i < 3; i++) {
  $('.title').eq(i).html(products[i].title);
  $('.price').eq(i).html('가격 : ' + products[i].price);
}



// ⭐ sort() 함수
// array를 정렬할땐 sort()를 붙여서 사용한다.
// var 어레이 = [20, 3, 5, 12];
// 어레이.sort();  // array 가나다순 정렬할 때(숫자 정렬이 아니라 문자 정렬된다.)

// 🔻 sort()로 숫자 정렬할 땐 안에 콜백함수를 넣고 두개의 파라미터를 넣고 아래처럼 사용 
// 어레이.sort(function (a,b) {    // sort 함수의 파라미터두개는 array 자료 안에 있던 데이터들을 의미
//   return a - b;
// sort 함수는 양수(+)를 return 하면 a를 오른쪽 / b를 왼쪽으로 보냄
// 음수(-)를 return 하면 a를 왼쪽 / b를 오른쪽으로 보냄
// })

// ⭐ 내림차순 정렬은? b - a
// ⭐ 문자 역순정렬은?
// var 어레이 = ['b', 'a', 'c']

// 어레이.sort(function (a, b) {
//   return a < b ? 1 : a > b ? -1 : 0
//   // if (a < b) return 1;
//   // if (a > b) return -1;
//   // if (a === b) return 0;
// })


$('#sort-btn').click(function () {                          // 버튼 누르면
  products.sort(function (a, b) {                           // products 정렬하고
    return a.price - b.price
  })
  for (i = 0; i < 3; i++) {                                 // 데이터 바인딩 해주세요
    $('.title').eq(i).html(products[i].title);
    $('.price').eq(i).html('가격 : ' + products[i].price);
  }
})

// ⭐ filter() 함수
// Array 자료에서 원하는 것만 거를 때 filter() 사용
// 예를 들어 가격 얼마 이하인 것만 필터링하고 싶을때 사용

// var 어레이 = [20, 3, 5, 12];
// var 뉴어레이 = 어레이.filter(function(a){  //함수 안의 a라는 파라미터는 array 자료안에 있던 하나하나의 데이터를 의미
//   // return 조건식입력
//  return a < 4     // 이러면 4보다 작은것만 걸러짐
// });

// 새로운 변수에 담아서 써야한다.
// filter() 함수는 비교적 신문법이라서 sort()와 다르게 원본을 수정하지 않아서
// 저렇게 변수에 담아쓰는 것만 좀 주의
// 즉, filter()는 기존 array 자료를 변형시키지 않음 / sort()는 기존 array 자료를 변형시킴

// ⭐ map() 함수 
// Array 자료들에 똑같은 작업을 시킬 때
// 예를 들어 array안에 있는 것에 전부 2를 곱해주고 싶을 때 사용
// var 어레이 = [7,3,5,2,40];
// var 뉴어레이 = 어레이.map(function(a){
//   return a * 2
// })
// 뉴어레이를 출력해보면 진짜[14, 6, 10, 4, 80] 이 출력됩니다.

// map 함수 동작원리는
// ① 함수 안의 a라는 파라미터는 array 자료안에 있던 하나하나의 데이터를 의미합니다.
// ② return 오른쪽에 array 자료에 적용할 수식을 적으면 됩니다.
// ③ 그리고 map 함수의 결과는 저렇게 새로운 변수에 담아서 쓰라고 되어있습니다.
// 그려면 수식이 적용된 결과를 퉤 뱉어줍니다.

// 보통 기존 array를 조작한 새로운 array를 만들 때 사용합니다. 