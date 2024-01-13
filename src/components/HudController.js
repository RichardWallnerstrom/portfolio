export default class HudController {
	constructor(spaceShip, earth, mars, spaceShipControls) {
		this.spaceShip = spaceShip
		this.spaceShipControls = spaceShipControls
		this.earth = earth
		this.mars = mars
		this.smallHud = document.getElementById("smallHud")
		this.bigHud = document.getElementById("bigHud")
		this.shipHud = document.getElementById("shipHud")
		this.shipSpeed = document.getElementById("shipSpeed")
		this.distanceToEarth = document.getElementById("shipDistanceToEarth")
		this.distanceToMars = document.getElementById("shipDistanceToMars")
	}
	DisplayHud() {
		// this.CalculateDistances()
		//Update small hud elements
		this.shipSpeed.innerHTML =
			"Speed: " + this.spaceShipControls.getSpeed().toFixed(5) + " km/s"
		this.distanceToEarth.innerHTML =
			"Distance to Earth: " +
			(this.spaceShip.distanceToEarth / 1000).toFixed(4) +
			" AU"
		this.distanceToMars.innerHTML =
			"Distance to Mars: " +
			(this.spaceShip.distanceToMars / 1000).toFixed(4) +
			" AU"
		const fetchedUrl =
			this.spaceShip.distanceToEarth < this.spaceShip.distanceToMars
				? "/pages/earth.html"
				: "/pages/mars.html"
		if (
			this.spaceShip.distanceToEarth < 1200 ||
			this.spaceShip.distanceToMars < 700
		) {
			this.shipHud.style.display = "none"
			this.UpdateHud(fetchedUrl, this.smallHud)
		} else {
			this.shipHud.style.display = "block"
			this.smallHud.style.display = "none"
		}
	}
	UpdateHud(fetchedUrl, hud) {
		fetch(fetchedUrl)
			.then((page) => page.text())
			.then((text) => {
				hud.innerHTML = text
				hud.style.display = "grid"
			})
	}
	CalculateDistances() {
		this.spaceShip.distanceToEarth = this.spaceShip.model.position.distanceTo(
			this.earth.model.position
		)
		this.spaceShip.distanceToMars = this.spaceShip.model.position.distanceTo(
			this.mars.model.position
		)
	}
}
