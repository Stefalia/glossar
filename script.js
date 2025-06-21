function loadContent(page) {
    const content = document.getElementById('content');
    const breadcrumb = document.getElementById('breadcrumb');
    const navIT = document.getElementById('nav-it'); // Hauptnavigation IT
    const linkAPI = document.getElementById('link-api');
    const linkScrum = document.getElementById('link-scrum');
    const linkIDE = document.getElementById('link-ide');

    // Entferne die aktive Klasse von allen Links und der Hauptnavigation
    linkAPI.classList.remove('active');
    linkScrum.classList.remove('active');
    linkIDE.classList.remove('active');
    navIT.classList.remove('active');

    // Bestimme die Datei, die geladen werden soll
    let file = '';
    if (page === 'api') {
        file = 'api.html';
        breadcrumb.innerHTML = `
            <a href="#" onclick="loadContent('startseite')">Startseite</a> > API
        `;
        linkAPI.classList.add('active'); // Markiere den API-Link als aktiv
        navIT.classList.add('active'); // Halte die Hauptnavigation IT geöffnet
    } else if (page === 'scrum') {
        file = 'scrum.html';
        breadcrumb.innerHTML = `
            <a href="#" onclick="loadContent('startseite')">Startseite</a> > Scrum
        `;
        linkScrum.classList.add('active'); // Markiere den Scrum-Link als aktiv
        navIT.classList.add('active'); // Halte die Hauptnavigation IT geöffnet
    } else if (page === 'ide') {
        file = 'ide.html';
        breadcrumb.innerHTML = `
            <a href="#" onclick="loadContent('startseite')">Startseite</a> > IDE
        `;
        linkIDE.classList.add('active'); // Markiere den IDE-Link als aktiv
        navIT.classList.add('active'); // Halte die Hauptnavigation IT geöffnet
    } else if (page === 'startseite') {
        // Lade den ursprünglichen Inhalt der Startseite
        file = 'index.html';
        location.reload(); // Lädt die Startseite neu
        return;
    }

    // Lade die HTML-Datei und füge sie in den Content-Bereich ein
    if (file) {
        fetch(file)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Fehler beim Laden der Datei: ${file} (Status: ${response.status})`);
                }
                return response.text();
            })
            .then(html => {
                content.innerHTML = html;
            })
            .catch(error => {
                console.error('Fehler beim Laden der Seite:', error);
                content.innerHTML = '<p>Fehler beim Laden der Seite.</p>';
            });
    }
}

function searchTerms() {
    const searchInput = document.getElementById('search-input').value.toLowerCase();
    const content = document.getElementById('content');

    // Suche in allen alphabetischen Begriffen
    const items = content.querySelectorAll('.alphabet-item');
    items.forEach(item => {
        const header = item.querySelector('.alphabet-header').textContent.toLowerCase();
        const terms = Array.from(item.querySelectorAll('ul li')).map(li =>
            li.textContent.toLowerCase()
        );

        // Überprüfe, ob der Suchbegriff im Header oder in den Begriffen vorkommt
        if (
            header.includes(searchInput) ||
            terms.some(term => term.includes(searchInput))
        ) {
            item.style.display = 'block'; // Zeige das Element an
        } else {
            item.style.display = 'none'; // Verstecke das Element
        }
    });
}