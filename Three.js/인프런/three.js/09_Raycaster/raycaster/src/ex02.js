import * as THREE from 'three';
import { Vector2 } from 'three';
// 마우스 컨트롤
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


// ----- 주제: 클릭한 Mesh 선택하기

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

	//! RayCaster
	const raycaster = new THREE.Raycaster();
	const mouse = new THREE.Vector2();  //* Vector2는 2차원 / 왜 mouse는 Vector2로 만들었을까? => 마우스는 2차원 x, y축으로 이동하기 때문이다.
	console.log(mouse)

	// 그리기
	const clock = new THREE.Clock();

	function draw() {
		// const delta = clock.getDelta();
		const time = clock.getElapsedTime();	// 경과시간
		
		// 일정시간 움직이게 하기
		boxMesh.position.y = Math.sin(time) * 2;		//* boxMesh의 y축을 sin함수를 이용해서 위아래로 왔다갔다 하도록 함
		torusMesh.position.y = Math.sin(time) * 2;
		// 원래 색상으로 되돌리기
		boxMesh.material.color.set('plum');
		torusMesh.material.color.set('lime');

		renderer.render(scene, camera);
		renderer.setAnimationLoop(draw);
	}


  //^ 클릭시 실행할 함수
  function checkIntersects() {
    raycaster.setFromCamera(mouse, camera);  //* 카메라 시점에서 광선을 쐈을때 즉, 카메라 위치를 origin으로 잡아서 마우스가 클릭한 지점으로 광선을 세팅함.

    const intersects = raycaster.intersectObjects(meshes);
    
    for (const item of intersects) {
      console.log(item.object.name);
      break;    // 여러개를 관통해서 클릭하고 싶으면 break 제거 / 하나만 클릭하고 싶으면 break 걸어야 함
    }
    // if (intersects[0]) {
    //   console.log(intersects[0].object.name);
    // }
    //! if문을 걸어서 intersects[0] 처럼 하는 것과 for of 반복문을 돌려서 하는 경우 메쉬의 수가 적으면 성능상 차이는 거의 없음.
    //! 다만, for of 반복문을 통해서 구현하는 경우, break를 제거하여 여러개의 meshe를 관통해서 클릭할 수 있음
  }


	function setSize() {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.render(scene, camera);
	}

	//^ 이벤트
	window.addEventListener('resize', setSize);
	canvas.addEventListener('click', e => {
		// console.log(e);
		// console.log(e.clientX, e.clientY);

		// three.js에 맞게 좌표 변환하기  (raycaster에서 쓰려면 좌표변환이 필요함)  (가운데가 0)
		mouse.x = e.clientX / canvas.clientWidth * 2 - 1;
		mouse.Y = -(e.clientY / canvas.clientHeight * 2 - 1);   // 앞에 -를 붙여줘야 함
		console.log(mouse);
		
		checkIntersects();
	})
	draw();
}
