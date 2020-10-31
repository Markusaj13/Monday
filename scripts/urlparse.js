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
