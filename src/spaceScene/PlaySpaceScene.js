import SpaceWorld from './SpaceWorld.js';

let animationId; 

const runSpaceWorld = () => {
  const div = document.getElementById('mainContainer'); 
  const link1 = document.getElementById('aboutMenu'); 
  const link2 = document.getElementById('projectsMenu');
  const reloadButton = document.getElementById('reloadPage'); 
  const shipHud = document.getElementById('shipHud'); 

 
  div.style.display = 'none';   // Hide website
  shipHud.style.display = 'block';

  link1.style.display = 'none';
  link2.style.display = 'none';
  reloadButton.style.display = 'block';


  const spaceWorld = new SpaceWorld();
  spaceWorld.audioManager.playMusic();

  const animate = () => {
    requestAnimationFrame(animate);
    spaceWorld.animate();
  };

  animate();
};

export { runSpaceWorld};