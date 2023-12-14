import * as THREE from 'three';

export default class Ring {
    constructor(id, scene, size, coordinates) {
        this.id = id;
        this.scene = scene;
        this.planet = planet;
        this.size = size;
        this.coordinates = coordinates;
        this.loadModel();
    }

    loadModel() {
    const radius = 500; 
    const tubeRadius = 0.5;
    const radialSegments = 15;
    const tubularSegments = 100;
    const ringGeometry = new THREE.TorusGeometry(radius, tubeRadius, radialSegments, tubularSegments);
    const ringMaterial = new THREE.MeshBasicMaterial({ color: 0x555555, side: THREE.DoubleSide }); 
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.rotation.x = Math.PI / 2; 
    ring.position.set(0, 2, 0); 
    this.spaceScene.scene.add(ring);        const {planet, size, coordinates} = this;
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
