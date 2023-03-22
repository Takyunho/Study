import { Mesh, BoxGeometry, MeshBasicMaterial, MathUtils, Box3, Vector3 } from 'three';
import { Body, Box, Vec3 } from 'cannon-es';
import { degToRad } from 'three/src/math/MathUtils';

export class Domino {
    constructor(info) {
        this.scene = info.scene;
        this.cannonWorld = info.cannonWorld;
		
        // 도미노의 너비, 높이, 깊이(크기)
        this.width = info.width || 0.6;
        this.height = info.height || 1;
        this.depth = info.depth || 0.2;
        // this.width = info.width || 2.11;
        // this.height = info.height || 4.2;
        // this.depth = info.depth || 0.86;

        // 도미노의 x, y, z 위치(좌표)
        this.x = info.x || 0;
        this.y = info.y || 0.5;
        this.z = info.z || 0;

        // 도미노의 회전각도
        // this.rotationZ = info.rotationZ || MathUtils.degToRad(90);
        this.rotationY = info.rotationY || 0;

        //- gltfLoader 사용을 위해 webpack.config.js에서 CopyWebpackPlugin의 pattern 경로 수정필요
        //- 경로 수정 후 서버 종료하고 npm start로 서버 재구동 필요
        info.gltfLoader.load(
            './domino/domino.glb',
            gltf => {
                // console.log(gltf.scene)

                //---------- 로드한 gltf 너비, 높이, 깊이 측정
                // const root = gltf.scene.children[0];
                // const box = new Box3().setFromObject(root);

                // const width = box.max.x - box.min.x;
                // const height = box.max.y - box.min.y;
                // const depth = box.max.z - box.min.z;

                // console.log(`width: ${width}, height: ${height}, depth: ${depth}`)
                // ---------- 끝


                this.modelMesh = gltf.scene.children[0];
                this.modelMesh.name = `${info.index}번 도미노`
                this.modelMesh.castShadow = true;   // mesh니까 castShadow 사용 가능
                this.modelMesh.position.set(this.x, this.y, this.z);
                this.scene.add(this.modelMesh);

                this.setCannonBody();   // gltf 파일마다 cannonBody 추가
            }
        );

    }

    setCannonBody() {
        const shape = new Box(new Vec3(this.width / 2, this.height / 2, this.depth / 2));
        this.cannonBody = new Body({
            mass: 1,
            position: new Vec3(this.x, this.y, this.z),
            shape,
        });

        this.cannonBody.quaternion.setFromAxisAngle(
            new Vec3(0, 1, 0),  // y축
            this.rotationY
        );
        
        this.cannonWorld.addBody(this.cannonBody)
    }
}


  // copy 메소드를 이용해서 cannonBody에 복사?
                // this.modelMesh.scale.copy(캐논바디)
                