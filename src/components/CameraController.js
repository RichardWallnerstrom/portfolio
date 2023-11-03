import * as THREE from 'three';
export default class CameraController {
    constructor(spaceShip, camera) {
        this.spaceShip = spaceShip;
        this.camera = camera;
    }

    updateCameraPosition() {
        const trailingOffset = new THREE.Vector3(0, 10, 20);
        const behindShipVector = new THREE.Vector3(0, 0, 1);
        behindShipVector.applyQuaternion(this.spaceShip.model.quaternion);
        behindShipVector.multiplyScalar(trailingOffset.z);
        const cameraPosition = this.spaceShip.model.position.clone().add(behindShipVector);
        this.camera.position.copy(cameraPosition);
        this.spaceShip.model.getWorldQuaternion(this.camera.quaternion);
    }
}