export default class HudController {
    constructor(spaceShip, earth, mars) {
        this.spaceShip = spaceShip;
        this.earth = earth;
        this.mars = mars;
        this.smallHud = document.getElementById('smallHud');
        this.bigHud = document.getElementById('bigHud');


    }
    DisplayHud() {
        const distanceToEarth = this.spaceShip.model.position.distanceTo(this.earth.model.position);
        const distanceToMars = this.spaceShip.model.position.distanceTo(this.mars.model.position); 
        if (distanceToEarth < 1200 || distanceToMars < 700) {
            const fetchUrl = (distanceToEarth < distanceToMars) 
            ? '../pages/earth.html' : '../pages/mars.html';       

            fetch(fetchUrl)
            .then(page => page.text())
            .then(text => {
              this.smallHud.innerHTML = text;
              this.smallHud.style.display = 'block'; 
            })
            .catch(error => console.error('Error fetching HUD content:', error));
        } 
        else {
          this.smallHud.style.display = 'none';
        }
      }
}