import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as CANNON from 'cannon-es';
import { PreventDragClick } from './PreventDragClick';

// ----- 주제: Force

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

	// defaultMaterial과 defaultMaterial이 부딪힐 때의 마찰력과 반발력 적용하기
	const defaultContactMaterial = new CANNON.ContactMaterial(
		defaultMaterial,
		defaultMaterial,
		{
			friction: 0.5,	// 마찰력
			restitution: 0.3,	// 반발력
		}
	);
	cannonWorld.defaultContactMaterial = defaultContactMaterial;


	//=> cannon body
	//=> floor
	const floorShape = new CANNON.Plane();	
	const floorBody = new CANNON.Body({		
		mass: 0,
		position: new CANNON.Vec3(0, 0, 0),	
		shape: floorShape,
		material: defaultMaterial
	});
	floorBody.quaternion.setFromAxisAngle(
		new CANNON.Vec3(-1, 0, 0),	
		Math.PI / 2
	)		
	cannonWorld.addBody(floorBody);
	
	//=> sphere
	const sphereShape = new CANNON.Sphere(0.5);	// 매개변수로 반지름
	const sphereBody = new CANNON.Body({
		mass: 1,
		position: new CANNON.Vec3(0, 10, 0),
		shape: sphereShape,
		material: defaultMaterial
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

		//=> 속도 감소시키기
		sphereBody.velocity.x *= 0.98;	// 1보다 작은 수 곱하면 0에 수렴하니까 멈추게 된다.
		sphereBody.velocity.y *= 0.98;
		sphereBody.velocity.z *= 0.98;
		sphereBody.angularVelocity.x *= 0.98;
		sphereBody.angularVelocity.y *= 0.98;
		sphereBody.angularVelocity.z *= 0.98;


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

	//=> 클릭시 바람이 부는것 처럼 (힘 적용하기)
	canvas.addEventListener('click', () => {
		// 드래그일때 클릭 안되도록 하기
		if (preventDragClick.mouseMoved) { return }
		// 힘이 누적되는 것을 방지하기
		sphereBody.velocity.x = 0;
		sphereBody.velocity.y = 0;
		sphereBody.velocity.z = 0;
		sphereBody.angularVelocity.x = 0;
		sphereBody.angularVelocity.y = 0;
		sphereBody.angularVelocity.z = 0;

		// 힘이 스피어에 적용되도록
		sphereBody.applyForce(new CANNON.Vec3(50, 0, 0), sphereBody.position);
	})

	const preventDragClick = new PreventDragClick(canvas);
	
	draw();
}
