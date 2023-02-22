import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import dat from "dat.gui";

// ----- 주제: Geometry 정점(Vertex) position 이용하기

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
  camera.position.z = 10;
  scene.add(camera);

  // Light
  const ambientLight = new THREE.AmbientLight("white", 0.5);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight("white", 1);
  directionalLight.position.x = 1;
  directionalLight.position.z = 2;
  scene.add(directionalLight);


  // Controls
  const controls = new OrbitControls(camera, renderer.domElement); // 인자에는 (카메라, 렌더러의 돔요소(캔버스))

  //=> Mesh
  //- vertex의 위치를 랜덤하게 해서 물결치는 형태를 구현 가능
  //- vertex의 위치를 일정간격으로 움직이게 해주면 된다.
  const geometry = new THREE.SphereGeometry(4, 64, 64);
  const material = new THREE.MeshStandardMaterial({
    color: 'orangered',
    side: THREE.DoubleSide,
    flatShading: true   //- 표면을 각지게하기
  })
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  //=> vertex의 위치에 접근하는 방법
  console.log(geometry)   //- geometry.attributes.position = vertex의 위치를 담고있는 배열
  //- 배열은 배열인데 Float32Array임() = 특정 형식만 넣을 수 있는 배열인데 속도가 빠르다.
  console.log(geometry.attributes.position.array) //- vertex의 위치를 담고있는 배열



  //=> dat.gui	//내가 해보려고 넣은거
  const gui = new dat.GUI();
  // gui.add(mesh.geometry.parameters, "width", -10, 10, 0.01).name("메쉬 너비");	// 메쉬 너비 어떻게 지정하냐
  // gui.add(mesh.geometry.parameters, "height", -10, 10, 0.01).name("메쉬 너비");


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
