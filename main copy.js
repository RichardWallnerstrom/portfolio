function updateContent(url, container) {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to fetch page! " + response.message)
            }
            return response.text()
        })
        .then(data => {
            console.log("Fetched data:", data)
            document.getElementById(container).innerHTML = data
            updateEventListeners(container) 
        })
        .catch(error => {
            console.error("Failed to fetch content", error)
        })
}
function updateEventListeners(container) {
        const spaceElement = document.getElementById("space-text")
        const retroElement = document.getElementById("retro-text")
        const musicElement = document.getElementById("music-text")

        const workElement = document.getElementById("work-text")
        const educationElement = document.getElementById("education-text")
        const skillsElement = document.getElementById("skills-text")
        const aboutElement = document.getElementById("about-text")

        spaceElement.addEventListener('click', function() {
            updateContent('pages/space.html', 'contentContainer');
        });

        retroElement.addEventListener('click', function() {
            updateContent('pages/retro.html', 'contentContainer');
        });

        musicElement.addEventListener('click', function() {
            updateContent('pages/music.html', 'contentContainer');
        });


        workElement.addEventListener('click', function() {
            updateContent('pages/workExperience.html', 'contentContainer');
        });

        educationElement.addEventListener('click', function() {
            updateContent('pages/education.html', 'contentContainer');
        });

        skillsElement.addEventListener('click', function() {
            updateContent('pages/skills.html', 'contentContainer');
        });
        aboutElement.addEventListener('click', function() {
            updateContent('pages/about.html', 'contentContainer');
        });

    
}
document.addEventListener("DOMContentLoaded", function() {
    // Menu div on the left
    const parentElement = document.getElementById("menuContainer")
    const projectsElement = document.getElementById("projects-text")
    const aboutElement = document.getElementById("about-text")

    projectsElement.addEventListener('click', function() {
        updateContent('pages/menuProjects.html', 'menuContainer')
    })
    aboutElement.addEventListener('click', function() {
        updateContent('pages/menuAbout.html', 'menuContainer')
    })
    // Content div on the right




})
