//
// The Background view is a special view which is used for effect in the background.

import Window from './Window'

export default class Background extends Window {

    constructor(options) {
        super(options)

        // Set fullscreen with no chrome
        this.mode = Window.Mode.Fullscreen
        this._.element.style.zIndex = "0"

    }

}
