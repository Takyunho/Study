const title = document.querySelector("div.hello h1");

function handleMouseEnter() {
  title.innerText = "The mouse is here!";
  title.style.color = "#33D0AE"
}

function handleMouseLeave() {
  title.innerText = "The mouse is gone!";
  title.style.color = "#2C7EC9"
}

function handlewindowResize() {
  title.innerText = "You just resized";
  title.style.color = "purple"
}

function handleContextMenu() {
  title.innerText = "That was a right click!"
  title.style.color = "red"
}

title.addEventListener("mouseenter", handleMouseEnter);
title.addEventListener("mouseleave", handleMouseLeave);

window.addEventListener("resize", handlewindowResize);
window.addEventListener("contextmenu", handleContextMenu);



/* document의 body,head,title 이런것들은 중요하기 때문에
document.body.style~의 명령이 허용되지만, div같은것들은 호출이 안됨
나머지 element들은 querySelector나 getElementById로 불러와야됨!!!!!!! */