import View from './View'

/**
 *  Allows custom rendering using a <canvas> element.
 *
 */
export default class Canvas extends View {

    /** Setup UI element */
    setup() {

        // If true, rendering will continue
        this.isRendering = false

        // The amount of time, in seconds between frames. Maximum of 1.
        this.delta = 0

        // The time the last frame was rendered
        this.lastFrameTime = 0

        // Create canvas
        this.canvas = document.createElement("canvas")
        this.canvas.style.cssText = "position: absolute; top: 0px; left: 0px; width: 100%; height: 100%; "
        this.canvas.width = 64
        this.canvas.height = 64
        this._.contentElement = this.canvas

        // Bind the render function
        this.render = this.render.bind(this)

    }

    /** Called when the view becomes visible */
    onBecameVisible() {

        // Start rendering if needed
        if (!this.isRendering) {
            this.isRendering = true
            this.render()
        }

    }

    /** Called when the view is hidden */
    onBecameHidden() {

        // Stop rendering
        this.isRendering = false

    }

    /** Called when the view is resized */
    onLayout() {
        super.onLayout()

        // Update canvas size
        var density = window.devicePixelRatio || 1
        var box = this.canvas.getBoundingClientRect()
        this.canvas.width = box.width * density
        this.canvas.height = box.height * density

    }

    /** Called on every render frame. Subclasses can override this to render their content. Remember to still call super. */
    render() {

        // Calculate delta
        if (!this.lastFrameTime) this.lastFrameTime = Date.now()
        this.delta = Math.min(1, (Date.now() - this.lastFrameTime) / 1000)
        this.lastFrameTime = Date.now()

        // Check if should be rendering
        if (!this.isRendering)
            return

        // Request another frame
        requestAnimationFrame(this.render)

    }

}
