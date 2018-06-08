import AInteraction from '../AInteraction'
import GUI from 'WebGLUtils/GUI'
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

        this.vx = 15 + Math.random() * 2
        this.vy = 15 + Math.random() * 2

        this.SPRING = 0.01
        this.SPRING_LENGTH = 50
        this.FRICTION = 0.85
        this.GRAVITY = 0.1
        this.t = 0

        this.initMeshes()
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
        // this.scene.camera.rotation.x = 0
        // this.scene.camera.rotation.y = 0
        // this.scene.camera.rotation.z = 0
    }

    initMeshes()
    {
        this.initPos = new Vector3(0, 300, 0)
        this.targetPos = new Vector3(0, -300, 0)
        const boxGeo = new BoxBufferGeometry(100, 100, 100)
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

    update(time)
    {
        this.t += time.delta * 0.0001
        const newX = this.box.position.x + 15 * Math.exp(-this.t) * Math.sin(Math.PI * 3 * this.t)
        // const newX = this.box.position.x + 100 * this.t * Math.sin(Math.PI * 2 * this.t)
        // const newX = this.box.position.x
        const newY = this.box.position.y + 10
        const dx = this.box.position.x - newX
        const dy = this.box.position.y - newY
        const angle = Math.atan2(dy, dx)
        const targetX = newX + Math.cos(angle) * this.SPRING_LENGTH
        const targetY = newY + Math.sin(angle) * this.SPRING_LENGTH
        const ax = (targetX - this.box.position.x) * this.SPRING
        const ay = (targetY - this.box.position.y) * this.SPRING
        this.vx += ax
        this.vy += ay
        this.vx *= this.FRICTION
        this.vy *= this.FRICTION
        this.box.position.x += this.vx
        this.box.position.y += this.vy
        this.box.position.z += this.vx
        this.box.rotation.x += 0.005
        this.box.rotation.y += 0.005
        this.box.rotation.z += 0.005
        if(this.box.position.y < -350)
        {
            console.log('out')
            this.box.position.set(this.initPos.x, this.initPos.y, this.initPos.z)
            this.box.rotation.set(0, 0, 0)
            this.vx = 15 + Math.random() * 2
            this.vy = 15 + Math.random() * 2
            this.t = 0
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
        super.update()
    }
}
