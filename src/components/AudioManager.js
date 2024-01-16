export default class AudioManager {
	constructor(audioPath) {
		this.audio = new Audio(audioPath)
		this.audio.loop = true
	}
	playMusic() {
		this.audio.play()
	}
	pauseMusic() {
		this.audio.pause()
	}
	stopMusic() {
		this.audio.pause()
		this.audio.currentTime = 0
	}
}
