export default class Animation {
	constructor() {
		this.animations = {
			idle: [
				"../../assets/2d/player/Idle.1.png",
				"../../assets/2d/player/Idle.2.png",
				"../../assets/2d/player/Idle.3.png",
				"../../assets/2d/player/Idle.4.png",
				"../../assets/2d/player/Idle.5.png",
				"../../assets/2d/player/Idle.6.png",
				"../../assets/2d/player/Idle.7.png",
				"../../assets/2d/player/Idle.8.png",
				"../../assets/2d/player/Idle.9.png",
				"../../assets/2d/player/Idle.10.png",
			],
			run: [
				"../../assets/2d/player/Run.1.png",
				"../../assets/2d/player/Run.2.png",
				"../../assets/2d/player/Run.3.png",
				"../../assets/2d/player/Run.4.png",
				"../../assets/2d/player/Run.5.png",
				"../../assets/2d/player/Run.6.png",
				"../../assets/2d/player/Run.7.png",
				"../../assets/2d/player/Run.8.png",
			],
			jump: [
				"../../assets/2d/player/Jump.1.png",
				"../../assets/2d/player/Jump.2.png",
				"../../assets/2d/player/Jump.3.png",
				"../../assets/2d/player/Jump.4.png",
				"../../assets/2d/player/Jump.5.png",
				"../../assets/2d/player/Jump.6.png",
				"../../assets/2d/player/Jump.7.png",
				"../../assets/2d/player/Jump.8.png",
				"../../assets/2d/player/Jump.9.png",
				"../../assets/2d/player/Jump.10.png",
			],
			slide: [
				"../../assets/2d/player/Slide.1.png",
				"../../assets/2d/player/Slide.2.png",
				"../../assets/2d/player/Slide.3.png",
				"../../assets/2d/player/Slide.4.png",
				"../../assets/2d/player/Slide.5.png",
			],
			stab: [
				"../../assets/2d/player/Melee.1.png",
				"../../assets/2d/player/Melee.2.png",
				"../../assets/2d/player/Melee.3.png",
				"../../assets/2d/player/Melee.4.png",
				"../../assets/2d/player/Melee.5.png",
				"../../assets/2d/player/Melee.6.png",
				"../../assets/2d/player/Melee.7.png",
			],
		}
		this.currentAnimation = "idle"
		this.currentFrameIndex = 0
		this.image = new Image()
		this.image.src =
			this.animations[this.currentAnimation][this.currentFrameIndex]
		this.frameInterval = 50
		this.lastFrameTime = Date.now()

		this.preloadImages()
	}

	preloadImages() {
		// Load all images into cache //TODO investigate why they disappear from cache
		for (const animationKey in this.animations) {
			///TODO remove and verify if statement

			if (this.animations.hasOwnProperty(animationKey)) {
				this.animations[animationKey].forEach((frameUrl) => {
					const img = new Image()
					img.src = frameUrl
				})
			}
		}
	}

	animate() {
		const currentTime = Date.now()
		if (currentTime - this.lastFrameTime > this.frameInterval) {
			this.currentFrameIndex =
				(this.currentFrameIndex + 1) %
				this.animations[this.currentAnimation].length
			this.image.src =
				this.animations[this.currentAnimation][this.currentFrameIndex]
			this.lastFrameTime = currentTime
		}
	}

	changeAnimationState(newState) {
		this.currentAnimation = newState
		this.currentFrameIndex = 0
		this.image.src =
			this.animations[this.currentAnimation][this.currentFrameIndex]
		this.lastFrameTime = Date.now()
	}
}
