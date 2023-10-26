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

        document.addEventListener('keydown', (event) => this.onKeyDown(event), false);
        document.addEventListener('keyup', (event) => this.onKeyUp(event), false);
    }
    onKeyDown(event) {
        this.keys[event.code] = true;
    }
    onKeyUp(event) {
        this.keys[event.code] = false;
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
            this.spaceShip.pitchUp(0.009);
        }
        if (this.keys['KeyC']) {
            this.spaceShip.pitchDown(0.009);
        }
    }
}
