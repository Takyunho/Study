export default function gaugeChartDraw(PROGRESS) {

  const BLUE = "rgb(90,144,247)";
  const BLUE_BACKGROUND = "rgba(90,144,247,0.3)";

  const RED = "rgb(215,70,61)";
  const RED_BACKGROUND = "rgba(215,70,61,0.3)";

  let GAUGE_COLOR = "";
  let GAUGE_BACKGROUND_COLOR = "";

  // 동적으로 할 때 필요
  if (PROGRESS === "A40104" || PROGRESS === "A40304") {
    GAUGE_COLOR = BLUE;
    GAUGE_BACKGROUND_COLOR = BLUE_BACKGROUND;
  } else if (PROGRESS === "A40204") {
    GAUGE_COLOR = RED;
    GAUGE_BACKGROUND_COLOR = RED_BACKGROUND;
  }

  // const bgBar = document.querySelector(".progress1").style.backgroundColor = GAUGE_BACKGROUND_COLOR;
  // const bar = document.querySelector(".cssProgress-bar1").style.backgroundColor = GAUGE_COLOR;
  document.querySelector(".progress1").style.backgroundColor = BLUE_BACKGROUND;
  document.querySelector(".cssProgress-bar1").style.backgroundColor = BLUE;
  document.querySelector(".progress2").style.backgroundColor = RED_BACKGROUND;
  document.querySelector(".cssProgress-bar2").style.backgroundColor = RED;
  document.querySelector(".progress3").style.backgroundColor = BLUE_BACKGROUND;
  document.querySelector(".cssProgress-bar3").style.backgroundColor = BLUE;
  document.querySelector(".progress4").style.backgroundColor = RED_BACKGROUND;
  document.querySelector(".cssProgress-bar4").style.backgroundColor = RED;
  document.querySelector(".progress5").style.backgroundColor = BLUE_BACKGROUND;
  document.querySelector(".cssProgress-bar5").style.backgroundColor = BLUE;

  


  drawChart();

  function drawChart() {
    const query = `http://183.111.79.82:8086/query?db=daedong&q=select ${PROGRESS} from sp_MON_PRD14 order by time desc limit 1`;
    fetch(query)
      .then((response) => response.json())
      .then((parsedResponse) => {
        data = parsedResponse.results[0].series[0].values[0][1];
        drawBarChartAttribute(data);
        // setSideText(data)
      })
      .catch((error) => console.log(error));
  }

  function drawBarChartAttribute(data) {
    const bar = document.querySelector(".cssProgress-bar");
    const val = data;
    const chartVal = data > 100 ? 100 : data;
    bar.style.backgroundColor = GAUGE_COLOR;
    bar.style.width = chartVal + "%";
  }
}
