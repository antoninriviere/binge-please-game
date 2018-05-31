import AInteraction from '../AInteraction'
import GUI from 'WebGLUtils/GUI'

import {
    PlaneBufferGeometry,
    TextureLoader,
    Vector2,
    ShaderMaterial,
    DoubleSide,
    Mesh,
    PointLight
} from 'three'

import fragmentShader from './shaders/frag.glsl'
import vertexShader from './shaders/vert.glsl'

export default class StrangerThings extends AInteraction
{
    constructor(options)
    {
        super(options)

        this.name = 'StrangerThings'

        this.parallaxe = {
            intensity : 0.05,
            range: []
        }


        this.initMeshes()
        this.initLights()

        this.setupCamera()

        this.initGUI()
    }

    setupCamera()
    {
        this.scene.camera.position.x = 0
        this.scene.camera.position.y = 0
        this.scene.camera.position.z = 250
        this.scene.camera.rotation.x = 0
        this.scene.camera.rotation.y = 0
        this.scene.camera.rotation.z = 0
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

    initGUI()
    {
        this.parallaxe.range = [0, 0.1]
        GUI.panel
            .addGroup({ label: 'Stranger things' })
            .addSlider(this.parallaxe, 'intensity', 'range', { label: 'intensity' })
    }

    initLights()
    {
        // this.directionalLight = new DirectionalLight(0xffffff, 1)
        // this.directionalLight.castShadow = true
        // this.directionalLight.position.set(5, 5, 10)
        // const helper = new DirectionalLightHelper(this.directionalLight, 5)
        // this.scene.add(this.directionalLight)
        // this.scene.add(helper)

        this.light = new PointLight(0xff0000, 1, 0)
        this.light.position.set(50, 50, 50)
        this.scene.add(this.light)
    }

    update(time)
    {
        super.update()
        this.uniforms.uTime.value = time.elapsed
        this.uniforms.uMouse.value = new Vector2(this.mouse.ratio.fromCenter.x, this.mouse.ratio.fromCenter.y)
        this.uniforms.uParallaxe.value = this.parallaxe.intensity
    }
}
