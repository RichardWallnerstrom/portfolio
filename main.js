import * as THREE from 'three';


import SpaceShip from './SpaceShip.js';
import Earth from './Earth.js';
import Mars from './Mars.js';
import SpaceShipControls from "./SpaceShipControls.js";
import CameraController from './CameraController.js';

//// Audio ////
const audio = new Audio('audio/warneverchanges.mp3');
audio.loop = true;
audio.play();

//// Renderer ////
const renderer = new THREE.WebGLRenderer() 
renderer.setSize(innerWidth, innerHeight)
renderer.setPixelRatio(devicePixelRatio)
document.body.appendChild(renderer.domElement)

//// Camera ////
const camera = new THREE.PerspectiveCamera(
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
const ambientLight = new THREE.AmbientLight(0xffffff, 0.1); 
scene.add(ambientLight);

//// Objects /////
const spaceShip = new SpaceShip(scene);
const earth = new Earth(scene);
const mars = new Mars(scene);
const spaceShipControls = new SpaceShipControls(spaceShip);
const cameraController = new CameraController(spaceShip, camera);
////  HUD ////
function displayHud() {
  const distanceToEarth = spaceShip.model.position.distanceTo(earth.model.position);
  const distanceToMars = spaceShip.model.position.distanceTo(mars.model.position); 
  const hudDiv = document.getElementById('hud');
  if (distanceToEarth < 1200 || distanceToMars < 700) {
      const fetchUrl = distanceToEarth < distanceToMars ? 'earth.html' : 'mars.html';       
      fetch(fetchUrl)
      .then(response => response.text())
      .then(data => {
        hudDiv.innerHTML = data;
        hudDiv.style.display = 'block'; 
      })
      .catch(error => console.error('Error fetching HUD content:', error));
  } 
  else {
    hudDiv.style.display = 'none';
  }
}
// Animations
function animate() {
  requestAnimationFrame(animate)
  spaceShipControls.update();
  cameraController.updateCameraPosition();
  renderer.render(scene, camera)
  earth.rotate();
  mars.rotate();
  displayHud();
  

}
animate()