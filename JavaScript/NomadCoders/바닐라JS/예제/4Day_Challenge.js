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



// 코드샌드박스
/*
// <⚠️ DONT DELETE THIS ⚠️>
import "./styles.css";
const colors = ["#1abc9c", "#3498db", "#9b59b6", "#f39c12", "#e74c3c"];
// <⚠️ /DONT DELETE THIS ⚠️>

/*
✅ The text of the title should change when the mouse is on top of it.
✅ The text of the title should change when the mouse is leaves it.
✅ When the window is resized the title should change.
✅ On right click the title should also change.
✅ The colors of the title should come from a color from the colors array.
✅ DO NOT CHANGE .css, or .html files.
✅ ALL function handlers should be INSIDE of "superEventHandler"
*/

/*
const title = document.querySelector("h2");

const superEventHandler = {
  MouseEnter: function MouseEnter() {
    title.innerText = "The mouse is here!";
    title.style.color = colors[0];
  },

  MouseLeave: function MouseLeave() {
    title.innerText = "The mouse is gone!";
    title.style.color = colors[1];
  },

  Resize: function Resize() {
    title.innerText = "You just resized!";
    title.style.color = colors[2];
  },

  handleContextMenu: function handleContextMenu() {
    title.innerText = "That was a right click!";
    title.style.color = colors[4];
  }
};

title.addEventListener("mouseenter", superEventHandler.MouseEnter);
title.addEventListener("mouseleave", superEventHandler.MouseLeave);
window.addEventListener("resize", superEventHandler.Resize);
window.addEventListener("contextmenu", superEventHandler.handleContextMenu);

*/

/*
superEventHandler를 이벤트함수를 모아놓은 객체라고 생각하시면 됩니다.
예를 들면 handleClick함수가 superEventHandler객체 안에 있으면
superEventHandler.handleClick으로 호출할 수 있습니다.
*/