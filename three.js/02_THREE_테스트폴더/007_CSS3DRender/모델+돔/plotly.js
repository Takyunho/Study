

export default function getDataAndDrawChart_c() {
  const urlParams = new URLSearchParams(window.location.search);
  const workLine = urlParams.get("work_line");
  const sensor = urlParams.get("sensor");
  const url = `http://14.52.100.115:5000/rest/regression/predict?work_line=${workLine}&sensor=${sensor}`;
  // ex. work_line : MA05 / sensor : homo_rpm
  const statusUrl = `http://14.52.100.115:8086/query?db=regression_alarm&q=select%20*%20from%20MA01_alarm%20order%20by%20time%20desc%20limit%209`;

  // 데이터 얻어오기 (api 호출)
  const getData = async () => {
    const response = await fetch(url);
    const resJSON = await response.json();
    return resJSON;
  };

  getData().then((result) => {
    // console.log("result : ", result);
    result.reverse(); // 시간값이 반대로 나와서 차트 그릴때 x축을 위해 reverse() 함수를 이용하여 배열 뒤집기

    fetch(statusUrl)
      .then((data) => data.json())
      .then((parsedData) => {
        // console.log(parsedData);
        let columns = parsedData.results[0].series[0].columns;
        let values = parsedData.results[0].series[0].values;
        // console.log("columns : ", columns);
        // console.log("values : ", values);

        let 상태 = [];

        values.filter((element, index) => {
          for (let i = 0; i < values.length; i++) {
            if (element[i] == "tot_status") {
              상태.push(element);
            }
          }
        });
        // console.log("상태 : ", 상태);

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
        // console.log("now_date : ", nowDate);
        // console.log("now_result : ", nowResult)
        // console.log("predict_high : ", predictHigh)
        // console.log("predict_low : ", predictLow)
        // console.log("sensor : ", sensor)
        // console.log("work_line : ", workLine)
        // console.log("status : ", status)

        // const content = document.getElementById("content");
        // const 현재값 = Number(nowResult.slice(-1)[0]);
        // const 상한값 = Number(predictHigh.slice(-1)[0]); // 끝 값
        // const 하한값 = Number(predictLow.slice(-1)[0]);

        // // status가 0이거나 1일때 즉, 가동중일때
        // if (상태[0][2] == 0 || 상태[0][2] == 1) {
        //   // 현재값이 상한값보다 큰경우 현재값이 맨위로 가도록
        //   if (현재값 > 상한값) {
        //     content.innerHTML = "";
        //     content.innerHTML = `
        //           <p class="now-result">현재 : <span id="nowResult"> - </span></p>
        //           <p class="predict-high">상한 : <span id="predictHigh"> - </span></p>
        //           <p class="predict-low">하한 : <span id="predictLow"> - </span></p>
        //         `;
        //     textBinding();
        //     changeColor();
        //   } else if (현재값 <= 상한값 && 현재값 >= 하한값) {
        //     // 현재값이 상한값과 하한값 사이일 때
        //     content.innerHTML = "";
        //     content.innerHTML = `
        //           <p class="predict-high">상한 : <span id="predictHigh"> - </span></p>
        //           <p class="now-result">현재 : <span id="nowResult"> - </span></p>
        //           <p class="predict-low">하한 : <span id="predictLow"> - </span></p>
        //         `;
        //     textBinding();
        //     changeColor();
        //   } else if (현재값 < 하한값) {
        //     // 현재값이 하한값보다 작을 때
        //     content.innerHTML = "";
        //     content.innerHTML = `
        //           <p class="predict-high">상한 : <span id="predictHigh"> - </span></p>
        //           <p class="predict-low">하한 : <span id="predictLow"> - </span></p>
        //           <p class="now-result">현재 : <span id="nowResult"> - </span></p>
        //         `;
        //     textBinding();
        //     changeColor();
        //   }
        // } else {
        //   // 비가동일때 텍스트 '-' 처리하기
        //   content.innerHTML = "";
        //   content.innerHTML = `
        //         <p class="predict-high" style="text-align: center;"><span id="predictHigh">-</span></p>
        //         <p class="now-result" style="text-align: center;"><span id="nowResult">-</span></p>
        //         <p class="predict-low" style="text-align: center;"><span id="predictLow">-</span></p>
        //       `;
        // }

        // // 현재값, 상한값, 하한값 데이터 바인딩하기
        // function textBinding() {
        //   const nowResultEl = document.getElementById("nowResult");
        //   const predictHighEl = document.getElementById("predictHigh");
        //   const predictLowEl = document.getElementById("predictLow");
        //   // nowResult(현재값)이 없으면 '-'표시 그렇지 않으면 현재값 표시
        //   if (nowResult.length == 0) nowResultEl.textContent = "-";
        //   else nowResultEl.textContent = 현재값.toFixed(2);

        //   // predictHigh(상한값)이 없으면..
        //   if (predictHigh.length == 0) predictHighEl.textContent = "-";
        //   else predictHighEl.textContent = 상한값.toFixed(2);

        //   // predictLow(하한값)이 없으면..
        //   if (predictLow.length == 0) predictLowEl.textContent = "-";
        //   else predictLowEl.textContent = 하한값.toFixed(2);
        // }

        // // 색상 바꾸기
        // function changeColor() {
        //   const nowResultEl = document.getElementById("nowResult");
        //   const predictHighEl = document.getElementById("predictHigh");
        //   const predictLowEl = document.getElementById("predictLow");

        //   if (현재값 > 상한값 || 현재값 < 하한값)
        //     nowResultEl.style.color = "red";
        //   else if (
        //     nowResult.length == 0 ||
        //     predictHigh.length == 0 ||
        //     predictLow.length == 0
        //   )
        //     nowResultEl.style.color = "#fff";
        //   else nowResultEl.style.color = "#2196f3";
        // }

        // 차트 그리기 함수
        drawChart(nowDate, nowResult, predictHigh, predictLow, sensor);
      });
  });

  // 차트 그리기함수
  function drawChart(nowDate, nowResult, predictHigh, predictLow, sensor) {
    let data = [];

    // 시작시간 => 08시부터
    // const today = new Date();
    const START = moment(nowDate, "YYYY-MM-DD").format("YYYY-MM-DD 08:00:00");
    // 종료시간 => 21시까지
    // const endTime = new Date(today);
    const END = moment(nowDate, "YYYY-MM-DD").format("YYYY-MM-DD 21:00:00");

    /** 상한과 하한안에 현재값이 들어간 것처럼 음영을 주기 위해서는,
     * fill과 fillcolor를 줘야함
     * 그리고 상한에만 fill과 fillcolor를 주고 하한에는 안주는 것이 포인트
     * 또, 트레이스의 순서도 중요하다. 현재 기준으로 순서는 하한/현재/상한으로 지정
     */
    // predictHigh(상한값)
    const trace1 = {
      x: nowDate,
      y: predictHigh,
      type: "scatter",
      mode: "lines+markers",
      name: "상한",
      line: { width: 1, color: "red" },
      marker: { color: "red", size: 1 },
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
      name: "하한",
      line: { width: 1 },
      marker: { color: "red", size: 1 },
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
      name: "현재",
      line: { color: "#2196f3", width: 1 },
      marker: { color: "#2196f3", size: 1 },
      // fill: "tonexty",
      // fillcolor: "rgba(24,29,41)"
    };

    data.push(trace1, trace2, trace3);

    // 레이아웃
    const layout = {
      title: false, // 차트의 제목
      // width: 507,     // 차트의 너비
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
      margin: { t: 10, b: 55, l: 50, r: 25, pad: 0 },
      showlegend: false,
      paper_bgcolor: "rgba(0,0,0,0)",
      plot_bgcolor: "rgba(0,0,0,0)",
      font: { family: "Noto Sans KR", size: 8, color: "#fff", weight: 700 },
    };

    Plotly.newPlot("myPlot", data, layout, { displayModeBar: false });
  }


  // setInterval(() => {
  //   getDataAndDrawChart();
  // }, 10000);

}


