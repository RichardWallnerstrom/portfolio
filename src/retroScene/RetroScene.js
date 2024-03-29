import * as THREE from "three"

export default class SpaceScene {
	constructor() {
		this.scene = new THREE.Scene()
		this.cubeTextureLoader = new THREE.CubeTextureLoader()
		this.spaceTexture = this.cubeTextureLoader.load([
			"../../images/px.png",
			"../../images/nx.png",
			"../../images/py.png",
			"../../images/ny.png",
			"../../images/pz.png",
			"../../images/nz.png",
		])
		this.scene.background = this.spaceTexture
	}
}
