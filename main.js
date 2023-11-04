import * as THREE from 'three';


import SpaceWorld from './src/spaceScene/SpaceWorld.js'
const spaceWorld =  new SpaceWorld()
spaceWorld.playMusic()
const animate = () => {
  requestAnimationFrame(animate)
  spaceWorld.animate()
}
  
  animate()