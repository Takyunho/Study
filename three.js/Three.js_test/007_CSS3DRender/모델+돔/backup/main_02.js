import { GLTFLoader } from 'GLTFLoader';
import * as THREE from 'three';
import { CSS3DRenderer, CSS3DObject } from 'CSS3D';
import { OrbitControls } from "OrbitControls";
// import { PreventDragClick } from 'PreventDragClick';
// import { TrackballControls } from "TrackballControls";
import getDataAndDrawChart from './plotly.js';
import { Group } from 'three';


let camera, scene, renderer, renderer2;
let group;
let controls;
let light;
let ambientLight;
// let lightMovementAmplitude = 200;

init();
animate(performance.now());

function init() {
  //! scene(장면)
  scene = new THREE.Scene();  //* 장면 생성
  // group = new THREE.Group();
  // scene.add(group);

  //! 카메라(camera)
  const fov = 20;
  const aspect = window.innerWidth / window.innerHeight;
  const near = 0.1;
  const far = 5000;
  //* 원근 카메라
  camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
  camera.position.set(0, 100, 200); //* 카메라 포지션 x, y, z
  // scene.add(camera)
  

  //! light(조명)
  ambientLight = new THREE.AmbientLight('white', 0.7);
  light = new THREE.DirectionalLight('white', 0.8);
  light.castShadow = true;  // true로 설정하면 다이나믹한 그림자가 드리워짐 (비용이 많이들고, 그림자가 제대로 보이도록 조정해야하는 단점이 있다.)
  light.position.x = 150;
  light.position.z = 150;
  scene.add(ambientLight);
  scene.add(light);


  //! 렌더러2(CSS3DRenderer)
  renderer2 = new CSS3DRenderer();  //^ import 해서 쓰는경우 THREE를 제거해야한다.
  renderer2.setSize(window.innerWidth, window.innerHeight);
  renderer2.domElement.style.position = "absolute";
  renderer2.domElement.style.top = 0;
  document.querySelector("#css").appendChild(renderer2.domElement);

  //! 렌더러(WebGLRenderer)
  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);  //* 사이즈
  renderer.setSize(window.innerWidth, window.innerHeight);  //* 사이즈
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
  document.querySelector("#webgl").appendChild(renderer.domElement);  //* 필수

  //# 렌더러 설정시 html에 캔버스태그를 미리 작성하고, js에서 돔요소를 찾아와서 new THREE.WebGLRenderer 안에 객체로 지정해서 사용하는 것이 활용 범위가 넓음

  //^ 차트 나오는 div박스
  // let elementObj = makeElementObject("div", 850, 500);
  // console.log(elementObj)
  // console.log(elementObj.css3dObject.element)
  // elementObj.css3dObject.element.innerHTML =
  //   `
  //   <div id="plotly" class="container">
  //   <div id="myPlot" class="plotly-chart"></div>
  //   <div class="content-wrap">
  //     <div id="content" class="content">
  //       <p class="predict-high">상한 : <span id="predictHigh"> - </span></p>
  //       <p class="now-result">현재 : <span id="nowResult"> - </span></p>
  //       <p class="predict-low">하한 : <span id="predictLow"> - </span></p>
  //     </div>
  //   </div>
  //   </div>
  //   `;
  //   // elementObj.css3dObject.element.style.position = 'absolute'
  //   // elementObj.css3dObject.element.style.top = 0
  //   // elementObj.css3dObject.element.style.right = 0
  //   // elementObj.css3dObject.element
  // elementObj.position.z = -150
  // // elementObj.css3dObject.element.style = 'transparent'
  // // elementObj.css3dObject.element.setAttribute("contenteditable", ""); //* 지워도 같음
  // scene.add(elementObj)

  //^ 버튼
  let button = makeElementObject('div', 5, 5)
  console.log(button)
  button.css3dObject.element.style.border = 'none'
  button.css3dObject.element.style.borderRadius = '100%'
  button.css3dObject.element.style.cursor = 'pointer'
  button.css3dObject.element.style.transition = 'all .5s'
  // button.type = 'Group' // type을 바꾼다고해서 object3D가 Group이 되지는 않는다..
  button.position.x = 10;  //* x축
  button.position.y = -30;  //* y축
  button.position.z = 21;  //* z축

  //@ 상태에 따라 색 변경
  if (false) {
    button.css3dObject.element.className = "animate_red alarmDot"
    button.css3dObject.element.style.background = new THREE.Color("#FF0000").getStyle();
  } else {
    button.css3dObject.element.className = "animate_green alarmDot"
    button.css3dObject.element.style.background = new THREE.Color("#00B34A").getStyle();
  }
  scene.add(button)
  // group.add(button)
  
  //@ 버튼 이벤트리스너
  button.css3dObject.element.addEventListener('pointerdown', () => { 
    console.log("ddd")
    // console.log(preventDragClick.mouseMoved)
    getDataAndDrawChart();
    // 클릭한 부분의 좌표를 찾아서 클릭했을때 그 옆에다가 박스 생성
    // 그 박스의 
  })


  //& 두번째 버튼 만들기 => clone()사용시 element 속성이 존재하지 않는다????
  // let button2 = button.clone();
  // console.log(button2)
  // button2.position.x = 15;
  // button2.position.y = -20;
  // button2.position.z = 21;
  // scene.add(button2)
  // button2.css3dObject.element.addEventListener('pointerdown', () => {
  //   console.log("두번째 버튼 클릭!");

  // })
  


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
  // group.add(button)

  //^ gltf 불러오기
  const gltfloader = new GLTFLoader();
  gltfloader.load(
    './models/Machine_AMR.glb',
    gltf => {
      // console.log("gltf : ", gltf)
      const mesh = gltf.scene.children[0]
      // mesh.type = 'Object3D'
      console.log(mesh)
      mesh.scale.x = 30;
      mesh.scale.y = 30;
      mesh.scale.z = 30;
      mesh.position.set(0, -40, 0)
      // obj.add(mesh)
      scene.add(mesh)
      // group.add(mesh)

    }
  )
  
      
      
  


  // render();

  window.addEventListener( 'resize', onWindowResize );
}


function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
  render();
}

function animate(time) {
  requestAnimationFrame(animate);
  controls.update();
}

function render() {
  renderer.render(scene, camera); 
  renderer2.render(scene, camera);
}


//^ 객체를 만드는 함수
function makeElementObject(type, width, height) {
  const obj = new THREE.Object3D(); //! Object3D를 이용해 같이 이동되도록

  //& 요소를 만들고 스타일을 지정하는 부분 
  const element = document.createElement(type); //* 요소를 생성
  element.style.width = width + "px"; //* 요소의 너비 지정 (파라미터로 전달받음)
  element.style.height = height + "px"; //* 'div' 요소의 높이 지정 ( "" )
  element.style.opacity = 1;  //* 투명도 지정
  console.log(element)
  let css3dObject = new CSS3DObject(element); //* 위에서 설정한 요소를 인자로 넣어서 생성
  console.log(css3dObject);

  obj.css3dObject = css3dObject;  //* obj의 css3dObject 속성에 위에서 만든 요소를 지정
  obj.add(css3dObject);

  // 모양과 재질만들기
  
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





// function setColor(){
//     if (true) {
//         document.getElementById("alarm").style = "background-color: #FF0000"
//         document.getElementById("alarm").className = "animate alarmDot"
//         document.getElementById("alarm").style.transition = "all .5s";
//     } else {
//         document.getElementById("alarm").style = "background-color: #00B34A"
//         document.getElementById("alarm").className = "noAnimate alarmDot"
//         document.getElementById("alarm").style.transition = "all .5s";
//     }
// }