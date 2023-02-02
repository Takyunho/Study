const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 800;

// 간단한 사람모양 만들기
// 팔
ctx.fillRect(210, 300, 15, 100)
ctx.fillRect(330, 300, 15, 100)
// 몸통
ctx.fillRect(250, 300, 55, 200)
// 머리 (동그라미를 그릴때는 arc를 사용한다.)
ctx.arc(278, 250, 40, 0, 2 * Math.PI);    // 시작 각도 0 / 끝 각도 2 * Math.PI
ctx.fill();

// 눈
ctx.beginPath();    // * style을 지정하기 위해서는 꼭 경로를 새로 지정해야 한다.
ctx.fillStyle = "#fff";
ctx.arc(258, 250, 5, Math.PI, 2 * Math.PI);
ctx.arc(298, 250, 5, Math.PI, 2 * Math.PI);
ctx.fill();