// RetroWorld.js
import Canvas from "/src/retroScene/Canvas.js"
import Player from "/src/retroScene/Player.js"
import PlayerControls from "/src/retroScene/PlayerControls.js"

export default class RetroWorld {
	constructor() {
		this.canvas = new Canvas()
		this.player = new Player(this.canvas.canvas)
		this.playerControls = new PlayerControls(this.player)
	}

	update() {
		this.playerControls.update()
		this.render()
	}

	render() {
		this.player.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
		this.canvas.draw()
		this.player.update(this.canvas.ctx)
	}
}
