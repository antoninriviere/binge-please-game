import { Scene, PerspectiveCamera, WebGLRenderer, PCFSoftShadowMap, Vector3, AxesHelper } from 'three'
import Stats from 'stats-js'
import OrbitControls from 'orbit-controls'
import { EffectComposer, RenderPass } from 'postprocessing'
import GUI from 'WebGLUtils/GUI'

class SceneObj extends Scene
{
    constructor(options)
    {
        super()
        const defaultOptions = {
            camera: {
                fov: 15,
                near: 1,
                far: 1000,
                position: new Vector3(0, 0, 10)
            },
            renderer: {
                alpha: true,
                antialias: false,
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

        this.camera = new PerspectiveCamera(this.options.camera.fov, this.width / this.height, this.options.near, this.options.far)
        this.camera.position.copy(this.options.camera.position)

        if(this.options.postProcessing.active)
            this.initPostProcessing()

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
            .addGroup({ label: 'Camera' })
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

    initPostProcessing()
    {
        this.composer = new EffectComposer(this.renderer)
        this.renderPass = new RenderPass(this, this.camera)
        this.composer.addPass(this.renderPass)

        let passObject
        if(this.options.postProcessing.gui)
            GUI.panel.addGroup({ label: 'Postprocessing' })

        this.options.postProcessing.passes.forEach((pass) =>
        {
            if(pass.active)
            {
                passObject = pass.constructor()
                this.composer.addPass(passObject)
                if(pass.gui)
                    passObject.initGUI()
            }
        })
        passObject.renderToScreen = true
    }
    render(dt)
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
            this.composer.render(dt)
        }
        else
        {
            this.renderer.render(this, this.camera)
        }

        if(this.options.debug.stats)
            this.stats.update()
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
