    // verschiedene Unterseiten laden /////////////////////////////////////////////////////////////////////////
function loadContent(page) {
    const content = document.getElementById('content');
    const breadcrumb = document.getElementById('breadcrumb');
    const navIT = document.getElementById('nav-it');
    const linkHTTP = document.getElementById('link-http');
    const linkHTTPS = document.getElementById('link-https');
    const linkIDE = document.getElementById('link-ide');
    const linkPHISHING = document.getElementById('link-phishing');
    const linkVERSIONCONTROL = document.getElementById('link-versioncontrol');

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

    // Breadcrumb / Suchfeld ausblenden /////////////////////////////////////////////////////////////////////////
    if (file) {
        // Breadcrumb
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

                // Suchfeld ausblenden, wenn es nicht die index.html ist
                const searchContainer = document.querySelector('.search-container');
                if (searchContainer) {
                    searchContainer.style.display = 'none';
                }
            })
            .catch(error => {
                console.error('Fehler beim Laden der Seite:', error);
                content.innerHTML = '<p>Fehler beim Laden der Seite.</p>';
            });
    } else {
        // Suchfeld anzeigen, wenn es die index.html ist
        const searchContainer = document.querySelector('.search-container');
        if (searchContainer) {
            searchContainer.style.display = '';
        }
    }
}

// Suchen /////////////////////////////////////////////////////////////////////////
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



