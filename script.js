function loadContent(page) {
    const content = document.getElementById('content');
    const breadcrumb = document.getElementById('breadcrumb');
    const navIT = document.getElementById('nav-it'); // Hauptnavigation IT
    const linkHTTP = document.getElementById('link-http');
    const linkHTTPS = document.getElementById('link-https');
    const linkIDE = document.getElementById('link-ide');

    // Entferne die aktive Klasse von allen Links und der Hauptnavigation
    linkHTTP.classList.remove('active');
    linkHTTPS.classList.remove('active');
    linkIDE.classList.remove('active');
    navIT.classList.remove('active');

    // Bestimme die Datei, die geladen werden soll
    let file = '';
    if (page === 'http') {
        file = 'http.html';
        breadcrumb.innerHTML = `
            <a href="#" onclick="loadContent('startseite')">Startseite</a> > HTTP
        `;
        linkHTTP.classList.add('active'); // Markiere den HTTP-Link als aktiv
        navIT.classList.add('active'); // Halte die Hauptnavigation IT geöffnet
    } else if (page === 'https') {
        file = 'https.html';
        breadcrumb.innerHTML = `
            <a href="#" onclick="loadContent('startseite')">Startseite</a> > Scrum
        `;
        linkHTTPS.classList.add('active'); // Markiere den Scrum-Link als aktiv
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
    const files = ['index.html', 'http.html', 'scrum.html', 'ide.html']; // Liste der Dateien, die durchsucht werden sollen

    if (!searchInput) {
        alert('Bitte geben Sie einen Suchbegriff ein.');
        return;
    }

    // Lade und durchsuche jede Datei
    Promise.all(
        files.map(file =>
            fetch(file)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Fehler beim Laden der Datei: ${file} (Status: ${response.status})`);
                    }
                    return response.text();
                })
                .then(html => {
                    // Erstelle ein temporäres DOM-Element, um den HTML-Inhalt zu parsen
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(html, 'text/html');

                    // Extrahiere nur den relevanten Teil (z. B. den Inhalt im <main>-Tag)
                    const mainContent = doc.querySelector('main')?.innerText || '';

                    // Überprüfe, ob der Suchbegriff im extrahierten Inhalt vorkommt
                    if (mainContent.toLowerCase().includes(searchInput)) {
                        // Navigiere direkt zur entsprechenden Seite
                        window.location.href = file;
                        throw 'StopSearch'; // Beende die Suche, da ein Treffer gefunden wurde
                    }
                })
                .catch(error => {
                    if (error !== 'StopSearch') {
                        console.error('Fehler beim Laden der Datei:', error);
                    }
                })
        )
    ).then(() => {
        // Wenn kein Treffer gefunden wurde
        alert('Keine Ergebnisse gefunden.');
    });
}

document.getElementById("search-input").addEventListener("input", function () {
    const searchTerm = this.value.toLowerCase();
    const alphabetItems = document.querySelectorAll(".alphabet-item");

    alphabetItems.forEach(item => {
        const header = item.querySelector(".alphabet-header").textContent.toLowerCase();
        const listItems = item.querySelectorAll("ul li");

        let hasMatch = false;

        listItems.forEach(listItem => {
            const text = listItem.textContent.toLowerCase();
            if (text.includes(searchTerm)) {
                listItem.style.display = "list-item"; // Zeige passende Einträge
                hasMatch = true;
            } else {
                listItem.style.display = "none"; // Verstecke unpassende Einträge
            }
        });

        // Zeige oder verstecke den gesamten alphabet-item basierend auf Treffern
        item.style.display = hasMatch || header.includes(searchTerm) ? "block" : "none";
    });
});