(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
var Router = require("./router.js");

// Creates an instance of our router
let r = new Router();

const pageContainer = document.getElementById("page-container");

const host = window.location.hostname;
const port = window.location.port;
const protocol = window.location.protocol;

console.log("Host", host);
console.log("Port", port);
console.log("Protocol", protocol);

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

homeIcon.onclick = () => {
    deactivate_active()
    activate_home()

    r.go("/home");

}

diyIcon.onclick = () => {
    deactivate_active()
    activate_diy()

    r.go("/diy");
}

purchaseIcon.onclick = () => {
    deactivate_active()
    activate_purchase()

    r.go("/purchase");
}

},{"./router.js":2}],2:[function(require,module,exports){
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
        let xhr = new XMLHttpRequest();

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
        let route = this.routes.get(url);

        if (route != undefined) {
            route.callback(route.html_content);
        } else {
            console.log("No such route: " + route);
        }

    }

    when_ready = (url) => {
        let route = this.routes.get(url);
        console.log("Route ", route);
        if (route != undefined) {
            console.log("Starting recursion ", route);

            // A function that attempts to load the page recursively
            // If it succeeds it returns true, else false.
            let attempt_to_load_page = () => {
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

},{}]},{},[1]);
