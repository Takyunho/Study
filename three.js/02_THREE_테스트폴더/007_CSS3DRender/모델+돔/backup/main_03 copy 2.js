import { GLTFLoader } from 'GLTFLoader';
import * as THREE from 'three';
import { CSS3DRenderer, CSS3DObject } from 'CSS3D';
import { OrbitControls } from "OrbitControls";

let camera, scene, renderer, renderer2;
let controls;
let ambientLight, light;

init();
animate(performance.now());

function init() {
  //! scene(장면)
  scene = new THREE.Scene();  //* 장면 생성
  scene.background = new THREE.Color('#333')

  //! 카메라(camera)
  const fov = 45;
  const aspect = window.innerWidth / window.innerHeight;
  const near = 0.1;
  const far = 5000;
  //* 원근 카메라
  camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
  camera.position.set(1, 150, 900); //* 카메라 포지션 x, y, z
  scene.add(camera)

  //! light(조명)
  ambientLight = new THREE.AmbientLight('white', 0.8);
  light = new THREE.DirectionalLight('white', 1);
  light.castShadow = true;  // true로 설정하면 다이나믹한 그림자가 드리워짐 (비용이 많이들고, 그림자가 제대로 보이도록 조정해야하는 단점이 있다.)
  // light.position.x = 150;
  // light.position.z = 150;
  scene.add(ambientLight);
  scene.add(light);

  //! 렌더러2 
  renderer2 = new CSS3DRenderer();  //^ import 해서 쓰는경우 THREE를 제거해야한다.
  renderer2.setSize(window.innerWidth, window.innerHeight);
  renderer2.domElement.style.position = "absolute";
  renderer2.domElement.style.top = 500;
  document.querySelector("#css").appendChild(renderer2.domElement);

  //! 렌더러
  renderer = new THREE.WebGLRenderer({
    alpha: true,  // 배경 투명하게 할 때 사용
    antialias: true
  });
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1 );  
  renderer.setSize(window.innerWidth, window.innerHeight); 
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
  document.querySelector("#webgl").appendChild(renderer.domElement);  //* 필수
  // 반투명하게 사용
  renderer.setClearAlpha();

  //! controls
  controls = new OrbitControls(camera, renderer2.domElement);
  // console.log(controls)
  controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
  controls.dampingFactor = 0.05;
  controls.screenSpacePanning = false;
  // controls.minDistance = 100;
  // controls.maxDistance = 500;
  // controls.maxPolarAngle = Math.PI / 2; // 축을 기준으로 회전하도록(아래를 볼 수 없음)
  controls.addEventListener('change', render);

  //^ gltf 불러오기
  const gltfloader = new GLTFLoader();
  gltfloader.load(
    // './Machine_AMR.glb',
    './models/Machine_AMR.glb',
    gltf => {
      // console.log("gltf : ", gltf)
      console.log("gltf : ", gltf.scene)
      const mesh = gltf.scene.children[0]
      console.log('gltf : ', mesh)

      // console.log(mesh.material)
      mesh.scale.x = 30;
      mesh.scale.y = 30;
      mesh.scale.z = 30;
      mesh.position.set(0, -40, 0);
      // mesh.material.opacity = 0.5;
      // cube.material.color.set("#0000ff");
      // cube.material.transparent = true;
      // cube.material.depthWrite = false;
      // cube.material.side = THREE.FrontSide;

      scene.add(mesh)
    }
  )

  //~ 버튼 만드는 부분
  //^ 버튼 1
  let button = makeElementObject('div', 5, 5)
  console.log("버튼1 : ", button)
  button.css3dObject.element.style.border = 'none'
  button.css3dObject.element.style.borderRadius = '100%'
  button.css3dObject.element.style.cursor = 'pointer'
  button.css3dObject.element.style.transition = 'all .5s'
  button.position.x = 10;  //* x축
  button.position.y = -20;  //* y축
  button.position.z = 31;  //* z축

  //@ 상태에 따라 색 변경
  if (false) {
    button.css3dObject.element.className = "animate_red alarmDot"
    button.css3dObject.element.style.background = new THREE.Color("#FF0000").getStyle();
  } else {
    button.css3dObject.element.className = "animate_green alarmDot"
    button.css3dObject.element.style.background = new THREE.Color("#00B34A").getStyle();
  }
  scene.add(button)
  

  // 차트 div박스
  let chartBox = makeElementObject('div', 500, 240);

  //@ 버튼 이벤트리스너
  button.css3dObject.element.addEventListener('pointerdown', () => { 
    console.log("클릭111")
    chartBox.css3dObject.element.style.border = '1px'
    // chartBox.css3dObject.element.style.borderRadius = '20px'
    chartBox.css3dObject.element.style.transition = 'all .5s'
    chartBox.css3dObject.element.innerHTML =
    `<div id="plotly" class="container">
      <div id="myPlot" class="plotly-chart"></div>
    </div>`
    // console.log("엘리먼트스타일 : ", chartBox.css3dObject.element.style)
    chartBox.position.set(300, 0, 30)
    // chartBox.css3dObject.element.style.fontSize = 4;
    // chartBox.css3dObject.element.style.position = 'absolute';
    // chartBox.css3dObject.element.style.bottom = 0;
    // chartBox.css3dObject.element.style.right = 0;
    scene.add(chartBox)
    setTimeout(() => {
      getDataAndDrawChart();
    }, 300);

  }, false )
  

  chartBox.css3dObject.element.addEventListener('pointerdown', () => {
    chartBox.css3dObject.element.innerHTML = ""
    scene.remove(chartBox)
  })

  // pointerdown

  //^ 버튼 2
  let button_1 = makeElementObject('div', 5, 5);
  console.log("버튼 2 : ", button_1)
  button_1.css3dObject.element.style.border = 'none'
  button_1.css3dObject.element.style.borderRadius = '100%'
  button_1.css3dObject.element.style.cursor = 'pointer'
  button_1.css3dObject.element.style.transition = 'all .5s'
  button_1.position.x = 25;  //* x축
  button_1.position.y = -10;  //* y축
  button_1.position.z = 20;  //* z축
  button_1.rotation.y = 1.6;

  //@ 상태에 따라 색 변경
  if (false) {
    button_1.css3dObject.element.className = "animate_red alarmDot"
    button_1.css3dObject.element.style.background = new THREE.Color("#FF0000").getStyle();
  } else {
    button_1.css3dObject.element.className = "animate_green alarmDot"
    button_1.css3dObject.element.style.background = new THREE.Color("#00B34A").getStyle();
  }
  scene.add(button_1)
  
  //@ 버튼 이벤트리스너
  button_1.css3dObject.element.addEventListener('pointerdown', () => { 
    console.log("클릭222")

  })

  // //^ 버튼 3
  // let button_2 = makeElementObject('div', 5, 5);
  // // console.log(button_2)
  // button_2.css3dObject.element.style.border = 'none'
  // button_2.css3dObject.element.style.borderRadius = '100%'
  // button_2.css3dObject.element.style.cursor = 'pointer'
  // button_2.css3dObject.element.style.transition = 'all .5s'
  // button_2.position.x = -25;  //* x축
  // button_2.position.y = 0;  //* y축
  // button_2.position.z = 0;  //* z축
  // button_2.rotation.y = 1.6;

  // //@ 상태에 따라 색 변경
  // if (true) {
  //   button_2.css3dObject.element.className = "animate_red alarmDot"
  //   button_2.css3dObject.element.style.background = new THREE.Color("#FF0000").getStyle();
  // } else {
  //   button_2.css3dObject.element.className = "animate_green alarmDot"
  //   button_2.css3dObject.element.style.background = new THREE.Color("#00B34A").getStyle();
  // }
  // scene.add(button_2)
  
  // //@ 버튼 이벤트리스너
  // button_2.css3dObject.element.addEventListener('pointerdown', () => { 
  //   console.log("클릭333")

  // })


  // //^ 버튼 4
  // let button_3 = makeElementObject('div', 5, 5);
  // // console.log(button_3)
  // button_3.css3dObject.element.style.border = 'none'
  // button_3.css3dObject.element.style.borderRadius = '100%'
  // button_3.css3dObject.element.style.cursor = 'pointer'
  // button_3.css3dObject.element.style.transition = 'all .5s'
  // button_3.position.x = -5;  //* x축
  // button_3.position.y = -10;  //* y축
  // button_3.position.z = -30;  //* z축
  // // button_3.rotation.y = 1.6;

  // //@ 상태에 따라 색 변경
  // if (true) {
  //   button_3.css3dObject.element.className = "animate_red alarmDot"
  //   button_3.css3dObject.element.style.background = new THREE.Color("#FF0000").getStyle();
  // } else {
  //   button_3.css3dObject.element.className = "animate_green alarmDot"
  //   button_3.css3dObject.element.style.background = new THREE.Color("#00B34A").getStyle();
  // }
  // scene.add(button_3)
  
  // //@ 버튼 이벤트리스너
  // button_3.css3dObject.element.addEventListener('pointerdown', () => { 
  //   console.log("클릭444")

  // })

  //~ 버튼 만들기 끝
  render()
  window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer2.setSize(window.innerWidth, window.innerHeight);
  render();
}

function render() {
  renderer.render(scene, camera); 
  renderer2.render(scene, camera);
}

function animate(time) {
  requestAnimationFrame(animate);
  controls.update();
}



//^ 객체를 만드는 함수
function makeElementObject(type, width, height) {
  const obj = new THREE.Object3D(); //! Object3D를 이용해 같이 이동되도록

  //& 요소를 만들고 스타일을 지정하는 부분 
  const element = document.createElement(type); //* 요소를 생성
  element.style.width = width + "px"; //* 요소의 너비 지정 (파라미터로 전달받음)
  element.style.height = height + "px"; //* 'div' 요소의 높이 지정 ( "" )
  element.style.opacity = 1;  //* 투명도 지정

  let css3dObject = new CSS3DObject(element); //* 위에서 설정한 요소를 인자로 넣어서 생성
  obj.css3dObject = css3dObject;  //* obj의 css3dObject 속성에 위에서 만든 요소를 지정
  obj.add(css3dObject);

  // make an invisible plane for the DOM element to chop
  // clip a WebGL geometry with it.
  let material = new THREE.MeshPhongMaterial({  //* material 만들기
    // alphaMap: 0xfff,
    // aoMapIntensity: 0,
    opacity: 0,
    color: new THREE.Color(/*color*/ 0x000),
    blending: THREE.NoBlending, //* ???
    side: THREE.DoubleSide, //* 더블사이드로 해야 마우스를 돌려도 양면이 다 보임
  });
  let geometry = new THREE.BoxGeometry(width, height, 1); //* geometry 만들기 (박스지오메트리)
  let mesh = new THREE.Mesh(geometry, material);  //* geometry + material = MESH
  // console.log(mesh)
  mesh.castShadow = true; //* mesh 오브젝트에 castShadow 추가??? 무슨역할?
  mesh.receiveShadow = true;  //* ??
  obj.lightShadowMesh = mesh;
  obj.add(mesh);

  return obj;
} // makeElementObject 끝






//! 플로틀리차트 그리기


// const urlParams = new URLSearchParams(window.location.search);

// let dt = urlParams.get('dt');
// let pcd = urlParams.get('pcd');
// let icd = urlParams.get('icd');

// const cmd = `http://idb.ai:5002/rest/Lv2_2?dt=2022-08-05&pcd=5112&icd=411533`
// const cmd = `http://101.101.208.174:5002/rest/Lv2_2?dt=2022-07-28&pcd=5110&icd=${icd}`
const cmd = `http://61.82.106.151:5002/rest/Lv2_2?dt=2022-07-28&pcd=5110&icd=45773-4C000`

let shpjpno = [];         // 실적번호
let now_start_dt = [];    // 가동시작시간
let now_end_dt = [];      // 가동종료시간
let now_result = [];      // 생산 수량
let pnr_start_dt = [];    // 비가동 시작시간
let pnr_end_dt = [];      // 비가동 종료시간
let norun_code = [];      // 비가동 코드
let norun_name = [];      // 비가동 코드명
let pnr_time = [];        // 비가동 시간
let pb_date = [];         // 불량 시간
let bad_code = [];        // 불량 코드
let bad_name = [];        // 불량 코드명
let bad_tot_qty = [];     // 불량 수량

function getDataAndDrawChart() {
  $.ajax({
    type: "GET",
    url: cmd,
    dataType: "JSON",
    contentType: 'application/json',
    // async: false,
    timeout: 6000,
    success: function (parsedRes) {
      // console.log(parsedRes)
      // console.log(parsedRes.Lv2_2);
      const Lv2_2_Arr = parsedRes.Lv2_2;
      console.log(Lv2_2_Arr)

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
        })
      }
      splitData();
      drawAll();
    },
    error: function (error) {
      console.log('Lv2_3 통신실패');
    },
  })
}


function drawAll() {
  let data = [];
  let operationObj = {};    // 가동
  let stopObj = {};         // 비가동
  let faultyObj = {};       // 불량
  let norun_codeObj = {};   // 비가동 코드
  let bad_codeObj = {};     // 불량 코드
  // let anno = [];

  // 가동시간 (index만 쓸거니까 shpjpno의 길이만큼 반복)
  shpjpno.forEach((item, index) => {
    operationObj[`operation${index}`] = {
      type: 'scatter',
      mode: 'lines',
      // name: `가동시간${index}`,
      hovertemplate: `가동시간${index}<extra></extra>`,
      x: [now_start_dt[index], now_end_dt[index]],
      y: [index, index],
      line: { color: '#003A8C', width: 20 }
    }
    // console.log(operationObj)
    data.push(operationObj[`operation${index}`]);
    // console.log(data)
  })

  // 비가동 시간
  shpjpno.forEach((item, index) => {
    stopObj[`stop${index}`] = {
      type: 'scatter',
      mode: 'lines',
      // name: `비가동시간${index}`,
      hovertemplate: `비가동시간${index}<extra></extra>`,
      x: [pnr_start_dt[index], pnr_end_dt[index]],
      y: [index, index],
      // line: {color: '#FFFF00', width:20, }
      line: { color: '#E8B516', width: 20, }
    }
    data.push(stopObj[`stop${index}`]);
  })

  // 비가동 시간 끝에다가 text 넣기
  shpjpno.forEach((item, index) => {
    norun_codeObj[`norun_code${index}`] = {
      type: 'scatter',
      mode: 'text',
      hovertemplate: `${norun_code[index]}<extra></extra>`,
      x: [pnr_end_dt[index], pnr_end_dt[index]],
      y: [index, index],
      // text: [`${norun_code[index]}`], textfont: { size: 17, color: '#3b4fff',  }
      text: [`${norun_code[index]}`], textfont: { size: 16, color: '#fff', }
    }
    data.push(norun_codeObj[`norun_code${index}`]);
  })


  // 불량
  shpjpno.forEach((item, index) => {
    faultyObj[`faulty${index}`] = {
      type: 'scatter',
      mode: 'text',
      // name: `불량${index}`,
      hovertemplate: `불량<extra></extra>`,
      x: [pb_date[index], pb_date[index]],
      y: [index, index],
      text: [`❌`], textfont: { size: 15, },
    }
    data.push(faultyObj[`faulty${index}`]);
  })

  // 불량 끝에다가 text 넣기
  shpjpno.forEach((item, index) => {
    bad_codeObj[`bad_code${index}`] = {
      type: 'scatter',
      mode: 'text',
      hovertemplate: `${bad_code[index]}<extra></extra>`,
      x: [pb_date[index], pb_date[index]],
      y: [index, index],
      text: [`${bad_code[index]}`], textfont: { size: 16, color: '#FF0000', },
      textposition: 'left',
      // textposition: "right"
      // textposition: 'bottom center',

    }
    data.push(bad_codeObj[`bad_code${index}`]);
  })

  let layout = {
    title: false,
    height: 320,
    xaxis: { zeroline: false, ticks: "outside", tickcolor: 'rgba(0,0,0,0)', gridcolor: 'rgba(125, 127, 132, 0.3)' },
    yaxis: { zeroline: false, ticks: "outside", gridcolor: 'rgba(125, 127, 132, 0.3)', showticklabels: false, },
    // margin: { t: 60, b: 70, l: 80, r: 30, pad: 20 },
    margin: { t: 20, l: 40, r: 40, pad: 10 },
    showlegend: false,
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)',
    font: { family: 'Noto Sans KR', size: 20, color: '#fff', weight: 800 },
    // hovermode: 'x',
    // clickmode: "event"
    // annotations,
  };

  Plotly.newPlot('myPlot', data, layout);

} // chartDraw 끝





