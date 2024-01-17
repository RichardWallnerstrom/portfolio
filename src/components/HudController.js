export default class HudController {
	constructor(spaceShip, planets, spaceShipControls) {
		this.spaceShip = spaceShip
		this.spaceShipControls = spaceShipControls
		this.planets = planets
		this.planetHud = document.getElementById("planetHud")
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
		const nearestPlanet = Object.keys(this.distancesToPlanets).reduce((a, b) =>
			this.distancesToPlanets[a] < this.distancesToPlanets[b] ? a : b
		)
		const nearestPlanetObject = this.planets.find(
			(planet) => planet.name === nearestPlanet
		)
		this.shipSpeed.innerHTML =
			"Speed: " +
			this.spaceShipControls.getSpeed().toFixed(2) * kilometers +
			" u/h"
		this.distanceToSun.innerHTML = "Nearest body: " + nearestPlanet
		this.distanceToUranus.innerHTML =
			"Distance: " +
			this.distancesToPlanets[nearestPlanet].toFixed(1) *
				kilometers.toFixed(1) +
			" km"
		if (
			this.distancesToPlanets[nearestPlanet] <
			nearestPlanetObject.size * 2.5
		) {
			this.shipHud.style.display = "none"
			this.UpdateHud(`/pages/space/${nearestPlanet}.html`, this.planetHud)
		} else {
			this.shipHud.style.display = "block"
			this.planetHud.style.display = "none"
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
