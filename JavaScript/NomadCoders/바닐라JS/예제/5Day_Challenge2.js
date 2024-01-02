function handleResizeColor() {
  const windowWidth = window.innerWidth;

  if (windowWidth < 600) {
    document.body.style.backgroundColor = "skyblue";
  }
  else if (windowWidth >= 600 && windowWidth < 1000) {
    document.body.style.backgroundColor = "purple";
  }
  else {
    document.body.style.backgroundColor = "yellow";
  }
}

window.addEventListener("resize", handleResizeColor);