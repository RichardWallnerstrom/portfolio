import * as THREE from 
"https://cdn.skypack.dev/three@0.132.2/build/three.module.js";
import { OrbitControls } from 
"https://cdn.skypack.dev/three@0.132.2/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from 
'three/examples/jsm/loaders/GLTFLoader.js';

import SpaceShip from './SpaceShip.js';
import Earth from './Earth.js';



const renderer = new THREE.WebGLRenderer() // Renderer
renderer.setSize(innerWidth, innerHeight)
renderer.setPixelRatio(devicePixelRatio)
document.body.appendChild(renderer.domElement)

const camera = new THREE.PerspectiveCamera( /// Camera
  75, innerWidth / innerHeight, 0.1, 999
)
new OrbitControls(camera, renderer.domElement)
camera.position.z = 250

// Scene 
const scene = new THREE.Scene()
const loader = new THREE.CubeTextureLoader();
const spaceTexture = loader.load([  // Skymap image converted from wikipedia 6000x3000 mily way
  '../images/px.png', 
  '../images/nx.png', 
  '../images/py.png', 
  '../images/ny.png', 
  '../images/pz.png', 
  '../images/nz.png'  
]);
scene.background = spaceTexture;

////Lights////
// Sun //
const light = new THREE.DirectionalLight(0xfffffff, 1) 
light.position.set(5, 10, 5)
scene.add(light)
// Ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 1); 
scene.add(ambientLight);


//// Models /////

const spaceShip = new SpaceShip(scene);
const earth = new Earth(scene);


// Animations
function animate() {
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
  earth.rotate();


}
animate()