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
    }

    setupCamera()
    {
        this.scene.camera.fov = 15
        this.scene.camera.far = 5000

        this.scene.camera.position.x = 0
        this.scene.camera.position.y = 0
        this.scene.camera.position.z = 2000

        this.scene.camera.updateProjectionMatrix()
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
        this.scene.add(this.hemisphereLight)
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
    }
    clear()
    {
        super.clear()
        this.scene.remove(this.hemisphereLight)
    }
}
