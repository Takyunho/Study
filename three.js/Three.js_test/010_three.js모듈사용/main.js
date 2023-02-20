import * as THREE from './three.module.js';
// 마우스 컨트롤
import { OrbitControls } from './OrbitControls.js';


// ----- 주제: 특정 방향의 광선(Ray)에 맞은 Mesh 판별하기

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
	// camera.position.x = 5;
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
	// Mesh

	// 선을 만들때 쓰는 Meterial
	const lineMaterial = new THREE.LineBasicMaterial({ color: 'yellow'})	
	const points = [];
	// 100에서 -100으로 이어지는 선을 만들자
	points.push(new THREE.Vector3(0, 0, 100));
	points.push(new THREE.Vector3(0, 0, -100));
	// 선 geometry 만들기
	const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
	const guide = new THREE.Line(lineGeometry, lineMaterial);	// geometry 다음에 meterial이여야 함 (순서도 중요)
	scene.add(guide);
	
	// 박스 Geometry 만들기
	const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
	const boxMaterial = new THREE.MeshStandardMaterial({ color: 'plum' });
	const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
	boxMesh.name = "box";	// 아래에서 raycaster로 확인하기 위해서 추가

	// 도넛모양 Geometry 만들기
	const torusGeometry = new THREE.TorusGeometry(2, 0.5, 16, 100);
	const torusMaterial = new THREE.MeshStandardMaterial({ color: 'lime' });
	const torusMesh = new THREE.Mesh(torusGeometry, torusMaterial);
	torusMesh.name = 'torus';	// 아래에서 raycaster로 확인하기 위해서 추가

	scene.add(boxMesh, torusMesh)

	// 두 메쉬를 배열에 넣기
	// 광선에 맞았는지 체크하기 위해 (배열에 넣어놔야 체크하기가 편리함 )
	const meshes = [boxMesh, torusMesh];


	//! 1. RayCaster를 만들어야한다.
	const raycaster = new THREE.Raycaster();


	// 그리기
	const clock = new THREE.Clock();

	function draw() {
		// const delta = clock.getDelta();
		const time = clock.getElapsedTime();	// 경과시간
		
		// 일정시간 움직이게 하기
		boxMesh.position.y = Math.sin(time) * 2;		//* boxMesh의 y축을 sin함수를 이용해서 위아래로 왔다갔다 하도록 함
		torusMesh.position.y = Math.cos(time) * 2;
		// 원래 색상으로 되돌리기
		boxMesh.material.color.set('plum');
		torusMesh.material.color.set('lime');


		//! 2. raycaster는 시작점과 방향을 지정해주면 된다.
		const origin = new THREE.Vector3(0, 0, 100);		//# 1. 광선을 쏘는 출발점(시작점)
		// const direction = new THREE.Vector3(0, 0, -1)		//# 2. 방향 / 방향이니까 각도가 바뀌는 것이 아니므로, -100이 아니라 -1로 해도 됨
		const direction = new THREE.Vector3(0, 0, -100)		//# -100 으로 하는 경우, normalize()가 필요함
		direction.normalize();

		//! 원래 raycaster에서 방향을 설정할때는 정규화된 값이여야 한다.
		//# 3. 시작점과 방향을 정했으면 광선 세팅하기
		raycaster.set(origin, direction);
		//# test. console로 광선 맞았는지 확인하기
		const intersects = raycaster.intersectObjects(meshes);
		// console.log(intersects)	// meshes 배열에 있는 mesh를 가지고 체크를 하게 됨 / 앞면과 뒷면 다 맞아서 [{},{}] 가 출력

		intersects.forEach(item => {
			console.log(item.object.name);
			item.object.material.color.set('red');	// color의 set 메소드로 색 세팅
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

	// 이벤트
	window.addEventListener('resize', setSize);

	draw();
}
