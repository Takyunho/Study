
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
// var 이미지1 = document.querySelectorAll('.slide-box img')[0];
// var 매니저1 = new Hammer.Manager(이미지1);
// 매니저1.add(new Hammer.Pan({ threshold: 0 }));
// 매니저1.on('pan', panHandler1);

// var 이미지2 = document.querySelectorAll('.slide-box img')[1];
// var 매니저2 = new Hammer.Manager(이미지2);
// 매니저2.add(new Hammer.Pan({ threshold: 0 }));
// 매니저2.on('pan', panHandler2);

var 이미지0 = document.querySelectorAll('.slide-box img')[0];
var 매니저0 = new Hammer.Manager(이미지0);
매니저0.add(new Hammer.Pan({ threshold: 0 }));
매니저0.on('pan', panHandler0);

var 이미지1 = document.querySelectorAll('.slide-box img')[1];
var 매니저1 = new Hammer.Manager(이미지1);
매니저1.add(new Hammer.Pan({ threshold: 0 }));
매니저1.on('pan', panHandler1);



function panHandler0(e) {
  console.log(e.deltaX);
  if (e.deltaX < -1) {
    var 이동거리1 = e.deltaX;
    $('.slide-container').css('transform', 'translateX(' + 이동거리1 + 'px)');
  
    if (e.isFinal && index == 1) {
      $('.slide-container').addClass('transforming');
      $('.slide-container').css('transform', 'translateX(-100vw)');
      setTimeout(function () {
        $('.slide-container').removeClass('transforming');
      }, 500);
      index = index + 1;
    }
  }
}


function panHandler1(e) {
  console.log(e.deltaX); 
  if (e.deltaX < -1 ) {
    var 이동거리2 = '-100vw' + e.deltaX;
    $('.slide-container').css('transform', 'translateX(' + 이동거리2 + 'px)');
  
    if (e.isFinal && index == 2) {
      $('.slide-container').addClass('transforming');
      $('.slide-container').css('transform', 'translateX(-200vw)');
      setTimeout(function () {
        $('.slide-container').removeClass('transforming');
      }, 500);
      index = index + 1;
    }
  }
}

