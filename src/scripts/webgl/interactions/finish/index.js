import AInteraction from '../AInteraction'

import {
    PlaneBufferGeometry,
    TextureLoader,
    DirectionalLight,
    Color,
    ShaderMaterial,
    Mesh
} from 'three'

import fragmentShader from './shaders/frag.glsl'
import vertexShader from './shaders/vert.glsl'

import { TimelineMax } from 'gsap'

export default class FinishScreen extends AInteraction
{
    constructor(options)
    {
        super(options)

        this.name = 'finishScreen'


        this.initMeshes()
        // this.initLights()

        this.setupCamera()
        this.transitionIn()
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
        const planeGeo = new PlaneBufferGeometry(50, 25, 128, 128)
        this.uniforms = {
            uTime: { value: 0 },
            uAmp: { value: 100 },
            uPower: { value: 2 },
            uColor: { value: new Color(0x5934A5) },
            uTexture: { value: new TextureLoader().load('/static/finish-screen/finish.png') }
        }
        const planeMat = new ShaderMaterial({
            uniforms: this.uniforms,
            fragmentShader: fragmentShader,
            vertexShader: vertexShader,
            transparent: true
        })
        this.plane = new Mesh(planeGeo, planeMat)
        this.add(this.plane)
    }

    initLights()
    {
        this.directionalLight = new DirectionalLight(0xffffff, 1)
        this.scene.add(this.directionalLight)
    }

    transitionIn()
    {
        const tl = new TimelineMax()
        tl.to(this.uniforms.uAmp, 3, { value: 10, ease: Back.easeOut }, 0)
        tl.to(this.uniforms.uPower, 3, { value: 1, ease: Back.easeOut }, 0)
    }

    update(time)
    {
        super.update()
        this.uniforms.uTime.value += time.delta * 0.01
    }
}
