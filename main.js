import * as THREE from 'three';


import SpaceShip from './SpaceShip.js';
import Earth from './Earth.js';
import SpaceShipControls from "./SpaceShipControls.js";


const renderer = new THREE.WebGLRenderer() // Renderer
renderer.setSize(innerWidth, innerHeight)
renderer.setPixelRatio(devicePixelRatio)
document.body.appendChild(renderer.domElement)

const camera = new THREE.PerspectiveCamera( /// Camera
  75, innerWidth / innerHeight, 0.1, 9999
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

function updateCameraPosition() {
  const trailingOffset = new THREE.Vector3(0, 10, -20); 

  const offsetVector = new THREE.Vector3(0, 0, 1);
  // Apply the ship's rotation to the offset vector
  offsetVector.applyQuaternion(spaceShip.model.quaternion); 
  // Multiply the offset vector by the trailing offset to position the camera behind the ship
  offsetVector.multiplyScalar(-trailingOffset.z);
  const offsetPosition = spaceShip.model.position.clone().add(offsetVector);
  // Create a vector pointing from the offset position back towards the ship's position
  const behindShipVector = spaceShip.model.position.clone().sub(offsetPosition);

  // Normalize the vector to get a unit direction and then multiply it by a desired distance
  behindShipVector.normalize();
  behindShipVector.multiplyScalar(25); // Adjust the distance from the ship as needed

  // Calculate the final position for the camera
  const cameraPosition = spaceShip.model.position.clone().add(behindShipVector);

  // Set the camera position and make it look at the ship's position
  camera.position.copy(cameraPosition);
  camera.lookAt(spaceShip.model.position);
}



// Animations
function animate() {
  requestAnimationFrame(animate)
  spaceShipControls.update();
  updateCameraPosition();
  renderer.render(scene, camera)
  earth.rotate();


}
animate()