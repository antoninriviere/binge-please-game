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
        for(let i = this.children.length - 1; i >= 0; i--)
        {
            const child = this.children[i]
            if(child.geometry)
                child.geometry.dispose()
            if(child.material)
                child.material.dispose()

            this.remove(child)
        }
        this.scene.resetCamera()
    }
    update(time)
    {
        this.time = time
    }
}

export default AInteraction
