import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// ----- 주제: 여러가지 텍스쳐가 적용된 큐브

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

	//! 1. 여러개의 textureLoader
	const textureLoader = new THREE.TextureLoader(loadingManager);
	const rightTexture = textureLoader.load('./textures/mcstyle/right.png');
	const leftTexture = textureLoader.load('./textures/mcstyle/left.png');
	const topTexture = textureLoader.load('./textures/mcstyle/top.png');
	const bottomTexture = textureLoader.load('./textures/mcstyle/bottom.png');
	const frontTexture = textureLoader.load('./textures/mcstyle/front.png');
	const backTexture = textureLoader.load('./textures/mcstyle/back.png');

	//! 2. materials라는 배열에 여러개의 material을 담자
	const materials = [
		new THREE.MeshBasicMaterial({ map: rightTexture }),
		new THREE.MeshBasicMaterial({ map: leftTexture }),
		new THREE.MeshBasicMaterial({ map: topTexture }),
		new THREE.MeshBasicMaterial({ map: bottomTexture }),
		new THREE.MeshBasicMaterial({ map: frontTexture }),
		new THREE.MeshBasicMaterial({ map: backTexture })
	];
	//* 오른쪽, 왼쪽, 위, 아래, 앞, 뒤 순서로 지정해줘야 제대로 나옴 (순서도 중요하다)

	//! 2-1. 작은 사이즈의 픽셀을 살리는 속성 (뿌옇게 보이는 현상을 고쳐주는 속성이다.)
	rightTexture.magFilter = THREE.NearestFilter;
	leftTexture.magFilter = THREE.NearestFilter;
	topTexture.magFilter = THREE.NearestFilter;
	bottomTexture.magFilter = THREE.NearestFilter;
	frontTexture.magFilter = THREE.NearestFilter;
	backTexture.magFilter = THREE.NearestFilter;

	// Mesh
	const geometry = new THREE.BoxGeometry(1, 1, 1);
	const mesh = new THREE.Mesh(geometry, materials);	//! 3. material을 담은 배열인 materials를 mesh의 두번째 매개변수로 넣으면 됨!
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
