function loadContent(page) {
    const content = document.getElementById('content');
    const breadcrumb = document.getElementById('breadcrumb');
    const navIT = document.getElementById('nav-it');
    const linkHTTP = document.getElementById('link-http');
    const linkHTTPS = document.getElementById('link-https');
    const linkIDE = document.getElementById('link-ide');
    const linkPHISHING = document.getElementById('link-phishing');
    const linkVERSIONCONTROL = document.getElementById('link-versioncontrol');

    // Alle Links deaktivieren
    [linkHTTP, linkHTTPS, linkIDE, linkPHISHING, linkVERSIONCONTROL].forEach(link => link?.classList.remove('active'));
    navIT.classList.remove('active');

    let file = '';
    let breadcrumbText = '';

    switch (page) {
        case 'http':
            file = 'http.html';
            breadcrumbText = 'HTTP';
            linkHTTP.classList.add('active');
            navIT.classList.add('active');
            break;
        case 'https':
            file = 'https.html';
            breadcrumbText = 'HTTPS';
            linkHTTPS.classList.add('active');
            navIT.classList.add('active');
            break;
        case 'ide':
            file = 'ide.html';
            breadcrumbText = 'IDE';
            linkIDE.classList.add('active');
            navIT.classList.add('active');
            break;
        case 'phishing':
            file = 'phishing.html';
            breadcrumbText = 'Phishing';
            linkPHISHING.classList.add('active');
            navIT.classList.add('active');
            break;
        case 'versioncontrol':
            file = 'versioncontrol.html';
            breadcrumbText = 'Versionskontrolle';
            linkVERSIONCONTROL.classList.add('active');
            navIT.classList.add('active');
            break;
        case 'startseite':
            location.reload(); // Startseite neu laden
            return;
    }

    if (file) {
        // Setze den Breadcrumb
        breadcrumb.innerHTML = `<a href="#" onclick="loadContent('startseite')">Startseite</a> > ${breadcrumbText}`;

        fetch(file)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Fehler beim Laden der Datei: ${file} (Status: ${response.status})`);
                }

                const lastModified = response.headers.get("last-modified");
                if (lastModified) {
                    const modDate = new Date(lastModified);
                    const formatted = modDate.toLocaleDateString("de-DE", {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                    });

                    const modDisplay = document.getElementById("lastModified");
                    if (modDisplay) {
                        modDisplay.textContent = "Letzte Änderung: " + formatted;
                    }
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
    const files = ['index.html', 'http.html', 'https.html', 'ide.html', 'phishing.html', 'versioncontrol.html']; // Liste der Dateien, die durchsucht werden sollen

    if (!searchInput) {
        alert('Bitte geben Sie einen Suchbegriff ein.');
        return;
    }

    let found = false; // Variable, um Treffer zu verfolgen

    // Lade und durchsuche jede Datei
    (async () => {
        for (const file of files) {
            try {
                const response = await fetch(file);
                if (!response.ok) {
                    console.error(`Fehler beim Laden der Datei: ${file} (Status: ${response.status})`);
                    continue;
                }

                const html = await response.text();
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');

                // Extrahiere nur den relevanten Teil (z. B. den Inhalt im <main>-Tag)
                //const mainContent = doc.querySelector('main')?.innerText || '';
                //const mainContent = doc.body.innerText || '';
                const mainContent = doc.querySelector('main')?.innerText || doc.body.innerText || '';

                // Überprüfe, ob der Suchbegriff im extrahierten Inhalt vorkommt
                if (mainContent.toLowerCase().includes(searchInput)) {
                    found = true;
                    loadContent(file.replace('.html', '')); // Lädt die entsprechende Seite
                    break; // Beende die Schleife, da ein Treffer gefunden wurde
                }
            } catch (error) {
                console.error('Fehler beim Laden der Datei:', error);
            }
        }

        if (!found) {
            // Wenn kein Treffer gefunden wurde
            alert('Keine Ergebnisse gefunden.');
        }
    })();
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



