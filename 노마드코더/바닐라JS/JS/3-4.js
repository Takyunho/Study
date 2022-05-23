// listen 하고 싶은 event를 찾는 가장 좋은 방법은 구글에 찾고 싶은 요소의 이름을 검색하는 것
// mdn에 검색
// 링크에 web APIs라는 문장이 포함된 페이지를 찾음 

const title = document.querySelector("div.hello:first-child h1");

function handleTitleClick() {
  title.style.color = "blue";
}

function handleMouseEnter() {
  title.innerText = "Mouse is here!";
}

function handleMouseLeave() {
  title.innerText = "Mouse is gone!";
}




title.addEventListener("click", handleTitleClick);
title.addEventListener("mouseenter", handleMouseEnter);
title.addEventListener("mouseleave", handleMouseLeave);