/*
const body = document.querySelector("body");

function handleResizeColor() {
  const innerWidth = window.innerWidth;

  if (innerWidth < 500){
    body.className = "backColor1";
  }
  else if (innerWidth >= 500 && innerWidth < 900) {
    body.classList.remove("backColor1");
    body.classList.add("backColor2");
  }
  else {
    body.classList.remove("backColor2");
    body.classList.add("backColor3");
  }
}

window.addEventListener("resize", handleResizeColor);

*/
const body = document.body;

function handleResizeColor() {
  const innerWidth = window.innerWidth;
  const currentColor = "backColor1"; // 변수로 만들어서 사용 가능

  if (innerWidth < 800) {
    body.className = currentColor;
  }
  else if (innerWidth >= 800 && innerWidth < 1400) {
    body.classList.remove("backColor1");
    body.classList.remove("backColor3");
    body.classList.add("backColor2");
  }
  else {
    body.classList.remove("backColor1");
    body.classList.remove("backColor2");
    body.classList.add("backColor3");
  }
}

window.addEventListener("resize", handleResizeColor);

// body는 midium 스크린이 적용되어 있음