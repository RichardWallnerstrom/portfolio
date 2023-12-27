import RetroWorld from "./RetroWorld.js"

const runRetroWorld = () => {
	const div = document.getElementById("mainContainer")
	const link1 = document.getElementById("aboutMenu")
	const link2 = document.getElementById("projectsMenu")
	const reloadButton = document.getElementById("reloadPage")
	const shipHud = document.getElementById("shipHud")
	const app2d = document.getElementById("app2d")
	// window.addEventListener('load', function() {
	//   const canvas = document.getElementById('app2d');
	//   canvas.width = window.innerWidth;
	//   canvas.height = window.innerHeight;
	// });

	div.style.zIndex = "99999"

	app2d.style.display = "block"
	app2d.style.zIndex = "0"

	const retroWorld = new RetroWorld()
	retroWorld.update()

	const animate = () => {
		requestAnimationFrame(animate)
		retroWorld.update()
	}

	animate()
}

export { runRetroWorld }
