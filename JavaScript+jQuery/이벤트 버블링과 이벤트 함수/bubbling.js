// 모달창
// 로그인버튼 눌렀을때 모달창이 위에서 아래로 (최종화면)
$('.logIn-btn').click(function () {
  $('.black-background').addClass('down-slide');  //addClass에서는 .안씀
});
// 닫기버튼 눌렀을때 모달창이 아래서 위로
$('#close').click(function () {
  $('.black-background').removeClass('down-slide');
});


$('.black-background').click(function (e) {   // 파라미터 이름은 아무렇게나 작성하면 됨

  // 🔻 만약에 지금 실제로 클릭한게 검은 배경일 때만 모달창을 닫아주세요 
  if (e.target == e.currentTarget) {
    $('.black-background').removeClass('down-slide');
    e.stopPropagation();
  }
})


//nav 메뉴 눌렀을때 아래로 세부메뉴 보이게하거나 숨기기(toggle) 
$('#nav-sub-btn').click(function () {
  $('.nav-sub').slideToggle();
})


// 폼이 전송될 때
$('form').on('submit', function (e) {
  var 입력한이메일 = $('#email').val();
  var 이메일검증 = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/;
  // 🔺특수문자만 걸러주고 한글 등 다양한 문자들도 다 통과시키는 이메일 정규식

  // 만약에 이메일 input에 입력된 값이 정규식과 비교했을때 false인 경우, 폼전송 막기 + 안내창 띄우기
  if (입력한이메일 == '') {
    e.preventDefault();
    $('#email-alert').html('공백입니다. 다시 입력해주세요.');
    $('#email-alert').show();
  } else if (이메일검증.test(입력한이메일) == false) {
    e.preventDefault(); // 폼의 전송을 막는 코드
    $('#email-alert').html('이메일 형식이 잘못되었습니다.');
    $('#email-alert').show();
  }

  var 입력한비밀번호 = $('#password').val();
  var 패스워드검증 = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;  // 최소 8 자, 하나 이상의 대문자, 하나의 소문자 및 하나의 숫자


  // 패스워드 입력란에 대문자 들어있는지 검사(대문자가 없으면 전송 X )
  if (패스워드검증.test(입력한비밀번호) == false) {
    e.preventDefault();
    $('#password-alert').show();
  }
});


// 왼쪽 사이드 메뉴
$('#show-menu').click(function () {
  $('.left-menu').animate({ marginLeft: '0px' }, 700);
});


// Carousel
var 이전버튼 = $('.prevBtn'); // 이전버튼 감지
var 다음버튼 = $('.nextBtn'); // 다음버튼 감지
var 이미지개수 = $('.slide-container').find('img').length // 슬라이드 콘테이너 안에 있는 이미지를 찾아서 개수로 반환
var index = 1; //index라는 값을 통해 이미지 숫자를 입력하여 이전과 이후에 리소스가 있는지 없는지 판단

// Carousel(사진 기준 왼쪽 이동)
다음버튼.click(function () {
  if (index < 이미지개수) { //인덱스가 내가 업로드한 이미지의 개수보다 작으면 증가 멈춰줘
    $('.slide-container').css('transform', 'translateX(-' + index + '00vw)');
    index = index + 1;
  }
});
// Carousel(사진 기준 오른쪽 이동)
이전버튼.click(function () {
  if (index > 1) {        // 사진 1일때는 기능이 동작하지 않도록
    $('.slide-container').css('transform', 'translateX(-' + (index - 2) + '00vw)');
    index = index - 1;
  }
});


// 스크롤바를 내리면 메뉴(nav)가 불투명 해지도록
$(window).scroll(function () {    // window = 뷰포트(화면전체)

  if ($(window).scrollTop() > 100) {    // 만약에 지금 스크롤을 100px 내렸을때만
    $('.nav-menu').addClass('nav-black');
    $('.nav-menu h4').css('font-size', '20px');
    $('.nav-menu h4').css('transition', 'all 1s');
  } else {
    $('.nav-menu').removeClass('nav-black');
    $('.nav-menu h4').css('font-size', '30px');
  }
})


// ✅ 탭기능 다시 만들기(이벤트 버블링 응용과 dataset)

// ⭐ 1. 함수 축약 및 반복문을 통한 탭기능
// var tabBtn = $(document).find('.tab-button').length; 

// for (let i = 0; i < tabBtn; i++) {      // for 반복문 안에 이벤트리스너 안에 i 변수가 있으면 let으로 바꿔야 잘 동작함 
//   $('.tab-button').eq(i).click(function () {
//     탭열기(i);
//   })
// };


// ⭐ 2. 이벤트 버블링을 이용한 탭기능
// 이벤트 버블링이 일어나므로 li태그에 3개의 이벤트 리스너를 사용하는 것이 아닌
// ul태그 하나에 이벤트 리스너를 달아도 됨
// 이벤트 리스너가 많아지면 자원이 많이 사용되므로 적게 사용하면 메모리 절약가능

// 🔻 반복문을 이용하지 않고 이벤트 버블링을 이용(이벤트 리스너를 절약하는 코딩 스타일)
// $('.list').click(function (e) {
//   // 만약에 내가 실제 누른 요소가 버튼0이면 탭0번 열어주셈
//   if (e.target == document.querySelectorAll('.tab-button')[0]) {
        //querySelectorAll()은 jquery의 $ 셀렉터랑 유사한 기능을 제공
//     // console.log(e.target);
//     탭열기(0);
//   }
//   if (e.target == document.querySelectorAll('.tab-button')[1]) {
//     // console.log(e.target);
//     탭열기(1);
//   }
//   if (e.target == document.querySelectorAll('.tab-button')[2]) {
//     // console.log(e.target);
//     탭열기(2);
//   }
// })


// 그런데 만약 버튼이 많은 경우엔 if 문을 많이 써야되므로 코드 길이가 길어짐
// 결국 코드 양이 비슷해지므로,
// HTML 요소에 몰래 정보를 숨겨두는 dataset이라는 문법을 이용
// data-작명="값" 이렇게 맘대로 HTML에 작성 후
// JS에서 HTML요소.dataset.id(작명)를 통해 데이터 불러올 수 있음
// ex. document.querySelectorAll('.tab-button')[0].dataset.id(작명)
// ⭐ 3. 이벤트버블링 + dataset문법을 이용한 탭기능
// 🔻 데이터셋을 이용
$('.list').click(function (e) {
  // 탭열기(내가누른버튼에숨겨져있던숫자)
  // 내가 누른버튼 = e.target / 숨겨져 있던 숫자(HTML에 심어놓은 데이터) = .dataset.작명
  탭열기(e.target.dataset.작명)
})


// ⭐ 참고 
// 제이쿼리버전으로 HTML에 몰래 정보저장하는법
// $('.list').data('작명', '값');

// 저장된 정보 꺼내쓰는법
// $('.list').data('작명');  ==> 콘솔창으로 확인가능

// $('.tab-button').data('버튼1', '0');
// $('.tab-button').data('버튼2', '1');
// $('.tab-button').data('버튼3', '2');

// var 버튼1 = $('.tab-button').data('버튼1');
// var 버튼2 = $('.tab-button').data('버튼2');
// var 버튼3 = $('.tab-button').data('버튼3');


function 탭열기(숫자) {
  $('.tab-button').removeClass('active');
  $('.tab-content').removeClass('show');
  $('.tab-button').eq(숫자).addClass('active');  //함수로 축약할 때 함수안의 변수는 정의해줘야함
  $('.tab-content').eq(숫자).addClass('show');
}