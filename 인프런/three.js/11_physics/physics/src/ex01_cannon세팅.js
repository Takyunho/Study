import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as CANNON from 'cannon-es';

// ----- 주제: cannon.js 기본 세팅

// cannon.js 문서
// http://schteppe.github.io/cannon.js/docs/
// 주의! https 아니고 http

//- 1. cannon-es 설치 : npm i cannon-es
//- 2. import 해오기 : import * as CANNON from 'cannon-es'

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

	// Cannon (물리 엔진)
	//- 3. 물리 현상이 적용될 세계(world)를 만들어줘야 한다.
	const cannonWorld = new CANNON.World();
	//- 4. 중력을 세팅한다.
	cannonWorld.gravity.set(0, -10, 0);		// 지구의 중력 가속도가 9.8이므로 대략 10으로 y축을 설정(-로 설정해야 아래를 향함)
	//- 6. 물리가 적용되는 객체 만들기
	const floorShape = new CANNON.Plane();	// three.js의 geometry와 유사
	const floorBody = new CANNON.Body({		// 투명 컵이라고 생각하면 된다.
		mass: 0,		// 무게 (바닥역할을 위해 0으로 설정)
		position: new CANNON.Vec3(0, 0, 0),		// 위치
		shape: floorShape
	});
	//- 6-1. floorBody또한 처음에는 세워져 있으므로, floorMesh처럼 90도 눕혀야 함
	floorBody.quaternion.setFromAxisAngle(		// cannon.js에서는 rotation대신에 quaternion을 사용
		// 축 설정
		new CANNON.Vec3(-1, 0, 0),	// x축 방향으로 - 이동
		// 각도 설정 (눕히기)
		Math.PI / 2
	)		
	//- 6-2. 물리가 적용된 객체를 월드에 추가
	cannonWorld.addBody(floorBody);

	//- 6-3. 위에서 plane을 만들었으니까 box도 만들어야함
	// const boxShape = new CANNON.Box(new CANNON.Vec3(0.5, 0.5, 0.5));	// 크기의 기준이 박스의 중심부터 시작하므로 0.5
	const boxShape = new CANNON.Box(new CANNON.Vec3(0.25, 2.5, 0.25));
	const boxBody = new CANNON.Body({
		mass: 1,
		position: new CANNON.Vec3(0, 10, 0),
		shape: boxShape
	});
	//- 6-4. 박스바디를 월드에 추가
	cannonWorld.addBody(boxBody);


	// Mesh
	// const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
	const boxGeometry = new THREE.BoxGeometry(0.5, 5, 0.5);
	const boxMaterial = new THREE.MeshStandardMaterial({
		color: 'seagreen'
	});
	const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
	boxMesh.position.y = 0.5;
	scene.add(boxMesh);

	//- 5. 바닥 메쉬를 추가
	const floorMesh = new THREE.Mesh(
		new THREE.PlaneGeometry(10, 10),
		new THREE.MeshStandardMaterial({
			color: 'slategray'
		})
	);
	floorMesh.rotation.x = -Math.PI / 2;
	scene.add(floorMesh);


	// 그리기
	const clock = new THREE.Clock();

	function draw() {
		const delta = clock.getDelta();
		// console.log(delta);

		//- 7. draw 함수에서 cannon body와 mesh 연결하기
		// 화면 주사율에 따라 프레임 유동적으로 맞추기
		let cannonStepTime = 1 / 60;
		if (delta < 0.01) {
			cannonStepTime = 1 / 120;	// delta 값이 0.01 보다 작으면 120 분의 1초로
		}
		cannonWorld.step(cannonStepTime, delta, 3);	// 시간 단계를 세팅한다. (몇분의 1초단위로 갱신해줄지, delta, 간격을 메우는 시도를 몇번할지)
		//- 8. copy 메소드를 이용해서 물리가 적용된 객체와 three.js의 mesh를 합치기
		// 즉, cannon body가 three.js mesh의 position을 따라가도록 만드는 것.
		// floorMesh.position.copy(floorBody.position);	// copy(): 매개변수로 들어온 인자를 복사하는 메소드
		boxMesh.position.copy(boxBody.position);
		boxMesh.quaternion.copy(boxBody.quaternion)	// 위치뿐만 아니라, 회전도 따라가게 해야 넘어지는것이 제대로 보인다.


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
