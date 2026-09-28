// Eksporterer ImageLightbox-klassen så den kan bruges i main.js
export default class ImageLightbox {

    // Finder alle billeder som skal kunne åbnes i lightbox
    constructor() {
        this.images = document.querySelectorAll(
            ".case-images img, .contact-image img"
        );

        this.lightbox = null;
    }

    // Starter lightbox-funktionen
    init() {

        // Stopper hvis der ikke findes nogen billeder på siden
        if (this.images.length === 0) {
            return;
        }

        // Opretter lightboxen
        this.createLightbox();

        // Gør hvert billede klikbart
        this.images.forEach(image => {
            image.addEventListener("click", () => {
                this.open(image);
            });
        });
    }

    // Opretter selve lightboxen og tilføjer den til siden
    createLightbox() {
        this.lightbox = document.createElement("div");
        this.lightbox.classList.add("lightbox");

        // Tilføjer luk-knap og billede til lightboxen
        this.lightbox.innerHTML = `
            <button
                class="lightbox-close"
                type="button"
                aria-label="Close image"
            >
                ×
            </button>

            <img
                class="lightbox-image"
                src=""
                alt=""
            >
        `;

        document.body.appendChild(this.lightbox);

        // Finder luk-knappen
        const closeButton =
            this.lightbox.querySelector(".lightbox-close");

        // Lukker lightboxen når der klikkes på krydset
        closeButton.addEventListener("click", () => {
            this.close();
        });

        // Lukker lightboxen hvis der klikkes udenfor billedet
        this.lightbox.addEventListener("click", event => {
            if (event.target === this.lightbox) {
                this.close();
            }
        });

        // Lukker lightboxen hvis brugeren trykker Escape
        document.addEventListener("keydown", event => {
            if (event.key === "Escape") {
                this.close();
            }
        });
    }

    // Åbner lightboxen med det billede brugeren har klikket på
    open(image) {
        const largeImage =
            this.lightbox.querySelector(".lightbox-image");

        // Bruger det samme billede og alt-tekst
        largeImage.src = image.src;
        largeImage.alt = image.alt;

        // Viser lightboxen
        this.lightbox.classList.add("open");

        // Forhindrer siden i at scrolle mens lightboxen er åben
        document.body.style.overflow = "hidden";
    }

    // Lukker lightboxen
    close() {
        this.lightbox.classList.remove("open");

        // Giver siden mulighed for at scrolle igen
        document.body.style.overflow = "";
    }
}