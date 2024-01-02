import * as THREE from 'three';
import { Vector2 } from 'three';
// 마우스 컨트롤
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { PreventDragClick } from './PreventDragClick';


// ----- 주제: 드래그 클릭 방지 => preventDragClick

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
	// 박스 Geometry 만들기
	const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
	const boxMaterial = new THREE.MeshStandardMaterial({ color: 'plum' });
	const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
	// console.log(boxMesh)
	boxMesh.name = "box";	// 아래에서 raycaster로 확인하기 위해서 추가

	// 도넛모양 Geometry 만들기
	const torusGeometry = new THREE.TorusGeometry(2, 0.5, 16, 100);
	const torusMaterial = new THREE.MeshStandardMaterial({ color: 'lime' });
	const torusMesh = new THREE.Mesh(torusGeometry, torusMaterial);
	console.log(torusMesh)
	torusMesh.name = 'torus';	// 아래에서 raycaster로 확인하기 위해서 추가

	scene.add(boxMesh, torusMesh)

	// 두 메쉬를 배열에 넣기
	// 광선에 맞았는지 체크하기 위해 (배열에 넣어놔야 체크하기가 편리함 )
	const meshes = [boxMesh, torusMesh];
	// console.log(meshes)

	// RayCaster
	const raycaster = new THREE.Raycaster();
	const mouse = new THREE.Vector2(); 
	console.log(mouse)

	// 그리기
	const clock = new THREE.Clock();

	function draw() {
		// const delta = clock.getDelta();
		const time = clock.getElapsedTime();	// 경과시간
		
		// 일정시간 움직이게 하기
		boxMesh.position.y = Math.sin(time) * 2;
		torusMesh.position.y = Math.sin(time) * 2;

		renderer.render(scene, camera);
		renderer.setAnimationLoop(draw);
	}


  // 클릭시 실행할 함수
	function checkIntersects() {
		if (preventDragClick.mouseMoved) return;		//! mouseMoved가 true인 경우 즉, 드래그 된 경우에는 return해서 함수 종료
		raycaster.setFromCamera(mouse, camera);  

		const intersects = raycaster.intersectObjects(meshes);
		
		for (const item of intersects) {
			console.log(item.object.name);
			item.object.material.color.set('blue')
			break;   
		}
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
		mouse.x = e.clientX / canvas.clientWidth * 2 - 1;
		mouse.Y = -(e.clientY / canvas.clientHeight * 2 - 1); 
		// console.log(mouse);
		checkIntersects();
	})

	const preventDragClick = new PreventDragClick(canvas);



	draw();
}
