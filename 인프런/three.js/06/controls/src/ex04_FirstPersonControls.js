import * as THREE from 'three';
import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls';

// ----- 주제: FirstPersonControls

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

	
	//^ Controls
	const controls = new FirstPersonControls(camera, renderer.domElement);
	//=> FirstPersonControls는 FlyControls의 대체 구현이므로 비슷하다.
	//- wasd로 이동할때의 속도 조절 
	controls.movementSpeed = 1;

	//- 마우스로 회전하지 못하도록 조절
	// controls.activeLook = false;
	
	//- 마우스의 회전 속도를 조절
	controls.lookSpeed = 0.1;

	//- 앞으로 자동으로 가도록 하기
	controls.autoForward = true;


	// Mesh
	const geometry = new THREE.BoxGeometry(1, 1, 1);
	let mesh;
	let material;
	
	for (let i = 0; i < 20; i++) {
		//=> material의 색상을 랜덤으로 뽑기
		material = new THREE.MeshStandardMaterial({
			color: `rgb(
				${ 50 + Math.floor(Math.random() * 205) },
				${ 50 + Math.floor(Math.random() * 205) },
				${ 50 + Math.floor(Math.random() * 205) }
			)`	// 내림(floor)해줘야 색이 적용됨
			// 너무 어두운경우를 위해 50 더해주고 곱할때 50을 뺀 205 곱해주기
		});
		
		mesh = new THREE.Mesh(geometry, material);
		mesh.position.x = (Math.random() - 0.5) * 5;	// -2.5 ~ 2.5
		mesh.position.y = (Math.random() - 0.5) * 5;
		mesh.position.z = (Math.random() - 0.5) * 5;
		scene.add(mesh)
	}
	
	
	// 그리기
	const clock = new THREE.Clock();

	function draw() {
		const delta = clock.getDelta();

		//^ FirstPersonControls도 FlyControls처럼 update의 인수에 delta를 넣어야 동작한다.
		controls.update(delta);

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
