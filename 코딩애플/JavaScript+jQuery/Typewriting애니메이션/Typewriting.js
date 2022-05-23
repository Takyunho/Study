
var h1태그 = document.querySelector('h1');
var 원래글씨 = document.querySelector('h1').innerHTML;

$('.button').click(function () {
  애니메이션(h1태그, 원래글씨);
});


// 함수화하기
// 함수화할 땐 변수들에 주의해야함(애니메이션() 이라는 함수 안에 변수들이 정의가 안되어있다고 에러가 날 수도)
// 변수를 파라미터로 바꿔주어야 다른데도 적용가능함
function 애니메이션(h1태그, 원래글씨) {

  h1태그.innerHTML = '';  

  for (let i = 0; i < 원래글씨.length; i++) {
    setTimeout(function () {
      h1태그.innerHTML = h1태그.innerHTML + 원래글씨[i];
    }, i * 500 )
  }
  
}

// 한글 타이핑라이트 애니메이션도 있음






