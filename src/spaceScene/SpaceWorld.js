import Ring from "./Ring.js"
import Planet from "./Planet.js"
import SpaceShip from "./SpaceShip.js"
import SpaceScene from "./SpaceScene.js"
import Renderer from "../components/Renderer.js"
import LightController from "./LightController.js"
import SpaceShipControls from "./SpaceShipControls.js"
import AudioManager from "../components/AudioManager.js"
import HudController from "../components/HudController.js"
import CameraController from "../components/CameraController.js"

// Every unit is 10km
export default class SpaceWorld {
	constructor() {
		this.spaceScene = new SpaceScene()
		this.renderer = new Renderer()
		this.spaceShip = new SpaceShip(this.spaceScene.scene)
		this.audioManager = new AudioManager("../../audio/warneverchanges.mp3")
		this.lightController = new LightController(this.spaceScene.scene)
		this.spaceShipControls = new SpaceShipControls(this.spaceShip)
		this.createPlanets()
		this.createRings()
		this.cameraController = new CameraController(
			this.spaceShip,
			this.earth,
			this.mars
		)
		this.hud = new HudController(
			this.spaceShip,
			this.earth,
			this.mars,
			this.spaceShipControls
		)
	}

	createPlanets() {
		this.sun = new Planet(
			this.spaceScene.scene,
			"../../textures/space/8k_sun.jpg",
			139140, // diameter * 10km
			[0, 0, 0] // coordinates
		)
		this.mercury = new Planet(
			this.spaceScene.scene,
			"../../textures/space/8k_mercury.jpg",
			488, // diameter
			[580000, 0, 0] //58m
		)
		this.venus = new Planet(
			this.spaceScene.scene,
			"../../textures/space/8k_venus_surface.jpg",
			1210.03, // diameter
			[1080000, 0, 0] //108m
		)
		this.earth = new Planet(
			this.spaceScene.scene,
			"../../textures/space/8k_earth_daymap.jpg",
			1274.2, // diameter
			[1471080, 0, 0] //147m
		)
		this.moon = new Planet(
			this.spaceScene.scene,
			"../../textures/space/8k_moon.jpg",
			347.5, // diameter
			[1471080, 0, 3844] //147m
		)
		this.mars = new Planet(
			this.spaceScene.scene,
			"../../textures/space/8k_mars.jpg",
			677.9, // diameter
			[2290000, 0, 0] //229m
		)
		this.jupiter = new Planet(
			this.spaceScene.scene,
			"../../textures/space/8k_jupiter.jpg",
			14298.4, // diameter
			[7780000, 0, 0] //778m
		)
		this.saturn = new Planet(
			this.spaceScene.scene,
			"../../textures/space/8k_saturn.jpg",
			12053.6, // diameter
			[14211797.7165, 0, 0] //1.4b
		)
	}
	createRings() {
		const amountOfRings = 5
		const ringDiameter = 500000
		this.listOfRings = []
		const coordinatesArray = [
			this.mercury.coordinates,
			this.venus.coordinates,

			this.earth.coordinates,
			this.mars.coordinates,
			this.jupiter.coordinates,
			this.saturn.coordinates,
			[31000, 300, 1500],
			[36000, 300, 1500],
			[41000, 300, 1500],
			[46000, 300, 1500],
		]
		const rotationsArray = [
			[Math.PI / 2, Math.PI / 2, Math.PI / 2],
			[Math.PI / 2, Math.PI / 2, Math.PI / 2],
			[Math.PI / 2, Math.PI / 2, Math.PI / 2],
			[Math.PI / 2, Math.PI / 2, Math.PI / 2],
			[Math.PI / 2, Math.PI / 2, Math.PI / 2],
			[Math.PI / 2, Math.PI / 2, Math.PI / 2],
		]

		for (var i = 0; i <= amountOfRings; i++) {
			const newRing = new Ring(
				this.spaceScene.scene,
				ringDiameter,
				coordinatesArray[i],
				rotationsArray[i]
			)
			this.listOfRings.push(newRing)
		}
	}
	animate() {
		this.spaceShipControls.update()
		this.cameraController.lookAtObject()
		this.renderer.renderer.render(
			this.spaceScene.scene,
			this.cameraController.camera
		)
		this.sun.rotate()
		this.mercury.rotate()
		this.hud.DisplayHud()
	}
}
