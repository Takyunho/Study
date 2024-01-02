// 1. 화면에 네모, 원 그릴 수 있어야함 (캔버스 태그 이용)
// 2. 프레임마다 코드 실행이 가능해야함(애니메이션을 위해)
// 3. collision check 할 수 있어야 함 (충돌 하는지 안하는지 검사할 수 있는 코드)

// 1. 캔버스 생성
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;


var img2 = new Image();
img2.src = '../IMG/dinosaur.png';

// 그릴 캐릭터의 정보를 object 자료로 정리
var dino = {
  x: 10,
  y: 200,
  width: 50,
  height: 50,
  draw() {
    ctx.fillStyle = 'green';  // 초록색 네모를 그려줘
    // ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.drawImage(img2, this.x, this.y, this.width, this.height);
  }
}





// 네모대신 이미지넣기
var img1 = new Image();   // 이미지 오브젝트 뽑기
img1.src = '../IMG/cactus.png';


// 장애물도 역시 속성부터 object 자료에 정리해두면 편리
// 근데 장애물들은 width, height 이런게 각각 다를 수도 -> 비슷한 object가 많이 필요할듯
// 클래스로 만드는게 일반적
class Cactus {
  constructor() {
    this.x = 500;
    this.y = 200;
    this.width = 50;
    this.height = 50;
  }
  draw() {
    ctx.fillStyle = 'blue';
    // 네모로 넣기
    // ctx.fillRect(this.x, this.y, this.width, this.height);
    // 네모대신 이미지 넣기
    ctx.drawImage(img1, this.x, this.y, this.width, this.height) 
  }
}


// 2. 코드를 1초에 60번 실행하면 애니메이션 만들 수 있음
var timer = 0;
var cactus여러개 = [];
var 점프timer = 0;
var 애니메이션;

// 애니메이션을 만들려면 1초에 60번 x++ 해줘야함
// 1초에 60번 코드 실행하기
function 프레임마다실행할거() {
  애니메이션 = requestAnimationFrame(프레임마다실행할거);  // 1초에 프레임만큼 동작
  timer++;

  // 그림 그리기 전에 캔버스 지우기
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 장애물 생성하기
  // 2~3초에 한번 이거 실행하면 될 듯
  if (timer % 300 === 0) {      // 300은 프레임
    var cactus = new Cactus();  // 프레임마다 장애물 생성
    cactus여러개.push(cactus);  // 생성된 장애물을 어레이에 다 집어넣음
  }

  cactus여러개.forEach((a, i, o) => { // 어레이에 있던거 다 draw() 해주세요
    
    // x 좌표가 0미만이면 제거
    if (a.x < 0) {
      o.splice(i, 1);
    }
    a.x--;    // 장애물이 왼쪽으로 이동

    // 충돌하는지 판단
    // 주인공 vs 모든 장애물 충돌체크해야 하므로 forEach 반복문 안에다가 작성
    충돌하냐(dino, a);      // a는 각각의 장애물들

    a.draw()
  })

  if (점프중 == true) {
    dino.y-= 1;   // 점프 속도 조절
    점프timer++;
  }
  // 점프중이 아니면
  if (점프중 == false) {
    // 최저 y높이를 정해두고 그거 이상으로는 dino.y++ 금지시키기
    if (dino.y < 200) { // 위에서 부터 200픽셀을 넘어가면
      dino.y++;
    }     
  }


  // 점프 타이머(점프를 시작한지 100프레임이 넘으면 점프 중단)
  if (점프timer > 100) {
    점프중 = false;
    점프timer = 0;
  }

  dino.draw();
}

프레임마다실행할거();



// 충돌확인
function 충돌하냐(dino, cactus) {
  // 유닛 두개가 충돌하고 있는지 판정하는 함수
  var x축차이 = (cactus.x + 20) - (dino.x + dino.width);
  var y축차이 = (cactus.y + 20) - (dino.y + dino.height);
  // 만약 x축차이와 y축차이가 0보다 작으면 충돌한 것으로 감지
  if (x축차이 < 0 && y축차이 < 0) {
    // 캔버스를 클리어
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // 애니메이션 정지 (프레임마다 실행하는거 정지시키기)
    cancelAnimationFrame(애니메이션);
  }
}


// 점프
var 점프중 = false;

document.addEventListener('keydown', function (e) {
  if (e.code === 'Space') {
    // 스페이스바를 눌렀을 때 안에 있는 코드 실행
    점프중 = true;
  }
})