import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// ----- 주제: 텍스쳐 이미지 로드하기

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
	

	//! 텍스쳐 이미지 로드하기
	const textureLoader = new THREE.TextureLoader();
	const texture = textureLoader.load(
		'./textures/bricks/floor_bricks_02_disp_4k.png',
		() => {
			console.log('로드 완료');
		},
		() => {
			console.log('로드중');
		},
		() => {
			console.log('로드 에러');
		}
	
	);
	console.log(texture)	//! 이 텍스쳐(이미지)를 material의 map 속성에 넣어주면 됨



	// Mesh
	const geometry = new THREE.BoxGeometry(2, 1.5, 1);
	// const material = new THREE.MeshPhongMaterial({
	const material = new THREE.MeshBasicMaterial({	//! texture를 따로 넣어줘도 원래 material의 속성을 따라간다.
		// color: 'orangered',
		shininess: 1000,
		side: THREE.DoubleSide,
		map: texture	//! material에 texture를 넣을때 map 사용
	});
	const mesh = new THREE.Mesh(geometry, material);
	scene.add(mesh);

	//* 3d model 텍스쳐 전용 이미지가 따로 있다.


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
