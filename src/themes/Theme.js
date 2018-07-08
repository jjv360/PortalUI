//
// Example dark theme

import View from '../components/View'
import Window from '../components/Window'
import Background from '../components/Background'

export default class Theme {

    /**
     *  Default action for getting and setting theme properties on a view. When only `view` and `name` is supplied, we
     *  just return the value. If `value` is supplied as well, we set the new value, and return the old value.
     */
    property(view, name, value) {

        // Check if got value
        if (typeof value == "undefined") {

            // No value param, we're getting a property
            view._.themeProperties[name]

        } else {

            // Got a value param, we're setting a property. Set it and return the old value.
            var oldValue = view._.themeProperties[name]
            view._.themeProperties[name] = value
            return oldValue

        }

    }

    /** @private Inject a CSS file into the document */
    injectCSSFromURL(url) {

        // Create link tag and add to document
        var elem = document.createElement("link")
        elem.rel = "stylesheet"
        elem.href = "https://fonts.googleapis.com/css?family=Oswald|Ubuntu"
        document.body.appendChild(elem)

    }

    /** @private Inject a CSS string into the document */
    injectCSS(css) {

        // Create link tag and add to document
        var elem = document.createElement("style")
        elem.innerText = css
        document.body.appendChild(elem)

    }

}
