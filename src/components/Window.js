
import View from './View'

/** A window that the user can interact with. */
export default class Window extends View {

    constructor(opts) {
        super(opts)

        // Set default window mode
        this.mode = Window.Mode.FullForm

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
            this.element.style.x = "20px"
            this.element.style.y = "20px"
            this.element.style.width = "calc(100% - 40px)"
            this.element.style.height = "calc(100% - 40px)"

        }

    }

}

/** The different window modes available */
Window.Mode = {

    /** Displays the window fullscreen, with a little padding around the outside containing the background. */
    FullForm: 1

}
