
import View from './View'

/** A window that the user can interact with. */
export default class Window extends View {

    constructor(options = {}) {
        super(options)

        // Add view to the dom
        document.body.appendChild(this._.element)

        // Set default window mode, if not supplied by the user already
        if (!options.mode)
            this.mode = Window.Mode.FullForm

        // Register resize listeners
        this.onWindowResize = this.onWindowResize.bind(this)
        window.addEventListener("resize", this.onWindowResize)

    }

    /** The current window mode */
    get mode() {
        return this._.windowmode
    }

    /** Sets the current window mode */
    set mode(v) {

        // Store it
        this._.windowmode = v

        // Check what to do
        if (v == Window.Mode.FullForm) {

            // Fill the screen
            this._.element.style.top = "20px"
            this._.element.style.left = "20px"
            this._.element.style.width = "calc(100% - 40px)"
            this._.element.style.height = "calc(100% - 40px)"

        } else if (v == Window.Mode.Fullscreen) {

            // Fill the screen
            this._.element.style.top = "0px"
            this._.element.style.left = "0px"
            this._.element.style.width = "100%"
            this._.element.style.height = "100%"

        } else {

            // Unknown view mode
            throw new Error("Unknown window mode supplied.")

        }

    }

    /** @private Called when the viewport itself is resized */
    onWindowResize() {

        // Notify view it's layout has changed
        this.onLayout()

    }

}

/** The different window modes available */
Window.Mode = {

    /** Displays the window fullscreen, with a little padding around the outside containing the background. */
    FullForm: 1,

    /** Displays the window fullscreen. */
    Fullscreen: 2

}
