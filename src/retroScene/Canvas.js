export default class Canvas {
	constructor() {
		this.canvas = document.getElementById("background2d")
		this.canvas.width = window.innerWidth
		this.canvas.height = window.innerHeight
		this.ctx = this.canvas.getContext("2d")
		this.backgroundImages = [
			{
				src: "/assets/2d/background/parallax-forest-back-trees.png",
				speed: 0.1,
				x: 0,
				y: 0,
			},
			{
				src: "/assets/2d/background/parallax-forest-middle-trees.png",
				speed: 0.3,
				x: 0,
				y: 0,
			},
			{
				src: "/assets/2d/background/parallax-forest-front-trees.png",
				speed: 0.6,
				x: 0,
				y: 0,
			},
			{
				src: "/assets/2d/background/parallax-forest-lights.png",
				speed: 0.8,
				x: 0,
				y: 0,
			},
		]
		this.loadImages()
	}

	loadImages() {
		let loadedImages = 0

		const onLoad = () => {
			loadedImages++
			if (loadedImages === this.backgroundImages.length) {
				console.log("All images loaded")
				this.draw()
			}
		}

		this.backgroundImages.forEach((item) => {
			const image = new Image()
			image.src = item.src
			image.onload = onLoad
			image.onerror = (error) =>
				console.error(`Error loading image ${item.src}:`, error)
			item.image = image
		})
	}
	clearCanvas() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
	}

	draw() {
		this.clearCanvas()

		this.backgroundImages.forEach((item) => {
			const { image, speed, x, y } = item

			const scaleX = this.canvas.width / image.width
			const scaleY = this.canvas.height / image.height

			const scale = Math.max(scaleX, scaleY)

			// Update positions based on speed for parallax effect
			item.x -= speed

			// Wrap around the image to create a seamless loop
			if (item.x <= -this.canvas.width) {
				item.x = 0
			}

			this.ctx.drawImage(image, x, y, image.width * scale, image.height * scale)
			this.ctx.drawImage(
				image,
				x + this.canvas.width,
				y,
				image.width * scale,
				image.height * scale
			)
		})
	}
}
