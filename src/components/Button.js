import View from './View'

/** A completely regular button. */
export default class Button extends View {

    setup() {

        // Setup layout
        this._.element.style.display = "flex"
        this._.element.style.alignItems = "center"
        this._.element.style.justifyContent = "center"
        this._.element.style.textAlign = "center"
        this._.element.style.padding = "10px"
        this._.element.innerText = "Label"

    }

    /** The text on the button */
    get text() {
        return this._.element.innerText
    }
    set text(v) {
        this._.element.innerText = v
    }

    /** The content size of the button */
    get contentSize() {
        return { width: 300, height: 40 }
    }

}
