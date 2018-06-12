import {
    Raycaster,
    Vector2
} from 'three'

const noop = () =>
{}

class ARaycaster
{
    constructor(camera, intersectObjects, options = { callback: noop })
    {
        this.options = options
        this.camera = camera
        this.intersectObjects = intersectObjects
        this.mouse = new Vector2()
        this.raycaster = new Raycaster()
        if(this.options.click)
            window.addEventListener('mousedown', this.onMouseDown)
    }
    onMouseMove(mouse)
    {
        this.mouse.x = mouse.nX
        this.mouse.y = mouse.nY
        if(this.options.hover)
            this.testIntersects()
    }
    onMouseDown = () =>
    {
        this.testIntersects()
    }
    testIntersects()
    {
        this.raycaster.setFromCamera(this.mouse, this.camera)
        const intersects = this.raycaster.intersectObjects(this.intersectObjects)
        if(intersects.length > 0)
            this.options.callback()
    }
    destroy()
    {
        if(this.options.click)
            window.removeEventListener('mousedown', this.onMouseDown)
    }
}

export default ARaycaster
