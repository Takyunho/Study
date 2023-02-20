import { GLTFLoader } from 'GLTFLoader';
import * as THREE from 'three';
import { CSS3DRenderer, CSS3DObject } from 'CSS3D';
import { OrbitControls } from "OrbitControls";


let camera, scene, renderer, renderer2;
let controls;
let ambientLight, light;


example();
animate();

function example() {
  
  //^ 장면 만들기
  scene = new THREE.Scene();
  // const scene2 = new THREE.Scene();
  
  //^ 카메라
  camera = new THREE.PerspectiveCamera(
    45, // 시야각(field of view)
    window.innerWidth / window.innerHeight, // 종횡비(aspect)
    0.1,  // near
    5000  // far
  )
  camera.position.set(0, 150, 120)
  scene.add(camera)

  //^ 조명
  ambientLight = new THREE.AmbientLight('white', 0.7);
  scene.add(ambientLight);

  light = new THREE.DirectionalLight('white', 0.8);
  light.castShadow = true;  // true로 설정하면 다이나믹한 그림자가 드리워짐 (비용이 많이들고, 그림자가 제대로 보이도록 조정해야하는 단점이 있다.)
  light.position.x = 150;
  light.position.z = 150;
  scene.add(light);


  //! CSS3DRenderer를 사용하는 경우 CSS3DRenderer가 html 태그에서 먼저 작성되어야 함 
  //^ 렌더러2 (CSS3DRenderer)
  renderer2 = new CSS3DRenderer();
  renderer2.setSize(window.innerWidth / 1.7, window.innerHeight / 1.5);
  renderer2.domElement.style.position = "absolute";
  renderer2.domElement.style.top = 0;
  // renderer2.domElement.style.background = new THREE.Color("#fff").getStyle()
  document.getElementById('css3D').appendChild(renderer2.domElement);

  //^ WebGL렌더러
  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
  //# 화면 가득 채울때 사용
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth / 1.7, window.innerHeight / 1.5);
  // renderer.setSize(500, 400);
  // renderer.domElement.style.background = new THREE.Color("#000").getStyle()
  renderer.shadowMap.enabled = true;
  document.querySelector("#three-canvas").appendChild(renderer.domElement);
  

  //^ 버튼
  let button = makeElementObject('div', 5, 5)
  console.log(button)
  button.css3dObject.element.style.border = 'none'
  button.css3dObject.element.style.borderRadius = '50%'
  button.css3dObject.element.style.cursor = 'pointer'
  button.css3dObject.element.style.transition = 'all .5s'
  button.position.x = 0;  //* x축
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
    // console.log(preventDragClick.mouseMoved)
    // 차트 넣어야 되는 부분
    // 화면의 오른쪽 상단에 띄우기 & 버튼 클릭시 그 요소의 옆에 모달창(레이어)처럼 띄우기
  })

  
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



  render();
	// 이벤트
	window.addEventListener('resize', setSize);

}

function setSize() {
  // 카메라
  camera.aspect = window.innerWidth / window.innerHeight;
  // updateProjectionMatrix 카메라 투영에 관련된 값에 변화가 있을 경우 실행해야 함
  camera.updateProjectionMatrix();
  // renderer.setSize(window.innerWidth / 1.7, window.innerHeight);
  renderer.setSize(window.innerWidth / 1.7, window.innerHeight / 1.5);
  // renderer2.setSize(window.innerWidth / 1.7, window.innerHeight / 1.5);
  render();

}

  function animate(time) {
    requestAnimationFrame(animate);
    controls.update();
  }


  
  // 렌더링
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
  // console.log(element)
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
  // console.log(material)
  let geometry = new THREE.BoxGeometry(width, height, 1); //* geometry 만들기 (박스지오메트리)
  let mesh = new THREE.Mesh(geometry, material);  //* geometry + material = MESH
  // console.log(mesh)
  mesh.castShadow = true; //* mesh 오브젝트에 castShadow 추가??? 무슨역할?
  mesh.receiveShadow = true;  //* ??
  obj.lightShadowMesh = mesh;
  obj.add(mesh);

  return obj;
} // makeElementObject 끝