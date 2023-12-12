import SpaceWorld from './SpaceWorld.js';

let animationId; 

const runSpaceWorld = () => {
  const div = document.getElementById('mainContainer'); 
  const link1 = document.getElementById('about-text'); 
  const link2 = document.getElementById('projects-text');
  const reloadButton = document.getElementById('reloadPage'); 
 
  // window.location.reload()
  div.style.display = 'none';
  link1.style.display = 'none';
  link2.style.display = 'none';
  reloadButton.style.display = 'block';


  const spaceWorld = new SpaceWorld();
  spaceWorld.audioManager.playMusic();

  const animate = () => {
    animationId = requestAnimationFrame(animate);
    spaceWorld.animate();
  };

  animate();
  return animationId;
};

export { runSpaceWorld};