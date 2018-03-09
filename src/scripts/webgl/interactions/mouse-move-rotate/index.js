import { Group } from 'three'
import Cube from './meshes/cube'
export default class MouseMoveRotate extends Group
{
    constructor()
    {
        super()
        this.name = 'mouseMoveRotate'
        this.initMeshes()
    }

    initMeshes()
    {
        this.cube = new Cube()
        this.add(this.cube)
    }

    update(dt)
    {
        this.cube.update(dt)
    }

    clear()
    {
        this.children.forEach((child) =>
        {
            child.clear()
        })
    }
}
