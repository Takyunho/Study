//! 플로틀리차트 그리기 (삼보모터스)
export default function getDataAndDrawChart(plot, pcd, icd) {
  // const urlParams = new URLSearchParams(window.location.search);
  // let dt = urlParams.get('dt');
  // let pcd = urlParams.get('pcd');
  // let icd = urlParams.get('icd');

  const cmd = `http://61.82.106.151:5002/rest/Lv2_2?dt=2022-07-28&pcd=${pcd}&icd=${icd}`;

  let shpjpno = []; // 실적번호
  let now_start_dt = []; // 가동시작시간
  let now_end_dt = []; // 가동종료시간
  let now_result = []; // 생산 수량
  let pnr_start_dt = []; // 비가동 시작시간
  let pnr_end_dt = []; // 비가동 종료시간
  let norun_code = []; // 비가동 코드
  let norun_name = []; // 비가동 코드명
  let pnr_time = []; // 비가동 시간
  let pb_date = []; // 불량 시간
  let bad_code = []; // 불량 코드
  let bad_name = []; // 불량 코드명
  let bad_tot_qty = []; // 불량 수량

  jQuery.ajax({
    type: "GET",
    url: cmd,
    dataType: "JSON",
    contentType: "application/json",
    // async: true,
    timeout: 6000,
    success: function (parsedRes) {
      // console.log(parsedRes)
      // console.log(parsedRes.Lv2_2);
      const Lv2_2_Arr = parsedRes.Lv2_2;
      console.log(Lv2_2_Arr);

      const splitData = () => {
        Lv2_2_Arr.forEach((item, index) => {
          // console.log(item)
          // console.log(index)
          shpjpno[index] = item.shpjpno;
          now_start_dt[index] = item.now_start_dt;
          now_end_dt[index] = item.now_end_dt;
          now_result[index] = item.now_result;
          pnr_start_dt[index] = item.pnr_start_dt;
          pnr_end_dt[index] = item.pnr_end_dt;
          norun_code[index] = item.norun_code;
          norun_name[index] = item.norun_name;
          pnr_time[index] = item.pnr_time;
          pb_date[index] = item.pb_date;
          bad_code[index] = item.bad_code;
          bad_name[index] = item.bad_name;
          bad_tot_qty[index] = item.bad_tot_qty;
        });
      };
      splitData();
      drawAll();

      function drawAll() {
        let data = [];
        let operationObj = {}; // 가동
        let stopObj = {}; // 비가동
        let faultyObj = {}; // 불량
        let norun_codeObj = {}; // 비가동 코드
        let bad_codeObj = {}; // 불량 코드
        // let anno = [];

        // 가동시간 (index만 쓸거니까 shpjpno의 길이만큼 반복)
        shpjpno.forEach((item, index) => {
          operationObj[`operation${index}`] = {
            type: "scatter",
            mode: "lines",
            // name: `가동시간${index}`,
            hovertemplate: `가동시간${index}<extra></extra>`,
            x: [now_start_dt[index], now_end_dt[index]],
            y: [index, index],
            line: { color: "#003A8C", width: 10 },
          };
          // console.log(operationObj)
          data.push(operationObj[`operation${index}`]);
          // console.log(data)
        });

        // 비가동 시간
        shpjpno.forEach((item, index) => {
          stopObj[`stop${index}`] = {
            type: "scatter",
            mode: "lines",
            // name: `비가동시간${index}`,
            hovertemplate: `비가동시간${index}<extra></extra>`,
            x: [pnr_start_dt[index], pnr_end_dt[index]],
            y: [index, index],
            // line: {color: '#FFFF00', width:20, }
            line: { color: "#E8B516", width: 10 },
          };
          data.push(stopObj[`stop${index}`]);
        });

        // 비가동 시간 끝에다가 text 넣기
        shpjpno.forEach((item, index) => {
          norun_codeObj[`norun_code${index}`] = {
            type: "scatter",
            mode: "text",
            hovertemplate: `${norun_code[index]}<extra></extra>`,
            x: [pnr_end_dt[index], pnr_end_dt[index]],
            y: [index, index],
            // text: [`${norun_code[index]}`], textfont: { size: 17, color: '#3b4fff',  }
            text: [`${norun_code[index]}`],
            textfont: { size: 12, color: "#fff" },
          };
          data.push(norun_codeObj[`norun_code${index}`]);
        });

        // 불량
        shpjpno.forEach((item, index) => {
          faultyObj[`faulty${index}`] = {
            type: "scatter",
            mode: "text",
            // name: `불량${index}`,
            hovertemplate: `불량<extra></extra>`,
            x: [pb_date[index], pb_date[index]],
            y: [index, index],
            text: [`❌`],
            textfont: { size: 12 },
          };
          data.push(faultyObj[`faulty${index}`]);
        });

        // 불량 끝에다가 text 넣기
        shpjpno.forEach((item, index) => {
          bad_codeObj[`bad_code${index}`] = {
            type: "scatter",
            mode: "text",
            hovertemplate: `${bad_code[index]}<extra></extra>`,
            x: [pb_date[index], pb_date[index]],
            y: [index, index],
            text: [`${bad_code[index]}`],
            textfont: { size: 12, color: "#FF0000" },
            textposition: "left",
            // textposition: "right"
            // textposition: 'bottom center',
          };
          data.push(bad_codeObj[`bad_code${index}`]);
        });

        let layout = {
          title: false,
          width: 390,
          height: 145,
          // xaxis: { zeroline: false, ticks: "outside", tickcolor: 'rgba(0,0,0,0)', gridcolor: 'rgba(125, 127, 132, 0.3)' },
          xaxis: {
            zeroline: false,
            ticks: "outside",
            tickcolor: "rgba(0,0,0,0)",
            gridcolor: "rgba(255, 255, 255, 0.3)",
          },
          // yaxis: { zeroline: false, ticks: "outside", gridcolor: 'rgba(125, 127, 132, 0.3)', showticklabels: false, },
          yaxis: {
            zeroline: false,
            ticks: "outside",
            gridcolor: "rgba(255, 255, 255, 0.3)",
            showticklabels: false,
          },
          // margin: { t: 60, b: 70, l: 80, r: 30, pad: 20 },
          margin: { t: 30, b: 55, l: 35, r: 10, pad: 10 },
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

        // Plotly.newPlot('myPlot', data, layout);
        Plotly.newPlot(plot, data, layout);
      } // chartDraw 끝
    },
    error: function (error) {
      console.log("차트 통신실패");
    },
  });
}
// 삼보모터스 플로틀리차트 그리는 함수의 끝