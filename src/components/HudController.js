export default class HudController {
    constructor(spaceShip, earth, mars) {
        this.spaceShip = spaceShip;
        this.earth = earth;
        this.mars = mars;
        this.smallHud = document.getElementById('smallHud');
        this.bigHud = document.getElementById('bigHud');
    }
    DisplayHud() {
        this.CalculateDistances(); 
        const fetchedUrl = (this.spaceShip.distanceToEarth < this.spaceShip.distanceToMars) 
            ? '../pages/earth.html' 
            : '../pages/mars.html'; 
        if (this.spaceShip.distanceToEarth < 1200 || this.spaceShip.distanceToMars < 700) {
            // this.bigHud.style.display = 'none';
            this.UpdateHud(fetchedUrl, this.smallHud);
        } 
        else {
            // this.bigHud.style.display = 'block';
            this.smallHud.style.display = 'none';
        }
      }
    UpdateHud(fetchedUrl, hud) {
        fetch(fetchedUrl).then(page => page.text())
            .then(text => {
              hud.innerHTML = text;
              hud.style.display = 'grid'; 
            })
    }
    CalculateDistances() {
        this.spaceShip.distanceToEarth = this.spaceShip.model.position.distanceTo(
            this.earth.model.position);
        this.spaceShip.distanceToMars = this.spaceShip.model.position.distanceTo(
            this.mars.model.position); 
    }
    
}