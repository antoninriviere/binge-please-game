import {
    Group,
    PlaneBufferGeometry,
    MeshPhongMaterial,
    Mesh,
    DirectionalLight,
    DirectionalLightHelper,
    DoubleSide,
    Vector2,
    Raycaster
} from 'three'
import OBJLoader from 'WebGLUtils/OBJLoader'
import MTLLoader from 'WebGLUtils/MTLLoader'
import GUI from 'WebGLUtils/GUI'

export default class ThirteenReasonsWhy extends Group
{
    constructor(scene)
    {
        super()
        this.scene = scene
        this.name = '13ReasonsWhy'
        this.initMeshes()
        this.initLights()
        this.mouse = new Vector2()
        this.raycaster = new Raycaster()
    }

    initMeshes()
    {
        this.loadWalkmanMaterials()
        this.addFloor()
    }

    loadWalkmanMaterials()
    {
        this.mtlLoader = new MTLLoader()
        this.mtlLoader.load(
            '/static/models/13-reasons-why/walkman.mtl',
            (materials) =>
            {
                materials.preload()
                this.loadWalkman(materials)
            }
        )
    }

    loadWalkman(materials)
    {
        this.objLoader = new OBJLoader()
        this.objLoader.setMaterials(materials)
        this.objLoader.load(
            '/static/models/13-reasons-why/walkman.obj',
            (object) =>
            {
                object.traverse((child) =>
                {
                    child.castShadow = true
                    if(child.material)
                        child.material.shininess = 0
                    if(child.name === 'Walkman-Porte' || child.name === 'Vitre')
                        child.material.side = DoubleSide
                    if(child.name === 'Bouton-Play')
                        this.playButton = child
                })
                object.scale.set(0.05, 0.05, 0.05)
                object.rotation.y = -Math.PI / 2
                this.walkman = object
                this.add(this.walkman)
                this.addListeners()
                this.initGUI()
            }
        )
    }

    addFloor()
    {
        const planeGeo = new PlaneBufferGeometry(1, 2, 1)
        const planeMat = new MeshPhongMaterial({
            color: 0xf7e0df
        })
        this.plane = new Mesh(planeGeo, planeMat)
        this.plane.position.y = -1
        this.plane.scale.set(50, 50, 50)
        this.plane.rotation.x = -Math.PI / 2
        this.plane.receiveShadow = true
        this.add(this.plane)
    }

    addListeners()
    {
        window.addEventListener('mousemove', this.onMouseMove)
        window.addEventListener('mousedown', this.onMouseDown)
    }

    initGUI()
    {
        this.playButton.position.range = [-5, 5]
        GUI.panel
            .addGroup({ label: '13 Reasons why' })
            .addSlider(this.playButton.position, 'y', 'range', { label: 'play button y' })

    }

    onMouseMove = (e) =>
    {
        this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1
        this.mouse.y = - (e.clientY / window.innerHeight) * 2 + 1
    }

    onMouseDown = () =>
    {
        this.raycaster.setFromCamera(this.mouse, this.scene.camera)
        const intersects = this.raycaster.intersectObjects([this.playButton])
        if(intersects.length > 0)
            console.log(intersects[0])
    }

    initLights()
    {
        this.directionalLight = new DirectionalLight(0xffffff, 1)
        this.directionalLight.castShadow = true
        this.directionalLight.position.set(5, 5, 10)
        const helper = new DirectionalLightHelper(this.directionalLight, 5)
        this.scene.add(this.directionalLight)
        this.scene.add(helper)
    }

    update(dt)
    {
    }

    clear()
    {
        // this.children.forEach((child) =>
        // {
        //     child.clear()
        // })
        window.removeEventListener('mousemove', this.onMouseMove)
        window.removeEventListener('mousedown', this.onMouseDown)
    }
}
