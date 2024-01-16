import * as THREE from "three"

import Planet from "./Planet"

export default class Sun extends Planet {
	constructor(name, scene, texturePath, size, coordinates) {
		super(name, scene, texturePath, size, coordinates)
	}
	createModel() {
		const diameter = this.size
		const segments = 32
		const loader = new THREE.TextureLoader()
		const texturePromise = new Promise((resolve, reject) => {
			loader.load(this.texturePath, resolve, undefined, reject)
		})

		texturePromise
			.then((texture) => {
				texture.generateMipmaps = true

				texture.wrapS = texture.wrapT = THREE.RepeatWrapping // Sphere wrapping trick
				texture.magFilter = THREE.LinearFilter
				texture.minFilter = THREE.LinearMipmapLinearFilter

				const sphereGeometry = new THREE.SphereGeometry(
					diameter,
					segments,
					segments
				)
				const sphereMaterial = new THREE.MeshBasicMaterial({
					map: texture,
					opacity: 0.7,
					side: THREE.FrontSide,
					color: new THREE.Color(0.4, 0.4, 0),
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
}
