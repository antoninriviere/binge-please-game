import { Scene, PerspectiveCamera, WebGLRenderer, PCFSoftShadowMap, Vector3, AxesHelper } from 'three'
import Stats from 'stats-js'
import OrbitControls from 'orbit-controls'
import { EffectComposer, RenderPass } from 'postprocessing'
import GUI from 'WebGLUtils/GUI'
import FXAAPass from '../passes/FXAA'

class SceneObj extends Scene
{
    constructor(options)
    {
        super()
        const defaultOptions = {
            camera: {
                fov: 15,
                near: 1,
                far: 5000,
                position: new Vector3(0, 0, 10),
                rotation: new Vector3(0, 0, 0)
            },
            renderer: {
                alpha: true,
                antialias: true,
                pixelRatio: Math.max(1, Math.min(window.devicePixelRatio, 2))
            },
            debug: {
                stats: false,
                orbitControls: false
            },
            postProcessing: {
                active: false
            }
        }

        this.options = { ...defaultOptions, ...options }

        this.container = this.options.container

        this.width = window.innerWidth
        this.height = window.innerHeight

        this.renderer = new WebGLRenderer(this.options.renderer)
        this.renderer.setSize(this.width, this.height)
        this.renderer.setClearAlpha(0)
        this.renderer.shadowMap.enabled = true
        this.renderer.shadowMap.type = PCFSoftShadowMap

        this.container.appendChild(this.renderer.domElement)

        this.camera = new PerspectiveCamera(this.options.camera.fov, this.width / this.height, this.options.camera.near, this.options.camera.far)
        this.camera.position.copy(this.options.camera.position)

        this.preparePostProcessing()

        if(this.options.debug.stats)
            this.initStats()

        if(this.options.debug.orbitControls)
            this.initControls()

        if(this.options.debug.axes)
        {
            const axes = new AxesHelper(10)
            this.add(axes)
        }
    }

    initCameraGUI()
    {
        this.camera.position.range = [0, 50]
        this.camera.rotation.range = [-Math.PI, Math.PI]
        GUI.panel
            .addGroup({ label: 'Camera', enable: false })
                .addSlider(this.camera.rotation, 'x', 'range', { label: 'rX', step: 0.001 })
                .addSlider(this.camera.rotation, 'y', 'range', { label: 'rY', step: 0.001 })
                .addSlider(this.camera.rotation, 'z', 'range', { label: 'rZ', step: 0.001 })
                .addSlider(this.camera.position, 'x', 'range', { label: 'X', step: 0.01 })
                .addSlider(this.camera.position, 'y', 'range', { label: 'Y', step: 0.01 })
                .addSlider(this.camera.position, 'z', 'range', { label: 'Z', step: 0.01 })
    }

    initControls()
    {
        this.controls = new OrbitControls({
            position: this.camera.position.toArray(),
            parent: this.renderer.domElement
        })
        this.target = new Vector3()
        this.camera.lookAt(this.target)
    }

    initStats()
    {
        this.stats = new Stats()
        this.stats.domElement.style.position = 'absolute'
        this.stats.domElement.style.left = '0px'
        this.stats.domElement.style.top = '0px'
        this.stats.domElement.addEventListener('mousedown', (e) =>
        {
            e.stopPropagation()
        }, false)

        this.container.appendChild(this.stats.domElement)
    }

    preparePostProcessing()
    {
        this.composer = new EffectComposer(this.renderer)
        this.renderPass = new RenderPass(this, this.camera)
        this.composer.addPass(this.renderPass)
        this.passes = []
    }
    initPostProcessing(passes = [])
    {
        let passObject
        passes.forEach((pass) =>
        {
            passObject = pass.constructor()
            this.passes.push(passObject)
            this.composer.addPass(passObject)
            if(pass.gui)
                passObject.initGUI()
        })
        passObject = new FXAAPass({})
        this.composer.addPass(passObject)
        passObject.renderToScreen = true
        this.options.postProcessing.active = true
    }
    clearPostProcessing()
    {
        this.passes.forEach((pass) =>
        {
            this.composer.removePass(pass)
        })
        this.options.postProcessing.active = false
    }
    render(time)
    {
        if(this.options.debug.orbitControls)
        {
            this.controls.update()
            this.camera.position.fromArray(this.controls.position)
            this.camera.up.fromArray(this.controls.up)
            this.camera.lookAt(this.target.fromArray(this.controls.direction))
        }

        if(this.options.postProcessing.active)
        {
            this.composer.render(time.delta)
        }
        else
        {
            this.renderer.render(this, this.camera)
        }

        if(this.options.debug.stats)
            this.stats.update()
    }

    resetCamera()
    {
        this.camera.position.x = this.options.camera.position.x
        this.camera.position.y = this.options.camera.position.y
        this.camera.position.z = this.options.camera.position.z
        this.camera.rotation.x = this.options.camera.rotation.x
        this.camera.rotation.y = this.options.camera.rotation.y
        this.camera.rotation.z = this.options.camera.rotation.z
    }

    resize(newWidth, newHeight)
    {
        this.camera.aspect = newWidth / newHeight
        this.camera.updateProjectionMatrix()

        this.renderer.setSize(newWidth, newHeight)

        if(this.composer)
            this.composer.setSize(newWidth, newHeight)
    }
}

export default SceneObj
