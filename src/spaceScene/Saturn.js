import Planet from "./Planet.js"
import * as THREE from "three"

export default class Saturn extends Planet {
	constructor(name, scene, texturePath, size, coordinates) {
		super(name, scene, texturePath, size, coordinates)
	}

	async createModel() {
		const radius = this.size
		const segments = 64

		const loader = new THREE.TextureLoader()

		try {
			const planetTexture = await new Promise((resolve, reject) => {
				loader.load(this.texturePath, resolve, undefined, reject)
			})

			const ringsTexture = await new Promise((resolve, reject) => {
				loader.load(
					"../../textures/space/8k_saturn_ring_alpha.png",
					resolve,
					undefined,
					reject
				)
			})

			planetTexture.generateMipmaps = true
			planetTexture.wrapS = planetTexture.wrapT = THREE.RepeatWrapping
			planetTexture.magFilter = THREE.LinearFilter
			planetTexture.minFilter = THREE.LinearMipmapLinearFilter

			const sphereGeometry = new THREE.SphereGeometry(
				radius,
				segments,
				segments
			)
			const sphereMaterial = new THREE.MeshStandardMaterial({
				map: planetTexture,
				transparent: false,

				opacity: 1,
				metalness: 0.3,
				roughness: 0.5,
				// depthWrite: false,
				side: THREE.FrontSide,
				blending: THREE.NormalBlending,
				emissive: 0x000000,
				color: new THREE.Color(0xffffffff),
			})
			const tubularSegments = 2

			const ringGeometry = new THREE.TorusGeometry(
				radius * 2,
				radius * 0.66,
				tubularSegments,
				segments * 2
			)
			const ringMaterial = new THREE.MeshBasicMaterial({
				map: ringsTexture,
				transparent: true,
				opacity: 0.6,
				side: THREE.DoubleSide,
				depthWrite: false,
				blending: THREE.NormalBlending,
				color: new THREE.Color(0xeeddbb),
			})
			ringsTexture.rotation = Math.PI / 2
			const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial)
			const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial)
			ringMesh.rotation.set(Math.PI / 2, 0, 0)
			sphereMesh.renderOrder = 1
			ringMesh.renderOrder = 2
			this.model = new THREE.Group()
			this.model.add(ringMesh)
			this.model.add(sphereMesh)

			if (this.coordinates && this.coordinates.length === 3) {
				this.model.position.set(
					this.coordinates[0],
					this.coordinates[1],
					this.coordinates[2]
				)
				this.model.rotation.set(Math.PI * 1.1, 0, Math.PI * 1.9)

				this.scene.add(this.model)
			} else {
				console.error("Invalid coordinates for creating the planet.")
			}
		} catch (error) {
			console.error("Error loading textures:", error)
		}
	}
}
