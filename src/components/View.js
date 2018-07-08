
/** A single portion of the screen. */
export default class View {

    /** Constructor */
    constructor(options = {}) {

        /** The subviews of this view */
        this.subviews = []

        /** The parent view, if any */
        this.parentView = null

        /** @private Private data goes in here. For private framework use only. */
        this._ = {}

        /** @private Stores visibility flag */
        this._.visible = true

        /** @private Exposed properties added by the theme */
        this._.themeProperties = {}

        /** @private The root element */
        this._.element = document.createElement("div")
        this._.element.style.cssText = "position: absolute; top: 0px; left: 0px; width: 100%; height: 100%; z-index: 1; overflow: hidden; "

        /** @private The element which contains child views */
        this._.contentElement = null

        // Setup UI components
        this.setup()

        // Add content element to container
        if (this._.contentElement)
            this._.element.appendChild(this._.contentElement)

        // Set default layout mode
        this.layoutMode = View.LayoutModes.Absolute

        // Load default theme
        this.theme = View.defaultTheme

        // Set properties passed by the user
        for (var name in options)
            this[name] = options[name]

    }

    /**
     *  Setup UI components. Subviews can override this and create their own `this._.contentElement` if it's a different
     *  type. This is only ever called once.
     *
     *  @private
     */
    setup() {

        // Create default content element
        this._.contentElement = document.createElement("div")
        this._.contentElement.style.cssText = "position: absolute; top: 0px; left: 0px; width: 100%; height: 100%; "

    }

    /** The current theme in use. */
    get theme() {
        return this._.theme
    }

    set theme(v) {

        // Set new theme
        this._.theme = v

        // Reset theme properties
        this._.themeProperties = {}

        // Remove all elements from the container element except our content element
        // Themes often insert their own elements to the container element.
        for (var i = 0 ; i < this._.element.children.length ; i++)
            if (this._.element.children[i] != this._.contentElement)
                this._.element.removeChild(this._.element.children[i--])

        // Re-theme us
        this._.theme.applyTo(this)

    }

    /** Get or set a theme property */
    themeProperty(name, value) {
        return this.theme.property(this, name, value)
    }

    /** Add this view to the specified view */
    addTo(parent) {
        parent.add(this)
    }

    /** Add the subview to this view */
    add(subview) {

        // Make sure this view is able to have subviews
        if (!this._.contentElement || this._.contentElement.tagName.toLowerCase() != "div")
            throw new Error("This view does not support subviews.")

        // Make sure subview is the right type
        if (!(subview instanceof View))
            throw new Error("The specified subview was not an instance of View.")

        // Check that the subview isn't already added to a view
        if (subview.parentView)
            throw new Error("This subview has already been added to another view.")

        // Store in subviews array
        this.subviews.push(subview)

        // Append element
        this._.contentElement.appendChild(subview._.element)

        // Notify view it's parent changed
        var oldParent = subview.parentView
        subview.parentView = this
        subview.onParentChanged(oldParent)

        // Notify view if it became visible or not
        // TODO: Proper visibility events!
        if (!oldParent)
            subview.onBecameVisible()

        // First time layout
        setTimeout(e => subview.onLayout(), 0)

    }

    /** True if the view is visible */
    get visible() {
        return this._.visible
    }
    set visible(v) {
        this._.visible = v
        this.onLayout()
    }

    /** Get view opacity */
    get opacity() {
        return parseFloat(this._.element.style.opacity) || 0
    }

    /** Set view opacity */
    set opacity(v) {
        this._.element.style.opacity = v
    }

    /** Get the current layout mode */
    get layoutMode() {
        return this._.layoutMode
    }

    /** Set the layout mode */
    set layoutMode(v) {
        this._.layoutMode = v
        this.onLayout()
    }

    /** Gets the minimum size required to show all this view's content */
    get contentSize() {

        // Get maximum content size of subviews
        var width = 0
        var height = 0
        for (var subview of this.subviews) {
            width = Math.max(width, (subview.x || 0) + subview.contentSize.width)
            height = Math.max(height, (subview.y || 0) + subview.contentSize.height)
        }

        return { width, height }

    }

    /** Called when the parent view changes */
    onParentChanged(oldParent) {}

    /** Called when the view becomes visible */
    onBecameVisible() {}

    /** Called when the view stops being visible */
    onBecameHidden() {}

    /** Called when the view size or position changes. */
    onLayout() {

        // Check visibility
        if (!this._.visible) {

            // Not visible
            this._.element.style.display = "none"

        } else if (this._.layoutMode == View.LayoutModes.InlineBlock) {

            // Visible in inline-block layout mode
            this._.element.style.display = "inline-block"
            this._.element.style.top = "initial"
            this._.element.style.left = "initial"
            this._.element.style.width = "initial"
            this._.element.style.height = "initial"
            this._.element.style.position = "relative"

        } else if (this._.layoutMode == View.LayoutModes.Block) {

            // Visible in block layout mode
            this._.element.style.display = "block"
            this._.element.style.top = "initial"
            this._.element.style.left = "initial"
            this._.element.style.width = "initial"
            this._.element.style.height = "initial"
            this._.element.style.position = "relative"

        } else if (this._.layoutMode == View.LayoutModes.Absolute) {

            // Visible in absolute layout mode
            this._.element.style.display = "block"
            this._.element.style.top = this.top
            this._.element.style.left = this.left
            this._.element.style.width = this.width
            this._.element.style.height = this.height
            this._.element.style.position = "absolute"

        }

        // Notify child views as well
        for (var view of this.subviews)
            view.onLayout()

    }

    /** Get / set position CSS values. Only works in `LayoutMode.Absolute`.  */
    get top() { return this._.top || "0px" }
    get left() { return this._.top || "0px" }
    get top() { return this._.top || "0px" }
    get top() { return this._.top || "0px" }

}


View.LayoutModes = {

    /** Inline block mode displays an element inline with text */
    InlineBlock: 0,

    /** Block mode displays an element like a paragraph, filling the width of the content area. */
    Block: 1,

    /** Absolute mode displays an element at precise pixel coordinates and size. */
    Absolute: 2

}
