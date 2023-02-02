const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 800;

// rect function의 원리
ctx.moveTo(50, 50);   // 마우스의 좌표를 처음에 50, 50으로 이동시켜서 시작하기
ctx.lineTo(150, 50);
ctx.lineTo(150, 150);
ctx.lineTo(50, 150);
ctx.lineTo(50, 50);
// ctx.stroke();
ctx.fill();