export default class ContactCopy {

    // Finder copy-knappen og området hvor beskeden vises
    constructor() {
        this.button = document.querySelector(".copy-email");
        this.message = document.querySelector(".copy-message");
    }

    // Starter funktionen når der klikkes på knappen
    init() {
        if (!this.button) {
            return;
        }

        this.button.addEventListener("click", () => {
            this.copyEmail();
        });
    }

    // Kopierer mailadressen fra data-email
    async copyEmail() {
        const email = this.button.dataset.email;

        try {
            await navigator.clipboard.writeText(email);
            this.showMessage("Copied!");

        } catch (error) {

            // Backup hvis clipboard-funktionen ikke virker
            const textarea = document.createElement("textarea");

            textarea.value = email;
            document.body.appendChild(textarea);

            textarea.select();
            document.execCommand("copy");

            textarea.remove();

            this.showMessage("Copied!");
        }
    }

    // Viser en besked i 2 sekunder efter kopiering
    showMessage(text) {
        if (!this.message) {
            return;
        }

        this.message.textContent = text;

        setTimeout(() => {
            this.message.textContent = "";
        }, 2000);
    }
}