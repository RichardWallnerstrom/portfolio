import { runSpaceWorld } from "./src/spaceScene/PlaySpaceScene.js"
import { runRetroWorld } from "./src/retroScene/PlayRetroScene.js"

let lastMenuUrl = ""
let lastContentUrl = ""
function updateMenu(url) {
	// Only for left side menu
	console.log("lastmenu: " + lastMenuUrl)
	if (lastMenuUrl === url) return
	lastMenuUrl = url
	fetch(url)
		.then((response) => {
			if (!response.ok) {
				throw new Error("Failed to fetch page! " + response.message)
			}
			return response.text()
		})
		.then((data) => {
			document.getElementById("menuContainer").innerHTML = data
			updateEventListeners()
		})
		.catch((error) => {
			console.error("Failed to fetch content", error)
		})
}

async function loadContent(url) {
	// Only for right side content
	if (lastContentUrl === url) return
	lastContentUrl = url

	try {
		const response = await fetch(url)
		if (!response.ok) {
			throw new Error("Network response error")
		}
		const html = await response.text()
		document.getElementById("contentContainer").innerHTML = html
		updateEventListeners()
	} catch (error) {
		console.error("Error loading content: ", error)
	}
}

document.addEventListener("DOMContentLoaded", function () {
	const projectsMenuElement = document.getElementById("projectsMenu") // work menu
	const aboutMenuElement = document.getElementById("aboutMenu") // about menu
	const reloadButton = document.getElementById("reloadPage")
	const helloMessage = document.getElementById("hello")
	const fullstackMessage = document.getElementById("magicLine")
	const profilePicture = document.getElementById("profileDiv")

	// const spaceButtonTest = document.getElementById("playSpaceEngineTest"); // Testing ONly
	// spaceButtonTest.addEventListener('click', runRetroWorld);
	runRetroWorld()
	reloadButton.classList.add("hidden")

	projectsMenuElement.addEventListener("click", function () {
		updateMenu("pages/menuProjects.html")
		projectsMenuElement.classList.add("hidden")
		aboutMenuElement.classList.remove("hidden")
		removeWelcomeMessage()
	})
	aboutMenuElement.addEventListener("click", function () {
		updateMenu("pages/menuAbout.html")
		aboutMenuElement.classList.add("hidden")
		projectsMenuElement.classList.remove("hidden")
		removeWelcomeMessage()
	})
	reloadButton.addEventListener("click", function () {
		window.location.reload()
	})
	function removeWelcomeMessage() {
		helloMessage.classList.remove("animate__zoomIn")
		helloMessage.classList.remove("custom-delay-10")
		if (helloMessage.classList.contains("animate__flip"))
			helloMessage.classList.remove("animate__flip")
		helloMessage.classList.add("animate__bounceOutDown")
		fullstackMessage.classList.remove("animate__lightSpeedInLeft")
		fullstackMessage.classList.remove("custom-delay-10")
		fullstackMessage.classList.add("animate__hinge")
		profilePicture.classList.remove("animate__rollIn")
		profilePicture.classList.remove("custom-delay-10")
		profilePicture.classList.add("animate__flipOutY")
	}
})
function updateEventListeners() {
	const spaceElement = document.getElementById("fullStackLink")

	const retroElement = document.getElementById("backEndLink")
	const artsElement = document.getElementById("artsLink")
	const workElement = document.getElementById("workLink")
	const educationElement = document.getElementById("educationLink")
	const skillsElement = document.getElementById("skillsLink")
	const aboutElement = document.getElementById("aboutLink")
	const spaceButton = document.getElementById("playSpaceEngine")

	if (spaceButton) {
		spaceButton.addEventListener("click", runSpaceWorld)
	}
	if (spaceElement) {
		spaceElement.addEventListener("click", function () {
			loadContent("pages/fullstack.html")
		})
	}
	if (retroElement) {
		retroElement.addEventListener("click", function () {
			loadContent("pages/backend.html")
		})
	}
	if (artsElement) {
		artsElement.addEventListener("click", function () {
			loadContent("pages/arts.html")
		})
	}
	if (workElement) {
		workElement.addEventListener("click", function () {
			loadContent("pages/workExperience.html")
		})
	}
	if (educationElement) {
		educationElement.addEventListener("click", function () {
			loadContent("pages/education.html")
		})
	}
	if (skillsElement) {
		skillsElement.addEventListener("click", function () {
			loadContent("pages/skills.html")
		})
	}
	if (aboutElement) {
		aboutElement.addEventListener("click", function () {
			loadContent("pages/about.html")
		})
	}
}
