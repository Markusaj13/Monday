var Router = require("./router.js");
var LanguageService = require("./language_service");

// Creates an instance of our router
const r = new Router();

const pageContainer = document.getElementById("page-container");

//const host = window.location.hostname;
//const port = window.location.port;
//const protocol = window.location.protocol;

// Adds our paths
r.add("/home", "html/home.html", (html) => {
    pageContainer.innerHTML = html;
})

r.add("/diy", "html/diy.html", (html) => {
    pageContainer.innerHTML = html;
})

r.add("/purchase", "html/purchase.html", (html) => {
    pageContainer.innerHTML = html;
})

// Initializes our paths (Loads HTMLs into browser)
r.init();

// Opens /home when it is ready
r.when_ready("/home");

const homeIcon = document.getElementById("home-icon")
const diyIcon = document.getElementById("diy-icon")
const purchaseIcon = document.getElementById("purchase-icon")


var activeIcon = null

// A function to activate home icon
activate_home = () => {
    // add active to this one 
    homeIcon.classList.toggle("navbar-icon-active")


    // Make this one into the active one
    activeIcon = homeIcon
}

// A function to activate diy icon
activate_diy = () => {
    // add active to this one 
    diyIcon.classList.toggle("navbar-icon-active")

    // Make this one into the active one
    activeIcon = diyIcon
}

activate_purchase = () => {
    // add active to this one 
    purchaseIcon.classList.toggle("navbar-icon-active")

    // Make this one into the active one
    activeIcon = purchaseIcon
}

deactivate_active = () => {
    activeIcon.classList.toggle("navbar-icon-active")

    activeIcon = null
}

// Actiavte home in start
activate_home()

const SvenskaButton = document.getElementById("navbar-language-svenska")
const EnglishButton = document.getElementById("navbar-language-english")

// Create Language Service
const language_service = new LanguageService();
var CurrentLanguage = "svenska";
var ActiveButton = SvenskaButton;



SvenskaButton.onclick = () => {
    ActiveButton.classList.toggle("navbar-language-active", false);

    CurrentLanguage = "svenska";
    ActiveButton = SvenskaButton;

    language_service.set_language(CurrentLanguage);
    ActiveButton.classList.toggle("navbar-language-active", true);
}

EnglishButton.onclick = () => {
    ActiveButton.classList.toggle("navbar-language-active", false);

    CurrentLanguage = "english";
    ActiveButton = EnglishButton;

    language_service.set_language(CurrentLanguage);
    ActiveButton.classList.toggle("navbar-language-active", true);
}


// Set Swedish by default
language_service.when_ready(CurrentLanguage);

// Activate current language
ActiveButton.classList.toggle("navbar-language-active", true);
console.log("Active button", ActiveButton);


homeIcon.onclick = () => {
    deactivate_active()
    activate_home()

    r.go("/home");
    language_service.set_language(CurrentLanguage);

}

diyIcon.onclick = () => {
    deactivate_active()
    activate_diy()

    r.go("/diy");
    language_service.set_language(CurrentLanguage);
}

purchaseIcon.onclick = () => {
    deactivate_active()
    activate_purchase()

    r.go("/purchase");
    language_service.set_language(CurrentLanguage);
}
