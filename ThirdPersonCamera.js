import * as THREE from 
"https://cdn.skypack.dev/three@0.132.2/build/three.module.js";

export default class ThirdPersonCamera {
    constructor(params) {
      this._params = params;
      this._camera = params.camera;
      this._currentPosition = new THREE.Vector3();
      this._currentViewPoint = new THREE.Vector3();
    }
    _CalculateIdealOffset() { 
      const idealOffset = new THREE.Vector3(-15, 20, -30);
      idealOffset.applyQuaternion(this._params.target.model.quaternion);
      idealOffset.add(this._params.target.model.position);
      return idealOffset;
    }
    _CalculateIdealViewPoint() {
      const idealViewPoint = new THREE.Vector3(0, 10, 50);
      idealViewPoint.applyQuaternion(this._params.target.model.quaternion);
      idealViewPoint.add(this._params.target.model.position);
      return idealViewPoint;
    }
    Update() {
        console.log(this._params.target);
      const idealOffset = this._CalculateIdealOffset();
      const idealViewPoint = this._CalculateIdealViewPoint();
        
      const t = 0.15;
      this._currentPosition.lerp(idealOffset, t);
      this._currentViewPoint.lerp(idealViewPoint, t);
  
      this._camera.position.copy(this._currentPosition);
      this._camera.lookAt(this._currentViewPoint);
    }
  }