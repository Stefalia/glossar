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