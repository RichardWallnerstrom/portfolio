import * as THREE from 'three';
export default class CameraController {
    constructor(spaceShip) {
        this.spaceShip = spaceShip;
        this.fov = 75
        this.nearClipDistance = 0.1
        this.farClipDistance = 9999

        this.camera = new THREE.PerspectiveCamera(
            this.fov, 
            innerWidth / innerHeight, 
            this.nearClipDistance,
            this.farClipDistance
          )
          this.camera.position.set(25, 10, 25);
    }

    updateCameraPosition() {
        const trailingOffset = new THREE.Vector3(20, 20, 20);
        const behindShipVector = new THREE.Vector3(0, 0, -1);
        behindShipVector.applyQuaternion(this.spaceShip.model.quaternion);
        behindShipVector.multiplyScalar(-trailingOffset.z);
        const cameraPosition = this.spaceShip.model.position.clone().add(behindShipVector);
        this.camera.position.copy(cameraPosition);
        this.spaceShip.model.getWorldQuaternion(this.camera.quaternion);
    }
}