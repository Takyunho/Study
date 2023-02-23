import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// ----- 주제: OrbitControls

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

	//^ Controls
	const controls = new OrbitControls(camera, renderer.domElement);
	//^ Controls 옵션들
	//=> 컨트롤 느낌 부드럽게 해주기 (draw함수에서 업데이트도 넣어야 함)
	controls.enableDamping = true;

	//=> zoom 잠그기
	// controls.enableZoom = false;

	//=> 최대거리 (줌의 축소를 제한할 때 사용)
	controls.maxDistance = 10;

	//=> 최소거리 (줌의 확대를 제한)
	controls.minDistance = 5;

	//=> 수직방향(위방향을 볼때)으로 회전하는 각도 설정 (Math.PI는 180도)
	controls.minPolarAngle = Math.PI / 4	// == controls.minPolarAngle = THREE.MathUtils.degToRad(45);
	
	//=> 수직방향(아래방향을 볼때)으로 회전하는 각도 설정
	controls.maxPolarAngle = THREE.MathUtils.degToRad(135);	

	//=> 회전의 중심점을 지정할 때 사용
	controls.target.set(2, 0, 0);		

	//=> 자동으로 돌아갈 수 있도록 함
	controls.autoRotate = true;	

	//=> 돌아가는 스피드를 조절
	controls.autoRotateSpeed = 5;


	// Mesh
	const geometry = new THREE.BoxGeometry(1, 1, 1);
	//^ 메쉬 여러개 생성하기
	let mesh;
	let material;
	for (let i = 0; i < 20; i++) {
		//=> material의 색상을 랜덤으로 뽑기
		material = new THREE.MeshStandardMaterial({
			color: `rgb(
				${ 50 + Math.floor(Math.random() * 205) },
				${ 50 + Math.floor(Math.random() * 205) },
				${ 50 + Math.floor(Math.random() * 205) }
			)`	// 내림(floor)해줘야 색이 적용됨
			// 너무 어두운경우를 위해 50 더해주고 곱할때 50을 뺀 205 곱해주기
		});
		
		mesh = new THREE.Mesh(geometry, material);
		mesh.position.x = (Math.random() - 0.5) * 5;	// -2.5 ~ 2.5
		mesh.position.y = (Math.random() - 0.5) * 5;
		mesh.position.z = (Math.random() - 0.5) * 5;
		scene.add(mesh)
	}
	
	
	// 그리기
	const clock = new THREE.Clock();

	function draw() {
		const delta = clock.getDelta();

		//^ 컨트롤 부드럽게 해주기
		controls.update();

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
