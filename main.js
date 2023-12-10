function updateMenu(url, container) {
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

async function loadContent(page, container) {
    try {
        const response = await fetch(page);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const html = await response.text();
        document.getElementById(container).innerHTML = html;
        updateEventListeners(container); // Reattach event listeners after loading content
    } catch (error) {
        console.error('Error loading content:', error);
    }
}

document.addEventListener("DOMContentLoaded", function() {
    // Event listeners for static elements that are present initially
    const projectsElement = document.getElementById("projects-text");
    const aboutElement = document.getElementById("about-text");

    projectsElement.addEventListener('click', function() {
        updateMenu('pages/menuProjects.html', 'menuContainer');
    });

    aboutElement.addEventListener('click', function() {
        updateMenu('pages/menuAbout.html', 'menuContainer');
    });

    // Dynamic content loading
    updateEventListeners('contentContainer'); // Attach initial event listeners for dynamic content
});
function updateEventListeners(container) {
    const spaceElement = document.getElementById("space-text");
    const retroElement = document.getElementById("retro-text");
    const musicElement = document.getElementById("music-text");
    const workElement = document.getElementById("work-text");
    const educationElement = document.getElementById("education-text");
    const skillsElement = document.getElementById("skills-text");
    const aboutElement = document.getElementById("about-text");

    if (spaceElement) {
        spaceElement.addEventListener('click', function() {
            loadContent('pages/space.html', 'contentContainer');
        });
    }

    if (retroElement) {
        retroElement.addEventListener('click', function() {
            loadContent('pages/retro.html', 'contentContainer');
        });
    }

    if (musicElement) {
        musicElement.addEventListener('click', function() {
            loadContent('pages/music.html', 'contentContainer');
        });
    }

    if (workElement) {
        workElement.addEventListener('click', function() {
            loadContent('pages/workExperience.html', 'contentContainer');
        });
    }

    if (educationElement) {
        educationElement.addEventListener('click', function() {
            loadContent('pages/education.html', 'contentContainer');
        });
    }

    if (skillsElement) {
        skillsElement.addEventListener('click', function() {
            loadContent('pages/skills.html', 'contentContainer');
        });
    }

    if (aboutElement) {
        aboutElement.addEventListener('click', function() {
            loadContent('pages/about.html', 'contentContainer');
        });
    }
}

