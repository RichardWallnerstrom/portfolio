// RetroWorld.js
import Canvas from './Canvas.js';
import Player from './Player.js';
import PlayerControls from "./PlayerControls.js";

export default class RetroWorld {
  constructor() {
    this.canvas = new Canvas();
    this.player = new Player(this.canvas.canvas);
    this.playerControls = new PlayerControls(this.player);
  }

  update() {
    this.playerControls.update();
    this.render();
  }

  render() {
    this.canvas.clearCanvas();
    this.canvas.draw();
    this.player.update(this.canvas.ctx);
  }
}
