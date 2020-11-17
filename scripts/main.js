var Router = require("./router.js");
var LanguageService = require("./language_service");
var UrlParser = require("./urlparse");

const urlParser = new UrlParser();
// Creates an instance of our router
const r = new Router();

const pageContainer = document.getElementById("page-container");


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

urlParser.parse_current_url();
// Opens /home when it is ready
const initial_page = urlParser.get_arg("page");
var InitialPage;

if (initial_page != undefined) {
    r.when_ready("/" + initial_page);
    InitialPage = initial_page;
} else {
    r.when_ready("/home");
    InitialPage = "home";
}

urlParser.set_arg("page", InitialPage);

const homeIcon = document.getElementById("home-icon")
const diyIcon = document.getElementById("diy-icon")
const purchaseIcon = document.getElementById("purchase-icon")
const luixIcon = document.getElementById("luix-icon")


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
if (InitialPage === "home") {
    activate_home();
} else if (InitialPage === "diy") {
    activate_diy();
} else if (InitialPage === "purchase") {
    activate_purchase();
}

const SvenskaButton = document.getElementById("navbar-language-svenska")
const EnglishButton = document.getElementById("navbar-language-english")

// Create Language Service
const language_service = new LanguageService();
const initial_language = urlParser.get_arg("lang");

var CurrentLanguage = "";
if (initial_language != undefined) {
    CurrentLanguage = initial_language;
} else {
    CurrentLanguage = "svenska";
}

urlParser.set_arg("lang", CurrentLanguage);

var ActiveButton;
if (CurrentLanguage === "svenska") {
    ActiveButton = SvenskaButton;
} else {
    ActiveButton = EnglishButton;
}



SvenskaButton.onclick = () => {
    ActiveButton.classList.toggle("navbar-language-active", false);

    CurrentLanguage = "svenska";
    ActiveButton = SvenskaButton;

    language_service.set_language(CurrentLanguage);
    ActiveButton.classList.toggle("navbar-language-active", true);

    urlParser.set_arg("lang", CurrentLanguage);
    urlParser.update_history();
}

EnglishButton.onclick = () => {
    ActiveButton.classList.toggle("navbar-language-active", false);

    CurrentLanguage = "english";
    ActiveButton = EnglishButton;

    language_service.set_language(CurrentLanguage);
    ActiveButton.classList.toggle("navbar-language-active", true);

    urlParser.set_arg("lang", CurrentLanguage);
    urlParser.update_history();
}


// Set Swedish by default
language_service.when_ready(CurrentLanguage);

// Activate current language
ActiveButton.classList.toggle("navbar-language-active", true);


onhomeClick = () => {
    console.log("Clicked on me")
    deactivate_active()
    activate_home()

    r.go("/home");
    language_service.set_language(CurrentLanguage);

    urlParser.set_arg("page", "home");
    urlParser.update_history();
}

homeIcon.onclick = onhomeClick
luixIcon.onclick = onhomeClick

diyIcon.onclick = () => {
    deactivate_active()
    activate_diy()

    r.go("/diy");
    language_service.set_language(CurrentLanguage);

    urlParser.set_arg("page", "diy");
    urlParser.update_history();
}

purchaseIcon.onclick = () => {
    deactivate_active()
    activate_purchase()

    r.go("/purchase");
    language_service.set_language(CurrentLanguage);

    urlParser.set_arg("page", "purchase");
    urlParser.update_history();
}


urlParser.update_history();
