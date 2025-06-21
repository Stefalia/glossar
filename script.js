// Update last modified date
document.getElementById("last-modified").textContent = `Zuletzt geändert: ${new Date().toLocaleString()}`;

// Search function
function searchGlossary() {
    const query = document.getElementById("search").value.toLowerCase();
    const content = document.getElementById("content").innerText.toLowerCase();
    if (content.includes(query)) {
        alert("Begriff gefunden!");
    } else {
        alert("Begriff nicht gefunden.");
    }
}

// Navigation click handling
document.querySelectorAll(".nav-item").forEach(item => {
    item.addEventListener("click", () => {
        document.querySelectorAll(".nav-item").forEach(nav => nav.classList.remove("active"));
        item.classList.add("active");
        const section = item.getAttribute("data-section");
        document.getElementById("content").innerHTML = `<h2>${section}</h2><p>Lorem ipsum dolor sit amet...</p>`;
    });
});

function loadContent(page) {
    const content = document.getElementById('content');
    const navIT = document.getElementById('nav-it');
    const linkAPI = document.getElementById('link-api');
    const linkScrum = document.getElementById('link-scrum');
    const linkIDE = document.getElementById('link-ide');

    // Entferne die aktive Klasse von allen Links
    linkAPI.classList.remove('active');
    linkScrum.classList.remove('active');
    linkIDE.classList.remove('active');
    navIT.classList.remove('active');

    // Lade den entsprechenden Inhalt und markiere den aktiven Link
    if (page === 'api') {
        content.innerHTML = `
            <h1>API</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vel nisi id odio tincidunt tincidunt.</p>
            <p>Curabitur vehicula, justo at tincidunt fermentum, sapien justo tincidunt eros, non tincidunt ligula lorem non justo.</p>
        `;
        linkAPI.classList.add('active');
        navIT.classList.add('active');
    } else if (page === 'scrum') {
        content.innerHTML = `
            <h1>Scrum</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.</p>
        `;
        linkScrum.classList.add('active');
        navIT.classList.add('active');
    } else if (page === 'ide') {
        content.innerHTML = `
            <h1>IDE</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nisi. Nulla quis sem at nibh elementum imperdiet.</p>
        `;
        linkIDE.classList.add('active');
        navIT.classList.add('active');
    }
}