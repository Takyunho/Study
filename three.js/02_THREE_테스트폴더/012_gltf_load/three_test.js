import * as THREE from "./three.module.js";
import { OrbitControls } from "./OrbitControls.js";
import { GLTFLoader } from "./GLTFLoader.js";
import { CSS3DRenderer, CSS3DObject } from "./CSS3DRenderer.js";
import { DRACOLoader } from "./DRACOLoader.js";

let scene, camera, renderer, renderer2;
let light, light2, ambientLight;
let controls;

init();
animate();

function init() {
  //! scene(장면)
  scene = new THREE.Scene(); //* 장면 생성
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

  light2 = new THREE.DirectionalLight("white", 3);
  light2.castShadow = true;
  light2.position.x = 18;
  light2.position.y = 5;
  scene.add(light2);

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
  renderer2.setSize(window.innerWidth, window.innerHeight);
  renderer2.domElement.style.position = "absolute";
  const css = document.querySelector("#css");
  css.appendChild(renderer2.domElement);

  //! 렌더러
  renderer = new THREE.WebGLRenderer({
    alpha: true, // 배경 투명하게 할 때 사용
    antialias: true,
  });
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
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
  let loader = new GLTFLoader();
  loader.setDRACOLoader(new DRACOLoader());

  loader.load(
    "./machine_008g.glb",
    // './models/machine_008g.gltf',
    function (gltf) {
      //? load의 파라미터는 ('url', 'onLoad함수', 'onProgress함수', 'onError함수' )

      const mesh = gltf.scene;

      mesh.scale.x = 50;
      mesh.scale.y = 50;
      mesh.scale.z = 50;
      mesh.position.set(0, 0, 0);

      scene.add(mesh);
    }
  );

  render();
  window.addEventListener("resize", onWindowResize);
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
  // console.log("렌더링")
}

function animate(time) {
  controls.update();
  render();
  requestAnimationFrame(animate);
  // renderer.setAnimationLoop(animate); // setAnimationLoop는 requestAnimationFrame과 똑같은 동작을 하는 three.js 내장 함수이다.
  // 그러나 중요한건 setAnimationLoop는 AR이나 VR 콘텐츠를 만들 때 사용된다. (공식문서에도 써있음)
}
