import * as THREE from 'three';
import { DragControls } from 'three/examples/jsm/controls/DragControls';

// ----- 주제: DragControls

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
	const meshes = [];	// DragControls를 위한 배열
	let mesh;
	let material;
	
	for (let i = 0; i < 20; i++) {
		// material의 색상을 랜덤으로 뽑기
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
		//^ mesh에 name 설정!!
		mesh.name = `box-${i}`;
		scene.add(mesh)
		meshes.push(mesh)
	}

	//^ Controls
	//=> DragControls는 들어가는 매개변수가 다른 컨트롤들과는 좀 다름
	const controls = new DragControls(meshes, camera, renderer.domElement);	// meshes가 만들어지고 난 후의 시점에서 controls를 설정해야 동작함
	
	//^ 드래그 하는애가 어떤 애인지 알 수 있는 방법
	controls.addEventListener('dragstart', e => {
		console.log(e);
		console.log(e.object.name);
	})



	// 그리기
	const clock = new THREE.Clock();

	function draw() {
		const delta = clock.getDelta();

		// controls.update(delta);

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
