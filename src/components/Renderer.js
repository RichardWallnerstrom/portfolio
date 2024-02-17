import * as THREE from "three"

export default class Renderer {
	constructor() {
		this.renderer = new THREE.WebGLRenderer({
			alpha: true,
			logarithmicDepthBuffer: true, // fixed z-fighting
		})
		this.renderer.setSize(innerWidth, innerHeight)
		// this.renderer.setPixelRatio(devicePixelRatio)
		document.body.appendChild(this.renderer.domElement)
		this.renderer.setAnimationLoop(this.renderer)
	}
}
