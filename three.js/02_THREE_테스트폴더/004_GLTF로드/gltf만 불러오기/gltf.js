import { GLTFLoader } from 'GLTFLoader';
import * as THREE from 'three';
import { CSS3DRenderer, CSS3DObject } from 'CSS3D';
import { OrbitControls } from "OrbitControls";
import { Group } from 'three';


let camera, scene, renderer, renderer2;
let group;
let controls;
let light;
let ambientLight;

init();
animate(performance.now());

function init() {
  //! scene(장면)
  scene = new THREE.Scene();  //* 장면 생성
  group = new THREE.Group();
  scene.add(group);

  //! 카메라(camera)
  const fov = 20;
  const aspect = window.innerWidth / window.innerHeight;
  const near = 0.1;
  const far = 5000;
  //* 원근 카메라
  camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
  camera.position.set(0, 100, 200); //* 카메라 포지션 x, y, z
  scene.add(camera)
  
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

  //! controls
  controls = new OrbitControls(camera, renderer2.domElement);
  // console.log(controls)
  controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
  controls.dampingFactor = 0.05;
  controls.screenSpacePanning = false;
  controls.minDistance = 100;
  // controls.maxDistance = 500;
  controls.maxPolarAngle = Math.PI / 2; // 축을 기준으로 회전하도록(아래를 볼 수 없음)
  controls.addEventListener('change', render);

  //^ gltf 불러오기
  const gltfloader = new GLTFLoader();
  gltfloader.load(
    './models/Machine_AMR.glb',
    gltf => {
      console.log("gltf : ", gltf)
      const mesh = gltf.scene.children[0]
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
  renderer2.render(scene, camera);
}

