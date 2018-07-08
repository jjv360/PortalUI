
import View from './View'

/**
 *  The SplitView component provides a view which is split down the middle, containing a main view on the left, and a
 *  secondary view on the right. On desktop, the views are displayed side by side, and on mobile, only the main view is
 *  displayed.
 */
export default class SplitView extends View {

    /** Called on setup */
    setup() {
        super.setup()

        // Add main view
        this.mainView = new View()
        this.mainView.width = "320px"
        this.mainView.addTo(this)

        // Add secondary view
        this.secondaryView = new View()
        this.secondaryView.left = "320px"
        this.secondaryView.width = "calc(100% - 320px)"
        this.secondaryView.addTo(this)

    }

}
