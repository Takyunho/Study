import { GLTFLoader } from 'GLTFLoader';
import * as THREE from 'three';
import { CSS3DRenderer, CSS3DObject } from 'CSS3D';
import { OrbitControls } from "OrbitControls";
// import { TrackballControls } from "TrackballControls";

let camera, scene, renderer, renderer2;
let controls;
let light;
// let lightMovementAmplitude = 200;

init();
animate(performance.now());

function init() {
  //! scene(장면)
  scene = new THREE.Scene();  //* 장면 생성

  //! 카메라(camera)
  const fov = 45;
  const aspect = window.innerWidth / window.innerHeight;
  const near = 0.1;
  const far = 5000;
  //* 원근 카메라
  camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
  camera.position.set(0, 150, 120); //* 카메라 포지션 x, y, z

  

  //! light(조명)
  let ambientLight = new THREE.AmbientLight('white', 0.5);
  scene.add(ambientLight);

  light = new THREE.DirectionalLight('white', 2);
  light.castShadow = true;  // true로 설정하면 다이나믹한 그림자가 드리워짐 (비용이 많이들고, 그림자가 제대로 보이도록 조정해야하는 단점이 있다.)
  light.position.x = 150;
  light.position.z = 150;

  scene.add(light);

  //! 렌더러2 
  renderer2 = new CSS3DRenderer();  //^ import 해서 쓰는경우 THREE를 제거해야한다.
  renderer2.setSize(window.innerWidth, window.innerHeight);
  renderer2.domElement.style.position = "absolute";
  renderer2.domElement.style.top = 500;
  document.querySelector("#css").appendChild(renderer2.domElement);

  //! 렌더러
  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  // 필수
  renderer.setPixelRatio(window.devicePixelRatio);  //* 사이즈
  renderer.setSize(window.innerWidth, window.innerHeight);  //* 사이즈
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
  document.querySelector("#webgl").appendChild(renderer.domElement);  //* 필수

  //# 렌더러 설정시 html에 캔버스태그를 미리 작성하고, js에서 돔요소를 찾아와서 new THREE.WebGLRenderer 안에 객체로 지정해서 사용하는 것이 활용 범위가 넓음

  //^ 버튼
  let button = makeElementObject('div', 5, 5)
  console.log(button)
  button.css3dObject.element.style.border = 'none'
  button.css3dObject.element.style.borderRadius = '100%'
  button.css3dObject.element.style.cursor = 'pointer'
  button.css3dObject.element.style.transition = 'all .5s'
  button.position.x = 10;  //* x축
  button.position.y = -30;  //* y축
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
  
  //@ 버튼 이벤트리스너
  button.css3dObject.element.addEventListener('pointerdown', () => { 
    console.log("ddd")
    // 차트 넣어야 되는 부분
    // 화면의 오른쪽 상단에 띄우기 & 버튼 클릭시 그 요소의 옆에 모달창(레이어)처럼 띄우기
  })


  // let alarm = makeElementObject2('div', 5, 5)
  // console.log(alarm)
  // scene.add(alarm)

  //! controls
  controls = new OrbitControls(camera, renderer2.domElement);
  // console.log(controls)
  controls.enableDamping = true;
  controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
  controls.dampingFactor = 0.05;
  controls.screenSpacePanning = false;
  controls.minDistance = 100;
  controls.maxDistance = 500;
  controls.maxPolarAngle = Math.PI / 2; // 축을 기준으로 회전하도록(아래를 볼 수 없음)
  controls.addEventListener('change', render);


  //^ gltf 불러오기
  const gltfloader = new GLTFLoader();
  gltfloader.load(
    './models/Machine_AMR.glb',
    gltf => {
      // console.log("gltf : ", gltf)
      const mesh = gltf.scene.children[0]
      console.log(mesh)
      mesh.scale.x = 30;
      mesh.scale.y = 30;
      mesh.scale.z = 30;
      mesh.position.set(0, -40, 0)
      scene.add(mesh)
    }
  )


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
  console.log(material)
  let geometry = new THREE.BoxGeometry(width, height, 1); //* geometry 만들기 (박스지오메트리)
  let mesh = new THREE.Mesh(geometry, material);  //* geometry + material = MESH
  // console.log(mesh)
  mesh.castShadow = true; //* mesh 오브젝트에 castShadow 추가??? 무슨역할?
  mesh.receiveShadow = true;  //* ??
  obj.lightShadowMesh = mesh;
  obj.add(mesh);

  return obj;
} // makeElementObject 끝


// //^ textureLoad
// function makeElementObject2(type, width, height) {
//   const obj = new THREE.Object3D(); //! Object3D를 이용해 같이 이동되도록

//   //& 요소를 만들고 스타일을 지정하는 부분 
//   const element = document.createElement(type); //* 요소를 생성
//   element.style.width = width + "px"; //* 요소의 너비 지정 (파라미터로 전달받음)
//   element.style.height = height + "px"; //* 'div' 요소의 높이 지정 ( "" )
//   element.style.opacity = 1;  //* 투명도 지정

//   let css3dObject = new CSS3DObject(element); //* 위에서 설정한 요소를 인자로 넣어서 생성
//   obj.css3dObject = css3dObject;  //* obj의 css3dObject 속성에 위에서 만든 요소를 지정
//   obj.add(css3dObject);

//   // make an invisible plane for the DOM element to chop
//   // clip a WebGL geometry with it.
//   let material = new THREE.Sprite(
//     new THREE.SpriteMaterial({  //* material 만들기
//       // alphaMap: 0xfff,
//       // aoMapIntensity: 0,
//       map: new THREE.TextureLoader().load("./그림1.png"),
//       color: 0xffffff,
//       // blending: THREE.NoBlending, //* ???
//       side: THREE.DoubleSide, //* 더블사이드로 해야 마우스를 돌려도 양면이 다 보임
//     })
//   );
    
//   console.log(material)

//   // obj.lightShadowMesh = mesh;
//   obj.add(material);

//   return obj;
// } // makeElementObject 끝















// let cmd = 'http://183.111.79.76:8086/query?db=idbSensor&q=select time, fire, img_name from fireState where time <= now() and time >= now()-10m order by time desc limit 1'
// let image = '';

// function setLamp() {
//     fetch(cmd)
//     .then(response => response.json())
//     .then(parsedResponse => {
//         console.log(parsedResponse)
//         value = parsedResponse.results[0].series[0].values[0];
//         image = value[2];
//         console.log(image)
//         // document.getElementById("alarm").addEventListener('click',function(){
//         //     window.open("http://idb.ai:5000/get_image?fn="+image, "a", "width=800, height=500, left=100, top=50"); 
//         // })

//         setColor(value[1])
//     })
//     .catch( error => {
//         document.getElementById("alarm").style = "background-color: #A0A1A3"
//         document.getElementById("alarm").className = "noAnimate alarmDot"
//         document.getElementById("alarm").style.transition = "all .5s";
//         console.log(error)
//     });
// }

// setColor(1)
function setColor(){
    if (true) {
        document.getElementById("alarm").style = "background-color: #FF0000"
        document.getElementById("alarm").className = "animate alarmDot"
        document.getElementById("alarm").style.transition = "all .5s";
    } else {
        document.getElementById("alarm").style = "background-color: #00B34A"
        document.getElementById("alarm").className = "noAnimate alarmDot"
        document.getElementById("alarm").style.transition = "all .5s";
    }
}