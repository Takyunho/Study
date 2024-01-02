
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



// ⭐ Hammer.js 세팅
var 이미지1 = document.querySelectorAll('.slide-box img')[0];
    
var 매니저 = new Hammer.Manager(이미지1);
매니저.add(new Hammer.Pan({ threshold: 0 }));
    
매니저.on('pan', function(e){
  console.log(e.deltaX); 
  if (e.deltaX < -1) {  
    $('.slide-container').css('transform', 'translateX(' + e.deltaX + 'px)');
  } 
})

// 🔻 위 코드 설명 🔻
// // 1. 일단 터치를 구현할 HTML요소를 찾아줍니다. (쌩자바스크립트 셀렉터를 이용합니다)
// var 이미지1 = document.querySelectorAll('.slide-box img')[0];

// // 2. new Hammer.Manager()라는 함수에 위의 변수를 담아줍니다.  
// var 매니저 = new Hammer.Manager(이미지1);         // 그냥 암기
// // 3. 내가 사용할 이벤트를 add()함수로 등록하고 threshold 값을 세팅
// 매니저.add(new Hammer.Pan({ threshold: 0 }));     // threshold는 이벤트 발동되기 전까지의 역치값

// // 이해할 것도 없고 그냥 Hammer.js 개발한 사람이 만든 라이브러리 사용법일 뿐이니 그냥 복붙

// 매니저.on('pan', function (e) { //pan이라는 이벤트는 Hammer.js가 제공하는 "터치 후 슬라이드 했을 때"를 체크해주는 이벤트
//   // console.log('출력')
//   console.log(e.deltaX); // 이걸 검사하면 슬라이드 방향도 알 수 있음!

//   // 이미지1이 pan 되었을 때 실행할 코드
//   if (e.deltaX < -1) {  // 만약에 이사람이 왼쪽으로 그림을 슬라이드했을 때 .. 즉 델타X가 음수일때
//     $('.slide-container').css('transform', 'translateX(' + e.deltaX + 'px)'); // 슬라이드한만큼 박스 왼쪽으로 이동
//   }
// });




// ❗ 터치기능은 쌩 자바스크립트로 구현할 경우 매우 복잡합니다.
// 터치 후 슬라이드가 되는 그림을 하나 만들려고 해도, 

//   1. 이미지에다가 touchstart, touchmove, touchend 라는 이벤트리스너를 각각 만들어줍니다.
// 각각 터치시작, 터치중, 터치끝에 발동되는 이벤트리스너입니다.

// 2. 각각 이벤트리스너가 동작할 때 유저가 화면 터치시의 X축 좌표(clientX 라고 씀)를
// 출력하거나 저장해놓습니다.

// 3. touchstart의 X축 좌표와 touchend의 X축 좌표를 빼서 양수가 나오면 오른쪽으로
// 슬라이드했구나~!라고 판단합니다.

// 4. 따라서 터치중일 때(touchmove 발동시) 유저가 X축 좌표를 움직인 만큼
// 똑같이 이미지를 우측으로 움직이게 만들어줍니다. (CSS transform 속성 등 사용)

// 5. 터치를 놓으면(touchend 발동시) 이미지가 완전히 다음 이미지로 변경되게 만들어줍니다.
// 때에 따라 CSS transition을 추가해줍니다.


// 길고 복잡하죠? 어쩔 수 없습니다.
// 하지만 크나큰 벽이 하나 또 있는데, 쌩 자바스크립트 사용시 모바일 브라우저간
// 호환성이 그닥 좋지 않습니다.

// 호환성 잡기도 매우 귀찮습니다. 