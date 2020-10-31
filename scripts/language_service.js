class LanguageService {
    constructor() {
        this.languages = new Map();


        console.log("Getting stuff");
        this.get_language_file("data/language/svenska.json", "svenska");
        this.get_language_file("data/language/english.json", "english");
    }

    get_language_file = (url, name) => {
        // Create request object
        let xhr = new XMLHttpRequest();

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

        let lang = this.languages.get(name);

        if (lang != undefined) {
            Object.entries(lang).forEach(([id, text]) => {
                document.getElementById(id).innerText = text;
            });
            return true;
        }

        console.log("No such language: " + name);
        return false;

    }

    when_ready = (name) => {
        let attempt_to_set_language = () => {
            // Try to load page
            if (!this.set_language(name))
                setTimeout(attempt_to_set_language, 100);
        }
        attempt_to_set_language();
    }

}

module.exports = LanguageService
