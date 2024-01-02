/*
const h1 = document.querySelector("div.hello:first-child h1")

function handleTitleClick() {       // 클릭해서 파란색, 토마토색으로 계속 바뀌게
  if(h1.style.color === "blue") {   // ===는 값이 일치함을 확인하기 위한 것
    h1.style.color = "tomato";
  }
  else {
    h1.style.color = "blue";        
  }
}

h1.addEventListener("click", handleTitleClick);
*/

const h1 = document.querySelector("div.hello:first-child h1")

function handleTitleClick() {  
  const currentcolor = h1.style.color;
  let newColor;    
  if(currentcolor === "blue") {   
    newColor = "tomato";
  }
  else {
    newColor = "blue";        
  }
  h1.style.color = newColor;
}

h1.addEventListener("click", handleTitleClick);

/*
초반에 currentColor에 현재 색상 값을 저장하고 이후 newColor 변수를 선언해서
if 문에 따라 어떤 색상을 지정할지 값을 할당했습니다.
그리고 마지막에 당연히 그 어떤 값을 넣을지 세팅한 newColor를 h1.style.color에 저장하면
이제 그 색상이 바뀌게 되는데,
newColor에 다시 h1.style.color를 할당하면
이제까지 if문에서 한 것은 의미가 없고 색상이 바뀌지도 않습니다.
*/

/*
1. element 찾기
2. event를 listen
3. 그 event에 반응하기(무언가를 보여주거나, 감추거나, 색깔을 바꾼다는 것 등)
*/