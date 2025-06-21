function loadContent(page) {
    const content = document.getElementById('content');
    const breadcrumb = document.getElementById('breadcrumb');
    const navIT = document.getElementById('nav-it');
    const linkAPI = document.getElementById('link-api');
    const linkScrum = document.getElementById('link-scrum');
    const linkIDE = document.getElementById('link-ide');

    // Entferne die aktive Klasse von allen Links
    linkAPI.classList.remove('active');
    linkScrum.classList.remove('active');
    linkIDE.classList.remove('active');
    navIT.classList.remove('active');

    // Lade den entsprechenden Inhalt und passe die Breadcrumb an
    if (page === 'api') {
        content.innerHTML = `
            <h1>API</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vel nisi id odio tincidunt tincidunt.</p>
            <p>Curabitur vehicula, justo at tincidunt fermentum, sapien justo tincidunt eros, non tincidunt ligula lorem non justo.</p>
        `;
        breadcrumb.innerHTML = `
            <a href="#" onclick="loadContent('startseite')">Startseite</a> > API
        `;
        linkAPI.classList.add('active');
        navIT.classList.add('active');
    } else if (page === 'scrum') {
        content.innerHTML = `
            <h1>Scrum</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.</p>
        `;
        breadcrumb.innerHTML = `
            <a href="#" onclick="loadContent('startseite')">Startseite</a> > Scrum
        `;
        linkScrum.classList.add('active');
        navIT.classList.add('active');
    } else if (page === 'ide') {
        content.innerHTML = `
            <h1>IDE</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nisi. Nulla quis sem at nibh elementum imperdiet.</p>
        `;
        breadcrumb.innerHTML = `
            <a href="#" onclick="loadContent('startseite')">Startseite</a> > IDE
        `;
        linkIDE.classList.add('active');
        navIT.classList.add('active');
    } else if (page === 'startseite') {
        content.innerHTML = `
            <h1>Willkommen</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            <div class="alphabet-container">
                <div class="alphabet-item">
                    <div class="alphabet-header">A</div>
                    <ul>
                        <li>Dummytext 1</li>
                        <li>Dummytext 2</li>
                        <li>Dummytext 3</li>
                    </ul>
                </div>
                <div class="alphabet-item">
                    <div class="alphabet-header">B</div>
                    <ul>
                        <li>Dummytext 4</li>
                        <li>Dummytext 5</li>
                        <li>Dummytext 6</li>
                    </ul>
                </div>
                <div class="alphabet-item">
                    <div class="alphabet-header">C</div>
                    <ul>
                        <li>Dummytext 7</li>
                        <li>Dummytext 8</li>
                        <li>Dummytext 9</li>
                    </ul>
                </div>
                <div class="alphabet-item">
                    <div class="alphabet-header">D</div>
                    <ul>
                        <li>Dummytext 10</li>
                        <li>Dummytext 11</li>
                        <li>Dummytext 12</li>
                    </ul>
                </div>
                <div class="alphabet-item">
                    <div class="alphabet-header">E</div>
                    <ul>
                        <li>Dummytext 13</li>
                        <li>Dummytext 14</li>
                        <li>Dummytext 15</li>
                    </ul>
                </div>
                <div class="alphabet-item">
                    <div class="alphabet-header">F</div>
                    <ul>
                        <li>Dummytext 16</li>
                        <li>Dummytext 17</li>
                        <li>Dummytext 18</li>
                    </ul>
                </div>
            </div>
        `;
        breadcrumb.innerHTML = `
            <a href="#" onclick="loadContent('startseite')">Startseite</a>
        `;
    }
}