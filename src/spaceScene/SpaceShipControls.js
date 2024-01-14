export default class SpaceShipControls {
	constructor(spaceShip, initialSpeed) {
		this.spaceShip = spaceShip
		this.speed = initialSpeed || 0
		this.momentum = 0
		this.hasMoved = false
		this.keys = {
			KeyW: false,
			KeyA: false,
			KeyS: false,
			KeyD: false,
		}

		document.addEventListener(
			"keydown",
			(event) => this.onKeyDown(event),
			false
		)
		document.addEventListener("keyup", (event) => this.onKeyUp(event), false)
	}
	getSpeed() {
		return this.speed
	}
	setSpeed(speed) {
		this.speed = speed
	}
	onKeyDown(event) {
		if (event.code === "ShiftLeft" || event.code === "ShiftRight") {
			this.keys["KeyShift"] = true
		}
		this.keys[event.code] = true
	}
	onKeyUp(event) {
		if (event.code === "ShiftLeft" || event.code === "ShiftRight") {
			this.keys["KeyShift"] = false
		}
		this.keys[event.code] = false
	}
	update() {
		const speedModifier = this.keys["KeyShift"] ? 6 : 1
		this.spaceShip.moveBackward(this.speed)

		if (this.keys["KeyF"]) {
			this.speed += 3 * speedModifier
			if (this.hasMoved == false) {
				document.getElementById("controlsHud").style.display = "none"
			}
		}
		if (this.keys["KeyC"]) {
			this.speed -= 3 * speedModifier
		}
		if (this.keys["KeyA"]) {
			this.spaceShip.turnLeft(0.03 * (speedModifier / 3))
		}
		if (this.keys["KeyD"]) {
			this.spaceShip.turnRight(0.03 * (speedModifier / 3))
		}
		if (this.keys["KeyQ"]) {
			this.spaceShip.barrelLeft(0.03 * (speedModifier / 3))
		}
		if (this.keys["KeyE"]) {
			this.spaceShip.barrelRight(0.03 * (speedModifier / 3))
		}
		if (this.keys["KeyS"]) {
			this.spaceShip.pitchUp(0.03 * (speedModifier / 3))
		}
		if (this.keys["KeyW"]) {
			this.spaceShip.pitchDown(0.03 * (speedModifier / 3))
		}
		if (this.keys["KeyG"]) {
			this.speed = 0
		}
	}
}
