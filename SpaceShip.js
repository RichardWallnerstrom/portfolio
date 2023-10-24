import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export default class SpaceShip {
    constructor(scene) {
        this.scene = scene;
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
    rotate() {
        this.model.rotation.y += 0.01; 
    }
}
