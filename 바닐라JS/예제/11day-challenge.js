const colors = [
  "#ef5777",
  "#575fcf",
  "#4bcffa",
  "#34e7e4",
  "#0be881",
  "#f53b57",
  "#3c40c6",
  "#0fbcf9",
  "#00d8d6",
  "#05c46b",
  "#ffc048",
  "#ffdd59",
  "#ff5e57",
  "#d2dae2",
  "#485460",
  "#ffa801",
  "#ffd32a",
  "#ff3f34"
];

const bodyBtn = document.querySelector("#body button");
// 먼저 bodyBtn 태그를 js에서 사용할 수 있도록 선언한다.
function handleColorChange() {
  const colorChange1 = colors[Math.floor(Math.random() * colors.length)];
  const colorChange2 = colors[Math.floor(Math.random() * colors.length)];
  // 두 가지 색상을 선택해야 하므로 선택된 색상을 각각 변수 colorChange1과 colorChange2로 선언
  // 색상을 랜덤으로 선택하기 위해 Math.random()함수를 사용한다.
  //colors.length 를 최댓값으로 사용해 Math.random() * colors.length으로 작성하면 0~17까지 난수를
  // 얻을 수 있다. (Math.random() 함수의 범위에 1이 포함되지 않아 18을 얻을 수 없다.)
  if (colorChange1 === colorChange2) {
    return handleColorChange();
    //선택된 두 가지 색상이 겹치는 것을 방지하기 위한 코드이다.
    //변수 colorChange1와 colorChange2가 동일한 경우, handleColorChang 함수를 다시 실행한다.
    // 이렇게 함수 내부에 자기 자신을 호출하는 함수를 재귀 함수라고 한다.
  }

  document.body.style.background = `linear-gradient(to right, ${colorChange1}, ${colorChange2})`;
  // 최종적으로 선택된 두 가지 색상을 사용해 body 태그의 배경을 linear-gradient로 바꿔준다.
  // body의 style 객체의 background 프로퍼티를 이용한다.
  // `linear-gradient(to left, ${colorChange1}, ${colorChange2}`) 는 템플릿 리터럴 이라고 하는 문자열 표기법이다.
}

bodyBtn.addEventListener("click", handleColorChange);


