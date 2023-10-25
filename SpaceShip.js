import { GLTFLoader } from 
'three/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from 
"https://cdn.skypack.dev/three@0.132.2/build/three.module.js";

export default class SpaceShip {
    constructor(scene) {
        this.scene = scene;
        this.yAxis = new THREE.Vector3(0, 1, 0); 
        this.loadModel();
    }

    loadModel() {
        const loader = new GLTFLoader();
        loader.load(
            'assets/space_ship/scene.gltf',
            (gltf) => {
                this.model = gltf.scene;
                this.model.scale.set(0.01, 0.01, 0.01);
                this.model.position.set(20, -1, 1);
                this.model.rotation.set(0, 11, 0);
                this.scene.add(this.model);
            },
            (xhr) => {
                console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
            },
            (error) => {
                console.error('ERROR: ', error);
            }
        );
    }
    moveForward(speed) {
        this.model.translateZ(+speed);
    }

    moveBackward(speed) {
        this.model.translateZ(-speed);
    }

    turnLeft(speed) {
        this.model.rotateOnAxis(this.yAxis, speed); 
    }

    turnRight(speed) {
        this.model.rotateOnAxis(this.yAxis, -speed); 
    }
    
}
