// three.js에서 필요한 부분만 import
import { Mesh } from 'three';
import { Sphere, Body, Vec3 } from 'cannon-es';


export class MySphere {

    constructor(info) {

        //^ sphere에 필요한 것들을 만들어야 한다. => cannon body와 three mesh
        //^ (생성자로 만든 것들을 객체의 속성으로 등록)
        // 클래스의 생성자(constructor) 함수 내부에서만 사용할거면 그냥 변수로 사용해도 무방하다.
        this.scene = info.scene;
        this.cannonWorld = info.cannonWorld;
        this.geometry = info.geometry;
        this.material = info.material;
        this.x = info.x;
        this.y = info.y;
        this.z = info.z;
        this.scale = info.scale;
        
        this.mesh = new Mesh(this.geometry, this.material);
        this.mesh.scale.set(this.scale, this.scale, this.scale);
        this.mesh.castShadow = true;
        // position은 cannon body를 따라가게 할 것이기 때문에, 원래는 잡을 필요가 없음
        this.mesh.position.set(this.x, this.y, this.z);
        this.scene.add(this.mesh);

        this.setCannonBody();
        
    }


    setCannonBody() {

        const shape = new Sphere(0.5 * this.scale);

        this.cannonBody = new Body({    // this.cannonBody를 사용한 이유는 ex04에서 사용하기 위해
            mass: 1,
            position: new Vec3(this.x, this.y, this.z),
            shape
        });

        this.cannonWorld.addBody(this.cannonBody);

    }

}