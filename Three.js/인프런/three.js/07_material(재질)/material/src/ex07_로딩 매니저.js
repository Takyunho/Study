import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// ----- 주제: 로딩 매니저(여러개의 텍스쳐 이미지 로드하기)

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
	

	//! 로딩 매니저를 이용하여 텍스쳐 이미지 로드하기
	const loadingManager = new THREE.LoadingManager();
		
	//! 로딩이 시작될 때의 이벤트 핸들러
	loadingManager.onStart = () => {
		console.log("로드 시작")
	}
	//! 이미지를 여러개 로드할 때 로드 될 때마다 발생되는 이벤트
	loadingManager.onProgress = (img) => {	// 이미지가 여러개인 경우, 이미지가 로드 될 때마다 무슨 표시를 한다던지 등 그럴 때 사용
		console.log("로드 : ", img)	
	}
	//! 로드가 완료되고 나서 발생되는 이벤트 핸들러
	loadingManager.onLoad = () => {
		console.log("로드 완료")
	}
	//! 로드시 에러가 발생하면 발생되는 이벤트 핸들러
	loadingManager.onError = () => {
		console.log("로드 에러")
	}


	const textureLoader = new THREE.TextureLoader(loadingManager);
	const diff_texture = textureLoader.load('./textures/bricks/floor_bricks_02_diff_4k.jpg',);
	const rough_texture = textureLoader.load('./textures/bricks/floor_bricks_02_rough_4k.jpg');
	const disp_texture = textureLoader.load('./textures/bricks/floor_bricks_02_disp_4k.png');
	// 로딩 매니저를 만들고,
	// 만든 로딩 매니저를 텍스쳐로더를 생성할 때 인자에 넣고
	// 여러개의 이미지를 로드


	// Mesh
	const geometry = new THREE.BoxGeometry(2, 1.5, 1);
	// const material = new THREE.MeshPhongMaterial({
	const material = new THREE.MeshBasicMaterial({	//! texture를 따로 넣어줘도 원래 material의 속성을 따라간다.
		// color: 'orangered',
		shininess: 1000,
		side: THREE.DoubleSide,
		map: diff_texture	//! material에 texture를 넣을때 map 사용
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
