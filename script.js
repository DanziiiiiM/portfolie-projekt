const nav = document.querySelector("nav");
const links = nav.querySelectorAll("a");
const marker = document.querySelector(".nav-markering");
const menuButton = document.querySelector(".menu-button");

function moveMarker(link) {
    marker.style.width = `${link.offsetWidth}px`;
    marker.style.left = `${link.offsetLeft}px`;
}

const currentPage = window.location.pathname.split("/").pop() || "index.html";
const currentHash = window.location.hash;

let activeLink = [...links].find(link => {
    const href = link.getAttribute("href");
    if (currentHash) {
        return href === `${currentPage}${currentHash}`;
    }
    return href === currentPage;
});

if (!activeLink) {
    activeLink = links[0];
}

if (marker && activeLink) {
    moveMarker(activeLink);
}

links.forEach(link => {
    link.addEventListener("mouseenter", () => {
        if (marker) {
            moveMarker(link);
        }
    });
});

nav.addEventListener("mouseleave", () => {
    if (marker && activeLink) {
        moveMarker(activeLink);
    }
});

if (menuButton) {
    menuButton.addEventListener("click", () => {
        nav.classList.toggle("open");
        const isOpen = nav.classList.contains("open");
        menuButton.setAttribute("aria-expanded", isOpen);
    });
}