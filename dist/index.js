(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
class LanguageService {
    constructor() {
        this.languages = new Map();


        this.get_language_file("data/language/svenska.json", "svenska");
        this.get_language_file("data/language/english.json", "english");
    }

    get_language_file = (url, name) => {
        // Create request object
        var xhr = new XMLHttpRequest();

        // Define function that will deal with response
        xhr.onreadystatechange = (e) => {
            if (xhr.readyState == 4 && xhr.status == 200) {
                this.languages.set(name, JSON.parse(xhr.responseText));
            }
        }

        // Open request to file
        xhr.open("GET", url);

        // Set header that says we expect a html text response
        xhr.setRequestHeader('Content-type', 'application/json');

        // Send request
        xhr.send();
    }

    set_language = (name) => {

        var lang = this.languages.get(name);

        if (lang != undefined) {
            Object.entries(lang).forEach(([id, text]) => {
                var obj = document.getElementById(id);
                if (obj != undefined) {
                    obj.innerText = text;
                }
            });
            return true;
        }

        console.log("No such language: " + name);
        return false;

    }

    when_ready = (name) => {
        var attempt_to_set_language = () => {
            // Try to load page
            if (!this.set_language(name))
                setTimeout(attempt_to_set_language, 100);
        }
        attempt_to_set_language();
    }

}

module.exports = LanguageService

},{}],2:[function(require,module,exports){
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

},{"./language_service":1,"./router.js":3,"./urlparse":4}],3:[function(require,module,exports){
class Route {
    constructor(url_path, html_path, callback) {
        /*
         url_path: path in the URL that this Route will be called on
         html_path: Path to load html from
         callback: Function called once a url_path is matched
        */

        this.url_path = url_path;
        this.html_path = html_path
        this.callback = callback;

        this.html_content = undefined;
    }

    async_load = () => {
        // When this function is called we will load
        // the html page associated with this route.
        // We will use the XHR api to fetch our pages,
        // since it is available in many browsers by default.

        // Create request object
        var xhr = new XMLHttpRequest();

        // Define function that will deal with response
        xhr.onreadystatechange = (e) => {
            if (xhr.readyState == 4 && xhr.status == 200) {
                this.html_content = xhr.responseText;
            }
        }

        // Open request to file
        xhr.open("GET", this.html_path);

        // Set header that says we expect a html text response
        xhr.setRequestHeader('Content-type', 'text/html');

        // Send request
        xhr.send();

    }

}

class Router {
    constructor() {
        // A Map of routes (See route class above)
        // Mapping URL to route
        this.routes = new Map();
    }


    add = (url, html_path, callback) => this.routes.set(url, new Route(url, html_path, callback));
    init = () => this.routes.forEach((route, _) => route.async_load());
    go = (url) => {
        var route = this.routes.get(url);

        if (route != undefined) {
            route.callback(route.html_content);
        } else {
            console.log("No such route: " + route);
        }

    }

    when_ready = (url) => {
        var route = this.routes.get(url);
        if (route != undefined) {
            // A function that attempts to load the page recursively
            // If it succeeds it returns true, else false.
            var attempt_to_load_page = () => {
                // Try to load page
                console.log("Trying to load")
                console.log(route.html)
                if (route.html_content != undefined) {
                    route.callback(route.html_content);

                } else {
                    // If failure, try again in 100ms
                    setTimeout(attempt_to_load_page, 100);
                }
            }

            attempt_to_load_page();

        } else {
            console.log("No such route: " + route);
        }
    }
}

module.exports = Router

},{}],4:[function(require,module,exports){
class UrlParser {
    constructor() {
        this.url = undefined;

    }

    parse_current_url = () => {
        this.url = new URL(window.location.href);
    }

    get_arg = (name) => {
        return this.url.searchParams.get(name);
    }

    set_arg = (name, value) => {
      this.url.searchParams.set(name, value);
    }

    update_history = () => window.history.pushState("", "", "?" + this.url.searchParams.toString());

}

module.exports = UrlParser;

},{}]},{},[2]);
