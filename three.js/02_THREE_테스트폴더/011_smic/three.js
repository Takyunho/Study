import * as THREE from "./three.module.js";
import { OrbitControls } from "./OrbitControls.js";
import { GLTFLoader } from "./GLTFLoader.js";
import { CSS3DRenderer, CSS3DObject } from "./CSS3DRenderer.js";

import gaugeChartDraw from "./DaedongGaugebar.js";
import getDataAndDrawChart from "./samboChart.js";
import getDataAndDrawChart2 from "./genicosChart.js";

let scene, camera, renderer, renderer2;
let light, light2, ambientLight;
let controls;

init();
// animate(performance.now());
animate();

function init() {
  //! scene(장면)
  scene = new THREE.Scene(); //* 장면 생성
  // scene.background = new THREE.Color('#2e2861')
  scene.background = new THREE.Color("#343549");

  //! 카메라(camera)
  const fov = 45;
  const aspect = window.innerWidth / window.innerHeight;
  const near = 0.1;
  const far = 5000;
  //* 원근 카메라
  camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(900, 300, 900); //* 카메라 포지션 x, y, z
  scene.add(camera);

  //! light(조명)
  ambientLight = new THREE.AmbientLight("white", 0.5);
  scene.add(ambientLight);

  light = new THREE.DirectionalLight("white", 3);
  light.castShadow = true; // true로 설정하면 다이나믹한 그림자가 드리워짐 (비용이 많이들고, 그림자가 제대로 보이도록 조정해야하는 단점이 있다.)
  light.position.y = 300;
  light.position.z = -10;
  scene.add(light);
  // const lightHelper_d1 = new THREE.DirectionalLightHelper(light);
  // scene.add(lightHelper_d1)

  light2 = new THREE.DirectionalLight("white", 3);
  light2.castShadow = true;
  light2.position.x = 18;
  light2.position.y = 5;
  scene.add(light2);

  // const light3 = new THREE.PointLight('white', 10, 100, 2 );
  // light3.position.set( 0, 130, 0 );
  // scene.add( light3 );
  // const lightHelper = new THREE.PointLightHelper(light3);
  // scene.add(lightHelper)

  // SpotLight
  const light4 = new THREE.SpotLight("white", 5, 500, Math.PI / 4);
  light4.position.set(10, 400, 0);
  scene.add(light4);
  // const lightHelper = new THREE.SpotLightHelper(light4);
  // scene.add(lightHelper)

  // SpotLight2
  const light5 = new THREE.SpotLight("white", 5, 500, Math.PI / 4);
  light5.position.set(10, -400, 0);
  scene.add(light5);

  // SpotLight3
  const light6 = new THREE.SpotLight("white", 10, 500, Math.PI / 4);
  light6.position.set(10, 300, 400);
  scene.add(light6);

  const lightHelper = new THREE.SpotLightHelper(light6);
  // scene.add(lightHelper)

  //! 렌더러2
  renderer2 = new CSS3DRenderer();
  // renderer2.setSize(window.innerWidth, window.innerHeight);
  renderer2.setSize(window.innerWidth, window.innerHeight);
  renderer2.domElement.style.position = "absolute";
  // renderer2.domElement.style.top = 500;
  const css = document.querySelector("#css");
  css.appendChild(renderer2.domElement);

  //! 렌더러
  renderer = new THREE.WebGLRenderer({
    alpha: true, // 배경 투명하게 할 때 사용
    antialias: true,
  });
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
  // renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
  document.querySelector("#webgl").appendChild(renderer.domElement); //* 필수
  // 반투명하게 사용
  // renderer.setClearAlpha();

  //! OrbitControls
  control();
  function control() {
    controls = new OrbitControls(camera, renderer2.domElement);
    // console.log(controls)
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    // controls.enabled = true;  // false로 하면 orbitControls를 막을 수 있다!!! / default는 true
    controls.minDistance = 400; // 최소 확대
    controls.maxDistance = 1000; // 최대 확대
    // controls.maxPolarAngle = Math.PI / 2; // 축을 기준으로 회전하도록(아래를 볼 수 없음)
    controls.addEventListener("change", render);
  }

  //^ gltf 불러오기
  const gltfloader = new GLTFLoader();
  gltfloader.load(
    // './models/domino.glb',
    // './Machine_AMR.glb',  // T2V 올릴때 경로
    // './models/Machine_AMR.glb',
    "./models/machine_008g.glb",
    (gltf) => {
      // console.log("gltf : ", gltf)
      // console.log("gltf : ", gltf.scene)
      // const mesh = gltf.scene.children[0]
      const mesh = gltf.scene;
      console.log("gltf : ", mesh);

      // console.log(mesh.material)
      mesh.scale.x = 50;
      mesh.scale.y = 50;
      mesh.scale.z = 50;
      mesh.position.set(0, 0, 0);

      // // gltf파일을 티가 안나게 돌리는 부분
      // const animate2 = () => {
      //   const animation = requestAnimationFrame(animate2);
      //   // console.log(animation) // 콘솔창에 프레임이 출력된다.
      //   mesh.rotation.y -= 0.000000000000000000000000000000001;
      //   render()

      //   // 일정시간이 되면 gltf파일이 돌고있는걸 멈추는 부분
      //   if (animation >= 100 * 100) {
      //     cancelAnimationFrame(animation);
      //   }
      // }
      // animate2();

      scene.add(mesh);
      render(); // gltf 로드시 렌더링을 해줘야 함!
    }
  );

  // 참고
  // 1. button1.position.x ~ z를 다른 변수에 할당 가능
  // 2. raycaster를 이용해서 좌표를 구한 다음 그 좌표의 일정 위치를 더해서 그 곳에 창을 띄운다?

  //~ 버튼 만드는 부분
  //^ 버튼 1
  let button1 = makeElementObject("div", 6, 6);
  // console.log("버튼1 : ", button1)
  button1.css3dObject.element.style.cursor = "pointer";
  button1.position.x = 21; //* x축
  button1.position.y = 131; //* y축
  button1.position.z = 120; //* z축
  button1.rotation.y = 1.6;
  scene.add(button1);

  //@ 버튼1 이벤트리스너
  // 차트1 보이게 하기
  button1.css3dObject.element.addEventListener(
    "pointerdown",
    () => {
      console.log("버튼1 클릭");
      // controls.enabled = false;  // false로 하면 orbitControls를 막을 수 있다!!! / default는 true
      
      // 삼보차트
      // getDataAndDrawChart("myPlot1", 5110, "45773-4C000"); // 눌렀을 때 파라미터에 pcd, icd 전달
      // getDataAndDrawChart("myPlot2", 5110, "45940-2F200"); // 눌렀을 때 파라미터에 pcd, icd 전달
      // getDataAndDrawChart('myPlot4', 5110, '45773-4C000'); // 눌렀을 때 파라미터에 pcd, icd 전달

      // 제니코스 차트
      getDataAndDrawChart2("myPlot1", "MA05", "homo_rpm");
      getDataAndDrawChart2("myPlot2", "MA03", "water_rpm");
      // getDataAndDrawChart2("myPlot3", "MA05", "homo_rpm"); 

      // 게이지바 차트
      gaugeChartDraw('A40104')
      // gaugeChartDraw("A40204")
      // gaugeChartDraw("A40104")
      // gaugeChartDraw("A40204")
      // gaugeChartDraw("A40104")
      jQuery("#bg").show();
    },
    false
  );

  //^ 버튼 2
  //@TODO
  //@ 버튼2클릭시 차트 보여주고, 그 차트의 임계치에 따른 알람 구현 필요
  
  let button2 = makeElementObject("div", 6, 6);
  // console.log("버튼 2 : ", button2)
  button2.css3dObject.element.style.cursor = "pointer";
  button2.position.x = 9; //* x축
  button2.position.y = 105; //* y축
  button2.position.z = 26; //* z축
  button2.rotation.y = 0.6;
  scene.add(button2);

  //@ 버튼2 이벤트리스너
  button2.css3dObject.element.addEventListener(
    "pointerdown",
    () => {
      console.log("버튼2 클릭");
      getDataAndDrawChart2("myPlot1", "MA05", "water_rpm");
      getDataAndDrawChart2("myPlot2", "MA05", "water_temp");
      gaugeChartDraw('A40104')
      jQuery("#bg").show();
    },
    false
  );

  const closeBtn = document.getElementById("closeBtn");

  //^ 닫기 버튼 클릭시 차트 안보이게 하기
  closeBtn.addEventListener('click', () => {
    // document.getElementById('myPlot1').textContent = "";
    // document.getElementById('myPlot2').textContent = "";
    jQuery('#bg').hide();
  })

  //@ 상태에 따라 버튼(알람)색 변경
  if (false) {
    button1.css3dObject.element.className = "animate_red alarmDot";
    button1.css3dObject.element.style.background = new THREE.Color(
      "#FF0000"
    ).getStyle();
    button2.css3dObject.element.className = "animate_green alarmDot";
    button2.css3dObject.element.style.background = new THREE.Color(
      "#00B34A"
    ).getStyle();
  } else {
    button1.css3dObject.element.className = "animate_green alarmDot";
    button1.css3dObject.element.style.background = new THREE.Color(
      "#00B34A"
    ).getStyle();
    button2.css3dObject.element.className = "animate_red alarmDot";
    button2.css3dObject.element.style.background = new THREE.Color(
      "#FF0000"
    ).getStyle();
  }

  
  // 일정시간마다 랜덤한 값으로 텍스트 변경하기
  setInterval(() => {
    // 차트 옆 퍼센트부분 텍스트 랜덤으로 변경되도록
    document.querySelector('.C1_SP_AxisLoad').innerHTML = Math.floor((Math.random() * (100 - 50)) + 50); 
    document.querySelector('.C3_SP_AxisLoad').innerHTML = Math.floor((Math.random() * (100 - 50)) + 50);

    // 파트 인포메이션부분 텍스트 랜덤으로 변경되도록
    document.querySelector('.impeller').innerHTML = Math.floor((Math.random() * (100 - 50)) + 50);
    document.querySelector('.Orbiting').innerHTML = Math.floor((Math.random() * (300 - 10)) + 10);
    document.querySelector('.Total').innerHTML = Math.floor((Math.random() * (300 - 10)) + 10);
    document.querySelector('.PowerOn').innerHTML = Math.floor((Math.random() * (300 - 10)) + 10);

    // 게이지 차트 랜덤으로 변경되도록 
    const cssProgressBar1 = document.querySelector('.cssProgress-bar1').style.width = Math.floor((Math.random() * (99 - 10)) + 10) + '%';
    const cssProgressBar2 = document.querySelector('.cssProgress-bar2').style.width = Math.floor((Math.random() * (99 - 10)) + 10) + '%';
    const cssProgressBar3 = document.querySelector('.cssProgress-bar3').style.width = Math.floor((Math.random() * (99 - 10)) + 10) + '%';
    const cssProgressBar4 = document.querySelector('.cssProgress-bar4').style.width = Math.floor((Math.random() * (99 - 10)) + 10) + '%';
    const cssProgressBar5 = document.querySelector('.cssProgress-bar5').style.width = Math.floor((Math.random() * (99 - 10)) + 10) + '%';

    // 게이지 차트의 퍼센트 텍스트 랜덤으로 변경되도록
    document.querySelector('.X1_AxisLoad').innerHTML = cssProgressBar1.substring(0, 2);
    document.querySelector('.X2_AxisLoad').innerHTML = cssProgressBar2.substring(0, 2);
    document.querySelector('.Y1_AxisLoad').innerHTML = cssProgressBar3.substring(0, 2);
    document.querySelector('.Z1_AxisLoad').innerHTML = cssProgressBar4.substring(0, 2);
    document.querySelector('.Z2_AxisLoad').innerHTML = cssProgressBar5.substring(0, 2);
    
    // AxisPos
    document.querySelector('.X1_AxisPos').innerHTML = ((Math.random(2) * (500 - 200)) + 200).toFixed(2);
    document.querySelector('.Y1_AxisPos').innerHTML = ((Math.random() * (500 - 200)) + 200).toFixed(2);
    document.querySelector('.Z1_AxisPos').innerHTML = ((Math.random() * (500 - 200)) + 200).toFixed(2);
    document.querySelector('.X2_AxisPos').innerHTML = ((Math.random() * (500 - 200)) + 200).toFixed(2);
    document.querySelector('.Z2_AxisPos').innerHTML = ((Math.random() * (500 - 200)) + 200).toFixed(2);
    
  }, 5000);


  //~ 버튼 만들기 끝
  render();
  window.addEventListener("resize", onWindowResize);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  // renderer.setSize(window.innerWidth, window.innerHeight);
  // renderer2.setSize(window.innerWidth, window.innerHeight);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer2.setSize(window.innerWidth, window.innerHeight);
  render();
}

function render() {
  renderer.render(scene, camera);
  renderer2.render(scene, camera);
  // console.log("렌더링")
}

function animate(time) {
  controls.update();
  render();
  requestAnimationFrame(animate);
  // renderer.setAnimationLoop(animate); // setAnimationLoop는 requestAnimationFrame과 똑같은 동작을 하는 three.js 내장 함수이다.
  // 그러나 중요한건 setAnimationLoop는 AR이나 VR 콘텐츠를 만들 때 사용된다. (공식문서에도 써있음)
}

//^ 엘리먼트객체를 만드는 함수
function makeElementObject(type, width, height) {
  const obj = new THREE.Object3D(); //! Object3D를 이용해 같이 이동되도록

  //& 요소를 만들고 스타일을 지정하는 부분
  const element = document.createElement(type); //* 요소를 생성
  element.style.width = width + "px"; //* 요소의 너비 지정 (파라미터로 전달받음)
  element.style.height = height + "px"; //* 'div' 요소의 높이 지정 ( "" )
  element.style.opacity = 1; //* 투명도 지정

  let css3dObject = new CSS3DObject(element); //* 위에서 설정한 요소를 인자로 넣어서 생성
  obj.css3dObject = css3dObject; //* obj의 css3dObject 속성에 위에서 만든 요소를 지정
  obj.add(css3dObject);

  // make an invisible plane for the DOM element to chop
  // clip a WebGL geometry with it.
  let material = new THREE.MeshPhongMaterial({
    //* material 만들기
    // alphaMap: 0xfff,
    // aoMapIntensity: 0,
    opacity: 0,
    color: new THREE.Color(/*color*/ 0x000),
    blending: THREE.NoBlending, //* ???
    side: THREE.DoubleSide, //* 더블사이드로 해야 마우스를 돌려도 양면이 다 보임
  });
  let geometry = new THREE.BoxGeometry(width, height, 1); //* geometry 만들기 (박스지오메트리)
  let mesh = new THREE.Mesh(geometry, material); //* geometry + material = MESH
  // console.log(mesh)
  mesh.castShadow = true;
  mesh.receiveShadow = true; //* ??
  obj.lightShadowMesh = mesh;
  obj.add(mesh);

  return obj;
} // makeElementObject 끝


