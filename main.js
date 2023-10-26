import * as THREE from 'three';


import SpaceShip from './SpaceShip.js';
import Earth from './Earth.js';
import SpaceShipControls from "./SpaceShipControls.js";


const renderer = new THREE.WebGLRenderer() // Renderer
renderer.setSize(innerWidth, innerHeight)
renderer.setPixelRatio(devicePixelRatio)
document.body.appendChild(renderer.domElement)

const camera = new THREE.PerspectiveCamera( /// Camera
  75, innerWidth / innerHeight, 0.1, 999
)
camera.position.set(25, 10, 25);

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


//// Objects /////
const spaceShip = new SpaceShip(scene);
const earth = new Earth(scene);
const spaceShipControls = new SpaceShipControls(spaceShip);


// Animations
function animate() {
  requestAnimationFrame(animate)
  spaceShipControls.update();
  const trailingOffset = new THREE.Vector3(20, 50, 50); // Adjust the offset as needed
  const shipPosition = spaceShip.model.position.clone();
  const offsetPosition = shipPosition.add(trailingOffset);
  camera.position.copy(offsetPosition);
  camera.lookAt(spaceShip.model.position);
  renderer.render(scene, camera)
  earth.rotate();


}
animate()