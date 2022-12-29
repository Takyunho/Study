// 제니코스 차트 그리기
export default function getDataAndDrawChart2(plot, workLine, sensor) {
  // const url = `http://14.52.100.115:5000/rest/regression/predict?work_line=${workLine}&sensor=${sensor}`;
  // ex. work_line : MA05 / sensor : homo_rpm

  // https
  const url = `https://t2v.kr:50010/genicos`;
  
  const getData = async () => {
    const response = await fetch(url);
    const resJSON = await response.json();
    return resJSON;
  };

  getData().then((result) => {
    console.log("result : ", result);
    result.reverse(); // 시간값이 반대로 나와서 차트 그릴때 x축을 위해 reverse() 함수를 이용하여 배열 뒤집기

    // 데이터 가공
    let nowDate = [];
    let nowResult = [];
    let predictHigh = [];
    let predictLow = [];
    let sensor = [];
    let workLine = [];

    result.forEach((item, index) => {
      nowDate[index] = item.now_date;
      nowResult[index] = item.now_result;
      predictHigh[index] = item.predict_high;
      predictLow[index] = item.predict_low;
      sensor[index] = item.sensor;
      workLine[index] = item.work_line;
    });

    // 차트 그리기 함수
    drawChart(plot, nowDate, nowResult, predictHigh, predictLow, sensor);
  });

  // 차트 그리기함수
  function drawChart(
    plot,
    nowDate,
    nowResult,
    predictHigh,
    predictLow,
    sensor
  ) {
    let data = [];
    const START = moment(nowDate, "YYYY-MM-DD").format("YYYY-MM-DD 08:00:00");
    const END = moment(nowDate, "YYYY-MM-DD").format("YYYY-MM-DD 21:00:00");

    // predictHigh(상한값)
    const trace1 = {
      x: nowDate,
      y: predictHigh,
      type: "scatter",
      mode: "lines+markers",
      name: "predict_High",
      line: { width: 2, color: "red" },
      marker: { color: "red", size: 2 },
      // fill: "tonexty",
      // fillcolor: "rgba(211, 211, 211, 0.5)",
      // fillcolor: "rgba(68, 68, 68, 0.1)",
    };

    // predictLow(하한값)
    const trace2 = {
      x: nowDate,
      y: predictLow,
      type: "scatter",
      mode: "lines+markers",
      name: "Predict_Low",
      line: { width: 2 },
      marker: { color: "red", size: 2 },
      fill: "tonexty",
      // fillcolor: 'rgba(0,0,0,0)'
      fillcolor: "rgba(211, 211, 211, 0.5)",
    };

    // nowResult(현재값)
    const trace3 = {
      x: nowDate,
      y: nowResult,
      type: "scatter",
      mode: "lines+markers",
      name: "Now_Value",
      line: { color: "#2196f3", width: 2 },
      marker: { color: "#2196f3", size: 2 },
      // fill: "tonexty",
      // fillcolor: "rgba(24,29,41)"
    };

    data.push(trace1, trace2, trace3);

    // 레이아웃
    const layout = {
      title: false, // 차트의 제목
      width: 390, // 차트의 너비
      height: 145, // 차트의 높이
      xaxis: {
        range: [START, END],
        zeroline: false,
        ticks: "inside", // 글씨를 안쪽으로 할지 바깥쪽으로 할지
        gridcolor: "rgba(125, 127, 132, 0.4)", // x축의 grid 색상을 변경할 수 있다.
        // tickcolor: 'rgba(0,0,0,0)',
        nticks: 6,
      },
      yaxis: {
        zeroline: false,
        ticks: "outside",
        gridcolor: "rgba(125, 127, 132, 0.4)",
        nticks: 5,
      },

      margin: { t: 30, b: 55, l: 55, r: 20, pad: 10 },
      showlegend: false,
      paper_bgcolor: "rgba(0,0,0,0)",
      plot_bgcolor: "rgba(0,0,0,0)",
      autosize: true,
      font: {
        // family: 'Noto Sans KR',
        size: 12,
        color: "#fff",
        weight: 200,
      },
    };

    Plotly.newPlot(plot, data, layout, { displayModeBar: false });
  }
}