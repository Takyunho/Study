import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';		//& 1. GLTFLoader import 하기

// ----- 주제: glb 파일 불러오기

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


	//^ Mesh
	// // 박스 Geometry 만들기
	// const boxGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
	// const boxMaterial = new THREE.MeshStandardMaterial({ color: 'plum' });
	// const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
	// // console.log(boxMesh)
	// boxMesh.name = "box";	// 아래에서 raycaster로 확인하기 위해서 추가

	// scene.add(boxMesh)

	// // 메쉬를 배열에 넣기
	// const meshes = [boxMesh];


	//^ gltf loader
	//& 2. GLTFLoader 생성
	const gltfloader = new GLTFLoader(); 
	// console.log("gltfloader", gltfloader)
	//& 3. 생성한 GLTFLoader를 가지고 load 메소드를 호출해서 
	gltfloader.load(
		//& 4. 우리가 로드할 파일의 경로 기재하여 파일을 로드시킴
		'/models/ilbuni.glb',
		//& 5. 두번째 인자로는 glb파일 로드가 끝나면 실행될 콜백함수작성
		gltf => {
			console.log(gltf)
			console.log(gltf.scene)
			//console.log(gltf.scene.children[0])		// Object3D객체 = 메쉬라고 생각하면 된다.
			//& 6. Object3D 객체 가져와서 상수로 저장
			const mesh = gltf.scene.children[0]
			// console.log(mesh)
			
			//& 7. scene에 add
			scene.add(mesh)

		}
		/** function (gltf) {}와 같음
		 */
	)

	//^ raycaster
	const raycaster = new THREE.Raycaster();
	const mouse = new THREE.Vector2();
	console.log(mouse)

	//^ 클릭 이벤트 발생시의 함수 실행하는 부분
	function checkIntersects() {
		raycaster.setFromCamera(mouse, camera);

		// const intersects = raycaster.intersectObjects(meshes)
		// console.log(intersects)

		// for (const item of intersects) {
		// 	console.log(item.object.name);
		// 	break;
		// }
	}

	// 그리기
	const clock = new THREE.Clock();

	function draw() {
		const delta = clock.getDelta();

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
	canvas.addEventListener('click', e => {
		console.log(e)
		console.log(e.clientX, e.clientY);

		// three.js에 맞게 좌표 변환
		mouse.x = e.clientX / canvas.clientWidth * 2 - 1;
		mouse.y = - (e.clientY / canvas.clientHeight * 2 - 1);
		console.log(mouse);

		// 좌표변환 후 아래 함수 실행
		checkIntersects();

	}) 

	draw();
}
