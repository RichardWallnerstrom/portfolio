import Planet from './Planet.js'
import SpaceShip from './SpaceShip.js'
import SpaceScene from './SpaceScene.js'
import Renderer from '../components/Renderer.js'
import LightController from './LightController.js'
import SpaceShipControls from "./SpaceShipControls.js"
import AudioManager from '../components/AudioManager.js'
import HudController from '../components/HudController.js'
import CameraController from '../components/CameraController.js'

export default class SpaceWorld {
  constructor() {
    this.spaceScene = new SpaceScene()
    this.renderer = new Renderer()
    this.spaceShip = new SpaceShip(this.spaceScene.scene)
    this.audioManager = new AudioManager('audio/warneverchanges.mp3')    
    this.lightController = new LightController(this.spaceScene.scene)
    this.spaceShipControls = new SpaceShipControls(this.spaceShip)
    this.loadPlanets()
    this.cameraController = new CameraController(this.spaceShip, this.earth, this.mars)
    this.hud = new HudController(this.spaceShip, this.earth, this.mars)

  }
  loadPlanets() {
    this.earth = new Planet(
      this.spaceScene.scene, 
      "earth", 
      0.6, // Size
      [4000, -100, -200] // coordinates
    ); 
    this.mars = new Planet(
      this.spaceScene.scene, 
      "mars", 
      40, // Size
      [-6000, -250, -180] // coordinates
    ); 
  }
  animate() {
    this.spaceShipControls.update()
    this.cameraController.lookAtObject()
    this.renderer.renderer.render(this.spaceScene.scene, this.cameraController.camera)
    this.earth.rotate();
    this.mars.rotate();
    this.hud.DisplayHud();
    
  
  }
}

