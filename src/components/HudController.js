export default class HudController {
	constructor(spaceShip, planets, spaceShipControls) {
		this.spaceShip = spaceShip
		this.spaceShipControls = spaceShipControls
		this.planets = planets
		this.smallHud = document.getElementById("smallHud")
		this.bigHud = document.getElementById("bigHud")
		this.shipHud = document.getElementById("shipHud")
		this.shipSpeed = document.getElementById("shipSpeed")
		this.distanceToSun = document.getElementById("distanceToSun")
		this.distanceToUranus = document.getElementById("distanceToUranus")

		this.distancesToPlanets = {}
		this.updateDistances()
	}
	updateDistances() {
		for (const planet of this.planets) {
			if (planet.model) {
				this.distancesToPlanets[planet.name] =
					this.spaceShip.model.position.distanceTo(planet.model.position)
			}
		}
	}

	DisplayHud() {
		const kilometers = 10
		this.updateDistances()
		const closestPlanet = Object.keys(this.distancesToPlanets).reduce((a, b) =>
			this.distancesToPlanets[a] < this.distancesToPlanets[b] ? a : b
		)
		this.shipSpeed.innerHTML =
			"Speed: " +
			this.spaceShipControls.getSpeed().toFixed(2) * kilometers +
			" km/h"
		this.distanceToSun.innerHTML = "Nearest body: " + closestPlanet
		this.distanceToUranus.innerHTML =
			"Distance: " + this.distancesToPlanets[closestPlanet] * kilometers + " km"
		if (this.distancesToPlanets[closestPlanet] < 50000) {
			this.shipHud.style.display = "none"
			this.UpdateHud(`/pages/space/${closestPlanet}.html`, this.smallHud)
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
}
