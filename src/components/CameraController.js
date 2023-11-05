import * as THREE from 'three'
export default class CameraController {
    constructor(spaceShip, earth, mars) {
        this.spaceShip = spaceShip
        this.earth = earth
        this.mars = mars
        this.fov = 75
        this.nearClipDistance = 0.1
        this.farClipDistance = 9999
        this.isMouseOverEarth
        this.isMouseOverMars 


        this.camera = new THREE.PerspectiveCamera(
            this.fov, 
            innerWidth / innerHeight, 
            this.nearClipDistance,
            this.farClipDistance
          )
        this.camera.position.set(25, 10, 25)
        const marsText = document.getElementById('mars-text')
        const earthText = document.getElementById('earth-text')
        
        const handlePlanetMouseHover = (planet) => { // Create master event for mouse overs
            
            return {
                mouseover: () => {
                    (planet.planet == "earth")
                    ? this.isMouseOverEarth = true 
                    : this.isMouseOverMars = true

                },
                mouseout: () => {
                    this.isMouseOverEarth = false 
                    this.isMouseOverMars = false
                }
            }
        }
        
        marsText.addEventListener('mouseover', handlePlanetMouseHover(this.mars).mouseover)
        marsText.addEventListener('mouseout', handlePlanetMouseHover(this.mars).mouseout)
        
        earthText.addEventListener('mouseover', handlePlanetMouseHover(this.earth).mouseover)
        earthText.addEventListener('mouseout', handlePlanetMouseHover(this.earth).mouseout)
        
    }

    placeCameraBehindShip() {
        const trailingOffset = new THREE.Vector3(20, 20, -20)    
        const behindShipVector = new THREE.Vector3(0, 0, -1)    // Create a new vector (0, 0, -1) representing a direction behind the ship   
        behindShipVector.applyQuaternion(this.spaceShip.model.quaternion) // Apply the ship's quaternion to the behindShipVector
        behindShipVector.multiplyScalar(-trailingOffset.z)     // Multiply the vector by the negative of the z-component of the trailing offset
        const cameraPosition = this.spaceShip.model.position.clone().add(behindShipVector)
        this.camera.position.copy(cameraPosition)
        this.spaceShip.model.getWorldQuaternion(this.camera.quaternion) // Set camera quaternion
    }
    lookAtObject() {
        if (this.isMouseOverEarth) {
            this.camera.lookAt(this.earth.model.position);
            this.camera.updateProjectionMatrix(); // Update the camera's projection matrix
        } else if (this.isMouseOverMars) {
            this.camera.lookAt(this.mars.model.position);
            this.camera.updateProjectionMatrix(); 
        } else {
            this.placeCameraBehindShip();
        }
    }
}