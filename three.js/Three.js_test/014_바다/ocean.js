import * as THREE from './three.module.js';

import { OrbitControls } from './OrbitControls.js';
import { Water } from './Water.js';

init();

function init() {
    
    const container = document.getElementById("container");
    // console.log(container)

    const renderer = new THREE.WebGLRenderer({
        contatiner: container,  // container로 축약 가능하긴 함
        antialias: true
    });
    // console.log(renderer);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
    // renderer.toneMapping = THREE.ACESFilmicToneMapping;

    // scene
    const scene = new THREE.Scene();
    console.log(scene)

    // camera
    const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 1, 20000);
    camera.position.set(30, 30, 100);

    // Water
    const waterGeometry = new THREE.PlaneGeometry(200, 200);
    
    const water = new Water(waterGeometry, {
        textureWidth: 512,
        textureHeight: 512,
        waterNormals: new THREE.TextureLoader().load('./waternormals.jpg', function (texture) {
            texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        } )
    })


}