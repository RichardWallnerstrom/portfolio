import { runSpaceWorld } from "./src/spaceScene/PlaySpaceScene.js"
import { runRetroWorld } from "./src/retroScene/PlayRetroScene.js"

let lastMenuUrl = ""
let lastContentUrl = ""
function updateMenu(url) {
	// Only for left side menu

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
const cachedPages = new Map()
async function loadContent(url) {
	// Only for right side content
	if (lastContentUrl === url) return ///Return if same url as last
	else lastContentUrl = url
	if (cachedPages.has(url)) {
		document.getElementById("contentContainer").innerHTML = cachedPages.get(url)
		updateEventListeners()
		return
	}
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
	const projectsMenuElement = document.getElementById("projectsMenu")
	const aboutMenuElement = document.getElementById("aboutMenu")
	const reloadButton = document.getElementById("reloadPage")
	const helloMessage = document.getElementById("hello")
	const fullstackMessage = document.getElementById("magicLine")
	const profilePicture = document.getElementById("profileDiv")

	const pictureButton = document.getElementById("profileDiv") // quick link to solar system
	pictureButton.addEventListener("click", runSpaceWorld)
	reloadButton.classList.add("hidden")

	projectsMenuElement.addEventListener("click", function () {
		updateMenu("./pages/menuProjects.html")
		projectsMenuElement.classList.add("hidden")
		aboutMenuElement.classList.remove("hidden")
		removeWelcomeMessage()
	})
	aboutMenuElement.addEventListener("click", function () {
		updateMenu("./pages/menuAbout.html")
		aboutMenuElement.classList.add("hidden")
		projectsMenuElement.classList.remove("hidden")
		removeWelcomeMessage()
	})
	reloadButton.addEventListener("click", function () {
		window.location.reload()
	})
	// Space settings hud
	var checkboxes = document.querySelectorAll(".planetDistance, .helperSetting")
	// Make sure only one checkbox is ticked per row
	checkboxes.forEach((checkbox) => {
		checkbox.addEventListener("change", () => {
			checkboxes.forEach((otherCheckbox) => {
				if (
					otherCheckbox !== checkbox &&
					otherCheckbox.classList.contains(checkbox.classList[0])
				) {
					otherCheckbox.checked = false
				}
			})
			if (checkbox.checked) {
				const customEvent = new CustomEvent("checkboxEvent", {
					detail: checkbox.value,
				})
				document.dispatchEvent(customEvent)
			}
		})
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
	runRetroWorld()
})
// Dynamically update listeners
function updateEventListeners() {
	const spaceElement = document.getElementById("fullStackLink")

	const artsElement = document.getElementById("artsLink")
	const workElement = document.getElementById("workLink")
	const aboutElement = document.getElementById("aboutLink")
	const spaceButton = document.getElementById("playSpaceEngine")

	if (spaceButton) {
		spaceButton.addEventListener("click", runSpaceWorld)
	}
	if (spaceElement) {
		spaceElement.addEventListener("click", function () {
			loadContent("./pages/fullstack.html")
		})
	}
	if (artsElement) {
		artsElement.addEventListener("click", function () {
			loadContent("./pages/arts.html")
		})
	}
	if (workElement) {
		workElement.addEventListener("click", function () {
			loadContent("./pages/workExperience.html")
		})
	}
	if (aboutElement) {
		aboutElement.addEventListener("click", function () {
			loadContent("./pages/about.html")
		})
	}
}
