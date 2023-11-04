import { GLTFLoader } from 
'three/examples/jsm/loaders/GLTFLoader.js';

export default class Planet {
    constructor(scene, planet, size, coordinates) {
        this.scene = scene;
        this.planet = planet;
        this.size = size;
        this.coordinates = coordinates;
        this.loadModel();
    }

    loadModel() {
        const loader = new GLTFLoader();
        const {planet, size, coordinates} = this;
        loader.load(
            `../assets/${this.planet}/scene.gltf`,
            (gltf) => {
                this.model = gltf.scene;
                this.model.scale.set(this.size, this.size, this.size);
                this.model.position.set(coordinates[0], coordinates[1], coordinates[2]);                
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
