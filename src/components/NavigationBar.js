
import View from './View'

/**
 *  The NavigationBar component displays a header bar
 */
export default class NavigationBar extends View {

    /** Called on setup */
    setup() {
        super.setup()

        // Setup layout defaults
        this.width = "100%"
        this.height = "40px"

        // Setup content element
        this._.contentElement.style.display = "flex"
        this._.contentElement.style.alignItems = "center"

        // Setup label element
        this.titleLabel = new Label()
        this.titleLabel.layoutMode = View.LayoutModes.Block
        this.titleLabel._.element.style.flex = "1 1 auto"
        this.titleLabel.textAlign = Label.TextAlign.Center
        this.titleLabel.style = Label.Styles.Header
        this.titleLabel.addTo(this)

    }

    /** Get title */
    get title() {
        return this.titleLabel.text
    }

    /** Set title */
    set title(v) {
        this.titleLabel.text = v
    }

    /** Set style preset */
    get style() {
        return this._.style || Label.Styles.Content
    }
    set style(presetName) {
        this._.style = presetName
        this.theme.setLabelStyle(this, presetName)
    }

}
