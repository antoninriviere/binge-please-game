import raf from 'raf'
import { AmbientLight } from 'three'
import SceneObj from 'WebGLCore/scene'
import Cube from './meshes/cube'
import Config from 'WebGLConfig'

class App
{
    constructor(container)
    {
        this.scene = new SceneObj({
            container: container,
            ...Config
        })

        this.container = container

        this.DELTA_TIME = 0
        this.LAST_TIME = Date.now()

        this.initMeshes()
        this.initLights()
        this.addListeners()
        this.update()
    }

    initMeshes()
    {
        this.cube = new Cube()
        this.scene.add(this.cube)
    }

    initLights()
    {
        this.ambientLight = new AmbientLight(0x111111)
        this.scene.add(this.ambientLight)
    }

    addListeners()
    {
        window.addEventListener('resize', this.onResize)
    }

    update = () =>
    {
        this.DELTA_TIME = Date.now() - this.LAST_TIME
        this.LAST_TIME = Date.now()

        this.cube.update(this.DELTA_TIME)

        this.scene.render(this.DELTA_TIME)
        raf(this.update)
    }

    onResize = () =>
    {
        this.width = window.innerWidth
        this.height = window.innerHeight

        this.scene.resize(this.width, this.height)
    }
}

export default App
