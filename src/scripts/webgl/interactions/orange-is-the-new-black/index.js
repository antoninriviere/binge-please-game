import AInteraction from '../AInteraction'
import GUI from 'WebGLUtils/GUI'
// import { DegToRad } from 'Utils/Numbers'
import {
    Vector3,
    BoxBufferGeometry,
    MeshLambertMaterial,
    Mesh,
    DirectionalLight
} from 'three'

export default class OrangeIsTheNewBlack extends AInteraction
{
    constructor(options)
    {
        super(options)

        this.name = 'OrangeIsTheNewBlack'

        this.vx = 0
        this.vy = 0

        this.SPRING = 0.2

        this.initMeshes()
        this.initLights()

        this.setupCamera()

        // this.initGUI()
    }

    setupCamera()
    {
        this.scene.camera.position.x = 0
        this.scene.camera.position.y = 0
        this.scene.camera.position.z = 100
        // this.scene.camera.rotation.x = 0
        // this.scene.camera.rotation.y = 0
        // this.scene.camera.rotation.z = 0
    }

    initMeshes()
    {
        this.initPos = new Vector3(-10, 10, 0)
        this.targetPos = new Vector3(10, -10, 0)
        const boxGeo = new BoxBufferGeometry(1, 1, 1)
        const boxMat = new MeshLambertMaterial({
            color: 0xff000
        })
        this.box = new Mesh(boxGeo, boxMat)
        this.box.position.set(this.initPos.x, this.initPos.y, this.initPos.z)
        this.add(this.box)
    }

    initGUI()
    {
        this.parallaxe.range = [0, 0.1]
        GUI.panel
            .addGroup({ label: 'Stranger things' })
            .addSlider(this.parallaxe, 'intensity', 'range', { label: 'intensity' })
    }

    initLights()
    {
        this.directionalLight = new DirectionalLight(0xffffff, 1)
        this.directionalLight.position.set(5, 5, 10)
        this.scene.add(this.directionalLight)
        // const helper = new DirectionalLightHelper(this.directionalLight, 5)
        // this.scene.add(helper)
    }

    update()
    {
        // const dx = this.targetPos.x - this.box.position.x
        // const ax = dx * this.SPRING
        // this.vx += ax
        // this.box.position.x += this.vx
        super.update()
    }
}
