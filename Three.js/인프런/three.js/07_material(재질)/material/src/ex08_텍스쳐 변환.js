import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// ----- 주제: 텍스쳐 변환

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
	const controls = new OrbitControls(camera, renderer.domElement);
	

	// 로딩 매니저를 이용하여 텍스쳐 이미지 로드하기
	const loadingManager = new THREE.LoadingManager();
		
	loadingManager.onStart = () => {
		console.log("로드 시작")
	}
	loadingManager.onProgress = (img) => {
		console.log("로드 : ", img)	
	}
	loadingManager.onLoad = () => {
		console.log("로드 완료")
	}
	loadingManager.onError = () => {
		console.log("로드 에러")
	}

	// textureLoader
	const textureLoader = new THREE.TextureLoader(loadingManager);
	const texture = textureLoader.load('./textures/Skull/Ground Skull_basecolor.jpg')

	//! 텍스쳐 변환
	//* 텍스쳐 이동시키기 = offset
	// texture.offset.x = 0.3	// offset : 위치를 이동한다고 보면 된다.
	// texture.offset.y = 0.3
	
	//* 텍스쳐 반복시키기 = repeat
	// texture.repeat.x = 2;	// 반복도 가능
	// texture.repeat.y = 2;

	//! 텍스쳐의 offset이나 repeat를 설정하는 경우에는 wrapS와 wrpaT의 RepeatWrapping 속성을 지정해줘야 함
	texture.wrapS = THREE.RepeatWrapping;	// x축 자연스럽게 보이게 하기
	texture.wrapT = THREE.RepeatWrapping;	// y축 자연스럽게 보이게 하기

	//* 텍스쳐만 회전시키기
	texture.rotation = Math.PI / 4;	// 45도
	texture.rotation = THREE.MathUtils.degToRad(40);
	texture.center.x = 0.5;	// 중심을 가운데로 잡아주는 역할
	texture.center.y = 0.5;	

	// Mesh
	const geometry = new THREE.BoxGeometry(2, 2, 1);
	// const material = new THREE.MeshPhongMaterial({
	const material = new THREE.MeshBasicMaterial({
		// color: 'orangered',
		shininess: 1000,
		side: THREE.DoubleSide,
		map: texture	// material에 texture를 넣을때 map 사용
	});
	const mesh = new THREE.Mesh(geometry, material);
	scene.add(mesh);



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
