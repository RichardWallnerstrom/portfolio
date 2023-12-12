
import SpaceWorld from './SpaceWorld.js';

const runSpaceWorld = () => {
   const divToHide = document.getElementById('mainContainer'); 
  if (divToHide) {
    divToHide.style.display = 'none';
  }
  const spaceWorld = new SpaceWorld();
  spaceWorld.audioManager.playMusic();

  const animate = () => {
    requestAnimationFrame(animate);
    spaceWorld.animate();
  };

  animate();
};

export { runSpaceWorld };
