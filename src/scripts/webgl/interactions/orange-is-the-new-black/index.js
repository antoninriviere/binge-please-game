import AInteraction from '../AInteraction'
import {
    HemisphereLight,
    DoubleSide
} from 'three'
import Panties from './panties'
import GLTFLoader from 'WebGLUtils/GLTFLoader'

export default class OrangeIsTheNewBlack extends AInteraction
{
    constructor(options)
    {
        super(options)

        this.name = 'orangeIsTheNewBlack'
        this.PANTIES_MAX = 6

        this.loadPantiesModel()
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

    loadPantiesModel()
    {
        this.gltfLoader = new GLTFLoader()
        this.gltfLoader.load('/static/orange-is-the-new-black/panties.gltf', this.initPanties)
    }

    initPanties = (object) =>
    {
        const pantiesScene = object.scene
        pantiesScene.traverse((child) =>
        {
            if(child.material)
                child.material.side = DoubleSide
        })
        pantiesScene.scale.set(50, 50, 50)
        pantiesScene.rotation.y = -Math.PI / 2

        this.pantiesItems = []
        const step = 500 / this.PANTIES_MAX
        let start = -250 + step / 2
        for(let i = 0; i < this.PANTIES_MAX; i++)
        {
            const panties = new Panties(pantiesScene.clone(), i, start)
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
        this.hemisphereLight = new HemisphereLight(0xFF82BD, 0xFF82BD, 1)
        this.add(this.hemisphereLight)
        // this.directionalLight = new DirectionalLight(0xffffff, 1)
        // this.directionalLight.position.set(5, 5, 10)
        // this.scene.add(this.directionalLight)
    }

    update(time)
    {
        if(!this.pantiesItems)
            return
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