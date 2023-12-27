// RetroWorld.js
import Canvas from "./Canvas.js"
import Player from "./Player.js"
import AudioManager from "../components/AudioManager.js"
import PlayerControls from "./PlayerControls.js"

export default class RetroWorld {
	constructor() {
		this.canvas = new Canvas()
		this.player = new Player(this.canvas.canvas)
		this.audioManager = new AudioManager("/audio/silenthillinmajula.mp3")
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
