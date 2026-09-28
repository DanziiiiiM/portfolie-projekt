// Importerer de forskellige JavaScript-moduler
import Navigation from "./modules/Navigation.js";
import ContactCopy from "./modules/ContactCopy.js";
import ImageLightbox from "./modules/ImageLightbox.js";

// Starter navigationen
const navigation = new Navigation();
navigation.init();

// Starter funktionen der kopierer mailadressen
const contactCopy = new ContactCopy();
contactCopy.init();

// Starter lightbox-funktionen til billeder
const imageLightbox = new ImageLightbox();
imageLightbox.init();