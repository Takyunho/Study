import * as THREE from 'three';
import { GLTFLoader } from 'GLTFLoader';
import { CSS3DRenderer, CSS3DObject } from 'CSS3D';
// import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.124/examples/jsm/controls/OrbitControls.js";
import { OrbitControls } from "OrbitControls";


var camera, root, scene, renderer, renderer2, windowHalfX, windowHalfY;
var mouseX = 0, mouseY = 0;
var sphere;
var light
var controls
var lightMovementAmplitude = 200

init();
animate(performance.now());

function init() {

    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    //! 카메라(camera)
    const fov = 45;
    const aspect = window.innerWidth / window.innerHeight;
    const near = 0.1;
    const far = 4000;
    //* 원근 카메라
    camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
    camera.position.set(0, 0, 500); //* 카메라 포지션 x, y, z

    //! scene(장면)
    scene = new THREE.Scene()

    //~ Object3D를 이용해 겹치도록 만듦 
    root = new THREE.Object3D()
    root.position.y = 10
    root.rotation.y = Math.PI / 3
    scene.add(root)
    

    const button = makeElementObject('button', 75, 20)
    
    button.css3dObject.element.style.background = new THREE.Color(
        Math.random() * 0.21568627451 + 0.462745098039,
        Math.random() * 0.21568627451 + 0.462745098039,
        Math.random() * 0.21568627451 + 0.462745098039,
    ).getStyle();
    button.css3dObject.element.style.border = '1px solid orange'
    button.css3dObject.element.textContent = "Click!"
    button.css3dObject.element.addEventListener('click', () => alert('Button clicked!'))
    button.position.y = 10
    button.position.z = 10
    root.add(button)


    // light
    ~function() {
        var ambientLight = new THREE.AmbientLight( 0x353535 );
        root.add( ambientLight );

        light = new THREE.PointLight( 0xffffff, 1, 0 );
        light.castShadow = true;
        light.position.x = -300;
        light.position.y = 0;
        light.position.z = 150;
        light.shadow.mapSize.width = 256;  // default
        light.shadow.mapSize.height = 256; // default
        light.shadow.camera.near = 1;       // default
        light.shadow.camera.far = 2000;      // default
        light.shadow.bias = -0.001;
        
        scene.add( new THREE.PointLightHelper( light, 5 ) )

        root.add( light );
    }()

    //! 렌더러
    renderer2 = new CSS3DRenderer();
    renderer2.setSize( window.innerWidth, window.innerHeight );
    renderer2.domElement.style.position = 'absolute';
    renderer2.domElement.style.top = 0;
    document.querySelector('#css').appendChild( renderer2.domElement );

    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setClearColor( 0x000000, 0 );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
    document.querySelector('#webgl').appendChild( renderer.domElement );

    // document.addEventListener( 'mousemove', onDocumentMouseMove, false );


    //* controls
    controls = new OrbitControls(camera, renderer2.domElement);
    console.log(controls)
    controls.enableDamping = true;
    // controls.listenToKeyEvents( window );
    // controls.rotateSpeed = 1;
    controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    controls.minDistance = 100;
    controls.maxDistance = 400;
    controls.maxPolarAngle = Math.PI / 2; // 축을 기준으로 회전하도록(아래를 볼 수 없음)

    //^ gltf 불러오기
    const gltfloader = new GLTFLoader();
    gltfloader.load(
    './models/machine.glb',
        gltf => {
        console.log("gltf : ", gltf)
        const mesh = gltf.scene.children[0]
        console.log(mesh)
        // mesh.scale.x = 300;
        // mesh.scale.y = 300;
        // mesh.scale.z = 300;
        mesh.scale.x = 2400;
        mesh.scale.y = 2400;
        mesh.scale.z = 2400;
        mesh.position.set(10, -50, 80)
        
        // mesh.position.set(0, 0 ,400)
        root.add(mesh)

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

function onWindowResize() {

    const aspect = window.innerWidth / window.innerHeight;

    // camera.left = - frustumSize * aspect / 2;
    // camera.right = frustumSize * aspect / 2;
    // camera.top = frustumSize / 2;
    // camera.bottom = - frustumSize / 2;

    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer2.setSize( window.innerWidth, window.innerHeight );

}



function animate(time) {
    
    // light.position.x = 30 * Math.sin(time * 0.003);
    // light.position.y = 40 * Math.cos(time * 0.002) - 80;

    scene.updateMatrixWorld()

    renderer.render( scene, camera );
    renderer2.render( scene, camera );

    requestAnimationFrame( animate );
}


//^ dom을 만드는 함수
function makeElementObject(type, width, height) {
    const obj = new THREE.Object3D

    const element = document.createElement( type );
    element.style.width = width+'px';
    element.style.height = height+'px';
    element.style.opacity = 0.999;

    var css3dObject = new CSS3DObject( element );
    obj.css3dObject = css3dObject
    obj.add(css3dObject)

    // make an invisible plane for the DOM element to chop
    // clip a WebGL geometry with it.
    var material = new THREE.MeshPhongMaterial({
        opacity	: 0,
        color	: new THREE.Color( 0x111111 ),
        blending: THREE.NoBlending,
        side	: THREE.DoubleSide,
    });
    var geometry = new THREE.BoxGeometry( width, height, 0.1 );
    var mesh = new THREE.Mesh( geometry, material );
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    
    obj.lightShadowMesh = mesh
    obj.add( mesh );

    return obj
}