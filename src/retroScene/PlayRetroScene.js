import RetroWorld from './RetroWorld.js';

const runRetroWorld = () => {
  const div = document.getElementById('mainContainer'); 
  const link1 = document.getElementById('aboutMenu'); 
  const link2 = document.getElementById('projectsMenu');
  const reloadButton = document.getElementById('reloadPage'); 
  const shipHud = document.getElementById('shipHud'); 
  const app2d = document.getElementById('app2d'); 
  // window.addEventListener('load', function() {
  //   const canvas = document.getElementById('app2d');
  //   canvas.width = window.innerWidth;
  //   canvas.height = window.innerHeight;
  // }); 



  div.style.zIndex = '99999';   // Hide website

  // div.style.display = 'none';   // Hide website
  app2d.style.display = 'block';
  app2d.style.zIndex = '0'; // Set a high z-index value


  // link1.style.display = 'none';
  // link2.style.display = 'none';
  // reloadButton.style.display = 'block';
  const retroWorld = new RetroWorld();
  retroWorld.update();
  retroWorld.audioManager.playMusic();

  const animate = () => {
    requestAnimationFrame(animate);
    retroWorld.update();

  };

  animate();
};

export { runRetroWorld};

