// Eksporterer Navigation-klassen så den kan bruges i main.js
export default class Navigation {

    // Finder navigationen, links, markeringen og burger-menuen
    constructor() {
        this.nav = document.querySelector("nav");
        this.links = this.nav ? this.nav.querySelectorAll("a") : [];
        this.marker = document.querySelector(".nav-markering");
        this.menuButton = document.querySelector(".menu-button");
    }

    // Flytter den lilla markering hen under det valgte link
    moveMarker(link) {
        if (!this.marker || !link) return;

        this.marker.style.width = `${link.offsetWidth}px`;
        this.marker.style.left = `${link.offsetLeft}px`;
    }

    // Starter navigationens funktioner
    init() {
        if (!this.nav) return;

        // Finder den side brugeren befinder sig på
        const currentPage =
            window.location.pathname.split("/").pop() || "index.html";

        const currentHash = window.location.hash;

        // Finder det aktive link i navigationen
        let activeLink = [...this.links].find(link => {
            const href = link.getAttribute("href");

            if (currentHash) {
                return href === `${currentPage}${currentHash}`;
            }

            return href === currentPage;
        });

        // Bruger første link hvis der ikke findes et aktivt link
        if (!activeLink) {
            activeLink = this.links[0];
        }

        // Placering af markeringen ved den aktive side
        if (this.marker && activeLink) {
            this.moveMarker(activeLink);
        }

        // Flytter markeringen når musen føres over et link
        this.links.forEach(link => {
            link.addEventListener("mouseenter", () => {
                this.moveMarker(link);
            });
        });

        // Flytter markeringen tilbage til den aktive side
        this.nav.addEventListener("mouseleave", () => {
            if (activeLink) {
                this.moveMarker(activeLink);
            }
        });

        // Åbner og lukker burger-menuen på mobil
        if (this.menuButton) {
            this.menuButton.addEventListener("click", () => {
                this.nav.classList.toggle("open");

                const isOpen = this.nav.classList.contains("open");

                // Opdaterer aria-expanded for tilgængelighed
                this.menuButton.setAttribute(
                    "aria-expanded",
                    isOpen
                );
            });
        }
    }
}