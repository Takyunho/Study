// y축을 기준으로 gltf가 같이 움직이는 문제점이 있음

import { GLTFLoader } from 'GLTFLoader';
import * as THREE from 'three';
import { CSS3DRenderer, CSS3DObject } from 'CSS3D';
import { OrbitControls } from "OrbitControls";

let camera, scene, renderer, renderer2, windowHalfX, windowHalfY;
// let mouseX = 0, mouseY = 0;
let controls;
let light;
let lookAt = new THREE.Vector3(0, 0, 0);
// let lightMovementAmplitude = 200;

init();
animate(performance.now());

function init() {
  // windowHalfX = window.innerWidth / 2;  //* 창사이즈 너비의 절반
  // windowHalfY = window.innerHeight / 2; //* 창사이즈 높이의 절반

  //! scene(장면)
  scene = new THREE.Scene();  //* 장면 생성

  //! 카메라(camera)
  const fov = 20;
  const aspect = window.innerWidth / window.innerHeight;
  const near = 0.1;
  const far = 5000;
  //* 원근 카메라
  camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
  camera.position.set(0, 0, 400); //* 카메라 포지션 x, y, z

  
  

  //! light(조명)
  ~(function () {
    // let ambientLight = new THREE.AmbientLight(0x999999);
    let ambientLight = new THREE.AmbientLight('white', 0.5);
    scene.add(ambientLight);

    // light = new THREE.PointLight('white', 2);
    light = new THREE.DirectionalLight('white', 2);
    light.castShadow = true;  // true로 설정하면 다이나믹한 그림자가 드리워짐 (비용이 많이들고, 그림자가 제대로 보이도록 조정해야하는 단점이 있다.)
    light.position.z = 100;
    // light.shadow.mapSize.width = 512; // default
    // light.shadow.mapSize.height = 512; // default
    // light.shadow.camera.near = 1; // default
    // light.shadow.camera.far = 10000; // default
    // light.shadow.bias = 0; // default
    // console.log(light)

    //scene.add(new THREE.PointLightHelper(light, 5));  //* 조명 포인트를 도와주는 부분

    scene.add(light);
  })();


  //! 렌더러2 
  // renderer2 = new THREE.CSS3DRenderer();
  renderer2 = new CSS3DRenderer();  //^ import 해서 쓰는경우 THREE를 제거해야한다.
  // console.log(renderer2)
  renderer2.setSize(window.innerWidth, window.innerHeight);
  renderer2.domElement.style.position = "absolute";
  renderer2.domElement.style.top = 0;
  document.querySelector("#css").appendChild(renderer2.domElement);

  //! 렌더러
  renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true
  });
  // console.log(renderer)
  // renderer.setClearColor(0x000000, 0);
  // 필수
  renderer.setPixelRatio(window.devicePixelRatio);  //* 사이즈
  renderer.setSize(window.innerWidth, window.innerHeight);  //* 사이즈
  renderer.shadowMap.enabled = true;
  // 필수 x 
  renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
  document.querySelector("#webgl").appendChild(renderer.domElement);  //* 필수




  // for (let i = 0; i < 1; i++) { //* 5개의 포스트잇 생성
    // let elementObj = makeElementObject("div", 15, 20);  //* obj를 리턴받음
    // // console.log(elementObj)
    // elementObj.css3dObject.element.textContent = "";
    // elementObj.css3dObject.element.setAttribute("contenteditable", ""); //* 지워도 같음
    // // elementObj.position.x = Math.random() * 600 - 300;  //* x축
    // // elementObj.position.y = Math.random() * 600 - 300;  //* y축
    // // elementObj.position.z = Math.random() * 800 - 600;  //* z축
    // elementObj.position.x = 10;  //* x축
    // elementObj.position.y = -30;  //* y축
    // elementObj.position.z = 43;  //* z축
  
  //^ 버튼
  // setColor();
  let button = makeElementObject('div', 5, 5)
  console.log(button)
  // button.css3dObject.element.style.background = new THREE.Color(
  //   Math.random() * 0.21568627451 + 0.462745098039,
  //   Math.random() * 0.21568627451 + 0.462745098039,
  //   Math.random() * 0.21568627451 + 0.462745098039,
  // ).getStyle();
  
  button.css3dObject.element.style.border = 'none'
  button.css3dObject.element.style.borderRadius = '100%'
  // button.css3dObject.element.style.fontSize = '1px'
  button.css3dObject.element.style.cursor = 'pointer'
  // button.css3dObject.element.textContent = ""
  
  button.css3dObject.element.style.transition = 'all .5s'
  button.position.x = 10;  //* x축
  button.position.y = -10;  //* y축
  button.position.z = 60;  //* z축

  //@ 상태에 따라 색 변경
  if (false) {
    button.css3dObject.element.className = "animate_red alarmDot"
    button.css3dObject.element.style.background = new THREE.Color("#FF0000").getStyle();
  } else {
    button.css3dObject.element.className = "animate_green alarmDot"
    button.css3dObject.element.style.background = new THREE.Color("#00B34A").getStyle();
  }
  scene.add(button)
  
  //@ 버튼 이벤트리스너
  button.css3dObject.element.addEventListener('pointerdown', () => { 
    console.log("ddd")
    alert('Button clicked!')
  })

  // ! 버튼 2
  // const button2 = makeElementObject('button', 75, 20)
    
  //   button2.css3dObject.element.style.background = new THREE.Color(
  //       Math.random() * 0.21568627451 + 0.462745098039,
  //       Math.random() * 0.21568627451 + 0.462745098039,
  //       Math.random() * 0.21568627451 + 0.462745098039,
  //   ).getStyle();
  //   button2.css3dObject.element.style.border = '1px solid orange'
  //   button2.css3dObject.element.textContent = "Click me!"
  //   button2.css3dObject.element.addEventListener('pointerdown', () => { 
  //   console.log("테스트2")

  // })
  //   // button2.position.y = 10
  //   // button2.position.z = 10
  //   scene.add(button2)



  //^ div요소 
  let elementObj2 = makeElementObject("div", 5, 5);  //* obj를 리턴받음
  // console.log(elementObj2)
  elementObj2.css3dObject.element.textContent = "";
  elementObj2.css3dObject.element.setAttribute("contenteditable", ""); //* 지워도 같음
  // elementObj.position.x = Math.random() * 600 - 300;  //* x축
  // elementObj.position.y = Math.random() * 600 - 300;  //* y축
  // elementObj.position.z = Math.random() * 800 - 600;  //* z축
  elementObj2.css3dObject.element.style.border = 'none'
  elementObj2.css3dObject.element.style.borderRadius = '100%'
  // button.css3dObject.element.style.fontSize = '1px'
  elementObj2.css3dObject.element.style.cursor = 'pointer'
  // button.css3dObject.element.textContent = ""
  elementObj2.css3dObject.element.style.transition = 'all .5s'
  elementObj2.position.x = 27;  //* x축
  elementObj2.position.y = -7;  //* y축
  elementObj2.position.z = 75;  //* z축
  // elementObj2.rotation.x = 
  elementObj2.rotation.y = 1.6
  // elementObj2.rotation.z = Math.random();

  if (true) {
    elementObj2.css3dObject.element.className = "animate_red alarmDot"
    elementObj2.css3dObject.element.style.background = new THREE.Color("#FF0000").getStyle();
  } else {
    elementObj2.css3dObject.element.className = "animate_green alarmDot"
    elementObj2.css3dObject.element.style.background = new THREE.Color("#00B34A").getStyle();
  }

  //* x, y, z축으로 랜덤으로 돌려서 흩뿌려지게 함
  // elementObj.rotation.x = Math.random();
  // elementObj.rotation.y = Math.random();
  // elementObj.rotation.z = Math.random();
  scene.add(elementObj2);  //* 장면에 요소 추가
  
  // } // for문 끝




  

  // 마우스 이동
  // document.addEventListener("mousemove", onDocumentMouseMove, false);

  //* controls
  controls = new OrbitControls(camera, renderer2.domElement);
  // console.log(controls)
  // controls.listenToKeyEvents( window );
  // controls.rotateSpeed = 1;
  controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
  controls.dampingFactor = 0.05;
  controls.screenSpacePanning = false;
  // controls.minDistance = 200;
  // controls.maxDistance = 500;
  // controls.maxPolarAngle = Math.PI / 2; // 축을 기준으로 회전하도록(아래를 볼 수 없음)
  // controls.update();
  controls.addEventListener('change', render);


  //^ --------- gltf 불러오기 ----------------
  const gltfloader = new GLTFLoader();
  gltfloader.load(
    './models/Machine_AMR.glb',
    gltf => {
      // console.log("gltf : ", gltf)
      const mesh = gltf.scene.children[0]
      // console.log(mesh)
      // mesh.scale.x = 300;
      // mesh.scale.y = 300;
      // mesh.scale.z = 300;
      mesh.scale.x = 20;
      mesh.scale.y = 20;
      mesh.scale.z = 20;
      mesh.position.set(10, -20, 80)
      
      // mesh.position.set(0, 0 ,400)
      scene.add(mesh)

      // function animation() {
      //   requestAnimationFrame(animation);
      //   mesh.rotation.y -= 0.01;

      //   renderer.render(scene, camera);
      // }
      // animation();

    }
  )



  window.addEventListener( 'resize', onWindowResize );
}

// //* 마우스를 따라 구가 이동되도록 하는 함수
// function onDocumentMouseMove(event) {
//   mouseX = event.clientX - windowHalfX;
//   mouseY = event.clientY - windowHalfY;
// }


function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);

  render();

}


function animate(time) {
  // sphere.position.x += (mouseX - sphere.position.x) * 0.02;
  // sphere.position.y += (-mouseY - sphere.position.y) * 0.02;

  //* 조명이 자동으로 x축과 y축으로 자동으로 왔다갔다 할 수 있게 하는 부분
  // light.position.x = 30 * Math.sin(time * 0.003); 
  // light.position.y = 30 * Math.cos(time * 0.002);

  // scene.updateMatrixWorld();

  //* lookAt 메소드를 이용해 마우스를 따라 구가 이동되도록 함
  // lookAt.setFromMatrixPosition(sphere.matrixWorld);
  // camera.lookAt(lookAt);  //* lookAt 변수 => new THREE.Vector3(0, 0, 0);

  
  requestAnimationFrame(animate);
  
  controls.update();
}


function render() {
  //* 렌더러 구현
  renderer.render(scene, camera); 
  renderer2.render(scene, camera);

}


//^ div 요소를 만드는 함수
//^ type은 'div' , width는 100, height는 100
function makeElementObject(type, width, height) {
  const obj = new THREE.Object3D(); //! Object3D를 이용해 같이 이동되도록
  // console.log(obj)
  // const color = new THREE.Color(  //* div요소의 컬러를 랜덤으로 지정
  //   Math.random() * 0.21568627451 + 0.462745098039,
  //   Math.random() * 0.21568627451 + 0.462745098039,
  //   Math.random() * 0.21568627451 + 0.462745098039
  // );

  //& 요소를 만들고 스타일을 지정하는 부분 
  const element = document.createElement(type); //* 'div'요소를 생성
  element.style.width = width + "px"; //* 'div'요소의 너비 지정 (파라미터로 전달받음)
  element.style.height = height + "px"; //* 'div' 요소의 높이 지정 ( "" )
  element.style.opacity = 1;  //* 투명도 지정
  // element.style.background = color.getStyle();  //* 배경색을 지정

  let css3dObject = new CSS3DObject(element); //* 위에서 설정한 요소를 인자로 넣어서 생성
  // console.log(css3dObject)
  obj.css3dObject = css3dObject;  //* obj의 css3dObject 속성에 위에서 만든 요소를 지정
  obj.add(css3dObject);

  // make an invisible plane for the DOM element to chop
  // clip a WebGL geometry with it.
  let material = new THREE.MeshPhongMaterial({  //* material 만들기
    opacity: 0,
    color: new THREE.Color(/*color*/ 0x111111),
    blending: THREE.NoBlending, //* ???
    side: THREE.DoubleSide, //* 더블사이드로 해야 마우스를 돌려도 양면이 다 보임
  });
  let geometry = new THREE.BoxGeometry(width, height, 1); //* geometry 만들기 (박스지오메트리)
  let mesh = new THREE.Mesh(geometry, material);  //* geometry + material = MESH
  // console.log(mesh)
  mesh.castShadow = true; //* mesh 오브젝트에 castShadow 추가??? 무슨역할?
  mesh.receiveShadow = true;  //* ??
  obj.lightShadowMesh = mesh;
  obj.add(mesh);

  return obj;
} // makeElementObject 끝















// let cmd = 'http://183.111.79.76:8086/query?db=idbSensor&q=select time, fire, img_name from fireState where time <= now() and time >= now()-10m order by time desc limit 1'
// let image = '';

// function setLamp() {
//     fetch(cmd)
//     .then(response => response.json())
//     .then(parsedResponse => {
//         console.log(parsedResponse)
//         value = parsedResponse.results[0].series[0].values[0];
//         image = value[2];
//         console.log(image)
//         // document.getElementById("alarm").addEventListener('click',function(){
//         //     window.open("http://idb.ai:5000/get_image?fn="+image, "a", "width=800, height=500, left=100, top=50"); 
//         // })

//         setColor(value[1])
//     })
//     .catch( error => {
//         document.getElementById("alarm").style = "background-color: #A0A1A3"
//         document.getElementById("alarm").className = "noAnimate alarmDot"
//         document.getElementById("alarm").style.transition = "all .5s";
//         console.log(error)
//     });
// }

// setColor(1)
function setColor(){
    if (true) {
        document.getElementById("alarm").style = "background-color: #FF0000"
        document.getElementById("alarm").className = "animate alarmDot"
        document.getElementById("alarm").style.transition = "all .5s";
    } else {
        document.getElementById("alarm").style = "background-color: #00B34A"
        document.getElementById("alarm").className = "noAnimate alarmDot"
        document.getElementById("alarm").style.transition = "all .5s";
    }
}