import Animation from "./Animation.js"
export default class Player {
	constructor() {
		this.animation = new Animation()
		this.image = this.animation.image
		this.setupCanvas()
		this.isFacingRight = true
		this.isColliding = {
			left: false,
			right: false,
			down: false,
		}
		this.state = {
			isFalling: false,
			isGrounded: false,
			hasJumped: false,
		}
		this.position = {
			x: 850,
			y: 400,
			previousY: 50,
		}
		this.size = {
			height: window.innerHeight * 0.2,
			width: window.innerWidth * 0.12,
		}
		this.velocity = {
			x: 0,
			y: 1,
		}
		this.gravity = 0.5
	}
	setupCanvas() {
		this.canvas = document.getElementById("character2d")
		this.canvas.width = window.innerWidth
		this.canvas.height = window.innerHeight
		this.ctx = this.canvas.getContext("2d")
	}
	draw() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
		if (!this.isFacingRight) {
			this.ctx.save()
			this.ctx.scale(-1, 1)
			this.ctx.drawImage(
				this.image,
				-this.position.x - this.size.width,
				this.position.y,
				this.size.width,
				this.size.height
			)
			this.ctx.restore()
		} else {
			this.ctx.drawImage(
				this.image,
				this.position.x,
				this.position.y,
				this.size.width,
				this.size.height
			)
		}
	}
	update() {
		this.checkIfFalling()
		this.checkIfGrounded()
		this.checkCollisionWithElements()
		this.applyGravity()
		this.draw()
		this.position.x += this.velocity.x
		this.animation.animate()
		this.resetAnimation()
	}
	checkIfFalling() {
		if (this.position.y > this.position.previousY) {
			this.state.isFalling = true
		} else {
			this.state.isFalling = false
		}
		this.position.previousY = this.position.y
	}
	checkIfGrounded() {
		this.state.isGrounded =
			this.isColliding.down ||
			this.position.y + this.size.height + this.velocity.y >= this.canvas.height
	}
	resetAnimation() {
		if (
			this.velocity.x == 0 &&
			this.state.isGrounded &&
			this.animation.currentAnimation !== "idle" &&
			this.animation.currentAnimation !== "stab"
		)
			this.animation.changeAnimationState("idle")
	}
	applyGravity() {
		this.position.y += this.velocity.y
		if (!this.state.isGrounded) {
			this.velocity.y += this.gravity
		} else if (
			(this.isColliding.down && this.state.isFalling) ||
			this.state.isGrounded
		) {
			this.velocity.y = 0
			this.state.hasJumped = false
		}
	}
	///Movement //////
	moveLeft() {
		this.isColliding.right = false
		this.isFacingRight = false
		if (this.velocity.x > -13) this.velocity.x -= 2
		if (
			this.animation.currentAnimation !== "run" &&
			this.animation.currentAnimation !== "jump"
		)
			this.animation.changeAnimationState("run")
	}
	moveRight() {
		this.isColliding.left = false
		this.isFacingRight = true
		if (this.velocity.x < 13) this.velocity.x += 2
		if (
			this.animation.currentAnimation !== "run" &&
			this.animation.currentAnimation !== "jump"
		)
			this.animation.changeAnimationState("run")
	}
	jump() {
		if (
			(!this.state.hasJumped && this.state.isGrounded) ||
			(!this.state.hasJumped && this.isColliding.down && this.state.isFalling)
		) {
			this.velocity.y -= 17
			this.animation.changeAnimationState("jump")
			this.state.hasJumped = true
		}
	}
	slide() {
		this.velocity.x += this.isFacingRight ? 8 : -8
		if (this.animation.currentAnimation !== "slide")
			this.animation.changeAnimationState("slide")
	}
	stab() {
		if (this.animation.currentAnimation !== "stab")
			this.animation.changeAnimationState("stab")
	}
	checkCollisionWithElements() {
		const headOffset = 40
		const collisionOffset = 150
		const collidables = document.querySelectorAll(".collidable")
		const playerBox = {
			x: this.position.x,
			y: this.position.y + headOffset,
			width: this.size.width,
			height: this.size.height,
		}
		this.lastCollidable
		let collisionDown = false // instead of changing the global collision
		collidables.forEach((collidable) => {
			const collidableRect = collidable.getBoundingClientRect()

			const collidableBox = {
				x: collidableRect.left,
				y: collidableRect.top,
				width: collidableRect.width,
				height: collidableRect.height,
			}
			if (
				playerBox.x < collidableBox.x + collidableBox.width &&
				playerBox.x + playerBox.width > collidableBox.x &&
				playerBox.y < collidableBox.y + collidableBox.height &&
				playerBox.y + playerBox.height > collidableBox.y
			) {
				if (this.animation.currentAnimation === "stab") collidable.click()
				if (
					this.animation.currentAnimation === "stab" &&
					collidable.classList.contains("breakable")
				) {
					collidable.classList.remove("animate__flip")
					collidable.classList.remove("animate__rollIn")

					collidable.classList.remove("custom-delay-1")

					collidable.classList.add("animate__rubberBand")
				}

				if (
					playerBox.x < collidableBox.x + collidableBox.width || // If left/right
					playerBox.x + playerBox.width > collidableBox.x
				) {
				}
				if (
					playerBox.y + collisionOffset <
					collidableBox.y + collidableBox.height
				) {
					// If below
					if (
						collidable !== this.lastCollidable &&
						!collidable.classList.contains("menu")
					) {
						console.log("collidable" + this.lastCollidable)
						this.lastCollidable = collidable
						collidable.click()
					}
					collisionDown = true
				} else {
					collisionDown = false
				}
			}
		}) //End of foreach
		this.isColliding.down = collisionDown
	}
}
