export default class SpaceShipControls {
    constructor(spaceShip, initialSpeed) {
        this.spaceShip = spaceShip;
        this.speed = initialSpeed || 0;
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
    getSpeed() {
        return this.speed;
    }
    setSpeed(speed) {
        this.speed = speed;
    }
    onKeyDown(event) {
        if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
            this.keys['KeyShift'] = true;
        }
        this.keys[event.code] = true;
        // this.rocketSound.play();
    }
    onKeyUp(event) {
        if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
            this.keys['KeyShift'] = false;
        }
        this.keys[event.code] = false;
        // this.rocketSound.pause();
        // this.rocketSound.currentTime = 0;
    }
    update() {  
        const speedModifier = (this.keys['KeyShift']) ? 2 : 1;
        this.spaceShip.moveBackward(this.speed);

        if (this.keys['KeyF']) {
            this.speed += 0.3 * speedModifier;
        }
        if (this.keys['KeyC']) {
            this.speed -= 0.3 * speedModifier;
        }
        if (this.keys['KeyA']) {
            this.spaceShip.turnLeft(0.02 * speedModifier);
        }
        if (this.keys['KeyD']) {
            this.spaceShip.turnRight(0.02 * speedModifier);
        }
        if (this.keys['KeyQ']) {
            this.spaceShip.barrelLeft(0.03 * speedModifier);
        }
        if (this.keys['KeyE']) {
            this.spaceShip.barrelRight(0.03 * speedModifier);
        }
        if (this.keys['KeyS']) {
            this.spaceShip.pitchUp(0.02 * speedModifier);
        }
        if (this.keys['KeyW']) {
            this.spaceShip.pitchDown(0.02 * speedModifier);
        }
        if (this.keys['KeyG']) {
            this.speed = 0;
        }
    }
}
