import * as THREE from 'three';

export const camera = new THREE.PerspectiveCamera(
    75, 
    window.innerWidth / window.innerHeight, 
    0.1, 
    9999
);
camera.position.set(25, 10, 25);