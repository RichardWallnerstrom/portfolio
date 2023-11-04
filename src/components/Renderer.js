import * as THREE from 'three';

export default class Renderer {
    constructor() {
        this.renderer = new THREE.WebGLRenderer() 
        this.renderer.setSize(innerWidth, innerHeight)
        this.renderer.setPixelRatio(devicePixelRatio)
        document.body.appendChild(this.renderer.domElement);
        this.renderer.setAnimationLoop(this.render);
    }
}

