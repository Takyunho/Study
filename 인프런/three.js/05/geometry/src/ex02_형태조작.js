import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// import dat from "dat.gui";

// ----- 주제: Geometry 정점(Vertex) position 이용하기

export default function example() {
	// Renderer
	const canvas = document.querySelector("#three-canvas");
	const renderer = new THREE.WebGLRenderer({
		canvas,
		antialias: true,
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
	camera.position.z = 10;
	scene.add(camera);

	// Light
	const ambientLight = new THREE.AmbientLight("white", 0.5);
	scene.add(ambientLight);

	const directionalLight = new THREE.DirectionalLight("white", 1);
	directionalLight.position.x = 1;
	directionalLight.position.z = 2;
	scene.add(directionalLight);

	// Controls
	const controls = new OrbitControls(camera, renderer.domElement); // 인자에는 (카메라, 렌더러의 돔요소(캔버스))

	//=> Mesh
	//^ vertex의 위치를 랜덤하게 해서 물결치는 형태를 구현 가능
	//^ vertex의 위치를 일정간격으로 움직이게 해주면 된다.
	//^ 1. geometry + material = mesh 생성
	const geometry = new THREE.SphereGeometry(4, 64, 64);
	const material = new THREE.MeshStandardMaterial({
		color: "orangered",
		side: THREE.DoubleSide, //- 안쪽면 보이게하기
		flatShading: true, //- 표면을 각지게하기
	});
	const mesh = new THREE.Mesh(geometry, material);
	scene.add(mesh);

	console.log(geometry);

	//^ 2. geometry의 x, y, z축이 담겨있는 array를 이용하여 각각의 vertex의 좌표를 랜덤하게 조정
	const positionArray = geometry.attributes.position.array; // geometry의 x, y, z축이 담겨있음
	//^ 5. 랜덤값을 넣을 배열 만들기
	const randomArray = [];
	for (let i = 0; i < positionArray.length; i += 3) {
		// i의 3의 배수마다 한 점이므로 i값에 3을 더해줌
		//=> 정점(vertex) 한 개의 x, y, z 좌표를 랜덤으로 조정
		//- x축
		// positionArray[i] = positionArray[i] + Math.random()  // x위치에다가 0~1사이의 랜덤값 더해주기
		// positionArray[i] = positionArray[i] + (Math.random() - 0.5)   // x위치에다가 0~1사이의 랜덤값 더해주고 0.5를 빼주기 => 0.5를 기준으로 해서 양쪽에 골고루 적용되도록 하기
		// positionArray[i] = positionArray[i] + (Math.random() - 0.5) * 0.2 // 0.2를 곱해서 1/5로 나누기
		positionArray[i] += (Math.random() - 0.5) * 0.2; // 위 코드 축약
		//- y축
		positionArray[i + 1] += (Math.random() - 0.5) * 0.2;
		//- z축
		positionArray[i + 2] += (Math.random() - 0.5) * 0.2;

		//^ 6. 랜덤값을 배열에 넣기
		randomArray[i] = (Math.random() - 0.5) * 0.2;
		randomArray[i + 1] = (Math.random() - 0.5) * 0.2;
		randomArray[i + 2] = (Math.random() - 0.5) * 0.2;
	}

	//=> 그리기
	const clock = new THREE.Clock();

	function draw() {
		const delta = clock.getDelta();
		// console.log(delta)
		//^ 3. 1초씩 증가하는 getElapsedTime을 지정
		const time = clock.getElapsedTime();
		// console.log(time)

		//^ 4. 계속 움직이도록 하기
		//! 값이 늘어났다가 줄어들었다가 할때에는 삼각함수를 사용한다.
		for (let i = 0; i < positionArray.length; i += 3) {
			//=> 삼각함수 Math.sin(각도)을 사용해서 일정 간격 안에서 움직이도록 할 수 있다!!
			// positionArray[i] += Math.sin(time) * 0.002;
			// 근데 이런 경우에는 좌우로 흔들리기만 함 즉, vertex가 일정 간격안에서 랜덤으로 이동될 수 있도록 아래처럼 코드를 짜야함
			//^ 7. 랜덤어레이를 time에 더해주기(매우작은값이기 때문에 큰수 곱해주기)
			positionArray[i] += Math.sin(time + randomArray[i] * 100) * 0.001	// x축
			positionArray[i + 1] += Math.sin(time + randomArray[i + 1] * 100) * 0.001	// y축
			positionArray[i + 2] += Math.sin(time + randomArray[i + 2] * 100) * 0.001	// z축
		}

		//! needsUpdate 속성을 true로 해줘야 동작한다.
		geometry.attributes.position.needsUpdate = true;

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
	window.addEventListener("resize", setSize);

	draw();
}
