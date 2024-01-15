import * as THREE from "three"

export default class PlanetText {
	constructor(text, scene, size, coordinates, rotations) {
		this.text = text
		this.scene = scene
		this.size = size
		this.coordinates = coordinates
		this.rotations = rotations
		this.createModel()
	}

	createModel() {
		const radius = 250000
		const tubeRadius = 10000
		const radialSegments = 3
		const tubularSegments = 8
		const ringGeometry = new THREE.TorusGeometry(
			radius,
			tubeRadius,
			radialSegments,
			tubularSegments
		)
		const ringMaterial = new THREE.MeshBasicMaterial({
			color: 0xaa3323ff,
		})
		this.model = new THREE.Mesh(ringGeometry, ringMaterial)
		if (this.rotations && this.rotations.length === 3) {
			this.model.rotation.x = this.rotations[0]
			this.model.rotation.y = this.rotations[1]
			this.model.rotation.z = this.rotations[2]
		} else {
			console.error("Invalid rotations for creating the ring.")
		}
		if (this.coordinates && this.coordinates.length === 3) {
			// Breaks without IF. Because not created yet?
			this.model.position.set(
				this.coordinates[0],
				this.coordinates[1],
				this.coordinates[2]
			)
			this.scene.add(this.model)
		} else {
			console.error("Invalid coordinates for creating the ring.")
		}
	}
}
