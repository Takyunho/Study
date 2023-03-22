import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as CANNON from 'cannon-es';
import { PreventDragClick } from './PreventDragClick';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';	//=> Domino 모듈에서 사용하면 반복문이 돌때마다 GLTFLoader를 호출해야 하므로 비 효율적. 따라서 지금 이 파일에서 불러오고, 불러온 gltf파일을 Domino 생성자 함수를 통해 전달하는 식으로 사용
import { Domino } from './Domino';

// -------- 주제 : 도미노 만들기

export default function example() {

	// 렌더러
	const canvas = document.querySelector('#three-canvas');
	const renderer = new THREE.WebGLRenderer({
		canvas: canvas,
		antialias: true
	});
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCFSoftShadowMap;

	// Scene
	const scene = new THREE.Scene();

	// Camera
	const camera = new THREE.PerspectiveCamera(
		75,
		window.innerWidth / window.innerHeight,
		0.1,
		1000
	);
	camera.position.set(4, 3, 8);
	scene.add(camera);

	// Light
	const ambientLight = new THREE.AmbientLight('white', 0.5);
	scene.add(ambientLight)
	
	const directionalLight = new THREE.DirectionalLight('white', 1)
	directionalLight.position.x = 1;
	directionalLight.position.z = 2;
	directionalLight.castShadow = true;
	scene.add(directionalLight)

	// Controls
	const controls = new OrbitControls(camera, renderer.domElement);

	//^ GLTF Load
	const gltfLoader = new GLTFLoader();


	
	//////////////////////////////////
	//			cannon-es			//
	//////////////////////////////////
	// cannon World
	const cannonWorld = new CANNON.World();
	cannonWorld.gravity.set(0, -9.8, 0);
	// cannonWorld.allowSleep = true;
	cannonWorld.broadphase = new CANNON.SAPBroadphase(cannonWorld);
	
	// contact Material
	const defaultMaterial = new CANNON.Material('default');
	const defaultContactMaterial = new CANNON.ContactMaterial(
		defaultMaterial,
		defaultMaterial,
		{
			friction: 0.5,
			restitution: 0.3
		}
	)
	cannonWorld.defaultContactMaterial = defaultContactMaterial;

	// cannon Body
	// floor
	const cannonFloorShape = new CANNON.Plane();
	const cannonFloorBody = new CANNON.Body({
		mass: 0,
		position: new CANNON.Vec3(0, 0, 0),
		shape: cannonFloorShape,
		material: defaultMaterial
	});
	cannonFloorBody.quaternion.setFromAxisAngle(
		new CANNON.Vec3(-1, 0, 0),
		Math.PI / 2
	)
	cannonWorld.addBody(cannonFloorBody);

	// Mesh
	// floor
	const floorMesh = new THREE.Mesh(
		new THREE.PlaneGeometry(100, 100),
		new THREE.MeshStandardMaterial({ color: 'slategray' })
	)
	floorMesh.rotation.x = -Math.PI / 2;	// 90도 회전
	floorMesh.receiveShadow = true;
	scene.add(floorMesh);

	

	const preventDragClick = new PreventDragClick(canvas);


	// 도미노 생성하기
	const dominos = [];
	let domino;
	for (let i = -3; i < 17; i += 1) {
		domino = new Domino({
			// Domino class에 세팅할 값들
			scene,
			cannonWorld,
			z: -i * 1,
			gltfLoader,
			index: i
		});
		dominos.push(domino);
	}


	// Draw
	const clock = new THREE.Clock();

	function draw() {

		const delta = clock.getDelta();
		
		// cannonBody 와 Mesh 결합하기
		let cannonStepTime = 1 / 60;

		if (delta < 0.01) { cannonStepTime = 1 / 120; }
		cannonWorld.step(cannonStepTime, delta, 3);
	
		//^ 도미노와 캐논바디의 위치 맞추기 
		dominos.forEach(item => {
			// domino와 캐논바디가 로드 되기 전이므로 오류가난다. 따라서 아래처럼 조건을 걸어줘야 함!
			if (item.cannonBody) {
				item.modelMesh.position.copy(item.cannonBody.position);
				item.modelMesh.quaternion.copy(item.cannonBody.quaternion);
			}
		})

		renderer.render(scene, camera);
		renderer.setAnimationLoop(draw)

	}


	// Raycaster
	const raycaster = new THREE.Raycaster();
	const mouse = new THREE.Vector2();

	const checkIntersects = () => {
		raycaster.setFromCamera(mouse, camera);

		const intersects = raycaster.intersectObjects(scene.children);	// 전체 다 검사
		// console.log(intersects)
		console.log(intersects[0].object.name)
	}
	
	canvas.addEventListener('click', (e) => {
		// console.log(e)

		// 클릭한 좌표의 픽셀값 얻기
		// canvas.clientWidth => 화면의 너비
		mouse.x = e.clientX / canvas.clientWidth * 2 - 1;	// -1 ~ 1 사이
		mouse.y = -(e.clientY / canvas.clientHeight * 2 - 1);	// y축은 three.js와 마우스이벤트가 반대이므로, 앞에 -를 붙여야 함 => 그래야 방향이 통일됨
		// console.log(mouse.x);

		checkIntersects();

	})


	// Size
	function setSize() {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.render(scene, camera);
	}
	window.addEventListener("resize", setSize);
	

	draw();
}