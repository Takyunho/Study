import * as THREE from 'three';
import Stats from 'stats.js';

// ----- 주제: 초당 프레임 수 보기(Stats)
// three.js 기능이 아니라 라이브러리여서 설치해야함

export default function example() {
	//=> Renderer
	const canvas = document.querySelector('#three-canvas');
	const renderer = new THREE.WebGLRenderer({
		canvas,
		antialias: true
	});
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);

	//=> Scene
	const scene = new THREE.Scene();

	//=> Camera
	const camera = new THREE.PerspectiveCamera(
		75,
		window.innerWidth / window.innerHeight,
		0.1,
		1000
	);
	camera.position.y = 1;
	camera.position.z = 5;
	scene.add(camera);

	//=> light
	const ambientLight = new THREE.AmbientLight("white", 0.5)	// 은은하게 전체적으로 비추는 조명
	scene.add(ambientLight);
	const directionalLight = new THREE.DirectionalLight("white", 1);
	directionalLight.position.x = 1;
	directionalLight.position.z = 2;
	scene.add(directionalLight);



	//=> Mesh
	const geometry = new THREE.BoxGeometry(1, 1, 1);
	const material = new THREE.MeshStandardMaterial({
		color: 'seagreen'
	});
	const mesh = new THREE.Mesh(geometry, material);
	// mesh.position.set(2, 0, 0)
	scene.add(mesh);


	//^ Stats(성능 체크시 사용(프레임))
	const stats = new Stats();
	document.body.append(stats.domElement);


	// 그리기
	const clock = new THREE.Clock();

	function draw() {
		const time = clock.getElapsedTime();
		
		//=> 계속 반복실행하는 draw함수에서 업데이트를 해줘야 프레임이 정상적으로 나온다.
		stats.update();
		
		mesh.rotation.y = time;

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
