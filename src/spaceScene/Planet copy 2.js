import * as THREE from "three"

export default class Planet {
	constructor(scene, texturePath, size, coordinates) {
		this.scene = scene
		this.texturePath = texturePath
		this.size = size
		this.coordinates = coordinates
		this.model = null // Initialize as null until the model is loaded
		this.createModel()
	}

	createModel() {
		const radius = this.size
		const segments = 32

		const loader = new THREE.TextureLoader()

		// Use a Promise to handle asynchronous texture loading
		const texturePromise = new Promise((resolve, reject) => {
			loader.load(this.texturePath, resolve, undefined, reject)
		})

		texturePromise
			.then((texture) => {
				// Enable mipmaps for better quality
				texture.generateMipmaps = true

				// Set texture properties
				texture.wrapS = texture.wrapT = THREE.RepeatWrapping
				texture.magFilter = THREE.LinearFilter
				texture.minFilter = THREE.LinearMipmapLinearFilter

				const sphereGeometry = new THREE.SphereGeometry(
					radius,
					segments,
					segments
				)
				const sphereMaterial = new THREE.MeshStandardMaterial({ map: texture })
				this.model = new THREE.Mesh(sphereGeometry, sphereMaterial)

				// Set the position based on provided coordinates
				if (this.coordinates && this.coordinates.length === 3) {
					this.model.position.set(
						this.coordinates[0],
						this.coordinates[1],
						this.coordinates[2]
					)
					// Add the model to the scene
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
		// Your rotation logic here
		if (this.model) {
			this.model.rotation.y += 0.0001
		}
	}
}
