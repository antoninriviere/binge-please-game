import AInteraction from '../AInteraction'

import {
    PlaneBufferGeometry,
    LoadingManager,
    TextureLoader,
    Vector2,
    ShaderMaterial,
    Mesh
} from 'three'

import fragmentShader from './shaders/frag.glsl'
import vertexShader from './shaders/vert.glsl'

import { TimelineMax } from 'gsap'
import resizePositionProportionally from 'Utils/resizePositionProportionally'
import find from 'lodash.find'
import positions from './positions'

export default class Narcos extends AInteraction
{
    constructor(options)
    {
        super(options)

        this.name = 'narcos'
        this.windowObj = options.windowObj

        this.index = 0
        this.initPos = positions[this.index]
        this.targetPos = positions[this.index + 1]

        this.startPos = new Vector2()
        this.endPos = new Vector2()

        this.textures = []

        this.TWEEN_DURATION = 1

        this.loadTextures().then(() =>
        {
            this.initMeshes()
            this.resize({}, this.windowObj)
            window.addEventListener('click', () =>
            {
                this.moveCircle()
            })
        })

        this.scene.options.override.aspect = true
        this.scene.options.override.renderer = true

        this.setupCamera()
    }

    loadTextures()
    {
        const manager = new LoadingManager()

        return new Promise((resolve) =>
        {
            const textureLoader = new TextureLoader(manager)
            manager.onLoad = () =>
            {
                resolve()
            }
            positions.forEach((position, index) =>
            {
                textureLoader.load(`/static/narcos/${index}.jpg`, (t) =>
                {
                    this.textures.push({
                        id: `texture-${index}`,
                        texture: t
                    })
                })
            })
        })
    }

    setupCamera()
    {
        this.scene.camera.position.x = 0
        this.scene.camera.position.y = 0
        this.scene.camera.position.z = 100
        this.scene.camera.rotation.x = 0
        this.scene.camera.rotation.y = 0
        this.scene.camera.rotation.z = 0
    }

    initMeshes()
    {
        const planeGeo = new PlaneBufferGeometry(1, 1)
        this.uniforms = {
            uTime: { value: 0 },
            uTexture: { value: this.getTexture(0) },
            uDisplacementFactor: { value: 0 },
            uCenter: { value: new Vector2(-1000, -1000) },
            uRadius: { value: this.windowObj.height * 0.1 },
            uDistortion: { value: 3.0 },
            uDistortion2: { value: 5.0 },
            uSpeed: { value: 0.2 }
        }
        const planeMat = new ShaderMaterial({
            uniforms: this.uniforms,
            fragmentShader: fragmentShader,
            vertexShader: vertexShader
        })
        this.plane = new Mesh(planeGeo, planeMat)
        this.add(this.plane)
    }

    getTexture(index)
    {
        return find(this.textures, { id: `texture-${index}` }).texture
    }

    moveCircle()
    {
        this.setupPositions()
        this.index++
        const tl = new TimelineMax({
            onComplete: () =>
            {
                this.initPos = positions[this.index]
                this.targetPos = positions[this.index + 1]
            }
        })
        tl.to(this.uniforms.uCenter.value, this.TWEEN_DURATION, {
            x: this.endPos.x,
            y: this.endPos.y,
            ease: Power2.easeInOut
        }, 0)
        tl.fromTo(this.uniforms.uDisplacementFactor, this.TWEEN_DURATION, {
            value: 0
        }, {
            value: Math.PI,
            ease: Power0.easeNone
        }, 0)
        tl.add(() =>
        {
            this.uniforms.uTexture.value = this.getTexture(this.index)
        }, this.TWEEN_DURATION / 2)
    }

    setupPositions()
    {
        this.startPos.x = Math.ceil((this.vars.width * this.initPos.x) / 1024)
        this.startPos.y = Math.ceil(this.vars.height - (this.windowObj.height * this.initPos.y) / 576)

        this.endPos.x = Math.ceil((this.vars.width * this.targetPos.x) / 1024)
        this.endPos.y = Math.ceil(this.vars.height - (this.windowObj.height * this.targetPos.y) / 576)
    }

    update(time)
    {
        super.update()
        if(this.plane)
            this.uniforms.uTime.value += time.delta * 0.01
    }

    resize = (mouse, windowObj) =>
    {
        this.windowObj.width = windowObj.width
        this.windowObj.height = windowObj.height

        const aspect = 16 / 9
        this.scene.camera.aspect = aspect
        this.scene.camera.updateProjectionMatrix()

        const vFov = this.scene.camera.fov * Math.PI / 180
        const h = Math.ceil(2 * Math.tan(vFov / 2) * this.scene.camera.position.z)
        const w = Math.ceil(h * aspect)
        this.vars = resizePositionProportionally(
            this.windowObj.width,
            this.windowObj.height,
            this.windowObj.width,
            (this.windowObj.width * 9) / 16
        )

        this.scene.renderer.setSize(this.vars.width, this.vars.height)
        this.scene.renderer.domElement.style.top = this.vars.top + 'px'
        this.scene.renderer.domElement.style.left = this.vars.left + 'px'

        this.setupPositions()

        this.uniforms.uRadius.value = this.windowObj.height * 0.1
        this.uniforms.uCenter.value.x = this.startPos.x
        this.uniforms.uCenter.value.y = this.startPos.y

        this.plane.scale.x = w
        this.plane.scale.y = h
    }

    clear()
    {
        super.clear()
        this.scene.options.override.aspect = false
        this.scene.options.override.renderer = false
        this.scene.camera.aspect = this.windowObj.width / this.windowObj.height
        this.scene.camera.updateProjectionMatrix()
        this.scene.renderer.setSize(this.windowObj.width, this.windowObj.height)
        this.scene.renderer.domElement.style.top = ''
        this.scene.renderer.domElement.style.left = ''
    }
}
