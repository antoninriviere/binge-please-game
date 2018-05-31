import {
    Group
} from 'three'

class AInteraction extends Group
{
    constructor(options)
    {
        super()
        this.scene = options.scene
        this.mouse = options.mouse
        this.time = 0
    }
    onMouseMove(mouse)
    {
        this.mouse = mouse
    }
    resize(mouse)
    {
        this.mouse = mouse
    }
    clear()
    {
        this.children.forEach((child) =>
        {
            this.scene.remove(child)
        })
    }
    update(time)
    {
        this.time = time
    }
}

export default AInteraction
