const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 800;

// 클릭하면 선긋기
ctx.lineWidth = 1;
ctx.moveTo(0, 0)

function onClick(event) {
  console.log(event)
  // ctx.moveTo(0, 0)
  ctx.lineTo(event.offsetX, event.offsetY)
  ctx.stroke();
}

canvas.addEventListener("click", onClick);
// canvas.addEventListener("mousemove", onClick);