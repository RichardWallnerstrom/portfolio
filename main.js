import * as THREE from 
"https://cdn.skypack.dev/three@0.132.2/build/three.module.js";
import { OrbitControls } from 
"https://cdn.skypack.dev/three@0.132.2/examples/jsm/controls/OrbitControls.js";


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
class ThirdPersonCamera {
  constructor(params) {
    this._params = params;
    this._camera = params.camera;
    this._currentPosition = new THREE.Vector3();
    this._currentViewPoint = new THREE.Vector3();
  }
  _CalculateIdealOffset() { 
    const idealOffset = new THREE.Vector3(-15, 20, -30);
    idealOffset.applyQuaternion(this._params.target.model.quaternion);
    idealOffset.add(this._params.target.model.position);
    return idealOffset;
  }
  _CalculateIdealViewPoint() {
    const idealViewPoint = new THREE.Vector3(0, 10, 50);
    idealViewPoint.applyQuaternion(this._params.target.model.quaternion);
    idealViewPoint.add(this._params.target.model.position);
    return idealViewPoint;
  }
  Update() {
    const idealOffset = this._CalculateIdealOffset();
    const idealViewPoint = this._CalculateIdealViewPoint();

    this._currentPosition.copy(idealOffset);
    this._currentViewPoint.copy(idealViewPoint);

    this._camera.position.copy(this._currentPosition);
    this._camera.lookAt(this._currentViewPoint);
  }
}
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
const spaceShipControls = new SpaceShipControls(spaceShip);
let _thirdPersonCamera = new ThirdPersonCamera({
  camera: camera,
});
const earth = new Earth(scene);


// Animations
function animate() {
  requestAnimationFrame(animate)
  spaceShipControls.update();
  //_thirdPersonCamera.update();
  renderer.render(scene, camera)
  earth.rotate();


}
animate()