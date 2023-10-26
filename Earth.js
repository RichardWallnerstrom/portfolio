import { GLTFLoader } from 
'three/examples/jsm/loaders/GLTFLoader.js';

export default class Earth {
    constructor(scene) {
        this.scene = scene;
        this.loadModel();
    }

    loadModel() {
        const loader = new GLTFLoader();
        loader.load(
            'assets/earth/scene.gltf',
            (gltf) => {
                this.model = gltf.scene;
                this.model.scale.set(0.1, 0.1, 0.1);
                this.model.position.set(20, -100, 10);
                this.model.rotation.set(0, 20, 10);
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
