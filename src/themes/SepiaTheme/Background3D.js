import Canvas from '../../components/Canvas'

/*
 *  Creates a 3D effect to be used in the background.
 *
 *  @private
 */
export default class Background3D extends Canvas {

    /** Called on view setup */
    setup() {
        super.setup()

        // Set opacity
        this.opacity = 0.1

        // Load the threejs library async
        import("three").then(THREE => {

            // Create clock to measure delta between frames
            this.clock = new THREE.Clock()

            // Prepare 3D renderer
            this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, alpha: true, antialias: true })
            this.renderer.setClearColor(0, 0)
            this.renderer.setPixelRatio(window.devicePixelRatio || 1)

            // Setup camera
            this.camera = new THREE.PerspectiveCamera(45, 320 / 240, 0.01, 2000)

            // Setup scene
            this.scene = new THREE.Scene()

            // Move camera
            this.camera.position.z = 5

            // Create center sphere
            var geometry = new THREE.SphereGeometry()//new THREE.OctahedronGeometry()//new THREE.BoxGeometry(1, 1, 1)
            var material = new THREE.MeshBasicMaterial({ color: this.themeMainColor, wireframe: true })
            var sphere = new THREE.Mesh(geometry, material)
            sphere.onBeforeRender = e => sphere.rotation.y += 0.1 * this.delta
            this.scene.add(sphere)

            // Relayout
            this.onLayout()

        })

    }

    /** Called when the view size changes */
    onLayout() {
        super.onLayout()

        // Stop if no renderer
        if (!this.renderer)
            return

        // Get element size
		var rect = this.canvas.getBoundingClientRect();

        // Update renderer size
        this.renderer.setSize(rect.width, rect.height, false)
        this.camera.aspect = rect.width / rect.height
        this.camera.updateProjectionMatrix()

    }

    render() {
        super.render()

        // Stop if not loaded yet
        if (!this.renderer)
            return

        // Do render
        this.renderer.render(this.scene, this.camera)

    }

}
