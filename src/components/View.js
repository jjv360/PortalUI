
/** A single portion of the screen. */
export default class View {

    /** Constructor */
    constructor(options) {

        /** @private Private data goes in here. Don't use this outside the class. */
        this._ = {}

        /** @private The root element */
        this.element = document.createElement("div")
        this.element.style.cssText = "position: absolute; "

        // Load default theme
        this.theme = View.defaultTheme

        // Set properties passed by the user
        for (var name in options)
            this[name] = options[name]

    }

    /** The current theme in use. */
    get theme() {
        return this._.theme
    }

    set theme(v) {

        // Set new theme
        this._.theme = v

        // Re-theme us
        this._.theme.update(this)

    }

}
