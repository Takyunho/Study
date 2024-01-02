import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// ----- 주제: MeshLambertMaterial, MeshPhongMaterial

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
	directionalLight.position.z = 2;
	scene.add(directionalLight);

	// Controls
	const controls = new OrbitControls(camera, renderer.domElement);	// 자동으로 카메라가 look at으로 mesh를 바라보게 됨
	


	// Mesh
	//! MeshBasicMaterial 외에는 조명이 필요하다. => 조명이 없는 경우에는 검은색으로 보인다.
	const geometry = new THREE.SphereGeometry(1, 16, 16);
	//! MeshLambertMaterial은 하이라이트(하얀 밝은부분), 반사광이 없는 재질.
	const material_1 = new THREE.MeshLambertMaterial({
		color: 'seagreen'
	});
	//! MeshPhongMaterial은 하이라이트, 반사광이 있는 재질.
	const material_2 = new THREE.MeshPhongMaterial({
		color: 'orange',
		shininess: 1000		//! 반짝거리는 정도를 조절 가능
	});
	const mesh_1 = new THREE.Mesh(geometry, material_1);
	const mesh_2 = new THREE.Mesh(geometry, material_2);
	mesh_1.position.x = -1.5;
	mesh_2.position.x = 1.5;
	scene.add(mesh_1, mesh_2);



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
