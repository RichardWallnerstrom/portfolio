import * as THREE from "three"

export default class LightController {
	constructor(scene) {
		this.scene = scene
		this.sun = new THREE.DirectionalLight(0xfffffff, 1)
		this.sun.position.set(-40000, 0, 0)
		this.ambientLight = new THREE.AmbientLight(0xffffff, 0.03)
		this.scene.add(this.sun)
		this.scene.add(this.ambientLight)
	}
}
