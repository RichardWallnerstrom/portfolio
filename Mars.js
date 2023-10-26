import { GLTFLoader } from 
'three/examples/jsm/loaders/GLTFLoader.js';

export default class Mars {
    constructor(scene) {
        this.scene = scene;
        this.loadModel();
    }

    loadModel() {
        const loader = new GLTFLoader();
        loader.load(
            'assets/mars/scene.gltf',
            (gltf) => {
                this.model = gltf.scene;
                this.model.scale.set(0.5, 0.5, 0.5);
                this.model.position.set(20, -150, 10);
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
