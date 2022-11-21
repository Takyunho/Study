import * as THREE from '../build/three.module.js';
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.124/examples/jsm/controls/OrbitControls.js";


class App {

  constructor() {
    const divContainer = document.querySelector('#webgl-container');
    this._divContainer = divContainer;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    divContainer.appendChild(renderer.domElement);
    this._renderer = renderer;

    const scene = new THREE.Scene();
    this._scene = scene;

    this._setupCamera();
    this._setupLight();
    this._setupModel();
    this._setupControls();

    window.onresize = this.resize.bind(this);
    this.resize();  // 창 크기에 맞게 설정

    requestAnimationFrame(this.render.bind(this));
  }

  // 마우스로 회전
  // 카메라 객체와 마우스 이벤트를 받는 dom요소가 필요함
  _setupControls() {
    new OrbitControls(this._camera, this._divContainer);
  }

  _setupCamera() {
    const width = this._divContainer.clientWidth;
    const height = this._divContainer.clientHeight;
    const camera = new THREE.PerspectiveCamera(
      75,
      width / height,
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
    // 회색 geometry
    const fillMaterial = new THREE.MeshPhongMaterial({ color: 0x515151 });
    // const material = new THREE.MeshPhongMaterial({ color: 0x44a88 });
    const cube = new THREE.Mesh(geometry, fillMaterial);

    // 노란색 geometry
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0xffff00 });
    const line = new THREE.LineSegments(
      new THREE.WireframeGeometry(geometry), lineMaterial );  // WireframeGeometry은 대각선을 표시하게 해준다.
    
    // Mesh 오브젝트와 Line 오브젝트를 하나의 오브젝트로 다루기 위해 Group으로 묶음
    const group = new THREE.Group()
    group.add(cube);
    group.add(line);

    // this._scene.add(cube);
    this._scene.add(group);
    this._cube = group;
  }

  resize() {
    const width = this._divContainer.clientWidth;
    const height = this._divContainer.clientHeight;

    this._camera.aspect = width / height;
    this._camera.updateProjectionMatrix();

    this._renderer.setSize(width, height);
  }

  render(time) {
    this._renderer.render(this._scene, this._camera);
    this.update(time);
    requestAnimationFrame(this.render.bind(this));
  }

  update(time) {
    time *= 0.001;
    // this._cube.rotation.x = time;
    // this._cube.rotation.y = time;

    // 마우스로 회전
  }

}

window.onload = function () {
  new App();
}