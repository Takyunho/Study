import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as CANNON from 'cannon-es';
import { PreventDragClick } from './PreventDragClick';
import { MySphere } from './MySphere';

// ----- 주제: 화면에 생성된 메쉬들 제거하기

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


	// Cannon (물리 엔진)
	const cannonWorld = new CANNON.World();
	cannonWorld.gravity.set(0, -10, 0);

	
	// 성능을 위한 세팅
	cannonWorld.allowSleep = true;	// cannonBody의 속도가 거의 감소 했을때 테스트 안함
	cannonWorld.broadphase = new CANNON.SAPBroadphase(cannonWorld);	// 적절한 성능과 적절한 퀄리티 (가장 많이쓴다.)


	// Contact Material : 여러개의 material을 만들고 어떤 material끼리 부딪힐지 설정해주는 역할
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


	// cannon body
	// floor
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
	

	// Mesh
	const floorMesh = new THREE.Mesh(
		new THREE.PlaneGeometry(10, 10),
		new THREE.MeshStandardMaterial({
			color: 'slategray'
		})
	);
	floorMesh.rotation.x = -Math.PI / 2;
	floorMesh.receiveShadow = true;		// 그림자를 받는 메쉬는 receiveShadow
	scene.add(floorMesh);


	const spheres = [];
	const sphereGeometry = new THREE.SphereGeometry(0.5);
	const sphereMaterial = new THREE.MeshStandardMaterial({
		color: 'orange'
	})


	// 그리기
	const clock = new THREE.Clock();

	function draw() {

		const delta = clock.getDelta();

		let cannonStepTime = 1 / 60;

		if (delta < 0.01) { cannonStepTime = 1 / 120; }
		cannonWorld.step(cannonStepTime, delta, 3);

		// cannonBody의 위치를 mesh가 따라가도록 해야 떨어진다.(cannonBody가 이동하기 때문)
		// 배열에 저장한 값을 순회해서 위치 조정
		// console.log(spheres)
		spheres.forEach(item => {
			// console.log(item)
			item.mesh.position.copy(item.cannonBody.position);
			item.mesh.quaternion.copy(item.cannonBody.quaternion);
		})

		renderer.render(scene, camera);
		renderer.setAnimationLoop(draw);

	}

	function setSize() {

		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.render(scene, camera);

	}


	// 충돌 사운드
	const sound = new Audio('./sounds/boing.mp3');
	
	// 충돌
	const collide = (e) => {

		console.log(e)

		const velocity = e.contact.getImpactVelocityAlongNormal();
		console.log(velocity)

		if (velocity > 3) {
			sound.currentTime = 0;
			sound.play();
		}

	}


	// 이벤트
	window.addEventListener('resize', setSize);

	// 클릭시 sphere 랜덤으로 생성하기
	canvas.addEventListener('click', () => {

		if (preventDragClick.mouseMoved) { return }

		const mySphere = new MySphere({
			scene,	// scene: scene
			cannonWorld,
			geometry: sphereGeometry,
			material: sphereMaterial,
			x: (Math.random() - 0.5) * 2,	// -1 ~ 1
			y: Math.random() * 5 + 2,	// 2 ~ 7
			z: (Math.random() - 0.5) * 2,
			scale: Math.random() + 0.2
		})

		spheres.push(mySphere);

		mySphere.cannonBody.addEventListener('collide', collide)
		
	})

	const preventDragClick = new PreventDragClick(canvas);

	//^ 메쉬 삭제하기 버튼
	const removeBtn = document.createElement('button');
	removeBtn.style.cssText = 'position: absolute; left: 20px; top: 20px; font-size: 20px; cursor: pointer;';	// css 텍스트로 넣기
	removeBtn.innerHTML = '삭제';
	document.body.append(removeBtn);

	//^ 삭제하기 클릭시 메쉬 삭제하기
	removeBtn.addEventListener('click', () => {
		spheres.forEach(item => {
			console.log(item)

			//=> 1. scene에서 mesh를 제거
			scene.remove(item.mesh);
			//=> 2. cannonWorld에서 cannonBody를 제거
			cannonWorld.removeBody(item.cannonBody);
			//=> 3. collide(충돌) 이벤트도 제거 (메모리 점유를 막기 위해)
			item.cannonBody.removeEventListener('collide', collide);
		});
	});
	
	draw();
}
