// import * as THREE from 'three';
// import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import * as THREE from './three.js-master/build/three.module.js';
import { OrbitControls } from "./three.js-master/examples/jsm/controls/OrbitControls.js"    // 경로 변경 필요 
import dat from './three.js-master/utils/dat.gui.module.js';

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
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;   // 그림자 부드럽게 하기
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
            75, 
            window.innerWidth / window.innerHeight, 
            0.1, 
            100
        );

        camera.position.z = 2;
        this._camera = camera;
    }

    _setupLight() {
        const color = 0xffffff;
        const intensity = 1;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(-1, 2, 4);
        this._scene.add(light);
    }

    _setupModel() {
        const geometry = new THREE.BoxGeometry(1, 1, 1);

        const material = new THREE.MeshPhongMaterial({color: 0x44a88});

        const cube = new THREE.Mesh(geometry, material);
        this._scene.add(cube);
    }

    _setupControls() {
        const orbitControl = new OrbitControls(this._camera, this._divContainer);
        this._orbitControl = orbitControl;
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
        this._orbitControl.update();       // orbitControl update
        
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