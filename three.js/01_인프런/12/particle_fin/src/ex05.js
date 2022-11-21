import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// ----- 주제: Point 좌표에 Mesh 생성하기

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

	// Controls
	const controls = new OrbitControls(camera, renderer.domElement);
	controls.enableDamping = true;
	
	//^ 2. Mesh(포지션에 조립할 메쉬 생성하기)
	const planeMesh = new THREE.Mesh(
		// 지오메트리 생성하고, 메테리얼 생성
		new THREE.PlaneGeometry(0.3, 0.3),
		new THREE.MeshBasicMaterial({
			color: 'red',
			side: THREE.DoubleSide	// 더블사이드로하면 플레인 지오메트리의 양면이 다 보임
		})
	);

	console.log(planeMesh)

	planeMesh.position.x = 0.1;
	planeMesh.position.y = 0.1;
	planeMesh.position.z = 0.1;

	scene.add(planeMesh)
	// 좌표를 gltf와 같은 포지션으로 맞춘다면? 붙지않을까?

	// 테스트
	// const root = new THREE.Object3D();
	// console.log("root", root)

	// root.position.x = 1;

	// const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
	// root.add(body);
	// body.position.y = bodyHeight / 2;

	// const head = new THREE.Mesh(headGeometry, bodyMaterial);
	// root.add(head);
	// head.position.y = bodyHeight + headRadius * 1.1;

	// const label = new THREE.Mesh(labelGeometry, labelMaterial);
	// root.add(label);
	// label.position.y = bodyHeight * 4 / 5;
	// label.position.z = bodyRadiusTop * 1.01;


	//^ 1. Points
	const sphereGeometry = new THREE.SphereGeometry(1, 8, 8);
	console.log(sphereGeometry)
	const positionArray = sphereGeometry.attributes.position.array;
	console.log("포지션어레이 :", positionArray)

	//@ 3. 여러개의 Plane Mesh 생성
	// let plane;

	// // 3개당 좌표 하나임 (x, y, z)
	// // plainMesh 하나를 배치시킬때 포지션 어레이의 값 3개를 사용하게 됨
	// for (let i = 0; i < positionArray.length; i += 3) {
	// 	plane = planeMesh.clone();
	// 	console.log(plane)
	// 	plane.position.x = positionArray[i];
	// 	plane.position.y = positionArray[i + 1];
	// 	plane.position.z = positionArray[i + 2];

	// 	plane.lookAt(0, 0, 0);	// 메쉬를 자연스럽게

	// 	scene.add(plane);
	// }

	// 그리기
	const clock = new THREE.Clock();

	function draw() {
		const delta = clock.getDelta();

		controls.update();

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
