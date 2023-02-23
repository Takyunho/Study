import * as THREE from 'three';
import { FlyControls } from 'three/examples/jsm/controls/FlyControls';

// ----- 주제: FlyControls

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
	const controls = new FlyControls(camera, renderer.domElement);
	//=> a-frame에서 wasd control 과 같음
	//=> wasd로 이동, qe로 각도 회전, rf로 위아래 수직 이동
	//=> flycontrols는 조금씩 마우스의 위치에 따라 회전
	//- 마우스 위치로 회전하는 속도 조절하기
	controls.rollSpeed = 0.5;	
	
	//- 드래그 시에만 마우스 위치로 회전되도록 하기
	controls.dragToLook = true;

	//- wasd로 이동할때의 속도 조절
	controls.movementSpeed = 3;		// default: 1


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

		//^ FlyControls는 update의 인수에 delta를 넣어야 동작한다.
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
