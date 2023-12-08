function updateContent(url, container) { // TODO: Change duplicate names on containers. 
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
    const spaceElement = document.getElementById("space-text");
    const retroElement = document.getElementById("retro-text");
    const musicElement = document.getElementById("music-text");

    const workElement = document.getElementById("work-text");
    const educationElement = document.getElementById("education-text");
    const skillsElement = document.getElementById("skills-text");
    const aboutElement = document.getElementById("about-text");
 
    spaceElement.addEventListener('click', function() {
        loadContent('pages/space.html', 'contentContainer');
    });
 
    retroElement.addEventListener('click', function() {
        loadContent('pages/retro.html', 'contentContainer');
    });
 
    musicElement.addEventListener('click', function() {
        loadContent('pages/music.html', 'contentContainer');
    });
    workElement.addEventListener('click', function() {
        loadContent('pages/workExperience.html', 'contentContainer');
    });
 
    educationElement.addEventListener('click', function() {
        loadContent('pages/education.html', 'contentContainer');
    });
 
    skillsElement.addEventListener('click', function() {
        loadContent('pages/skills.html', 'contentContainer');
    });
    aboutElement.addEventListener('click', function() {
        loadContent('pages/about.html', 'contentContainer');
    });
 
    window.addEventListener('DOMContentLoaded', function() {
    const projectsElement = document.getElementById("projects-text")
    const aboutElement = document.getElementById("about-text")

    projectsElement.addEventListener('click', function() {
        updateContent('pages/menuProjects.html', 'menuContainer')
    })
    aboutElement.addEventListener('click', function() {
        updateContent('pages/menuAbout.html', 'menuContainer')
    })    });
}
 
async function loadContent(page, container) {
    try {
        const response = await fetch(page);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const html = await response.text();
        document.getElementById(container).innerHTML = html;
    } catch (error) {
        console.error('Error loading content:', error);
    }
}
// document.addEventListener("DOMContentLoaded", function() {
//     // Menu div on the left
//     // const parentElement = document.getElementById("menuContainer")
//     const projectsElement = document.getElementById("projects-text")
//     const aboutElement = document.getElementById("about-text")

//     projectsElement.addEventListener('click', function() {
//         updateContent('pages/menuProjects.html', 'menuContainer')
//     })
//     aboutElement.addEventListener('click', function() {
//         updateContent('pages/menuAbout.html', 'menuContainer')
//     })
//     // Content div on the right




// })
