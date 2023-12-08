export default class SpaceShipControls {
    constructor(spaceShip, initialSpeed) {
        this.spaceShip = spaceShip;
        this.speed = initialSpeed || 10;
        this.momentum = 0;
        this.keys = {
            KeyW: false,
            KeyA: false,
            KeyS: false,
            KeyD: false
        };
        this.rocketSound = new Audio('audio/large-rocket-engine-86240.mp3');
        this.rocketSound.loop = true;
        this.rocketSound.volume = 0.7; 


        document.addEventListener('keydown', (event) => this.onKeyDown(event), false);
        document.addEventListener('keyup', (event) => this.onKeyUp(event), false);
    }
    onKeyDown(event) {
        this.keys[event.code] = true;
        this.rocketSound.play();
    }
    onKeyUp(event) {
        this.keys[event.code] = false;
        this.rocketSound.pause();
        this.rocketSound.currentTime = 0;
    }
    update() {  
        if (this.keys['KeyS']) {
            this.spaceShip.moveForward(this.speed);
        }
        if (this.keys['KeyW']) {
            this.spaceShip.moveBackward(this.speed);
        }
        if (this.keys['KeyA']) {
            this.spaceShip.turnLeft(0.02);
        }
        if (this.keys['KeyD']) {
            this.spaceShip.turnRight(0.02);
        }
        if (this.keys['KeyQ']) {
            this.spaceShip.barrelLeft(0.03);
        }
        if (this.keys['KeyE']) {
            this.spaceShip.barrelRight(0.03);
        }
        if (this.keys['KeyF']) {
            this.spaceShip.pitchUp(0.02);
        }
        if (this.keys['KeyC']) {
            this.spaceShip.pitchDown(0.02);
        }
    }
}