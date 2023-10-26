import { GLTFLoader } from 
'three/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from 'three';


export default class SpaceShip {
    constructor(scene) {
        this.model; 
        this.scene = scene;
        this.yAxis = new THREE.Vector3(0, 1, 0); 
        this.loadModel();
    }

    loadModel() {
        const loader = new GLTFLoader();
        loader.load(
            '/assets/space_ship/scene.gltf',
            (gltf) => {
                this.model = gltf.scene;
                this.model.scale.set(0.001, 0.001, 0.001);
                this.model.position.set(0, 0, 0);
                this.model.rotation.set(0, -2, 0);
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
