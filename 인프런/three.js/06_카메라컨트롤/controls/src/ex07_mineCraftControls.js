import * as THREE from 'three';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls';
//=> class로 만든 KeyController 파일 가져오기
import { KeyController } from './KeyController.js';

// ----- 주제: PointerLockControls에 키보드 컨트롤 추가
// PointerLockControls에 이동기능을 추가한 것(VR or 마인크래프트!!!!!)

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


	// Mesh
	const geometry = new THREE.BoxGeometry(1, 1, 1);
	let mesh;
	let material;
	
	for (let i = 0; i < 20; i++) {
		material = new THREE.MeshStandardMaterial({
			color: `rgb(
				${ 50 + Math.floor(Math.random() * 205) },
				${ 50 + Math.floor(Math.random() * 205) },
				${ 50 + Math.floor(Math.random() * 205) }
			)`	
		});
		
		mesh = new THREE.Mesh(geometry, material);
		mesh.position.x = (Math.random() - 0.5) * 5;	// -2.5 ~ 2.5
		mesh.position.y = (Math.random() - 0.5) * 5;
		mesh.position.z = (Math.random() - 0.5) * 5;
		mesh.name = `box-${i}`;
		scene.add(mesh)
	}

	//^ Controls
	const controls = new PointerLockControls(camera, renderer.domElement);
	
	controls.domElement.addEventListener('click', () => {
		controls.lock();
	})


	//^ 키보드 컨트롤
	const KeyControl = new KeyController();
	console.log(KeyControl)

	function walk() {
		// console.log("walk !")
		//=> 앞뒤
		if ( KeyControl.keys['KeyW'] || KeyControl.keys['ArrowUp'] ) {
			controls.moveForward(0.01);		// 앞으로 가기
		}
		if (KeyControl.keys['KeyS'] || KeyControl.keys['ArrowDown'] ) {
			controls.moveForward(-0.01);	// 뒤로가기 메소드가 없으므로, -를 붙여서 뒤로 가도록 함
		}
		//=> 좌우
		if (KeyControl.keys['KeyA'] || KeyControl.keys['ArrowLeft'] ) {
			controls.moveRight(-0.01);
		}
		if (KeyControl.keys['KeyD'] || KeyControl.keys['ArrowRight'] ) {
			controls.moveRight(0.01);
		}
	}


	// 그리기
	const clock = new THREE.Clock();

	function draw() {
		const delta = clock.getDelta();

		// controls.update(delta);
		walk();		//^ walk함수 계속 실행되도록 하기

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
