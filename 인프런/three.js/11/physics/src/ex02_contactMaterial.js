import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as CANNON from 'cannon-es';

// ----- 주제: Contact Material	
// 각 재질마다 반발력과 마찰이 있기 때문에 cannon.js에서 조절할 수 있다.

export default function example() {

	// Renderer
	const canvas = document.querySelector('#three-canvas');
	const renderer = new THREE.WebGLRenderer({
		canvas,
		antialias: true
	});
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
	renderer.shadowMap.enabled = true;	// 그림자 설정하기
	renderer.shadowMap.type = THREE.PCFSoftShadowMap;	// 그림자 부드럽게


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
	directionalLight.castShadow = true;	// 그림자 설정하기
	scene.add(directionalLight);


	// Controls
	const controls = new OrbitControls(camera, renderer.domElement);


	//=> Cannon (물리 엔진)
	const cannonWorld = new CANNON.World();

	cannonWorld.gravity.set(0, -10, 0);


	//=> Contact Material : 여러개의 material을 만들고 어떤 material끼리 부딪힐지 설정해주는 역할
	const defaultMaterial = new CANNON.Material('defalut');
	const rubberMaterial = new CANNON.Material('rubber');
	const ironMaterial = new CANNON.Material('iron');

	//- 1. defaultMaterial과 defaultMaterial이 부딪힐 때의 마찰력과 반발력 적용하기
	const defaultContactMaterial = new CANNON.ContactMaterial(
		defaultMaterial,
		defaultMaterial,
		{
			friction: 0.5,	// 마찰력
			restitution: 0.3,	// 반발력
		}
	);
	cannonWorld.defaultContactMaterial = defaultContactMaterial;

	//- 2. rubberMaterial과 defaultMaterial이 부딪힐 때의 마찰력과 반발력 적용하기
	const rubberDefaultContactMaterial = new CANNON.ContactMaterial(
		rubberMaterial,
		defaultMaterial,
		{
			friction: 0.5,
			restitution: 0.7
		}
	);
	cannonWorld.addContactMaterial(rubberDefaultContactMaterial);	// 등록만 해준 것이고 rubberMaterial과 defaultMaterial을 cannon body에 적용해줘야 한다.

	//- 3. ironMaterial과 defaultMaterial이 부딪힐 때의 마찰력과 반발력 적용하기
	const ironDefaultContactMaterial = new CANNON.ContactMaterial(
		ironMaterial,
		defaultMaterial,
		{
			friction: 0.5,
			restitution: 0	// iron은 안튀기게
		}
	);
	cannonWorld.addContactMaterial(ironDefaultContactMaterial);


	//=> cannon body
	const floorShape = new CANNON.Plane();	
	const floorBody = new CANNON.Body({		
		mass: 0,
		position: new CANNON.Vec3(0, 0, 0),	
		shape: floorShape,
		material: defaultMaterial	//- material 지정해줘야 contactMaterial이 적용됨(contactMaterial을 위에서 먼저 만들어야 적용됨)
	});
	floorBody.quaternion.setFromAxisAngle(
		new CANNON.Vec3(-1, 0, 0),	
		Math.PI / 2
	)		
	cannonWorld.addBody(floorBody);
	
	const sphereShape = new CANNON.Sphere(0.5);	// 매개변수로 반지름
	const sphereBody = new CANNON.Body({
		mass: 1,
		position: new CANNON.Vec3(0, 10, 0),
		shape: sphereShape,
		material: rubberMaterial
		// material: ironMaterial
	});
	cannonWorld.addBody(sphereBody);


	// Mesh
	const sphereGeometry = new THREE.SphereGeometry(0.5);
	const sphereMaterial = new THREE.MeshStandardMaterial({
		color: 'seagreen'
	});
	const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
	sphereMesh.position.y = 0.5;
	sphereMesh.castShadow = true;	// 그림자 만들기 
	scene.add(sphereMesh);


	const floorMesh = new THREE.Mesh(
		new THREE.PlaneGeometry(10, 10),
		new THREE.MeshStandardMaterial({
			color: 'slategray'
		})
	);
	floorMesh.rotation.x = -Math.PI / 2;
	floorMesh.receiveShadow = true;		// 그림자를 받는 메쉬는 receiveShadow
	scene.add(floorMesh);


	// 그리기
	const clock = new THREE.Clock();

	function draw() {
		const delta = clock.getDelta();

		let cannonStepTime = 1 / 60;
		if (delta < 0.01) {
			cannonStepTime = 1 / 120;
		}
		cannonWorld.step(cannonStepTime, delta, 3);
		sphereMesh.position.copy(sphereBody.position);
		sphereMesh.quaternion.copy(sphereBody.quaternion)

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
