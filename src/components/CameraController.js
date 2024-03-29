import * as THREE from "three"
export default class CameraController {
	constructor(spaceShip, earth, mars) {
		this.spaceShip = spaceShip
		this.earth = earth
		this.mars = mars
		this.fov = 60
		this.nearClipDistance = 0.01
		this.farClipDistance = 9999999999
		this.isMouseOverEarth
		this.isMouseOverMars

		this.camera = new THREE.PerspectiveCamera(
			this.fov,
			innerWidth / innerHeight,
			this.nearClipDistance,
			this.farClipDistance
		)
		this.camera.position.set(25, 10, 25)
	}

	placeCameraBehindShip() {
		// const cameraTarget = new THREE.Vector3(0, 0, -20)
		// const bowVector = new THREE.Vector3(0, 10, 1)
		// bowVector.applyQuaternion(this.spaceShip.model.quaternion) // Apply the ship's quaternion to the behindShipVector
		// bowVector.multiplyScalar(cameraTarget.z)    // Multiply the vector by the negative of the z-component of the trailing offset
		const trailingOffset = new THREE.Vector3(0, 0, 0.07)
		const sternVector = new THREE.Vector3(0, 0, -1) // Create a new vector (0, 0, -1) representing a direction behind the ship
		sternVector.applyQuaternion(this.spaceShip.model.quaternion) // Apply the ship's quaternion to the sternVector
		sternVector.multiplyScalar(-trailingOffset.z)

		const cameraPosition = this.spaceShip.model.position
			.clone()
			.add(sternVector)
		this.camera.position.copy(cameraPosition)
		this.camera.quaternion.copy(this.spaceShip.model.quaternion) // Set camera quaternion
		// this.spaceShip.model.getWorldQuaternion(this.camera.quaternion)  // Not sure what the diff is between these two.
	}
	lookAtObject() {
		if (this.isMouseOverEarth) {
			this.camera.lookAt(this.earth.model.position)
			this.camera.updateProjectionMatrix()
		} else if (this.isMouseOverMars) {
			this.camera.lookAt(this.mars.model.position)
			this.camera.updateProjectionMatrix()
		} else {
			this.placeCameraBehindShip()
		}
	}
}
