export default function app() {
  const canvas = document.querySelector("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = 800;
  canvas.height = 800;

  ctx.lineWidth = 1;

  const colors = [
    "#4a7da5",
    "#764ba2",
    "#66a6ff",
    "#ff7eb3",
    "#fad0c4",
    "#6f86d6",
    "#fecfef",
    "#e2ebf0",
    "#ebedee",
    "#dd1818",
  ];

  function onClick(event) {
    // console.log(event)
    ctx.beginPath(); //# beginPath()를 사용해서 선들이 각각 다른 색을 갖도록 할 수 있다.
    ctx.moveTo(0, 0); //# 처음 시작위치 0, 0

    //* 색 랜덤으로 선택하기
    //* Math.random() 메소드는 0.124124521와 같이 소수점 숫자를 랜덤으로 생성
    //* Math.floor() 메소드는 소수점 자리를 내림해서 정수로 변환
    const color = colors[Math.floor(Math.random() * colors.length)];
    ctx.strokeStyle = color;

    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
  }

  // canvas.addEventListener("click", onClick);
  canvas.addEventListener("mousemove", onClick); // mouse가 움직일 때마다 그려주기
}
