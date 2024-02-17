import * as THREE from "three"
import * as BufferGeometryUtils from "three/examples/jsm/utils/BufferGeometryUtils.js"

export default class SpaceShip {
	constructor(scene) {
		this.model = null
		this.scene = scene
		this.isVisible = true
		this.xAxis = new THREE.Vector3(1, 0, 0)
		this.yAxis = new THREE.Vector3(0, 1, 0)
		this.zAxis = new THREE.Vector3(0, 0, -1)
		this.createModel()
	}

	createModel() {
		// create two geometry objects and combine into space ship
		const radius = 0.01
		const height = 0.003
		const radialSegments = 6
		const heightSegments = 1
		const coneGeometry = new THREE.ConeGeometry(
			radius,
			height,
			radialSegments,
			heightSegments
		)
		const torusRadius = 0.009
		const torusTube = 0.0002
		const torusRadialSegments = 6
		const torusTubularSegments = 32

		const torusGeometry = new THREE.TorusGeometry(
			torusRadius,
			torusTube,
			torusRadialSegments,
			torusTubularSegments
		)
		const shipGeometry = BufferGeometryUtils.mergeGeometries([
			coneGeometry,
			torusGeometry,
		])
		const shipMaterial = new THREE.MeshStandardMaterial({
			color: 0xffffff,
			metalness: 0.9,
			roughness: 0.1,
		})

		this.model = new THREE.Mesh(shipGeometry, shipMaterial)
		this.model.position.set(1481080, 5000, -5000)
		this.model.rotation.set(0, 2.1, 0)

		this.scene.add(this.model)
	}

	moveForward(speed) {
		this.model.translateZ(+speed)
	}

	moveBackward(speed) {
		this.model.translateZ(-speed)
	}

	turnLeft(speed) {
		this.model.rotateOnAxis(this.yAxis, speed)
	}

	turnRight(speed) {
		this.model.rotateOnAxis(this.yAxis, -speed)
	}

	barrelLeft(speed) {
		this.model.rotateOnAxis(this.zAxis, speed)
	}

	barrelRight(speed) {
		this.model.rotateOnAxis(this.zAxis, -speed)
	}

	pitchUp(speed) {
		this.model.rotateOnAxis(this.xAxis, speed)
	}

	pitchDown(speed) {
		this.model.rotateOnAxis(this.xAxis, -speed)
	}
	toggleVisibility() {
		this.isVisible = !this.isVisible
		this.model.visible = this.isVisible
	}
}
