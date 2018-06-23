import AInteraction from '../AInteraction'

import {
    PlaneBufferGeometry,
    CanvasTexture,
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
        this.score = options.score

        this.createCanvasTexture(this.initMeshes)

        this.setupCamera()
    }

    createCanvasTexture(cb)
    {
        document.fonts.load('512px SharpGrotesk-Bold10').then(() =>
        {
            this.canvas = document.createElement('canvas')
            this.canvas.style.letterSpacing = '5px'
            const w = 1024
            const h = 512
            this.canvas.width = w
            this.canvas.height = h
            const ctx = this.canvas.getContext('2d')
            ctx.font = '512px SharpGrotesk-Bold10'
            ctx.fillStyle = '#000000'
            ctx.textAlign = 'center'
            ctx.textBaseline = 'middle'
            const text = this.score.toString().split('').join(String.fromCharCode(8202))
            ctx.fillText(text, w / 2, h / 2)
            cb()
        })
    }

    initMeshes = () =>
    {
        const planeGeo = new PlaneBufferGeometry(40, 20, 64, 64)
        const scoreTexture = new CanvasTexture(this.canvas)
        this.uniforms = {
            uTime: { value: 0 },
            uAmp: { value: 100 },
            uPower: { value: 2 },
            uColor: { value: new Color(0x5934A5) },
            uTexture: { value: scoreTexture }
        }
        const planeMat = new ShaderMaterial({
            uniforms: this.uniforms,
            fragmentShader: fragmentShader,
            vertexShader: vertexShader,
            transparent: true
        })
        this.plane = new Mesh(planeGeo, planeMat)
        this.add(this.plane)
        this.transitionIn()
    }

    setupCamera()
    {
        this.scene.camera.position.x = 0
        this.scene.camera.position.y = 0
        this.scene.camera.position.z = 50

        this.scene.camera.rotation.x = 0
        this.scene.camera.rotation.y = 0
        this.scene.camera.rotation.z = 0
    }

    transitionIn()
    {
        const tl = new TimelineMax()
        tl.to(this.uniforms.uAmp, 3, { value: 3, ease: Back.easeOut }, 0)
        tl.to(this.uniforms.uPower, 3, { value: 1, ease: Back.easeOut }, 0)
    }

    update(time)
    {
        super.update()
        if(this.plane)
            this.uniforms.uTime.value += time.delta * 0.01
    }
}
