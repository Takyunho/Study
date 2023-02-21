import * as THREE from 'three';
import dat from 'dat.gui';

// ----- 주제: 그룹 만들기

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
	camera.position.y = 1.5;
	camera.position.z = 4;
	scene.add(camera);


	//=> Light
	const ambientLight = new THREE.AmbientLight('white', 0.5);
	scene.add(ambientLight);

	const directionalLight = new THREE.DirectionalLight('white', 1);
	directionalLight.position.x = 1;
	directionalLight.position.z = 2;
	scene.add(directionalLight);


	//=> Mesh
	const geometry = new THREE.BoxGeometry(1, 1, 1);
	const material = new THREE.MeshStandardMaterial({
		// color: 'seagreen'
		color: 'hotpink'
	});


	//- 태양
	const group1 = new THREE.Group();
	const sun = new THREE.Mesh(geometry, material);		// geometry와 material은 다른 곳에서 만들고 얼마든지 가져와서 사용할 수 있다. (즉, 재활용이 가능하다.)
	//- 지구
	const group2 = new THREE.Group();
	const earth = sun.clone();		// clone으로 복사할 수 있다.
	earth.scale.set(0.3, 0.3, 0.3);		// 지구는 태양보다 작으니까..
	group2.position.x = 2;		// 지구를 포함한 그룹2를 태양과 살짝 띄우기
	//- 달
	// const group3 = new THREE.Object3D();		// Group과 같음
	const group3 = new THREE.Group();
	const moon = earth.clone();
	moon.scale.set(0.15, 0.15, 0.15);
	moon.position.x = 0.5;

	// 달 그룹화
	group3.add(moon);
	// group2에 earth와 group3 그룹화하기
	group2.add(earth, group3);
	// group1에 sun과 group2 그룹화하기
	group1.add(sun, group2);
	scene.add(group1);	// group2는 group1에 add해줬으니까 안넣어도 돼
	
	
	//=> AxesHelper
	const axesHelper = new THREE.AxesHelper(3);
	scene.add(axesHelper);


	//=> Dat GUI
	const gui = new dat.GUI();
	gui.add(camera.position, 'x', -5, 5, 0.1).name('카메라 X');
	gui.add(camera.position, 'y', -5, 5, 0.1).name('카메라 Y');
	gui.add(camera.position, 'z', 2, 10, 0.1).name('카메라 Z');


	//=> 그리기
	const clock = new THREE.Clock();

	function draw() {
		const delta = clock.getDelta();
		
		//- 위에서 그룹화한거 회전시키기
		group1.rotation.y += delta;
		group2.rotation.y += delta;
		group3.rotation.y += delta;

		renderer.render(scene, camera);
		renderer.setAnimationLoop(draw);
	}


	function setSize() {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.render(scene, camera);
	}


	//=> 이벤트
	window.addEventListener('resize', setSize);

	draw();
}
