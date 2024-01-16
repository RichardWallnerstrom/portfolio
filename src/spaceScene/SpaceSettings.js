export default class SpaceSettings {
	constructor() {
		document.addEventListener("DOMContentLoaded", function () {
			var checkboxes = document.querySelectorAll(".planetDistance")

			checkboxes.forEach(function (checkbox) {
				checkbox.addEventListener("change", function () {
					checkboxes.forEach(function (otherCheckbox) {
						if (otherCheckbox !== checkbox) {
							otherCheckbox.checked = false
						}
					})
					if (checkbox.checked) {
						console.log("Checkbox checked:", checkbox.checked)

						const customEvent = new CustomEvent("movePlanetsEvent", {
							detail: checkbox.value,
						})
						document.dispatchEvent(customEvent)
						console.log(customEvent.detail)
					}
				})
			})
		})
	}
}
