import * as THREE from "three"

export default class Renderer {
	constructor() {
		this.renderer = new THREE.WebGLRenderer()
		this.renderer.setSize(innerWidth, innerHeight)
		// this.renderer.setPixelRatio(devicePixelRatio)
		document.body.appendChild(this.renderer.domElement)
		this.renderer.setAnimationLoop(this.render)
		// window.addEventListener("resize", this.onWindowResize.bind(this), false)
	}

	onWindowResize() {
		///TODO fix stretched image after resize

		const width = window.innerWidth
		const height = window.innerHeight

		this.renderer.setSize(width, height)
		// this.renderer.setPixelRatio(window.devicePixelRatio)
	}
}
