// CSS와 반응하는 법

const h1 = document.querySelector("div.hello:first-child h1")

function handleTitleClick() {
  const activeClass = "active";
  if (h1.className === activeClass) {
    h1.className = "";
  }
  else {
    h1.className = activeClass;
  }
  
}

h1.addEventListener("click", handleTitleClick);
