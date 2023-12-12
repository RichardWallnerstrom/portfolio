import { runSpaceWorld } from './src/spaceScene/PlaySpaceScene.js';


function updateMenu(url, container) { // Only for left side menu
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
            updateEventListeners()
        })
        .catch(error => {
            console.error("Failed to fetch content", error)
        })
}

async function loadContent(page, container) {   // Only for right side content
    try {
        const response = await fetch(page);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const html = await response.text();
        document.getElementById(container).innerHTML = html;
        updateEventListeners(); 
    } catch (error) {
        console.error('Error loading content:', error);
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const projectsMenuElement = document.getElementById("projectsMenu");  // work menu
    const aboutMenuElement = document.getElementById("aboutMenu");         // about menu
    const reloadButton = document.getElementById('reloadPage'); 
    const helloMessage = document.getElementById("hello");
    const fullstackMessage = document.getElementById("magicLine");
    const profilePicture = document.getElementById("profileDiv");

    projectsMenuElement.addEventListener('click', function() {
        updateMenu('pages/menuProjects.html', 'menuContainer');
        projectsMenuElement.style.display = 'none';
        aboutMenuElement.style.display = 'block';
        helloMessage.style.display = 'none';
        fullstackMessage.style.display = 'none';
        profilePicture.style.display = 'none';
    });
    aboutMenuElement.addEventListener('click', function() {
        updateMenu('pages/menuAbout.html', 'menuContainer');
        aboutMenuElement.style.display = 'none';
        projectsMenuElement.style.display = 'block';
        helloMessage.style.display = 'none';
        fullstackMessage.style.display = 'none';
        profilePicture.style.display = 'none';
    });
    reloadButton.addEventListener('click', function() {
        window.location.reload();
    });
});
function updateEventListeners() {
    const spaceElement = document.getElementById("fullStackLink");

    const retroElement = document.getElementById("backEndLink");
    const musicElement = document.getElementById("musicLink");
    const workElement = document.getElementById("work-text");
    const educationElement = document.getElementById("education-text");
    const skillsElement = document.getElementById("skills-text");
    const aboutElement = document.getElementById("about-text");
    const spaceButton = document.getElementById("playSpaceEngine");


    if (spaceButton) {
            spaceButton.addEventListener('click', runSpaceWorld);
    }
    if (spaceElement) {
        spaceElement.addEventListener('click', function() {
            loadContent('pages/fullstack.html', 'contentContainer');
        });
    }
    if (retroElement) {
        retroElement.addEventListener('click', function() {
            loadContent('pages/backend.html', 'contentContainer');
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

