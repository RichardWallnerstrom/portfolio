// Master class to control all other classes
import Ring from "./Ring.js"
import Sun from "./Sun.js"
import Earth from "./Earth.js"
import Saturn from "./Saturn.js"
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
		this.addListeners()
		this.listOfRings = []

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
	addListeners() {
		window.addEventListener("resize", this.onWindowResize.bind(this), false)
		const playMusic = document.getElementById("playMusic")
		playMusic.addEventListener("click", () => this.audioManager.playMusic())
		const pauseMusic = document.getElementById("pauseMusic")
		pauseMusic.addEventListener("click", () => this.audioManager.pauseMusic())
		const stopMusic = document.getElementById("stopMusic")
		stopMusic.addEventListener("click", () => this.audioManager.stopMusic())
		const teleport = document.querySelectorAll(".teleport")
		for (const btn of teleport) {
			btn.addEventListener("click", (event) =>
				this.teleportShip(event.target.value)
			)
		}
		document.addEventListener("checkboxEvent", (arg) => {
			if (arg.detail.includes("spacing:")) this.movePlanets(arg.detail)
			if (arg.detail.includes("helpers:")) this.createRings(arg.detail)
		})
		document
			.getElementById("controller")
			.addEventListener("change", (event) => {
				const showController = event.target.checked
				if (showController) {
					document.getElementById("controllerButtons").style.display = "grid"
					this.spaceShip.toggleVisibility()
				} else {
					document.getElementById("controllerButtons").style.display = "none"
				}
			})
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
		this.saturn = new Saturn(
			"saturn",
			this.spaceScene.scene,
			"../../textures/space/8k_saturn.jpg",
			12053.6, // diameter
			[14211797, 0, 0] //1.4b
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
		this.woh_g64 = new Sun(
			"woh_g64",
			this.spaceScene.scene,
			"../../textures/space/8k_sun.jpg",
			2142756, // diameter
			// 214275600, // diameter

			[-90000, 0, 0]
		)
		console.log("woh g64 created at: " + this.woh_g64.coordinates[0])
		this.planets = [
			this.mercury,
			this.venus,
			this.moon,
			this.earth,
			this.mars,
			this.jupiter,
			this.saturn,
			this.uranus,
			this.neptune,
		]
	}
	movePlanets(arg) {
		this.deleteRings()
		const short = 0.25
		const standard = 1
		const accurate = 10
		let setup = standard
		// If not proportional distances
		if (arg == "spacing:0") {
			let totalLength = this.sun.size * 2
			for (const planet of this.planets) {
				planet.model.position.set(
					totalLength,
					planet.originalCoord[1],
					planet.originalCoord[2]
				)
				totalLength += planet.size * 3
				// Special cases
				if (planet.name == "mars") totalLength += this.jupiter.size * 1.1
				if (planet.name == "mercury") totalLength += planet.size * 3
			}
			return
			// If proportional
		} else if (arg == "spacing:1") {
			setup = short
		} else if (arg == "spacing:2") {
			setup = standard
		} else if (arg == "spacing:3") {
			setup = accurate
		}
		for (const planet of this.planets) {
			planet.model.position.set(
				planet.originalCoord[0] * setup,
				planet.originalCoord[1] * setup,
				planet.originalCoord[2] * setup
			)
		}
	}
	teleportShip(arg) {
		const target = this.planets.find((planet) => planet.name === arg)
		this.spaceShip.model.position.set(
			target.model.position.x + target.size * 2.6,
			target.model.position.y + target.size * 1,
			target.model.position.z + target.size / 10
		)
	}
	deleteRings() {
		for (const ring of this.listOfRings) {
			this.spaceScene.scene.remove(ring.model)
		}
	}
	createRings(arg) {
		this.deleteRings()
		if (arg.includes("0")) return
		const amountOfRings = arg.includes("1") ? 4 : 9

		const ringDiameter = 500000
		const coordinatesArray = [
			[
				this.mars.model.position.x,
				this.mars.model.position.y,
				this.mars.model.position.z,
			],
			[
				this.jupiter.model.position.x,
				this.jupiter.model.position.y,
				this.jupiter.model.position.z,
			],
			[
				this.saturn.model.position.x,
				this.saturn.model.position.y,
				this.saturn.model.position.z,
			],
			[
				this.neptune.model.position.x,
				this.neptune.model.position.y,
				this.neptune.model.position.z,
			],
			[
				this.earth.model.position.x,
				this.earth.model.position.y,
				this.earth.model.position.z,
			],
			[
				this.mercury.model.position.x,
				this.mercury.model.position.y,
				this.mercury.model.position.z,
			],
			[
				this.venus.model.position.x,
				this.venus.model.position.y,
				this.venus.model.position.z,
			],
			[
				this.uranus.model.position.x,
				this.uranus.model.position.y,
				this.uranus.model.position.z,
			],
			[
				this.uranus.model.position.x * 0.75, // Two extra helpers for the long distance
				this.uranus.model.position.y,
				this.uranus.model.position.z,
			],
			[
				this.neptune.model.position.x * 0.75,
				this.neptune.model.position.y,
				this.neptune.model.position.z,
			],
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
	pressButton(key) {
		this.spaceShipControls.pressButton(key)
	}

	releaseButton(key) {
		this.spaceShipControls.releaseButton(key)
	}
	onWindowResize() {
		console.log("window resized!!!")
		const width = window.innerWidth
		const height = window.innerHeight

		this.renderer.setSize(width, height)
		this.renderer.setPixelRatio(window.devicePixelRatio)
		if (this.cameraController) {
			this.cameraController.aspect = width / height
			this.cameraController.updateProjectionMatrix()
		}
	}
	animate() {
		this.spaceShipControls.update()
		this.cameraController.lookAtObject()
		this.renderer.renderer.render(
			this.spaceScene.scene,
			this.cameraController.camera
		)
		for (const planet of this.planets) {
			planet.rotate()
		}
		this.hud.DisplayHud()
	}
}
