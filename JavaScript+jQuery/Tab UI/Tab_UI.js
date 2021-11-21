// 모달창
// 로그인버튼 눌렀을때 모달창이 위에서 아래로 (최종화면)
$('.logIn-btn').click(function () {
  $('.black-background').addClass('down-slide');  //addClass에서는 .안씀
});
// 닫기버튼 눌렀을때 모달창이 아래서 위로
$('#close').click(function () {
  $('.black-background').removeClass('down-slide');
});


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
$(window).scroll(function () {    // window = 뷰포트(화면전체) / 자바스크립트에서는 document

  if ($(window).scrollTop() > 100) {    // 만약에 지금 스크롤을 100px 내렸을때만
    $('.nav-menu').addClass('nav-black');
    $('.nav-menu h4').css('font-size', '20px');
    $('.nav-menu h4').css('transition', 'all 1s');
  } else {
    $('.nav-menu').removeClass('nav-black');
    $('.nav-menu h4').css('font-size', '30px');
  }
})

// 0. 버튼 1과 버튼 2에 붙은 주황색(active) 제거 
// + 내용 0, 내용 1, 내용 2를 안보이게 ==> show 제거
// 1. 버튼 0(products)을 누르면 버튼 0이 주황색으로 하이라이트 되어야함
// 2. 내용 0이 보여야함

$('.tab-button').eq(0).click(function () {        // 첫번째 버튼 찾기(제이쿼리에서 eq사용)
  $('.tab-button').removeClass('active');         // 그냥 모든 버튼을 제거하면 됨!
  $('.tab-content').removeClass('show');      
  $('.tab-button').eq(0).addClass('active');      // 제거한 후 추가!
  $('.tab-content').eq(0).addClass('show');
})

$('.tab-button').eq(1).click(function () {
  $('.tab-button').removeClass('active');
  $('.tab-content').removeClass('show');
  $('.tab-button').eq(1).addClass('active');
  $('.tab-content').eq(1).addClass('show');
})

$('.tab-button').eq(2).click(function () {
  $('.tab-button').removeClass('active');
  $('.tab-content').removeClass('show');
  $('.tab-button').eq(2).addClass('active');
  $('.tab-content').eq(2).addClass('show');
})
