import * as THREE from '../build/three.module.js';
// import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

//* 파티클 클래스 정의
class Particle {
    constructor(scene, geometry, material, x, y) {
        const mesh = new THREE.Mesh(geometry, material);    // 생성자의 인자로 받은 객체와 값을 통해서 mesh 생성
        mesh.position.set(x, y, 0); // mesh 위치 지정
        scene.add(mesh);    // scene에 mesh 추가
        mesh.wrapper = this;    // mesh의 wrapper 속성에 파티클 객체를 저장
        this.awakenTime = undefined;
        this._mesh = mesh;
    }

    awake(time) {
        if (!this.awakenTime) {
            this.awakenTime = time;
        }
    }

    update(time) {
        // 만약 마우스 커서가 큐브를 건드려서 파티클의 awake 메소드가 호출되면 awakenTime값이 지정되고,
        // awakenTime이 지정되었으면
        if (this.awakenTime) {
            // 마우스 커서가 큐브를 건드리면 12초동안 움직이도록 period로 정의
            const period = 12.0;
            // 그 메소드가 호출됐을때의 시간차이를 구함
            const t = time - this.awakenTime;   // t의 단위는 second
            if (t >= period) this.awakenTime = undefined;

            this._mesh.rotation.x = THREE.MathUtils.lerp(0, Math.PI * 2 * period, t / period);

            // 마우스 피킹시 파티클 효과 색상 주기
            let h_s, l;
            if (t < period / 2) {
                h_s = THREE.MathUtils.lerp(0.0, 1.0, t / (period / 2));
                l = THREE.MathUtils.lerp(0.1, 1.0, t / (period / 2));
            } else {
                h_s = THREE.MathUtils.lerp(1.0, 0.0, t / (period / 2.0) - 1);
                l = THREE.MathUtils.lerp(1.0, 0.1, t / (period / 2.0) - 1);
            }

            this._mesh.material.color.setHSL(h_s, h_s, l);
        }
    }

}

class App {
    constructor() {
        const divContainer = document.querySelector("#webgl-container");
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
        this._setupPicking();   //* 마우스가 올려진 큐브를 확인하기 위한 메서드

        window.onresize = this.resize.bind(this);
        this.resize();

        requestAnimationFrame(this.render.bind(this));
    }

    _setupControls() {
        new OrbitControls(this._camera, this._divContainer);
    }

    //* 마우스가 올려진 큐브를 확인하기 위한 부분
    _setupPicking() {
        const raycaster = new THREE.Raycaster();  // picking을 위한 raycaster 객체를 생성
        raycaster.cursorNormalizedPosition = undefined;  // 현재 마우스 커서의 위치를 raycaster 객체의 커서노말라이즈포지션 속성에 저장
        this._divContainer.addEventListener("mousemove", this._onMouseMove.bind(this));
        this._raycaster = raycaster;
    }

    //* 마우스 이동 이벤트
    _onMouseMove(event) {
        const width = this._divContainer.clientWidth;
        const height = this._divContainer.clientHeight;
        // three.js에서는 피킹을 위해 마우스 커서의 위치를 -1~1사이의 값으로 정규화 해야한다.
        // 아래 두줄이 정규화 코드
        const x = (event.offsetX / width) * 2 - 1;
        const y = -(event.offsetY / height) * 2 + 1;    // y값 정규화인 경우 -로 지정한 이유는 일반적인 화면에서 y좌표는 아래쪽으로 증가하는 반면, three.js에서 y좌표는 위쪽 방향으로 증가하기 때문이다.

        this._raycaster.cursorNormalizedPosition = { x, y };
    }

    // 모델(큐브) 만드는 부분
    _setupModel() {
        const geometry = new THREE.BoxGeometry();   //@ 큐브에대한 지오메트리 객체를 정의
        
        // 이중 for문
        for (let x = -20; x <= 20; x += 1.1){
            for (let y = -20; y <= 20; y += 1.1) {
                const color = new THREE.Color();
                color.setHSL(0, 0, 0.1);    //@ 재질에 대한 색상 / HSL 방식적용 / HSL = Hue(색상/색조), Saturation(채도), Lightness(명도) (0~1까지)
                const material = new THREE.MeshStandardMaterial({ color }); //@ 재질 정의

                //* 파티클 객체 생성
                new Particle(this._scene, geometry, material, x, y) //@ x, y = 큐브의 위치
            }
        }
    }

    
    _setupCamera() {
        const camera = new THREE.PerspectiveCamera(
            75, 
            window.innerWidth / window.innerHeight, 
            0.1, 
            100
        );

        camera.position.z = 40;
        this._camera = camera;
    }

    _setupLight() {
        const color = 0xffffff;
        const intensity = 1;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(-1, 2, 4);
        this._scene.add(light);
    }

    update(time) {
        time *= 0.001; // second unit

        // 마우스커서의 위치에 큐브를 얹는 코드 
        // raycaster 객체와 raycaster객체의 정규화된 마우스 커서위치가 유효하다면 안의 함수 실행
        if (this._raycaster && this._raycaster.cursorNormalizedPosition) {
            this._raycaster.setFromCamera(this._raycaster.cursorNormalizedPosition, this._camera);  // 피킹을위한 광선 생성
            const targets = this._raycaster.intersectObjects(this._scene.children); // 광선과 교차하는 객체 얻어옴
            // 교차하는 객체가 1개 이상이라면
            if (targets.length > 0) {
                const mesh = targets[0].object;  // 첫번째 객체 얻어오기 / 첫번째 객체 = 카메라 위치를 기준으로 가장 가까운 객체
                const particle = mesh.wrapper;  // mesh에 연결된 particle 객체에 접근할 수 있음
                particle.awake(time);
            } 
        }

        // 파티클 클래스의 update 메소드를 호출
        this._scene.traverse((obj3d) => {
            if (obj3d instanceof THREE.Mesh) {
                obj3d.wrapper.update(time);
            }
        })


    }

    render(time) {
        this._renderer.render(this._scene, this._camera);   
        this.update(time);

        requestAnimationFrame(this.render.bind(this));
    }

    resize() {
        const width = this._divContainer.clientWidth;
        const height = this._divContainer.clientHeight;

        this._camera.aspect = width / height;
        this._camera.updateProjectionMatrix();
        
        this._renderer.setSize(width, height);
    }
}

window.onload = function () {
    new App();
}