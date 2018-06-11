import AInteraction from '../AInteraction'
import {
    BoxBufferGeometry,
    MeshLambertMaterial,
    DirectionalLight
} from 'three'
import Panties from './panties'

export default class OrangeIsTheNewBlack extends AInteraction
{
    constructor(options)
    {
        super(options)

        this.name = 'OrangeIsTheNewBlack'
        this.PANTIES_MAX = 8

        this.initPanties()
        this.initLights()

        this.setupCamera()

        // this.initGUI()
    }

    setupCamera()
    {
        this.scene.camera.fov = 45
        this.scene.camera.position.x = 0
        this.scene.camera.position.y = 0
        this.scene.camera.position.z = 2000
    }

    initPanties()
    {
        const boxGeo = new BoxBufferGeometry(100, 100, 100)
        const boxMat = new MeshLambertMaterial({
            color: 0xff000
        })
        this.pantiesItems = []
        const step = 600 / this.PANTIES_MAX
        let start = -300 + step / 2
        for(let i = 0; i < this.PANTIES_MAX; i++)
        {
            const panties = new Panties(boxGeo, boxMat, i, start)
            this.pantiesItems.push(panties)
            this.add(panties)
            start += step
        }
    }

    initGUI()
    {
    }

    initLights()
    {
        this.directionalLight = new DirectionalLight(0xffffff, 1)
        this.directionalLight.position.set(5, 5, 10)
        this.scene.add(this.directionalLight)
    }

    update(time)
    {
        for(const panties of this.pantiesItems)
        {
            panties.animate(time.delta)
        }
        super.update()

        // const dx = this.targetPos.x - this.box.position.x
        // const dy = this.targetPos.y - this.box.position.y
        // const ax = dx * this.SPRING
        // const ay = dy * this.SPRING
        // this.vx += ax
        // this.vy += ay
        // this.vy += this.GRAVITY
        // this.vx *= this.FRICTION
        // this.vy *= this.FRICTION
        // this.box.position.x += this.vx
        // this.box.position.y += this.vy
    }
}
