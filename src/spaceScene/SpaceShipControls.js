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
		const speedModifier = this.keys["KeyShift"] ? 5 : 1
		this.spaceShip.moveBackward(this.speed)

		if (this.keys["KeyF"]) {
			if (this.speed < 0) this.speed = 0
			if (this.speed < 23237) {
				this.speed += 0.1 + this.speed * 0.1
			}
			if (this.hasMoved == false) {
				document.getElementById("controlsHud").style.display = "none"
			}
		}
		if (this.keys["KeyC"]) {
			if (this.speed < 70000) {
				this.speed -= 11
			}
		}
		if (this.keys["KeyA"]) {
			this.spaceShip.turnLeft(0.005 * speedModifier)
		}
		if (this.keys["KeyD"]) {
			this.spaceShip.turnRight(0.005 * speedModifier)
		}
		if (this.keys["KeyQ"]) {
			this.spaceShip.barrelLeft(0.01 * speedModifier)
		}
		if (this.keys["KeyE"]) {
			this.spaceShip.barrelRight(0.01 * speedModifier)
		}
		if (this.keys["KeyS"]) {
			this.spaceShip.pitchUp(0.005 * speedModifier)
		}
		if (this.keys["KeyW"]) {
			this.spaceShip.pitchDown(0.005 * speedModifier)
		}
		if (this.keys["KeyG"]) {
			this.speed = 0
		}
	}
}
