export default class AudioManager {
    constructor(audioPath) {
      this.audio = new Audio(audioPath);
      this.audio.loop = true;
    }
    playMusic() {
      this.audio.play()
    }
}