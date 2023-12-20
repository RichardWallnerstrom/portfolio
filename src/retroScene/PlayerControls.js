export default class PlayerControls {
    constructor(player) {
        this.player = player;
        this.keys = {
            KeyW: false,
            KeyA: false,
            KeyS: false,
            KeyD: false
        }; 

        document.addEventListener('keydown', (event) => this.onKeyDown(event), false);
        document.addEventListener('keyup', (event) => this.onKeyUp(event), false);
    }
    onKeyDown(event) {
        this.keys[event.code] = true;
    }
    onKeyUp(event) {
        this.keys[event.code] = false;
        this.player.velocity.x = 0;
    }
    update() {  
        if (this.keys['KeyD']) {
            this.player.moveRight();
        }
        if (this.keys['KeyA']) {
            this.player.moveLeft();
        }
        if (this.keys['KeyW']) {
            this.player.jump();
        }
        if (this.keys['KeyS']) {
            this.player.slide();
        }
    }
}
