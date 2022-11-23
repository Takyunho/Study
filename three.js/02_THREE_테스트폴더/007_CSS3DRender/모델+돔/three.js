import * as THREE from './three.module.js';
import { OrbitControls } from './OrbitControls.js';
import { GLTFLoader } from './GLTFLoader.js';
import { CSS3DRenderer, CSS3DObject } from './CSS3DRenderer.js';

let scene, camera, renderer, renderer2;
let light, light2, ambientLight;
let controls;

init();
// animate(performance.now());
animate();

function init() {
  
  //! scene(장면)
  scene = new THREE.Scene();  //* 장면 생성
  scene.background = new THREE.Color('#0A1221')


  //! 카메라(camera)
  const fov = 45;
  const aspect = (window.innerWidth / 1.7) / window.innerHeight;
  const near = 0.1;
  const far = 5000;
  //* 원근 카메라
  camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
  camera.position.set(0, 0, 900); //* 카메라 포지션 x, y, z
  scene.add(camera)


  //! light(조명)
  ambientLight = new THREE.AmbientLight('white', 0.8);
  scene.add(ambientLight);

  light = new THREE.DirectionalLight('white', 1);
  light.castShadow = true;  // true로 설정하면 다이나믹한 그림자가 드리워짐 (비용이 많이들고, 그림자가 제대로 보이도록 조정해야하는 단점이 있다.)
  light.position.z = -10;
  scene.add(light);

  light2 = new THREE.DirectionalLight('white', 0.8);
  light2.castShadow = true;
  light2.position.x = 18;
  light2.position.y = 5;
  scene.add(light2)


  //! 렌더러2 
  renderer2 = new CSS3DRenderer();
  // renderer2.setSize(window.innerWidth, window.innerHeight);
  renderer2.setSize(window.innerWidth / 1.7, window.innerHeight);
  renderer2.domElement.style.position = "absolute";
  // renderer2.domElement.style.top = 500;
  const css = document.querySelector("#css");
  css.appendChild(renderer2.domElement);


  //! 렌더러
  renderer = new THREE.WebGLRenderer({
    alpha: true,  // 배경 투명하게 할 때 사용
    antialias: true
  });
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1 );  
  // renderer.setSize(window.innerWidth, window.innerHeight); 
  renderer.setSize(window.innerWidth / 1.7, window.innerHeight); 
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
  document.querySelector("#webgl").appendChild(renderer.domElement);  //* 필수
  // 반투명하게 사용
  // renderer.setClearAlpha();


  //! OrbitControls
  controls = new OrbitControls(camera, renderer2.domElement);
  // console.log(controls)
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.screenSpacePanning = false;
  // controls.minDistance = 100;  // 최소 확대
  // controls.maxDistance = 500;  // 최대 확대
  // controls.maxPolarAngle = Math.PI / 2; // 축을 기준으로 회전하도록(아래를 볼 수 없음)
  controls.addEventListener('change', render);

  //^ gltf 불러오기
  const gltfloader = new GLTFLoader();
  gltfloader.load(
    // './models/domino.glb',
    // './Machine_AMR.glb',  // T2V 올릴때 경로
    './models/Machine_AMR.glb',
    gltf => {
      // console.log("gltf : ", gltf)
      // console.log("gltf : ", gltf.scene)
      const mesh = gltf.scene.children[0]
      console.log('gltf : ', mesh)

      // console.log(mesh.material)
      mesh.scale.x = 100;
      mesh.scale.y = 100;
      mesh.scale.z = 100;
      mesh.position.set(0, -100, 0);

      // gltf파일을 티가 안나게 돌리는 부분
      const animate2 = () => {
        const animation = requestAnimationFrame(animate2);
        // console.log(animation) // 콘솔창에 프레임이 출력된다.
        mesh.rotation.y -= 0.000000000000000000000000000000001;
        render()

        // 일정시간이 되면 gltf파일이 돌고있는걸 멈추는 부분
        if (animation >= 100 * 100) {
          cancelAnimationFrame(animation);
        }
      }
      animate2();


      scene.add(mesh)
      render()  // gltf 로드시 렌더링을 해줘야 함!
    }
  )
    
  //~ 버튼 만드는 부분
  //^ 버튼 1
  let button1 = makeElementObject('div', 6, 6)
  // console.log("버튼1 : ", button1)
  button1.css3dObject.element.style.cursor = 'pointer'
  button1.position.x = 84.5;  //* x축
  button1.position.y = 21;  //* y축
  button1.position.z = 65;   //* z축
  button1.rotation.y = 1.6;
  scene.add(button1)
  
  //@ 버튼1 이벤트리스너
  // const content = document.getElementById("content");
  const chart = document.getElementById("chart");
  const closeBtn = document.getElementById('closeBtn');
  // 차트1 보이게 하기
  button1.css3dObject.element.addEventListener('pointerdown', () => { 
    console.log("클릭1")
    chart.classList.remove("none");
    getDataAndDrawChart(5110, '45773-4C000'); // 눌렀을 때 파라미터에 pcd, icd 전달
  }, false )
  

  //^ 버튼 2
  let button2 = makeElementObject('div', 6, 6);
  // console.log("버튼 2 : ", button2)
  button2.css3dObject.element.style.cursor = 'pointer'
  button2.position.x = 84.5;  //* x축
  button2.position.y = 21;  //* y축
  button2.position.z = 56.3;   //* z축
  button2.rotation.y = 1.6;
  scene.add(button2)

  //@ 버튼2 이벤트리스너
  // 차트2 보이게 하기
  button2.css3dObject.element.addEventListener('pointerdown', () => { 
    console.log("클릭2")
    chart.classList.remove("none");
    getDataAndDrawChart(5110, '45940-2F200'); // 눌렀을 때 파라미터에 pcd, icd 전달
  }, false )
  
  
  //@ 상태에 따라 버튼(알람)색 변경
  if (false) {
    button1.css3dObject.element.className = "animate_red alarmDot"
    button1.css3dObject.element.style.background = new THREE.Color("#FF0000").getStyle();
    button2.css3dObject.element.className = "animate_green alarmDot";
    button2.css3dObject.element.style.background = new THREE.Color("#00B34A").getStyle();
  } else {
    button1.css3dObject.element.className = "animate_green alarmDot"
    button1.css3dObject.element.style.background = new THREE.Color("#00B34A").getStyle();
    button2.css3dObject.element.className = "animate_red alarmDot";
    button2.css3dObject.element.style.background = new THREE.Color("#FF0000").getStyle();
  }

  //^ 닫기 버튼 클릭시 차트 안보이게 하기
  closeBtn.addEventListener('click', () => {
    document.getElementById('myPlot').textContent = "";
    chart.classList.add('none');
  })


  //~ 버튼 만들기 끝
  render()
  window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
  camera.aspect = (window.innerWidth / 1.7) / window.innerHeight;
  camera.updateProjectionMatrix();
  // renderer.setSize(window.innerWidth, window.innerHeight);
  // renderer2.setSize(window.innerWidth, window.innerHeight);
  renderer.setSize(window.innerWidth / 1.7, window.innerHeight);
  renderer2.setSize(window.innerWidth / 1.7, window.innerHeight);
  render();
}

function render() {
  renderer.render(scene, camera); 
  renderer2.render(scene, camera);
  // console.log("렌더링")
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
  mesh.castShadow = true;
  mesh.receiveShadow = true;  //* ??
  obj.lightShadowMesh = mesh;
  obj.add(mesh);

  return obj;
} // makeElementObject 끝






//! 플로틀리차트 그리기
// const cmd = `http://101.101.208.174:5002/rest/Lv2_2?dt=2022-07-28&pcd=5110&icd=${icd}`

function getDataAndDrawChart(pcd, icd) {
  // const urlParams = new URLSearchParams(window.location.search);
  // let dt = urlParams.get('dt');
  // let pcd = urlParams.get('pcd');
  // let icd = urlParams.get('icd');

  const cmd = `http://61.82.106.151:5002/rest/Lv2_2?dt=2022-07-28&pcd=${pcd}&icd=${icd}`

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

  jQuery.ajax({
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
            text: [`${norun_code[index]}`], textfont: { size: 16, color: '#333', }
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
          margin: { t: 20, l: 30, r: 10, pad: 10 },
          showlegend: false,
          paper_bgcolor: 'rgba(0,0,0,0)',
          plot_bgcolor: 'rgba(0,0,0,0)',
          font: { family: 'Noto Sans KR', size: 20, color: '#333', weight: 800 },
          // hovermode: 'x',
          // clickmode: "event"
          // annotations,
        };
      
        Plotly.newPlot('myPlot', data, layout);
      
      } // chartDraw 끝

    },
    error: function (error) {
      console.log('차트 통신실패');
    },
  })
}








