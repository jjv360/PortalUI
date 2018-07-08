
import Theme from './Theme'

import View from '../components/View'
import Window from '../components/Window'
import Background from '../components/Background'

export default class DarkTheme extends Theme {

    /** Called to apply theme to a new view */
    applyTo(view) {

        // Check type of view
        if (view instanceof Background) {

            // A window
            this.applyToBackground(view)

        } else if (view instanceof Window) {

            // A window
            this.applyToWindow(view)

        } else if (view instanceof View) {

            // A plain view. This case should be last.
            this.applyToView(view)

        } else {

            // Unknown type
            throw new Error("Unknown view type. Views should be descended from the View class.")

        }

    }

    /** Theme windows */
    applyToWindow(window) {

        window._.element.style.backgroundColor = "rgba(49, 59, 76, 0.95)"

    }

    /** Theme the background window */
    applyToBackground(bg) {

        bg._.element.style.backgroundColor = "#242b38"

    }

}
