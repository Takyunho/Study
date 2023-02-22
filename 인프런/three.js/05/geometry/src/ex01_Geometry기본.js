import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import dat from "dat.gui";

// ----- 주제: Geometry 기본
// Geometry는 필요할 때 찾아서 쓰는 방식으로 알아두자

export default function example() {
  // Renderer
  const canvas = document.querySelector("#three-canvas");
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);

  // Scene
  const scene = new THREE.Scene();

  // Camera
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 4;
  scene.add(camera);

  // Light
  const ambientLight = new THREE.AmbientLight("white", 0.5);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight("white", 1);
  directionalLight.position.x = 1;
  directionalLight.position.z = 2;
  scene.add(directionalLight);


  //=> Controls
  const controls = new OrbitControls(camera, renderer.domElement); // 인자에는 (카메라, 렌더러의 돔요소(캔버스))

  //=> Mesh
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshStandardMaterial({
    color: "hotpink",
    // wireframe: true,		// 뼈대만 남기기
    // Orbitcontrols을 이용해 메쉬 안을 들여다 보면 뒷면이 안보임(안쪽면이 검정으로 보임)
    // 그래서 side를 설정하면 됨
    side: THREE.DoubleSide,
  });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
	console.log(mesh)

  //=> dat.gui	//내가 해보려고 넣은거
  const gui = new dat.GUI();
  gui.add(mesh.geometry.parameters, "width", -10, 10, 0.01).name("메쉬 너비");	// 메쉬 너비 어떻게 지정하냐
  gui.add(mesh.geometry.parameters, "height", -10, 10, 0.01).name("메쉬 너비");


  // 그리기
  const clock = new THREE.Clock();

  function draw() {
    const delta = clock.getDelta();

    renderer.render(scene, camera);
    renderer.setAnimationLoop(draw);
  }

  function setSize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
  }

  // 이벤트
  window.addEventListener("resize", setSize);

  draw();
}
