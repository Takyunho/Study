import * as THREE from 'three';

// ----- 주제: 애니메이션 성능보정

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
		75, // 시야각(field of view)
		window.innerWidth / window.innerHeight, // 종횡비(aspect)
		0.1, // near
		1000 // far
	);
	camera.position.z = 5;
	scene.add(camera);

	const light = new THREE.DirectionalLight(0xffffff, 1);	// (색, 빛의 강도)
	light.position.x = 1;
	light.position.z = 2;
	scene.add(light);

		/* DirectionalLight은 태양 빛하고 비슷하다고 보면 된다.
		mesh, light, camera => position으로 조정
		*/


	// Mesh
	const geometry = new THREE.BoxGeometry(1, 1, 1);
	const material = new THREE.MeshStandardMaterial({
		color: 'red'
	});
	const mesh = new THREE.Mesh(geometry, material);
	scene.add(mesh);

	// 그리기
	const clock = new THREE.Clock();

	function draw() {
		
		// const time = clock.getElapsedTime();	// 실행 시점으로부터 총 경과시간을 나타낸다. (콘솔 찍어보면 1초씩 늘어남)
		const delta = clock.getDelta();	// draw함수의 실행 간격 시간을 나타낸다.	(콘솔 찍어보면 0.~~~)
		// console.log(time)
		// console.log(delta)
		//* getElapsedTime()과 getDelta()를 같이(동시에) 쓰면 안됨. -> 값이 꼬이거나 뭔가 이상하게 동작하게 된다.

		//@ 회전
		// mesh.rotation.y += 0.1; // 라디안 방식
		// mesh.rotation.y += THREE.MathUtils.degToRad(1);	// 각도 방식
		// mesh.rotation.y = 0.3 * time;	// getElapsedTime() 사용방식 / =만 사용
		mesh.rotation.y += 5 * delta	// getDelta() 사용방식 / +=을 사용해야함 / 속도를 높이려면 높은 수를 곱하고, 속도를 낮추려면 낮은 수를 곱하면 됨

		//@ 위치
		// mesh.position.y += 0.01;
		// mesh.position.y += delta;
		mesh.position.y += 3 * delta;
		if (mesh.position.y > 3) {
			mesh.position.y = 0;
		}

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
