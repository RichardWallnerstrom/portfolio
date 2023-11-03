import * as THREE from 'three';

export const light = new THREE.DirectionalLight(0xfffffff, 1);
light.position.set(5, 10, 5);
scene.add(light);

export const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
scene.add(ambientLight);