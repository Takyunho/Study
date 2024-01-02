import * as THREE from 'three';
import Stats from 'stats.js';
import dat from 'dat.gui';

// ----- 주제: GUI
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
	scene.add(mesh);


	//=> Stats
	const stats = new Stats();
	document.body.append(stats.domElement);


	//^ dat GUI
	const gui = new dat.GUI();	//=> js오브젝트의 속성값을 그래픽 기반의 UI로 조절할 수 있게 해주는 역할(three.js 뿐만 아니라, 다른 곳에서도 사용가능한 라이브러리)
	// 사용법 : gui.add(조절하고자하는 오브젝트, 'y와 같은 축', 최소값, 최대값, 조절하고자하는크기).name('gui의 이름');
	// 아래처럼 메소드 체인을 이용해서 사용도 가능하다.
	gui
		.add(mesh.position, 'y')
		.min(-10)
		.max(10)
		.step(0.01)
		.name('메쉬의 y 위치');
	
	gui.add(camera.position, 'x', -10, 10, 0.01).name('카메라 X');	// step을 1로하면 살짝 버벅이는거처럼 보임
	


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
