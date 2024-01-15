import Planet from "./Planet"
import * as THREE from "three"

export default class Earth extends Planet {
	constructor(name, scene, texturePath, size, coordinates) {
		super(name, scene, texturePath, size, coordinates)
	}

	loadTexture(url) {
		return new Promise((resolve, reject) => {
			new THREE.TextureLoader().load(url, resolve, undefined, reject)
		})
	}

	async createModel() {
		const segments = 32

		const textureUrls = [
			"../../textures/space/8k_earth_daymap.jpg",
			"../../textures/space/8k_earth_nightmap.jpg",
			"../../textures/space/8k_earth_normal_map.tif",
			"../../textures/space/8k_earth_specular_map.tif",
		]

		try {
			const [dayMap, nightMap, normalMap, specularMap] = await Promise.all(
				textureUrls.map((url) => this.loadTexture(url))
			)

			const earthMaterial = new THREE.MeshStandardMaterial({
				map: dayMap,
				emissive: nightMap,
				normalMap,
				specularMap,
				metalness: 0.1,
				roughness: 0.5,
			})

			const earthGeometry = new THREE.SphereGeometry(
				this.size,
				segments,
				segments
			)

			this.model = new THREE.Mesh(earthGeometry, earthMaterial)
			if (this.coordinates && this.coordinates.length === 3) {
				this.model.position.set(
					this.coordinates[0],
					this.coordinates[1],
					this.coordinates[2]
				)
			}
			this.scene.add(this.model)
		} catch (error) {
			console.error("Error loading textures:", error)
		}
	}

	rotate() {
		if (this.model) {
			this.model.rotation.y += 0.0001
		}
	}
}
