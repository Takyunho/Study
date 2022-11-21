import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';		//& 1. GLTFLoader import 하기



let camera, scene, renderer, renderer2, windowHalfX, windowHalfY;
let mouseX = 0, mouseY = 0;
let controls;
let sphere;
let light;
let lookAt = new THREE.Vector3(0, 0, 0);
let lightMovementAmplitude = 200;


export default function example() {
	
	init();
	animate(performance.now());
	
	function init() {
		windowHalfX = window.innerWidth / 2;  //* 창사이즈 너비의 절반
		windowHalfY = window.innerHeight / 2; //* 창사이즈 높이의 절반
	
		// camera
		camera = new THREE.PerspectiveCamera( //* 원근 카메라
			45,
			window.innerWidth / window.innerHeight,
			1,
			2000
		);
		camera.position.set(0, 0, 500); //* 카메라 포지션 x, y, z
	
		scene = new THREE.Scene();  //* 장면 생성
	
		for (var i = 0; i < 5; i++) { //* 5개의 포스트잇 생성
			var elementObj = makeElementObject("div", 100, 100);  //* obj를 리턴받음
			console.log(elementObj)
			/** css3dObject 설명 
			 * element : 렌더러가 자식 요소를 추가 하는 HTMLElement
			 *
			 * */
			elementObj.css3dObject.element.textContent =
				"I am a <div> element! Edit me!";
			elementObj.css3dObject.element.setAttribute("contenteditable", ""); //* 지워도 같음
	
			elementObj.position.x = Math.random() * 600 - 300;  //* x축
			elementObj.position.y = Math.random() * 600 - 300;  //* y축
			elementObj.position.z = Math.random() * 800 - 600;  //* z축
	
			//* x, y, z축으로 랜덤으로 돌려서 흩뿌려지게 함
			elementObj.rotation.x = Math.random();
			elementObj.rotation.y = Math.random();
			elementObj.rotation.z = Math.random();
			scene.add(elementObj);  //* 장면에 요소 추가
		}
	
		// make a geometry to see if we can clip it with the DOM elememt.
		//^ 스피어형태의 mesh를 만드는 함수 (즉시 실행됨)
		~(function () {
			var material = new THREE.MeshPhongMaterial({  //* 초록색 구형태의 material읆 만듦
				color: 0x156210,
				emissive: 0x000000, //* 방사성 (material의 밝기 조절하는 역할인거같음)
				specular: 0x111111, //* 구에 비춰지는 조명 밝기를 나타냄
				side: THREE.DoubleSide,
				flatShading: false,  //* true로하면 부드럽게 나오지 않음
				shininess: 30,  //* 구에 비춰지는 그림자?
			});
			var geometry = new THREE.SphereGeometry(70, 32, 32);  //* 스피어지오메트리를 만듬
			sphere = new THREE.Mesh(geometry, material);  //* geometry + material = mesh(스피어)
			sphere.position.z = 50;
			sphere.castShadow = true;
			sphere.receiveShadow = false;
			scene.add(sphere);
		})(); // 즉시 실행함수
	
		// light(조명)
		~(function () {
			var ambientLight = new THREE.AmbientLight(0x999999);
			scene.add(ambientLight);
	
			// const directionalLight = new THREE.DirectionalLight('white', 1);
			// directionalLight.position.x = 1;
			// directionalLight.position.z = 2;
			// scene.add(directionalLight);
	
			light = new THREE.PointLight(0xffffff, 1, 0);
			light.castShadow = true;
			light.position.z = 150;
			light.shadow.mapSize.width = 512; // default
			light.shadow.mapSize.height = 512; // default
			light.shadow.camera.near = 1; // default
			light.shadow.camera.far = 10000; // default
			light.shadow.bias = 0; // default
	
			scene.add(new THREE.PointLightHelper(light, 5));  //* 조명 포인트를 도와주는 부분
	
			scene.add(light);
		})();
	
		//* div 요소 
		renderer2 = new THREE.CSS3DRenderer();
		// console.log(renderer2)
		renderer2.setSize(window.innerWidth, window.innerHeight);
		renderer2.domElement.style.position = "absolute";
		renderer2.domElement.style.top = 100;
		document.querySelector("#css").appendChild(renderer2.domElement);
	
		//* 구형태의 mesh
		renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
		console.log(renderer)
		// renderer.setClearColor(0x000000, 0);
		// 필수
		renderer.setPixelRatio(window.devicePixelRatio);  //* 사이즈
		renderer.setSize(window.innerWidth, window.innerHeight);  //* 사이즈
		renderer.shadowMap.enabled = true;
		// 필수 x 
		renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
		document.querySelector("#webgl").appendChild(renderer.domElement);  //* 필수
	
		document.addEventListener("mousemove", onDocumentMouseMove, false);
	
	
	//^ ----------------------------------- gltf 불러오기 --------------------
	//^ gltf loader
	
	const gltfloader = new GLTFLoader(); 	//& 2. GLTFLoader 생성
	// console.log("gltfloader", gltfloader)
		
	gltfloader.load(	//& 3. 생성한 GLTFLoader를 가지고 load 메소드를 호출해서 
		'/models/ilbuni.glb',	//& 4. 우리가 로드할 파일의 경로 기재하여 파일을 로드시킴
		gltf => {	//& 5. 두번째 인자로는 glb파일 로드가 끝나면 실행될 콜백함수작성
			console.log("gltf : ", gltf)
			console.log(gltf.scene)
			//console.log(gltf.scene.children[0])		// Object3D객체 = 메쉬라고 생각하면 된다.
			
			mesh = gltf.scene.children[0]	//& 6. Object3D 객체 가져와서 상수로 저장
			console.log("mesh : ", mesh)
			
			scene.add(mesh)	//& 7. scene에 add
		}
		/** function (gltf) {}와 같음
		 */
	)
	
	}
	
	//@ 마우스를 따라 구가 이동되도록 하는 함수
	function onDocumentMouseMove(event) {
		mouseX = event.clientX - windowHalfX;
		mouseY = (event.clientY - windowHalfY);
	}
	
	//@ 애니메이션
	function animate(time) {
		sphere.position.x += (mouseX - sphere.position.x) * 0.02;
		sphere.position.y += (-mouseY - sphere.position.y) * 0.02;
	
		//* 조명이 자동으로 x축과 y축으로 자동으로 왔다갔다 할 수 있게 하는 부분
		light.position.x = 30 * Math.sin(time * 0.003); 
		light.position.y = 30 * Math.cos(time * 0.002);
	
		scene.updateMatrixWorld();
	
		//* lookAt 메소드를 이용해 마우스를 따라 구가 이동되도록 함
		lookAt.setFromMatrixPosition(sphere.matrixWorld);
		camera.lookAt(lookAt);  //* lookAt 변수 => new THREE.Vector3(0, 0, 0);
	
		//* renderer(div요소)와 renderer2(구 형태의 메쉬)를 렌더링하는부분
		renderer.render(scene, camera); 
		renderer2.render(scene, camera);
	
		requestAnimationFrame(animate);
	}
	
	//@ div 요소를 만드는 함수
	//^ type은 'div' , width는 100, height는 100
	function makeElementObject(type, width, height) {
		const obj = new THREE.Object3D(); //* Object3D를 이용해 같이 이동되도록
		console.log(obj)
		const color = new THREE.Color(  //* div요소의 컬러를 랜덤으로 지정
			Math.random() * 0.21568627451 + 0.462745098039,
			Math.random() * 0.21568627451 + 0.462745098039,
			Math.random() * 0.21568627451 + 0.462745098039
		);
	
		//& 요소를 만들고 스타일을 지정하는 부분 
		const element = document.createElement(type); //* 'div'요소를 생성
		element.style.width = width + "px"; //* 'div'요소의 너비 지정 (파라미터로 전달받음)
		element.style.height = height + "px"; //* 'div' 요소의 높이 지정 ( "" )
		element.style.opacity = 0.98;  //* 투명도 지정
		element.style.background = color.getStyle();  //* 배경색을 지정
	
		var css3dObject = new THREE.CSS3DObject(element); //* 위에서 설정한 요소를 인자로 넣어서 생성
		// console.log(css3dObject)
		obj.css3dObject = css3dObject;  //* obj의 css3dObject 속성에 위에서 만든 요소를 지정
		obj.add(css3dObject);
	
		// make an invisible plane for the DOM element to chop
		// clip a WebGL geometry with it.
		var material = new THREE.MeshPhongMaterial({  //* material 만들기
			opacity: 0.15,
			color: new THREE.Color(/*color*/ 0x111111),
			blending: THREE.NoBlending, //* ???
			side: THREE.DoubleSide, //* 더블사이드로 해야 마우스를 돌려도 양면이 다 보임
		});
		var geometry = new THREE.BoxGeometry(width, height, 1); //* geometry 만들기 (박스지오메트리)
		var mesh = new THREE.Mesh(geometry, material);  //* geometry + material = MESH
		// console.log(mesh)
		mesh.castShadow = true; //* mesh 오브젝트에 castShadow 추가??? 무슨역할?
		mesh.receiveShadow = true;  //* ??
		obj.lightShadowMesh = mesh;
		obj.add(mesh);
	
		return obj;
	} // makeElementObject 끝 

	

	//^ raycaster
	const raycaster = new THREE.Raycaster();
	const mouse = new THREE.Vector2();
	console.log(mouse)


	canvas.addEventListener('click', e => {
		console.log(e)
		console.log(e.clientX, e.clientY);

		// three.js에 맞게 좌표 변환
		mouse.x = e.clientX / canvas.clientWidth * 2 - 1;
		mouse.y = - (e.clientY / canvas.clientHeight * 2 - 1);
		console.log(mouse);

		// 좌표변환 후 아래 함수 실행
		

	}) 

}
