import * as THREE from "three"

export default class Planet {
	constructor(name, scene, texturePath, size, coordinates) {
		this.name = name
		this.scene = scene
		this.texturePath = texturePath
		this.size = size
		this.coordinates = coordinates
		this.model = null
		this.createModel()
	}

	async createModel() {
		const radius = this.size
		const segments = 32

		const loader = new THREE.TextureLoader()

		const texturePromise = new Promise((resolve, reject) => {
			loader.load(this.texturePath, resolve, undefined, reject)
		})

		texturePromise
			.then((texture) => {
				texture.generateMipmaps = true

				texture.wrapS = texture.wrapT = THREE.RepeatWrapping
				texture.magFilter = THREE.LinearFilter
				texture.minFilter = THREE.LinearMipmapLinearFilter

				const sphereGeometry = new THREE.SphereGeometry(
					radius,
					segments,
					segments
				)
				const sphereMaterial = new THREE.MeshStandardMaterial({
					map: texture,
					metalness: 0.1,
					roughness: 0.5,
				})
				this.model = new THREE.Mesh(sphereGeometry, sphereMaterial)

				if (this.coordinates && this.coordinates.length === 3) {
					this.model.position.set(
						this.coordinates[0],
						this.coordinates[1],
						this.coordinates[2]
					)
					this.scene.add(this.model)
				} else {
					console.error("Invalid coordinates for creating the planet.")
				}
			})
			.catch((error) => {
				console.error("Error loading texture:", error)
			})
	}

	rotate() {
		if (this.model) {
			this.model.rotation.y += 0.0001
		}
	}
}
