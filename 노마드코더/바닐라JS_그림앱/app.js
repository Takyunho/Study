const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 800;

// 간단한 집만들기
// 벽
ctx.fillRect(200, 200, 50, 200);
ctx.fillRect(400, 200, 50, 200);
// 문
ctx.lineWidth = 2;    // context는 순서가 있다. memory를 가지므로, strokeRect를 하기 전에 선의 스타일을 먼저 지정해줘야 한다. 즉, 선의 너비를 먼저 바꿔주고, stroke를 해야 함
ctx.strokeRect(300, 300, 50, 100);
// 천장
ctx.fillRect(200, 200, 200, 10);
// 지붕
ctx.moveTo(200, 200);
ctx.lineTo(325, 100);   // 200과 450의 사이 = 325
ctx.lineTo(450, 200);
// ctx.stroke();
ctx.fill();

// 바닥
ctx.moveTo(200, 400);
ctx.lineTo(450, 400);
ctx.stroke();