
import View from './View'

/**
 *  The Label component shows some text to the user.
 */
export default class Label extends View {

    /** Default style presets */
    static get Styles() { return {
        Header: "Header",
        Content: "Content"
    }}

    /** Text align (horizontal) modes */
    static get TextAlign() { return {
        Left: "left",
        Center: "center",
        Right: "right",
    }}

    /** Called on setup */
    setup() {

        // Add main view
        this._.contentElement = document.createElement("p")

    }

    /** Get text */
    get text() {
        return this._.contentElement.innerText
    }

    /** Set text */
    set text(v) {
        this._.contentElement.innerText = v
    }

    /** Set style preset */
    get style() {
        return this._.style || Label.Styles.Content
    }
    set style(presetName) {
        this._.style = presetName
        this.theme.setLabelStyle(this, presetName)
    }

    /** Get text align */
    get textAlign() {
        return this._.contentElement.style.textAlign || "left"
    }

    /** Set text align */
    set textAlign(v) {
        this._.contentElement.style.textAlign = v
    }

}
