export default class HudController {
    constructor(spaceShip, earth, mars) {
        this.spaceShip = spaceShip;
        this.earth = earth;
        this.mars = mars;
        this.smallHud = document.getElementById('smallHud');
        this.bigHud = document.getElementById('bigHud');


    }
    UpdateHud(fetchedUrl) {
        fetch(fetchedUrl).then(page => page.text())
            .then(text => {
              this.smallHud.innerHTML = text;
              this.smallHud.style.display = 'block'; 
            })
    }
    DisplayHud() {
        const distanceToEarth = this.spaceShip.model.position.distanceTo(
            this.earth.model.position);
        const distanceToMars = this.spaceShip.model.position.distanceTo(
            this.mars.model.position); 
        const fetchedUrl = (distanceToEarth < distanceToMars) 
            ? '../pages/earth.html' : '../pages/mars.html'; 
        if (distanceToEarth < 1200 || distanceToMars < 700) {
            this.bigHud.style.display = 'none';
            this.UpdateHud(fetchedUrl);
        } 
        else {
            this.bigHud.style.display = 'block';
            this.smallHud.style.display = 'none';
        }
      }
}