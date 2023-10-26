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
                this.model.scale.set(0.6, 0.6, 0.6);
                this.model.position.set(4000, -100, -200);
                this.model.rotation.set(0, 20, 0);
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
        this.model.rotation.y += 0.0001; 

    }
}
