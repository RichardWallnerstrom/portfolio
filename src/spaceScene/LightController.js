import * as THREE from 'three';

export default class LightController {
    constructor(scene) {
        this.scene = scene;
        this.sun = new THREE.DirectionalLight(0xfffffff, 1);
        this.sun.position.set(5, 10, 5);
        this.ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
        this.scene.add(this.sun);
        this.scene.add(this.ambientLight);
    }
}

