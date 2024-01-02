import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// ----- 주제: MeshNormalMaterial (법선에 관련된 material)

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
	// scene.background = new THREE.Color('#fff')

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

	/////////////////////////
	//! MeshNormalMaterial //
	/////////////////////////
	// textureLoader
	const textureLoader = new THREE.TextureLoader(loadingManager);
	const gradientTexture = textureLoader.load('./textures/gradient.png');	

	gradientTexture.magFilter = THREE.NearestFilter;

	// Mesh
	// const geometry = new THREE.ConeGeometry(1, /* 반지름 */ 2, /* 높이 */ 128 /* 세그먼트 */);
	const geometry = new THREE.BoxGeometry(1, 1, 1);
	const material = new THREE.MeshNormalMaterial({	//! MeshNormalMaterial(법선 방향에 따라 rgb 색상으로 보여줌)
	})
	const mesh = new THREE.Mesh(geometry, material);
	scene.add(mesh)

	



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
