import SpaceWorld from './SpaceWorld.js';

const runSpaceWorld = () => {
  const div = document.getElementById('mainContainer'); 
  const link1 = document.getElementById('aboutMenu'); 
  const link2 = document.getElementById('projectsMenu');
  const reloadButton = document.getElementById('reloadPage'); 
  const shipHud = document.getElementById('shipHud'); 
  const app2d = document.getElementById('app2d'); 


 
  div.style.display = 'none';   // Hide website
  app2d.style.display = 'none';
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