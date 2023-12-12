
import SpaceWorld from './SpaceWorld.js';

const spaceWorld =  new SpaceWorld()
spaceWorld.audioManager.playMusic()

const animate = () => {
  requestAnimationFrame(animate)
  spaceWorld.animate()
}
  
animate()