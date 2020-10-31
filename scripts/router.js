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
        if (route != undefined) {
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
