import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// ----- 주제: Side

export default function example() {
	// Renderer
	const canvas = document.querySelector('#three-canvas');
	const renderer = new THREE.WebGLRenderer({
		canvas,
		antialias: true
	});
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);

	// Scene
	const scene = new THREE.Scene();
	scene.background = new THREE.Color('#fff')

	// Camera
	const camera = new THREE.PerspectiveCamera(
		75,
		window.innerWidth / window.innerHeight,
		0.1,
		1000
	);
	camera.position.y = 1.5;
	camera.position.z = 4;
	scene.add(camera);

	// Light
	const ambientLight = new THREE.AmbientLight('white', 0.5);
	scene.add(ambientLight);

	const directionalLight = new THREE.DirectionalLight('white', 1);
	directionalLight.position.x = 1;
	directionalLight.position.y = 1;
	directionalLight.position.z = 2;
	scene.add(directionalLight);

	// Controls
	const controls = new OrbitControls(camera, renderer.domElement);	// 자동으로 카메라가 look at으로 mesh를 바라보게 됨
	


	// Mesh
	//! 3D Object는
	//* Vertex(점)
	//* Edge(선)
	//* Face(면) 으로 구성된다.

	const geometry = new THREE.BoxGeometry(2, 1.5, 1);
	const material = new THREE.MeshPhongMaterial({
		color: 'orangered',
		shininess: 1000,
		// side: THREE.FrontSide,	// 앞면만 보이기 (default)
		// side: THREE.BackSide,	// 뒷면만 보이기
		side: THREE.DoubleSide
	});
	const mesh = new THREE.Mesh(geometry, material);
	scene.add(mesh);
	//! 면의 앞뒷면을 보이게 할지 안보이게 할지 설정 가능
	// 

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
	window.addEventListener('resize', setSize);

	draw();
}
