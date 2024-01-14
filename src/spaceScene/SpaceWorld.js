// Master class to control all other classes
import Ring from "./Ring.js"
import Sun from "./Sun.js"
import Earth from "./Earth.js"
import Planet from "./Planet.js"
import SpaceShip from "./SpaceShip.js"
import SpaceScene from "./SpaceScene.js"
import Renderer from "../components/Renderer.js"
import LightController from "./LightController.js"
import SpaceShipControls from "./SpaceShipControls.js"
import AudioManager from "../components/AudioManager.js"
import HudController from "../components/HudController.js"
import CameraController from "../components/CameraController.js"

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
			this.planets,
			this.spaceShipControls
		)
	}
	// Every unit is 10km
	createPlanets() {
		this.sun = new Sun(
			"sun",
			this.spaceScene.scene,
			"../../textures/space/8k_sun.jpg",
			139140, // diameter * 10km
			[0, 0, 0] // coordinates
		)
		this.mercury = new Planet(
			"mercury",
			this.spaceScene.scene,
			"../../textures/space/8k_mercury.jpg",
			488, // diameter
			[580000, 0, 0] //58m
		)
		this.venus = new Planet(
			"venus",
			this.spaceScene.scene,
			"../../textures/space/8k_venus_surface.jpg",
			1210.03, // diameter
			[1080000, 0, 0] //108m
		)
		this.earth = new Planet(
			"earth",
			this.spaceScene.scene,
			"../../textures/space/8k_earth_daymap.jpg",
			1274.2, // diameter
			[1471080, 0, 0] //147m
		)
		this.moon = new Planet(
			"moon",
			this.spaceScene.scene,
			"../../textures/space/8k_moon.jpg",
			347.5, // diameter
			[1471080, 0, 3844] //147m 384400km
		)
		this.mars = new Planet(
			"mars", //
			this.spaceScene.scene,
			"../../textures/space/8k_mars.jpg",
			677.9, // diameter
			[2290000, 0, 0] //229m
		)
		this.jupiter = new Planet(
			"jupiter",
			this.spaceScene.scene,
			"../../textures/space/8k_jupiter.jpg",
			14298.4, // diameter
			[7780000, 0, 0] //778m
		)
		this.saturn = new Planet(
			"saturn",
			this.spaceScene.scene,
			"../../textures/space/8k_saturn.jpg",
			12053.6, // diameter
			[14211797.7165, 0, 0] //1.4b
		)
		this.uranus = new Planet(
			"uranus",
			this.spaceScene.scene,
			"../../textures/space/2k_uranus.jpg",
			5111.6, // diameter
			[28211797, 0, 0] //2.8b
		)
		this.neptune = new Planet(
			"neptune",
			this.spaceScene.scene,
			"../../textures/space/2k_neptune.jpg",
			4924.4, // diameter
			[45211797, 0, 0] //4.5b
		)
		this.planets = [
			this.sun,
			this.mercury,
			this.venus,
			this.earth,
			this.mars,
			this.jupiter,
			this.saturn,
			this.uranus,
			this.neptune,
		]
	}
	createRings() {
		const amountOfRings = 8
		const ringDiameter = 500000
		this.listOfRings = []
		const coordinatesArray = [
			this.mercury.coordinates,
			this.venus.coordinates,

			this.earth.coordinates,
			this.mars.coordinates,
			this.jupiter.coordinates,
			this.saturn.coordinates,
			this.uranus.coordinates,
			this.neptune.coordinates,
		]
		const rotationsArray = [
			[Math.PI / 2, Math.PI / 2, Math.PI / 2],
			[Math.PI / 2, Math.PI / 2, Math.PI / 2],
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
