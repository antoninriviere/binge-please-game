import GUI from 'WebGLUtils/GUI'

import {
    Object3D,
    PlaneBufferGeometry,
    // MeshPhongMaterial,
    TextureLoader,
    Vector2,
    ShaderMaterial,
    DoubleSide,
    Mesh,
    DirectionalLight,
    DirectionalLightHelper
} from 'three'

import fragmentShader from './shaders/frag.glsl'
import vertexShader from './shaders/vert.glsl'

export default class StrangerThings extends Object3D
{
    constructor(options)
    {
        super()

        this.scene = options.scene
        this.name = 'StrangerThings'

        this.mouse = options.mouse

        this.parallaxe = {
            intensity : 0.05,
            range: []
        }


        this.initMeshes()
        this.initLights()

        this.initGUI()
    }

    initMeshes()
    {
        const planeGeo = new PlaneBufferGeometry(100, 50)
        this.uniforms = {
            uTime: { value: 0 },
            uTexture: { value: new TextureLoader().load('/static/stranger-things/bg.jpg') },
            uMap: { value: new TextureLoader().load('/static/stranger-things/depthmap.png') },
            uMouse: { value: new Vector2(this.mouse.x, this.mouse.y) },
            uResolution: { value: new Vector2(window.innerWidth, window.innerHeight) },
            uParallaxe: { value: this.parallaxe.intensity }
        }
        const planeMat = new ShaderMaterial({
            uniforms: this.uniforms,
            fragmentShader: fragmentShader,
            vertexShader: vertexShader,
            side: DoubleSide
        })
        this.plane = new Mesh(planeGeo, planeMat)
        this.add(this.plane)
    }

    addListeners()
    {
        window.addEventListener('mousemove', this.onMouseMove)
    }

    initGUI()
    {
        console.log('init GUI', GUI)
        this.parallaxe.range = [0, 0.1]
        GUI.panel
            .addGroup({ label: 'Stranger things' })
            .addSlider(this.parallaxe, 'intensity', 'range', { label: 'intensity' })
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

    update(time)
    {
        // console.log(time.delta)
        this.uniforms.uTime.value = time.elapsed
        this.uniforms.uMouse.value = new Vector2(this.mouse.ratio.fromCenter.x, this.mouse.ratio.fromCenter.y)
        this.uniforms.uParallaxe.value = this.parallaxe.intensity
    }

    onMove(mouse)
    {
        this.mouse = mouse
    }

    resize(mouse)
    {
        this.mouse = mouse
    }

    clear()
    {
        window.removeEventListener('mousemove', this.onMouseMove)
    }
}
