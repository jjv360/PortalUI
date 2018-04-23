
/** A single portion of the screen. */
export default class View {

    /** Constructor */
    constructor(options) {

        /** @private The root element */
        this.element = document.createElement("div")
        this.element.style.cssText = "position: absolute; "

        // Load default theme
        this.theme = new View.defaultTheme(this)

        // Set properties passed by the user
        for (var name in options)
            this[name] = options[name]

    }

}
