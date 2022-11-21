
import * as THREE from 'three';
import { GLTFLoader } from 'GLTFLoader';
import { CSS3DRenderer, CSS3DObject } from 'CSS3D';
import { OrbitControls } from "OrbitControls";
import { Group } from 'three';


let camera, scene, renderer, renderer2;
let group
let controls;
let ambientLight;
let light;

init();
animate(performance.now());

function init() {
  //! scene(장면)
  scene = new THREE.Scene();  //* 장면 생성
  group = new THREE.Group();
  scene.add(group)


  //! 카메라(camera)
  const fov = 4;
  const aspect = window.innerWidth / window.innerHeight;
  const near = 0.1;
  const far = 5000;
  //* 원근 카메라
  camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
  camera.position.set(0, 1, 2); //* 카메라 포지션 x, y, z
  scene.add(camera)
  

  //! light(조명)
  ambientLight = new THREE.AmbientLight('white', 0.7);
  light = new THREE.DirectionalLight('white', 0.8);
  light.castShadow = true;  // true로 설정하면 다이나믹한 그림자가 드리워짐 (비용이 많이들고, 그림자가 제대로 보이도록 조정해야하는 단점이 있다.)
  light.position.x = 150;
  light.position.z = 150;
  scene.add(ambientLight);
  scene.add(light);


  //! 렌더러
  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);  //* 사이즈
  renderer.setSize(window.innerWidth, window.innerHeight);  //* 사이즈
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
  document.querySelector("#webgl").appendChild(renderer.domElement);  //* 필수

  //# 렌더러 설정시 html에 캔버스태그를 미리 작성하고, js에서 돔요소를 찾아와서 new THREE.WebGLRenderer 안에 객체로 지정해서 사용하는 것이 활용 범위가 넓음


  //! controls
  controls = new OrbitControls(camera, renderer.domElement);
  // console.log(controls)
  controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
  controls.dampingFactor = 0.05;
  controls.screenSpacePanning = false;
  controls.minDistance = 100;
  // controls.maxDistance = 500;
  controls.maxPolarAngle = Math.PI / 2; // 축을 기준으로 회전하도록(아래를 볼 수 없음)
  controls.addEventListener('change', render);
  // group.add(button)

  
  // 여러개의 메쉬 그룹화하기
  const geometry1 = new THREE.BoxGeometry(1, 1, 1);
  const material1 = new THREE.MeshBasicMaterial({ color: 0xfff})
  const cube1 = new THREE.Mesh(geometry1, material1);

  const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({color:0x00ff00})
)

const cube3 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({color:0x0000ff})
)
  cube2.position.x = 2;
  cube3.position.x = 4;
  group.add(cube1)
  group.add(cube2)
  group.add(cube3)
  // scene에 add를 하는게 아니라 group에 add
  // group은 맨 위에서 scene에다가 add 해줬음
  

  render();

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
}

