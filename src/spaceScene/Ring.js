import * as THREE from 'three';

export default class Ring {
    constructor(scene, size, coordinates) {
        this.scene = scene;
        this.size = size;
        this.coordinates = coordinates;
        this.createModel();
    }

    createModel() {
        const radius = 300; 
        const tubeRadius = 5.5;
        const radialSegments = 15;
        const tubularSegments = 100;
        const ringGeometry = new THREE.TorusGeometry(radius, tubeRadius, radialSegments, tubularSegments);
        const ringMaterial = new THREE.MeshBasicMaterial({ color: 0xFFFFFFF, side: THREE.DoubleSide }); 
        this.model = new THREE.Mesh(ringGeometry, ringMaterial);
        this.model.rotation.z = Math.PI / 2; 
        if (this.coordinates && this.coordinates.length === 3) { // No idea why it breaks without this IF statement ???
            this.model.position.set(this.coordinates[0], this.coordinates[1], this.coordinates[2]);
            this.scene.add(this.model);
        } else {
            console.error("Invalid coordinates for creating the ring.");
        }     
    }
}
