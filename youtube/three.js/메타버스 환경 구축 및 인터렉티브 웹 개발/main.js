import * as THREE from './three.js-master/build/three.module.js';
import { OrbitControls } from "./three.js-master/examples/jsm/controls/OrbitControls.js"
import { GLTFLoader } from "./three.js-master/examples/jsm/loaders/GLTFLoader.js";
import Stats from "./three.js-master/examples/jsm/libs/stats.module.js";
// import dat from './three.js-master/utils/dat.gui.module.js';

class App {
    constructor() {
        this._setupThreeJs();
        this._setupCamera();
        this._setupLight();
        this._setupModel();
        this._setupControls();
        this._setupEvents();
    }

    _setupThreeJs() {
        const divContainer = document.querySelector("#webgl-container");
        this._divContainer = divContainer;

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
        renderer.shadowMap.enabled = true;      // 그림자 넣기
        // renderer.shadowMap.type = THREE.PCFSoftShadowMap;   // 그림자 부드럽게 하기
        renderer.shadowMap.type = THREE.VSMShadowMap;
        // renderer.outputEncoding = THREE.sRGBEncoding
        // renderer.toneMapping = THREE.ACESFilmicToneMapping;
        // renderer.toneMappingExposure = 0.8;
        divContainer.appendChild(renderer.domElement);
        this._renderer = renderer;

        const scene = new THREE.Scene();
        this._scene = scene;
    }

    _setupCamera() {
        const camera = new THREE.PerspectiveCamera(
            60, 
            window.innerWidth / window.innerHeight, 
            1, 
            10000
        );

        camera.position.set(0, 100, 500);
        this._camera = camera;
    }

    _addPointLight(x, y, z, helperColor) {
        const color = "#fff";
        const intensity = 1.5;

        const pointLight = new THREE.PointLight(color, intensity, 2000);
        pointLight.position.set(x, y, z);
        this._scene.add(pointLight);

        const pointLightHelper = new THREE.PointLightHelper(pointLight, 10, helperColor);
        this._scene.add(pointLightHelper);
    }

    _setupLight() {
        const ambientLight = new THREE.AmbientLight(0xffffff, .5);
        this._scene.add(ambientLight);

        this._addPointLight(500, 150, 500, 0xff0000);
        this._addPointLight(-500, 150, 500, 0xffff00);
        this._addPointLight(-500, 150, -500, 0x00ff00);
        this._addPointLight(500, 150, -500, 0x0000ff);

        // 그림자를 위한 directional light
        const shadowLight = new THREE.DirectionalLight(0xffffff, .2);
        shadowLight.position.set(200, 500, 200);
        shadowLight.target.position.set(0, 0, 0);
        this._scene.add(shadowLight);
        this._scene.add(shadowLight.target)
        
        shadowLight.castShadow = true;
        shadowLight.shadow.mapSize.width = 1024;
        shadowLight.shadow.mapSize.height = 1024;
        shadowLight.shadow.camera.top = shadowLight.shadow.camera.right = 700;
        shadowLight.shadow.camera.bottom = shadowLight.shadow.camera.left = -700;
        shadowLight.shadow.camera.near = 100;
        shadowLight.shadow.camera.far = 900;
        shadowLight.shadow.radius = 5;
        const shadowCameraHelper = new THREE.CameraHelper(shadowLight.shadow.camera);
        this._scene.add(shadowCameraHelper);

        const directionalLightHelper = new THREE.DirectionalLightHelper(shadowLight, 10);
        this._scene.add(directionalLightHelper);
    }

    _setupModel() {
        const planeGeometry = new THREE.PlaneGeometry(1000, 1000);
        const planeMaterial = new THREE.MeshPhongMaterial({ color: 0x878787 });
        const plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.rotation.x = -Math.PI / 2;
        this._scene.add(plane);
        plane.receiveShadow = true;

        new GLTFLoader().load('./models/human/untitled.gltf', (gltf) => {
            const model = gltf.scene;
            // console.log(model)
            this._scene.add(model);

            // 모델은 그림자를 생성하기만 한다.
            model.traverse((child) => { 
                if (child instanceof THREE.Mesh) {
                    child.castShadow = true;
                    // child.receiveShadow = true;
                }
            })

            // 월드 좌표계의 축 표시
            const axesHelper = new THREE.AxesHelper(1000);
            this._scene.add(axesHelper);

            // 캐릭터 모델의 바운딩 박스
            const box = (new THREE.Box3).setFromObject(model);
            console.log(box.max.y - box.min.y)
            model.position.y = (box.max.y - box.min.y) * 2;     // 모델의 y축 중간 지점으로 이동

            const boxHelper = new THREE.BoxHelper(model);
            this._scene.add(boxHelper);
            this._boxHelper = boxHelper;
            this._model = model;            
        })
    }

    _setupControls() {
        const orbitControl = new OrbitControls(this._camera, this._divContainer);
        this.controls = orbitControl;

        const stats = new Stats();
        this._divContainer.appendChild(stats.dom);
        this._fps = stats;
    }

    _setupEvents() {
        window.onresize = this.resize.bind(this);
        this.resize();

        this._clock = new THREE.Clock();
        // requestAnimationFrame(this.render.bind(this));
        this._renderer.setAnimationLoop(this.render.bind(this));    // vr 컨텐츠를 만들때 setAnimationLoop를 사용
    }
    
    update() {
        // time *= 0.001; // second unit
        const delta = this._clock.getDelta();
        this.controls.update();       // orbitControl update
        
        if (this._boxHelper) {
            this._boxHelper.update();
        }

        this._fps.update();
    }

    render() {
        this._renderer.render(this._scene, this._camera);   
        this.update();

        // requestAnimationFrame(this.render.bind(this));
        this._renderer.setAnimationLoop(this.render.bind(this));    // vr 컨텐츠를 만들때 setAnimationLoop를 사용
    }

    resize() {
        const width = this._divContainer.clientWidth;
        const height = this._divContainer.clientHeight;

        this._camera.aspect = width / height;
        this._camera.updateProjectionMatrix();
        
        this._renderer.setSize(width, height);
        // this._renderer.render(this._scene, this._camera);
    }
}

window.onload = function () {
    new App();
}