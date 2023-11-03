import * as THREE from 'three';

export const scene = new THREE.Scene();
const cubeTextureLoader = new THREE.CubeTextureLoader();
export const spaceTexture = cubeTextureLoader.load([
  '../images/px.png',
  '../images/nx.png',
  '../images/py.png',
  '../images/ny.png',
  '../images/pz.png',
  '../images/nz.png'
]);
scene.background = spaceTexture;