import * as THREE from 
"https://cdn.skypack.dev/three@0.132.2/build/three.module.js";
import { OrbitControls } from 
"https://cdn.skypack.dev/three@0.132.2/examples/jsm/controls/OrbitControls.js";

const renderer = new THREE.WebGLRenderer() // Renderer
renderer.setSize(innerWidth, innerHeight)
renderer.setPixelRatio(devicePixelRatio)
document.body.appendChild(renderer.domElement)

const camera = new THREE.PerspectiveCamera( /// Camera
  75, innerWidth / innerHeight, 0.1, 999
)
new OrbitControls(camera, renderer.domElement)
camera.position.z = 5

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

scene.background = spaceTexture;
// https://everytexture.com/everytexture-com-stock-pavement-bricks-texture-00035/

//Light
const light = new THREE.DirectionalLight(0xfffffff, 1) 
light.position.set(5, 10, 5)
scene.add(light)
// Brick Material
const BricktextureLoader = new THREE.TextureLoader();
const brickTexture = BricktextureLoader.load(
  './images/everytexture-com/pavement-bricks-texture-00035.jpg');
const brickBumpMap = BricktextureLoader.load(
  './images/everytexture-com/pavement-bricks-texture-00035-bump-1024.jpg');
brickTexture.wrapS = THREE.RepeatWrapping;
brickTexture.wrapT = THREE.RepeatWrapping;
brickTexture.repeat.set(4, 4);
brickBumpMap.wrapS = THREE.RepeatWrapping;
brickBumpMap.wrapT = THREE.RepeatWrapping;
brickBumpMap.repeat.set(4, 4);
const brickMaterial = new THREE.MeshStandardMaterial({
  map: brickTexture,     // Base texture
  bumpMap: brickBumpMap, // Bump map (normal map)
  bumpScale: 0.05,  // Adjust the bumpiness (optional)
});
// House 1

const houseGeometry = new THREE.BoxGeometry (3, 4, 0.5) 
const houseMesh = new THREE.Mesh (houseGeometry, brickMaterial)
scene.add(houseMesh)

// Grass materials
const GrassTextureLoader = new THREE.TextureLoader();
const grassTexture = GrassTextureLoader.load(
  './images/everytexture-com/grass-texture-00012.jpg');
const grassBumpMap = GrassTextureLoader.load(
  './images/everytexture-com/grass-texture-00012-bump-1024.jpg')
grassTexture.wrapS = THREE.RepeatWrapping;
grassTexture.wrapT = THREE.RepeatWrapping;
grassTexture.repeat.set(4, 4);
grassBumpMap.wrapS = THREE.RepeatWrapping;
grassBumpMap.wrapT = THREE.RepeatWrapping;
grassBumpMap.repeat.set(4, 4);
const grassMaterial = new THREE.MeshStandardMaterial({
  map: grassTexture,     // Base texture
  bumpMap: grassBumpMap, // Bump map (normal map)
  bumpScale: 0.05,  // Adjust the bumpiness (optional)
    
  });

// Ground
const groundGeometry = new THREE.PlaneGeometry (150, 150, 10, 10) 
const groundMaterial = new THREE.MeshPhongMaterial ({color: 0xFF0000})
const groundMesh = new THREE.Mesh (groundGeometry, grassMaterial)
groundMesh.position.set(0, -1, 0)
groundMesh.rotation.x = -Math.PI / 2; 
groundMesh.rotation.y = 0; 
groundMesh.rotation.z = 0;
scene.add(groundMesh)
function animate() {
  requestAnimationFrame(animate)
  renderer.render(scene, camera)


}

animate()