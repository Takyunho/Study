const clock = document.querySelector("#clock");

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;


function xmasCountDown() {
  const xmasDate = new Date("2021, 12, 25");       //크리스마스(전달 받은 일자)
  const currentDate = new Date();                  //오늘

  const totalSeconds = xmasDate.getTime() - currentDate.getTime();

  const days = String(Math.floor(totalSeconds / day)).padStart(3, "0");
  const hours = String(Math.floor(24 - currentDate.getHours() - 1)).padStart(2, "0");
  const minutes = String(Math.floor(60 - currentDate.getMinutes() - 1)).padStart(2, "0");
  const seconds = String(Math.floor(60 - currentDate.getSeconds() - 1)).padStart(2, "0");

  clock.innerText = (`${days}d ${hours}h ${minutes}m ${seconds}s`);
}

xmasCountDown();
setInterval(xmasCountDown, 1000);


