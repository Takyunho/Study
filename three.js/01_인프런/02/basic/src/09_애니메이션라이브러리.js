import * as THREE from 'three';
import gsap from 'gsap';

// ----- 주제: 애니메이션 라이브러리(GSAP) 사용하기

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
	// 안개
	scene.fog = new THREE.Fog('blue', 3, 7)		// 3 에서 7까지 안개생성 ()
	// 안개를 배경색과 맞추면 안보이게 하는 효과도 가능하다. (심지어 원근감도 생김)

	// Camera
	const camera = new THREE.PerspectiveCamera(
		75, // 시야각(field of view)
		window.innerWidth / window.innerHeight, // 종횡비(aspect)
		0.1, // near
		1000 // far
	);
	camera.position.x = 0;
	camera.position.y = 1;
	camera.position.z = 5;
	scene.add(camera);

	const light = new THREE.DirectionalLight(0xffffff, 1);	// (색, 빛의 강도)
	light.position.x = 1;
	light.position.y = 3;
	light.position.z = 5;
	scene.add(light);

		/* DirectionalLight은 태양 빛하고 비슷하다고 보면 된다.
		mesh, light, camera => position으로 조정
		*/


	//^ Mesh
	const geometry = new THREE.BoxGeometry(1, 1, 1);
	const material = new THREE.MeshStandardMaterial({
		color: 'red'
	});

	// 메쉬 여러개 만들어서 랜덤으로 배치시키기
	const meshes = [];
	let mesh;
	for (let i = 0; i < 10; i++) {
		mesh = new THREE.Mesh(geometry, material);
		mesh.position.x = Math.random() * 5 - 2.5;
		mesh.position.z = Math.random() * 5 - 2.5;
		scene.add(mesh);
		meshes.push(mesh);
	}


	// gsap
	gsap.to(
		mesh.position,
		{ duration: 1, y: 2, z: 2 }
	)


	//^ 그리기
	let oldTime = Date.now();

	function draw() {

		const newTime = Date.now();
		const deltaTime = newTime - oldTime;
		oldTime = newTime;

		// 위에서 만든 meshes 배열을 통해 draw함수에서 애니메이션 구현
		meshes.forEach(item => {
			item.rotation.y += deltaTime * 0.001;
		})

		renderer.render(scene, camera);
		window.requestAnimationFrame(draw);
		// renderer.setAnimationLoop(draw)
	}

	function setSize() {
		// 카메라
		camera.aspect = window.innerWidth / window.innerHeight;
		// updateProjectionMatrix 카메라 투영에 관련된 값에 변화가 있을 경우 실행해야 함
		camera.updateProjectionMatrix();
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.render(scene, camera);
	}

	// 이벤트
	window.addEventListener('resize', setSize);

	draw();
}
