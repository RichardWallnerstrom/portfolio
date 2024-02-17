import SpaceWorld from "./SpaceWorld.js"

const runSpaceWorld = () => {
	const div = document.getElementById("mainContainer")
	const link1 = document.getElementById("aboutMenu")
	const link2 = document.getElementById("projectsMenu")
	const reloadButton = document.getElementById("reloadPage")
	const shipHud = document.getElementById("shipHud")
	const app2d = document.getElementById("app2d")
	const settings = document.getElementById("settingsHud")
	settings.style.display = "inline-block"

	div.style.display = "none" // Hide website
	app2d.style.display = "none"
	shipHud.style.display = "block"
	document.getElementById("controlsHud").style.display = "block"

	link1.classList.add("hidden")
	link2.classList.add("hidden")
	reloadButton.classList.remove("hidden")

	const spaceWorld = new SpaceWorld()
	window.spaceWorld = spaceWorld

	const animate = () => {
		requestAnimationFrame(animate)
		spaceWorld.animate()
	}

	animate()
}

export { runSpaceWorld }
