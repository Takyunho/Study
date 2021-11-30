
// 로그인버튼 눌렀을때 모달창 위에서 아래로 (최종화면)
$('.logIn-btn').click(function () {
  $('.black-background').addClass('down-slide');  //addClass에서는 .안씀
});
// 닫기버튼 눌렀을때 모달창 아래서 위로
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
  // 특수문자만 걸러주고 한글 등 다양한 문자들도 다 통과시키는 이메일 정규식

  // 만약에 이메일 input에 입력된 값이 정규식과 비교했을때 false인 경우
  // 폼전송 막기 + 안내창 띄우기
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
  var 패스워드검증 = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  // 최소 8 자, 하나 이상의 대문자, 하나의 소문자 및 하나의 숫자

  // 패스워드 입력란에 대문자 들어있는지 검사(대문자가 없으면 전송 X )
  if (패스워드검증.test(입력한비밀번호) == false) {
    e.preventDefault();
    $('#password-alert').show();
  }
});

// 왼쪽메뉴
$('#show-menu').click(function () {
  $('.left-menu').animate({ marginLeft: '0px' }, 700);
});



// Carousel
var 이전버튼 = $('.prevBtn'); // 이전버튼 감지
var 다음버튼 = $('.nextBtn'); // 다음버튼 감지
var 이미지개수 = $('.slide-container').find('img').length // 슬라이드 콘테이너 안에 있는 이미지를 찾아서 개수로 반환

//변수를 하나 만들어서 지금 몇번째 사진을 보고있는지를 저장
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



// Hammer.js 세팅
var 이미지1 = document.querySelectorAll('.slide-box img')[0];
    
var 매니저 = new Hammer.Manager(이미지1);
매니저.add(new Hammer.Pan({ threshold: 0 }));
    
매니저.on('pan', function(e){
  console.log(e.deltaX); 
  if (e.deltaX < -1) {  
    $('.slide-container').css('transform', 'translateX(' + e.deltaX + 'px)');
  
    // ⭐ 만약에 마우스를 놓으면
    if (e.isFinal) {
      // 이미지를 두번째 이미지로 바꿔주셈
      // $('.slide-container').css('transform', 'translateX(-100vw)');
      // 그런데 이미지2로 변할 때 부자연스러움
      // 따라서 서서히 변하도록 코드를 짜자
      // 클래스를 추가해서 트랜지션을 주자(CSS로 직접 적용하면 터치와 동시에 트랜지션이
      // 적용되어 버리기 때문)
      // 따라서 이미지 2를 보여주기 전에만 잠깐 트랜지션이 적용되도록
      $('.slide-container').addClass('transforming');
      $('.slide-container').css('transform', 'translateX(-100vw)');
      // 다시 트랜지션제거
      // $('.slide-container').removeClass('transforming');
      // 그러나 트랜지션이 0.5초간 작동 된 후 제거하는게 더 좋을거 같음
      // 0.5초 후에 코드를 실행하고 싶을 때 쓰는 문법
      setTimeout(function () {
        $('.slide-container').removeClass('transforming');
      }, 500);
      // setTimeout()이라는 함수를 쓰시면 
      // 원하는 시간 후에 코드를 실행할 수 있습니다. 
      // setTimeout(function(){ 실행할코드 }, 기다릴시간)
    }
    
  
  }
})











