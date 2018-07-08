//
// Applies a cool 3D sepia theme to the UI

import Theme from '../Theme'
import View from '../../components/View'
import Window from '../../components/Window'
import Background from '../../components/Background'
import Label from '../../components/Label'
import SplitView from '../../components/SplitView'

import Background3D from './Background3D'

const MainColor = "#7a7369"
const BackgroundColor = "#edeae8"

export default class SepiaTheme extends Theme {

    /** Constructor */
    constructor(options = {}) {
        super(options)

        // Setup CSS if needed
        if (!SepiaTheme.hasSetupCSS) {
            SepiaTheme.hasSetupCSS = true

            // Inject fonts
            this.injectCSSFromURL("https://fonts.googleapis.com/css?family=Oswald|Ubuntu")

        }

    }

    /** Called to apply theme to a new view */
    applyTo(view) {

        // Check type of view
        if (view instanceof Background) {

            // The background view
            view._.element.style.backgroundColor = BackgroundColor
            view._.element.style.boxShadow = "0 0 400px rgba(45, 28, 0, 0.35) inset"

            // Insert grid background
            var div = document.createElement("div")
            div.style.cssText = `position: absolute; top: 0px; left: 0px; width: 100%; height: 100%; opacity: 0.2; `
            div.style.backgroundImage = "url(" + require("./bg.png") + ")"
            view._.element.appendChild(div)

            // Create 3D background effect view
            var bg3d = new Background3D({ themeMainColor: MainColor })
            bg3d.addTo(view)
            view._.themeProperties["background3D"] = bg3d

        } else if (view instanceof Window) {

            // A window
            // view._.element.style.backgroundColor = "rgba(49, 59, 76, 0.95)"

        } else if (view instanceof SplitView) {

            // A SplitView component. Set main view's container style
            view.mainView._.element.style.perspective = "100px"

            // Set main view's content style
            view.mainView._.contentElement.style.transform = "translateZ(-10px) rotateY(0.4deg)"

            // Set secondary view's container style
            view.secondaryView._.element.style.perspective = "100px"

            // Set secondary view's content style
            view.secondaryView._.contentElement.style.transform = "translateZ(-10px) rotateY(-0.4deg)"

        } else if (view instanceof Label) {

            // A label component, set default style
            this.setLabelStyle(view, Label.Styles.Content)

        } else if (view instanceof View) {

            // A plain view. This case should be last.

        } else {

            // Unknown type
            throw new Error("Unknown view type. Views should be descended from the View class.")

        }

    }

    /** Apply a style preset to a label */
    setLabelStyle(label, presetName) {

        // Check preset name
        if (presetName == Label.Styles.Header) {

            // Normal text content
            label._.contentElement.style.fontFamily = "Ubuntu, Verdana, Helvetica, Arial"
            label._.contentElement.style.fontSize = "24px"
            label._.contentElement.style.color = MainColor

        } else if (presetName == Label.Styles.Content) {

            // Normal text content
            label._.contentElement.style.fontFamily = "Ubuntu, Verdana, Helvetica, Arial"
            label._.contentElement.style.fontSize = "17px"
            label._.contentElement.style.color = "#333"

        } else {

            // Unknown style preset
            console.warn("Unknown label style preset: ", presetName)

        }

    }

}
